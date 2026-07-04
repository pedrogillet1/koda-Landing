# Como Funciona Redesign Report

## 1. Resumo da nova arquitetura

A página /how-it-works.html foi reescrita por completo seguindo a especificação v8 (2026-06-19). A página agora segue **um único pedido** ("Você consegue me mandar a proposta aprovada antes da reunião?") em 6 capítulos sequenciais, cada um com uma cena visual distinta. A estrutura é:

1. Header global (preservado).
2. Hero "Pergunte, confirme e envie sem abrir tudo de novo." + faixa Pedido Recebido.
3. História principal com 6 capítulos (cada cena com layout próprio).
4. Seletor de atrito (6 radios reais + insight live).
5. CTA final escuro.
6. Footer global (preservado).

## 2. Arquivos alterados

- `how-it-works.html` — reescrita completa do `<main>`. Head, header, footer e mobile menu preservados.
- `pages/how-it-works.css` — reescrita completa.
- `HOW_IT_WORKS_PRE_AUDIT.md` — criado.
- `HOW_IT_WORKS_REDESIGN_REPORT.md` — este arquivo.

Nenhuma outra página foi alterada. Header e footer globais não foram tocados.

## 3. Componentes removidos

- Hero 2-col com `hero-scene` workspace à direita.
- `.hiw-story` storyboard com 6 painéis text/visual alternados (`.hiw-panel`).
- `.hiw-depth` diagrama "Entram / Allybi / Saem" com mini mock central e setas.
- `.hiw-bridge` ponte de diagnóstico (CTA proibido `/diagnostico.html`).
- Antigo `.hiw-cta`.
- Imports retirados desta página: `pages/home.css`, `hero-sequence.js`, `assets/inside-flow.js`.

## 4. Componentes criados

Todos prefixados `hw-` (página self-contained):

- `.hw-hero` + `.hw-request` (faixa Pedido Recebido).
- `.workflow-story-section` + `.hw-chapters` + `.hw-chapter` (estrutura única por página).
- 6 cenas com classes distintas: `.workflow-scene-sources`, `.workflow-scene-question`, `.workflow-scene-answer`, `.workflow-scene-compare`, `.workflow-scene-draft`, `.workflow-scene-review`.
- `.friction-selector-section` + `.hw-friction__panel` (fieldset + 6 radios reais).
- `.hw-final` CTA escuro.

## 5. Imports auditados

Imports usados pela página (após reescrita):

- CSS globais: `allybi-tokens.css`, `allybi-base.css`, `allybi-components.css`, `allybi-header.css`, `allybi-footer.css`, `allybi-responsive.css`.
- CSS específico: `pages/how-it-works.css`.
- JS globais: `language-switcher.js`, `allybi-header.js`.
- JS inline: scroll-reveal observer, friction radio handler, review confirmation handler.

Não importa CSS/JS específico das outras páginas (pricing, security, integrations, homepage, use-cases, diagnostico).

## 6. Prova de não-cópia

Verificado em `how-it-works.html` e `pages/how-it-works.css`:

- Nenhuma classe `pricing-*`, `security-*` (exceto comments globais), `integ-*`, `ucl-*`, `ucb-*`, `ucf-*`.
- Não usa `pages/home.css`.
- 6 cenas têm marcação e CSS **distintos** entre si (sources usa `<ul>`/grid 28/1fr/auto, question usa flex coluna em fundo preto, answer usa dois cards aninhados, compare usa duas panels + lista de diffs, draft usa `<dl>`, review usa grid 2-col interativo).
- A história não usa product frame único trocando 6 estados — todos os 6 capítulos estão simultaneamente no DOM.

## 7. Copy final (conforme spec)

Hero:
- Eyebrow: `COMO FUNCIONA`
- H1: `Pergunte, confirme e envie / sem abrir tudo de novo.`
- Sub: `Conecte Outlook, OneDrive, SharePoint e uploads. O Allybi encontra a informação, mostra a fonte, compara versões e leva tudo para revisão antes de enviar.`
- Channel: `E-mail via Outlook pode sair depois da sua confirmação. WhatsApp abre como handoff.`
- CTA1: `Começar grátis por 30 dias` → `https://app.allybi.com.br`
- CTA2: `Ver o fluxo completo` → `#fluxo-completo`
- Micro: `Sem demo obrigatória. Nada sai sem confirmação.`
- Pedido: `Você consegue me mandar a proposta aprovada antes da reunião?` · Outlook · há 2 min.

História:
- Eyebrow: `O CAMINHO COMPLETO`
- H2: `Um pedido. Seis momentos de controle.`
- Sub: `O mesmo pedido acompanha toda a página. Cada etapa mostra o que muda até o envio revisado.`

6 capítulos: títulos exatos da spec (01–06).

Seletor:
- Eyebrow: `DIAGNÓSTICO`
- H2: `Qual parte do caminho seu time mais repete?`
- Sub: `Escolha uma etapa. Depois, mapeie o fluxo completo em menos de 1 minuto.`
- CTA1: `Mapear fluxo do time` → `/diagnostico-questionario.html`
- CTA2: `Calcular meu tempo` → `/tempo-questionario.html`
- Trust: `Nenhum arquivo é pedido. Resultado na hora.`

Final CTA:
- Eyebrow: `COMEÇAR`
- H2: `Agora faça uma pergunta real.`
- Sub: spec literal.
- CTA1: `Começar grátis por 30 dias` → `https://app.allybi.com.br`
- CTA2: `Ver integrações` → `/integrations.html`
- Trust: `Sem demo obrigatória. Cancele quando quiser.`
- Control: `Nada sai sem confirmação. Documentos não treinam modelos.`

## 8. Links finais

Verificado:

- `https://app.allybi.com.br` (hero CTA1, final CTA1).
- `#fluxo-completo` (hero CTA2, scroll interno).
- `/diagnostico-questionario.html` (seletor CTA1).
- `/tempo-questionario.html` (seletor CTA2).
- `/integrations.html` (final CTA2).

Nenhum link aponta para `/diagnostico.html`, `/tempo.html`, `app.allybi.com.brm.br` ou `allybi.com.brm` (proibições da §41).

## 9–15. Screenshots e estados

Capturas em `./qa-screenshots/how-it-works-redesign/`:

- `hero-top.png` — hero com eyebrow, H1 dois spans, sub, CTAs, request strip.
- `chapter-03.png` — Capítulo 03 copy.
- `chapter-03-visual.png` — Capítulo 03 cena (answer + excerpt).
- `friction-selector.png` — Diagnóstico header.

Estados verificados via DOM query:

- Review pending state: `data-state="pending"`, status text "Aguardando sua confirmação".
- Review confirmed state (após click): `data-state="confirmed"`, status text "Revisão completa", confirm button display `none`.
- Friction default: "versao" checked, insight text "Arquivos parecidos exigem confirmação manual."
- Friction "envio" change: insight atualizou para "A revisão acontece em lugares diferentes."

## 16. Assertions

Executadas via DOM query no browser:

| Assertion | Resultado |
|---|---|
| 6 chapters in DOM | ✓ (count = 6) |
| All chapters share same parent (não usa product frame único) | ✓ |
| 1 H1 com 2 spans | ✓ |
| Nenhum `role="tablist"` | ✓ |
| Nenhum `position: sticky` | ✓ |
| Nenhum `contrato_final_AGORA.pdf` | ✓ |
| Nenhum `68/100` | ✓ |
| Nenhum `Maior gargalo` | ✓ |
| Nenhum `Entram`/`Saem` | ✓ |
| 6 radios no seletor | ✓ |
| Versão default selected | ✓ |
| Filenames sem ellipsis (usa `overflow-wrap: anywhere`) | ✓ |
| Capítulo 06 inicia em pending | ✓ |
| Click confirma localmente sem network | ✓ |

## 17. Grep result

Termos proibidos pesquisados em `how-it-works.html` e `pages/how-it-works.css`:

| Termo | Ocorrência |
|---|---|
| `Koda`, `Ask`, `Allybi Pro`, `Enviável`, `Enviar via WhatsApp`, `WhatsApp conectado`, `pesquisar no WhatsApp`, `Manual Search`, `X-Ray`, `Cemitério`, `Índice`, `modo cadê`, `Google humano`, `book demo`, `agendar demo`, `coming soon`, `beta`, `contrato_final_AGORA.pdf`, `68/100`, `Maior gargalo`, `fonte invisível`, `Entram`, `Saem`, `role="tablist"`, `position: sticky`, `setInterval`, `autoplay`, `carousel`, `swiper`, `slick`, `blue`, `purple`, `gradient` | **0 em copy/markup**. Únicas ocorrências de "tablist", "sticky", "autoplay", "gradient" estão em comentários CSS que listam o que **não** está sendo usado. |
| `—` (em-dash) | **0** após sanitização (substituídos por `:` em comentários). |

## 18–22. Build/lint/test

Projeto não tem build pipeline ou test runner configurado (HTML/CSS/JS estático). Verificação manual via browser.

## 23. Broken link check

Verificado manualmente: todos os hrefs apontam para páginas existentes ou âncoras internas (`#fluxo-completo`).

## 24. Reduced motion

Bloco `@media (prefers-reduced-motion: reduce)` no CSS força todas as transições/animações da página para 0.001ms e revela todos os `.hw-reveal` imediatamente. Radio selector e review confirmation continuam funcionais via teclado/click.

## 25. Diferenças desktop ↔ mobile

- Mobile: capítulos em coluna única (copy acima, visual abaixo). Cenas usam paddings reduzidos. Capítulo 04 (compare) mostra colunas empilhadas e diffs em grid 2-col com label "Agora" antes do novo valor. Capítulo 06 (review) empilha panel + actions.
- Desktop ≥1100: capítulos em grid 270px / 1fr. Cenas usam paddings maiores (22–24px) e os mocks ganham layout proprietário. Compare volta a duas colunas com seta horizontal. Review usa grid 2-col interativo.
- Tablet 768–1099: grid 230px / 1fr para capítulos, request strip vira faixa 3-col.

## 26. WhatsApp = handoff

Verificado: WhatsApp aparece exclusivamente no Capítulo 06 como "WhatsApp handoff" com descrição "Abre a conversa com a mensagem pronta. Você envia no WhatsApp." Capítulo 01 (fontes) **não inclui WhatsApp** — apenas Outlook, OneDrive, SharePoint e Uploads.

## 27. Sem autoplay

Verificado: `grep -i autoplay` retorna apenas a menção no comentário do CSS listando-o como proibido. Nenhum `setInterval`, `setTimeout` em loop, `requestAnimationFrame` para loop, ou `<video autoplay>` na página.

## 28. Nenhum envio real

A demo do Capítulo 06 é **puramente local**: o handler `data-review-confirm` faz apenas:
1. `scene.setAttribute('data-state', 'confirmed')` (troca estado visual).
2. `statusEl.textContent = 'Revisão completa'` (troca texto).
3. `statusEl.setAttribute('data-status', 'confirmed')` (troca cor de fundo via CSS).
4. `btn.style.display = 'none'` (esconde botão).

Nenhum `fetch`, `XMLHttpRequest`, `window.open`, `location.href`, ou abertura de app externo.

## 29. Problemas restantes

- Screenshots foram capturados em viewport 584px (browser estava redimensionado nesta sessão). Layout desktop ≥1100px foi verificado via CSS + DOM query, mas não com screenshot final em 1366/1440/1920. Recomendado validar visualmente nesses tamanhos na próxima sessão.
- Telemetria/i18n: a página perdeu os `data-i18n-key` específicos do conteúdo da história (mantidos apenas em header/footer/CTAs globais). Se a página precisar de PT/EN/ES via JSON, será necessário adicionar `data-i18n-key` em cada texto novo e criar as entradas em `translations/pt.json` / `en.json` / `es.json`.
