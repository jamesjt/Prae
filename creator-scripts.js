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
}
function populateAbilitySelectors(type) {
    const abilities = getQualifiedAbilities(type);
    const saved = {};
    for (let i = 1; i <= 20; i++) {
        const sel = document.getElementById(type + i);
        if (sel) {
            saved[i] = sel.value;
            sel.innerHTML = '<option value="">Select ' + type.charAt(0).toUpperCase() + type.slice(1) + '</option>' +
                abilities.map(a => `<option value="${a.name}">${a.name}</option>`).join('');
        }
    }
    for (let i = 1; i <= 20; i++) {
        const sel = document.getElementById(type + i);
        if (sel && saved[i] && Array.from(sel.options).some(opt => opt.value === saved[i])) {
            sel.value = saved[i];
            populateAbilityInfo(sel.id, abilities, type);
        }
    }
}
function updateAbilityTables(type) {
    const amount = type === 'talent' ? talentAmount : tricksAmount;
    const config = {
        containerSelector: `#${type}Tables`,
        itemPrefix: type,
        itemClass: `${type}Ability`,
        selectorClass: `${type}Selector`,
        descriptionSuffix: type === 'talent' ? 'Desc' : 'Info',
        extraOffset: type === 'trick' ? 1 : 0, // Extra for tricks
        populateFunction: () => populateAbilitySelectors(type),
        abilityType: type
    };
    rebuildDynamicSelectors(config, amount);
}
function getQualifiedAbilities(type) {
    const abilities = [];
    Object.keys(SKILL_ID_MAP).forEach(skill => {
        const rankEl = document.getElementById(SKILL_ID_MAP[skill]);
        if (rankEl && parseInt(rankEl.value) >= 1) {
            const skillAbs = abilitiesData.get(skill.toLowerCase()) || [];
            abilities.push(...skillAbs.filter(a => a.type.toLowerCase() === type));
        }
    });
    return abilities;
}
function populateAbilityInfo(id, abilities, type) {
    const sel = document.getElementById(id);
    const desc = document.getElementById(id + (type === 'talent' ? 'Desc' : 'Info'));
    if (!sel || !desc) return;
    const selected = sel.value;
    if (!selected) {
        desc.innerHTML = '';
        return;
    }
    const ability = abilities.find(a => a.name === selected);
    if (!ability) {
        desc.innerHTML = '(Ability not found)';
        return;
    }
    const order = ['name', 'description', 'passive', 'active', 'cost', 'trigger', 'effect', 'enhancements', 'augments'];
    let html = '';
    Object.keys(ability.details).sort((a, b) => {
        const ia = order.indexOf(a.toLowerCase());
        const ib = order.indexOf(b.toLowerCase());
        return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
    }).forEach(key => {
        let value = ability.details[key];
        if (key.toLowerCase() === 'name') {
            html += `<div class="tip-name-${type}">${value}</div>`;
        } else {
            html += `<div class="tip-${key.toLowerCase()}-${type}">${key}: ${value}</div>`;
        }
    });
    desc.innerHTML = html;
}
function populateRoleSelector() {
    const sel = document.getElementById('roleSelector');
    if (!sel) return;
    const savedValue = sel.value;

    // Clear and add placeholder
    sel.innerHTML = '<option value="">Select Way</option>';

    // Collect available and unavailable
    const available = { strike: [], blast: [], invoke: [] };
    const unavailable = [];
    waysData.forEach(w => {
        // Check prerequisite
        const prereq = w.props['prerequisite skill']?.trim();
        let rank = 0;
        if (prereq) {
            // Find matching skill key (case-insensitive)
            const prereqKey = Object.keys(SKILL_ID_MAP).find(k => k.toLowerCase() === prereq.toLowerCase());
            if (prereqKey) {
                const rankId = SKILL_ID_MAP[prereqKey];
                rank = parseInt(document.getElementById(rankId)?.value) || 0;
            }
        }

        // Get attack skill group
        const attack = (w.props['attack skill'] || '').toLowerCase();
        let group = null;
        if (attack.includes('strike')) group = 'strike';
        else if (attack.includes('blast')) group = 'blast';
        else if (attack.includes('invoke')) group = 'invoke';

        // Classify
        if (rank >= 1 && group) {
            available[group].push(w);
        } else {
            unavailable.push(w);
        }
    });

    // Sort each group alphabetically by name
    Object.keys(available).forEach(g => {
        available[g].sort((a, b) => a.name.localeCompare(b.name));
    });
    unavailable.sort((a, b) => a.name.localeCompare(b.name));

    // Helper to add optgroup if group has items
    const addGroup = (label, ways) => {
        if (ways.length === 0) return;
        const optgroup = document.createElement('optgroup');
        optgroup.label = label;
        ways.forEach(w => {
            const opt = document.createElement('option');
            opt.value = w.name;
            opt.textContent = w.name;
            optgroup.appendChild(opt);
        });
        sel.appendChild(optgroup);
    };

    // Add available groups first, then unavailable
    addGroup('Strike', available.strike);
    addGroup('Blast', available.blast);
    addGroup('Invoke', available.invoke);
    addGroup('Unavailable', unavailable);

    // Restore saved value if still present, else reset
    if (Array.from(sel.options).some(opt => opt.value === savedValue)) {
        sel.value = savedValue;
    } else {
        sel.value = '';
    }
}
function populateProficiencyInfo(id, type) {
    const sel = document.getElementById(id);
    const desc = document.getElementById(id + 'Description');
    if (!sel || !desc) return;
    const selected = sel.value;
    if (!selected) {
        desc.innerHTML = '';
        return;
    }
    const prof = profData[type].find(p => p.name === selected);
    if (!prof) {
        desc.innerHTML = '(Proficiency not found)';
        return;
    }
    desc.innerHTML = prof.details;
}
// ———————————————————————— EVENT LISTENERS ————————————————————————
document.addEventListener('input', e => {
    const t = e.target;
    if (t.matches('.subAttributeInput')) {
        const groupKey = Object.keys(ATTRIBUTE_GROUPS).find(key => ATTRIBUTE_GROUPS[key].subIds.includes(t.id));
        if (groupKey) calculateAttributeValues(groupKey);
    }
});
document.addEventListener('change', e => {
    const t = e.target;
    if (t.matches('.prioritySelector')) {
        const groupKey = Object.keys(ATTRIBUTE_GROUPS).find(key => ATTRIBUTE_GROUPS[key].priorityId === t.id);
        if (groupKey) updateAttributeGroups();
    } else if (t.matches('.skillRankSelector')) {
        const skillId = t.id;
        updateSingleSkillModAndPassive(skillId);
        if (['strikeSkillRank', 'blastSkillRank', 'invokeSkillRank'].includes(skillId)) {
            const type = skillId.replace('SkillRank', '').toLowerCase();
            updateProficiencySelectors(type, parseInt(t.value) || 0);
        }
        calculateAbilities();
        populateRoleSelector();  // Added to repopulate dynamically on skill change
    } else if (t.matches('.profSelector')) {
        const type = t.id.match(/^(strike|blast|invoke)ProfSelector/)[1];
        populateProficiencyInfo(t.id, type);
    } else if (t.matches('.talentSelector, .trickSelector')) {
        const type = t.classList.contains('talentSelector') ? 'talent' : 'trick';
        populateAbilityInfo(t.id, getQualifiedAbilities(type), type);
    } else if (t.id === 'roleSelector') {
        updateWayTalent();
        calculateAbilities();
    } else if (t.id === 'charLvl') {
        updateAttributeGroups();
        calculateDerivedStats();
    }
});
document.addEventListener('click', e => {
    const t = e.target;
    if (t.matches('#talentPlus, #talentMinus')) {
        talentAmount = Math.max(1, talentAmount + (t.id === 'talentPlus' ? 1 : -1));
        updateAbilityTables('talent');
    } else if (t.matches('#tricksPlus, #tricksMinus')) {
        tricksAmount = Math.max(1, tricksAmount + (t.id === 'tricksPlus' ? 1 : -1));
        updateAbilityTables('trick');
    }
});
// ———————————————————————— CALCULATIONS ————————————————————————
function calculateAbilities() {
    const level = parseInt(document.getElementById('charLvl').value) || 1;
    const skills = Object.keys(SKILL_ID_MAP).map(skill => parseInt(document.getElementById(SKILL_ID_MAP[skill])?.value) || 0);
    const skillPoints = skills.reduce((sum, rank) => sum + rank, 0);
    talentAmount = Math.max(1, skills.filter(rank => rank >= 1).length - 1);
    tricksAmount = Math.max(1, skills.reduce((sum, rank) => sum + Math.max(0, rank - 1), 0));
    updateAbilityTables('talent');
    updateAbilityTables('trick');
}
function updateAttributeGroups() {
    Object.keys(ATTRIBUTE_GROUPS).forEach(key => calculateAttributeValues(key));
}
function calculateAttributeValues(groupKey) {
    const group = ATTRIBUTE_GROUPS[groupKey];
    const level = parseInt(document.getElementById('charLvl').value) || 1;
    const priority = document.getElementById(group.priorityId)?.value || 'priorityUnassigned';
    const points = calculateAttributePoints(priority, level);
    document.getElementById(group.pointsId).textContent = points;
    const subs = group.subIds.map(id => parseInt(document.getElementById(id)?.value) || 0);
    const primaryValue = Math.max(...subs);
    document.getElementById(group.primaryValueId).textContent = primaryValue;
    const totalSubs = subs.reduce((a, b) => a + b, 0);
    if (totalSubs > points) {
        subs.forEach((val, i) => {
            const input = document.getElementById(group.subIds[i]);
            if (input) input.value = Math.floor(points / subs.length);
        });
    }
    group.subIds.forEach(id => {
        const input = document.getElementById(id);
        if (input) input.max = primaryValue;
    });
}
function calculateAttributePoints(priority, level) {
    if (priority === 'priorityPrimary') return Math.floor((level + 1) / 3) + 3;
    if (priority === 'prioritySecondary') return Math.floor((level + 1) / 3) + 2;
    if (priority === 'priorityTertiary') return Math.floor((level + 1) / 3) + 1;
    return 0;
}
function updateAllSkillModsAndPassives() {
    Object.keys(SKILL_ID_MAP).forEach(skill => {
        const skillId = SKILL_ID_MAP[skill];
        updateSingleSkillModAndPassive(skillId);
    });
}
function updateSingleSkillModAndPassive(skillId) {
    const rankEl = document.getElementById(skillId);
    const modEl = document.getElementById(skillId.replace('Rank', 'Mod'));
    const passiveEl = document.getElementById(skillId.replace('Rank', 'Passive'));
    if (!rankEl || !modEl || !passiveEl) return;
    const rank = parseInt(rankEl.value) || 0;
    const modId = SKILL_MOD_MAP[skillId];
    const mod = parseInt(document.getElementById(modId)?.value) || 0;
    modEl.textContent = mod + rank;
    passiveEl.textContent = rank * 3;
}
function updateWayTalent() {
    const sel = document.getElementById('roleSelector');
    const nameDiv = document.getElementById('wayTalentName');
    const descDiv = document.getElementById('wayTalentDesc');
    if (!sel || !nameDiv || !descDiv) return;
    const selected = sel.value;
    if (!selected) {
        nameDiv.textContent = 'Select Way';
        descDiv.innerHTML = '';
        return;
    }
    const way = waysData.find(w => w.name === selected);
    if (!way) {
        nameDiv.textContent = '(Way not found)';
        descDiv.innerHTML = '';
        return;
    }
    nameDiv.textContent = way.name;
    let html = '';
    ['passive', 'focus', 'critical effect'].forEach(k => {
        const propKey = Object.keys(way.props).find(p => p.toLowerCase().includes(k));
        if (propKey && way.props[propKey]) {
            html += `<div>${capitalize(k)}: ${way.props[propKey]}</div>`;
        }
    });
    descDiv.innerHTML = html;
}
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
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