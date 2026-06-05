# Site-Wide Pre-Audit

## Pages Discovered
### Core: index.html, how-it-works.html, integrations.html, security-overview.html, pricing.html, about.html, faq.html, contact.html
### Use Cases: use-case-legal.html, use-case-finance.html, use-case-business.html
### Tools: tempo.html, tempo-questionario.html, tempo-resultado.html, diagnostico.html, diagnostico-questionario.html, diagnostico-resultado.html, metodologia.html
### Redirect: indice.html (noindex → metodologia.html)
### Legal: tos.html, terms.html, privacy.html, cookies.html, integration-data-use.html, data-deletion.html
### Other: customers.html, security.html, demo.html, use-cases.html, subprocessors.html, privacy-choices.html
### Legacy: _template.html, request-demo.html, waitlist.html, busca-manual.html, finais.html, raio-x.html

## Issues Found

### Forbidden Terms in translations/pt.json
- "citações de fonte" — 6 occurrences
- "respostas citando a fonte" — 2 occurrences
- "Fundamentado por padrão" — 1 occurrence
- "Garantido contratualmente" — 8+ occurrences
- "destruir confiança" (wrong grammar) — 3 occurrences
- "Criamos Allybi" (missing article) — 3 occurrences
- "Ask" as product name — 5 occurrences
- "Usar no Ask" / "Usar no Upload" — 2 occurrences
- "durante sua sessão" — 2 occurrences
- "IA privada" — 1 occurrence
- Slack references — 25+ occurrences
- Gmail as available — 8+ occurrences

### Forbidden Terms in translations/en.json
- "end-to-end encrypted" — 2 occurrences
- "free plan" — 1 occurrence
- "during your session" — 3 occurrences
- Slack references — 40+ occurrences
- "Ask" as product name — 10+ occurrences

### HTML File Issues
- about.html: "Criamos Allybi" missing article
- faq.html: "during your session" in English default
- demo.html: Slack references in form and cover
- integration-data-use.html: "Ask" product name

### Legal Page Contradictions
- tos.html: Slack as Connected Account, free plans, end-to-end encryption, mobile app
- privacy.html: "mobile application", Slack integration data
- cookies.html: Mobile SDK section, Slack
- security.html: End-to-end encryption, Slack/Gmail
- terms.html: Slack data export

### Navigation
- Índice was in all header dropdowns and footers — already removed
- indice.html was full page — already converted to redirect
