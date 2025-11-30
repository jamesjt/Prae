const WAYS_CSV_URL = 'https://docs.google.com/spreadsheets/d/1OIAs6EFgLFKG3QN_b4Vtm48BwSFb7VwDxOXWhkotXz8/pub?gid=53126780&single=true&output=csv';
const CHAR_CSV_URL = 'https://docs.google.com/spreadsheets/d/1OIAs6EFgLFKG3QN_b4Vtm48BwSFb7VwDxOXWhkotXz8/pub?gid=715914535&single=true&output=csv';
const ABILITIES_CSV_URL = 'https://docs.google.com/spreadsheets/d/1OIAs6EFgLFKG3QN_b4Vtm48BwSFb7VwDxOXWhkotXz8/pub?gid=1439570479&single=true&output=csv';

let SKILL_ID_MAP = {};
let SKILL_MOD_MAP = {};
const ATTRIBUTE_GROUPS = {
    physical: { priorityId: 'bodyPriority', pointsId: 'physicalAttributePoints', primaryValueId: 'bodyValue', subIds: [] },
    mental:   { priorityId: 'mindPriority', pointsId: 'mentalAttributePoints', primaryValueId: 'mindValue', subIds: [] },
    spirit:   { priorityId: 'spiritPriority', pointsId: 'spiritAttributePoints', primaryValueId: 'spiritValue', subIds: [] }
};

let waysData = [], profData = { strike: [], blast: [], invoke: [] }, gearData = [], abilitiesData = new Map();

// Add near top constants
const MAX_READY_SLOTS = 5;  // Change this to adjust ready slots globally


// ———————————————————————— DATA LOADING ————————————————————————

async function loadAllData() {
    try {
        const [abilitiesRes, waysRes, charRes] = await Promise.all([
            fetch(ABILITIES_CSV_URL).then(r => { if (!r.ok) throw new Error(`Abilities fetch failed: ${r.status}`); return r.text(); }),
            fetch(WAYS_CSV_URL).then(r => { if (!r.ok) throw new Error(`Ways fetch failed: ${r.status}`); return r.text(); }),
            fetch(CHAR_CSV_URL).then(r => { if (!r.ok) throw new Error(`Char fetch failed: ${r.status}`); return r.text(); })
        ]);

        // Parse Abilities
        const abilitiesParsed = Papa.parse(abilitiesRes, { header: false, skipEmptyLines: true, dynamicTyping: false });
        if (abilitiesParsed.errors.length) throw new Error('Abilities parse error');
        const abilitiesRows = abilitiesParsed.data;
        const skills = abilitiesRows[0].slice(1).map(s => s.trim());
        skills.forEach((skill, colIndex) => {
            let currentAbility = null;
            for (let r = 1; r < abilitiesRows.length; r++) {
                const keyCell = abilitiesRows[r][0];
                const valueCell = abilitiesRows[r][colIndex + 1];
                const key = keyCell ? keyCell.trim() : '';
                const value = valueCell ? valueCell.trim() : '';
                if (key.match(/^(Talent|Trick|Ritual) \d+ Name$/i)) {
                    if (currentAbility) saveAbility(skill.toLowerCase(), currentAbility);
                    const typeMatch = key.match(/^(Talent|Trick|Ritual)/i);
                    const type = typeMatch ? typeMatch[0].toLowerCase() : 'unknown';
                    currentAbility = { type, name: value || `(Unnamed ${type})`, skill: skill.toLowerCase(), details: {} };
                } else if (currentAbility && key && key.includes(' ')) {
                    const detailKey = key.split(' ').slice(2).join(' ');
                    currentAbility.details[detailKey] = value;
                }
            }
            if (currentAbility) saveAbility(skill.toLowerCase(), currentAbility);
        });
        function saveAbility(skill, ability) {
            if (!abilitiesData.has(skill)) abilitiesData.set(skill, []);
            abilitiesData.get(skill).push(ability);
        }

        // Dynamically build SKILL_ID_MAP from skills
        SKILL_ID_MAP = skills.reduce((map, skill) => {
            map[skill] = skill.toLowerCase() + 'SkillRank';
            return map;
        }, {});
        // Add attack skills (not in CSV headers)
        SKILL_ID_MAP['Strike'] = 'strikeSkillRank';
        SKILL_ID_MAP['Blast'] = 'blastSkillRank';
        SKILL_ID_MAP['Invoke'] = 'invokeSkillRank';

        // Dynamically build SKILL_MOD_MAP based on grouped categories (18 skills + 3 attacks)
        const physicalSubs = ['mightValue', 'mightValue', 'agilityValue', 'agilityValue', 'brawnValue', 'brawnValue'];
        const mentalSubs = ['willValue', 'willValue', 'witValue', 'witValue', 'resolveValue', 'resolveValue'];
        const socialSubs = ['vigorValue', 'vigorValue', 'empathyValue', 'empathyValue', 'faithValue', 'faithValue'];
        SKILL_MOD_MAP = skills.reduce((map, skill, i) => {
            let mod;
            if (i < 6) mod = physicalSubs[i];
            else if (i < 12) mod = mentalSubs[i - 6];
            else mod = socialSubs[i - 12];
            map[skill.toLowerCase() + 'SkillRank'] = mod;
            return map;
        }, {});
        // Add for attacks
        SKILL_MOD_MAP['strikeSkillRank'] = 'bodyValue';
        SKILL_MOD_MAP['blastSkillRank'] = 'mindValue';
        SKILL_MOD_MAP['invokeSkillRank'] = 'spiritValue';

        // Dynamically assign subIds to ATTRIBUTE_GROUPS from MOD_MAP groups
        ATTRIBUTE_GROUPS.physical.subIds = physicalSubs.filter((v, i, a) => a.indexOf(v) === i); // Unique: ['mightValue', 'agilityValue', 'brawnValue']
        ATTRIBUTE_GROUPS.mental.subIds = mentalSubs.filter((v, i, a) => a.indexOf(v) === i);
        ATTRIBUTE_GROUPS.spirit.subIds = socialSubs.filter((v, i, a) => a.indexOf(v) === i);

        // Parse Ways
        const waysParsed = Papa.parse(waysRes, { header: false, skipEmptyLines: true, dynamicTyping: false });
        if (waysParsed.errors.length) throw new Error('Ways parse error');
        const waysRows = waysParsed.data;
        let includeRowIdx = waysRows.findIndex(row => (row[0] || '').toLowerCase().trim().includes('include'));
        if (includeRowIdx === -1) return console.error('Missing "Include" row');
        const includeRow = waysRows[includeRowIdx];
        for (let col = 1; col < includeRow.length; col++) {
            const includeValue = (includeRow[col] || '').toUpperCase().trim();
            if (includeValue === 'TRUE' || includeValue === '1') {
                const props = {};
                waysRows.forEach(row => {
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

        // Parse Char/PROF
        const charParsed = Papa.parse(charRes, { header: false, skipEmptyLines: true, dynamicTyping: false });
        if (charParsed.errors.length) throw new Error('Char parse error');
        const charRows = charParsed.data;
        const headers = charRows[0].map(h => h.trim());

        const dataByCategory = parseCsvByCategories(headers, charRows);

        // For debugging
        console.log('Parsed Data:', dataByCategory);

        // Assign for gear (update script to use dataByCategory.gear if refactoring further)
        gearData = dataByCategory.gear || [];
        allOptions = gearData;
        nonPackOptions = gearData.filter(g => g.category.toLowerCase() !== 'packs');  // Case-insensitive exclude

        // Assign for proficiencies
        const proficiencies = dataByCategory.proficiencies || [];
        profData.strike = proficiencies.filter(g => g.category.toLowerCase() === 'strike');
        profData.blast = proficiencies.filter(g => g.category.toLowerCase() === 'blast');
        profData.invoke = proficiencies.filter(g => g.category.toLowerCase() === 'invoke');

        // Post-parsing init (e.g., populate selectors, etc.)
        updateAbilitySelectors('trick');
        updateAbilitySelectors('talent');
        populateRoleSelector();
        updateWayOptions();
        generateGearEntries();
        ['strike', 'blast', 'invoke'].forEach(type => populateProficiencySelectors(type));
    } catch (err) {
        console.error('Data load error:', err);
        // UI feedback, e.g.:
        document.getElementById('content-sections').innerHTML = '<div class="no-results">Error loading data: ' + err.message + '</div>';
    }
}

// Helper: Generic CSV parser (optimized with reduce)
function parseCsvByCategories(headers, rows) {
    const dataByCategory = {};
    const prefixMap = headers.reduce((map, h, idx) => {
        const parts = h.split(' ');
        if (parts.length < 2) return map;
        const prefix = parts[0] + ' ';
        map[prefix] = map[prefix] || [];
        map[prefix].push({ header: h, idx });
        return map;
    }, {});

    for (const [prefix, entries] of Object.entries(prefixMap)) {
        if (entries.length < 2) continue;
        const categoryKey = prefix.trim().toLowerCase();
        dataByCategory[categoryKey] = [];

        const configs = entries.map(({ header }) => {
            const subCategory = header.replace(prefix, '').trim();
            const camelPrefix = prefix.replace(' ', '') + subCategory.replace(/\s+/g, '');
            const related = headers.reduce((acc, hh, idx) => {
                if (hh.startsWith(camelPrefix) && hh !== header) {
                    acc.push({ suffix: hh.replace(camelPrefix, '').trim(), idx });
                }
                return acc;
            }, []);
            return { mainIdx: headers.indexOf(header), subCategory, related };
        });

        for (let r = 1; r < rows.length; r++) {
            const row = rows[r];
            configs.forEach(config => {
                const name = row[config.mainIdx]?.trim();
                if (!name) return;
                const item = { name, category: config.subCategory };
                parseItemProps(item, config.related, row);
                dataByCategory[categoryKey].push(item);
            });
        }

        dataByCategory[categoryKey].sort((a, b) => a.name.localeCompare(b.name));
    }

    return dataByCategory;
}

// Helper: Parse item properties with dynamic type conversion
function parseItemProps(item, related, row) {
    related.forEach(rel => {
        let val = row[rel.idx]?.trim();
        if (!val) return;

        const suffixLower = rel.suffix.toLowerCase();
        // Pattern-based conversion
        if (suffixLower.includes('load') || suffixLower.includes('slots') || suffixLower.includes('used') || suffixLower.includes('cost')) {
            val = parseFloat(val) || 0;
        } else if (suffixLower.includes('bonus')) {
            val = parseInt(val) || 0;
        }
        // Else: Keep as string (e.g., 'details')

        item[rel.suffix.toLowerCase()] = val;
    });
}

function populateProficiencySelectors(type) {
    const profs = profData[type] || [];
    for (let i = 1; i <= 5; i++) {
        const sel = document.getElementById(type + 'ProfSelector' + i);
        if (sel) {
            sel.innerHTML = '<option value="">Select Proficiency</option>' + 
                profs.map(p => `<option value="${p.name}">${p.name}</option>`).join('');
        }
    }
}

// Update updateProficiencySelectors to call population after visibility
function updateProficiencySelectors(type, rank) {
    for (let i = 1; i <= 5; i++) {
        const el = document.getElementById(type + 'ProfSelector' + i);
        if (el) el.hidden = i > rank;
    }
    populateProficiencySelectors(type);  // Add this
}

let allOptions = [];
let nonPackOptions = [];
let readyState = Array(MAX_READY_SLOTS).fill(null).map(() => ({ gear: '', amt: 1, stowed: [] }));
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
        populateFunction: () => updateAbilitySelectors('talent'),
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
        populateFunction: () => updateAbilitySelectors('trick'),
        abilityType: 'trick'
    });
}
// ———————————————————————— ONE EVENT LISTENER (OPTIMIZED) ————————————————————————
document.addEventListener('change', e => {
    const t = e.target;
    const clamp = (el, min = 0) => (el.value = Math.max(min, parseInt(el.value) || min), parseInt(el.value));

    // Talent/Trick Amounts (combined)
    if (t.matches('#talentAmount, #tricksAmount')) {
        const type = t.id.replace('Amount', '');
        const value = clamp(t);
        document.getElementById(`total${type.charAt(0).toUpperCase() + type.slice(1)}s`).textContent = 1 + value;
        (type === 'talent' ? updateTalentTables : updateTrickTables)();
        calculateAbilities();
        return;
    }

    // Talent/Trick Selectors (combined)
    if (t.matches('.talentSelector, .trickSelector')) {
        const type = t.className.replace('Selector', '');
        populateAbilityInfo(t.id, getQualifiedAbilities(type), type);
        calculateAbilities();
        return;
    }

    // Skill Ranks
    if (t.matches('select[id$="SkillRank"]')) {
        updateSkillModAndPassive(t.id);
        updateWayOptions();
        calculateSkillPoints();
        const type = t.id.replace('SkillRank', '').toLowerCase();
        if (['strike', 'blast', 'invoke'].includes(type)) updateProficiencySelectors(type, parseInt(t.value) || 0);
        updateAbilitySelectors('trick');
        updateAbilitySelectors('talent');
        return;
    }

    // Priorities, Level, Sub-attributes (combined attribute-related)
    if (t.matches('#bodyPriority, #mindPriority, #spiritPriority, #charLvl, input[id$="Value"][type="number"]')) {
        calculateAttributeValues();
        updateAttributeGroups();
        updateAllSkillModsAndPassives();
        calculateSkillPoints();
        calculateAbilities();
        if (t.matches('input[id$="Value"][type="number"]')) {
            const groupKey = /might|agility|brawn/.test(t.id) ? 'physical' : /will|wit|resolve/.test(t.id) ? 'mental' : 'spirit';
            updateAttributeGroup(ATTRIBUTE_GROUPS[groupKey]);
            updateSkillsForMod(t.id);
        }
        return;
    }

    // Way Selector
    if (t.matches('#roleSelector')) {
        populateRoleInfo(e);
        return;
    }

    // Gear/Stowed Amounts/Selects (combined)
    if (t.matches('.gearAmtInputField, [id^="stowed-"][id$="-amt"], [id^="gear"][id$="Select"], [id^="stowed-"][id$="-select"]')) {
        if (t.matches('[id$="Select"]')) handleReadySelectChange(t.id.match(/gear(\d+)Select/)[1]);
        const match = t.id.match(/(gear|stowed-(\d+)-(\d+))-(Amt|amt|select)/);
        if (match) {
            const [,, readyI, stowedJ] = match;
            if (/Amt|amt/.test(t.id)) clamp(t, 1);
            if (stowedJ) {
                updateStowedLoad(readyI || readyI, stowedJ);
                updateReadyLoad(readyI || readyI);
            } else {
                updateReadyLoad(readyI || readyI);
            }
            calculateLoad();
        }
        return;
    }

    // Proficiency Selectors
    if (t.matches('[id$="ProfSelector"]')) {
        const type = t.id.match(/(strike|blast|invoke)ProfSelector/)?.[1];
        if (type) calculateProficiencyPoints(type);
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
        const opt = sel.querySelector(`option[value="${w.name}"]`);
        if (opt) opt.disabled = !qualified;
    });
}
function updateAbilitySelectors(type) {
    const qualified = getQualifiedAbilities(type);
    const selectorClass = `${type}Selector`;
    const emptyValue = `${type}Empty`;
    const emptyLabel = `Select ${type.charAt(0).toUpperCase() + type.slice(1)}`;
    
    document.querySelectorAll(`.${selectorClass}`).forEach(sel => {
        const cur = sel.value;
        sel.innerHTML = `<option value="${emptyValue}">${emptyLabel}</option>` + 
            qualified.map(a => `<option value="${a.name}">${a.name}</option>`).join('');
        if (cur && qualified.some(a => a.name === cur)) sel.value = cur;
    });
}
function getQualifiedAbilities(type) {
    const result = [];
    Object.entries(SKILL_ID_MAP).forEach(([name, id]) => {
        const sel = document.getElementById(id);
        if (sel && parseInt(sel.value) >= 2 && abilitiesData.get(name.toLowerCase())) {
            result.push(...abilitiesData.get(name.toLowerCase()).filter(a => a.type === type));
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
        // Add this here: Trigger proficiency update
        if (['strikeSkillRank', 'blastSkillRank', 'invokeSkillRank'].includes(skillId)) {
            const type = skillId.replace('SkillRank', '').toLowerCase();
            const rank = parseInt(sel.value) || 0;
            updateProficiencySelectors(type, rank);
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
    /*if (['strike', 'blast', 'invoke'].includes(name.toLowerCase())) {
        const dmgEl = document.getElementById(name + 'DamageMod') || document.getElementById(name + 'Damage');
        if (dmgEl) dmgEl.textContent = modVal;
    }*/
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
    const wasPack = readyState[i-1].gear && allOptions.find(g => g.name === readyState[i-1].gear)?.category === 'Packs';
    const isPack = item?.category === 'Packs';
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
        if (item?.category === 'Packs') {
            state.stowed.forEach(s => {
                const sItem = nonPackOptions.find(g => g.name === s.gear);
                if (sItem) total += (sItem.load || 0) * s.amt;
            });
        }
    }
    const loadDiv = document.getElementById(`gear${i}Load`);
    if (loadDiv) {
        loadDiv.textContent = total > 0 ? total.toFixed(2).replace(/\.?0+$/, '') : '';
        if (item?.category === 'Packs') loadDiv.style.color = total > item.loadLimit ? 'red' : '';
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

// Make all .draggable elements movable (no restrictions, touch/mouse support)
interact('.draggable')
  .draggable({
    inertia: true,  // Smooth momentum on release
    autoScroll: true,  // Auto-scroll if dragging near edges
    listeners: {
      move: (event) => {
        const target = event.target;
        // Get current position (stored as data attributes)
        const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
        const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
        // Apply transform for movement
        target.style.transform = `translate(${x}px, ${y}px)`;
        // Store new position
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
      }
    }
  });
// ———————————————————————— INIT ————————————————————————
window.addEventListener('load', () => {
    loadAllData();
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
    // Unified Tooltip Initialization with Tippy.js
tippy.setDefaultProps({
  theme: 'custom',  // We'll define this in CSS
  arrow: true,  // Arrow pointer
  animation: 'fade',  // Smooth fade in/out
  allowHTML: true,  // For rich content (e.g., textareas in charDetails)
  interactive: true,  // Allow interaction inside tooltip (e.g., clicks, close buttons)
  maxWidth: 650,  // Match your charDetails width
  placement: 'right-start',  // Default position (adjust per instance if needed)
  offset: [0, 10],  // Slight offset from trigger
  zIndex: 100,  // Match your z-index
});

// For predefined terms (abbr elements)
document.querySelectorAll('abbr').forEach(el => {
  const term = el.textContent.toLowerCase().trim();  // Or use a data-term attribute if needed
  const predefinedMap = {
    'short': 'First use or end of creators next turn',
    'round': 'Until end of creators next turn',
    'combat': 'End of the encounter',
    'vigilant': 'Attackers get -1 die and you have +1 Armor against AoE',
    'boosted': '+1 die to rolls',
    // ... Add all your buffs/debuffs/fluff from CSS here
    'yon': 'Pronounced (Y-oh-n). Series of movements used for Conjurations'
  };
  const content = predefinedMap[term] || 'Unknown term';  // Fallback
  tippy(el, {
    content: content,
    trigger: 'mouseenter focus',  // Hover or focus for accessibility
    hideOnClick: false  // Persistent on hover until leave
  });
});

// For universal tooltips (.hasDetails with data-details)
tippy('.hasDetails', {
  content: reference => reference.dataset.details || 'No details',
  trigger: 'mouseenter focus',
  hideOnClick: false
});

// For charDetails (hover on .charInfoHover, click to show fully)
document.querySelectorAll('.charInfoHover').forEach(trigger => {
  const detailsId = trigger.nextElementSibling?.id;  // Assumes sibling setup
  if (!detailsId) return;
  const contentEl = document.getElementById(detailsId);
  
  tippy(trigger, {
    content: contentEl.innerHTML,  // Clone content for tooltip
    trigger: 'mouseenter focus click',  // Hover for preview, click for persistent
    allowHTML: true,
    interactive: true,  // Allow clicks inside (e.g., close button)
    hideOnClick: 'toggle',  // Click to show/hide persistently
    onShow(instance) {
      // For persistent mode on click: Add close logic if needed
      instance.popper.querySelector('.closeRitual')?.addEventListener('click', () => instance.hide());

      // Re-apply Interact.js to the dynamic .draggable element inside popper
      const draggableEl = instance.popper.querySelector('.draggable');
      if (draggableEl) {
        interact(draggableEl)
          .draggable({
            inertia: true,
            autoScroll: true,
            listeners: {
              move: (event) => {
                const target = event.target;
                const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
                target.style.transform = `translate(${x}px, ${y}px)`;
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
              }
            }
          });
      }
    }
  });
  
  // Hide old showDesc/hideDesc if migrating (optional)
  trigger.onclick = null;  // Remove old onclick
});
});