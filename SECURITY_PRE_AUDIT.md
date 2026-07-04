# /security-overview.html — pre-rewrite audit

**Date:** 2026-06-19

## Files used

- `security-overview.html` (387 lines)
- `pages/security-overview.css` (389 lines)
- Shared CSS: `allybi-tokens.css`, `allybi-base.css`, `allybi-components.css`, `allybi-header.css`, `allybi-footer.css`, `allybi-responsive.css`
- Shared JS: `language-switcher.js`, `allybi-header.js`, `allybi-animations.js`
- Inline FAQ JS at the end

## Current structure

| Lines | Block |
|---|---|
| 1–40 | `<head>` |
| 42–93 | Global header + mobile menu |
| 94 | `<main>` |
| 99–121 | `.sec-hero` — H1 "Controle para documentos sensíveis." + "Falar com vendas sobre segurança" CTA + secondary link |
| 126–155 | `.sec-basics` "O básico precisa estar claro" — 3-4 feature cards |
| 160–189 | `.sec-access` "O que o Allybi pode acessar" — chat-mockup style |
| 194–209 | `.sec-not` "O que o Allybi não faz" — workflow cards |
| 214–249 | `.sec-ai` "IA no contexto do seu workspace" — question/context/response chat-like flow |
| 254–283 | `.sec-perms` "Conectar não significa abrir tudo" — integration cards w/ "Gmail e Google Drive em breve" |
| 288–313 | `.sec-sending` "Nada sai sem sua confirmação" — review panel mockup |
| 318–334 | `.sec-policies` — legal links |
| 339–351 | `.sec-cta` — final dark CTA |
| 353 | `</main>` |
| 356–372 | Global footer |
| 374–387 | Scripts + inline FAQ JS |

## Current claims (problematic — to be removed)

- "Controle para documentos sensíveis." (positioning OK but visual is product chat)
- "Falar com vendas sobre segurança" (no sales contact path needed; remove)
- "Gmail e Google Drive em breve" (forbidden by §3 — future claim)
- Re-uses question/answer chat bubble visuals from how-it-works (forbidden by §7)
- Re-uses review panel mockup from pricing/how-it-works (forbidden by §7)
- No mention of OAuth 2.0, TLS, AES-256, MFA, role-based access, audit logs, penetration tests, incident response, key rotation, deletion timeline, 90-day backup retention

## Mobile issues

- No specific mobile recomposition; everything is desktop scaled down
- Integration cards stack but retain card styling
- Chat-like visuals don't recompose

## Existing links

- Hero secondary "Ver políticas" → `#policies` (anchor) — keeping this anchor concept
- Footer policy links → /tos.html, /terms.html, /privacy.html, /cookies.html, /integration-data-use.html, /data-deletion.html (correct destinations exist)

## Files that will be altered

| File | Change |
|---|---|
| `security-overview.html` | Replace entire `<main>` block (lines 94–353) with new 10-section architecture per §5 |
| `pages/security-overview.css` | Full rewrite |
| `assets/security-page.js` (new) | Permissions accordion + FAQ accordion + reveal observer |
| `<head>` meta description, OG | Updated per §82 |

## Files NOT altered

- Header, footer, design tokens, shared components, all other `.html` pages
- Legal pages (`/tos.html`, etc.) referenced as document destinations

## Baseline screenshots

`qa-screenshots/security-before/` — 11 full-page captures at 360×640, 360×740, 390×844, 430×932, 768×1024, 1024×768, 1280×800, 1366×768, 1440×900, 1920×1080, 2048×1280.
