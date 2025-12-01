let allData = [];

// Count leading dashes
function getIndentLevel(text) {
    if (!text) return 0;
    const match = text.match(/^-+/);
    return match ? match[0].length : 0;
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

// Add to script.js (new function)

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function processTextForTooltips(text) {
  // Handle |expr| patterns
  text = text.replace(/\|([^|]+)\|/g, '<span class="hoverExpr" data-tip="expr:$1">$1</span>');

  // Rules from hoverRulesData
  hoverRulesData.sort((a, b) => b.rule.length - a.rule.length).forEach(r => {
    const regex = new RegExp(`\\b${escapeRegExp(r.rule)}\\b`, 'gi');
    text = text.replace(regex, '<span data-tip="rule:$&">$&</span>');
  });

  // Gear from gearData
  gearData.sort((a, b) => b.name.length - a.name.length).forEach(g => {
    const regex = new RegExp(`\\b${escapeRegExp(g.name)}\\b`, 'gi');
    text = text.replace(regex, '<span data-tip="gear:$&">$&</span>');
  });

  // Skills from SKILL_ID_MAP
  const skills = Object.keys(SKILL_ID_MAP);
  skills.sort((a, b) => b.length - a.length).forEach(s => {
    const regex = new RegExp(`\\b${escapeRegExp(s)}\\b`, 'gi');
    text = text.replace(regex, '<span data-tip="skill:$&">$&</span>');
  });

  // Abilities from abilitiesData
  const abilityNames = [];
  abilitiesData.forEach(abs => {
    abs.forEach(a => abilityNames.push(a.name));
  });
  abilityNames.sort((a, b) => b.length - a.length).forEach(n => {
    const regex = new RegExp(`\\b${escapeRegExp(n)}\\b`, 'gi');
    text = text.replace(regex, '<span data-tip="ability:$&">$&</span>');
  });

  // Proficiencies from profData
  const profNames = [...profData.strike, ...profData.blast, ...profData.invoke].map(p => p.name);
  profNames.sort((a, b) => b.length - a.length).forEach(n => {
    const regex = new RegExp(`\\b${escapeRegExp(n)}\\b`, 'gi');
    text = text.replace(regex, '<span data-tip="prof:$&">$&</span>');
  });

  // Ways from waysData
  const wayNames = waysData.map(w => w.name);
  wayNames.sort((a, b) => b.length - a.length).forEach(n => {
    const regex = new RegExp(`\\b${escapeRegExp(n)}\\b`, 'gi');
    text = text.replace(regex, '<span data-tip="way:$&">$&</span>');
  });

  return text;
}

// Update renderSections to use the processor
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
          const tipped = processTextForTooltips(line);
          return `<p class="indent-${level}">${tipped}</p>`;
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
            const tipped = processTextForTooltips(line);
            return `<p class="indent-${level}">${tipped}</p>`;
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
// script.js (excerpt)

// Remove your loadData() call and .then chain
// Instead, listen for event
window.addEventListener('dataLoaded', () => {
    renderSidebar(allData);
    renderSections(allData);
});

// Rest unchanged

document.getElementById('search').addEventListener('input', e => renderSections(allData, e.target.value.toLowerCase()));