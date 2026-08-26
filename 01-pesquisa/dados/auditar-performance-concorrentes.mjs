import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('C:/Users/nican/.codex/cache/captura-web-responsiva/playwright-core-1.62.1/node_modules/playwright-core');

const sites = [
  ['Free Fly', 'home', 'https://freeflyapparel.com/'],
  ['Free Fly', 'pdp', 'https://freeflyapparel.com/products/womens-breeze-drift-pant-storm-cloud'],
  ['FisheWear', 'home', 'https://fishewear.com/'],
  ['FisheWear', 'pdp', 'https://fishewear.com/products/enchanted-grayling-1-4-zip-sunshirt'],
  ['Miss Mayfly', 'home', 'https://missmayfly.com/'],
  ['Miss Mayfly', 'pdp', 'https://missmayfly.com/products/evo-chest-wader'],
  ['Tilda Outdoors', 'home', 'https://tildaoutdoors.com.au/'],
  ['Tilda Outdoors', 'pdp', 'https://tildaoutdoors.com.au/products/hanging-camp-organiser'],
];

const browser = await chromium.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
  args: ['--disable-blink-features=AutomationControlled', '--no-first-run'],
});

const results = [];
for (const [competitor, pageType, url] of sites) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    screen: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    locale: 'en-US',
  });
  const page = await context.newPage();
  const failures = [];
  const consoleErrors = [];
  page.on('requestfailed', request => failures.push({ url: request.url(), error: request.failure()?.errorText || 'unknown' }));
  page.on('console', message => { if (message.type() === 'error') consoleErrors.push(message.text()); });
  const started = Date.now();
  let status = 'ok';
  let error = null;
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForLoadState('load', { timeout: 30000 }).catch(() => {});
    await page.waitForTimeout(3500);
  } catch (caught) {
    status = 'partial';
    error = String(caught?.message || caught);
  }
  const metrics = await page.evaluate(() => {
    const resources = performance.getEntriesByType('resource');
    const nav = performance.getEntriesByType('navigation')[0];
    const byType = {};
    for (const resource of resources) {
      const type = resource.initiatorType || 'other';
      if (!byType[type]) byType[type] = { count: 0, transferBytes: 0, encodedBytes: 0 };
      byType[type].count += 1;
      byType[type].transferBytes += resource.transferSize || 0;
      byType[type].encodedBytes += resource.encodedBodySize || 0;
    }
    return {
      title: document.title,
      finalUrl: location.href,
      h1: [...document.querySelectorAll('h1')].map(node => node.textContent.trim()).filter(Boolean),
      domContentLoadedMs: nav?.domContentLoadedEventEnd || null,
      loadEventMs: nav?.loadEventEnd || null,
      responseEndMs: nav?.responseEnd || null,
      resourceCount: resources.length,
      transferBytes: resources.reduce((sum, resource) => sum + (resource.transferSize || 0), 0),
      encodedBytes: resources.reduce((sum, resource) => sum + (resource.encodedBodySize || 0), 0),
      byType,
      domImages: document.images.length,
      lazyImages: [...document.images].filter(image => image.loading === 'lazy').length,
      scripts: document.scripts.length,
      scrollHeight: document.documentElement.scrollHeight,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    };
  }).catch(() => ({}));
  results.push({
    competitor,
    pageType,
    requestedUrl: url,
    status,
    elapsedObservedMs: Date.now() - started,
    ...metrics,
    failedRequestCount: failures.length,
    failures: failures.slice(0, 20),
    consoleErrorCount: consoleErrors.length,
    consoleErrors: consoleErrors.slice(0, 20),
    error,
    note: 'Laboratory snapshot without network throttling. This is diagnostic evidence, not field Core Web Vitals.',
  });
  console.log(`Auditado: ${competitor} ${pageType}`);
  await context.close();
}

await browser.close();
fs.writeFileSync(path.resolve('performance-concorrentes.json'), JSON.stringify({ capturedAt: new Date().toISOString(), viewport: '390x844', results }, null, 2));
