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
                triggerInput(el); // Input for numbers
                triggerChange(el);
            }
        });

        // 5. Profs (depends on attack ranks from way/skills)
        ['strike', 'blast', 'invoke'].forEach(type => {
            state.profs[type].forEach((prof, i) => {
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
    } catch (err) {
        alert('Invalid save code');
    }
}

// Init: Wire buttons after dataLoaded (to ensure all elements exist)
window.addEventListener('dataLoaded', () => {
    document.getElementById('saveButton')?.addEventListener('click', () => {
        const code = generateSaveCode();
        document.getElementById('saveCodeInput').value = code;
        alert('Save code generated and copied to input field.');
    });

    document.getElementById('loadButton')?.addEventListener('click', () => {
        const code = document.getElementById('saveCodeInput').value.trim();
        if (code) loadFromCode(code);
    });
});