# Allybi Homepage V2 — Elite Redesign Spec

## Goal
Redesign the homepage so a senior lawyer or banker understands the product in 5 seconds. Cut from 12 sections / 1800 words to 9 sections / ~500 words. Double the whitespace. Make every pixel intentional.

## Architecture (9 sections)

### 1. HERO
- **Headline (8 words):** "The right file. Found in seconds."
- **Subhead (22 words):** "Allybi is a private AI workspace that finds, compares, and acts on your documents — with grounded answers and explicit confirmation."
- **Primary CTA:** "Request demo" → /homepage/request-demo.html
- **Secondary CTA:** "See how it works" → #how-it-works
- **Trust micro-strip (3 chips):** Grounded in your files · No model training · Confirmation before send
- **Visual:** Product workspace scene (the existing hero-scene composition, cleaned up)
- **Layout:** 5fr text / 7fr visual on desktop. Text stacks above on mobile.
- **Min-height:** 90vh desktop, auto mobile

### 2. TRUST BAND
- **No headline. Just proof.**
- **Format:** Horizontal band, muted background, 4-5 trust statements with small icons
- **Content:** End-to-end encrypted · Grounded answers only · No model training · Region controls · Confirmation before every send
- **Style:** 13px text, muted color, subtle border top/bottom, generous horizontal spacing

### 3. PRODUCT VALUE — FIND / COMPARE / ACT
- **Section headline (6 words):** "Three moves. Total clarity."
- **Layout:** 3-column grid on desktop, stacked on mobile
- **Card 1 — Find:** "Find the exact file, clause, or number." Icon + 1 sentence.
- **Card 2 — Compare:** "Compare versions and spot what changed." Icon + 1 sentence.
- **Card 3 — Act:** "Edit, reply, and send — with confirmation." Icon + 1 sentence.
- **Each card:** Large icon (48px), bold title, one-line description. Max 15 words per card.
- **Style:** Cards with subtle border, generous padding (40px), no hover lift (calm, not playful)

### 4. HOW IT WORKS
- **Headline:** "How Allybi works"
- **Subhead:** "Three steps. No learning curve."
- **Layout:** 3 numbered steps, horizontal on desktop, vertical on mobile
- **Step 1:** "Bring in your files" — Upload docs, connect email, link Slack.
- **Step 2:** "Ask in plain language" — Get grounded answers with exact sources.
- **Step 3:** "Act with confidence" — Edit, reply, send. Always with confirmation.
- **Style:** Each step in a clean card, number badge, icon, title, one-line body. Connected by subtle dashed line.

### 5. USE CASES
- **Headline:** "Built for teams that handle sensitive work."
- **Layout:** 3 tabs (Legal / Finance / Business), segmented control at top
- **Per tab:** One outcome headline (max 10 words), 3 bullets, CTA to dedicated page, small product visual
- **Legal:** "Search clauses. Compare drafts. Send the right version."
- **Finance:** "Find the number. Pull the deck. Respond fast."
- **Business:** "Organize proposals. Find answers. Move forward."
- **Style:** Text left, visual right on desktop. Stacked on mobile. Smooth crossfade.

### 6. SECURITY & CONTROL
- **Headline:** "Private by design."
- **Layout:** Left: 4 trust points with icons. Right: Simple architecture diagram.
- **Points:** Encryption at rest and in transit · No model training · Explicit send confirmation · Workspace isolation
- **CTA:** "View security overview" → /homepage/security-overview.html
- **Style:** Alt background (light gray), generous padding

### 7. INTEGRATIONS
- **Headline:** "Works where your files already live."
- **Subhead:** "No migration required."
- **Layout:** 4 integration cards centered
- **Cards:** Gmail, Outlook, Slack, Docs & Sheets — each with icon, name, one line
- **CTA:** "View all integrations" → /homepage/integrations.html

### 8. CUSTOMER STORIES (Placeholder System)
- **Headline:** "How teams work with Allybi."
- **Layout:** 3 story cards
- **Each card:** Role title, team type, one concrete outcome sentence, small avatar placeholder
- **Note:** No fake names or logos. Cards labeled "Representative workflow" until real stories available.
- **CTA:** "See customer stories" → /homepage/customers.html

### 9. FINAL CTA
- **Headline:** "Your documents deserve better."
- **Subhead:** "See what Allybi can do for your team."
- **Single CTA:** "Request demo" → /homepage/request-demo.html
- **Style:** Dark background, white text, single centered button. Minimal. Confident.

## Copy Word Budget
- Hero: ~30 words
- Trust band: ~25 words
- Value prop: ~50 words
- How it works: ~60 words
- Use cases: ~90 words (across 3 tabs)
- Security: ~40 words
- Integrations: ~30 words
- Customer stories: ~45 words
- Final CTA: ~15 words
- **Total: ~385 words** (down from 1800)

## CTA Map
- "Request demo" → /homepage/request-demo.html (PRIMARY everywhere)
- "See how it works" → #how-it-works (hero secondary)
- "See legal use cases" → /homepage/use-case-legal.html
- "See finance use cases" → /homepage/use-case-finance.html
- "See business use cases" → /homepage/use-case-business.html
- "View security overview" → /homepage/security-overview.html
- "View all integrations" → /homepage/integrations.html
- "See customer stories" → /homepage/customers.html
- "Sign in" → https://app.allybi.co/login
- All nav dropdowns → existing pages

## Visual Direction
- Section padding: 140px desktop, 80px mobile
- Max content width: 1160px
- Hero min-height: 90vh
- Card padding: 40px desktop, 24px mobile
- Card radius: 20px
- No card hover lifts (calm, not playful)
- Typography: Plus Jakarta Sans, hero H1 clamp(36px, 5vw, 68px)
- Colors: existing allybi-tokens palette (no changes needed)
- Trust band: bg var(--allybi-bg-alt-1), subtle borders

## Motion
- Hero: staged reveal (eyebrow → h1 → subhead → CTAs → visual), total 800ms
- Sections: fade-up on scroll via IntersectionObserver, 380ms
- Tabs: 200ms crossfade
- Reduced motion: instant visibility, no transforms

## New Page: /homepage/request-demo.html
- Hero: "See Allybi in action."
- Subhead: "Tell us about your team and we'll set up a personalized walkthrough."
- Form fields: Name, Work email, Company, Role (dropdown), Team size (dropdown), Primary use case (dropdown), Message (optional)
- Submit: "Request demo"
- Below form: "We typically respond within one business day."
- Style: Two-column — form left, product preview right. Stacks on mobile.
