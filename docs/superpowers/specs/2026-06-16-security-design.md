# Design spec — /security-overview.html refactor

**Branch:** `security-refactor` (forked from `integrations-refactor`)
**Date:** 2026-06-16
**Brief:** mensagem do usuário, 17 seções (max focus on item 2: claim rules)

## Estado atual (~70% alinhado)

Estrutura macro está OK. Pontos críticos:

**Overclaims técnicos com TODO `confirm` comments:**
- Card "Dados protegidos" → "Criptografia em trânsito e em repouso" — não verificado com engenharia.
- (Outros TODOs em sec.ai_stmt2_p e sec.perms_outlook_desc são afirmações já corroboradas em outras páginas — manter.)

**Termos banidos:**
- "Nada sai sozinho" (basics_c4_h) — brief item 4 lista "nada sozinho" como banido.
- "Não deve inventar fonte" (not_c5_h) — brief item 4 banido.
- "Não envia sozinho" (not_c3_h) — variação banida.

**Deltas estruturais:**
- Hero sem visual à direita (brief item 5.2 pede permission panel + revisão custom — NÃO reaproveitar `hero-scene`).
- Hero sem trust chips (brief lista 5).
- "Pode acessar" usa headings "Fontes autorizadas / Controle do usuário" — brief pede "Pode usar / Não usa".
- IA workspace falta 4ª etapa "Limite claro" (brief item 5.5).
- Falta frase destaque "WhatsApp não é fonte. É handoff." (brief item 5.6).
- Final CTA falta microcopy "30 dias grátis. Documentos não treinam modelos. Nada sai sem confirmação."
- SEO description menciona "criptografia" — remover.

## Decisões padrão (segui as recomendadas)

- **Hero visual ÚNICO**: criar permission panel custom (fontes conectadas com check / OneDrive desconectado / WhatsApp handoff separado / pergunta-resposta-fonte / review panel). **NÃO reaproveitar `hero-scene`** (decisão do usuário).
- **Manter ordem atual**: hero → basics → access → NOT → ai → perms → sending → policies → CTA. Não swappar — funciona como argumento ("afirma → contradiz → expande").
- **Remover overclaim cripto da primeira dobra**: substituir card "Dados protegidos" por **"Detalhes nas políticas"** com link para a seção de políticas. Brief item 2 recomendação verbatim quando não comprovado: "Detalhes de proteção e uso de dados ficam nas políticas."

## Fases

### Phase 1 — Hero 2-col com permission panel custom
- Layout grid texto + visual.
- **Visual ÚNICO (não hero-scene)**: permission panel mostrando estado de fontes:
  - Outlook ✓ conectado, OneDrive ✓ conectado, SharePoint ✓ conectado, Uploads ✓ adicionados.
  - WhatsApp · Handoff (separado, sem badge de conectado).
  - Pergunta → resposta com fonte → painel de revisão (Destinatário/Mensagem/Arquivo/Fonte/Canal/Status: Aguardando confirmação) → "Enviar via Outlook" (botão preto).
- Trust chips (5 do brief).
- Microcopy refinado.
- Mobile: stack.

### Phase 2 — Remover overclaim técnico
- Substituir card "Dados protegidos" + "Criptografia em trânsito e em repouso" por **"Limite claro / Detalhes de proteção e uso de dados ficam nas políticas."** linkando para a seção política.
- SEO description: remover "criptografia".
- OG description: remover "criptografia".

### Phase 3 — Banned terms remoção
- `basics_c4_h` "Nada sai sozinho" → **"Envio com revisão"** (mesma fix da integrations).
- `not_c3_h` "Não envia sozinho" → **"Não envia sem revisão"**.
- `not_c5_h` "Não deve inventar fonte" → **"Limite claro quando não há base suficiente"** (brief item 5.5 sugere essa exata frase).
- `not_c5_p` simplificar pra alinhar com novo título.

### Phase 4 — IA workspace 4ª etapa
- Adicionar zona 4 "Limite claro" após "Resposta com fonte":
  - Title: "Limite claro"
  - Content: "Sem fonte suficiente, mostra a limitação."
- Adicionar 4ª statement card "Limitação clara" no grid.

### Phase 5 — Conectar não significa: frase destaque
- Adicionar após sub: callout grande **"WhatsApp não é fonte. É handoff."** em styling distinto.
- Manter cards existentes.

### Phase 6 — Access section ajustes
- Headings: "Fontes autorizadas" → **"Pode usar"** + "Controle do usuário" → **"Não usa"**.
- Lista direita: expandir com WhatsApp inbox / arquivos fora do workspace / canais sem permissão (per brief item 5.4).
- Mobile: virar accordions.

### Phase 7 — CTA final microcopy
- Adicionar `cta_micro`: "30 dias grátis. Documentos não treinam modelos. Nada sai sem confirmação."

### Phase 8 — SEO/OG cleanup
- title já correto ("Segurança | Allybi").
- description: remover "criptografia", reescrever per brief item 13.
- OG/Twitter idem.

### Phase 9 — Subagent reviews
- strategy-auditor + security-claims-reviewer + whatsapp-risk (alta peso).
- pt-br-copy-editor + visual-director + mobile-ux-reviewer.
- a11y + product-truth.

### Phase 10 — QA + delivery

## Out of scope

- Mudar palette/logo.
- Mudar outras páginas.
- Backend.
- Hero não usará `hero-scene` (decisão explícita do usuário).
