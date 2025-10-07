const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS_NiAKsJIQu_X4cf5_knfMSMPMEMqlxkRgoTOlM23AGjycSOeeKX90HzOwFKMHp67gy_GBXeZynyWG/pub?gid=1022265880&single=true&output=csv';

let allData = [];

// Robust CSV parser for handling quoted fields
function parseCSV(csvText) {
    console.log('Parsing CSV...');
    try {
        const lines = csvText.trim().split('\n');
        console.log('CSV lines:', lines.length);
        if (lines.length < 1) {
            console.error('Error: CSV is empty or malformed');
            throw new Error('CSV is empty or malformed');
        }

        // Parse headers
        const headerLine = lines[0];
        const headers = headerLine.match(/(?:"[^"]*"|[^,]*)/g)
            .map(h => h.trim().replace(/^"|"$/g, ''))
            .filter(h => h);
        console.log('Raw headers from CSV:', headers);

        // Identify Sections (B) and Details (C) columns
        let sectionsIndex = headers.findIndex(h => h.toLowerCase() === 'sections');
        let detailsIndex = headers.findIndex(h => h.toLowerCase().includes('detail') || h.toLowerCase() === 'c');
        if (sectionsIndex === -1) {
            console.error('Error: "Sections" column not found. Available headers:', headers);
            throw new Error('Sections column missing');
        }
        if (detailsIndex === -1) {
            console.warn('Warning: "Details" column not found, will use empty string for Details');
            detailsIndex = headers.length; // Fallback to avoid errors
        }
        console.log(`Column B (Sections) mapped to index ${sectionsIndex} ("${headers[sectionsIndex]}")`);
        console.log(`Column C (Details) mapped to index ${detailsIndex} ("${detailsIndex < headers.length ? headers[detailsIndex] : 'N/A'}")`);

        // Parse rows
        const rows = lines.slice(1).map((line, rowIndex) => {
            const values = line.match(/(?:"[^"]*"|[^,]*)/g)
                .map(v => v.trim().replace(/^"|"$/g, ''));
            if (values.length < Math.max(sectionsIndex, detailsIndex) + 1) {
                console.warn(`Row ${rowIndex + 2} has insufficient columns (${values.length}), padding with empties`);
                while (values.length <= Math.max(sectionsIndex, detailsIndex)) {
                    values.push('');
                }
            }
            const rowObj = {
                Sections: values[sectionsIndex] || '',
                Details: detailsIndex < values.length ? values[detailsIndex] || '' : ''
            };
            console.log(`Row ${rowIndex + 2} - Sections (B): "${rowObj.Sections}" | Details (C): "${rowObj.Details.substring(0, 50)}..."`);
            return rowObj;
        }).filter(row => row.Sections); // Only keep rows with a Sections value

        console.log('Parsed rows:', rows.length);
        console.log('Sample row:', rows[0] || 'No sample (empty rows)');

        // Validate Sections values
        rows.forEach((row, i) => {
            if (row.Sections && row.Sections.length > 100) {
                console.warn(`Row ${i + 2} warning: Sections value "${row.Sections.substring(0, 50)}..." is unusually long, possible Details contamination`);
            }
        });

        return { headers, rows, sectionsIndex, detailsIndex };
    } catch (error) {
        console.error('CSV parsing failed:', error);
        throw error;
    }
}

// Organize data by column B (Sections) only for sidebar
function organizeData(rows) {
    console.log('Organizing data...');
    try {
        const organized = {};
        let currentHeader = '';
        rows.forEach((row, index) => {
            const section = row['Sections'];
            const details = row['Details'];
            if (!section) {
                console.warn(`Row ${index + 2} has empty Sections, skipping`);
                return;
            }
            console.log(`Processing row ${index + 2}: Sections="${section}" | Details="${details.substring(0, 50)}..."`);
            if (!section.startsWith('-')) {
                currentHeader = section;
                organized[currentHeader] = { subitems: [], details: details || 'WIP' };
                console.log(`Added header: "${currentHeader}" (from Sections)`);
            } else {
                const subitem = section.replace(/^-/, '').trim();
                if (currentHeader && subitem) {
                    organized[currentHeader].subitems.push({ name: subitem, details: details || 'WIP' });
                    console.log(`Added subitem "${subitem}" under "${currentHeader}" (from Sections)`);
                } else {
                    console.warn(`Row ${index + 2}: Subitem "${subitem}" ignored, no valid header or empty subitem`);
                }
            }
        });
        console.log('Organized data keys (Sidebar, from Sections only):', Object.keys(organized));
        return organized;
    } catch (error) {
        console.error('Data organization failed:', error);
        throw error;
    }
}

// Render sidebar (strictly from Sections column)
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
            sidebar.innerHTML = '<div class="no-results">No sections available</div>';
            return;
        }

        let html = '';
        Object.keys(data).forEach(header => {
            console.log(`Sidebar item: Header="${header}" (from Sections)`);
            const subitemHtml = data[header].subitems.map(subitem => {
                console.log(`Sidebar subitem under "${header}": "${subitem.name}" (from Sections)`);
                return `
                    <div class="sidebar-item sidebar-subitem" data-subitem="${subitem.name}">
                        ${subitem.name}
                    </div>
                `;
            }).join('');
            html += `
                <div class="sidebar-item section-header" data-header="${header}">
                    ${header}
                </div>
                <div class="subitems" data-subitems="${header}">
                    ${subitemHtml}
                </div>
            `;
        });
        sidebar.innerHTML = html + '<div style="font-size: 0.8em; color: #888; margin-top: 20px;">Debug: Sidebar headers (from Sections): ' + Object.keys(data).join(', ') + '</div>';

        console.log('Exact sidebar HTML generated (should only contain Sections values):\n', html);

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

// Render content sections (from Details only)
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
            console.log('Sections rendered (Details content only):', Object.keys(filteredData).length);
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
        console.log('Filtered data keys (Sections only):', Object.keys(filtered));
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
            '<div class="no-results">Error loading sections. Check console for details.</div>';
    });

// Search functionality
document.getElementById('search').addEventListener('input', (e) => {
    const searchTerm = e.target.value;
    console.log('Search term entered:', searchTerm);
    renderSections(allData, searchTerm);
});