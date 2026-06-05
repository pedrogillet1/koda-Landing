# How It Works Section Rebuild — Final Report

## What Was Deleted
- **Sticky workflow layout** (`.hiw-flow__layout`, `.hiw-flow__mockup-wrap`, all `.hiw-mock__state` elements)
- **IntersectionObserver sticky JS** (showState function, mock state switching)
- **"O que fica simples por fora"** section (`.hiw-simple__*` — 4 icon cards)
- **"Por fora, uma pergunta..."** section (`.hiw-power__*` — 4 power cards)
- **Fontes/Envios grouped cards** section (`.hiw-sa__*` — 2 tall cards)
- All old CSS classes for these sections
- All rail/preview CSS leftover (`.hiw-rail__*`)

## What Was Built

### Workflow Storyboard (6 panels)
- **No sticky**. No scroll-changing mockup. Each panel is a self-contained 2-column grid (38% text / 62% visual).
- Panels alternate left/right using `direction: rtl` trick for visual variety.
- Each panel has: step number, title, copy, optional chips, AND its own product mockup card.
- Panel mockups contain real content: file chips, chat input, source answer, diff comparison, message composer, review modal.
- Semantic color: green only on "Resposta com fonte" badge and "Confirmar envio" button. Yellow for diff changes. Red only for removed text.
- Section heading: "Do pedido ao envio, sem abrir tudo de novo." with subtitle.
- Panel spacing: `clamp(64px, 9vh, 96px)` vertical padding.

### Surface/Depth Map (1 consolidated section)
- **Replaced 3 duplicate sections** with one product map card.
- Three-zone horizontal layout: Entram → Allybi → Saem
- **Entram**: Outlook, OneDrive, SharePoint, Uploads
- **Allybi**: Mini mockup showing question → answer with "com fonte" chip
- **Saem**: E-mail via Outlook, WhatsApp handoff
- **WhatsApp only in "Saem", never in "Entram"**
- Below: 4 compact "under the hood" chips (Busca contexto, Compara versões, Mostra fonte, Prepara mensagem)
- Mobile: stacks vertically with rotated arrows

## Why Sticky Was Removed
- Step text and visual were physically separated (text left, mockup right at top)
- As user scrolled, the active step would change but the mockup wouldn't always align
- Step 2 content visually polluted Step 1 at section entry
- On mobile/tablet, the sticky was disabled anyway and only showed Step 1

## Verification
| Check | Result |
|-------|--------|
| No position:sticky in CSS (except comment) | PASS |
| No mock state switching in HTML | PASS |
| No old sections (simple/power/sa) | PASS |
| 6 workflow panels with own visuals | PASS |
| 1 consolidated depth map | PASS |
| WhatsApp only in "Saem" | PASS |
| No forbidden terms | PASS |
| Green only for source/confirmation | PASS |
| Yellow for diff changes | PASS |

## Responsive
- Desktop: 2-column panels, horizontal depth map
- Tablet (≤1024px): Single-column panels, vertical depth map
- Mobile (≤600px): Compact spacing, smaller typography
- Small mobile (≤390px): Further size reduction

## Remaining TODOs
- Screenshots require browser rendering
- Manual responsive QA at specified breakpoints
