# Design spec — Homepage refactor

**Data:** 2026-06-16
**Brief de referência:** mensagem do usuário (17 seções, item 0–17)
**Auditoria base:** `2026-06-16-homepage-audit.md`
**Abordagem:** Refatoração focada (não rebuild) com 6 frentes + animações causais em seções-chave.
**Idiomas:** PT-BR (primário) e EN (secundário, via JSON existente).
**Stack:** HTML estático + CSS modular + JS vanilla. Sem framework. I18n via `data-i18n-key` + `translations/{pt,en}.json`.

---

## 1. Princípios de decisão

1. **Aproveitar > reescrever.** A estrutura HTML, o design system, o sistema de i18n e a voz da copy estão alinhados. Não tocamos no que está bom.
2. **Causal > decorativo.** Toda animação adicionada precisa explicar uma mudança no produto. Sem fade-in genérico novo.
3. **Mobile-first real.** Cada seção tem layout mobile próprio, não desktop comprimido. CTAs sticky onde já existem se mantêm.
4. **Cor é informação.** Verde = fonte confirmada / pode prosseguir. Amarelo = incerteza. Vermelho = não envia. Sem cor sem significado.
5. **PT é fonte da verdade.** Copy mudou? Atualiza pt.json e en.json juntos. PT inalterado para os deltas dessa fase.

## 2. Nova ordem das seções

| # | Seção | Status | Mudança |
|---|-------|--------|---------|
| 1 | Header | ✅ | nenhuma |
| 2 | Hero | refinar | H1 desktop, mockup expandido com fluxo completo, eyebrow mais curto |
| 3 | Trust strip | ✅ | nenhuma (apenas verificar se chips estão alinhados com brief) |
| 4 | **Pain** "Achar não basta" | refinar | card 2 semáforo verde, card 3 confirmar |
| 5 | **Tools (Diagnósticos)** ⬆️ | **mover pra cá** | + microcopy "Resultado na hora. Sem cadastro." + mini visual de fluxo |
| 6 | Workflow "Do pedido ao envio" | refinar | Card 5 "Envio" garantido, copy "linguagem normal" reescrita, animação causal |
| 7 | Integrações | refinar | + separador "Depois da revisão" + cards de saída (Email via Outlook, WhatsApp handoff). Gmail/Drive sai da home. |
| 8 | Casos de uso | refinar | trocar `—` por `·` em nomes de arquivo |
| 9 | Segurança | refinar | + pilares "Fonte visível", "Confirmação antes do envio", "WhatsApp sem caixa sincronizada" |
| 10 | **Pricing teaser** ✨ | **nova seção** | R$170/mês, lista de inclusos, CTA |
| 11 | FAQ | refinar | + "Meus documentos treinam modelos?" + "Quais fontes posso conectar?" |
| 12 | CTA final | refinar | CTA secundário → "Calcular tempo perdido" (loop com Diagnósticos) |
| 13 | Footer | ✅ | apenas grep de termos banidos |

Seções existentes na home atual mas **redundantes ou fracas** que avaliarei remover: `pillars`, `steps`, `action`. Decisão: **manter por enquanto, marcar pra avaliação no review final** — remover seção é mudança de UX maior que merece teste A/B real, não decisão unilateral.

## 3. Hero — design detalhado

### Desktop (≥768px)

**Esquerda (col 50%):**
- Eyebrow encurtado: ~~"CHAT COM FONTE PARA DOCUMENTOS, E-MAILS E ENVIOS"~~ → "CHAT PARA DOCUMENTOS E ENVIOS" (1 linha em todos breakpoints).
- H1: mantido "Um chat para encontrar, confirmar e enviar o documento certo." — adicionar regra CSS `text-wrap: balance` + `font-size: clamp(40px, 4.5vw, 64px)` pra quebra mais natural.
- Sub: mantido.
- CTAs: mantidos.
- Microcopy preço: mantido.
- Trust chips: mantidos, 1 linha em desktop.

**Direita (col 50%):** **MOCKUP EXPANDIDO** — esse é o trabalho real.

```
┌─────────────────────────────────────┐
│ [Outlook] [OneDrive] [SharePoint] [Uploads]  ← source pills
├─────────────────────────────────────┤
│ 🔍  qual versão posso enviar?       │ ← pergunta digitada
│     ────────────────────────────    │
│ ⏳ 3 versões encontradas             │ ← estado de busca
│                                      │
│ ◯ contrato_final.pdf                 │
│   ⚠ versão anterior                  │ ← cinza/risco
│ ◯ contrato_final_v3.pdf              │
│   ⚠ fonte incerta                    │ ← amarelo
│ ● contrato_final_AGORA.pdf  ✓        │ ← VERDE selecionado
│   Fonte: SharePoint / Clientes /     │
│   Contratos / 14 mar                 │
│   Última alteração: 14 mar, 18:42    │
│ ─────────────────────────────────── │
│ Painel de revisão                    │
│   Destinatário · cliente@empresa.com │
│   Arquivo · contrato_final_AGORA.pdf │
│   Fonte · SharePoint                 │
│   Canal · Email via Outlook          │
│ ─────────────────────────────────── │
│   [ Enviar via Outlook ]   chip:     │
│                          WhatsApp ↗  │
└─────────────────────────────────────┘
```

**Animação causal (5 atos, autoplay ao entrar na viewport, total ~4s, looping com 6s de pausa):**
1. (0–600ms) Source pills aparecem em cascata.
2. (600–1200ms) Pergunta é "digitada" no campo (text reveal char-by-char ou faded-in palavra-a-palavra).
3. (1200–2000ms) Estado de busca "⏳ 3 versões encontradas" pisca; 3 versões aparecem em sequência. v1 cinza, v2 amarela.
4. (2000–2800ms) v3 verde acende com check ✓ e a linha "Fonte:" expande.
5. (2800–3600ms) Painel de revisão desliza de baixo; botão "Enviar via Outlook" ativa de cinza pra preto.
6. (3600ms) Pausa de 6s. Loop.

**Respeitar `prefers-reduced-motion: reduce`** → exibir o estado final estaticamente.

### Mobile (<768px)

Mockup vira **carrossel de 3 mini cards** (auto-scroll horizontal ou stacks), conforme brief item 7.2:

1. Card 1: Pergunta no chat. Source pills no topo + pergunta digitada.
2. Card 2: Resposta com fonte. `contrato_final_AGORA.pdf` em verde com fonte expandida.
3. Card 3: Revisão + Enviar via Outlook. Painel + botão.

**Animação mobile:** cada card tem sua mini-animação ao entrar (sem auto-scroll forçado). Tap pra avançar manualmente.

## 4. Pain — refinamento

**Card 2 (Parecido):** semáforo correto.
- v1 `contrato_final.pdf` → cinza, label "versão anterior"
- v2 `contrato_final_v3.pdf` → amarelo, label "fonte incerta"
- v3 `contrato_final_AGORA.pdf` → **verde**, check ✓, label "fonte confirmada"

**Card 3 (Antes de sair):** verificar HTML. Brief pede painel de revisão com Destinatário / Arquivo / Fonte / Mensagem / Canal. Garantir os 5 campos.

**Animação causal (Pain):**
- Card 2: ao entrar viewport, v2 começa amarelo → após 800ms, v3 acende verde com check. Conta a história "passei da incerteza pra confirmação".

## 5. Tools (Diagnósticos) — refinamento + mudança de posição

**Posição nova:** logo após Pain (mais alto na página).

**Title:** "Antes de testar, meça o que está custando tempo." (mantido)

**Sub:** "Duas ferramentas rápidas. Uma mostra seu tempo perdido. A outra mostra onde o fluxo do time trava." (mantido)

**Adicionar microcopy** abaixo do sub: "Resultado na hora. Sem cadastro para ver o resultado."

**Mini visual em cada card:**

- Calculadora do Tempo Perdido → mini barra horizontal segmentada:
  ```
  ▓▓▓▓░░░░░░░░░░░░░░░░  Procurar
  ▓▓▓▓▓░░░░░░░░░░░░░░░  Confirmar versão
  ▓▓▓░░░░░░░░░░░░░░░░░  Achar fonte
  ▓▓░░░░░░░░░░░░░░░░░░  Preparar envio
  ```
  Com microcopy: "Exemplo. Calcule o seu."

- Diagnóstico do Fluxo → mini mapa horizontal:
  ```
  Pedido → Busca → Versão → Fonte → Confirmação → Envio
                    [ponto vermelho onde trava]
  ```

**Animação:** barras enchem em sequência ao entrar viewport (Calculadora). Mapa: nós acendem em sequência (Diagnóstico).

## 6. Workflow — refinamento

**Confirmar Card 5 "Envio"** existe e tem:
- Title: "Envio"
- Body: "E-mail via Outlook com confirmação · WhatsApp handoff com mensagem pronta"

**Reescrever copy crítica:**
- Card "Pergunta no chat / linguagem normal" → "Pergunta no chat" + subtítulo "Em linguagem normal. Sem comando técnico."

**Animação causal (Workflow):**
- Em desktop, fluxo horizontal: pedido aparece à esquerda, pergunta entra, resposta aparece (chips amarelo), v3 fica verde, painel desliza, botão acende. Sequência completa ao scroll-into-view.
- Em mobile, fluxo vertical com cards revelados em cascata (cada card faz seu mini-acto ao entrar viewport).

## 7. Integrações — adicionar bloco de saída

Estrutura nova:

```
[ Title: Suas fontes e seus envios no mesmo fluxo. ]
[ Sub ]

▼ DISPONÍVEL AGORA
[ Outlook ] [ OneDrive ] [ SharePoint ] [ Uploads ]

──── Depois da revisão ────  ← separador novo

[ Email via Outlook ]   [ WhatsApp handoff ]
Enviado pelo Allybi    Allybi abre o WhatsApp
após confirmação.      com a mensagem pronta.
                       Você envia no WhatsApp.
                       (não lê nem pesquisa)
```

**Gmail / Google Drive:** **remover da homepage**. Promover para página `/integrations.html`. Se houver pedido futuro pra mostrar "em breve", criar bloco discreto no fim da seção.

## 8. Casos de uso — refinamento cirúrgico

Trocar `—` por `·` em todos os nomes de arquivo:
- ~~Contrato_Anderson_v4.pdf — p. 8~~ → `Contrato_Anderson_v4.pdf · p. 8`
- ~~Deck_Conselho_Q4.pdf — slide 7~~ → `Deck_Conselho_Q4.pdf · slide 7`
- ~~Escopo_Cliente_Alfa_v2.docx — p. 3~~ → `Escopo_Cliente_Alfa_v2.docx · p. 3`

## 9. Segurança — completar pilares

Pilares na ordem do brief:

1. **Documentos não treinam modelos** (mantido)
2. **Permissões por fonte** (mantido como "Permissões de integração")
3. **Fonte visível** ← novo. Copy: "Cada resposta mostra de onde veio."
4. **Confirmação antes do envio** ← novo. Copy: "Você revisa conteúdo, arquivo, fonte, destinatário e canal."
5. **WhatsApp sem caixa sincronizada** ← novo. Copy: "WhatsApp é handoff. O Allybi não lê nem pesquisa sua caixa."
6. **Criptografia** (mantido, "Dados protegidos em trânsito e em repouso." — só se for verdadeiro)
7. **Workspaces isolados** (mantido)

CTA: "Ver segurança" → `security-overview.html`.

## 10. Pricing teaser — seção nova

Posição: entre Segurança e FAQ (item 9 do brief).

```
[ Title: 30 dias grátis. Depois R$170/mês. ]
[ Sub: Um plano para encontrar, confirmar e enviar o documento certo. ]

┌──────────────────────────────────┐
│  Allybi Pro                      │
│  R$170/mês depois do teste       │
│                                   │
│  Inclui:                          │
│   ✓ Outlook                       │
│   ✓ OneDrive                      │
│   ✓ SharePoint                    │
│   ✓ Uploads                       │
│   ✓ Resposta com fonte            │
│   ✓ Comparação de versões         │
│   ✓ E-mail via Outlook            │
│     com confirmação               │
│   ✓ WhatsApp handoff              │
│   ✓ Documentos não treinam        │
│     modelos                       │
│   ✓ Nada sai sem revisão          │
│                                   │
│  [ Começar grátis por 30 dias ]   │
│  Cancele quando quiser.           │
└──────────────────────────────────┘
```

CSS reaproveita tokens do `pricing.css` existente. Visual minimal, sem chips coloridos, sem badge "popular".

## 11. FAQ — adicionar 2 perguntas

**Pergunta 7 (nova):** "Meus documentos treinam modelos?"
**Resposta:** "Não. Documentos, perguntas e respostas não são usados para treinar modelos."

**Pergunta 8 (nova):** "Quais fontes posso conectar?"
**Resposta:** "Hoje: Outlook, OneDrive, SharePoint e uploads de arquivos. Gmail e Google Drive entram em seguida."

## 12. CTA final — refinamento

**Title:** Trocar "Conecte. Pergunte. Envie com confirmação." pelo brief: **"Teste o caminho real."**

(Atual está forte mas brief item 7.11 é explícito sobre esse título.)

**Sub:** Mantido — "Conecte uma fonte ou suba um arquivo. Pergunte no chat, veja a fonte e revise antes de enviar."

**CTA primário:** Mantido — "Começar grátis por 30 dias".

**CTA secundário:** **Trocar "Falar com vendas" por "Calcular tempo perdido"** → cria loop com a seção Tools.

**Microcopy:** Adicionar "30 dias grátis. Nada sai sem confirmação."

## 13. Animações — princípios

**Quando animar:**
- Mudança de estado no produto (pergunta → resposta, incerto → confirmado, rascunho → revisado).
- Aparição de informação que conta parte da história (versões na sequência).

**Quando NÃO animar:**
- Cards do menu, footer, header.
- Texto puro sem mudança de estado.
- Transições entre páginas (deixa nativo).

**Durações:**
- Microinterações (hover, focus): 150–250ms.
- Reveals seção: 400–600ms.
- Sequência causal do hero: máximo 4s antes do loop.

**Easing:** `cubic-bezier(0.2, 0.8, 0.2, 1)` (out-cubic suave) como padrão.

**Reduced motion:** todas as animações causais respondem a `@media (prefers-reduced-motion: reduce)` mostrando o **estado final** estático.

**Performance:** apenas `transform` e `opacity` (composited). Sem animar `width`, `height`, `top`, `left`.

## 14. SEO/metadata (item 13 do brief)

Atualizar `index.html` `<head>`:

- `<title>Allybi | Encontre, confirme e envie o documento certo</title>`
- `<meta name="description" content="Conecte Outlook, OneDrive, SharePoint e uploads. Pergunte no chat, veja a fonte da resposta e envie e-mails via Outlook com confirmação. WhatsApp abre como handoff.">`
- Open Graph idem.
- Verificar e remover qualquer "book demo", "Koda", "Ask" em metadata.

## 15. Acessibilidade (item 14 do brief)

Auditar e ajustar:
- Botões com `aria-label` quando só ícone.
- Focus states visíveis (`:focus-visible` outline).
- Targets táteis mínimo 44px no mobile.
- Cor não é único sinal de estado (sempre tem ícone ou texto).
- `aria-expanded` no menu mobile + FAQ.
- `prefers-reduced-motion` para todas animações causais.

## 16. QA (item 15 do brief)

Pós-implementação:
1. Re-rodar Playwright em 8 breakpoints, salvar em `qa-screenshots/homepage-redesign/`.
2. Grep dos termos banidos do brief item 4 + item 15 — devem retornar zero matches no `index.html`, `translations/pt.json`, `translations/en.json`.
3. Validar JSON `pt.json` e `en.json` (chaves paridas).
4. Console errors = 0 em todos viewports.
5. Manual: testar fluxo no Outlook real? **Fora de escopo da landing**.

## 17. Sub-agentes (brief item 11)

Dispatched no review pré-merge:

- `strategy-auditor`: verifica caminho completo (pedido → envio).
- `pt-br-copy-editor`: caça AI-like, travessões e termos banidos no diff.
- `visual-director`: avalia mockups e cards.
- `mobile-ux-reviewer`: revisa cada viewport mobile.
- `animation-reviewer`: confirma causalidade.
- `security-product-copy-reviewer`: WhatsApp não é fonte, sem overclaim.
- `qa-playwright-agent`: roda screenshots finais.
- `code-review-agent`: revisão de código (a11y, performance, sem código morto).

Implementação: cada subagente é uma chamada Agent tool com prompt focado.

## 18. Risco e rollback

- **Backup:** `git stash` antes de cada fase principal + commits pequenos e nomeados.
- **Rollback fácil:** `git revert <hash>` por fase.
- **i18n:** PT como fonte. Antes de qualquer copy mudar, atualizar `pt.json` e `en.json` juntos. JSON é validado por script.
- **Não tocar:** `pricing.html`, `how-it-works.html`, `integrations.html`, `security-overview.html`, etc. — só o `index.html` + CSS/JS dedicado.

## 19. Out of scope (explícito)

- Mudar páginas internas além de `index.html`.
- Mudar plano de preço, posicionamento de produto, marca, logo, paleta.
- Mudar i18n architecture (sistema atual fica como está).
- Mudar `server.js` ou backend.
- Testes E2E completos do fluxo do produto real.
- A/B testing setup (decisão futura).
