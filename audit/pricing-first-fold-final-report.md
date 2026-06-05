# Pricing First Fold — Final Report

## What Was Wrong
- Left side H1 was just price ("30 dias grátis. Depois R$170/mês.") — no value
- Two competing primary CTAs (left + card) with same text
- Price shown large on both sides
- Repetitive: same offer on left and right with equal visual weight
- "Envie" not strong enough about Outlook send vs WhatsApp handoff
- Page felt like a wireframe, not premium SaaS

## What Changed
- H1 now communicates value: "Um plano para encontrar, confirmar e enviar o documento certo."
- Price subcopy: "Teste grátis por 30 dias. Depois, R$170/mês. Cancele quando quiser." — clear but not the headline
- Support paragraph explains Outlook send + WhatsApp handoff
- Left side has NO primary CTA — only a subtle "Ver como funciona →" link
- Pricing card is the single conversion object with one primary CTA
- Card has value sentence: "O fluxo completo para fontes conectadas, uploads, respostas com fonte e envio revisado."
- Card reassurance: "Comece sem demo. Configure em poucos minutos." (not repeating price)
- Trust chips: Sem demo / Nada sai sem confirmação / WhatsApp sem caixa sincronizada

## Files Changed
- `pricing.html` — complete first fold replacement (section 1)
- `pages/pricing.css` — complete rewrite with proper BEM classes

## First Fold Repetition Check
| Phrase | Occurrences in first fold |
|--------|--------------------------|
| 30 dias grátis | 2 (subcopy + card badge) |
| R$170/mês | 1 (card price only) |
| Começar grátis por 30 dias | 1 (card CTA only) |
| Cancele quando quiser | 2 (subcopy + card note) |

## Broken URLs
- app.allybi.com.brm.br: PASS (0 found)

## Mobile QA
- Grid stacks at ≤1024px
- Card max-width 520px when stacked
- H1 clamps to 28px at ≤600px
- Card padding reduces on mobile
- No horizontal overflow
