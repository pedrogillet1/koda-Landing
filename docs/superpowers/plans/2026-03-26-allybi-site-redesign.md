# Allybi Marketing Site Full Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Completely redesign and rebuild the Allybi marketing site from a thin 5-page brochure into a premium, enterprise-credible 14+ page marketing surface that converts legal, finance, and business teams.

**Architecture:** Plain HTML/CSS/JS site (no framework). New unified design system via CSS custom properties. Consolidated from 26 CSS files into a modular system. Existing i18n via `data-i18n-key` + JSON preserved and extended. All pages share a rebuilt header/footer shell. New pages follow a reusable template pattern.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, flexbox, clamp()), vanilla JS (IntersectionObserver, fetch for i18n), SVG for visuals/diagrams, Plus Jakarta Sans font.

**Key Decisions:**
- Keep the pure HTML/CSS/JS stack — no framework migration
- Consolidate 26 CSS files into: `allybi-tokens.css`, `allybi-base.css`, `allybi-components.css`, `allybi-layout.css`, plus page-specific CSS files
- Replace all `--koda-*` CSS variables with `--allybi-*`
- Replace all `getkoda.ai` URLs with `https://app.allybi.co`
- Extend i18n translation JSONs for all new pages
- Build visual assets as inline SVG compositions (no external designer dependency)
- Preserve all 5 legal/policy pages — only modernize their shell/wrapper

**Scope:** This plan covers 8 phases with ~40 tasks. Estimated execution: 6-10 hours of agent time.

---

## Phase 1: Design System Foundation

### Task 1: Create new unified design tokens

**Files:**
- Create: `allybi-tokens.css`
- Modify: `tokens.css` (will be superseded)

**Why:** The current token system uses `--koda-*` naming, has gaps in the spec'd type scale, color palette, spacing, and motion tokens. We need a complete token file matching the spec.

- [ ] **Step 1: Create `allybi-tokens.css` with full token system**

```css
/* allybi-tokens.css — Allybi Design System Tokens v3.0 */
:root {
  /* === COLOR TOKENS === */
  /* Text */
  --allybi-text-strongest: #0D0F12;
  --allybi-text-primary: #1A1D23;
  --allybi-text-secondary: #454B57;
  --allybi-text-muted: #6B7280;
  --allybi-text-subtle: #9CA3AF;
  --allybi-text-inverse: #FFFFFF;

  /* Surfaces */
  --allybi-bg-page: #FCFCFA;
  --allybi-bg-surface: #FFFFFF;
  --allybi-bg-alt-1: #F6F7F8;
  --allybi-bg-alt-2: #EEF1F4;
  --allybi-bg-dark: #0D0F12;
  --allybi-bg-dark-surface: #1A1D23;

  /* Borders */
  --allybi-border-default: rgba(16, 24, 40, 0.08);
  --allybi-border-subtle: rgba(16, 24, 40, 0.05);
  --allybi-border-strong: rgba(16, 24, 40, 0.15);
  --allybi-border-focus: #3B82F6;

  /* Accent */
  --allybi-accent: #2563EB;
  --allybi-accent-hover: #1D4ED8;
  --allybi-accent-subtle: rgba(37, 99, 235, 0.08);

  /* Trust green */
  --allybi-trust: #16A34A;
  --allybi-trust-subtle: rgba(22, 163, 74, 0.08);
  --allybi-trust-muted: #15803D;

  /* Semantic */
  --allybi-error: #DC2626;
  --allybi-error-subtle: rgba(220, 38, 38, 0.08);
  --allybi-warning: #D97706;

  /* === TYPOGRAPHY === */
  --allybi-font: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  /* Desktop sizes (will be overridden at breakpoints) */
  --allybi-text-hero-eyebrow: 14px;
  --allybi-lh-hero-eyebrow: 20px;
  --allybi-text-hero-h1: clamp(38px, 5vw, 72px);
  --allybi-lh-hero-h1: 1.02;
  --allybi-text-hero-support: clamp(17px, 1.4vw, 20px);
  --allybi-lh-hero-support: 1.5;
  --allybi-text-section-h2: clamp(30px, 3.2vw, 48px);
  --allybi-lh-section-h2: 1.08;
  --allybi-text-section-intro: 18px;
  --allybi-lh-section-intro: 30px;
  --allybi-text-card-title: clamp(20px, 1.6vw, 24px);
  --allybi-lh-card-title: 1.2;
  --allybi-text-body: 17px;
  --allybi-lh-body: 1.6;
  --allybi-text-body-sm: 15px;
  --allybi-lh-body-sm: 1.55;
  --allybi-text-meta: 13px;
  --allybi-lh-meta: 1.4;
  --allybi-text-eyebrow: 12px;
  --allybi-lh-eyebrow: 1.4;

  /* Weights */
  --allybi-weight-regular: 400;
  --allybi-weight-medium: 500;
  --allybi-weight-semibold: 600;
  --allybi-weight-bold: 700;

  /* Letter spacing */
  --allybi-ls-tight: -0.02em;
  --allybi-ls-normal: 0;
  --allybi-ls-wide: 0.04em;

  /* === SPACING (8px base grid) === */
  --allybi-space-1: 4px;
  --allybi-space-2: 8px;
  --allybi-space-3: 12px;
  --allybi-space-4: 16px;
  --allybi-space-5: 20px;
  --allybi-space-6: 24px;
  --allybi-space-8: 32px;
  --allybi-space-10: 40px;
  --allybi-space-12: 48px;
  --allybi-space-16: 64px;
  --allybi-space-20: 80px;
  --allybi-space-26: 104px;
  --allybi-space-32: 128px;

  /* Section spacing */
  --allybi-section-pad-desktop: 112px;
  --allybi-section-pad-mobile: 72px;
  --allybi-section-pad-dense: 88px;

  /* Layout */
  --allybi-max-page: 1280px;
  --allybi-max-content: 1160px;
  --allybi-max-reading: 720px;
  --allybi-gutter: 24px;

  /* === RADII === */
  --allybi-radius-sm: 8px;
  --allybi-radius-md: 14px;
  --allybi-radius-lg: 20px;
  --allybi-radius-xl: 24px;
  --allybi-radius-btn: 14px;
  --allybi-radius-input: 14px;
  --allybi-radius-card: 20px;
  --allybi-radius-hero-panel: 24px;

  /* === SHADOWS === */
  --allybi-shadow-sm: 0 1px 3px rgba(16, 24, 40, 0.04), 0 1px 2px rgba(16, 24, 40, 0.02);
  --allybi-shadow-md: 0 4px 12px rgba(16, 24, 40, 0.06), 0 1px 4px rgba(16, 24, 40, 0.03);
  --allybi-shadow-lg: 0 8px 24px rgba(16, 24, 40, 0.08), 0 2px 8px rgba(16, 24, 40, 0.04);
  --allybi-shadow-xl: 0 16px 48px rgba(16, 24, 40, 0.1), 0 4px 16px rgba(16, 24, 40, 0.05);
  --allybi-shadow-card-hover: 0 8px 28px rgba(16, 24, 40, 0.1), 0 2px 8px rgba(16, 24, 40, 0.04);

  /* === MOTION === */
  --allybi-ease: cubic-bezier(0.25, 0.1, 0.25, 1);
  --allybi-ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --allybi-duration-hover: 160ms;
  --allybi-duration-ui: 240ms;
  --allybi-duration-section: 380ms;
  --allybi-duration-modal: 300ms;
  --allybi-duration-accordion: 250ms;
  --allybi-duration-tab: 200ms;

  /* === Z-INDEX === */
  --allybi-z-base: 1;
  --allybi-z-dropdown: 100;
  --allybi-z-sticky: 200;
  --allybi-z-overlay: 300;
  --allybi-z-modal: 400;
  --allybi-z-toast: 500;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  :root {
    --allybi-duration-hover: 0ms;
    --allybi-duration-ui: 0ms;
    --allybi-duration-section: 0ms;
    --allybi-duration-modal: 0ms;
    --allybi-duration-accordion: 0ms;
    --allybi-duration-tab: 0ms;
  }
}
```

- [ ] **Step 2: Verify the file renders without errors by loading it in a test page**

Open browser to `http://localhost:8080` and confirm no CSS parse errors in console.

- [ ] **Step 3: Commit**
```bash
git add allybi-tokens.css
git commit -m "feat: add new Allybi unified design token system"
```

---

### Task 2: Create base reset and typography CSS

**Files:**
- Create: `allybi-base.css`

- [ ] **Step 1: Create `allybi-base.css` with reset, base typography, and global styles**

```css
/* allybi-base.css — Global reset, typography, and base styles */

/* === RESET === */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { -webkit-text-size-adjust: 100%; -moz-text-size-adjust: 100%; scroll-behavior: smooth; }
body {
  font-family: var(--allybi-font);
  font-size: var(--allybi-text-body);
  line-height: var(--allybi-lh-body);
  color: var(--allybi-text-primary);
  background: var(--allybi-bg-page);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
img, svg { display: block; max-width: 100%; height: auto; }
a { color: inherit; text-decoration: none; }
button { font: inherit; cursor: pointer; border: none; background: none; }
ul, ol { list-style: none; }
h1, h2, h3, h4, h5, h6 { font-weight: var(--allybi-weight-bold); letter-spacing: var(--allybi-ls-tight); }

/* === GLOBAL TYPOGRAPHY === */
.allybi-eyebrow {
  font-size: var(--allybi-text-eyebrow);
  line-height: var(--allybi-lh-eyebrow);
  font-weight: var(--allybi-weight-semibold);
  letter-spacing: var(--allybi-ls-wide);
  text-transform: uppercase;
  color: var(--allybi-text-muted);
}
.allybi-hero-eyebrow {
  font-size: var(--allybi-text-hero-eyebrow);
  line-height: var(--allybi-lh-hero-eyebrow);
  font-weight: var(--allybi-weight-semibold);
  letter-spacing: 0.02em;
  color: var(--allybi-trust);
}
.allybi-h1 {
  font-size: var(--allybi-text-hero-h1);
  line-height: var(--allybi-lh-hero-h1);
  font-weight: var(--allybi-weight-bold);
  letter-spacing: -0.025em;
  color: var(--allybi-text-strongest);
}
.allybi-h2 {
  font-size: var(--allybi-text-section-h2);
  line-height: var(--allybi-lh-section-h2);
  font-weight: var(--allybi-weight-bold);
  letter-spacing: -0.02em;
  color: var(--allybi-text-strongest);
}
.allybi-h3 {
  font-size: var(--allybi-text-card-title);
  line-height: var(--allybi-lh-card-title);
  font-weight: var(--allybi-weight-semibold);
  color: var(--allybi-text-strongest);
}
.allybi-body-lg {
  font-size: var(--allybi-text-hero-support);
  line-height: var(--allybi-lh-hero-support);
  color: var(--allybi-text-secondary);
}
.allybi-body {
  font-size: var(--allybi-text-body);
  line-height: var(--allybi-lh-body);
  color: var(--allybi-text-secondary);
}
.allybi-meta {
  font-size: var(--allybi-text-meta);
  line-height: var(--allybi-lh-meta);
  font-weight: var(--allybi-weight-semibold);
  color: var(--allybi-text-muted);
}

/* === LAYOUT CONTAINERS === */
.allybi-container {
  width: 100%;
  max-width: var(--allybi-max-page);
  margin: 0 auto;
  padding-left: var(--allybi-gutter);
  padding-right: var(--allybi-gutter);
}
.allybi-content {
  max-width: var(--allybi-max-content);
  margin: 0 auto;
}
.allybi-narrow {
  max-width: var(--allybi-max-reading);
  margin: 0 auto;
}

/* === SECTION SPACING === */
.allybi-section {
  padding-top: var(--allybi-section-pad-desktop);
  padding-bottom: var(--allybi-section-pad-desktop);
}
.allybi-section--dense {
  padding-top: var(--allybi-section-pad-dense);
  padding-bottom: var(--allybi-section-pad-dense);
}

@media (max-width: 768px) {
  .allybi-section {
    padding-top: var(--allybi-section-pad-mobile);
    padding-bottom: var(--allybi-section-pad-mobile);
  }
  .allybi-section--dense {
    padding-top: 56px;
    padding-bottom: 56px;
  }
}

/* === UTILITY === */
.desktop-only { display: block; }
.mobile-only { display: none; }
@media (max-width: 768px) {
  .desktop-only { display: none !important; }
  .mobile-only { display: block !important; }
}

/* === SCROLL ANIMATIONS === */
.allybi-reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity var(--allybi-duration-section) var(--allybi-ease-out),
              transform var(--allybi-duration-section) var(--allybi-ease-out);
}
.allybi-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger children */
.allybi-stagger > .allybi-reveal:nth-child(1) { transition-delay: 0ms; }
.allybi-stagger > .allybi-reveal:nth-child(2) { transition-delay: 80ms; }
.allybi-stagger > .allybi-reveal:nth-child(3) { transition-delay: 160ms; }
.allybi-stagger > .allybi-reveal:nth-child(4) { transition-delay: 240ms; }
.allybi-stagger > .allybi-reveal:nth-child(5) { transition-delay: 320ms; }
.allybi-stagger > .allybi-reveal:nth-child(6) { transition-delay: 400ms; }
```

- [ ] **Step 2: Commit**
```bash
git add allybi-base.css
git commit -m "feat: add Allybi base reset, typography, and layout CSS"
```

---

### Task 3: Create component library CSS

**Files:**
- Create: `allybi-components.css`

- [ ] **Step 1: Create `allybi-components.css` with buttons, cards, inputs, chips, accordion, nav dropdown**

This file contains all reusable UI component styles:
- `.allybi-btn--primary` / `--secondary` / `--ghost`
- `.allybi-card` (with hover)
- `.allybi-input` / `.allybi-textarea` / `.allybi-select`
- `.allybi-chip`
- `.allybi-accordion`
- `.allybi-tab-group`
- `.allybi-badge`

Key specs:
- Buttons: 48-52px tall desktop, 44-48px mobile, radius `--allybi-radius-btn`
- Cards: radius `--allybi-radius-card`, padding 24-32px, hover lifts 3px with shadow shift
- Inputs: radius `--allybi-radius-input`, 48px tall, clear focus ring
- Chips: small pill badges for trust states
- Accordion: smooth expand/collapse, icon rotation

- [ ] **Step 2: Commit**
```bash
git add allybi-components.css
git commit -m "feat: add Allybi reusable component library CSS"
```

---

## Phase 2: Shared Shell (Header + Footer + Nav)

### Task 4: Build new premium header with mega-nav

**Files:**
- Create: `allybi-header.css`
- Create: `allybi-header.js`
- Create: `partials/header.html` (reference template)

**Why:** Current header has only 2 nav links (About, Contact) and a language switcher. New header needs: Product, Use Cases, Security, Pricing, Resources, About dropdowns, plus Sign in / Book demo / Start free CTAs.

- [ ] **Step 1: Create `allybi-header.css`**

Specs:
- Sticky at top: 0, starts with transparent-ish background
- On scroll: solid background with backdrop-filter blur(12px), subtle border-bottom
- Max-width container centered
- Logo left, nav center, CTAs right
- Desktop: full nav with dropdowns
- Mobile: hamburger → slide-down panel
- Dropdowns: well-spaced, soft shadow, 240ms reveal
- Height: 64px desktop, 56px mobile

Nav structure:
```
Product ▾ | Use Cases ▾ | Security | Pricing | Resources ▾ | About
                                           [Sign in] [Book demo] [Start free ➤]
```

Product dropdown:
- Overview → index.html
- How it works → how-it-works.html
- Integrations → integrations.html
- Security Overview → security-overview.html

Use Cases dropdown:
- Legal → use-case-legal.html
- Finance → use-case-finance.html
- Business → use-case-business.html

Resources dropdown:
- Customer Stories → customers.html
- FAQ → index.html#faq
- Contact → contact.html

- [ ] **Step 2: Create `allybi-header.js`**

Handles:
- Scroll class toggle (`.is-scrolled` after 40px)
- Dropdown open/close with click (not hover, for accessibility)
- Mobile menu toggle
- ESC to close
- Click outside to close
- Language switcher integration (call existing `setLanguage()`)
- Keyboard nav for dropdowns (arrow keys, tab)

- [ ] **Step 3: Commit**
```bash
git add allybi-header.css allybi-header.js
git commit -m "feat: build premium header with mega-nav dropdowns"
```

---

### Task 5: Build new rich footer

**Files:**
- Create: `allybi-footer.css`

- [ ] **Step 1: Create `allybi-footer.css`**

Layout: 6-column grid on desktop (Product, Use Cases, Security, Resources, Company, Legal), stacks to 2-col then 1-col on mobile.

Bottom bar: copyright + language selector + social links (only if real) + legal links.

Trust statement: "Built for privacy-first teams handling sensitive work."

Dark surface: `--allybi-bg-dark` background, light text.

- [ ] **Step 2: Commit**
```bash
git add allybi-footer.css
git commit -m "feat: build rich multi-column footer"
```

---

### Task 6: Create HTML template for shared shell

**Files:**
- Create: `_template.html` (master reference for all new pages)

- [ ] **Step 1: Create `_template.html`**

This is the reference shell that all pages will copy. Includes:
- Full `<head>` with meta, OG tags, CSS imports (new system only)
- Header HTML (sticky nav with dropdowns)
- Mobile menu
- Footer HTML (rich footer)
- JS imports at bottom

All translatable strings use `data-i18n-key` attributes.

- [ ] **Step 2: Commit**
```bash
git add _template.html
git commit -m "feat: add master page template with new header/footer shell"
```

---

## Phase 3: Homepage Rebuild

### Task 7: Rebuild homepage hero section

**Files:**
- Modify: `index.html` (complete rewrite)
- Create: `pages/home.css`

- [ ] **Step 1: Rewrite `index.html` hero**

New hero specs:
- 12-col grid: 5-col text / 7-col visual
- min-height ~82vh with vertical centering
- Eyebrow: "Private AI for high-stakes documents"
- H1: "Find the exact file, clause, version, or attachment in seconds."
- Support: "Allybi helps privacy-first teams search, organize, edit, and act across documents and messages — with grounded answers, project-level control, and explicit confirmation before anything is sent."
- Primary CTA: "Start free" → app.allybi.co
- Secondary CTA: "Book demo" → demo.html
- 4-chip micro-proof row: Grounded in your files | Encrypted by default | Project-level organization | Explicit confirmation before send
- Hero visual: inline SVG workspace composition (see Task 24)
- Staged reveal animation on load

- [ ] **Step 2: Style the hero in `pages/home.css`**

- [ ] **Step 3: Commit**

---

### Task 8: Build homepage trust micro-strip

- [ ] **Step 1: Add trust strip section below hero**

Horizontal band with 4-6 trust chips.
Desktop: inline flexbox
Mobile: 2x2 grid

Chips:
- Grounded answers only
- Encrypted in transit and at rest
- Permissioned connections
- Disconnect anytime
- Explicit confirmation before send

- [ ] **Step 2: Commit**

---

### Task 9: Build homepage pain section

- [ ] **Step 1: Add pain section**

Title: "The hidden tax isn't just search time."
3-column card grid:
1. Wrong version risk — "Every time someone asks for the latest file, your brain has to re-open the entire project."
2. Search interruption — "Context switching to find a doc costs more than the search itself."
3. Wrong attachment risk — "One wrong file sent to a client can cost trust that takes months to rebuild."

Each card: icon + title + description. Subtle, not loud.

- [ ] **Step 2: Commit**

---

### Task 10: Build homepage use-case switcher

- [ ] **Step 1: Build tabbed use-case section**

3 tabs: Legal / Finance / Business
Left: copy + bullets + CTA
Right: dynamic SVG visual per tab
Smooth crossfade on tab switch (200ms)

Legal state:
- "Compare clauses, versions, and evidence without losing the thread."
- Bullets: Search clauses across folders instantly / See what changed between drafts / Send the right version with confidence

Finance state:
- "Find the exact deck, cap table, model, or number fast."
- Bullets: Pull the right slide or metric in seconds / Keep deal material organized by project / Draft faster with the right attachment ready

Business state:
- "Keep proposals, plans, and decision docs actionable."
- Bullets: Ask across docs and message threads / Find the latest file without hunting / Draft the next step from the same workspace

- [ ] **Step 2: Commit**

---

### Task 11: Build homepage how-it-works section

- [ ] **Step 1: Add 3-step section**

Title: "How Allybi works"
Subtitle: "Three steps. No chaos. No learning curve."

Step 1: Bring in the files that matter
Step 2: Ask in plain language
Step 3: Act with confidence

Horizontal layout desktop, stacked mobile. Clean numbered steps with mini diagrams.

- [ ] **Step 2: Commit**

---

### Task 12: Build homepage product pillars

- [ ] **Step 1: Add 3 substantial pillar blocks**

Alternate text/image layout (left-right-left).

Pillar 1: Grounded search and answers
Pillar 2: Project-level organization
Pillar 3: Action inside the workflow

Each pillar: large section with heading, 2-3 bullet descriptions, and a product visual.

- [ ] **Step 2: Commit**

---

### Task 13: Build homepage action layer

- [ ] **Step 1: Add two premium feature cards**

Card A: Edit Docs & Sheets — document editing pane visual
Card B: Connect Inbox & Slack — email/slack panel with confirmation visual

Each card: icon, title, 3-4 bullets, product-specific visual.

- [ ] **Step 2: Commit**

---

### Task 14: Build homepage security teaser + integrations teaser

- [ ] **Step 1: Add security overview teaser section**

Title: "Private by design. Clear by design."
Left: 4 trust pillars (encryption, grounded outputs, permissioned integrations, explicit confirmation)
Right: architecture diagram SVG
CTA: "View security overview"

- [ ] **Step 2: Add integrations teaser section**

Title: "Work where your files and conversations already live."
Grid of integration modules: Gmail, Outlook, Slack, Docs/Sheets workflows
CTA: "View integrations"

- [ ] **Step 3: Commit**

---

### Task 15: Build homepage FAQ + final CTA + footer integration

- [ ] **Step 1: Add FAQ accordion**

Minimum 8 Q&As using `.allybi-accordion` component.

- [ ] **Step 2: Add final CTA section**

Title: "Your files, finally useful."
Support text + dual CTAs (Start free / Book demo)
Clean, spacious, high-confidence finish.

- [ ] **Step 3: Wire up new footer**

- [ ] **Step 4: Replace ALL `getkoda.ai` URLs with `https://app.allybi.co`**

- [ ] **Step 5: Commit**

---

## Phase 4: Core Pages

### Task 16: Build About page

**Files:**
- Rewrite: `about.html`
- Create: `pages/about.css`

Sections:
1. Hero: "We built Allybi for people who can't afford chaos or surveillance."
2. Why Allybi exists (narrative)
3. Three conviction cards (privacy/speed, no filename memory, AI evidence)
4. Five product principles (Clarity, Control, Evidence, Calm, Privacy)
5. Privacy and grounded outputs explanation
6. What Allybi is building (concrete roadmap)
7. How we build / What we optimize for / What we will never do
8. Final CTA

- [ ] **Step 1: Rewrite about.html with new shell and sections**
- [ ] **Step 2: Create about.css**
- [ ] **Step 3: Commit**

---

### Task 17: Build Contact page

**Files:**
- Rewrite: `contact.html`
- Create: `pages/contact.css`

Sections:
1. Hero: "Talk to Allybi"
2. Routing cards (Sales/demos, Support, Security, Partnerships)
3. Contact form (Name, Work email, Company, Role dropdown, Topic dropdown, Message)
4. Alternative contact paths
5. Reassurance section

- [ ] **Step 1: Rewrite contact.html**
- [ ] **Step 2: Create contact.css**
- [ ] **Step 3: Commit**

---

### Task 18: Build How It Works page

**Files:**
- Create: `how-it-works.html`
- Create: `pages/how-it-works.css`

Sections:
1. Hero: "How Allybi works"
2. End-to-end workflow diagram
3. Upload and organization
4. Search and grounded answers
5. Version awareness and control
6. Edit docs and sheets
7. Connect inbox and Slack
8. Send with explicit confirmation
9. Security/trust layer
10. FAQ + CTA

- [ ] **Step 1: Create how-it-works.html**
- [ ] **Step 2: Create how-it-works.css**
- [ ] **Step 3: Commit**

---

## Phase 5: Use Case Pages

### Task 19: Build Use Cases overview page

**Files:**
- Create: `use-cases.html`
- Create: `pages/use-cases.css`

- [ ] **Step 1: Create overview page with role selection cards**
- [ ] **Step 2: Commit**

---

### Task 20: Build Legal use-case page

**Files:**
- Create: `use-case-legal.html`
- Create: `pages/use-case-legal.css`

Hero: "Find the clause, the draft, and the answer fast."
Sections: legal pain, contract comparison, clause search, matter organization, draft/send, security for legal, FAQ, CTA.

- [ ] **Step 1: Create use-case-legal.html**
- [ ] **Step 2: Commit**

---

### Task 21: Build Finance use-case page

**Files:**
- Create: `use-case-finance.html`
- Create: `pages/use-case-finance.css`

Hero: "Find the exact deck, model, metric, or cap table in seconds."

- [ ] **Step 1: Create use-case-finance.html**
- [ ] **Step 2: Commit**

---

### Task 22: Build Business/Operations use-case page

**Files:**
- Create: `use-case-business.html`
- Create: `pages/use-case-business.css`

Hero: "Keep proposals, plans, and decisions easy to find and easy to act on."

- [ ] **Step 1: Create use-case-business.html**
- [ ] **Step 2: Commit**

---

## Phase 6: Product & Trust Pages

### Task 23: Build Security Overview marketing page

**Files:**
- Create: `security-overview.html`
- Create: `pages/security-overview.css`

This is a MARKETING trust page, separate from the legal security.html.

Hero: "Security and privacy, made visible."
Sections: trust pillars, architecture diagram, data handling, integrations/permissions, FAQ, CTA.

- [ ] **Step 1: Create security-overview.html**
- [ ] **Step 2: Commit**

---

### Task 24: Build Integrations page

**Files:**
- Create: `integrations.html`
- Create: `pages/integrations.css`

Only include: Gmail, Outlook, Slack, document/spreadsheet workflows.
Integration cards with what Allybi does + user control.
Workflow examples.

- [ ] **Step 1: Create integrations.html**
- [ ] **Step 2: Commit**

---

### Task 25: Build Pricing page

**Files:**
- Create: `pricing.html`
- Create: `pages/pricing.css`

Configurable via a JS config object for easy price updates.
Plans: Starter (free), Team, Enterprise.
Feature comparison table.
FAQ + CTA.

- [ ] **Step 1: Create pricing.html**
- [ ] **Step 2: Commit**

---

### Task 26: Build Demo / Book a Demo page

**Files:**
- Create: `demo.html`
- Create: `pages/demo.css`

Hero + what a demo covers + inline form + product preview visual + FAQ.

- [ ] **Step 1: Create demo.html**
- [ ] **Step 2: Commit**

---

### Task 27: Build Customers / Proof page

**Files:**
- Create: `customers.html`
- Create: `pages/customers.css`

Evidence-first proof page (no fake logos/testimonials).
Role-based workflow outcomes, before/after comparisons, why teams trust Allybi.

- [ ] **Step 1: Create customers.html**
- [ ] **Step 2: Commit**

---

## Phase 7: Visual Assets & SVG Compositions

### Task 28: Create hero workspace SVG scene

**Files:**
- Create: `assets/generated/hero-workspace.svg`

Inline SVG composition at ~1440x1080 containing:
- Main Allybi workspace window (search bar, project rail, answer area, source panel)
- Query: "What changed in the indemnity clause in the latest SPA?"
- Grounded answer with highlighted terms
- Source citation chip
- Latest version chip (v2 → v3)
- "Ready to send" confirmation card

Use neutral UI colors, realistic microcopy, generous padding.

- [ ] **Step 1: Create the SVG scene programmatically or as inline SVG**
- [ ] **Step 2: Commit**

---

### Task 29: Create use-case and feature visuals

**Files:**
- Create: `assets/generated/legal-compare.svg`
- Create: `assets/generated/finance-workflow.svg`
- Create: `assets/generated/business-workflow.svg`
- Create: `assets/generated/edit-docs-sheets.svg`
- Create: `assets/generated/integrations-mosaic.svg`
- Create: `assets/generated/security-architecture.svg`
- Create: `assets/generated/about-philosophy.svg`

Each visual built as clean SVG with product-truthful UI elements.

- [ ] **Step 1: Create all visual SVGs**
- [ ] **Step 2: Commit**

---

### Task 30: Create OG image templates

**Files:**
- Create: `assets/og/og-home.svg` (will be rendered to PNG)
- Create: `assets/og/og-security.svg`
- Create: `assets/og/og-use-cases.svg`
- Create: `assets/og/og-default.svg`

- [ ] **Step 1: Create OG templates**
- [ ] **Step 2: Commit**

---

## Phase 8: i18n, Legal Shell, Legacy Cleanup, QA

### Task 31: Extend translation JSONs for all new pages

**Files:**
- Modify: `translations/en.json`
- Modify: `translations/pt.json`
- Modify: `translations/es.json`

Add translation keys for:
- New nav items (Product, Use Cases, Security, Pricing, Resources, Sign in, Book demo, Start free)
- New footer columns
- All new page sections
- FAQ content

English is source. PT and ES get placeholder translations (marked for professional translation).

- [ ] **Step 1: Extend en.json with all new keys**
- [ ] **Step 2: Extend pt.json and es.json with placeholder translations**
- [ ] **Step 3: Commit**

---

### Task 32: Modernize legal page shell

**Files:**
- Modify: `tos.html`, `privacy.html`, `cookies.html`, `security.html`, `terms.html`

For each legal page:
- Replace old header/footer with new shared shell
- Update CSS imports to new system
- Improve typography and reading width
- Add table of contents navigation
- Preserve all legal content verbatim

- [ ] **Step 1: Update all 5 legal pages with new shell**
- [ ] **Step 2: Commit**

---

### Task 33: Replace all legacy brand references

**Files:**
- All HTML files
- All CSS files
- All JS files
- Translation JSONs

Actions:
- Replace all `getkoda.ai` URLs → `https://app.allybi.co`
- Replace `--koda-*` CSS variable references → `--allybi-*` (in files that use new system)
- Update CSS file comments ("KODA" → "ALLYBI")
- Keep old CSS files that legal pages still reference until migration complete
- Remove `_fixed.html` backup files

- [ ] **Step 1: Run find-and-replace across all files**
- [ ] **Step 2: Verify no broken references**
- [ ] **Step 3: Commit**

---

### Task 34: Add SEO meta tags to all pages

**Files:**
- Modify: All HTML pages

For each page add:
- `<title>` — descriptive, <60 chars
- `<meta name="description">` — compelling, <160 chars
- OG title, description, image, type
- Twitter card tags
- Canonical URL
- Structured data (Organization on homepage, FAQ where applicable)

- [ ] **Step 1: Add meta tags to all pages**
- [ ] **Step 2: Commit**

---

### Task 35: Wire up scroll animations

**Files:**
- Create: `allybi-animations.js`

Replace current `animations.js` with new version that:
- Uses IntersectionObserver with threshold 0.15
- Targets `.allybi-reveal` elements
- Respects `prefers-reduced-motion`
- Handles stagger delays via `.allybi-stagger`
- Handles sticky header scroll class

- [ ] **Step 1: Create allybi-animations.js**
- [ ] **Step 2: Commit**

---

### Task 36: Mobile responsiveness pass

**Files:**
- Modify: All page CSS files

Test at: 430, 390, 375, 320px widths.

Verify:
- Hero stacks text-first, visual-second
- Nav becomes mobile menu
- Tab switcher usable
- Cards stack with breathing room
- Forms easy to complete
- Footer organized
- Visuals don't overflow
- Typography scales properly

- [ ] **Step 1: Add mobile breakpoint styles to all page CSS**
- [ ] **Step 2: Commit**

---

### Task 37: Clean up dead files

**Files:**
- Delete: `privacy_fixed.html`, `terms_fixed.html`, `tos_fixed.html`, `cookies_fixed.html`, `security_fixed.html`
- Delete: `mobile.html` (prototype, not production)
- Delete: `waitlist.html` (replaced by proper pages)
- Assess: old CSS files that are no longer imported by any page

- [ ] **Step 1: Remove dead files**
- [ ] **Step 2: Verify no pages reference deleted files**
- [ ] **Step 3: Commit**

---

### Task 38: Performance and accessibility pass

- [ ] **Step 1: Verify all images have alt text**
- [ ] **Step 2: Verify heading order (h1 > h2 > h3) on every page**
- [ ] **Step 3: Verify focus states on all interactive elements**
- [ ] **Step 4: Verify color contrast meets WCAG AA**
- [ ] **Step 5: Verify all forms have proper labels**
- [ ] **Step 6: Verify accordion keyboard accessibility**
- [ ] **Step 7: Verify no major layout shift**
- [ ] **Step 8: Commit any fixes**

---

### Task 39: Upload to VPS

**Files:**
- All modified and new files

- [ ] **Step 1: Push updated files to VPS via SCP**

```bash
sshpass -p 'CamasmieGillet12@' scp -r -o StrictHostKeyChecking=no -o PubkeyAuthentication=no \
  /Users/alvarocamasmie/Downloads/koda-Landing/*.html \
  /Users/alvarocamasmie/Downloads/koda-Landing/*.css \
  /Users/alvarocamasmie/Downloads/koda-Landing/*.js \
  root@72.60.164.154:/var/www/getkoda-landing/
```

- [ ] **Step 2: Upload new page-specific CSS**
```bash
sshpass -p 'CamasmieGillet12@' scp -r -o StrictHostKeyChecking=no -o PubkeyAuthentication=no \
  /Users/alvarocamasmie/Downloads/koda-Landing/pages/ \
  root@72.60.164.154:/var/www/getkoda-landing/pages/
```

- [ ] **Step 3: Upload new assets**
```bash
sshpass -p 'CamasmieGillet12@' scp -r -o StrictHostKeyChecking=no -o PubkeyAuthentication=no \
  /Users/alvarocamasmie/Downloads/koda-Landing/assets/generated/ \
  root@72.60.164.154:/var/www/getkoda-landing/assets/generated/
```

- [ ] **Step 4: Verify all pages load with 200 status**

```bash
for page in index about contact how-it-works use-cases use-case-legal use-case-finance use-case-business security-overview integrations pricing demo customers tos privacy cookies security terms; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "https://allybi.co/homepage/$page.html")
  echo "$code $page.html"
done
```

- [ ] **Step 5: Commit any final fixes**

---

### Task 40: Final verification and documentation

- [ ] **Step 1: Verify no legacy `getkoda.ai` references remain in deployed files**
- [ ] **Step 2: Verify no `mobile application` references remain (from previous legal fixes)**
- [ ] **Step 3: Verify FAQ sections have valid FAQ schema**
- [ ] **Step 4: Take screenshots at 1440px and 390px for key pages**
- [ ] **Step 5: Write summary of changes, file map, token system, and omitted claims**

---

## Intentionally Omitted Claims

The following were NOT included because they lack verification:
- Customer logos or counts ("Used by 50+ firms" — removed)
- Specific compliance certifications (ISO 27001, SOC 2 — not certified)
- Response time guarantees for contact form
- Specific performance benchmarks
- Named customer testimonials
- Real team photos/bios (placeholder "How we build" section used instead)
- Pricing numbers (configurable placeholder structure used)

## File Map Summary

**New files (created):**
- `allybi-tokens.css` — design token system
- `allybi-base.css` — reset, typography, layout
- `allybi-components.css` — reusable components
- `allybi-header.css` — header styles
- `allybi-header.js` — header behavior
- `allybi-footer.css` — footer styles
- `allybi-animations.js` — scroll animations
- `_template.html` — page template
- `pages/home.css` — homepage styles
- `pages/about.css` — about page styles
- `pages/contact.css` — contact page styles
- `pages/how-it-works.css` — how it works styles
- `pages/use-cases.css` — use cases overview styles
- `pages/use-case-legal.css`, `use-case-finance.css`, `use-case-business.css`
- `pages/security-overview.css` — security marketing page
- `pages/integrations.css` — integrations page
- `pages/pricing.css` — pricing page
- `pages/demo.css` — demo/booking page
- `pages/customers.css` — proof page
- `how-it-works.html`, `use-cases.html`, `use-case-legal.html`, `use-case-finance.html`, `use-case-business.html`
- `security-overview.html`, `integrations.html`, `pricing.html`, `demo.html`, `customers.html`
- `assets/generated/` — all new SVG visuals

**Modified files:**
- `index.html` — complete rewrite
- `about.html` — complete rewrite
- `contact.html` — complete rewrite
- `tos.html`, `privacy.html`, `cookies.html`, `security.html`, `terms.html` — shell modernization
- `translations/en.json`, `pt.json`, `es.json` — extended

**Deleted files:**
- `*_fixed.html` backups
- `mobile.html`
- `waitlist.html`
