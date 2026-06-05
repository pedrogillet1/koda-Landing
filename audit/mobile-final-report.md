# Mobile-First QA Pass — Final Report

## Files Changed
- `translations/pt.json` — "Envie com fonte" → "Envie com confirmação" (3 occurrences), "Confirmar envio" → "Enviar via Outlook" (2 occurrences)
- `index.html` — homepage final CTA "Send with source" → "Send with confirmation"
- `tempo.html` — fixed double period "handoff.."
- `diagnostico.html` — fixed double period "handoff.."
- `tempo-resultado.html` — fixed double period "handoff.."
- `diagnostico-resultado.html` — fixed double period "handoff.."
- `integrations.html` — fixed double period in meta description and hero subcopy
- `how-it-works.html` — fixed double period in meta description and hero subcopy, "Confirmar envio" → "Enviar via Outlook"
- `security-overview.html` — "Confirmar envio" → "Enviar via Outlook"
- `allybi-responsive.css` — added mobile QA section: scroll-margin for targets, workflow stacking, flow arrows rotation, matrix mobile handling, small phone compactness

## Grep Proof Results
| Term | Status |
|------|--------|
| app.allybi.com.brm | PASS — 0 |
| Koda | PASS — 0 |
| indice.html | PASS — 0 |
| Índice | PASS — 0 |
| enviar com fonte | PASS — 0 |
| respostas citando | PASS — 0 |
| citações de fonte | PASS — 0 |
| fundamentado | PASS — 0 |
| Confirmar envio | PASS — 0 |
| envio via WhatsApp | PASS — 0 |
| Preparar envio | PASS — 0 |
| Sem upload | PASS — 0 |
| Double periods | PASS — 0 |

## Note
- "Enviável" remains in pt.json per user's explicit request (reverted from "Pronto para enviar")

## Mobile CSS Improvements
- `:target` scroll-margin-top for sticky header
- Workflow sections stack at ≤767px
- Flow arrows rotate 90° on mobile
- Matrix desktop table hidden, mobile accordion shown
- Legal tables get overflow-x: auto
- Inline 3-col grids force single column
- Small phones (≤480px): pricing card compact, trust chips stack, methodology dimensions stack
