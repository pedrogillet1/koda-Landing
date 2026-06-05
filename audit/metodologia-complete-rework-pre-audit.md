# Metodologia Complete Rework — Pre-Audit

## Current Issues
1. Title clunky: "Como calculamos a Calculadora e o Diagnóstico do Fluxo"
2. Page feels like a text document, not a designed trust page
3. First viewport is empty/slow, no reason to keep reading
4. Contains Índice Allybi section (must be removed)
5. Weak hierarchy: user doesn't know what to read first
6. "Privacidade e LGPD" is text-heavy and legalistic
7. "Como o Allybi entra" is too flat
8. Final CTA is generic
9. Page doesn't visually separate: what we ask / calculate / don't claim / how Allybi helps
10. All navigation and footer still reference Índice Allybi

## Sections to Delete
- Old hero (line 242-248)
- Old intro (lines 250-256)
- Old met-sections with 7 cards including Índice section (lines 258-337)
- Old final CTA (lines 339-351)

## Pages Requiring Índice Removal
- All 30+ HTML files with header nav dropdown
- All 30+ HTML files with footer tools column
- translations/pt.json (nav.indice, footer.indice, home.tools.index_link)
- translations/en.json (nav.indice, footer.indice)
- index.html homepage tools link

## Claims to Verify
- No overclaimed anonymization
- LGPD explanation is not legal advice
- WhatsApp is handoff only, never as source
