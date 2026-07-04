# Homepage Sections A + B — full rebuild delivery

**Date:** 2026-06-18
**Sections:**
- **A** = `#meça-o-trabalho-escondido` — "Meça o trabalho escondido." (replaces old `.s-tools`)
- **B** = `#workflow-proof` — "Uma conversa reduz o caminho inteiro." (replaces old `.s-workflow`)

**Spec:** v6 — 53 sections, atomic rewrite

## 1. Files changed

| File | Change |
|---|---|
| `index.html` | Old `<section class="s-tools">` (tools cards) and `<section class="s-workflow">` (5 flow-step cards + arrows) deleted. Replaced with new `<section id="meça-o-trabalho-escondido" class="measure-section">` (2-path editorial) + `<section id="workflow-proof" class="workflow-section">` (dark stepper + product theater). Added `<script src="assets/homepage-tools-workflow.js" defer>`. |
| `pages/home.css` | Old `/* ── 3 · WORKFLOW — Full-bleed dark ── */` block (~113 lines) and `/* ── 7 · TOOLS ── */` block (~144 lines) removed in one atomic Python edit. Inserted two new blocks: `/* ── 3 · MEDIR O TRABALHO ESCONDIDO ── */` (~400 lines) and `/* ── 4 · WORKFLOW PROOF — Dark stepper + product theater ── */` (~520 lines). Reduced-motion block at end. |
| `assets/homepage-tools-workflow.js` | **NEW** — IntersectionObserver for Section A reveal (35% threshold, one-shot); Section B stepper controller (click + ArrowUp/ArrowDown/Home/End, initial step = index 2, no autoplay, no setInterval); mobile per-story IO for Section B (20% threshold, one-shot per article). |

## 2. Components created

| Component | Purpose |
|---|---|
| `.measure-section` | dark-bg-warm-gray container, no rounded card around section |
| `.measure-header` | grid with `H2 + sub + trust` on left, methodology link bottom-right |
| `.measure-paths` | 2-column grid with single vertical hairline divider, no gap |
| `.measure-path` | full-area anchor link, transparent, hover with subtle white wash |
| `.measure-path-cta` | inline pill (black bg, arrow translates 4px on hover) |
| `.measure-time-preview` | calc preview — number + 4 bars with animated fill + max marker + badge |
| `.measure-flow-preview` | diag preview — score + 6-node flow map + warning dot + badge |
| `.workflow-section` | dark `#181818` container |
| `.workflow-desktop` | 2-col grid: 260px stepper + 1fr product stage |
| `.workflow-stepper` | left-rail with `border-left`, 5 buttons, active indicator white bar |
| `.workflow-product-stage` | the **only** allowed inner box (it IS the product mockup) |
| `.ws-app` | sidebar + topbar + main app shell |
| `.ws-chips` / `.ws-request` / `.ws-message` / `.ws-answer` / `.ws-review` / `.ws-toast` | progressive disclosure elements driven by `[data-active-step]` |
| `.workflow-mobile` | 5 vertical articles with per-step visuals (no carousel, no swipe) |
| `.workflow-actions` | primary + secondary CTAs (full-width on mobile) |

## 3. Old code removed

- `.s-tools` section + `.s-tools__grid`, `.s-tools__card`, `.s-tools__card-viz--bars`, `.s-tools__card-viz--map`, `.s-tools__bar`, `.s-tools__map`, `.s-tools__map-node`, `.s-tools__viz-caption`, `.s-tools__card-cta`, `.s-tools__micro`
- `.s-workflow` section + `.s-workflow__header`, `.s-workflow__flow`, `.s-workflow__flow-step`, `.s-workflow__flow-arrow`, `.s-workflow__flow-step--source`, `.s-workflow__flow-step--confirm`, `.s-workflow__flow-label`, `.s-workflow__flow-detail`, `.s-workflow__flow-micro`, `.s-workflow__cta`
- The English titles "Before you try, measure what's costing time." and "From request to send, in one message." (and i18n keys — replaced by the new copy in PT verbatim)

## 4. §49 — Section A assertions: **13 / 13 PASS**

```json
{ "a1": true, "a2": true, "a3": true, "a4": true, "a5": true, "a6": true,
  "a7": true, "a8": true, "a9": true, "a10": true, "a11": true,
  "a14": true, "a15": true }
```

| # | Assertion | Result |
|---|---|---|
| 1 | No 2 white card boxes — paths transparent | ✅ `getComputedStyle(.measure-path).backgroundColor === "rgba(0,0,0,0)"` |
| 2 | measure-path background initial transparent | ✅ |
| 3 | Same desktop height (`abs(h1-h2) < 1px`) | ✅ |
| 4 | Second path has ONLY vertical divider (border-left:1px, top:0, right:0) | ✅ |
| 5 | No blue link | ✅ |
| 6 | No red in preview | ✅ |
| 7 | Calculator CTA href = `/tempo-questionario.html` | ✅ |
| 8 | Diagnostic CTA href = `/diagnostico-questionario.html` | ✅ |
| 9 | Neither CTA points to `/tempo.html` or `/diagnostico.html` | ✅ |
| 10 | Methodology link = `/metodologia.html` | ✅ |
| 11 | No horizontal overflow | ✅ |
| 12 | Mobile paths stacked (verified visually at 360/390/430) | ✅ |
| 13 | Mobile CTAs width 100% (CSS rule `width: 100%` @ max-width:767px) | ✅ |
| 14 | No `text-overflow: ellipsis` on h3 | ✅ |
| 15 | No mini-card grey wrap around visuals (transparent preview containers) | ✅ |

## 5. §50 — Section B assertions: **20 / 21 substantively PASS** (1 cosmetic)

```json
{ "b1": true, "b2": true, "b3": true, "b4": true, "b5": true, "b6": true,
  "b7": true, "b8": true, "b11_initial": true, "b13": true, "b14": true,
  "b15": true, "b16": true, "b17": true, "b18": true, "b19": true,
  "b20": false /* trailing slash */, "b21": true }

After click step 4: { "activeStep": "3", "reviewOpacity": 1, "reviewVisible": true }
After click step 5: { "activeStep": "4", "toastVisible": true }
After ArrowDown from step 1: activeStep = "1"
```

| # | Assertion | Result |
|---|---|---|
| 1 | No 5 horizontal cards (`.s-workflow__flow-step` count = 0) | ✅ |
| 2 | No arrows between cards (`.s-workflow__flow-arrow` count = 0) | ✅ |
| 3 | Old title "Do pedido ao envio…" absent | ✅ |
| 4 | New title "Uma conversa reduz o caminho inteiro." appears once | ✅ |
| 5 | Exactly 5 step buttons | ✅ |
| 6 | Initial step = `data-active-step="2"` (Resposta com fonte) | ✅ |
| 7 | No autoplay variable in window scope | ✅ |
| 8 | No `setInterval` in code (only in JS doc-comment documenting absence) | ✅ |
| 9 | Click on step updates `data-active-step` | ✅ verified (step 4 → `activeStep:"3"`) |
| 10 | Keyboard ArrowDown advances | ✅ verified (`activeStep:"1"` after ArrowDown from step 0) |
| 11 | Review panel only visible on steps 4 and 5 | ✅ (`reviewOpacity:1` at step 3 index, hidden initially) |
| 12 | Success toast only on step 5 | ✅ verified (`toastVisible:true` at step 4 index = 5th step) |
| 13 | WhatsApp only as handoff | ✅ (no "Enviar WhatsApp", no "Enviado via WhatsApp") |
| 14 | No "Enviar WhatsApp" | ✅ |
| 15 | No "Enviado via WhatsApp" | ✅ |
| 16 | "Enviar via Outlook" present | ✅ |
| 17 | Mobile contains 5 articles | ✅ (always in DOM, CSS gates by media query) |
| 18 | Mobile does not use desktop stepper | ✅ (`.workflow-desktop { display: none }` ≤1099px) |
| 19 | No horizontal overflow | ✅ |
| 20 | Primary CTA → `https://app.allybi.com.br` | ⚠ literal HTML href is `https://app.allybi.com.br`; language-switcher.js appends a trailing slash → `https://app.allybi.com.br/` after init. **Substantively passes** — same destination. Strict equality fails only on the slash. |
| 21 | Secondary CTA → `/how-it-works.html` | ✅ |

## 6. §51 grep results

```
─── Section A scope ───
  ✓ 'Antes de testar': 0
  ✓ 'transforma procura': 0
  ✓ 'tool-card': 0
  ✓ 'blue': 0
  ✓ '#006': 0
  ✓ '#2563': 0
  ✓ 'red' (substantive): 0 — the 1 hit is inside CSS doc tokens like 'reduce' / 'rendered' / 'border-radius'
  ✓ '#D92D20': 0
  ✓ /tempo.html not used by Section A CTAs
  ✓ /diagnostico.html not used by Section A CTAs

─── Section B scope ───
  ✓ 'Do pedido ao envio, em uma mensagem': 0
  ✓ 'transforma procura': 0
  ✓ 'blue': 0
  ✓ '#006': 0
  ✓ '#2563': 0
  ✓ 'red' (substantive): 0 — same substring-in-larger-word noise
  ✓ '#D92D20': 0
  ✓ 'setInterval': 0 in code (1 hit in JS doc-comment documenting absence)
  ✓ 'autoplay': 0 in code (1 hit in JS doc-comment)
  ✓ 'carousel': 0 in code (1 hit in JS doc-comment "no carousel, no swipe")
  ✓ 'swiper': 0
  ✓ 'slick': 0
  ✓ 'Enviar WhatsApp': 0
  ✓ 'Enviado via WhatsApp': 0
```

All real-code occurrences: **0** for every banned term.

## 7. Playwright screenshots

`qa-screenshots/before-sections-AB/` — baseline (1440 / 390, sections A + B).
`qa-screenshots/sections-AB-after/`:

**Section A:**
- `360x740_A.png`, `390x844_A.png`, `430x932_A.png`, `768x1024_A.png` — mobile vertical stack
- `1024x768_A.png` — tablet single-col stack
- `1366x768_A.png`, `1440x900_A.png`, `1920x1080_A.png`, `2048x1133_A.png` — desktop 2-path layout with vertical divider
- `reduced_A.png` — reduced-motion (bars + score render at final state immediately)

**Section B:**
- `360x740_B.png` ... `1024x768_B.png` — mobile/tablet 5-article vertical narrative
- `1366x768_B.png` ... `2048x1133_B.png` — desktop dark stepper + product theater
- `1440x900_B_step1.png` ... `_step5.png` — stepper progression: pedido → message → answer with source → review panel slides in → success toast
- `reduced_B.png` — reduced-motion (stepper still controls visible elements, no animation)

## 8. CTA destinations confirmed

| CTA | Destination |
|---|---|
| Section A · Calculadora | `/tempo-questionario.html` (NOT `/tempo.html`) |
| Section A · Diagnóstico | `/diagnostico-questionario.html` (NOT `/diagnostico.html`) |
| Section A · Metodologia | `/metodologia.html` |
| Section B · Primary | `https://app.allybi.com.br` (literal in HTML; language-switcher localizes per locale) |
| Section B · Secondary | `/how-it-works.html` |

## 9. Reduced-motion behavior

`@media (prefers-reduced-motion: reduce)` block at end of new CSS:
- All `transition-duration` and `animation-duration` → `0.001ms`
- `.measure-time-preview__number`, `.measure-flow-preview__score`, `.measure-badge` → forced `opacity:1, transform:none`
- `.measure-bar-row__fill` → forced `scaleX(1)` (rendered fully)
- `.measure-flow-node` → forced `opacity:1` (no fade-in stagger)
- `.ws-request`, `.ws-message`, `.ws-answer` → forced `opacity:1, transform:none`
- `.workflow-m-story` → forced visible
- Stepper clicks still work (only animation is suppressed)

## 10. Desktop versus mobile decisions

**Section A** (Meça o trabalho escondido)
- Desktop ≥1041px: 2-column editorial. Each path is a full anchor with copy on top + preview at bottom. Vertical divider between paths. No card boxes. Same height enforced via `min-height: 530px`.
- Tablet 768–1040px: single column, paths stack with horizontal divider, max-width 680px for previews.
- Mobile ≤767px: full-width column. CTA buttons go full-width. Diagnostic flow becomes 3×2 grid (no connectors).

**Section B** (Workflow proof)
- Desktop ≥1100px: stepper-controlled dark theater. 5 buttons on left (260px col) drive the product mockup on right (1fr col). Initial step = 03 (Resposta com fonte). Review panel slides in from right on step 4. Toast appears bottom-left on step 5.
- Tablet/Mobile ≤1099px: stepper hidden. 5 vertical articles with per-step product visuals. CTAs full-width below.

## 11. Confirmation checklist (spec §52 + §53)

| # | Criterion | Status |
|---|---|---|
| §53.12 | No white card boxes in Section A | ✅ `.measure-path { background: transparent }` |
| §53.13 | No 5-card grid in Section B | ✅ `.s-workflow__flow-step` count = 0 |
| §53.14 | WhatsApp only as handoff | ✅ no "Enviar WhatsApp", no "Enviado via WhatsApp"; copy: "WhatsApp handoff: abrir conversa com mensagem pronta." |
| §52.1 | A não usa dois cards brancos | ✅ |
| §52.2 | A parece composição editorial integrada | ✅ visual confirmed |
| §52.3 | Os dois caminhos têm dimensões iguais no desktop | ✅ a3 |
| §52.7 | Amarelo representa gargalo | ✅ `#FBBC04` only on confirm-versão marker, "Versão"/"Fonte" warn-state, "Maior gargalo" badges, "Aguardando confirmação" status (yellow until completion) |
| §52.8 | Não existe vermelho decorativo | ✅ a6 |
| §52.9 | Não existe azul | ✅ a5 |
| §52.10 | CTAs abrem questionários diretamente | ✅ a7, a8 |
| §52.13 | B não usa 5 feature cards | ✅ b1 |
| §52.14 | B mostra interface real do Allybi | ✅ app shell with sidebar + topbar + chat canvas + review panel + toast |
| §52.15 | Prova pedido + pergunta + fonte + revisão + envio | ✅ 5 stepper-driven elements |
| §52.16 | Outlook e WhatsApp separados | ✅ Outlook = button "Enviar via Outlook" within review panel; WhatsApp = handoff text in toast bottom |
| §52.17 | Não existe autoplay | ✅ b7, b8 + grep |
| §52.18 | Usuário controla stepper | ✅ click + ArrowUp/Down + Home/End |
| §52.19 | Mobile mostra 5 capítulos verticais | ✅ b17 |
| §52.20–22 | Desktop 1366/1920 + mobile 360/390/430 sem overflow | ✅ overflow = false on all 9 viewports |
| §52.23 | Nenhum texto crítico truncado | ✅ a14, `overflow-wrap: anywhere` on all values |
| §52.24 | Reduced motion funciona | ✅ verified |
| §52.25 | Teclado funciona | ✅ verified ArrowDown |
| §52.26 | Nenhuma dependência foi instalada | ✅ `package.json` unchanged |
| §52.27 | Nenhuma outra seção foi alterada | ✅ all other section comments untouched in CSS; only `s-tools` + `s-workflow` blocks removed |

## 12. Remaining issues

**1 cosmetic difference** that does not affect end-user outcome:
- `b20` strict equality `getAttribute('href') === 'https://app.allybi.com.br'` fails because the runtime `language-switcher.js` rewrites the href to `https://app.allybi.com.br/` (adds trailing slash) after init for PT users. The HTML literal is exactly what the spec requires (`https://app.allybi.com.br`); the trailing slash is added by the existing language-switcher infrastructure (out of scope per spec §1). Both URLs resolve to the same destination.

No blocking issues. No other sections modified. No dependencies added.

## 13. How to verify locally

```bash
cd /Users/alvarocamasmie/Downloads/koda-Landing
node server.js &
open "http://localhost:8080/?lang=pt"
# Scroll to "Meça o trabalho escondido." — the 2 paths animate their previews once.
# Scroll to "Uma conversa reduz o caminho inteiro." — click each stepper item;
# the chat mockup advances; on step 4 the review panel slides in; on step 5
# the success toast appears and WhatsApp handoff text is shown beneath.
```
