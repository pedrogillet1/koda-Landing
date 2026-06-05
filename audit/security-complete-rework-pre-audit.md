# Security Page Complete Rework — Pre-Audit

## Current Issues
1. **H1 uses em dash**: "Segurança para documentos sensíveis — sem perder controle." feels AI-generated
2. **Hero padding too small**: `padding-bottom:48px` — next section's gray background peeks at bottom of first viewport
3. **IA section (sec-ai)**: 4 uneven numbered cards with wildly different text lengths — looks ugly
4. **Policies grid**: Left-aligned cards with different label lengths — "Cookies" looks tiny, "Integrações e Uso de Dados" dominates
5. **Six controls section**: Repeats claims from trust strip (training, encryption, permissions)
6. **Permissions grid**: 5-column at desktop is very wide, cards feel stretched

## Sections to Delete
- Current IA section (sec-ai) with 4 numbered cards
- Current 6-controls section (partially redundant with trust strip)
- Current policies grid layout

## Sections to Rebuild
- Hero (new H1, more bottom padding)
- AI section → architecture card
- Policies → centered balanced grid
- Consolidate controls + boundaries into cleaner sections

## Technical Claims Needing Verification
- AES-256-GCM (line 198 TODO)
- "contractually guaranteed" no-training (line 243 TODO)
- "não inventa fonte" reliability (line 174 TODO)
- Exact OAuth scope per integration (line 263 TODO)
