const WAYS_CSV_URL = 'https://docs.google.com/spreadsheets/d/1OIAs6EFgLFKG3QN_b4Vtm48BwSFb7VwDxOXWhkotXz8/pub?gid=53126780&single=true&output=csv';

// Adapted from script.js parseCSV, but returns full 2D array for this structure
function parseWaysCSV(csvText) {
    const rows = [];
    let currentRow = [];
    let currentValue = '';
    let insideQuote = false;
    let i = 0;
    while (i < csvText.length) {
        const char = csvText[i];
        if (insideQuote) {
            if (char === '"' && i + 1 < csvText.length && csvText[i + 1] === '"') { currentValue += '"'; i += 2; continue; }
            else if (char === '"') { insideQuote = false; i++; continue; }
            else { currentValue += char; i++; continue; }
        } else {
            if (char === '"') { insideQuote = true; i++; continue; }
            else if (char === ',') { currentRow.push(currentValue.trim()); currentValue = ''; i++; continue; }
            else if (char === '\r' || char === '\n') {
                currentRow.push(currentValue.trim());
                if (currentRow.some(v => v !== '')) rows.push(currentRow);
                currentRow = []; currentValue = ''; i++;
                if (char === '\r' && i < csvText.length && csvText[i] === '\n') i++;
                continue;
            } else { currentValue += char; i++; continue; }
        }
    }
    if (currentValue !== '' || currentRow.length > 0) {
        currentRow.push(currentValue.trim());
        if (currentRow.some(v => v !== '')) rows.push(currentRow);
    }
    return rows;
}

// Map skill names (as in sheet) to HTML select IDs
const SKILL_ID_MAP = {
    'Acrobatics': 'acrobaticsSkillRank',
    // Add all others, e.g.:
    // 'Might': 'mightSkillRank',
    // 'Brawn': 'brawnSkillRank',
    // ... based on your HTML IDs
};

let waysData = [];

// Fetch and process ways
fetch(WAYS_CSV_URL)
    .then(r => { if (!r.ok) throw Error(r.status); return r.text(); })
    .then(text => {
        const rows = parseWaysCSV(text);
        
        // Find row indices by key in col 0
        let includeRowIdx = -1;
        let wayNameRowIdx = -1;
        let reqSkillRowIdx = -1;
        
        rows.forEach((row, idx) => {
            const key = row[0].toLowerCase();
            if (key.includes('include')) includeRowIdx = idx;
            if (key.includes('way name')) wayNameRowIdx = idx;
            if (key.includes('required skill')) reqSkillRowIdx = idx;
        });
        
        if (includeRowIdx === -1 || wayNameRowIdx === -1 || reqSkillRowIdx === -1) {
            console.error('Missing key rows in Ways CSV');
            return;
        }
        
        const includeRow = rows[includeRowIdx];
        const wayNameRow = rows[wayNameRowIdx];
        const reqSkillRow = rows[reqSkillRowIdx];
        
        // Collect ways where include === 'TRUE'
        for (let col = 1; col < includeRow.length; col++) {
            if (includeRow[col].toUpperCase() === 'TRUE') {
                const wayName = wayNameRow[col];
                const reqSkill = reqSkillRow[col];
                if (wayName && reqSkill && SKILL_ID_MAP[reqSkill]) {  // Skip if no matching skill ID
                    waysData.push({ name: wayName, reqSkill, skillId: SKILL_ID_MAP[reqSkill] });
                }
            }
        }
        
        populateRoleSelector();
        addSkillListeners();
        updateWayOptions();  // Initial check
    })
    .catch(err => {
        console.error('Error loading Ways CSV:', err);
        // Fallback: maybe hardcoded ways or error UI
    });

// Populate dropdown with ways
function populateRoleSelector() {
    const selector = document.getElementById('roleSelector');
    selector.innerHTML = '<option value=""></option>';  // Reset
    waysData.forEach(way => {
        const option = document.createElement('option');
        option.value = way.name;
        option.textContent = way.name;
        selector.appendChild(option);
    });
}

// Add change listeners to all skill selects
function addSkillListeners() {
    Object.values(SKILL_ID_MAP).forEach(id => {
        const skillSelect = document.getElementById(id);
        if (skillSelect) {
            skillSelect.addEventListener('change', updateWayOptions);
        }
    });
}

// Enable/disable ways based on req skill != first option (untrained)
function updateWayOptions() {
    const selector = document.getElementById('roleSelector');
    waysData.forEach(way => {
        const skillSelect = document.getElementById(way.skillId);
        const isQualified = skillSelect && skillSelect.selectedIndex !== 0;  // Assuming index 0 is untrained/empty
        const option = selector.querySelector(`option[value="${way.name}"]`);
        if (option) {
            option.disabled = !isQualified;
            // Optionally hide: option.style.display = isQualified ? '' : 'none';
        }
    });
}