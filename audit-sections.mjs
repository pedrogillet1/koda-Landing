// Per-section audit: scroll through, trigger reveals, capture each section
// individually at one mobile and one desktop viewport.
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const BASE = 'http://localhost:8080/index.html?lang=pt';
const OUT = '/Users/alvarocamasmie/Downloads/koda-Landing/qa-screenshots/before';
await mkdir(OUT, { recursive: true });

const VIEWS = [
  { name: '360_mobile',  w: 360,  h: 800  },
  { name: '1440_desktop', w: 1440, h: 900 },
];

const browser = await chromium.launch();

for (const v of VIEWS) {
  const ctx = await browser.newContext({
    viewport: { width: v.w, height: v.h },
    deviceScaleFactor: 2,
    locale: 'pt-BR',
  });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  // Scroll through the entire page slowly to trigger every reveal observer
  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  const step = v.h * 0.6;
  for (let y = 0; y < totalHeight; y += step) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(150);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);

  // Identify all main sections
  const sections = await page.evaluate(() => {
    const candidates = document.querySelectorAll(
      'main > section, main > div > section, body > section, .s-pain, .s-workflow, .s-integrations, .s-security, .s-usecase, .s-pricing, .s-tools, .s-faq, .s-final-cta, .s-trust, .s-action'
    );
    const out = [];
    const seen = new Set();
    candidates.forEach((el, i) => {
      if (seen.has(el)) return;
      seen.add(el);
      const r = el.getBoundingClientRect();
      const cls = (el.className || '').toString().split(/\s+/)[0] || el.tagName.toLowerCase();
      const id = el.id || cls + '-' + i;
      out.push({
        id, cls,
        top: Math.round(r.top + window.scrollY),
        h: Math.round(r.height),
      });
    });
    return out;
  });

  // Capture each section at scroll position
  for (const s of sections) {
    if (s.h < 100) continue;
    await page.evaluate((y) => window.scrollTo(0, Math.max(0, y - 20)), s.top);
    await page.waitForTimeout(350);
    const safeName = s.id.replace(/[^a-z0-9_-]/gi, '_').slice(0, 40);
    try {
      await page.screenshot({
        path: join(OUT, `${v.name}_section_${safeName}.png`),
        fullPage: false,
      });
    } catch (e) {
      console.log(`  failed: ${safeName}: ${e.message}`);
    }
  }

  console.log(`✓ ${v.name}: ${sections.length} sections captured`);
  await ctx.close();
}
await browser.close();
