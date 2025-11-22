const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS_NiAKsJIQu_X4cf5_knfMSMPMEMqlxkRgoTOlM23AGjycSOeeKX90HzOwFKMHp67gy_GBXeZynyWG/pub?gid=1022265880&single=true&output=csv';
let allData = [];

/* -------------------------------
   Helper: Count leading dashes
--------------------------------*/
function countDashes(line) {
    const match = line.match(/^-+/);
    return match ? match[0].length : 0;
}

/* -------------------------------------------------------------
   NEW: Format the Details text by INDENTING individual lines
------------------------------------------------------------- */
function formatDetailsWithIndentation(text) {
    if (!text) return "";

    return text
        .split(/\n/)
        .map(line => {
            const dashCount = countDashes(line);
            const cleanLine = line.replace(/^-+/, "").trim();
            return `<span class="indent-${dashCount}">${line}</span>`;
        })
        .join("<br/>");
}

/* -------------------------
   CSV PARSER (unchanged)
--------------------------*/
function parseCSV(csvText) {
    const rows = [];
    let currentRow = [];
    let currentValue = '';
    let insideQuote = false;

    let i = 0;
    while (i < csvText.length) {
        const char = csvText[i];
        if (insideQuote) {
            if (char === '"' && csvText[i + 1] === '"') {
                currentValue += '"';
                i += 2;
            } else if (char === '"') {
                insideQuote = false;
                i++;
            } else {
                currentValue += char;
                i++;
            }
        } else {
            if (char === '"') {
                insideQuote = true;
                i++;
            } else if (char === ',') {
                currentRow.push(currentValue);
                currentValue = '';
                i++;
            } else if (char === '\n' || char === '\r') {
                currentRow.push(currentValue);
                if (currentRow.some(v => v.trim() !== '')) rows.push(currentRow);
                currentRow = [];
                currentValue = '';
                i++;
                if (char === '\r' && csvText[i] === '\n') i++;
            } else {
                currentValue += char;
                i++;
            }
        }
    }

    if (currentValue !== '' || currentRow.length > 0) {
        currentRow.push(currentValue);
        if (currentRow.some(v => v.trim() !== '')) rows.push(currentRow);
    }

    const headers = rows[0];
    const sectionsIndex = headers.findIndex(h => h.toLowerCase() === "sections");
    const detailsIndex = headers.findIndex(h => h.toLowerCase().includes("detail"));

    const dataRows = rows.slice(1).map(v => ({
        Sections: v[sectionsIndex] || "",
        Details: v[detailsIndex] || ""
    }));

    return { rows: dataRows };
}

/* -------------------------
   ORGANIZE DATA (same)
--------------------------*/
function organizeData(rows) {
    const organized = {};
    let currentHeader = '';

    rows.forEach(row => {
        const section = row.Sections;
        const details = row.Details;

        if (!section.startsWith('-')) {
            currentHeader = section.trim();
            organized[currentHeader] = { subitems: [], details };
        } else {
            const name = section.replace(/^-/, '').trim();
            organized[currentHeader].subitems.push({ name, details });
        }
    });

    return organized;
}

/* ------------------------------------
   RENDER SECTIONS (UPDATED)
-------------------------------------*/
function renderSections(data, searchTerm = '') {
    const content = document.getElementById('content-sections');
    let html = '';

    const filtered = searchTerm ? filterData(data, searchTerm) : data;

    Object.keys(filtered).forEach(header => {
        html += `
            <div class="section" id="${header.replace(/\s+/g, '-')}">
                <h3>${header}</h3>
                <div class="section-content">
                    ${formatDetailsWithIndentation(filtered[header].details)}
                </div>
            </div>
        `;

        filtered[header].subitems.forEach(sub => {
            html += `
                <div class="section" id="${(header + '-' + sub.name).replace(/\s+/g, '-')}">
                    <h3>${sub.name}</h3>
                    <div class="section-content">
                        ${formatDetailsWithIndentation(sub.details)}
                    </div>
                </div>
            `;
        });
    });

    content.innerHTML = html;
}

/* -------------------------
   FILTER DATA (same)
--------------------------*/
function filterData(data, term) {
    const out = {};
    const lower = term.toLowerCase();

    Object.keys(data).forEach(header => {
        const headerMatch = header.toLowerCase().includes(lower);
        const detailsMatch = data[header].details.toLowerCase().includes(lower);

        const matchedSubitems = data[header].subitems.filter(
            s => s.name.toLowerCase().includes(lower) ||
                 s.details.toLowerCase().includes(lower)
        );

        if (headerMatch || detailsMatch || matchedSubitems.length > 0) {
            out[header] = {
                details: data[header].details,
                subitems: matchedSubitems
            };
        }
    });
    return out;
}

/* -------------------------
   SIDEBAR (unchanged)
--------------------------*/
function renderSidebar(data) {
    const sidebar = document.getElementById('sidebar-content');
    let html = '';

    Object.keys(data).forEach(header => {
        html += `
            <div class="sidebar-item section-header" data-header="${header}">
                ${header}
            </div>
            <div class="subitems">
                ${data[header].subitems.map(sub => `
                    <div class="sidebar-item sidebar-subitem"
                        data-subitem="${sub.name}" data-header="${header}">
                        ${sub.name}
                    </div>
                `).join('')}
            </div>
        `;
    });

    sidebar.innerHTML = html;

    document.querySelectorAll('.section-header').forEach(h =>
        h.addEventListener('click', () => {
            h.classList.toggle('expanded');
            h.nextElementSibling.classList.toggle('visible');
        })
    );

    document.querySelectorAll('.sidebar-item').forEach(item =>
        item.addEventListener('click', () => {
            const header = item.dataset.header;
            const sub = item.dataset.subitem;
            const id = (header + (sub ? '-' + sub : '')).replace(/\s+/g, '-');
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        })
    );
}

/* -------------------------
   FETCH + INIT
--------------------------*/
fetch(CSV_URL)
    .then(r => r.text())
    .then(csv => {
        const parsed = parseCSV(csv);
        allData = organizeData(parsed.rows);
        renderSidebar(allData);
        renderSections(allData);
    });

document.getElementById('search').addEventListener('input', e =>
    renderSections(allData, e.target.value)
);
