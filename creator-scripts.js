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
  body: { priorityId: 'bodyPriority', pointsId: 'bodyAttributePoints', primaryValueId: 'bodyValue', subIds: ['mightValue', 'agilityValue', 'brawnValue'] },
  mind: { priorityId: 'mindPriority', pointsId: 'mindAttributePoints', primaryValueId: 'mindValue', subIds: ['willValue', 'witValue', 'resolveValue'] },
  spirit: { priorityId: 'spiritPriority', pointsId: 'spiritAttributePoints', primaryValueId: 'spiritValue', subIds: ['vigorValue', 'empathyValue', 'faithValue'] }
};

const MAX_READY_SLOTS = 5;
let waysData = [], profData = { strike: [], blast: [], invoke: [] }, gearData = [], abilitiesData = new Map();
let readyState = Array(MAX_READY_SLOTS).fill(null).map(() => ({ gear: '', amt: 1, stowed: [] }));
let domCache = {}; // Cache for frequent elements

async function loadAllData() {
  try {
    const [abilitiesRes, waysRes, charRes] = await Promise.all([
      fetch(ABILITIES_CSV_URL).then(r => r.ok ? r.text() : Promise.reject(`Abilities fetch failed: ${r.status}`)),
      fetch(WAYS_CSV_URL).then(r => r.ok ? r.text() : Promise.reject(`Ways fetch failed: ${r.status}`)),
      fetch(CHAR_CSV_URL).then(r => r.ok ? r.text() : Promise.reject(`Char fetch failed: ${r.status}`))
    ]);

    // Parse Abilities
    const abilitiesParsed = Papa.parse(abilitiesRes, { header: false, skipEmptyLines: true });
    if (abilitiesParsed.errors.length) throw new Error('Abilities parse error');
    const abilitiesRows = abilitiesParsed.data;
    const skills = abilitiesRows[0].slice(1).map(s => s.trim().toLowerCase());
    skills.forEach((skill, colIndex) => {
      let currentAbility = null;
      for (let r = 1; r < abilitiesRows.length; r++) {
        const key = (abilitiesRows[r][0] || '').trim();
        const value = (abilitiesRows[r][colIndex + 1] || '').trim();
        if (key.match(/^(Talent|Trick|Ritual) \d+ Name$/i)) {
          if (currentAbility) saveAbility(skill, currentAbility);
          const type = key.match(/^(Talent|Trick|Ritual)/i)?.[0].toLowerCase() || 'unknown';
          currentAbility = { type, name: value || `(Unnamed ${type})`, skill, details: {} };
        } else if (currentAbility && key) {
          const detailKey = key.split(' ').slice(2).join(' ');
          currentAbility.details[detailKey] = value;
        }
      }
      if (currentAbility) saveAbility(skill, currentAbility);
    });

    function saveAbility(skill, ability) {
      if (!abilitiesData.has(skill)) abilitiesData.set(skill, []);
      abilitiesData.get(skill).push(ability);
    }

    // Parse Ways
    const waysParsed = Papa.parse(waysRes, { header: false, skipEmptyLines: true });
    if (waysParsed.errors.length) throw new Error('Ways parse error');
    const waysRows = waysParsed.data;
    const includeRowIdx = waysRows.findIndex(row => row[0]?.toLowerCase().trim().includes('include'));
    if (includeRowIdx === -1) throw new Error('Missing "Include" row');
    const includeRow = waysRows[includeRowIdx];
    for (let col = 1; col < includeRow.length; col++) {
      if (includeRow[col]?.toUpperCase().trim() === 'TRUE' || includeRow[col]?.trim() === '1') {
        const props = {};
        waysRows.forEach(row => {
          const key = row[0]?.trim().toLowerCase();
          if (key) props[key] = row[col]?.trim();
        });
        const nameKey = Object.keys(props).find(k => k.includes('way name'));
        const reqSkillKey = Object.keys(props).find(k => k.includes('required skill'));
        const name = props[nameKey] || '';
        const reqSkill = props[reqSkillKey] || '';
        if (name && reqSkill) {
          const skillId = reqSkill.trim() === 'Any' ? 'Any' : SKILL_ID_MAP[reqSkill.trim()];
          if (skillId || reqSkill.trim() === 'Any') waysData.push({ name, props, reqSkill: reqSkill.trim(), skillId });
        }
      }
    }

    // Parse Char
    const charParsed = Papa.parse(charRes, { header: false, skipEmptyLines: true });
    if (charParsed.errors.length) throw new Error('Char parse error');
    const charRows = charParsed.data;
    const headers = charRows[0].map(h => h.trim());
    const dataByCategory = parseCsvByCategories(headers, charRows);

    gearData = dataByCategory.gear || [];
    const proficiencies = dataByCategory.proficiencies || [];
    profData.strike = proficiencies.filter(g => g.category.toLowerCase() === 'strike');
    profData.blast = proficiencies.filter(g => g.category.toLowerCase() === 'blast');
    profData.invoke = proficiencies.filter(g => g.category.toLowerCase() === 'invoke');

    initDomCache();
    populateRoleSelector();
    updateWayOptions();
    generateGearEntries();
    ['strike', 'blast', 'invoke'].forEach(type => populateProficiencySelectors(type));
    updateAbilityTables('talent');
    updateAbilityTables('trick');
  } catch (err) {
    document.getElementById('content-sections').innerHTML = `<div class="no-results">Error loading data: ${err.message}</div>`;
  }
}

function parseCsvByCategories(headers, rows) {
  const dataByCategory = {};
  const prefixMap = headers.reduce((map, h, idx) => {
    const parts = h.split(' ');
    if (parts.length >= 2) {
      const prefix = parts[0] + ' ';
      map[prefix] = map[prefix] || [];
      map[prefix].push({ header: h, idx });
    }
    return map;
  }, {});

  for (const [prefix, entries] of Object.entries(prefixMap)) {
    if (entries.length < 2) continue;
    const categoryKey = prefix.trim().toLowerCase();
    dataByCategory[categoryKey] = [];
    const configs = entries.map(({ header, idx: mainIdx }) => {
      const subCategory = header.replace(prefix, '').trim();
      const camelPrefix = prefix.replace(' ', '') + subCategory.replace(/\s+/g, '');
      const related = headers.reduce((acc, hh, ridx) => {
        if (hh.startsWith(camelPrefix) && hh !== header) acc.push({ suffix: hh.replace(camelPrefix, '').trim(), idx: ridx });
        return acc;
      }, []);
      return { mainIdx, subCategory, related };
    });

    for (let r = 1; r < rows.length; r++) {
      const row = rows[r];
      configs.forEach(config => {
        const name = row[config.mainIdx]?.trim();
        if (name) {
          const item = { name, category: config.subCategory };
          parseItemProps(item, config.related, row);
          dataByCategory[categoryKey].push(item);
        }
      });
    }
    dataByCategory[categoryKey].sort((a, b) => a.name.localeCompare(b.name));
  }
  return dataByCategory;
}

function parseItemProps(item, related, row) {
  related.forEach(rel => {
    let val = row[rel.idx]?.trim();
    if (!val) return;
    const suffixLower = rel.suffix.toLowerCase();
    if (suffixLower.includes('load') || suffixLower.includes('slots') || suffixLower.includes('used') || suffixLower.includes('cost')) {
      val = parseFloat(val) || 0;
    } else if (suffixLower.includes('bonus')) {
      val = parseInt(val) || 0;
    }
    item[suffixLower] = val;
  });
}

function initDomCache() {
  domCache = {
    charLvl: document.getElementById('charLvl'),
    skillPoints: document.getElementById('skillPoints'),
    abilityNumber: document.getElementById('abilityNumber'),
    remainingAbilities: document.getElementById('remainingAbilities'),
    totalLoadValue: document.getElementById('totalLoadValue'),
    roleSelector: document.getElementById('roleSelector'),
    talentAmount: document.getElementById('talentAmount'),
    tricksAmount: document.getElementById('tricksAmount')
  };
  Object.values(SKILL_ID_MAP).forEach(id => domCache[id] = document.getElementById(id));
  Object.values(ATTRIBUTE_GROUPS).forEach(g => {
    domCache[g.priorityId] = document.getElementById(g.priorityId);
    domCache[g.pointsId] = document.getElementById(g.pointsId);
    domCache[g.primaryValueId] = document.getElementById(g.primaryValueId);
    g.subIds.forEach(subId => domCache[subId] = document.getElementById(subId));
  });
}

function clampValue(el, min = 0) {
  el.value = Math.max(min, parseInt(el.value) || min);
  return parseInt(el.value);
}

function populateRoleSelector() {
  const sel = domCache.roleSelector;
  sel.innerHTML = '<option value="wayEmpty">Select Way</option>' + waysData.map(w => `<option value="${w.name}">${w.name}</option>`).join('');
}

function updateWayOptions() {
  const sel = domCache.roleSelector;
  waysData.forEach(way => {
    const qualified = way.reqSkill === 'Any' ? Object.values(SKILL_ID_MAP).some(id => domCache[id]?.value > 1) : domCache[way.skillId]?.value > 1;
    const opt = sel.querySelector(`option[value="${way.name}"]`);
    if (opt) opt.disabled = !qualified;
  });
}

function getQualifiedAbilities(type) {
  const result = [];
  Object.entries(SKILL_ID_MAP).forEach(([name, id]) => {
    if (domCache[id]?.value >= 2) {
      const abilities = abilitiesData.get(name.toLowerCase()) || [];
      result.push(...abilities.filter(a => a.type === type));
    }
  });
  return result;
}

function updateAbilitySelectors(type) {
  const qualified = getQualifiedAbilities(type);
  const selectors = document.querySelectorAll(`.${type}Selector`);
  selectors.forEach(sel => {
    const cur = sel.value;
    sel.innerHTML = `<option value="${type}Empty">Select ${type.charAt(0).toUpperCase() + type.slice(1)}</option>` +
      qualified.map(a => `<option value="${a.name}">${a.name}</option>`).join('');
    if (cur && qualified.some(a => a.name === cur)) sel.value = cur;
  });
}

function populateAbilityInfo(selectId, abilities, type) {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  const value = sel.value;
  const ability = abilities.find(a => a.name === value);
  const desc = document.getElementById(selectId + 'Description');
  if (!desc || !ability) {
    if (desc) desc.innerHTML = '';
    return;
  }
  desc.innerHTML = '';
  const order = ['keywords', 'description', 'passive', 'active', 'cost', 'trigger', 'effect', 'enhancements', 'augments'];
  Object.keys(ability.details).sort((a, b) => order.indexOf(a.toLowerCase()) - order.indexOf(b.toLowerCase())).forEach(key => {
    const div = document.createElement('div');
    div.className = type + key.charAt(0).toUpperCase() + key.slice(1);
    div.textContent = ability.details[key];
    desc.appendChild(div);
  });
}

function updateAbilityTables(type) {
  const amountInput = domCache[`${type}Amount`] || domCache[`${type}sAmount`];
  if (!amountInput) return;
  const currentAmount = clampValue(amountInput);
  const totalSlots = currentAmount + (type === 'trick' ? 1 : 0);
  const container = document.querySelector(`.${type}Wrapper`);
  if (!container) return;

  const saved = {};
  for (let i = 1; i <= 20; i++) {
    const sel = document.getElementById(`${type}${i}`);
    if (sel) saved[i] = sel.value;
  }

  container.querySelectorAll(`[id^="${type}sTable"]`).forEach(el => el.remove());

  for (let i = 1; i <= totalSlots; i++) {
    const wrapper = document.createElement('div');
    wrapper.id = `${type}sTable${i}`;
    wrapper.className = `${type}Ability`;
    wrapper.innerHTML = `
      <select id="${type}${i}" class="${type}Selector"></select>
      <div id="${type}${i}Description"></div>
    `;
    container.appendChild(wrapper);
  }

  updateAbilitySelectors(type);

  for (let i = 1; i <= totalSlots; i++) {
    const sel = document.getElementById(`${type}${i}`);
    if (sel && saved[i]) {
      sel.value = saved[i];
      populateAbilityInfo(sel.id, getQualifiedAbilities(type), type);
    }
  }

  calculateAbilities();
}

function populateRoleInfo(e) {
  const name = e.target.value;
  const way = waysData.find(w => w.name === name);
  if (!way) return;
  document.getElementById('wayTalentName').textContent = way.name;
  const desc = document.getElementById('wayTalentDesc');
  desc.innerHTML = '';
  ['passive', 'focus', 'critical effect'].forEach(key => {
    const valKey = Object.keys(way.props).find(k => k.toLowerCase().includes(key));
    const val = way.props[valKey];
    if (val) desc.innerHTML += `<div>${val}</div>`;
  });
  const attackSkill = way.props[Object.keys(way.props).find(k => k.includes('attack skill'))] || way.reqSkill;
  const skillId = SKILL_ID_MAP[attackSkill];
  if (skillId) {
    const sel = domCache[skillId];
    if (sel && sel.value < 2) {
      sel.value = '2';
      sel.dispatchEvent(new Event('change'));
    }
    if (['strikeSkillRank', 'blastSkillRank', 'invokeSkillRank'].includes(skillId)) {
      const profType = skillId.replace('SkillRank', '').toLowerCase();
      updateProficiencySelectors(profType, parseInt(sel.value) || 0);
    }
  }
  const primary = way.props[Object.keys(way.props).find(k => k.includes('primary attribute'))];
  if (primary) {
    const map = { 'Body': 'bodyPriority', 'Mind': 'mindPriority', 'Spirit': 'spiritPriority' };
    const pri = domCache[map[primary]];
    if (pri) {
      pri.value = '1';
      pri.dispatchEvent(new Event('change'));
    }
  }
  calculateAttributeValues();
  updateAttributeGroups();
  updateAllSkillModsAndPassives();
}

function calculateSkillPoints() {
  const level = parseInt(domCache.charLvl.value) || 1;
  const total = level * 3 + 9;
  let spent = 0;
  Object.values(SKILL_ID_MAP).forEach(id => spent += parseInt(domCache[id]?.value) || 0);
  domCache.skillPoints.textContent = total - spent;
}

function calculateAbilities() {
  const level = parseInt(domCache.charLvl.value) || 1;
  const tExtra = parseInt(domCache.talentAmount.value) || 1;
  const trExtra = parseInt(domCache.tricksAmount.value) || 1;
  if (domCache.abilityNumber) domCache.abilityNumber.textContent = tExtra + trExtra + 2;
  const remaining = level + 1 - Math.max(0, (tExtra - 1) + (trExtra - 1));
  if (domCache.remainingAbilities) domCache.remainingAbilities.textContent = Math.max(0, remaining);
}

function calculateAttributeValues() {
  const level = parseInt(domCache.charLvl.value) || 1;
  const pri = 2 + (level >= 2 ? 1 : 0) + (level >= 8 ? 1 : 0);
  const sec = 2 + (level >= 6 ? 1 : 0);
  const ter = 1 + (level >= 4 ? 1 : 0) + (level >= 10 ? 1 : 0);
  ['body', 'mind', 'spirit'].forEach(attr => {
    const priVal = domCache[`${attr}Priority`].value;
    const val = priVal === '1' ? pri : priVal === '2' ? sec : ter;
    domCache[`${attr}Value`].textContent = val;
  });
  updateSkillsForMod('bodyValue');
  updateSkillsForMod('mindValue');
  updateSkillsForMod('spiritValue');
}

function updateAttributeGroups() {
  Object.values(ATTRIBUTE_GROUPS).forEach(updateAttributeGroup);
}

function updateAttributeGroup(group) {
  const level = parseInt(domCache.charLvl.value) || 1;
  const pri = domCache[group.priorityId].value || '3';
  let points = 1 + Math.floor((level - 1) / 3);
  if (pri === '1') points = 3 + Math.floor((level + 1) / 3);
  if (pri === '2') points = 2 + Math.floor(level / 3);
  const max = parseInt(domCache[group.primaryValueId].textContent) || 0;
  let sum = 0;
  group.subIds.forEach(id => {
    const inp = domCache[id];
    if (inp) {
      inp.max = max;
      let v = Math.min(max, Math.max(0, parseInt(inp.value) || 0));
      inp.value = v;
      sum += v;
    }
  });
  const rem = points - sum;
  const el = domCache[group.pointsId];
  el.textContent = rem;
  el.classList.toggle('hidden', rem === 0);
  group.subIds.forEach(updateSkillsForMod);
}

function updateSkillModAndPassive(skillId) {
  const sel = domCache[skillId];
  if (!sel) return;
  const rank = parseInt(sel.value) || 0;
  const modId = SKILL_MOD_MAP[skillId];
  const modVal = parseInt(domCache[modId]?.value || domCache[modId]?.textContent || 0);
  const name = skillId.replace('SkillRank', '');
  const modEl = document.getElementById(name + 'Mod');
  if (modEl) modEl.textContent = modVal;
  const passiveEl = document.getElementById(name + 'Passive');
  if (passiveEl) passiveEl.textContent = 2 + rank + modVal;
}

function updateSkillsForMod(subId) {
  Object.entries(SKILL_MOD_MAP).forEach(([skillId, modId]) => {
    if (modId === subId) updateSkillModAndPassive(skillId);
  });
}

function updateAllSkillModsAndPassives() {
  Object.keys(SKILL_ID_MAP).forEach(updateSkillModAndPassive);
}

function populateProficiencySelectors(type) {
  const profs = profData[type] || [];
  for (let i = 1; i <= 5; i++) {
    const sel = document.getElementById(type + 'ProfSelector' + i);
    if (sel) {
      sel.innerHTML = '<option value="">Select Proficiency</option>' + profs.map(p => `<option value="${p.name}">${p.name}</option>`).join('');
    }
  }
}

function updateProficiencySelectors(type, rank) {
  for (let i = 1; i <= 5; i++) {
    const el = document.getElementById(type + 'ProfSelector' + i);
    if (el) el.hidden = i > rank;
  }
  populateProficiencySelectors(type);
}

function generateGearEntries() {
  const container = document.getElementById('gearEntries');
  container.innerHTML = '';
  for (let i = 1; i <= MAX_READY_SLOTS; i++) {
    const entry = document.createElement('div');
    entry.className = 'gearEntry';
    entry.innerHTML = `
      <select id="gear${i}Select" class="gearSelector">
        <option value="emptyStowedGearSlot">Ready Slot</option>
      </select>
      <input type="number" id="gear${i}Amt" class="gearAmtInputField" min="1" value="1"/>
      <div id="gear${i}Load" class="gearLoad"></div>
    `;
    container.appendChild(entry);

    const sel = document.getElementById(`gear${i}Select`);
    const grouped = gearData.reduce((acc, g) => {
      acc[g.category] = acc[g.category] || [];
      acc[g.category].push(g);
      return acc;
    }, {});
    Object.keys(grouped).sort().forEach(cat => {
      const optgroup = document.createElement('optgroup');
      optgroup.label = `-- ${cat} --`;
      grouped[cat].sort((a, b) => a.name.localeCompare(b.name)).forEach(g => {
        const opt = new Option(g.name, g.name);
        opt.dataset.load = g.baseload || g.load || 0;
        optgroup.appendChild(opt);
      });
      sel.appendChild(optgroup);
    });
  }
  calculateLoad();
}

function handleReadySelectChange(i) {
  const sel = document.getElementById(`gear${i}Select`);
  const newGearName = sel.value;
  const item = gearData.find(g => g.name === newGearName);
  const oldDetails = document.getElementById(`gear${i}Details`);
  if (oldDetails) oldDetails.remove();
  if (item && item.details && item.details.trim()) {
    const detailsDiv = document.createElement('div');
    detailsDiv.id = `gear${i}Details`;
    detailsDiv.className = 'hasDetails';
    detailsDiv.textContent = 'i';
    detailsDiv.dataset.details = item.details.trim();
    sel.parentNode.appendChild(detailsDiv);
  }
  const state = readyState[i - 1];
  const wasPack = state.gear && gearData.find(g => g.name === state.gear)?.category.toLowerCase() === 'packs';
  const isPack = item && item.category.toLowerCase() === 'packs';
  if (wasPack && !isPack) {
    state.stowed = [];
    renderStowed(i);
  }
  if (isPack && !wasPack) {
    const slots = item.stowedslots || 0;
    state.stowed = Array(slots).fill(null).map(() => ({ gear: '', amt: 1 }));
    renderStowed(i);
  }
  if (isPack && wasPack && state.gear !== newGearName) {
    const slots = item.stowedslots || 0;
    state.stowed = Array(slots).fill(null).map(() => ({ gear: '', amt: 1 }));
    renderStowed(i);
  }
  state.gear = newGearName;
  state.amt = parseInt(document.getElementById(`gear${i}Amt`).value) || 1;
  updateLoadForSlot(i);
  calculateLoad();
}

function renderStowed(i) {
  let container = document.getElementById(`stowed-container-${i}`);
  const gearEntry = document.querySelector(`.gearEntry:has(#gear${i}Select)`);
  const state = readyState[i - 1];
  if (state.stowed.length === 0) {
    if (container) container.remove();
    return;
  }
  if (!container) {
    container = document.createElement('div');
    container.id = `stowed-container-${i}`;
    container.className = 'stowed-container';
    gearEntry.parentNode.insertBefore(container, gearEntry.nextSibling);
  }
  container.innerHTML = '';
  const nonPacks = gearData.filter(g => g.category.toLowerCase() !== 'packs');
  state.stowed.forEach((s, j) => {
    const stowedIndex = j + 1;
    const entry = document.createElement('div');
    entry.className = 'gearEntry gearStowed';
    entry.innerHTML = `
      <select id="stowed-${i}-${stowedIndex}-select" class="gearSelector">
        <option value="emptyStowedGearSlot">Stowed Slot</option>
      </select>
      <input type="number" id="stowed-${i}-${stowedIndex}-amt" min="1" value="${s.amt}"/>
      <div id="stowed-${i}-${stowedIndex}-load" class="gearLoad"></div>
    `;
    container.appendChild(entry);

    const sel = entry.querySelector('select');
    const grouped = nonPacks.reduce((acc, g) => {
      acc[g.category] = acc[g.category] || [];
      acc[g.category].push(g);
      return acc;
    }, {});
    Object.keys(grouped).sort().forEach(cat => {
      const optgroup = document.createElement('optgroup');
      optgroup.label = `-- ${cat} --`;
      grouped[cat].sort((a, b) => a.name.localeCompare(b.name)).forEach(g => {
        const opt = new Option(g.name, g.name);
        opt.dataset.load = g.baseload || g.load || 0;
        optgroup.appendChild(opt);
      });
      sel.appendChild(optgroup);
    });

    sel.value = s.gear || '';
    const selectedItem = nonPacks.find(g => g.name === sel.value);
    if (selectedItem && selectedItem.details && selectedItem.details.trim()) {
      const detailsDiv = document.createElement('div');
      detailsDiv.id = `stowed-${i}-${stowedIndex}-details`;
      detailsDiv.className = 'hasDetails';
      detailsDiv.textContent = 'i';
      detailsDiv.dataset.details = selectedItem.details.trim();
      entry.appendChild(detailsDiv);
    }

    updateLoadForSlot(i, stowedIndex);
  });
}

function updateLoadForSlot(readyI, stowedJ = null) {
  if (stowedJ) {
    const sel = document.getElementById(`stowed-${readyI}-${stowedJ}-select`);
    if (!sel) return;
    const baseLoad = parseFloat(sel.options[sel.selectedIndex].dataset.load) || 0;
    const qty = readyState[readyI - 1].stowed[stowedJ - 1].amt;
    const total = baseLoad * qty;
    const loadDiv = document.getElementById(`stowed-${readyI}-${stowedJ}-load`);
    if (loadDiv) {
      loadDiv.textContent = total > 0 ? total.toFixed(2).replace(/\.?0+$/, '') : '';
      loadDiv.style.color = (qty > 1 && baseLoad > 1) ? 'red' : '';
    }
    return;
  }

  const state = readyState[readyI - 1];
  const item = gearData.find(g => g.name === state.gear);
  let total = 0;
  if (item) {
    const baseLoad = item.baseload || item.load || 0;
    total += baseLoad * state.amt;
    if (item.category.toLowerCase() === 'packs') {
      state.stowed.forEach(s => {
        const sItem = gearData.find(g => g.name === s.gear && g.category.toLowerCase() !== 'packs');
        if (sItem) total += (sItem.load || 0) * s.amt;
      });
    }
  }
  const loadDiv = document.getElementById(`gear${readyI}Load`);
  if (loadDiv) {
    loadDiv.textContent = total > 0 ? total.toFixed(2).replace(/\.?0+$/, '') : '';
    if (item && item.category.toLowerCase() === 'packs') loadDiv.style.color = total > (item.loadlimit || 0) ? 'red' : '';
  }
}

function calculateLoad() {
  let totalLoad = 0;
  readyState.forEach((_, idx) => {
    const i = idx + 1;
    const loadText = document.getElementById(`gear${i}Load`)?.textContent || '0';
    totalLoad += parseFloat(loadText) || 0;
  });
  domCache.totalLoadValue.textContent = totalLoad.toFixed(2).replace(/\.?0+$/, '');
}

document.addEventListener('change', e => {
  const t = e.target;

  if (t.matches('#talentAmount, #tricksAmount')) {
    const type = t.id.replace('Amount', '');
    clampValue(t);
    const value = parseInt(t.value);
    const totalId = `total${type.charAt(0).toUpperCase() + type.slice(1)}s`;
    const totalEl = document.getElementById(totalId);
    if (totalEl) totalEl.textContent = 1 + value;
    updateAbilityTables(type);
    calculateAbilities();
    return;
  }

  if (t.matches('.talentSelector, .trickSelector')) {
    const type = t.className.replace('Selector', '');
    populateAbilityInfo(t.id, getQualifiedAbilities(type), type);
    calculateAbilities();
    return;
  }

  if (t.matches('select[id$="SkillRank"]')) {
    updateSkillModAndPassive(t.id);
    updateWayOptions();
    calculateSkillPoints();
    const type = t.id.replace('SkillRank', '').toLowerCase();
    if (['strike', 'blast', 'invoke'].includes(type)) updateProficiencySelectors(type, parseInt(t.value) || 0);
    updateAbilitySelectors('trick');
    updateAbilitySelectors('talent');
    return;
  }

  if (t.matches('#bodyPriority, #mindPriority, #spiritPriority, #charLvl, input[id$="Value"][type="number"]')) {
    calculateAttributeValues();
    updateAttributeGroups();
    updateAllSkillModsAndPassives();
    calculateSkillPoints();
    calculateAbilities();
    if (t.matches('input[id$="Value"][type="number"]')) {
      const groupKey = /might|agility|brawn/.test(t.id) ? 'body' : /will|wit|resolve/.test(t.id) ? 'mind' : 'spirit';
      updateAttributeGroup(ATTRIBUTE_GROUPS[groupKey]);
      updateSkillsForMod(t.id);
    }
    return;
  }

  if (t.matches('#roleSelector')) {
    populateRoleInfo(e);
    return;
  }

  if (t.matches('[id^="gear"][id$="Select"], [id^="stowed-"][id$="-select"]')) {
    const match = t.id.match(/(gear|stowed-(\d+)-(\d+))-select/);
    if (match) {
      const [,, readyI, stowedJ] = match;
      if (stowedJ) {
        readyState[readyI - 1].stowed[stowedJ - 1].gear = t.value;
        const entry = t.parentNode;
        const oldDetails = document.getElementById(`stowed-${readyI}-${stowedJ}-details`);
        if (oldDetails) oldDetails.remove();
        const nonPacks = gearData.filter(g => g.category.toLowerCase() !== 'packs');
        const newItem = nonPacks.find(g => g.name === t.value);
        if (newItem && newItem.details && newItem.details.trim()) {
          const detailsDiv = document.createElement('div');
          detailsDiv.id = `stowed-${readyI}-${stowedJ}-details`;
          detailsDiv.className = 'hasDetails';
          detailsDiv.textContent = 'i';
          detailsDiv.dataset.details = newItem.details.trim();
          entry.appendChild(detailsDiv);
        }
        updateLoadForSlot(readyI, stowedJ);
      } else {
        handleReadySelectChange(readyI);
      }
      updateLoadForSlot(readyI);
      calculateLoad();
    }
    return;
  }

  if (t.matches('[id$="ProfSelector"]')) {
    const type = t.id.match(/(strike|blast|invoke)ProfSelector/)?.[1];
  }
});

document.addEventListener('input', e => {
  const t = e.target;
  if (t.matches('.gearAmtInputField, [id^="stowed-"][id$="-amt"]')) {
    const match = t.id.match(/(gear|stowed-(\d+)-(\d+))-(Amt|amt)/);
    if (match) {
      const [,, readyI, stowedJ] = match;
      clampValue(t, 1);
      const value = parseInt(t.value) || 1;
      if (stowedJ) {
        readyState[readyI - 1].stowed[stowedJ - 1].amt = value;
        updateLoadForSlot(readyI, stowedJ);
      } else {
        readyState[readyI - 1].amt = value;
      }
      updateLoadForSlot(readyI);
      calculateLoad();
    }
  }
});

const TOOLTIP_ID = 'universal-tooltip';

document.addEventListener('mouseover', e => {
  if (e.target.matches('.hasDetails') && e.target.dataset.details?.trim()) {
    let tooltip = document.getElementById(TOOLTIP_ID);
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.id = TOOLTIP_ID;
      document.body.appendChild(tooltip);
    }
    tooltip.textContent = e.target.dataset.details.trim();
    tooltip.classList.add('visible');
    const rect = e.target.getBoundingClientRect();
    tooltip.style.left = `${rect.left + window.scrollX + rect.width / 2}px`;
    tooltip.style.top = `${rect.bottom + window.scrollY + 8}px`;
  }
});

document.addEventListener('mouseout', e => {
  if (e.target.matches('.hasDetails')) {
    const tooltip = document.getElementById(TOOLTIP_ID);
    if (tooltip) tooltip.classList.remove('visible');
  }
});

interact('.draggable').draggable({
  inertia: true,
  autoScroll: true,
  listeners: {
    move: event => {
      const target = event.target;
      const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
      const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
      target.style.transform = `translate(${x}px, ${y}px)`;
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    }
  }
});

function initThirdParty() {
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
    const predefinedMap = {
      'short': 'First use or end of creators next turn',
      'round': 'Until end of creators next turn',
      'combat': 'End of the encounter',
      'vigilant': 'Attackers get -1 die and you have +1 Armor against AoE',
      'boosted': '+1 die to rolls'
    };
    tippy(el, {
      content: predefinedMap[term] || 'Unknown term',
      trigger: 'mouseenter focus',
      hideOnClick: false
    });
  });

  tippy('.hasDetails', {
    content: ref => ref.dataset.details || 'No details',
    trigger: 'mouseenter focus',
    hideOnClick: false
  });

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
        const draggableEl = instance.popper.querySelector('.draggable');
        if (draggableEl) {
          interact(draggableEl).draggable({
            inertia: true,
            autoScroll: true,
            listeners: {
              move: event => {
                const target = event.target;
                const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
                target.style.transform = `translate(${x}px, ${y}px)`;
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
              }
            }
          });
        }
      }
    });
  });
}

window.addEventListener('load', () => {
  loadAllData().then(() => {
    calculateSkillPoints();
    calculateAbilities();
    calculateAttributeValues();
    updateAttributeGroups();
    updateAllSkillModsAndPassives();
    ['strike', 'blast', 'invoke'].forEach(t => updateProficiencySelectors(t, parseInt(domCache[t + 'SkillRank']?.value) || 0));
    calculateLoad();
    initThirdParty();
  });
});