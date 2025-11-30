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
                config.related.forEach(rel => {
                    item[rel.suffix.toLowerCase()] = row[rel.idx]?.trim();
                });
                dataByCategory[categoryKey].push(item);
            });
        }
    }
    return dataByCategory;
}

// ———————————————————————— POPULATORS ————————————————————————

function populateRoleSelector() {
    const sel = document.getElementById('roleSelector');
    waysData.forEach(way => {
        const opt = document.createElement('option');
        opt.value = way.name;
        opt.textContent = way.name;
        sel.appendChild(opt);
    });
    sel.addEventListener('change', () => {
        const selected = waysData.find(w => w.name === sel.value);
        if (selected) {
            const talentKey = Object.keys(selected.props).find(k => k.includes('talent name'));
            const talentDescKey = Object.keys(selected.props).find(k => k.includes('talent description'));
            document.getElementById('wayTalentName').textContent = talentKey ? selected.props[talentKey] : 'Unknown Talent';
            const desc = talentDescKey ? selected.props[talentDescKey] : 'No description';
            document.getElementById('wayTalentDesc').innerHTML = replacePlaceholders(desc.replace(/\n/g, '<br>'));
        } else {
            document.getElementById('wayTalentName').textContent = 'Select Way';
            document.getElementById('wayTalentDesc').textContent = '';
        }
    });
}

// Populate ability selectors by type
function updateAbilitySelectors(type) {
    // Not fully implemented in provided code; assuming it's for dynamic selectors
}

// Update Way options (if needed)
function updateWayOptions() {
    // Placeholder if expansion needed
}

// Populate proficiency selectors
function populateProficiencySelectors(type) {
    const profs = profData[type] || [];
    const containers = {
        strike: document.getElementById('strikeProfContainer'),
        blast: document.getElementById('blastProfContainer'),
        invoke: document.getElementById('invokeProfContainer')
    }[type];
    if (!containers) return;

    for (let i = 1; i <= 5; i++) {
        const sel = document.getElementById(`${type}ProfSelector${i}`);
        if (!sel) continue;
        sel.innerHTML = '<option value="profUnassigned"></option>';
        profs.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p.name;
            opt.textContent = p.name;
            sel.appendChild(opt);
        });
    }
}

// Update prof selectors based on rank
function updateProficiencySelectors(type, rank) {
    // Placeholder logic
}

// ———————————————————————— CALCULATORS ————————————————————————

function calculateSkillPoints() {
    // Implement as needed
}

function calculateAbilities() {
    // Implement as needed
}

function calculateAttributeValues() {
    // Implement as needed
}

function updateAttributeGroups() {
    // Implement as needed
}

function updateAllSkillModsAndPassives() {
    // Implement as needed
}

// ———————————————————————— DYNAMIC TABLES ————————————————————————

function updateTalentTables() {
    const amount = parseInt(document.getElementById('talentAmount').value) || 1;
    const container = document.getElementById('talentTables');
    container.innerHTML = '';
    for (let i = 1; i <= amount; i++) {
        const table = document.createElement('div');
        table.className = 'talentTable';
        table.innerHTML = `
            <select id="talentSkill${i}" class="talentSkillSelector">
                <!-- Options populated dynamically -->
            </select>
            <select id="talentSelector${i}" class="talentSelector">
                <option value="">Select Talent</option>
            </select>
            <div id="talentDesc${i}" class="talentInfo"></div>
        `;
        container.appendChild(table);

        // Populate skill selector
        const skillSel = table.querySelector(`#talentSkill${i}`);
        Object.keys(SKILL_ID_MAP).forEach(skill => {
            const opt = document.createElement('option');
            opt.value = skill.toLowerCase();
            opt.textContent = skill;
            skillSel.appendChild(opt);
        });

        // On skill change, populate talents
        skillSel.addEventListener('change', () => populateTalents(i, skillSel.value));

        // On talent change, show desc
        const talentSel = table.querySelector(`#talentSelector${i}`);
        talentSel.addEventListener('change', () => {
            const selected = abilitiesData.get(skillSel.value)?.find(a => a.name === talentSel.value && a.type === 'talent');
            const desc = selected?.details?.Description || 'No description';
            document.getElementById(`talentDesc${i}`).innerHTML = replacePlaceholders(desc.replace(/\n/g, '<br>'));
        });
    }
}

function populateTalents(index, skill) {
    const sel = document.getElementById(`talentSelector${index}`);
    sel.innerHTML = '<option value="">Select Talent</option>';
    const talents = abilitiesData.get(skill)?.filter(a => a.type === 'talent') || [];
    talents.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t.name;
        opt.textContent = t.name;
        sel.appendChild(opt);
    });
}

function updateTrickTables() {
    const amount = parseInt(document.getElementById('tricksAmount').value) || 1;
    const container = document.getElementById('trickTables');
    container.innerHTML = '';
    for (let i = 1; i <= amount; i++) {
        const table = document.createElement('div');
        table.className = 'trickTable';
        table.innerHTML = `
            <select id="trickSkill${i}" class="trickSkillSelector">
                <!-- Options populated dynamically -->
            </select>
            <select id="trickSelector${i}" class="trickSelector">
                <option value="">Select Trick</option>
            </select>
            <div id="trickDesc${i}" class="trickInfo"></div>
        `;
        container.appendChild(table);

        // Populate skill selector
        const skillSel = table.querySelector(`#trickSkill${i}`);
        Object.keys(SKILL_ID_MAP).forEach(skill => {
            const opt = document.createElement('option');
            opt.value = skill.toLowerCase();
            opt.textContent = skill;
            skillSel.appendChild(opt);
        });

        // On skill change, populate tricks
        skillSel.addEventListener('change', () => populateTricks(i, skillSel.value));

        // On trick change, show desc
        const trickSel = table.querySelector(`#trickSelector${i}`);
        trickSel.addEventListener('change', () => {
            const selected = abilitiesData.get(skillSel.value)?.find(a => a.name === trickSel.value && a.type === 'trick');
            const desc = selected?.details?.Description || 'No description';
            document.getElementById(`trickDesc${i}`).innerHTML = replacePlaceholders(desc.replace(/\n/g, '<br>'));
        });
    }
}

function populateTricks(index, skill) {
    const sel = document.getElementById(`trickSelector${index}`);
    sel.innerHTML = '<option value="">Select Trick</option>';
    const tricks = abilitiesData.get(skill)?.filter(a => a.type === 'trick') || [];
    tricks.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t.name;
        opt.textContent = t.name;
        sel.appendChild(opt);
    });
}

// ———————————————————————— GEAR MANAGEMENT ————————————————————————

let readyState = Array.from({length: MAX_READY_SLOTS}, () => ({ gear: '', amt: 1, stowed: [] }));
let allOptions = [], nonPackOptions = [];

function generateGearEntries() {
    const container = document.getElementById('gearEntries');
    container.innerHTML = '';
    for (let i = 1; i <= MAX_READY_SLOTS; i++) {
        const entry = document.createElement('div');
        entry.className = 'gearEntry';
        entry.id = `gear${i}`;
        entry.innerHTML = `
            <select id="gear${i}Select" class="gearSelector">
                <option value=""></option>
            </select>
            <input type="number" id="gear${i}Amt" min="1" value="1" class="gearAmt">
            <div id="gear${i}Load" class="gearLoad"></div>
            <div id="gear${i}Details" class="hasDetails"></div>
            <div id="stowed${i}" class="stowedContainer"></div>
        `;
        container.appendChild(entry);

        // Populate selector
        const sel = entry.querySelector(`#gear${i}Select`);
        allOptions.forEach(g => {
            const opt = document.createElement('option');
            opt.value = g.name;
            opt.textContent = g.name;
            opt.setAttribute('data-load', g.load || 0);
            opt.setAttribute('data-category', g.category);
            opt.setAttribute('data-limit', g.loadLimit || 0); // For packs
            sel.appendChild(opt);
        });

        // On change
        sel.addEventListener('change', () => {
            const selectedName = sel.value;
            const item = allOptions.find(g => g.name === selectedName);
            readyState[i-1].gear = selectedName;
            readyState[i-1].amt = 1;
            entry.querySelector(`#gear${i}Amt`).value = 1;

            // Handle details
            const detailsDiv = entry.querySelector(`#gear${i}Details`);
            detailsDiv.textContent = item?.details?.trim() ? 'i' : '';
            detailsDiv.dataset.details = item?.details?.trim() || '';

            // Handle stowed for packs
            const stowedContainer = entry.querySelector(`#stowed${i}`);
            stowedContainer.innerHTML = '';
            if (item?.category === 'Packs') {
                readyState[i-1].stowed = Array.from({length: item.stowedSlots || 3}, () => ({ gear: '', amt: 1 }));
                readyState[i-1].stowed.forEach((s, j) => addStowedEntry(i, j + 1));
            } else {
                readyState[i-1].stowed = [];
            }

            updateReadyLoad(i);
            calculateLoad();
        });

        // On amount change
        entry.querySelector(`#gear${i}Amt`).addEventListener('input', () => {
            const val = Math.max(1, parseInt(this.value) || 1);
            this.value = val;
            readyState[i-1].amt = val;
            updateReadyLoad(i);
            calculateLoad();
        });
    }
}

// Add stowed entry
function addStowedEntry(i, stowedIndex) {
    const container = document.getElementById(`stowed${i}`);
    const entry = document.createElement('div');
    entry.className = 'stowedEntry';
    entry.id = `stowed-${i}-${stowedIndex}`;
    entry.innerHTML = `
        <select id="stowed-${i}-${stowedIndex}-select" class="stowedSelector">
            <option value=""></option>
        </select>
        <input type="number" id="stowed-${i}-${stowedIndex}-amt" min="1" value="1" class="stowedAmt">
        <div id="stowed-${i}-${stowedIndex}-load" class="stowedLoad"></div>
        <div id="stowed-${i}-${stowedIndex}-details" class="hasDetails"></div>
    `;
    container.appendChild(entry);

    // Populate selector
    const sel = entry.querySelector(`#stowed-${i}-${stowedIndex}-select`);
    nonPackOptions.forEach(g => {
        const opt = document.createElement('option');
        opt.value = g.name;
        opt.textContent = g.name;
        opt.setAttribute('data-load', g.load || 0);
        sel.appendChild(opt);
    });

    // Initial value if state exists
    const j = stowedIndex - 1;
    const s = readyState[i-1].stowed[j];
    if (s) {
        sel.value = s.gear;
        entry.querySelector('input').value = s.amt;
        const item = nonPackOptions.find(g => g.name === s.gear);
        if (item?.details?.trim()) {
            const detailsDiv = entry.querySelector(`#stowed-${i}-${stowedIndex}-details`);
            detailsDiv.textContent = 'i';
            detailsDiv.dataset.details = item.details.trim();
        }
    }

    // On change
    sel.addEventListener('change', () => {
        const selectedName = sel.value;
        const item = nonPackOptions.find(g => g.name === selectedName);

        // Update details
        const detailsDiv = entry.querySelector(`#stowed-${i}-${stowedIndex}-details`);
        detailsDiv.textContent = item?.details?.trim() ? 'i' : '';
        detailsDiv.dataset.details = item?.details?.trim() || '';

        readyState[i-1].stowed[j].gear = selectedName;
        updateStowedLoad(i, stowedIndex);
        updateReadyLoad(i);
        calculateLoad();
    });

    // On amount change
    entry.querySelector('input').addEventListener('input', () => {
        const val = Math.max(1, parseInt(this.value) || 1);
        this.value = val;
        readyState[i-1].stowed[j].amt = val;
        updateStowedLoad(i, stowedIndex);
        updateReadyLoad(i);
        calculateLoad();
    });

    updateStowedLoad(i, stowedIndex);
}

// Update single stowed load
function updateStowedLoad(readyI, stowedJ) {
    const sel = document.getElementById(`stowed-${readyI}-${stowedJ}-select`);
    if (!sel) return;
    const opt = sel.options[sel.selectedIndex];
    const baseLoad = parseFloat(opt.getAttribute('data-load')) || 0;
    const qty = parseInt(document.getElementById(`stowed-${readyI}-${stowedJ}-amt`).value) || 1;
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

// Calculate total load
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
// Helper to get current skill rank by name
function getSkillRank(skillName) {
    const capitalized = skillName.charAt(0).toUpperCase() + skillName.slice(1);
    const id = SKILL_ID_MAP[capitalized];
    if (!id) return 0;
    const el = document.getElementById(id);
    return parseInt(el?.value) || 0;
}

// Helper to replace |skill/divisor| placeholders in text
function replacePlaceholders(text) {
    return text.replace(/\|([^/]+)\/(\d+)\|/g, (match, skill, div) => {
        const rank = getSkillRank(skill);
        return Math.floor(rank / parseInt(div));
    });
}

function saveCharacter() {
    // Implement save logic if needed
}