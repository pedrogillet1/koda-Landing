# Design spec — /integrations.html refactor

**Branch:** `integrations-refactor` (forked from `how-it-works-refactor`)
**Date:** 2026-06-16
**Brief:** mensagem do usuário, 16 seções
**Audit baseline:** screenshots em `qa-screenshots/integrations-before/`

## Estado atual (~70% alinhado)

Página tem boa base estrutural mas com **BLOCKERS sérios**:

1. **WhatsApp como coluna de fonte** na matriz unified — brief item 7 proíbe explicitamente.
2. **"Enviar ✓" para WhatsApp** — brief proíbe ("não colocar Enviar ✓ para WhatsApp").
3. **WhatsApp status "Disponível"** — brief proíbe ("não usar Disponível como status principal do WhatsApp").
4. **Hero centralizado sem mockup** — brief item 6 pede 2-col com microdemo.
5. **Bug reveal global** (já corrigido: `.integ-reveal` agora coberto pelo `initReveal()`).

## Decisões padrão

- Reaproveitar `hero-scene` da homepage no hero (mesmo componente, mesmo CSS já carregado).
- 2 matrizes separadas no desktop, 3 accordions agrupados no mobile (Fontes / Ações / Roadmap).
- Manter copy boa que já existe; reescrever só o necessário.
- Reduced-motion + focus-visible globais já estão ativos via `allybi-base.css`.

## Fases

### Phase 1 — Hero 2-col com mockup à direita
- Layout grid (texto esquerda + mockup direita).
- Reaproveitar `hero-scene` (5 stages causal). Single-shot, freezes em s5.
- Trust chips: 5 do brief (Fontes permissionadas / Resposta com fonte / E-mail via Outlook / WhatsApp handoff / Nada sai sem confirmação).
- Microcopy: desktop ("Disponível agora: Outlook, OneDrive, SharePoint e uploads. WhatsApp é handoff, sem inbox conectado.") + mobile (concisa).
- Mobile: stack, primary full-width, secondary text link, mockup empilha.
- Eyebrow `Integrações`.

### Phase 2 — Refatoração das matrizes (BLOCKER)
- **Remover** matriz unified atual.
- **Matriz A — Fontes** (Uploads, Outlook, OneDrive, SharePoint): linhas "Usar no chat / Buscar conteúdo / Encontrar anexos / Mostrar fonte / Comparar versões / Status".
- **Matriz B — Ações depois da revisão** (E-mail via Outlook, WhatsApp handoff): linhas "Monta mensagem / Mostra arquivo e fonte / Usuário revisa antes / Ação final / Quem envia".
- **Mobile**: 3 accordions — "Fontes que entram no chat" / "Ações depois da revisão" / "Roadmap".
- Conteúdo das linhas conforme brief item 7 (texto, não só checkmarks).

### Phase 3 — Nova seção "Mapa visual"
- Posição: entre Hero e Fontes disponíveis.
- 3 colunas desktop (Entram no chat / Allybi organiza / Você revisa e decide).
- Mobile vertical (5 cards: Fontes entram / Allybi mostra fonte / Você revisa / Outlook pode sair / WhatsApp abre handoff).

### Phase 4 — Refinos de copy
- Hero sub travessão → ponto.
- `actions_sub` "preparar o próximo passo" → "leva mensagem, arquivo, fonte e canal para sua confirmação".
- `after_step4_title` "Mensagem pronta" → "Mensagem para revisão".
- `roadmap_h2` "Em breve" → "Próximas fontes" + sub com framing brief.
- Verificar todos os títulos contra termos banidos.

### Phase 5 — SEO/metadata
- title: "Integrações | Allybi"
- description: brief item 12.

### Phase 6 — Subagent reviews
- strategy-auditor + whatsapp-risk-reviewer (juntos, peso máximo no risco WhatsApp).
- pt-br-copy-editor + visual-director.
- accessibility-reviewer + product-truth-reviewer.

### Phase 7 — QA + delivery

## Out of scope

- Refatorar outras páginas.
- Mudar palette/logo.
- Backend.
- Mobile menu grouping (deferred, mesmo issue da how-it-works).
