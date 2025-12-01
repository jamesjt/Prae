// tooltip-manager.js
class TooltipManager {
  static instances = new WeakMap();

  static init() {
    document.addEventListener("mouseover", (e) => {
      const el = e.target.closest("[data-tip]");
      if (!el || TooltipManager.instances.has(el)) return;

      const key = el.getAttribute("data-tip");
      const html = TooltipManager.resolve(key);

      const instance = tippy(el, {
        content: html,
        allowHTML: true,
        theme: "ruleTip",
        maxWidth: 350,
        placement: "top",
        animation: "shift-away-subtle",
        interactive: true,
      });

      TooltipManager.instances.set(el, instance);
    });
  }

  static resolve(key) {
    if (!key) return "";

    if (key.startsWith("rule:")) return TooltipManager.rule(key);
    if (key.startsWith("skill:")) return TooltipManager.skill(key);
    if (key.startsWith("ability:")) return TooltipManager.ability(key);
    if (key.startsWith("gear:")) return TooltipManager.gear(key);
    if (key.startsWith("expr:")) return TooltipManager.expr(key);

    return `(Unknown tooltip key: ${key})`;
  }

  static rule(key) {
    const rule = key.replace("rule:", "");
    const entry = hoverRulesData.find(r => r.rule === rule);
    return entry?.detail ?? `(Missing rule: ${rule})`;
  }

  static gear(key) {
    const name = key.replace("gear:", "");
    const item = gearData.find(g => g.name === name);
    if (!item) return `(Gear not found: ${name})`;

    return `
      <div class="tip-gear">
        <strong>${item.name}</strong><br>
        <div>${item.details}</div> 
        Load: ${item.load ?? 0}<br>
      </div>`;
  }

  static expr(key) {
    const expr = key.replace("expr:", "");
    return `|${expr}|`;
  }

  // Add to tooltip-manager.js (at the end of the class)

// Helper capitalize
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// In TooltipManager class:

static skill(key) {
  const name = key.replace("skill:", "");
  const skill = name.toLowerCase();
  const abs = abilitiesData.get(skill) || [];
  if (abs.length === 0) return `(Missing skill: ${name})`;
  let html = `
    <div class="tip-skill">
      <strong>${name}</strong><br>
  `;
  abs.forEach(a => {
    html += `<div>${capitalize(a.type)}: ${a.name}</div>`;
  });
  html += `</div>`;
  return html;
}

static ability(key) {
  const name = key.replace("ability:", "");
  let ability = null;
  for (let abs of abilitiesData.values()) {
    ability = abs.find(a => a.name === name);
    if (ability) break;
  }
  if (!ability) return `(Missing ability: ${name})`;
  let html = `
    <div class="tip-ability">
      <strong>${ability.name}</strong><br>
      <div>${capitalize(ability.type)}</div>
  `;
  const order = ['description', 'passive', 'active', 'cost', 'trigger', 'effect', 'enhancements', 'augments'];
  Object.keys(ability.details).sort((a, b) => {
    const ia = order.indexOf(a.toLowerCase());
    const ib = order.indexOf(b.toLowerCase());
    return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
  }).forEach(key => {
    let value = ability.details[key];
    html += `<div class="tip-${key.toLowerCase()}">${key}: ${value}</div>`;
  });
  html += `</div>`;
  return html;
}

static prof(key) {
  const name = key.replace("prof:", "");
  let prof = null;
  for (let type in profData) {
    prof = profData[type].find(p => p.name === name);
    if (prof) break;
  }
  if (!prof) return `(Missing proficiency: ${name})`;
  return `
    <div class="tip-prof">
      <strong>${name}</strong><br>
      <div>${prof.details}</div>
    </div>`;
}

static way(key) {
  const name = key.replace("way:", "");
  const way = waysData.find(w => w.name === name);
  if (!way) return `(Missing way: ${name})`;
  let html = `
    <div class="tip-way">
      <strong>${name}</strong><br>
  `;
  ['passive', 'focus', 'critical effect'].forEach(k => {
    const propKey = Object.keys(way.props).find(p => p.toLowerCase().includes(k));
    if (propKey && way.props[propKey]) {
      html += `<div>${capitalize(k)}: ${way.props[propKey]}</div>`;
    }
  });
  html += `</div>`;
  return html;
}

// Update resolve to include new types
static resolve(key) {
  if (!key) return "";
  if (key.startsWith("rule:")) return TooltipManager.rule(key);
  if (key.startsWith("skill:")) return TooltipManager.skill(key);
  if (key.startsWith("ability:")) return TooltipManager.ability(key);
  if (key.startsWith("gear:")) return TooltipManager.gear(key);
  if (key.startsWith("prof:")) return TooltipManager.prof(key);
  if (key.startsWith("way:")) return TooltipManager.way(key);
  if (key.startsWith("expr:")) return TooltipManager.expr(key);
  return `(Unknown tooltip key: ${key})`;
}
}