# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Prae System Compendium — an interactive single-page web app for the Prae tabletop RPG. Provides a rulebook viewer, character creator, and "Fables of Faen" lore section. Built with vanilla JavaScript, HTML, and CSS. No build system, package manager, module bundler, linter, or test framework.

## Development

Open `index.html` directly in a browser. All dependencies load from CDNs. No build or install step required. Data is fetched at runtime from public Google Sheets CSV exports.

## Architecture

All scripts execute in **global scope** (no module system) via sequential `<script>` tags in `index.html`.

### Data Layer (`data.js`)
Fetches 4 Google Sheets CSV feeds in parallel via PapaParse. Populates global structures: `allData` (rulebook sections), `abilitiesData` (Map of talents/tricks/rituals by skill), `waysData` (character classes), `profData`/`gearData`/`hoverRulesData` (proficiencies, equipment, tooltip definitions). Fires a custom `dataLoaded` event on `document` when complete.

### Rulebook UI (`script.js`)
Renders sidebar navigation from `allData` structure. Handles section rendering with inline tooltip spans, full-text search with live filtering, and Intersection Observer for sidebar scroll sync.

### Character Creator (`creator-scripts.js` — largest JS file)
Manages the character sheet: attribute priority assignment (Body/Mind/Spirit), skill rank system (6 levels: Unskilled→Master), dynamic ability slot generation (talents/tricks), Way (class) selection, and proficiency management. **Critical ordering**: skill rank changes must cascade to proficiency visibility, then to ability updates.

### Gear System (`gear-scripts.js`)
Handles ready slots (default 5), pack/container nesting, load/weight calculation, and stowed item management. Uses `readyState` array for slot tracking.

### Tooltip System (`tooltip-matcher.js` + `tooltip-manager.js`)
`tooltip-matcher.js` implements an **Aho-Corasick automaton** for efficient multi-term matching across rulebook text. `tooltip-manager.js` wraps Tippy.js for hover/click tooltip behavior with draggable modals for rituals. Supports rules, abilities, gear, proficiencies, ways, and static HTML content.

### Save/Load (`save-load.js`)
Serializes entire character state to JSON → Base64. Restoration follows dependency ordering (skills before abilities) to trigger correct cascading updates.

## Key Patterns

- **Distributed state**: Form inputs are the source of truth (no central store). Save/load serializes form state.
- **ID naming conventions**: `{skillName}SkillRank`, `{subAttr}Value`, `{type}ProfSelector{n}`. Lookup maps: `SKILL_ID_MAP`, `SKILL_MOD_MAP`, `ATTRIBUTE_GROUPS`.
- **Expression evaluation**: CSV data contains inline expressions like `|Might + Agility|` that `evaluateExpr()` resolves at render time using current skill values.
- **Event-driven updates**: Single `change` event listener delegates by target matching. Cascade order: skill → proficiency → ability.
- **Constants**: Global references use ALL_CAPS (e.g., `SKILL_ID_MAP`, `ATTRIBUTE_GROUPS`).
- **Function naming**: `calculate*()`, `populate*()`, `handle*()` / `on*()`.

## External Dependencies (all CDN)

- **PapaParse 5.4.1** — CSV parsing
- **Tippy.js 6.x / Popper.js 2.x** — tooltips
- **Interact.js 1.4** — drag/drop interactions

## Data Source Coupling

All content comes from Google Sheets CSV exports (4 feeds with specific `gid` values in `data.js`). Any schema change in the spreadsheets requires updating the corresponding parser in `data.js`.
