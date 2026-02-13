class AhoCorasick {
  constructor(entries) {
    this.root = { next: new Map(), fail: null, output: [] };
    this.buildTrie(entries);
    this.buildFailures();
  }

  buildTrie(entries) {
    entries.forEach(entry => {
      let node = this.root;
      for (const ch of entry.term) {
        if (!node.next.has(ch)) {
          node.next.set(ch, { next: new Map(), fail: null, output: [] });
        }
        node = node.next.get(ch);
      }
      node.output.push(entry.payload);
    });
  }

  buildFailures() {
    const queue = [];
    this.root.fail = this.root;
    this.root.next.forEach(child => {
      child.fail = this.root;
      queue.push(child);
    });

    while (queue.length) {
      const current = queue.shift();
      current.next.forEach((child, ch) => {
        let fallback = current.fail;
        while (fallback !== this.root && !fallback.next.has(ch)) {
          fallback = fallback.fail;
        }
        if (fallback.next.has(ch) && fallback.next.get(ch) !== child) {
          child.fail = fallback.next.get(ch);
        } else {
          child.fail = this.root;
        }
        child.output = child.output.concat(child.fail.output);
        queue.push(child);
      });
    }
  }

  search(text, allowedTypes) {
    const lower = text.toLowerCase();
    const results = [];
    let node = this.root;
    for (let i = 0; i < lower.length; i++) {
      const ch = lower[i];
      while (node !== this.root && !node.next.has(ch)) {
        node = node.fail;
      }
      if (node.next.has(ch)) {
        node = node.next.get(ch);
      }
      if (node.output.length) {
        node.output.forEach(payload => {
          if (allowedTypes && !allowedTypes.has(payload.type)) {
            return;
          }
          const start = i - payload.length + 1;
          if (start < 0) return;
          if (!isWordBoundaryMatch(text, start, i)) return;
          results.push({ start, end: i, payload });
        });
      }
    }
    return results;
  }
}

function isWordChar(char) {
  return /[A-Za-z0-9_]/.test(char);
}

function isWordBoundaryMatch(text, start, end) {
  const before = start > 0 ? text[start - 1] : '';
  const after = end + 1 < text.length ? text[end + 1] : '';
  return (!before || !isWordChar(before)) && (!after || !isWordChar(after));
}

function selectNonOverlappingMatches(matches) {
  const ordered = matches.slice().sort((a, b) => {
    if (a.start !== b.start) return a.start - b.start;
    return (b.end - b.start) - (a.end - a.start);
  });
  const selected = [];
  let lastEnd = -1;
  ordered.forEach(match => {
    if (match.start >= lastEnd) {
      selected.push(match);
      lastEnd = match.end + 1;
    }
  });
  return selected;
}

function buildTooltipEntries() {
  const entries = [];
  const seen = new Set();
  const addEntry = (term, payload) => {
    if (!term) return;
    const key = `${term.toLowerCase()}|${payload.key}`;
    if (seen.has(key)) return;
    seen.add(key);
    entries.push({ term: term.toLowerCase(), payload });
  };

  hoverRulesData.forEach(({ rule }) => {
    addEntry(rule, { type: 'rule', key: `rule:${rule}`, length: rule.length });
  });

  gearData.forEach(item => {
    addEntry(item.name, { type: 'gear', key: `gear:${item.name}`, length: item.name.length });
  });

  const profs = [...profData.strike, ...profData.blast, ...profData.invoke];
  profs.forEach(prof => {
    addEntry(prof.name, { type: 'prof', key: `prof:${prof.name}`, length: prof.name.length });
  });

  waysData.forEach(way => {
    addEntry(way.name, { type: 'way', key: `way:${way.name}`, length: way.name.length });
  });

  abilitiesData.forEach(abilities => {
    abilities.forEach(ability => {
      const fullName = ability.name;
      addEntry(fullName, { type: 'ability', key: `ability:${fullName}`, length: fullName.length });
      const capitalizedSkill = ability.skill.charAt(0).toUpperCase() + ability.skill.slice(1);
      const suffix = ` (${capitalizedSkill})`;
      if (fullName.endsWith(suffix)) {
        const baseName = fullName.slice(0, -suffix.length);
        addEntry(baseName, { type: 'ability', key: `ability:${fullName}`, length: baseName.length });
      }
    });
  });

  bestiaryData.forEach(c => {
    if (c.Name) addEntry(c.Name, { type: 'creature', key: `creature:${c.Name}`, length: c.Name.length });
  });

  return entries;
}

function buildTooltipMatcher() {
  const entries = buildTooltipEntries();
  return new AhoCorasick(entries);
}

function applyTooltipMatcher(text, { allowedTypes, classMap }) {
  if (!window.tooltipMatcher) return text;
  const matches = window.tooltipMatcher.search(text, allowedTypes);
  if (!matches.length) return text;
  const selected = selectNonOverlappingMatches(matches);
  const placeholders = [];
  let output = '';
  let lastIndex = 0;
  selected.forEach((match, index) => {
    output += text.slice(lastIndex, match.start);
    const token = `{tip:${index}}`;
    const display = text.slice(match.start, match.end + 1);
    const cssClass = classMap[match.payload.type] || 'hoverTip';
    placeholders.push({
      token,
      html: `<span class="${cssClass}" data-tip="${match.payload.key}">${display}</span>`
    });
    output += token;
    lastIndex = match.end + 1;
  });
  output += text.slice(lastIndex);
  placeholders.forEach(({ token, html }) => {
    output = output.replace(token, html);
  });
  return output;
}

window.addEventListener('dataLoaded', () => {
  window.tooltipMatcher = buildTooltipMatcher();
});
