# /integrations.html — pre-rewrite audit

**Date:** 2026-06-19

## Files used

- `integrations.html` (739 lines)
- `pages/integrations.css` (661 lines)
- Shared: `allybi-tokens.css`, `allybi-base.css`, `allybi-components.css`, `allybi-header.css`, `allybi-footer.css`, `allybi-responsive.css`
- Shared JS: `language-switcher.js`, `allybi-header.js`, `allybi-animations.js`
- Inline reveal observer at end of body

## Current structure (sections)

| Lines | Block |
|---|---|
| 119 | `<main>` open |
| 124–145 | `.integ-hero` — H1 + paragraph with "Gmail e Google Drive em breve" |
| 150–200 | `.integ-map` — 4 source cards w/ "Disponível" badges + "Ações" label + 2 action cards w/ "Handoff" badge |
| 205–272 | `.integ-live` — "Depois de conectar, o que acontece?" — chat-style 5-step sequence with question + filename |
| 277–317 | `.integ-actions` — 2 action cards repeated |
| 322–377 | `.integ-after` — Outlook/WhatsApp differentiation |
| 382–418 | `.integ-coming` — **Roadmap section with Gmail and Google Drive "em breve"** (forbidden by §0/§5/§82) |
| 423–602 | `.integ-matrix` — capability matrix (5 rows × cols) with WhatsApp showing "Enviar" check (forbidden) |
| 607–644 | `.integ-trust` — "Permissões por fonte" / "Fonte visível" / "Sem treinamento" / "WhatsApp sem sync" / "Nada sozinho" cards |
| 649–661 | `.integ-cta` — final CTA |
| 663 | `</main>` |

## Cards present (all to be removed per §5)

- 4× source cards (.integ-map source slots)
- 2× action cards (.integ-map action slots, with Handoff badge)
- 5× live sequence cards
- 2× action cards repeated in .integ-actions
- 2× cards in .integ-after differentiating Outlook/WhatsApp
- 2× "Em breve" cards (Gmail, Google Drive) in `.integ-coming`
- 5-row capability matrix
- 5× trust cards in `.integ-trust`

## Banned terms found (current state)

- `Gmail`: 4+ hits in `.integ-coming` and copy
- `Google Drive`: 4+ hits
- `Em breve` / `breve`: in `.integ-coming` heading + cards + hero subtitle
- `Roadmap`: present as section header
- `Disponível`: repeated badge on each source card
- WhatsApp check for "Enviar" in matrix row
- Chat-style mockup with question "qual versão posso enviar?" and filename `contrato_final_AGORA.pdf` in `.integ-live` — direct copy from homepage/how-it-works

## Mobile issues

- Matrix breaks down to 1-col grid but retains card framing (compressed-desktop)
- "Em breve" cards stack vertically but stay (still violating §5)

## Existing links

- `app.allybi.co/signup` — needs replacement with `https://app.allybi.com.br` per §81
- Hero secondary link present
- `/how-it-works.html`, `/security-overview.html`, `/integration-data-use.html` — to be linked from new sections

## Files that will be altered

| File | Change |
|---|---|
| `integrations.html` | Replace head meta (§80) + entire `<main>` block (lines 119–663) with new 7-section architecture per §6 |
| `pages/integrations.css` | Full rewrite |
| `assets/integrations-page.js` (new) | Explorer 4-tab controller + 2 accordions (ledger + FAQ) + permissions accordion + reveal |

## Files NOT altered

- Header, footer, mobile menu, shared tokens, design system, all other `.html` pages, all shared JS

## Baseline screenshots

`qa-screenshots/integrations-before/` — 11 full-page captures at 360×640, 360×740, 390×844, 430×932, 768×1024, 1024×768, 1280×800, 1366×768, 1440×900, 1920×1080, 2048×1280.
