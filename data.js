const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS_NiAKsJIQu_X4cf5_knfMSMPMEMqlxkRgoTOlM23AGjycSOeeKX90HzOwFKMHp67gy_GBXeZynyWG/pub?gid=1022265880&single=true&output=csv';

// Organize data
function organizeRows(rows) {
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

async function loadData() {
    try {
        const response = await fetch(CSV_URL);
        if (!response.ok) {
            throw new Error(response.status);
        }
        const text = await response.text();
        const parsed = Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: false,
            delimitersToGuess: [',']
        });
        if (parsed.errors.length > 0) {
            console.error('PapaParse errors:', parsed.errors);
            throw new Error('Error parsing CSV');
        }
        const dataRows = parsed.data
            .map(values => ({
                Sections: values.Sections?.trim() || '',
                Details: values.Details || 'WIP'
            }))
            .filter(r => r.Sections);
        return organizeRows(dataRows);
    } catch (err) {
        throw err;
    }
}