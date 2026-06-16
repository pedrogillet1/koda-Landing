# Design spec — /how-it-works.html refactor

**Data:** 2026-06-16
**Branch:** `how-it-works-refactor` (forked from `homepage-refactor`).
**Brief de referência:** mensagem do usuário (item 0–14).
**Auditoria base:** `2026-06-16-how-it-works-audit.md`.
**Abordagem:** refatoração focada (não rebuild). 5 frentes + reduced-motion universal.

## Decisões padrão (não confirmadas mas seguindo recomendações)

1. **Layout 6 passos:** Opção B — grid de 6 cards alternando left/right (atual). Não usar sticky scrolljacking. Cards animam ao entrar viewport.
2. **Reduced-motion:** universal completo em `allybi-base.css` (afeta toda a stack).

## 1. Princípios

1. **Aproveitar > reescrever.** Estrutura e copy dos panels já alinhados; refinar.
2. **Fix do bug é prioridade zero.** Reveal não pode deixar 80% da página invisível.
3. **Hero precisa cumprir o brief.** Mockup à direita é obrigatório.
4. **Causal > decorativo.** Animação só onde explica mudança.
5. **Mobile não é desktop comprimido.** Cada seção tem layout próprio mobile.
6. **PT é fonte da verdade.** Updates de copy = atualizar pt.json E en.json juntos.

## 2. Nova estrutura da página

| # | Seção | Status | Mudança |
|---|-------|--------|---------|
| 1 | Header | ✅ | nenhuma |
| 2 | Hero | refazer | adicionar mockup à direita (reaproveitar `hero-scene` da homepage); ajustar trust chips para 4 |
| 3 | Storyboard (6 panels) | refinar | semáforo correto no panel 04; "Preparar WhatsApp" → "Abrir handoff"; copy panel 05 + 06 alinhar com brief |
| 4 | Depth section | refinar | título "Uma pergunta no chat. Um fluxo completo por trás."; copy alinhada com brief; layout mobile vertical garantido |
| 5 | **Ponte para diagnóstico** ✨ | **nova seção** | entre depth e CTA final, links para `tempo.html` e `diagnostico.html` |
| 6 | CTA final | ✅ | título OK, garantir CTAs |
| 7 | Footer | ✅ | nenhuma |

## 3. Fix do bug de reveal (prioridade 0)

**Causa:** `pages/how-it-works.css` define `.hiw-reveal { opacity:0 }` mas nenhum JS adiciona `.is-visible`.

**Fix:** estender `initReveal()` em `allybi-animations.js` para cobrir ambos `.allybi-reveal` e `.hiw-reveal`. Adicionar fallback de 1.5s pra ambos (já existe pra `.allybi-reveal`).

Alternativa rejeitada: substituir `.hiw-reveal` por `.allybi-reveal` no HTML — quebraria a divisão CSS que isola o sistema de animação da how-it-works. Manter `.hiw-reveal` semanticamente.

## 4. Hero — design detalhado

### Desktop (≥768px)

**Esquerda (col 52fr):**
- Eyebrow: "Como funciona" (mantém o key `hiw.hero_eyebrow` mas mudar valor de "Produto" para "Como funciona" — alinha com brief item 4).
- H1: mantido "Pergunte, confirme e envie sem abrir tudo de novo." (`hiw.hero_h1`).
- Sub: mantido (`hiw.hero_support`).
- CTAs: primário "Começar grátis por 30 dias" + secundário "Ver integrações" — ambos já presentes.
- Microcopy de preço: "30 dias grátis. Nada sai sem confirmação." (atualizar; atual menciona R$170/mês — manter no preço _line_).
- Trust chips: **4 chips** — "Resposta com fonte / E-mail via Outlook / WhatsApp handoff / Documentos não treinam modelos".

**Direita (col 48fr):** Mockup reaproveitando o componente `hero-scene` da homepage.
- Mesma estrutura visual: source pills → query → 3 versões com semáforo → fonte → review panel → send button.
- Reaproveitar `hero-sequence.js` + CSS — basta dar ao `<div class="hero-scene">` o id `heroScene` ou criar um id próprio.

### Mobile (<768px)

- Mockup empilha abaixo do texto.
- Texto: eyebrow / H1 / sub / CTAs (primary full-width + secondary text link below) / microcopy / 4 trust chips.
- Mockup: mesmo cenário responsivo (já tem media query no `pages/home.css` para ≤600px).

## 5. Storyboard — refinos

### Panel 01 — Conecte ou adicione arquivos (alteração mínima)
- Atual já alinhado com brief. Pequena mudança: "Conecte Outlook, OneDrive e SharePoint. Ou suba arquivos e pastas para usar no chat." → "Use Outlook, OneDrive, SharePoint e uploads no mesmo chat." (mais direto).
- Visual mock: já tem chips de arquivo + status. Adicionar "3 arquivos encontrados no OneDrive" se ainda não tem (já tem `panel1_mock_success`).

### Panel 02 — Pergunte no chat
- **Chip 04 trocar**: `Preparar WhatsApp` → **`Abrir handoff`** (brief item 4 etapa 02 + item 3 termos banidos).
- Demais chips: "Comparar versões / Encontrar fonte / Preparar e-mail" — brief sugere "Preparar revisão" em vez de "Preparar e-mail". **Decisão**: manter "Preparar e-mail" (mais específico para Outlook) — brief sugere mas não bane.

### Panel 03 — Receba com fonte
- Visual mock: badge "Resposta com fonte" + arquivo + fonte path. Adicionar pequeno status "Fonte confirmada" verde se ainda não tem.
- Cor verde só onde fonte/status confirmado (regra do brief).

### Panel 04 — Compare e confirme
- Atual já mostra a cláusula 8.1 com diff vermelho/amarelo (R$1M → R$3M). Garantir:
  - Texto removido em vermelho com tachado (já tem)
  - Texto novo em verde (atual está amarelo) — **trocar amarelo por verde**
  - Adicionar status "Alteração confirmada na fonte" abaixo

### Panel 05 — Monte a mensagem para revisão
- Reescrever copy e mock pra alinhar com brief: mostrar painel com Mensagem (preview), Arquivo, Fonte, Canal "Outlook" + alternativa "WhatsApp handoff".
- Microcopy: "Para WhatsApp, o Allybi abre a conversa com a mensagem pronta. Você envia no WhatsApp."

### Panel 06 — Revise e envie
- Visual mock: já tem campos Para/Arquivo/Fonte/Via Outlook + botões Cancelar/Enviar via Outlook.
- Garantir as cores semânticas (botão preto, cancelar cinza).

## 6. Depth section

- Título atual: "Por fora, uma pergunta. Por baixo, o fluxo inteiro." → mudar para **"Uma pergunta no chat. Um fluxo completo por trás."** (brief).
- Sub: alinhar com "O Allybi não pula a revisão. Ele leva fonte, versão, mensagem e canal para sua confirmação."
- 3 zonas (Entram / Allybi / Saem) mantidas com pequenos ajustes de copy.
- **Mobile** = sequência vertical (5 cards): "Fontes entram" → "Allybi organiza" → "Você revisa" → "Outlook sai com confirmação" → "WhatsApp abre como handoff".
  - Atual mobile provavelmente repete layout 3 colunas comprimido. Reescrever com `@media (max-width: 768px)`.

## 7. Ponte para diagnóstico (nova seção)

Posição: entre depth e CTA final.

Estrutura:
```
[ Title: Quer ver onde seu fluxo trava hoje? ]
[ Sub: Mapeie em menos de 1 minuto onde o time perde certeza
        entre pedido, busca, versão, fonte, confirmação e envio. ]

[ CTA primário: Mapear fluxo do time ]  →  diagnostico.html
[ Link secundário: Calcular meu tempo ]  →  tempo.html

[ Microcopy: Nenhum documento é pedido. Resultado na hora. ]
```

Visual minimal: container limpo, texto centralizado, sem mockup. Reaproveitar estilo do CTA final mas com background bg-alt-1.

## 8. CTA final — verificação

- Título "Faça o primeiro fluxo completo em minutos." ✓
- Sub "Conecte uma fonte ou suba um arquivo. Pergunte no chat, receba com fonte e revise antes de enviar." ✓
- CTAs: primário "Começar grátis por 30 dias" + secundário "Ver integrações" ✓
- Adicionar microcopy: "30 dias grátis. Nada sai sem confirmação." (brief)

## 9. Animações causais

3 panels-chave recebem reveal sutil ao entrar viewport (escala micro):
- Panel 02: chips de ação aparecem em cascata.
- Panel 03: badge "Resposta com fonte" e arquivo aparecem, fonte path entra logo depois.
- Panel 06: campos do review aparecem em sequência, botão "Enviar via Outlook" ativa por último.

Demais panels: só `hiw-reveal` (entrada simples opacity+translateY).

**Reduced-motion**: tudo congela em estado final.

## 10. Reduced-motion universal (escopo expandido)

Adicionar em `allybi-base.css`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

Por que `allybi-base.css`: é importado por **toda página** (home, how-it-works, integrations, security, pricing, tools, etc). Uma alteração propaga universalmente.

Risco: pode interferir com micro-animações sutis (counters, sticky), mas isso é exatamente o ponto — `prefers-reduced-motion: reduce` significa "desliga tudo".

## 11. SEO/metadata

Atualizar `<head>`:
- `<title>Como funciona | Allybi</title>`
- `<meta name="description" content="Conecte Outlook, OneDrive, SharePoint e uploads. Pergunte no chat, veja a fonte da resposta e revise antes de enviar. E-mail via Outlook sai com confirmação. WhatsApp abre como handoff.">`
- OG title/description alinhados.

## 12. Acessibilidade

- Alt text funcional em SVGs decorativos (`aria-hidden="true"`).
- Focus visível nos CTAs.
- Targets táteis ≥44px no mobile.
- aria-expanded no menu mobile (já existe via global).
- `prefers-reduced-motion` global.
- Cor não é único sinal de estado (badges sempre tem ícone OU label).

## 13. QA

- Re-rodar `audit-hiw.mjs` → `qa-screenshots/how-it-works-redesign/`.
- Grep dos termos banidos do brief item 3 + 12 — esperado: zero.
- JSON parity hiw.* (en vs pt).
- Verificar reduced-motion: rodar Playwright com `reducedMotion: 'reduce'` e checar estado final.

## 14. Subagent reviews (item 9 do brief)

8 reviews adversariais dispatched no review pré-merge:
- strategy-auditor
- pt-br-copy-editor
- visual-director
- motion-director
- mobile-ux-reviewer
- accessibility-reviewer
- qa-playwright-agent
- code-review-agent

## 15. Risco e rollback

- Branch isolada: `how-it-works-refactor`.
- Commits pequenos por fase.
- `git revert` por fase se algo regredir.
- Backup do estado atual em `qa-screenshots/how-it-works-before/`.

## 16. Out of scope

- Refazer outras páginas (home/integrations/etc).
- Mudar sistema i18n.
- Mudar palette/logo/marca.
- Backend.
- Testes E2E do produto real (apenas visual da landing).
