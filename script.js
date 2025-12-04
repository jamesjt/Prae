// Count leading dashes
function getIndentLevel(text) {
    if (!text) return 0;
    const match = text.match(/^-+/);
    return match ? match[0].length : 0;
}

// Extracted function for processing details text
function processDetails(details) {
    const paras = details.split(/\n\s*\n/);
    return paras.map(para => {
        if (!para.trim()) return '';
        const lines = para.split('\n').filter(l => l.trim());
        const tippedLines = lines.map(line => {
            const level = getIndentLevel(line);
            const cleaned = line.replace(/^-+\s*/, '');
            const tipped = processTextForTooltips(cleaned);
            return level > 0 ? `<p class="indent-${level}">${tipped}</p>` : tipped;
        });
        return tippedLines.join('<br>');
    }).filter(p => p).join('<br><br>');
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
                const processed = processDetails(filtered[header].details);
                html += `
                    <div class="section" id="${header.replace(/\s+/g, '-')}">
                        <h3>${header}</h3>
                        <div class="section-content">${processed}</div>
                    </div>
                `;
                filtered[header].subitems.forEach(sub => {
                    const isTraea = sub.name.toLowerCase().includes('traea');
                    const subProcessed = processDetails(sub.details);
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

// Add to script.js (new function)

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function processTextForTooltips(text) {
  // Use placeholders to avoid chained replacements affecting inserted HTML
  const placeholders = [];
  let placeholderIndex = 0;

  // Helper to add placeholder for a match
  const addPlaceholder = (type, match) => {
    const ph = `{tip:${placeholderIndex}}`;
    placeholders.push({ ph, html: `<span class="hover${type.charAt(0).toUpperCase() + type.slice(1)}" data-tip="${type}:${match}">${match}</span>` });
    placeholderIndex++;
    return ph;
  };

  // Rules
  hoverRulesData.sort((a, b) => b.rule.length - a.rule.length).forEach(r => {
    const regex = new RegExp(`\\b${escapeRegExp(r.rule)}\\b`, 'gi');
    text = text.replace(regex, match => addPlaceholder('rule', match));
  });

  // Gear
  gearData.sort((a, b) => b.name.length - a.name.length).forEach(g => {
    const regex = new RegExp(`\\b${escapeRegExp(g.name)}\\b`, 'gi');
    text = text.replace(regex, match => addPlaceholder('gear', match));
  });

  // Abilities
  const abilityNames = [];
  abilitiesData.forEach(abs => {
    abs.forEach(a => abilityNames.push(a.name));
  });
  abilityNames.sort((a, b) => b.length - a.length).forEach(n => {
    const regex = new RegExp(`\\b${escapeRegExp(n)}\\b`, 'gi');
    text = text.replace(regex, match => addPlaceholder('ability', match));
  });

  // Proficiencies
  const profNames = [...profData.strike, ...profData.blast, ...profData.invoke].map(p => p.name);
  profNames.sort((a, b) => b.length - a.length).forEach(n => {
    const regex = new RegExp(`\\b${escapeRegExp(n)}\\b`, 'gi');
    text = text.replace(regex, match => addPlaceholder('prof', match));
  });

  // Ways
  const wayNames = waysData.map(w => w.name);
  wayNames.sort((a, b) => b.length - a.length).forEach(n => {
    const regex = new RegExp(`\\b${escapeRegExp(n)}\\b`, 'gi');
    text = text.replace(regex, match => addPlaceholder('way', match));
  });

  // Now replace all placeholders with actual HTML
  placeholders.forEach(({ ph, html }) => {
    text = text.replace(ph, html);
  });

  return text;
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


function setupSidebarScrollSync() {
    const sections = document.querySelectorAll('.section');
    const sidebarItems = document.querySelectorAll('.sidebar-item[data-header]');
    const sidebar = document.querySelector('.sidebar');

    // Create observer to detect visible sections
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Find matching sidebar item (header or subitem)
                const id = entry.target.id;
                const item = document.querySelector(`.sidebar-item[data-header="${id}"], .sidebar-item[data-subitem="${id.split('-').pop()}"]`);
                
                if (item) {
                    // Optional: Highlight active item
                    sidebarItems.forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                    
                    // Scroll sidebar to item if out of view
                    const rect = item.getBoundingClientRect();
                    const sidebarRect = sidebar.getBoundingClientRect();
                    if (rect.top < sidebarRect.top || rect.bottom > sidebarRect.bottom) {
                        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                }
            }
        });
    }, { rootMargin: '-20% 0px -60% 0px' });  // Adjust thresholds for "in view"

    sections.forEach(section => observer.observe(section));
}

window.addEventListener('dataLoaded', () => {
    renderSidebar(allData);
    renderSections(allData);
    setupSidebarScrollSync();  // Add this call here
});

document.getElementById('search').addEventListener('input', e => renderSections(allData, e.target.value.toLowerCase()));

// Rest unchanged

document.getElementById('search').addEventListener('input', e => renderSections(allData, e.target.value.toLowerCase()));
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// On load, check for ?section=...
window.addEventListener('load', () => {
    const section = getQueryParam('section');
    if (section) {
        const link = document.querySelector(`.nav-list a[data-section="${section}"]`);
        if (link) {
            link.click();  // Simulate click to activate the section and handle CSS enabling
        }
    }
});