import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const refsRoot = path.join(root, 'Referencia de imagens - cena e prompt');

const sources = [
  {
    handle: 'tidesafe-crossbody',
    product: 'TideSafe Crossbody',
    competitor: 'FisheWear x Orvis',
    page: 'https://fishewear.com/products/unbound-brown-orvis-fishe-mini-sling',
    json: 'https://fishewear.com/products/unbound-brown-orvis-fishe-mini-sling.js'
  },
  {
    handle: 'solshield-fingerless-gloves',
    product: 'SolShield Fingerless Gloves',
    competitor: 'AFTCO',
    page: 'https://www.aftco.com/products/solblok-fishing-sun-gloves',
    json: 'https://www.aftco.com/products/solblok-fishing-sun-gloves.js'
  },
  {
    handle: 'coolcurrent-neck-gaiter',
    product: 'CoolCurrent Neck Gaiter',
    competitor: 'DSG Outerwear',
    page: 'https://www.dsgouterwear.com/products/emery-neck-gaiter-upf-50',
    json: 'https://www.dsgouterwear.com/products/emery-neck-gaiter-upf-50.js'
  },
  {
    handle: 'drypocket-phone-pouch',
    product: 'DryPocket Phone Pouch',
    competitor: 'Southerly Fishing',
    page: 'https://southerlyfishing.com/products/acs-wppou-1',
    json: 'https://southerlyfishing.com/products/acs-wppou-1.js'
  },
  {
    handle: 'campnest-hanging-organizer',
    product: 'CampNest Hanging Organizer',
    competitor: 'Trekking Up',
    page: 'https://www.trekkingup.com/products/summit-storage',
    json: 'https://www.trekkingup.com/products/summit-storage.js'
  }
];

function absoluteImageUrl(url) {
  if (url.startsWith('//')) return `https:${url}`;
  return url;
}

function extensionFor(url, contentType) {
  const clean = new URL(absoluteImageUrl(url)).pathname;
  const ext = path.extname(clean).toLowerCase();
  if (['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'].includes(ext)) return ext === '.jpeg' ? '.jpg' : ext;
  if (contentType.includes('png')) return '.png';
  if (contentType.includes('webp')) return '.webp';
  if (contentType.includes('gif')) return '.gif';
  if (contentType.includes('avif')) return '.avif';
  return '.jpg';
}

async function getJson(url) {
  const response = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 Raio-X-V4 research' } });
  if (!response.ok) throw new Error(`${response.status} ao consultar ${url}`);
  return response.json();
}

async function download(url, basePath) {
  const response = await fetch(absoluteImageUrl(url), { headers: { 'user-agent': 'Mozilla/5.0 Raio-X-V4 research' } });
  if (!response.ok) throw new Error(`${response.status} ao baixar ${url}`);
  const ext = extensionFor(url, response.headers.get('content-type') || '');
  const file = `${basePath}${ext}`;
  fs.writeFileSync(file, Buffer.from(await response.arrayBuffer()));
  return file;
}

const deliveryManifest = {
  generated_at: new Date().toISOString(),
  rule: 'Uma imagem local para cada imagem publicada no carrossel da PDP concorrente, sem amostragem.',
  products: []
};

for (const source of sources) {
  const product = await getJson(source.json);
  const images = (product.images || []).map(absoluteImageUrl);
  if (!images.length) throw new Error(`Carrossel vazio em ${source.page}`);

  const productDir = path.join(refsRoot, source.handle);
  const carouselDir = path.join(productDir, 'carrossel-concorrente');
  fs.mkdirSync(carouselDir, { recursive: true });

  const files = [];
  for (let index = 0; index < images.length; index += 1) {
    const position = String(index + 1).padStart(2, '0');
    const saved = await download(images[index], path.join(carouselDir, `referencia-${position}`));
    files.push({
      position: index + 1,
      file: path.relative(productDir, saved).replaceAll('\\', '/'),
      source_image_url: images[index],
      bytes: fs.statSync(saved).size
    });
  }

  const manifest = {
    product_handle: source.handle,
    product_name: source.product,
    competitor: source.competitor,
    competitor_product_title: product.title,
    competitor_page: source.page,
    competitor_json: source.json,
    expected_carousel_count: images.length,
    downloaded_carousel_count: files.length,
    files
  };
  fs.writeFileSync(path.join(productDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
  deliveryManifest.products.push(manifest);
  console.log(`${source.handle}: ${files.length}/${images.length}`);
}

fs.writeFileSync(path.join(refsRoot, 'MANIFESTO-CARROSSEIS.json'), `${JSON.stringify(deliveryManifest, null, 2)}\n`);
console.log(`Total: ${deliveryManifest.products.reduce((sum, item) => sum + item.downloaded_carousel_count, 0)} imagens`);
