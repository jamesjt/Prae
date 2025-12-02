// tooltip-manager.js
class TooltipManager {
  static instances = new WeakMap();

  static init() {
    document.addEventListener("mouseover", (e) => {
      const el = e.target.closest("[data-tip]");
      if (!el || TooltipManager.instances.has(el)) return;

      const key = el.getAttribute("data-tip");
      let html = TooltipManager.resolve(key);

      let meta = null;
      let content;
      if (typeof html === 'object' && html.content && html.meta) {
        ({ content, meta } = html);
      } else {
        content = html;
      }

      const options = TooltipManager.getOptions(key, meta);

      const instance = tippy(el, { ...options, content });

      if (meta?.type === 'ritual' || meta?.type === 'static') {
        instance.popper.classList.add('draggable');
      }

      if (key.startsWith("ability:") || key.startsWith("static:")) {
        let pinned = false;
        el.addEventListener('mouseenter', () => {
          instance.show();
        });
        el.addEventListener('mouseleave', (ev) => {
          if (!pinned && !instance.popper.contains(ev.relatedTarget)) {
            instance.hide();
          }
        });
        instance.popper.addEventListener('mouseleave', (ev) => {
          if (!pinned && !el.contains(ev.relatedTarget)) {
            instance.hide();
          }
        });
        el.addEventListener('click', () => {
          pinned = true;
          instance.show();
        });
        const closeBtn = instance.popper.querySelector('.close-btn');
        if (closeBtn) {
          closeBtn.addEventListener('click', () => {
            pinned = false;
            instance.hide();
          });
        }
      }

      TooltipManager.instances.set(el, instance);
    });
  }

  static getOptions(key, meta = null) {
    const baseOptions = {
      allowHTML: true,
      theme: "ruleTip",
      maxWidth: 350,
      placement: "top",
      animation: "fade",
      interactive: true,
      delay: [200, 0],
      duration: [200, 0]
    };

    if (key.startsWith("ability:") || key.startsWith("static:")) {
      let abilityOptions = {
        ...baseOptions,
        trigger: 'manual',
        hideOnClick: false,
        maxWidth: 700
      };
      if (meta?.type === 'ritual' || meta?.type === 'static') {
        abilityOptions.arrow = false;
        abilityOptions.popperOptions = {
          modifiers: [
            {
              name: 'flip',
              options: {
                fallbackPlacements: ['bottom', 'left', 'right']
              }
            }
          ]
        };
      }
      return abilityOptions;
    } else if (key.startsWith("expr:")) {
      return { ...baseOptions, interactive: false }; // Example: Could add delay: [100, 0] in future
    } else if (key.startsWith("gear:")) {
      return { ...baseOptions }; // Example: Could add maxWidth: 400
    } else if (key.startsWith("rule:")) {
      return { ...baseOptions }; // Example: Could add theme: "ruleSpecific"
    } else if (key.startsWith("prof:")) {
      return { ...baseOptions };
    } else if (key.startsWith("way:")) {
      return { ...baseOptions };
    }

    return baseOptions; // Fallback for unknown
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

  // Helper capitalize (now static inside class)
  static capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static ability(key) {
    const name = key.replace("ability:", "");
    let ability = null;
    for (let abs of abilitiesData.values()) {
      ability = abs.find(a => a.name.toLowerCase() === name.toLowerCase());
      if (ability) break;
    }
    if (!ability) return `(Missing ability: ${name})`;
    const typeLower = ability.type.toLowerCase();
    const outerClass = `tip-ability-${typeLower}`;
    let html = `
      <div class="${outerClass}">
        <span class="close-btn">X</span>
    `;
    const order = ['name', 'description', 'passive', 'active', 'cost', 'trigger', 'effect', 'enhancements', 'augments'];
    Object.keys(ability.details).sort((a, b) => {
      const ia = order.indexOf(a.toLowerCase());
      const ib = order.indexOf(b.toLowerCase());
      return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
    }).forEach(key => {
      let value = ability.details[key];
      if (key.toLowerCase() === 'name') {
        html += `<div class="tip-name-${typeLower}">${value}</div>`;
      } else {
        html += `<div class="tip-${key.toLowerCase()}-${typeLower}">${key}: ${value}</div>`;
      }
    });
    html += `</div>`;
    return { content: html, meta: { type: typeLower } };
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
        html += `<div>${TooltipManager.capitalize(k)}: ${way.props[propKey]}</div>`;
      }
    });
    html += `</div>`;
    return html;
  }

  // Updated resolve (keep only this version)
  static resolve(key) {
    if (!key) return "";
    if (key.startsWith("rule:")) return TooltipManager.rule(key);
    if (key.startsWith("ability:")) return TooltipManager.ability(key);
    if (key.startsWith("gear:")) return TooltipManager.gear(key);
    if (key.startsWith("prof:")) return TooltipManager.prof(key);
    if (key.startsWith("way:")) return TooltipManager.way(key);
    if (key.startsWith("expr:")) return TooltipManager.expr(key);
    if (key.startsWith("static:")) {
      const id = key.replace("static:", "");
      const el = document.getElementById(id);
      if (el) {
        el.style.display = 'none';
        return { content: el.innerHTML, meta: { type: 'static' } };
      } else {
        return "(Missing static content)";
      }
    }
    return `(Unknown tooltip key: ${key})`;
  }
}