import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const output = path.join(here, '..', 'paginas', 'criativos');
const ads = JSON.parse(fs.readFileSync(path.join(here, 'anuncios-curados.json'), 'utf8'));
fs.mkdirSync(output, { recursive: true });
let saved = 0;
for (const ad of ads) {
  const url = (ad.imageUrls || [])[0] || (ad.videoPreviewUrls || [])[0];
  if (!url) continue;
  const target = path.join(output, `${ad.adArchiveId}.jpg`);
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(String(response.status));
    fs.writeFileSync(target, Buffer.from(await response.arrayBuffer()));
    saved++;
  } catch (error) {
    console.warn('Falhou:', ad.adArchiveId, error.message);
  }
}
console.log(`Criativos locais salvos: ${saved}/${ads.length}`);
