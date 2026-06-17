import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const BASE = 'http://localhost:8080/pricing.html';
const OUT = '/Users/alvarocamasmie/Downloads/koda-Landing/qa-screenshots/pricing-before';
const VIEWPORTS = [
  { name: '360',  w: 360,  h: 780,  device: 'mobile'  },
  { name: '390',  w: 390,  h: 844,  device: 'mobile'  },
  { name: '430',  w: 430,  h: 932,  device: 'mobile'  },
  { name: '768',  w: 768,  h: 1024, device: 'tablet'  },
  { name: '1024', w: 1024, h: 768,  device: 'desktop' },
  { name: '1366', w: 1366, h: 768,  device: 'desktop' },
  { name: '1440', w: 1440, h: 900,  device: 'desktop' },
  { name: '1920', w: 1920, h: 1080, device: 'desktop' },
];
await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();
const report = { url: BASE, viewports: [] };
for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: 2, locale: 'pt-BR' });
  const p = await ctx.newPage();
  const consoleMessages = [];
  p.on('console', m => { if (['error','warning'].includes(m.type())) consoleMessages.push({ type: m.type(), text: m.text() }); });
  await p.goto(BASE + '?lang=pt', { waitUntil: 'networkidle' });
  await p.waitForTimeout(2500);
  await p.screenshot({ path: join(OUT, vp.name + '_pt_fold.png'), fullPage: false });
  await p.screenshot({ path: join(OUT, vp.name + '_pt_full.png'), fullPage: true });
  const overflow = await p.evaluate(() => {
    const d = document.documentElement;
    return { sw: d.scrollWidth, cw: d.clientWidth, has: d.scrollWidth > d.clientWidth };
  });
  if (vp.device !== 'desktop') {
    try {
      const trigger = await p.$('[aria-label*="menu" i]');
      if (trigger) { await trigger.click(); await p.waitForTimeout(400); await p.screenshot({ path: join(OUT, vp.name + '_pt_menu.png'), fullPage: false }); }
    } catch (e) {}
  }
  report.viewports.push({ name: vp.name, device: vp.device, consoleMessages, overflow });
  await ctx.close();
  console.log(vp.name + 'px done');
}
await browser.close();
await writeFile(join(OUT, 'report.json'), JSON.stringify(report, null, 2));
console.log('Pricing captured');
