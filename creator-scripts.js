const WAYS_CSV_URL = 'https://docs.google.com/spreadsheets/d/1OIAs6EFgLFKG3QN_b4Vtm48BwSFb7VwDxOXWhkotXz8/pub?gid=53126780&single=true&output=csv';
const PROF_CSV_URL = 'https://docs.google.com/spreadsheets/d/1OIAs6EFgLFKG3QN_b4Vtm48BwSFb7VwDxOXWhkotXz8/pub?gid=715914535&single=true&output=csv';
const ABILITIES_CSV_URL = 'https://docs.google.com/spreadsheets/d/1OIAs6EFgLFKG3QN_b4Vtm48BwSFb7VwDxOXWhkotXz8/pub?gid=1439570479&single=true&output=csv';

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

// ———————————————————————— DATA LOADING ————————————————————————

fetch(ABILITIES_CSV_URL)
    .then(r => { if (!r.ok) throw Error(r.status); return r.text(); })
    .then(text => {
        const rows = parseWaysCSV(text);
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
        updateTalentSelectors();
        updateTrickSelectors();
    })
    .catch(err => console.error('Error loading Abilities CSV:', err));

fetch(WAYS_CSV_URL)
    .then(r => { if (!r.ok) throw Error(r.status); return r.text(); })
    .then(text => {
        const rows = parseWaysCSV(text);
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
        const rows = parseWaysCSV(text);
        const headers = rows[0].map(h => h.trim().toLowerCase());
        const strikeCol = headers.findIndex(h => h.includes('strike'));
        const blastCol = headers.findIndex(h => h.includes('blast'));
        const invokeCol = headers.findIndex(h => h.includes('invoke'));
        const gearCol = headers.findIndex(h => h.includes('gear'));
        const loadCol = headers.findIndex(h => h.includes('load'));

        if (strikeCol !== -1) profData.strike = rows.slice(1).map(r => r[strikeCol]).filter(v => v);
        if (blastCol !== -1) profData.blast = rows.slice(1).map(r => r[blastCol]).filter(v => v);
        if (invokeCol !== -1) profData.invoke = rows.slice(1).map(r => r[invokeCol]).filter(v => v);
        if (gearCol !== -1 && loadCol !== -1) {
            gearData = rows.slice(1).map(r => ({ gear: r[gearCol].trim(), load: r[loadCol].trim() })).filter(g => g.gear);
        }

        ['strike', 'blast', 'invoke'].forEach(type => {
            for (let i = 1; i <= 5; i++) {
                const sel = document.getElementById(type + 'ProfSelector' + i);
                if (sel) {
                    sel.innerHTML = '<option value=""></option>' + profData[type].map(o => `<option>${o}</option>`).join('');
                }
            }
        });

        for (let i = 1; i <= 12; i++) {
            const sel = document.getElementById('gearSelect' + i);
            if (sel) {
                sel.innerHTML = '<option value=""></option>' + gearData.map(g => `<option value="${g.gear}" data-load="${g.load}">${g.gear}</option>`).join('');
            }
        }
    })
    .catch(err => console.error('Error loading Prof/Gear CSV:', err));

// ———————————————————————— REUSABLE DYNAMIC SELECTORS ————————————————————————

function rebuildDynamicSelectors(config) {
    const {
        amountInputId, containerSelector, itemPrefix, itemClass, selectorClass,
        descriptionSuffix = 'Description', extraOffset = 0, populateFunction, abilityType
    } = config;

    const inputEl = document.getElementById(amountInputId);
    if (!inputEl) return;

    const currentAmount = Math.max(0, parseInt(inputEl.value) || 0);  // Never negative
    const totalSlots = currentAmount + extraOffset;
    const container = document.querySelector(containerSelector);
    if (!container) return;

    // Save current selections
    const saved = {};
    for (let i = 1; i <= 20; i++) {
        const sel = document.getElementById(`${itemPrefix}${i}`);
        if (sel) saved[i] = sel.value;
    }

    // Remove ALL dynamic slots (clean slate)
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

    // Repopulate options
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
        itemClass: 'talent',
        selectorClass: 'talentSelector',
        populateFunction: updateTalentSelectors,
        abilityType: 'talent'
    });
}

function updateTrickTables() {
    rebuildDynamicSelectors({
        amountInputId: 'tricksAmount',
        containerSelector: '.tricksWrapper',
        itemPrefix: 'tricks',
        itemClass: 'ability-trick',
        selectorClass: 'tricksSelector',
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
        document.getElementById('totalTalents').textContent = 1 + value;
        updateTalentTables();
        calculateAbilities();
        return;
    }

    // TRICK AMOUNT — FIXED
    if (t.matches('#tricksAmount')) {
        const value = Math.max(0, parseInt(t.value) || 0);
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
    else if (t.matches('.tricksSelector')) {
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

    // Gear
    else if (t.matches('.gearSelector')) {
        const i = t.id.replace('gearSelect', '');
        const selectedOption = t.options[t.selectedIndex];
        const load = selectedOption?.getAttribute('data-load') || '';
        const loadDiv = document.getElementById('gearLoad' + i);
        if (loadDiv) loadDiv.textContent = load;
        calculateLoad();
    }
});

// ———————————————————————— CORE FUNCTIONS (unchanged) ————————————————————————

function populateRoleSelector() {
    const sel = document.getElementById('roleSelector');
    sel.innerHTML = '<option value="">Select Way</option>';
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
        sel.innerHTML = '<option value="">—</option>' + qualified.map(a => `<option value="${a.name}">${a.name}</option>`).join('');
        if (cur && qualified.some(a => a.name === cur)) sel.value = cur;
    });
}

function updateTrickSelectors() {
    const qualified = getQualifiedAbilities('trick');
    document.querySelectorAll('.tricksSelector').forEach(sel => {
        const cur = sel.value;
        sel.innerHTML = '<option value="">—</option>' + qualified.map(a => `<option value="${a.name}">${a.name}</option>`).join('');
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

function calculateLoad() {
    let totalLoad = 0;
    for (let i = 1; i <= 12; i++) {
        const select = document.getElementById('gearSelect' + i);
        if (select) {
            const load = parseInt(select.options[select.selectedIndex]?.getAttribute('data-load')) || 0;
            totalLoad += load;
        }
    }
    console.log('Total Load:', totalLoad);
}

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
});