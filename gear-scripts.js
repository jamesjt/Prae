// gear-scripts.js

let allOptions = [];
let nonPackOptions = [];
let liquidsOptions = [];
let gearSlots = 5;
let readyState = Array(gearSlots).fill(null).map(() => ({ gear: '', amt: 1, stowed: [], contents: [] }));

// ———————————————————— Helpers ————————————————————

function createDetailsIcon(entry, item, idPrefix) {
    if (item?.details?.trim()) {
        const div = document.createElement('div');
        div.id = `${idPrefix}-details`;
        div.className = 'gearDetails';
        div.textContent = 'i';
        div.setAttribute("data-tip", `gear:${item.name}`);
        entry.appendChild(div);
    }
}

function updateTypeClass(entry, item, preserveClasses) {
    entry.classList.forEach(cls => {
        if (cls.startsWith('gear') && !preserveClasses.includes(cls)) {
            entry.classList.remove(cls);
        }
    });
    if (item && item.category) {
        entry.classList.add('gear' + item.category);
    }
}

function updateSlotLoad(selectEl, qty, loadDiv) {
    if (!selectEl || !loadDiv) return;
    const opt = selectEl.options[selectEl.selectedIndex];
    const baseLoad = parseFloat(opt.getAttribute('data-load')) || 0;
    const total = baseLoad * qty;
    loadDiv.textContent = total > 0 ? total.toFixed(2).replace(/\.?0+$/, '') : '';
    loadDiv.style.color = (qty > 1 && baseLoad > 1) ? 'red' : '';
}

function formatLoad(value) {
    return value > 0 ? value.toFixed(2).replace(/\.?0+$/, '') : '';
}

// ———————————————————— Gear Selector Population ————————————————————

function populateGearSelector(selectEl, options, placeholder) {
    selectEl.innerHTML = `<option value="emptyStowedGearSlot">${placeholder}</option>`;
    const grouped = {};
    options.forEach(g => {
        if (!grouped[g.category]) grouped[g.category] = [];
        grouped[g.category].push(g);
    });
    const sortedCats = Object.keys(grouped).sort((a, b) => {
        if (a === '-') return -1;
        if (b === '-') return 1;
        return a.localeCompare(b);
    });
    sortedCats.forEach(cat => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = `-- ${cat} --`;
        grouped[cat].sort((a, b) => a.name.localeCompare(b.name)).forEach(g => {
            if (g.name && g.name !== '') {
                const opt = document.createElement('option');
                opt.value = g.name;
                opt.textContent = g.name;
                opt.dataset.load = g.load || 0;
                optgroup.appendChild(opt);
            }
        });
        if (optgroup.children.length > 0) {
            selectEl.appendChild(optgroup);
        }
    });
}

// ———————————————————— Rebuild Gear (uses DocumentFragment) ————————————————————

function rebuildGearSelectors() {
    allOptions = gearData.filter(g => (g.category?.toLowerCase() ?? '') !== 'liquid');
    nonPackOptions = allOptions.filter(g => (g.category?.toLowerCase() ?? '') !== 'pack');
    liquidsOptions = gearData.filter(g => g.category?.toLowerCase() === 'liquid');

    const container = document.getElementById('gearEntries');
    container.innerHTML = '';

    const oldReadyState = [...readyState];
    readyState = Array(gearSlots).fill(null).map((_, idx) => oldReadyState[idx] || { gear: '', amt: 1, stowed: [], contents: [] });

    const fragment = document.createDocumentFragment();

    for (let i = 1; i <= gearSlots; i++) {
        const entry = document.createElement('div');
        entry.className = 'gearEntry';

        entry.innerHTML = `
            <select id="gear${i}Select" class="gearSelector"></select>
            <input type="number" id="gear${i}Amt" class="gearAmtInputField" min="1" value="1"/>
            <div id="gear${i}Load" class="gearLoad"></div>
        `;

        fragment.appendChild(entry);
    }

    container.appendChild(fragment);

    // Now that elements are in the DOM, populate and wire them up
    for (let i = 1; i <= gearSlots; i++) {
        const sel = document.getElementById(`gear${i}Select`);
        populateGearSelector(sel, allOptions, 'Ready Slot');

        sel.value = readyState[i-1].gear || '';
        const amtInput = document.getElementById(`gear${i}Amt`);
        amtInput.value = readyState[i-1].amt || 1;

        const item = gearByName.get(readyState[i-1].gear);
        const entry = sel.closest('.gearEntry');
        createDetailsIcon(entry, item, `gear${i}`);
        if (item && item.category) {
            entry.classList.add('gear' + item.category);
        }

        if (readyState[i-1].stowed.length > 0) renderStowed(i);
        if (readyState[i-1].contents.length > 0) renderContents(i);

        sel.addEventListener('change', () => {
            handleReadySelectChange(i);
        });

        const amtInputListener = function () {
            const val = Math.max(1, parseInt(this.value) || 1);
            this.value = val;
            readyState[i - 1].amt = val;
            updateReadyLoad(i);
            calculateLoad();
        };
        amtInput.addEventListener('input', amtInputListener);

        updateReadyLoad(i);
    }

    calculateLoad();
}

// ———————————————————— Ready Select Change ————————————————————

function handleReadySelectChange(i) {
    const sel = document.getElementById(`gear${i}Select`);
    const newGearName = sel.value;
    const item = gearByName.get(newGearName);
    const entry = sel.closest('.gearEntry');

    updateTypeClass(entry, item, ['gearEntry']);

    // Remove old details icon, add new if needed
    const oldDetails = document.getElementById(`gear${i}-details`);
    if (oldDetails) oldDetails.remove();
    createDetailsIcon(entry, item, `gear${i}`);

    // Handle pack logic
    const oldItem = gearByName.get(readyState[i-1].gear);
    const wasPack = oldItem?.category?.toLowerCase() === 'pack';
    const isPack = item?.category?.toLowerCase() === 'pack';
    if (wasPack && !isPack) {
        readyState[i-1].stowed = [];
        renderStowed(i);
    }
    if (isPack && (!wasPack || readyState[i-1].gear !== newGearName)) {
        const slots = parseInt(item.slots || 0);
        readyState[i-1].stowed = Array(slots).fill(null).map(() => ({ gear: '', amt: 1 }));
        renderStowed(i);
    }

    // Handle container logic
    const wasContainer = oldItem?.category?.toLowerCase() === 'container';
    const isContainer = item?.category?.toLowerCase() === 'container';
    if (wasContainer && !isContainer) {
        readyState[i-1].contents = [];
        renderContents(i);
    }
    if (isContainer && (!wasContainer || readyState[i-1].gear !== newGearName)) {
        const slots = parseInt(item.slots || 0);
        readyState[i-1].contents = Array(slots).fill(null).map(() => ({ gear: '', amt: 1 }));
        renderContents(i);
    }

    readyState[i-1].gear = newGearName;
    readyState[i-1].amt = parseInt(document.getElementById(`gear${i}Amt`).value) || 1;
    updateReadyLoad(i);
    calculateLoad();
}

// ———————————————————— Render Stowed ————————————————————

function renderStowed(i) {
    let container = document.getElementById(`stowed-container-${i}`);
    const gearEntry = document.querySelector(`.gearEntry:has(#gear${i}Select)`);

    if (readyState[i-1].stowed.length === 0) {
        if (container) container.remove();
        return;
    }

    if (!container) {
        container = document.createElement('div');
        container.id = `stowed-container-${i}`;
        container.className = 'stowed-container';
        gearEntry.parentNode.insertBefore(container, gearEntry.nextSibling);
    }
    container.innerHTML = '';

    readyState[i-1].stowed.forEach((s, j) => {
        const stowedIndex = j + 1;
        const idPrefix = `stowed-${i}-${stowedIndex}`;
        const entry = document.createElement('div');
        entry.className = 'gearEntry gearStowed';

        entry.innerHTML = `
            <select id="${idPrefix}-select" class="gearSelector"></select>
            <input type="number" id="${idPrefix}-amt" min="1" value="${s.amt}"/>
            <div id="${idPrefix}-load" class="gearLoad"></div>
        `;

        container.appendChild(entry);

        const sel = entry.querySelector('select');
        populateGearSelector(sel, nonPackOptions, 'Stowed slot');

        if (s.gear) {
            sel.value = s.gear;
            const item = gearByName.get(s.gear);
            createDetailsIcon(entry, item, idPrefix);
            updateTypeClass(entry, item, ['gearEntry', 'gearStowed']);
        }

        sel.addEventListener('change', () => {
            const selectedName = sel.value;
            const item = gearByName.get(selectedName);

            const oldDetails = document.getElementById(`${idPrefix}-details`);
            if (oldDetails) oldDetails.remove();
            createDetailsIcon(entry, item, idPrefix);
            updateTypeClass(entry, item, ['gearEntry', 'gearStowed']);

            readyState[i-1].stowed[j].gear = selectedName;
            updateStowedLoad(i, stowedIndex);
            updateReadyLoad(i);
            calculateLoad();
        });

        const amtInput = entry.querySelector('input');
        amtInput.addEventListener('input', () => {
            const val = Math.max(1, parseInt(amtInput.value) || 1);
            amtInput.value = val;
            readyState[i-1].stowed[j].amt = val;
            updateStowedLoad(i, stowedIndex);
            updateReadyLoad(i);
            calculateLoad();
        });

        updateStowedLoad(i, stowedIndex);
    });
}

// ———————————————————— Render Contents ————————————————————

function renderContents(i) {
    let container = document.getElementById(`contents-container-${i}`);
    const gearEntry = document.querySelector(`.gearEntry:has(#gear${i}Select)`);

    if (readyState[i-1].contents.length === 0) {
        if (container) container.remove();
        return;
    }

    if (!container) {
        container = document.createElement('div');
        container.id = `contents-container-${i}`;
        container.className = 'contents-container';
        gearEntry.parentNode.insertBefore(container, gearEntry.nextSibling);
    }
    container.innerHTML = '';

    readyState[i-1].contents.forEach((s, j) => {
        const contentsIndex = j + 1;
        const idPrefix = `contents-${i}-${contentsIndex}`;
        const entry = document.createElement('div');
        entry.className = 'gearEntry gearContents';

        entry.innerHTML = `
            <select id="${idPrefix}-select" class="gearSelector"></select>
            <input type="number" id="${idPrefix}-amt" min="1" value="${s.amt}"/>
            <div id="${idPrefix}-load" class="gearLoad"></div>
        `;

        container.appendChild(entry);

        const sel = entry.querySelector('select');
        populateGearSelector(sel, liquidsOptions, 'Select Liquid');

        if (s.gear) {
            sel.value = s.gear;
            const item = gearByName.get(s.gear);
            createDetailsIcon(entry, item, idPrefix);
            updateTypeClass(entry, item, ['gearEntry', 'gearContents']);
        }

        sel.addEventListener('change', () => {
            const selectedName = sel.value;
            const item = gearByName.get(selectedName);

            const oldDetails = document.getElementById(`${idPrefix}-details`);
            if (oldDetails) oldDetails.remove();
            createDetailsIcon(entry, item, idPrefix);
            updateTypeClass(entry, item, ['gearEntry', 'gearContents']);

            readyState[i-1].contents[j].gear = selectedName;
            updateContentsLoad(i, contentsIndex);
            updateReadyLoad(i);
            calculateLoad();
        });

        const amtInput = entry.querySelector('input');
        amtInput.addEventListener('input', () => {
            const val = Math.max(1, parseInt(amtInput.value) || 1);
            amtInput.value = val;
            readyState[i-1].contents[j].amt = val;
            updateContentsLoad(i, contentsIndex);
            updateReadyLoad(i);
            calculateLoad();
        });

        updateContentsLoad(i, contentsIndex);
    });
}

// ———————————————————— Load Calculations ————————————————————

function updateStowedLoad(readyI, stowedJ) {
    const sel = document.getElementById(`stowed-${readyI}-${stowedJ}-select`);
    const loadDiv = document.getElementById(`stowed-${readyI}-${stowedJ}-load`);
    updateSlotLoad(sel, readyState[readyI-1].stowed[stowedJ-1].amt, loadDiv);
}

function updateContentsLoad(readyI, contentsJ) {
    const sel = document.getElementById(`contents-${readyI}-${contentsJ}-select`);
    const loadDiv = document.getElementById(`contents-${readyI}-${contentsJ}-load`);
    updateSlotLoad(sel, readyState[readyI-1].contents[contentsJ-1].amt, loadDiv);
}

function updateReadyLoad(i) {
    const state = readyState[i-1];
    const item = gearByName.get(state.gear);
    let total = 0;
    if (item) {
        const baseLoad = parseFloat(item.load || 0);
        total += baseLoad * state.amt;
        if (item.category?.toLowerCase() === 'pack') {
            state.stowed.forEach(s => {
                const sItem = gearByName.get(s.gear);
                if (sItem) total += (parseFloat(sItem.load || 0)) * s.amt;
            });
        } else if (item.category?.toLowerCase() === 'container') {
            state.contents.forEach(s => {
                const sItem = gearByName.get(s.gear);
                if (sItem) total += (parseFloat(sItem.load || 0)) * s.amt;
            });
        }
    }
    const loadDiv = document.getElementById(`gear${i}Load`);
    if (loadDiv) {
        loadDiv.textContent = formatLoad(total);
        const loadLimit = parseFloat(item?.loadlimit);
        loadDiv.style.color = (!isNaN(loadLimit) && total > loadLimit) ? 'red' : '';
    }
}

function calculateLoad() {
    let totalLoad = 0;
    readyState.forEach((state, idx) => {
        const i = idx + 1;
        const loadText = document.getElementById(`gear${i}Load`)?.textContent || '0';
        totalLoad += parseFloat(loadText) || 0;
    });
    document.getElementById('totalLoadValue').textContent = formatLoad(totalLoad);
}

// ———————————————————— Event Listeners ————————————————————

document.addEventListener('change', e => {
    const t = e.target;
    if (t.matches('.gearAmtInputField, [id^="stowed-"][id$="-amt"], [id^="contents-"][id$="-amt"], [id^="gear"][id$="Select"], [id^="stowed-"][id$="-select"], [id^="contents-"][id$="-select"]')) {
        if (t.matches('[id$="Select"]') && t.id.startsWith('gear')) handleReadySelectChange(t.id.match(/gear(\d+)Select/)[1]);
        const match = t.id.match(/(gear|stowed-(\d+)-(\d+)|contents-(\d+)-(\d+))-(Amt|amt|select)/);
        if (match) {
            const [,, stowedReadyI, stowedJ, contentsReadyI, contentsJ] = match;
            const readyI = stowedReadyI || contentsReadyI || match[1].match(/gear(\d+)/)?.[1];
            if (/Amt|amt/.test(t.id)) t.value = Math.max(1, parseInt(t.value) || 1);
            if (stowedJ) {
                updateStowedLoad(readyI, stowedJ);
            } else if (contentsJ) {
                updateContentsLoad(readyI, contentsJ);
            }
            updateReadyLoad(readyI);
            calculateLoad();
        }
        return;
    }
});

document.addEventListener('click', e => {
    const t = e.target;
    if (t.matches('#gearPlus, #gearMinus')) {
        if (t.id === 'gearPlus') {
            gearSlots += 1;
        } else if (t.id === 'gearMinus' && gearSlots > 1) {
            gearSlots -= 1;
        }
        rebuildGearSelectors();
    }
});

// Init gear after data is loaded
window.addEventListener('dataLoaded', () => {
    rebuildGearSelectors();
    calculateLoad();
});
