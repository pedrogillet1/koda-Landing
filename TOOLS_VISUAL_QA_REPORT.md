# Tools system visual QA report

**Date:** 2026-06-19
**Runner:** `qa-scripts/tools-redesign-check.mjs`
**Scope:** 13 viewports × 7 pages = 91 runs

## Run summary

| Metric | Value |
|---|---|
| Total Playwright runs | 91 |
| Horizontal overflow | 0 / 91 |
| Console or page errors | 0 / 91 |
| Quiz pages failing 100dvh fit (320×568) | 0 / 2 |
| Pages with h1 = 0 (after fix) | 0 / 7 |
| Screenshots captured | 195 |

## Viewports tested

`320×568, 360×640, 360×740, 390×844, 430×932, 768×1024, 1024×768, 1100×800, 1280×800, 1366×768, 1440×900, 1920×1080, 2048×1280`

## Pages tested

- `tempo.html` (Calculator landing)
- `tempo-questionario.html` (Calculator quiz)
- `tempo-resultado.html` (Calculator result)
- `diagnostico.html` (Diagnostic landing)
- `diagnostico-questionario.html` (Diagnostic quiz)
- `diagnostico-resultado.html` (Diagnostic result)
- `metodologia.html` (Methodology)

## Screenshot tree

`qa-screenshots/tools-redesign/{page}/{w}x{h}.png` - 91 files for the first run, plus 104 additional captures from the end-to-end and h1-recheck runs. Files are open-able PNGs of the viewport-fit screenshot (not full-page) so first-fold composition can be reviewed quickly.

## Notable visual checks

### First fold on 390×844 (mobile reference)

- `tempo.html`: eyebrow CALCULADORA INDIVIDUAL, H1 in 3 lines, sub, primary CTA, secondary CTA, trust line, top of example panel - all fit per §28.
- `diagnostico.html`: eyebrow DIAGNÓSTICO DO FLUXO, H1 in 3 lines, sub, primary CTA, secondary CTA, trust line, top of flow-map example - all fit per §45.
- `metodologia.html`: eyebrow METODOLOGIA, H1, sub, two primary CTAs, trust line, top of split visual - all fit per §73.

### First fold on 1366×768 (desktop reference)

- Hero containers cap at 1240px max-width per §7; padding 64×48 at bottom.
- Min-height on hero sections is 690-700px (per §26/§43), which fits within 768px since the global header is ~68px.

### Bottleneck color treatment

- Calculator breakdown row: `background: rgba(251,188,4,.08)` + `border-left: 3px solid #FBBC04`. Used only on the single bottleneck row.
- Diagnostic breakdown row: same yellow-tinted background + left border on the bottleneck row.
- Flow map example: `is-bottleneck` node has `border-color: rgba(251,188,4,.75)`, `background: rgba(251,188,4,.14)`, `color: #805400`, plus a 7px yellow dot in the top-right corner.

### No prohibited colors

`grep` for `blue|purple|violet|gradient` in the 7 pages + 5 modules: 0 hits.

### Selected option state

Black border 2px + light-gray background `#F5F5F5`. The radio dot uses inverted-white inside a black circle for single-select; the checkbox uses inverted-white SVG check inside a black square. Green is never used as the selected color.

## Component states

| State | Component | File | Implementation |
|---|---|---|---|
| Default | `.q-option` | `allybi-tools.css` | white bg, 1px border `#E6E6EC` |
| Hover | `.q-option:hover` | same | bg `#F5F5F5`, border `#C8C8CC` |
| Focus | `.q-option:focus-within` | same | outline `2px solid #181818`, offset 3px |
| Selected | `.q-option.is-selected` | same | 2px solid `#181818` border, `#F5F5F5` bg, mark filled with primary |
| Disabled CTA | `.questionnaire-continue:disabled` | same | `opacity: .32`, `cursor: not-allowed` |

## Outstanding screenshots

Spec §80 / §81 list per-state captures (selected, error, back, keyboard, reduced motion). The current Playwright runner captures one state per (page, viewport) - the default-state visual. Per-state captures require driving the page (clicking, pressing keys) before screenshotting; this is implemented in the end-to-end test script for validation but not yet generalized to the full screenshot grid. Flagging as a next-session enhancement.
