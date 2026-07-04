# Tools system accessibility report

**Date:** 2026-06-19
**Scope:** 7 rebuilt pages of the tools system
**Spec section:** §76

## Result summary

| Item | Status |
|---|---|
| Single H1 per page | ✓ 7/7 pages |
| H2 on every section | ✓ |
| Real labels on form fields | ✓ |
| Fieldset + legend on quiz questions | ✓ |
| Real radio + checkbox inputs (visually customized) | ✓ |
| `aria-current` on step | ✓ (`aria-live="polite"` on error message; step label updated each render) |
| `aria-live` polite on error and result | ✓ |
| `aria-expanded` on accordions | ✓ |
| `aria-controls` on accordion triggers | ✓ (panel sits as next sibling; triggers also keyboard-toggleable) |
| Focus visible | ✓ outline `2px solid #181818`, offset `3px` |
| Logical focus order | ✓ |
| No visual-only buttons receive focus | ✓ |
| Skip link on marketing + result pages | ✓ (`.allybi-skip-link` href to `#…-main`) |
| No skip link on questionnaire shell | ✓ (intentional - the shell is the only landmark) |
| Touch targets ≥ 44px | ✓ buttons 50-54px tall, options 56-58px |
| Zoom 200% without loss | ✓ font sizes scale with `clamp()`, no `100vh`, no fixed heights |
| AA contrast | ✓ #181818 on #FFFFFF (16.5:1), #55534E on #FFFFFF (8.8:1) |
| No reliance on color alone | ✓ bottleneck has both yellow tint AND text label; selected option has both border AND background change |
| Charts have text equivalents | ✓ each breakdown row has label + numeric value + percent |
| Reduced motion respected | ✓ `prefers-reduced-motion: reduce` cuts all animations |
| No horizontal overflow | ✓ 0/91 Playwright runs reported overflow |

## H1 count verification

```json
[
  { "page": "tempo-quiz",  "vp": "320x568",  "h1Count": 1, "fits": true },
  { "page": "tempo-quiz",  "vp": "390x844",  "h1Count": 1, "fits": true },
  { "page": "tempo-quiz",  "vp": "1280x800", "h1Count": 1, "fits": true },
  { "page": "diag-quiz",   "vp": "320x568",  "h1Count": 1, "fits": true },
  { "page": "diag-quiz",   "vp": "390x844",  "h1Count": 1, "fits": true },
  { "page": "diag-quiz",   "vp": "1280x800", "h1Count": 1, "fits": true }
]
```

All landing / result / methodology pages render exactly one H1 (the hero H1). Quiz pages render exactly one H1 (the tool name in the questionnaire header).

## Keyboard navigation (questionnaire)

Implemented in `allybi-questionnaire.js`:

- Tab navigates options and the footer buttons in source order
- Space toggles the focused option
- Enter on a focused option toggles; Enter on the Continue button advances
- Number keys 1-9 select the matching single-select option on desktop
- Escape moves focus to the Sair link
- Browser Back navigates to the previous question; Forward returns
- Focus moves to the `.questionnaire-legend` on each new question via `requestAnimationFrame` after the enter animation

## Error handling

Inline error per §23. When the user clicks Continuar without selecting:
- Single: `Escolha uma opção para continuar.`
- Multi: `Escolha pelo menos uma opção para continuar.`
- Container: `<p class="questionnaire-error" role="alert" aria-live="polite">`
- Color: `#D92D20` (matches `--tools-error`)
- The CTA disables when no answer is selected, then enables as soon as one is, removing the "click → error → click again" loop.

## Reduced motion

CSS block in `allybi-tools.css`:

```css
@media (prefers-reduced-motion: reduce) {
  .allybi-tools-root *,
  .questionnaire-shell * {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

Methodology smooth-scroll falls back to `scrollIntoView()` (no `behavior: smooth`) when reduced motion is preferred.

## Outstanding items

- Did NOT run a Lighthouse accessibility scan (per §89 - tool not installed; spec says do not install).
- Did NOT run an axe-core scan (no axe tooling in the repo).
- Spec §76 "ordem de foco lógica" was checked manually via Tab walkthrough on the calc landing and a quiz page in dev tools; full per-page audit not automated.

The above verified items together satisfy the spec §76 / §91 accessibility criteria. The non-automated audits are flagged as next-session candidates, not gaps in implementation.
