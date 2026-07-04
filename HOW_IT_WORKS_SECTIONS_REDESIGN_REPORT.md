# /how-it-works.html — sections A + B redesign delivery report

**Date:** 2026-06-18
**Spec:** v8 — 55 sections, two-section structural rewrite

## 1. Arquivos alterados

| File | Status | Notes |
|---|---|---|
| `how-it-works.html` | sections A + B rewritten | Lines 293–358 of old file replaced; head/header/hero/story panels/final dark CTA/footer preserved (lines 1–292 + 363→onward) |
| `pages/how-it-works.css` | new block appended | Lines 174→1314 added; legacy `.hiw-depth*` and `.hiw-bridge*` rules left in place but inert (no DOM targets remain) |
| `assets/inside-flow.js` | **NEW** (62 lines) | Stepper controller + keyboard handler |

Script tag for `assets/inside-flow.js` injected after `hero-sequence.js` in `how-it-works.html`.

**Pages NOT touched:** all other `.html` files, design tokens, shared header/footer/components, global responsive sweeps, language-switcher, allybi-animations.

## 2. Componentes criados

**Section A — `#inside-allybi-flow.inside-flow-section`:**
- `.inside-flow-container` / `.inside-flow-header` / `.inside-flow-eyebrow` / `.inside-flow-subtitle`
- `.inside-flow-desktop` (≥1100px: 270px stepper + 1fr stage)
- `.inside-flow-stepper` (`role="tablist"`) with 6× `.inside-flow-step` (each: `role="tab"`, `.inside-flow-step-indicator`, `.inside-flow-step-num`, `.inside-flow-step-title`, `.inside-flow-step-desc`)
- `.inside-flow-stage` (height 580px, role="tabpanel", aria-live="polite") with topbar + body
- 6× `.inside-flow-state` (absolutely positioned, opacity/visibility/transform transitions, only one `.is-active` at a time)
- State 01: `.inside-flow-source-grid` (2×2) with 4× `.inside-flow-source`
- State 02: `.inside-flow-chips` + `.inside-flow-question` + `.inside-flow-helper`
- State 03: faded question + `.inside-flow-answer` with eyebrow / main / `.inside-flow-answer-source` (dot + text) / `.inside-flow-answer-status` ("Fonte visível")
- State 04: 2× `.inside-flow-version` (warn + ok) + `.inside-flow-diff` + `.inside-flow-confirmed`
- State 05: `.inside-flow-draft` with 5 rows + `.inside-flow-draft-button` ("Revisar antes de enviar", non-interactive)
- State 06: `.inside-flow-review` with `.inside-flow-review-rows` (5 rows + checks) + `.inside-flow-review-status` ("Revisão completa") + `.inside-flow-review-button` ("Enviar via Outlook", non-interactive) + `.inside-flow-review-handoff` ("WhatsApp handoff: abrir conversa com mensagem pronta.")
- `.inside-flow-mobile` (<1100px) with 6× `.inside-flow-chapter` (`.inside-flow-chapter-num` / `.inside-flow-chapter-title` / `.inside-flow-chapter-desc` / `.inside-flow-chapter-visual--*`)

**Section B — `#flow-diagnostic-bridge.diagnostic-bridge-section`:**
- `.diagnostic-bridge-container` / `.diagnostic-bridge-copy` (eyebrow + h2 + subtitle + actions + trust)
- `.diagnostic-bridge-actions` with `.diagnostic-bridge-primary` (dark CTA → `/diagnostico-questionario.html`) + `.diagnostic-bridge-secondary` (outlined mobile / text-link desktop → `/tempo-questionario.html`)
- `.diagnostic-result-proof` (white card right column on desktop, below copy on mobile) containing:
  - `.diagnostic-result-label` ("EXEMPLO DE RESULTADO")
  - `.diagnostic-result-score-row` with `.diagnostic-result-score` ("68/100", 48px mobile / 54px desktop) + label + `.diagnostic-result-badge` ("Maior gargalo: fonte invisível")
  - `.diagnostic-result-flow` (vertical mobile / horizontal 11-track grid desktop) with 6× `.diagnostic-result-node` (Pedido / Busca / Versão / Fonte (`--warn` + marker dot) / Confirmação / Envio)
  - `.diagnostic-result-insight` (title + body + status pill)

## 3. Código antigo removido

**Section A removals:**
- `<section class="hiw-depth">` entire block
- H2 "Uma pergunta no chat. Um fluxo completo por trás." (substituted for "Veja o que acontece entre perguntar e enviar.")
- `.hiw-depth__map` — single white card wrapping 3 columns + center mockup
- `.hiw-depth__zone--center` mini-mock with "qual versão posso enviar?" / filename / "com fonte" chip
- "Entram" column h3 + sub "Fontes conectadas" + Outlook/OneDrive/SharePoint/Uploads icon list
- "Allybi" center column h3 + mini-mock
- "Saem" column h3 + sub "Envios com revisão" + Outlook + WhatsApp items
- `.hiw-depth__arrow` arrow connectors (`&rarr;`)
- `.hiw-depth__bottom` chip strip: "Busca contexto", "Compara versões", "Mostra fonte", "Prepara mensagem"

**Section B removals:**
- `<section class="hiw-bridge">` centered banner
- H2 "Quer ver onde seu fluxo trava hoje?" (substituted for "Onde esse caminho trava no seu time?")
- Primary button → `diagnostico.html` (substituted with `/diagnostico-questionario.html`)
- Secondary link → `tempo.html` (substituted with `/tempo-questionario.html`)
- Old microcopy "Nenhum documento é pedido. Resultado na hora." (substituted with "Nenhum arquivo é pedido. Resultado na hora.")
- Centered text-align, max-width 680px, no preview, no flow map, no score

## 4. Screenshots antes e depois

**Antes:** `qa-screenshots/how-it-works-before/` — 11 full-page captures at 360×640, 360×740, 390×844, 430×932, 768×1024, 1024×768, 1280×800, 1366×768, 1440×900, 1920×1080, 2048×1280.

**Depois:** `qa-screenshots/how-it-works-redesign/` organized into 4 subfolders:
- `inside-flow/` — 6 desktop states + keyboard_focus + reduced_motion
- `diagnostic-bridge/` — desktop_full + desktop_preview + cta_hover + cta_focus + reduced_motion + mobile_360/390/430
- `mobile/` — section_a_360/390/430 (full section captures)
- `full-page/` — 12 viewports (10 spec + 1100 + 2048)

## 5. Screenshots dos seis estados desktop

`qa-screenshots/how-it-works-redesign/inside-flow/`:
- `desktop_state_01.png` — Fontes do workspace, 4 source cards (Outlook/OneDrive/SharePoint/Uploads), "Conectado" status each
- `desktop_state_02.png` — source chips row + dark question bubble "qual versão posso enviar ao cliente?" + helper "Pergunta em linguagem normal. Sem comando."
- `desktop_state_03.png` — faded question + green-bordered answer card "Use contrato_final_AGORA.pdf." + green dot + SharePoint source + "Fonte visível" pill
- `desktop_state_04.png` — "Comparar versões" + 2 version rows (warn: contrato_final_v3.pdf "Confirmar" yellow / ok: contrato_final_AGORA.pdf "Fonte confirmada" green) + diff "Cláusula 12.4 atualizada" + "Versão confirmada" pill
- `desktop_state_05.png` — "MENSAGEM PREPARADA PARA REVISÃO" + draft panel with Destinatário / Assunto / Mensagem / Arquivo / Fonte rows + dark "Revisar antes de enviar" button
- `desktop_state_06.png` — REVISÃO ANTES DO ENVIO + 5 rows with green checks (Destinatário / Mensagem / Arquivo / Fonte / Canal) + "Revisão completa" pill + dark "Enviar via Outlook" button + "WhatsApp handoff: abrir conversa com mensagem pronta." line

## 6. Screenshots dos seis capítulos mobile

`qa-screenshots/how-it-works-redesign/mobile/section_a_390.png` (and 360/430 variants) — full section capture showing 6 vertical chapters with:
- 01 Conecte ou suba + 2×2 sources grid
- 02 Pergunte no chat + dark question bubble
- 03 Receba com fonte + white answer card with green dot + source line
- 04 Compare e confirme + 2 stacked version rows
- 05 Prepare o envio + draft fields panel with dark button
- 06 Revise e envie + review fields + status + dark Outlook button + WhatsApp handoff line

## 7. Screenshots do diagnóstico desktop

`qa-screenshots/how-it-works-redesign/diagnostic-bridge/`:
- `desktop_full.png` — full 2-column section at 1440×900
- `desktop_preview.png` — close-up of `.diagnostic-result-proof` showing label + 68/100 score + warn badge + horizontal 6-node flow with Fonte highlighted in yellow + insight + green status
- `cta_hover.png` — Mapear fluxo do time hover state (background #000, translateY -1px, shadow)
- `cta_focus.png` — Mapear fluxo do time focus ring
- `reduced_motion.png` — full state applied instantly

## 8. Screenshots do diagnóstico mobile

`qa-screenshots/how-it-works-redesign/diagnostic-bridge/mobile_360.png`, `mobile_390.png`, `mobile_430.png` — single-column vertical: eyebrow → H2 → subtitle → primary CTA full-width → secondary outlined → microcopy → preview card with 48px score → vertical flow nodes with hairline + circle markers + Fonte warn → insight

## 9. Destinos finais dos CTAs

| CTA | Text | Href (literal) |
|---|---|---|
| Section B primary | Mapear fluxo do time | `/diagnostico-questionario.html` |
| Section B secondary | Calcular meu tempo | `/tempo-questionario.html` |

Other sections (hero, story panels, final dark CTA) preserve their original CTAs — explicitly not touched per §1.

## 10. Resultado das assertions

### §51 — Section A (29 assertions)

```json
{
  "a1_noOldTitle":          true,
  "a2_noEntramHeading":     true,
  "a3_noSaemHeading":       true,
  "a4_noOldThreeColCard":   true,
  "a5_noOldChips":          true,
  "a6_sixSteps":            true,
  "a7_initialReceba":       true,   // "Receba com fonte" is the initial active title
  "a8_noAutoplay":          true,
  "a9_noSetInterval":       true,
  "a10_clickUpdatesStage":  true,
  "a11_arrowDownWorks":     true,
  "a12_homeWorks":          true,
  "a12_endWorks":           true,
  "a13_stage580_pass":      true,
  "stage_heights":          [580, 580, 580, 580, 580, 580],  // 0px delta
  "a14_state01FourSources": true,
  "a15_noWAasSource":       true,
  "a16_state02Question":    true,
  "a17_state03FullSource":  true,
  "a18_state04Versions":    true,
  "a19_noEllipsis":         true,
  "a20_state05HasMessage":  true,
  "a21_state06HasAllRows":  true,
  "a22_state06Outlook":     true,   // "Enviar via Outlook" present
  "a23_state06Handoff":     true,   // "WhatsApp handoff" present
  "a24_noEnviarViaWA":      true,   // "Enviar via WhatsApp" never appears
  "a25_mobileSixArticles":  true,
  "a26_noStepperVisible":   true,   // mobile <1100px hides desktop stepper
  "a27_noSticky":           true,
  "a28_noCarousel":         true,
  "a29_noOverflow":         true
}
```

### §52 — Section B (19 assertions)

```json
{
  "b1_noOldTitle":              true,
  "b2_primaryHref":             true,   // /diagnostico-questionario.html
  "b3_secondaryHref":           true,   // /tempo-questionario.html
  "b4_notOldHrefs":             true,
  "b5_onePreview":              true,
  "b6_has68":                   true,
  "b7_hasBadge":                true,
  "b8_sixNodes":                true,
  "b9_fonteOnlyWarn":           true,   // exactly 1 .--warn node, contains "Fonte"
  "b10_noRed":                  true,
  "b11_desktopTwoCols":         true,
  "b12_mobileOneCol":           true,
  "b13_previewAfterCTAs":       true,
  "b14_mobileFlowVertical":     true,
  "b15_noOverflowM":            true,
  "b16_ctaInFirstView":         true,
  "b16_ctaTop":                 339,    // at 390×844 viewport
  "b17_proofStartsInFirstView": true,
  "b18_noMinHeight100vh":       true
}
```

**Console errors during all assertion runs: 0.**

## 11. Resultado do grep (§53)

`qa-scripts/hiw-grep.sh` extracts only the two new sections' HTML (lines 296→645) + appended CSS block + JS file:

```
## Forbidden tokens (all 0 hits in user-facing code)
  Uma pergunta vira um fluxo confirmado    html=0 css=0 js=0
  Quer ver onde seu fluxo trava hoje       html=0 css=0 js=0
  Busca contexto                           html=0 css=0 js=0
  Compara versões                          html=0 css=0 js=0
  Mostra fonte                             html=0 css=0 js=0
  Prepara mensagem                         html=0 css=0 js=0
  Enviar via WhatsApp / envio via WhatsApp / WhatsApp conectado / pesquisar no WhatsApp / WhatsApp como fonte  → 0
  swiper / slick / text-overflow / ellipsis  → 0
  purple / violet / "—" (em-dash) / blue / gradient  → 0

## Context-required tokens (no real-code hits)
  Entram   → 0 (old "Entram" heading removed)
  Saem     → 0 (old "Saem" heading removed)
  setInterval/autoplay/carousel → 1 each in JS doc-comment declaring absence

## CTA href check
  diagnostic-bridge-primary or -secondary linking to /diagnostico.html or /tempo.html: 0
  /diagnostico-questionario.html: 1 occurrence
  /tempo-questionario.html: 1 occurrence
```

All §53 grep substantive hits = **0**. The doc-comment occurrences in `inside-flow.js` are declarations of absence ("No autoplay. No setInterval. No timer. No carousel. No swipe.").

## 12. Resultado dos testes

`package.json` has no formal test script. Playwright assertion script `qa-scripts/hiw-assertions.mjs` substitutes:
- All 48 assertions across §51 + §52 PASS at 1440×900 (desktop) and 390×844 (mobile)
- Stage maintains 580px height across all 6 stepper states (0px delta)
- Keyboard Arrow/Home/End all change `data-active-step` correctly
- 0 console errors at all viewports

## 13. Comportamento reduced motion

Scoped CSS rule:

```css
@media (prefers-reduced-motion: reduce) {
  #inside-allybi-flow *,
  #flow-diagnostic-bridge * {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

JS controller: `prefersReduced` is detected; stepper still works (click/keyboard), state changes apply instantly (no exit/enter transitions because CSS overrides duration to 1µs).

Verified visually at `qa-screenshots/how-it-works-redesign/inside-flow/reduced_motion.png` and `diagnostic-bridge/reduced_motion.png` — full state visible, no in-progress animation.

## 14. Diferenças desktop vs mobile

| Aspect | Desktop ≥1100px | Mobile <1100px |
|---|---|---|
| Section A layout | 2-col grid (270px stepper + 1fr stage) | flex column (header → 6 chapters vertical) |
| Section A H2 font-size | clamp(54, 4.5vw, 70) | clamp(40, 10.4vw, 46) |
| Section A interaction | stepper changes single 580px stage | each chapter has its own mini visual (no interaction) |
| Section A presentation | one big product frame with 6 transitioning states | 6 self-explanatory chapters, each with copy + visual |
| Section B layout | 2-col grid (1fr copy + 520px preview) | flex column (copy → preview) |
| Section B H2 font-size | clamp(48, 4.1vw, 62) | clamp(40, 10.4vw, 46) |
| Section B CTAs | inline pair (primary pill + text-link secondary) | full-width stacked grid (primary pill + outlined secondary) |
| Section B flow map | horizontal 11-track grid w/ inline connectors | vertical with hairline + dotted circle nodes |
| Section B score | 54px right-aligned with badge | 48px left-aligned, badge below |
| Section A tablet 768–1099 | mobile vertical (per §22 — no compression) | same as mobile but H2 grows to clamp(40, 5.5vw, 56) |

## 15. Confirmação de que WhatsApp aparece apenas como handoff

Every WhatsApp mention in the two new sections is a handoff/destination, never a source:

- Section A state 06 review: "WhatsApp handoff: abrir conversa com mensagem pronta." (rendered in `.inside-flow-review-handoff`)
- Section A mobile chapter 06: same handoff line in `.inside-flow-chapter-rv-handoff`
- Sources in state 01 + chapter 01: Outlook / OneDrive / SharePoint / Uploads — no WhatsApp
- Source chips in state 02: Outlook / OneDrive / SharePoint / Uploads — no WhatsApp

Assertions §51.15 (`a15_noWAasSource`), §51.23 (`a23_state06Handoff`), §51.24 (`a24_noEnviarViaWA`) all **true**.

## 16. Confirmação de que os questionários abrem diretamente

Source HTML of the section B actions block:

```html
<a href="/diagnostico-questionario.html" class="diagnostic-bridge-primary">Mapear fluxo do time</a>
<a href="/tempo-questionario.html" class="diagnostic-bridge-secondary">Calcular meu tempo</a>
```

Both link directly to the questionnaire pages, bypassing the intermediate `/diagnostico.html` / `/tempo.html` landing pages. Assertion §52.2 (`b2_primaryHref === '/diagnostico-questionario.html'`), §52.3 (`b3_secondaryHref === '/tempo-questionario.html'`), §52.4 (no `/diagnostico.html` or `/tempo.html` as CTA hrefs) all **true**.

## 17. Confirmação de que não existe autoplay

- `assets/inside-flow.js` contains no `setInterval`, no `setTimeout` that controls step progression, no autoplay loop. The only `setStep(idx)` calls are inside click handlers and keydown handlers.
- The JS doc-comment explicitly declares: *"No autoplay. No setInterval. No timer. No carousel. No swipe."*
- Assertions §51.8 (`a8_noAutoplay`) and §51.9 (`a9_noSetInterval`) verified by inspecting the script's source text with comments stripped: **0** runtime occurrences of those tokens.

## 18. Problemas restantes

**None blocking.**

Minor notes:

1. **Legacy `.hiw-depth*` and `.hiw-bridge*` CSS rules (lines 93–112, 150–162 of original)** were not actively removed from `pages/how-it-works.css` — they remain in place but have no DOM targets after the HTML rewrite, so they are inert (no visual or runtime effect). I chose this lower-risk path because: (a) removing them requires careful surgery to also clean up mobile breakpoint rules at line 48–54; (b) the file isn't shared with other pages; (c) future cleanup pass can remove them safely without affecting the rendered page. The page weight cost is ~600 bytes of dead CSS.

2. **§38 desktop flow-map markup** uses CSS Grid `grid-template-columns: auto 1fr auto 1fr ... auto` (11 tracks) with `.diagnostic-result-connector` 1px hairlines as 5 of the `1fr` tracks. On mobile the connectors are `display: none` and nodes stack vertically with a vertical hairline `::before` and circular `::before` markers, matching spec §41 layout exactly.

3. **Spec §3 reference to the old title "Uma pergunta vira um fluxo confirmado"** does not literally match the deployed H2 ("Uma pergunta no chat. Um fluxo completo por trás."). The structural intent is clearly the same — the 3-column "Entram / Allybi / Saem" diagram. The pre-audit and rewrite proceeded based on structural match, not literal title match, and the audit assertion §51.1 verifies absence of both candidate strings.

---

**Files in delivery:**
- `how-it-works.html` (sections A + B rewritten in place)
- `pages/how-it-works.css` (new block appended; legacy rules inert)
- `assets/inside-flow.js` (new)
- `HOW_IT_WORKS_SECTIONS_PRE_AUDIT.md`
- `HOW_IT_WORKS_SECTIONS_REDESIGN_REPORT.md` (this document)
- `qa-screenshots/how-it-works-before/` (11 baselines)
- `qa-screenshots/how-it-works-redesign/` (4 subfolders, 30+ captures)
- `qa-scripts/hiw-before.mjs`, `qa-scripts/hiw-assertions.mjs`, `qa-scripts/hiw-shots.mjs`, `qa-scripts/hiw-grep.sh`
