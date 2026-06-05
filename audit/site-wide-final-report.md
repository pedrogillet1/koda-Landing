# Site-Wide QA Pass — Final Report

## Scope
Full public-site consistency, copy, layout, link, product-truth, and mobile QA pass across all pages.

## Files Changed

### Translations
- `translations/pt.json` — ~40+ replacements: citações de fonte, fundamentado, Garantido, destruir confiança, Criamos Allybi, Ask, Usar no Ask, Usar no Upload, durante sua sessão, Slack, Gmail, IA privada, workspace privado
- `translations/en.json` — ~30+ replacements: end-to-end encrypted, free plan, Slack, Ask product name, during your session, Gmail

### Core HTML Pages
- `index.html` — removed Índice link from homepage tools section (previous pass)
- `about.html` — fixed "Criamos Allybi" → "Criamos a Allybi", fixed meta description
- `faq.html` — fixed "during your session" → "in your workspace", fixed "contractually guaranteed"
- `demo.html` — fixed Slack references in form options and cover descriptions

### Use Case Pages
- `use-case-legal.html` — English UI labels translated (Section→Cláusula, Supplier→Fornecedor, etc), fixed product language
- `use-case-finance.html` — fixed "Fundamentado por padrão", grammar fixes
- `use-case-business.html` — fixed "respostas citando a fonte", grammar fixes

### Legal Pages (with TODO comments)
- `tos.html` — TODO comments for: Slack as Connected Account, free plans, end-to-end encryption, mobile app references
- `terms.html` — TODO for Slack data export reference
- `privacy.html` — TODO for mobile application, Slack integration section
- `cookies.html` — TODO for Slack integration, mobile app SDK references
- `integration-data-use.html` — "Ask" → "Chat"/"search and chat workflows"
- `security.html` — TODO for end-to-end encryption, Slack/Gmail references

### Previously Changed (from context)
- `metodologia.html` — complete 11-section rebuild
- `indice.html` — replaced with noindex redirect to metodologia.html
- All 30+ HTML files — Índice removed from header nav + mobile nav + footer

## Verification Results

| Check | Status |
|-------|--------|
| Koda in HTML | PASS — 0 |
| Índice in HTML | PASS — 0 |
| indice.html in any link | PASS — 0 |
| app.allybi.com.brm.br | PASS — 0 (only in .claude settings) |
| citações de fonte (PT/EN) | PASS — 0 |
| fundamentado (PT/EN) | PASS — 0 |
| sem upload | PASS — 0 |
| Ask as product name (PT) | PASS — 0 |
| Ask as product name (EN) | PASS — 0 |
| Usar no Ask / Usar no Upload | PASS — 0 |
| Garantido (PT) | PASS — 0 |
| destruir confiança (grammar) | PASS — 0 |
| Criamos Allybi (missing article) | PASS — 0 |
| durante sua sessão / during your session | PASS — 0 (fixed in faq.html) |
| Slack in PT json | PASS — 0 |
| Slack in EN json | PASS — 0 |
| end-to-end encrypted (EN) | PASS — 0 |
| free plan (EN) | PASS — 0 |
| workspace privado (PT) | PASS — 0 |
| IA privada (PT) | PASS — 0 |
| enviar com fonte (PT) | PASS — 0 |
| modo cadê / Google humano | PASS — 0 |
| Manual Search / X-Ray / Cemitério | PASS — 0 |

## Legal TODOs (require legal review)
- tos.html: Slack as Connected Account, free plans language, end-to-end encryption claims, mobile app references
- privacy.html: "mobile application" wording, Slack integration data section
- cookies.html: Mobile SDK section, Slack integration reference
- security.html: End-to-end encryption claims, Slack/Gmail in third-party communications
- terms.html: Slack data export reference

## Copy Normalizations Applied
| Old Term | New Term |
|----------|----------|
| citações de fonte | respostas com fonte |
| citação de fonte | resposta com fonte |
| respostas citando a fonte | respostas com fonte |
| Fundamentado por padrão | Resposta com fonte por padrão |
| Garantido contratualmente | Esse compromisso está nos nossos termos |
| Criamos Allybi | Criamos a Allybi |
| destruir confiança | destrói confiança |
| Usar no Ask | Pesquisar no chat |
| Usar no Upload | Enviar uploads |
| "Ask" (product name) | "Chat" |
| IA privada | Chat com fonte |
| durante sua sessão | no seu workspace |
| end-to-end encrypted | encrypted in transit and at rest |
| free plan | free trial (30 days) |
| Slack (everywhere) | removed or replaced with SharePoint/sources |
| Gmail (as available) | noted as roadmap where needed |

## Product Truth Enforcement
- WhatsApp: always handoff only, never as source or synced inbox ✓
- E-mail via Outlook: sent only after confirmation ✓
- Gmail/Google Drive: shown as roadmap, not available ✓
- Slack: removed from all public-facing content ✓
- 30 dias grátis, depois R$170/mês: consistent ✓
- No demo required to start ✓
- Documents don't train models (without "Garantido") ✓

## Remaining Risks
- es.json (Spanish) still contains old language (fundamentado, Slack, workspace privado) — lower priority
- Legal pages need formal legal review for TODO items
- Some deep translation keys in PT/EN may reference old concepts in sections not currently rendered
