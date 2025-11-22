const CC_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS_NiAKsJIQu_X4cf5_knfMSMPMEMqlxkRgoTOlM23AGjycSOeeKX90HzOwFKMHp67gy_GBXeZynyWG/pub?gid=CHARACTER_CREATOR_GID&single=true&output=csv';

let charData = [];

function loadCharacterCreator() {
    fetch(CC_CSV_URL)
        .then(r => r.text())
        .then(text => {
            charData = parseCSV(text).rows;
            renderCharacterForm();
        })
        .catch(() => {
            document.getElementById('character-form').innerHTML = '<p>Error loading character sheet.</p>';
        });
}

function renderCharacterForm() {
    let html = '<div class="character-sheet-old">';
    let currentSection = '';
    charData.forEach(row => {
        if (row.Section && row.Section !== currentSection) {
            if (currentSection) html += '</div></div>';
            html += `<div class="section-block"><h2>${row.Section}</h2><div class="fields-grid">`;
            currentSection = row.Section;
        }
        const id = row.Name.toLowerCase().replace(/\s+/g, '-');
        if (row.Type === 'select') {
            html += `<div class="field"><label>${row.Name}</label><select id="${id}"><option></option>${row.Options.split(',').map(o => `<option>${o.trim()}</option>`).join('')}</select></div>`;
        } else if (row.Type === 'number') {
            html += `<div class="field"><label>${row.Name}</label><input type="number" id="${id}" min="${row.Min||0}" max="${row.Max||10}" value="${row.Default||0}"></div>`;
        } else if (row.Type === 'text') {
            html += `<div class="field"><label>${row.Name}</label><input type="text" id="${id}"></div>`;
        }
    });
    if (currentSection) html += '</div></div>';
    html += '</div>';
    document.getElementById('character-form').innerHTML = html;

    document.getElementById('export-csv').addEventListener('click', exportCharacterCSV);
}

function exportCharacterCSV() {
    let csv = 'Field,Value\n';
    document.querySelectorAll('#character-form input, #character-form select').forEach(el => {
        const field = el.id || el.name || 'unknown';
        csv += `"${field}","${el.value.replace(/"/g, '""')}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'character.csv';
    a.click();
}

// Auto-load when tab is first opened
if (document.visibilityState === 'visible') {
    const observer = new MutationObserver(() => {
        if (document.getElementById('character-creator').classList.contains('active')) {
            loadCharacterCreator();
            observer.disconnect();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
}