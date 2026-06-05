# Homepage Top Rework — Final Report

## Files Changed
- `index.html` — hero, pain, and workflow sections completely replaced
- `pages/home.css` — workflow section completely rewritten, responsive updated
- `translations/pt.json` — hero.title, hero.subtitle, pain titles/copy, workflow titles/copy
- `language-switcher.js` — HOME_META title updated

## What Was Deleted
- **H1 with em dash**: "A chat to find the right answer — and send it with source."
- **PT H1 with em dash**: "Um chat para encontrar a resposta certa — e enviar com fonte."
- **Five disconnected dark workflow cards** (.s-workflow__steps, .s-workflow__step)
- **Generic pain titles**: "Find", "Confirm", "Send"

## What Was Built

### Hero
- **New EN H1**: "A chat to find, confirm and send the right document."
- **New PT H1**: "Um chat para encontrar, confirmar e enviar o documento certo."
- No em dash. Natural Portuguese. Complete product job.
- **New EN subtitle**: "...Allybi shows the source, prepares email or WhatsApp and asks for your review before sending."
- **New PT subtitle**: "...O Allybi mostra a fonte, prepara o envio por e-mail ou WhatsApp e pede sua revisão antes de enviar."
- Mockup kept but cleaned up (same structure, removed unnecessary nesting)

### Pain Section
- **New EN H2**: "Finding is not enough."
- **New PT H2**: "Achar não basta."
- Shorter, sharper, creates the problem recognition faster
- **New card titles**: Scattered / Similar / Sendable (PT: Espalhado / Parecido / Enviável)
- **New card copy**: "Three files look right. Only one can be sent." (strongest card)
- Added "alguém do time" to scatter chips
- Added "Contexto" to send checklist

### Dark Workflow
- **Completely rebuilt as full-bleed section**
- Background: `#0B0D0E` (true dark, not generic)
- `min-height: 88vh` — fills viewport intentionally
- Content centered vertically
- **New EN H2**: "From request to send, in one message."
- **New PT H2**: "Do pedido ao envio, em uma mensagem."
- **New visual**: 5-step horizontal flow rail (not 5 cards)
  - Pedido → Pergunta no chat → Resposta com fonte → Mensagem preparada → Confirmação
  - Each step has label + detail + optional micro text
  - "Resposta com fonte" step has green source accent
  - "Confirmação" step has green confirm accent
- CTA buttons inside dark section
- On mobile: steps stack vertically (arrows hidden)

### Title/Meta
- HTML `<title>`: "Allybi — find, confirm and send the right document"
- PT title: "Allybi — encontre, confirme e envie o documento certo"
- HOME_META updated in language-switcher.js

## Verification
| Check | Result |
|-------|--------|
| No em dash in H1 | PASS |
| New H1 direct and complete | PASS |
| Five-card dark block gone | PASS (0 old step classes) |
| New flow rail (5 steps) | PASS |
| Full-bleed dark (#0B0D0E) | PASS |
| Pain "Achar não basta" | PASS |
| WhatsApp only as handoff | PASS |
| Green only on source/confirm | PASS |
| PT translations updated | PASS |

## Remaining TODOs
- Screenshots require browser rendering
- Manual responsive QA at specified breakpoints
