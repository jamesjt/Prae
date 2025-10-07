const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS_NiAKsJIQu_X4cf5_knfMSMPMEMqlxkRgoTOlM23AGjycSOeeKX90HzOwFKMHp67gy_GBXeZynyWG/pub?gid=1022265880&single=true&output=csv';

let allData = [];

// Simple CSV parser
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const rows = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
        return headers.reduce((obj, header, i) => {
            obj[header] = values[i] || '';
            return obj;
        }, {});
    }).filter(row => Object.values(row).some(val => val));
    return { headers, rows };
}

// Organize data by column B (Category) and column C (Details)
function organizeData(rows) {
    const organized = {};
    let currentHeader = '';
    rows.forEach(row => {
        const category = row['Category'];
        if (category && !category.startsWith('-')) {
            currentHeader = category;
            organized[currentHeader] = { subitems: [], details: row['Details'] || 'WIP' };
        } else if (category && category.startsWith('-')) {
            const subitem = category.replace(/^-/, '').trim();
            if (currentHeader && subitem) {
                organized[currentHeader].subitems.push({ name: subitem, details: row['Details'] || 'WIP' });
            }
        }
    });
    return organized;
}

// Render sidebar
function renderSidebar(data) {
    const sidebar = document.getElementById('sidebar-content');
    sidebar.innerHTML = Object.keys(data).map(header => `
        <div class="sidebar-item section-header" data-header="${header}">
            ${header}
        </div>
        <div class="subitems" data-subitems="${header}">
            ${data[header].subitems.map(subitem => `
                <div class="sidebar-item sidebar-subitem" data-subitem="${subitem.name}">
                    ${subitem.name}
                </div>
            `).join('')}
        </div>
    `).join('');

    // Add click handlers for headers
    document.querySelectorAll('.section-header').forEach(header => {
        header.addEventListener('click', () => {
            const subitems = header.nextElementSibling;
            subitems.classList.toggle('visible');
            header.classList.toggle('expanded');
        });
    });

    // Add click handlers for scrolling
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.addEventListener('click', () => {
            const header = item.dataset.header;
            const subitem = item.dataset.subitem;
            const sectionId = subitem ? `${header}-${subitem}` : header;
            const section = document.getElementById(sectionId.replace(/\s+/g, '-'));
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Render content sections
function renderSections(data, searchTerm = '') {
    const content = document.getElementById('content-sections');
    let html = '';
    const filteredData = searchTerm ? filterData(data, searchTerm) : data;

    if (Object.keys(filteredData).length === 0) {
        html = '<div class="no-results">No results found.</div>';
    } else {
        Object.keys(filteredData).forEach(header => {
            html += `
                <div class="section" id="${header.replace(/\s+/g, '-')}">
                    <h3>${header}</h3>
                    <div class="section-content">${filteredData[header].details}</div>
                </div>
            `;
            filteredData[header].subitems.forEach(subitem => {
                html += `
                    <div class="section" id="${(header + '-' + subitem.name).replace(/\s+/g, '-')}">
                        <h3>${subitem.name}</h3>
                        <div class="section-content">${subitem.details}</div>
                    </div>
                `;
            });
        });
    }
    content.innerHTML = html;
}

// Filter data based on search term
function filterData(data, searchTerm) {
    const filtered = {};
    Object.keys(data).forEach(header => {
        const headerMatch = header.toLowerCase().includes(searchTerm.toLowerCase());
        const detailsMatch = data[header].details.toLowerCase().includes(searchTerm.toLowerCase());
        const subitemMatches = data[header].subitems.filter(subitem =>
            subitem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            subitem.details.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (headerMatch || detailsMatch || subitemMatches.length > 0) {
            filtered[header] = {
                details: data[header].details,
                subitems: subitemMatches
            };
        }
    });
    return filtered;
}

// Fetch and load data
fetch(CSV_URL)
    .then(response => response.text())
    .then(csvText => {
        const parsed = parseCSV(csvText);
        allData = organizeData(parsed.rows);
        renderSidebar(allData);
        renderSections(allData);
    })
    .catch(error => {
        console.error('Error fetching CSV:', error);
        document.getElementById('content-sections').innerHTML = 
            '<div class="no-results">Error loading data. Check console for details.</div>';
    });

// Search functionality
document.getElementById('search').addEventListener('input', (e) => {
    const searchTerm = e.target.value;
    renderSections(allData, searchTerm);
});