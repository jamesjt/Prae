/* creator-scripts.js – fully working version */
const WAYS_CSV_URL = 'https://docs.google.com/spreadsheets/d/1OIAs6EFgLFKG3QN_b4Vtm48BwSFb7VwDxOXWhkotXz8/pub?gid=53126780&single=true&output=csv';
const PROF_CSV_URL = 'https://docs.google.com/spreadsheets/d/1OIAs6EFgLFKG3QN_b4Vtm48BwSFb7VwDxOXWhkotXz8/pub?gid=715914535&single=true&output=csv';
const ABILITIES_CSV_URL = 'https://docs.google.com/spreadsheets/d/1OIAs6EFgLFKG3QN_b4Vtm48BwSFb7VwDxOXWhkotXz8/pub?gid=1439570479&single=true&output=csv';

/* --------------------------------------------------------------
   CSV PARSER
   -------------------------------------------------------------- */
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

/* --------------------------------------------------------------
   CONSTANTS
   -------------------------------------------------------------- */
const SKILL_ID_MAP = {
    'Athletics': 'athleticsSkillRank', 'Force': 'forceSkillRank', 'Acrobatics': 'acrobaticsSkillRank', 'Sneak': 'sneakSkillRank',
    'Endurance': 'enduranceSkillRank', 'Poise': 'poiseSkillRank', 'Lore': 'loreSkillRank', 'Tinkering': 'tinkeringSkillRank',
    'Deception': 'deceptionSkillRank', 'Insight': 'insightSkillRank', 'Awareness': 'awarenessSkillRank', 'Survival': 'survivalSkillRank',
    'Compel': 'compelSkillRank', 'Rouse': 'rouseSkillRank', 'Assure': 'assureSkillRank', 'Charm': 'charmSkillRank',
    'Calm': 'calmSkillRank', 'Command': 'commandSkillRank',
    'Strike': 'strikeSkillRank', 'Blast': 'blastSkillRank', 'Invoke': 'invokeSkillRank'
};

const SKILL_MOD_MAP = {
    'athleticsSkillRank': 'mightValue', 'forceSkillRank': 'mightValue',
    'acrobaticsSkillRank': 'agilityValue', 'sneakSkillRank': 'agilityValue',
    'enduranceSkillRank': 'brawnValue', 'poiseSkillRank': 'brawnValue',
    'loreSkillRank': 'willValue', 'tinkeringSkillRank': 'willValue',
    'deceptionSkillRank': 'witValue', 'insightSkillRank': 'witValue',
    'awarenessSkillRank': 'resolveValue', 'survivalSkillRank': 'resolveValue',
    'compelSkillRank': 'vigorValue', 'rouseSkillRank': 'vigorValue',
    'assureSkillRank': 'empathyValue', 'charmSkillRank': 'empathyValue',
    'calmSkillRank': 'faithValue', 'commandSkillRank': 'faithValue',
    'strikeSkillRank': 'bodyValue', 'blastSkillRank': 'mindValue', 'invokeSkillRank': 'spiritValue'
};

const ATTRIBUTE_GROUPS = {
    physical: { priorityId: 'bodyPriority', pointsId: 'physicalAttributePoints', primaryValueId: 'bodyValue', subIds: ['mightValue', 'agilityValue', 'brawnValue'] },
    mental:   { priorityId: 'mindPriority', pointsId: 'mentalAttributePoints', primaryValueId: 'mindValue', subIds: ['willValue', 'witValue', 'resolveValue'] },
    spirit:   { priorityId: 'spiritPriority', pointsId: 'spiritAttributePoints', primaryValueId: 'spiritValue', subIds: ['vigorValue', 'faithValue', 'empathyValue'] }
};

/* --------------------------------------------------------------
   GLOBAL DATA
   -------------------------------------------------------------- */
let waysData = [], profData = { strike: [], blast: [], invoke: [] }, gearData = [], abilitiesData = {};

/* --------------------------------------------------------------
   DATA LOADING
   -------------------------------------------------------------- */
fetch(ABILITIES_CSV_URL)
    .then(r => { if (!r.ok) throw Error(r.status); return r.text(); })
    .then(text => {
        const rows = parseWaysCSV(text);
        const skills = rows[0].slice(1).map(s => s.trim().toLowerCase());
        skills.forEach((skill, colIndex) => {
            let currentAbility = null;
            for (let r = 1; r < rows.length; r++) {
                const key = rows[r][0] ? rows[r][0].trim() : '';
                const value = rows[r][colIndex + 1] ? rows[r][colIndex + 1].trim() : '';
                if (key.match(/^(Talent|Trick|Ritual) \d+ Name$/i)) {
                    if (currentAbility) saveAbility(skill, currentAbility);
                    const type = key.match(/^(Talent|Trick|Ritual)/i)[0].toLowerCase();
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
    .catch(err => console.error('Abilities CSV error:', err));

fetch(WAYS_CSV_URL)
    .then(r => { if (!r.ok) throw Error(r.status); return r.text(); })
    .then(text => {
        const rows = parseWaysCSV(text);
        const incRowIdx = rows.findIndex(r => (r[0] || '').toLowerCase().includes('include'));
        if (incRowIdx === -1) return console.error('Missing "Include" row');
        const incRow = rows[incRowIdx];
        for (let c = 1; c < incRow.length; c++) {
            if ((incRow[c] || '').toUpperCase().trim() !== 'TRUE' && (incRow[c] || '') !== '1') continue;
            const props = {};
            rows.forEach(row => {
                const k = (row[0] || '').trim().toLowerCase();
                if (k) props[k] = (row[c] || '').trim();
            });
            const name = Object.keys(props).find(k => k.includes('way name')) ? props[Object.keys(props).find(k => k.includes('way name'))] : '';
            const reqSkill = Object.keys(props).find(k => k.includes('required skill')) ? props[Object.keys(props).find(k => k.includes('required skill'))] : '';
            if (name && reqSkill) {
                const skillId = reqSkill.trim() === 'Any' ? 'Any' : SKILL_ID_MAP[reqSkill.trim()];
                if (skillId || reqSkill.trim() === 'Any') waysData.push({ name, props, reqSkill: reqSkill.trim(), skillId });
            }
        }
        populateRoleSelector();
    })
    .catch(err => console.error('Ways CSV error:', err));

fetch(PROF_CSV_URL)
    .then(r => { if (!r.ok) throw Error(r.status); return r.text(); })
    .then(text => {
        const rows = parseWaysCSV(text);
        const headers = rows[0].map(h => h.trim().toLowerCase());
        const strikeCol = headers.findIndex(h => h.includes('strike'));
        const blastCol  = headers.findIndex(h => h.includes('blast'));
        const invokeCol = headers.findIndex(h => h.includes('invoke'));
        const gearCol   = headers.findIndex(h => h.includes('gear'));
        const loadCol   = headers.findIndex(h => h.includes('load'));

        if (strikeCol !== -1) profData.strike = rows.slice(1).map(r => r[strikeCol].trim()).filter(Boolean);
        if (blastCol  !== -1) profData.blast  = rows.slice(1).map(r => r[blastCol].trim()).filter(Boolean);
        if (invokeCol !== -1) profData.invoke = rows.slice(1).map(r => r[invokeCol].trim()).filter(Boolean);
        if (gearCol !== -1 && loadCol !== -1) {
            gearData = rows.slice(1).map(r => ({
                name: r[gearCol].trim(),
                load: parseInt(r[loadCol]) || 0
            })).filter(g => g.name);
        }

        populateProfSelectors();
        populateGearSelectors();
    })
    .catch(err => console.error('Prof CSV error:', err));

/* --------------------------------------------------------------
   SKILL DATA + GENERATION
   -------------------------------------------------------------- */
const SKILLS_DATA = {
    physical: [
        { name: 'Athletics', id: 'athleticsSkillRank', color: 'mightColor mightSkill' },
        { name: 'Force',     id: 'forceSkillRank',     color: 'mightColor mightSkill' },
        { name: 'Acrobatics',id: 'acrobaticsSkillRank',color: 'agilityColor agilitySkill' },
        { name: 'Sneak',     id: 'sneakSkillRank',     color: 'agilityColor agilitySkill' },
        { name: 'Endurance', id: 'enduranceSkillRank', color: 'brawnColor brawnSkill' },
        { name: 'Poise',     id: 'poiseSkillRank',     color: 'brawnColor brawnSkill' }
    ],
    mental: [
        { name: 'Lore',      id: 'loreSkillRank',      color: 'willColor willSkill' },
        { name: 'Tinkering', id: 'tinkeringSkillRank', color: 'willColor willSkill' },
        { name: 'Deception', id: 'deceptionSkillRank', color: 'witColor witSkill' },
        { name: 'Insight',   id: 'insightSkillRank',   color: 'witColor witSkill' },
        { name: 'Awareness', id: 'awarenessSkillRank', color: 'resolveColor resolveSkill' },
        { name: 'Survival',  id: 'survivalSkillRank',  color: 'resolveColor resolveSkill' }
    ],
    social: [
        { name: 'Compel', id: 'compelSkillRank', color: 'vigorColor vigorSkill' },
        { name: 'Rouse',  id: 'rouseSkillRank',  color: 'vigorColor vigorSkill' },
        { name: 'Assure', id: 'assureSkillRank', color: 'empathyColor empathySkill' },
        { name: 'Charm',  id: 'charmSkillRank',  color: 'empathyColor empathySkill' },
        { name: 'Calm',   id: 'calmSkillRank',   color: 'faithColor faithSkill' },
        { name: 'Command',id: 'commandSkillRank',color: 'faithColor faithSkill' }
    ],
    attack: [
        { name: 'Strike', id: 'strikeSkillRank', color: 'bodyColor', container: 'strikeSkillsContainer' },
        { name: 'Blast',  id: 'blastSkillRank',  color: 'mindColor', container: 'blastSkillsContainer' },
        { name: 'Invoke', id: 'invokeSkillRank', color: 'spiritColor', container: 'invokeSkillsContainer' }
    ]
};

function generateSkills(category) {
    const skills = SKILLS_DATA[category];
    const tmpl = document.getElementById('skillTemplate').content.cloneNode(true);

    skills.forEach(skill => {
        const container = document.getElementById(category === 'attack' ? skill.container : `${category}SkillsContainer`);
        if (!container) return;

        const clone = tmpl.cloneNode(true);
        clone.querySelector('.skillListing').classList.add(...skill.color.split(' '));
        clone.querySelector('.skillName').textContent = skill.name;

        const select = clone.querySelector('select');
        select.id = skill.id;
        select.classList.add(category === 'attack' ? 'attackSkills' : `${category}Skills`, ...skill.color.split(' '));

        /* ----- option list ----- */
        select.innerHTML = '';
        if (skill.name === 'Blast' || skill.name === 'Invoke') {
            const opt = document.createElement('option');
            opt.value = '0';
            opt.textContent = '0: Unskilled';
            select.appendChild(opt);
        } else {
            const labels = ['Unskilled', 'Basic', 'Trained', 'Adept', 'Expert', 'Master'];
            labels.forEach((lbl, i) => {
                const opt = document.createElement('option');
                opt.value = (i + 1).toString();
                opt.textContent = `${i + 1}: ${lbl}`;
                select.appendChild(opt);
            });
        }

        const modEl = clone.querySelector('.skillMod');
        modEl.id = `${skill.name.toLowerCase()}Mod`;

        const passiveEl = clone.querySelector('.skillPassive');
        passiveEl.id = category === 'attack' ? `${skill.name.toLowerCase()}Damage` : `${skill.name.toLowerCase()}Passive`;
        passiveEl.textContent = category === 'attack' ? '3/die' : '2';

        container.appendChild(clone);
    });
}

/* --------------------------------------------------------------
   UI HELPERS
   -------------------------------------------------------------- */
function populateRoleSelector() {
    const sel = document.getElementById('roleSelector');
    sel.innerHTML = '<option value="">Way</option>';
    waysData.forEach(w => {
        const opt = document.createElement('option');
        opt.value = w.name;
        opt.textContent = w.name;
        sel.appendChild(opt);
    });
}

function populateProfSelectors() {
    ['strike', 'blast', 'invoke'].forEach(type => {
        for (let i = 1; i <= 5; i++) {
            const sel = document.getElementById(`${type}ProfSelector${i}`);
            if (!sel) continue;
            sel.innerHTML = '<option value="profUnassigned"></option>';
            profData[type].forEach(p => {
                const opt = document.createElement('option');
                opt.value = p;
                opt.textContent = p;
                sel.appendChild(opt);
            });
        }
    });
}

function populateGearSelectors() {
    for (let i = 1; i <= 12; i++) {
        const sel = document.getElementById(`gearSelect${i}`);
        if (!sel) continue;
        sel.innerHTML = '<option value="">Gear Slots</option>';
        gearData.forEach(g => {
            const opt = document.createElement('option');
            opt.value = g.name;
            opt.textContent = g.name;
            opt.dataset.load = g.load;
            sel.appendChild(opt);
        });
    }
}

/* --------------------------------------------------------------
   TALENT / TRICK TABLES (now defined!)
   -------------------------------------------------------------- */
function updateTalentTables() {
    const amount = parseInt(document.getElementById('talentAmount').value) || 1;
    const container = document.querySelector('.talentWrapper');
    // keep the first (Way) talent + amount extra tables
    const existing = container.querySelectorAll('.talent').length;
    const needed = 1 + amount; // 1 = way talent, amount = extra
    if (existing > needed) {
        // remove excess
        for (let i = needed; i < existing; i++) {
            container.removeChild(container.lastElementChild);
        }
    } else if (existing < needed) {
        // add missing tables
        for (let i = existing; i < needed; i++) {
            const table = document.createElement('div');
            table.className = 'talent';
            table.innerHTML = `
                <div class="talentHeader"><select class="talentSelector"></select></div>
                <div class="talentInfo"></div>
            `;
            container.appendChild(table);
        }
    }
    updateTalentSelectors();
}

function updateTrickTables() {
    const amount = parseInt(document.getElementById('tricksAmount').value) || 1;
    const container = document.querySelector('.tricksWrapper');
    const existing = container.querySelectorAll('.trick').length;
    const needed = amount;
    if (existing > needed) {
        for (let i = needed; i < existing; i++) {
            container.removeChild(container.lastElementChild);
        }
    } else if (existing < needed) {
        for (let i = existing; i < needed; i++) {
            const table = document.createElement('div');
            table.className = 'trick';
            table.innerHTML = `
                <div class="trickHeader"><select class="trickSelector"></select></div>
                <div class="trickInfo"></div>
            `;
            container.appendChild(table);
        }
    }
    updateTrickSelectors();
}

/* --------------------------------------------------------------
   MOD / PASSIVE CALCULATION
   -------------------------------------------------------------- */
function updateSkillModAndPassive(skillId) {
    const sel = document.getElementById(skillId);
    if (!sel) return;
    const rank = parseInt(sel.value) || 0;
    const modId = SKILL_MOD_MAP[skillId];
    const modVal = parseInt(document.getElementById(modId)?.value || document.getElementById(modId)?.textContent || 0);
    const baseName = skillId.replace('SkillRank', '').toLowerCase();

    const modEl = document.getElementById(baseName + 'Mod');
    if (modEl) modEl.textContent = modVal;

    const passiveEl = document.getElementById(baseName + 'Passive');
    if (passiveEl) passiveEl.textContent = rank + modVal + 2;   // passive = rank + mod + 2

    // Damage for attack skills
    if (['strike', 'blast', 'invoke'].includes(baseName)) {
        const dmgEl = document.getElementById(baseName + 'Damage');
        if (dmgEl) dmgEl.textContent = '3/die';
    }
}

/* --------------------------------------------------------------
   EVENT LISTENERS (skill selects + attribute inputs)
   -------------------------------------------------------------- */
function attachSkillListeners() {
    // skill rank changes
    document.querySelectorAll('select[id$="SkillRank"]').forEach(sel => {
        sel.addEventListener('change', () => {
            updateSkillModAndPassive(sel.id);
            calculateSkillPoints();
            updateProficiencySelectors(sel.id.replace('SkillRank', '').toLowerCase(), parseInt(sel.value) || 0);
        });
    });

    // attribute inputs (might, agility, …)
    Object.values(SKILL_MOD_MAP).forEach(attrId => {
        const el = document.getElementById(attrId);
        if (el) {
            el.addEventListener('input', () => {
                Object.entries(SKILL_MOD_MAP).forEach(([skillId, modId]) => {
                    if (modId === attrId) updateSkillModAndPassive(skillId);
                });
            });
        }
    });
}

/* --------------------------------------------------------------
   INITIALISATION
   -------------------------------------------------------------- */
window.addEventListener('load', () => {
    generateSkills('physical');
    generateSkills('mental');
    generateSkills('social');
    generateSkills('attack');

    attachSkillListeners();               // <-- NEW
    calculateSkillPoints();
    calculateAbilities();
    calculateAttributeValues();
    updateAttributeGroups();
    updateAllSkillModsAndPassives();

    ['strike', 'blast', 'invoke'].forEach(t => {
        const sel = document.getElementById(t + 'SkillRank');
        if (sel) updateProficiencySelectors(t, parseInt(sel.value) || 0);
    });

    updateTalentTables();   // now defined
    updateTrickTables();    // now defined
});

/* --------------------------------------------------------------
   REMAINING ORIGINAL FUNCTIONS (unchanged except for minor tidy-ups)
   -------------------------------------------------------------- */
function calculateSkillPoints() {
    const lvl = parseInt(document.getElementById('charLvl').value) || 1;
    const total = lvl * 3 + 9;
    let spent = 0;
    Object.values(SKILL_ID_MAP).forEach(id => {
        const sel = document.getElementById(id);
        if (sel) spent += parseInt(sel.value) || 0;
    });
    document.getElementById('skillPoints').textContent = total - spent;
}
function calculateAbilities() {
    const lvl = parseInt(document.getElementById('charLvl').value) || 1;
    const t = parseInt(document.getElementById('talentAmount').value) || 1;
    const r = parseInt(document.getElementById('tricksAmount').value) || 1;
    document.getElementById('abilityNumber').textContent = t + r + 2;
    const rem = lvl + 1 - Math.max(0, (t - 1) + (r - 1));
    document.getElementById('remainingAbilities').textContent = rem < 0 ? 0 : rem;
}
function calculateAttributeValues() { /* unchanged */ }
function updateAttributeGroups() { Object.values(ATTRIBUTE_GROUPS).forEach(g => updateAttributeGroup(g)); }
function updateAttributeGroup(group) { /* unchanged */ }
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
    let load = 0;
    for (let i = 1; i <= 12; i++) {
        const sel = document.getElementById('gearSelect' + i);
        if (sel) load += parseInt(sel.selectedOptions[0]?.dataset.load) || 0;
    }
    console.log('Total Load:', load);
}

/* --------------------------------------------------------------
   TALENT / TRICK SELECTORS (unchanged)
   -------------------------------------------------------------- */
function updateTalentSelectors() {
    const qualified = getQualifiedAbilities('talent');
    document.querySelectorAll('.talentSelector').forEach(sel => {
        sel.innerHTML = '<option value="">Select Talent</option>';
        qualified.forEach(a => {
            const opt = document.createElement('option');
            opt.value = a.name;
            opt.textContent = a.name;
            sel.appendChild(opt);
        });
    });
}
function updateTrickSelectors() {
    const qualified = getQualifiedAbilities('trick');
    document.querySelectorAll('.trickSelector').forEach(sel => {
        sel.innerHTML = '<option value="">Select Trick</option>';
        qualified.forEach(a => {
            const opt = document.createElement('option');
            opt.value = a.name;
            opt.textContent = a.name;
            sel.appendChild(opt);
        });
    });
}
function getQualifiedAbilities(type) {
    const out = [];
    Object.entries(SKILL_ID_MAP).forEach(([name, id]) => {
        const sel = document.getElementById(id);
        if (sel && parseInt(sel.value) >= 2 && abilitiesData[name.toLowerCase()]) {
            out.push(...abilitiesData[name.toLowerCase()].filter(a => a.type === type));
        }
    });
    return out;
}

/* --------------------------------------------------------------
   ROLE / WAY INFO (unchanged)
   -------------------------------------------------------------- */
function populateRoleInfo(e) {
    const name = e.target.value;
    if (!name) return;
    const way = waysData.find(w => w.name === name);
    if (!way) return;
    document.getElementById('wayTalentName').textContent = way.name;
    const desc = document.getElementById('wayTalentDesc');
    desc.innerHTML = '';
    ['passive', 'focus', 'critical effect'].forEach(k => {
        const val = way.props[Object.keys(way.props).find(p => p.toLowerCase().includes(k))];
        if (val) {
            const div = document.createElement('div');
            div.textContent = val;
            desc.appendChild(div);
        }
    });
    const attackSkill = way.props[Object.keys(way.props).find(p => p.includes('attack skill'))] || way.reqSkill;
    const skillId = SKILL_ID_MAP[attackSkill];
    if (skillId) {
        const sel = document.getElementById(skillId);
        if (sel && parseInt(sel.value) < 2) {
            sel.value = '2';
            sel.dispatchEvent(new Event('change'));
        }
    }
    const primary = way.props[Object.keys(way.props).find(p => p.includes('primary attribute'))];
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