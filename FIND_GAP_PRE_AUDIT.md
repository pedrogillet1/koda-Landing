# Achar não basta — pre-audit

**Date:** 2026-06-19
**Section under audit:** `#achar-nao-basta` on `/index.html`

## File locations

| Asset | File | Lines |
|---|---|---|
| Section markup | `index.html` | 236–468 (233 lines) |
| Section CSS | `pages/home.css` | 559–1413 (~830 lines) |
| Section JS | `assets/pain-story.js` | full file (referenced by index.html line 470) |

No other CSS or JS file owns these classes. `pages/how-it-works.css` has hits for `workflow-scene-review`, which is a different namespace and out of scope.

## Current layout

- Two trees in markup: `.certainty-desktop` (sticky scrollytelling) and `.certainty-mobile` (vertical narrative).
- Desktop tree uses a `.certainty-scroll-space` with three `.certainty-anchor[data-scene=…]` that drive an `IntersectionObserver` in `pain-story.js`. Sticky stage uses `position: sticky` (and the JS sets a `--site-header-height` CSS var for header offset).
- Three scenes:
  - SCENE 1: `.scene-spread` with white "qual versão mando?" bubble + 6 chip nodes (e-mail, pasta, anexo, nuvem, upload, conversa antiga).
  - SCENE 2: `.scene-similar` with 3 white file cards (`contrato_final.pdf`, `contrato_final_v3.pdf`, `contrato_final_AGORA.pdf`) carrying badges (`versão anterior`, `fonte incerta`, `parece certo`).
  - SCENE 3: `.scene-review` with white review panel "REVISÃO ANTES DO ENVIO" containing 4 rows (Arquivo, Fonte, Destinatário, Canal), green checks, "Revisão completa" status, "Enviar via Outlook" button.
- Mobile tree has 3 `<article class="m-story">` blocks repeating the same content as cards/panels.
- Single "Ver como funciona" link to `how-it-works.html` rendered both as `.certainty-final-link` (desktop) and `.certainty-mobile__cta` (mobile).
- Counter `01 / 03` lives next to `.certainty-nav__dot` controls. The dots have no labels.

## Current section height (1366×768)

Measured via Playwright: `.certainty` height ≈ 2400px (sticky scrollytelling deliberately consumes 3× viewport so the IntersectionObserver can fire three times).

## Behaviors found

- `pain-story.js` uses `IntersectionObserver` (no `setInterval`, no `setTimeout` for autoplay). The intersection observer reacts to scroll position on the anchors — this is scroll-jacking behavior under the §0 prohibitions ("não use scroll-jacking", "não use sticky").
- Keyboard: dots accept Click + `ArrowLeft/ArrowRight/Home/End`.
- Reduced motion: respected via `@media (prefers-reduced-motion: reduce)` block.

## Banned elements found that must be removed

| Element | Location |
|---|---|
| Chips: e-mail, anexo, nuvem, pasta, conversa antiga, upload | Scene 1 (desktop + mobile) |
| White card "qual versão mando?" | Scene 1 |
| File cards `contrato_final.pdf`, `contrato_final_v3.pdf`, `contrato_final_AGORA.pdf` | Scene 2 (desktop + mobile) |
| Badges `versão anterior`, `fonte incerta`, `parece certo` | Scene 2 |
| "REVISÃO ANTES DO ENVIO" white panel | Scene 3 (desktop + mobile) |
| Rows Arquivo / Fonte / Destinatário / Canal | Scene 3 |
| Green check marks `<polyline points="20 6 9 17 4 12"/>` × 8 | Scene 3 |
| Badge "Revisão completa" | Scene 3 |
| Button "Enviar via Outlook" | Scene 3 |
| Link "Ver como funciona" × 2 (desktop + mobile) | section footer |
| Counter "01 / 03" | desktop nav |
| Dots without labels (`.certainty-nav__dot`) | desktop nav |
| H2 "Achar não basta." (fixed, gigantic) | header in both trees |
| Sticky scrollytelling | `.certainty-sticky-stage` + `.certainty-anchor` |

## Classes to delete

- `.certainty` `.certainty-desktop` `.certainty-mobile` `.certainty-scroll-space` `.certainty-sticky-stage` `.certainty-anchor` `.certainty-intro` `.certainty-body` `.certainty-copy` `.certainty-nav` `.certainty-nav__btn` `.certainty-nav__dot` `.certainty-nav__counter` `.certainty-caption` `.certainty-caption__eyebrow` `.certainty-caption__title` `.certainty-caption__body` `.certainty-final-link` `.certainty-canvas` `.certainty-scene` `.certainty-network` `.cf-warn` `.cf-dots`
- `.scene-spread` `.scene-spread__bubble` `.scene-spread__node`
- `.scene-similar` `.scene-similar__stack` `.scene-similar__card` `.scene-similar__card--warn` `.scene-similar__name` `.scene-similar__badge` `.scene-similar__badge--neutral` `.scene-similar__badge--warn`
- `.scene-review` `.scene-review__panel` `.scene-review__heading` `.scene-review__row` `.scene-review__row--source` `.scene-review__label` `.scene-review__value` `.scene-review__meta` `.scene-review__check` `.scene-review__status` `.scene-review__send`
- `.certainty-mobile__intro` `.certainty-mobile__list` `.certainty-mobile__cta`
- `.m-story` `.m-story__eyebrow` `.m-story__title` `.m-story__body` `.m-story__visual` `.m-story__visual--spread` `.m-story__visual--similar` `.m-story__visual--review`
- `.m-spread__bubble` `.m-spread__node` `.m-warn`
- `.m-similar__card` `.m-similar__card--warn` `.m-similar__name` `.m-similar__badge` `.m-similar__badge--neutral` `.m-similar__badge--warn`
- `.m-review__heading` `.m-review__row` `.m-review__row--source` `.m-review__label` `.m-review__value` `.m-review__meta` `.m-review__check` `.m-review__status` `.m-review__send`

## Files that will be altered

1. `index.html` — replace lines 236–468 (section markup) AND line 470 (drop `<script src="assets/pain-story.js" defer></script>`).
2. `pages/home.css` — replace lines 559–1413 (the entire `/* ── 2 · ACHAR NÃO BASTA ── */` block).
3. `assets/pain-story.js` — file no longer referenced; will be deleted.
4. **NEW** `assets/find-gap.js` — new controller per §§18-21.

## Files NOT altered

- Header / hero / sections 3-8 / footer / global tokens.
- `assets/css/pages/pricing.css`, `assets/css/pages/how-it-works.css`, all other pages.
- All other `.html` pages.

## Before-screenshots

13 viewports captured to `qa-screenshots/find-gap-before/{w}x{h}.png`. Confirmed: section visibly uses sticky + scroll-driven scene swapping on desktop, vertical narrative repeating cards on mobile.

## Confirmation: nothing forbidden lingers in our diff plan

The removal is by markup, not by CSS hiding (per §4 "Não esconder a implementação antiga com CSS"). The new file `pain-story.js` is deleted, not just unreferenced. Old class declarations are removed from `pages/home.css`, not left dangling.
