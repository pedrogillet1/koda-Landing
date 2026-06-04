# Pre-Final Polish Audit — 2026-06-03

## Summary
Comprehensive audit of the Portuguese Allybi site (allybi.com.br) following a previous strategic pass. The site uses an i18n architecture: HTML contains English defaults with `data-i18n-key` attributes, and `translations/pt.json` provides Portuguese translations applied via JavaScript on the .com.br domain.

## Architecture Note
- `index.html` is `lang="en"` with i18n keys — PT text served via `translations/pt.json`
- Most other pages (`metodologia.html`, `diagnostico.html`, `tempo.html`, `pricing.html`, `integrations.html`, etc.) are `lang="pt-BR"` with hardcoded Portuguese content
- The language switcher (`language-switcher.js`) auto-detects domain and applies the correct locale

## Critical Issues Found & Fixed

### 1. PT Translation Fixes (translations/pt.json)
- `hero.title`: "Pergunte aos seus documentos, e-mails e arquivos" → "Pergunte aos documentos e arquivos da empresa." (removed "e-mails" from H1 to prevent line break issues)
- `hero.subtitle`: Updated to include e-mails in sub instead
- `cases.business.tab`: "Negócios" → "Operações"
- `cases.business.cta`: "Ver fluxos de negócios" → "Ver fluxos de operações"
- `home.usecase.tab_business`: "Negócios" → "Operações"
- `nav.for_business`: "Para negócios" → "Para operações"
- `nav.business`: "Negócios" → "Operações"
- `role_business`: "Negócios" → "Operações"
- `proof.title`: "Fluxos de trabalho representativos" → "Momentos em que ninguém quer adivinhar."
- `proof.subtitle`: "Como profissionais usam..." → "Quando existe pressão, arquivo errado vira risco."
- `home.security` section: Replaced 6 cards to match spec (Sem treinamento, Criptografia, Permissões, Workspaces isolados, Confirmação antes do envio, WhatsApp sem caixa sincronizada)
- `home.final_cta.title`: "Comece com uma pergunta real." → "Conecte. Pergunte. Envie com fonte."
- `home.final_cta.support`: Updated to match spec
- `about.hero.title`: "caos ou vigilância" → "acabar com o trabalho escondido entre pedir e enviar"
- `about.hero.subtitle`: Updated to match spec
- ALL "respostas fundamentadas" → "respostas com fonte" (site-wide)
- ALL "Agendar demonstração" → "Começar grátis" (site-wide)
- ALL "Agendar demo" → "Falar com vendas" (site-wide)
- ALL "fase de 30 dias grátis" → "30 dias grátis" (site-wide)
- FAQ pricing answers rewritten to match product truth (no demo required)
- FAQ product Q1 answer simplified
- FAQ file types answer updated to full list
- FAQ integrations answer updated with uploads and WhatsApp handoff clarification
- FAQ CTA subtitle: removed "Agende uma demo" reference

### 2. HTML Fixes
- `how-it-works.html`: Anderson_MSA_v4.pdf → Contrato_Anderson_v4.pdf
- `use-case-legal.html`: Fixed hardcoded English mock text:
  - "What are the non-compete terms" → "Quais são os termos de não concorrência"
  - "Answer with source" → "Resposta com fonte"
  - "50-mile radius" → "80 km"
  - "Review & Open WhatsApp" → "Revisar e abrir WhatsApp"
  - Mock message translated to Portuguese
- `diagnostico.html`: Removed "Drive" from Q2 options (not active)

### 3. Verified Clean (No Action Needed)
- No Manual Search / X-Ray / Cemetery / Raio-X references anywhere
- No busca-manual / finais / cemiterio links
- No app.allybi.com.brm.br anywhere
- No "caca" typo anywhere
- No "Usar no Ask" / "Usar no Upload" anywhere
- No "Koda" in visible code
- No RR$ typo
- No TTF tool references
- No "acesso guiado"
- No "beta" as product stage
- Homepage Operations tab already correct
- Metodologia page fully rewritten per spec
- Integrations page matrices correctly split between fontes and ações
- Pricing page has grouped benefits and supported formats
- Security page CTA matches spec
- Footer/header structure identical across all pages using i18n
- Redirect pages (raio-x.html, busca-manual.html, finais.html) all functional

## Remaining Notes
- `customers.html` still has English defaults for Board_Deck_Q4.pdf and Acme_SOW in HTML, but PT translations correctly use Deck_Conselho_Q4.pdf and Escopo_Cliente_Alfa_v2.docx
- `demo.html` and `request-demo.html` are legacy pages with "Book demo" buttons — these are demo scheduling pages, not part of the main nav
- `es.json` (Spanish translations) still has "fundamentada" references — outside scope of PT pass
- The "negócios" word appears in narrative about text ("profissionais de negócios") which is correct Portuguese for "business professionals"
