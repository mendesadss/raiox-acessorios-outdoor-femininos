const { chromium } = require('C:/Users/nican/.claude/skills/raio-x/node_modules/playwright');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { pathToFileURL } = require('url');

(async () => {
  const base = path.resolve(__dirname, '..');
  const out = path.join(os.tmpdir(), 'raiox-outdoor-femininos-qa');
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const problems = [];
  const pages = [
    ['painel', 'Pesquisa - clique aqui.html'],
    ['demanda', 'paginas/demanda.html'],
    ['criativos', 'paginas/anuncios.html'],
    ['identidade', 'paginas/identidade-visual.html'],
    ['plano', 'paginas/plano-de-acao.html']
  ];
  const viewports = [
    ['mobile', { width: 390, height: 844 }],
    ['tablet', { width: 768, height: 900 }],
    ['desktop', { width: 1440, height: 1000 }]
  ];

  for (const [pageName, relative] of pages) {
    for (const [viewportName, viewport] of viewports) {
      const context = await browser.newContext({ viewport });
      const page = await context.newPage();
      await page.goto(pathToFileURL(path.join(base, relative)).href, { waitUntil: 'networkidle' });
      await page.waitForTimeout(400);
      await page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += 700) {
          window.scrollTo(0, y);
          await new Promise(resolve => setTimeout(resolve, 12));
        }
        window.scrollTo(0, 0);
      });

      const audit = await page.evaluate(() => ({
        innerWidth: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        brokenImages: [...document.images].filter(image => !image.complete || image.naturalWidth === 0).map(image => image.getAttribute('src')),
        imageCount: document.images.length,
        colorBlocks: document.querySelectorAll('.swatch .sw').length,
        galleryColumns: (() => {
          const grid = document.querySelector('#galeria .grid.g3');
          return grid ? getComputedStyle(grid).gridTemplateColumns.split(' ').filter(Boolean).length : null;
        })(),
        text: document.body.innerText
      }));

      if (audit.scrollWidth > audit.innerWidth + 1) problems.push(`${pageName}/${viewportName}: overflow horizontal ${audit.scrollWidth}px em ${audit.innerWidth}px`);
      if (audit.brokenImages.length) problems.push(`${pageName}/${viewportName}: ${audit.brokenImages.length} imagens quebradas`);
      if (pageName === 'identidade' && audit.imageCount < 32) problems.push(`${pageName}/${viewportName}: somente ${audit.imageCount}/32 referências visíveis`);
      if (pageName === 'identidade' && audit.colorBlocks < 7) problems.push(`${pageName}/${viewportName}: paleta incompleta`);
      if (pageName === 'plano' && audit.colorBlocks < 7) problems.push(`${pageName}/${viewportName}: paleta incompleta`);
      if (pageName === 'criativos' && viewportName === 'desktop' && audit.galleryColumns !== 3) problems.push(`${pageName}/${viewportName}: galeria tem ${audit.galleryColumns} colunas, esperado 3`);
      if (pageName === 'criativos' && viewportName === 'mobile' && audit.galleryColumns !== 1) problems.push(`${pageName}/${viewportName}: galeria tem ${audit.galleryColumns} colunas, esperado 1`);
      if (pageName === 'demanda') for (const marker of ['57M', '918M', '6,3M', '19M', '68%', '21,1M', '15,5M']) if (!audit.text.includes(marker)) problems.push(`${pageName}/${viewportName}: dado ausente ${marker}`);

      if (viewportName !== 'tablet') await page.screenshot({ path: path.join(out, `${pageName}-${viewportName}.png`), fullPage: pageName === 'demanda' || pageName === 'criativos' });
      await context.close();
    }
  }

  await browser.close();
  console.log('REVISÃO HEADLESS RAIO-X');
  if (problems.length) {
    problems.forEach(problem => console.log('x ' + problem));
    process.exit(1);
  }
  console.log('PROBLEMAS: nenhum. 5 páginas, 3 viewports, imagens, paletas, dados e grid responsivo aprovados.');
  console.log(`Evidências: ${out}`);
})().catch(error => {
  console.error(error);
  process.exit(1);
});
