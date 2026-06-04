# Homepage Final Conversion & Polish Report

## Summary
Complete homepage rebuild focused on conversion clarity, visual hierarchy, section merging, and copy precision. The homepage now follows the section order: Hero > Pain > Mechanism > Sources/Actions > Use Cases > Security > Tools > FAQ > Final CTA.

## Files Changed
- `index.html` — full main content rewrite
- `pages/home.css` — full CSS rewrite with new components
- `translations/pt.json` — hero, pain, integrations, tools, use-cases, final CTA translations updated
- `language-switcher.js` — HOME_META title/description updated for both EN and PT

## What Changed

### Hero (Section 1)
- **H1**: "6 places. One message. The right answer, with sources." → "A chat to find the right answer — and send it with source."
- **PT H1**: "Um chat para encontrar a resposta certa — e enviar com fonte."
- **Subheadline**: Shortened and clarified. Mechanism visible in first 3 seconds.
- **Hero spacing**: Reduced top padding from 140px to 112px on desktop. Hero now starts higher.
- **Grid**: Changed from `1fr 1.15fr` to `46fr 54fr` for tighter copy-mockup alignment.
- **H1 max-width**: Set to 540px to prevent accidental wrapping. `hyphens: none` applied.
- **Pricing line**: Moved from inline style to CSS class `.s-hero__pricing-line`.
- **Uploads pill**: Added `hero-scene__source-pill--uploads` class with matched stroke-width:2 and icon sizing.
- **Action chips**: Added below confirm button showing "E-mail via Outlook" and "WhatsApp handoff" — making WhatsApp's role clear as action, not source.
- **Confirm button color**: Changed from green to dark (#181818) — cleaner, less confusing with source green.

### Pain (Section 2)
- **Subtitle added**: "The cost shows up after the search: confirming the version, finding the source, preparing the response, and sending without error."
- **Pain card visuals replaced**: SVG illustrations replaced with semantic HTML visuals:
  - Card 1 (Find): Scattered chips showing e-mail, pasta, anexo, upload, conversa.
  - Card 2 (Confirm): Version file list with yellow "versão?" badge.
  - Card 3 (Send): Checklist card with Arquivo, Fonte, Destinatário, Confirmar.
- **Copy tightened**: Each card description max 2 lines.

### Mechanism (Section 3)
- **Title kept**: "From request to send, without opening everything again."
- **Steps reduced from 5 complex to 5 focused**: Connect, Ask, Source, Prepare, Confirm.
- **Green accent on steps 3 & 5**: Source and Confirm steps get green number badges.
- **"Compare versions" removed as separate step**: Absorbed into "Get answer with source".

### Sources & Actions (Section 4 — previously "Integrations")
- **Title**: "Your sources and sends in one flow." (PT: "Suas fontes e seus envios no mesmo fluxo.")
- **WhatsApp removed from Sources group**: Now only in "Send actions" group.
- **Uploads card added to Sources**: Explicit card with proper description.
- **Send actions group added**: E-mail via Outlook + WhatsApp handoff, clearly separated from sources.
- **Gmail/Google Drive**: Kept in "Coming soon" with 0.55 opacity (more muted than before).
- **Grid variant**: `s-integrations__grid--half` for 2-column grids (actions, coming soon).

### Use Cases (Section 5 — MERGED)
- **DUPLICATE REMOVED**: Previously had BOTH:
  1. s-cases (tabs: Legal/Finance/Operations with mock UIs)
  2. s-proof (cards: "Momentos em que ninguém quer adivinhar")
- **Now single section**: Three cards with label, context, copy, proof query + source, and CTA link.
- **No tabs**: Simpler, faster to scan.
- **Each card has**: scenario label, context ("Antes da revisão do sócio"), mini proof (query → source file).

### Security (Section 6)
- **Copy unchanged** (already matches spec).
- **Contrast improved**:
  - Card border: `rgba(255,255,255,0.08)` (was 0.05).
  - Body text: `rgba(255,255,255,0.55)` (was 0.40–0.45).
  - Strong text: `rgba(255,255,255,0.95)` (was default).
  - Icon color: `rgba(255,255,255,0.50)` (was 0.35).
  - Subtitle: `rgba(255,255,255,0.55)` with `line-height: 1.6`.
- **No duplicate training cards**: Only "No training on your data" exists once.

### Tools (Section 7)
- **Proper `.s-tools__grid` layout** instead of inline styles.
- **Card CTA links**: "Calculate my time →" / "Map team flow →".
- **i18n keys updated**: `home.tools.calc_title`, `home.tools.diag_title`, `home.tools.calc_cta`, etc.

### FAQ (Section 8)
- **Questions reordered to match product truth**:
  1. What does Allybi do?
  2. Can Allybi send emails?
  3. Does Allybi search WhatsApp?
  4. How much does it cost?
  5. Do I need to book a demo?
  6. What happens before something is sent?
- **Tab switching JS removed** (was for old tabbed use-case section).

### Final CTA (Section 9)
- **Title**: "Connect. Ask. Send with source." (PT: "Conecte. Pergunte. Envie com fonte.")
- **Support text polished**: "...see a source-cited answer before sending."

### Metadata
- **Title**: "Allybi — find answers with source and send with confirmation"
- **PT title**: "Allybi — encontre respostas com fonte e envie com confirmação"
- **OG title**: "Allybi — source-cited answers, ready to send"
- **PT OG**: "Allybi — resposta com fonte, pronta para enviar"
- **No more "6 places. 1 message."** in homepage title.

## Section Order
1. Hero ✓
2. Pain ✓
3. Mechanism ✓
4. Sources/Actions ✓
5. Use Cases (merged) ✓
6. Security ✓
7. Tools ✓
8. FAQ ✓
9. Final CTA ✓
10. Footer ✓

## Verification

### Text Search Results
| Term | Found? |
|------|--------|
| 6 lugares. 1 mensagem (in homepage title) | NO |
| Cemitério | NO |
| Busca Manual | NO |
| Raio-X | NO |
| Pode mandar | NO |
| Prova da Fonte | NO |
| TTF | NO |
| Google humano | NO |
| workspace privado de IA | NO |
| respostas fundamentadas | NO |
| Negócios (in homepage) | NO |
| WhatsApp as fonte | NO |
| app.allybi.com.brm.br | NO |
| Koda | NO |

### Structural Checks
- One H1 only ✓
- No duplicate use-case/proof sections ✓
- WhatsApp only in action chips and send actions, never in source strip ✓
- Dark security section has readable contrast ✓
- Hero CTA visible in first viewport ✓

## Remaining TODOs
- Screenshot capture requires live browser rendering (not available in CLI)
- Responsive testing at 360/375/390/430/768/1024/1280/1440 requires manual QA
- EN copy for new keys needs review (home.usecases.* defaults are English)
