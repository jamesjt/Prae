// data.js
// URLs for all CSVs (centralized here—add more as needed)
const CSV_URLS = {
    rulebook: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS_NiAKsJIQu_X4cf5_knfMSMPMEMqlxkRgoTOlM23AGjycSOeeKX90HzOwFKMHp67gy_GBXeZynyWG/pub?gid=1022265880&single=true&output=csv',
    abilities: 'https://docs.google.com/spreadsheets/d/1OIAs6EFgLFKG3QN_b4Vtm48BwSFb7VwDxOXWhkotXz8/pub?gid=1439570479&single=true&output=csv',
    ways: 'https://docs.google.com/spreadsheets/d/1OIAs6EFgLFKG3QN_b4Vtm48BwSFb7VwDxOXWhkotXz8/pub?gid=53126780&single=true&output=csv',
    rules: 'https://docs.google.com/spreadsheets/d/1OIAs6EFgLFKG3QN_b4Vtm48BwSFb7VwDxOXWhkotXz8/pub?gid=715914535&single=true&output=csv'
};
// Globals (keep as-is for now; populated here)
let allData = {}; // Main sections data
let abilitiesData = new Map();
let waysData = [];
let profData = { strike: [], blast: [], invoke: [] };
let gearData = [];
let hoverRulesData = [];
let abilityFieldMap = { talent: [], trick: [], ritual: [] }; // New: Inferred fields per type
// Generic fetch + parse function
async function fetchAndParseCsv(url, customParser = null) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Fetch failed for ${url}: ${response.status}`);
        }
        const text = await response.text();
        const parsed = Papa.parse(text, {
            header: false, // Most parsers don't use headers; override if needed
            skipEmptyLines: true,
            dynamicTyping: false,
            delimitersToGuess: [',']
        });
        if (parsed.errors.length > 0) {
            console.error('PapaParse errors:', parsed.errors);
            throw new Error(`Error parsing CSV from ${url}`);
        }
        // Apply custom parser if provided, else return raw rows
        return customParser ? customParser(parsed.data) : parsed.data;
    } catch (err) {
        console.error(`Error in fetchAndParseCsv for ${url}:`, err);
        // UI feedback (e.g., show in a common error div)
        const errorDiv = document.getElementById('content-sections') || document.body;
        errorDiv.innerHTML += `<div class="no-results">Error loading data: ${err.message}</div>`;
        throw err; // Re-throw for callers
    }
}
// Parser for main CSV (your original organizeRows logic)
function parseRulebook(rows) {
    const dataRows = rows.slice(1).map(values => ({  // Skip header row
        Sections: values[1]?.trim() || '',  // Adjusted index for Sections
        Details: values[2] || 'WIP'  // Adjusted index for Details
    })).filter(r => r.Sections);
    const organized = {};
    let currentHeader = '';
    dataRows.forEach(row => {
        if (!row.Sections.startsWith('_')) {
            currentHeader = row.Sections;
            organized[currentHeader] = { subitems: [], details: row.Details };
        } else {
            const name = row.Sections.replace(/^_+\s*/, '').trim();
            let details = row.Details;
            if (currentHeader && name) {
                organized[currentHeader].subitems.push({ name, details });
            }
        }
    });
    return organized;
}
// Parser for abilities CSV (moved from creator-scripts.js)
function parseAbilities(rows) {
    const skills = rows[0].slice(1).map(s => s.trim().toLowerCase());
    const abilitiesMap = new Map();
    const tempFieldMap = { talent: new Set(), trick: new Set(), ritual: new Set() }; // Temp for unique keys
    const orderMap = { talent: [], trick: [], ritual: [] }; // To preserve first-seen order
    skills.forEach((skill, colIndex) => {
        let currentAbility = null;
        let currentType = null;
        for (let r = 1; r < rows.length; r++) {
            const keyCell = rows[r][0]?.trim() || '';
            const valueCell = rows[r][colIndex + 1]?.trim() || '';
            const typeMatch = keyCell.match(/^(Talent|Trick|Ritual)/i);
            if (typeMatch) {
                if (currentAbility) {
                    currentAbility.details['Name'] = currentAbility.name; // Add name to details
                    if (!abilitiesMap.has(skill)) abilitiesMap.set(skill, []);
                    abilitiesMap.get(skill).push(currentAbility);
                }
                currentType = typeMatch[0].toLowerCase();
                const name = valueCell || `(Unnamed ${currentType})`;
                currentAbility = { type: currentType, name, skill, details: {} };
            } else if (currentAbility && keyCell) {
                // Extract detailKey after number, e.g., "Talent 1 Description" -> "Description"
                const parts = keyCell.split(' ');
                const detailKey = parts.slice(2).join(' ').trim();
                if (detailKey) {
                    currentAbility.details[detailKey] = valueCell;
                    // Collect for fieldMap (unique, ordered)
                    if (!tempFieldMap[currentType].has(detailKey)) {
                        tempFieldMap[currentType].add(detailKey);
                        orderMap[currentType].push(detailKey);
                    }
                }
            }
        }
        if (currentAbility) {
            currentAbility.details['Name'] = currentAbility.name; // Add name to details
            if (!abilitiesMap.has(skill)) abilitiesMap.set(skill, []);
            abilitiesMap.get(skill).push(currentAbility);
        }
    });
    // Set global abilityFieldMap with ordered lists (add 'Name' first if not present)
    Object.keys(orderMap).forEach(t => {
        if (!orderMap[t].includes('Name')) orderMap[t].unshift('Name');
        abilityFieldMap[t] = orderMap[t];
    });
    return abilitiesMap;
}
// Parser for ways CSV (your original)
function parseWays(rows) {
    const ways = [];
    for (let r = 1; r < rows.length; r++) {
        const name = rows[r][0]?.trim();
        if (name) {
            const way = { name, props: {} };
            rows[0].slice(1).forEach((header, idx) => {
                const value = rows[r][idx + 1]?.trim();
                if (value) way.props[header.toLowerCase()] = value;
            });
            ways.push(way);
        }
    }
    return ways;
}
// Parser for rules CSV (your original with generalization)
function parseRules(rows) {
    const headers = rows[0].map(h => h.trim().toLowerCase());
    const dataByCategory = {};
    for (let r = 1; r < rows.length; r++) {
        headers.forEach((h, idx) => {
            const value = rows[r][idx]?.trim();
            if (value && h.endsWith('name')) {
                const category = h.replace('name', '');
                if (!dataByCategory[category]) dataByCategory[category] = [];
                const item = { name: value };
                headers.forEach((otherH, otherIdx) => {
                    if (otherH.startsWith(category) && otherH !== category + 'name') {
                        const key = otherH.replace(category, '');
                        const otherValue = rows[r][otherIdx]?.trim();
                        if (otherValue) item[key] = otherValue;
                    }
                });
                dataByCategory[category].push(item);
            }
        });
    }
    // Add any special processing if needed
    return { dataByCategory };
}
// Main load function (loads all in parallel)
async function loadAllData() {
    try {
        const [rulebookRows, abilitiesRows, waysRows, rulesRows] = await Promise.all([
            fetchAndParseCsv(CSV_URLS.rulebook),
            fetchAndParseCsv(CSV_URLS.abilities),
            fetchAndParseCsv(CSV_URLS.ways),
            fetchAndParseCsv(CSV_URLS.rules)
        ]);
        // Parse each
        allData = parseRulebook(rulebookRows);
        abilitiesData = parseAbilities(abilitiesRows);
        waysData = parseWays(waysRows);
        const { dataByCategory } = parseRules(rulesRows);
        gearData = dataByCategory.gear || [];
        const proficiencies = dataByCategory.proficiency || [];
        profData.strike = proficiencies.filter(g => g.category?.toLowerCase() === 'strike');
        profData.blast = proficiencies.filter(g => g.category?.toLowerCase() === 'blast');
        profData.invoke = proficiencies.filter(g => g.category?.toLowerCase() === 'invoke');
        hoverRulesData = dataByCategory.rules?.map(item => ({
            rule: item.rule || item.name || '', // Flexible key mapping
            detail: item.details || ''
        })).filter(r => r.rule && r.detail) || [];
        // Dispatch event—everything is ready
        window.dispatchEvent(new CustomEvent('dataLoaded'));
    } catch (err) {
        // Global error handling (already in fetchAndParseCsv)
    }
}
// Call on load
loadAllData();