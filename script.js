const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS_NiAKsJIQu_X4cf5_knfMSMPMEMqlxkRgoTOlM23AGjycSOeeKX90HzOwFKMHp67gy_GBXeZynyWG/pub?gid=1022265880&single=true&output=csv';
let allData = [];

// Count leading dashes → returns number of dashes (keeps them visible)
function getIndentLevel(text) {
    if (!text) return 0;
    const match = text.match(/^-+/);
    return match ? match[0].length : 0;
}

// Parse CSV (your original robust parser — unchanged)
function parseCSV(csvText) {
    const rows = [];
    let currentRow = [];
    let currentValue = '';
    let insideQuote = false;
    let i = 0;
    while (i < csvText.length) {
        const char = csvText[i];
        if (insideQuote) {
            if (char === '"' && i + 1 < csvText.length && csvText[i + 1] === '"') { currentValue += '"'; i += 2; continue; }
            else if (char === '"') { insideQuote = false; i++; continue; }
            else { currentValue += char; i++; continue; }
        } else {
            if (char === '"') { insideQuote = true; i++; continue; }
            else if (char === ',') { currentRow.push(currentValue); currentValue = ''; i++; continue; }
            else if (char === '\r' || char === '\n') {
                currentRow.push(currentValue);
                if (currentRow.some(v => v.trim() !== '')) rows.push(currentRow);
                currentRow = []; currentValue = ''; i++;
                if (char === '\r' && i < csvText.length && csvText[i] === '\n') i++;
                continue;
            } else { currentValue += char; i++; continue; }
        }
    }
    if (currentValue !== '' || currentRow.length > 0) {
        currentRow.push(currentValue);
        if (currentRow.some(v => v.trim() !== '')) rows.push(currentRow);
    }

    const headers = (rows[0] || []).map(h => h.trim());
    let sectionsIndex = headers.findIndex(h => h.toLowerCase() === 'sections');
    if (sectionsIndex === -1) sectionsIndex = 1;
    let detailsIndex = headers.findIndex(h => h.toLowerCase().includes('detail') || h.toLowerCase() === 'c');
    if (detailsIndex === -1) detailsIndex = 2;

    const dataRows = rows.slice(1).map(values => {
        while (values.length <= Math.max(sectionsIndex, detailsIndex)) values.push('');
        return {
            Sections: values[sectionsIndex]?.trim() || '',
            Details:  values[detailsIndex] || 'WIP'
        };
    }).filter(r => r.Sections);

    return { rows: dataRows };
}

// Organize data
function organizeData(rows) {
    const organized = {};
    let currentHeader = '';
    rows.forEach(row => {
        if (!row.Sections.startsWith('-')) {
            currentHeader = row.Sections;
            organized[currentHeader] = { subitems: [], details: row.Details };
        } else {
            const name = row.Sections.replace(/^-/, '').trim();
            if (currentHeader && name) {
                organized[currentHeader].subitems.push({ name, details: row.Details });
            }
        }
    });
    return organized;
}

// Render sidebar
function renderSidebar(data) {
    const sidebar = document.getElementById('sidebar-content');
    let html = '';
    Object.keys(data).forEach(header => {
        const isTraea = header.toLowerCase().includes('traea');
        const subHtml = data[header].subitems.map(s => {
            const traea = s.name.toLowerCase().includes('traea');
            return `<div class="sidebar-item sidebar-subitem ${traea?'traea-item':''}" data-header="${header}" data-subitem="${s.name}">${s.name}</div>`;
        }).join('');
        html += `
            <div class="sidebar-item section-header ${isTraea?'traea-item':''}" data-header="${header}">${header}</div>
            <div class="subitems" data-subitems="${header}">${subHtml}</div>
        `;
    });
    sidebar.innerHTML = html;

    document.querySelectorAll('.section-header').forEach(h => h.addEventListener('click', () => {
        h.nextElementSibling.classList.toggle('visible');
        h.classList.toggle('expanded');
    }));
    document.querySelectorAll('.sidebar-item').forEach(item => item.addEventListener('click', () => {
        const h = item.dataset.header;
        const s = item.dataset.subitem;
        const id = (s ? `${h}-${s}` : h).replace(/\s+/g, '-');
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }));
}

// Render sections — dash indentation with dashes visible
function renderSections(data, term = '') {
    const filtered = term ? filterData(data, term) : data;
    let html = '';
    if (Object.keys(filtered).length === 0) {
        html = '<div class="no-results">No results found.</div>';
    } else {
        Object.keys(filtered).forEach(header => {
            const indent = getIndentLevel(filtered[header].details);
            html += `
                <div class="section indent-${indent}" id="${header.replace(/\s+/g, '-')}">
                    <h3>${header}</h3>
                    <div class="section-content">${filtered[header].details.replace(/\n/g, '<br/>')}</div>
                </div>
            `;
            filtered[header].subitems.forEach(sub => {
                const isTraea = sub.name.toLowerCase().includes('traea');
                const subIndent = getIndentLevel(sub.details);
                html += `
                    <div class="section ${isTraea?'traea-section':''} indent-${subIndent}" 
                         id="${(header + '-' + sub.name).replace(/\s+/g, '-')}">
                        <h3>${sub.name}</h3>
                        <div class="section-content">${sub.details.replace(/\n/g, '<br/>')}</div>
                    </div>
                `;
            });
        });
    }
    document.getElementById('content-sections').innerHTML = html;
}

function filterData(data, term) {
    const filtered = {};
    Object.keys(data).forEach(h => {
        const matchHeader = h.toLowerCase().includes(term);
        const matchDetails = data[h].details.toLowerCase().includes(term);
        const subMatches = data[h].subitems.filter(s => 
            s.name.toLowerCase().includes(term) || s.details.toLowerCase().includes(term)
        );
        if (matchHeader || matchDetails || subMatches.length) {
            filtered[h] = { details: data[h].details, subitems: subMatches };
        }
    });
    return filtered;
}

// Load
fetch(CSV_URL)
    .then(r => { if (!r.ok) throw Error(r.status); return r.text(); })
    .then(text => {
        const parsed = parseCSV(text);
        allData = organizeData(parsed.rows);
        renderSidebar(allData);
        renderSections(allData);
    })
    .catch(err => {
        console.error(err);
        document.getElementById('content-sections').innerHTML = '<div class="no-results">Error loading data</div>';
    });

document.getElementById('search').addEventListener('input', e => renderSections(allData, e.target.value.toLowerCase()));