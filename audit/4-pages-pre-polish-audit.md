# 4-Page Visual Polish Pre-Audit

## SYSTEMIC ISSUES

### 1. Green used as decoration, not semantic state
- **index.html**: Steps 3 and 5 have `s-workflow__step--source` and `s-workflow__step--confirm` with green-filled number circles. Green should mean "confirmed safe state", not "important step".
- **how-it-works.html**: Rail steps "Resposta com fonte" and "Revisão antes do envio" have green borders. Flow steps 3 and 6 have green number circles.
- **integrations.html**: Hero flow has `--source` green step. "Depois de conectar" steps 3 and 5 have full green card borders + backgrounds.
- **security-overview.html**: Flow steps "Resposta com fonte" and "Confirmação" have green borders.

**FIX**: Remove all green step numbers, green card borders, green card backgrounds. Use green ONLY as: small inline chip/dot, confirm button color, source badge text.

### 2. Flow rails repeated across too many pages
Every page (home, how-it-works, integrations, security) shows a near-identical flow rail (Fontes → Chat → Resposta → Mensagem → Confirmação). This loses force through repetition.

**FIX**:
- Homepage: keep flow in dark workflow section (it's the mechanism section)
- How-it-works: REMOVE hero rail entirely. The page IS the workflow explanation.
- Integrations: REMOVE hero flow. Replace with compact source chips only.
- Security: REMOVE hero flow. Security page should not repeat product mechanism.

### 3. Hero pollution on how-it-works, integrations, security
Each page hero has: eyebrow + H1 + sub + CTAs + pricing/trust line + full flow rail. Too many competing elements.

**FIX**: Clean heroes. Only: eyebrow, H1, sub, CTAs, one-line trust. No flow rails in heroes of pages 2-4.

### 4. Integrations permission cards: 3+2 grid with empty hole
5 cards in `grid-template-columns: repeat(3, 1fr)` leaves 2 cards in bottom row with empty third space.

**FIX**: Use `grid-template-columns: repeat(5, 1fr)` on wide screens with compact cards, or center the 2-card row.

### 5. Security AI section: 4 uneven cards
The 4-card grid in AI section has different text lengths creating visual wobble.

**FIX**: Already fixed to two-column will/won't layout. Verify balance.

### 6. How-it-works "Fontes / Envios" strip too cramped
The source/action trust strip is too tightly packed with icons and text.

**FIX**: Replace with two grouped cards with proper spacing.

---

## PAGE-BY-PAGE AUDIT

### index.html
- **First fold**: Good direction. Grid 46/54 split. Gap of 56px may be too wide.
- **Hero mockup**: Slightly disconnected from H1. `margin-left: auto` pushes it right.
- **Dark workflow section**: Green on steps 3/5 is arbitrary.
- **Dark section text**: Body text at `rgba(255,255,255,0.45)` too muted.
- **Use-case cards**: Clean, balanced. Keep.
- **Security dark section**: Works. Keep.
- **H1**: "A chat to find the right answer — and send it with source."
- **Sections to change**: Hero gap, dark workflow green, dark text contrast.
- **Sections to preserve**: Pain cards, use-case cards, integrations cards, security section, FAQ, final CTA.

### how-it-works.html
- **First fold**: Polluted. Hero + pricing + trust line + full flow rail.
- **Flow rail in hero**: Should be removed. This page IS the flow.
- **Step section**: Only step 1 mockup has real content. Others show generic states.
- **Steps 3/6**: Green number circles arbitrary.
- **"O que fica simples" cards**: Clean. Keep but verify spacing.
- **"Por fora, uma pergunta" cards**: Clean. Keep.
- **Fontes/Envios strip**: Too cramped.
- **H1**: "Pergunte, confirme e envie sem abrir tudo de novo."
- **Sections to change**: Remove hero rail, fix step green, fix trust strip.
- **Sections to preserve**: Hero copy, step mockup content, simple cards, power cards, final CTA.

### integrations.html
- **First fold**: Hero + full flow rail competing.
- **Hero flow**: Should be removed or replaced with compact source chips.
- **Source cards**: Clean. Uploads icon needs checking.
- **"Depois de conectar"**: Steps 3/5 have green card borders/backgrounds.
- **Permission cards**: 5 cards in 3-col grid = 3+2 with empty hole.
- **H1**: "Conecte as fontes onde o trabalho já acontece."
- **Sections to change**: Remove hero flow, fix "depois" green, fix permission grid.
- **Sections to preserve**: Source cards, action cards, roadmap cards, matrices, final CTA.

### security-overview.html
- **First fold**: Hero + trust line + full flow rail visible immediately.
- **Flow in hero**: Security page should be calm. Remove flow.
- **Trust strip cards**: Clean. Keep.
- **Data section**: Two-column will/won't. Clean.
- **Six controls**: Each card has detail span. Check text balance.
- **AI section**: Was 4 uneven cards, now restructured. Verify.
- **H1**: "Segurança para documentos sensíveis — sem perder controle."
- **Sections to change**: Remove hero flow, verify control card balance.
- **Sections to preserve**: Trust strip, data section, permissions, sending mockup, policies, final CTA.
