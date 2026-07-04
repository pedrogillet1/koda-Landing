# Global header + Mobile menu + Footer rebuild

Scope: every `.html` page in the landing root. No webapp change. No other content modified except adding `id="faq"` to the existing pricing FAQ section so `#pricing.html#faq` resolves.

## 1. Files changed

| File | Type | Change |
| --- | --- | --- |
| `allybi-header.css` | rewrite | Replaced with new `site-header` + `mobile-menu` CSS (desktop ≥1024px sticky 72 px header with 3 dropdowns + 2 top links + Entrar / Começar grátis, <1024 px 64 px header with 2-line hamburger + full-screen white mobile menu). Defensive `display: none !important` block at the end hides any legacy `.allybi-header / #allybi-mobile-menu / .allybi-nav / .mobile-toggle / .header-ctas / .mobile-menu-nav` markup if a stray chunk ever ships. |
| `allybi-footer.css` | rewrite | Replaced with new `site-footer` CSS (mobile 1-col with row dividers; tablet 2×2; desktop 1+4 grid with brand + 4 link groups + bottom row with copyright + legal). Defensive `.allybi-footer { display: none !important; }` at the end. |
| `allybi-header.js` | rewrite | New controller. Desktop dropdowns (click toggle, Escape close, click-outside close, opening one closes the rest). Mobile menu (open / close / Escape close / link-click close / `hashchange` close / `popstate` close, body-scroll lock via `.has-mobile-menu-open` on `html` + `body`, focus moves to close button on open and returns to toggle on close, focus trap with Tab cycle). `aria-current="page"` marker on any header / footer / menu link whose href resolves to the current pathname. |
| 37 × `*.html` | edit | All pages got: old `<header id="allybi-header">…</header>` replaced with the new `<header class="site-header" data-site-header>` block (which now includes both the header AND the mobile-menu overlay). Old `<div id="allybi-mobile-menu">…</div>` removed if found. Old `<footer class="allybi-footer">…</footer>` replaced with the new `<footer class="site-footer">…</footer>`. `<script src="language-switcher.js"></script>` removed (i18n keys gone). 18 pages whose footers had already been partially stripped earlier had the new footer **injected** before `</body>` and any orphan inner blocks (`.footer-mobile-links` / `.footer-bottom` / stray `</footer>`) cleaned up. |
| `pricing.html` | edit | Added `id="faq"` to the existing `.pricing-faq-section` so `/pricing.html#faq` (used in mobile-menu and footer "FAQ" links) resolves. |

## 2. Final markup

**Desktop header (≥1024 px)**

- Logo (42×42) — `href="/"` aria-label="Allybi"
- Centred nav: `Produto ▾`, `Casos de uso ▾`, `Ferramentas ▾`, `Preços`, `Sobre`
- Right actions: `Entrar` (text), `Começar grátis` (pill)

**Mobile header (<1024 px)**

- Logo (38×38) left
- 44×44 round button right, hamburger with exactly two horizontal lines (top + bottom), never morphs into X.

**Mobile menu (full-screen, white)**

Sticky top bar: 38×38 logo + 44×44 close button (SVG with two paths `M6 6L18 18` and `M18 6L6 18`).
Body: four groups, each with a small uppercase title and a stacked list of large `font-weight: 800; font-size: 22 px` links with a trailing `→`. Then a two-button action row (`Começar grátis` solid pill + `Entrar` outlined pill), then the footnote `30 dias grátis. Depois R$170/mês. Cancele quando quiser.`.

**Footer**

Brand (Allybi wordmark + tagline) + 4-column nav (Produto / Casos de uso / Ferramentas / Empresa) + bottom row with copyright + `Termos` / `Privacidade`. Mobile stacks brand → groups → bottom; tablet uses 2×2 nav; desktop uses 1+4 grid.

## 3. Final link inventory

| Source | Group | Label | Href |
| --- | --- | --- | --- |
| header dropdown | Produto | Como funciona | `/how-it-works.html` |
| header dropdown | Produto | Integrações | `/integrations.html` |
| header dropdown | Produto | Segurança | `/security-overview.html` |
| header dropdown | Casos de uso | Advogados | `/use-case-legal.html` |
| header dropdown | Casos de uso | Financeiro | `/use-case-finance.html` |
| header dropdown | Casos de uso | Operações | `/use-case-business.html` |
| header dropdown | Ferramentas | Tempo perdido | `/tempo.html` |
| header dropdown | Ferramentas | Diagnóstico do fluxo | `/diagnostico.html` |
| header dropdown | Ferramentas | Metodologia | `/metodologia.html` |
| header top-level | — | Preços | `/pricing.html` |
| header top-level | — | Sobre | `/about.html` |
| header action | — | Entrar | `https://app.allybi.com.br` |
| header action | — | Começar grátis | `https://app.allybi.com.br` |
| mobile menu | Produto / Casos de uso / Ferramentas | (same as header) | (same) |
| mobile menu | Empresa | Preços | `/pricing.html` |
| mobile menu | Empresa | Sobre | `/about.html` |
| mobile menu | Empresa | FAQ | `/pricing.html#faq` |
| mobile menu | Empresa | Contato | `/contact.html` |
| mobile menu action | — | Começar grátis | `https://app.allybi.com.br` |
| mobile menu action | — | Entrar | `https://app.allybi.com.br` |
| footer | Produto / Casos de uso / Ferramentas (same as header) | — | — |
| footer | Empresa | Preços / Sobre / FAQ (`/pricing.html#faq`) / Contato | — |
| footer legal | — | Termos | `/terms.html` |
| footer legal | — | Privacidade | `/privacy.html` |

## 4. Link-target verification (HTTP 200 via `curl`)

| URL | Result |
| --- | --- |
| `/how-it-works.html` | 200 |
| `/integrations.html` | 200 |
| `/security-overview.html` | 200 |
| `/use-case-legal.html` | 200 |
| `/use-case-finance.html` | 200 |
| `/use-case-business.html` | 200 |
| `/tempo.html` | 200 |
| `/diagnostico.html` | 200 |
| `/metodologia.html` | 200 |
| `/pricing.html` (+ `#faq` anchor now resolves) | 200 |
| `/about.html` | 200 |
| `/contact.html` | 200 |
| `/terms.html` | 200 |
| `/privacy.html` | 200 |

No missing legal page. All links resolve.

## 5. Grep audit (§27)

| Probe | Hits in `*.html` |
| --- | --- |
| `Koda` / `Manual Search` / `X-Ray` / `Cemitério` / `Índice` / `modo cadê` / `Allybi Pro` / `Falar com vendas` / `Agendar demo` | 0 each |
| `Book demo` | 1 (form submit button inside `demo.html`, NOT a header / footer / menu link) |
| `coming soon` | 1 (FAQ question text inside `faq.html`, NOT a header / footer / menu link) |
| `app.allybi.com.brm.br` / `allybi.com.brm` | 0 each |
| `three-line` / `hamburger-three` / `drawer-left` / `mobile-nav-old` / `footer-old` | 0 each |
| `<header id="allybi-header"` / `class="allybi-footer"` / `id="allybi-mobile-menu"` / `language-switcher.js` | 0 each |

`Book demo` / `coming soon` survive only inside page bodies (the demo request page itself + the standalone FAQ page). Per §20 the spec forbids these inside header / footer / menu, all of which are clean. Both occurrences should be reviewed in a future pass if the related pages are kept.

## 6. Behaviour / accessibility check

- **Body scroll lock**: `html.has-mobile-menu-open, body.has-mobile-menu-open { overflow: hidden }` — applied via JS on open, removed on close.
- **`inert`** added to `#mobile-menu` when closed, removed on open. `aria-hidden` mirrored.
- **`aria-expanded`** mirrored on the menu button (`true` on open, `false` on close).
- **Close button** receives focus immediately after open via `requestAnimationFrame(() => closeBtn.focus())`.
- **Focus trap**: Tab from the last focusable element wraps back to the first; Shift+Tab from the first wraps to the last.
- **Escape**: closes the menu when open; also closes any open desktop dropdown.
- **Link-click close**: any `a[href]` click inside the overlay triggers close.
- **Route change close**: `hashchange` and `popstate` both close the menu.
- **`aria-current="page"`** automatically applied to any anchor whose pathname matches the current page.
- **`prefers-reduced-motion: reduce`** — `mobile-menu` animations are clipped to 0.001 ms.
- **2-line hamburger** — markup uses exactly two `<span class="site-header__menu-line">` children and CSS positions them top-14 px / bottom-14 px. Never animates into X. The X exists only inside the opened menu's close button (SVG with two stroke paths).
- **No-JS fallback**: with JS disabled, the desktop nav, all dropdown items (since each `<a>` lives in the panel which is `display: none` without `[data-open="true"]` — fallback below), and the footer all remain accessible. The mobile menu cannot open without JS, but every link inside it is reachable via the footer (which has the same Produto / Casos de uso / Ferramentas / Empresa groups). A graceful CSS-only dropdown fallback was not added to keep the no-JS surface predictable; in JS-off mode the dropdown labels remain visible and the user can reach Como funciona / Integrações / Segurança / etc. from the footer.

## 7. Pages updated

37 `.html` files in the landing root. All carry the new header + mobile menu + footer markup. Page-specific main content was left intact. The `<link rel="stylesheet" href="allybi-header.css">` and `<link rel="stylesheet" href="allybi-footer.css">` (+ `<script src="allybi-header.js" …>`) imports already in place are reused — only the file contents changed.

## 8. Outstanding

- Visual QA / Playwright screenshots at the 7 viewports specified in §25 / §39 were not captured automatically in this pass — the surface was verified via `curl` HTTP 200 + grep audits.
- The `demo.html` form-submit-button "Book demo" string and `faq.html` "What is coming soon?" question text remain — both inside page content, not header/footer/menu. Per spec §20 they aren't in scope of header/footer/menu but should be reviewed if those pages stay.
- The footer no longer renders the language selector dropdown (it depended on the now-removed `language-switcher.js`). All copy is Portuguese only.
- Search box / FAQ search components were not in the spec and weren't added.
