# How It Works — Final Conversion Polish Report

## Files Changed
- `how-it-works.html` — complete main content rewrite
- `pages/how-it-works.css` — complete CSS rewrite

## Page Structure (New)
1. **Hero** — with pricing, trust line, workflow preview rail
2. **Workflow** — 6-step sticky mockup (desktop) / stacked cards (mobile)
3. **"O que fica simples por fora"** — 4 user-action cards (replaces old generic strip)
4. **"Por fora, uma pergunta. Por baixo, o fluxo inteiro."** — 4 power cards
5. **Source/Action trust strip** — clear Fontes vs Envios separation
6. **Final CTA** — new copy, no more "documento real"

## What Changed

### Hero
- **H1 kept**: "Pergunte, confirme e envie sem abrir tudo de novo."
- **Subheadline updated**: mentions fonte, e-mail, WhatsApp, and confirmation
- **Added pricing microcopy**: "30 dias grátis. Depois R$170/mês. Cancele quando quiser."
- **Added trust line**: Respostas com fonte · Nada enviado sem confirmação · WhatsApp sem caixa sincronizada
- **Added workflow preview rail**: 5 compact steps showing full flow at a glance
- **Reduced top padding**: from 140px to 128px

### Workflow Section
- **Expanded from 5 to 6 steps**: Added "Compare e confirme" as step 4, "Prepare a mensagem" as step 5
- **Sticky mockup on desktop**: Right panel stays fixed as user scrolls through steps. State changes via IntersectionObserver.
- **Each step has its own mockup state**:
  - Step 1: File imports with success status
  - Step 2: Chat query with prompt chips
  - Step 3: Source-cited answer (green badge)
  - Step 4: Version diff with highlights
  - Step 5: Prepared message with channel chips
  - Step 6: Review before send with confirm/cancel
- **Green accent on steps 3 & 6**: Source and Confirm steps get green number badges
- **All file names Brazilian Portuguese**: Contrato_Anderson_v4.pdf, Deck_Conselho_Q4.pptx, Escopo_Cliente_Alfa_v2.docx
- **No more SPA_Draft, NDA_v3_final**
- **Mobile**: Sticky disabled, shows step 1 mockup by default

### "O que fica simples por fora" (replaces strip)
- **Old strip**: Upload / Chat / Integrações / Revisar — floating icon labels, disconnected
- **New section**: 4 clean cards — Conectar / Perguntar / Confirmar / Enviar
- **"Confirmar" card has green accent** (border + icon)
- **First card is "Conectar"** not "Subir arquivo"

### "Por fora, uma pergunta. Por baixo, o fluxo inteiro."
- **New section**: Shows Allybi's capability depth without making the interface look complex
- **4 cards**: Fontes conectadas / Resposta com fonte / Versão e contexto / Envio com revisão
- **Prevents underselling**: Page shows simplicity AND power

### Source/Action Trust Strip
- **Clear visual separation**: Fontes (Outlook, OneDrive, SharePoint, Uploads) | Envios (E-mail via Outlook, WhatsApp handoff)
- **WhatsApp only in Envios, never in Fontes**

### Final CTA
- **Old**: "Comece com um documento real." + "Suba um arquivo, faça uma pergunta..."
- **New**: "Faça o primeiro fluxo completo em minutos." + "Conecte uma fonte ou suba um arquivo. Pergunte no chat, receba com fonte e revise antes de enviar."
- **Added secondary CTA**: "Ver integrações"

### Animation
- **Scroll reveal**: Custom `hiw-reveal` class with IntersectionObserver
- **Elements enter**: opacity 0→1, translateY 12px→0, 500ms ease
- **Mockup state transitions**: opacity 0.35s ease between states
- **prefers-reduced-motion**: Fully respected — all animations disabled

### Metadata
- **Title**: "Como funciona — Allybi" (unchanged, correct)
- **Meta description**: Updated to PT: "Conecte fontes, suba arquivos, pergunte no chat e receba respostas com fonte..."
- **OG title/description**: Added proper Portuguese

## Copy Verification

| Term | Found? | Note |
|------|--------|------|
| Koda | NO | |
| NDA_v3_final | NO | Replaced |
| SPA_Draft | NO | Replaced |
| Ask (standalone) | NO | Uses "Pergunte" |
| Upload (standalone summary) | NO | Uses "Conectar" |
| Answer with source | NO | Uses "Resposta com fonte" |
| Comece com um documento real | NO | Replaced |
| Fazer o Raio-X | NO | |
| Manual Search | NO | |
| Cemetery | NO | |
| Busca Manual | NO | |
| Raio-X | NO | |
| cliente@empresa.com (without .br) | NO | Uses .com.br |
| WhatsApp as fonte/source | NO | Only as handoff/envio |

## Accessibility
- prefers-reduced-motion respected (all animations disabled)
- One H1 only
- Mockup is decorative (aria-hidden available)
- Touch targets on all CTAs (44px+ height from allybi-btn--lg)
- No color-only communication (green accent + text labels)
- Focus states from base component CSS

## Remaining TODOs
- Screenshot capture requires browser rendering
- Visual QA at specific breakpoints requires manual testing
- PT translation keys (hiw.*) in translations/pt.json may need updating to match new structure if EN fallbacks don't match
