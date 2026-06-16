import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const PAGES = [
  { name: 'legal',    url: 'http://localhost:8080/use-case-legal.html' },
  { name: 'finance',  url: 'http://localhost:8080/use-case-finance.html' },
  { name: 'business', url: 'http://localhost:8080/use-case-business.html' },
];
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

const OUT_BASE = '/Users/alvarocamasmie/Downloads/koda-Landing/qa-screenshots/use-cases-redesign';
await mkdir(OUT_BASE, { recursive: true });

const browser = await chromium.launch();

for (const page of PAGES) {
  const OUT = join(OUT_BASE, page.name);
  await mkdir(OUT, { recursive: true });
  const report = { url: page.url, viewports: [] };

  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: 2, locale: 'pt-BR' });
    const p = await ctx.newPage();
    const consoleMessages = [];
    p.on('console', msg => { if (['error', 'warning'].includes(msg.type())) consoleMessages.push({ type: msg.type(), text: msg.text() }); });
    await p.goto(page.url + '?lang=pt', { waitUntil: 'networkidle' });
    await p.waitForTimeout(2500);
    await p.screenshot({ path: join(OUT, vp.name + '_pt_fold.png'), fullPage: false });
    await p.screenshot({ path: join(OUT, vp.name + '_pt_full.png'), fullPage: true });
    const overflow = await p.evaluate(() => {
      const d = document.documentElement;
      return { sw: d.scrollWidth, cw: d.clientWidth, hasH: d.scrollWidth > d.clientWidth };
    });
    if (vp.device !== 'desktop') {
      try {
        const trigger = await p.$('[aria-label*="menu" i]');
        if (trigger) { await trigger.click(); await p.waitForTimeout(400); await p.screenshot({ path: join(OUT, vp.name + '_pt_menu.png'), fullPage: false }); }
      } catch (e) {}
    }
    report.viewports.push({ name: vp.name, w: vp.w, device: vp.device, consoleMessages, overflow });
    await ctx.close();
    console.log(page.name + ' ' + vp.name + 'px done');
  }
  await writeFile(join(OUT, 'report.json'), JSON.stringify(report, null, 2));
}
await browser.close();
console.log('All pages captured');
