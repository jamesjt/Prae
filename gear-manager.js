// gear-manager.js

/************************************************************
 * Modern Gear System Refactor for Prae Character Creator
 * ---------------------------------------------------------
 * GearSlot  - encapsulates load logic, DOM bindings, stowed items
 * GearManager - orchestrates all gear behavior, updates UI,
 *               centralizes ID parsing, and provides safe integration
 ************************************************************/

// Adjustable maximum load
const MAX_TOTAL_LOAD = 9;

// Ensure DOM exists before usage
function $(id) {
    return document.getElementById(id);
}

/************************************************************
 * GearSlot: represents a single Ready Slot
 ************************************************************/
class GearSlot {
    constructor(index) {
        this.index = index;

        this.readyGearName = "";
        this.readyAmount = 1;

        // List of: { name, amount, stowedIndex, selectEl, amountEl, detailsEl }
        this.stowed = [];

        this.currentLoad = 0;

        // DOM references (assigned in bindDom)
        this.entryEl = null;
        this.readySelectEl = null;
        this.readyAmountEl = null;
        this.detailsEl = null;
        this.loadEl = null;
    }

    /************************************************************
     * Bind DOM elements for this slot:
     * - entry: gearXEntry
     * - ready selector: gearXSelect
     * - ready amount: gearXAmt
     * - details: gearXDetails
     * - load: gearXLoad
     * - stowed selectors: stowed-X-Y-select
     * - stowed amounts: stowed-X-Y-amt
     * - stowed details: stowed-X-Y-details
     ************************************************************/
    bindDom() {
        this.entryEl = $(`gear${this.index}Entry`);
        const readySelId = `gear${this.index}Select`;
        const readyAmtId = `gear${this.index}Amt`;
        const detailsId = `gear${this.index}Details`;
        const loadId = `gear${this.index}Load`;

        this.readySelectEl = $(readySelId);
        this.readyAmountEl = $(readyAmtId);
        this.detailsEl = $(detailsId);
        this.loadEl = $(loadId);

        if (this.readySelectEl) {
            this.readySelectEl.addEventListener("change", () => {
                this.readyGearName = this.readySelectEl.value;
                this.assignTooltip(this.readySelectEl, this.readyGearName);
                this.populateReadyDetails();
                this.manageStowedSlots();  // New: Handle dynamic stowed for packs
                this.updateLoad();
                GearManager.setCurrentSlot(this.index);
            });
        }

        if (this.readyAmountEl) {
            this.readyAmountEl.addEventListener("change", () => {
                const v = parseInt(this.readyAmountEl.value) || 1;
                this.readyAmount = Math.max(1, v);
                this.readyAmountEl.value = this.readyAmount;  // Clamp display
                this.updateLoad();
                GearManager.setCurrentSlot(this.index);
            });
        }

        // Bind existing stowed entries if present (for reloads or pre-existing)
        this.bindExistingStowed();
    }

    /************************************************************
     * Find and bind all stowed items for this ready slot
     ************************************************************/
    bindExistingStowed() {
        const prefix = `stowed-${this.index}-`;
        const all = document.querySelectorAll(`[id^="${prefix}"]`);

        const stowedMap = new Map();

        all.forEach(el => {
            const match = el.id.match(/^stowed-(\d+)-(\d+)-(select|amt|details)$/);
            if (!match) return;

            const [, slotIndex, stowedIndexStr, type] = match;
            if (parseInt(slotIndex) !== this.index) return;

            const stowedIndex = parseInt(stowedIndexStr);

            if (!stowedMap.has(stowedIndex)) {
                stowedMap.set(stowedIndex, { stowedIndex });
            }

            const entry = stowedMap.get(stowedIndex);
            if (type === "select") entry.selectEl = el;
            if (type === "amt") entry.amountEl = el;
            if (type === "details") entry.detailsEl = el;
        });

        stowedMap.forEach((entry) => {
            const name = entry.selectEl ? entry.selectEl.value : "";
            const amt = entry.amountEl ? Math.max(1, parseInt(entry.amountEl.value) || 1) : 1;

            this.stowed.push({
                name,
                amount: amt,
                stowedIndex: entry.stowedIndex,
                selectEl: entry.selectEl,
                amountEl: entry.amountEl,
                detailsEl: entry.detailsEl
            });

            if (entry.selectEl) {
                entry.selectEl.addEventListener("change", () => {
                    this.updateStowedName(entry.stowedIndex, entry.selectEl.value);
                });
            }
            if (entry.amountEl) {
                entry.amountEl.addEventListener("change", () => {
                    const v = parseInt(entry.amountEl.value) || 1;
                    this.updateStowedAmount(entry.stowedIndex, Math.max(1, v));
                });
            }
        });
    }

    /************************************************************
     * New: Dynamically add/remove stowed slots if ready gear is a pack
     ************************************************************/
    manageStowedSlots() {
        const item = this.getItem(this.readyGearName);
        const targetSlots = (item && item.category.toLowerCase() === 'packs') ? (item.slots || 0) : 0;

        while (this.stowed.length > targetSlots) {
            this.removeStowed();
        }

        while (this.stowed.length < targetSlots) {
            this.addStowed();
        }
    }

    /************************************************************
     * New: Add a new stowed entry (DOM + binding)
     ************************************************************/
    addStowed() {
        const stowedIndex = this.stowed.length + 1;
        const stowedEntry = document.createElement('div');
        stowedEntry.className = 'stowedEntry';
        stowedEntry.id = `stowed-${this.index}-${stowedIndex}-entry`;
        stowedEntry.innerHTML = `
            <select id="stowed-${this.index}-${stowedIndex}-select" class="stowedSelector">
                <option value="">Stowed Item</option>
            </select>
            <input type="number" id="stowed-${this.index}-${stowedIndex}-amt" class="stowedAmt" min="1" value="1" />
            <div id="stowed-${this.index}-${stowedIndex}-details" class="stowedDetails"></div>
        `;
        if (this.entryEl) this.entryEl.appendChild(stowedEntry);

        const selectEl = $(`stowed-${this.index}-${stowedIndex}-select`);
        const amountEl = $(`stowed-${this.index}-${stowedIndex}-amt`);
        const detailsEl = $(`stowed-${this.index}-${stowedIndex}-details`);

        // Populate stowed select with nonPackOptions (grouped)
        const grouped = {};
        nonPackOptions.forEach(g => {
            if (!grouped[g.category]) grouped[g.category] = [];
            grouped[g.category].push(g);
        });
        Object.keys(grouped).sort().forEach(cat => {
            const optgroup = document.createElement('optgroup');
            optgroup.label = `-- ${cat} --`;
            grouped[cat].sort((a, b) => a.name.localeCompare(b.name)).forEach(g => {
                const opt = document.createElement('option');
                opt.value = g.name;
                opt.textContent = g.name;
                opt.dataset.load = g.load || 0;
                optgroup.appendChild(opt);
            });
            selectEl.appendChild(optgroup);
        });

        // Bind listeners
        selectEl.addEventListener('change', () => {
            this.updateStowedName(stowedIndex, selectEl.value);
        });
        amountEl.addEventListener('change', () => {
            const v = Math.max(1, parseInt(amountEl.value) || 1);
            amountEl.value = v;
            this.updateStowedAmount(stowedIndex, v);
        });

        // Push to stowed array
        this.stowed.push({
            name: '',
            amount: 1,
            stowedIndex,
            selectEl,
            amountEl,
            detailsEl
        });
    }

    /************************************************************
     * New: Remove the last stowed entry (DOM + array)
     ************************************************************/
    removeStowed() {
        const st = this.stowed.pop();
        if (!st) return;
        const stowedEntry = $(`stowed-${this.index}-${st.stowedIndex}-entry`);
        if (stowedEntry) stowedEntry.remove();
    }

    /************************************************************
     * Tooltip helper
     ************************************************************/
    assignTooltip(el, gearName) {
        if (!el || !gearName) return;
        el.setAttribute("data-tip", `gear:${gearName}`);
    }

    /************************************************************
     * Update stowed item name
     ************************************************************/
    updateStowedName(stowedIndex, newName) {
        const st = this.stowed.find(s => s.stowedIndex === stowedIndex);
        if (!st) return;

        st.name = newName;
        this.assignTooltip(st.selectEl, newName);
        this.populateStowedDetails(stowedIndex);
        this.updateLoad();
        GearManager.setCurrentSlot(this.index);
    }

    /************************************************************
     * Update stowed item amount
     ************************************************************/
    updateStowedAmount(stowedIndex, newAmount) {
        const st = this.stowed.find(s => s.stowedIndex === stowedIndex);
        if (!st) return;

        st.amount = newAmount;
        this.updateLoad();
        GearManager.setCurrentSlot(this.index);
    }

    /************************************************************
     * New: Populate details for ready gear
     ************************************************************/
    populateReadyDetails() {
        if (!this.detailsEl) return;
        const details = this.getItemDetails(this.readyGearName);
        this.detailsEl.innerHTML = details ? processWithTooltips(details) : '';
    }

    /************************************************************
     * New: Populate details for a stowed item
     ************************************************************/
    populateStowedDetails(stowedIndex) {
        const st = this.stowed.find(s => s.stowedIndex === stowedIndex);
        if (!st || !st.detailsEl) return;
        const details = this.getItemDetails(st.name);
        st.detailsEl.innerHTML = details ? processWithTooltips(details) : '';
    }

    /************************************************************
     * Utility: Get item from global gearData
     ************************************************************/
    getItem(name) {
        if (!name || name === '') return null;
        return gearData.find(g => g.name === name);
    }

    /************************************************************
     * Utility: retrieve gear load from global gearData
     ************************************************************/
    getItemLoad(name) {
        const item = this.getItem(name);
        return item ? (item.baseLoad || item.load || 0) : 0;
    }

    /************************************************************
     * Utility: retrieve gear details from global gearData
     ************************************************************/
    getItemDetails(name) {
        const item = this.getItem(name);
        return item ? (item.details || '') : '';
    }

    /************************************************************
     * Recalculate this slot’s total load
     ************************************************************/
    updateLoad() {
        const readyLoad = this.getItemLoad(this.readyGearName) * this.readyAmount;

        const stowedLoad = this.stowed.reduce((sum, st) => {
            const l = this.getItemLoad(st.name);
            return sum + l * st.amount;
        }, 0);

        this.currentLoad = readyLoad + stowedLoad;

        if (this.loadEl) this.loadEl.textContent = this.currentLoad;  // New: Update per-slot display

        // Notify manager
        GearManager.onSlotLoadUpdated(this);
    }
}

/************************************************************
 * GearManager: orchestrates all gear slot behavior
 ************************************************************/
class GearManager {
    static slots = {};  // Use object for easier access
    static currentSlotIndex = 1;

    /************************************************************
     * Initialize all ready slots
     ************************************************************/
    static init() {
        for (let i = 1; i <= MAX_READY_SLOTS; i++) {
            const slot = new GearSlot(i);
            slot.bindDom();
            this.slots[i] = slot;
        }

        // Initialize UI
        this.updateTotalLoadDisplay();
        this.updateTotalUsedLoad();  // New
        this.updateCurrentLoadDisplay(0);
    }

    /************************************************************
     * Track which slot user last interacted with
     ************************************************************/
    static setCurrentSlot(slotIndex) {
        this.currentSlotIndex = slotIndex;
        const slot = this.slots[slotIndex];
        if (slot) this.updateCurrentLoadDisplay(slot.currentLoad);
    }

    /************************************************************
     * Update per-slot load display (for the current slot)
     ************************************************************/
    static updateCurrentLoadDisplay(value) {
        const el = $("currentLoadValue");
        if (el) el.textContent = value;
    }

    /************************************************************
     * New: Update total used load (sum across all slots)
     ************************************************************/
    static updateTotalUsedLoad() {
        const sum = Object.values(this.slots).reduce((s, slot) => s + (slot?.currentLoad || 0), 0);
        const el = $("usedLoadValue");
        if (el) el.textContent = sum;
    }

    /************************************************************
     * Update max total load display
     ************************************************************/
    static updateTotalLoadDisplay() {
        const el = $("totalLoadValue");
        if (el) el.textContent = MAX_TOTAL_LOAD;
    }

    /************************************************************
     * Called when any GearSlot updates its load
     ************************************************************/
    static onSlotLoadUpdated(slot) {
        // If this slot is the current one, update UI
        if (slot.index === this.currentSlotIndex) {
            this.updateCurrentLoadDisplay(slot.currentLoad);
        }
        this.updateTotalUsedLoad();  // Always update total
    }

    /************************************************************
     * Central event router for change events
     ************************************************************/
    static routeEvent(e) {
        const id = e.target.id;
        if (!id) return;

        // Ready select
        let m = id.match(/^gear(\d+)Select$/);
        if (m) {
            const idx = parseInt(m[1]);
            this.setCurrentSlot(idx);
            this.slots[idx].readyGearName = e.target.value;
            this.slots[idx].assignTooltip(e.target, e.target.value);
            this.slots[idx].populateReadyDetails();
            this.slots[idx].manageStowedSlots();
            this.slots[idx].updateLoad();
            return;
        }

        // Ready amount
        m = id.match(/^gear(\d+)Amt$/);  // Note: No '-' in ID per your code
        if (m) {
            const idx = parseInt(m[1]);
            this.setCurrentSlot(idx);
            const amt = Math.max(1, parseInt(e.target.value) || 1);
            e.target.value = amt;
            this.slots[idx].readyAmount = amt;
            this.slots[idx].updateLoad();
            return;
        }

        // Stowed select
        m = id.match(/^stowed-(\d+)-(\d+)-select$/);
        if (m) {
            const slotIdx = parseInt(m[1]);
            const stIdx = parseInt(m[2]);
            this.setCurrentSlot(slotIdx);
            const slot = this.slots[slotIdx];
            if (!slot) return;

            slot.updateStowedName(stIdx, e.target.value);
            return;
        }

        // Stowed amount
        m = id.match(/^stowed-(\d+)-(\d+)-amt$/);
        if (m) {
            const slotIdx = parseInt(m[1]);
            const stIdx = parseInt(m[2]);
            this.setCurrentSlot(slotIdx);
            const amt = Math.max(1, parseInt(e.target.value) || 1);
            e.target.value = amt;
            this.slots[slotIdx].updateStowedAmount(stIdx, amt);
            return;
        }
    }
}