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
        theme: "prae",
        maxWidth: 350,
        placement: "top",
        animation: "shift-away-subtle",
        interactive: false,
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

    return `(Unknown tooltip key: ${key})`;
  }

  static rule(key) {
    const rule = key.replace("rule:", "");
    const entry = hoverRulesData.find(r => r.rule === rule);
    return entry?.detail ?? `(Missing rule: ${rule})`;
  }

  static skill(key) {
    const name = key.replace("skill:", "");
    const id = SKILL_ID_MAP[name];
    if (!id) return `(Skill not found: ${name})`;

    const rank = document.getElementById(id)?.value ?? "?";
    const modId = SKILL_MOD_MAP[id];
    const modVal = document.getElementById(modId)?.value ?? "?";
    const passive = document.getElementById(name.toLowerCase() + "Passive")?.textContent ?? "?";

    return `
      <div class="tip-skill">
        <strong>${name}</strong><br>
        Rank: ${rank}<br>
        Modifier: ${modVal}<br>
        Passive: ${passive}
      </div>`;
  }

  static ability(key) {
    const [, type, name] = key.split(":");

    let found = null;
    abilitiesData.forEach(list => {
      const match = list.find(a => a.name === name && a.type === type.toLowerCase());
      if (match) found = match;
    });

    if (!found) return `(Ability not found: ${name})`;

    return `
      <div class="tip-ability">
        <strong>${found.name}</strong><br>
        <em>${type}</em><hr>
        ${Object.entries(found.details)
          .map(([k, v]) => `<div><strong>${k}:</strong> ${v}</div>`)
          .join("")}
      </div>`;
  }

  static gear(key) {
    const name = key.replace("gear:", "");
    const item = gearData.find(g => g.name === name);
    if (!item) return `(Gear not found: ${name})`;

    return `
      <div class="tip-gear">
        <strong>${item.name}</strong><br>
        Load: ${item.load ?? 0}<br>
        Slots: ${item.slots ?? 0}<br>
        ${item.details ? `<div>${item.details}</div>` : ""}
      </div>`;
  }
}
