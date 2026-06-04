# Integrations Page — Final Conversion Polish Report

## Files Changed
- `integrations.html` — complete main content rework
- `pages/integrations.css` — complete CSS rewrite

## Page Structure (New)
1. **Hero** — with CTAs, micro trust line, mini flow preview
2. **Fontes conectadas** — 4 source cards (Outlook, OneDrive, SharePoint, Uploads)
3. **Ações de envio** — 2 action cards with subtitle (E-mail via Outlook, WhatsApp handoff)
4. **"Depois de conectar, o que acontece?"** — 5-step product flow
5. **Roadmap** — Gmail, Google Drive with muted styling
6. **Capability matrix** — Desktop tables + mobile accordions
7. **Permissões e segurança** — 5 trust cards
8. **Final CTA** — new strong copy

## Key Changes

### Hero
- **Added secondary CTA**: "Ver como funciona"
- **Added micro trust line**: "Outlook, OneDrive, SharePoint e uploads disponíveis · Gmail e Google Drive em breve · WhatsApp é handoff"
- **Added mini flow preview**: 4-step horizontal rail (Fontes → Chat → Resposta com fonte → Envio)
- **Reduced bottom padding**: Hero doesn't feel empty

### Uploads Icon
- **Old**: Gray generic upload arrow in plain gray square (#F3F4F6 bg, #6B7280 stroke) — looked disabled
- **New**: Custom document + upload arrow SVG with #181818 document strokes and #34A853 green upload arrow — looks product-native and optically balanced with Outlook/OneDrive/SharePoint
- **Same 48x48 container, same rounded rect background, visually weighted**

### Actions Section
- **Added subtitle**: "O Allybi não só encontra a resposta. Ele ajuda a preparar o próximo passo."
- **WhatsApp status**: Changed from "Handoff" (generic badge) to dedicated `.allybi-status--handoff` style (amber/warm)
- **Actions grid**: Separate 2-column grid, max-width 720px

### "Depois de conectar" Flow
- **NEW SECTION**: Shows what happens after connecting — 5 steps with green accent on Source and Confirm
- **Horizontal flow on desktop, scrollable on mobile**
- **Steps**: Fonte conectada → Pergunta no chat → Resposta com fonte → Mensagem preparada → Revisão

### Matrix
- **Desktop**: Tables preserved (cleaner styling)
- **Mobile**: Accordion/details elements replace tables — no horizontal overflow
- **Matrix A**: Fontes (Outlook, OneDrive, SharePoint, Uploads, Gmail, Google Drive)
- **Matrix B**: Actions (E-mail via Outlook, WhatsApp handoff)
- **NO "Usar no Ask", "Usar no Upload", or old terms**

### Trust Section
- **NEW SECTION**: 5 cards — Permissões, Fonte visível, Sem treinamento, WhatsApp sem sincronização, Nada enviado sozinho
- **CTA**: "Ver segurança" linking to security-overview.html

### Final CTA
- **Old**: "Veja o Allybi em ação" (vague)
- **New**: "Conecte uma fonte e pergunte em minutos." (action-oriented)
- **Added secondary CTA**: "Ver como funciona"

### Animation
- **Custom scroll reveal**: `.integ-reveal` with IntersectionObserver
- **Stagger**: 80ms between sibling cards via `.integ-stagger`
- **prefers-reduced-motion**: Fully respected

### Metadata
- **OG title**: "Integrações — Allybi" (with accent, fixed)
- **OG description**: "Fontes conectadas, respostas com fonte e envios preparados com confirmação."
- **Meta description**: Complete PT with all integrations mentioned

## Verification

| Check | Result |
|-------|--------|
| WhatsApp under Fontes | NOT present |
| Ask / Usar no Ask | NOT present |
| Usar no Upload | NOT present |
| Old tool names | NOT present |
| Koda | NOT present |
| Gmail/Google Drive shown as active | NOT present (muted "Em breve" styling) |
| Uploads icon balanced | YES (new custom SVG) |
| Mobile accordion for matrices | YES (2 accordion blocks) |
| One H1 | YES |
| Accents in OG tags | YES (fixed) |

## Accessibility
- All status labels have text (Disponível, Em breve, Handoff)
- Summary/details elements for mobile accordions are keyboard-accessible
- Icons are decorative (aria-hidden not needed as they accompany text)
- prefers-reduced-motion respected
- Touch targets 44px+ on mobile CTAs

## Remaining TODOs
- Screenshots require browser rendering
- Responsive QA at 360/375/390/430/768/1280/1440 requires manual testing
