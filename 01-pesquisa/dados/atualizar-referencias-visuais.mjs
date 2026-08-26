import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, '..');
const refs = path.join(root, 'Referencia de imagens - cena e prompt');
const pages = path.join(root, 'paginas');
const buildPath = path.join(here, 'build.json');
const build = JSON.parse(fs.readFileSync(buildPath, 'utf8'));
const items = {
  'tidesafe-crossbody': { page: 'side-sling', files: [
    ['side-sling-pdp.jpg', 'modelo-pagina-concorrente.jpg'],
    ['https://cdn.shopify.com/s/files/1/0725/2869/1513/files/51fIdohBNgL._AC_SL1080.jpg?v=1701534688', 'produto-referencia-01.jpg'],
    ['https://cdn.shopify.com/s/files/1/0274/9461/3101/files/Untitleddesign_29.png?v=1700702732', 'produto-referencia-02.jpg']
  ]},
  'solshield-fingerless-gloves': { page: 'fishewear', files: [
    ['fishewear-pdp.jpg', 'modelo-pagina-concorrente.jpg'],
    ['https://cdn.shopify.com/s/files/1/1347/4439/files/redtro-salmon-14-zip-sunshirtfishewear-459685.jpg?v=1751566174', 'produto-referencia-01.jpg'],
    ['https://cdn.shopify.com/s/files/1/2487/1676/files/WLWH_545_A_1.webp?v=1762357092', 'produto-referencia-02.webp']
  ]},
  'coolcurrent-neck-gaiter': { page: 'fishewear', files: [
    ['fishewear-pdp.jpg', 'modelo-pagina-concorrente.jpg'],
    ['https://cdn.shopify.com/s/files/1/1347/4439/files/preorder-fishewaters-neck-tubefishewear-984280.jpg?v=1751487588', 'produto-referencia-01.jpg'],
    ['https://cdn.shopify.com/s/files/1/2487/1676/files/WLWH_545_A_1.webp?v=1762357092', 'produto-referencia-02.webp']
  ]},
  'drypocket-phone-pouch': { page: 'missmayfly', files: [
    ['missmayfly-pdp.jpg', 'modelo-pagina-concorrente.jpg'],
    ['https://cdn.shopify.com/s/files/1/0274/9461/3101/files/Untitleddesign_29.png?v=1700702732', 'produto-referencia-01.png'],
    ['https://cdn.shopify.com/s/files/1/0274/9461/3101/files/Untitleddesign_22.png?v=1700823111', 'produto-referencia-02.png']
  ]},
  'campnest-hanging-organizer': { page: 'tildaoutdoors', files: [
    ['tildaoutdoors-pdp.jpg', 'modelo-pagina-concorrente.jpg'],
    ['https://cdn.shopify.com/s/files/1/0869/7888/7963/files/IMG_6509.heic?width=1200&format=jpg', 'produto-referencia-01.jpg'],
    ['https://cdn.shopify.com/s/files/1/0869/7888/7963/files/ButterflyRosie1.jpg?v=1759198295', 'produto-referencia-02.jpg']
  ]}
};
const prompt = (item) => {
  const product = item.produto_handle ? build.produtos.find(p => p.handle === item.produto_handle) : null;
  const productName = product?.titulo || 'SheCurrent Outdoors waterside collection';
  const productRef = product ? `Attach the real supplier product photos for ${productName}. Product geometry, closure placement, material texture, colors, seams, hardware and scale must match those photos exactly.` : 'Use the supplied competitor references only for composition, never for logos, people or products.';
  const direction = {
    banner_home: 'Create a conversion-focused campaign banner with a deliberately protected copy-safe area and a calm, credible outdoor setting.',
    hero_emocional: 'Create the anchor lifestyle image that defines the recurring model identity and immediately explains the product benefit in one frame.',
    still_produto_frente: 'Create a precise product catalogue image with honest proportions and no decorative object hiding purchase-critical details.',
    macro_mecanismo: 'Create a technical macro that makes the functional mechanism legible while avoiding unsupported performance claims.',
    lifestyle_destreza: 'Create a close lifestyle demonstration where the functional task is visually understandable before any copy is read.',
    lifestyle_protecao: 'Create an editorial outdoor lifestyle image that communicates lightweight, adjustable coverage without medical or quantified claims.',
    demonstracao_respingo: 'Create an honest splash-resistance use demonstration. Do not show submersion, IP labels, certifications or claims not proven by the supplier.',
    lifestyle_organizacao: 'Create an approachable camping organization scene that feels practical for a beginner, never expeditionary or survivalist.',
    infografico_bundle: 'Create a clean modular flat lay with ample negative space reserved for later designer-added labels. Generate no text inside the image.',
    review_lifestyle: 'Create a credible customer-style image with controlled imperfection, recognisable product scale and no fake testimonial text.',
    review_detalhe: 'Create a believable close customer-detail image, with accurate hands, product fidelity and relaxed documentary framing.',
    review_camping: 'Create a warm, believable dusk camping scene that shows order and access without implying safety protection.'
  }[item.tipo] || 'Create a premium e-commerce image with clear product hierarchy and purchase-relevant detail.';
  return `ROLE: You are the senior art director for a premium American outdoor e-commerce launch. Produce one original, commercially usable photograph for SheCurrent Outdoors.\n\nOBJECTIVE: ${direction}\n\nPRODUCT FIDELITY: ${productRef}\n\nCOMPETITOR REFERENCE: Attach the product-folder reference images named modelo-pagina-concorrente and produto-referencia. Use them only to study shot hierarchy, merchandising clarity and functional context. Do not reproduce their people, compositions, logos, packaging, products, copy, colourways or distinctive layouts.\n\nCAST AND WORLD: Feature a 32 to 48 year old American casual angler or beginner camper, competent and relaxed rather than athletic or fashion-editorial. The visual world is deep evergreen #163D3A, warm ivory #F5F2E9, soft sage #E6EBDD and restrained coral #E57845, expressed through real wardrobe and props rather than colour grading.\n\nART DIRECTION: ${item.descricao} Use natural early-morning or late-afternoon light, true-to-life material texture, realistic scale, clean visual hierarchy and a calm premium retail finish. Preserve a clear subject, uncluttered background and intentional negative space when copy may be added later.\n\nQUALITY BAR: High-end commercial photography, correct anatomy and hands, physically plausible shadows, no artificial skin, no duplicated items, no accidental logos, no generated lettering, no fake badges, no watermarks and no AI artefacts.\n\nDELIVERY: ${item.formato === 'banner_mobile' || item.formato?.includes('mobile') ? 'Vertical 4:5, 1080 x 1350 px.' : item.formato === 'banner_desktop' ? 'Horizontal 16:9, 1920 x 1080 px.' : 'Square 1:1, 1600 x 1600 px.'}`;
};
let downloads = 0;
for (const [handle, spec] of Object.entries(items)) {
  const dir = path.join(refs, handle);
  fs.mkdirSync(dir, { recursive: true });
  for (const [source, dest] of spec.files) {
    const output = path.join(dir, dest);
    if (source.startsWith('http')) {
      const res = await fetch(source);
      if (!res.ok) throw new Error(`${handle}: ${res.status} for ${source}`);
      fs.writeFileSync(output, Buffer.from(await res.arrayBuffer()));
      downloads++;
    } else {
      fs.copyFileSync(path.join(refs, source), output);
    }
  }
  fs.writeFileSync(path.join(dir, 'MODELO-DE-PAGINA.md'), `# ${handle}\n\n- modelo-pagina-concorrente.jpg: print integral da PDP concorrente para estudar hierarquia, prova, ritmo e ordem de blocos.\n- produto-referencia-01 e 02: referências concorrentes de contexto e merchandising. Não copiar marca, produto, pessoa, texto ou composição.\n- Antes de gerar qualquer imagem, anexe também a foto real do fornecedor. Ela prevalece sobre toda referência concorrente para as características físicas do produto.\n`);
}
for (const item of build.imagens_pdp.sequencia) {
  if (item.produto_handle && items[item.produto_handle]) item.referencia_cena_arquivo = `Referencia de imagens - cena e prompt/${item.produto_handle}/modelo-pagina-concorrente.jpg`;
  item.prompt = prompt(item);
}
for (const logo of build.identidade_visual.logos) {
  logo.prompt = `ROLE: You are a world-class identity designer for an American premium outdoor accessories brand. Create ${logo.tipo} for SheCurrent Outdoors. The brand serves casual women anglers and beginner campers who value calm preparation, functional comfort and adult confidence. Use deep evergreen #163D3A, warm ivory #F5F2E9 and restrained coral #E57845. Avoid literal fish, mountains, pink clichés, generic badges, gradients, metallic effects, mockups and all extra text. Deliver a distinctive, legible, commercially credible mark with clean vector-like edges and strong small-size recognition. ${logo.tipo === 'wordmark' ? 'Set “SheCurrent” as the hero, with “Outdoors” secondary, in a refined editorial serif plus modern retail sans relationship. Transparent background, horizontal lockup.' : 'Use an abstract, memorable SC current motif with simple bold forms, 1:1 composition and excellent recognition at 64 pixels.'}`;
}
fs.writeFileSync(buildPath, JSON.stringify(build, null, 2));
console.log(`Pastas de referência criadas: ${Object.keys(items).length}; imagens baixadas: ${downloads}.`);
