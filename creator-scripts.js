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

// Helper capitalize
function capitalize(str) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

// ———————————————————————— ABILITY SELECTORS & TABLES ————————————————————————
function updateAbilitySelectors(type) {
    const selectors = document.querySelectorAll(`.${type}Selector`);
    selectors.forEach(sel => {
        sel.innerHTML = `<option value="">Select ${capitalize(type)}</option>`;
        abilitiesData.forEach((abs, skill) => {
            abs.filter(a => a.type === type).forEach(ability => {
                const opt = document.createElement('option');
                opt.value = ability.name;
                opt.textContent = `${ability.name} (${capitalize(skill)})`;
                sel.appendChild(opt);
            });
        });
        sel.addEventListener('change', () => {
            const selectedName = sel.value;
            const ability = findAbilityByName(selectedName);
            if (ability) showAbilityDetails(sel.id.replace('Select', ''), ability);
        });
    });
}

// Helper to find ability by name across all skills
function findAbilityByName(name) {
    for (let abs of abilitiesData.values()) {
        const ability = abs.find(a => a.name === name);
        if (ability) return ability;
    }
    return null;
}

// Show details with processed tooltips
function showAbilityDetails(baseId, ability) {
    const descDiv = document.getElementById(baseId + 'Description');
    if (!descDiv) return;
    let html = '';
    const order = ['keywords', 'description', 'passive', 'active', 'cost', 'trigger', 'effect', 'enhancements', 'augments'];
    Object.keys(ability.details).sort((a, b) => {
        const ia = order.indexOf(a.toLowerCase());
        const ib = order.indexOf(b.toLowerCase());
        return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
    }).forEach(key => {
        const value = ability.details[key];
        if (value) {
            const processedValue = window.processTextForTooltips(value);
            html += `<div class="${ability.type}${capitalize(key)}">${key}: ${processedValue}</div>`;
        }
    });
    descDiv.innerHTML = html;
}

function updateTalentTables() {
    const tablesDiv = document.getElementById('talentTables');
    if (!tablesDiv) return;
    tablesDiv.innerHTML = '';
    for (let i = 1; i <= talentAmount; i++) {
        const table = document.createElement('div');
        table.id = `talentsTable${i}`;
        table.className = 'talentAbility';
        table.innerHTML = `
            <select id="talents${i}" class="talentSelector"></select>
            <div id="talents${i}Description"></div>
        `;
        tablesDiv.appendChild(table);
    }
    updateAbilitySelectors('talent');
}

function updateTrickTables() {
    const tablesDiv = document.getElementById('trickTables');
    if (!tablesDiv) return;
    tablesDiv.innerHTML = '';
    for (let i = 1; i <= tricksAmount; i++) {
        const table = document.createElement('div');
        table.id = `tricksTable${i}`;
        table.className = 'trickAbility';
        table.innerHTML = `
            <select id="tricks${i}" class="trickSelector"></select>
            <div id="tricks${i}Description"></div>
        `;
        tablesDiv.appendChild(table);
    }
    updateAbilitySelectors('trick');
}

// Function to update single skill mod and passive
function updateSingleSkillModAndPassive(skillId) {
    const rank = parseInt(document.getElementById(skillId)?.value || 0);
    const modId = SKILL_MOD_MAP[skillId];
    const modVal = parseInt(document.getElementById(modId)?.textContent || 0);
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

// Function to update skills for a mod
function updateSkillsForMod(subId) {
    Object.entries(SKILL_MOD_MAP).forEach(([skillId, modId]) => {
        if (modId === subId) updateSingleSkillModAndPassive(skillId);
    });
}

// Function to update all skill mods and passives
function updateAllSkillModsAndPassives() {
    Object.keys(SKILL_ID_MAP).forEach(skillId => updateSingleSkillModAndPassive(skillId));
}

// Function to update proficiency selectors
function updateProficiencySelectors(type, rank) {
    for (let i = 1; i <= 5; i++) {
        const el = document.getElementById(type + 'ProfSelector' + i);
        if (el) el.hidden = i > rank;
    }
}

// Function to update gear load
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
window.addEventListener('dataLoaded', () => {
    TooltipManager.init();
    updateAbilitySelectors('trick');
    updateAbilitySelectors('talent');
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
    updateTalentTables();
    updateTrickTables();
    // Note: gear-scripts.js will also init via 'dataLoaded' (as in your original)
});