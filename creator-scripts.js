const WAYS_CSV_URL = 'https://docs.google.com/spreadsheets/d/1OIAs6EFgLFKG3QN_b4Vtm48BwSFb7VwDxOXWhkotXz8/pub?gid=53126780&single=true&output=csv';
const CHAR_CSV_URL = 'https://docs.google.com/spreadsheets/d/1OIAs6EFgLFKG3QN_b4Vtm48BwSFb7VwDxOXWhkotXz8/pub?gid=715914535&single=true&output=csv';
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
    body: { priorityId: 'bodyPriority', pointsId: 'bodyAttributePoints', primaryValueId: 'bodyValue', subIds: ['mightValue', 'agilityValue', 'brawnValue'] },
    mind: { priorityId: 'mindPriority', pointsId: 'mindAttributePoints', primaryValueId: 'mindValue', subIds: ['willValue', 'witValue', 'resolveValue'] },
    spirit: { priorityId: 'spiritPriority', pointsId: 'spiritAttributePoints', primaryValueId: 'spiritValue', subIds: ['vigorValue', 'faithValue', 'empathyValue'] }
};

const MAX_READY_SLOTS = 5;
const MAX_PROF_SLOTS = 5;

let waysData = [], profData = { strike: [], blast: [], invoke: [] }, gearData = [], abilitiesData = new Map();
let allOptions = [];
let nonPackOptions = [];
let readyState = Array(MAX_READY_SLOTS).fill(null).map(() => ({ gear: '', amt: 1, stowed: [] }));

const elementCache = new Map();

function getElement(id) {
    if (!elementCache.has(id)) {
        elementCache.set(id, document.getElementById(id));
    }
    return elementCache.get(id);
}

async function loadAllData() {
    try {
        const [abilitiesRes, waysRes, charRes] = await Promise.all([
            fetch(ABILITIES_CSV_URL).then(r => { if (!r.ok) throw new Error(`Abilities fetch failed: ${r.status}`); return r.text(); }),
            fetch(WAYS_CSV_URL).then(r => { if (!r.ok) throw new Error(`Ways fetch failed: ${r.status}`); return r.text(); }),
            fetch(CHAR_CSV_URL).then(r => { if (!r.ok) throw new Error(`Char fetch failed: ${r.status}`); return r.text(); })
        ]);

        const abilitiesParsed = Papa.parse(abilitiesRes, { header: false, skipEmptyLines: true, dynamicTyping: false });
        if (abilitiesParsed.errors.length) throw new Error('Abilities parse error');
        const abilitiesRows = abilitiesParsed.data;
        const skills = abilitiesRows[0].slice(1).map(s => s.trim().toLowerCase());
        skills.forEach((skill, colIndex) => {
            let currentAbility = null;
            for (let r = 1; r < abilitiesRows.length; r++) {
                const keyCell = abilitiesRows[r][0];
                const valueCell = abilitiesRows[r][colIndex + 1];
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
            if (!abilitiesData.has(skill)) abilitiesData.set(skill, []);
            abilitiesData.get(skill).push(ability);
        }

        const waysParsed = Papa.parse(waysRes, { header: false, skipEmptyLines: true, dynamicTyping: false });
        if (waysParsed.errors.length) throw new Error('Ways parse error');
        const waysRows = waysParsed.data;
        let includeRowIdx = waysRows.findIndex(row => (row[0] || '').toLowerCase().trim().includes('include'));
        if (includeRowIdx === -1) throw new Error('Missing "Include" row');
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

        const charParsed = Papa.parse(charRes, { header: false, skipEmptyLines: true, dynamicTyping: false });
        if (charParsed.errors.length) throw new Error('Char parse error');
        const charRows = charParsed.data;
        const headers = charRows[0].map(h => h.trim());

        const dataByCategory = parseCsvByCategories(headers, charRows);

        gearData = dataByCategory.gear || [];
        allOptions = gearData;
        nonPackOptions = gearData.filter(g => g.category.toLowerCase() !== 'packs');

        const proficiencies = dataByCategory.proficiencies || [];
        profData.strike = proficiencies.filter(g => g.category.toLowerCase() === 'strike');
        profData.blast = proficiencies.filter(g => g.category.toLowerCase() === 'blast');
        profData.invoke = proficiencies.filter(g => g.category.toLowerCase() === 'invoke');

        updateAbilitySelectors('trick');
        updateAbilitySelectors('talent');
        populateRoleSelector();
        updateWayOptions();
        generateGearEntries();
        ['strike', 'blast', 'invoke'].forEach(type => populateProficiencySelectors(type));
    } catch (err) {
        document.getElementById('content-sections').innerHTML = '<div class="no-results">Error loading data: ' + err.message + '</div>';
    }
}

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

        const configs = entries.map(({ header, idx }) => {
            const subCategory = header.replace(prefix, '').trim();
            const camelPrefix = prefix.replace(' ', '') + subCategory.replace(/\s+/g, '');
            const related = headers.reduce((acc, hh, i) => {
                if (hh.startsWith(camelPrefix) && hh !== header) {
                    acc.push({ suffix: hh.replace(camelPrefix, '').trim(), idx: i });
                }
                return acc;
            }, []);
            return { mainIdx: idx, subCategory, related };
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

function parseItemProps(item, related, row) {
    related.forEach(rel => {
        let val = row[rel.idx]?.trim();
        if (!val) return;

        const suffixLower = rel.suffix.toLowerCase();
        if (suffixLower.includes('load') || suffixLower.includes('slots') || suffixLower.includes('used') || suffixLower.includes('cost')) {
            val = parseFloat(val) || 0;
        } else if (suffixLower.includes('bonus')) {
            val = parseInt(val) || 0;
        }
        item[rel.suffix.toLowerCase()] = val;
    });
}

function populateProficiencySelectors(type) {
    const profs = profData[type] || [];
    for (let i = 1; i <= MAX_PROF_SLOTS; i++) {
        const sel = getElement(type + 'ProfSelector' + i);
        if (sel) {
            sel.innerHTML = '<option value="">Select Proficiency</option>' + 
                profs.map(p => `<option value="${p.name}">${p.name}</option>`).join('');
        }
    }
}

function updateProficiencySelectors(type, rank) {
    for (let i = 1; i <= MAX_PROF_SLOTS; i++) {
        const el = getElement(type + 'ProfSelector' + i);
        if (el) el.hidden = i > rank;
    }
    populateProficiencySelectors(type);
}

function calculateProficiencyPoints(type) {
    // TODO: Implement proficiency points calculation if needed
}

function rebuildDynamicSelectors(config) {
    const {
        amountInputId, containerSelector, itemPrefix, itemClass, selectorClass,
        descriptionSuffix = 'Description', extraOffset = 0, populateFunction, abilityType
    } = config;
    const inputEl = getElement(amountInputId);
    if (!inputEl) return;
    const currentAmount = Math.max(0, parseInt(inputEl.value) || 0);
    inputEl.value = currentAmount;
    const totalSlots = currentAmount + extraOffset;
    const container = document.querySelector(containerSelector);
    if (!container) return;
    const saved = {};
    for (let i = 1; i <= 20; i++) {
        const sel = getElement(`${itemPrefix}${i}`);
        if (sel) saved[i] = sel.value;
    }
    if (itemPrefix === 'talent') {
        container.querySelectorAll('[id^="talentTable"]:not(#wayTalent)').forEach(el => el.remove());
    } else {
        container.querySelectorAll(`[id^="${itemPrefix}sTable"]`).forEach(el => el.remove());
    }
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
    for (let i = 1; i <= totalSlots; i++) {
        const select = getElement(`${itemPrefix}${i}`);
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

document.addEventListener('change', e => {
    const t = e.target;
    const clamp = (val, min = 0) => Math.max(min, parseInt(val) || min);

    if (t.matches('#talentAmount, #tricksAmount')) {
        const type = t.id.replace('Amount', '');
        const value = clamp(t.value);
        t.value = value;
        getElement(`total${type.charAt(0).toUpperCase() + type.slice(1)}s`).textContent = 1 + value;
        (type === 'talent' ? updateTalentTables : updateTrickTables)();
        calculateAbilities();
        return;
    }

    if (t.matches('.talentSelector, .trickSelector')) {
        const type = t.className.replace('Selector', '');
        populateAbilityInfo(t.id, getQualifiedAbilities(type), type);
        calculateAbilities();
        return;
    }

    if (t.matches('select[id$="SkillRank"]')) {
        updateSkillModAndPassive(t.id);
        updateWayOptions();
        calculateSkillPoints();
        const type = t.id.replace('SkillRank', '').toLowerCase();
        if (['strike', 'blast', 'invoke'].includes(type)) updateProficiencySelectors(type, clamp(t.value));
        updateAbilitySelectors('trick');
        updateAbilitySelectors('talent');
        return;
    }

    if (t.matches('#bodyPriority, #mindPriority, #spiritPriority, #charLvl, input[id$="Value"][type="number"]')) {
        calculateAttributeValues();
        updateAttributeGroups();
        updateAllSkillModsAndPassives();
        calculateSkillPoints();
        calculateAbilities();
        if (t.matches('input[id$="Value"][type="number"]')) {
            const groupKey = /might|agility|brawn/.test(t.id) ? 'body' : /will|wit|resolve/.test(t.id) ? 'mind' : 'spirit';
            updateAttributeGroup(ATTRIBUTE_GROUPS[groupKey]);
            updateSkillsForMod(t.id);
        }
        return;
    }

    if (t.matches('#roleSelector')) {
        populateRoleInfo(e);
        return;
    }

    if (t.matches('.gearAmtInputField, [id^="stowed-"][id$="-amt"], [id^="gear"][id$="Select"], [id^="stowed-"][id$="-select"]')) {
        if (t.matches('[id$="Select"]')) handleReadySelectChange(t.id.match(/gear(\d+)Select/)[1]);
        const match = t.id.match(/(gear|stowed-(\d+)-(\d+))-(Amt|amt|select)/);
        if (match) {
            const [,, readyI, stowedJ] = match;
            if (/Amt|amt/.test(t.id)) t.value = clamp(t.value, 1);
            if (stowedJ) {
                updateStowedLoad(readyI, stowedJ);
                updateReadyLoad(readyI);
            } else {
                updateReadyLoad(readyI);
            }
            calculateLoad();
        }
        return;
    }

    if (t.matches('[id$="ProfSelector"]')) {
        const type = t.id.match(/(strike|blast|invoke)ProfSelector/)?.[1];
        if (type) calculateProficiencyPoints(type);
    }
});

function populateRoleSelector() {
    const sel = getElement('roleSelector');
    sel.innerHTML = '<option value="wayEmpty">Select Way</option>';
    waysData.forEach(w => sel.innerHTML += `<option value="${w.name}">${w.name}</option>`);
}

function updateWayOptions() {
    const sel = getElement('roleSelector');
    waysData.forEach(way => {
        let qualified = way.reqSkill === 'Any'
            ? Object.values(SKILL_ID_MAP).some(id => getElement(id)?.value > 1)
            : getElement(way.skillId)?.value > 1;
        const opt = sel.querySelector(`option[value="${way.name}"]`);
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
        const sel = getElement(id);
        if (sel && parseInt(sel.value) >= 2 && abilitiesData.get(name.toLowerCase())) {
            result.push(...abilitiesData.get(name.toLowerCase()).filter(a => a.type === type));
        }
    });
    return result;
}

function populateAbilityInfo(selectId, abilities, type) {
    const value = getElement(selectId)?.value;
    const ability = abilities.find(a => a.name === value);
    const desc = getElement(selectId + 'Description');
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
    getElement('wayTalentName').textContent = way.name;
    const desc = getElement('wayTalentDesc');
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
        const sel = getElement(skillId);
        if (sel && parseInt(sel.value) < 2) {
            sel.value = '2';
            sel.dispatchEvent(new Event('change'));
        }
        if (['strikeSkillRank', 'blastSkillRank', 'invokeSkillRank'].includes(skillId)) {
            const type = skillId.replace('SkillRank', '').toLowerCase();
            const rank = parseInt(sel.value) || 0;
            updateProficiencySelectors(type, rank);
        }
    }
    const primary = way.props[Object.keys(way.props).find(k => k.includes('primary attribute'))];
    if (primary) {
        const map = { 'Body': 'bodyPriority', 'Mind': 'mindPriority', 'Spirit': 'spiritPriority' };
        const pri = getElement(map[primary]);
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
    const level = parseInt(getElement('charLvl').value) || 1;
    const total = level * 3 + 9;
    let spent = 0;
    Object.values(SKILL_ID_MAP).forEach(id => {
        const sel = getElement(id);
        if (sel) spent += parseInt(sel.value) || 0;
    });
    getElement('skillPoints').textContent = total - spent;
}

function calculateAbilities() {
    const level = parseInt(getElement('charLvl').value) || 1;
    const tExtra = parseInt(getElement('talentAmount').value) || 1;
    const trExtra = parseInt(getElement('tricksAmount').value) || 1;
    getElement('abilityNumber').textContent = tExtra + trExtra + 2;
    const remaining = level + 1 - Math.max(0, (tExtra - 1) + (trExtra - 1));
    getElement('remainingAbilities').textContent = remaining < 0 ? 0 : remaining;
}

function calculateAttributeValues() {
    const level = parseInt(getElement('charLvl').value) || 1;
    const pri = 2 + (level >= 2 ? 1 : 0) + (level >= 8 ? 1 : 0);
    const sec = 2 + (level >= 6 ? 1 : 0);
    const ter = 1 + (level >= 4 ? 1 : 0) + (level >= 10 ? 1 : 0);
    ['body', 'mind', 'spirit'].forEach(attr => {
        const priVal = getElement(attr + 'Priority').value;
        let val = priVal === '1' ? pri : priVal === '2' ? sec : ter;
        getElement(attr + 'Value').textContent = val;
    });
    updateSkillsForMod('bodyValue');
    updateSkillsForMod('mindValue');
    updateSkillsForMod('spiritValue');
}

function updateAttributeGroups() { Object.values(ATTRIBUTE_GROUPS).forEach(g => updateAttributeGroup(g)); }

function updateAttributeGroup(group) {
    const level = parseInt(getElement('charLvl').value) || 1;
    const pri = getElement(group.priorityId).value || '3';
    let points = 1 + Math.floor((level - 1) / 3);
    if (pri === '1') points = 3 + Math.floor((level + 1) / 3);
    if (pri === '2') points = 2 + Math.floor(level / 3);
    const max = parseInt(getElement(group.primaryValueId).textContent) || 0;
    let sum = 0;
    group.subIds.forEach(id => {
        const inp = getElement(id);
        if (inp) {
            inp.max = max;
            let v = Math.min(max, Math.max(0, parseInt(inp.value) || 0));
            inp.value = v;
            sum += v;
        }
    });
    const rem = points - sum;
    const el = getElement(group.pointsId);
    if (el) {
        el.textContent = rem;
        el.classList.toggle('hidden', rem === 0);
    }
    group.subIds.forEach(id => updateSkillsForMod(id));
}

function updateSkillModAndPassive(skillId) {
    const sel = getElement(skillId);
    if (!sel) return;
    const rank = parseInt(sel.value) || 0;
    const modId = SKILL_MOD_MAP[skillId];
    const modVal = parseInt(getElement(modId)?.value || getElement(modId)?.textContent || 0);
    const name = skillId.replace('SkillRank', '');
    const modEl = getElement(name + 'Mod');
    if (modEl) modEl.textContent = modVal;
    const passiveEl = getElement(name + 'Passive');
    if (passiveEl) passiveEl.textContent = 2 + rank + modVal;
}

function updateSkillsForMod(subId) {
    Object.entries(SKILL_MOD_MAP).forEach(([skillId, modId]) => {
        if (modId === subId) updateSkillModAndPassive(skillId);
    });
}

function updateAllSkillModsAndPassives() {
    Object.keys(SKILL_ID_MAP).forEach(skillId => updateSkillModAndPassive(skillId));
}

function generateGearEntries() {
    const container = getElement('gearEntries');
    container.innerHTML = '';

    for (let i = 1; i <= MAX_READY_SLOTS; i++) {
        const entry = document.createElement('div');
        entry.className = 'gearEntry';
        entry.innerHTML = `
            <select id="gear${i}Select" class="gearSelector">
                <option value="emptyStowedGearSlot">Ready Slot</option>
            </select>
            <input type="number" id="gear${i}Amt" class="gearAmtInputField" min="1" value="1"/>
            <div id="gear${i}Load" class="gearLoad"></div>
        `;
        container.appendChild(entry);

        const sel = getElement(`gear${i}Select`);
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

        sel.addEventListener('change', () => {
            handleReadySelectChange(i);
        });

        const amtInput = getElement(`gear${i}Amt`);
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
    const sel = getElement(`gear${i}Select`);
    const newGearName = sel.value;
    const item = allOptions.find(g => g.name === newGearName);
    const oldDetails = getElement(`gear${i}Details`);
    if (oldDetails) oldDetails.remove();
    if (item?.details?.trim()) {
        const detailsDiv = document.createElement('div');
        detailsDiv.id = `gear${i}Details`;
        detailsDiv.className = 'hasDetails';
        detailsDiv.textContent = 'i';
        detailsDiv.dataset.details = item.details.trim();
        sel.closest('.gearEntry').appendChild(detailsDiv);
    }
    const wasPack = readyState[i-1].gear && allOptions.find(g => g.name === readyState[i-1].gear)?.category === 'Packs';
    const isPack = item?.category === 'Packs';
    if (wasPack && !isPack) {
        readyState[i-1].stowed = [];
        renderStowed(i);
    }
    if (isPack && !wasPack) {
        const slots = item.stowedslots || 0;
        readyState[i-1].stowed = Array(slots).fill(null).map(() => ({ gear: '', amt: 1 }));
        renderStowed(i);
    }
    if (isPack && wasPack && readyState[i-1].gear !== newGearName) {
        const slots = item.stowedslots || 0;
        readyState[i-1].stowed = Array(slots).fill(null).map(() => ({ gear: '', amt: 1 }));
        renderStowed(i);
    }
    readyState[i-1].gear = newGearName;
    readyState[i-1].amt = parseInt(getElement(`gear${i}Amt`).value) || 1;
    updateReadyLoad(i);
    calculateLoad();
}

function renderStowed(i) {
    let container = getElement(`stowed-container-${i}`);
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
        entry.innerHTML = `
            <select id="stowed-${i}-${stowedIndex}-select" class="gearSelector">
                <option value="emptyStowedGearSlot">Stowed Slot</option>
            </select>
            <input type="number" id="stowed-${i}-${stowedIndex}-amt" min="1" value="${s.amt}"/>
            <div id="stowed-${i}-${stowedIndex}-load" class="gearLoad"></div>
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

        sel.addEventListener('change', () => {
            const selectedName = sel.value;
            const item = nonPackOptions.find(g => g.name === selectedName);
            const oldDetails = getElement(`stowed-${i}-${stowedIndex}-details`);
            if (oldDetails) oldDetails.remove();
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

function updateStowedLoad(readyI, stowedJ) {
    const sel = getElement(`stowed-${readyI}-${stowedJ}-select`);
    if (!sel) return;
    const opt = sel.options[sel.selectedIndex];
    const baseLoad = parseFloat(opt.getAttribute('data-load')) || 0;
    const qty = readyState[readyI-1].stowed[stowedJ-1].amt;
    const total = baseLoad * qty;
    const loadDiv = getElement(`stowed-${readyI}-${stowedJ}-load`);
    if (loadDiv) {
        loadDiv.textContent = total > 0 ? total.toFixed(2).replace(/\.?0+$/, '') : '';
        loadDiv.style.color = (qty > 1 && baseLoad > 1) ? 'red' : '';
    }
}

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
    const loadDiv = getElement(`gear${i}Load`);
    if (loadDiv) {
        loadDiv.textContent = total > 0 ? total.toFixed(2).replace(/\.?0+$/, '') : '';
        if (item?.category === 'Packs') loadDiv.style.color = total > item.loadLimit ? 'red' : '';
    }
}

function calculateLoad() {
    let totalLoad = 0;
    readyState.forEach((state, idx) => {
        const i = idx + 1;
        const loadText = getElement(`gear${i}Load`)?.textContent || '0';
        totalLoad += parseFloat(loadText) || 0;
    });
    const formattedTotal = totalLoad.toFixed(2).replace(/\.?0+$/, '');
    getElement('totalLoadValue').textContent = formattedTotal;
}

const TOOLTIP_ID = 'universal-tooltip';

document.addEventListener('mouseover', e => {
    if (e.target.matches('.hasDetails') && e.target.dataset.details?.trim()) {
        let tooltip = getElement(TOOLTIP_ID);
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
        const tooltip = getElement(TOOLTIP_ID);
        if (tooltip) tooltip.classList.remove('visible');
    }
});

interact('.draggable')
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

window.addEventListener('load', () => {
    loadAllData();
    calculateSkillPoints();
    calculateAbilities();
    calculateAttributeValues();
    updateAttributeGroups();
    updateAllSkillModsAndPassives();
    ['strike', 'blast', 'invoke'].forEach(t => {
        const sel = getElement(t + 'SkillRank');
        if (sel) updateProficiencySelectors(t, parseInt(sel.value) || 0);
    });
    updateTalentTables();
    updateTrickTables();
    calculateLoad();
    tippy.setDefaultProps({
      theme: 'custom',
      arrow: true,
      animation: 'fade',
      allowHTML: true,
      interactive: true,
      maxWidth: 650,
      placement: 'right-start',
      offset: [0, 10],
      zIndex: 100,
    });

    document.querySelectorAll('abbr').forEach(el => {
      const term = el.textContent.toLowerCase().trim();
      const predefinedMap = {
        'short': 'First use or end of creators next turn',
        'round': 'Until end of creators next turn',
        'combat': 'End of the encounter',
        'vigilant': 'Attackers get -1 die and you have +1 Armor against AoE',
        'boosted': '+1 die to rolls',
        'yon': 'Pronounced (Y-oh-n). Series of movements used for Conjurations'
      };
      const content = predefinedMap[term] || 'Unknown term';
      tippy(el, {
        content: content,
        trigger: 'mouseenter focus',
        hideOnClick: false
      });
    });

    tippy('.hasDetails', {
      content: reference => reference.dataset.details || 'No details',
      trigger: 'mouseenter focus',
      hideOnClick: false
    });

    document.querySelectorAll('.charInfoHover').forEach(trigger => {
      const detailsId = trigger.nextElementSibling?.id;
      if (!detailsId) return;
      const contentEl = getElement(detailsId);
      
      tippy(trigger, {
        content: contentEl.innerHTML,
        trigger: 'mouseenter focus click',
        allowHTML: true,
        interactive: true,
        hideOnClick: 'toggle',
        onShow(instance) {
          instance.popper.querySelector('.closeRitual')?.addEventListener('click', () => instance.hide());
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
    });
});