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

// Updated skill map based on provided skills
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
    // Add attack skills if they are separate and used in the sheet
    //'Strikes': 'strikesSkillRank',
    //'Blasts': 'blastsSkillRank',
    //'Scolds': 'scoldsSkillRank',
};

// Add this map after SKILL_ID_MAP
const SKILL_MOD_MAP = {
    'athleticsSkillRank': 'mightValue',
    'forceSkillRank': 'mightValue',
    'acrobaticsSkillRank': 'agilityValue',
    'sneakSkillRank': 'agilityValue',
    'enduranceSkillRank': 'brawnValue',
    'poiseSkillRank': 'brawnValue',
    'loreSkillRank': 'willValue',
    'tinkeringSkillRank': 'willValue',
    'deceptionSkillRank': 'witValue',
    'insightSkillRank': 'witValue',
    'awarenessSkillRank': 'resolveValue',
    'survivalSkillRank': 'resolveValue',
    'compelSkillRank': 'vigorValue',
    'rouseSkillRank': 'vigorValue',
    'assureSkillRank': 'empathyValue',
    'charmSkillRank': 'empathyValue',
    'calmSkillRank': 'faithValue',
    'commandSkillRank': 'faithValue',
};

const ATTRIBUTE_GROUPS = {
    physical: {
        priorityId: 'bodyPriority',
        pointsId: 'physicalAttributePoints',
        primaryValueId: 'bodyValue',
        subIds: ['mightValue', 'agilityValue', 'brawnValue']
    },
    mental: {
        priorityId: 'mindPriority',
        pointsId: 'mentalAttributePoints',
        primaryValueId: 'mindValue',
        subIds: ['willValue', 'witValue', 'resolveValue']
    },
    spirit: {
        priorityId: 'spiritPriority',
        pointsId: 'spiritAttributePoints',
        primaryValueId: 'spiritValue',
        subIds: ['vigorValue', 'faithValue', 'empathyValue']
    }
};

let waysData = [];

// Fetch and process ways
fetch(WAYS_CSV_URL)
    .then(r => { if (!r.ok) throw Error(r.status); return r.text(); })
    .then(text => {
        const rows = parseWaysCSV(text);

        // Log rows for debugging
        console.log('Parsed Rows:', rows);

        // Find include row - make matching case-insensitive and trim
        let includeRowIdx = rows.findIndex(row => (row[0] || '').toLowerCase().trim().includes('include'));

        if (includeRowIdx === -1) {
            console.error('Missing "Include" row in Ways CSV');
            return;
        }

        const includeRow = rows[includeRowIdx];

        // Log include row
        console.log('Include Row:', includeRow);

        // Collect ways where include === 'TRUE' or 'true' or '1'
        for (let col = 1; col < includeRow.length; col++) {
            const includeValue = (includeRow[col] || '').toUpperCase().trim();
            console.log(`Column ${col} Include: ${includeValue}`);
            if (includeValue === 'TRUE' || includeValue === '1') {  // Handle possible '1' for checkbox
                const props = {};
                rows.forEach((row, rowIdx) => {
                    const key = (row[0] || '').trim().toLowerCase();
                    if (key) {
                        props[key] = (row[col] || '').trim();
                    }
                });

                // Log props for this column
                console.log(`Props for Column ${col}:`, props);

                const nameKey = Object.keys(props).find(k => k.includes('way name'));
                const reqSkillKey = Object.keys(props).find(k => k.includes('required skill'));

                const name = nameKey ? props[nameKey] : '';
                const reqSkill = reqSkillKey ? props[reqSkillKey] : '';

                if (name && reqSkill) {
                    const normalizedReqSkill = reqSkill.trim(); // Exact match
                    const skillId = normalizedReqSkill === 'Any' ? 'Any' : SKILL_ID_MAP[normalizedReqSkill];
                    if (skillId || normalizedReqSkill === 'Any') {
                        waysData.push({ name, props, reqSkill: normalizedReqSkill, skillId });
                        console.log(`Added Way: ${name}, Req: ${normalizedReqSkill}, ID: ${skillId}`);
                    } else {
                        console.warn(`Skipping ${name}: No matching skill ID for "${normalizedReqSkill}" in SKILL_ID_MAP`);
                    }
                } else {
                    console.warn(`Skipping Column ${col}: Missing name or reqSkill`);
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

// Modify addSkillListeners to include update
function addSkillListeners() {
    Object.values(SKILL_ID_MAP).forEach(id => {
        const skillSelect = document.getElementById(id);
        if (skillSelect) {
            skillSelect.addEventListener('change', () => {
                updateWayOptions();
                calculateSkillPoints();
                updateSkillModAndPassive(id);
            });
        }
    });
}

// Update way options
function updateWayOptions() {
    const selector = document.getElementById('roleSelector');
    waysData.forEach(way => {
        let isQualified = false;
        if (way.reqSkill === 'Any') {
            // Check if any skill is not untrained (selectedIndex !== 0)
            isQualified = Object.values(SKILL_ID_MAP).some(id => {
                const skillSelect = document.getElementById(id);
                return skillSelect && skillSelect.selectedIndex !== 0;
            });
        } else {
            const skillSelect = document.getElementById(way.skillId);
            isQualified = skillSelect && skillSelect.selectedIndex !== 0;
        }
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
        // Find keys case-insensitively for talent, foci, etc.
        const talentNameKey = Object.keys(way.props).find(k => k.toLowerCase().includes('talent name'));
        const talentDescKey = Object.keys(way.props).find(k => k.toLowerCase().includes('talent description'));
        const fociNameKey = Object.keys(way.props).find(k => k.toLowerCase().includes('foci name'));
        const fociCostKey = Object.keys(way.props).find(k => k.toLowerCase().includes('foci cost'));
        const fociEffectKey = Object.keys(way.props).find(k => k.toLowerCase().includes('foci effect'));
        const attackSkillKey = Object.keys(way.props).find(k => k.toLowerCase().includes('attack skill'));
        const primaryAttrKey = Object.keys(way.props).find(k => k.toLowerCase().includes('primary attribute'));

        document.getElementById('rTalentName').innerText = talentNameKey ? way.props[talentNameKey] || way.name : way.name;
        document.getElementById('rTalentDesc').innerText = talentDescKey ? way.props[talentDescKey] : '';
        document.getElementById('rManName').innerText = fociNameKey ? way.props[fociNameKey] : '';
        document.getElementById('rManCost').innerText = fociCostKey ? way.props[fociCostKey] : '';
        document.getElementById('rManEffect').innerText = fociEffectKey ? way.props[fociEffectKey] : '';

        // Set the attack/required skill to 3:Trained if not already higher
        const attackSkill = (attackSkillKey ? way.props[attackSkillKey] : way.reqSkill) || way.reqSkill;
        const skillId = SKILL_ID_MAP[attackSkill];
        if (skillId) {
            const skillSelect = document.getElementById(skillId);
            if (skillSelect && parseInt(skillSelect.value) < 3) {
                skillSelect.value = '3';
                skillSelect.dispatchEvent(new Event('change'));
            }
        }

        // Set primary attribute priority to value '1'
        const primaryAttr = primaryAttrKey ? way.props[primaryAttrKey].trim() : '';
        let priorityId;
        if (primaryAttr === 'Body') {
            priorityId = 'bodyPriority';
        } else if (primaryAttr === 'Mind') {
            priorityId = 'mindPriority';
        } else if (primaryAttr === 'Spirit') {
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
        updateAllSkillModsAndPassives(); // Ensure updates after potential subattribute adjustments
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
    calculateAttributeValues();
    updateAttributeGroups();
    updateAllSkillModsAndPassives(); // Ensure updates after potential changes
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
            input.setAttribute('max', primaryMax);
            let val = parseInt(input.value) || 0;
            if (val > primaryMax) val = primaryMax;
            if (val < 0) val = 0;
            input.value = val;
            sum += val;
        }
    });

    const remaining = totalPoints - sum;
    const pointsElement = document.getElementById(group.pointsId);
    pointsElement.innerText = remaining;
    // Add .hidden class if remaining is 0, remove otherwise
    if (remaining === 0) {
        pointsElement.classList.add('hidden');
    } else {
        pointsElement.classList.remove('hidden');
    }
    // Add this to update mods/passives after potential subattribute value changes
    group.subIds.forEach(subId => updateSkillsForMod(subId));
}

// Add this function
function updateSkillModAndPassive(skillId) {
    const skillSelect = document.getElementById(skillId);
    if (!skillSelect) return;

    const skillValue = parseInt(skillSelect.value) || 0;
    const subId = SKILL_MOD_MAP[skillId];
    if (!subId) return;

    const subInput = document.getElementById(subId);
    if (!subInput) return;

    const modValue = parseInt(subInput.value) || 0;
    const skillName = skillId.replace('Rank', '');

    const modDisplay = document.getElementById(skillName + 'Mod');
    if (modDisplay) {
        modDisplay.innerText = modValue;
    }

    const passiveDisplay = document.getElementById(skillName + 'Passive');
    if (passiveDisplay) {
        passiveDisplay.innerText = 2 + skillValue + modValue;
    }
}

// Add this function
function updateSkillsForMod(subId) {
    const skills = Object.keys(SKILL_MOD_MAP).filter(skill => SKILL_MOD_MAP[skill] === subId);
    skills.forEach(skillId => updateSkillModAndPassive(skillId));
}

// Add this function
function updateAllSkillModsAndPassives() {
    Object.keys(SKILL_ID_MAP).forEach(skillId => updateSkillModAndPassive(skillId));
}

// Modify addSubListeners to include update
function addSubListeners() {
    Object.values(ATTRIBUTE_GROUPS).forEach(group => {
        group.subIds.forEach(subId => {
            const input = document.getElementById(subId);
            if (input) {
                input.addEventListener('change', () => {
                    updateAttributeGroup(group);
                    updateSkillsForMod(subId);
                });
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
                calculateAttributeValues();
                updateAttributeGroups();
                updateAllSkillModsAndPassives(); // Ensure updates after changes
            });
        }
    });
}

// Call initial calculations on load
window.addEventListener('load', () => {
    calculateSkillPoints();
    calculateAbilities();
    calculateAttributeValues();
    updateAttributeGroups();
    addPriorityListeners();
    addSubListeners();
    updateAllSkillModsAndPassives(); // Add this line
});