// save-load.js

function getCharacterState() {
    const state = {
        name: document.getElementById('charName').value,
        level: document.getElementById('charLvl').value,
        youth: document.getElementById('childhood').value,
        stirring: document.getElementById('training').value,
        way: document.getElementById('roleSelector').value,
        attributes: {
            bodyPriority: document.getElementById('bodyPriority').value,
            mindPriority: document.getElementById('mindPriority').value,
            spiritPriority: document.getElementById('spiritPriority').value,
            might: document.getElementById('mightValue').value,
            agility: document.getElementById('agilityValue').value,
            brawn: document.getElementById('brawnValue').value,
            will: document.getElementById('willValue').value,
            wit: document.getElementById('witValue').value,
            resolve: document.getElementById('resolveValue').value,
            vigor: document.getElementById('vigorValue').value,
            faith: document.getElementById('faithValue').value,
            empathy: document.getElementById('empathyValue').value
        },
        skills: Object.fromEntries(Object.values(SKILL_ID_MAP).map(id => [id, document.getElementById(id)?.value || '0'])),
        profs: {
            strike: Array.from({length: 5}, (_, i) => document.getElementById(`strikeProfSelector${i+1}`)?.value || ''),
            blast: Array.from({length: 5}, (_, i) => document.getElementById(`blastProfSelector${i+1}`)?.value || ''),
            invoke: Array.from({length: 5}, (_, i) => document.getElementById(`invokeProfSelector${i+1}`)?.value || '')
        },
        gear: readyState,  // From gear-scripts.js
        abilities: {
            talents: Array.from(document.querySelectorAll('.talentSelector')).map(sel => sel.value),
            tricks: Array.from(document.querySelectorAll('.trickSelector')).map(sel => sel.value)
        },
        coins: {
            tok: document.getElementById('coinsTok').value,
            copper: document.getElementById('coinsCopper').value,
            silver: document.getElementById('coinsSilver').value,
            gold: document.getElementById('coinsGold').value
        }
    };
    return state;
}

function generateSaveId(state) {
    const json = JSON.stringify(state);
    return btoa(json);  // Base64 for simple encoding; add hash if needed for uniqueness
}

function loadCharacter(id) {
    try {
        const json = atob(id);
        const state = JSON.parse(json);

        // Set basic info
        document.getElementById('charName').value = state.name;
        document.getElementById('charLvl').value = state.level;
        document.getElementById('childhood').value = state.youth;
        document.getElementById('training').value = state.stirring;
        const roleSel = document.getElementById('roleSelector');
        roleSel.value = state.way;
        roleSel.dispatchEvent(new Event('change'));

        // Attributes
        document.getElementById('bodyPriority').value = state.attributes.bodyPriority;
        document.getElementById('mindPriority').value = state.attributes.mindPriority;
        document.getElementById('spiritPriority').value = state.attributes.spiritPriority;
        ['bodyPriority', 'mindPriority', 'spiritPriority'].forEach(id => document.getElementById(id).dispatchEvent(new Event('change')));
        ['mightValue', 'agilityValue', 'brawnValue', 'willValue', 'witValue', 'resolveValue', 'vigorValue', 'faithValue', 'empathyValue'].forEach(id => {
            document.getElementById(id).value = state.attributes[id.replace('Value', '')];
            document.getElementById(id).dispatchEvent(new Event('change'));
        });

        // Skills
        Object.entries(state.skills).forEach(([id, val]) => {
            const sel = document.getElementById(id);
            if (sel) {
                sel.value = val;
                sel.dispatchEvent(new Event('change'));
            }
        });

        // Profs
        ['strike', 'blast', 'invoke'].forEach(type => {
            state.profs[type].forEach((val, i) => {
                const sel = document.getElementById(`${type}ProfSelector${i+1}`);
                if (sel) {
                    sel.value = val;
                    sel.dispatchEvent(new Event('change'));
                }
            });
        });

        // Gear - Reset and rebuild
        readyState = state.gear;
        rebuildGearSelectors();  // From gear-scripts.js

        // Abilities - Set amounts and values
        talentAmount = state.abilities.talents.length;
        tricksAmount = state.abilities.tricks.length;
        updateAbilityTables('talent');
        updateAbilityTables('trick');
        state.abilities.talents.forEach((val, i) => {
            const sel = document.getElementById(`talent${i+1}`);
            if (sel) {
                sel.value = val;
                sel.dispatchEvent(new Event('change'));
            }
        });
        state.abilities.tricks.forEach((val, i) => {
            const sel = document.getElementById(`tricks${i+1}`);
            if (sel) {
                sel.value = val;
                sel.dispatchEvent(new Event('change'));
            }
        });

        // Coins
        document.getElementById('coinsTok').value = state.coins.tok;
        document.getElementById('coinsCopper').value = state.coins.copper;
        document.getElementById('coinsSilver').value = state.coins.silver;
        document.getElementById('coinsGold').value = state.coins.gold;

        // Final recalc
        calculateDerivedStats();
        calculateLoad();
    } catch (e) {
        alert('Invalid load ID');
    }
}

// Wire buttons (call in dataLoaded or load)
document.getElementById('charSave').addEventListener('click', () => {
    const state = getCharacterState();
    const id = generateSaveId(state);
    prompt('Copy this ID to save:', id);  // Or localStorage.setItem('charSave', id);
});

document.getElementById('charLoad').addEventListener('click', () => {
    const id = document.getElementById('loadId').value;
    if (id) loadCharacter(id);
});