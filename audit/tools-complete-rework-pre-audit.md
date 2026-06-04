# Tools Complete Rework — Pre-Audit

## Current Architecture
- tempo.html: Single 1047-line file with inline CSS+JS containing landing, quiz, result, lead form, bridge
- diagnostico.html: Single 718-line file with inline CSS+JS containing landing, quiz, result, lead form, bridge

## Landing Problems
- Tempo: Generic preview card, not enough curiosity, result markup hidden on same page
- Diagnostico: Footer appears immediately after hero, no pre-start content
- Neither creates "I need to know this" feeling

## Questionnaire Problems
- Blue accent (#2563EB) throughout — not Allybi brand
- Tempo: Voltar and Próxima not aligned on same row for multi-select
- Both: Quiz is part of landing page, not separate focused experience
- Result placeholders exist in DOM before completion
- No loading/calculation transition

## Result Problems
- Not convincing as shareable reports
- "Receber diagnóstico completo" was raw blue link (fixed to card but still on same page)
- No breakdown bars
- No share preview card
- No interpretation by band/dimension
- Bridge feels pasted on

## Header Dropdown
- "Calculadora do Tempo Perdido" breaks into 2 lines

## Old Terms to Remove
- None found in current versions (already cleaned)

## Target: 6 new files
1. tempo.html (landing only)
2. tempo-questionario.html (quiz only)
3. tempo-resultado.html (result only)
4. diagnostico.html (landing only)
5. diagnostico-questionario.html (quiz only)
6. diagnostico-resultado.html (result only)
