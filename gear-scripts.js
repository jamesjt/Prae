// gear-scripts.js

// Add near top constants

let allOptions = [];
let nonPackOptions = [];
let liquidsOptions = [];
let gearSlots = 5; // Dynamic gear slots
let readyState = Array(gearSlots).fill(null).map(() => ({ gear: '', amt: 1, stowed: [], contents: [] }));

function populateGearSelector(selectEl, options, placeholder) {
    selectEl.innerHTML = `<option value="emptyStowedGearSlot">${placeholder}</option>`;
    const grouped = {};
    options.forEach(g => {
        if (!grouped[g.category]) grouped[g.category] = [];
        grouped[g.category].push(g);
    });
    // Sort groups with '-' first
    const sortedCats = Object.keys(grouped).sort((a, b) => {
        if (a === '-') return -1;
        if (b === '-') return 1;
        return a.localeCompare(b);
    });
    sortedCats.forEach(cat => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = `-- ${cat} --`;
        grouped[cat].sort((a, b) => a.name.localeCompare(b.name)).forEach(g => {
            if (g.name && g.name !== '') { // Keep all with name, including '-'
                const opt = document.createElement('option');
                opt.value = g.name;
                opt.textContent = g.name;
                opt.dataset.load = g.load || 0; // No baseLoad in CSV
                optgroup.appendChild(opt);
            }
        });
        if (optgroup.children.length > 0) { // Only add if has options
            selectEl.appendChild(optgroup);
        }
    });
}

function rebuildGearSelectors() {
    allOptions = gearData.filter(g => (g.category?.toLowerCase() ?? '') !== 'liquid'); // Adjustable exclusion
    nonPackOptions = allOptions.filter(g => (g.category?.toLowerCase() ?? '') !== 'pack');  // Case-insensitive exclude
    liquidsOptions = gearData.filter(g => g.category?.toLowerCase() === 'liquid');

    const container = document.getElementById('gearEntries');
    container.innerHTML = '';

    // Save old readyState
    const oldReadyState = [...readyState];

    // Resize readyState
    readyState = Array(gearSlots).fill(null).map((_, idx) => oldReadyState[idx] || { gear: '', amt: 1, stowed: [], contents: [] });

    for (let i = 1; i <= gearSlots; i++) {
        const entry = document.createElement('div');
        entry.className = 'gearEntry';

        // We'll build the details HTML only if needed later
        let detailsHtml = '';

        entry.innerHTML = `
            <select id="gear${i}Select" class="gearSelector"></select>
            <input type="number" id="gear${i}Amt" class="gearAmtInputField" min="1" value="1"/>
            <div id="gear${i}Load" class="gearLoad"></div>
            ${detailsHtml}
        `;

        container.appendChild(entry);

        // Populate selector
        const sel = document.getElementById(`gear${i}Select`);
        populateGearSelector(sel, allOptions, 'Ready Slot');

        // Restore from readyState
        sel.value = readyState[i-1].gear || '';
        const amtInput = document.getElementById(`gear${i}Amt`);
        amtInput.value = readyState[i-1].amt || 1;

        // If has details, add icon
        const item = allOptions.find(g => g.name === readyState[i-1].gear);
        if (item?.details?.trim()) {
            const detailsDiv = document.createElement('div');
            detailsDiv.id = `gear${i}Details`;
            detailsDiv.className = 'gearDetails';
            detailsDiv.textContent = 'i';
            detailsDiv.setAttribute("data-tip", `gear:${item.name}`);
            entry.appendChild(detailsDiv);
        }

        // Add type class
        if (item && item.category) {
            entry.classList.add('gear' + item.category);
        }

        // Render stowed/contents if applicable
        if (readyState[i-1].stowed.length > 0) renderStowed(i);
        if (readyState[i-1].contents.length > 0) renderContents(i);

        // On change: update load + conditionally add details icon
        sel.addEventListener('change', () => {
            handleReadySelectChange(i);  // This now handles EVERYTHING: details, packs, state, stowed rendering, and loads
        });

        // Amount input
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
function handleReadySelectChange(i) {
    const sel = document.getElementById(`gear${i}Select`);
    const newGearName = sel.value;
    const item = allOptions.find(g => g.name === newGearName);
    const entry = sel.closest('.gearEntry');
    // Remove previous type classes
    entry.classList.forEach(cls => {
        if (cls.startsWith('gear') && cls !== 'gearEntry') {
            entry.classList.remove(cls);
        }
    });
    // Add new type class if item selected
    if (item && item.category) {
        const typeClass = 'gear' + item.category;
        entry.classList.add(typeClass);
    }
    // === 1. Remove old details icon (if any) ===
    const oldDetails = document.getElementById(`gear${i}Details`);
    if (oldDetails) oldDetails.remove();
    // === 2. Add details icon only if item has details ===
    if (item?.details?.trim()) {
        const detailsDiv = document.createElement('div');
        detailsDiv.id = `gear${i}Details`;
        detailsDiv.className = 'gearDetails';
        detailsDiv.textContent = 'i';
        detailsDiv.setAttribute("data-tip", `gear:${item.name}`);
        entry.appendChild(detailsDiv);
    }
    // === 3. Handle pack logic ===
    const wasPack = readyState[i-1].gear && allOptions.find(g => g.name === readyState[i-1].gear)?.category.toLowerCase() === 'pack';
    const isPack = item?.category.toLowerCase() === 'pack';
    if (wasPack && !isPack) {
        readyState[i-1].stowed = [];
        renderStowed(i); // This removes the container
    }
    if (isPack && !wasPack) {
        const slots = parseInt(item.slots || 0);
        readyState[i-1].stowed = Array(slots).fill(null).map(() => ({ gear: '', amt: 1 }));
        renderStowed(i);
    }
    // === 4. Handle container logic (similar to pack) ===
    const wasContainer = readyState[i-1].gear && allOptions.find(g => g.name === readyState[i-1].gear)?.category.toLowerCase() === 'container';
    const isContainer = item?.category.toLowerCase() === 'container';
    if (wasContainer && !isContainer) {
        readyState[i-1].contents = [];
        renderContents(i); // This removes the container
    }
    if (isContainer && !wasContainer) {
        const slots = parseInt(item.slottype || 0);
        readyState[i-1].contents = Array(slots).fill(null).map(() => ({ gear: '', amt: 1 }));
        renderContents(i);
    }
    // === 5. Update state and load ===
    readyState[i-1].gear = newGearName;
    updateReadyLoad(i);
    calculateLoad();
}
function renderStowed(i) {
    let existing = document.getElementById(`stowedContainer-${i}`);
    if (existing) existing.remove();
    const state = readyState[i-1];
    if (state.stowed.length === 0) return;
    const container = document.createElement('div');
    container.id = `stowedContainer-${i}`;
    container.className = 'stowedContainer';
    for (let j = 0; j < state.stowed.length; j++) {
        const entry = document.createElement('div');
        entry.className = 'gearEntry gearStowed';
        entry.innerHTML = `
            <select id="stowed-${i}-${j+1}-select" class="gearSelector gearStowed"></select>
            <input type="number" id="stowed-${i}-${j+1}-amt" class="gearAmtInputField gearStowed" min="1" value="${state.stowed[j].amt}"/>
            <div id="stowed-${i}-${j+1}-load" class="gearLoad gearStowed"></div>
        `;
        container.appendChild(entry);
        const sel = entry.querySelector('select');
        populateGearSelector(sel, nonPackOptions, 'Stowed Slot');
        sel.value = state.stowed[j].gear || '';
        sel.addEventListener('change', () => {
            const selectedName = sel.value;
            const item = nonPackOptions.find(g => g.name === selectedName);
            // Remove old details icon
            const oldDetails = document.getElementById(`stowed-${i}-${j+1}-details`);
            if (oldDetails) oldDetails.remove();
            // Add details icon only if item has details
            if (item?.details?.trim()) {
                const detailsDiv = document.createElement('div');
                detailsDiv.id = `stowed-${i}-${j+1}-details`;
                detailsDiv.className = 'gearDetails';
                detailsDiv.textContent = 'i';
                detailsDiv.setAttribute("data-tip", `gear:${item.name}`);
                entry.appendChild(detailsDiv);
            }
            // Remove previous type classes
            entry.classList.forEach(cls => {
                if (cls.startsWith('gear') && cls !== 'gearEntry' && cls !== 'gearStowed') {
                    entry.classList.remove(cls);
                }
            });
            // Add new type class if item selected
            if (item && item.category) {
                const typeClass = 'gear' + item.category;
                entry.classList.add(typeClass);
            }
            readyState[i-1].stowed[j].gear = selectedName;
            updateStowedLoad(i, j+1);
            updateReadyLoad(i);
            calculateLoad();
        });
        const amtInput = entry.querySelector('input');
        amtInput.addEventListener('input', () => {
            const val = Math.max(1, parseInt(amtInput.value) || 1);
            amtInput.value = val;
            readyState[i-1].stowed[j].amt = val;
            updateStowedLoad(i, j+1);
            updateReadyLoad(i);
            calculateLoad();
        });
        updateStowedLoad(i, j+1);
    }
    const gearEntry = document.getElementById(`gear${i}Select`)?.closest('.gearEntry');
    if (gearEntry) gearEntry.appendChild(container);
}
function renderContents(i) {
    let existing = document.getElementById(`contentsContainer-${i}`);
    if (existing) existing.remove();
    const state = readyState[i-1];
    if (state.contents.length === 0) return;
    const container = document.createElement('div');
    container.id = `contentsContainer-${i}`;
    container.className = 'contentsContainer';
    for (let j = 0; j < state.contents.length; j++) {
        const entry = document.createElement('div');
        entry.className = 'gearEntry gearContents';
        entry.innerHTML = `
            <select id="contents-${i}-${j+1}-select" class="gearSelector gearContents"></select>
            <input type="number" id="contents-${i}-${j+1}-amt" class="gearAmtInputField gearContents" min="1" value="${state.contents[j].amt}"/>
            <div id="contents-${i}-${j+1}-load" class="gearLoad gearContents"></div>
        `;
        container.appendChild(entry);
        const sel = entry.querySelector('select');
        populateGearSelector(sel, liquidsOptions, 'Contents Slot');
        sel.value = state.contents[j].gear || '';
        sel.addEventListener('change', () => {
            const selectedName = sel.value;
            const item = liquidsOptions.find(g => g.name === selectedName);
            // Remove old details icon
            const oldDetails = document.getElementById(`contents-${i}-${j+1}-details`);
            if (oldDetails) oldDetails.remove();
            // Add details icon only if item has details
            if (item?.details?.trim()) {
                const detailsDiv = document.createElement('div');
                detailsDiv.id = `contents-${i}-${j+1}-details`;
                detailsDiv.className = 'gearDetails';
                detailsDiv.textContent = 'i';
                detailsDiv.setAttribute("data-tip", `gear:${item.name}`);
                entry.appendChild(detailsDiv);
            }

            // Remove previous type classes
            entry.classList.forEach(cls => {
                if (cls.startsWith('gear') && cls !== 'gearEntry' && cls !== 'gearContents') {
                    entry.classList.remove(cls);
                }
            });
            // Add new type class if item selected
            if (item && item.category) {
                const typeClass = 'gear' + item.category;
                entry.classList.add(typeClass);
            }

            readyState[i-1].contents[j].gear = selectedName;
            updateContentsLoad(i, j+1);
            updateReadyLoad(i);
            calculateLoad();
        });

        const amtInput = entry.querySelector('input');
        amtInput.addEventListener('input', () => {
            const val = Math.max(1, parseInt(amtInput.value) || 1);
            amtInput.value = val;
            readyState[i-1].contents[j].amt = val;
            updateContentsLoad(i, j+1);
            updateReadyLoad(i);
            calculateLoad();
        });

        updateContentsLoad(i, j+1);
    }
    const gearEntry = document.getElementById(`gear${i}Select`)?.closest('.gearEntry');
    if (gearEntry) gearEntry.appendChild(container);
}
// Generalized sub-load updater (handles both stowed and contents)
function updateSubLoad(readyI, subJ, subType) {
    const prefix = subType === 'stowed' ? 'stowed' : 'contents';
    const sel = document.getElementById(`${prefix}-${readyI}-${subJ}-select`);
    if (!sel) return;
    const opt = sel.options[sel.selectedIndex];
    const baseLoad = parseFloat(opt.getAttribute('data-load')) || 0;
    const subArray = readyState[readyI-1][subType];
    const qty = subArray[subJ-1].amt;
    const total = baseLoad * qty;
    const loadDiv = document.getElementById(`${prefix}-${readyI}-${subJ}-load`);
    if (loadDiv) {
        loadDiv.textContent = total > 0 ? total.toFixed(2).replace(/\.?0+$/, '') : '';
        loadDiv.style.color = (qty > 1 && baseLoad > 1) ? 'red' : '';
    }
}
// Update single stowed load (wrapper for generalized function)
function updateStowedLoad(readyI, stowedJ) {
    updateSubLoad(readyI, stowedJ, 'stowed');
}
// Update single contents load (wrapper for generalized function)
function updateContentsLoad(readyI, contentsJ) {
    updateSubLoad(readyI, contentsJ, 'contents');
}
// Update ready load (for pack: sum stowed + base; for container: sum contents + base; for non-pack: base * amt)
function updateReadyLoad(i) {
    const state = readyState[i-1];
    const item = allOptions.find(g => g.name === state.gear);
    let total = 0;
    if (item) {
        const baseLoad = parseFloat(item.load || 0);
        total += baseLoad * state.amt;
        if (item?.category.toLowerCase() === 'pack') {
            state.stowed.forEach(s => {
                const sItem = nonPackOptions.find(g => g.name === s.gear);
                if (sItem) total += (parseFloat(sItem.load || 0)) * s.amt;
            });
        } else if (item?.category.toLowerCase() === 'container') {
            state.contents.forEach(s => {
                const sItem = liquidsOptions.find(g => g.name === s.gear);
                if (sItem) total += (parseFloat(sItem.load || 0)) * s.amt;
            });
        }
    }
    const loadDiv = document.getElementById(`gear${i}Load`);
    if (loadDiv) {
        loadDiv.textContent = total > 0 ? total.toFixed(2).replace(/\.?0+$/, '') : '';
        const loadLimit = parseFloat(item?.loadlimit);
        if (!isNaN(loadLimit) && total > loadLimit) {
            loadDiv.style.color = 'red';
        } else {
            loadDiv.style.color = '';
        }
    }
}
// Updated calculateLoad (loop over state, no hard numbers beyond max)
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

// Gear-specific event listener (extracted from main)
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

// Plus/Minus for gear slots
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

// Init gear after data is loaded (replaces window.load)
window.addEventListener('dataLoaded', () => {
    rebuildGearSelectors();
    calculateLoad();
});