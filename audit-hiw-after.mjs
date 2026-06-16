// Visual audit of how-it-works.html across 8 breakpoints in PT and EN.
// Captures above-the-fold + full-page + mobile menu, detects horizontal overflow,
// reports console errors, network failures, and PT leaks on EN render.
import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const BASE = 'http://localhost:8080/how-it-works.html';
const OUT = '/Users/alvarocamasmie/Downloads/koda-Landing/qa-screenshots/how-it-works-redesign';

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

const report = { url: BASE, capturedAt: new Date().toISOString(), viewports: [] };

const browser = await chromium.launch();

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.w, height: vp.h },
    deviceScaleFactor: 2,
    locale: 'pt-BR',
  });
  const page = await ctx.newPage();
  const consoleMessages = [];
  const failedRequests = [];
  page.on('console', msg => {
    if (['error', 'warning'].includes(msg.type())) consoleMessages.push({ type: msg.type(), text: msg.text() });
  });
  page.on('requestfailed', req => failedRequests.push({ url: req.url(), failure: req.failure()?.errorText }));

  await page.goto(BASE + '?lang=pt', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);

  await page.screenshot({ path: join(OUT, vp.name + '_pt_fold.png'), fullPage: false });
  await page.screenshot({ path: join(OUT, vp.name + '_pt_full.png'), fullPage: true });

  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    const scrollW = doc.scrollWidth;
    const clientW = doc.clientWidth;
    const overflowingEls = [];
    document.querySelectorAll('*').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.right > clientW + 1) {
        overflowingEls.push({ tag: el.tagName, cls: (el.className || '').toString().slice(0, 80), right: Math.round(r.right), width: Math.round(r.width) });
      }
    });
    return { scrollW, clientW, hasHOverflow: scrollW > clientW, overflowingEls: overflowingEls.slice(0, 10) };
  });

  let menuShot = null;
  if (vp.device !== 'desktop') {
    try {
      const trigger = await page.$('[aria-label*="menu" i], .mobile-menu-toggle, .nav-mobile-toggle, button[aria-controls*="menu"]');
      if (trigger) {
        await trigger.click();
        await page.waitForTimeout(500);
        menuShot = join(OUT, vp.name + '_pt_menu.png');
        await page.screenshot({ path: menuShot, fullPage: false });
      }
    } catch (e) {}
  }

  await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: join(OUT, vp.name + '_en_full.png'), fullPage: true });
  await page.screenshot({ path: join(OUT, vp.name + '_en_fold.png'), fullPage: false });

  const ptLeak = await page.evaluate(() => {
    const ptMarkers = [
      'em breve', 'cadastrar', 'destinatário', 'fonte:', 'enviar via',
      'pesquise', 'integração', 'mensal', 'mês', 'grátis', 'fluxo',
      'pergunte', 'conecte', 'documento certo', 'em uma mensagem',
      'depois da revisão', 'antes de enviar', 'enviar pelo outlook',
      'nada sai sem', 'revise antes', 'envia e-mails'
    ];
    const matches = [];
    const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = tw.nextNode())) {
      const t = n.textContent.trim();
      if (!t) continue;
      const lc = t.toLowerCase();
      for (const m of ptMarkers) {
        if (lc.includes(m)) {
          const p = n.parentElement;
          matches.push({ marker: m, text: t.slice(0, 120), parentTag: p?.tagName, parentClass: (p?.className || '').toString().slice(0, 80), i18nKey: p?.getAttribute('data-i18n-key') || null });
          break;
        }
      }
    }
    return matches.slice(0, 25);
  });

  report.viewports.push({
    name: vp.name, w: vp.w, h: vp.h, device: vp.device,
    consoleMessages, failedRequests, overflow,
    menuCaptured: !!menuShot, ptLeakOnEnRender: ptLeak,
  });

  await ctx.close();
  console.log('done ' + vp.name + 'px (overflow=' + overflow.hasHOverflow + ', errors=' + consoleMessages.length + ', ptLeaks=' + ptLeak.length + ')');
}

await browser.close();
await writeFile(join(OUT, 'report.json'), JSON.stringify(report, null, 2));
console.log('\nReport written:', join(OUT, 'report.json'));
