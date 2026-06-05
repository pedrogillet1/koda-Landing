# How It Works Section Rebuild — Pre-Audit

## Current Structure (lines 131-401)
1. **Workflow section** (lines 131-288): Sticky mockup + 6 text steps. Mockup uses `position: sticky` and IntersectionObserver to switch states.
2. **"O que fica simples por fora"** (lines 290-330): 4 icon cards (Conectar/Perguntar/Confirmar/Enviar)
3. **"Por fora, uma pergunta..."** (lines 332-360): 4 power cards (Fontes conectadas/Resposta/Versão/Envio)
4. **Fontes/Envios grouped cards** (lines 362-388): Two tall cards with source/action lists

## Problems
- Sticky mockup disconnects visual from step during scroll
- Step 2 pollutes Step 1 viewport
- 3 sections repeat the same concept: connect→ask→confirm→send
- Fontes/Envios cards are tall empty boxes
- JS sticky observer (lines 490-518) creates jank potential

## CSS classes to delete/replace
- `.hiw-flow__layout`, `.hiw-flow__mockup-wrap`, `.hiw-flow__mockup`, all `.hiw-mock__*`
- `.hiw-simple__*` (entire section)
- `.hiw-power__*` (entire section)
- `.hiw-sa__*` (entire section)
- `.hiw-rail__*` (already removed from HTML but CSS remains)

## JS to delete
- Sticky mockup state switching (lines 490-518)

## Elements to preserve
- Hero (lines 107-130)
- Final CTA (lines 390-402)
- Footer (lines 404-484)
- Scroll reveal system (lines 521-538)
- Header/mobile menu (lines 25-102)
