# HOW IT WORKS — Pre-Audit

## Files referenced by /how-it-works.html

- `how-it-works.html` — page markup
- `pages/how-it-works.css` — page-scoped styles
- `pages/home.css` — **leak** (imported but used elsewhere; will be dropped)
- `allybi-tokens.css`, `allybi-base.css`, `allybi-components.css` — global tokens/buttons
- `allybi-header.css`, `allybi-footer.css` — global chrome (preserve)
- `allybi-responsive.css` — global responsive bp helpers
- `language-switcher.js`, `allybi-header.js`, `allybi-animations.js` — global JS (preserve)
- `hero-sequence.js` — page-specific hero-scene animator (**will be dropped from this page**)
- `assets/inside-flow.js` — page-specific stepper (**will be dropped from this page**)
- Icons used locally: `assets/images/outlook-icon.svg`, `onedrive-icon.svg`, `sharepoint-icon.svg`, `whatsapp-icon.svg`. Upload icon → inline SVG.

## Current sections (to remove)

1. 2-col hero with right-side `hero-scene` mockup.
2. `.hiw-story` workflow storyboard — 6 alternating `.hiw-panel` text/visual panels (similar pattern to use-case pages → reuse violation).
3. `.hiw-depth` Entram / Allybi / Saem 3-zone map (forbidden by spec §1, §42).
4. `.hiw-bridge` diagnostic bridge to /diagnostico.html (uses forbidden CTA path per §41).
5. Final CTA.

## Repetitions with other pages (must be eliminated)

- `.hiw-panel` text/visual split — same pattern as `.ucl-feature__grid` / `.ucb-feature__split`.
- `hero-scene` workspace component — reused from use-case-* and old home hero.
- "Entram / Allybi / Saem" 3-zone diagram — explicitly forbidden by §1, §42.
- The `.hiw-hero` 2-col grid with text + visual is the same shape used originally on home.

## Forbidden terms currently present

- `Entram`, `Saem` (forbidden by §42) — in `.hiw-depth__zone`.
- `contrato_final_AGORA.pdf` — used in panels 3 & 6 mocks.
- Old "Uma pergunta vira um fluxo confirmado." header.

## Mobile / overflow / animation issues

- Panels collapse to single column but mocks keep desktop padding → cramped on 360.
- `hero-scene` workspace doesn't reflow well on narrow viewports.
- Existing `.hiw-reveal` observer threshold is 0.15 — works but doesn't differentiate copy vs visual delays.
- No reduced-motion guard at section level (only on `.hiw-reveal` CSS).

## Files that will be changed (this rebuild)

- `how-it-works.html` — full body replaced between header close and footer open.
- `pages/how-it-works.css` — full rewrite of all `.hiw-*` and old `.hw-*` rules with new spec.
- No other pages are touched.
- Global header/footer untouched.

## Assets imports being removed from this page

- `<link rel="stylesheet" href="pages/home.css">` (cross-page leak).
- `<script src="hero-sequence.js">` (page-specific to old hero-scene).
- `<script src="assets/inside-flow.js">` (page-specific to old stepper).
