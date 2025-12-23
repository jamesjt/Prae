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
function populateAbilitySelectors(type) {
    const abilities = getQualifiedAbilities(type);
    for (let i = 1; i <= 20; i++) {
        const sel = document.getElementById(type + 's' + i);
        if (sel) {
            const savedValue = sel.value;
            sel.innerHTML = `<option value="${type}Empty">Select ${capitalize(type)}</option>` +
                abilities.map(a => `<option value="${a.name}">${a.name}</option>`).join('');
            if (savedValue && Array.from(sel.options).some(opt => opt.value === savedValue)) {
                sel.value = savedValue;
                populateAbilityInfo(sel.id, abilities, type);
            }
        }
    }
}

function populateAbilityInfo(selectId, abilities, type) {
    const select = document.getElementById(selectId);
    if (!select) return;
    const descId = selectId + 'Description';
    const descDiv = document.getElementById(descId);
    if (!descDiv) return;
    const selected = select.value;
    const ability = abilities.find(a => a.name === selected);
    if (!ability) {
        descDiv.innerHTML = '';
        return;
    }
    const details = ability.details;
    const keywords = details.Keywords || '';
    const description = details.Description || '';
    const cost = details.Cost || '';
    const effectSm = details.EffectSm || '';
    const effectBig = details.EffectBig || '';
    const manaUse = details.ManaUse || '';
    // Set plain HTML without classes
    descDiv.innerHTML = `
        <div>${keywords}</div>
        <div>${description}</div>
        <div>${cost}</div>
        <div>${effectSm}</div>
        <div>${effectBig}</div>
        <div>${manaUse}</div>
    `;
    // Now add classes using shared function
    addAbilityFieldClassesToContainer(descDiv, type);
}

function populateProficiencyInfo(selectId, type) {
    const select = document.getElementById(selectId);
    if (!select) return;
    const descId = selectId + 'Description';
    const descDiv = document.getElementById(descId);
    if (!descDiv) return;
    const selected = select.value;
    const prof = profData[type]?.find(p => p.name === selected);
    if (!prof) {
        descDiv.innerHTML = '';
        return;
    }
    descDiv.innerHTML = prof.details;
}

function getQualifiedAbilities(type) {
    const abilities = [];
    abilitiesData.forEach((abs, skill) => {
        const rank = parseInt(document.getElementById(SKILL_ID_MAP[capitalize(skill)])?.value) || 0;
        if (rank > 0) {
            abilities.push(...abs.filter(a => a.type === type));
        }
    });
    return abilities.sort((a, b) => a.name.localeCompare(b.name));
}

function updateAbilityTables(type) {
    const amount = type === 'talent' ? talentAmount : tricksAmount;
    rebuildDynamicSelectors({
        containerSelector: `#${type}Tables`,
        itemPrefix: `${type}s`,
        itemClass: `${type}Ability`,
        selectorClass: `${type}Selector`,
        extraOffset: type === 'trick' ? 1 : 0,
        populateFunction: () => populateAbilitySelectors(type),
        abilityType: type
    });
}

function populateRoleSelector() {
    const selector = document.getElementById('roleSelector');
    if (!selector) return;
    selector.innerHTML = '<option value="">Select Way</option>' +
        waysData.map(w => `<option value="${w.name}">${w.name}</option>`).join('');
}

function getWayInfo(name) {
    const way = waysData.find(w => w.name === name);
    if (!way) return { passive: '', focus: '', critical: '' };
    return {
        passive: way.props.passive || '',
        focus: way.props.focus || '',
        critical: way.props['critical effect'] || ''
    };
}

function updateWayInfo() {
    const selector = document.getElementById('roleSelector');
    const talentName = document.getElementById('wayTalentName');
    const talentDesc = document.getElementById('wayTalentDesc');
    if (!selector || !talentName || !talentDesc) return;
    const selected = selector.value;
    if (!selected) {
        talentName.textContent = 'Select Way';
        talentDesc.innerHTML = '';
        return;
    }
    talentName.textContent = selected;
    const { passive, focus, critical } = getWayInfo(selected);
    talentDesc.innerHTML = `
        <div>Passive: ${passive}</div>
        <div>Focus: ${focus}</div>
        <div>Critical Effect: ${critical}</div>
    `;
}

function calculateAbilities() {
    // Implementation for calculating abilities
    // For example, tally selected talents and tricks
}

function calculateAttributeValues() {
    // Implementation for attribute calculations
}

function updateAttributeGroups() {
    // Implementation for updating attribute groups
}

function updateSingleSkillModAndPassive(skillId) {
    const rankEl = document.getElementById(skillId);
    if (!rankEl) return;
    const rank = parseInt(rankEl.value) || 0;
    const attrId = SKILL_MOD_MAP[skillId];
    const attrValue = parseInt(document.getElementById(attrId)?.value) || 0;
    const modId = skillId.replace('SkillRank', 'Mod').replace('Rank', 'Mod'); // e.g., 'athleticsSkillRank' -> 'athleticsMod'
    const modEl = document.getElementById(modId);
    if (modEl) modEl.textContent = rank + attrValue;

    let passiveId = skillId.replace('SkillRank', 'Passive').replace('Rank', 'Passive');
    const passiveEl = document.getElementById(passiveId);
    if (passiveEl) passiveEl.textContent = ''; // Default empty for non-attack skills; extend if needed for specific skills

    // For attack skills, update damage instead (base 3 + rank)
    if (skillId.includes('strike') || skillId.includes('blast') || skillId.includes('invoke')) {
        const damageId = skillId.replace('SkillRank', 'Damage').replace('Rank', 'Damage');
        const damageEl = document.getElementById(damageId);
        if (damageEl) damageEl.textContent = 3 + rank;
    }
}

function updateAllSkillModsAndPassives() {
    Object.keys(SKILL_ID_MAP).forEach(skill => updateSingleSkillModAndPassive(SKILL_ID_MAP[skill]));
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

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

document.addEventListener('change', e => {
    const target = e.target;
    if (target.matches('.talentSelector, .trickSelector')) {
        const type = target.classList.contains('talentSelector') ? 'talent' : 'trick';
        const abilities = getQualifiedAbilities(type);
        populateAbilityInfo(target.id, abilities, type);
        calculateAbilities();
    } else if (target.matches('.profSelector')) {
        const match = target.id.match(/(strike|blast|invoke)ProfSelector/);
        if (match) populateProficiencyInfo(target.id, match[1]);
    } else if (target.matches('#roleSelector')) {
        updateWayInfo();
        // Update primary attribute, etc. (stub)
    } else if (target.matches('.attributeSelect')) {
        // Update attributes (stub)
    } else if (target.matches('.skillRank')) {
        const skillId = target.id;
        updateSingleSkillModAndPassive(skillId);
        const attackMatch = skillId.match(/(strike|blast|invoke)SkillRank/);
        if (attackMatch) updateProficiencySelectors(attackMatch[1], parseInt(target.value) || 0);
        updateAbilityTables('talent');
        updateAbilityTables('trick');
    }
});