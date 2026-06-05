# Pricing Workflow Section — Final Report

## Why Old Section Was Removed
The old "Fontes entram. Envios saem com revisão." section had three empty icon cards (Fontes conectadas, Uploads, Envios) that showed inputs/outputs without explaining workflow value. It didn't justify R$170/month, didn't show the full path from question to reviewed send, and made Allybi look like a file organizer rather than a complete workflow product.

## New Section Structure
- Eyebrow: "INCLUSO NO PRO"
- H2: "O plano cobre o caminho inteiro."
- Subtitle explains Outlook send + WhatsApp handoff
- 2-column card: left = numbered 5-step list, right = product mockup
- Mockup shows: source chips → chat question → answer with source → review panel → send buttons
- Compact before/after comparison row below
- CTA: "Começar grátis por 30 dias"

## Files Changed
- `pricing.html` — complete section replacement (lines 174-216)
- `pages/pricing.css` — added responsive breakpoint at 860px for card stacking

## Copy Used
- H2: "O plano cobre o caminho inteiro."
- Steps: Conecte → Pergunte → Receba com fonte → Revise → Envie
- Trust: "Nada sai sem sua confirmação."
- Mockup: question, source-cited answer, review checklist, "Enviar via Outlook" button
- Comparison: Antes (5 manual steps) vs Com Allybi (3 steps)

## Mobile QA
- Card stacks at ≤860px (text first, mockup below)
- Before/after comparison stacks at ≤860px
- No horizontal overflow
- All buttons visible
- Source chips wrap naturally

## Remaining TODOs
- None for this section
