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

        // List of: { name, amount, stowedIndex, selectEl, amountEl }
        this.stowed = [];

        this.currentLoad = 0;

        // DOM references (assigned in bindDom)
        this.readySelectEl = null;
        this.readyAmountEl = null;
    }

    /************************************************************
     * Bind DOM elements for this slot:
     * - ready selector: gearXSelect
     * - ready amount: gearX-Amt
     * - stowed selectors: stowed-X-Y-select
     * - stowed amounts:   stowed-X-Y-amt
     ************************************************************/
    bindDom() {
        const readySelId = `gear${this.index}Select`;
        const readyAmtId = `gear${this.index}-Amt`;

        this.readySelectEl = $(readySelId);
        this.readyAmountEl = $(readyAmtId);

        if (this.readySelectEl) {
            this.readySelectEl.addEventListener("change", () => {
                this.readyGearName = this.readySelectEl.value;
                this.assignTooltip(this.readySelectEl, this.readyGearName);
                this.updateLoad();
                GearManager.setCurrentSlot(this.index);
            });
        }

        if (this.readyAmountEl) {
            this.readyAmountEl.addEventListener("change", () => {
                const v = parseInt(this.readyAmountEl.value) || 1;
                this.readyAmount = Math.max(1, v);
                this.updateLoad();
                GearManager.setCurrentSlot(this.index);
            });
        }

        // Bind existing stowed entries if present
        this.bindExistingStowed();
    }

    /************************************************************
     * Find and bind all stowed items for this ready slot
     ************************************************************/
    bindExistingStowed() {
        const prefix = `stowed-${this.index}-`;
        const all = document.querySelectorAll(`[id^="stowed-${this.index}-"]`);

        // Map like: stowed-2-1-select, stowed-2-1-amt
        const stowedMap = new Map();

        all.forEach(el => {
            const match = el.id.match(/^stowed-(\d+)-(\d+)-(select|amt)$/);
            if (!match) return;

            const [, slotIndex, stowedIndex, type] = match;
            if (parseInt(slotIndex) !== this.index) return;

            if (!stowedMap.has(stowedIndex)) {
                stowedMap.set(stowedIndex, { stowedIndex });
            }

            const entry = stowedMap.get(stowedIndex);
            if (type === "select") entry.selectEl = el;
            if (type === "amt") entry.amountEl = el;
        });

        // Hook them up
        stowedMap.forEach((entry, index) => {
            const stowedIndex = parseInt(index);
            const name = entry.selectEl ? entry.selectEl.value : "";
            const amt = entry.amountEl ? Math.max(1, parseInt(entry.amountEl.value) || 1) : 1;

            this.stowed.push({
                name,
                amount: amt,
                stowedIndex,
                selectEl: entry.selectEl,
                amountEl: entry.amountEl
            });

            if (entry.selectEl) {
                entry.selectEl.addEventListener("change", () => {
                    this.updateStowedName(stowedIndex, entry.selectEl.value);
                });
            }
            if (entry.amountEl) {
                entry.amountEl.addEventListener("change", () => {
                    const v = parseInt(entry.amountEl.value) || 1;
                    this.updateStowedAmount(stowedIndex, Math.max(1, v));
                });
            }
        });
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
     * Utility: retrieve gear load from global gearData
     ************************************************************/
    getItemLoad(name) {
        if (!name) return 0;
        const item = gearData.find(g => g.name === name);
        return item?.load ?? 0;
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

        // Notify manager
        GearManager.onSlotLoadUpdated(this);
    }
}

/************************************************************
 * GearManager: orchestrates all gear slot behavior
 ************************************************************/
class GearManager {
    static slots = [];
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
        this.updateCurrentLoadDisplay(0);

        // Hook global change listener
        document.addEventListener("change", (e) => this.routeEvent(e));
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
     * Update per-slot load display
     ************************************************************/
    static updateCurrentLoadDisplay(value) {
        const el = $("currentLoadValue");
        if (el) el.textContent = value;
    }

    /************************************************************
     * Update total load display (right-side value)
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
            this.slots[idx].updateLoad();
            return;
        }

        // Ready amount
        m = id.match(/^gear(\d+)-Amt$/);
        if (m) {
            const idx = parseInt(m[1]);
            this.setCurrentSlot(idx);
            const amt = Math.max(1, parseInt(e.target.value) || 1);
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
            this.slots[slotIdx].updateStowedAmount(stIdx, amt);
            return;
        }
    }
}
