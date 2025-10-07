const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS_NiAKsJIQu_X4cf5_knfMSMPMEMqlxkRgoTOlM23AGjycSOeeKX90HzOwFKMHp67gy_GBXeZynyWG/pub?gid=1022265880&single=true&output=csv';

let allData = [];

// Simple CSV parser
function parseCSV(csvText) {
    console.log('Parsing CSV...');
    try {
        const lines = csvText.trim().split('\n');
        console.log('CSV lines:', lines.length);
        if (lines.length < 1) {
            console.error('Error: CSV is empty or malformed');
            throw new Error('CSV is empty or malformed');
        }
        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
        console.log('Headers:', headers);
        if (!headers.includes('Category') || !headers.includes('Details')) {
            console.error('Error: Required headers "Category" or "Details" not found');
            throw new Error('Required headers missing');
        }
        const rows = lines.slice(1).map((line, index) => {
            const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
            return headers.reduce((obj, header, i) => {
                obj[header] = values[i] || '';
                return obj;
            }, {});
        }).filter(row => Object.values(row).some(val => val));
        console.log('Parsed rows:', rows.length);
        return { headers, rows };
    } catch (error) {
        console.error('CSV parsing failed:', error);
        throw error;
    }
}

// Organize data by column B (Category) and column C (Details)
function organizeData(rows) {
    console.log('Organizing data...');
    try {
        const organized = {};
        let currentHeader = '';
        rows.forEach((row, index) => {
            const category = row['Category'];
            if (!category) {
                console.warn(`Row ${index + 2} has empty Category, skipping`);
                return;
            }
            if (!category.startsWith('-')) {
                currentHeader = category;
                organized[currentHeader] = { subitems: [], details: row['Details'] || 'WIP' };
                console.log(`Added header: ${currentHeader}`);
            } else {
                const subitem = category.replace(/^-/, '').trim();
                if (currentHeader && subitem) {
                    organized[currentHeader].subitems.push({ name: subitem, details: row['Details'] || 'WIP' });
                    console.log(`Added subitem "${subitem}" under header "${currentHeader}"`);
                } else {
                    console.warn(`Row ${index + 2}: Subitem "${subitem}" ignored, no valid header or empty subitem`);
                }
            }
        });
        console.log('Organized data:', organized);
        if (Object.keys(organized).length === 0) {
            console.error('Error: No valid data organized. Check CSV content.');
        }
        return organized;
    } catch (error) {
        console.error('Data organization failed:', error);
        throw error;
    }
}

// Render sidebar
function renderSidebar(data) {
    console.log('Rendering sidebar...');
    try {
        const sidebar = document.getElementById('sidebar-content');
        if (!sidebar) {
            console.error('Error: Sidebar content element not found');
            throw new Error('Sidebar element missing');
        }
        if (Object.keys(data).length === 0) {
            console.error('Error: No data to render in sidebar');
            sidebar.innerHTML = '<div class="no-results">No categories available</div>';
            return;
        }
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
        console.log('Sidebar HTML rendered');

        // Add click handlers for headers
        document.querySelectorAll('.section-header').forEach(header => {
            header.addEventListener('click', () => {
                const subitems = header.nextElementSibling;
                subitems.classList.toggle('visible');
                header.classList.toggle('expanded');
                console.log(`Toggled visibility for header: ${header.dataset.header}`);
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
                    console.log(`Scrolled to section: ${sectionId}`);
                } else {
                    console.warn(`Section not found for ID: ${sectionId}`);
                }
            });
        });
    } catch (error) {
        console.error('Sidebar rendering failed:', error);
        throw error;
    }
}

// Render content sections
function renderSections(data, searchTerm = '') {
    console.log('Rendering sections...');
    try {
        const content = document.getElementById('content-sections');
        if (!content) {
            console.error('Error: Content sections element not found');
            throw new Error('Content element missing');
        }
        let html = '';
        const filteredData = searchTerm ? filterData(data, searchTerm) : data;

        if (Object.keys(filteredData).length === 0) {
            html = '<div class="no-results">No results found.</div>';
            console.log('No results after filtering');
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
            console.log('Sections rendered:', Object.keys(filteredData).length);
        }
        content.innerHTML = html;
    } catch (error) {
        console.error('Section rendering failed:', error);
        throw error;
    }
}

// Filter data based on search term
function filterData(data, searchTerm) {
    console.log('Filtering data with term:', searchTerm);
    try {
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
        console.log('Filtered data:', filtered);
        return filtered;
    } catch (error) {
        console.error('Data filtering failed:', error);
        throw error;
    }
}

// Fetch and load data
console.log('Fetching CSV from:', CSV_URL);
fetch(CSV_URL)
    .then(response => {
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log('Fetch successful');
        return response.text();
    })
    .then(csvText => {
        console.log('CSV text received, length:', csvText.length);
        const parsed = parseCSV(csvText);
        allData = organizeData(parsed.rows);
        renderSidebar(allData);
        renderSections(allData);
    })
    .catch(error => {
        console.error('Error in data pipeline:', error);
        document.getElementById('content-sections').innerHTML = 
            '<div class="no-results">Error loading data. Check console for details.</div>';
        document.getElementById('sidebar-content').innerHTML = 
            '<div class="no-results">Error loading categories. Check console for details.</div>';
    });

// Search functionality
document.getElementById('search').addEventListener('input', (e) => {
    const searchTerm = e.target.value;
    console.log('Search term entered:', searchTerm);
    renderSections(allData, searchTerm);
});