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
function populateAbilitySelectors(abilityType) {
    const abilities = getQualifiedAbilities(abilityType);
    const max = abilityType === 'talent' ? talentAmount : tricksAmount;
    const prefix = abilityType === 'talent' ? 'talent' : 'tricks';
    const offset = abilityType === 'talent' ? 1 : 0; // Talents start from 2 (after wayTalent)
    for (let i = 1; i <= max + offset; i++) {
        const sel = document.getElementById(`${prefix}${i}`);
        if (sel) {
            const saved = sel.value;
            sel.innerHTML = '<option value="">Select Ability</option>' +
                abilities.map(a => `<option value="${a.name}">${a.name}</option>`).join('');
            if (saved && Array.from(sel.options).some(opt => opt.value === saved)) {
                sel.value = saved;
            }
            const desc = document.getElementById(`${prefix}${i}Description`);
            if (desc && sel.value) {
                populateAbilityInfo(sel.id, abilities, abilityType);
            }
        }
    }
}
function populateAbilityInfo(id, abilities, abilityType) {
    const sel = document.getElementById(id);
    const desc = document.getElementById(id + 'Description');
    if (!sel || !desc) return;
    const name = sel.value;
    const ability = abilities.find(a => a.name === name);
    if (ability) {
        const details = ability.details;
        let html = '';
        Object.keys(details).forEach(key => {
            if (key !== 'Name') { // Skip redundant name
                html += `<div>${key}: ${details[key]}</div>`;
            }
        });
        desc.innerHTML = html;
    } else {
        desc.innerHTML = '';
    }
}
function populateProficiencyInfo(id, type) {
    const sel = document.getElementById(id);
    const desc = document.getElementById(id + 'Description');
    if (!sel || !desc) return;
    const name = sel.value;
    const prof = profData[type].find(p => p.name === name);
    if (prof) {
        desc.innerHTML = prof.details;
    } else {
        desc.innerHTML = '';
    }
}
function getQualifiedAbilities(abilityType) {
    const qualified = [];
    abilitiesData.forEach((abs, skill) => {
        const rankEl = document.getElementById(SKILL_ID_MAP[capitalize(skill)]);
        const rank = parseInt(rankEl?.value) || 0;
        if (rank >= 1) { // Basic+ qualifies
            qualified.push(...abs.filter(a => a.type === abilityType));
        }
    });
    return qualified;
}
// ———————————————————————— EVENT LISTENERS ————————————————————————
document.addEventListener('change', e => {
    const t = e.target;
    if (t.matches('.attributeSelect')) return updateAttributeGroups();
    if (t.matches('.attInput')) return calculateAttributeValues();
    if (t.matches('.skillRankSelect')) return updateSingleSkillModAndPassive(t.id);
    if (t.matches('.attackSkills')) {
        const type = t.id.replace('SkillRank', '').toLowerCase();
        updateProficiencySelectors(type, parseInt(t.value) || 0);
        return;
    }
    if (t.matches('#roleSelector')) return updateWay();
    if (t.matches('.talentSelector, .trickSelector')) {
        const abilityType = t.classList.contains('talentSelector') ? 'talent' : 'trick';
        populateAbilityInfo(t.id, getQualifiedAbilities(abilityType), abilityType);
        return;
    }
    if (t.matches('.profSelector')) {
        const type = t.id.match(/^(strike|blast|invoke)/)[1];
        populateProficiencyInfo(t.id, type);
        return;
    }
    if (t.id === 'charLvl') return calculateDerivedStats();
});
// Buttons for ability amounts
document.addEventListener('click', e => {
    const t = e.target;
    if (t.matches('#talentPlus, #talentMinus')) {
        if (t.id === 'talentPlus') {
            talentAmount += 1;
        } else if (t.id === 'talentMinus' && talentAmount > 1) {
            talentAmount -= 1;
        }
        updateAbilityTables('talent');
    } else if (t.matches('#tricksPlus, #tricksMinus')) {
        if (t.id === 'tricksPlus') {
            tricksAmount += 1;
        } else if (t.id === 'tricksMinus' && tricksAmount > 1) {
            tricksAmount -= 1;
        }
        updateAbilityTables('trick');
    }
});
// ———————————————————————— UPDATERS ————————————————————————
function updateAbilityTables(abilityType) {
    const config = abilityType === 'talent' ? {
        containerSelector: '.talentWrapper',
        itemPrefix: 'talent',
        itemClass: 'talentAbility',
        selectorClass: 'talentSelector',
        populateFunction: () => populateAbilitySelectors('talent'),
        abilityType: 'talent',
        extraOffset: 1 // For wayTalent offset
    } : {
        containerSelector: '.trickWrapper',
        itemPrefix: 'tricks',
        itemClass: 'trickAbility',
        selectorClass: 'trickSelector',
        populateFunction: () => populateAbilitySelectors('trick'),
        abilityType: 'trick'
    };
    const amount = abilityType === 'talent' ? talentAmount : tricksAmount;
    rebuildDynamicSelectors(config, amount);
}
function calculateAbilities() {
    // Stub for future; currently no calc needed beyond population
}
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function updateWay() {
    const sel = document.getElementById('roleSelector');
    const selectedName = sel.value;
    const selectedWay = waysData.find(w => w.name === selectedName);
    if (!selectedWay) return;
    const props = selectedWay.props;
    const nameDiv = document.getElementById('wayTalentName');
    const descDiv = document.getElementById('wayTalentDesc');
    if (nameDiv) nameDiv.textContent = props.name || 'Unnamed Way';
    if (descDiv) {
        let html = '';
        Object.keys(props).forEach(key => {
            if (key !== 'name' && props[key]) {
                html += `<div>${capitalize(key)}: ${props[key]}</div>`;
            }
        });
        descDiv.innerHTML = html;
    }
    const attackType = selectedWay.props['attack']?.toLowerCase() || '';
    let attackSkillId = '';
    if (attackType === 'strike') attackSkillId = 'strikeSkillRank';
    else if (attackType === 'blast') attackSkillId = 'blastSkillRank';
    else if (attackType === 'invoke') attackSkillId = 'invokeSkillRank';
    if (attackSkillId) {
        const attackEl = document.getElementById(attackSkillId);
        if (attackEl) {
            attackEl.value = 2; // Trained
            triggerChange(attackEl);
        }
    }
    const primaryAttr = selectedWay.props['primary attribute']?.toLowerCase() || '';
    let primaryId = '';
    if (primaryAttr === 'body') primaryId = 'bodyPriority';
    else if (primaryAttr === 'mind') primaryId = 'mindPriority';
    else if (primaryAttr === 'spirit') primaryId = 'spiritPriority';
    if (primaryId) {
        const primaryEl = document.getElementById(primaryId);
        if (primaryEl) {
            primaryEl.value = 'priorityPrimary';
            triggerChange(primaryEl);
        }
    }
    updateAbilityTables('talent');
}
function calculateAttributeValues() {
    Object.keys(ATTRIBUTE_GROUPS).forEach(group => {
        const { primaryValueId, subIds } = ATTRIBUTE_GROUPS[group];
        const subs = subIds.map(id => parseInt(document.getElementById(id)?.value) || 0);
        const maxSub = Math.max(...subs);
        document.getElementById(primaryValueId).textContent = maxSub;
    });
    updateAllSkillModsAndPassives();
    calculateDerivedStats();
}
function updateAttributeGroups() {
    const priorities = {};
    Object.keys(ATTRIBUTE_GROUPS).forEach(group => {
        const el = document.getElementById(ATTRIBUTE_GROUPS[group].priorityId);
        if (el) priorities[el.value] = group;
    });
    const pointsMap = { priorityPrimary: 3, prioritySecondary: 2, priorityTertiary: 1 };
    Object.keys(ATTRIBUTE_GROUPS).forEach(group => {
        const prio = document.getElementById(ATTRIBUTE_GROUPS[group].priorityId)?.value || '';
        const pointsEl = document.getElementById(ATTRIBUTE_GROUPS[group].pointsId);
        if (pointsEl) pointsEl.textContent = pointsMap[prio] || 0;
    });
    calculateAttributeValues();
}
function updateAllSkillModsAndPassives() {
    Object.keys(SKILL_ID_MAP).forEach(skill => {
        const skillId = SKILL_ID_MAP[skill];
        updateSingleSkillModAndPassive(skillId);
    });
}
function updateSingleSkillModAndPassive(skillId) {
    const rankEl = document.getElementById(skillId);
    const rank = parseInt(rankEl?.value) || 0;
    const modId = skillId.replace('Rank', 'Mod');
    const passiveId = skillId.replace('Rank', 'Passive');
    const modAttrId = SKILL_MOD_MAP[skillId];
    const modAttrVal = parseInt(document.getElementById(modAttrId)?.value) || parseInt(document.getElementById(modAttrId.replace('Value', 'Value'))?.textContent) || 0;
    const mod = rank + modAttrVal;
    const passive = 10 + mod;
    const damage = rank + 2; // For attacks
    const modEl = document.getElementById(modId);
    const passiveEl = document.getElementById(passiveId);
    if (modEl) modEl.textContent = mod;
    if (passiveEl) {
        const isAttack = /(strike|blast|invoke)Damage/i.test(passiveId);
        passiveEl.textContent = isAttack ? damage : passive;
    }
    if (/(strike|blast|invoke)SkillRank/.test(skillId)) {
        const type = skillId.replace('SkillRank', '').toLowerCase();
        updateProficiencySelectors(type, rank);
    }
    if (rank >= 1) {
        updateAbilityTables('talent');
        updateAbilityTables('trick');
    }
    calculateDerivedStats();
}
function populateRoleSelector() {
    const selector = document.getElementById('roleSelector');
    if (!selector) return;

    // Group by attack type
    const groups = {};
    waysData.forEach(way => {
        const attack = (way.props['attack'] || '').toLowerCase().trim();
        if (['strike', 'blast', 'invoke'].includes(attack)) {
            if (!groups[attack]) groups[attack] = [];
            groups[attack].push(way);
        }
    });

    // Fixed order
    const groupOrder = ['strike', 'blast', 'invoke'];

    // Build HTML: placeholder + sorted groups
    let html = '<option value="">Select Way</option>';
    groupOrder.forEach(groupKey => {
        if (groups[groupKey]) {
            // Sort alpha by name
            groups[groupKey].sort((a, b) => a.name.localeCompare(b.name));
            html += `<optgroup label="${capitalize(groupKey)}">`;
            html += groups[groupKey].map(w => `<option value="${w.name}">${w.name}</option>`).join('');
            html += '</optgroup>';
        }
    });

    selector.innerHTML = html;
}
// ———————————————————————— DERIVED STATS ————————————————————————
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

function triggerChange(el) {
    if (el) {
        const event = new Event('change', { bubbles: true });
        el.dispatchEvent(event);
    }
}