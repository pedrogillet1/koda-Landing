# ABOUT — Pre-Audit

## Files referenced by /about.html

- `about.html` — page markup
- `pages/about.css` — page-scoped styles
- Global CSS: `allybi-tokens.css`, `allybi-base.css`, `allybi-components.css`, `allybi-header.css`, `allybi-footer.css`, `allybi-responsive.css`
- Global JS: `language-switcher.js`, `allybi-header.js`, `allybi-animations.js`

## Sources of team / institutional data

Searched the entire repo for: `founder`, `cofounder`, `co-founder`, `team`, `leadership`, `founding`, `fundador`, `cofundador`, `equipe`, `headquarters`, `foundedYear`, `workMode`, `sede`, `fundac`.

**Result: no JSON / TS / JS data file with verified team member records.** No file contains all four required fields (full name + current role + local photo + verified professional link) for any person.

**Result: no JSON / TS / JS data file with `foundedYear`, `headquarters`, `workMode` fields.**

## Decisions per spec

- **Team section → render the FALLBACK block** defined in §32. No team grid will be rendered.
- **Facts strip → SKIP entirely**. The strip is conditional on all three fields existing; none exist.

## Current sections (to remove)

The existing /about.html contains a hero ("Criamos a Allybi…"), a "Por que Allybi existe" essay block, a "No que acreditamos" 6-item grid (clarity / control / evidence / calm / speed / privacy), a "Para o que otimizamos" feature list, and a final CTA. All of this is removed per §4.

## Forbidden claims removed

The existing copy contained: "Privacidade não é uma opção. É a arquitetura.", "respostas com fonte", references to "criptografados", and "isolados". All to be removed per §44.

## Files that will be changed

- `about.html` — full body rewrite. Head, header, mobile menu, footer preserved.
- `pages/about.css` — full rewrite.
- `ABOUT_PRE_AUDIT.md`, `ABOUT_REDESIGN_REPORT.md` — created.

No other pages touched.
