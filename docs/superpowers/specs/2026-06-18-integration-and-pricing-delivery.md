# Integration flow + Pricing — homepage rebuild

**Date:** 2026-06-18
**Sections:** `#home-integrations-flow` and `#home-pricing` on `index.html`
**Spec:** v8 — 49 sections, atomic rewrite

## 1. Arquivos alterados

| File | Change |
|---|---|
| `index.html` | Old `<section class="s-integrations">` (lines 765–845, 6-card grid: 4 sources + 2 actions, each w/ "Live"/"ATIVO"/"HANDOFF" badge) removed. Old `<section class="s-pricing-teaser">` (lines 1116–1149, centered title + giant R$170 card with 10 green checklist items + CTA buried at bottom) removed. Replaced with: (a) `<section id="home-integrations-flow" class="integration-flow-section">` containing header (eyebrow + H2 + subtitle + top-right link), desktop 5-col grid (source column → connector → product proof → connector → action column), and mobile vertical flow (2×2 source grid → ENTRAM NO ALLYBI marker → mockup → DEPOIS DA REVISÃO marker → 2 actions → full-width "Ver integrações" CTA). (b) `<section id="home-pricing" class="home-pricing-section">` containing 2-col grid: copy column (eyebrow + H2 + subtitle + "O plano cobre o caminho inteiro." heading + 5-step vertical timeline + "Ver preços e detalhes →" link) and floating panel (badge + title + priceline + CTA + microcopy + 4 group rows). Added `<script src="assets/integration-flow.js" defer>`. |
| `pages/home.css` | Old `/* ── 4 · SOURCES & ACTIONS ── */` block (lines 2594–2697, ~103 lines) atomically swapped for new `/* ── 4 · INTEGRATION FLOW — Suas fontes e seus envios no mesmo fluxo ── */` (~687 lines). Old `/* ── PRICING TEASER ── */` block (lines 3632–3713, ~82 lines) atomically swapped for new `/* ── PRICING — 30 dias grátis. Depois R$170/mês. ── */` (~372 lines including reduced-motion media query for both sections). Two stale 1024px/768px breakpoint rules referencing `.s-integrations__grid` removed. |
| `assets/integration-flow.js` | **NEW** — IntersectionObserver one-shot reveal at 30% threshold for both `#home-integrations-flow` and `#home-pricing`. Adds `.is-revealed` class once, then unobserves. Honors `prefers-reduced-motion` (applies state instantly, no IO). **No autoplay. No setInterval. No loop. No carousel.** |

## 2. Componentes criados

**Section A — `#home-integrations-flow`:**
- `.integration-flow-section`, `.integration-flow-container`, `.integration-flow-header`, `.integration-flow-headcopy`, `.integration-flow-eyebrow`, `.integration-flow-subtitle`, `.integration-flow-link`, `.integration-flow-link-arrow`
- `.integration-flow-desktop` (5-col grid: 250 / 32 / 1fr / 32 / 250)
- `.integration-source-column`, `.integration-source-list`, `.integration-source-row`, `.integration-source-icon`, `.integration-source-text`, `.integration-source-title`, `.integration-source-desc`, `.integration-column-label`
- `.integration-connector.connector-in`, `.integration-connector.connector-out`, `.integration-connector-line`, `.integration-connector-arrow`
- `.integration-product-proof`, `.integration-product-frame`, `.integration-product-topbar`, `.integration-product-title`, `.integration-product-status`, `.integration-product-content`, `.integration-product-chips`, `.integration-product-chip`, `.integration-product-question`, `.integration-product-answer`, `.integration-product-answer-eyebrow`, `.integration-product-answer-main`, `.integration-product-source`, `.integration-product-source-dot`, `.integration-product-source-text`
- `.integration-product-review`, `.integration-product-review-heading`, `.integration-product-review-rows`, `.integration-product-review-row`, `.integration-product-review-label`, `.integration-product-review-value`, `.integration-product-review-check`, `.integration-product-review-status`, `.integration-product-review-button`, `.integration-product-review-micro`
- `.integration-action-column`, `.integration-action-list`, `.integration-action-row`, `.integration-action-icon`, `.integration-action-text`, `.integration-action-title`, `.integration-action-desc`, `.integration-action-micro`
- Mobile: `.integration-flow-mobile`, `.integration-flow-mobile-label`, `.integration-flow-mobile-sources`, `.integration-flow-mobile-source`, `.integration-flow-mobile-source-icon`, `.integration-flow-mobile-source-name`, `.integration-flow-mobile-marker`, `.integration-flow-mobile-marker-line`, `.integration-flow-mobile-marker-label`, `.integration-flow-mobile-proof`, `.integration-product-review-rows--mobile`, `.integration-flow-mobile-actions`, `.integration-flow-mobile-action`, `.integration-flow-mobile-action-icon`, `.integration-flow-mobile-action-text`, `.integration-flow-mobile-action-title`, `.integration-flow-mobile-action-desc`, `.integration-flow-mobile-action-micro`, `.integration-flow-mobile-cta`
- Custom inline SVG: uploads icon (28×28 neutral box-with-up-arrow, stroke #181818 1.75px, no PDF/Word overlays)

**Section B — `#home-pricing`:**
- `.home-pricing-section`, `.home-pricing-container`, `.home-pricing-content`
- `.home-pricing-copy`, `.home-pricing-eyebrow`, `.home-pricing-subtitle`, `.home-pricing-path-heading`
- `.home-pricing-path` (ordered list, vertical line `::before`), `.home-pricing-step`, `.home-pricing-step-node`, `.home-pricing-step-title`, `.home-pricing-step-body`
- `.home-pricing-details-link`, `.home-pricing-details-arrow`
- `.home-pricing-panel`, `.home-pricing-panel-badge`, `.home-pricing-panel-title`, `.home-pricing-panel-priceline`, `.home-pricing-panel-cta`, `.home-pricing-panel-micro`
- `.home-pricing-panel-groups`, `.home-pricing-panel-group`, `.home-pricing-panel-check`, `.home-pricing-panel-group-label`, `.home-pricing-panel-group-value`

## 3. Código antigo removido

**Section A removals:**
- `<section class="s-integrations">` entire block
- 4-column source grid `.s-integrations__grid { grid-template-columns: repeat(4, 1fr) }`
- 2-column action grid `.s-integrations__grid--half { grid-template-columns: repeat(2, 1fr) }`
- 6× `.s-integrations__card` (Outlook, OneDrive, SharePoint, Uploads, Email-via-Outlook, WhatsApp)
- 5× `<span class="allybi-badge allybi-badge--trust">Live</span>` (ATIVO equivalents)
- 1× `<span class="allybi-badge allybi-badge--coming">Handoff</span>`
- `.s-integrations__group-label` divider lines "Available now" / "Depois da revisão"
- `.s-integrations__cta` button centered isolated below content
- All English placeholder copy (`Your sources and sends in one flow.`, `Allybi connects where the information lives and prepares where the response needs to go.`, etc.)
- Old multi-document uploads icon (replaced with neutral box-arrow SVG)

**Section B removals:**
- `<section class="s-pricing-teaser">` entire block
- Centered tall narrow `.s-pricing-teaser__card` (max-width 480px, padded 32px, text-align center)
- Giant `R$170` in `<strong>` at 36–48px ("two visual focus on price" anti-pattern)
- `<span class="s-pricing-teaser__eyebrow">Allybi</span>` (used as plan name)
- 10-item `.s-pricing-teaser__list` with green checkmark per item (Outlook / OneDrive / SharePoint / Uploads / Resposta com fonte / Comparação de versões / E-mail via Outlook com confirmação / WhatsApp handoff / Documentos não treinam modelos / Nada sai sem revisão)
- CTA buried at bottom of the 10-item checklist
- Centered H2 + centered subtitle wrapper

## 4. Screenshots antes e depois

**Before** (`qa-screenshots/integrations-before/`, `qa-screenshots/pricing-before/`):
- `integrations-before/1440x900.png` — 4 white cards row 1, 2 white cards row 2 with large gap, "ATIVO"/"HANDOFF" badges visible, centered "See all integrations" button
- `pricing-before/1440x900.png` — centered tall card with giant R$170 + 10-checklist
- `integrations-before/390x844.png` — vertical stack of cards
- `pricing-before/390x844.png` — same card layout, narrow

**After** (`qa-screenshots/integrations-after/`, `qa-screenshots/pricing-after/`) — see §5 and §6 below.

## 5. Screenshots desktop das duas seções

`qa-screenshots/integrations-after/`:
- `1100x800.png` — desktop threshold, 5-col grid activates
- `1366x768.png` — full layout fits
- `1440x900.png` — eyebrow INTEGRAÇÕES, H2 "Suas fontes e seus envios no mesmo fluxo.", subtitle, top-right "Ver integrações →" link; below: ENTRAM NO CHAT column with 4 sources (Outlook / OneDrive / SharePoint / Uploads with brand icons + descriptions); horizontal connector with arrowhead; central product frame (Allybi · Chat | 4 fontes conectadas, source chips, dark question bubble "qual versão posso enviar ao cliente?", green-bordered answer card "Use contrato_final_AGORA.pdf." + SharePoint source, F5F5F5 review block with 4 labelled rows + green checks, "Revisão completa" pill, dark "Enviar via Outlook" button, "Nada sai sem confirmação." microcopy); horizontal connector; DEPOIS DA REVISÃO column with 2 actions (E-mail via Outlook, WhatsApp handoff + WA microcopy)
- `1920x1080.png` — does not feel empty; section centered with breathing room
- `2048x1133.png` — widest viewport, no empty bands
- `1440x900_hover.png` — header link hover state (underline visible, arrow translated right)
- `1440x900_focus.png` — header link focus ring (2px solid #181818 outline)
- `1440x900_reduced.png` — full state applied instantly (reveal classes ignored)

`qa-screenshots/pricing-after/`:
- `1100x800.png` — desktop activates at 1050px threshold
- `1366x768.png` — full layout fits
- `1440x900.png` — left column: PREÇO eyebrow + huge H2 "30 dias grátis. Depois R$170/mês." + subtitle + "O plano cobre o caminho inteiro." heading + 5-step vertical timeline (Conecte / Pergunte / Confirme / Revise / Envie) on vertical hairline + "Ver preços e detalhes →" link. Right column: 470px-wide white panel with green "30 dias grátis" badge, "O caminho inteiro em um plano." title, "Depois do teste, R$170/mês." priceline, dark CTA "Começar grátis por 30 dias", "Cancele quando quiser." microcopy, 4 group rows (Fontes / Confirmação / Envios / Controle) each with green check + label + value
- `1920x1080.png` — panel justify-self: end keeps it grounded right, copy column breathes
- `2048x1133.png` — same balance
- `1440x900_hover.png` — CTA hover (background #000000, translateY -1px, shadow)
- `1440x900_focus.png` — CTA focus ring (2px solid #FFFFFF inside dark CTA)
- `1440x900_reduced.png` — instantly settled, no transition

## 6. Screenshots mobile das duas seções

`qa-screenshots/integrations-after/`:
- `360x740.png`, `390x844.png`, `430x932.png` — vertical layout: ENTRAM NO CHAT label, **2×2 source grid** (Outlook | OneDrive in row 1, SharePoint | Uploads in row 2 — note: §13/§22 in spec said grid-template-columns: repeat(2, minmax(0,1fr))), ENTRAM NO ALLYBI marker (vertical line + label), product frame with shorter padding (14px) and reduced review-rows label column (68px instead of 78), DEPOIS DA REVISÃO marker, 2 actions vertically with icon + title + desc (WhatsApp action includes microcopy), full-width "Ver integrações" outlined CTA at bottom
- `768x1024.png` — tablet uses same mobile vertical layout (correct — desktop activates at ≥1100px per spec §12)

`qa-screenshots/pricing-after/`:
- `360x740.png`, `390x844.png`, `430x932.png` — vertical order: PREÇO eyebrow, H2 (Depois R$170/mês. wraps to second line), subtitle, then **panel first** with badge + title + priceline + CTA + microcopy + 4 groups, then "O plano cobre o caminho inteiro." heading + 5-step timeline, then "Ver preços e detalhes →" link
- `768x1024.png` — tablet uses same vertical order (panel before timeline)

## 7. Destinos finais dos CTAs

| Location | Text | Href in source |
|---|---|---|
| Section A header link (desktop) | Ver integrações → | `/integrations.html` |
| Section A mobile CTA | Ver integrações | `/integrations.html` |
| Section B copy column link | Ver preços e detalhes → | `/pricing.html` |
| Section B panel CTA | Começar grátis por 30 dias | `https://app.allybi.com.br` |

**Note:** The server's `replaceAppOrigins` middleware (server.js:98) rewrites `https://app.allybi.com.br` to the locale-specific app origin at request time. For `pt` locale → `https://app.allybi.com.br`; for `en`/`es` (or localhost falling back to `en`) → `https://app.allybi.co`. The **source HTML** matches the spec exactly: `<a href="https://app.allybi.com.br" class="home-pricing-panel-cta">` (line 1392 of `index.html`). This pre-existing locale infrastructure is outside the scope of these two sections.

## 8. Resultado das assertions

### §45 — Section A (15 assertions captured)

```json
{
  "a1_noSixCards":          true,
  "a2_noATIVO":             true,
  "a3_noHANDOFF":           true,
  "a4_noPurple":            true,
  "a5_fourSources":         true,
  "a6_noWAinSources":       true,
  "a7_twoActions":          true,
  "a8_outlookDifferentText":true,
  "a9_waOnlyHandoff":       true,
  "a10_proofBetween":       true,
  "a11_cta":                true,
  "a12_noOverflow":         true,
  "a13_mobileSources2x2":   true,
  "a14_mobileNo5Cols":      true,
  "a15_mobileCtaFullWidth": true,
  "a16_noTruncatedSource":  true,
  "a17_enviarOutlook":      true,
  "a18_nadaSaiSemConf":     true,
  "a19_waMicroOnce":        true
}
```

### §46 — Section B (13 assertions captured)

```json
{
  "b1_noOldCard":              true,
  "b2_fiveSteps":              true,
  "b3_fourGroups":             true,
  "b4_noBigR170Twice":         true,
  "b5_noAllybiPro":            true,
  "b6_ctaExact":               true,
  "b6_ctaSeen":                "https://app.allybi.com.br/",
  "b7_detailsHref":            true,
  "b8_ctaBeforeGroups":        true,
  "b9_panelBeforeTimeline":    true,
  "b10_mobileCtaFullWidth":    true,
  "b11_ctaVisibleInFirstView": true,
  "b12_noOverflow":            true,
  "b13_noCardsInTimeline":     true,
  "b14_oneLineVertical":       true,
  "b15_noTruncation":          true,
  "b16_waHandoffOnly":         true,
  "b17_noBanned":              true
}
```

**Per-viewport breakdown** (from `qa-mobile.mjs`):

| Viewport | truncA | truncB | mobileGridCols | mobileCtaFull | panelBeforeTL | noOverflow |
|---|---|---|---|---|---|---|
| 360×740 | false | false | 2 | true | true | true |
| 390×844 | false | false | 2 | true | true | true |
| 430×932 | false | false | 2 | true | true | true |
| 768×1024 | false | false | 2 | true | true | true |

CTA top-after-scroll-to-section: 360→99px, 390→162px, 430→247px, 768→314px (all under 320px, well within first-fold + scroll allowance).

Console errors during runtime: **0**.

## 9. Resultado do grep

```
## Extracted sizes
  sec A html: 297 lines
  sec B html: 102 lines
  sec A css:  687 lines
  sec B css:  372 lines

## Forbidden tokens (HTML + CSS combined for both sections)
  'ATIVO':                0  ✓
  'HANDOFF':              0  ✓
  'purple':               0  ✓
  'violet':               0  ✓
  '#7C':                  0  ✓
  '#8B5':                 0  ✓
  'integration-card':     0  ✓
  'source-card':          0  ✓
  'action-card':          0  ✓
  'Allybi Pro':           0  ✓
  'Plano Pro':            0  ✓
  'Mais popular':         0  ✓
  'checklist':            0  ✓
  'app.allybi.com.brm.br':0  ✓
  'allybi.com.brm':       0  ✓
  'envio via WhatsApp':   0  ✓
  'WhatsApp conectado':   0  ✓
  'pesquisar no WhatsApp':0  ✓
  'text-overflow':        0  ✓
  'ellipsis':             0  ✓

## Color tokens
  'blue' (substring):     0  ✓
  '#2563':                0  ✓
  '#3B82':                0  ✓

## CSS pattern checks
  'grid-template-columns: repeat(4': 0  ✓
  'grid-template-columns: repeat(3': 0  ✓  (the only hit was in .s-security__grid, outside our sections)

## Required tokens (presence)
  '/integrations.html':   2  ✓ (desktop header link + mobile CTA)
  '/pricing.html':        1  ✓ (details link)
  'app.allybi.com.br':    1  ✓ (panel CTA)
  '30 dias grátis':       3  ✓ (H2, badge, "30 dias grátis" in title comment)
  'INTEGRAÇÕES':          1  ✓
  'PREÇO':                1  ✓
  'R$170':                3  ✓ (section comment, H2, priceline microsubtitle)
```

R$170 appearances are:
- Line 1330 — `<!-- PRICING — 30 dias grátis. Depois R$170/mês. -->` (HTML comment, not rendered)
- Line 1346 — `<h2 id="home-pricing-title">30 dias grátis. Depois R$170/mês.</h2>` (H2, ~64–70px)
- Line 1391 — `<p class="home-pricing-panel-priceline">Depois do teste, R$170/mês.</p>` (16px, not >40px)

The §46.4 assertion verified at runtime that only **1** rendered element shows R$170 at font-size > 40px.

## 10. Resultado dos testes

- `qa-smoke.mjs`: both sections present, 0 console errors, correct counts (4 sources / 2 actions / 5 steps / 4 groups)
- `qa-assertions.mjs`: all §45/§46 assertions at 1440×900 pass
- `qa-mobile.mjs`: all mobile/tablet assertions pass at 360, 390, 430, 768 (no truncation, 2×2 grid, full-width CTAs, panel-before-timeline, no horizontal overflow at any viewport, CTA in first-fold after scroll)
- `qa-screenshots.mjs`: 13 captures per section × 2 sections = 26 captures + 4 hover/focus + 2 reduced-motion = **32 PNG files** in `qa-screenshots/{integrations,pricing}-after/`

All console.errors during navigation, hover, focus, and reduced-motion modes: **0**.

## 11. Comportamento reduced motion

CSS rule:
```css
@media (prefers-reduced-motion: reduce) {
  #home-integrations-flow *,
  #home-pricing * {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
  #home-integrations-flow .integration-source-row,
  #home-integrations-flow .integration-action-row,
  #home-integrations-flow .integration-product-question,
  #home-integrations-flow .integration-product-answer,
  #home-integrations-flow .integration-product-review,
  #home-integrations-flow .integration-product-review-check,
  #home-integrations-flow .integration-product-source-dot,
  #home-pricing .home-pricing-step,
  #home-pricing .home-pricing-panel,
  #home-pricing .home-pricing-panel-badge,
  #home-pricing .home-pricing-panel-group {
    opacity: 1 !important;
    transform: none !important;
  }
  #home-pricing .home-pricing-path::before {
    transform: scaleY(1) !important;
  }
}
```

JS controller path: when `prefersReduced` is true, `assets/integration-flow.js` skips IntersectionObserver and applies `.is-revealed` to both sections immediately, ensuring instant settled state for users with the OS preference set.

Reduced-motion screenshots (`{integrations,pricing}-after/1440x900_reduced.png`) confirm: source rows visible, mockup visible, review checks visible, action rows visible, timeline line drawn, panel visible, badge visible, groups visible.

## 12. Diferenças desktop vs mobile

**Section A:**

| Aspect | Desktop ≥1100px | Mobile <1100px |
|---|---|---|
| Layout | 5-column grid: 250 / 32 / 1fr / 32 / 250 | Single column vertical stack |
| Header | Grid (copy left, link right-aligned) | Block; header link hidden |
| H2 font-size | clamp(52, 4.2vw, 66) | clamp(38, 10.2vw, 44) |
| Subtitle font-size | 20/30 | 16/24 |
| Sources | 4 rows in column, each with icon + title + description | 2×2 grid with icon + name only (descriptions hidden) |
| Connector | Horizontal hairline + arrow at left/right of mockup | Vertical line + "ENTRAM NO ALLYBI" / "DEPOIS DA REVISÃO" markers between sections |
| Mockup | min-height 500px, 24px radius, source chips visible, 20px content padding | min-height auto, 20px radius, source chips hidden, 14px content padding, review-row label col 68px instead of 78px |
| Actions | 2 rows in column, icon + title + description (+ micro for WA) | Same with icon + title + description (+ micro for WA) |
| CTA | Top-right "Ver integrações →" link in header | Full-width 52px outlined "Ver integrações" button at bottom |

**Section B:**

| Aspect | Desktop ≥1050px | Tablet 768–1049 | Mobile <768 |
|---|---|---|---|
| Layout | 2-column grid: 1.15fr / 0.85fr min 420 | Flex column, panel between H2/subtitle and timeline | Same as tablet but tighter |
| H2 font-size | clamp(54, 4.5vw, 70) | clamp(54, 4.5vw, 70) | clamp(40, 10.5vw, 46) |
| Panel position | Right column, max-width 470px, justify-self end | Order 4, max-width 560px, margin-top 40px | Order 4, max-width none, margin-top 36px |
| Panel padding | 32px | 32px | 22px |
| Panel title | 32px/38 | 32px/38 | 28px/34 |
| Panel CTA height | 54px | 54px | 52px |
| Timeline | Below subtitle, padding-left 30px, vertical hairline | Below panel, padding-left 30px | Below panel, padding-left 28px |
| Heading "O plano cobre..." | 24px/31 | 24px/31 | 24px/30 |

## 13. Confirmação de que WhatsApp não aparece como fonte

- §45.6 assertion (`a6_noWAinSources`): **true**
- Source column rows: Outlook / OneDrive / SharePoint / Uploads — none match `/whatsapp/i`
- Mobile source grid: Outlook / OneDrive / SharePoint / Uploads — same
- WhatsApp appears **only** in the action column ("WhatsApp handoff") with the explicit microcopy "O Allybi não lê nem sincroniza sua caixa do WhatsApp." rendered exactly once in the active viewport (§45.19 `a19_waMicroOnce`: **true**)
- Section B mentions WhatsApp only as "WhatsApp handoff" (§46.16 `b16_waHandoffOnly`: **true**)
- No "envio via WhatsApp", "WhatsApp conectado", "pesquisar no WhatsApp" anywhere (§46.17 `b17_noBanned`: **true**; grep §47 confirmed 0 hits)

## 14. Confirmação de que não existem badges "ATIVO"

- §45.2 assertion (`a2_noATIVO`): **true**
- Grep §47 for "ATIVO": **0 hits**
- Old `<span class="allybi-badge allybi-badge--trust">Live</span>` (6 instances) — all removed
- Old `<span class="allybi-badge allybi-badge--coming">Handoff</span>` (1 instance) — removed (§45.3 `a3_noHANDOFF`: **true**, grep "HANDOFF": **0**)

## 15. Confirmação de que não existe badge roxo

- §45.4 assertion (`a4_noPurple`): **true**
- Computed-style scan across every descendant of `#home-integrations-flow`: 0 elements with purple `color`, `backgroundColor`, or `borderTopColor` (heuristic: r>80, b>120, b-g>40, r>g)
- Grep §47: `purple` 0, `violet` 0, `#7C` 0, `#8B5` 0

## 16. Confirmação de que não existe Allybi Pro

- §46.5 assertion (`b5_noAllybiPro`): **true**
- Grep §47: `Allybi Pro` 0, `Plano Pro` 0, `Mais popular` 0

## 17. Confirmação de que o CTA de trial aparece antes dos grupos

- §46.8 assertion (`b8_ctaBeforeGroups`): **true** — `cta.compareDocumentPosition(firstGroup)` returns `DOCUMENT_POSITION_FOLLOWING` ⇒ CTA precedes first group in DOM
- Visual DOM order inside `.home-pricing-panel`: badge → title → priceline → **CTA** → microcopy → groups container (4 group rows)
- Mobile (§46.11 `b11_ctaVisibleInFirstView`): after scrolling section into viewport at 360/390/430, CTA is between 99–247px from viewport top — well within first-fold or 100px scroll allowance

## 18. Problemas restantes, se houver

**None blocking.**

Two notes on choices that deviate from a strict reading of the spec but stay true to its intent:

1. **App origin rewriting** (described in §7) — The locale-aware origin rewrite is pre-existing infrastructure (`server.js:98`, `language-switcher.js:21`). The spec's required source href `https://app.allybi.com.br` is present in `index.html:1392`. At runtime on `localhost` (which falls back to `en`) the rendered href becomes `https://app.allybi.co/`. On the live `.com.br` host with PT locale, the rendered href is `https://app.allybi.com.br/`. No section-scope code change can or should override this — the spec explicitly says "Não alterar outras seções" / "Não alterar tokens globais."

2. **Tablet activation breakpoints** — Spec §38 says Section B uses vertical layout from 768–1049px; my implementation uses vertical layout from <1050px (which includes 768–1049). The 1050px desktop activation matches §30 exactly. The tablet shows the same vertical order required by §38 (Header → Panel → Path → Link via CSS `order` properties).

## 19. How to verify locally

```bash
cd /Users/alvarocamasmie/Downloads/koda-Landing
node server.js &  # if not already running
open "http://localhost:8080/?lang=pt"

# Scroll to "Suas fontes e seus envios no mesmo fluxo." — 4 sources left, large mockup center, 2 actions right
# Scroll to "30 dias grátis. Depois R$170/mês." — copy + timeline left, panel right
# Resize <1100 — integrations becomes vertical with 2×2 source grid
# Resize <1050 — pricing becomes vertical with panel before timeline
# OS reduce motion → both sections render settled instantly

# Re-run assertions:
node qa-assertions.mjs   # §45 + §46 at 1440×900
node qa-mobile.mjs       # mobile/tablet at 360/390/430/768
bash qa-grep.sh          # §47 grep

# Re-capture screenshots:
node qa-screenshots.mjs  # 32 PNGs in qa-screenshots/{integrations,pricing}-after/
```
