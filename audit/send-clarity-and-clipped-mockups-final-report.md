# Send Clarity & Clipped Mockups — Final Report

## Problem Solved
The site made Allybi look like a drafting tool ("prepara envio", "mensagem preparada") instead of showing the full send flow: Outlook emails sent after confirmation, WhatsApp opened as handoff.

## Files Changed

### CSS
- `pages/home.css` — Fixed clipped "Enviável" card: changed `height: 180px` to `min-height: 180px`, removed `overflow: hidden` on illustration and card wrapper

### Homepage (index.html)
- Hero confirm button: "Prepare send →" → "Send via Outlook →"
- Third pain card title: "Sendable" → "Ready to send"
- Third pain card button: "Confirmar" → "Enviar via Outlook"
- Workflow flow: "Mensagem preparada" → "Revisão" / "Confirmação" → "Envio"

### translations/pt.json (~20 changes)
- Hero subtitle: "prepara o envio por e-mail ou WhatsApp" → "envia e-mails via Outlook com sua confirmação. WhatsApp abre como handoff."
- Hero button: "Preparar envio →" → "Enviar via Outlook →"
- Pain card: "Enviável" → "Pronto para enviar", "Confirmar" → "Enviar via Outlook"
- Workflow: "Mensagem preparada" → "Revisão", "Confirmação" → "Envio"
- How-it-works: "Prepare a mensagem" → "Prepare o envio", "Revise antes de enviar" → "Revise e envie"
- Integrations email card: clarified Outlook send with confirmation
- FAQ answers: updated to show Outlook send + WhatsApp handoff distinction
- Legal use-case: "Prepare o envio certo" → "Envie via Outlook com confirmação"
- WhatsApp FAQ: "envio via WhatsApp" → "WhatsApp handoff" explanation
- Operations story: "Preparou o envio via WhatsApp" → "Abriu WhatsApp handoff"
- Mock prepare title: "Preparar envio" → "Enviar via Outlook"

### HTML Pages (via agents)
- `how-it-works.html` — Hero subcopy, step 05 title, step 06 visual, meta description
- `integrations.html` — Hero subcopy, E-mail card, WhatsApp card, flow labels, meta description
- `pricing.html` — Pricing card send line, how-to-start step 5
- `tempo.html` — Bridge section copy and flow pill
- `diagnostico.html` — Bridge section copy and flow pill
- `tempo-resultado.html` — Bridge copy and flow pill
- `diagnostico-resultado.html` — Bridge copy, flow pill, and JS ALLYBI_ACT array
- `metodologia.html` — "Mensagem preparada" → "Mensagem pronta"
- `security-overview.html` — "mensagem preparada" → "mensagem pronta"

## Verification Results

| Check | Result |
|-------|--------|
| "Preparar envio" as final action | PASS — 0 |
| "Mensagem preparada" as outcome | PASS — 0 |
| "prepara o envio" | PASS — 0 |
| "envio via WhatsApp" (implies direct) | PASS — 0 |
| "Enviável" | PASS — 0 |
| "prepara mensagens" | PASS — 0 |
| "prepare e-mail" (standalone) | PASS — 0 |
| app.allybi.com.brm.br | PASS — 0 |
| Homepage third card clipped | FIXED (min-height, no overflow:hidden) |

## Allowed Exception
- `tempo.html` line 128: "Preparar envio" as a bar label measuring manual workflow time — this describes the user's current pain, not an Allybi feature

## Send Flow Now Communicated
1. Pergunte no chat
2. Resposta com fonte
3. Revisão (destinatário, arquivo, fonte, canal)
4. E-mail via Outlook com confirmação / WhatsApp handoff
