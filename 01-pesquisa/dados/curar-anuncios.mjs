import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const source = 'C:\\Users\\nican\\OneDrive\\Documentos\\MENDES\\Mendes OS\\global-brand\\Pesquisa Mentorados\\Pesquisa Acessorios Outdoor Femininos\\midia-paginas\\mineracao-2026-08-25-20-41.json';
const allowed = new Set(['freeflyapparel.com', 'missmayfly.com']);
const raw = JSON.parse(fs.readFileSync(source, 'utf8'));
const accepted = raw.filter(ad => allowed.has((ad.linkDomain || '').toLowerCase()));
const recentFirst = accepted.sort((a, b) => String(b.startDate || '').localeCompare(String(a.startDate || '')));
const selected = [];
for (const domain of allowed) {
  selected.push(...recentFirst.filter(ad => ad.linkDomain === domain).slice(0, 12));
}
fs.writeFileSync(path.join(here, 'anuncios-curados.json'), JSON.stringify(selected, null, 2));
console.log('Criativos reais curados:', selected.length, '| Free Fly:', selected.filter(x => x.linkDomain === 'freeflyapparel.com').length, '| Miss Mayfly:', selected.filter(x => x.linkDomain === 'missmayfly.com').length);
