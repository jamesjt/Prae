const WAYS_CSV_URL = 'https://docs.google.com/spreadsheets/d/1OIAs6EFgLFKG3QN_b4Vtm48BwSFb7VwDxOXWhkotXz8/pub?gid=53126780&single=true&output=csv';

// Adapted parseCSV to return 2D array
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
            else if (char === ',' ) { currentRow.push(currentValue.trim()); currentValue = ''; i++; continue; }
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

// Expand with all skill names and their IDs (add more as per your HTML)
const SKILL_ID_MAP = {
    'Acrobatics': 'acrobaticsSkillRank',
    'Might': 'mightSkillRank',
    'Brawn': 'brawnSkillRank',
    'Agility': 'agilitySkillRank',
    'Will': 'willSkillRank',
    'Resolve': 'resolveSkillRank',
    'Wit': 'witSkillRank',
    'Vigor': 'vigorSkillRank',
    'Faith': 'faithSkillRank',
    'Empathy': 'empathySkillRank',
    // Add all other skills, e.g., 'Strikes': 'strikesSkillRank', 'Blasts': 'blastsSkillRank', 'Scolds': 'scoldsSkillRank', etc.
};

let waysData = [];

// Fetch and process ways
fetch(WAYS_CSV_URL)
    .then(r => { if (!r.ok) throw Error(r.status); return r.text(); })
    .then(text => {
        const rows = parseWaysCSV(text);

        // Find include row
        let includeRowIdx = rows.findIndex(row => row[0].toLowerCase().includes('include'));

        if (includeRowIdx === -1) {
            console.error('Missing "Include" row in Ways CSV');
            return;
        }

        const includeRow = rows[includeRowIdx];

        // Collect ways where include === 'TRUE'
        for (let col = 1; col < includeRow.length; col++) {
            if (includeRow[col].toUpperCase() === 'TRUE') {
                const props = {};
                rows.forEach(row => {
                    const key = row[0].trim();
                    if (key) {
                        props[key] = row[col].trim() || '';
                    }
                });

                const name = props['Way Name'];
                const reqSkill = props['Required Skill'];

                if (name && reqSkill && SKILL_ID_MAP[reqSkill]) {
                    waysData.push({ name, props, reqSkill, skillId: SKILL_ID_MAP[reqSkill] });
                }
            }
        }

        populateRoleSelector();
        addSkillListeners();
        updateWayOptions(); // Initial check
    })
    .catch(err => {
        console.error('Error loading Ways CSV:', err);
        // Fallback: hardcoded ways if needed
    });

// Populate dropdown
function populateRoleSelector() {
    const selector = document.getElementById('roleSelector');
    selector.innerHTML = '<option value=""></option>';
    waysData.forEach(way => {
        const option = document.createElement('option');
        option.value = way.name;
        option.textContent = way.name;
        selector.appendChild(option);
    });
}

// Add listeners
function addSkillListeners() {
    Object.values(SKILL_ID_MAP).forEach(id => {
        const skillSelect = document.getElementById(id);
        if (skillSelect) {
            skillSelect.addEventListener('change', () => {
                updateWayOptions();
                calculateSkillPoints();
            });
        }
    });
}

// Update way options
function updateWayOptions() {
    const selector = document.getElementById('roleSelector');
    waysData.forEach(way => {
        const skillSelect = document.getElementById(way.skillId);
        const isQualified = skillSelect && skillSelect.selectedIndex !== 0; // Not the first option (untrained)
        const option = selector.querySelector(`option[value="${way.name}"]`);
        if (option) {
            option.disabled = !isQualified;
        }
    });
}

// Define missing functions

function populateRoleInfo(event) {
    const value = event.target.value;
    if (!value) return;

    const way = waysData.find(w => w.name === value);
    if (way) {
        // Set talent and maneuver using props (adjust keys based on your sheet)
        document.getElementById('rTalentName').innerText = way.props['Talent Name'] || way.name;
        document.getElementById('rTalentDesc').innerText = way.props['Talent Description'] || '';
        document.getElementById('rManName').innerText = way.props['Foci Name'] || '';
        document.getElementById('rManCost').innerText = way.props['Foci Cost'] || '';
        document.getElementById('rManEffect').innerText = way.props['Foci Effect'] || '';

        // Set the attack/required skill to 3:Trained if not already higher
        const attackSkill = way.props['Attack Skill'] || way.reqSkill;
        const skillId = SKILL_ID_MAP[attackSkill];
        if (skillId) {
            const skillSelect = document.getElementById(skillId);
            if (skillSelect && parseInt(skillSelect.value) < 3) {
                skillSelect.value = '3';
                skillSelect.dispatchEvent(new Event('change'));
            }
        }
    }
}

function setSkillValues(event) {
    calculateSkillPoints();
}

function skillPoints(event) {
    calculateSkillPoints();
}

function calculateSkillPoints() {
    const level = parseInt(document.getElementById('charLvl').value) || 1;
    const totalPoints = level * 3 + 9; // Adjust formula if needed; for level 1 = 12
    let spent = 0;

    Object.values(SKILL_ID_MAP).forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            spent += parseInt(select.value) || 0;
        }
    });

    const remaining = totalPoints - spent;
    document.getElementById('skillPoints').innerText = remaining;

    const maxRankValue = level + 2;
    const rankNames = ['Untrained', 'Basic', 'Trained', 'Expert', 'Master']; // Adjust if ranks differ
    const maxRankName = rankNames[maxRankValue] || 'Legendary';
    document.getElementById('maxSkillRank').innerText = maxRankValue + ':' + maxRankName;
}

// Additional functions for abilities and attributes (to complete)

function setAbilityAmount(event) {
    calculateAbilities();
}

function calculateAbilities() {
    const level = parseInt(document.getElementById('charLvl').value) || 1;

    const talentAdd = parseInt(document.getElementById('talentAmount').value) || 1;
    const fociAdd = parseInt(document.getElementById('nonAtkManAmount').value) || 1;
    const arcanaAdd = parseInt(document.getElementById('atkManAmount').value) || 2;

    const totalAbilities = talentAdd + fociAdd + arcanaAdd + 2; // + way talent & foci; adjust if needed to match 7
    document.getElementById('abilityNumber').innerText = totalAbilities;

    const freePoints = level + 1; // For level 1 = 2
    const extra = (talentAdd - 1) + (fociAdd - 1) + (arcanaAdd - 2);
    const remaining = freePoints - Math.max(0, extra); // Prevent negative
    document.getElementById('remainingAbilities').innerText = remaining;
}

function talentAmount(event) {
    const value = parseInt(event.target.value) || 1;
    document.getElementById('talentTable1').style.display = '';
    document.getElementById('talentTable2').style.display = value >= 2 ? '' : 'none';
    document.getElementById('talentTable3').style.display = value >= 3 ? '' : 'none';
    calculateAbilities();
}

function nonAtkManAmount(event) {
    const value = parseInt(event.target.value) || 1;
    document.getElementById('nonAtkManTable1').style.display = '';
    document.getElementById('nonAtkManTable2').style.display = value >= 2 ? '' : 'none';
    document.getElementById('nonAtkManTable3').style.display = value >= 3 ? '' : 'none';
    calculateAbilities();
}

function atkManAmount(event) {
    const value = parseInt(event.target.value) || 2;
    document.getElementById('atkManTable1').style.display = '';
    document.getElementById('atkManTable2').style.display = '';
    document.getElementById('atkManTable3').style.display = value >= 3 ? '' : 'none';
    document.getElementById('atkManTable4').style.display = value >= 4 ? '' : 'none';
    calculateAbilities();
}

function setAttPoints(event) {
    calculateAttPoints();
}

function calculateAttPoints() {
    const level = parseInt(document.getElementById('charLvl').value) || 1;

    const priPoints = level + 2;
    const secPoints = level + 1;
    const terPoints = level;

    // Assume IDs for priority selects: physicalPriority, mentalPriority, socialPriority with values 'Primary', 'Secondary', 'Tertiary'

    const physPri = document.getElementById('physicalPriority') ? document.getElementById('physicalPriority').value : '';
    let physPoints = 0;
    if (physPri === 'Primary') physPoints = priPoints;
    else if (physPri === 'Secondary') physPoints = secPoints;
    else if (physPri === 'Tertiary') physPoints = terPoints;
    document.getElementById('physicalAttributePoints').innerText = physPoints;

    const mentPri = document.getElementById('mentalPriority') ? document.getElementById('mentalPriority').value : '';
    let mentPoints = 0;
    if (mentPri === 'Primary') mentPoints = priPoints;
    else if (mentPri === 'Secondary') mentPoints = secPoints;
    else if (mentPri === 'Tertiary') mentPoints = terPoints;
    document.getElementById('mentalAttributePoints').innerText = mentPoints;

    const socPri = document.getElementById('socialPriority') ? document.getElementById('socialPriority').value : '';
    let socPoints = 0;
    if (socPri === 'Primary') socPoints = priPoints;
    else if (socPri === 'Secondary') socPoints = secPoints;
    else if (socPri === 'Tertiary') socPoints = terPoints;
    document.getElementById('spiritAttributePoints').innerText = socPoints; // Assuming social is spirit
}

// Call initial calculations on load
window.addEventListener('load', () => {
    calculateSkillPoints();
    calculateAbilities();
    calculateAttPoints();
});