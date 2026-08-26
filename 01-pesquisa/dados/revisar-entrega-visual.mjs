import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, '..');
const build = JSON.parse(fs.readFileSync(path.join(here, 'build.json'), 'utf8'));
const refs = path.join(root, 'Referencia de imagens - cena e prompt');
const problems = [];
for (const product of build.produtos) {
  const dir = path.join(refs, product.handle);
  const files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
  const imageCount = files.filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file)).length;
  if (imageCount < 3) problems.push(`${product.handle}: esperado mínimo de 3 referências visuais, encontrado ${imageCount}`);
  if (!files.includes('MODELO-DE-PAGINA.md')) problems.push(`${product.handle}: falta MODELO-DE-PAGINA.md`);
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
if (!demand.includes('O que a mídia qualificada confirma')) problems.push('demanda: camada de evidência qualificada ausente');
if ((ads.match(/src="criativos\//g) || []).length < 16) problems.push('criativos: galeria local com menos de 16 peças');
console.log('REVISÃO VISUAL RAIO-X');
if (problems.length) { problems.forEach(problem => console.log('x ' + problem)); process.exit(1); }
console.log('PROBLEMAS: nenhum. Referências, prompts, paletas, demanda e galeria atendem o padrão reforçado.');
