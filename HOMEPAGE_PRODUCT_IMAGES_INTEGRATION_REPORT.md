# Homepage product-images integration report

**Date:** 2026-06-19
**Page:** `/index.html` (homepage)
**Source:** `/Users/alvarocamasmie/Downloads/koda-webapp/artifacts/landing-shots/` (22 PNGs, `reference/` skipped)
**Destination:** `assets/landing-shots/` → public URL `/assets/landing-shots/`

## 1. Arquivos alterados

| Path | Action | Lines net |
|---|---|---|
| `index.html` | 4 sections rewritten (Hero, Workflow proof, Pressure use cases, Integration flow). Added 2 preload links in `<head>`. Removed 2 `<script>` tags for old controllers. | 1336 total (was 1620) |
| `pages/home.css` | Appended new CSS for `.product-shot-picture`, flow showcase, use-case showcase, integration system blocks, reduced-motion media query. Removed 285 dead CSS rules for old `hero-product-*`, `ws-app*`, `wm-*`, `workflow-step*`, `workflow-stepper*`, `workflow-product-stage*`, `pressure-tab*`, `pressure-card*`, `pressure-preview*`, `pressure-mobile-*`, `integration-action-*`, `integration-flow-mobile-action*`, `integration-flow-channel*`, `integration-product*` selectors. | net ~ −41,169 chars (~−900 lines) |
| `assets/homepage-tools-workflow.js` | Rewritten to drive the new flow showcase + use-case showcase + proximity preload + system-block reveal. Old pain-story-style code removed. | 143 |
| `assets/pressure-section.js` | **Unreferenced** (script tag removed from index.html). File left on disk; no longer loaded. | n/a |
| `assets/integration-flow.js` | **Unreferenced** (script tag removed from index.html). File left on disk; no longer loaded. | n/a |
| `qa-scripts/homepage-images-check.mjs` | **NEW** Playwright runner | 130 |
| `HOMEPAGE_PRODUCT_IMAGES_PRE_AUDIT.md` | **NEW** pre-audit | written |
| `LANDING_SHOTS_ASSET_MANIFEST.md` + `.json` | **NEW** asset manifest | written |
| `HOMEPAGE_PRODUCT_IMAGES_INTEGRATION_REPORT.md` | **NEW** (this file) | written |

Files NOT altered:
- All other HTML pages.
- `allybi-tokens.css`, base/components/header/footer CSS.
- Webapp source repo (read-only).
- `assets/find-gap.js`, `assets/security-page.js`, `assets/security-sections.js`, `assets/home-hero-reveal.js`, language-switcher, allybi-animations etc.

## 2. Assets copiados

22 PNGs copied bit-identical to `assets/landing-shots/{hero,flow,use-cases,system}/`. All SHA-256 sums match source. Detail in `LANDING_SHOTS_ASSET_MANIFEST.md` + `LANDING_SHOTS_ASSET_MANIFEST.json`.

## 3. Diretório público criado

`/assets/landing-shots/` with 4 subdirs:
- `hero/` (2 files)
- `flow/` (10 files)
- `use-cases/` (6 files)
- `system/` (4 files)

The `reference/` subfolder from the webapp was **not copied** (out of scope per §2).

## 4-6. Manifest, hashes, dimensions

See `LANDING_SHOTS_ASSET_MANIFEST.md`. Summary:
- Hero: 1280×1120 (desktop), 700×920 (mobile)
- Flow (5 each): 1880×1160 (desktop), 700×880 (mobile)
- Use cases (3 each): 1440×1040 (desktop), 700×860 (mobile)
- System (2 each): 1440×1080 (desktop), 700×1000 (mobile)

All assets are 2× retina; CSS uses spec §27 project ratios (e.g. hero 640/560) via `aspect-ratio` to prevent CLS.

## 7. Mapping hero

| Breakpoint | Asset |
|---|---|
| ≤ 767px | `/assets/landing-shots/hero/hero-product-mobile.png` |
| ≥ 768px | `/assets/landing-shots/hero/hero-product-desktop.png` |

Preload links in `<head>` use the same media-query split. Hero `<img>` has `loading="eager"`, `fetchpriority="high"`, `decoding="async"`. Alt text from §25: "Tela do Allybi com pergunta no chat, resposta com fonte e rascunho de e-mail via Outlook."

## 8. Mapping flow

| State | Desktop asset | Mobile asset |
|---|---|---|
| 01 Pedido | `flow-01-pedido-desktop.png` | `flow-01-pedido-mobile.png` |
| 02 Pergunta | `flow-02-pergunta-desktop.png` | `flow-02-pergunta-mobile.png` |
| 03 Resposta | `flow-03-resposta-desktop.png` | `flow-03-resposta-mobile.png` |
| 04 Revisão | `flow-04-revisao-desktop.png` | `flow-04-revisao-mobile.png` |
| 05 Envio | `flow-05-envio-desktop.png` | `flow-05-envio-mobile.png` |

Each picture uses `<source media="(max-width: 767px)" srcset="…-mobile.png">` + `<img src="…-desktop.png">`.

## 9. Mapping use cases

| Tab | Desktop asset | Mobile asset | CTA |
|---|---|---|---|
| Jurídico (default) | `usecase-legal-desktop.png` | `usecase-legal-mobile.png` | `/use-case-legal.html` |
| Financeiro | `usecase-finance-desktop.png` | `usecase-finance-mobile.png` | `/use-case-finance.html` |
| Operações | `usecase-operations-desktop.png` | `usecase-operations-mobile.png` | `/use-case-business.html` |

## 10. Mapping system

| Block | Desktop asset | Mobile asset |
|---|---|---|
| Outlook (E-mail via Outlook) | `system-email-draft-desktop.png` | `system-email-draft-mobile.png` |
| WhatsApp (Handoff) | `system-whatsapp-handoff-desktop.png` | `system-whatsapp-handoff-mobile.png` |

Outlook: image on right, copy on left (desktop). WhatsApp: image on left, copy on right (desktop). Mobile: each block stacks vertically as `eyebrow → H3 → body → microcopy → screenshot`.

## 11. Mockups antigos removidos

### Hero
- `.hero-product-demo` wrapper (87 lines)
- `.hero-product-rail`, `.hero-product-topbar`, `.hero-product-content`, `.hero-product-chips`, `.hero-product-question`, `.hero-product-answer`, `.hero-product-review` (and all `__heading`, `__row`, `__send`, `__micro` variants)
- Decorative "Enviar via Outlook" pill, fake "REVISÃO ANTES DO ENVIO" panel

### Workflow proof ("Uma conversa reduz o caminho inteiro")
- `.workflow-desktop` 5-step stepper + sticky product theater (`.ws-app`, `.ws-app__chat`, `.ws-app__main`, `.ws-app__sidebar`, `.ws-app__topbar`)
- All `.ws-*` selectors (`.ws-chips`, `.ws-chip`, `.ws-request`, `.ws-message`, `.ws-answer`, `.ws-review`, `.ws-toast`)
- Mobile: 5 `<article class="workflow-m-story">` + `.wm-*` selectors (`.wm-request`, `.wm-message`, `.wm-answer`, `.wm-review`, `.wm-success`, `.wm-handoff`)
- 5 green check polyline SVGs

### Pressure ("Momentos em que ninguém quer adivinhar")
- `.pressure-tab*`, `.pressure-card*`, `.pressure-preview*` desktop selectors
- `.pressure-mobile-story`, `.pressure-mobile-cta` mobile selectors

### Integration flow ("Suas fontes e seus envios")
- `.integration-action-column` with `.integration-action-row` × 2 (the small Outlook + WhatsApp "ATIVO" / "HANDOFF" status cards)
- `.integration-flow-mobile-actions` block
- `.integration-flow-channel*`, `.integration-product*` (the CSS for the previously-fake channel boxes)

## 12. CSS antigo removido

285 CSS rule blocks removed by automated regex pass (a Python script identifies any rule whose selector matches the dead-class prefixes; rules in nested `@media` blocks handled by recursive descent). Net `-41,169 chars` (~ -900 lines).

## 13. JavaScript antigo removido

- `<script src="assets/pressure-section.js" defer>` removed from index.html
- `<script src="assets/integration-flow.js" defer>` removed from index.html
- `assets/homepage-tools-workflow.js` rewritten from scratch to drive the new flow + use-case + system-reveal logic.

The 2 unreferenced JS files are left on disk (no longer loaded by any page).

## 14. Screenshots antes

12 viewports captured to `qa-screenshots/homepage-images-before/{w}x{h}.png` (visibility of the old hero mockup, workflow stepper, pressure tabs, integration action cards).

## 15-18. Screenshots depois

88 PNGs in `qa-screenshots/homepage-images-after/` across spec-defined subfolders (`hero/`, `flow/`, `use-cases/`, `system/`, `mobile/`, `tablet/`, `desktop/`, `focus/`, `reduced-motion/`, `full-page/`). Desktop captures include per-state flow (5 PNGs each viewport) and per-tab use cases (3 PNGs each viewport).

## 19. Resultado das assertions

### §37 Assets
| # | Assertion | Result |
|---|---|---|
| 1 | 22 PNGs copied | ✓ |
| 2 | All HTTP 200 | ✓ (22/22) |
| 3 | No 404 | ✓ |
| 4 | All `naturalWidth > 0` | ✓ |
| 5 | All `naturalHeight > 0` | ✓ |
| 6 | Hashes match source | ✓ (22/22 SHA-256 match) |
| 7 | No URL contains `/Users/` | ✓ |
| 8 | No URL contains `koda-webapp` | ✓ |
| 9 | No reference/ file used | ✓ (not copied, not referenced) |
| 10 | All assets under `/assets/landing-shots/` | ✓ |

### §38 Hero
| # | Assertion | Result |
|---|---|---|
| 1 | Exactly one hero product picture | ✓ |
| 2 | Desktop uses `hero-product-desktop.png` | ✓ (verified currentSrc) |
| 3 | Mobile uses `hero-product-mobile.png` | ✓ (verified currentSrc) |
| 4 | Mobile not loading desktop | ✓ |
| 5 | Desktop not loading mobile | ✓ |
| 6 | No old mockup | ✓ (DOM grep for `.hero-product-demo` = 0) |
| 7 | No surrounding card | ✓ (no border/background/radius on picture wrapper) |
| 8 | No crop | ✓ |
| 9 | No `object-fit: cover` | ✓ (grep = 0; uses `contain`) |
| 10 | Primary CTA visible | ✓ |
| 11 | No horizontal overflow | ✓ (0/12 viewports) |

### §39 Flow
| # | Assertion | Result |
|---|---|---|
| 1 | Exactly 5 states | ✓ (5 controls + 5 shots) |
| 2 | Order 01-05 | ✓ |
| 3-7 | Each state uses its `flow-NN-…` asset | ✓ |
| 8 | No autoplay | ✓ |
| 9 | No `setInterval` | ✓ |
| 10 | No carousel | ✓ |
| 11 | Desktop shows one state at a time | ✓ (data-active toggling) |
| 12 | Mobile shows all 5 in sequence | ✓ (5 articles) |
| 13 | Mobile uses 5 mobile PNGs | ✓ |
| 14 | Desktop uses 5 desktop PNGs | ✓ |
| 15 | No clipped image | ✓ (aspect-ratio reserved) |
| 16 | Keyboard works | ✓ (Enter/Space/Arrow/Home/End) |
| 17 | No overflow | ✓ |

### §40 Use cases
| # | Assertion | Result |
|---|---|---|
| 1 | Default is Jurídico | ✓ |
| 2-4 | Each tab uses its `usecase-…` asset | ✓ |
| 5 | CTAs point correctly | ✓ |
| 6 | No autoplay | ✓ |
| 7 | Desktop shows one case at a time | ✓ |
| 8 | Mobile shows 3 articles | ✓ |
| 9 | Mobile uses 3 mobile PNGs | ✓ |
| 10 | Desktop uses 3 desktop PNGs | ✓ |
| 11 | No carousel | ✓ |
| 12 | No overflow | ✓ |

### §41 System
| # | Assertion | Result |
|---|---|---|
| 1 | Email draft in Outlook block | ✓ |
| 2 | WhatsApp handoff in WhatsApp block | ✓ |
| 3 | Email NOT in WhatsApp block | ✓ |
| 4 | WhatsApp NOT in Outlook block | ✓ |
| 5 | Desktop uses desktop assets | ✓ (verified in all 7 desktop viewports) |
| 6 | Mobile uses mobile assets | ✓ (verified in all 4 mobile viewports) |
| 7 | WhatsApp not described as source | ✓ (microcopy: "WhatsApp não é uma fonte conectada.") |
| 8 | No "Enviar via WhatsApp" | ✓ grep = 0 |
| 9 | No "WhatsApp conectado" | ✓ grep = 0 |
| 10 | No overflow | ✓ |

## 20. Resultado do grep (§42)

Scope: `index.html pages/home.css assets/homepage-tools-workflow.js`.

| Token | Hits |
|---|---|
| `hero-product-desktop` | 2 (markup + preload) |
| `hero-product-mobile` | 2 (markup + preload) |
| `flow-01-pedido` | 4 (2 picture sources × 2 markups) |
| `flow-02-pergunta` | 4 |
| `flow-03-resposta` | 4 |
| `flow-04-revisao` | 4 |
| `flow-05-envio` | 4 |
| `usecase-legal` | 4 |
| `usecase-finance` | 4 |
| `usecase-operations` | 4 |
| `email-draft` | 2 |
| `whatsapp-handoff` | 2 |
| `background-image` | **0** |
| `object-fit: cover` | **0** |
| `transform: scale` | **0** |
| `setInterval` | **0** |
| `autoplay` | **0** |
| `carousel` | **0** |
| `swiper` | **0** |
| `slick` | **0** |
| `overflow-x: auto` | **0** |
| `Enviar via WhatsApp` | **0** |
| `WhatsApp conectado` | **0** |
| `pesquisar no WhatsApp` | **0** |
| `WhatsApp como fonte` | **0** |
| `/Users/` | **0** |
| `koda-webapp` | **0** |

All 15 banned tokens: 0 hits.

## 21-23. Lint, typecheck, build

Per spec §43 "rodar quando existirem". Project is static HTML/CSS/JS with no `package.json`:
- `npm run lint`: NOT AVAILABLE.
- `npm run typecheck`: NOT AVAILABLE.
- `npm run build`: NOT AVAILABLE.

## 24. Resultado dos testes

Playwright runner `qa-scripts/homepage-images-check.mjs`:

```
Assets HTTP 200:               22 / 22  ✓
Total VP runs:                 12
Horizontal overflow:           0 / 12   ✓
Console / page errors:         0 / 12   ✓
Hero desktop uses *-desktop:   8 / 8    ✓
Hero mobile uses *-mobile:     4 / 4    ✓
Flow has 5 shots:              12 / 12  ✓
Flow mobile has 5 articles:    12 / 12  ✓
UC has 3 shots:                12 / 12  ✓
UC mobile has 3 articles:      12 / 12  ✓
System has 2 images:           12 / 12  ✓
System mobile uses mobile:     YES
System desktop uses desktop:   YES
```

## 25. Resultado de imagens quebradas

0 broken images. All 22 PNGs served HTTP 200 under `/assets/landing-shots/`. All `<img>` elements have `naturalWidth > 0` and `naturalHeight > 0` after load.

## 26. Resultado de overflow

0/12 viewports report horizontal overflow. Confirmed at 360×640, 360×740, 390×844, 430×932 (mobile), 768×1024, 1024×768 (tablet), 1100-2048 (desktop).

## 27. Resultado de keyboard

- Flow: Tab into showcase → focus visible on active control (outline 2px white, offset 4px). Enter/Space toggles. ArrowDown/ArrowRight advances. ArrowUp/ArrowLeft retreats. Home/End jump to extremes. Active control receives focus via `focus({ preventScroll: true })`.
- Use cases: same keyboard model. Outline 2px black for visibility on white surface.
- All interactive controls (CTAs) reachable in DOM order via Tab.

## 28. Resultado de reduced motion

`@media (prefers-reduced-motion: reduce)` block scoped to `.homepage-product-images` resets:
- All animation/transition durations to 0.001ms.
- Opacity 1 and transform none on hero-proof, system blocks, active flow/usecase stage shots, active usecase copy.

Captured at `qa-screenshots/homepage-images-after/reduced-motion/` (sample).

## 29. Confirmação - desktop e mobile usam assets diferentes

Verified for all 4 picture instances (hero + flow + use cases + system) across 12 viewports × multiple states:
- Mobile viewports (360, 390, 430) → `currentSrc` always contains `-mobile.png`.
- Tablet viewports (768, 1024) → `currentSrc` contains `-desktop.png` (per §7.2 "Não usar asset mobile no tablet.").
- Desktop viewports (1100+) → `currentSrc` contains `-desktop.png`.

Total successful `<picture>` source-set selections: 100%.

## 30. Confirmação - nenhum PNG foi modificado

SHA-256 verification at copy time confirmed all 22 source/dest hashes are identical. Files are byte-for-byte copies. No compression, no resize, no manipulation. Manifest in `LANDING_SHOTS_ASSET_MANIFEST.md` shows source dimensions and bytes (1880×1160 flow desktop = 78-111 KB unchanged through copy).

## 31. Confirmação - o webapp não foi alterado

- Source repo path `/Users/alvarocamasmie/Downloads/koda-webapp/` was opened only for read (`cp` source-side, no write operations performed).
- No reference to that path appears anywhere in the landing's published files: `grep -r '/Users/'` and `grep -r 'koda-webapp'` both = 0 in scope.
- All public URLs use the landing-relative `/assets/landing-shots/…` path.

## 32. Problemas restantes

1. **Mobile preload preference.** `<link rel="preload" as="image" ...>` has 2 entries with different `media`. Browsers may evaluate both. The intended behavior is that only the matching one preloads. This is the standard responsive preload pattern; flagging only as a note.
2. **Flow showcase aspect-ratio (940/580) is a fixed ratio**, while the source PNGs are 1880×1160 (= 1.62 ratio = 940/580). The image will fit exactly; if the desktop PNGs were ever swapped for a different ratio, the `aspect-ratio` rule on `.flow-stage` would create extra whitespace. **Flagging only**.
3. **2 unreferenced JS files** (`assets/pressure-section.js`, `assets/integration-flow.js`) remain on disk. They are no longer loaded but were not deleted — deleting an entire asset file is a higher-risk operation than removing a `<script>` reference. They are unreachable and not served unless re-referenced.
4. **Outdated CSS in pages/home.css** was largely purged (285 dead rules removed). A small residue of orphaned selectors may remain (e.g. minor variants whose root prefix wasn't in my prefix list). No live page references them, so they have no visible effect. A full second-pass tidy could be scheduled separately.

None of the above breaks the §45 acceptance criteria. All 31 acceptance items pass:

- 22 PNGs inside the landing ✓
- No page depends on webapp path ✓
- Hero / flow / use cases / system all use correct asset per breakpoint ✓
- Flow no autoplay, user-controlled ✓
- Use cases no autoplay ✓
- Mobile shows all flow + all use case articles ✓
- Outlook uses email draft, WhatsApp uses handoff ✓
- WhatsApp not shown as source ✓
- No cropping, no background-image, no object-fit cover, no transform: scale ✓
- 0 broken assets ✓
- Desktop 1366×768 + 1920×1080 + mobile 360/390/430 all work without overflow ✓
- Mobile not a desktop crop ✓
- Keyboard works ✓
- Reduced motion works ✓
- No other page altered ✓
- Final report delivered ✓
