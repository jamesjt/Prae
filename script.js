// script.js
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
                element.classList.remove('highlight');
                void element.offsetWidth; // Force reflow to restart animation
                element.classList.add('highlight');
                element.addEventListener('animationend', () => element.classList.remove('highlight'), { once: true });
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
                    let subProcessed = processDetails(sub.details);
                    let imageHtml = '';
                    const way = waysData.find(w => w.name.toLowerCase() === sub.name.toLowerCase());
                    if (way && way.props.image) {
                        imageHtml = `<img src="images/rulebookArt/${way.props.image}" alt="${sub.name} Art" class="way-image">`;
                    }
                    if (way) {
                        const primary = way.props['primary attribute'] || '';
                        const attackMap = { 'Body': 'Strike', 'Mind': 'Blast', 'Spirit': 'Invoke' };
                        const attackSkill = attackMap[primary] || '';
                        // Inject required skill
                        if (way.reqSkill) {
                            subProcessed = subProcessed.replace(/(<div><b>Suggested Skills:<\/b>.*?<\/div>)/, `<div><b>Required Skill:</b> ${way.reqSkill}</div>$1`);
                        }
                        // Inject primary attribute
                        if (primary) {
                            subProcessed = subProcessed.replace(/(<div><b>Suggested Skills:<\/b>.*?<\/div>)/, `$1<div><b>Primary Attribute:</b> ${primary}</div>`);
                        }
                        if (attackSkill) {
                            subProcessed = subProcessed.replace(/(<div><b>Primary Attribute:<\/b>.*?<\/div>)/, `$1<div><b>Attack Skill:<\/b> ${attackSkill}</div>`);
                        }
                        const proficiency = way.props['proficiency'] || '';
                        if (proficiency) {
                            subProcessed = subProcessed.replace(/(<div><b>Attack Skill:<\/b>.*?<\/div>)/, `$1<div><b>Granted Proficiency:<\/b> ${proficiency}</div>`);
                        }
                    }
                    html += `
                        <div class="section ${isTraea?'traea-section':''}" id="${(header + '-' + sub.name).replace(/\s+/g, '-')}">
                            <h3>${sub.name}</h3>
                            ${imageHtml}
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

function processTextForTooltips(text) {
  const classMap = {
    rule: 'hoverRule',
    gear: 'hoverGear',
    ability: 'hoverAbility',
    prof: 'hoverProf',
    way: 'hoverWay'
  };
  return applyTooltipMatcher(text, { classMap });
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

        if (target === 'character-creator') {
            document.getElementById('creator-css').disabled = false;
        }
    });
});


function setupSidebarScrollSync() {
    const sections = document.querySelectorAll('.section');
    const sidebarItems = document.querySelectorAll('.sidebar-item[data-header]');
    const sidebar = document.querySelector('.sidebar');

    // Pre-build mapping from section ID to sidebar item
    const sectionToSidebarItem = new Map();
    sections.forEach(section => {
        const id = section.id;
        const item = document.querySelector(`.sidebar-item[data-header="${id}"], .sidebar-item[data-subitem="${id.split('-').pop()}"]`);
        if (item) sectionToSidebarItem.set(id, item);
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = sectionToSidebarItem.get(entry.target.id);
                if (item) {
                    sidebarItems.forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                    const rect = item.getBoundingClientRect();
                    const sidebarRect = sidebar.getBoundingClientRect();
                    if (rect.top < sidebarRect.top || rect.bottom > sidebarRect.bottom) {
                        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                }
            }
        });
    }, { rootMargin: '-20% 0px -60% 0px' });

    sections.forEach(section => observer.observe(section));
}

// New function to add per-field classes to rulebook abilities
function addAbilityFieldClasses() {
    // Define type-specific field orders based on spreadsheet structure
    const fieldOrders = {
        talent: ['Name', 'Keywords', 'Description', 'Passive', 'Active', 'Effect'],
        trick: ['Name', 'Keywords', 'Description', 'Cost', 'EffectSm', 'EffectBig', 'ManaUse'],
        ritual: ['Name', 'Trick', 'Keywords', 'Cost', 'CastTime', 'Duration', 'ShortDescEffect', 'Effect', 'Enhancements', 'Augments', 'Resist', 'Description']
    };

    const abilityDivs = document.querySelectorAll('.ability-talent, .ability-trick, .ability-ritual');
    abilityDivs.forEach(div => {
        const type = div.className.replace('ability-', '');
        const orders = fieldOrders[type] || [];
        const fieldClasses = orders.map(f => `${type}-${f.toLowerCase()}`);
        const children = div.children;
        fieldClasses.forEach((className, idx) => {
            if (children[idx]) {
                children[idx].classList.add(className);
            }
        });
    });
}

window.addEventListener('dataLoaded', () => {
    renderSidebar(allData);
    renderSections(allData);
    setupSidebarScrollSync();  // Add this call here
    addAbilityFieldClasses(); // Post-render class addition
});

let searchTimeout;
const searchInput = document.getElementById('search');
const searchCounter = document.getElementById('search-counter');
searchInput.addEventListener('input', e => {
    const term = e.target.value.toLowerCase();
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        renderSections(allData, term);
        updateSearchCounter(term);
    }, 250);
    searchInput.classList.toggle('search-active', term.length > 0);
});

function updateSearchCounter(term) {
    if (!term) {
        searchCounter.textContent = '';
        return;
    }
    const total = Object.keys(allData).length;
    const filtered = Object.keys(filterData(allData, term)).length;
    searchCounter.textContent = `Showing ${filtered} of ${total} sections`;
}

// Back-to-top button
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    backToTop.style.display = window.scrollY > 400 ? 'block' : 'none';
});
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Sidebar expand/collapse all
document.getElementById('sidebar-toggle').addEventListener('click', function() {
    const subitems = document.querySelectorAll('.subitems');
    const headers = document.querySelectorAll('.section-header');
    const expanding = this.textContent === 'Expand All';
    subitems.forEach(s => s.classList.toggle('visible', expanding));
    headers.forEach(h => h.classList.toggle('expanded', expanding));
    this.textContent = expanding ? 'Collapse All' : 'Expand All';
});

// Keyboard shortcuts
document.addEventListener('keydown', e => {
    if (e.key === '/' && !e.target.matches('input, textarea, select')) {
        e.preventDefault();
        searchInput.focus();
    }
    if (e.key === 'Escape' && document.activeElement === searchInput) {
        searchInput.value = '';
        searchInput.classList.remove('search-active');
        searchCounter.textContent = '';
        renderSections(allData);
        searchInput.blur();
    }
});

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
