const WAYS_CSV_URL = 'https://docs.google.com/spreadsheets/d/1OIAs6EFgLFKG3QN_b4Vtm48BwSFb7VwDxOXWhkotXz8/pub?gid=53126780&single=true&output=csv';
const PROF_CSV_URL = 'https://docs.google.com/spreadsheets/d/1OIAs6EFgLFKG3QN_b4Vtm48BwSFb7VwDxOXWhkotXz8/pub?gid=715914535&single=true&output=csv';
const ABILITIES_CSV_URL = 'https://docs.google.com/spreadsheets/d/1OIAs6EFgLFKG3QN_b4Vtm48BwSFb7VwDxOXWhkotXz8/pub?gid=1439570479&single=true&output=csv';

const SKILL_ID_MAP = {
    'Athletics': 'athleticsSkillRank', 'Force': 'forceSkillRank', 'Acrobatics': 'acrobaticsSkillRank', 'Sneak': 'sneakSkillRank',
    'Endurance': 'enduranceSkillRank', 'Poise': 'poiseSkillRank', 'Lore': 'loreSkillRank', 'Tinkering': 'tinkeringSkillRank',
    'Deception': 'deceptionSkillRank', 'Insight': 'insightSkillRank', 'Awareness': 'awarenessSkillRank', 'Survival': 'survivalSkillRank',
    'Compel': 'compelSkillRank', 'Rouse': 'rouseSkillRank', 'Assure': 'assureSkillRank', 'Charm': 'charmSkillRank',
    'Calm': 'calmSkillRank', 'Command': 'commandSkillRank', 'Strike': 'strikeSkillRank', 'Blast': 'blastSkillRank', 'Invoke': 'invokeSkillRank'
};

const SKILL_MOD_MAP = {
    'athleticsSkillRank': 'mightValue', 'forceSkillRank': 'mightValue', 'acrobaticsSkillRank': 'agilityValue', 'sneakSkillRank': 'agilityValue',
    'enduranceSkillRank': 'brawnValue', 'poiseSkillRank': 'brawnValue', 'loreSkillRank': 'willValue', 'tinkeringSkillRank': 'willValue',
    'deceptionSkillRank': 'witValue', 'insightSkillRank': 'witValue', 'awarenessSkillRank': 'resolveValue', 'survivalSkillRank': 'resolveValue',
    'compelSkillRank': 'vigorValue', 'rouseSkillRank': 'vigorValue', 'assureSkillRank': 'empathyValue', 'charmSkillRank': 'empathyValue',
    'calmSkillRank': 'faithValue', 'commandSkillRank': 'faithValue', 'strikeSkillRank': 'bodyValue', 'blastSkillRank': 'mindValue', 'invokeSkillRank': 'spiritValue'
};

const ATTRIBUTE_GROUPS = {
    physical: { priorityId: 'bodyPriority', pointsId: 'physicalAttributePoints', primaryValueId: 'bodyValue', subIds: ['mightValue', 'agilityValue', 'brawnValue'] },
    mental:   { priorityId: 'mindPriority', pointsId: 'mentalAttributePoints', primaryValueId: 'mindValue', subIds: ['willValue', 'witValue', 'resolveValue'] },
    spirit:   { priorityId: 'spiritPriority', pointsId: 'spiritAttributePoints', primaryValueId: 'spiritValue', subIds: ['vigorValue', 'faithValue', 'empathyValue'] }
};

let waysData = [], profData = { strike: [], blast: [], invoke: [] }, gearData = [], abilitiesData = {};

// Add near top constants
const MAX_READY_SLOTS = 5;  // Change this to adjust ready slots globally
let packData = [];  // Will be populated from CSV


// ———————————————————————— DATA LOADING ————————————————————————

fetch(ABILITIES_CSV_URL)
    .then(r => { if (!r.ok) throw Error(r.status); return r.text(); })
    .then(text => {
        const parsed = Papa.parse(text, {
            header: false,
            skipEmptyLines: true,
            dynamicTyping: false,
            delimitersToGuess: [',']
        });
        if (parsed.errors.length > 0) {
            console.error('PapaParse errors:', parsed.errors);
            throw new Error('Error parsing Abilities CSV');
        }
        const rows = parsed.data;
        const skills = rows[0].slice(1).map(s => s.trim().toLowerCase());
        skills.forEach((skill, colIndex) => {
            let currentAbility = null;
            for (let r = 1; r < rows.length; r++) {
                const keyCell = rows[r][0];
                const valueCell = rows[r][colIndex + 1];
                const key = keyCell ? keyCell.trim() : '';
                const value = valueCell ? valueCell.trim() : '';
                if (key.match(/^(Talent|Trick|Ritual) \d+ Name$/i)) {
                    if (currentAbility) saveAbility(skill, currentAbility);
                    const typeMatch = key.match(/^(Talent|Trick|Ritual)/i);
                    const type = typeMatch ? typeMatch[0].toLowerCase() : 'unknown';
                    currentAbility = { type, name: value || `(Unnamed ${type})`, skill, details: {} };
                } else if (currentAbility && key && key.includes(' ')) {
                    const detailKey = key.split(' ').slice(2).join(' ');
                    currentAbility.details[detailKey] = value;
                }
            }
            if (currentAbility) saveAbility(skill, currentAbility);
        });
        function saveAbility(skill, ability) {
            if (!abilitiesData[skill]) abilitiesData[skill] = [];
            abilitiesData[skill].push(ability);
        }
        console.log('Abilities Data:', abilitiesData);
        updateTalentSelectors();
        updateTrickSelectors();
    })
    .catch(err => console.error('Error loading Abilities CSV:', err));

fetch(WAYS_CSV_URL)
    .then(r => { if (!r.ok) throw Error(r.status); return r.text(); })
    .then(text => {
        const parsed = Papa.parse(text, {
            header: false,
            skipEmptyLines: true,
            dynamicTyping: false,
            delimitersToGuess: [',']
        });
        if (parsed.errors.length > 0) {
            console.error('PapaParse errors:', parsed.errors);
            throw new Error('Error parsing Ways CSV');
        }
        const rows = parsed.data;
        let includeRowIdx = rows.findIndex(row => (row[0] || '').toLowerCase().trim().includes('include'));
        if (includeRowIdx === -1) return console.error('Missing "Include" row');
        const includeRow = rows[includeRowIdx];
        for (let col = 1; col < includeRow.length; col++) {
            const includeValue = (includeRow[col] || '').toUpperCase().trim();
            if (includeValue === 'TRUE' || includeValue === '1') {
                const props = {};
                rows.forEach(row => {
                    const key = (row[0] || '').trim().toLowerCase();
                    if (key) props[key] = (row[col] || '').trim();
                });
                const nameKey = Object.keys(props).find(k => k.includes('way name'));
                const reqSkillKey = Object.keys(props).find(k => k.includes('required skill'));
                const name = nameKey ? props[nameKey] : '';
                const reqSkill = reqSkillKey ? props[reqSkillKey] : '';
                if (name && reqSkill) {
                    const skillId = reqSkill.trim() === 'Any' ? 'Any' : SKILL_ID_MAP[reqSkill.trim()];
                    if (skillId || reqSkill.trim() === 'Any') {
                        waysData.push({ name, props, reqSkill: reqSkill.trim(), skillId });
                    }
                }
            }
        }
        populateRoleSelector();
        updateWayOptions();
    })
    .catch(err => console.error('Error loading Ways CSV:', err));

fetch(PROF_CSV_URL)
    .then(r => { if (!r.ok) throw Error(r.status); return r.text(); })
    .then(text => {
        const parsed = Papa.parse(text, {
            header: false,
            skipEmptyLines: true,
            dynamicTyping: false,
            delimitersToGuess: [',']
        });
        if (parsed.errors.length > 0) {
            console.error('PapaParse errors:', parsed.errors);
            throw new Error('Error parsing PROF CSV');
        }
        const rows = parsed.data;
        const headers = rows[0].map(h => h.trim());

        // Known suffixes to ignore for main categories
        const suffixes = ['Load', 'Descriptions', 'Containers', 'LoadLimit', 'StowedSlots', 'ReadyUsed', 'Location', 'Cost', 'Bonus', 'Details'];

        // Find main categories: headers starting with 'Gear ' and not ending with a suffix
        const mainCategories = headers.filter(h => h.startsWith('Gear ') && !suffixes.some(s => h.endsWith(s)));

        // For each main category, derive camelPrefix and find related columns
        const categoryConfigs = mainCategories.map(main => {
            const categoryName = main.replace('Gear ', '').trim();
            const camelPrefix = 'Gear' + categoryName.replace(/\s+/g, '');
            const related = headers.filter(h => h.startsWith(camelPrefix)).map(h => ({
                suffix: h.replace(camelPrefix, '').trim(),
                idx: headers.indexOf(h)
            }));
            return {
                mainIdx: headers.indexOf(main),
                category: categoryName,
                related,
                flag: `is${categoryName.replace(/\s+/g, '')}`,
                class: `gear${categoryName.replace(/\s+/g, '')}`
            };
        });

        gearData = [];

        for (let r = 1; r < rows.length; r++) {
            const row = rows[r];
            categoryConfigs.forEach(config => {
                const name = row[config.mainIdx]?.trim();
                if (name) {
                    const item = {
                        name,
                        category: config.category,
                        [config.flag]: true,
                        isPack: config.category === 'Packs' // Special case for packs if needed
                    };
                    // Add related props
                    config.related.forEach(rel => {
                        let val = row[rel.idx]?.trim();
                        if (rel.suffix === 'Load' || rel.suffix === 'LoadLimit' || rel.suffix === 'StowedSlots' || rel.suffix === 'ReadyUsed') {
                            val = parseFloat(val) || 0;
                        } else if (rel.suffix === 'Bonus') {
                            val = parseInt(val) || 0;
                        }
                        if (val !== undefined && val !== '') {
                            item[rel.suffix.toLowerCase()] = val;
                        }
                    });
                    gearData.push(item);
                }
            });
        }

        allOptions = gearData;
        nonPackOptions = gearData.filter(g => !g.isPack);
        generateGearEntries();
    })
    .catch(err => console.error('Error loading PROF CSV:', err));

// Remove any hardcoded gearData assignment outside the fetch (e.g., no gearData = [Sword, Shield] block)
let allOptions = [];
let nonPackOptions = [];
let readyState = Array(MAX_READY_SLOTS).fill(null).map(() => ({ gear: '', amt: 1, stowed: [] }));
let usedLocations = { Back: null, Waist: null };
// ———————————————————————— REUSABLE DYNAMIC SELECTORS ————————————————————————
function rebuildDynamicSelectors(config) {
    const {
        amountInputId, containerSelector, itemPrefix, itemClass, selectorClass,
        descriptionSuffix = 'Description', extraOffset = 0, populateFunction, abilityType
    } = config;
    const inputEl = document.getElementById(amountInputId);
    if (!inputEl) return;
    const currentAmount = Math.max(0, parseInt(inputEl.value) || 0); // Clamp to 0+
    inputEl.value = currentAmount; // Update input to reflect clamped value
    const totalSlots = currentAmount + extraOffset;
    const container = document.querySelector(containerSelector);
    if (!container) return;
    // Save current selections
    const saved = {};
    for (let i = 1; i <= 20; i++) {
        const sel = document.getElementById(`${itemPrefix}${i}`);
        if (sel) saved[i] = sel.value;
    }
    // Remove ALL dynamic slots
    if (itemPrefix === 'talent') {
        container.querySelectorAll('[id^="talentTable"]:not(#wayTalent)').forEach(el => el.remove());
    } else {
        container.querySelectorAll(`[id^="${itemPrefix}sTable"]`).forEach(el => el.remove());
    }
    // Build exactly the number of slots we need
    for (let i = 1; i <= totalSlots; i++) {
        const wrapper = document.createElement('div');
        wrapper.id = `${itemPrefix}sTable${i}`;
        wrapper.className = itemClass;
        wrapper.innerHTML = `
            <select id="${itemPrefix}${i}" class="${selectorClass}"></select>
            <div id="${itemPrefix}${i}${descriptionSuffix}"></div>
        `;
        container.appendChild(wrapper);
    }
    populateFunction();
    // Restore saved values
    for (let i = 1; i <= totalSlots; i++) {
        const select = document.getElementById(`${itemPrefix}${i}`);
        if (select && saved[i]) {
            select.value = saved[i];
            populateAbilityInfo(select.id, getQualifiedAbilities(abilityType), abilityType);
        }
    }
    calculateAbilities();
}
function updateTalentTables() {
    rebuildDynamicSelectors({
        amountInputId: 'talentAmount',
        containerSelector: '.talentWrapper',
        itemPrefix: 'talent',
        itemClass: 'talentAbility',
        selectorClass: 'talentSelector',
        populateFunction: updateTalentSelectors,
        abilityType: 'talent'
    });
}
function updateTrickTables() {
    rebuildDynamicSelectors({
        amountInputId: 'tricksAmount',
        containerSelector: '.trickWrapper',
        itemPrefix: 'tricks',
        itemClass: 'trickAbility',
        selectorClass: 'trickSelector',
        extraOffset: 1,
        populateFunction: updateTrickSelectors,
        abilityType: 'trick'
    });
}
// ———————————————————————— ONE EVENT LISTENER (CLEAN & FIXED) ————————————————————————
document.addEventListener('change', e => {
    const t = e.target;
    // TALENT AMOUNT — FIXED
    if (t.matches('#talentAmount')) {
        const value = Math.max(0, parseInt(t.value) || 0);
        t.value = value; // Clamp input
        document.getElementById('totalTalents').textContent = 1 + value;
        updateTalentTables();
        calculateAbilities();
        return;
    }
    // TRICK AMOUNT — FIXED
    if (t.matches('#tricksAmount')) {
        const value = Math.max(0, parseInt(t.value) || 0);
        t.value = value; // Clamp input
        document.getElementById('totalTricks').textContent = 1 + value;
        updateTrickTables();
        calculateAbilities();
        return;
    }
    // Talent/Trick selection
    if (t.matches('.talentSelector')) {
        populateAbilityInfo(t.id, getQualifiedAbilities('talent'), 'talent');
        calculateAbilities();
    }
    else if (t.matches('.trickSelector')) {
        populateAbilityInfo(t.id, getQualifiedAbilities('trick'), 'trick');
        calculateAbilities();
    }
    // Skill Ranks
    else if (t.matches('select[id$="SkillRank"]')) {
        updateSkillModAndPassive(t.id);
        updateWayOptions();
        calculateSkillPoints();
        if (t.id === 'strikeSkillRank' || t.id === 'blastSkillRank' || t.id === 'invokeSkillRank') {
            const type = t.id.replace('SkillRank', '').toLowerCase();
            updateProficiencySelectors(type, parseInt(t.value) || 0);
        }
        updateTalentSelectors();
        updateTrickSelectors();
    }
    // Priorities & Level
    else if (t.matches('#bodyPriority, #mindPriority, #spiritPriority, #charLvl')) {
        calculateAttributeValues();
        updateAttributeGroups();
        updateAllSkillModsAndPassives();
        calculateSkillPoints();
        calculateAbilities();
    }
    // Sub-attributes
    else if (t.matches('input[id$="Value"][type="number"]')) {
        const group = t.id.includes('might') || t.id.includes('agility') || t.id.includes('brawn') ? ATTRIBUTE_GROUPS.physical :
                     t.id.includes('will') || t.id.includes('wit') || t.id.includes('resolve') ? ATTRIBUTE_GROUPS.mental :
                     ATTRIBUTE_GROUPS.spirit;
        updateAttributeGroup(group);
        updateSkillsForMod(t.id);
    }
    // Way Selector
    else if (t.matches('#roleSelector')) {
        populateRoleInfo(e);
    }
    // Amount Input Change
    else if (t.matches('.gearAmtInputField')) {
        const match = t.id.match(/gear(\d+)Amt/);
        if (!match) return;
        const i = match[1];
        updateGearLoad(i);
        calculateLoad();
    }
});
// ———————————————————————— CORE FUNCTIONS ————————————————————————
function populateRoleSelector() {
    const sel = document.getElementById('roleSelector');
    sel.innerHTML = '<option value="wayEmpty">Select Way</option>';
    waysData.forEach(w => sel.innerHTML += `<option value="${w.name}">${w.name}</option>`);
}
function updateWayOptions() {
    const sel = document.getElementById('roleSelector');
    waysData.forEach(way => {
        let qualified = way.reqSkill === 'Any'
            ? Object.values(SKILL_ID_MAP).some(id => document.getElementById(id)?.value > 1)
            : document.getElementById(way.skillId)?.value > 1;
        const opt = sel.querySelector(`option[value="${way.name}"]`);
        if (opt) opt.disabled = !qualified;
    });
}
function updateTalentSelectors() {
    const qualified = getQualifiedAbilities('talent');
    document.querySelectorAll('.talentSelector').forEach(sel => {
        const cur = sel.value;
        sel.innerHTML = '<option value="talentEmpty">Select Talent</option>' + qualified.map(a => `<option value="${a.name}">${a.name}</option>`).join('');
        if (cur && qualified.some(a => a.name === cur)) sel.value = cur;
    });
}
function updateTrickSelectors() {
    const qualified = getQualifiedAbilities('trick');
    document.querySelectorAll('.trickSelector').forEach(sel => {
        const cur = sel.value;
        sel.innerHTML = '<option value="trickEmpty">Select Trick</option>' + qualified.map(a => `<option value="${a.name}">${a.name}</option>`).join('');
        if (cur && qualified.some(a => a.name === cur)) sel.value = cur;
    });
}
function getQualifiedAbilities(type) {
    const result = [];
    Object.entries(SKILL_ID_MAP).forEach(([name, id]) => {
        const sel = document.getElementById(id);
        if (sel && parseInt(sel.value) >= 2 && abilitiesData[name.toLowerCase()]) {
            result.push(...abilitiesData[name.toLowerCase()].filter(a => a.type === type));
        }
    });
    return result;
}
function populateAbilityInfo(selectId, abilities, type) {
    const value = document.getElementById(selectId)?.value;
    const ability = abilities.find(a => a.name === value);
    const desc = document.getElementById(selectId + 'Description');
    if (!desc || !ability) { desc.innerHTML = ''; return; }
    desc.innerHTML = '';
    const order = ['keywords', 'description', 'passive', 'active', 'cost', 'trigger', 'effect', 'enhancements', 'augments'];
    Object.keys(ability.details).sort((a, b) => {
        const ia = order.indexOf(a.toLowerCase());
        const ib = order.indexOf(b.toLowerCase());
        return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
    }).forEach(key => {
        const div = document.createElement('div');
        div.className = type + key.charAt(0).toUpperCase() + key.slice(1);
        div.textContent = ability.details[key];
        desc.appendChild(div);
    });
}
function populateRoleInfo(e) {
    const name = e.target.value;
    if (!name) return;
    const way = waysData.find(w => w.name === name);
    if (!way) return;
    document.getElementById('wayTalentName').textContent = way.name;
    const desc = document.getElementById('wayTalentDesc');
    desc.innerHTML = '';
    ['passive', 'focus', 'critical effect'].forEach(key => {
        const val = way.props[Object.keys(way.props).find(k => k.toLowerCase().includes(key))];
        if (val) {
            const div = document.createElement('div');
            div.textContent = val;
            desc.appendChild(div);
        }
    });
    const attackSkill = way.props[Object.keys(way.props).find(k => k.includes('attack skill'))] || way.reqSkill;
    const skillId = SKILL_ID_MAP[attackSkill];
    if (skillId) {
        const sel = document.getElementById(skillId);
        if (sel && parseInt(sel.value) < 2) {
            sel.value = '2';
            sel.dispatchEvent(new Event('change'));
        }
    }
    const primary = way.props[Object.keys(way.props).find(k => k.includes('primary attribute'))];
    if (primary) {
        const map = { 'Body': 'bodyPriority', 'Mind': 'mindPriority', 'Spirit': 'spiritPriority' };
        const pri = document.getElementById(map[primary]);
        if (pri) {
            pri.value = '1';
            pri.dispatchEvent(new Event('change'));
        }
    }
    calculateAttributeValues();
    updateAttributeGroups();
    updateAllSkillModsAndPassives();
}
function calculateSkillPoints() {
    const level = parseInt(document.getElementById('charLvl').value) || 1;
    const total = level * 3 + 9;
    let spent = 0;
    Object.values(SKILL_ID_MAP).forEach(id => {
        const sel = document.getElementById(id);
        if (sel) spent += parseInt(sel.value) || 0;
    });
    document.getElementById('skillPoints').textContent = total - spent;
}
function calculateAbilities() {
    const level = parseInt(document.getElementById('charLvl').value) || 1;
    const tExtra = parseInt(document.getElementById('talentAmount').value) || 1;
    const trExtra = parseInt(document.getElementById('tricksAmount').value) || 1;
    document.getElementById('abilityNumber').textContent = tExtra + trExtra + 2;
    const remaining = level + 1 - Math.max(0, (tExtra - 1) + (trExtra - 1));
    document.getElementById('remainingAbilities').textContent = remaining < 0 ? 0 : remaining;
}
function calculateAttributeValues() {
    const level = parseInt(document.getElementById('charLvl').value) || 1;
    const pri = 2 + (level >= 2 ? 1 : 0) + (level >= 8 ? 1 : 0);
    const sec = 2 + (level >= 6 ? 1 : 0);
    const ter = 1 + (level >= 4 ? 1 : 0) + (level >= 10 ? 1 : 0);
    ['body', 'mind', 'spirit'].forEach(attr => {
        const priVal = document.getElementById(attr + 'Priority').value;
        let val = priVal === '1' ? pri : priVal === '2' ? sec : ter;
        document.getElementById(attr + 'Value').textContent = val;
    });
    updateSkillsForMod('bodyValue');
    updateSkillsForMod('mindValue');
    updateSkillsForMod('spiritValue');
}
function updateAttributeGroups() { Object.values(ATTRIBUTE_GROUPS).forEach(g => updateAttributeGroup(g)); }
function updateAttributeGroup(group) {
    const level = parseInt(document.getElementById('charLvl').value) || 1;
    const pri = document.getElementById(group.priorityId).value || '3';
    let points = 1 + Math.floor((level - 1) / 3);
    if (pri === '1') points = 3 + Math.floor((level + 1) / 3);
    if (pri === '2') points = 2 + Math.floor(level / 3);
    const max = parseInt(document.getElementById(group.primaryValueId).textContent) || 0;
    let sum = 0;
    group.subIds.forEach(id => {
        const inp = document.getElementById(id);
        if (inp) {
            inp.max = max;
            let v = Math.min(max, Math.max(0, parseInt(inp.value) || 0));
            inp.value = v;
            sum += v;
        }
    });
    const rem = points - sum;
    const el = document.getElementById(group.pointsId);
    el.textContent = rem;
    el.classList.toggle('hidden', rem === 0);
    group.subIds.forEach(id => updateSkillsForMod(id));
}
function updateSkillModAndPassive(skillId) {
    const sel = document.getElementById(skillId);
    if (!sel) return;
    const rank = parseInt(sel.value) || 0;
    const modId = SKILL_MOD_MAP[skillId];
    const modVal = parseInt(document.getElementById(modId)?.value || document.getElementById(modId)?.textContent || 0);
    const name = skillId.replace('SkillRank', '');
    const modEl = document.getElementById(name + 'Mod');
    if (modEl) modEl.textContent = modVal;
    const passiveEl = document.getElementById(name + 'Passive');
    if (passiveEl) passiveEl.textContent = 2 + rank + modVal;
    if (['strike', 'blast', 'invoke'].includes(name.toLowerCase())) {
        const dmgEl = document.getElementById(name + 'DamageMod') || document.getElementById(name + 'Damage');
        if (dmgEl) dmgEl.textContent = modVal;
    }
}
function updateSkillsForMod(subId) {
    Object.entries(SKILL_MOD_MAP).forEach(([skillId, modId]) => {
        if (modId === subId) updateSkillModAndPassive(skillId);
    });
}
function updateAllSkillModsAndPassives() {
    Object.keys(SKILL_ID_MAP).forEach(skillId => updateSkillModAndPassive(skillId));
}
function updateProficiencySelectors(type, rank) {
    for (let i = 1; i <= 5; i++) {
        const el = document.getElementById(type + 'ProfSelector' + i);
        if (el) el.hidden = i > rank;
    }
}
function updateGearLoad(i) {
    const select = document.getElementById('gear' + i + 'Select');
    if (!select) return;
    const selectedOption = select.options[select.selectedIndex];
    const baseLoad = parseFloat(selectedOption.getAttribute('data-load')) || 0;
    const amtInput = document.getElementById('gear' + i + 'Amt');
    const qty = Math.max(1, parseInt(amtInput?.value) || 1); // Clamp to >=1
    if (amtInput) amtInput.value = qty; // Enforce clamp
    const totalLoad = baseLoad * qty;
    const loadDiv = document.getElementById('gear' + i + 'Load');
    if (loadDiv) {
        const formattedLoad = totalLoad.toFixed(2).replace(/\.?0+$/, '');
        loadDiv.textContent = totalLoad > 0 ? formattedLoad : '';
        // Color red if qty >1 AND baseLoad >1
        loadDiv.style.color = (qty > 1 && baseLoad > 1) ? 'red' : '';
    }
}
function generateGearEntries() {
    const container = document.getElementById('gearEntries');
    container.innerHTML = '';

    for (let i = 1; i <= MAX_READY_SLOTS; i++) {
        const entry = document.createElement('div');
        entry.className = 'gearEntry';

        // We'll build the details HTML only if needed later
        let detailsHtml = '';

        entry.innerHTML = `
            <select id="gear${i}Select" class="gearSelector">
                <option value="emptyStowedGearSlot">Ready Slot</option>
            </select>
            <input type="number" id="gear${i}Amt" class="gearAmtInputField" min="1" value="1"/>
            <div id="gear${i}Load" class="gearLoad"></div>
            ${detailsHtml}
        `;

        container.appendChild(entry);

        // Populate selector
        const sel = document.getElementById(`gear${i}Select`);
        const grouped = {};
        allOptions.forEach(g => {
            if (!grouped[g.category]) grouped[g.category] = [];
            grouped[g.category].push(g);
        });
        Object.keys(grouped).sort().forEach(cat => {
            const optgroup = document.createElement('optgroup');
            optgroup.label = `-- ${cat} --`;
            grouped[cat].sort((a, b) => a.name.localeCompare(b.name)).forEach(g => {
                const opt = document.createElement('option');
                opt.value = g.name;
                opt.textContent = g.name;
                opt.dataset.load = g.baseLoad || g.load || 0;
                optgroup.appendChild(opt);
            });
            sel.appendChild(optgroup);
        });

        // On change: update load + conditionally add details icon
sel.addEventListener('change', () => {
    handleReadySelectChange(i);  // This now handles EVERYTHING: details, packs, state, stowed rendering, and loads
});

        // Amount input
        const amtInput = document.getElementById(`gear${i}Amt`);
        amtInput.addEventListener('input', function () {
            const val = Math.max(1, parseInt(this.value) || 1);
            this.value = val;
            readyState[i - 1].amt = val;
            updateReadyLoad(i);
            calculateLoad();
        });
    }

    calculateLoad();
}
function handleReadySelectChange(i) {
    const sel = document.getElementById(`gear${i}Select`);
    const newGearName = sel.value;
    const item = allOptions.find(g => g.name === newGearName);

    // === 1. Remove old details icon (if any) ===
    const oldDetails = document.getElementById(`gear${i}Details`);
    if (oldDetails) oldDetails.remove();

    // === 2. Add details icon only if item has details ===
    if (item?.details?.trim()) {
        const detailsDiv = document.createElement('div');
        detailsDiv.id = `gear${i}Details`;
        detailsDiv.className = 'hasDetails';
        detailsDiv.textContent = 'i';
        detailsDiv.dataset.details = item.details.trim();
        sel.closest('.gearEntry').appendChild(detailsDiv);
    }

    // === 3. Handle pack logic (this was broken) ===
    const wasPack = readyState[i-1].gear && allOptions.find(g => g.name === readyState[i-1].gear)?.isPack;
    const isPack = item?.isPack;

    // If switching FROM a pack → clear stowed
    if (wasPack && !isPack) {
        readyState[i-1].stowed = [];
        renderStowed(i); // This removes the container
    }

    // If switching TO a pack → initialize stowed slots
    if (isPack && !wasPack) {
        const slots = item.stowedslots || 0;
        readyState[i-1].stowed = Array(slots).fill(null).map(() => ({ gear: '', amt: 1 }));
        renderStowed(i); // ← THIS IS THE MISSING CALL!
    }

    // If staying on same pack but changing item (shouldn't happen, but safe)
    if (isPack && wasPack && readyState[i-1].gear !== newGearName) {
        const slots = item.stowedslots || 0;
        readyState[i-1].stowed = Array(slots).fill(null).map(() => ({ gear: '', amt: 1 }));
        renderStowed(i);
    }

    // Update state
    readyState[i-1].gear = newGearName;
    readyState[i-1].amt = parseInt(document.getElementById(`gear${i}Amt`).value) || 1;

    // Update load
    updateReadyLoad(i);
    calculateLoad();
}
function renderStowed(i) {
    let container = document.getElementById(`stowed-container-${i}`);
    const gearEntry = document.querySelector(`.gearEntry:has(#gear${i}Select)`);

    if (readyState[i-1].stowed.length === 0) {
        if (container) container.remove();
        return;
    }

    if (!container) {
        container = document.createElement('div');
        container.id = `stowed-container-${i}`;
        container.className = 'stowed-container';
        gearEntry.parentNode.insertBefore(container, gearEntry.nextSibling);
    }
    container.innerHTML = '';

    readyState[i-1].stowed.forEach((s, j) => {
        const stowedIndex = j + 1;
        const entry = document.createElement('div');
        entry.className = 'gearEntry gearStowed';

        let detailsHtml = '';

        entry.innerHTML = `
            <select id="stowed-${i}-${stowedIndex}-select" class="gearSelector">
                <option value="emptyStowedGearSlot">Stowed Slot</option>
            </select>
            <input type="number" id="stowed-${i}-${stowedIndex}-amt" min="1" value="${s.amt}"/>
            <div id="stowed-${i}-${stowedIndex}-load" class="gearLoad"></div>
            ${detailsHtml}
        `;

        container.appendChild(entry);

        const sel = entry.querySelector('select');
        const grouped = {};
        nonPackOptions.forEach(g => {
            if (!grouped[g.category]) grouped[g.category] = [];
            grouped[g.category].push(g);
        });

        Object.keys(grouped).sort().forEach(cat => {
            const optgroup = document.createElement('optgroup');
            optgroup.label = `-- ${cat} --`;  // ← Fixed! Was "poking"
            grouped[cat].sort((a, b) => a.name.localeCompare(b.name)).forEach(g => {
                const opt = document.createElement('option');
                opt.value = g.name;
                opt.textContent = g.name;
                opt.dataset.load = g.baseLoad || g.load || 0;
                optgroup.appendChild(opt);
            });
            sel.appendChild(optgroup);
        });

        // Restore saved selection and add details if needed
        if (s.gear) {
            sel.value = s.gear;
            const item = nonPackOptions.find(g => g.name === s.gear);
            if (item?.details?.trim()) {
                const detailsDiv = document.createElement('div');
                detailsDiv.id = `stowed-${i}-${stowedIndex}-details`;
                detailsDiv.className = 'hasDetails';
                detailsDiv.textContent = 'i';
                detailsDiv.dataset.details = item.details.trim();
                entry.appendChild(detailsDiv);
            }
        }

        // On change
        sel.addEventListener('change', () => {
            const selectedName = sel.value;
            const item = nonPackOptions.find(g => g.name === selectedName);

            // Remove old details
            const oldDetails = document.getElementById(`stowed-${i}-${stowedIndex}-details`);
            if (oldDetails) oldDetails.remove();

            // Add new details only if present
            if (item?.details?.trim()) {
                const detailsDiv = document.createElement('div');
                detailsDiv.id = `stowed-${i}-${stowedIndex}-details`;
                detailsDiv.className = 'hasDetails';
                detailsDiv.textContent = 'i';
                detailsDiv.dataset.details = item.details.trim();
                entry.appendChild(detailsDiv);
            }

            readyState[i-1].stowed[j].gear = selectedName;
            updateStowedLoad(i, stowedIndex);
            updateReadyLoad(i);
            calculateLoad();
        });

        const amtInput = entry.querySelector('input');
        amtInput.addEventListener('input', () => {
            const val = Math.max(1, parseInt(amtInput.value) || 1);
            amtInput.value = val;
            readyState[i-1].stowed[j].amt = val;
            updateStowedLoad(i, stowedIndex);
            updateReadyLoad(i);
            calculateLoad();
        });

        updateStowedLoad(i, stowedIndex);
    });
}
function updateStowedDetails(readyI, stowedJ) {
    const sel = document.getElementById(`stowed-${readyI}-${stowedJ}-select`);
    if (!sel) return;

    const gearName = sel.value;
    const item = allOptions.find(g => g.name === gearName);
    const detailsDiv = document.getElementById(`stowed-${readyI}-${stowedJ}-details`);

    if (item && item.details && item.details.trim()) {
        detailsDiv.classList.add('hasDetails');
        detailsDiv.dataset.details = item.details.trim();
        detailsDiv.title = 'Hover for details';
    } else {
        detailsDiv.classList.remove('hasDetails');
        delete detailsDiv.dataset.details;
        detailsDiv.title = '';
        detailsDiv.textContent = '';
    }
}
// Update single stowed load
function updateStowedLoad(readyI, stowedJ) {
    const sel = document.getElementById(`stowed-${readyI}-${stowedJ}-select`);
    if (!sel) return;
    const opt = sel.options[sel.selectedIndex];
    const baseLoad = parseFloat(opt.getAttribute('data-load')) || 0;
    const qty = readyState[readyI-1].stowed[stowedJ-1].amt;
    const total = baseLoad * qty;
    const loadDiv = document.getElementById(`stowed-${readyI}-${stowedJ}-load`);
    if (loadDiv) {
        loadDiv.textContent = total > 0 ? total.toFixed(2).replace(/\.?0+$/, '') : '';
        loadDiv.style.color = (qty > 1 && baseLoad > 1) ? 'red' : '';
    }
}
// Update ready load (for pack: sum stowed + base; for non-pack: base * amt)
function updateReadyLoad(i) {
    const state = readyState[i-1];
    const item = allOptions.find(g => g.name === state.gear);
    let total = 0;
    if (item) {
        const baseLoad = item.baseLoad || item.load || 0;
        total += baseLoad * state.amt;
        if (item.isPack) {
            state.stowed.forEach(s => {
                const sItem = nonPackOptions.find(g => g.name === s.gear);
                if (sItem) total += (sItem.load || 0) * s.amt;
            });
        }
    }
    const loadDiv = document.getElementById(`gear${i}Load`);
    if (loadDiv) {
        loadDiv.textContent = total > 0 ? total.toFixed(2).replace(/\.?0+$/, '') : '';
        if (item?.isPack) loadDiv.style.color = total > item.loadLimit ? 'red' : '';
    }
}
// Updated calculateLoad (loop over state, no hard numbers beyond max)
function calculateLoad() {
    let totalLoad = 0;
    readyState.forEach((state, idx) => {
        const i = idx + 1;
        const loadText = document.getElementById(`gear${i}Load`)?.textContent || '0';
        totalLoad += parseFloat(loadText) || 0;
    });
    const formattedTotal = totalLoad.toFixed(2).replace(/\.?0+$/, '');
    document.getElementById('totalLoadValue').textContent = formattedTotal;
}

// Reusable function to create a tooltip div
function createTooltip(details) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = details;
    tooltip.style.position = 'absolute';
    tooltip.style.background = '#fff';
    tooltip.style.border = '1px solid #ccc';
    tooltip.style.padding = '10px';
    tooltip.style.zIndex = '1000';
    tooltip.style.display = 'none'; // Hidden by default
    return tooltip;
}

// ———————————————————————— UNIVERSAL TOOLTIP ————————————————————————
const TOOLTIP_ID = 'universal-tooltip';

document.addEventListener('mouseover', e => {
    if (e.target.matches('.hasDetails') && e.target.dataset.details?.trim()) {
        let tooltip = document.getElementById(TOOLTIP_ID);
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.id = TOOLTIP_ID;
            document.body.appendChild(tooltip);
        }

        tooltip.textContent = e.target.dataset.details.trim();
        tooltip.classList.add('visible');

        const rect = e.target.getBoundingClientRect();
        tooltip.style.left = `${rect.left + window.scrollX + rect.width / 2}px`;
        tooltip.style.top = `${rect.bottom + window.scrollY + 8}px`;
    }
});

document.addEventListener('mouseout', e => {
    if (e.target.matches('.hasDetails')) {
        const tooltip = document.getElementById(TOOLTIP_ID);
        if (tooltip) tooltip.classList.remove('visible');
    }
});
// ———————————————————————— INIT ————————————————————————
window.addEventListener('load', () => {
    calculateSkillPoints();
    calculateAbilities();
    calculateAttributeValues();
    updateAttributeGroups();
    updateAllSkillModsAndPassives();
    ['strike', 'blast', 'invoke'].forEach(t => {
        const sel = document.getElementById(t + 'SkillRank');
        if (sel) updateProficiencySelectors(t, parseInt(sel.value) || 0);
    });
    updateTalentTables(); // Initial build for talents
    updateTrickTables(); // Initial build for tricks
    calculateLoad(); // Initial total (will be 0 until data loads)
});