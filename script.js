const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS_NiAKsJIQu_X4cf5_knfMSMPMEMqlxkRgoTOlM23AGjycSOeeKX90HzOwFKMHp67gy_GBXeZynyWG/pub?gid=1022265880&single=true&output=csv';
let allData = [];

// Count leading dashes
function getIndentLevel(text) {
    if (!text) return 0;
    const match = text.match(/^-+/);
    return match ? match[0].length : 0;
}

// Organize data
function organizeData(rows) {
    try {
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
    } catch (error) {
        throw error;
    }
}

// Render sidebar
function renderSidebar(data) {
    try {
        const sidebar = document.getElementById('sidebar-content');
        if (!sidebar) throw new Error('Sidebar element missing');
        if (Object.keys(data).length === 0) {
            sidebar.innerHTML = '<div class="no-results">No sections available</div>';
            return;
        }

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
            const element = document.getElementById(id);
            if (element) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight || 60;
                const yOffset = -navbarHeight - 20;
                const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }));
    } catch (error) {
        throw error;
    }
}

// Render sections with dash indentation
function renderSections(data, term = '') {
    try {
        const filtered = term ? filterData(data, term) : data;
        let html = '';
        if (Object.keys(filtered).length === 0) {
            html = '<div class="no-results">No results found.</div>';
        } else {
            Object.keys(filtered).forEach(header => {
                const lines = filtered[header].details.split('\n');
                const processed = lines.map(line => {
                    const level = getIndentLevel(line);
                    return `<p class="indent-${level}">${line}</p>`;
                }).join('');
                html += `
                    <div class="section" id="${header.replace(/\s+/g, '-')}">
                        <h3>${header}</h3>
                        <div class="section-content">${processed}</div>
                    </div>
                `;
                filtered[header].subitems.forEach(sub => {
                    const isTraea = sub.name.toLowerCase().includes('traea');
                    const subLines = sub.details.split('\n');
                    const subProcessed = subLines.map(line => {
                        const level = getIndentLevel(line);
                        return `<p class="indent-${level}">${line}</p>`;
                    }).join('');
                    html += `
                        <div class="section ${isTraea?'traea-section':''}" id="${(header + '-' + sub.name).replace(/\s+/g, '-')}">
                            <h3>${sub.name}</h3>
                            <div class="section-content">${subProcessed}</div>
                        </div>
                    `;
                });
            });
        }
        document.getElementById('content-sections').innerHTML = html;
    } catch (error) {
        throw error;
    }
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

// Navigation between sections
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('data-section');
        
        document.querySelectorAll('.content-section').forEach(sec => {
            sec.classList.remove('active');
        });
        document.getElementById(target)?.classList.add('active');
        
        document.querySelectorAll('.nav-list a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
    });
});

// Load Prae data
fetch(CSV_URL)
    .then(r => { if (!r.ok) throw Error(r.status); return r.text(); })
    .then(text => {
        const parsed = Papa.parse(text, {
            header: false,
            skipEmptyLines: true,
            dynamicTyping: false,
            delimitersToGuess: [',']
        });
        if (parsed.errors.length > 0) {
            console.error('PapaParse errors:', parsed.errors);
            throw new Error('Error parsing CSV');
        }
        const rows = parsed.data;
        const headers = (rows[0] || []).map(h => h.trim());
        let sectionsIndex = headers.findIndex(h => h.toLowerCase() === 'sections');
        if (sectionsIndex === -1) sectionsIndex = 1;
        let detailsIndex = headers.findIndex(h => h.toLowerCase().includes('detail') || h.toLowerCase() === 'c');
        if (detailsIndex === -1) detailsIndex = 2;

        const dataRows = rows.slice(1).map(values => {
            while (values.length <= Math.max(sectionsIndex, detailsIndex)) values.push('');
            return {
                Sections: values[sectionsIndex]?.trim() || '',
                Details: values[detailsIndex] || 'WIP'
            };
        }).filter(r => r.Sections);

        allData = organizeData(dataRows);
        renderSidebar(allData);
        renderSections(allData);
    })
    .catch(err => {
        document.getElementById('content-sections').innerHTML = '<div class="no-results">Error loading data</div>';
        document.getElementById('sidebar-content').innerHTML = '<div class="no-results">Error loading sidebar</div>';
    });

document.getElementById('search').addEventListener('input', e => renderSections(allData, e.target.value.toLowerCase()));