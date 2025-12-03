// creator-scripts.js

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

let talentAmount = 1;
let tricksAmount = 1;

function populateProficiencySelectors(type) {
    const profs = profData[type] || [];
    const saved = {};
    for (let i = 1; i <= 5; i++) {
        const sel = document.getElementById(type + 'ProfSelector' + i);
        if (sel) {
            saved[i] = sel.value;
            sel.innerHTML = '<option value="">Select Proficiency</option>' +
                profs.map(p => `<option value="${p.name}">${p.shortdetails}</option>`).join('');
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
    populateProficiencySelectors(type); // Add this
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
function updateAbilityTables(type) {
    const isTalent = type === 'talent';
    const amount = isTalent ? talentAmount : tricksAmount;
    rebuildDynamicSelectors({
        containerSelector: isTalent ? '.talentWrapper' : '.trickWrapper',
        itemPrefix: isTalent ? 'talent' : 'tricks',
        itemClass: isTalent ? 'talentAbility' : 'trickAbility',
        selectorClass: isTalent ? 'talentSelector' : 'trickSelector',
        extraOffset: isTalent ? 0 : 1,
        populateFunction: () => updateAbilitySelectors(type),
        abilityType: type
    }, amount);
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
        calculateDerivedStats();
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
        calculateDerivedStats();
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
        calculateDerivedStats();
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
    if (t.matches('#talentPlus, #talentMinus, #tricksPlus, #tricksMinus')) {
        const type = t.id.includes('talent') ? 'talent' : 'trick';
        let value = type === 'talent' ? talentAmount : tricksAmount;
        const min = 1;
        if (t.id.includes('Plus')) {
            value += 1;
        } else if (t.id.includes('Minus') && value > min) {
            value -= 1;
        }
        if (type === 'talent') {
            talentAmount = value;
        } else {
            tricksAmount = value;
        }
        updateAbilityTables(type);
        calculateAbilities();
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
    // Collect ability matchers: map from matchName (full or base) to fullName for data-tip
    const abilityMatchers = new Map();
    abilitiesData.forEach(abilities => {
        abilities.forEach(ability => {
            const fullName = ability.name;
            const capitalizedSkill = ability.skill.charAt(0).toUpperCase() + ability.skill.slice(1);
            const suffix = ` (${capitalizedSkill})`;
            abilityMatchers.set(fullName, fullName);
            if (fullName.endsWith(suffix)) {
                const baseName = fullName.slice(0, -suffix.length);
                if (!abilityMatchers.has(baseName)) { // Avoid conflicts; first wins
                    abilityMatchers.set(baseName, fullName);
                }
            }
        });
    });
    // Sort by length descending to replace longer phrases first
    const sortedMatchers = Array.from(abilityMatchers.entries()).sort((a, b) => b[0].length - a[0].length);
    // Wrap ability names/base names
    sortedMatchers.forEach(([matchName, fullName]) => {
        const regex = new RegExp(`\\b${escapeRegExp(matchName)}\\b`, 'gi');
        processed = processed.replace(regex, `<span class="hoverAbility" data-tip="ability:${fullName}">$&</span>`);
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
        if (key.toLowerCase() === 'name') return; // Skip rendering name
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
// Make all .draggable elements movable (no restrictions, touch/mouse support)
interact('.draggable')
  .draggable({
    inertia: false,
    autoScroll: false,
    listeners: {
      start(event) {
        const target = event.target;

        // Read computed transform matrix
        const style = window.getComputedStyle(target);
        const matrix = new DOMMatrixReadOnly(style.transform);

        // m41 = translateX, m42 = translateY
        target.setAttribute('data-x', matrix.m41);
        target.setAttribute('data-y', matrix.m42);
      },

      move(event) {
        const target = event.target;

        // restore from dataset
        let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
        let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        // apply transform and store values
        target.style.transform = `translate(${x}px, ${y}px)`;
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
      }
    }
  });
// ———————————————————————— INIT ————————————————————————
window.addEventListener('dataLoaded', () => {
    TooltipManager.init();
    populateRoleSelector();
    ['strike', 'blast', 'invoke'].forEach(type => populateProficiencySelectors(type));
    calculateSkillPoints();
    calculateAbilities();
    calculateAttributeValues();
    updateAttributeGroups();
    updateAllSkillModsAndPassives();
    ['strike', 'blast', 'invoke'].forEach(t => {
        const sel = document.getElementById(t + 'SkillRank');
        if (sel) updateProficiencySelectors(t, parseInt(sel.value) || 0);
    });
    updateAbilityTables('talent');
    updateAbilityTables('trick');
    calculateDerivedStats();
    // Note: gear-scripts.js will also init via 'dataLoaded' (as in your original)
});

function calculateDerivedStats() {
    const level = parseInt(document.getElementById('charLvl').value) || 1;
    const vitBase = 30;
    const marredBase = 20;
    const desperateBase = 10;
    const deadBase = -10;
    let vit = vitBase + 6 * (level - 1);
    let marred = marredBase + 4 * (level - 1);
    let desperate = desperateBase + 2 * (level - 1);
    let dead = deadBase - 2 * (level - 1);

    const brawn = parseInt(document.getElementById('brawnValue').value) || 0;
    const resolve = parseInt(document.getElementById('resolveValue').value) || 0;
    const faith = parseInt(document.getElementById('faithValue').value) || 0;
    const recoveryBonus = 3 + Math.floor((brawn + resolve + faith) / 3);

    const agility = parseInt(document.getElementById('agilityValue').value) || 0;
    const wit = parseInt(document.getElementById('witValue').value) || 0;
    const empathy = parseInt(document.getElementById('empathyValue').value) || 0;
    const breath = 3 + Math.floor((agility + wit + empathy) / 3);

    const might = parseInt(document.getElementById('mightValue').value) || 0;
    const will = parseInt(document.getElementById('willValue').value) || 0;
    const vigor = parseInt(document.getElementById('vigorValue').value) || 0;
    const inspirit = 3 + Math.floor((might + will + vigor) / 3);

    // Check for Tough talent
    const hasTough = Array.from(document.querySelectorAll('.talentSelector')).some(sel => sel.value.includes('Tough'));
    if (hasTough) {
        const enduranceRank = parseInt(document.getElementById('enduranceSkillRank').value) || 0;
        const bonus2x = enduranceRank * 2;
        const bonus4x = enduranceRank * 4;
        const bonus3x = enduranceRank * 3;
        desperate += bonus2x;
        dead -= bonus2x;
        marred += bonus4x;
        vit += bonus3x;
    }

    document.getElementById('vitValue').textContent = vit;
    document.getElementById('marredValue').textContent = marred;
    document.getElementById('desperateValue').textContent = desperate;
    document.getElementById('deadValue').textContent = dead;

    const recoveryInput = document.getElementById('recoveryValue');
    recoveryInput.value = recoveryBonus;
    recoveryInput.max = recoveryBonus;
    const breathInput = document.getElementById('breathValue');
    breathInput.value = breath;
    document.getElementById('inspiritValue').textContent = inspirit;
}