// fables-scripts.js — Bestiary rendering (5e.tools-style two-panel layout)

let selectedCreature = null;
let bestiaryFilters = { search: '', biome: '', size: '', lvlMin: '', lvlMax: '' };
let bestiarySearchTimeout = null;
let bestiarySortKey = 'name';
let bestiarySortAsc = true;

// SVG tapered rule (dark-theme gold version of D&D red tapered rule)
const TAPERED_RULE = '<svg class="pointed-divider" height="5" width="100%"><polyline points="0,0 400,2.5 0,5"/></svg>';

// Populate filter dropdowns from data
function populateBestiaryFilters() {
    const biomes = new Set();
    const sizes = new Set();
    bestiaryData.forEach(c => {
        if (c._biomes) c._biomes.forEach(b => biomes.add(b));
        if (c.Size) sizes.add(c.Size);
    });

    const biomeSelect = document.getElementById('bestiary-biome');
    [...biomes].sort().forEach(b => {
        const opt = document.createElement('option');
        opt.value = b;
        opt.textContent = b;
        biomeSelect.appendChild(opt);
    });

    const sizeSelect = document.getElementById('bestiary-size');
    [...sizes].sort().forEach(s => {
        const opt = document.createElement('option');
        opt.value = s;
        opt.textContent = s;
        sizeSelect.appendChild(opt);
    });
}

// Apply all active filters + sort
function getFilteredBestiary() {
    const { search, biome, size, lvlMin, lvlMax } = bestiaryFilters;
    const searchLower = search.toLowerCase();
    let filtered = bestiaryData.filter(c => {
        if (searchLower && !c.Name.toLowerCase().includes(searchLower)) return false;
        if (biome && (!c._biomes || !c._biomes.includes(biome))) return false;
        if (size && c.Size !== size) return false;
        const lvl = parseInt(c.Lvl) || 0;
        if (lvlMin !== '' && lvl < parseInt(lvlMin)) return false;
        if (lvlMax !== '' && lvl > parseInt(lvlMax)) return false;
        return true;
    });

    // Sort
    filtered.sort((a, b) => {
        let va, vb;
        if (bestiarySortKey === 'name') {
            va = (a.Name || '').toLowerCase();
            vb = (b.Name || '').toLowerCase();
        } else if (bestiarySortKey === 'lvl') {
            va = parseInt(a.Lvl) || 0;
            vb = parseInt(b.Lvl) || 0;
        } else if (bestiarySortKey === 'size') {
            va = (a.Size || '').toLowerCase();
            vb = (b.Size || '').toLowerCase();
        }
        if (va < vb) return bestiarySortAsc ? -1 : 1;
        if (va > vb) return bestiarySortAsc ? 1 : -1;
        return 0;
    });

    return filtered;
}

// Render left-panel creature list (table rows)
function renderBestiaryList() {
    const list = document.getElementById('bestiary-list');
    const filtered = getFilteredBestiary();
    list.innerHTML = '';

    if (filtered.length === 0) {
        list.innerHTML = '<div class="bestiary-no-results">No creatures found.</div>';
        return;
    }

    filtered.forEach(c => {
        const row = document.createElement('div');
        row.className = 'bestiary-row' + (selectedCreature === c.Name ? ' active' : '');
        row.addEventListener('click', () => showCreatureDetail(c.Name));

        row.innerHTML =
            `<span class="bestiary-col">${c.Name}</span>` +
            `<span class="bestiary-col bestiary-col-lvl">${c.Lvl || '—'}</span>` +
            `<span class="bestiary-col bestiary-col-size">${c.Size || '—'}</span>` +
            `<span class="bestiary-col bestiary-col-biome">${c._biomes?.join(', ') || '—'}</span>`;

        list.appendChild(row);
    });
}

// Build a property line (bold label + inline value) — D&D stat block style
function propLine(label, value) {
    return `<div class="sb-property-line"><span class="sb-prop-name">${label}</span> ${value}</div>`;
}

// Show full creature stat block (right panel)
function showCreatureDetail(name) {
    const creature = creatureByName.get(name);
    if (!creature) return;

    selectedCreature = name;
    const detail = document.getElementById('bestiary-detail');

    let html = '<div class="stat-block">';

    // Top bar
    html += '<div class="sb-bar"></div>';
    html += '<div class="sb-content">';

    // Creature heading
    html += `<div class="sb-heading">`;
    html += `<h1>${creature.Name}</h1>`;
    const subtitle = [creature.Size, creature._biomes?.length ? creature._biomes.join(', ') : null].filter(Boolean).join(' — ');
    if (subtitle) html += `<h2>${subtitle}</h2>`;
    html += `</div>`;

    // Tapered rule
    html += TAPERED_RULE;

    // Stat icons row (matching character sheet layout)
    // Map stat names to icon files
    const statIconMap = {
        'Max HP': 'vit.png',
        'Marred': 'marred.png',
        'Desperate': 'desperate.png',
        'Guard': 'guard-white.png',
        'Armor': 'armor2.png',
        'Pace': 'pace6.png',
        'Initiative': 'initiative.png',
        'Breath': 'breath2.png',
        'Mana': 'mana.png',
        'Inspirit': 'inspirit2.png'
    };

    // All stats to show in the icon row (in display order)
    const iconStats = ['Max HP', 'Marred', 'Desperate', 'Guard', 'Armor', 'Pace', 'Initiative', 'Breath', 'Mana', 'Inspirit'];
    // Stats without icons, shown as plain text
    const plainStats = ['Brace', 'Punish'];

    const hasIconStats = iconStats.some(f => creature[f]);
    const hasPlainStats = plainStats.some(f => creature[f]);

    if (hasIconStats) {
        html += '<div class="sb-stats-row">';
        iconStats.forEach(f => {
            if (!creature[f]) return;
            const icon = statIconMap[f];
            html += `<div class="sb-stat-icon">` +
                `<div class="sb-stat-icon-img" style="background-image:url('images/${icon}');">${creature[f]}</div>` +
                `<div class="sb-stat-icon-label">${f}</div>` +
                `</div>`;
        });
        // Append plain stats (no icons) in same row
        plainStats.forEach(f => {
            if (!creature[f]) return;
            html += `<div class="sb-stat-icon">` +
                `<div class="sb-stat-icon-plain">${creature[f]}</div>` +
                `<div class="sb-stat-icon-label">${f}</div>` +
                `</div>`;
        });
        html += '</div>';
        html += TAPERED_RULE;
    } else if (hasPlainStats) {
        html += '<div class="sb-stats-row">';
        plainStats.forEach(f => {
            if (!creature[f]) return;
            html += `<div class="sb-stat-icon">` +
                `<div class="sb-stat-icon-plain">${creature[f]}</div>` +
                `<div class="sb-stat-icon-label">${f}</div>` +
                `</div>`;
        });
        html += '</div>';
        html += TAPERED_RULE;
    }

    // Level shown as property line (not an icon)
    if (creature.Lvl) html += propLine('Level', creature.Lvl);

    // Image (if exists, placed after core stats)
    if (creature._imgPath) {
        html += `<div class="sb-image-wrap"><img src="${creature._imgPath}" alt="${creature.Name}" class="sb-image"></div>`;
    }

    // Fable
    if (creature.Fable) {
        html += `<div class="sb-fable"><em>${processTextForTooltips(creature.Fable)}</em></div>`;
        html += TAPERED_RULE;
    }

    // World Building (Desc)
    if (creature.Desc) {
        html += `<h3>World Building</h3>`;
        html += `<div class="sb-text">${processTextForTooltips(creature.Desc)}</div>`;
    }

    // Combat Behavior section
    const behaviorFields = [
        { key: 'Strategy', label: 'Strategy' },
        { key: 'Ignores', label: 'Ignores' },
        { key: 'Hates', label: 'Hates' },
        { key: 'Dislikes', label: 'Dislikes' }
    ];
    const hasBehavior = behaviorFields.some(f => creature[f.key]);
    if (hasBehavior) {
        html += `<h3>Combat Behavior</h3>`;
        behaviorFields.forEach(f => {
            if (creature[f.key]) {
                html += propLine(f.label + '.', processTextForTooltips(creature[f.key]));
            }
        });
    }

    // Attacks section (grid layout)
    const namedAttacks = creature._attacks?.filter(atk => atk.name && atk.name.toLowerCase() !== 'none') || [];
    if (namedAttacks.length) {
        html += `<div class="sb-atk-grid">`;
        // Header row (h3 inline with column headers)
        html += `<h3 class="sb-atk-h3">Attacks</h3>`;
        html += `<div class="sb-atk-header" data-tip="expr:Strike, Blast, or Invoke">Type</div>`;
        html += `<div class="sb-atk-header" data-tip="expr:Range">Range</div>`;
        html += `<div class="sb-atk-header" data-tip="expr:Dice rolled">Rank</div>`;
        html += `<div class="sb-atk-header" data-tip="expr:Bonus added">Mod</div>`;
        html += `<div class="sb-atk-header" data-tip="expr:Damage dealt">Dmg</div>`;
        html += `<div class="sb-atk-header sb-atk-ce" data-tip="expr:Critical Effects">CE</div>`;
        html += `<div class="sb-atk-header" data-tip="expr:Attacks per round">APR</div>`;
        // Data rows
        namedAttacks.forEach(atk => {
            html += `<div class="sb-atk-name">${atk.name}</div>`;
            html += `<div class="sb-atk-cell">${atk.type || '—'}</div>`;
            html += `<div class="sb-atk-cell">${atk.rng || '—'}</div>`;
            html += `<div class="sb-atk-cell">${atk.dice || '—'}</div>`;
            html += `<div class="sb-atk-cell">${atk.mod || '—'}</div>`;
            html += `<div class="sb-atk-cell">${atk.dmg || '—'}</div>`;
            html += `<div class="sb-atk-cell sb-atk-ce">${atk.note ? processTextForTooltips(atk.note) : '—'}</div>`;
            html += `<div class="sb-atk-cell">${atk.apr || '—'}</div>`;
        });
        html += `</div>`;
    }

    // Abilities section
    const abilityFields = [
        { key: 'Talents', label: 'Talents' },
        { key: 'Tricks', label: 'Tricks' },
        { key: 'Special', label: 'Special' },
        { key: 'Rituals', label: 'Rituals' }
    ];
    const hasAbilities = abilityFields.some(f => creature[f.key]);
    if (hasAbilities) {
        html += `<h3>Abilities</h3>`;
        abilityFields.forEach(f => {
            if (creature[f.key]) {
                html += `<div class="sb-property-block"><span class="sb-prop-name">${f.label}.</span> ${processTextForTooltips(creature[f.key])}</div>`;
            }
        });
    }

    // Skills
    if (creature.Skills) {
        html += propLine('Skills.', processTextForTooltips(creature.Skills));
    }

    // Loot
    if (creature.Loot) {
        html += TAPERED_RULE;
        html += propLine('Loot.', processTextForTooltips(creature.Loot));
    }

    html += '</div>'; // sb-content
    html += '<div class="sb-bar"></div>';
    html += '</div>'; // stat-block

    detail.innerHTML = html;

    // Update list active state
    renderBestiaryList();
}

// Setup filter + sort event listeners
function setupBestiaryFilters() {
    const searchInput = document.getElementById('bestiary-search');
    const biomeSelect = document.getElementById('bestiary-biome');
    const sizeSelect = document.getElementById('bestiary-size');
    const lvlMin = document.getElementById('bestiary-lvl-min');
    const lvlMax = document.getElementById('bestiary-lvl-max');
    const resetBtn = document.getElementById('bestiary-reset');

    searchInput.addEventListener('input', () => {
        clearTimeout(bestiarySearchTimeout);
        bestiarySearchTimeout = setTimeout(() => {
            bestiaryFilters.search = searchInput.value.trim();
            renderBestiaryList();
        }, 250);
    });

    biomeSelect.addEventListener('change', () => {
        bestiaryFilters.biome = biomeSelect.value;
        renderBestiaryList();
    });

    sizeSelect.addEventListener('change', () => {
        bestiaryFilters.size = sizeSelect.value;
        renderBestiaryList();
    });

    lvlMin.addEventListener('input', () => {
        bestiaryFilters.lvlMin = lvlMin.value;
        renderBestiaryList();
    });

    lvlMax.addEventListener('input', () => {
        bestiaryFilters.lvlMax = lvlMax.value;
        renderBestiaryList();
    });

    resetBtn.addEventListener('click', () => {
        searchInput.value = '';
        biomeSelect.value = '';
        sizeSelect.value = '';
        lvlMin.value = '';
        lvlMax.value = '';
        bestiaryFilters = { search: '', biome: '', size: '', lvlMin: '', lvlMax: '' };
        selectedCreature = null;
        document.getElementById('bestiary-detail').innerHTML = '<div class="bestiary-placeholder">Select a creature from the list</div>';
        renderBestiaryList();
    });

    // Sort column headers
    document.querySelectorAll('.bestiary-col-headers .sortable').forEach(col => {
        col.addEventListener('click', () => {
            const key = col.dataset.sort;
            if (bestiarySortKey === key) {
                bestiarySortAsc = !bestiarySortAsc;
            } else {
                bestiarySortKey = key;
                bestiarySortAsc = true;
            }
            // Update active indicator
            document.querySelectorAll('.bestiary-col-headers .sortable').forEach(c => {
                c.classList.remove('active', 'sort-desc');
            });
            col.classList.add('active');
            if (!bestiarySortAsc) col.classList.add('sort-desc');
            renderBestiaryList();
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        const fablesActive = document.getElementById('fables')?.classList.contains('active');
        if (!fablesActive) return;

        if (e.key === '/' && document.activeElement !== searchInput) {
            e.preventDefault();
            searchInput.focus();
        }
        if (e.key === 'Escape') {
            if (document.activeElement === searchInput) {
                searchInput.value = '';
                bestiaryFilters.search = '';
                searchInput.blur();
                renderBestiaryList();
            }
        }
    });
}

// Init on data load
window.addEventListener('dataLoaded', () => {
    if (bestiaryData.length === 0) return;
    populateBestiaryFilters();
    setupBestiaryFilters();
    renderBestiaryList();
    // Auto-select first creature
    const first = getFilteredBestiary()[0];
    if (first) showCreatureDetail(first.Name);
});
