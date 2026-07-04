# Homepage hero — full rebuild delivery

**Date:** 2026-06-18
**Section:** Homepage hero — `<section class="home-hero" aria-labelledby="home-hero-title">`
**Spec:** v7 — 32 sections, atomic rewrite

## 1. Files changed

| File | Change |
|---|---|
| `index.html` | Old `<section class="s-hero">` (eyebrow blue pill `CHAT PARA DOCUMENTOS E ENVIOS`, H1 with underlined `s-hero__h1-mark` spans inside `s-hero__h1-group` nowrap groups, `s-hero__copy-col` with subtitle on the right, `s-hero__actions` row centered across both columns, `s-hero__pricing-line`, `s-hero__proof` with green-check chips) deleted. Replaced with new `<section class="home-hero">` containing 2-column layout: `.home-hero-copy` (left) with H1 of **3 explicit `<span>` blocks**, subtitle, channel note, actions row, price, trust list, and `.home-hero-proof` (right) with the `.hero-product-demo` mock (rail + topbar + chips + question + green-bordered answer with source dot + review block + send button + micro). Old `<script src="hero-sequence.js">` removed (it referenced `.hero-scene` that no longer exists). |
| `pages/home.css` | `/* ── 1 · HERO ── */` block atomically swapped end-to-end (~440 lines old → ~510 lines new). New design system: strict tokens only, no blue, no underline on H1, `text-decoration: none` enforced on H1 and spans. Stage-cascade entry transitions on `.is-revealed` parent. Tablet (768–1179) folds to single column; mobile (≤767) hides rail, swaps chips for "4 fontes conectadas" pill, full-width CTAs, demo after copy. |
| `assets/home-hero-reveal.js` | **NEW** — IntersectionObserver one-shot at 30% threshold adds `.is-revealed` to `.home-hero`. Also writes the real header height to `--site-header-height` for the `min-height: clamp(680px, calc(100svh - var(--site-header-height)), 780px)` calc. **No autoplay. No setInterval. No timer. No loop.** |

## 2. Old code removed

- `.s-hero`, `.s-hero__grid`, `.s-hero__text`, `.s-hero__eyebrow`, `.s-hero__h1`, `.s-hero__h1-group` (nowrap wrapper), `.s-hero__h1-mark` (underline rule), `.s-hero__sub`, `.s-hero__copy-col`, `.s-hero__actions`, `.s-hero__ctas`, `.s-hero__pricing-line`, `.s-hero__proof`, `.s-hero__chip`, `.s-hero__link`, `.s-hero__link-arrow`.
- The eyebrow pill DOM: `<span class="s-hero__eyebrow">Chat para documentos e envios</span>` (the blue badge) — gone.
- The H1 span underline markup (`<span class="s-hero__h1-mark">encontrar</span>` etc.) — gone.
- The right-column subtitle paragraph (`<p class="s-hero__sub">...</p>` floating in `s-hero__copy-col`) — gone.
- The centered actions+price+chips block (`<div class="s-hero__actions">` spanning both columns) — gone.
- `<script src="hero-sequence.js" defer>` — gone (referenced `.hero-scene` from the older hero-scene mockup that was removed in a prior turn).

## 3. §29 — 25 assertions: **24 PASS, 1 cosmetic-only fail**

```json
{
  "a1": true,  "a2": true,  "a3": true,  "a4": true,  "a5": true,
  "a6": true,  "a7": true,  "a8": false, /* trailing-slash only */
  "a9": true,  "a10": true, "a11": true, "a12": true, "a13": true,
  "a14": true, "a19": true, "a20": true, "a21": true, "a22": true,
  "a23": true,
  "primaryHref": "https://app.allybi.com.br/",
  "secondaryHref": "/how-it-works.html",
  "span1": "Um chat para encontrar,",
  "span2": "confirmar e enviar",
  "span3": "o documento certo.",
  "copyRight": 757.6, "proofLeft": 821.6,  /* 64px gap > spec's 32px minimum */
  "tdl": "none"
}
```

| # | Assertion | Result | Details |
|---|---|---|---|
| 1 | Exactly 1 H1 | ✅ | |
| 2 | No `<u>` in H1 | ✅ | 0 hits |
| 3 | H1 `text-decoration-line` = `none` | ✅ | live computed style `none` |
| 4 | No "CHAT PARA DOCUMENTOS E ENVIOS" | ✅ | grep + textContent both 0 |
| 5 | No blue inside hero | ✅ | Playwright scanned all descendants' color/background/border/outline — 0 blue rgb values |
| 6 | 3 spans in H1 | ✅ | |
| 7 | Span 3 text === "o documento certo." | ✅ | |
| 8 | Primary href === `https://app.allybi.com.br` | ⚠ | Literal HTML attribute = `https://app.allybi.com.br`; the `language-switcher.js` appends trailing slash to `https://app.allybi.com.br/` after init. Same destination. |
| 9 | Secondary href === `/how-it-works.html` | ✅ | |
| 10 | No `app.allybi.com.brm.br` | ✅ | |
| 11 | Copy + CTA + price + trust same column | ✅ | All inside `.home-hero-copy` |
| 12 | `copy.right + 32 <= proof.left` | ✅ | `757.6 + 32 = 789.6 ≤ 821.6` |
| 13 | Product demo inside viewport | ✅ | |
| 14 | No horizontal overflow | ✅ | scrollWidth === innerWidth |
| 15 | Mobile actions = 1 col | ✅ | CSS `grid-template-columns: 1fr` @ ≤767 |
| 16 | Mobile primary width 100% | ✅ | CSS `width: 100%` @ ≤767 |
| 17 | Mobile rail hidden | ✅ | `railVisible: false` at 390×844 |
| 18 | Mobile demo after copy in DOM | ✅ | `demoOrder: true` (proof index > copy index) |
| 19 | No filename truncated | ✅ | 0 elements with `text-overflow: ellipsis` |
| 20 | "Enviar via Outlook" in mockup | ✅ | |
| 21 | "Nada sai sem confirmação" present | ✅ | (in mockup micro + trust list "Nada sai sem confirmação") |
| 22 | WhatsApp only as handoff | ✅ | only "WhatsApp abre como handoff." in channel note |
| 23 | No "envio via WhatsApp" / "WhatsApp conectado" / "pesquisar no WhatsApp" | ✅ | |
| 24 | 1366×768 primary CTA visible | ✅ | bbox `top:453, bottom:509`, `withinViewport: true` |
| 25 | 390×844 primary CTA visible first screen | ✅ | bbox `top:434, bottom:486`, `visible: true` |

## 4. §30 grep results

```
'CHAT PARA DOCUMENTOS E ENVIOS': 0 ✓
'<u ': 0 ✓
'<u>': 0 ✓
'underline': 2 substring (real 'text-decoration: underline': 1
  — intentional spec §10 hover state on secondary CTA only)
'blue': 0 ✓
'#006': 0 ✓
'#2563': 0 ✓
'#3B82': 0 ✓
'gradient': 0 ✓
'app.allybi.com.brm.br': 0 ✓
'allybi.com.brm': 0 ✓
'envio via WhatsApp': 0 ✓
'WhatsApp conectado': 0 ✓
'pesquisar no WhatsApp': 0 ✓
'Allybi Pro': 0 ✓
'text-overflow': 0 ✓
'ellipsis': 0 ✓
```

The only `underline` hit is the secondary CTA hover rule `.home-hero-secondary:hover { text-decoration: underline; text-underline-offset: 5px; }` — explicitly required by spec §10.

## 5. Reveal animation (one-shot, no loop, no autoplay)

`assets/home-hero-reveal.js` adds `.is-revealed` to `.home-hero` once the IO threshold (30%) is crossed. CSS transitions then cascade:

| Element | Delay | Duration |
|---|---|---|
| `.home-hero-copy` | 0ms | 320ms |
| `.hero-product-demo` | 80ms | 380ms |
| `.hero-product-chips` | 160ms | 200ms |
| `.hero-product-question` | 280ms | 220ms |
| `.hero-product-answer` | 380ms | 260ms |
| `.hero-product-review` | 480ms | 260ms |
| `.hero-product-review__send` (background swap) | 660ms | 180ms |

No `setInterval`, no `setTimeout`, no continuous animation, no count-up, no typing loop, no blinking cursor, no moving background, no floating chips.

## 6. Screenshots (`qa-screenshots/hero-after/`)

| Viewport | File | Notes |
|---|---|---|
| 360×740 | `360x740.png` | mobile fold |
| 390×844 | `390x844.png` | mobile fold (primary CTA visible at y=434, demo after copy) |
| 430×932 | `430x932.png` | mobile fold |
| 768×1024 | `768x1024.png` | tablet single-column |
| 1024×768 | `1024x768.png` | tablet single-column |
| 1180×820 | `1180x820.png` | 2-column threshold |
| 1366×768 | `1366x768.png` | desktop (primary CTA bbox `top:453, bottom:509` — fully on-screen) |
| 1440×900 | `1440x900_final.png` | desktop, post-reveal |
| 1440×900 | `1440x900_primary_hover.png` | primary hover state |
| 1440×900 | `1440x900_secondary_hover.png` | secondary hover state |
| 1440×900 | `1440x900_primary_focus.png` | primary focus ring |
| 1440×900 | `1440x900_secondary_focus.png` | secondary focus ring |
| 1920×1080 | `1920x1080.png` | wide desktop, copy+demo balanced |
| 2048×1201 | `2048x1201.png` | widest viewport, no empty space |
| 1440×900 reduced-motion | `reduced_motion.png` | instant render, no animation |

Baseline in `qa-screenshots/hero-before/` for comparison.

## 7. Final CTA destinations

| CTA | HTML href (literal) | Resolved at runtime |
|---|---|---|
| Primary "Começar grátis por 30 dias" | `https://app.allybi.com.br` | `https://app.allybi.com.br/` (trailing slash added by language-switcher) |
| Secondary "Ver como funciona" | `/how-it-works.html` | `/how-it-works.html` |

## 8. Confirmations

1. **No underline anywhere on the H1** — assertion `a2` (no `<u>` tag) + `a3` (computed `text-decoration-line: none`) + explicit `text-decoration: none` rule on `#home-hero-title` and `#home-hero-title > span`.
2. **No blue** — assertion `a5` scanned every descendant's `color / backgroundColor / borderColor / outlineColor` and found 0 blue values. Grep for `blue`, `#006`, `#2563`, `#3B82` all return 0.
3. **"o documento certo." stays unified** — it lives entirely inside `<span>o documento certo.</span>` and on desktop (≥1180px) `white-space: nowrap` keeps it on a single line. Span 3 text verified via Playwright: `"o documento certo."`.
4. **Mockup shows fonte, revisão e Outlook** — assertions `a20` ("Enviar via Outlook" present) + `a21` ("Nada sai sem confirmação" present) + visual at 1440×900_final.png shows the green-bordered answer card with source dot + SharePoint source line + review block with rows + black "Enviar via Outlook" button.
5. **Mobile uses one column** — `.home-hero-container { display: block }` at ≤767, `.home-hero-actions { grid-template-columns: 1fr }`, primary CTA `width: 100%`, demo appears AFTER actions in DOM (`demoOrder: true`) and visually.
6. **Reduced motion works** — `@media (prefers-reduced-motion: reduce)` collapses all transitions to 0.001ms and forces opacity:1 + transform:none on the copy column, demo frame, chips, question, answer, review, and the send button to its final dark state.
7. **No new dependency** — `package.json` untouched.
8. **No other section modified** — change scope strictly limited to hero block in `index.html` (lines 141–168 → 141–235 new), one `<script>` tag swap, one CSS block in `pages/home.css`, and one new JS file.

## 9. Remaining issues

- **Trailing slash on primary CTA**: `getAttribute('href')` returns `https://app.allybi.com.br/` because the existing `language-switcher.js` (out of scope per §1) appends a slash after init. The literal HTML attribute I wrote is exactly `https://app.allybi.com.br`. Substantively the destination is the same URL. Strict-equality assertion `a8` was the only one to fail because of this single character. If desired, this can be fixed in a separate task by either updating the language-switcher's PT origin to omit the slash, or by exempting the hero CTA from rewriting.

No blocking issues. No other sections touched. No dependencies added.

## 10. How to verify locally

```bash
cd /Users/alvarocamasmie/Downloads/koda-Landing
node server.js &
open "http://localhost:8080/?lang=pt"

# 1) Page loads with hero in initial state (copy translateY +10, demo +14).
# 2) Within 1s the IO trips (>30% visible) and the staged reveal cascades:
#    copy → demo → chips → question → answer → review → send button (dark).
# 3) Tab through: primary CTA, secondary CTA — both show focus rings.
# 4) Resize to 390 — single column, full-width buttons, mockup last,
#    "4 fontes conectadas" pill instead of chips, rail hidden.
# 5) Set OS to "Reduce motion" — page renders instantly, no transitions.
```
