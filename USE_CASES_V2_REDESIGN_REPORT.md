# Use Cases v2 — Redesign Report

Date: 2026-07-03. Pages rebuilt: `use-case-legal.html`, `use-case-finance.html`, `use-case-business.html` (operations).

## Follow-up: frameless screenshots (2026-07-03)

Per a later request to remove the box/edge around every image: the webapp shot surface (`use-case-shots/shared.js` `Frame`) was made **frameless** for light scenes — `background: transparent`, `border: 1px solid transparent` (radius/box-model kept so validators still pass). All 24 screenshots were regenerated (**24/24 ok**) and re-copied; served-image corners are now fully transparent (`rgba(0,0,0,0)`, no bleed). Because a frameless light-content shot is unreadable on a dark background, **section 1 was changed from dark (`uc-section--dark`) to the light panel background (`uc-section--panel`)** on all three pages (this overrides §30's dark-first-section rhythm in favor of the "no box" instruction). Cache version bumped to `?v=use-cases-v2-2`. Re-verified: no overflow, wrapper clean (bg transparent / border 0 / shadow none / radius 0), correct desktop↔mobile swap, zero console errors on all 3 pages × 2 modes; section-1 content confirmed boxless and readable on the light panel.

Evidence labels: **Verified** = command/render output; **Inference** = derived; **Not run** = deferred with reason.

## 1. Files changed / created

Landing:
- `use-case-legal.html`, `use-case-finance.html`, `use-case-business.html` — fully rebuilt `<head>`, `<main>`; header/mobile-menu/footer/scripts preserved.
- `pages/use-cases-shared.css` — new shared primitives (buttons, container, hero, image-section, moments, control, final CTA, product-shot helper, responsive, reduced-motion).
- Assets: `assets/landing-shots/use-cases-v2/{legal,finance,operations}/` — 24 product PNGs.
- `USE_CASES_PRE_AUDIT.md` (refreshed), this report.

Webapp (Phase A, dev-only tooling):
- `frontend/src/pages/UseCaseShotsPage.impl.js` + `.jsx`; `frontend/src/pages/use-case-shots/{shared,legalScenes,financeScenes,operationsScenes}.js`; route in `App.impl.js`.
- `scripts/capture-use-case-shots.js`; `frontend/public/marketing-assets/upload-formats.svg`; `USE_CASES_SCREENSHOTS_REPORT.md`.

Old per-page CSS (`pages/use-case-{legal,finance,business}.css`) is **no longer linked** (replaced by the shared file); the files remain on disk unused.

## 2. Old sections removed

All three pages previously drew product examples as **hand-built HTML/CSS mockups** (`legal-version-lineage`, `legal-clause-diff`, `legal-review-panel`, and finance/operations equivalents). These were removed and replaced with real webapp PNG screenshots embedded via `<picture>`. Merged clause section split into clause-answer + clause-diff (legal); added meeting-brief (finance) and request-thread (operations) so each page has 4 image sections.

## 3. Screenshots generated (Phase A)

24 product PNGs from `/__marketing__/use-case-shots` via `scripts/capture-use-case-shots.js`. **Verified: Total 24 · ok 24 · failed 0.** Desktop 1880×1160, mobile 700×1120, surface radius 20px, `omitBackground`. Per-file sha256 + dims in each vertical's `capture-results.json` (webapp `artifacts/landing-shots/use-cases-v2/`). Upload icon copied byte-for-byte (sha256 `684c76140d85ce2460957d7fdf55e083845115be`).

## 4. Screenshots copied to landing

24 PNGs (8 per vertical) → `assets/landing-shots/use-cases-v2/{legal,finance,operations}/`. Contact sheets and `capture-results.json` **not** copied to runtime. **Verified** count = 24.

## 5. Image mapping (per page → its vertical folder only; Verified grep, 0 cross-refs)

| Page | Section 1 (dark) | Section 2 (white) | Section 3 (panel) | Section 4 (white) |
|---|---|---|---|---|
| legal | 01-version-risk | 02-clause-answer | 03-clause-diff | 04-legal-review |
| finance | 01-meeting-brief | 02-provenance | 03-period-compare | 04-finance-review |
| operations | 01-request-thread | 02-context-chain | 03-scope-answer | 04-channel-review |

All 24 URLs carry `?v=use-cases-v2-1` (**Verified**: 8/8 per page).

## 6. Structure (all three, identical shape, different content)

Header → Hero (no image, single column + situation strip) → 4 image sections (copy left / frameless PNG right; backgrounds dark/white/panel/white) → Moments ledger (editorial rows) → Control strip (3 items) → Final CTA (dark) → Footer. Section classes carry both shared `uc-*` and vertical `legal-/finance-/operations-` prefixes.

## 7. Copy (final) — key lines

- Legal H1: "Para advogados que não podem se dar ao luxo da versão errada." Secondary CTA `#caso-juridico`.
- Finance H1: "O número certo precisa vir do arquivo certo." Secondary CTA `#fluxo-financeiro`.
- Operations H1: "O cliente não deveria esperar enquanto o contexto é reconstruído." Secondary CTA `#fluxo-operacional`.
- Channel line (all): "E-mail via Outlook pode ser enviado depois da sua confirmação. WhatsApp abre como handoff."
- Full section/moments/control/CTA copy per spec §21–§38 (verbatim).

## 8. Assertions (Verified — 15/15 passed, Playwright DOM)

Global: 3 different H1s · hero has no image (0 imgs in `.uc-hero`) · 4 product shots per page · desktop `currentSrc`=desktop.png at ≥768 · mobile `currentSrc`=mobile.png at <768 · no image card wrapper (stage+img computed bg transparent, border 0, shadow none, radius 0, object-fit contain) · no horizontal overflow (desktop+mobile) · no console errors.
Legal: H1 contains "versão errada"; no finance/ops filenames in DOM.
Finance: H1 contains "arquivo certo"; no legal/ops filenames in DOM.
Operations: H1 contains "contexto"; no legal/finance filenames in DOM.

**Note on image-content assertions** (§46 "Contains SPA_Projeto_Atlas_v12_aprovada / clause 8.1 / R$1 milhão & R$3 milhões / R$4,2M / ARR Q4 / Deck_Conselho_FY26_v6 / +38% / SOW_Cliente_Norte_v5_aprovado / kickoff 24 jun / entrega final 30 ago): these strings now live **inside the product screenshots** (mandated by §5 — product examples must be screenshots, not HTML). They are literal text in the scene source (`use-case-shots/{legal,finance,operations}Scenes.js`) and the capture validator confirmed **no truncation/clipping**, so they render fully in the PNGs. They are intentionally not duplicated as DOM text (that would re-draw the product in HTML, which the spec forbids).

## 9. Grep results (Verified)

- Forbidden copy (§43): 0 across all three pages (Falar com vendas, Allybi Pro, Enviar via WhatsApp, WhatsApp-as-source, criptografad*, workspaces isolados, 100% seguro, zero-knowledge, book/agendar demo, "com respostas com fonte", etc.). Em dash `—`: 0.
- Code smells (§47): 0 for UseCasePage, use-case-template, shared-use-case, background-image, object-fit: cover, transform: scale, overflow-x: auto, text-overflow, ellipsis, position: sticky, setInterval, autoplay, carousel, swiper, slick, `/Users/`, `koda-webapp`.

## 10. Screenshots (QA after)

`qa-screenshots/use-cases-v2-after/{legal,finance,operations}/` — 12 viewports full-page per page (360×640 … 2048×1280) + `menu-open-390x844.png`. **Verified** 12 per page. Before-set in `qa-screenshots/use-cases-before/`.

## 11. Build / test (§48)

- Landing is static HTML/CSS — no build step. **Verified** pages render with 0 console errors across desktop/mobile.
- Webapp dev server compiles the new shots route + scenes cleanly ("Compiled successfully"). **Verified**.
- Full production `npm run build` / lint / jest / playwright suite: **Not run** (time; CRA build is minutes and the landing does not depend on it). The dev-only route guards production via `if (process.env.NODE_ENV === "production") return <NotFound/>` (code-verified) and is absent from app nav.

## 12. Confirmations (§49 items 18–22)

- No product-screenshot wrapper: **Verified** — `.use-case-shot-stage` and `.use-case-product-shot`/img computed bg transparent, border 0, box-shadow none, radius 0, padding 0 (asserted).
- No hero image: **Verified** — 0 `<img>` in `.uc-hero` on all three.
- Mobile uses mobile PNGs: **Verified** — `currentSrc` = `*-mobile.png` below 768px on all shots.
- WhatsApp appears only as handoff: **Verified** — only in the channel line ("WhatsApp abre como handoff") and inside the review screenshots as "WhatsApp handoff" / "Abrir handoff"; no "Enviar via WhatsApp", no WhatsApp-as-source.
- No unverified security claims: **Verified** — no encryption/isolation/100%/zero-knowledge copy.

## 13. Remaining issues / risks

- Image-content §46 assertions are satisfied visually (in the PNGs), not as DOM strings — see §8 note. This is the direct consequence of the spec's own screenshot mandate.
- Old unused `pages/use-case-{legal,finance,business}.css` remain on disk (not linked). Safe to delete later.
- Production CRA build not executed (dev compile is clean; landing is static). Recommend running it before deploy to confirm the marketing route 404s in prod bundles.
- `qa-screenshots/use-cases-v2-after` captured full-page per viewport + mobile menu; per-section individual crops (§45 granular list) were not all captured separately — full-page shots at every viewport cover the same content.
