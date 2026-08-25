const { chromium } = require('C:/Users/nican/.claude/skills/raio-x/node_modules/playwright');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

(async () => {
  const base = path.resolve(__dirname, '..');
  const out = path.join(__dirname, 'qa');
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({ headless: true });

  async function capture(name, relative, viewport, fullPage = false) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    await page.goto(pathToFileURL(path.join(base, relative)).href, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(out, name), fullPage });
    await context.close();
  }

  await capture('painel-desktop.png', 'Pesquisa - clique aqui.html', { width: 1440, height: 1000 });
  await capture('painel-mobile.png', 'Pesquisa - clique aqui.html', { width: 390, height: 844 });
  await capture('mockup-home-desktop.png', 'paginas/mockup-home.html', { width: 1280, height: 900 }, true);
  await capture('mockup-pdp-mobile.png', 'paginas/mockup-pdp.html', { width: 390, height: 844 }, true);
  await capture('identidade-mobile.png', 'paginas/identidade-visual.html', { width: 390, height: 844 });
  const external = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const side = await external.newPage();
  await side.goto('https://side-sling.com/products/the-sidesling', { waitUntil: 'domcontentloaded', timeout: 45000 });
  await side.waitForTimeout(3500);
  for (const selector of ['button:has-text("No, thanks")', 'button:has-text("No thanks")', '[aria-label="Close"]']) {
    try {
      const button = side.locator(selector).first();
      if (await button.isVisible({ timeout: 700 })) {
        await button.click({ timeout: 1500 });
        break;
      }
    } catch {}
  }
  await side.screenshot({ path: path.join(base, 'paginas', 'prints', 'side-sling-pdp.jpg'), fullPage: true, type: 'jpeg', quality: 72 });
  await external.close();
  await browser.close();
  console.log(out);
})();
