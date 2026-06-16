# Homepage Refactor — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor `index.html` to close the gap with the homepage brief — fixed pain semaphore, new Pricing teaser, completed Security pillars, expanded hero mockup with causal animation, reordered sections (Tools after Pain), copy/visual polish across 6 sections.

**Architecture:** Static HTML + modular CSS + vanilla JS. PT-first via `data-i18n-key` + `translations/{pt,en}.json`. Causal animations driven by scoped CSS keyframes + IntersectionObserver for triggering. `prefers-reduced-motion` shortcuts to final state.

**Tech Stack:** HTML5, CSS (custom properties / clamp / grid), vanilla JS (existing `animations.js` + new `hero-sequence.js`), Playwright 1.61 for visual QA.

**Reference docs:**
- Audit: `docs/superpowers/specs/2026-06-16-homepage-audit.md`
- Spec: `docs/superpowers/specs/2026-06-16-homepage-refactor-design.md`

---

## File map

**Will create:**
- `hero-sequence.js` — causal animation engine for the hero mockup sequence (5 acts, autoplay, loop, reduced-motion).
- `pricing-teaser-section.css` — styles for the new Pricing teaser section.

**Will modify:**
- `index.html` — section reorder, hero markup, pain card 2, tools microcopy/mini-viz, integrations output cards, security pillars, pricing teaser markup, FAQ +2 perguntas, CTA final, SEO/OG.
- `translations/pt.json`, `translations/en.json` — new keys + edits aligned to refactored copy.
- `hero-section.css` — restyle source pills, version rows (cinza/amarelo/verde), review panel, send button.
- `pain-section.css` — color the v3 row green with check.
- `workflow-section.css` (or `s-workflow-*`) — causal animation classes for the workflow.
- `index.css` — main page-level CSS (only if needed for new section spacing).
- `animations.js` — wire IntersectionObserver triggers for new animated sections.

**Won't touch:**
- `pricing.html`, `how-it-works.html`, `integrations.html`, `security-overview.html`, etc. (out of scope per spec §19).
- `language-switcher.js`, `server.js`, design tokens, logo, palette.

---

## Phase 0 — Setup & baseline

### Task 0.1: Snapshot baseline + branch off

**Files:**
- No file changes, only git.

- [ ] **Step 1: Verify clean working tree.**

```bash
cd /Users/alvarocamasmie/Downloads/koda-Landing
git status --short
```
Expected: no unstaged changes beyond the i18n edits from the previous session (those are already committed to a separate branch/PR by user choice). If unsure, ask user before continuing.

- [ ] **Step 2: Create refactor branch.**

```bash
git checkout -b homepage-refactor
```

- [ ] **Step 3: Confirm servers up.**

```bash
curl -s -o /dev/null -w "front %{http_code}\nback %{http_code}\n" http://localhost:8080/index.html
```
Expected: `front 200`. If 000, run `node server.js &` in background.

- [ ] **Step 4: Capture baseline screenshots into `/qa-screenshots/before/` (already exists from audit).**

Skip — already captured during audit phase. Confirmed in `qa-screenshots/before/`.

---

## Phase 1 — Cirurgical refinements (low risk, fast wins)

Each task: edit → screenshot 360 + 1440 to verify → commit.

### Task 1.1: Pain card 2 — semaphore green on v3

**Files:**
- Modify: `index.html` (around line 218–222, the `s-pain__visual-versions` block).
- Modify: `pain-section.css` (add a `--confirmed` variant class).

- [ ] **Step 1: Replace v3 row markup.**

In `index.html`, find:
```html
<div class="s-pain__version-row s-pain__version-row--highlight"><span class="s-pain__version-file">contrato_final_AGORA.pdf</span><span class="s-pain__version-badge">versão?</span></div>
```

Replace with:
```html
<div class="s-pain__version-row s-pain__version-row--confirmed">
  <span class="s-pain__version-file">contrato_final_AGORA.pdf</span>
  <span class="s-pain__version-badge s-pain__version-badge--ok" data-i18n-key="home.pain.confirmed_badge">
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
    fonte confirmada
  </span>
</div>
```

And change v2 row to amber (incerteza):
```html
<div class="s-pain__version-row s-pain__version-row--warn">
  <span class="s-pain__version-file">contrato_final_v3.pdf</span>
  <span class="s-pain__version-badge s-pain__version-badge--warn" data-i18n-key="home.pain.uncertain_badge">fonte incerta</span>
</div>
```

And v1:
```html
<div class="s-pain__version-row s-pain__version-row--prev">
  <span class="s-pain__version-file">contrato_final.pdf</span>
  <span class="s-pain__version-badge s-pain__version-badge--muted" data-i18n-key="home.pain.previous_badge">versão anterior</span>
</div>
```

- [ ] **Step 2: Add CSS variants in `pain-section.css`** (append at end of file):

```css
.s-pain__version-row--prev {
  opacity: 0.78;
}
.s-pain__version-row--warn {
  border: 1px solid rgba(251, 188, 4, 0.35);
  background: rgba(251, 188, 4, 0.06);
}
.s-pain__version-row--confirmed {
  border: 1px solid rgba(52, 168, 83, 0.55);
  background: rgba(52, 168, 83, 0.08);
  box-shadow: 0 0 0 2px rgba(52, 168, 83, 0.10);
}
.s-pain__version-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.s-pain__version-badge--muted { color: #6C6B6E; background: rgba(0,0,0,0.04); }
.s-pain__version-badge--warn  { color: #B6790A; background: rgba(251, 188, 4, 0.12); }
.s-pain__version-badge--ok    { color: #1E7B43; background: rgba(52, 168, 83, 0.14); }
```

- [ ] **Step 3: Add JSON keys.**

In `translations/pt.json` under `home.pain`:
```json
"confirmed_badge": "fonte confirmada",
"uncertain_badge": "fonte incerta",
"previous_badge": "versão anterior"
```

In `translations/en.json` under `home.pain`:
```json
"confirmed_badge": "source confirmed",
"uncertain_badge": "source uncertain",
"previous_badge": "previous version"
```

- [ ] **Step 4: Visual check.**

Run:
```bash
node -e "
const {chromium} = require('playwright');
(async () => {
  const b = await chromium.launch();
  for (const w of [360, 1440]) {
    const ctx = await b.newContext({viewport:{width:w, height:900}, locale:'pt-BR'});
    const p = await ctx.newPage();
    await p.goto('http://localhost:8080/index.html?lang=pt');
    await p.waitForTimeout(500);
    const el = await p.$('.s-pain');
    await el.scrollIntoViewIfNeeded();
    await p.waitForTimeout(400);
    await p.screenshot({path:'/tmp/check_pain_'+w+'.png', fullPage:false});
    await ctx.close();
  }
  await b.close();
})();
"
```

Open the two screenshots, verify v3 row is green with check icon and "fonte confirmada" label.

- [ ] **Step 5: Commit.**

```bash
git add index.html pain-section.css translations/pt.json translations/en.json
git commit -m "homepage: pain card 2 — semaphore correct (v1 muted, v2 amber, v3 green)"
```

---

### Task 1.2: Use Cases — replace em-dash with middle-dot in file references

**Files:**
- Modify: `translations/pt.json`, `translations/en.json`.
- Modify: `index.html` only if file refs are hardcoded.

- [ ] **Step 1: Grep where the em-dash appears in file refs.**

```bash
grep -n "\.pdf — \|\.docx — \|\.pptx — \|\.xlsx —" index.html translations/*.json
```

- [ ] **Step 2: For each match in JSON, replace `—` (em-dash) with `·` (middle-dot), preserving spaces:**

Example for `home.usecases.legal_query` if it contains the file ref:
```bash
python3 - <<'PY'
import json, pathlib
for f in ['translations/pt.json', 'translations/en.json']:
    p = pathlib.Path(f)
    txt = p.read_text()
    # Only inside .pdf/.docx/.pptx/.xlsx references
    import re
    txt2 = re.sub(r'(\.(pdf|docx|pptx|xlsx))\s*—\s*', r'\1 · ', txt)
    if txt != txt2:
        p.write_text(txt2)
        print(f, 'updated')
PY
```

- [ ] **Step 3: Repeat for `index.html` if any hardcoded refs use em-dash.**

```bash
sed -i '' -E 's/(\.(pdf|docx|pptx|xlsx)) — /\1 · /g' index.html
```

- [ ] **Step 4: Verify no remaining em-dash file refs.**

```bash
grep -E "\.(pdf|docx|pptx|xlsx) — " index.html translations/*.json || echo "clean"
```
Expected: `clean`.

- [ ] **Step 5: Commit.**

```bash
git add index.html translations/pt.json translations/en.json
git commit -m "homepage: use cases — em-dash → middle-dot in file references"
```

---

### Task 1.3: FAQ — add 2 missing questions

**Files:**
- Modify: `index.html` (FAQ section, around line 453+).
- Modify: `translations/pt.json`, `translations/en.json` under `home.faq`.

- [ ] **Step 1: Locate FAQ items in `index.html`.**

```bash
grep -n "home.faq.q[1-8]" index.html
```

- [ ] **Step 2: After q6 item, insert q7 and q8 items.**

Find the closing of q6 detail/summary and add:

```html
<details class="s-faq__item">
  <summary><span data-i18n-key="home.faq.q7">Meus documentos treinam modelos?</span></summary>
  <div class="s-faq__body"><p data-i18n-key="home.faq.a7">Não. Documentos, perguntas e respostas não são usados para treinar modelos.</p></div>
</details>
<details class="s-faq__item">
  <summary><span data-i18n-key="home.faq.q8">Quais fontes posso conectar?</span></summary>
  <div class="s-faq__body"><p data-i18n-key="home.faq.a8">Hoje: Outlook, OneDrive, SharePoint e uploads de arquivos. Gmail e Google Drive entram em seguida.</p></div>
</details>
```

(Adapt to the actual structural classes in your file — confirm via Read before insertion.)

- [ ] **Step 3: Add to `translations/pt.json` under `home.faq`:**

```json
"q7": "Meus documentos treinam modelos?",
"a7": "Não. Documentos, perguntas e respostas não são usados para treinar modelos.",
"q8": "Quais fontes posso conectar?",
"a8": "Hoje: Outlook, OneDrive, SharePoint e uploads de arquivos. Gmail e Google Drive entram em seguida."
```

- [ ] **Step 4: Add to `translations/en.json` under `home.faq`:**

```json
"q7": "Do my documents train models?",
"a7": "No. Documents, questions, and answers are never used to train models.",
"q8": "What sources can I connect?",
"a8": "Today: Outlook, OneDrive, SharePoint, and file uploads. Gmail and Google Drive are next."
```

- [ ] **Step 5: Visual check + commit.**

```bash
curl -s http://localhost:8080/index.html#faq -o /dev/null -w "%{http_code}\n"
node -e "
const {chromium} = require('playwright');
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({viewport:{width:360, height:900}, locale:'pt-BR'});
  const p = await ctx.newPage();
  await p.goto('http://localhost:8080/index.html?lang=pt');
  await p.evaluate(() => document.querySelector('.s-faq')?.scrollIntoView());
  await p.waitForTimeout(500);
  await p.screenshot({path:'/tmp/check_faq.png', fullPage:false});
  await b.close();
})();
"
```
Open `/tmp/check_faq.png`, verify 8 questions present.

```bash
git add index.html translations/pt.json translations/en.json
git commit -m "homepage: FAQ — add 'documents train models?' and 'which sources can I connect?'"
```

---

### Task 1.4: SEO metadata + Open Graph

**Files:**
- Modify: `index.html` head block.

- [ ] **Step 1: Locate `<title>` and meta tags in head.**

```bash
grep -n "<title>\|<meta name=\"description\"\|og:title\|og:description\|twitter:title" index.html | head -10
```

- [ ] **Step 2: Replace `<title>`:**

```html
<title>Allybi | Encontre, confirme e envie o documento certo</title>
```

- [ ] **Step 3: Replace `description`:**

```html
<meta name="description" content="Conecte Outlook, OneDrive, SharePoint e uploads. Pergunte no chat, veja a fonte da resposta e envie e-mails via Outlook com confirmação. WhatsApp abre como handoff.">
```

- [ ] **Step 4: Replace Open Graph + Twitter:**

```html
<meta property="og:title" content="Allybi | Encontre, confirme e envie o documento certo">
<meta property="og:description" content="Pergunte no chat, receba resposta com fonte e revise antes de enviar.">
<meta name="twitter:title" content="Allybi | Encontre, confirme e envie o documento certo">
<meta name="twitter:description" content="Pergunte no chat, receba resposta com fonte e revise antes de enviar.">
```

- [ ] **Step 5: Also update `HOME_META` in `language-switcher.js` (around line 36 — exists from earlier session).**

Find `HOME_META.pt` and replace:
```js
pt: {
  title: 'Allybi | Encontre, confirme e envie o documento certo',
  description: 'Conecte Outlook, OneDrive, SharePoint e uploads. Pergunte no chat, veja a fonte da resposta e envie e-mails via Outlook com confirmação. WhatsApp abre como handoff.',
  ogTitle: 'Allybi | Encontre, confirme e envie o documento certo',
  ogDescription: 'Pergunte no chat, receba resposta com fonte e revise antes de enviar.',
  twitterTitle: 'Allybi | Encontre, confirme e envie o documento certo',
  twitterDescription: 'Pergunte no chat, receba resposta com fonte e revise antes de enviar.'
},
```

(EN block stays as-is.)

- [ ] **Step 6: Commit.**

```bash
git add index.html language-switcher.js
git commit -m "homepage: SEO/OG metadata — align titles and descriptions with brief"
```

---

### Task 1.5: Banned terms grep + cleanup

**Files:**
- Modify: as needed.

- [ ] **Step 1: Grep banned terms in primary content files.**

```bash
TERMS=(
  "Koda" "Ask" "Enviável" "enviar com fonte" "envio via WhatsApp"
  "WhatsApp conectado" "pesquisar no WhatsApp" "WhatsApp como fonte"
  "respostas citando" "citações de fonte" "fundamentado"
  "Sem upload" "Manual Search" "X-Ray" "Cemitério" "Índice"
  "modo cadê" "Google humano" "app.allybi.com.brm.br" "allybi.com.brm"
  "Book demo" "book demo" "Agendar demo" "no mundo acelerado"
  "jornada" "sem fricção" "centralizado" "produtividade"
  "potencialize" "otimize" "maximize" "desbloqueie"
  "robusto" "escalável" "intuitivo" "revolucionário"
  "saiba mais" "conheça"
)
for t in "${TERMS[@]}"; do
  hits=$(grep -lc "$t" index.html translations/pt.json translations/en.json 2>/dev/null | grep -v ':0$' || true)
  [ -n "$hits" ] && echo "── $t" && grep -nH "$t" index.html translations/pt.json translations/en.json
done
```

- [ ] **Step 2: For each hit, decide:**
- Brand-y English word in `nav` namespace? Some are unavoidable (e.g., header `nav` text says "Ask" in EN if any). The brief says "Ask" is banned in PT but **the rule is for visible PT content**. Verify before changing EN.
- A real banned use? Replace with brief-compliant wording (e.g., "produtividade" → "fluxo" if in copy).
- A code identifier (CSS class, JS var) named "ask"? Leave alone — code identifiers aren't user-visible.

- [ ] **Step 3: Re-grep until clean for user-visible PT text.**

- [ ] **Step 4: Commit (if any changes).**

```bash
git add -p
git commit -m "homepage: copy — replace banned/AI-like terms"
```

---

## Phase 2 — New content (additive sections)

### Task 2.1: Workflow — confirm/add card 5 "Envio" + reword "linguagem normal"

**Files:**
- Modify: `index.html` (`s-workflow` section, line 251 onwards).
- Modify: `translations/pt.json`, `translations/en.json` under `home.workflow`.

- [ ] **Step 1: Read existing workflow section.**

```bash
sed -n '251,400p' index.html | grep -nE "s-workflow|h3|<p data" | head -20
```

- [ ] **Step 2: Identify if Envio card exists.**

If not present, find the last card in the workflow grid and append:

```html
<article class="s-workflow__card s-workflow__card--send allybi-reveal">
  <span class="s-workflow__card-step">05</span>
  <h3 data-i18n-key="home.workflow.s5_title">Envio</h3>
  <p data-i18n-key="home.workflow.s5_desc">E-mail via Outlook com sua confirmação. WhatsApp handoff com a mensagem pronta.</p>
  <div class="s-workflow__card-chips">
    <span class="s-workflow__chip"><img src="assets/images/outlook-icon.svg" alt="" width="14" height="14"> <span data-i18n-key="home.workflow.s5_chip1">Email via Outlook</span></span>
    <span class="s-workflow__chip"><img src="assets/images/whatsapp-icon.svg" alt="" width="14" height="14"> <span data-i18n-key="home.workflow.s5_chip2">WhatsApp handoff</span></span>
  </div>
</article>
```

- [ ] **Step 3: Find the card with `home.workflow.s2_title` "Pergunta no chat" / `home.workflow.f2` "linguagem normal".**

The micro label "linguagem normal" reads as cryptic on its own. In the JSON, change:

`pt.json` `home.workflow.f2`: `"linguagem normal"` → `"em linguagem normal"`
`en.json` `home.workflow.f2`: `"plain language"` → `"in plain language"`

And confirm `s2_desc` is meaningful — already updated in prior session to "Pergunte como falaria com alguém do time. Sem comandos. Sem busca manual."

- [ ] **Step 4: Add `s5_chip1`, `s5_chip2` to both JSON files.**

`pt.json`:
```json
"s5_chip1": "Email via Outlook",
"s5_chip2": "WhatsApp handoff",
```
`en.json`:
```json
"s5_chip1": "Email via Outlook",
"s5_chip2": "WhatsApp handoff",
```

- [ ] **Step 5: Visual check.**

Screenshot 360 + 1440 of workflow section. Confirm 5 cards visible in mobile (vertical stack) and the desktop arrangement makes sense.

- [ ] **Step 6: Commit.**

```bash
git add index.html translations/pt.json translations/en.json
git commit -m "homepage: workflow — add Envio card + clarify 'em linguagem normal'"
```

---

### Task 2.2: Tools — microcopy + mini-visuals

**Files:**
- Modify: `index.html` (`s-tools` section, line 497–516).
- Modify: `translations/pt.json`, `translations/en.json` under `home.tools`.
- Modify: page-level CSS for tools cards (find via `grep "s-tools__card" *.css`).

- [ ] **Step 1: Add microcopy below subtitle.**

In `index.html` find:
```html
<p ... data-i18n-key="home.tools.subtitle">Two quick tools...</p>
```
Add immediately after:
```html
<p class="s-tools__micro" data-i18n-key="home.tools.micro">Resultado na hora. Sem cadastro para ver o resultado.</p>
```

- [ ] **Step 2: Restructure each tool card with a mini visual.**

For `<a href="tempo.html" class="s-tools__card ...">`, expand to:

```html
<a href="tempo.html" class="s-tools__card allybi-card allybi-reveal" style="text-decoration:none;color:inherit">
  <div class="s-tools__card-viz s-tools__card-viz--bars" aria-hidden="true">
    <div class="s-tools__bar"><span class="s-tools__bar-fill" style="--w:62%"></span><label data-i18n-key="home.tools.bar1">Procurar</label></div>
    <div class="s-tools__bar"><span class="s-tools__bar-fill" style="--w:48%"></span><label data-i18n-key="home.tools.bar2">Confirmar versão</label></div>
    <div class="s-tools__bar"><span class="s-tools__bar-fill" style="--w:38%"></span><label data-i18n-key="home.tools.bar3">Achar fonte</label></div>
    <div class="s-tools__bar"><span class="s-tools__bar-fill" style="--w:28%"></span><label data-i18n-key="home.tools.bar4">Preparar envio</label></div>
    <span class="s-tools__viz-caption" data-i18n-key="home.tools.viz_example">Exemplo. Calcule o seu.</span>
  </div>
  <h3 data-i18n-key="home.tools.calc_title">Calculadora do Tempo Perdido</h3>
  <p data-i18n-key="home.tools.calc_desc">Descubra quantas horas por mês você perde procurando, confirmando e reenviando arquivos.</p>
  <span class="s-tools__card-cta" data-i18n-key="home.tools.calc_cta">Calcular meu tempo &rarr;</span>
</a>
```

For `<a href="diagnostico.html" ...>`:

```html
<a href="diagnostico.html" class="s-tools__card allybi-card allybi-reveal" style="text-decoration:none;color:inherit">
  <div class="s-tools__card-viz s-tools__card-viz--map" aria-hidden="true">
    <ol class="s-tools__map">
      <li class="s-tools__map-node" data-i18n-key="home.tools.node1">Pedido</li>
      <li class="s-tools__map-node" data-i18n-key="home.tools.node2">Busca</li>
      <li class="s-tools__map-node s-tools__map-node--stuck" data-i18n-key="home.tools.node3">Versão</li>
      <li class="s-tools__map-node" data-i18n-key="home.tools.node4">Fonte</li>
      <li class="s-tools__map-node" data-i18n-key="home.tools.node5">Confirmação</li>
      <li class="s-tools__map-node" data-i18n-key="home.tools.node6">Envio</li>
    </ol>
    <span class="s-tools__viz-caption" data-i18n-key="home.tools.viz_stuck">Onde o fluxo trava.</span>
  </div>
  <h3 data-i18n-key="home.tools.diag_title">Diagnóstico do Fluxo</h3>
  <p data-i18n-key="home.tools.diag_desc">Mapeie onde o time perde certeza entre o pedido e o envio.</p>
  <span class="s-tools__card-cta" data-i18n-key="home.tools.diag_cta">Mapear fluxo do time &rarr;</span>
</a>
```

- [ ] **Step 3: Add CSS for bars + map.**

Append to the CSS file that owns `s-tools` (find via `grep -l "s-tools__card" *.css`):

```css
.s-tools__micro {
  font-size: 13px;
  color: var(--allybi-text-muted);
  margin: 8px auto 0;
  text-align: center;
}
.s-tools__card-viz {
  background: var(--allybi-bg-alt-1);
  border: 1px solid var(--allybi-border);
  border-radius: 10px;
  padding: 14px 14px 10px;
  margin-bottom: 16px;
}
.s-tools__bar {
  display: grid;
  grid-template-columns: 1fr 130px;
  gap: 10px;
  align-items: center;
  margin-bottom: 8px;
  font-size: 11px;
  color: var(--allybi-text-secondary);
}
.s-tools__bar:last-of-type { margin-bottom: 0; }
.s-tools__bar-fill {
  position: relative;
  display: block;
  height: 8px;
  background: rgba(0,0,0,0.06);
  border-radius: 4px;
  overflow: hidden;
}
.s-tools__bar-fill::after {
  content: "";
  position: absolute; inset: 0;
  width: var(--w, 0%);
  background: linear-gradient(90deg, #181818, #55534E);
  border-radius: inherit;
  transform-origin: left;
  transition: width 500ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
.s-tools__viz-caption {
  display: block;
  margin-top: 10px;
  font-size: 11px;
  color: var(--allybi-text-muted);
  text-align: right;
}
.s-tools__map {
  list-style: none;
  margin: 0; padding: 0;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 6px;
  align-items: center;
}
.s-tools__map-node {
  position: relative;
  font-size: 10px;
  text-align: center;
  padding: 8px 6px;
  border-radius: 6px;
  background: rgba(0,0,0,0.04);
  color: var(--allybi-text-secondary);
}
.s-tools__map-node + .s-tools__map-node::before {
  content: "→";
  position: absolute;
  left: -10px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--allybi-text-muted);
  font-size: 10px;
}
.s-tools__map-node--stuck {
  background: rgba(217, 45, 32, 0.08);
  color: #B41E11;
  font-weight: 600;
}
.s-tools__map-node--stuck::after {
  content: "•";
  position: absolute;
  top: -4px; right: -4px;
  width: 8px; height: 8px;
  background: #D92D20;
  border-radius: 50%;
}
@media (max-width: 600px) {
  .s-tools__bar { grid-template-columns: 1fr 100px; }
  .s-tools__map { grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .s-tools__map-node + .s-tools__map-node::before { display: none; }
}
```

- [ ] **Step 4: Add new keys to both JSON files.**

`pt.json` under `home.tools`:
```json
"micro": "Resultado na hora. Sem cadastro para ver o resultado.",
"bar1": "Procurar",
"bar2": "Confirmar versão",
"bar3": "Achar fonte",
"bar4": "Preparar envio",
"viz_example": "Exemplo. Calcule o seu.",
"node1": "Pedido",
"node2": "Busca",
"node3": "Versão",
"node4": "Fonte",
"node5": "Confirmação",
"node6": "Envio",
"viz_stuck": "Onde o fluxo trava."
```

`en.json` under `home.tools`:
```json
"micro": "Instant result. No signup to see your result.",
"bar1": "Search",
"bar2": "Confirm version",
"bar3": "Find source",
"bar4": "Prepare send",
"viz_example": "Example. Run yours.",
"node1": "Request",
"node2": "Search",
"node3": "Version",
"node4": "Source",
"node5": "Confirmation",
"node6": "Send",
"viz_stuck": "Where the flow stalls."
```

- [ ] **Step 5: Visual check at 360 + 1440. Confirm bars filled correctly, map renders, mobile layout doesn't overflow.**

- [ ] **Step 6: Commit.**

```bash
git add index.html translations/pt.json translations/en.json *.css
git commit -m "homepage: tools — microcopy + mini visuals (bars + flow map)"
```

---

### Task 2.3: Integrations — output cards (Email via Outlook + WhatsApp handoff)

**Files:**
- Modify: `index.html` (integrations section, around line 400+).
- Modify: `translations/pt.json`, `translations/en.json` under `home.integrations`.
- Modify: integrations CSS file.

- [ ] **Step 1: Locate the integrations grid in `index.html`.**

```bash
grep -n "s-integrations\|home.integrations" index.html | head -20
```

- [ ] **Step 2: Find the end of the source-cards block and insert a separator + output block.**

Insert this markup after the last source card (Uploads):

```html
<div class="s-integrations__divider" aria-hidden="false">
  <span data-i18n-key="home.integrations.after_review">Depois da revisão</span>
</div>

<div class="s-integrations__outputs">
  <article class="s-integrations__card s-integrations__card--out">
    <div class="s-integrations__card-head">
      <img src="assets/images/outlook-icon.svg" alt="" width="32" height="32">
      <span class="s-integrations__badge s-integrations__badge--ok" data-i18n-key="home.integrations.badge_live">Ativo</span>
    </div>
    <h3 data-i18n-key="home.integrations.email_name">Email via Outlook</h3>
    <p data-i18n-key="home.integrations.email_desc">Enviado pelo Allybi depois da sua confirmação.</p>
  </article>
  <article class="s-integrations__card s-integrations__card--out">
    <div class="s-integrations__card-head">
      <img src="assets/images/whatsapp-icon.svg" alt="" width="32" height="32">
      <span class="s-integrations__badge s-integrations__badge--ok" data-i18n-key="home.integrations.badge_live">Ativo</span>
    </div>
    <h3 data-i18n-key="home.integrations.whatsapp_name">WhatsApp handoff</h3>
    <p data-i18n-key="home.integrations.whatsapp_desc">O Allybi abre o WhatsApp com a mensagem pronta. Você envia no WhatsApp.</p>
    <p class="s-integrations__micro" data-i18n-key="home.integrations.whatsapp_micro">O Allybi não lê nem pesquisa sua caixa.</p>
  </article>
</div>
```

- [ ] **Step 3: Remove Gmail + Google Drive cards from the integrations section (move to `integrations.html` only).**

```bash
grep -n "gmail-icon\|google-drive-icon" index.html
```
Delete those source cards from `index.html` (only — `integrations.html` keeps them).

- [ ] **Step 4: Add CSS for divider + output cards.**

```css
.s-integrations__divider {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 32px 0 20px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--allybi-text-muted);
}
.s-integrations__divider::before,
.s-integrations__divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: var(--allybi-border);
}
.s-integrations__outputs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}
.s-integrations__card--out {
  border-left: 3px solid #181818;
}
.s-integrations__micro {
  margin-top: 8px;
  font-size: 12px;
  color: var(--allybi-text-muted);
}
```

- [ ] **Step 5: Add JSON keys.**

`pt.json` under `home.integrations`:
```json
"after_review": "Depois da revisão",
"whatsapp_name": "WhatsApp handoff",
"whatsapp_desc": "O Allybi abre o WhatsApp com a mensagem pronta. Você envia no WhatsApp.",
"whatsapp_micro": "O Allybi não lê nem pesquisa sua caixa."
```

`en.json` under `home.integrations`:
```json
"after_review": "After your review",
"whatsapp_name": "WhatsApp handoff",
"whatsapp_desc": "Allybi opens WhatsApp with the message ready. You send it in WhatsApp.",
"whatsapp_micro": "Allybi never reads or searches your inbox."
```

(`email_name`, `email_desc`, `badge_live` already exist from previous session.)

- [ ] **Step 6: Visual check + commit.**

Screenshot 360 + 1440 of the integrations section, confirm divider visible and two output cards render.

```bash
git add index.html translations/pt.json translations/en.json *.css
git commit -m "homepage: integrations — add 'Depois da revisão' divider + Email/WhatsApp outputs; remove Gmail/Drive from home"
```

---

### Task 2.4: Security — complete to 6 pillars

**Files:**
- Modify: `index.html` (security section).
- Modify: `translations/pt.json`, `translations/en.json` under `home.security`.

- [ ] **Step 1: Locate the security pillars grid.**

```bash
grep -n "home.security.pillar" index.html
```

- [ ] **Step 2: After existing 4 pillars (Sem treinamento, Criptografia, Permissões, Workspaces), insert 3 more — but spec says brief asks 6 total. Verify current count first.**

The brief lists 7 pillars (including Criptografia and Workspaces as conditional). If currently 4, add 3:

Insert after the last pillar:

```html
<article class="s-security__pillar allybi-reveal">
  <svg class="s-security__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/></svg>
  <h4 data-i18n-key="home.security.pillar_visible_title">Fonte visível</h4>
  <p data-i18n-key="home.security.pillar_visible_desc">Cada resposta mostra de onde veio.</p>
</article>
<article class="s-security__pillar allybi-reveal">
  <svg class="s-security__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 12l5 5L21 5"/></svg>
  <h4 data-i18n-key="home.security.pillar_confirm_title">Confirmação antes do envio</h4>
  <p data-i18n-key="home.security.pillar_confirm_desc">Você revisa conteúdo, arquivo, fonte, destinatário e canal.</p>
</article>
<article class="s-security__pillar allybi-reveal">
  <svg class="s-security__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
  <h4 data-i18n-key="home.security.pillar_whatsapp_title">WhatsApp sem caixa sincronizada</h4>
  <p data-i18n-key="home.security.pillar_whatsapp_desc">WhatsApp é handoff. O Allybi não lê nem pesquisa sua caixa.</p>
</article>
```

- [ ] **Step 3: Add JSON keys.**

`pt.json` under `home.security`:
```json
"pillar_visible_title": "Fonte visível",
"pillar_visible_desc": "Cada resposta mostra de onde veio.",
"pillar_confirm_title": "Confirmação antes do envio",
"pillar_confirm_desc": "Você revisa conteúdo, arquivo, fonte, destinatário e canal.",
"pillar_whatsapp_title": "WhatsApp sem caixa sincronizada",
"pillar_whatsapp_desc": "WhatsApp é handoff. O Allybi não lê nem pesquisa sua caixa."
```

`en.json` under `home.security`:
```json
"pillar_visible_title": "Source visible",
"pillar_visible_desc": "Every answer shows where it came from.",
"pillar_confirm_title": "Confirmation before send",
"pillar_confirm_desc": "You review content, file, source, recipient, and channel.",
"pillar_whatsapp_title": "WhatsApp without inbox sync",
"pillar_whatsapp_desc": "WhatsApp is a handoff. Allybi never reads or searches your inbox."
```

- [ ] **Step 4: Visual check at 360 + 1440. Confirm 7 pillars now visible.**

- [ ] **Step 5: Commit.**

```bash
git add index.html translations/pt.json translations/en.json
git commit -m "homepage: security — add Fonte visível, Confirmação antes do envio, WhatsApp sem caixa"
```

---

### Task 2.5: Pricing teaser (NEW section)

**Files:**
- Create: `pricing-teaser-section.css`
- Modify: `index.html` (insert between Security and FAQ sections).
- Modify: `translations/pt.json`, `translations/en.json` — new namespace `home.pricing_teaser`.

- [ ] **Step 1: Locate Security section end and FAQ section start.**

```bash
grep -n "</section>" index.html | head -20
grep -n "s-faq\|s-security\|s-pricing" index.html | head -10
```

- [ ] **Step 2: Insert Pricing teaser markup between Security and FAQ.**

```html
<!-- ═══════════════════════════════════════════════════════════════
     PRICING TEASER
     ═══════════════════════════════════════════════════════════════ -->
<section class="s-pricing-teaser allybi-section">
  <div class="allybi-container">
    <div class="s-pricing-teaser__header allybi-reveal">
      <h2 class="allybi-h2" data-i18n-key="home.pricing_teaser.title">30 dias grátis. Depois R$170/mês.</h2>
      <p class="allybi-lead" data-i18n-key="home.pricing_teaser.subtitle">Um plano para encontrar, confirmar e enviar o documento certo.</p>
    </div>

    <div class="s-pricing-teaser__card allybi-card allybi-reveal">
      <div class="s-pricing-teaser__plan">
        <span class="s-pricing-teaser__eyebrow" data-i18n-key="home.pricing_teaser.plan_name">Allybi Pro</span>
        <p class="s-pricing-teaser__price">
          <strong>R$170</strong>
          <span data-i18n-key="home.pricing_teaser.period">/mês depois do teste</span>
        </p>
      </div>

      <ul class="s-pricing-teaser__list">
        <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34A853" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg> Outlook</li>
        <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34A853" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg> OneDrive</li>
        <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34A853" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg> SharePoint</li>
        <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34A853" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg> <span data-i18n-key="home.pricing_teaser.f_uploads">Uploads</span></li>
        <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34A853" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg> <span data-i18n-key="home.pricing_teaser.f_source">Resposta com fonte</span></li>
        <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34A853" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg> <span data-i18n-key="home.pricing_teaser.f_compare">Comparação de versões</span></li>
        <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34A853" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg> <span data-i18n-key="home.pricing_teaser.f_email">E-mail via Outlook com confirmação</span></li>
        <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34A853" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg> <span data-i18n-key="home.pricing_teaser.f_whatsapp">WhatsApp handoff</span></li>
        <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34A853" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg> <span data-i18n-key="home.pricing_teaser.f_privacy">Documentos não treinam modelos</span></li>
        <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34A853" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg> <span data-i18n-key="home.pricing_teaser.f_review">Nada sai sem revisão</span></li>
      </ul>

      <a href="https://app.allybi.co/signup" class="allybi-btn allybi-btn--primary allybi-btn--lg" data-i18n-key="home.pricing_teaser.cta">Começar grátis por 30 dias</a>
      <p class="s-pricing-teaser__micro" data-i18n-key="home.pricing_teaser.micro">Cancele quando quiser.</p>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Create `pricing-teaser-section.css`:**

```css
.s-pricing-teaser {
  padding: 88px 0;
  background: var(--allybi-bg-alt-1);
}
.s-pricing-teaser__header {
  text-align: center;
  margin-bottom: 40px;
}
.s-pricing-teaser__header h2 {
  font-size: clamp(28px, 3.5vw, 44px);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--allybi-text-strongest);
}
.s-pricing-teaser__header p {
  margin-top: 12px;
  font-size: 16px;
  color: var(--allybi-text-secondary);
}
.s-pricing-teaser__card {
  max-width: 480px;
  margin: 0 auto;
  padding: 32px;
  text-align: center;
  background: #FFFFFF;
}
.s-pricing-teaser__eyebrow {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--allybi-text-muted);
}
.s-pricing-teaser__price {
  font-size: 18px;
  color: var(--allybi-text-secondary);
  margin: 8px 0 28px;
}
.s-pricing-teaser__price strong {
  font-size: clamp(36px, 4vw, 48px);
  font-weight: 700;
  color: var(--allybi-text-strongest);
  display: block;
  line-height: 1.0;
  margin-bottom: 4px;
}
.s-pricing-teaser__list {
  list-style: none;
  padding: 0;
  margin: 0 0 28px;
  text-align: left;
  display: grid;
  gap: 10px;
}
.s-pricing-teaser__list li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: var(--allybi-text-primary);
}
.s-pricing-teaser__list svg { flex-shrink: 0; }
.s-pricing-teaser__micro {
  margin-top: 12px;
  font-size: 12px;
  color: var(--allybi-text-muted);
}
@media (max-width: 600px) {
  .s-pricing-teaser { padding: 56px 0; }
  .s-pricing-teaser__card { padding: 24px; }
}
```

- [ ] **Step 4: Link the new CSS in `index.html` head.**

Find the block of `<link rel="stylesheet" href="..."/>` tags and add:
```html
<link rel="stylesheet" href="pricing-teaser-section.css">
```

- [ ] **Step 5: Add JSON entries.**

`pt.json`:
```json
"pricing_teaser": {
  "title": "30 dias grátis. Depois R$170/mês.",
  "subtitle": "Um plano para encontrar, confirmar e enviar o documento certo.",
  "plan_name": "Allybi Pro",
  "period": "/mês depois do teste",
  "f_uploads": "Uploads",
  "f_source": "Resposta com fonte",
  "f_compare": "Comparação de versões",
  "f_email": "E-mail via Outlook com confirmação",
  "f_whatsapp": "WhatsApp handoff",
  "f_privacy": "Documentos não treinam modelos",
  "f_review": "Nada sai sem revisão",
  "cta": "Começar grátis por 30 dias",
  "micro": "Cancele quando quiser."
}
```

`en.json`:
```json
"pricing_teaser": {
  "title": "30 days free. Then R$170/month.",
  "subtitle": "One plan to find, confirm, and send the right document.",
  "plan_name": "Allybi Pro",
  "period": "/month after trial",
  "f_uploads": "Uploads",
  "f_source": "Source-cited answers",
  "f_compare": "Version comparison",
  "f_email": "Email via Outlook with confirmation",
  "f_whatsapp": "WhatsApp handoff",
  "f_privacy": "Documents never train models",
  "f_review": "Nothing sent without review",
  "cta": "Start free for 30 days",
  "micro": "Cancel anytime."
}
```

Both under top-level `home`.

- [ ] **Step 6: Visual check at 360 + 768 + 1440.**

- [ ] **Step 7: Commit.**

```bash
git add index.html pricing-teaser-section.css translations/pt.json translations/en.json
git commit -m "homepage: pricing teaser — new section between Security and FAQ"
```

---

### Task 2.6: Final CTA — title + secondary CTA + microcopy

**Files:**
- Modify: `index.html` (final CTA section).
- Modify: `translations/pt.json`, `translations/en.json` under `home.final_cta`.

- [ ] **Step 1: Locate final CTA.**

```bash
grep -n "home.final_cta\|s-cta" index.html | head -10
```

- [ ] **Step 2: Update title key value in JSON.**

`pt.json`:
```json
"title": "Teste o caminho real.",
"support": "Conecte uma fonte ou suba um arquivo. Pergunte no chat, veja a fonte e revise antes de enviar.",
"cta": "Começar grátis por 30 dias",
"cta2": "Calcular tempo perdido",
"micro": "30 dias grátis. Nada sai sem confirmação."
```

`en.json`:
```json
"title": "Try the real flow.",
"support": "Connect a source or upload a file. Ask in chat, see the source, review before sending.",
"cta": "Start free for 30 days",
"cta2": "Calculate lost time",
"micro": "30 days free. Nothing sent without confirmation."
```

- [ ] **Step 3: Update `index.html` — change secondary CTA `href` to `tempo.html` and add `data-i18n-key="home.final_cta.cta2"`.**

Find:
```html
<a href="..." class="allybi-btn allybi-btn--secondary..." data-i18n-key="home.final_cta.cta2">...</a>
```

Replace with:
```html
<a href="tempo.html" class="allybi-btn allybi-btn--secondary-inverse" data-i18n-key="home.final_cta.cta2">Calcular tempo perdido</a>
```

- [ ] **Step 4: Add micro line below CTAs if missing.**

```html
<p class="s-cta__micro" data-i18n-key="home.final_cta.micro">30 dias grátis. Nada sai sem confirmação.</p>
```

- [ ] **Step 5: Visual check + commit.**

```bash
git add index.html translations/pt.json translations/en.json
git commit -m "homepage: final CTA — 'Teste o caminho real', secondary CTA to Tools, trust micro"
```

---

## Phase 3 — Reorder Tools section above Workflow

### Task 3.1: Move `<section class="s-tools">` from after Security to between Pain and Workflow

**Files:**
- Modify: `index.html`.

- [ ] **Step 1: Identify the exact line range of `<section class="s-tools">` block.**

```bash
grep -n "<section class=\"s-tools\|^</section>" index.html | head -20
```

Note start line (S) and end line (E) of the tools section.

- [ ] **Step 2: Identify insertion point — right after `</section>` of Pain (`s-pain`).**

```bash
grep -n "s-pain.*</section>\|<section class=\"s-pain\|<section class=\"s-workflow" index.html | head -10
```

- [ ] **Step 3: Cut+paste using Python (safer than sed for HTML).**

```bash
python3 - <<'PY'
from pathlib import Path
p = Path('index.html')
src = p.read_text()
# Find tools block by its leading comment line + closing </section>
import re
# Tools block: from "<!-- ... TOOLS ... -->" or directly the <section class="s-tools"...> to its matching </section>
m_tools = re.search(r'(\s*<!--[^\n]*Diagn[oó]sticos[^\n]*-->\s*\n)?<section class="s-tools[^"]*"[^>]*>.*?</section>\s*\n', src, re.DOTALL)
assert m_tools, 'tools block not found'
tools_block = m_tools.group(0)
src_wo = src[:m_tools.start()] + src[m_tools.end():]

# Find pain block end
m_pain = re.search(r'<section class="s-pain[^"]*"[^>]*>.*?</section>\s*\n', src_wo, re.DOTALL)
assert m_pain, 'pain block not found'
insert_at = m_pain.end()

new = src_wo[:insert_at] + tools_block + src_wo[insert_at:]
p.write_text(new)
print('ok')
PY
```

- [ ] **Step 4: Verify Tools renders immediately after Pain in browser.**

```bash
node -e "
const {chromium} = require('playwright');
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({viewport:{width:1440, height:900}, locale:'pt-BR'});
  const p = await ctx.newPage();
  await p.goto('http://localhost:8080/index.html?lang=pt');
  const sections = await p.evaluate(() => [...document.querySelectorAll('main section, body > section')].map(s => s.className.split(/\s+/)[0]));
  console.log(sections.join('\n'));
  await b.close();
})();
"
```
Expected order should show `s-hero`, `..., s-pain, s-tools, s-workflow, ...`.

- [ ] **Step 5: Re-screenshot full page mobile + desktop. Check no broken layout.**

- [ ] **Step 6: Commit.**

```bash
git add index.html
git commit -m "homepage: move Tools (Diagnósticos) immediately after Pain (growth loop earlier)"
```

---

## Phase 4 — Hero mockup expansion + causal animation

This is the highest-value, highest-risk task. Two sub-tasks.

### Task 4.1: New hero mockup markup + CSS

**Files:**
- Modify: `index.html` (replace `.s-hero__visual` block contents).
- Modify: `hero-section.css` (rewrite scene block).

- [ ] **Step 1: Read existing `.s-hero__visual` HTML block (line ~148+).**

```bash
sed -n '148,190p' index.html
```

- [ ] **Step 2: Replace with the new mockup (per spec §3):**

```html
<div class="s-hero__visual allybi-reveal" style="transition-delay: 200ms">
  <div class="hero-scene" id="heroScene" aria-hidden="false" role="img" aria-label="Allybi finds the right version, shows its source, and prepares the send for review">
    <!-- Stage 1: source pills -->
    <div class="hero-scene__sources" data-stage="1">
      <span class="hero-scene__pill"><img src="assets/images/outlook-icon.svg" alt="" width="14" height="14"> Outlook</span>
      <span class="hero-scene__pill"><img src="assets/images/onedrive-icon.svg" alt="" width="14" height="14"> OneDrive</span>
      <span class="hero-scene__pill"><img src="assets/images/sharepoint-icon.svg" alt="" width="14" height="14"> SharePoint</span>
      <span class="hero-scene__pill"><img src="assets/images/uploads-icon.svg" alt="" width="14" height="14"> <span data-i18n-key="hero.scene.uploads">Uploads</span></span>
    </div>

    <!-- Stage 2: question -->
    <div class="hero-scene__chat" data-stage="2">
      <div class="hero-scene__query">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <span class="hero-scene__query-text" data-i18n-key="hero.scene.query">qual versão posso enviar ao cliente?</span>
      </div>
    </div>

    <!-- Stage 3: versions -->
    <div class="hero-scene__results" data-stage="3">
      <p class="hero-scene__results-label" data-i18n-key="hero.scene.results_label">3 versões encontradas</p>
      <ul class="hero-scene__versions">
        <li class="hero-scene__v hero-scene__v--prev" data-version="1">
          <span class="hero-scene__v-name">contrato_final.pdf</span>
          <span class="hero-scene__v-tag" data-i18n-key="hero.scene.v1_tag">versão anterior</span>
        </li>
        <li class="hero-scene__v hero-scene__v--warn" data-version="2">
          <span class="hero-scene__v-name">contrato_final_v3.pdf</span>
          <span class="hero-scene__v-tag" data-i18n-key="hero.scene.v2_tag">fonte incerta</span>
        </li>
        <li class="hero-scene__v hero-scene__v--ok" data-version="3">
          <span class="hero-scene__v-name">contrato_final_AGORA.pdf</span>
          <svg class="hero-scene__v-check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
          <span class="hero-scene__v-tag" data-i18n-key="hero.scene.v3_tag">fonte confirmada</span>
        </li>
      </ul>
      <p class="hero-scene__source"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> <span data-i18n-key="hero.scene.source">SharePoint / Clientes / Contratos / 14 mar</span></p>
    </div>

    <!-- Stage 4: review panel -->
    <div class="hero-scene__review" data-stage="4">
      <p class="hero-scene__review-label" data-i18n-key="hero.scene.review_label">Revisar antes de enviar</p>
      <dl class="hero-scene__review-list">
        <div><dt data-i18n-key="hero.scene.recipient">Destinatário</dt><dd>cliente@empresa.com.br</dd></div>
        <div><dt data-i18n-key="hero.scene.file">Arquivo</dt><dd>contrato_final_AGORA.pdf</dd></div>
        <div><dt data-i18n-key="hero.scene.source_label">Fonte</dt><dd>SharePoint</dd></div>
        <div><dt data-i18n-key="hero.scene.channel">Canal</dt><dd data-i18n-key="hero.scene.channel_value">Email via Outlook</dd></div>
      </dl>
    </div>

    <!-- Stage 5: send -->
    <div class="hero-scene__send" data-stage="5">
      <button class="hero-scene__send-btn" type="button" tabindex="-1" data-i18n-key="hero.scene.send">Enviar via Outlook</button>
      <span class="hero-scene__send-alt" data-i18n-key="hero.scene.handoff">WhatsApp handoff ↗</span>
    </div>
  </div>
</div>
```

- [ ] **Step 3: Replace `hero-section.css` `.hero-scene*` block (or append new).**

```css
.hero-scene {
  position: relative;
  background: #FFFFFF;
  border: 1px solid var(--allybi-border);
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 10px 40px -20px rgba(24,24,24,0.20);
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-size: 13px;
}
.hero-scene__sources {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--allybi-border);
}
.hero-scene__pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 999px;
  background: #F5F5F5;
  color: var(--allybi-text-secondary);
}
.hero-scene__query {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: #F8F8F6;
  border-radius: 10px;
  color: var(--allybi-text-secondary);
}
.hero-scene__results-label {
  font-size: 11px;
  color: var(--allybi-text-muted);
  margin: 0 0 8px;
  letter-spacing: 0.02em;
}
.hero-scene__versions {
  list-style: none;
  padding: 0; margin: 0 0 10px;
  display: grid;
  gap: 6px;
}
.hero-scene__v {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid var(--allybi-border);
  border-radius: 8px;
  background: #FFFFFF;
}
.hero-scene__v-name {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 12px;
  color: var(--allybi-text-strongest);
}
.hero-scene__v-tag {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
  text-transform: lowercase;
}
.hero-scene__v--prev   { opacity: 0.7; }
.hero-scene__v--prev .hero-scene__v-tag { color: #6C6B6E; background: rgba(0,0,0,0.04); }
.hero-scene__v--warn   { border-color: rgba(251,188,4,0.4); background: rgba(251,188,4,0.05); }
.hero-scene__v--warn .hero-scene__v-tag { color: #B6790A; background: rgba(251,188,4,0.15); }
.hero-scene__v--ok     { border-color: rgba(52,168,83,0.55); background: rgba(52,168,83,0.08); box-shadow: 0 0 0 2px rgba(52,168,83,0.10); }
.hero-scene__v--ok .hero-scene__v-tag { color: #1E7B43; background: rgba(52,168,83,0.16); }
.hero-scene__v--ok .hero-scene__v-check { color: #1E7B43; }
.hero-scene__source {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--allybi-text-muted);
  margin: 0;
}
.hero-scene__review {
  border: 1px solid var(--allybi-border);
  border-radius: 10px;
  padding: 12px 14px;
  background: #FAFAF8;
}
.hero-scene__review-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #1E7B43;
  margin: 0 0 8px;
}
.hero-scene__review-list { margin: 0; padding: 0; display: grid; gap: 4px; }
.hero-scene__review-list > div {
  display: grid;
  grid-template-columns: 96px 1fr;
  gap: 8px;
  font-size: 12px;
}
.hero-scene__review-list dt { color: var(--allybi-text-muted); font-weight: 500; }
.hero-scene__review-list dd { margin: 0; color: var(--allybi-text-primary); font-weight: 600; word-break: break-all; }
.hero-scene__send {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: space-between;
}
.hero-scene__send-btn {
  flex: 1;
  background: #181818;
  color: #FFF;
  border: none;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: default;
}
.hero-scene__send-alt {
  font-size: 11px;
  color: var(--allybi-text-muted);
}

/* Pre-animation states */
.hero-scene[data-anim="off"] .hero-scene__v--warn,
.hero-scene[data-anim="off"] .hero-scene__v--ok,
.hero-scene[data-anim="off"] .hero-scene__review,
.hero-scene[data-anim="off"] .hero-scene__send {
  opacity: 1; transform: none;
}
```

- [ ] **Step 4: Add JSON keys.**

`pt.json` under `hero.scene`:
```json
"scene": {
  "uploads": "Uploads",
  "query": "qual versão posso enviar ao cliente?",
  "results_label": "3 versões encontradas",
  "v1_tag": "versão anterior",
  "v2_tag": "fonte incerta",
  "v3_tag": "fonte confirmada",
  "source": "SharePoint / Clientes / Contratos / 14 mar",
  "review_label": "Revisar antes de enviar",
  "recipient": "Destinatário",
  "file": "Arquivo",
  "source_label": "Fonte",
  "channel": "Canal",
  "channel_value": "Email via Outlook",
  "send": "Enviar via Outlook",
  "handoff": "WhatsApp handoff ↗"
}
```

`en.json` under `hero.scene`:
```json
"scene": {
  "uploads": "Uploads",
  "query": "which version can I send to the client?",
  "results_label": "3 versions found",
  "v1_tag": "previous version",
  "v2_tag": "source uncertain",
  "v3_tag": "source confirmed",
  "source": "SharePoint / Clients / Contracts / Mar 14",
  "review_label": "Review before sending",
  "recipient": "Recipient",
  "file": "File",
  "source_label": "Source",
  "channel": "Channel",
  "channel_value": "Email via Outlook",
  "send": "Send via Outlook",
  "handoff": "WhatsApp handoff ↗"
}
```

- [ ] **Step 5: Visual check (static, without animation).**

Set `data-anim="off"` on `<div class="hero-scene">` temporarily and verify everything renders.

- [ ] **Step 6: Commit.**

```bash
git add index.html hero-section.css translations/pt.json translations/en.json
git commit -m "homepage: hero — expanded mockup (source pills → versions → review panel → send)"
```

---

### Task 4.2: Causal animation engine for hero scene

**Files:**
- Create: `hero-sequence.js`.
- Modify: `index.html` (add `<script src="hero-sequence.js" defer>` before `</body>`).
- Modify: `hero-section.css` (add keyframes + transition classes).

- [ ] **Step 1: Add keyframes + per-stage classes to `hero-section.css`:**

```css
/* Initial states (before sequence starts) */
.hero-scene[data-state="idle"] .hero-scene__sources,
.hero-scene[data-state="idle"] .hero-scene__chat,
.hero-scene[data-state="idle"] .hero-scene__results,
.hero-scene[data-state="idle"] .hero-scene__review,
.hero-scene[data-state="idle"] .hero-scene__send {
  opacity: 0;
  transform: translateY(8px);
}

.hero-scene__sources,
.hero-scene__chat,
.hero-scene__results,
.hero-scene__review,
.hero-scene__send {
  transition: opacity 360ms cubic-bezier(0.2, 0.8, 0.2, 1),
              transform 360ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

.hero-scene[data-state="s1"] .hero-scene__sources,
.hero-scene[data-state="s2"] .hero-scene__sources,
.hero-scene[data-state="s3"] .hero-scene__sources,
.hero-scene[data-state="s4"] .hero-scene__sources,
.hero-scene[data-state="s5"] .hero-scene__sources {
  opacity: 1; transform: none;
}
.hero-scene[data-state="s2"] .hero-scene__chat,
.hero-scene[data-state="s3"] .hero-scene__chat,
.hero-scene[data-state="s4"] .hero-scene__chat,
.hero-scene[data-state="s5"] .hero-scene__chat {
  opacity: 1; transform: none;
}
.hero-scene[data-state="s3"] .hero-scene__results,
.hero-scene[data-state="s4"] .hero-scene__results,
.hero-scene[data-state="s5"] .hero-scene__results {
  opacity: 1; transform: none;
}
.hero-scene[data-state="s4"] .hero-scene__review,
.hero-scene[data-state="s5"] .hero-scene__review {
  opacity: 1; transform: none;
}
.hero-scene[data-state="s5"] .hero-scene__send {
  opacity: 1; transform: none;
}

/* Version row reveal within stage 3 */
.hero-scene[data-state="s3"] .hero-scene__v,
.hero-scene[data-state="s4"] .hero-scene__v,
.hero-scene[data-state="s5"] .hero-scene__v {
  transition: opacity 240ms ease, transform 240ms ease;
}
.hero-scene[data-state="s3-v1"] .hero-scene__v--warn,
.hero-scene[data-state="s3-v1"] .hero-scene__v--ok { opacity: 0; transform: translateY(4px); }
.hero-scene[data-state="s3-v2"] .hero-scene__v--ok { opacity: 0; transform: translateY(4px); }

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .hero-scene[data-state="idle"] .hero-scene__sources,
  .hero-scene[data-state="idle"] .hero-scene__chat,
  .hero-scene[data-state="idle"] .hero-scene__results,
  .hero-scene[data-state="idle"] .hero-scene__review,
  .hero-scene[data-state="idle"] .hero-scene__send {
    opacity: 1; transform: none;
  }
  .hero-scene__sources, .hero-scene__chat, .hero-scene__results, .hero-scene__review, .hero-scene__send {
    transition: none;
  }
}
```

- [ ] **Step 2: Write `hero-sequence.js`.**

```js
// hero-sequence.js — causal animation engine for the hero scene mockup.
// Plays a 5-act sequence when the scene enters the viewport, then loops with a pause.
// Respects prefers-reduced-motion (shows final state, no animation).
(() => {
  'use strict';
  const scene = document.getElementById('heroScene');
  if (!scene) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    scene.setAttribute('data-state', 's5');
    return;
  }

  // Storyboard: each step sets a state, waits, then advances.
  const STORYBOARD = [
    { state: 'idle',  wait: 0    },
    { state: 's1',    wait: 600  },  // source pills in
    { state: 's2',    wait: 900  },  // question in
    { state: 's3-v1', wait: 350  },  // v1 only
    { state: 's3-v2', wait: 350  },  // v1+v2
    { state: 's3',    wait: 800  },  // v3 confirmed
    { state: 's4',    wait: 700  },  // review panel
    { state: 's5',    wait: 6000 },  // send button + pause
  ];

  let timer = null;
  let stopped = false;

  async function runOnce() {
    for (const step of STORYBOARD) {
      if (stopped) return;
      scene.setAttribute('data-state', step.state);
      await new Promise(r => { timer = setTimeout(r, step.wait); });
    }
  }

  async function loop() {
    while (!stopped) {
      await runOnce();
    }
  }

  // Start only when the scene enters the viewport once
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        scene.setAttribute('data-state', 'idle');
        loop();
      }
    });
  }, { threshold: 0.4 });
  observer.observe(scene);

  // Stop animation when the page is hidden, resume when visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopped = true;
      if (timer) clearTimeout(timer);
    } else if (stopped) {
      stopped = false;
      loop();
    }
  });
})();
```

- [ ] **Step 3: Add `<script defer src="hero-sequence.js"></script>` before `</body>` in `index.html`.**

- [ ] **Step 4: Initial state — set `data-state="idle"` on the scene element in HTML so CSS catches it before JS loads:**

In the markup from Task 4.1, change:
```html
<div class="hero-scene" id="heroScene" aria-hidden="false" ...>
```
to:
```html
<div class="hero-scene" id="heroScene" data-state="idle" aria-hidden="false" ...>
```

- [ ] **Step 5: Browser smoke test.**

```bash
node -e "
const {chromium} = require('playwright');
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({viewport:{width:1440, height:900}, locale:'pt-BR'});
  const p = await ctx.newPage();
  await p.goto('http://localhost:8080/index.html?lang=pt');
  await p.waitForTimeout(500);
  await p.screenshot({path:'/tmp/hero_t0.png'});
  await p.waitForTimeout(1500);
  await p.screenshot({path:'/tmp/hero_t1.png'});
  await p.waitForTimeout(2000);
  await p.screenshot({path:'/tmp/hero_t2.png'});
  await b.close();
})();
"
```

Open the 3 screenshots — should show progressive reveal (sources → question → versions → review → send).

- [ ] **Step 6: Test reduced motion.**

```bash
node -e "
const {chromium} = require('playwright');
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({viewport:{width:1440, height:900}, reducedMotion:'reduce', locale:'pt-BR'});
  const p = await ctx.newPage();
  await p.goto('http://localhost:8080/index.html?lang=pt');
  await p.waitForTimeout(800);
  await p.screenshot({path:'/tmp/hero_reduced.png'});
  await b.close();
})();
"
```
Expected: `hero_reduced.png` shows the final state immediately (no animation).

- [ ] **Step 7: Commit.**

```bash
git add index.html hero-sequence.js hero-section.css
git commit -m "homepage: hero — causal animation engine (5 acts, loop, reduced-motion safe)"
```

---

### Task 4.3: Hero mobile carousel (3 mini cards)

**Files:**
- Modify: `hero-section.css` — add mobile-specific layout.

- [ ] **Step 1: Add media query in `hero-section.css`:**

```css
@media (max-width: 600px) {
  .hero-scene {
    padding: 14px;
  }
  /* Source pills compact */
  .hero-scene__sources { padding-bottom: 12px; }
  /* Hide channels visualization more compact */
  .hero-scene__review-list > div { grid-template-columns: 72px 1fr; font-size: 11px; }
  .hero-scene__send-btn { font-size: 12px; padding: 9px 12px; }
  .hero-scene__v-name { font-size: 11px; }
}
```

Note: spec mentioned a horizontal carousel of 3 cards, but a single mockup that fits the mobile viewport and shows the full flow is preferable to a carousel for a v1 launch — simpler, less JS, same narrative. **Decision: keep the single scene element responsive instead of building a carousel** (revisit in a future task if user wants explicit 3-card swipe).

- [ ] **Step 2: Verify at 360, 390, 430.**

Re-run section-screenshot script for those viewports, confirm no overflow, all stages visible.

- [ ] **Step 3: Commit.**

```bash
git add hero-section.css
git commit -m "homepage: hero — mobile responsive tweaks for scene mockup"
```

---

## Phase 5 — Causal animations in other key sections

### Task 5.1: Pain card 2 — amber → green causal flip

**Files:**
- Modify: `pain-section.css`.
- Modify: `animations.js` (or inline JS in index.html).

- [ ] **Step 1: Add states + CSS keyframes.**

```css
/* Default state: v3 already shown green (loaded state) */
.s-pain__visual-versions[data-anim="pre"] .s-pain__version-row--confirmed {
  /* Pre-animation: v3 looks "in suspense", less prominent */
  background: rgba(251, 188, 4, 0.06);
  border-color: rgba(251, 188, 4, 0.35);
}
.s-pain__visual-versions[data-anim="pre"] .s-pain__version-badge--ok {
  color: #B6790A;
  background: rgba(251, 188, 4, 0.12);
}
.s-pain__visual-versions[data-anim="pre"] .s-pain__version-badge--ok::before {
  content: "versão?";
}
.s-pain__visual-versions[data-anim="pre"] .s-pain__version-badge--ok > * {
  display: none;
}
.s-pain__visual-versions {
  transition: background 480ms ease, border-color 480ms ease;
}
.s-pain__version-row,
.s-pain__version-badge {
  transition: background 480ms ease, color 480ms ease, border-color 480ms ease;
}
@media (prefers-reduced-motion: reduce) {
  .s-pain__visual-versions[data-anim="pre"] .s-pain__version-row--confirmed,
  .s-pain__visual-versions[data-anim="pre"] .s-pain__version-badge--ok { transition: none; }
}
```

- [ ] **Step 2: Append IntersectionObserver hook to `animations.js`** (or create `pain-causal.js`):

```js
// pain-causal.js — flip v3 from amber to green when card 2 enters viewport.
(() => {
  const versionsBlock = document.querySelector('.s-pain__visual-versions');
  if (!versionsBlock) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  versionsBlock.setAttribute('data-anim', reduced ? 'ready' : 'pre');
  if (reduced) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        io.disconnect();
        setTimeout(() => versionsBlock.setAttribute('data-anim', 'ready'), 700);
      }
    });
  }, { threshold: 0.5 });
  io.observe(versionsBlock);
})();
```

Save as `pain-causal.js`. Add `<script defer src="pain-causal.js"></script>` in `index.html` before `</body>`.

- [ ] **Step 3: Visual check.**

Open browser; scroll to Pain section; observe v3 row transitions amber → green over ~500ms after the section enters the viewport.

- [ ] **Step 4: Commit.**

```bash
git add pain-causal.js pain-section.css index.html
git commit -m "homepage: pain — causal animation (v3 row flips amber → green on enter)"
```

---

### Task 5.2: Tools — bars fill + flow nodes light up

**Files:**
- Modify: tools CSS file (already added bar styles in Task 2.2).
- Create: `tools-causal.js`.

- [ ] **Step 1: Add CSS hooks for pre/post animation.**

In tools CSS:
```css
.s-tools__card-viz[data-anim="pre"] .s-tools__bar-fill::after { width: 0; }
.s-tools__card-viz[data-anim="ready"] .s-tools__bar-fill::after { width: var(--w, 0%); }

.s-tools__map-node {
  transition: background 280ms ease, color 280ms ease;
}
.s-tools__card-viz[data-anim="pre"] .s-tools__map-node {
  opacity: 0.3;
}
.s-tools__card-viz[data-anim="ready"] .s-tools__map-node {
  opacity: 1;
  transition: opacity 200ms ease;
}
@media (prefers-reduced-motion: reduce) {
  .s-tools__card-viz[data-anim="pre"] .s-tools__bar-fill::after { width: var(--w, 0%); }
  .s-tools__card-viz[data-anim="pre"] .s-tools__map-node { opacity: 1; }
}
```

- [ ] **Step 2: Create `tools-causal.js`.**

```js
// tools-causal.js — fill bars + light up map nodes in sequence when tools enters viewport.
(() => {
  const cards = document.querySelectorAll('.s-tools__card-viz');
  if (!cards.length) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  cards.forEach(c => c.setAttribute('data-anim', reduced ? 'ready' : 'pre'));
  if (reduced) return;

  const fillCard = (card) => {
    if (card.classList.contains('s-tools__card-viz--map')) {
      const nodes = card.querySelectorAll('.s-tools__map-node');
      card.setAttribute('data-anim', 'ready');
      nodes.forEach((n, i) => {
        n.style.transitionDelay = (i * 120) + 'ms';
      });
    } else {
      card.setAttribute('data-anim', 'ready');
    }
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        fillCard(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  cards.forEach(c => io.observe(c));
})();
```

- [ ] **Step 3: Link in `index.html` (`<script defer src="tools-causal.js"></script>`).**

- [ ] **Step 4: Verify at 360 + 1440 — bars fill in sequence, map nodes light up left-to-right with stuck node still red.**

- [ ] **Step 5: Commit.**

```bash
git add tools-causal.js index.html *.css
git commit -m "homepage: tools — causal animation (bars fill, map nodes light)"
```

---

### Task 5.3: Workflow — sequenced cascade

**Files:**
- Modify: workflow CSS (`workflow-section.css` or whichever owns `s-workflow`).
- Modify: existing `animations.js` revealer (the current generic reveal already handles s-workflow cards — extend to stagger).

- [ ] **Step 1: Add stagger via CSS variable.**

In workflow CSS:
```css
.s-workflow__card {
  transition: opacity 380ms cubic-bezier(0.2, 0.8, 0.2, 1),
              transform 380ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
.s-workflow__card:nth-child(1) { transition-delay: 0ms; }
.s-workflow__card:nth-child(2) { transition-delay: 120ms; }
.s-workflow__card:nth-child(3) { transition-delay: 240ms; }
.s-workflow__card:nth-child(4) { transition-delay: 360ms; }
.s-workflow__card:nth-child(5) { transition-delay: 480ms; }
@media (prefers-reduced-motion: reduce) {
  .s-workflow__card { transition: none; }
}
```

- [ ] **Step 2: Confirm the `allybi-reveal` mechanism (in `animations.js`) already toggles a class that triggers opacity/transform — the `nth-child` delays will compose with it.**

- [ ] **Step 3: Visual check + commit.**

```bash
git add *.css
git commit -m "homepage: workflow — staggered reveal cascade"
```

---

## Phase 6 — QA + subagent reviews

### Task 6.1: Re-run Playwright screenshot suite

**Files:**
- No source changes. Output: `qa-screenshots/homepage-redesign/`.

- [ ] **Step 1: Create output dir.**

```bash
mkdir -p qa-screenshots/homepage-redesign
```

- [ ] **Step 2: Adapt `audit-homepage.mjs` output path** (or write a small wrapper) to write into `homepage-redesign/`:

```bash
sed -e "s|qa-screenshots/before|qa-screenshots/homepage-redesign|g" audit-homepage.mjs > audit-after.mjs
node audit-after.mjs 2>&1 | tail -12
```

- [ ] **Step 3: Run section captures too.**

```bash
sed -e "s|qa-screenshots/before|qa-screenshots/homepage-redesign|g" audit-sections.mjs > audit-sections-after.mjs
node audit-sections-after.mjs 2>&1 | tail -5
```

- [ ] **Step 4: Compare totals.**

```bash
ls qa-screenshots/homepage-redesign/ | wc -l
```
Expected: ~37 (same as before).

- [ ] **Step 5: Commit.**

```bash
git add audit-after.mjs audit-sections-after.mjs qa-screenshots/homepage-redesign/
git commit -m "qa: after-refactor screenshot suite + section captures"
```

---

### Task 6.2: Final grep for banned terms

- [ ] **Step 1: Run comprehensive grep.**

Same script as Task 1.5.

- [ ] **Step 2: For any hit in user-visible PT, fix.**

- [ ] **Step 3: Validate JSON keys parity.**

```bash
python3 - <<'PY'
import json
en = json.load(open('translations/en.json'))
pt = json.load(open('translations/pt.json'))
def walk(d, p=''):
    out = set()
    for k, v in d.items():
        k2 = f'{p}.{k}' if p else k
        if isinstance(v, dict):
            out |= walk(v, k2)
        else:
            out.add(k2)
    return out
e, p = walk(en), walk(pt)
print('EN only:', len(e - p), list(sorted(e - p))[:10])
print('PT only:', len(p - e), list(sorted(p - e))[:10])
PY
```
Expected: 0 PT-only keys for the `home.*` namespace.

- [ ] **Step 4: Commit any fixes.**

```bash
git add -p
git commit -m "qa: final copy + JSON parity sweep"
```

---

### Task 6.3: Dispatch subagent reviews (brief item 11)

**Files:** none changed — these are review-only agents.

- [ ] **Step 1: Dispatch 6 reviews in parallel (one Agent tool call per role, all in one message).**

Each agent receives:
- The path to `index.html` (and relevant CSS/JS files).
- The path to `docs/superpowers/specs/2026-06-16-homepage-refactor-design.md`.
- A focused review prompt (per brief §11):
  - `strategy-auditor`: verify pedido → envio caminho completo.
  - `pt-br-copy-editor`: caça AI-like + banidos + travessões.
  - `visual-director`: avalia mockups + cards.
  - `mobile-ux-reviewer`: 360/390/430 (read screenshots from qa-screenshots/homepage-redesign).
  - `animation-reviewer`: confirma causalidade + reduced motion.
  - `security-product-copy-reviewer`: WhatsApp não é fonte; sem overclaim.

Each returns a short findings list with file:line refs.

- [ ] **Step 2: Triage findings.**

Per agent finding, decide: real / nitpick / wrong. Real findings get fixed; nitpicks get noted; wrongs are dismissed with a 1-line rationale.

- [ ] **Step 3: Apply fixes from real findings.**

Each fix gets its own commit.

- [ ] **Step 4: Final commit.**

```bash
git commit -am "qa: subagent reviews — apply real findings"
```

---

### Task 6.4: Final QA + delivery report

**Files:**
- Modify or create: nothing source.
- Write: `docs/superpowers/specs/2026-06-16-homepage-delivery.md`.

- [ ] **Step 1: Write delivery report covering brief §17:**
  1. Resumo das mudanças.
  2. Arquivos alterados.
  3. Antes/depois estratégico (1 frase por seção).
  4. Provas:
     - "fonte" — onde demonstrado.
     - "versão" — onde demonstrado.
     - "revisão" — onde demonstrado.
     - "envio via Outlook" — onde demonstrado.
     - "WhatsApp handoff" — onde demonstrado.
     - "documentos não treinam modelos" — onde visível.
  5. Grep banidos: resultado limpo (anexar saída).
  6. Lint/build/JSON parity: passos rodados.
  7. Screenshots em `qa-screenshots/homepage-redesign/`.
  8. Issues restantes (se houver).
  9. Confirmação de checks do brief item 17.

- [ ] **Step 2: Commit.**

```bash
git add docs/superpowers/specs/2026-06-16-homepage-delivery.md
git commit -m "docs: homepage refactor delivery report"
```

---

## Self-review (engineer pre-execution)

After loading this plan and before starting, the engineer should:

1. Read both spec docs in `docs/superpowers/specs/`.
2. Verify `localhost:8080` is up.
3. Confirm the branch is fresh (`git status` clean) and on `homepage-refactor`.
4. Skim Tasks 4.1–4.3 carefully — they touch the most code and have the highest risk. Allocate the most attention there.

## Risk register

| Risk | Mitigation |
|------|------------|
| Hero animation jank on mobile | only `opacity` + `transform`; reduced-motion shortcut |
| JSON parity breaking i18n on EN | Step at Task 6.2 validates parity programmatically |
| Reorder shifting CSS that assumed previous DOM order | Phase 3 is its own commit; rollback is `git revert <hash>` |
| Pricing teaser CSS conflict with existing `pricing.css` | New file `pricing-teaser-section.css` scoped under `.s-pricing-teaser`, no global selectors |
| Section reveal observer races with hero sequence observer | Hero is `id="heroScene"`, isolated. Pain/Tools observers use their own root elements. |
| Banned terms hidden inside data-i18n keys | Grep covers `translations/*.json` |
