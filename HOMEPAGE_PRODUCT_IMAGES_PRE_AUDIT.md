# Homepage product-images integration - pre-audit

**Date:** 2026-06-19
**Homepage file:** `/Users/alvarocamasmie/Downloads/koda-Landing/index.html`
**Source repo (read-only):** `/Users/alvarocamasmie/Downloads/koda-webapp/artifacts/landing-shots/` - 22 PNGs across hero/flow/use-cases/system (reference/ subfolder is empty).

## Sections in scope

| # | Title | Class / ID | Lines (current) |
|---|---|---|---|
| 1 | Hero ("Um chat para encontrar, confirmar e enviar o documento certo.") | `section.home-hero` (lines 144-231) | 88 lines |
| 2 | "Uma conversa reduz o caminho inteiro." | `section#workflow-proof.workflow-section` (lines 558-751) | 194 lines |
| 3 | "Momentos em que ninguém quer adivinhar." | `section#use-cases.pressure-section` (lines 1046-1265) | 220 lines |
| 4 | "Suas fontes e seus envios no mesmo fluxo." | `section#home-integrations-flow.integration-flow-section` (lines 756-1041) | 286 lines |

## Current state per section

### §7 Hero
- `.home-hero` container has 2-col grid: `.home-hero-copy` + `.home-hero-proof` (the visual side).
- `.home-hero-proof` contains a CSS-drawn product mockup (`.hero-product-demo`) with chat rail, top bar, chat bubbles, review panel, and a fake "Enviar via Outlook" send-pill - 87 lines of mock HTML that must be removed.

### §8 Workflow proof ("Uma conversa reduz o caminho inteiro")
- 5-step stepper (desktop) + product theater visualization (`.ws-app`, `.ws-app__chat`, `.ws-request`, `.ws-answer`, `.ws-review`, `.ws-toast`) - all CSS-drawn product UI.
- Mobile variant: `<article class="workflow-m-story">` × 5 with own mocks (`.wm-request`, `.wm-review`, `.wm-toast`, `.wm-review__send`).
- Driven by `assets/homepage-tools-workflow.js` (no autoplay verified).

### §14 Use cases ("Momentos em que ninguém quer adivinhar")
- 3-tab editorial layout (Jurídico / Financeiro / Operações).
- Each tab has copy + a CSS-drawn "pressure preview" panel.
- Mobile: 3 articles vertical.
- Driven by `assets/pressure-section.js`.

### §21 Integration flow ("Suas fontes e seus envios")
- Top: source-flow visualization with 4 connected source icons (Outlook / OneDrive / SharePoint / Uploads).
- Middle: the Outlook + WhatsApp pair currently shown as small status cards with fake "ATIVO" / "HANDOFF" badges.
- Driven by `assets/integration-flow.js`.

## Banned items inventory (per §33)

| Item | Section | Notes |
|---|---|---|
| `hero-product-demo` CSS mockup | Hero | 87 lines including fake "Enviar via Outlook" |
| `ws-app` product theater | Workflow proof | ~150 lines of CSS-drawn chat |
| `wm-request/wm-review/wm-toast` mobile mocks | Workflow proof | 5 × ~12 lines |
| Use cases "pressure preview" CSS panels | Pressure | drawn in CSS |
| "ATIVO" / "HANDOFF" status mockup cards | Integration flow | with fake badges |
| Old "Enviar via Outlook" pill (decorative) | Multiple places | grep returns 5+ |

## Animations / autoplay scan

- `grep setInterval index.html`: 0
- `grep autoplay index.html`: 0
- `grep carousel index.html`: 0
- `grep "swiper\|slick"`: 0
- `assets/homepage-tools-workflow.js`: keyboard-controlled, no autoplay.
- `assets/pressure-section.js`: keyboard-controlled, no autoplay.
- `assets/integration-flow.js`: reveal-on-scroll only (IntersectionObserver), no scene rotation.

## Asset directory

- Public root: `assets/` (referenced as relative paths like `assets/images/...`).
- New URL prefix for product shots: `/assets/landing-shots/` (per spec §2).
- Existing landing-shots directory: created at `assets/landing-shots/{hero,flow,use-cases,system}/`.

## Source repo verification

```
/Users/alvarocamasmie/Downloads/koda-webapp/artifacts/landing-shots/
├── hero/        (2 files)
├── flow/        (10 files)
├── use-cases/   (6 files)
├── system/      (4 files)
└── reference/   (empty, skipped)
```

System files use the `system-` prefix: `system-email-draft-{desktop,mobile}.png`, `system-whatsapp-handoff-{desktop,mobile}.png`. The §3 spec accepts both naming forms; we preserve the source names.

## SHA-256 verification

All 22 source → dest copies verified bit-identical. Manifest at `LANDING_SHOTS_ASSET_MANIFEST.json` lists each file's natural width/height + SHA-256 + size.

| Subdir | Files | All bytes match |
|---|---|---|
| hero/ | 2 | ✓ |
| flow/ | 10 | ✓ |
| use-cases/ | 6 | ✓ |
| system/ | 4 | ✓ |
| **Total** | **22** | **22 / 22** |

PNG natural dimensions (read via PNG header):
- Hero desktop: 1280×1120; mobile: 700×920
- Flow desktop: 1880×1160 (all 5); mobile: 700×880 (all 5)
- Use case desktop: 1440×1040 (all 3); mobile: 700×860 (all 3)
- System desktop: 1440×1080 (both); mobile: 700×1000 (both)

These are 2× retina assets; the spec §27 project ratios (e.g. hero 640/560) will be used in `width`/`height` CSS attributes to prevent CLS.

## Before-screenshots

12 viewports captured to `qa-screenshots/homepage-images-before/{w}x{h}.png`.

## Files that will be altered

1. `index.html` - replace markup of 4 sections + add 2 preload links in `<head>`.
2. `pages/home.css` - delete CSS blocks for the old mockups (`hero-product-demo*`, `ws-app*`, `wm-*`, `workflow-stepper*`, `workflow-product-stage*`, `integration-flow-channel*`, `pressure-preview*`); add new CSS for `.product-shot-picture` + new flow/use-case/system controls.
3. `assets/homepage-tools-workflow.js` - rewrite for new flow tabs + image preload (no autoplay).
4. `assets/pressure-section.js` - rewrite for new use-case tabs.
5. `assets/integration-flow.js` - delete the channels-cards JS; replace with new outlook/whatsapp editorial blocks JS (or simple reveal observer).
6. **NEW** `LANDING_SHOTS_ASSET_MANIFEST.md` (human-readable manifest).
7. **NEW** `qa-scripts/homepage-images-check.mjs` Playwright runner.
8. **NEW** `HOMEPAGE_PRODUCT_IMAGES_INTEGRATION_REPORT.md` final report.

## Files NOT altered

- Other HTML pages (about, contact, faq, integrations, security, pricing, tos, terms, privacy, cookies, how-it-works, integration-data-use, data-deletion, use-case-*, diagnostics, tools pages).
- `allybi-tokens.css`, base/components/header/footer CSS.
- The webapp source repo (read-only).
- `assets/find-gap.js`, `assets/security-page.js`, `assets/security-sections.js` (unrelated controllers).

## Header / global

Header is `<header id="allybi-header">` (61-72px fixed). No change required - the hero already accounts for it. Will verify no horizontal overflow is introduced by the new layout.
