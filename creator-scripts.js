const WAYS_CSV_URL = 'https://docs.google.com/spreadsheets/d/1OIAs6EFgLFKG3QN_b4Vtm48BwSFb7VwDxOXWhkotXz8/pub?gid=53126780&single=true&output=csv';
const CHAR_CSV_URL = 'https://docs.google.com/spreadsheets/d/1OIAs6EFgLFKG3QN_b4Vtm48BwSFb7VwDxOXWhkotXz8/pub?gid=715914535&single=true&output=csv';
const ABILITIES_CSV_URL = 'https://docs.google.com/spreadsheets/d/1OIAs6EFgLFKG3QN_b4Vtm48BwSFb7VwDxOXWhkotXz8/pub?gid=1439570479&single=true&output=csv';

const SKILL_ID_MAP = {
  'Athletics': 'athleticsSkillRank', 'Force': 'forceSkillRank', 'Acrobatics': 'acrobaticsSkillRank', 'Sneak': 'sneakSkillRank',
  'Endurance': 'enduranceSkillRank', 'Poise': 'poiseSkillRank', 'Lore': 'loreSkillRank', 'Tinkering': 'tinkeringSkillRank',
  'Deception': 'deceptionSkillRank', 'Insight': 'insightSkillRank', 'Awareness': 'awarenessSkillRank', 'Survival': 'survivalSkillRank',
  'Compel': 'compelSkillRank', 'Rouse': 'rouseSkillRank', 'Assure': 'assureSkillRank', 'Charm': 'charmSkillRank',
  'Calm': 'calmSkillRank', 'Command': 'commandSkillRank', 'Strike': 'strikeSkillRank', 'Blast': 'blastSkillRank', 'Invoke': 'invokeSkillRank'
};

const SKILL_MOD_MAP = {
  'athleticsSkillRank': 'mightValue', 'forceSkillRank': 'mightValue', 'acrobaticsSkillRank': 'agilityValue', 'sneakSkillRank': 'agilityValue',
  'enduranceSkillRank': 'brawnValue', 'poiseSkillRank': 'brawnValue', 'loreSkillRank': 'willValue', 'tinkeringSkillRank': 'willValue',
  'deceptionSkillRank': 'witValue', 'insightSkillRank': 'witValue', 'awarenessSkillRank': 'resolveValue', 'survivalSkillRank': 'resolveValue',
  'compelSkillRank': 'vigorValue', 'rouseSkillRank': 'vigorValue', 'assureSkillRank': 'empathyValue', 'charmSkillRank': 'empathyValue',
  'calmSkillRank': 'faithValue', 'commandSkillRank': 'faithValue', 'strikeSkillRank': 'bodyValue', 'blastSkillRank': 'mindValue', 'invokeSkillRank': 'spiritValue'
};

const ATTRIBUTE_GROUPS = {
  physical: { priorityId: 'bodyPriority', pointsId: 'physicalAttributePoints', primaryValueId: 'bodyValue', subIds: ['mightValue', 'agilityValue', 'brawnValue'] },
  mental: { priorityId: 'mindPriority', pointsId: 'mentalAttributePoints', primaryValueId: 'mindValue', subIds: ['willValue', 'witValue', 'resolveValue'] },
  spirit: { priorityId: 'spiritPriority', pointsId: 'spiritAttributePoints', primaryValueId: 'spiritValue', subIds: ['vigorValue', 'faithValue', 'empathyValue'] }
};

const MAX_READY_SLOTS = 5;
let waysData = [], profData = { strike: [], blast: [], invoke: [] }, gearData = [], abilitiesData = new Map(), readyState = Array(MAX_READY_SLOTS).fill().map(() => ({ gear: '', amt: 1, stowed: [] }));

async function loadAllData() {
  try {
    const [abilitiesRes, waysRes, charRes] = await Promise.all([
      fetch(ABILITIES_CSV_URL).then(r => r.ok ? r.text() : Promise.reject(r.status)),
      fetch(WAYS_CSV_URL).then(r => r.ok ? r.text() : Promise.reject(r.status)),
      fetch(CHAR_CSV_URL).then(r => r.ok ? r.text() : Promise.reject(r.status))
    ]);

    abilitiesData = parseAbilities(abilitiesRes);
    waysData = parseWays(waysRes);
    const { gear, proficiencies } = parseChar(charRes);
    gearData = gear || [];
    profData.strike = proficiencies.filter(p => p.category.toLowerCase() === 'strike');
    profData.blast = proficiencies.filter(p => p.category.toLowerCase() === 'blast');
    profData.invoke = proficiencies.filter(p => p.category.toLowerCase() === 'invoke');

    populateRoleSelector();
    updateWayOptions();
    generateGearEntries();
    ['strike', 'blast', 'invoke'].forEach(type => populateProficiencySelectors(type));
    updateAbilitySelectors('trick');
    updateAbilitySelectors('talent');
  } catch (err) {
    console.error('Data load error:', err);
  }
}

function parseCsv(text, options = {}) {
  const parsed = Papa.parse(text, { header: false, skipEmptyLines: true, dynamicTyping: false, ...options });
  if (parsed.errors.length) throw new Error('Parse error');
  return parsed.data;
}

function parseAbilities(text) {
  const rows = parseCsv(text);
  const skills = rows[0].slice(1).map(s => s.trim().toLowerCase());
  const map = new Map(skills.map(s => [s, []]));
  skills.forEach((skill, colIndex) => {
    let current = null;
    for (let r = 1; r < rows.length; r++) {
      const key = rows[r][0]?.trim() || '';
      const value = rows[r][colIndex + 1]?.trim() || '';
      if (key.match(/^(Talent|Trick|Ritual) \d+ Name$/i)) {
        if (current) map.get(skill).push(current);
        const type = key.match(/^(Talent|Trick|Ritual)/i)?.[0].toLowerCase() || 'unknown';
        current = { type, name: value || `(Unnamed ${type})`, skill, details: {} };
      } else if (current && key.includes(' ')) {
        const detailKey = key.split(' ').slice(2).join(' ');
        current.details[detailKey] = value;
      }
    }
    if (current) map.get(skill).push(current);
  });
  return map;
}

function parseWays(text) {
  const rows = parseCsv(text);
  const includeRowIdx = rows.findIndex(row => row[0]?.toLowerCase().trim().includes('include'));
  if (includeRowIdx === -1) return [];
  const includeRow = rows[includeRowIdx];
  return includeRow.slice(1).map((include, col) => {
    if (include.toUpperCase().trim() !== 'TRUE' && include.trim() !== '1') return null;
    const props = rows.reduce((acc, row) => {
      const key = row[0]?.trim().toLowerCase();
      if (key) acc[key] = row[col + 1]?.trim() || '';
      return acc;
    }, {});
    const nameKey = Object.keys(props).find(k => k.includes('way name'));
    const reqSkillKey = Object.keys(props).find(k => k.includes('required skill'));
    const name = props[nameKey];
    const reqSkill = props[reqSkillKey];
    if (!name || !reqSkill) return null;
    const skillId = reqSkill.trim() === 'Any' ? 'Any' : SKILL_ID_MAP[reqSkill.trim()];
    return skillId ? { name, props, reqSkill: reqSkill.trim(), skillId } : null;
  }).filter(Boolean);
}

function parseChar(text) {
  const rows = parseCsv(text);
  const headers = rows[0].map(h => h.trim());
  const dataByCategory = {};
  const prefixMap = headers.reduce((map, h, idx) => {
    const parts = h.split(' ');
    if (parts.length < 2) return map;
    const prefix = parts[0] + ' ';
    map[prefix] = map[prefix] || [];
    map[prefix].push({ header: h, idx });
    return map;
  }, {});

  for (const [prefix, entries] of Object.entries(prefixMap)) {
    if (entries.length < 2) continue;
    const categoryKey = prefix.trim().toLowerCase();
    dataByCategory[categoryKey] = [];
    const configs = entries.map(({ header, idx }) => {
      const subCategory = header.replace(prefix, '').trim();
      const camelPrefix = prefix.replace(' ', '') + subCategory.replace(/\s+/g, '');
      const related = headers.reduce((acc, hh, i) => {
        if (hh.startsWith(camelPrefix) && hh !== header) acc.push({ suffix: hh.replace(camelPrefix, '').trim(), idx: i });
        return acc;
      }, []);
      return { mainIdx: idx, subCategory, related };
    });

    for (let r = 1; r < rows.length; r++) {
      const row = rows[r];
      configs.forEach(config => {
        const name = row[config.mainIdx]?.trim();
        if (!name) return;
        const item = { name, category: config.subCategory.toLowerCase() };
        config.related.forEach(({ suffix, idx }) => item[suffix.toLowerCase()] = row[idx]?.trim() || '');
        dataByCategory[categoryKey].push(item);
      });
    }
  }
  return dataByCategory;
}

function populateRoleSelector() {
  const sel = document.getElementById('roleSelector');
  waysData.forEach(way => {
    const opt = document.createElement('option');
    opt.value = way.name;
    opt.text = way.name;
    sel.add(opt);
  });
}

function updateWayOptions() {
  // Implementation for updating based on selection, if needed
}

function generateGearEntries() {
  const container = document.getElementById('gearEntries');
  container.innerHTML = '';
  readyState.forEach((state, idx) => {
    const i = idx + 1;
    const entry = createGearEntry(i, state);
    container.appendChild(entry);
  });
  calculateLoad();
}

function createGearEntry(i, state) {
  const div = document.createElement('div');
  div.className = 'gearEntry';
  div.id = `gear${i}`;
  div.innerHTML = `
    <select id="gear${i}Select" class="gearSelector"></select>
    <input type="number" id="gear${i}Amt" min="1" value="${state.amt}">
    <div id="gear${i}Load" class="gearLoad"></div>
  `;
  populateGearOptions(div.querySelector('select'));
  return div;
}

function populateGearOptions(sel) {
  gearData.forEach(g => {
    const opt = document.createElement('option');
    opt.value = g.name;
    opt.text = g.name;
    opt.dataset.load = g.load || 0;
    sel.add(opt);
  });
}

function populateProficiencySelectors(type, rank = 0) {
  const container = document.getElementById(`${type}ProfContainer`);
  container.innerHTML = '';
  for (let i = 1; i <= rank; i++) {
    const sel = document.createElement('select');
    sel.id = `${type}ProfSelector${i}`;
    sel.className = 'profSelector';
    profData[type].forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.name;
      opt.text = p.name;
      sel.add(opt);
    });
    container.appendChild(sel);
  }
}

function updateAbilitySelectors(type) {
  // Similar templating for talents/tricks
}

function calculateLoad() {
  let total = 0;
  readyState.forEach((_, idx) => {
    const loadText = document.getElementById(`gear${idx + 1}Load`)?.textContent || '0';
    total += parseFloat(loadText) || 0;
  });
  document.getElementById('totalLoadValue').textContent = total.toFixed(2).replace(/\.?0+$/, '');
}

window.addEventListener('load', () => {
  loadAllData();
  tippy.setDefaultProps({
    theme: 'custom',
    arrow: true,
    animation: 'fade',
    allowHTML: true,
    interactive: true,
    maxWidth: 650,
    placement: 'right-start',
    offset: [0, 10],
    zIndex: 100
  });

  document.querySelectorAll('abbr').forEach(el => {
    const term = el.textContent.toLowerCase().trim();
    const predefined = {
      short: 'First use or end of creators next turn',
      round: 'Until end of creators next turn',
      combat: 'End of the encounter',
      // Add all predefined terms
      yon: 'Pronounced (Y-oh-n). Series of movements used for Conjurations'
    };
    tippy(el, { content: predefined[term] || 'Unknown term', trigger: 'mouseenter focus', hideOnClick: false });
  });

  tippy('.hasDetails', { content: ref => ref.dataset.details || 'No details', trigger: 'mouseenter focus', hideOnClick: false });

  document.querySelectorAll('.charInfoHover').forEach(trigger => {
    const contentEl = trigger.nextElementSibling;
    if (!contentEl) return;
    tippy(trigger, {
      content: contentEl.innerHTML,
      trigger: 'mouseenter focus click',
      allowHTML: true,
      interactive: true,
      hideOnClick: 'toggle',
      onShow(instance) {
        instance.popper.querySelector('.closeRitual')?.addEventListener('click', () => instance.hide());
        const draggable = instance.popper.querySelector('.draggable');
        if (draggable) {
          interact(draggable).draggable({
            inertia: true,
            autoScroll: true,
            listeners: { move: event => {
              const target = event.target;
              const x = (parseFloat(target.dataset.x) || 0) + event.dx;
              const y = (parseFloat(target.dataset.y) || 0) + event.dy;
              target.style.transform = `translate(${x}px, ${y}px)`;
              target.dataset.x = x;
              target.dataset.y = y;
            } }
          });
        }
      }
    });
  });

  interact('.draggable').draggable({
    inertia: true,
    autoScroll: true,
    listeners: { move: event => {
      const target = event.target;
      const x = (parseFloat(target.dataset.x) || 0) + event.dx;
      const y = (parseFloat(target.dataset.y) || 0) + event.dy;
      target.style.transform = `translate(${x}px, ${y}px)`;
      target.dataset.x = x;
      target.dataset.y = y;
    } }
  });
});