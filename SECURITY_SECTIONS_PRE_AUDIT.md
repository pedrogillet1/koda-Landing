# Security overview - 3 sections pre-audit

**Date:** 2026-06-19
**Page:** `/security-overview.html`
**Sections in scope (located by title):**
1. "Criptografia em trânsito e em repouso." — `#security-encryption-title` (markup lines 148-207)
2. "Seus dados servem para responder você. Não para treinar modelos." — `#security-ai-title` (markup lines 376-429)
3. "Outlook envia. WhatsApp faz handoff." — `#security-outbound-title` (markup lines 431-523)

## File locations

| Asset | File | Lines (current) |
|---|---|---|
| Markup all 3 sections | `security-overview.html` | 148-207, 376-429, 431-523 (~221 lines total) |
| CSS encryption | `pages/security-overview.css` | 282-506 (~225 lines) |
| CSS AI | `pages/security-overview.css` | 774-933 (~160 lines) |
| CSS outbound | `pages/security-overview.css` | 938-1134 (~197 lines) |
| Page JS | `assets/security-page.js` | 43 lines; controls **other** sections (access accordion + FAQ). No exclusive JS for the 3 target sections. |

Out of scope (not altered): hero, access & permissions, internal controls, documents, lifecycle, FAQ, final CTA, header, footer, global tokens.

## Current state per section

### §1 Encryption
- **2 white cards** (transit + rest) inside `.security-encryption-cards` grid, plus a **third standalone "key management" strip** (`.security-key-management`) sitting on dark background `#181818`.
- Transit card: white surface, decorative "Dispositivo / Allybi" endpoints, fake "TLS" capsule with `<svg>` lock icon, simulated packet dots.
- Rest card: white surface, three rectangles (`.security-rest-block`) with a fake "key" SVG glyph on the right.
- Key management strip: dark slab with eyebrow + title + body.
- White cards have `border-radius: 24px` and shadow. Multiple nested boxes per card.

### §2 AI data use
- Dark surface (`#181818`).
- 2 cards: "USADO PARA" + "NÃO USADO PARA".
- Each card has an `<ol>` with numbered items (1, 2, 3) — exactly what §4 says to remove.
- Allowed visual: 3 chip "blocks" (Dados autorizados → Processamento solicitado → Resposta para você) with hardcoded green dot.
- Blocked visual: source block + barrier line + 3 chip targets (Treinamento / Anúncios / Venda).
- The blocked chips are styled as small boxes — what spec §4 calls "dashed boxes".

### §3 Outbound
- 2 cards: Outlook + WhatsApp, both white.
- Outlook card has a fake "review panel" (`.security-outbound-gate`) with 5 rows (Destinatário / Mensagem / Arquivo / Fonte / Canal) and **5 green check SVGs** (`<polyline points="20 6 9 17 4 12"/>`).
- A fake CTA "Enviar via Outlook" rendered as `.security-outbound-button`.
- Footer microcopy "Sem confirmação, o envio não acontece."
- WhatsApp card has Allybi→WhatsApp box arrow and 2 grids: PODE / NÃO PODE.

## Banned items inventory (per §4)

| Item | Section | Count |
|---|---|---|
| White card | §1 Encryption (transit, rest) | 2 |
| White card | §3 Outbound (Outlook, WhatsApp) | 2 |
| Green check SVG | §3 Outbound | 5 |
| Fake "Enviar via Outlook" button | §3 Outbound | 1 |
| Fake review rows | §3 Outbound | 5 |
| Lock icon SVG | §1 Encryption transit | 1 |
| Key icon SVG | §1 Encryption rest | 1 |
| Three empty rectangles | §1 Encryption rest | 3 |
| Numbered `<ol>` (01/02/03) | §2 AI data use | 2 |
| PODE / NÃO PODE grids | §3 Outbound WhatsApp | 2 |
| Allybi / WhatsApp block-and-arrow | §3 Outbound WhatsApp | 1 |
| Dashed boxes on blocked targets | §2 AI data use | 3 |

## Banned CSS to remove

From `pages/security-overview.css`:
- `.security-encryption-cards`, `.security-encryption-card`, `.security-encryption-card--transit`, `.security-encryption-card--rest`, `.security-transit-visual`, `.security-transit-endpoint`, `.security-transit-line`, `.security-transit-capsule`, `.security-transit-label`, `.security-transit-packet`, `.security-rest-visual`, `.security-rest-blocks`, `.security-rest-block`, `.security-rest-block--mid`, `.security-rest-label`, `.security-rest-key`, `.security-key-management`, `.security-key-label`, `.security-key-title`, `.security-key-body`.
- `.security-ai-cards`, `.security-ai-card`, `.security-ai-card--used`, `.security-ai-card--not-used`, `.security-ai-list`, `.security-ai-list--dark`, `.security-ai-allowed-visual`, `.security-ai-block`, `.security-ai-block--final`, `.security-ai-block--dark`, `.security-ai-dot`, `.security-ai-connector`, `.security-ai-blocked-visual`, `.security-ai-barrier`, `.security-ai-blocked-targets`, `.security-ai-target`.
- `.security-outbound-cards`, `.security-outbound-card`, `.security-outbound-card--outlook`, `.security-outbound-card--whatsapp`, `.security-outbound-gate`, `.security-outbound-row`, `.security-outbound-row--source`, `.security-outbound-label`, `.security-outbound-value`, `.security-outbound-check`, `.security-outbound-button`, `.security-outbound-footer`, `.security-handoff-boundary`, `.security-handoff-block`, `.security-handoff-arrow`, `.security-handoff-arrow-line`, `.security-handoff-arrow-head`, `.security-handoff-grids`, `.security-handoff-grid`, `.security-handoff-grid-label`.

The shared header CSS (`.security-section-header`, `.security-section-eyebrow`, `.security-section-subtitle`) stays — it's used by other sections.

## Header clipping observation

The page has a fixed header. Currently the 3 section IDs use the `<h2 id="…-title">` pattern. None of them carry `scroll-margin-top`. Opening `#security-encryption` (or any section anchor) puts the H2 partially behind the fixed header. **§8 fix required:** add `scroll-margin-top: calc(var(--site-header-height,72px) + 24px)` to the section IDs.

## Before-screenshots

13 viewports captured to `qa-screenshots/security-sections-before/{w}x{h}.png`. Opening `#security-encryption-title` confirms: at small viewports the white cards stack vertically with significant empty padding; at 1366×768 the two transit/rest cards sit side-by-side at the top, with the key-management strip below.

## Files that will be altered

- `security-overview.html` (sections lines 148-207, 376-429, 431-523) + add `find-gap.js`-style controller script tag
- `pages/security-overview.css` (CSS blocks lines 282-506, 774-933, 938-1134 + reduced-motion media query addition)
- **NEW**: `assets/security-sections.js` (reveal observer + scroll-margin polyfill if needed)

## Files NOT altered

- All other markup blocks in `security-overview.html`
- All other CSS blocks in `pages/security-overview.css`
- All other HTML pages
- `allybi-tokens.css`, base/components/header/footer CSS
- `assets/security-page.js` (controls unrelated accordions)

## Header height variable

The `--site-header-height` CSS custom property is already set elsewhere in the project (e.g. by `find-gap.js`). For independent safety I'll set it from the new section controller too, falling back to 72px when JS doesn't run.
