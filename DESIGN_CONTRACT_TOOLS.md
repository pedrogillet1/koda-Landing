# DESIGN_CONTRACT_TOOLS.md

**Scope:** /tempo.html, /tempo-questionario.html, /tempo-resultado.html, /diagnostico.html, /diagnostico-questionario.html, /diagnostico-resultado.html, /metodologia.html
**Date:** 2026-06-16
**Brief:** v4 — "contrato total de percepção, mobile e micro-UX"

Each element is documented before any code change. Format per the brief: **Elemento · Objetivo psicológico · Objetivo funcional · Decisão visual · Medida exata · Estado mobile · Animação · Critério de aceite**.

---

## 0. Shared design system (used by all 7 pages)

| Token | Value | Used for |
|---|---|---|
| `--c-primary` | `#181818` | CTA, decisão, ativo, foco, número principal |
| `--c-white` | `#FFFFFF` | superfície principal |
| `--c-gray-100` | `#F5F5F5` | área secundária, track, hover sutil |
| `--c-gray-border` | `#E6E6EC` | borda neutra, divider, inativo |
| `--c-gray-500` | `#6C6B6E` | microcopy, metadado |
| `--c-gray-600` | `#55534E` | body secundário |
| `--c-gray-900` | `#32302C` | body principal escuro |
| `--c-success` | `#34A853` | fonte encontrada, confirmado |
| `--c-warning` | `#FBBC04` | gargalo, versão incerta |
| `--c-danger` | `#D92D20` | erro real, campo inválido |
| `--r-btn` | `999px` | botões, badges |
| `--r-option` | `16px` | options |
| `--r-input` | `14px` | inputs |
| `--r-card-main` | `24px` (desktop) / `20px` (mobile) | cards principais |
| `--r-card-inner` | `16px` | cards internos |
| `--shadow-main` | `0 20px 60px rgba(24,24,24,0.08)` | card principal |
| `--shadow-hover` | `0 10px 24px rgba(24,24,24,0.12)` | hover desktop |
| `--border-neutral` | `1px solid #E6E6EC` | tudo neutro |
| `--border-active` | `2px solid #181818` | selected, focused, ativo |

**Typography (Plus Jakarta Sans):**
- Landing H1 desktop: 56-64px / 1.03 / -0.04em / 800
- Landing H1 mobile: 34-40px / 1.08 / -0.035em / 800
- Question H1 desktop: 44-52px / 1.08 / -0.035em / 800
- Question H1 mobile: 30-36px / 1.1 / -0.03em / 800
- Body desktop: 18px / 28px; mobile: 16px / 24px
- Label: 14px / 20px / 600
- Microcopy: 13px / 18px / 400 (#6C6B6E)
- Eyebrow: 12px / 18px / 700 / uppercase / 0.12em / #6C6B6E

**Numbers:** PT-BR vírgula decimal (e.g. `3,1 h/mês`).

---

## 1. /tempo.html — Calculadora landing

| Elemento | Objetivo psicológico | Objetivo funcional | Decisão visual | Medida exata | Estado mobile | Animação | Critério de aceite |
|---|---|---|---|---|---|---|---|
| Eyebrow `CALCULADORA INDIVIDUAL` | sinalizar escopo pessoal | classificar a página | uppercase chip neutro | 12px/700/0.12em #6C6B6E | mantém tamanho | none | visível acima do H1 em todos viewports |
| H1 `Quanto tempo some antes do arquivo sair certo?` | provocar curiosidade individual | enquadrar a tese | balance, max 3 linhas desktop | 56-64px desktop / 36-40px mobile | quebra ≤4 linhas em 360 | reveal fade-up 220ms | mobile 360 não quebra em 5+ linhas |
| Sub | reduzir fricção mental | explicar a estimativa | max-width 520px | 17px/28 #55534E | 16px/24 | reveal +60ms delay | legível sem zoom em 360 |
| CTA primário `Calcular meu tempo` | gerar ação imediata | rota para questionário | preto pill | h:56 desktop / 52 mobile, full-width mobile | full-width 100% | hover -1px translateY | clicar leva a /tempo-questionario.html |
| CTA secundário `Ver metodologia` | reduzir desconfiança | exit alternativo | ghost link | 14px #6C6B6E | abaixo do primário, link 44px target | none | clicar leva a metodologia.html |
| Hero microcopy `5 perguntas · nenhum arquivo é pedido · resultado na hora` | tranquilizar | explicitar o pacto | 13px #6C6B6E | 13px | 12px | reveal +120ms | sempre visível abaixo do CTA |
| ExampleResultCard | mostrar recompensa esperada | preview do destino | card branco com sombra | 520×auto, padding 32px, radius 24px | width 100%, padding 22px, radius 20px | bars fill 700ms (once on viewport) | número `14 h/mês` lido sem zoom em 360 |
| ExampleResultCard.label `EXEMPLO DE RESULTADO` | enquadrar como demo | desambiguar do real | eyebrow neutro | 11px/700/0.06em #6C6B6E | 11px | none | visível no topo do card |
| ExampleResultCard.number `14 h/mês` | impacto numérico | ancorar a magnitude | tnum 800 | 64px desktop / 48px mobile / 1 line-height / -0.04em | 48px | fade-in once 400ms | nunca quebra linha |
| ExampleResultCard.subtitle `quase 2 dias úteis` | converter horas em dias | reforçar custo | metadado | 13px #6C6B6E | 12px | none | abaixo do número |
| Breakdown rows (Procurar, Confirmar versão, Achar fonte, Preparar envio) | mostrar onde o tempo se reparte | educar antes do clique | linha + valor + barrinha | row 36px, label 13px, value 14px tnum, bar 7px h | 30px row, bar 6px | bars fill 700ms staggered | maior bar tem marcador amarelo no final |
| Badge `Maior gargalo: confirmar versão` | apontar diagnóstico | criar curiosidade especifíca | pill amarelo claro | radius 999px, bg rgba(251,188,4,0.18), border #FBBC04 | mesma escala | reveal +400ms | sempre visível no rodapé do card |
| Section 2: O que mede (4 cards) | educar sem auditar | reduzir fricção do quiz | 4 cards 1×4 desktop / 1col mobile com mini-visual | card 260×auto, padding 24, radius 24 | h auto, visual primeiro | reveal stagger | cada card mostra um mecanismo (não ícone genérico) |
| Section 3: Por que o tempo some — checklist | revelar a tese central | conectar etapas | card central com 5 itens, dots amarelos | card 720, padding 36, radius 24 | width 100%, padding 24 | reveal | última linha tem check verde (Allybi reduz) |
| Section 4: Você recebe mais que número (3 cards) | promessa específica | provar valor antes do quiz | 3 cards com value+label+frase | 1×3 desktop / 1col mobile | 1col | reveal | nenhum card vazio, cada um carrega uma claim |
| Section 5: Allybi bridge | converter para produto | conectar dor → solução | 3 rows "antes → depois" | rows com seta entre | empilha vertical | reveal | última linha cita Outlook+confirmação e WhatsApp handoff |
| CTA final `Calcular meu tempo` | recapturar intenção | última chance pré-quiz | botão preto centralizado | h:56 / 32 padding-x | full-width 320 max | hover -1px | foco visível AA |
| Footer global | navegação consistente | exit seguro | reuso do footer site | inherit | inherit | none | bate com other pages, footer.methodology = "Metodologia" |

---

## 2. /tempo-questionario.html — Calculadora questionário

| Elemento | Objetivo psicológico | Objetivo funcional | Decisão visual | Medida exata | Estado mobile | Animação | Critério de aceite |
|---|---|---|---|---|---|---|---|
| Reduced header (logo + nome + Sair) | indicar contexto sem peso | exit visível | h 64 desktop / 56 mobile, divider bottom | logo 22px, span 13px #6C6B6E, Sair 14px | mesma estrutura | none | "Sair" volta para /tempo.html |
| Progress label `1 de 5` | mostrar finitude | reduzir abandono | label 14px semibold #55534E | 14px desktop / 13px mobile | mesma | width transition 220ms cubic | atualiza a cada question |
| Progress bar | barra de progresso | reforçar avanço | track #F5F5F5 4px / fill #181818 4px / radius 999px | track 4px desktop / 5px mobile | mesma | width 220ms cubic-bezier(0.2,0.8,0.2,1) | preenche progressivamente; sem bounce |
| Microcopy `Leva menos de 1 minuto.` | reduzir hesitação | promessa de tempo | 14px #6C6B6E | 13px mobile | mesma | none | aparece sob bar |
| Question H1 | direcionar atenção | enunciar a pergunta | 44-52 / 1.08 / -0.035 / 800 | 30-36 mobile | mesma | enter fade-up 220ms / exit fade-up reverse 120ms | nunca quebra em 5+ linhas no mobile |
| Multi-select hint `Selecione todos que se aplicam.` | clarificar tipo | reduzir erro | 14px #6C6B6E | 13px | mesma | fade-in com question | aparece apenas em multi |
| Option (single) | registrar escolha com certeza | avançar sem dúvida | radio circle 22px + label 16px / pill 16 radius | h 60 desktop / 56 mobile, padding 0 20 / 14 16 | text wrap ≤2 linhas | hover bg #F5F5F5 + border preta; selected border 2px preta + bg branco + label semibold; check fill 0.85→1 140ms | tap whole option = check selected; selecionar auto-avança em 200ms |
| Option (multi) | registrar múltiplas escolhas | controle livre | checkbox 22 square 6 radius | mesma 60/56h | 2 col em Q2 mobile, 1col em Q4 mobile | check fill 140ms | next disabled até 1+ check; clique no checkbox alterna sem auto-avançar |
| Microcopy WhatsApp Q2 `Isso mede o caminho manual. O Allybi não pesquisa WhatsApp.` | manter honestidade | desambiguar fonte | 13px #6C6B6E | mesma | mesma | none | sempre visível quando Q2 tem opção WhatsApp |
| Next button sticky | finalizar question | avançar | bg preto, h 52 (mobile)/56 (desktop), full-width mobile | full-width 100% sticky bottom com safe-area | sticky | none | disabled mostra "Escolha uma opção…" em 13px #6C6B6E 1800ms |
| Voltar | undo seguro | regredir 1 question | ghost text | left margin, h 44 | left aligned | none | volta uma question sem perder respostas |
| Loading final | mostrar processamento real | esperar resultado | "Calculando onde o tempo some…" + 3 pills sequenciais | 800-1000ms total | mesma | 3 dots light em sequência | nunca dura > 1s; depois redirect para /tempo-resultado.html |

---

## 3. /tempo-resultado.html — Calculadora resultado

| Elemento | Objetivo psicológico | Objetivo funcional | Decisão visual | Medida exata | Estado mobile | Animação | Critério de aceite |
|---|---|---|---|---|---|---|---|
| H1 `[tempo] somem antes do arquivo sair certo.` | reconhecimento | tornar resultado pessoal | 56-64 desktop / 34-40 mobile, balance, tnum nos números | inicia com número | 1col, número primeiro | fade-up 400ms | 3,1 h/mês com vírgula decimal |
| Sub | explicar | enquadrar como caminho | 17px #55534E | 16px | mesma | reveal +60ms | logo abaixo do H1 |
| Microcopy `Não é falta de organização. É um caminho manual repetido.` | reduzir culpa | reframe | 14px #6C6B6E | 13px | mesma | reveal +120ms | nunca ofensivo |
| Metric card 1 `Tempo invisível` | ancorar magnitude | mostrar dor mensurada | value 64px / label 14px / sub 13px | 1×3 desktop / 1col mobile | mesma | reveal stagger | value formatado PT-BR |
| Metric card 2 `Maior gargalo` | apontar especifíco | personalizar | value 22px texto + label + frase | 1col mobile | mesma | reveal | label varia (Confirmar versão / Achar fonte / Preparar envio) |
| Metric card 3 `O que Allybi reduziria` | ligar ao produto | provar produto | value 22px + label + dynamic phrase | 1col mobile | mesma | reveal | frase muda por gargalo principal |
| Share card | gerar sharing | criar resumo copiável | card branco 32px padding | 540px desktop / 100% mobile | 100% | fade-in +200ms | texto contém o tempo e o gargalo |
| Share card text | copy compartilhável | resumir para WhatsApp/LinkedIn | 16px/1.55 #181818 | mesma | mesma | none | gera "Fiz a calculadora… perco cerca de [tempo]/mês… Maior gargalo: [gargalo]" |
| Share actions (WhatsApp / Copiar / LinkedIn) | facilitar share | abrir intent | 3 botões pills 44px h | mesma | mesma | hover -1px | "Copiar" mostra "Texto copiado." 1800ms |
| Breakdown horizontal bar | onde o tempo vai | provar visualmente | 4 segments cores neutras com marker amarelo no maior | full-width 720 max, h 36 | full-width, h 28 | fill 700ms staggered | maior segment tem marker amarelo + label "Maior gargalo" |
| Allybi-bridge row "Com Allybi essa etapa vira…" | conectar à solução | preview produto | linha verde abaixo do bar | mesma | mesma | reveal | usa verde apenas aqui |
| Lead capture | converter intenção em contato | coleta opcional | card com 4 inputs (Nome/WhatsApp/E-mail/Área) | 540 max | 100% | none | só aparece DEPOIS de breakdown |
| Lead inputs | preencher fácil | sem fricção | label above field, h 52, radius 14, border 1 #E6E6EC, focus 2px preto | mesma 52 | mesma | focus 150ms border | label `aria-label`, não placeholder-only |
| Lead CTA `Receber leitura` | enviar | submit | preto pill 56/52 | full-width mobile | full-width | hover -1px | submit mostra "Pronto. Vamos enviar sua leitura." 1.8s; sem backend faked |
| Lead microcopy `Nenhum documento é pedido. Usamos seus dados só para enviar a leitura.` | proteção | manter pacto | 13px #6C6B6E | mesma | mesma | none | sempre visível |
| Allybi bridge final | conversão pós-valor | venda leve | 3 rows + channel copy | full-width 720 max | 1col | reveal stagger | última linha cita Outlook+confirmação e WhatsApp handoff |
| Reload behavior | persistência | recuperar sem perder | reload usa localStorage `allybi_tempo_answers` | mesma | mesma | none | se não há answers → redirect para /tempo.html |

---

## 4. /diagnostico.html — Diagnóstico landing

| Elemento | Objetivo psicológico | Objetivo funcional | Decisão visual | Medida exata | Estado mobile | Animação | Critério de aceite |
|---|---|---|---|---|---|---|---|
| Eyebrow `DIAGNÓSTICO DO TIME` | enquadrar coletivo | classificar | uppercase chip | 12px/700/0.12em #6C6B6E | mesma | none | acima do H1 |
| H1 `Entre o pedido e o envio, onde seu time trava?` | curiosidade coletiva sem culpa | tese | 56-64 / 1.03 / -0.04em | 36-40 mobile | mesma | reveal fade-up | nunca acusa pessoa |
| Sub | explicar | enquadrar pacto | 17px #55534E | 16px | mesma | reveal +60ms | cita as 6 dimensões |
| CTA primário `Mapear fluxo do time` | start coletivo | rota questionário | preto pill 56 | full-width 100% | full-width | hover -1px | abre /diagnostico-questionario.html |
| Microcopy `6 perguntas · nenhum arquivo é pedido · sem nomes de clientes` | pacto explícito | reduzir hesitação | 13px #6C6B6E | 12px | mesma | reveal +120ms | sempre visível |
| FlowMapCard (NOT bars) | preview de resultado | preview novo formato | 6 nodes horizontal com gargalo amarelo | 520×auto desktop / 100% mobile | flow vira vertical | reveal +200ms; gargalo pulse once 240ms | nó "Fonte" highlighted amarelo |
| FlowMapCard.label `EXEMPLO DE DIAGNÓSTICO` | enquadrar | desambiguar | eyebrow | 11px/700 #6C6B6E | mesma | none | sempre visível |
| FlowMapCard.score `68/100` | impacto numérico | ancorar magnitude | 64/800/-0.04 | 48 mobile | mesma | fade-in 400ms | tnum |
| FlowMapCard.flow nodes (Pedido → Busca → Versão → Fonte → Confirmação → Envio) | mostrar mapa | educar formato | pill 36h × 14padding × 999r border 1px #E6E6EC; gargalo bg rgba(251,188,4,0.18) border #FBBC04 | nodes vertical, 100% width | mesma | reveal stagger | sem horizontal overflow em 360 |
| Section 2: O que o diagnóstico mede (6 cards Pedido/Busca/Versão/Fonte/Confirmação/Envio) | desambiguar escopo | educar pré-quiz | 6 cards 3×2 desktop / 1col mobile | 24 padding, 16 radius, border 1px | 1col mobile | reveal stagger | cada card tem 1 frase, sem ícone genérico |
| Section 3: "O problema não é uma pessoa. É o caminho." | reframe | reduzir defensividade | card central com manual chain visual | 720 max | 1col | reveal | "Versão?" e "Fonte?" em amarelo |
| Section 4: 3 passos (responder/compartilhar/comparar) | sequência clara | reduzir abandono | 3 cards num+title+desc | 3×1 desktop / 1col mobile | 1col | reveal | passo 3 explica comparação |
| CTA final `Mapear fluxo do time` | recaptura | last chance | preto pill 56 centralizado | full-width 320 max | full-width | hover -1px | foco visível |
| Footer global | mesma do site | exit seguro | inherit | inherit | inherit | none | consistente |

---

## 5. /diagnostico-questionario.html — Diagnóstico questionário

Mesmo padrão do `/tempo-questionario.html` (todos os elementos do quiz herdam o contrato da seção 2 deste documento), com:

| Elemento extra | Decisão |
|---|---|
| Total = 6 perguntas | progress = `1 de 6`, fill width / 6 |
| Q2 microcopy WhatsApp | "Isso mede o caminho manual. O Allybi não pesquisa WhatsApp." (sempre visível) |
| Q3 (multi) | layout 1col mobile, 2col desktop |
| Q5 (multi) | layout 1col mobile, 2col desktop |
| Loading | "Mapeando onde o fluxo perde certeza…" + 6 nodes acendendo em sequência (Pedido → … → Envio), gargalo final com pulse 240ms once |
| Final button | `Ver diagnóstico` |
| Persistência | `localStorage` key `allybi_diag_answers` |

---

## 6. /diagnostico-resultado.html — Diagnóstico resultado

| Elemento | Objetivo psicológico | Objetivo funcional | Decisão visual | Medida exata | Estado mobile | Animação | Critério de aceite |
|---|---|---|---|---|---|---|---|
| H1 `O fluxo do seu time mostrou [score]/100 de atrito.` | diagnóstico não nota escolar | resultado coletivo | 56-64 / 1.03 / -0.04 | 36-40 mobile | mesma | fade-up 400ms | usa "mostrou", NUNCA "marcou" |
| Sub `O problema não é uma pessoa…` | reframe coletivo | manter pacto | 17px #55534E | 16px | mesma | reveal +60ms | sempre visível |
| Microcopy explicativa | calibrar leitura | educar score | 14px #6C6B6E | 13px | mesma | reveal +120ms | sempre visível |
| Card 1 `[score]/100 · Atrito no fluxo` | ancorar score | mostrar range | value 64 / label 14 / range tag | 1×3 desktop / 1col mobile | mesma | reveal stagger | range "Fluxo claro/Atrito moderado/Alto atrito/Dependente demais" |
| Card 2 `[gargalo] · Maior gargalo` | apontar onde quebra | personalizar | 22px texto value | 1col mobile | mesma | reveal | dimensão dinâmica |
| Card 3 `[bridge] · O que Allybi reduziria` | converter | provar produto | 22px texto | 1col mobile | mesma | reveal | frase dinâmica |
| FlowMap section H2 `Onde o fluxo trava` | localizar | ver mapa | 28-36 / 700 | 24-28 | mesma | reveal | acima do mapa |
| FlowMap | mapa visual completo | mostrar bottleneck | 6 nodes horizontal desktop / vertical mobile, gargalo amarelo | nodes pill h36 | vertical | reveal stagger | nó dinâmico baseado em dimensão dominante |
| Below FlowMap: Sintoma / Risco / Como Allybi reduz | educar 3 linhas | conectar dor → solução | 3 linhas com label + value | full-width 720 max | mesma | reveal | sempre presente |
| Share card | sharing | resumo copy | 32 padding card branco | 100% mobile | mesma | fade +200ms | texto contém score + gargalo + frase "Não é sobre pessoas. É sobre o caminho..." |
| Share actions (Time/Copiar/LinkedIn) | facilitar share | abrir intent | 3 botões 44h | mesma | mesma | hover | "Copiar" mostra confirmação 1800ms |
| Dimension breakdown | detalhar 5 dimensões | precisão | 5 cards: score/20 + explicação + bridge | 1col mobile / 2-3 col desktop | 1col | reveal stagger | cada dim com bridge Allybi |
| Lead capture (aparece após map + share) | converter | coletar | card com 5 inputs (Nome/WA/Email/Área/Time) | 540 max | 100% | none | só após valor entregue |
| Lead microcopy | proteção | pacto | 13px #6C6B6E | mesma | mesma | none | "Nenhum arquivo é pedido…" |
| Allybi bridge | conversão | venda leve | rows antes→depois | full-width 720 | 1col | reveal | última linha cita Outlook+conf, WhatsApp handoff |
| Reload behavior | persistência | recuperar | localStorage `allybi_diag_answers` | mesma | mesma | none | se vazio → redirect /diagnostico.html |

---

## 7. /metodologia.html — Metodologia

| Elemento | Objetivo psicológico | Objetivo funcional | Decisão visual | Medida exata | Estado mobile | Animação | Critério de aceite |
|---|---|---|---|---|---|---|---|
| Eyebrow `METODOLOGIA` | enquadrar | classificar | uppercase chip | 12px/700/0.12em | mesma | none | acima do H1 |
| H1 `Como medimos tempo perdido e atrito no fluxo.` | confiança | transparência | 56-64 / 1.03 / -0.04 / 800 | 36-40 mobile | mesma | fade-up 400ms | nunca usa "auditoria" |
| Sub | explicar | pacto | 17px #55534E | 16px | mesma | reveal +60ms | cita "nenhum arquivo é pedido" |
| CTA dupla (Calcular / Mapear) | dual entry | rotear | 2 botões empilhados mobile | mesma | empilha | hover | cada CTA leva à ferramenta certa |
| Microcopy `nenhum arquivo · nenhum nome de cliente · resultado na hora` | pacto explícito | tranquilizar | 13px #6C6B6E | 12px | mesma | reveal +120ms | sempre visível |
| Hero card `Dois testes. Uma lógica.` | preview mental model | educar | card branco com flow pills + badge "Estimativa, não auditoria." | 480 max | 100% | reveal | pills tem últimu node preto |
| Section "Dois testes. Dois tipos de resposta." | desambiguar ferramentas | escolha clara | 2 cards grandes lado a lado | 1×2 desktop / 1col mobile | 1col | reveal | cada card tem badge (Individual/Time), título, sub, "Mede:" lista, "Resultado:" linha, CTA |
| Section "O custo não aparece quando o arquivo abre." | reframe | mostrar caminho inteiro | card central horizontal flow com nodes (Pedido / Procurar / Versão? / Fonte? / Contexto? / Envio) | 860 max | nodes vertical | reveal | "Versão?" "Fonte?" "Contexto?" em amarelo |
| Section "O que entra. O que fica fora." | confiança máxima | transparência radical | 3 colunas desktop / 3 accordions mobile | 1×3 desktop / accordion mobile | accordion | reveal | inclui "O que perguntamos / O que NÃO pedimos / O que NÃO prometemos" |
| Formula visual | educar fórmula | desmistificar | card com 5 pills + accordion fórmula completa | full-width 720 | mesma | reveal | "Ver fórmula completa" abre detalhes |
| Diagnostic methodology (5 dims + ranges) | provar processo | precisão | lista de dimensões 0-20 cada | full-width 720 | mesma | reveal | total = 100 |
| Reading the result (calc + diag ranges) | calibrar leitura | educar | 2 colunas de ranges | 1col mobile | 1col | reveal | calc tem 4 faixas, diag tem 4 faixas |
| Privacy section H2 `Privacidade desde a pergunta.` | confiança | pacto | 28-36 / 700 | 24-28 | mesma | reveal | sub explica "medem caminho, não coletam documentos" |
| Privacy 4 cards (sem arquivos / sem nomes / sem acesso / dados mínimos) | provar não invasão | tranquilizar | 4 cards iguais com border-left preto | 2×2 desktop / 1col mobile | 1col | reveal stagger | NÃO destaca LGPD número da lei |
| Allybi bridge | conversão | conectar prova → produto | 5 rows antes→depois | full-width 720 max | 1col | reveal stagger | usa Outlook+conf + WhatsApp handoff |
| CTA final dual | converter | direcionar | 2 botões empilhados mobile | full-width 100% mobile | empilha | hover | "Começar grátis" + "Ver como funciona" |

---

## 8. Animações globais

| Sigla | Onde | duração | easing | quando |
|---|---|---|---|---|
| **Reveal fade-up** | section headers, cards | 220-400ms | `cubic-bezier(0.2,0.8,0.2,1)` | once on viewport |
| **Question enter** | quiz question H1 + options | 220ms enter / 120ms exit | mesma | on question advance |
| **Option selected** | option border/bg/check | 80ms border, 140ms check scale 0.85→1, 150ms label semibold | linear | on tap |
| **Progress bar fill** | top of quiz | 220ms width | mesma | on question change |
| **Result number** | hero H1 / metric cards values | 400ms fade-up | mesma | once on viewport |
| **Bars fill** | breakdown / preview | 700ms width staggered 80ms each | mesma | once on viewport |
| **Gargalo pulse** | bottleneck node (diagnostico flow) | 240ms scale 1→1.04→1 once | mesma | once after reveal |
| **Reduced-motion** | global block in `allybi-base.css` already exists | `animation-duration:0.001ms`, `transition-duration:0.001ms` | n/a | always when prefers-reduced-motion |

---

## 9. Scoring formulas

### Calculadora (5 questions → h/mês)

```
Q1 frequency:   1.5, 4, 8, 15, 24
Q2 dispersion:  base 1.0 + 0.08 per place after first + 0.10 if WhatsApp + 0.10 if "Alguém do time"; cap 1.6
Q3 avgSearch:   4, 8, 15, 30, 50 (minutes)
Q4 postFind:    Confirmar versão=4, Achar fonte=4, Entender contexto=5, Montar mensagem=5, Conferir dest/canal=3, Pedir confirmação=7
Q5 risk:        versão errada=4, sem fonte=4, cliente esperando=2, anexo errado=3, canal errado=2, depender de alguém=5

searchPerItem = avgSearch * dispersion
postFind      = sum(Q4 minutes) + Q5 risk minutes
weeklyMin     = frequency * (searchPerItem + postFind)
monthlyHours  = weeklyMin * 4.33 / 60

Display:
  if monthlyHours < 10: "X,Y h/mês" (1 decimal, vírgula)
  else:                 "X h/mês"   (integer)

Bottleneck: argmax over [search, version, source, prep] (computed from per-step contribution).
```

### Diagnóstico (6 questions → 5 dimensions × 20 = 100)

```
Dimensions:
  D1 Fontes espalhadas       (Q2 + Q3)
  D2 Versão frágil           (Q4)
  D3 Fonte invisível         (Q5: "Achar fonte"; Q6: "Responder sem fonte")
  D4 Envio manual            (Q5: "Montar mensagem", "Conferir destinatário", "Escolher canal"; Q6: "Mandar anexo errado")
  D5 Dependência confirmação (Q4: "Perguntando para alguém"; Q3: "Memória de alguém"; Q6: "Depender de uma pessoa só")

Each dim: 0–20.
Total: sum of dims = 0–100.

Ranges:
   0–25  Fluxo claro
  26–50  Atrito moderado
  51–75  Alto atrito
  76–100 Dependente demais de confirmação manual

Bottleneck = argmax dim.
```

---

## 10. SEO/metadata per page

| Page | Title | Description |
|---|---|---|
| tempo | `Calculadora do Tempo Perdido \| Allybi` | "Calcule quanto tempo some antes do arquivo sair certo. Responda 5 perguntas, sem enviar arquivos, e veja seu maior gargalo." |
| tempo-questionario | `Calculadora do Tempo Perdido \| Allybi` | "Responda 5 perguntas rápidas para estimar quanto tempo some entre procurar, confirmar versão, achar fonte e preparar envio." |
| tempo-resultado | `Resultado da Calculadora \| Allybi` | "Veja quanto tempo seu fluxo perde por mês, qual é o maior gargalo e onde Allybi reduziria o caminho." |
| diagnostico | `Diagnóstico do Fluxo \| Allybi` | "Mapeie onde seu time perde certeza entre pedido, busca, versão, fonte, confirmação e envio. Nenhum arquivo é pedido." |
| diagnostico-questionario | `Diagnóstico do Fluxo \| Allybi` | "Responda 6 perguntas rápidas para mapear onde o fluxo do time trava antes do envio." |
| diagnostico-resultado | `Resultado do Diagnóstico \| Allybi` | "Veja o score de atrito do fluxo, o maior gargalo e onde Allybi reduziria busca, confirmação e envio manual." |
| metodologia | `Metodologia \| Allybi` | "Entenda como a Calculadora estima tempo perdido e como o Diagnóstico mapeia atrito no fluxo. Nenhum arquivo é pedido." |

All app CTAs → `https://app.allybi.co/signup` (`.com.br` via language-switcher for PT).

---

## 11. Out-of-scope (will be deferred)

- Real backend for lead capture (no `backend-server.js` integration). Lead capture submits client-side success "Pronto. Vamos enviar sua leitura." with no actual storage. Reported in final delivery.
- LinkedIn/WhatsApp deep-link tracking (instrumentation TBD)
- EN i18n parity for tools namespace (this brief is PT-first; EN may lag, will be reported)
- Vercel deploy verification (out of repo scope)

---

**Gate:** code only begins after this contract is committed and the user is silent (per autonomous flow chosen). Every element in implementation must trace to a row above.
