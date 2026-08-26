import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import fs from 'node:fs';

const require = createRequire(import.meta.url);
const { chromium } = require('C:/Users/nican/.codex/cache/captura-web-responsiva/playwright-core-1.62.1/node_modules/playwright-core');
const here = path.dirname(fileURLToPath(import.meta.url));
const research = path.resolve(here, '..');
const output = path.join(research, 'capturas-blueprint');
fs.mkdirSync(output, { recursive: true });

const browser = await chromium.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
  args: ['--no-first-run', '--disable-background-networking'],
});

const pages = [
  ['shecurrent-home', path.join(research, 'paginas', 'mockup-home.html')],
  ['shecurrent-pdp', path.join(research, 'paginas', 'mockup-pdp.html')],
];
const viewports = [
  ['mobile', 390, 844, true],
  ['desktop', 1280, 900, false],
];

for (const [name, file] of pages) {
  for (const [viewportName, width, height, isMobile] of viewports) {
    const context = await browser.newContext({ viewport: { width, height }, isMobile, deviceScaleFactor: 1 });
    const page = await context.newPage();
    await page.goto(pathToFileURL(file).href, { waitUntil: 'load' });
    await page.evaluate(async () => {
      const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
      const root = document.scrollingElement || document.documentElement;
      for (let y = 0; y < root.scrollHeight; y += Math.max(500, innerHeight * 0.75)) {
        scrollTo(0, y);
        await pause(80);
      }
      await Promise.race([
        Promise.all([...document.images].map(image => image.decode().catch(() => {}))),
        pause(3000),
      ]);
      scrollTo(0, 0);
      await pause(250);
    });
    await page.screenshot({ path: path.join(output, `${name}-${viewportName}-fold.png`) });
    await page.screenshot({ path: path.join(output, `${name}-${viewportName}-full.png`), fullPage: true });
    const diagnostics = await page.evaluate(() => ({
      title: document.title,
      viewport: { width: innerWidth, height: innerHeight },
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
      images: [...document.images].map(image => ({ src: image.getAttribute('src'), complete: image.complete, naturalWidth: image.naturalWidth })),
    }));
    fs.writeFileSync(path.join(output, `${name}-${viewportName}.json`), JSON.stringify(diagnostics, null, 2));
    await context.close();
  }
}

await browser.close();
console.log(`Blueprints capturados em segundo plano: ${output}`);
