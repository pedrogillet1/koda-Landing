# Legal Policy Risk Notes

Date: 2026-06-01

## Overview
All 6 legal pages have been reformatted with Portuguese chrome (titles, H1s, summaries, navigation labels) while preserving the original English legal content.

## Translation Status

### tos.html (Termos de Servico)
- Chrome: Portuguese
- Legal content: English (pending review)
- Notice added: "Esta pagina contem texto juridico em ingles enquanto a versao em portugues passa por revisao."
- TODO: Legal review required before full Portuguese publication

### terms.html (Uso Aceitavel)
- Same pattern: PT chrome, EN legal content

### privacy.html (Politica de Privacidade)
- Same pattern

### cookies.html (Politica de Cookies)
- Same pattern

### integration-data-use.html (Integracoes e Uso de Dados)
- Same pattern

### data-deletion.html (Exclusao de Dados)
- Same pattern

## Product Accuracy Concerns

### Items to verify with legal counsel:
1. TOS mentions "free and paid subscription plans" — should match current "one plan R$170/mes after 30-day trial"
2. TOS mentions "iOS and Android" mobile application — verify if mobile apps exist
3. TOS mentions "$100 liability cap" — verify if this is correct for Brazilian market
4. Privacy policy mentions Slack integration — Slack is NOT currently supported
5. Privacy policy mentions Gmail — Gmail is roadmap only, not active
6. Privacy policy mentions OCR — verify if OCR is implemented
7. Cookie policy mentions Google Analytics and HubSpot — verify actual tracking
8. Integration-data-use mentions Slack and Gmail as active — should say roadmap
9. Multiple pages reference "Camasmie Gillet Inc." — verify correct legal entity

### WhatsApp accuracy:
- Current legal text may describe WhatsApp integration inaccurately
- Product truth: WhatsApp is handoff only (prepare message, open WhatsApp)
- Legal pages should NOT claim WhatsApp inbox reading/syncing

### Email accuracy:
- Product truth: Email via Outlook can be prepared and sent after user confirmation
- Legal pages should match this description

## Recommendation
All legal content requires review by counsel before:
1. Full Portuguese translation
2. Product accuracy alignment
3. Brazilian market compliance (LGPD, consumer protection)

## Footer Link Mapping
- Termos de Servico -> tos.html (correct)
- Uso Aceitavel -> terms.html (works, could be renamed to acceptable-use.html later)
- Privacidade -> privacy.html (correct)
- Cookies -> cookies.html (correct)
- Integracoes e Uso de Dados -> integration-data-use.html (correct)
- Exclusao de Dados -> data-deletion.html (correct)
