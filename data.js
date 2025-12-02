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
        if (!row.Sections.startsWith('-')) {
            currentHeader = row.Sections;
            organized[currentHeader] = { subitems: [], details: row.Details };
        } else {
            const name = row.Sections.replace(/^-+\s*/, '').trim();
            if (currentHeader && name) {
                organized[currentHeader].subitems.push({ name, details: row.Details });
            }
        }
    });
    return organized;
}
// Parser for abilities CSV (moved from creator-scripts.js)
function parseAbilities(rows) {
    const skills = rows[0].slice(1).map(s => s.trim().toLowerCase());
    const abilitiesMap = new Map();
    skills.forEach((skill, colIndex) => {
        let currentAbility = null;
        for (let r = 1; r < rows.length; r++) {
            const keyCell = rows[r][0]?.trim() || '';
            const valueCell = rows[r][colIndex + 1]?.trim() || '';
            if (keyCell.match(/^(Talent|Trick|Ritual) \d+ Name$/i)) {
                if (currentAbility) {
                    if (!abilitiesMap.has(skill)) abilitiesMap.set(skill, []);
                    abilitiesMap.get(skill).push(currentAbility);
                }
                const typeMatch = keyCell.match(/^(Talent|Trick|Ritual)/i);
                const type = typeMatch ? typeMatch[0].toLowerCase() : 'unknown';
                currentAbility = { type, name: valueCell || `(Unnamed ${type})`, skill, details: {} };
            } else if (currentAbility && keyCell.includes(' ')) {
                const detailKey = keyCell.split(' ').slice(2).join(' ');
                currentAbility.details[detailKey] = valueCell;
            }
        }
        if (currentAbility) {
            if (!abilitiesMap.has(skill)) abilitiesMap.set(skill, []);
            abilitiesMap.get(skill).push(currentAbility);
        }
    });
    return abilitiesMap;
}
// Parser for ways CSV (moved from creator-scripts.js)
function parseWays(rows) {
    const includeRowIdx = rows.findIndex(row => (row[0] || '').toLowerCase().trim().includes('include'));
    if (includeRowIdx === -1) throw new Error('Missing "Include" row in ways CSV');
    const includeRow = rows[includeRowIdx];
    const parsedWays = [];
    for (let col = 1; col < includeRow.length; col++) {
        const includeValue = (includeRow[col] || '').toUpperCase().trim();
        if (includeValue === 'TRUE' || includeValue === '1') {
            const props = {};
            rows.forEach(row => {
                const key = (row[0] || '').trim().toLowerCase();
                if (key) props[key] = (row[col] || '').trim();
            });
            const nameKey = Object.keys(props).find(k => k.includes('way name'));
            const reqSkillKey = Object.keys(props).find(k => k.includes('required skill'));
            const name = nameKey ? props[nameKey] : '';
            const reqSkill = reqSkillKey ? props[reqSkillKey] : '';
            if (name && reqSkill) {
                const skillId = reqSkill.trim() === 'Any' ? 'Any' : SKILL_ID_MAP[reqSkill.trim()];
                if (skillId || reqSkill.trim() === 'Any') {
                    parsedWays.push({ name, props, reqSkill: reqSkill.trim(), skillId });
                }
            }
        }
    }
    return parsedWays;
}
// Parser for rules CSV (renamed from parseChar for clarity)
function parseRules(rows) {
    const headers = rows[0].map(h => h.trim().toLowerCase()); // Normalize to lower for matching
    const catIdx = headers.indexOf('datacategory');
    if (catIdx === -1) {
        console.warn('No dataCategory column found; falling back to legacy parsing.');
        // Legacy prefixMap logic (kept for backward compat)
        const prefixMap = headers.reduce((map, h, idx) => {
            const parts = h.split(' ');
            if (parts.length < 2) return map;
            const prefix = parts[0] + ' ';
            map[prefix] = map[prefix] || [];
            map[prefix].push({ header: h, idx });
            return map;
        }, {});
        const dataByCategory = {};
        for (const [prefix, entries] of Object.entries(prefixMap)) {
            if (entries.length < 2) continue;
            const categoryKey = prefix.trim().toLowerCase().replace(' ', '');
            dataByCategory[categoryKey] = [];
            for (let r = 1; r < rows.length; r++) {
                let item = {};
                entries.forEach(({header, idx}) => {
                    let key = header.replace(prefix, '').trim().toLowerCase();
                    item[key] = rows[r][idx]?.trim();
                });
                if (item.name) {
                    dataByCategory[categoryKey].push(item);
                }
            }
        }
        // Legacy hoverRules
        const hoverIdx = headers.indexOf('hoverrules');
        const detailsIdx = headers.indexOf('hoverrulesdetails');
        const hoverRules = [];
        if (hoverIdx !== -1 && detailsIdx !== -1) {
            for (let r = 1; r < rows.length; r++) {
                const rule = rows[r][hoverIdx]?.trim();
                const detail = rows[r][detailsIdx]?.trim();
                if (rule && detail) hoverRules.push({ rule, detail });
            }
        }
        return { dataByCategory, hoverRules };
    }

    // Generalized parsing by dataCategory
    const dataByCategory = {};
    for (let r = 1; r < rows.length; r++) {
        const category = rows[r][catIdx]?.trim().toLowerCase();
        if (!category) continue;
        if (!dataByCategory[category]) dataByCategory[category] = [];

        const item = {};
        headers.forEach((h, idx) => {
            const value = rows[r][idx]?.trim();
            if (value && h.startsWith(category)) {
                const key = h.replace(category, '').toLowerCase(); // Strip prefix, e.g., 'gearname' -> 'name'
                item[key] = value;
            }
        });

        if (Object.keys(item).length > 0) { // Only add if has props (no strict 'name' check)
            if (category === 'gear' && item.type) item.category = item.type; // Normalize 'type' to 'category' for downstream compat
            if (category === 'proficiency') {
                item.category = item.type?.toLowerCase();
                item.details = item.shortdetails;
            }
            dataByCategory[category].push(item);
        }
    }

    // Special mapping for hoverRules (if category='rules')
    const hoverRules = dataByCategory.rules?.map(item => ({
        rule: item.rule || item.name || '', // Flexible key mapping
        detail: item.details || ''
    })).filter(r => r.rule && r.detail) || [];

    // Return all parsed parts
    return { dataByCategory, hoverRules };
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
        const { dataByCategory, hoverRules } = parseRules(rulesRows);
        gearData = dataByCategory.gear || [];
        const proficiencies = dataByCategory.proficiency || [];
        profData.strike = proficiencies.filter(g => g.category?.toLowerCase() === 'strike');
        profData.blast = proficiencies.filter(g => g.category?.toLowerCase() === 'blast');
        profData.invoke = proficiencies.filter(g => g.category?.toLowerCase() === 'invoke');
        hoverRulesData = hoverRules;
        // Dispatch event—everything is ready
        window.dispatchEvent(new CustomEvent('dataLoaded'));
    } catch (err) {
        // Global error handling (already in fetchAndParseCsv)
    }
}
// Call on load
loadAllData();