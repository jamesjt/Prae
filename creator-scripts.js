// creator-scripts.js — Optimized & Refactored v2.0
const Creator = {
    MAX_READY_SLOTS: 5,

    // Core state
    readyState: Array(5).fill(null).map(() => ({ gear: '', amt: 1, stowed: [] })),
    coinState: { tok: 0, copper: 0, silver: 0, gold: 0 },
    usedLocations: {},

    // Cached data
    data: {
        ways: [],
        abilities: {},
        gear: { all: [], nonPack: [] },
        prof: { strike: [], blast: [], invoke: [] }
    },

    elements: {},

    // ===================================================================
    // INITIALIZATION
    // ===================================================================
    init() {
        Promise.all([
            this.loadWays(),
            this.loadAbilities(),
            this.loadProfAndGear()
        ])
        .then(() => {
            this.cacheElements();
            this.buildGearOptions();
            this.generateGearEntries();
            this.setupEventDelegation();
            this.refreshAll();
        })
        .catch(err => console.error('Failed to load creator data:', err));
    },

    // ===================================================================
    // DATA LOADING
    // ===================================================================
    async loadWays() {
        const text = await fetch(WAYS_CSV_URL).then(r => r.ok ? r.text() : Promise.reject(r.status));
        const rows = this.parseCSV(text);
        const includeIdx = rows.findIndex(r => (r[0] || '').toLowerCase().includes('include'));
        if (includeIdx === -1) return;

        for (let c = 1; c < rows[includeIdx].length; c++) {
            if (!['TRUE','1'].includes(rows[includeIdx][c].trim().toUpperCase())) continue;
            const props = {};
            rows.forEach(row => { if (row[0]) props[row[0].trim().toLowerCase()] = (row[c] || '').trim(); });

            const name = Object.keys(props).find(k => k.includes('way name')) ? props[Object.keys(props).find(k => k.includes('way name'))] : '';
            const reqSkill = Object.keys(props).find(k => k.includes('required skill')) ? props[Object.keys(props).find(k => k.includes('required skill'))] : '';

            if (name && reqSkill) {
                const skillId = reqSkill.trim() === 'Any' ? 'Any' : SKILL_ID_MAP[reqSkill.trim()];
                if (skillId || reqSkill.trim() === 'Any') {
                    this.data.ways.push({ name, props, reqSkill: reqSkill.trim(), skillId });
                }
            }
        }
        this.populateRoleSelector();
        this.updateWayOptions();
    },

    async loadAbilities() {
        const text = await fetch(ABILITIES_CSV_URL).then(r => r.ok ? r.text() : Promise.reject(r.status));
        const rows = this.parseCSV(text);
        const skills = rows[0].slice(1).map(s => s.trim().toLowerCase());

        skills.forEach((skill, col) => {
            let current = null;
            for (let r = 1; r < rows.length; r++) {
                const key = (rows[r][0] || '').trim();
                const val = (rows[r][col + 1] || '').trim();

                if (key.match(/^(Talent|Trick|Ritual) \d+ Name$/i)) {
                    if (current) this.saveAbility(skill, current);
                    const type = key.match(/^(Talent|Trick|Ritual)/i)[0].toLowerCase();
                    current = { type, name: val || `(Unnamed ${type})`, skill, details: {} };
                } else if (current && key.includes(' ')) {
                    const detailKey = key.split(' ').slice(2).join(' ');
                    current.details[detailKey] = val;
                }
            }
            if (current) this.saveAbility(skill, current);
        });

        updateTalentSelectors();
        updateTrickSelectors();
    },

    async loadProfAndGear() {
        const text = await fetch(PROF_CSV_URL).then(r => r.ok ? r.text() : Promise.reject(r.status));
        const rows = this.parseCSV(text);
        const headers = rows[0].map(h => h.trim());

        const gearIdx = headers.indexOf('Gear');
        const loadIdx = headers.indexOf('Load');
        const typeIdx = headers.indexOf('Type');
        const packIdx = headers.indexOf('Pack');
        const locIdx = headers.indexOf('Location');
        const slotsIdx = headers.indexOf('Stowed Slots');
        const limitIdx = headers.indexOf('Load Limit');

        // Parse gear
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            if (!row[gearIdx]) continue;
            const gear = {
                name: row[gearIdx].trim(),
                load: parseFloat(row[loadIdx]) || 0,
                baseLoad: parseFloat(row[loadIdx]) || 0,
                type: row[typeIdx]?.trim() || '',
                isPack: row[packIdx]?.trim().toLowerCase() === 'yes',
                location: row[locIdx]?.trim() || null,
                stowedSlots: parseInt(row[slotsIdx]) || 0,
                loadLimit: parseFloat(row[limitIdx]) || 0
            };
            this.data.gear.all.push(gear);
            if (!gear.isPack) this.data.gear.nonPack.push(gear);
        }

        // Parse proficiencies (strike/blast/invoke)
        // ... (your existing logic here — unchanged for now)
    },

    saveAbility(skill, ability) {
        if (!this.data.abilities[skill]) this.data.abilities[skill] = [];
        this.data.abilities[skill].push(ability);
    },

    // ===================================================================
    // DOM & EVENTS
    // ===================================================================
    cacheElements() {
        this.elements.gearEntries = document.getElementById('gearEntries');
        this.elements.totalLoad = document.getElementById('totalLoadValue');
        this.elements.coinInputs = ['tok','copper','silver','gold'].reduce((o,id) => {
            o[id] = document.getElementById(id);
            return o;
        }, {});
    },

    generateGearEntries() {
        const container = this.elements.gearEntries;
        container.innerHTML = '';

        for (let i = 1; i <= this.MAX_READY_SLOTS; i++) {
            const div = document.createElement('div');
            div.className = 'gearEntry';
            div.innerHTML = `
                <select id="gear${i}Select" class="gearSelector"><option value="">— Ready Slot ${i} —</option></select>
                <input type="number" id="gear${i}Amt" class="gearAmt" min="1" value="1">
                <div id="gear${i}Load" class="gearLoad"></div>
                <div id="gear${i}Details" class="gearDetails">i</div>
            `;
            container.appendChild(div);

            const select = div.querySelector(`#gear${i}Select`);
            select.innerHTML += this.data.gear.all.map(g =>
                `<option value="${g.name}" data-load="${g.baseLoad}" ${g.isPack ? 'data-pack="1"' : ''}>${g.name}</option>`
            ).join('');
        }
    },

    setupEventDelegation() {
        // All gear changes
        this.elements.gearEntries.addEventListener('change', e => {
            if (!e.target.matches('select[class*="gearSelector"]')) return;
            const id = e.target.id;
            if (id.includes('stowed-')) {
                const [,readyI,,stowedJ] = id.match(/stowed-(\d+)-(\d+)-select/) || [];
                this.handleStowedChange(parseInt(readyI), parseInt(stowedJ), e.target);
            } else if (id.includes('gear') && id.includes('Select')) {
                const i = parseInt(id.match(/gear(\d+)Select/)[1]);
                this.handleReadyChange(i, e.target);
            }
        });

        this.elements.gearEntries.addEventListener('input', e => {
            if (e.target.matches('input[type="number"]')) {
                const id = e.target.id;
                if (id.includes('gear') && id.includes('Amt')) {
                    const i = parseInt(id.match(/gear(\d+)Amt/)[1]);
                    this.handleReadyAmount(i, e.target);
                } else if (id.includes('stowed-') && id.includes('-amt')) {
                    const [,readyI,,stowedJ] = id.match(/stowed-(\d+)-(\d+)-amt/) || [];
                    this.handleStowedAmount(parseInt(readyI), parseInt(stowedJ), e.target);
                }
            }
        });

        // Coin pouch
        Object.values(this.elements.coinInputs).forEach(input => {
            if (!input) return;
            input.addEventListener('input', e => {
                const val = Math.max(0, parseInt(e.target.value) || 0);
                this.coinState[e.target.id] = val;
                e.target.value = val;
                this.updateCoinLoad();
            });
        });
    },

    // ===================================================================
    // GEAR LOGIC
    // ===================================================================
    handleReadyChange(slot, select) {
        const newGearName = select.value;
        const oldGearName = this.readyState[slot-1].gear;
        const oldGear = this.data.gear.all.find(g => g.name === oldGearName);
        const newGear = this.data.gear.all.find(g => g.name === newGearName);

        // Free old pack location
        if (oldGear?.isPack) this.usedLocations[oldGear.location] = null;
        // Claim new pack location
        if (newGear?.isPack) {
            if (this.usedLocations[newGear.location] && this.usedLocations[newGear.location] !== slot) {
                alert(`Location "${newGear.location}" already in use!`);
                select.value = oldGearName;
                return;
            }
            this.usedLocations[newGear.location] = slot;
        }

        this.readyState[slot-1].gear = newGearName;
        if (newGear?.isPack) {
            const slots = newGear.stowedSlots || 0;
            this.readyState[slot-1].stowed = this.readyState[slot-1].stowed.slice(0, slots);
            while (this.readyState[slot-1].stowed.length < slots) {
                this.readyState[slot-1].stowed.push({ gear: '', amt: 1 });
            }
        } else {
            this.readyState[slot-1].stowed = [];
        }

        this.renderStowed(slot);
        this.updateReadyLoad(slot);
        this.calculateLoad();
    },

    handleReadyAmount(slot, input) {
        const amt = Math.max(1, parseInt(input.value) || 1);
        input.value = amt;
        this.readyState[slot-1].amt = amt;
        this.updateReadyLoad(slot);
        this.calculateLoad();
    },

    handleStowedChange(readyI, stowedJ, select) {
        this.readyState[readyI-1].stowed[stowedJ-1].gear = select.value;
        this.updateStowedLoad(readyI, stowedJ);
        this.updateReadyLoad(readyI);
        this.calculateLoad();
    },

    handleStowedAmount(readyI, stowedJ, input) {
        const amt = Math.max(1, parseInt(input.value) || 1);
        input.value = amt;
        this.readyState[readyI-1].stowed[stowedJ-1].amt = amt;
        this.updateStowedLoad(readyI, stowedJ);
        this.updateReadyLoad(readyI);
        this.calculateLoad();
    },

    renderStowed(slot) {
        let container = document.getElementById(`stowed-container-${slot}`);
        const gearEntry = document.querySelector(`#gear${slot}Select`).closest('.gearEntry');
        const stowed = this.readyState[slot-1].stowed;

        if (stowed.length === 0) {
            container?.remove();
            return;
        }

        if (!container) {
            container = document.createElement('div');
            container.id = `stowed-container-${slot}`;
            container.className = 'stowed-container';
            gearEntry.after(container);
        }

        container.innerHTML = stowed.map((s, j) => `
            <div class="gearEntry gearStowed">
                <select id="stowed-${slot}-${j+1}-select" class="gearSelector">
                    <option value="">— Stowed —</option>
                    ${this.data.gear.nonPack.map(g => 
                        `<option value="${g.name}" data-load="${g.load}" ${s.gear===g.name?'selected':''}>${g.name}</option>`
                    ).join('')}
                </select>
                <input type="number" id="stowed-${slot}-${j+1}-amt" min="1" value="${s.amt}">
                <div id="stowed-${slot}-${j+1}-load" class="gearLoad"></div>
                <div class="gearDetails">i</div>
            </div>
        `).join('');
    },

    updateReadyLoad(slot) {
        const state = this.readyState[slot-1];
        const item = this.data.gear.all.find(g => g.name === state.gear);
        let total = 0;
        if (item) {
            total += (item.baseLoad || 0) * state.amt;
            if (item.isPack) {
                state.stowed.forEach(s => {
                    const sub = this.data.gear.nonPack.find(g => g.name === s.gear);
                    if (sub) total += (sub.load || 0) * s.amt;
                });
            }
        }
        const el = document.getElementById(`gear${slot}Load`);
        if (el) {
            el.textContent = total > 0 ? total.toFixed(2).replace(/\.?0+$/, '') : '';
            el.style.color = item?.isPack && total > (item.loadLimit || 0) ? 'red' : '';
        }
    },

    updateStowedLoad(readyI, stowedJ) {
        const select = document.getElementById(`stowed-${readyI}-${stowedJ}-select`);
        if (!select) return;
        const item = this.data.gear.nonPack.find(g => g.name === select.value);
        const qty = this.readyState[readyI-1].stowed[stowedJ-1].amt;
        const load = (item?.load || 0) * qty;
        const el = document.getElementById(`stowed-${readyI}-${stowedJ}-load`);
        if (el) {
            el.textContent = load > 0 ? load.toFixed(2).replace(/\.?0+$/, '') : '';
            el.style.color = (qty > 1 && (item?.load || 0) > 1) ? 'red' : '';
        }
    },

    updateCoinLoad() {
        const totalCoins = Object.values(this.coinState).reduce((a,b) => a + b, 0);
        const load = totalCoins / 50;
        const el = document.getElementById('coinLoad');
        if (el) {
            el.textContent = load.toFixed(2).replace(/\.?0+$/, '');
            el.style.color = load > 1 ? 'red' : '';
        }
        this.calculateLoad();
    },

    calculateLoad() {
        let total = 0;
        for (let i = 1; i <= this.MAX_READY_SLOTS; i++) {
            const txt = document.getElementById(`gear${i}Load`)?.textContent || '0';
            total += parseFloat(txt) || 0;
        }
        const coin = document.getElementById('coinLoad')?.textContent || '0';
        total += parseFloat(coin) || 0;
        this.elements.totalLoad.textContent = total.toFixed(2).replace(/\.?0+$/, '');
    },

    refreshAll() {
        for (let i = 1; i <= this.MAX_READY_SLOTS; i++) {
            this.updateReadyLoad(i);
            this.renderStowed(i);
        }
        this.updateCoinLoad();
    },

    // Simple CSV parser (shared logic)
    parseCSV(text) {
        const rows = [];
        let row = [], value = '', quote = false, i = 0;
        while (i < text.length) {
            const ch = text[i];
            if (quote) {
                if (ch === '"' && text[i+1] === '"') { value += '"'; i += 2; continue; }
                if (ch === '"') { quote = false; i++; continue; }
                value += ch;
            } else {
                if (ch === '"') { quote = true; }
                else if (ch === ',') { row.push(value.trim()); value = ''; }
                else if (ch === '\r' || ch === '\n') {
                    row.push(value.trim());
                    if (row.some(v => v !== '')) rows.push(row);
                    row = []; value = '';
                    if (ch === '\r' && text[i+1] === '\n') i++;
                } else value += ch;
            }
            i++;
        }
        if (value || row.length) { row.push(value.trim()); if (row.some(v => v !== '')) rows.push(row); }
        return rows;
    }
};

// Start it!
Creator.init();