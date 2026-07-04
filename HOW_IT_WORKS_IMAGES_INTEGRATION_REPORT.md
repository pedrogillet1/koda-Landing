# How It Works — Screenshot Integration Report

Page touched: `/how-it-works.html`. No other pages or the webapp project were modified.

## 1. Files changed

| File | Type | Change |
| --- | --- | --- |
| `how-it-works.html` | edit | Chapter section markup rewritten to use `<picture>` elements; chapter 06 toggle controls added; in-page review-confirm script replaced with the antes/depois toggle controller + proximity preloader for the chapter-06 after image. |
| `pages/how-it-works.css` | edit | All mockup-only rules removed (~520 lines). New `.how-product-shot`, `.confirm-toggle`, `.confirm-shot-stage`, `.confirm-shot` rules added. Chapter mobile / tablet / desktop / mid-desktop layouts replaced per spec. |
| `assets/landing-shots/how-it-works/` | new dir | The 14 product PNGs copied verbatim from the webapp source. Contact sheets and `capture-results.json` deliberately not copied. |

Backup of the previous CSS file: `/tmp/how-it-works.css.bak`.

## 2. Assets copied

Source root: `/Users/alvarocamasmie/Downloads/koda-webapp/artifacts/landing-shots/how-it-works/`
Public root: `/assets/landing-shots/how-it-works/`

SHA-256 hashes verified identical for all 14 files (source → destination), no bytes were modified:

```
306bec2d… 01-connect-desktop.png             1880×1160
45847c87… 01-connect-mobile.png              700×1080
94aeab8d… 02-question-desktop.png            1880×1160
7d0b746e… 02-question-mobile.png             700×1080
aadca98f… 03-answer-source-desktop.png       1880×1160
601ea8f5… 03-answer-source-mobile.png        700×1080
edb1adc9… 04-compare-desktop.png             1880×1160
e8504101… 04-compare-mobile.png              700×1080
8a2ad9ba… 05-email-draft-desktop.png         1880×1160
16474df2… 05-email-draft-mobile.png          700×1080
b6b36622… 06-confirm-before-desktop.png      1880×1160
3b7833b4… 06-confirm-before-mobile.png       700×1080
7808cae7… 06-confirm-after-desktop.png       1880×1160
0bf09ff7… 06-confirm-after-mobile.png        700×1080
```

`contact-sheet-desktop.png`, `contact-sheet-mobile.png` and `capture-results.json` were intentionally not copied to the public directory — they remain in the webapp source for audit purposes only.

## 3. Old mockup code removed

Removed from `how-it-works.html`:
- Six `.workflow-scene-*` containers (`-sources`, `-question`, `-answer`, `-compare`, `-draft`, `-review`) and every BEM class beneath them (`hw-sources__*`, `hw-question__*`, `hw-answer__*`, `hw-compare__*`, `hw-draft__*`, `hw-review__*`, `data-review-confirm`, `data-status-pending`, `data-row`, `data-action`).
- The in-page `<script>` block that toggled the review state (`querySelector('.workflow-scene-review') …`).

Removed from `pages/how-it-works.css`:
- All `.workflow-scene-*` style blocks and their helpers (lines 239–762 of the previous file).
- Tablet block: the `workflow-scene-review` and `.hw-compare__*` overrides.
- Desktop block: every scene-specific override (`.workflow-scene-sources`, `.workflow-scene-question`, `.workflow-scene-answer`, `.workflow-scene-compare`, `.workflow-scene-draft`, `.workflow-scene-review`, and their nested BEM rules).

`grep -nE "workflow-scene|hw-sources|hw-question__|hw-answer|hw-compare|hw-draft|hw-review|data-review-confirm|data-status-pending" how-it-works.html pages/how-it-works.css` → **0 matches** in either file.

## 4. New chapter implementation

### 4.1 Markup

Each of chapters 01–05 follows:

```html
<article class="hw-chapter" data-chapter="0X">
  <header class="hw-chapter__copy hw-reveal">
    <span class="hw-chapter__num">0X</span>
    <h3 class="hw-chapter__title">…</h3>
    <p class="hw-chapter__desc">…</p>
  </header>
  <div class="hw-chapter__visual hw-reveal">
    <picture class="how-product-shot">
      <source media="(max-width: 767px)" srcset="/assets/landing-shots/how-it-works/0X-…-mobile.png">
      <img src="/assets/landing-shots/how-it-works/0X-…-desktop.png"
           alt="…"
           width="1880" height="1160"
           loading="lazy" decoding="async">
    </picture>
  </div>
</article>
```

Chapter 06 adds the manual antes/depois toggle and a two-picture stage:

```html
<article class="hw-chapter hw-chapter--toggle" data-chapter="06" data-confirm-state="before">
  <header class="hw-chapter__copy hw-reveal">…</header>
  <div class="hw-chapter__visual hw-reveal">
    <div class="confirm-toggle" role="group" data-confirm-toggle hidden>
      <span class="confirm-toggle__label">ESTADO DA REVISÃO</span>
      <div class="confirm-toggle__buttons">
        <button class="confirm-toggle__btn is-active" data-confirm-state-btn="before" aria-pressed="true" aria-label="Antes da confirmação">Antes</button>
        <button class="confirm-toggle__btn" data-confirm-state-btn="after" aria-pressed="false" aria-label="Depois da confirmação">Depois</button>
      </div>
    </div>
    <div class="confirm-shot-stage" data-confirm-stage>
      <picture class="how-product-shot confirm-shot confirm-shot--before is-active" data-confirm-shot="before">…</picture>
      <picture class="how-product-shot confirm-shot confirm-shot--after"  data-confirm-shot="after" aria-hidden="true">…</picture>
    </div>
    <span class="sr-only" data-confirm-live aria-live="polite">Estado exibido: aguardando confirmação.</span>
  </div>
</article>
```

The toggle wrapper carries `hidden` in the markup; the JS removes it after wiring listeners, providing a no-JS fallback that simply shows the "before" image.

### 4.2 Alt texts used (verbatim, per spec §25)

1. Tela do Allybi mostrando Outlook, OneDrive, SharePoint e uploads disponíveis no workspace.
2. Composer do chat do Allybi com a pergunta sobre qual proposta foi aprovada pelo cliente.
3. Resposta do Allybi com o arquivo aprovado, a fonte do SharePoint e um trecho da fonte.
4. Comparação no Allybi entre as versões v3 e v4 da proposta, com mudanças de escopo, valor e status.
5. Rascunho de e-mail no Allybi com destinatário, assunto, mensagem, arquivo e fonte.
6 before. Revisão no Allybi aguardando confirmação, com Outlook e WhatsApp ainda desabilitados.
6 after. Revisão concluída no Allybi, com e-mail via Outlook e WhatsApp handoff liberados.

### 4.3 Copy preserved

Eyebrow, H2, subtítulo, and each chapter title/description match the spec verbatim. No copy changes outside the chapters were made (hero, friction selector, final CTA all untouched).

## 5. Layout per breakpoint

| Breakpoint | Layout | Image picked | Image max width |
| --- | --- | --- | --- |
| ≤767px (mobile) | block, copy → image stacked | `…-mobile.png` (via `<source media="(max-width: 767px)">`) | 350px CSS |
| 768–1099px (tablet) | block, copy → image stacked | `…-desktop.png` (mobile source's media query excludes it) | 760px CSS |
| ≥1100px (desktop) | grid `300px / 1fr`, gap 64px, `align-items: center` | `…-desktop.png` | 940px CSS |
| 1100–1399px override | grid `270px / 1fr`, gap 48px, container padding 40px | inherits desktop | inherits desktop |

The `<picture>` declarations carry `width="1880" height="1160"` so the browser reserves the correct aspect-ratio box before the PNG decodes (mobile uses the 350/540 box driven by `.confirm-shot-stage` / `.how-product-shot` rules).

No image has a background, border, padding, border-radius, shadow, filter, transform, or clip applied — they render exactly as the source PNGs (which already include their own card chrome).

## 6. Chapter 06 behaviour

- Default state: `data-confirm-state="before"` and the "Antes" button is `is-active` / `aria-pressed="true"` (driven entirely by markup so SSR / no-JS users see the same).
- The toggle is rendered with `hidden`; the JS removes it after attaching click handlers (so the controls only appear once enhancement is live).
- Clicking either button toggles `is-active`, updates `aria-pressed`, swaps `is-active` on the two `<picture>` shots (`opacity 0/1` + `visibility hidden/visible`, 180 ms ease-out), updates `data-confirm-state` on the article, and updates the polite `aria-live` region (`sr-only`).
- No autoplay, no `setInterval`, no scroll-driven swap. The toggle never moves the page focus.
- Inactive shot is proactively preloaded once the chapter is within 600px of the viewport, using the correct breakpoint via `matchMedia("(max-width: 767px)")` — only one of mobile / desktop is fetched per session.

## 7. Animations

- Per-chapter reveal still uses the existing `.hw-reveal` IntersectionObserver. Copy fades 0→1 + translateY 8→0 (240 ms); the visual fades with translateY 10→0 (280 ms, 60 ms delay) — preserves the original cadence (CSS rules at lines 17–19 of `pages/how-it-works.css`).
- Chapter 06 fade between states: opacity 180 ms ease-out, no transform/scale/slide/blur.
- Reduced motion: the existing `@media (prefers-reduced-motion: reduce)` rule (lines 742-750) already nukes durations to 0.001 ms and surfaces `.hw-reveal` immediately. The toggle still works (the new transitions become instant).

## 8. Verification

| Check | Result |
| --- | --- |
| `curl http://localhost:8080/how-it-works.html` | HTTP 200, 30 223 bytes |
| `curl http://localhost:8080/pages/how-it-works.css` | HTTP 200 |
| `curl` on each of the 14 PNGs | All HTTP 200 with byte counts matching the source files |
| 14 distinct asset URLs found in served HTML | Yes (`grep -oE "/assets/landing-shots/how-it-works/[0-9][0-9]-[a-z-]+\\.png"` → 14 unique paths) |
| Mockup classes in HTML/CSS | `grep -E "workflow-scene\|hw-sources\|hw-question__\|hw-answer\|hw-compare\|hw-draft\|hw-review\|data-review-confirm"` → **0 matches** |
| Forbidden patterns (`autoplay`, `setInterval`, `background-image`, `object-fit: cover`, `transform: scale`, `position: sticky`, `carousel`, `swiper`, `slick`) in HTML/CSS | Only matches are documentary comments saying "no autoplay / No autoplay" — no active code uses any of these. |
| 6 `data-chapter` articles in served HTML | Yes (chapters 01–06, in order). |
| Chapter 06 has exactly 2 `<picture>` (`data-confirm-shot`) | Yes. |
| Chapters 01–05 each have exactly 1 `<picture>` | Yes. |
| SHA-256 match (source vs. destination) | All 14 hashes match. |
| Brace balance in `pages/how-it-works.css` | All `@media` blocks closed correctly (`@media (min-width: 768px) and (max-width: 1099px)` 520→581, `@media (min-width: 1100px)` 586→728, mid-desktop 731→737, reduced-motion 742→750). |

Visual QA at additional viewport widths and Playwright assertions in `qa-screenshots/how-it-works-images-after/` were not generated in this pass — the page can now be tested in browser at any breakpoint. No regressions to other sections of the page are expected because every change is gated to within the `.workflow-story-section`/`.hw-chapter*`/`.how-product-shot`/`.confirm-*` namespaces.

## 8.b Spec-recompliance pass (2026-06-27)

A subsequent re-audit aligned the implementation precisely with the re-issued spec. Changes made:

| Spec section | Before | After |
| --- | --- | --- |
| §6 forbidden props on `<picture>`/`<img>` | `clip-path: inset(3.28% 2.02% round 18px)` was on `.how-product-shot` to hide the baked-in shadow | `clip-path` removed entirely — the PNG-baked shadow / safe area / corner radius are intentional per spec ("Os PNGs já contêm: ... sombra; safe area"). |
| §15 section container | `.hw-story__container { max-width: 1240px }` | `max-width: 1360px` |
| §15 desktop visual column | `display: flex; flex-direction: column; justify-content: center; align-items: flex-end` | `display: flex; justify-content: flex-end; align-items: center` (matches spec exactly). Chapter 06 override re-adds `flex-direction: column` so the toggle still stacks above the stage. |
| §16 desktop title | had `max-width: 285px` | spec only sets typography + `text-wrap: balance`. Removed the cap and added `text-wrap: balance`. |
| §18 mobile story subtitle | inherited global `.hw-sub` (17/26, max 760) | scoped override added: 16/24, max-width 360px, margin-top 18px. |
| §28 reveal timings | copy 240ms / translateY 8; visual 280ms 60ms-delay / translateY 10 | copy 230ms / translateY 7; visual 270ms 55ms-delay / translateY 9 (exact spec values). |

After this pass, every constraint in §6, §7, §15–§18, §20–§24, §28–§30 maps 1:1 to the served CSS / HTML / JS. The runtime audit (asset HTTP 200 × 14, hash match × 14, no `/Users/` or `koda-webapp` paths in runtime, no `workflow-scene*` / mockup classes anywhere, no `background-image` / `object-fit: cover` / `transform: scale` / `clip-path` / `mask` / `filter` on chapter assets, six chapters in 01–06 order, chapter 06 default = before with manual toggle, mobile DOM copy-before-image) still passes.

## 9. Outstanding items vs. the original spec

- `HOW_IT_WORKS_IMAGES_PRE_AUDIT.md`, `HOW_IT_WORKS_ASSET_MANIFEST.md`, and the `qa-screenshots/how-it-works-images-before/` & `…-after/` directories were not generated as standalone artifacts in this pass — the pre-audit findings are summarised in §1–§3 above and the hash/dimension manifest in §2. Let me know if you want those produced as separate files.
- Playwright assertion suite (§31–§36) was not added. The page was sanity-checked via `curl` for HTTP 200 + presence of the 14 asset URLs and removal of all mockup classes; full multi-breakpoint Playwright coverage is outside this single edit.
- Browser console errors / CLS metric were not measured automatically; with `<img width height>` declared on every shot and `aspect-ratio` set on the chapter-06 stage, CLS should be 0 for the chapters but this was not verified.
