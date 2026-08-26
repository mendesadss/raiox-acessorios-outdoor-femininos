import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const page = path.join(here, '..', 'paginas', 'anuncios.html');
let html = fs.readFileSync(page, 'utf8');

const imageStyle = 'display:block;width:100%;max-width:100%;height:auto;max-height:520px;object-fit:contain;background:#f7f5ef;border-radius:8px;margin-bottom:12px';
const frameStyle = 'width:100%;max-width:100%;overflow:hidden;display:grid;place-items:center;background:#f7f5ef;border-radius:10px;margin:14px 0';
const videoStyle = 'display:block;width:100%;max-width:100%;height:auto;max-height:520px;object-fit:contain;background:#101817;border-radius:8px';
const responsiveCss = '<style id="creative-responsive-fix">@media(min-width:980px){#galeria .grid.g3,section[id^="marca-"] .grid.g3{grid-template-columns:repeat(3,minmax(0,1fr))}}@media(min-width:620px) and (max-width:979px){#galeria .grid.g3,section[id^="marca-"] .grid.g3{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:619px){#galeria .grid.g3,section[id^="marca-"] .grid.g3{grid-template-columns:minmax(0,1fr)}#galeria .card,section[id^="marca-"] .card{min-width:0}}</style>';

html = html.replaceAll('Criativo pÃºblico', 'Criativo público');
html = html.replaceAll('Criativos pÃºblicos', 'Criativos públicos');
if (!html.includes('id="creative-responsive-fix"')) html = html.replace('</head>', `${responsiveCss}</head>`);
html = html.replace(/<div class="frame"(?![^>]*style=)[^>]*>/g, `<div class="frame" style="${frameStyle}">`);
html = html.replace(/<img([^>]*?)style="[^"]*"([^>]*?)>/g, `<img$1style="${imageStyle}"$2>`);
html = html.replace(/<img(?![^>]*style=)([^>]*?)>/g, `<img$1 style="${imageStyle}">`);
html = html.replace(/<video([^>]*?)style="[^"]*"([^>]*?)>/g, `<video$1style="${videoStyle}"$2>`);
html = html.replace(/<video(?![^>]*style=)([^>]*?)>/g, `<video$1 style="${videoStyle}">`);

fs.writeFileSync(page, html);
console.log('Criativos ajustados para desktop e mobile sem mídia fora do card.');
