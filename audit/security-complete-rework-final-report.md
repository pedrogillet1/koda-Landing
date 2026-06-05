# Security Page Complete Rework — Final Report

## Files Changed
- `security-overview.html` — complete `<main>` rewrite
- `pages/security-overview.css` — complete rewrite

## What Was Deleted
- **H1 with em dash**: "Segurança para documentos sensíveis — sem perder controle."
- **IA section with 4 uneven numbered cards** (sec-ai__step/sec-ai__step-num)
- **Six controls section** (sec-controls__grid) — redundant with trust strip
- **Left-aligned policy links** (sec-policies__link)
- **Old data uses/doesn't two-column** (sec-data)
- **Old flow/flow-step CSS** (sec-flow__*)

## What Was Built

### Hero
- **New H1**: "Controle para documentos sensíveis." — shorter, no em dash
- **min-height: calc(100vh - 64px)** — fills first viewport, prevents background peek
- **H1 max-width 760px, font-size clamp(42px, 6vw, 80px)** — larger, more impactful
- Hero centered vertically within viewport

### Trust Strip (sec-basics)
- 4 equal-height compact cards
- New subtitle: "Antes de conectar qualquer fonte, estas são as regras do produto."

### Access Boundaries (sec-access) — NEW
- Two balanced columns: "Fontes autorizadas" vs "Controle do usuário"
- Clear separation of what's connected vs what user controls

### What Allybi Does Not Do (sec-not) — NEW
- 6 compact "negative boundary" cards in 3x2 grid
- "Não deve inventar fonte" (softened) with TODO
- No red overuse — neutral card styling

### AI Architecture (sec-ai) — COMPLETELY REBUILT
- **Deleted**: 4 uneven numbered cards
- **Built**: Horizontal architecture card (Pergunta → Contexto autorizado → Resposta com fonte)
- 3 equal statements below: Escopo limitado, Sem treinamento, Fonte visível
- Stacks vertically on mobile

### Permissions (sec-perms) — RESTRUCTURED
- Two labeled groups: "Fontes conectadas" (4 cards) and "Handoff" (WhatsApp only)
- WhatsApp visually separated from sources with amber label
- Roadmap note for Gmail/Google Drive

### Sending Boundary — IMPROVED
- Review mockup kept and improved
- Two channel cards below: E-mail via Outlook + WhatsApp handoff

### Policies — COMPLETELY REBUILT
- **Deleted**: Left-aligned text links with uneven lengths
- **Built**: Centered balanced grid (3-col desktop, 2-col tablet, 1-col mobile)
- Cards: min-height 76px, text-align center, equal visual weight
- "Cookies" and "Integrações e Uso de Dados" now look balanced

## Verification
| Check | Result |
|-------|--------|
| No em dash in H1 | PASS |
| No 4 uneven AI cards | PASS |
| No left-aligned policy links | PASS |
| New centered policies (6 cards) | PASS |
| New AI architecture card | PASS |
| No forbidden terms | PASS |
| TODOs for legal/engineering | 4 |
| WhatsApp not as source | PASS |
| Hero fills first viewport | PASS (min-height calc) |

## TODOs (in HTML comments)
1. Confirm AES-256-GCM with engineering
2. Confirm "não inventa fonte" reliability
3. Confirm exact OAuth scope per integration
4. Confirm no-training language with legal

## Remaining
- Screenshots require browser rendering
- Manual responsive QA at specified breakpoints
