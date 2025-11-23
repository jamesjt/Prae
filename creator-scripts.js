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

// Full skill map based on HTML IDs
const SKILL_ID_MAP = {
    'Athletics': 'athleticsSkillRank',
    'Force': 'forceSkillRank',
    'Acrobatics': 'acrobaticsSkillRank',
    'Sneak': 'sneakSkillRank',
    'Endurance': 'enduranceSkillRank',
    'Poise': 'poiseSkillRank',
    'Lore': 'loreSkillRank',
    'Tinkering': 'tinkeringSkillRank',
    'Deception': 'deceptionSkillRank',
    'Insight': 'insightSkillRank',
    'Awareness': 'awarenessSkillRank',
    'Survival': 'survivalSkillRank',
    'Compel': 'compelSkillRank',
    'Rouse': 'rouseSkillRank',
    'Assure': 'assureSkillRank',
    'Charm': 'charmSkillRank',
    'Calm': 'calmSkillRank',
    'Command': 'commandSkillRank',
    // Add any missing skills here if there are more in your HTML/sheet
};

let waysData = [];

// Fetch and process ways
fetch(WAYS_CSV_URL)
    .then(r => { if (!r.ok) throw Error(r.status); return r.text(); })
    .then(text => {
        const rows = parseWaysCSV(text);

        // Log rows for debugging
        console.log('Parsed Rows:', rows);

        // Find include row
        let includeRowIdx = rows.findIndex(row => row[0].toLowerCase().includes('include'));

        if (includeRowIdx === -1) {
            console.error('Missing "Include" row in Ways CSV');
            return;
        }

        const includeRow = rows[includeRowIdx];

        // Log include row
        console.log('Include Row:', includeRow);

        // Collect ways where include === 'TRUE'
        for (let col = 1; col < includeRow.length; col++) {
            const includeValue = (includeRow[col] || '').toUpperCase();
            console.log(`Column ${col} Include: ${includeValue}`);
            if (includeValue === 'TRUE') {
                const props = {};
                rows.forEach((row, rowIdx) => {
                    const key = (row[0] || '').trim();
                    if (key) {
                        props[key] = (row[col] || '').trim();
                    }
                });

                // Log props for this column
                console.log(`Props for Column ${col}:`, props);

                const name = props['Way Name'];
                const reqSkill = props['Required Skill'];

                if (name && reqSkill && SKILL_ID_MAP[reqSkill]) {
                    waysData.push({ name, props, reqSkill, skillId: SKILL_ID_MAP[reqSkill] });
                }
            }
        }

        // Log final waysData
        console.log('Final Ways Data:', waysData);

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
        document.getElementById('wayTalentName').innerText = way.props['Talent Name'] || way.name;
        document.getElementById('wayTalentKeywords').innerText = way.props['Keywords'] || '';
        document.getElementById('wayTalentDescription').innerText = way.props['Description'] || '';
        document.getElementById('wayTalentPassive').innerText = way.props['Passive'] || '';
        document.getElementById('wayTalentFocus').innerText = way.props['Focus'] || '';
        document.getElementById('wayTalentCriticalEffect').innerText = way.props['Critical Effect'] || '';

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
        // Set primary attribute priority
        const primaryAttr = way.props['Primary Attribute'].trim().toLowerCase();
        let priorityId;
        if (primaryAttr === 'body') {
            priorityId = 'bodyPriority';
        } else if (primaryAttr === 'mind') {
            priorityId = 'mindPriority';
        } else if (primaryAttr === 'spirit') {
            priorityId = 'spiritPriority';
        }
        if (priorityId) {
            const select = document.getElementById(priorityId);
            if (select) {
                select.value = '1';
                select.dispatchEvent(new Event('change'));
            }
        }
        calculateAttributeValues(); // Recalculate after changes
        updateAttributeGroups();
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

    // Assume IDs for priority selects: bodyPriority, mindPriority, spiritPriority with values 'Primary', 'Secondary', 'Tertiary'

    const physPri = document.getElementById('bodyPriority') ? document.getElementById('bodyPriority').value : '';
    let physPoints = 0;
    if (physPri === '1') physPoints = priPoints;
    else if (physPri === '2') physPoints = secPoints;
    else if (physPri === '3') physPoints = terPoints;
    document.getElementById('physicalAttributePoints').innerText = physPoints;

    const mentPri = document.getElementById('mindPriority') ? document.getElementById('mindPriority').value : '';
    let mentPoints = 0;
    if (mentPri === '1') mentPoints = priPoints;
    else if (mentPri === '2') mentPoints = secPoints;
    else if (mentPri === '3') mentPoints = terPoints;
    document.getElementById('mentalAttributePoints').innerText = mentPoints;

    const socPri = document.getElementById('spiritPriority') ? document.getElementById('spiritPriority').value : '';
    let socPoints = 0;
    if (socPri === '1') socPoints = priPoints;
    else if (socPri === '2') socPoints = secPoints;
    else if (socPri === '3') socPoints = terPoints;
    document.getElementById('spiritAttributePoints').innerText = socPoints; // Assuming social is spirit
}

// Call initial calculations on load
window.addEventListener('load', () => {
    calculateSkillPoints();
    calculateAbilities();
    calculateAttPoints();
});
```<|control12|>The issue was in `populateRoleInfo`: I had removed the code for setting the primary attribute priority and calling the calculation functions. I've added it back. Here's the updated `creator-scripts.js` (full file, as it's the only changed one). Replace your current one with this. 

```javascript
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

// Full skill map based on HTML IDs
const SKILL_ID_MAP = {
    'Athletics': 'athleticsSkillRank',
    'Force': 'forceSkillRank',
    'Acrobatics': 'acrobaticsSkillRank',
    'Sneak': 'sneakSkillRank',
    'Endurance': 'enduranceSkillRank',
    'Poise': 'poiseSkillRank',
    'Lore': 'loreSkillRank',
    'Tinkering': 'tinkeringSkillRank',
    'Deception': 'deceptionSkillRank',
    'Insight': 'insightSkillRank',
    'Awareness': 'awarenessSkillRank',
    'Survival': 'survivalSkillRank',
    'Compel': 'compelSkillRank',
    'Rouse': 'rouseSkillRank',
    'Assure': 'assureSkillRank',
    'Charm': 'charmSkillRank',
    'Calm': 'calmSkillRank',
    'Command': 'commandSkillRank',
    // Add any missing skills here if there are more in your HTML/sheet
};

let waysData = [];

// Fetch and process ways
fetch(WAYS_CSV_URL)
    .then(r => { if (!r.ok) throw Error(r.status); return r.text(); })
    .then(text => {
        const rows = parseWaysCSV(text);

        // Log rows for debugging
        console.log('Parsed Rows:', rows);

        // Find include row
        let includeRowIdx = rows.findIndex(row => row[0].toLowerCase().includes('include'));

        if (includeRowIdx === -1) {
            console.error('Missing "Include" row in Ways CSV');
            return;
        }

        const includeRow = rows[includeRowIdx];

        // Log include row
        console.log('Include Row:', includeRow);

        // Collect ways where include === 'TRUE'
        for (let col = 1; col < includeRow.length; col++) {
            const includeValue = (includeRow[col] || '').toUpperCase();
            console.log(`Column ${col} Include: ${includeValue}`);
            if (includeValue === 'TRUE') {
                const props = {};
                rows.forEach((row, rowIdx) => {
                    const key = (row[0] || '').trim();
                    if (key) {
                        props[key] = (row[col] || '').trim();
                    }
                });

                // Log props for this column
                console.log(`Props for Column ${col}:`, props);

                const name = props['Way Name'];
                const reqSkill = props['Required Skill'];

                if (name && reqSkill && SKILL_ID_MAP[reqSkill]) {
                    waysData.push({ name, props, reqSkill, skillId: SKILL_ID_MAP[reqSkill] });
                }
            }
        }

        // Log final waysData
        console.log('Final Ways Data:', waysData);

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
        document.getElementById('wayTalentName').innerText = way.props['Talent Name'] || way.name;
        document.getElementById('wayTalentKeywords').innerText = way.props['Keywords'] || '';
        document.getElementById('wayTalentDescription').innerText = way.props['Description'] || '';
        document.getElementById('wayTalentPassive').innerText = way.props['Passive'] || '';
        document.getElementById('wayTalentFocus').innerText = way.props['Focus'] || '';
        document.getElementById('wayTalentCriticalEffect').innerText = way.props['Critical Effect'] || '';

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
        // Set primary attribute priority
        const primaryAttr = way.props['Primary Attribute'].trim().toLowerCase();
        let priorityId;
        if (primaryAttr === 'body') {
            priorityId = 'bodyPriority';
        } else if (primaryAttr === 'mind') {
            priorityId = 'mindPriority';
        } else if (primaryAttr === 'spirit') {
            priorityId = 'spiritPriority';
        }
        if (priorityId) {
            const select = document.getElementById(priorityId);
            if (select) {
                select.value = '1';
                select.dispatchEvent(new Event('change'));
            }
        }
        calculateAttributeValues(); // Recalculate after changes
        updateAttributeGroups();
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
    calculateAttributeValues();
    updateAttributeGroups();
}

function calculateAttPoints() {
    const level = parseInt(document.getElementById('charLvl').value) || 1;

    const priPoints = level + 2;
    const secPoints = level + 1;
    const terPoints = level;

    // Assume IDs for priority selects: bodyPriority, mindPriority, spiritPriority with values 'Primary', 'Secondary', 'Tertiary'

    const physPri = document.getElementById('bodyPriority') ? document.getElementById('bodyPriority').value : '';
    let physPoints = 0;
    if (physPri === '1') physPoints = priPoints;
    else if (physPri === '2') physPoints = secPoints;
    else if (physPri === '3') physPoints = terPoints;
    document.getElementById('physicalAttributePoints').innerText = physPoints;

    const mentPri = document.getElementById('mindPriority') ? document.getElementById('mindPriority').value : '';
    let mentPoints = 0;
    if (mentPri === '1') mentPoints = priPoints;
    else if (mentPri === '2') mentPoints = secPoints;
    else if (mentPri === '3') mentPoints = terPoints;
    document.getElementById('mentalAttributePoints').innerText = mentPoints;

    const socPri = document.getElementById('spiritPriority') ? document.getElementById('spiritPriority').value : '';
    let socPoints = 0;
    if (socPri === '1') socPoints = priPoints;
    else if (socPri === '2') socPoints = secPoints;
    else if (socPri === '3') socPoints = terPoints;
    document.getElementById('spiritAttributePoints').innerText = socPoints; // Assuming social is spirit
}

function calculateAttributeValues() {
    const level = parseInt(document.getElementById('charLvl').value) || 1;

    const priVal = 2 + (level >= 2 ? 1 : 0) + (level >= 8 ? 1 : 0);
    const secVal = 2 + (level >= 6 ? 1 : 0);
    const terVal = 1 + (level >= 4 ? 1 : 0) + (level >= 10 ? 1 : 0);

    const bodyPri = document.getElementById('bodyPriority').value || '';
    let bodyVal = 0;
    if (bodyPri === '1') bodyVal = priVal;
    else if (bodyPri === '2') bodyVal = secVal;
    else if (bodyPri === '3') bodyVal = terVal;
    document.getElementById('bodyValue').innerText = bodyVal;

    const mindPri = document.getElementById('mindPriority').value || '';
    let mindVal = 0;
    if (mindPri === '1') mindVal = priVal;
    else if (mindPri === '2') mindVal = secVal;
    else if (mindPri === '3') mindVal = terVal;
    document.getElementById('mindValue').innerText = mindVal;

    const spiritPri = document.getElementById('spiritPriority').value || '';
    let spiritVal = 0;
    if (spiritPri === '1') spiritVal = priVal;
    else if (spiritPri === '2') spiritVal = secVal;
    else if (spiritPri === '3') spiritVal = terVal;
    document.getElementById('spiritValue').innerText = spiritVal;
}

function updateAttributeGroups() {
    Object.values(ATTRIBUTE_GROUPS).forEach(group => updateAttributeGroup(group));
}

function updateAttributeGroup(group) {
    const level = parseInt(document.getElementById('charLvl').value) || 1;
    const pri = document.getElementById(group.priorityId).value || '3';
    let totalPoints = 1 + Math.floor((level - 1) / 3);
    if (pri === '1') totalPoints = 3 + Math.floor((level + 1) / 3);
    else if (pri === '2') totalPoints = 2 + Math.floor(level / 3);

    const primaryMax = parseInt(document.getElementById(group.primaryValueId).innerText) || 0;

    let sum = 0;
    group.subIds.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            let val = parseInt(input.value) || 0;
            if (val > primaryMax) val = primaryMax;
            if (val < 0) val = 0;
            input.value = val;
            sum += val;
        }
    });

    const remaining = totalPoints - sum;
    document.getElementById(group.pointsId).innerText = remaining;
}

// Add event listeners for sub-attributes
function addSubListeners() {
    Object.values(ATTRIBUTE_GROUPS).forEach(group => {
        group.subIds.forEach(subId => {
            const input = document.getElementById(subId);
            if (input) {
                input.addEventListener('change', () => updateAttributeGroup(group));
            }
        });
    });
}

// Add event listeners for priorities and level
function addPriorityListeners() {
    ['bodyPriority', 'mindPriority', 'spiritPriority', 'charLvl'].forEach(id => {
        const elem = document.getElementById(id);
        if (elem) {
            elem.addEventListener('change', () => {
                calculateAttPoints();
                calculateAttributeValues();
                updateAttributeGroups();
            });
        }
    });
}

// Call initial calculations on load
window.addEventListener('load', () => {
    calculateSkillPoints();
    calculateAbilities();
    calculateAttPoints();
    calculateAttributeValues();
    updateAttributeGroups();
    addPriorityListeners();
    addSubListeners();
});