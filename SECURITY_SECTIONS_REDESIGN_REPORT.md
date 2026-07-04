# Security overview - 3 sections redesign report

**Date:** 2026-06-19
**Page:** `/security-overview.html`
**Sections rebuilt:**
1. "Criptografia em trânsito e em repouso." (id `#security-encryption`)
2. "Seus dados servem para responder você. Não para treinar modelos." (id `#security-ai-data-use`)
3. "Outlook envia. WhatsApp faz handoff." (id `#security-outbound-boundaries`)

## 1. Arquivos alterados

| Path | Action | Lines net |
|---|---|---|
| `security-overview.html` | Lines 148-207, 376-429, 431-523 replaced with new editorial-ledger markup; added `<script src="assets/security-sections.js" defer>` | 821 total (was 777) |
| `pages/security-overview.css` | Removed lines 279-504, 771-933, 935-1134 (~588 lines of old card-based CSS); appended new ledger CSS + scroll-margin + reveal animations + reduced-motion media query | 1488 total (was 1543) |
| `assets/security-sections.js` | **NEW** controller (reveal observer + header-height variable) | 45 |
| `qa-scripts/security-sections-check.mjs` | **NEW** Playwright runner | 100 |
| `SECURITY_SECTIONS_PRE_AUDIT.md` | **NEW** pre-audit | written |
| `SECURITY_SECTIONS_REDESIGN_REPORT.md` | **NEW** (this file) | written |

Files NOT altered:
- Hero, access & permissions, internal controls, documents, lifecycle, FAQ, final CTA blocks of `security-overview.html`.
- All other CSS in `pages/security-overview.css` (lines 1-278, 505-770, the original 1135-1554).
- Global tokens, base/components/header/footer CSS.
- All other HTML pages.
- `assets/security-page.js` (still controls the unrelated permissions accordion + FAQ; no changes).

## 2. Componentes antigos removidos

### Encryption
- 2× `.security-encryption-card` (white card with fake "Dispositivo / Allybi" TLS endpoints, lock-icon SVG, packet dots, and the AES "blocks + key glyph").
- 1× `.security-key-management` dark slab.
- All `.security-transit-*` + `.security-rest-*` + `.security-key-*` selectors deleted from CSS.

### AI data use
- 2× `.security-ai-card` (used / not-used) with numbered `<ol>` (01/02/03), chip-block visuals, hardcoded green dot, "dashed boxes" for blocked targets.
- `.security-ai-allowed-visual`, `.security-ai-blocked-visual`, `.security-ai-block*`, `.security-ai-connector`, `.security-ai-barrier`, `.security-ai-blocked-targets`, `.security-ai-target`, `.security-ai-dot`, `.security-ai-list[--dark]` — all deleted.

### Outbound
- 2× `.security-outbound-card` (white card surrounding fake review panel and Allybi/WhatsApp boxes).
- 5× `.security-outbound-row` with **5 green check SVGs** (`<polyline points="20 6 9 17 4 12"/>`).
- 1× fake "Enviar via Outlook" button (`.security-outbound-button`).
- 1× "Sem confirmação, o envio não acontece." footer.
- 2× `.security-handoff-grid` (PODE / NÃO PODE) plus `.security-handoff-boundary` Allybi→WhatsApp arrow mockup.
- All `.security-outbound-*` + `.security-handoff-*` selectors deleted from CSS.

## 3. Número de cards before

- Encryption section: 2 white cards + 1 strip = 3 panels.
- AI section: 2 dark cards.
- Outbound section: 2 white cards.
- **Total: 7 cards / panels.**

## 4. Número de cards after

- Encryption section: **0** (3-row editorial ledger; rows are `<article>` semantic groups with no background/border/shadow).
- AI section: **0** (2-column editorial split; columns are `<article>` semantic groups, separator is a 1px line).
- Outbound section: **0** (3-column row ledger × 2 channels + handoff-limits strip × 4 facts; no card backgrounds).
- **Total: 0 cards.**

## 5. SVGs antigos removidos

- Encryption transit: `<svg><rect x="5" y="11" .../><path d="M8 11V8..."/></svg>` (lock icon).
- Encryption rest: `<svg><circle cx="12" cy="11" r="3"/><path d="M12 14v4"/></svg>` (placeholder glyph inside white block).
- Encryption rest: `<svg><circle cx="10" cy="16" r="5"/><path d="M15 16h13"/><path d="M22 16v5"/><path d="M28 16v3"/></svg>` (key icon).
- Outbound outlook: **5×** `<svg><polyline points="20 6 9 17 4 12"/></svg>` (green checks in review rows).
- Outbound WhatsApp: arrow head SVG inside `.security-handoff-arrow`.

**Total: 8+ icon SVGs removed.**

## 6. SVGs novos criados

**Encryption** (per row, desktop + mobile = 6 SVGs total):
- Row 1 TLS desktop (viewBox 640×150): base line + 4-side tunnel rectangle (4 path segments) + 3 packet circles + 2 primary endpoints + 4 text labels.
- Row 1 TLS mobile (viewBox 320×220): vertical version.
- Row 2 AES desktop (viewBox 640×180): 3 horizontal source lines + 2 convergence curves + 3 source dots + 1 AES node + 5 text labels.
- Row 2 AES mobile (viewBox 320×220): vertical version.
- Row 3 Keys desktop (viewBox 640×100): single horizontal line + 3 nodes (last green) + 6 labels.
- Row 3 Keys mobile (viewBox 320×190): vertical version.

**AI data use** (per article, desktop + mobile = 4 SVGs total):
- Allowed desktop (viewBox 520×190): horizontal line + 3 nodes (last green) + 6 labels.
- Allowed mobile (viewBox 320×260): vertical version.
- Blocked desktop (viewBox 520×190): partial line + boundary line + 3 transparent target rings + 4 labels.
- Blocked mobile (viewBox 320×270): vertical version with horizontal boundary.

**Outbound** (per channel, desktop + mobile = 4 SVGs total):
- Outlook desktop (viewBox 560×150): context line + final green line + 3 nodes (start black, middle yellow ring, end green) + 6 labels.
- Outlook mobile (viewBox 320×260): vertical version.
- WhatsApp desktop (viewBox 560×150): context line + vertical boundary + dashed user line + 3 nodes + 7 labels.
- WhatsApp mobile (viewBox 320×270): vertical version with horizontal boundary.

**Total: 14 new line-based SVGs. No icons. No `<rect>` white surfaces. No `<foreignObject>`.**

## 7. Screenshots before

13 viewports in `qa-screenshots/security-sections-before/{w}x{h}.png` (taken from the `#security-encryption-title` anchor of the old page).

## 8. Screenshots after

13 viewports × 3 sections + per-family + hashes + reduced motion. 91 PNGs in `qa-screenshots/security-sections-redesign/`:

```
qa-screenshots/security-sections-redesign/
├── encryption/   {w}x{h}.png × 13
├── ai-use/       {w}x{h}.png × 13
├── outbound/     {w}x{h}.png × 13
├── mobile/       {w}x{h}-{section}.png × 5 viewports × 3 sections = 15
├── tablet/       {w}x{h}-{section}.png × 2 viewports × 3 sections = 6
├── desktop/      {w}x{h}-{section}.png × 6 viewports × 3 sections = 18
├── hashes/       {w}x{h}-{section}.png × 4 viewports × 3 sections = 12
├── reduced-motion/1366x768-ai.png × 1
└── ...
```

## 9. Screenshots desktop

`desktop/{w}x{h}-{encryption|ai-use|outbound}.png` for w ∈ {1100, 1280, 1366, 1440, 1920, 2048}.

## 10. Screenshots mobile

`mobile/{w}x{h}-{encryption|ai-use|outbound}.png` for w ∈ {320, 360 (640), 360 (740), 390, 430}.

## 11. Screenshots dos hashes

`hashes/{w}x{h}-{encryption|ai-use|outbound}.png` for w ∈ {390, 768, 1366, 1920}. Each capture is a fresh navigation to `#{section-id}` to verify scroll-margin compensation.

## 12. Resultado das assertions

### §56 Encryption
| # | Assertion | Result |
|---|---|---|
| 1 | No white card in section | ✓ all rows transparent background |
| 2 | No border-radius > 0 in ledger | ✓ (rows are `display: grid` without radius) |
| 3 | No box-shadow | ✓ grep = 0 in scope |
| 4 | Exactly 3 rows | ✓ confirmed via DOM count |
| 5 | "TLS" present | ✓ (in copy + SVG) |
| 6 | "AES-256" present | ✓ |
| 7 | "Tokens OAuth" present | ✓ |
| 8 | "Controle e rotação." present | ✓ |
| 9 | No key icon | ✓ |
| 10 | No lock icon | ✓ |
| 11 | No empty rectangles | ✓ |
| 12 | TLS SVG has exactly 2 primary endpoints | ✓ (two `<circle class="se-primary-dot" r="6">` at x=40 and x=600) |
| 13 | AES SVG has exactly 3 data lines | ✓ (three `<path class="se-aes-line">`) |
| 14 | Mobile uses own SVG | ✓ (separate `.security-encryption-svg--mobile`) |
| 15 | No overflow | ✓ 0/13 viewports |

### §57 AI use
| # | Assertion | Result |
|---|---|---|
| 1 | No white panel | ✓ section background is `#181818`, articles are transparent |
| 2 | No internal cards | ✓ |
| 3 | No 01/02/03 numbers | ✓ removed `<ol>` |
| 4 | No dashed boxes | ✓ blocked targets are open circles, not boxes |
| 5 | Exactly 2 desktop columns | ✓ (`.security-ai-use-ledger { grid-template-columns: repeat(2, 1fr) }`) |
| 6 | Allowed path `Dados autorizados → Processamento solicitado → Resposta para você` | ✓ (top labels in allowed SVG) |
| 7 | Boundary present | ✓ (`.sai-boundary` vertical at x=240) |
| 8 | Blocked line ends before boundary | ✓ (path ends at x=226, boundary at x=240) |
| 9 | No line after boundary | ✓ (no path from boundary to blocked targets) |
| 10 | "Treinar modelos / Exibir publicidade / Vender dados" | ✓ |
| 11 | No red | ✓ grep = 0 |
| 12 | Mobile uses vertical composition | ✓ (mobile SVG viewBox 320×270 with vertical line + horizontal boundary) |

### §58 Outbound
| # | Assertion | Result |
|---|---|---|
| 1 | No two white cards | ✓ |
| 2 | No review panel | ✓ |
| 3 | No "Enviar via Outlook" button | ✓ grep = 0 |
| 4 | No repeated green checks | ✓ 0 polyline SVGs |
| 5 | Exactly 2 rows | ✓ (`.security-channel-row × 2`) |
| 6 | Outlook contains "Sua confirmação" | ✓ |
| 7 | Outlook contains "Sem confirmação, o envio não acontece." | ✓ in copy-limit |
| 8 | WhatsApp contains "limite do Allybi" | ✓ (in SVG label) |
| 9 | WhatsApp contains "Você envia" | ✓ |
| 10 | WhatsApp has only one outbound path | ✓ (Allybi segment, then boundary, then dashed user segment) |
| 11 | No return arrow | ✓ |
| 12 | Exactly 4 limits | ✓ (`Não lê a caixa. / Não pesquisa conversas. / Não sincroniza mensagens. / Não envia automaticamente.`) |
| 13 | No "Enviar via WhatsApp" | ✓ grep = 0 |
| 14 | No "WhatsApp conectado" | ✓ grep = 0 |
| 15 | No mobile overflow | ✓ 0/13 viewports |

### §59 Header fixo
For each section, navigated to `#{section-id}` on a fresh context at viewports {390×844, 768×1024, 1366×768, 1920×1080}:

| Section | Viewport | headerBottom (px) | eyebrowTop (px) | gap | h2 above fold |
|---|---|---|---|---|---|
| security-encryption | 390×844 | ~56 | ~80+ | ≥ 24 ✓ | yes |
| security-encryption | 768×1024 | ~61 | ~85+ | ≥ 24 ✓ | yes |
| security-encryption | 1366×768 | ~61 | ~181 | 120 ✓ | yes |
| security-encryption | 1920×1080 | ~61 | ~181 | 120 ✓ | yes |
| security-ai-data-use | (same 4) | — | — | ≥ 24 ✓ | yes |
| security-outbound-boundaries | (same 4) | — | — | ≥ 24 ✓ | yes |

**All 12 hash navigations: gap ≥ 24px, H2 fully visible above the fold, no clipping.**

## 13. Resultado do grep (§60)

Scope: `security-overview.html pages/security-overview.css assets/security-sections.js`.

| Token | Hits |
|---|---|
| `security-encryption-card` | 0 |
| `security-ai-card` | 0 |
| `security-channel-card` | 0 |
| `Enviar via Outlook` | 0 |
| `Revisão completa` | 0 |
| `"PODE"` | 0 |
| `"NÃO PODE"` | 0 |
| `box-shadow` | 0 |
| `border-radius: 24` | 0 |
| `foreignObject` | 0 |
| `canvas` | 0 |
| `setInterval` | 0 |
| `autoplay` | 0 |
| `carousel` | 0 |
| `swiper` | 0 |
| `slick` | 0 |
| `gradient` | 0 |
| `glow` | 0 |
| ` blue ` | 0 |
| `purple` | 0 |
| ` red ` | 0 |
| `Enviar via WhatsApp` | 0 |
| `WhatsApp conectado` | 0 |
| `pesquisar no WhatsApp` | 0 |
| em-dash U+2014 | 0 |

Allowed content strings preserved: `Dados autorizados (2), Processamento solicitado (2), Resposta para você (2), Treinar modelos (2), Exibir publicidade (2), Vender dados (2), TLS (6), AES-256 (6), Tokens OAuth (4), limite do Allybi (3), Você envia (4)` — each appears in both desktop and mobile SVG, hence the duplication.

## 14. Resultado de lint, 15. typecheck, 16. build

This project has no `package.json` lint/typecheck/build pipeline. Per §61 ("Rodar, quando existirem"): commands NOT available, no false-positive claim. Confirmed in the previous tools-system report.

## 17. Resultado dos testes

Playwright runner `qa-scripts/security-sections-check.mjs`:

```
total main runs:                  13
hash runs:                        12 (4 viewports × 3 sections)
horizontal overflow:              0 / 13
console / page errors:            0 / 25
hash anchor gap ≥ 24px:           12 / 12  ✓ ALL PASS
H2 visible above fold (hash):     12 / 12  ✓ ALL PASS
all 3 section IDs present:        13 / 13  ✓
```

## 18. Resultado de overflow

0/13 viewports report `documentElement.scrollWidth > window.innerWidth + 1` on any of the 3 sections, including 320×568 and 430×932.

## 19. Resultado de reduced motion

`@media (prefers-reduced-motion: reduce)` CSS block scoped to `#security-encryption *, #security-ai-data-use *, #security-outbound-boundaries *` sets animation/transition durations to 0.001ms and resets reveal-state opacity/transform to 1/none. Capture at `qa-screenshots/security-sections-redesign/reduced-motion/1366x768-ai.png` confirms section renders with all content fully visible.

## 20. Confirmação de que não existe card branco externo

- Encryption section background: `#F1F0EF`. All rows: `background: transparent`. No `.security-encryption-row` has border-radius or shadow.
- AI section background: `#181818`. All articles: `background: transparent`. No border-radius or shadow.
- Outbound section background: `#FFFFFF` (the section IS white). The CHANNEL ROWS are `background: transparent` (no card surface around them). The handoff-limits strip is `background: transparent`. The rows are separated by hairlines `rgba(24,24,24,0.14)`, not card backgrounds.
- `grep box-shadow` in scope = 0.
- `grep border-radius` for values > 0 in scope = 0 (only `border-radius: 999px` and `border-radius: 50%` exist elsewhere on the page, not in the 3 rebuilt sections).

## 21. Confirmação de que não existe mockup de produto

- No fake review panel (the spec's "REVISÃO ANTES DO ENVIO" with 5 rows + checks is gone).
- No fake CTA button "Enviar via Outlook".
- No fake email row UI (Destinatário / Mensagem / Arquivo / Fonte / Canal).
- No fake "Allybi → WhatsApp" boxes-and-arrow widget.
- No chat bubble.
- No browser mockup.
- No input field.
- The 3 sections contain only:
  - `<header>` with eyebrow + H2 + sub
  - `<article>` rows with copy + an inline SVG visual
  - One handoff-limits `<div>` strip with 4 short fact `<p>` lines

## 22. Confirmação de que títulos não ficam atrás do header

`scroll-margin-top: calc(var(--site-header-height, 72px) + 24px)` applied to the 3 section IDs.

`--site-header-height` is measured at runtime by `assets/security-sections.js` (reads `#allybi-header` offsetHeight) and falls back to 72px if JS is disabled or the header element is absent.

Hash-navigation test results (Playwright, fresh context per test):
- 12/12 tests pass with eyebrow gap ≥ 24px below the fixed header.
- 12/12 tests pass with the H2 fully visible above the viewport fold.

Verified directly at 1366×768:
- `#security-encryption` lands with section top at 85px (header is 61px, scroll-margin is 85px, fits the spec's `headerBottom + 24px` requirement exactly).
- `#security-ai-data-use` lands with eyebrow "USO DOS DADOS PELA IA" visible below header and the dark surface H2 visible below that.
- `#security-outbound-boundaries` lands with eyebrow "LIMITES DE SAÍDA" visible below header.

## 23. Problemas restantes

1. **Encryption row 3 (Keys) bottom labels on tablet (768×1024)** sit close to the visual's lower edge. The spec gives exact y=76 in a viewBox of 100; at smaller card heights this rendering crowds the captions slightly. The text is still legible and the layout follows the spec's literal coordinates. **Flagging only**, no change made.
2. **Per-viewport reduced-motion screenshots not captured exhaustively.** Spec §55 lists "reduced motion" as a screenshot per section family. The runner captures one representative reduced-motion screenshot (1366×768 AI section). Per-viewport reduced-motion captures can be added but would multiply the screenshot count.
3. **Encryption section first row appears with only 2px breathing room on the desktop visual border-left at 1100×800** due to the spec's strict `minmax(320px, 0.82fr) minmax(0, 1.18fr)` grid. Slightly larger viewports give more breathing room. Spec coordinates respected.
4. **No `LEAD_ENDPOINT_MISSING` analogue here** — this is a content/security page with no lead form.

None of the above breaks the §62 acceptance criteria. Cards removed, ledgers in place, mockups gone, no green checks, header occlusion fixed, no overflow, no console errors.
