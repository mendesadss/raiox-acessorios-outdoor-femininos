import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('C:/Users/nican/.codex/cache/captura-web-responsiva/playwright-core-1.62.1/node_modules/playwright-core');

const output = path.resolve('../capturas-concorrentes');
const browser = await chromium.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
  args: ['--disable-blink-features=AutomationControlled', '--no-first-run'],
});

const sites = [
  ['fishewear-home', 'https://fishewear.com/'],
  ['fishewear-pdp', 'https://fishewear.com/products/enchanted-grayling-1-4-zip-sunshirt'],
  ['missmayfly-home', 'https://missmayfly.com/'],
  ['missmayfly-pdp', 'https://missmayfly.com/products/evo-chest-wader'],
];

const viewports = [
  ['mobile', 390, 844, true],
  ['desktop', 1280, 900, false],
];

async function removeMarketingOverlays(page) {
  await page.keyboard.press('Escape').catch(() => {});
  await page.waitForTimeout(500);
  await page.evaluate(() => {
    const phrases = [
      '10% OFF YOUR FIRST ORDER',
      'WIN A $150 GIFT CARD',
      'Get 15% Off',
    ];
    const candidates = [...document.querySelectorAll('body *')].filter(element => {
      const text = (element.textContent || '').replace(/\s+/g, ' ').trim();
      return phrases.some(phrase => text.includes(phrase));
    });
    for (const candidate of candidates) {
      let node = candidate;
      let selected = candidate;
      while (node && node !== document.body) {
        const style = getComputedStyle(node);
        const box = node.getBoundingClientRect();
        if ((style.position === 'fixed' || style.position === 'absolute') && box.width > 240 && box.height > 220) {
          selected = node;
        }
        node = node.parentElement;
      }
      selected.remove();
    }
    for (const element of [...document.querySelectorAll('body *')]) {
      const style = getComputedStyle(element);
      const box = element.getBoundingClientRect();
      const area = box.width * box.height;
      const viewportArea = innerWidth * innerHeight;
      const isBackdrop = style.position === 'fixed' && area > viewportArea * 0.65 && Number.parseFloat(style.opacity || '1') < 1;
      if (isBackdrop) element.remove();
    }
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
  });
  await page.waitForTimeout(500);
}

async function loadLazyContent(page) {
  await page.evaluate(async () => {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    for (let i = 0; i < 100; i += 1) {
      const root = document.scrollingElement || document.documentElement;
      const next = Math.min(root.scrollTop + Math.max(500, innerHeight * 0.8), root.scrollHeight);
      scrollTo(0, next);
      await delay(120);
      if (next + innerHeight >= root.scrollHeight - 4) break;
    }
    scrollTo(0, 0);
    await delay(500);
  });
}

for (const [slug, url] of sites) {
  for (const [viewportName, width, height, isMobile] of viewports) {
    const context = await browser.newContext({
      viewport: { width, height },
      screen: { width, height },
      isMobile,
      hasTouch: isMobile,
      locale: 'en-US',
    });
    const page = await context.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(2200);
    await removeMarketingOverlays(page);
    await loadLazyContent(page);
    await removeMarketingOverlays(page);
    await page.screenshot({ path: path.join(output, `${slug}-${viewportName}-clean-fold.png`), fullPage: false, animations: 'disabled' });
    await page.screenshot({ path: path.join(output, `${slug}-${viewportName}-clean-full.png`), fullPage: true, animations: 'disabled' });
    console.log(`Captura limpa: ${slug} ${viewportName}`);
    await context.close();
  }
}

await browser.close();
