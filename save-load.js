// save-load.js

// Helper to dispatch change event
function triggerChange(el) {
    if (el) {
        const event = new Event('change', { bubbles: true });
        el.dispatchEvent(event);
    }
}

// Helper to dispatch input event (for amount fields)
function triggerInput(el) {
    if (el) {
        const event = new Event('input', { bubbles: true });
        el.dispatchEvent(event);
    }
}

// Inline feedback (replaces alerts)
function showFeedback(msg, isError) {
    const el = document.getElementById('saveLoadFeedback');
    if (!el) return;
    el.textContent = msg;
    el.className = isError ? 'save-feedback-err' : 'save-feedback-ok';
    if (!isError) {
        setTimeout(() => { if (el.textContent === msg) el.textContent = ''; }, 3000);
    }
}

// Collect full state in dependency order
function collectState() {
    const state = {
        char: {
            name: document.getElementById('charName')?.value || '',
            lvl: document.getElementById('charLvl')?.value || '1',
            childhood: document.getElementById('childhood')?.value || '',
            training: document.getElementById('training')?.value || '',
            way: document.getElementById('roleSelector')?.value || ''
        },
        attrs: {
            priorities: {
                body: document.getElementById('bodyPriority')?.value || 'priorityUnassigned',
                mind: document.getElementById('mindPriority')?.value || 'priorityUnassigned',
                spirit: document.getElementById('spiritPriority')?.value || 'priorityUnassigned'
            },
            subs: {
                might: document.getElementById('mightValue')?.value || '0',
                agility: document.getElementById('agilityValue')?.value || '0',
                brawn: document.getElementById('brawnValue')?.value || '0',
                will: document.getElementById('willValue')?.value || '0',
                wit: document.getElementById('witValue')?.value || '0',
                resolve: document.getElementById('resolveValue')?.value || '0',
                vigor: document.getElementById('vigorValue')?.value || '0',
                empathy: document.getElementById('empathyValue')?.value || '0',
                faith: document.getElementById('faithValue')?.value || '0'
            }
        },
        skills: Object.fromEntries(Object.keys(SKILL_ID_MAP).map(skill => [skill, document.getElementById(SKILL_ID_MAP[skill])?.value || '0'])),
        profs: {
            strike: Array.from({length: 5}, (_, i) => document.getElementById(`strikeProfSelector${i+1}`)?.value || ''),
            blast: Array.from({length: 5}, (_, i) => document.getElementById(`blastProfSelector${i+1}`)?.value || ''),
            invoke: Array.from({length: 5}, (_, i) => document.getElementById(`invokeProfSelector${i+1}`)?.value || '')
        },
        abilities: {
            talentAmount: talentAmount,
            talents: Array.from({length: talentAmount}, (_, i) => document.getElementById(`talent${i+1}`)?.value || ''),
            tricksAmount: tricksAmount,
            tricks: Array.from({length: tricksAmount + 1}, (_, i) => document.getElementById(`tricks${i+1}`)?.value || '') // Extra for offset
        },
        gear: {
            slots: gearSlots,
            readyState: readyState.map(slot => ({
                gear: slot.gear || '',
                amt: slot.amt || 1,
                stowed: slot.stowed.map(s => ({ gear: s.gear || '', amt: s.amt || 1 })),
                contents: slot.contents.map(c => ({ gear: c.gear || '', amt: c.amt || 1 }))
            })),
            coins: {
                tok: document.getElementById('coinsTok')?.value || '0',
                copper: document.getElementById('coinsCopper')?.value || '0',
                silver: document.getElementById('coinsSilver')?.value || '0',
                gold: document.getElementById('coinsGold')?.value || '0'
            }
        }
    };
    return state;
}

// Generate save code: JSON -> base64
function generateSaveCode() {
    const state = collectState();
    const json = JSON.stringify(state);
    return btoa(json); // Base64 encode
}

// Update has-value classes after loading char info
function updateHasValueClasses(state) {
    ['charName', 'childhood', 'training'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.toggle('has-value', el.value.trim() !== '');
    });
    const roleSel = document.getElementById('roleSelector');
    if (roleSel) roleSel.classList.toggle('has-value', roleSel.value !== 'wayEmpty');
}

// Load from code: base64 -> JSON, set in order
function loadFromCode(code) {
    try {
        const json = atob(code);
        const state = JSON.parse(json);

        // 1. Char info (no deps)
        document.getElementById('charName').value = state.char.name;
        document.getElementById('charLvl').value = state.char.lvl;
        document.getElementById('childhood').value = state.char.childhood;
        document.getElementById('training').value = state.char.training;

        // 2. Skills (triggers prof/ability updates)
        Object.entries(state.skills).forEach(([skill, value]) => {
            const el = document.getElementById(SKILL_ID_MAP[skill]);
            if (el) {
                el.value = value;
                triggerChange(el);
            }
        });

        // 3. Way (triggers talent, priority, attack skill)
        const wayEl = document.getElementById('roleSelector');
        if (wayEl) {
            wayEl.value = state.char.way;
            triggerChange(wayEl);
        }

        // 4. Attributes (priorities first, then subs; triggers mods/passives)
        Object.entries(state.attrs.priorities).forEach(([attr, prio]) => {
            const el = document.getElementById(`${attr}Priority`);
            if (el) {
                el.value = prio;
                triggerChange(el);
            }
        });

        Object.entries(state.attrs.subs).forEach(([sub, value]) => {
            const el = document.getElementById(`${sub}Value`);
            if (el) {
                el.value = value;
                triggerChange(el);
            }
        });

        // 5. Proficiencies (depends on attack skills)
        Object.entries(state.profs).forEach(([type, profs]) => {
            profs.forEach((prof, i) => {
                const el = document.getElementById(`${type}ProfSelector${i+1}`);
                if (el) {
                    el.value = prof;
                    triggerChange(el);
                }
            });
        });

        // 6. Abilities (depends on skills)
        talentAmount = state.abilities.talentAmount;
        tricksAmount = state.abilities.tricksAmount;
        updateAbilityTables('talent');
        updateAbilityTables('trick');
        state.abilities.talents.forEach((talent, i) => {
            const el = document.getElementById(`talent${i+1}`);
            if (el) {
                el.value = talent;
                triggerChange(el);
            }
        });
        state.abilities.tricks.forEach((trick, i) => {
            const el = document.getElementById(`tricks${i+1}`);
            if (el) {
                el.value = trick;
                triggerChange(el);
            }
        });

        // 7. Gear (depends on nothing; rebuilds UI)
        gearSlots = state.gear.slots;
        readyState = state.gear.readyState.map(slot => ({
            gear: slot.gear,
            amt: slot.amt,
            stowed: slot.stowed.map(s => ({ gear: s.gear, amt: s.amt })),
            contents: slot.contents.map(c => ({ gear: c.gear, amt: c.amt }))
        }));
        rebuildGearSelectors(); // From gear-scripts.js
        Object.entries(state.gear.coins).forEach(([type, value]) => {
            const el = document.getElementById(`coins${type.charAt(0).toUpperCase() + type.slice(1)}`);
            if (el) {
                el.value = value;
                triggerInput(el);
            }
        });

        // Final updates
        calculateDerivedStats();
        calculateLoad();
        updateHasValueClasses(state);
        showFeedback('Character loaded', false);
    } catch (err) {
        showFeedback('Invalid save code', true);
    }
}

// Cookie helpers
function setCookie(name, value, days = 365) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
}

function getCookie(name) {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? decodeURIComponent(match[2]) : null;
}

// Render saved codes list
function renderSavedCodes() {
    const container = document.getElementById('savedCodesList');
    if (!container) return;
    container.innerHTML = '';

    const savesJson = getCookie('savedCodes');
    const saves = savesJson ? JSON.parse(savesJson) : [];

    if (saves.length === 0) {
        container.innerHTML = '<p class="no-saves">No saved characters.</p>';
        return;
    }

    saves.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'save-entry';

        const nameSpan = document.createElement('span');
        nameSpan.className = 'save-name';
        nameSpan.textContent = item.name || 'Unnamed';

        const dateSpan = document.createElement('span');
        dateSpan.className = 'save-date';
        dateSpan.textContent = item.date || '';

        const loadLink = document.createElement('span');
        loadLink.className = 'save-link';
        loadLink.textContent = 'Load';
        loadLink.addEventListener('click', () => {
            loadFromCode(item.code);
        });

        const copySpan = document.createElement('span');
        copySpan.className = 'save-copy';
        copySpan.textContent = 'Copy';
        copySpan.addEventListener('click', () => {
            navigator.clipboard.writeText(item.code).then(() => {
                copySpan.textContent = 'Copied!';
                setTimeout(() => { copySpan.textContent = 'Copy'; }, 1500);
            }).catch(() => {
                showFeedback('Copy failed', true);
            });
        });

        const deleteSpan = document.createElement('span');
        deleteSpan.className = 'save-delete';
        deleteSpan.textContent = 'X';
        deleteSpan.addEventListener('click', () => {
            saves.splice(index, 1);
            setCookie('savedCodes', JSON.stringify(saves));
            renderSavedCodes();
        });

        div.appendChild(nameSpan);
        div.appendChild(dateSpan);
        div.appendChild(loadLink);
        div.appendChild(copySpan);
        div.appendChild(deleteSpan);
        container.appendChild(div);
    });
}

// Save code and update cookie
function saveAndStoreCode() {
    const state = collectState();
    const code = generateSaveCode();
    const customName = document.getElementById('saveNameInput')?.value.trim();
    const name = customName || state.char.name || 'Unnamed';
    const date = new Date().toLocaleDateString();

    const savesJson = getCookie('savedCodes');
    let saves = savesJson ? JSON.parse(savesJson) : [];

    saves.push({ name, code, date });
    if (saves.length > 10) saves.shift(); // Limit to last 10

    setCookie('savedCodes', JSON.stringify(saves));
    document.getElementById('saveCodeInput').value = code;
    renderSavedCodes();

    // Auto-copy to clipboard
    navigator.clipboard.writeText(code).then(() => {
        showFeedback('Saved & copied to clipboard', false);
    }).catch(() => {
        showFeedback('Saved (clipboard copy failed)', false);
    });
}

// Init: Wire buttons after dataLoaded (to ensure all elements exist)
window.addEventListener('dataLoaded', () => {
    renderSavedCodes(); // Load and display existing codes on init

    document.getElementById('saveButton')?.addEventListener('click', saveAndStoreCode);

    document.getElementById('loadButton')?.addEventListener('click', () => {
        const code = document.getElementById('saveCodeInput').value.trim();
        if (code) loadFromCode(code);
    });
});
