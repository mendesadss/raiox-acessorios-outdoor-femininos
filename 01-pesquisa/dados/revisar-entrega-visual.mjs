import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, '..');
const build = JSON.parse(fs.readFileSync(path.join(here, 'build.json'), 'utf8'));
const refs = path.join(root, 'Referencia de imagens - cena e prompt');
const problems = [];
for (const product of build.referencias_produtos || []) {
  const dir = path.join(refs, product.product_handle);
  const carouselDir = path.join(dir, 'carrossel-concorrente');
  const files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
  if (!files.includes('manifest.json')) problems.push(`${product.product_handle}: falta manifest.json`);
  if (!files.includes('prompts.json')) problems.push(`${product.product_handle}: falta prompts.json`);
  if (!files.includes('PROMPTS-EM-INGLES.md')) problems.push(`${product.product_handle}: falta PROMPTS-EM-INGLES.md`);
  if (!files.includes('MODELO-DE-PAGINA.md')) problems.push(`${product.product_handle}: falta MODELO-DE-PAGINA.md`);
  const screenshot = path.join(dir, 'modelo-pagina-concorrente.jpg');
  if (!fs.existsSync(screenshot) || fs.statSync(screenshot).size < 50000) problems.push(`${product.product_handle}: print integral da PDP ausente ou inválido`);
  if (!fs.existsSync(carouselDir)) {
    problems.push(`${product.product_handle}: pasta carrossel-concorrente ausente`);
    continue;
  }
  const imageFiles = fs.readdirSync(carouselDir).filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file));
  if (imageFiles.length !== product.carousel_count) problems.push(`${product.product_handle}: carrossel local ${imageFiles.length}/${product.carousel_count}`);
  if (product.references.length !== product.carousel_count) problems.push(`${product.product_handle}: prompts ${product.references.length}/${product.carousel_count}`);
  for (const reference of product.references) {
    const localFile = path.join(root, reference.reference_file);
    if (!fs.existsSync(localFile) || fs.statSync(localFile).size < 10000) problems.push(`${product.product_handle}: referência inválida ${reference.reference_file}`);
    if (reference.prompt.length < 2200 || !reference.prompt.includes('REFERENCE HIERARCHY') || !reference.prompt.includes('PRODUCT FIDELITY') || !reference.prompt.includes('2400 x 3000')) problems.push(`${product.product_handle}: prompt ${reference.position} fraco ou incompleto`);
  }
}
const prompts = [...build.identidade_visual.logos.map(x => x.prompt), ...build.imagens_pdp.sequencia.map(x => x.prompt)];
for (const [index, prompt] of prompts.entries()) {
  if (!/^ROLE: You are/i.test(prompt) || prompt.length < 700) problems.push(`prompt ${index + 1}: não atende o padrão profissional em inglês`);
}
const plan = fs.readFileSync(path.join(root, 'paginas', 'plano-de-acao.html'), 'utf8');
const visual = fs.readFileSync(path.join(root, 'paginas', 'identidade-visual.html'), 'utf8');
const demand = fs.readFileSync(path.join(root, 'paginas', 'demanda.html'), 'utf8');
const ads = fs.readFileSync(path.join(root, 'paginas', 'anuncios.html'), 'utf8');
if ((plan.match(/display:block;background:/g) || []).length < 7) problems.push('plano: paleta não exibe sete blocos de cor');
if ((visual.match(/display:block;background:/g) || []).length < 7) problems.push('identidade: paleta não exibe sete blocos de cor');
if ((visual.match(/carrossel-concorrente\/referencia-/g) || []).length !== 64) problems.push('identidade: referências 1:1 não aparecem como imagem e caminho em todos os 32 cards');
if (!demand.includes('O que a mídia qualificada confirma')) problems.push('demanda: camada de evidência qualificada ausente');
for (const marker of ['57M', '918M', '6,3M', '19M', '68%', '21,1M', '15,5M']) if (!demand.includes(marker)) problems.push(`demanda: dado oficial ausente, ${marker}`);
if ((ads.match(/src="criativos\//g) || []).length < 16) problems.push('criativos: galeria local com menos de 16 peças');
if ((ads.match(/max-width:100%;height:auto;max-height:520px/g) || []).length < 24) problems.push('criativos: mídia sem limite responsivo em todos os cards');
console.log('REVISÃO VISUAL RAIO-X');
if (problems.length) { problems.forEach(problem => console.log('x ' + problem)); process.exit(1); }
console.log('PROBLEMAS: nenhum. Referências, prompts, paletas, demanda e galeria atendem o padrão reforçado.');
