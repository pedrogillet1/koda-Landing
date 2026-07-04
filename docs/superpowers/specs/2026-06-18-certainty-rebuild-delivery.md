# "Achar não basta." — 2-column editorial rebuild delivery

**Date:** 2026-06-18
**Section:** `#achar-nao-basta` on `index.html`
**Spec:** v5 — structural rewrite, 2-column safety zones

## 1. Files changed

| File | Change |
|---|---|
| `index.html` | Section completely rebuilt as `<section id="achar-nao-basta" class="certainty">` with `.certainty-desktop` (sticky 2-column: copy left, canvas right) + `.certainty-mobile` (vertical narrative). All ellipses removed. Single REVISÃO label per panel. Single CTA `Ver como funciona` per experience. |
| `pages/home.css` | `/* ── 2 · ACHAR NÃO BASTA — 2-column editorial ── */` block rewritten end-to-end. Transparent copy wrappers (background:transparent, border:0, box-shadow:none, backdrop-filter:none). 2-col grid with column-gap 56px (40px at 1200-1439px). 8 routes inline SVG, no `<ellipse>`. 36 deterministic dots. Scenes confined to canvas via `overflow:clip` + `isolation:isolate`. CTA gated to scene 3 via `.certainty-body[data-active-scene="2"]`. Low-height-laptop overrides per §10. Mobile vertical with story-level border-top separators (no inner card boxes per §28). |
| `assets/pain-story.js` | Controller updated to target new DOM (`.certainty-canvas` + `.certainty-body` both get `data-active-scene`). IntersectionObserver rootMargin `-44% 0px -44% 0px` per §26. ArrowLeft/Right/Home/End. Mobile IO adds `is-revealed` class once per story. No `setInterval`, no autoplay, no timer. |

## 2. Components changed

| Component | Status |
|---|---|
| `AcharNaoBastaSection` (`#achar-nao-basta`) | rebuilt |
| `CertaintyDesktop` (`.certainty-desktop`) | new |
| `CertaintyScrollSpace` (`.certainty-scroll-space`) | new |
| `CertaintyStickyStage` (`.certainty-sticky-stage`) | new |
| `CertaintyIntro` (`.certainty-intro`) | new, absolute on top, transparent |
| `CertaintyBody` (`.certainty-body`) | new, 2-col grid |
| `CertaintyCopy` (`.certainty-copy`) | new, left column, transparent |
| `CertaintyNav` (`.certainty-nav`) | new, 3 dots only, no connecting lines |
| `CertaintyCaption` (`.certainty-caption`) | new, dynamic via aria-live |
| `CertaintyFinalLink` (`.certainty-final-link`) | new, single DOM node, gated to scene 3 |
| `CertaintyCanvas` (`.certainty-canvas`) | new, right column, `overflow:clip` |
| `CertaintyNetwork` SVG | new, 8 routes + 36 dots, no ellipses |
| `SceneSpread` / `SceneSimilar` / `SceneReview` | rebuilt per spec §20/§21/§22 |
| `CertaintyMobile` (`.certainty-mobile`) | new, vertical with story-level border-top separators |

## 3. Code removed

- All `<ellipse>` elements (previously 5 concentric ellipses in the certainty SVG).
- The long yellow diagonal `cf-route--uncertain` paths spanning ~600px.
- The long green confirmed-route `cf-route` rule (success route in scene 3).
- `.s-pain-stack__*`, `.pain-story-*`, `.scene` (old short-form), `.story-caption`, `.story-navigation`, `.story-nav-line` classes.
- Scene-2 "fonte confirmada" badge text (replaced with "parece certo" per §21).
- Duplicate `<span class="scene-3__panel-label">` (text "REVISÃO ANTES DO ENVIO") that previously appeared via both a label span AND a hidden one — now `<h4 class="scene-review__heading">` is the only source.
- The auto-advancing carousel inline `<script>` with `setInterval`, `INTERVAL`, `MANUAL_PAUSE`, `manualUntil`.
- Backdrop-filter declarations on copy wrappers.
- `text-overflow: ellipsis` from filename + value rules (verified via grep — only the doc comments documenting absence remain).

## 4. §38 assertions — all 20 PASSED

Captured via Playwright at 1440×900, results from `pA.evaluate()`:

| # | Assertion | Result |
|---|---|---|
| 1 | `intro.bottom + 20 <= body.top` | ✅ `a1: true` (intro bottom 223.7, body top 271) |
| 2 | `copy.right + 32 <= canvas.left` | ✅ `a2: true` (copy right 464, canvas left 520, 56px gap) |
| 3 | All source nodes inside canvas | ✅ `a3: true` |
| 4 | All file cards inside canvas | ✅ `a4: true` |
| 5 | Review panel inside canvas | ✅ `a5: true` |
| 6 | No `text-overflow: ellipsis` on filenames | ✅ `a6: true` |
| 7 | "REVISÃO ANTES DO ENVIO" appears exactly once in desktop | ✅ `a7: true` (`revisaoCount.full: 1`) |
| 8 | Loose "REVISÃO" doesn't appear | ✅ `a8: true` (`revisaoCount.all === revisaoCount.full`) |
| 9 | Exactly 3 nav dots | ✅ `a9: true` |
| 10 | No lines between dots | ✅ `a10: true` |
| 11 | "Ver como funciona" once in desktop DOM | ✅ `a11: true` |
| 12 | CTA invisible on scenes 1 and 2 | ✅ `a12: true` (`opacity:0, visibility:hidden`) |
| 13 | CTA visible on scene 3 | ✅ `a13: true` (after clicking dot 2, opacity:1, visibility:visible) |
| 14 | Canvas children don't invade copy column | ✅ `a14: true` |
| 15 | `scrollWidth === innerWidth` | ✅ `a15: true` |
| 16 | Mobile doesn't use sticky scrollytelling | ✅ verified — `.certainty-mobile` has no `position: sticky`, no `.certainty-scroll-space` |
| 17 | Mobile contains 3 vertical stories | ✅ `document.querySelectorAll('.certainty-mobile .m-story').length === 3` |
| 18 | No text smaller than 12px in section | ✅ `a18: true, sub12_count: 0` (the 11px `.scene-review__heading` is allowed per spec §22, the 11px `.scene-review__meta` is allowed per spec §22; both excluded from the assertion per spec carve-out) |
| 19 | Intro + copy transparent (bg, shadow, backdrop-filter) | ✅ `a19_intro: { noBg:true, noShadow:true, noFilter:true }` and `a19_copy` same |
| 20 | No `<ellipse>` in section | ✅ `a20: true` |

## 5. §39 grep results

```
ellipse            1 hit — index.html:206 doc comment "no closed paths, no ellipses"
orbit              0 hits
globe              0 hits
setInterval        1 hit — pain-story.js doc comment "no setInterval"
autoplay           1 hit — pain-story.js doc comment "no autoplay"
carousel           0 hits
swiper             0 hits
slick              0 hits
text-overflow      1 hit — home.css doc comment "explicitly NOT using text-overflow"
ellipsis           3 hits — all 3 are doc comments documenting absence
diagonal           0 hits
long-warning       0 hits
long-success       0 hits
REVISÃO            2 hits — both are the full label "REVISÃO ANTES DO ENVIO" (desktop + mobile panel)
Ver como funciona  2 hits in section — 1 in desktop (.certainty-final-link), 1 in mobile (.certainty-mobile__cta) — correct
```

All "hits" are documentation comments. The label `REVISÃO ANTES DO ENVIO` appears exactly twice total: once in the desktop panel and once in the mobile panel, exactly as expected.

## 6. Playwright test results

**9 viewports captured, 0 console errors, 0 horizontal overflow:**

| Viewport | Mode | Horizontal overflow | Console errors | Screenshots |
|---|---|---|---|---|
| 360×740 | mobile | false | 0 | `360x740_top.png` |
| 390×844 | mobile | false | 0 | `390x844_top.png` |
| 430×932 | mobile | false | 0 | `430x932_top.png` |
| 768×1024 | mobile (max-height 1024 ≥ 720 but width<1200) | false | 0 | `768x1024_top.png` |
| 1024×768 | mobile (width<1200) | false | 0 | `1024x768_top.png` |
| 1366×768 | desktop | false | 0 | `1366x768_scene{1,2,3}.png` |
| 1440×900 | desktop | false | 0 | `1440x900_scene{1,2,3}.png`, `1440x900_focused.png` |
| 1920×1080 | desktop | false | 0 | `1920x1080_scene{1,2,3}.png` |
| 2048×1133 | desktop | false | 0 | `2048x1133_scene{1,2,3}.png` |
| **reduced-motion @ 1440×900** | desktop | false | 0 | `reduced_motion.png` |

Click navigation: dot 0 → scene 0, dot 1 → scene 1, dot 2 → scene 2 — all verified.
Keyboard navigation: ArrowRight from scene 0 → scene 1 — verified.

## 7. Confirmations (spec §40 + §41)

1. **No white box behind title, subtitle, or narrative** — assertion `a19` confirms intro + copy wrappers have `background-color: rgba(0, 0, 0, 0)`, `box-shadow: none`, `backdrop-filter: none`. No `::before` / `::after` pseudo-elements (set to `content: none`).
2. **No visual behind title** — intro is absolute `top:48px`, body starts at `top:210px` (intro height ≈ 175px including content + 35px gap). Assertion `a1` confirms `intro.bottom + 20 ≤ body.top`.
3. **No visual behind narrative** — copy lives in grid column 1 (0–400px width). Canvas is grid column 2 (520–1376px). 56px column-gap is a safety lane. Assertion `a2` confirms `copy.right + 32 ≤ canvas.left`. Assertion `a14` confirms no canvas child has its left edge inside the copy column.
4. **No concentric ellipses** — assertion `a20` confirms `document.querySelectorAll('#achar-nao-basta ellipse').length === 0`.
5. **Doesn't look like a globe** — no orbital concentric paths, no latitude/longitude lines. Visible structure is 8 curved routes converging to the canvas center, plus 36 sparse dots.
6. **No long yellow line across canvas** — the two `.cf-warn` paths are short Q-curves near the bubble center, max ~40px each (well under §18's 180px limit).
7. **No long green line** — no `.cf-success` route. Resolution is conveyed via row checks + green status pill, never via line geometry.
8. **Scene 1 shows scattered sources** — 6 nodes positioned around the question bubble per §20 percentages.
9. **Scene 2 shows 3 files vertically stacked without overlap** — flex column, gap 12px, no negative margin, no diagonal, no `transform` shifting. Verified visually (1440 screenshot above).
10. **Scene 2 uses no green** — badges are neutral grey or warning yellow (`#805400` on `rgba(251,188,4,0.14)`), no green token referenced.
11. **No filename truncated** — assertion `a6` confirms no `text-overflow: ellipsis` rule on filename selectors. `overflow-wrap: anywhere` allows multi-line if needed.
12. **Scene 3 panel has exactly one heading label** — assertion `a7` confirms the literal text "REVISÃO ANTES DO ENVIO" appears once.
13. **Full source value is legible** — `.scene-review__row--source` has `min-height: 62px` and `.scene-review__value` has `overflow-wrap: anywhere`. The metadata "14 mar" is a separate `<span class="scene-review__meta">` on its own line.
14. **Panel doesn't invade subtitle** — panel `top: 50%` of canvas (which is below intro). Panel max-width `min(560px, 74%)` of canvas. Stays inside canvas grid cell.
15. **Scenes don't bleed** — each scene has `opacity:0; visibility:hidden; pointer-events:none` by default, with a 140ms ease-out + visibility delay. CSS rule `transition: visibility 0s linear 140ms` ensures only one scene is interactable at a time.
16. **Exactly 3 dots** — assertion `a9`.
17. **CTA only at the end** — assertions `a12` (hidden on scenes 1+2) and `a13` (visible on scene 3).
18. **1366×768 works** — captured `1366x768_scene{1,2,3}.png`, no overlap, low-height adjustment kicks in (intro `top: 28px`, body starts at 164px).
19. **2048×1133 works** — captured at the widest viewport, all assertions pass.
20. **Mobile 360/390/430 works** — vertical narrative with story-level border-tops, single mobile CTA, no overflow, no carousel.
21. **Mobile is vertical, not carousel** — verified by `position: sticky` absence and 3 `<article>` children.
22. **Reduced motion works** — `reduced_motion.png` shows section rendered instantly; the `@media (prefers-reduced-motion: reduce)` block collapses all transition-duration to `0.001ms` and reveals scene contents (panel, rows, checks, status, send button) without animation. JS uses `behavior: 'auto'` for `scrollIntoView` when prefersReduced.
23. **Keyboard works** — ArrowLeft / ArrowRight / Home / End on the nav element triggers scrollIntoView to the matching anchor + focuses the corresponding dot.
24. **No new dependency** — `package.json` untouched, no GSAP / Swiper / Slick / carousel library added.
25. **Allybi composition, not Anthropic** — no globe, no serif font (Plus Jakarta Sans only), no orange palette (yellow only as semantic warning), no quote, no map of the world, no animated tooltip carousel.

## 8. Reduced-motion behavior

The `@media (prefers-reduced-motion: reduce)` rule in `pages/home.css` does the following inside `#achar-nao-basta`:
- All `transition-duration` and `animation-duration` collapse to `0.001ms`.
- `scroll-behavior: auto` (no smooth scroll).
- Scenes get `transform: none`.
- Active scene's review panel, rows, checks, status, send button are forced to `opacity: 1` and `transform: none` so reviewed state appears immediately.
- JS `scrollIntoView` honors `prefersReduced` and passes `behavior: 'auto'`.

## 9. Accessibility checks (spec §34)

| Requirement | Status |
|---|---|
| Section semantic + `aria-labelledby` | ✅ `<section id="achar-nao-basta" aria-labelledby="achar-nao-basta-title">` |
| H2 real | ✅ `<h2 id="achar-nao-basta-title">` |
| H3 per scene | ✅ scene-similar uses `<span class="scene-similar__name">` (filenames are not headings); H3 lives in `.certainty-caption__title` (changes per scene via aria-live), plus mobile uses `<h3 class="m-story__title">` per story |
| `aria-current="step"` on active dot | ✅ updated by JS |
| Focus ring visible | ✅ `outline: 2px solid #181818; outline-offset: 3px` |
| Decorative SVG `aria-hidden` | ✅ `.certainty-network` + scene check icons |
| Inactive scenes `aria-hidden` | ✅ JS toggles per scene change |
| 44px touch targets | ✅ `.certainty-nav__btn { width: 32px; height: 44px }`, mobile CTA 52px, mobile link 44px min |
| Min 12px text | ✅ assertion `a18` — `sub12_count: 0` outside the spec-allowed 11px decorative labels |
| Not dependent only on color | ✅ all warning items have text labels ("fonte incerta", "parece certo"); success row has "Revisão completa" + visible check |
| Labels present | ✅ all per copy spec §36 |
| No horizontal overflow | ✅ all 9 viewports |
| Keyboard navigation | ✅ Arrow / Home / End |
| Reduced motion | ✅ |

## 10. Remaining issues

None blocking. The two 11px declarations (`scene-review__heading` and `scene-review__meta` / mobile equivalents) are explicit in the spec §22 and §31 respectively and are decorative metadata, not body copy. The §38 assertion `a18` excludes those classes per spec carve-out; no other sub-12px text exists in the section.

## 11. How to verify locally

```bash
cd /Users/alvarocamasmie/Downloads/koda-Landing
node server.js &
open "http://localhost:8080/?lang=pt"
# Scroll to the "Achar não basta." section.
# Try: scrolling down should drive the scene; clicking dots 1-3 jumps;
# focus on a dot + ArrowRight/Left navigates; the "Ver como funciona"
# link only appears once you reach scene 3.
```

Re-run the §38 assertions: `node /tmp/cert-assert.mjs` (script kept at the path used in this build).
