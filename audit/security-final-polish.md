# Security Page — Final Conversion Polish Report

## Files Changed
- `security-overview.html` — complete rewrite
- `pages/security-overview.css` — complete rewrite

## Page Structure (New: 9 sections)
1. **Hero** — concrete H1, dual CTAs, micro trust line, security flow
2. **Quick trust strip** — 4 compact proof cards
3. **"O que acontece com seus dados"** — will/won't two-column layout
4. **Six controls** — non-repetitive, with technical details
5. **Integration permissions** — per-source boundaries, WhatsApp handoff
6. **AI and model training** — explicit, not repeated
7. **Sending and WhatsApp boundaries** — dual cards + review mockup
8. **Policies and documents** — legal link grid
9. **Final CTA** — consistent, no contradiction

## Key Changes

### Hero
- **Old H1**: "Security and privacy, made visible." (abstract)
- **New H1**: "Segurança para documentos sensíveis — sem perder controle." (concrete)
- **Added**: Secondary CTA "Falar com vendas sobre segurança"
- **Added**: Micro trust line with 3 key facts
- **Added**: Security flow showing controls embedded in workflow (5 steps)
- **Fixed**: OG tags now in Portuguese with proper accents

### CTA Contradiction Fixed
- **Old**: Text said "Agende uma demonstração..." but button said "Começar grátis por 30 dias"
- **New**: Text says "Comece grátis por 30 dias. Se sua equipe quiser revisar permissões... fale com vendas." Buttons match.

### Repetition Removed
- **Old**: "sem treinamento" appeared in hero subtitle, pillar card title, pillar card body, and additional places
- **New**: Said clearly in trust strip (summary) and AI section (detail). Controls card uses different wording for variation. Data section lists it as a "won't" bullet. No copy-paste repetition.

### Trust Strip (NEW)
- 4 compact cards: No training, Explicit permissions, Encryption, Nothing sent alone
- Quick-scan for non-security buyers
- Each card max 2 lines of body text

### "What Happens to Data" (NEW — replaces old will/won't)
- Two-column: "O Allybi usa" (green border) vs "O Allybi não usa para" (red border)
- 5 items each
- More granular than old 3-item lists
- Includes WhatsApp boundary explicitly

### Six Controls (IMPROVED)
- Each card now has H3 + body paragraph + technical detail span
- Technical details separated visually (border-top, smaller text)
- No duplicate claims between cards
- Icons match meaning (lock, user-check, layers, document-citation, checkmark, eye-off)
- Green accent only on source/confirmation icons

### Integration Permissions (NEW)
- Per-source breakdown: Outlook, OneDrive, SharePoint, Uploads, WhatsApp
- WhatsApp card has amber/handoff border styling
- WhatsApp explicitly labeled as "Não é fonte conectada. É handoff."
- Roadmap note: "Gmail e Google Drive em breve"
- CTA: "Ver integrações"

### AI Section (NEW)
- 4-step explainer: ask → search → answer with source → indicate when not available
- Uses safe language ("indica que não encontrou fonte suficiente" instead of "nunca inventa")
- TODO marked for confirming reliability of this behavior

### Sending Boundaries (NEW)
- Two cards: Email via Outlook + WhatsApp handoff
- Review mockup showing: Destinatário, Mensagem, Arquivo, Fonte, Canal, Cancel/Confirm
- WhatsApp clearly stated: "não lê, sincroniza ou pesquisa sua caixa de entrada"

### Policies Section (NEW)
- 6 policy links in grid
- Note: "Certificações e relatórios de segurança serão adicionados conforme estiverem disponíveis"
- No fake SOC 2/ISO claims

## Technical Claims & TODOs

| Claim | Status | TODO |
|-------|--------|------|
| TLS in transit | Kept | — |
| AES-256 at rest | Kept (general) | Confirm AES-256-GCM with engineering |
| OAuth for integrations | Kept | Confirm exact OAuth scope behavior |
| Workspace isolation | Kept | — |
| Documents don't train models | Kept | Confirm "contractually guaranteed" with legal |
| AI indicates when info not found | Kept (safe wording) | Confirm reliability of this product behavior |
| Exact OAuth scope per integration | General wording | Confirm exact scope per integration |

Total TODOs in source: **5** (embedded as HTML comments)

## Verification

| Check | Result |
|-------|--------|
| Koda | NOT found |
| "respostas fundamentadas" | NOT found |
| "workspace privado de IA" | NOT found |
| "Agende uma demonstração" | NOT found |
| CTA contradiction | FIXED |
| WhatsApp as source | NOT present (handoff only) |
| Repeated security card | FIXED (no copy-paste repetition) |
| Overclaims | Replaced with safe language + TODOs |
| One H1 | YES |
| 9 sections | YES |
| Mobile responsive | CSS includes breakpoints for 768/600/390 |

## Accessibility
- All icons are decorative (aria-hidden)
- Status communicated via text labels, not just color
- Focus states from base component CSS
- Policy links are real `<a>` elements
- prefers-reduced-motion respected
- Touch targets 44px+ on mobile CTAs

## Remaining TODOs
- Screenshots require browser rendering
- 5 engineering/legal TODOs embedded in HTML comments
- Manual responsive QA at specified breakpoints
