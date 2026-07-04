# /how-it-works.html — pre-rewrite audit (sections A + B only)

**Date:** 2026-06-18

## Files used

- `how-it-works.html` (481 lines)
- `pages/how-it-works.css` (173 lines)
- Shared: `allybi-tokens.css`, `allybi-base.css`, `allybi-components.css`, `allybi-header.css`, `allybi-footer.css`, `allybi-responsive.css`
- Shared JS: `language-switcher.js`, `allybi-header.js`, `allybi-animations.js`

## Section A — current state (lines 296–341)

`<section class="hiw-depth">` with:
- H2: "Uma pergunta no chat. Um fluxo completo por trás." (NOT "Uma pergunta vira um fluxo confirmado" as the spec § references — spec refers to the conceptual block, structure matches)
- Subtitle: "O Allybi não pula a revisão. Ele leva fonte, versão, mensagem e canal para sua confirmação."
- `.hiw-depth__map` 3-column flex layout: Entram | Allybi (center) | Saem with arrows
- **Entram column** (zone-h3 "Entram", sub "Fontes conectadas"): Outlook + OneDrive + SharePoint + Uploads icons
- **Center column** (zone-h3 "Allybi"): `.hiw-depth__mini-mock` containing "qual versão posso enviar?" + filename + "com fonte" chip
- **Saem column** (zone-h3 "Saem", sub "Envios com revisão"): "E-mail via Outlook / com confirmação" + "WhatsApp handoff / você envia no app"
- Arrow connectors between columns (`.hiw-depth__arrow` rendering `&rarr;`)
- Bottom row chips: "Busca contexto", "Compara versões", "Mostra fonte", "Prepara mensagem"
- Section wrapped in single white card (`.hiw-depth__map` has background, border, border-radius, box-shadow)

CSS issues:
- 3-column flex layout breaks at 800px; mobile (<800px) simply rotates arrows 90deg and stacks columns vertically — a compressed-desktop pattern that the spec forbids
- Chip strip has no real meaning; just decorative labels

## Section B — current state (lines 346–358)

`<section class="hiw-bridge">` with:
- H2: "Quer ver onde seu fluxo trava hoje?"
- Subtitle: "Mapeie em menos de 1 minuto onde o time perde certeza entre pedido, busca, versão, fonte, confirmação e envio."
- 2 CTAs centered:
  - Primary: "Mapear fluxo do time" → `diagnostico.html` ❌ (spec §32 requires `/diagnostico-questionario.html`)
  - Secondary: "Calcular meu tempo" → `tempo.html` ❌ (spec requires `/tempo-questionario.html`)
- Microcopy: "Nenhum documento é pedido. Resultado na hora."
- `text-align: center`, max-width 680px, no preview, no score, no result visualization
- Empty banner aesthetic — gives nothing away before the click

## Current CTAs and their destinations

| Section | CTA | Current href | Spec href |
|---|---|---|---|
| B | Mapear fluxo do time | `diagnostico.html` | `/diagnostico-questionario.html` |
| B | Calcular meu tempo | `tempo.html` | `/tempo-questionario.html` |

## Problems with mobile

- Section A: at <800px, the three columns stack but each retains its column-card framing, producing 3 stacked cards within the outer white card. This is a compressed-desktop pattern (forbidden by §22).
- Section B: centered text + flex column buttons — no recomposition, no preview, no flow map.

## Overflow / spacing

- Section A: outer `.hiw-depth__map` has `max-width: 1120px` and `border-radius: 16px`. At wide viewports (1920+) there's visible empty space around the card.
- Section B: large empty area below the microcopy line, especially on 1366+ viewports.
- No horizontal overflow on either at tested viewports.

## Existing animations

- `hiw-reveal` and `allybi-stagger` classes use `allybi-animations.js` IntersectionObserver pattern to fade elements in on scroll. These will be replaced by the new section's own reveal logic.

## Files that will be altered

| File | Change |
|---|---|
| `how-it-works.html` | Replace lines 293–358 (section A + section B markup) atomically with new structure per §7 and §33 |
| `pages/how-it-works.css` | Append new CSS for `.inside-flow-section` and `.diagnostic-bridge-section`; remove or neutralize `.hiw-depth*` and `.hiw-bridge*` blocks |
| `assets/inside-flow.js` (new) | Stepper controller (6 states, click + keyboard, no autoplay) + diagnostic reveal observer |
| Script tag added in `how-it-works.html` for `assets/inside-flow.js` |

## Files NOT altered

- Header (global), hero, story sections, final dark CTA "Faça o primeiro fluxo completo em minutos", footer
- All other pages
- Design tokens
- Shared components

## Baseline screenshots

`qa-screenshots/how-it-works-before/` — 11 full-page captures at the spec-mandated viewports.
