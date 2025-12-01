// gear-scripts.js

// Add near top constants
const MAX_READY_SLOTS = 5;  // Change this to adjust ready slots globally

let allOptions = [];
let nonPackOptions = [];
let liquidsOptions = [];
let readyState = Array(MAX_READY_SLOTS).fill(null).map(() => ({ gear: '', amt: 1, stowed: [], contents: [] }));

function populateGearSelector(selectEl, options, placeholder) {
    selectEl.innerHTML = `<option value="emptyStowedGearSlot">${placeholder}</option>`;
    const grouped = {};
    options.forEach(g => {
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
            opt.dataset.load = g.baseLoad || g.load || 0;
            optgroup.appendChild(opt);
        });
        selectEl.appendChild(optgroup);
    });
}

function generateGearEntries() {
    allOptions = gearData.filter(g => g.category.toLowerCase() !== 'liquids');
    nonPackOptions = allOptions.filter(g => g.category.toLowerCase() !== 'packs');  // Case-insensitive exclude
    liquidsOptions = gearData.filter(g => g.category.toLowerCase() === 'liquids');

    const container = document.getElementById('gearEntries');
    container.innerHTML = '';

    for (let i = 1; i <= MAX_READY_SLOTS; i++) {
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

        // On change: update load + conditionally add details icon
        sel.addEventListener('change', () => {
            handleReadySelectChange(i);  // This now handles EVERYTHING: details, packs, state, stowed rendering, and loads
        });

        // Amount input
        const amtInput = document.getElementById(`gear${i}Amt`);
        amtInput.addEventListener('input', function () {
            const val = Math.max(1, parseInt(this.value) || 1);
            this.value = val;
            readyState[i - 1].amt = val;
            updateReadyLoad(i);
            calculateLoad();
        });
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
    const wasPack = readyState[i-1].gear && allOptions.find(g => g.name === readyState[i-1].gear)?.category === 'Packs';
    const isPack = item?.category === 'Packs';
    if (wasPack && !isPack) {
        readyState[i-1].stowed = [];
        renderStowed(i); // This removes the container
    }
    if (isPack && !wasPack) {
        const slots = item.stowedslots || 0;
        readyState[i-1].stowed = Array(slots).fill(null).map(() => ({ gear: '', amt: 1 }));
        renderStowed(i);
    }
    if (isPack && wasPack && readyState[i-1].gear !== newGearName) {
        const slots = item.stowedslots || 0;
        readyState[i-1].stowed = Array(slots).fill(null).map(() => ({ gear: '', amt: 1 }));
        renderStowed(i);
    }
    // === 4. Handle container logic ===
    const wasContainer = readyState[i-1].gear && allOptions.find(g => g.name === readyState[i-1].gear)?.category === 'Containers';
    const isContainer = item?.category === 'Containers';
    if (wasContainer && !isContainer) {
        readyState[i-1].contents = [];
        renderContents(i); // This removes the container
    }
    if (isContainer && !wasContainer) {
        const slots = item.contentsslots || 0;
        readyState[i-1].contents = Array(slots).fill(null).map(() => ({ gear: '', amt: 1 }));
        renderContents(i);
    }
    if (isContainer && wasContainer && readyState[i-1].gear !== newGearName) {
        const slots = item.contentsslots || 0;
        readyState[i-1].contents = Array(slots).fill(null).map(() => ({ gear: '', amt: 1 }));
        renderContents(i);
    }
    // Update state
    readyState[i-1].gear = newGearName;
    readyState[i-1].amt = parseInt(document.getElementById(`gear${i}Amt`).value) || 1;
    // Update load
    updateReadyLoad(i);
    calculateLoad();
}
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
        const entry = document.createElement('div');
        entry.className = 'gearEntry gearStowed';

        let detailsHtml = '';

        entry.innerHTML = `
            <select id="stowed-${i}-${stowedIndex}-select" class="gearSelector"></select>
            <input type="number" id="stowed-${i}-${stowedIndex}-amt" min="1" value="${s.amt}"/>
            <div id="stowed-${i}-${stowedIndex}-load" class="gearLoad"></div>
            ${detailsHtml}
        `;

        container.appendChild(entry);

        const sel = entry.querySelector('select');
        populateGearSelector(sel, nonPackOptions, 'Stowed Slot');

        // Restore saved selection and add details if needed
        if (s.gear) {
            sel.value = s.gear;
            const item = nonPackOptions.find(g => g.name === s.gear);
            if (item?.details?.trim()) {
                const detailsDiv = document.createElement('div');
                detailsDiv.id = `stowed-${i}-${stowedIndex}-details`;
                detailsDiv.className = 'gearDetails';
                detailsDiv.textContent = 'i';
                detailsDiv.setAttribute("data-tip", `gear:${item.name}`);
                entry.appendChild(detailsDiv);
            }
            // Add type class for stowed item
            if (item && item.category) {
                const typeClass = 'gear' + item.category;
                entry.classList.add(typeClass);
            }
        }

        // On change
        sel.addEventListener('change', () => {
            const selectedName = sel.value;
            const item = nonPackOptions.find(g => g.name === selectedName);

            // Remove old details
            const oldDetails = document.getElementById(`stowed-${i}-${stowedIndex}-details`);
            if (oldDetails) oldDetails.remove();

            // Add new details only if present
            if (item?.details?.trim()) {
                const detailsDiv = document.createElement('div');
                detailsDiv.id = `stowed-${i}-${stowedIndex}-details`;
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
        const entry = document.createElement('div');
        entry.className = 'gearEntry gearContents';

        let detailsHtml = '';

        entry.innerHTML = `
            <select id="contents-${i}-${contentsIndex}-select" class="gearSelector"></select>
            <input type="number" id="contents-${i}-${contentsIndex}-amt" min="1" value="${s.amt}"/>
            <div id="contents-${i}-${contentsIndex}-load" class="gearLoad"></div>
            ${detailsHtml}
        `;

        container.appendChild(entry);

        const sel = entry.querySelector('select');
        populateGearSelector(sel, liquidsOptions, 'Select Liquid');

        // Restore saved selection and add details if needed
        if (s.gear) {
            sel.value = s.gear;
            const item = liquidsOptions.find(g => g.name === s.gear);
            if (item?.details?.trim()) {
                const detailsDiv = document.createElement('div');
                detailsDiv.id = `contents-${i}-${contentsIndex}-details`;
                detailsDiv.className = 'gearDetails';
                detailsDiv.textContent = 'i';
                detailsDiv.setAttribute("data-tip", `gear:${item.name}`);
                entry.appendChild(detailsDiv);
            }
            // Add type class for contents item
            if (item && item.category) {
                const typeClass = 'gear' + item.category;
                entry.classList.add(typeClass);
            }
        }

        // On change
        sel.addEventListener('change', () => {
            const selectedName = sel.value;
            const item = liquidsOptions.find(g => g.name === selectedName);

            // Remove old details
            const oldDetails = document.getElementById(`contents-${i}-${contentsIndex}-details`);
            if (oldDetails) oldDetails.remove();

            // Add new details only if present
            if (item?.details?.trim()) {
                const detailsDiv = document.createElement('div');
                detailsDiv.id = `contents-${i}-${contentsIndex}-details`;
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

// Update single stowed load
function updateStowedLoad(readyI, stowedJ) {
    const sel = document.getElementById(`stowed-${readyI}-${stowedJ}-select`);
    if (!sel) return;
    const opt = sel.options[sel.selectedIndex];
    const baseLoad = parseFloat(opt.getAttribute('data-load')) || 0;
    const qty = readyState[readyI-1].stowed[stowedJ-1].amt;
    const total = baseLoad * qty;
    const loadDiv = document.getElementById(`stowed-${readyI}-${stowedJ}-load`);
    if (loadDiv) {
        loadDiv.textContent = total > 0 ? total.toFixed(2).replace(/\.?0+$/, '') : '';
        loadDiv.style.color = (qty > 1 && baseLoad > 1) ? 'red' : '';
    }
}
// Update single contents load
function updateContentsLoad(readyI, contentsJ) {
    const sel = document.getElementById(`contents-${readyI}-${contentsJ}-select`);
    if (!sel) return;
    const opt = sel.options[sel.selectedIndex];
    const baseLoad = parseFloat(opt.getAttribute('data-load')) || 0;
    const qty = readyState[readyI-1].contents[contentsJ-1].amt;
    const total = baseLoad * qty;
    const loadDiv = document.getElementById(`contents-${readyI}-${contentsJ}-load`);
    if (loadDiv) {
        loadDiv.textContent = total > 0 ? total.toFixed(2).replace(/\.?0+$/, '') : '';
        loadDiv.style.color = (qty > 1 && baseLoad > 1) ? 'red' : '';
    }
}
// Update ready load (for pack: sum stowed + base; for container: sum contents + base; for non-pack: base * amt)
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
        } else if (item?.category === 'Containers') {
            state.contents.forEach(s => {
                const sItem = liquidsOptions.find(g => g.name === s.gear);
                if (sItem) total += (sItem.load || 0) * s.amt;
            });
        }
    }
    const loadDiv = document.getElementById(`gear${i}Load`);
    if (loadDiv) {
        loadDiv.textContent = total > 0 ? total.toFixed(2).replace(/\.?0+$/, '') : '';
        if (item?.loadLimit != null && total > item.loadLimit) {
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

// Init gear after data is loaded (replaces window.load)
window.addEventListener('dataLoaded', () => {
    generateGearEntries();
    calculateLoad();
});