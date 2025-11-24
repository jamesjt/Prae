const WAYS_CSV_URL = 'https://docs.google.com/spreadsheets/d/1OIAs6EFgLFKG3QN_b4Vtm48BwSFb7VwDxOXWhkotXz8/pub?gid=53126780&single=true&output=csv';
const PROF_CSV_URL = 'https://docs.google.com/spreadsheets/d/1OIAs6EFgLFKG3QN_b4Vtm48BwSFb7VwDxOXWhkotXz8/pub?gid=715914535&single=true&output=csv';
const ABILITIES_CSV_URL = 'https://docs.google.com/spreadsheets/d/1OIAs6EFgLFKG3QN_b4Vtm48BwSFb7VwDxOXWhkotXz8/pub?gid=1439570479&single=true&output=csv';

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
    'Strike': 'strikeSkillRank',
    'Blast': 'blastSkillRank',
    'Invoke': 'invokeSkillRank',
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
    'strikeSkillRank': 'bodyValue',
    'blastSkillRank': 'mindValue',
    'invokeSkillRank': 'spiritValue',
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
let profData = { strike: [], blast: [], invoke: [] };
let gearData = [];
let abilitiesData = {}; // { skillLower: [{type: 'talent'|'trick', name, details: {keywords, description, passive, active, effect, cost, effectSm, effectBig}}] }

// Fetch and process abilities (talents and tricks)
fetch(ABILITIES_CSV_URL)
    .then(r => { if (!r.ok) throw Error(r.status); return r.text(); })
    .then(text => {
        const rows = parseWaysCSV(text);
        console.log('Parsed Abilities Rows:', rows);

        const skills = rows[0].slice(1).map(s => s.trim().toLowerCase()); // Skills from row 0, col 1+

        skills.forEach((skill, colIndex) => {
            let currentType = '';
            let currentAbility = null;
            rows.slice(1).forEach(row => {
                const key = row[0].trim().toLowerCase();
                const value = row[colIndex + 1] ? row[colIndex + 1].trim() : '';
                if (key === 'talent' || key === 'trick') {
                    if (currentAbility) {
                        saveAbility(skill, currentAbility);
                    }
                    currentType = key;
                    currentAbility = { type: currentType, name: value || '', details: {} };
                } else if (currentAbility && key && value) {
                    currentAbility.details[key] = value;
                } else if (!key && !value && currentAbility) { // Empty row ends block
                    saveAbility(skill, currentAbility);
                    currentAbility = null;
                }
            });
            if (currentAbility) {
                saveAbility(skill, currentAbility);
            }
        });

        function saveAbility(skill, ability) {
            if (!abilitiesData[skill]) abilitiesData[skill] = [];
            abilitiesData[skill].push(ability);
        }

        console.log('Abilities Data:', abilitiesData);
        updateTalentSelectors(); // Initial
        updateTrickSelectors();
    })
    .catch(err => {
        console.error('Error loading Abilities CSV:', err);
    });

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

// Fetch and process proficiency and gear options from Web Ref sheet
fetch(PROF_CSV_URL)
    .then(r => { if (!r.ok) throw Error(r.status); return r.text(); })
    .then(text => {
        const rows = parseWaysCSV(text);

        // Assume first row is headers
        const headers = rows[0].map(h => h.trim().toLowerCase());

        const strikeCol = headers.findIndex(h => h.includes('strike'));
        const blastCol = headers.findIndex(h => h.includes('blast'));
        const invokeCol = headers.findIndex(h => h.includes('invoke'));
        const gearCol = headers.findIndex(h => h.includes('gear'));
        const loadCol = headers.findIndex(h => h.includes('load'));

        if (strikeCol !== -1) {
            profData.strike = rows.slice(1).map(row => row[strikeCol].trim()).filter(v => v);
        }
        if (blastCol !== -1) {
            profData.blast = rows.slice(1).map(row => row[blastCol].trim()).filter(v => v);
        }
        if (invokeCol !== -1) {
            profData.invoke = rows.slice(1).map(row => row[invokeCol].trim()).filter(v => v);
        }

        if (gearCol !== -1 && loadCol !== -1) {
            gearData = rows.slice(1).map(row => ({
                gear: row[gearCol].trim(),
                load: row[loadCol].trim()
            })).filter(g => g.gear);
        }

        // Log for debugging
        console.log('Proficiency Data:', profData);
        console.log('Gear Data:', gearData);

        // Populate all selects for each type
        populateProfSelects('strike', profData.strike);
        populateProfSelects('blast', profData.blast);
        populateProfSelects('invoke', profData.invoke);

        // Populate gear selects
        populateGearSelects();
    })
    .catch(err => {
        console.error('Error loading Web Ref CSV:', err);
    });

// Function to populate selects for a type
function populateProfSelects(type, options) {
    const maxSelectors = 5; // Assume max rank is 5; adjust if needed
    for (let i = 1; i <= maxSelectors; i++) {
        const select = document.getElementById(type + 'ProfSelect' + i);
        if (select) {
            let html = '<option value=""></option>';
            options.forEach(opt => {
                html += `<option value="${opt}">${opt}</option>`;
            });
            select.innerHTML = html;
        }
    }
}

// Function to populate gear selects
function populateGearSelects() {
    const maxGear = 12; // Assuming 12 gear slots
    for (let i = 1; i <= maxGear; i++) {
        const select = document.getElementById('gearSelect' + i);
        if (select) {
            let html = '<option value=""></option>';
            gearData.forEach(g => {
                html += `<option value="${g.gear}" data-load="${g.load}">${g.gear}</option>`;
            });
            select.innerHTML = html;

            // Add change listener
            select.addEventListener('change', () => {
                const selectedOption = select.options[select.selectedIndex];
                const load = selectedOption.getAttribute('data-load') || '';
                const loadDiv = document.getElementById('gearLoad' + i);
                if (loadDiv) {
                    loadDiv.innerText = load;
                }
                calculateLoad();
            });
        }
    }
    calculateLoad(); // Initial
}

// Function to calculate total load
function calculateLoad() {
    let totalLoad = 0;
    for (let i = 1; i <= 12; i++) {
        const loadDiv = document.getElementById('gearLoad' + i);
        if (loadDiv) {
            totalLoad += parseInt(loadDiv.innerText) || 0;
        }
    }
    document.getElementById('totalLoad').innerText = totalLoad;
}

// Populate dropdown
function populateRoleSelector() {
    const selector = document.getElementById('roleSelector');
    selector.innerHTML = '<option value="">Select Way</option>';
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
                // Add proficiency update for attack skills
                const attackRankIds = ['strikeSkillRank', 'blastSkillRank', 'invokeSkillRank'];
                if (attackRankIds.includes(id)) {
                    const attackType = id.replace('SkillRank', '').toLowerCase();
                    const rankValue = parseInt(skillSelect.value) || 0;
                    updateProficiencySelectors(attackType, rankValue);
                }
                updateTalentSelectors();
                updateTrickSelectors();
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

// Function to populate talent selectors (now dynamic)
function updateTalentSelectors() {
    const qualified = getQualifiedAbilities('talent');
    const selects = document.querySelectorAll('.talentSelector');
    selects.forEach((select) => {
        let html = '<option value=""></option>';
        qualified.forEach(a => {
            html += `<option value="${a.name}">${a.name}</option>`;
        });
        select.innerHTML = html;
        select.addEventListener('change', () => populateAbilityInfo(select.id, qualified, 'talent'));
    });
}

// Function to populate trick selectors (now dynamic)
function updateTrickSelectors() {
    const qualified = getQualifiedAbilities('trick');
    const selects = document.querySelectorAll('.tricksSelector');
    selects.forEach((select) => {
        let html = '<option value=""></option>';
        qualified.forEach(a => {
            html += `<option value="${a.name}">${a.name}</option>`;
        });
        select.innerHTML = html;
        select.addEventListener('change', () => populateAbilityInfo(select.id, qualified, 'trick'));
    });
}

// Helper to get qualified abilities by type
function getQualifiedAbilities(abilityType) {
    const qualified = [];
    Object.keys(SKILL_ID_MAP).forEach(skillName => {
        const lowerSkill = skillName.toLowerCase();
        const skillId = SKILL_ID_MAP[skillName];
        const select = document.getElementById(skillId);
        if (select && parseInt(select.value) >= 2 && abilitiesData[lowerSkill]) {
            qualified.push(...abilitiesData[lowerSkill].filter(a => a.type === abilityType));
        }
    });
    return qualified;
}

// Function to populate description/details
function populateAbilityInfo(selectId, abilities, type) {
    const value = document.getElementById(selectId).value;
    const ability = abilities.find(a => a.name === value);
    if (!ability) return;

    const descElement = document.getElementById(selectId + 'Description');
    if (!descElement) return;

    descElement.innerHTML = ''; // Clear previous

    const keyOrder = ['keywords', 'description', 'passive', 'active', 'cost', 'trigger', 'effect', 'enhancements', 'augments'];
    const labelMap = {
        keywords: 'Keywords',
        description: 'Description',
        passive: 'Passive',
        active: 'Active',
        cost: 'Cost',
        trigger: 'Trigger',
        effect: 'Effect',
        enhancements: 'Enhancements',
        augments: 'Augments'
    };

    const sortedKeys = Object.keys(ability.details).sort((a, b) => {
        const ia = keyOrder.indexOf(a.toLowerCase());
        const ib = keyOrder.indexOf(b.toLowerCase());
        if (ia === -1 && ib === -1) return a.localeCompare(b);
        if (ia === -1) return 1;
        if (ib === -1) return -1;
        return ia - ib;
    });

    sortedKeys.forEach(rawKey => {
        const key = rawKey.toLowerCase();
        let val = ability.details[rawKey];

        if (!val) return;

        const label = labelMap[key] || key.charAt(0).toUpperCase() + key.slice(1);

        const child = document.createElement('div');
        child.className = `${type}${label}`;
        child.innerHTML = val;
        descElement.appendChild(child);
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
        const shortDescKey = Object.keys(way.props).find(k => k.toLowerCase().includes('short description'));
        const keywordsKey = Object.keys(way.props).find(k => k.toLowerCase().includes('keywords'));
        const descKey = Object.keys(way.props).find(k => k.toLowerCase().includes('description'));
        const passiveKey = Object.keys(way.props).find(k => k.toLowerCase().includes('passive'));
        const focusKey = Object.keys(way.props).find(k => k.toLowerCase().includes('focus'));
        const attackSkillKey = Object.keys(way.props).find(k => k.toLowerCase().includes('attack skill'));
        const primaryAttrKey = Object.keys(way.props).find(k => k.toLowerCase().includes('primary attribute'));
        const criticalEffectKey = Object.keys(way.props).find(k => k.toLowerCase().includes('critical effect'));

        document.getElementById('wayTalentName').innerText = talentNameKey ? way.props[talentNameKey] || way.name : way.name;

        // Populate wayTalentDesc with divs
        const descElement = document.getElementById('wayTalentDesc');
        if (descElement) {
            descElement.innerHTML = ''; // Clear previous

            const details = {
                'passive': passiveKey ? way.props[passiveKey] : '',
                'focus': focusKey ? way.props[focusKey] : '',
                'critical effect': criticalEffectKey ? way.props[criticalEffectKey] : '',
            };

            const keyOrder = ['passive', 'focus','critical effect'];
            keyOrder.forEach(key => {
                const val = details[key];
                if (val) {
                    const child = document.createElement('div');
                    child.className = `talent${key.charAt(0).toUpperCase() + key.slice(1).replace(/\s/g, '')}`;
                    child.innerText = val;
                    descElement.appendChild(child);
                }
            });
        }

        // Set the attack/required skill to 3:Trained if not already higher
        const attackSkill = (attackSkillKey ? way.props[attackSkillKey] : way.reqSkill) || way.reqSkill;
        const skillId = SKILL_ID_MAP[attackSkill];
        if (skillId) {
            const skillSelect = document.getElementById(skillId);
            if (skillSelect && parseInt(skillSelect.value) < 2) {
                skillSelect.value = '2';
                skillSelect.dispatchEvent(new Event('change'));
            }
        }

        // Set the attack type skill rank to 2 if not already higher
        const attackType = attackSkillKey ? way.props[attackSkillKey].trim() : '';
        const attackRankIdMap = {
            'Strike': 'strikeSkillRank',
            'Blast': 'blastSkillRank',
            'Invoke': 'invokeSkillRank'
        };
        const attackRankId = attackRankIdMap[attackType];
        if (attackRankId) {
            const attackSelect = document.getElementById(attackRankId);
            if (attackSelect && parseInt(attackSelect.value) < 2) {
                attackSelect.value = '2';
                attackSelect.dispatchEvent(new Event('change'));
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
    const tricksAdd = parseInt(document.getElementById('tricksAmount').value) || 1;

    const totalAbilities = talentAdd + tricksAdd + 2; // + way talent & foci; adjust if needed to match 7
    document.getElementById('abilityNumber').innerText = totalAbilities;

    const freePoints = level + 1; // For level 1 = 2
    const extra = (talentAdd - 1) + (tricksAdd - 1);
    const remaining = freePoints - Math.max(0, extra); // Prevent negative
    document.getElementById('remainingAbilities').innerText = remaining;
}

function talentAmount() {
    updateTalentTables();
}

function tricksAmount() {
    updateTrickTables();
}

// === TALENTS (Way Talent + Extra Talents) ===
function updateTalentTables() {
    const amountSelect = document.getElementById('talentAmount');
    const extraCount = parseInt(amountSelect.value) || 1;  // 1 = 1 extra → total 2 talents (Way +1)

    const container = document.querySelector('.talentWrapper');

    // Remove only the dynamically created talent tables (keep wayTalent and amount selector)
    container.querySelectorAll('[id^="talentTable"]').forEach(el => el.remove());

    // Create the correct number of extra talent slots
    for (let i = 1; i <= extraCount; i++) {
        const table = document.createElement('div');
        table.id = `talentTable${i}`;
        table.className = 'talent';

        table.innerHTML = `
            <div class="talentHeader">
                <select id="talent${i}" class="talentSelector"></select>
            </div>
            <div id="talent${i}Description" class="talentInfo"></div>
        `;

        container.appendChild(table);
    }

    // Re-populate all talent selectors
    updateTalentSelectors();
    calculateAbilities();
}

// === TRICKS ===
function updateTrickTables() {
    const amountSelect = document.getElementById('tricksAmount');
    const totalTricks = (parseInt(amountSelect.value) || 1) + 1;  // value=1 → 2 tricks

    const container = document.querySelector('.tricksWrapper');

    // Remove all existing trick tables
    container.querySelectorAll('[id^="tricksTable"]').forEach(el => el.remove());

    // Create exactly the number needed
    for (let i = 1; i <= totalTricks; i++) {
        const table = document.createElement('div');
        table.id = `tricksTable${i}`;
        table.className = 'ability-trick';

        table.innerHTML = `
            <select id="tricks${i}" class="tricksSelector"></select>
            <div id="tricks${i}Description"></div>
        `;

        container.appendChild(table);
    }

    updateTrickSelectors();
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

    // Update attack skill mods after primary values change
    updateSkillsForMod('bodyValue');
    updateSkillsForMod('mindValue');
    updateSkillsForMod('spiritValue');
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

    const modValue = parseInt(subInput.tagName === 'INPUT' ? subInput.value : subInput.innerText) || 0;
    const skillName = skillId.replace('SkillRank', '');

    // Update main mod display (div)
    const modDisplay = document.getElementById(skillName + 'Mod');
    if (modDisplay) {
        modDisplay.innerText = modValue;
    }

    // Update damage mod span if it's an attack skill
    const attackSkills = ['strike', 'blast', 'invoke'];
    if (attackSkills.includes(skillName.toLowerCase())) {
        const damageModSpan = document.getElementById(skillName + 'DamageMod');
        if (damageModSpan) {
            damageModSpan.innerText = modValue;
        }
    }

    // Update passive if needed
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
    // Initial proficiency setup for attack skills
    ['strike', 'blast', 'invoke'].forEach(type => {
        const rankSelect = document.getElementById(type + 'SkillRank');
        if (rankSelect) {
            const rankValue = parseInt(rankSelect.value) || 0;
            updateProficiencySelectors(type, rankValue);
        }
    });

    // Add event listeners for talent/trick amount changes
    document.getElementById('talentAmount').addEventListener('change', talentAmount);
    document.getElementById('tricksAmount').addEventListener('change', tricksAmount);

    // Set initial state
    updateTalentTables();
    updateTrickTables();
});

// New function to handle proficiency selectors visibility
function updateProficiencySelectors(attackType, rankValue) {
    // Assume up to a reasonable max, e.g., 5; adjust if needed
    const maxProf = 5;
    for (let i = 1; i <= maxProf; i++) {
        const profElement = document.getElementById(attackType + 'ProfSelector' + i);
        if (profElement) {
            profElement.hidden = i > rankValue;
        }
    }
}