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
        trigger: 'mouseenter click', // Allow hover and click
        hideOnClick: false, // Persist on click
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
    if (key.startsWith("ritual:")) return TooltipManager.ritual(key);

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

  static ritual(key) {
    const name = key.replace("ritual:", "");
    // Find ritual ability (assume global abilitiesData)
    let ritual = null;
    for (const [skill, abilities] of abilitiesData) {
      ritual = abilities.find(a => a.type === 'ritual' && a.name === name);
      if (ritual) break;
    }
    if (!ritual) return `(Ritual not found: ${name})`;

    // Build HTML similar to other tooltips
    let html = `<div class="tip-ritual"><strong>${ritual.name}</strong><br>`;
    const order = ['keywords', 'cost', 'cast time', 'duration', 'effect', 'enhancements', 'augments', 'resist', 'notes'];
    order.forEach(k => {
      if (ritual.details[k]) {
        html += `<div class="ritual-${k.replace(/\s/g, '')}">${ritual.details[k]}</div>`;
      }
    });
    html += '</div>';
    return html;
  }
}