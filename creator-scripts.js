// creator-scripts.js
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
    mind:   { priorityId: 'mindPriority', pointsId: 'mindAttributePoints', primaryValueId: 'mindValue', subIds: ['willValue', 'witValue', 'resolveValue'] },
    spirit:   { priorityId: 'spiritPriority', pointsId: 'spiritAttributePoints', primaryValueId: 'spiritValue', subIds: ['vigorValue', 'faithValue', 'empathyValue'] }
};

let waysData = [], profData = { strike: [], blast: [], invoke: [] }, gearData, abilitiesData = new Map(), hoverRulesData = [];
let talentAmount = 1;
let tricksAmount = 1;
let gearSlots = 5; // Initial gear slots

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

        // Parse hoverRules specially
        const hoverIdx = headers.indexOf('hoverRules');
        const detailsIdx = headers.indexOf('hoverRules Details');
        if (hoverIdx !== -1 && detailsIdx !== -1) {
            for (let r = 1; r < charRows.length; r++) {
                const rule = charRows[r][hoverIdx]?.trim();
                const detail = charRows[r][detailsIdx]?.trim();
                if (rule && detail) {
                    hoverRulesData.push({ rule, detail });
                }
            }
        }

        // For debugging
        console.log('Parsed Data:', dataByCategory);
        console.log('Hover Rules Data:', hoverRulesData);

        // Assign for gear (now global for gear-scripts.js to access)
        gearData = dataByCategory.gear || [];

        // Assign for proficiencies
        const proficiencies = dataByCategory.proficiencies || [];
        profData.strike = proficiencies.filter(g => g.category.toLowerCase() === 'strike');
        profData.blast = proficiencies.filter(g => g.category.toLowerCase() === 'blast');
        profData.invoke = proficiencies.filter(g => g.category.toLowerCase() === 'invoke');

        // Post-parsing init (e.g., populate selectors, etc.)
        TooltipManager.init();

        updateAbilitySelectors('trick');
        updateAbilitySelectors('talent');
        populateRoleSelector();
        ['strike', 'blast', 'invoke'].forEach(type => populateProficiencySelectors(type));

        // Dispatch event to signal data is ready
        window.dispatchEvent(new CustomEvent('dataLoaded'));
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
    const saved = {};
    for (let i = 1; i <= 5; i++) {
        const sel = document.getElementById(type + 'ProfSelector' + i);
        if (sel) {
            saved[i] = sel.value;
            sel.innerHTML = '<option value="">Select Proficiency</option>' + 
                profs.map(p => `<option value="${p.name}">${p.name}</option>`).join('');
        }
    }
    for (let i = 1; i <= 5; i++) {
        const sel = document.getElementById(type + 'ProfSelector' + i);
        if (sel) {
            if (saved[i] && Array.from(sel.options).some(opt => opt.value === saved[i])) {
                sel.value = saved[i];
            }
            let desc = document.getElementById(type + 'ProfSelector' + i + 'Description');
            if (!desc) {
                sel.insertAdjacentHTML('afterend', `<div id="${type}ProfSelector${i}Description"></div>`);
            }
            if (sel.value) {
                populateProficiencyInfo(sel.id, type);
            }
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

// ———————————————————————— REUSABLE DYNAMIC SELECTORS ————————————————————————
function rebuildDynamicSelectors(config, amount) {
    const {
        containerSelector, itemPrefix, itemClass, selectorClass,
        descriptionSuffix = 'Description', extraOffset = 0, populateFunction, abilityType
    } = config;
    const currentAmount = Math.max(0, parseInt(amount) || 0);
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
        container.querySelectorAll('[id^="talentsTable"]:not(#wayTalent)').forEach(el => el.remove());
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
        containerSelector: '.talentWrapper',
        itemPrefix: 'talent',
        itemClass: 'talentAbility',
        selectorClass: 'talentSelector',
        populateFunction: () => updateAbilitySelectors('talent'),
        abilityType: 'talent'
    }, talentAmount);
}
function updateTrickTables() {
    rebuildDynamicSelectors({
        containerSelector: '.trickWrapper',
        itemPrefix: 'tricks',
        itemClass: 'trickAbility',
        selectorClass: 'trickSelector',
        extraOffset: 1,
        populateFunction: () => updateAbilitySelectors('trick'),
        abilityType: 'trick'
    }, tricksAmount);
}
// ———————————————————————— ONE EVENT LISTENER (OPTIMIZED) ————————————————————————
document.addEventListener('change', e => {
    const t = e.target;
    const clamp = (el, min = 0) => (el.value = Math.max(min, parseInt(el.value) || min), parseInt(el.value));

    // Talent/Trick Selectors (combined)
    if (t.matches('.talentSelector, .trickSelector')) {
        const type = t.className.replace('Selector', '');
        populateAbilityInfo(t.id, getQualifiedAbilities(type), type);
        calculateAbilities();
        return;
    }

    // Skill Ranks
    if (t.matches('select[id$="SkillRank"]')) {
        updateSingleSkillModAndPassive(t.id);
        updateWayOptions();
        calculateSkillPoints();
        const type = t.id.replace('SkillRank', '').toLowerCase();
        if (['strike', 'blast', 'invoke'].includes(type)) updateProficiencySelectors(type, parseInt(t.value) || 0);
        updateAbilitySelectors('trick');
        updateAbilitySelectors('talent');
        // Refresh existing ability descriptions
        document.querySelectorAll('.talentSelector, .trickSelector').forEach(sel => {
            if (sel.value && sel.value !== `${sel.className.replace('Selector', '')}Empty`) {
                const abType = sel.className.replace('Selector', '');
                populateAbilityInfo(sel.id, getQualifiedAbilities(abType), abType);
            }
        });
        // Refresh way talent if selected
        const roleSel = document.getElementById('roleSelector');
        if (roleSel && roleSel.value !== 'wayEmpty') {
            populateRoleInfo({ target: roleSel });
        }
        // Refresh proficiency descriptions if applicable
        if (['strike', 'blast', 'invoke'].includes(type)) {
            for (let i = 1; i <= 5; i++) {
                const sel = document.getElementById(type + 'ProfSelector' + i);
                if (sel && !sel.hidden && sel.value) {
                    populateProficiencyInfo(sel.id, type);
                }
            }
        }
        return;
    }

    // Priorities, Level, Sub-attributes (combined attribute-related)
    if (t.matches('#bodyPriority, #mindPriority, #spiritPriority, #charLvl, input[id$="Value"][type="number"]')) {
        if (t.matches('#bodyPriority, #mindPriority, #spiritPriority')) {
            const priorities = {
                body: document.getElementById('bodyPriority'),
                mind: document.getElementById('mindPriority'),
                spirit: document.getElementById('spiritPriority')
            };
            const changedAttr = t.id.replace('Priority', '').toLowerCase();
            const newPri = t.value;
            const priorityUnassigned = 'priorityUnassigned';
            if (newPri !== priorityUnassigned) {
                for (const [attr, sel] of Object.entries(priorities)) {
                    if (attr !== changedAttr && sel.value === newPri) {
                        sel.value = priorityUnassigned;
                    }
                }
            }
        }
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

    // Way selector
    if (t.matches('#roleSelector')) {
        populateRoleInfo(e);
        return;
    }

    // Proficiency Selectors
    if (t.matches('[id$="ProfSelector"]')) {
        const type = t.id.match(/(strike|blast|invoke)ProfSelector/)?.[1];
        if (type) {
            calculateProficiencyPoints(type);
            populateProficiencyInfo(t.id, type);
        }
    }
});
document.addEventListener('click', e => {
    const t = e.target;
    if (t.matches('#talentPlus, #talentMinus, #tricksPlus, #tricksMinus, #gearPlus, #gearMinus')) {
        let type, min = 1;
        if (t.id.includes('talent')) {
            type = 'talent';
        } else if (t.id.includes('tricks')) {
            type = 'tricks';
        } else if (t.id.includes('gear')) {
            type = 'gear';
            min = 1; // Adjust min for gear if needed
        }
        let value = type === 'talent' ? talentAmount : type === 'tricks' ? tricksAmount : gearSlots;
        if (t.id.includes('Plus')) {
            value += 1;
        } else if (t.id.includes('Minus') && value > min) {
            value -= 1;
        }
        if (type === 'talent') {
            talentAmount = value;
            updateTalentTables();
        } else if (type === 'tricks') {
            tricksAmount = value;
            updateTrickTables();
        } else if (type === 'gear') {
            gearSlots = value;
            rebuildGearSelectors();
        }
        if (type !== 'gear') calculateAbilities();
    }
});
// ———————————————————————— CORE FUNCTIONS ————————————————————————
function populateRoleSelector() {
    const sel = document.getElementById('roleSelector');
    sel.innerHTML = '<option value="wayEmpty">Select Way</option>';
    buildWayGroups();
}
function buildWayGroups() {
    const sel = document.getElementById('roleSelector');
    // Preserve current selection
    const currentValue = sel.value;
    // Fully reset to placeholder
    sel.innerHTML = '<option value="wayEmpty">Select Way</option>';
    // Filter available and unavailable
    const available = [];
    const unavailable = [];
    waysData.forEach(way => {
        const qualified = way.reqSkill === 'Any'
            ? Object.values(SKILL_ID_MAP).some(id => parseInt(document.getElementById(id)?.value || 0) > 1)
            : parseInt(document.getElementById(way.skillId)?.value || 0) > 1;
        (qualified ? available : unavailable).push(way);
    });
    // Sort alphabetically
    available.sort((a, b) => a.name.localeCompare(b.name));
    unavailable.sort((a, b) => a.name.localeCompare(b.name));
    // Add available group
    if (available.length > 0) {
        const availGroup = document.createElement('optgroup');
        availGroup.label = 'Available Ways';
        available.forEach(way => {
            const opt = document.createElement('option');
            opt.value = way.name;
            opt.textContent = way.name;
            availGroup.appendChild(opt);
        });
        sel.appendChild(availGroup);
    }
    // Add unavailable group
    if (unavailable.length > 0) {
        const unavailGroup = document.createElement('optgroup');
        unavailGroup.label = 'Unavailable Ways';
        unavailable.forEach(way => {
            const opt = document.createElement('option');
            opt.value = way.name;
            opt.textContent = way.name;
            unavailGroup.appendChild(opt);
        });
        sel.appendChild(unavailGroup);
    }
    // Restore selection if still valid
    sel.value = currentValue;
}
function updateWayOptions() {
    buildWayGroups();
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
function evaluateExpr(expr) {
  // Replace skill names with current ranks
  expr = expr.replace(/\b([A-Z][a-z]+)\b/g, match => {
    const id = SKILL_ID_MAP[match];
    if (id) {
      return parseInt(document.getElementById(id)?.value) || 0;
    }
    return match;
  });

  // Tokenize: numbers and operators
  const tokens = expr.match(/(\d+|[+\-*/])/g) || [];
  if (tokens.length === 0) return 0;

  // Handle * and / first (left to right)
  for (let i = 1; i < tokens.length; i += 2) {
    if (tokens[i] === '*' || tokens[i] === '/') {
      let left = parseFloat(tokens[i - 1]);
      let right = parseFloat(tokens[i + 1]);
      let res;
      if (tokens[i] === '*') {
        res = left * right;
      } else {
        res = Math.floor(left / right);
      }
      tokens.splice(i - 1, 3, res);
      i -= 2; // Adjust index after splice
    }
  }

  // Handle + and - (left to right)
  for (let i = 1; i < tokens.length; i += 2) {
    if (tokens[i] === '+' || tokens[i] === '-') {
      let left = parseFloat(tokens[i - 1]);
      let right = parseFloat(tokens[i + 1]);
      let res = tokens[i] === '+' ? left + right : left - right;
      tokens.splice(i - 1, 3, res);
      i -= 2;
    }
  }

  return Math.floor(tokens[0]) || 0; // Final floor for safety
}
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function escapeHtml(string) {
    return string.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}
function processWithTooltips(text) {
    let processed = text;
    hoverRulesData.forEach(({ rule, detail }) => {
        const regex = new RegExp(`\\b${escapeRegExp(rule)}\\b`, 'gi');
        processed = processed.replace(regex,`<span class="hoverRules" data-tip="rule:${rule}">$&</span>`);

    });
    return processed;
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
        let processedValue = ability.details[key];
        // Replace |expr| with spanned value
        processedValue = processedValue.replace(/\|([^|]+)\|/g, (match, expr) => {
            const computed = evaluateExpr(expr);
            return `<span class="hoverExpr" data-tip="expr:${expr}">${computed}</span>`;
        });
        const div = document.createElement('div');
        div.className = type + key.charAt(0).toUpperCase() + key.slice(1);
        div.innerHTML = processWithTooltips(processedValue);
        desc.appendChild(div);
    });
}
function populateProficiencyInfo(selectId, type) {
    const value = document.getElementById(selectId)?.value;
    if (!value) return;
    const prof = profData[type].find(p => p.name === value);
    const desc = document.getElementById(selectId + 'Description');
    if (!desc || !prof || !prof.details) { desc.innerHTML = ''; return; }
    desc.innerHTML = processWithTooltips(prof.details);
}
function populateRoleInfo(e) {
    const name = e.target.value;
    if (!name || name === 'wayEmpty') return;
    const way = waysData.find(w => w.name === name);
    if (!way) return;
    document.getElementById('wayTalentName').textContent = way.name;
    const desc = document.getElementById('wayTalentDesc');
    desc.innerHTML = '';
    ['passive', 'focus', 'critical effect'].forEach(key => {
        const propKey = Object.keys(way.props).find(k => k.toLowerCase().includes(key));
        let val = propKey ? way.props[propKey] : '';
        if (val) {
            val = val.replace(/\|([^|]+)\|/g, (match, expr) => {
                const computed = evaluateExpr(expr);
                return `<span class="hoverExpr" data-tip="expr:${expr}">${computed}</span>`;
            });
            const div = document.createElement('div');
            div.className = 'talent' + key.charAt(0).toUpperCase() + key.slice(1).replace(/\s/g, '');
            div.innerHTML = processWithTooltips(val);
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
    const tExtra = talentAmount;
    const trExtra = tricksAmount;
    document.getElementById('abilityNumber').textContent = tExtra + trExtra + 2;
    const remaining = level + 1 - Math.max(0, tExtra + trExtra);
    document.getElementById('remainingAbilities').textContent = remaining < 0 ? 0 : remaining;
}
function calculateAttributeValues() {
    const level = parseInt(document.getElementById('charLvl').value) || 1;
    const pri = 2 + (level >= 2 ? 1 : 0) + (level >= 8 ? 1 : 0);
    const sec = 2 + (level >= 6 ? 1 : 0);
    const ter = 1 + (level >= 4 ? 1 : 0) + (level >= 10 ? 1 : 0);
    ['body', 'mind', 'spirit'].forEach(attr => {
        const priVal = document.getElementById(attr + 'Priority').value;
        let val = priVal === '1' ? pri : priVal === '2' ? sec : priVal === '3' ? ter : 0;
        document.getElementById(attr + 'Value').textContent = val;
    });
    updateSkillsForMod('bodyValue');
    updateSkillsForMod('mindValue');
    updateSkillsForMod('spiritValue');
}
function updateAttributeGroups() { Object.values(ATTRIBUTE_GROUPS).forEach(g => updateAttributeGroup(g)); }
function updateAttributeGroup(group) {
    const level = parseInt(document.getElementById('charLvl').value) || 1;
    const pri = document.getElementById(group.priorityId).value;
    let points = pri === '' ? 0 : 1 + Math.floor((level - 1) / 3);
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
function updateSingleSkillModAndPassive(skillId) {
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
        if (modId === subId) updateSingleSkillModAndPassive(skillId);
    });
}
function updateAllSkillModsAndPassives() {
    Object.keys(SKILL_ID_MAP).forEach(skillId => updateSingleSkillModAndPassive(skillId));
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
// New: Rebuild gear slots
function rebuildGearSelectors() {
    const container = document.getElementById('gearEntries');
    if (!container) return;
    // Save current values
    const saved = {};
    for (let i = 1; i <= 20; i++) {
        const sel = document.getElementById('gear' + i + 'Select');
        const amt = document.getElementById('gear' + i + 'Amt');
        if (sel) saved[i] = { select: sel.value, amt: amt ? amt.value : 1 };
    }
    // Clear dynamic slots
    container.innerHTML = '';
    // Build slots
    for (let i = 1; i <= gearSlots; i++) {
        const entry = document.createElement('div');
        entry.className = 'gearEntry';
        entry.innerHTML = `
            <select id="gear${i}Select" class="gearSelector"></select>
            <input id="gear${i}Amt" type="number" min="1" value="1">
            <div id="gear${i}Load"></div>
        `;
        container.appendChild(entry);
    }
    // Assume populateGearSelectors() to fill options (from gear-scripts.js or add)
    populateGearSelectors(); // Placeholder; implement if needed
    // Restore values and update loads
    for (let i = 1; i <= gearSlots; i++) {
        const sel = document.getElementById('gear' + i + 'Select');
        const amt = document.getElementById('gear' + i + 'Amt');
        if (sel && saved[i]) {
            sel.value = saved[i].select || '';
            if (amt) amt.value = saved[i].amt || 1;
        }
        updateGearLoad(i);
    }
}
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
    rebuildGearSelectors(); // Initial build for gear
});