import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const page = path.join(here, '..', 'paginas', 'anuncios.html');
const ads = JSON.parse(fs.readFileSync(path.join(here, 'anuncios-curados.json'), 'utf8'));
const mediaByAd = new Map(ads.map(ad => [String(ad.adArchiveId), (ad.imageUrls || [])[0] || (ad.videoPreviewUrls || [])[0] || '']));
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
let html = fs.readFileSync(page, 'utf8');
const nav = '<nav class="nav" id="top"><div class="wrap"><a class="home" href="../Pesquisa%20-%20clique%20aqui.html">◊ Painel</a><a href="estrategia.html">Estratégia</a><a href="plano-de-acao.html">Plano</a><a href="mercados.html">Mercados</a><a href="demanda.html">Demanda</a><a href="identidade-visual.html">Identidade visual</a><a class="on" href="anuncios.html">Criativos</a></div><div class="wrap lojasnav"><span class="lbl">Lojas do raio-x</span><a href="loja-side-sling.html">SideSling</a><a href="loja-fishewear.html">FisheWear</a><a href="loja-missmayfly.html">Miss Mayfly</a><a href="loja-tildaoutdoors.html">Tilda Outdoors</a><a href="loja-freefly.html">Free Fly</a></div></nav>';
const tocPattern = /<div class="toc"><div class="wrap">[\s\S]*?<\/div>\s*<\/div>/;
const toc = html.match(tocPattern)?.[0] || '';
html = html.replace(tocPattern, '');
html = html.replace('<body>', '<body>' + nav).replace('<header id="top">', '<header>');
html = html.replace('</header>', '</header>' + toc);
html = html.replace('</body>', '<footer><div class="wrap"><p>Criativos públicos curados da Meta Ad Library. Copie estrutura e clareza, nunca marca, mídia ou identidade.</p><a href="#top" class="backtotop">↑</a></div></footer></body>');
html = html.replace(/<div class="toplinks">([\s\S]*?ads\/library\/\?id=(\d+)[\s\S]*?<\/div>)/g, (all, links, id) => {
  const remoteMedia = mediaByAd.get(id);
  const localMedia = path.join(here, '..', 'paginas', 'criativos', id + '.jpg');
  const media = fs.existsSync(localMedia) ? 'criativos/' + id + '.jpg' : remoteMedia;
  if (!media) return all;
  return '<div class="frame"><img src="' + escape(media) + '" alt="Criativo público da Meta Ad Library"></div>' + all;
});
html = html.replaceAll('—', ',');
fs.writeFileSync(page, html);
console.log('Página de criativos normalizada com navegação e fontes reais.');
