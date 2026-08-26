import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const researchRoot = path.resolve(here, '..');
const refsRoot = path.join(researchRoot, 'Referencia de imagens - cena e prompt');
const master = JSON.parse(fs.readFileSync(path.join(refsRoot, 'MANIFESTO-CARROSSEIS.json'), 'utf8'));
const buildPath = path.join(here, 'build.json');
const build = JSON.parse(fs.readFileSync(buildPath, 'utf8'));

const productRules = {
  'tidesafe-crossbody': {
    name: 'TideSafe Crossbody',
    role: 'compact women-focused waterside crossbody or sling bag',
    accuracy: 'Preserve the exact silhouette, strap architecture, zipper count, pocket placement, seams, hardware, dimensions and material finish shown in the separate TideSafe Product Master photographs.',
    scenes: [
      ['Studio hero, front three-quarter', 'A clean front three-quarter catalog view that reveals the complete silhouette, main zipper path, front compartment and strap attachment.', '85 mm product photography lens, camera slightly above centerline, soft large-key light from upper left, controlled fill, subtle contact shadow, seamless warm off-white sweep.'],
      ['Studio side profile and strap', 'A strict side-profile product study emphasizing depth, strap padding, side panel construction and hardware without changing the product.', '100 mm lens, orthographic-feeling side angle, even diffused light, crisp edge separation, white-to-warm-gray seamless background.'],
      ['Studio rear construction', 'A rear three-quarter construction view that makes the strap, back padding, adjustment points and rear panel immediately legible.', '85 mm lens, camera at product midpoint, broad overhead softbox, fine rim light, neutral studio sweep, realistic textile microtexture.'],
      ['On-body trail carry', 'A woman aged 35 to 45 walking away on a lush waterside trail, carrying the product naturally across her back while holding a fishing rod.', '50 mm documentary lifestyle lens, waist-height follow angle, late-morning dappled light, shallow depth of field, premium outdoor editorial color.'],
      ['Waterside capacity demonstration', 'Close hands-on demonstration beside a river, with a woman placing a compact fly box and small essentials into the open main compartment.', '70 mm lens, close three-quarter angle, soft daylight, hands and opening tack sharp, river and stones gently defocused, honest scale.'],
      ['Campfire social lifestyle', 'Two women relaxing beside a campfire at blue hour, with the product standing upright and clearly visible near them as an authentic trip companion.', '50 mm lens, eye-level composition, warm firelight balanced with cool forest ambience, cinematic but believable exposure, product fully readable.']
    ]
  },
  'solshield-fingerless-gloves': {
    name: 'SolShield Fingerless Gloves',
    role: 'women-focused lightweight fingerless fishing sun gloves',
    accuracy: 'Preserve the exact finger lengths, thumb opening, palm reinforcement, cuff height, seam map, fabric thickness and pair proportions shown in the separate SolShield Product Master photographs.',
    scenes: [
      ['Studio dorsal view, primary color', 'A single glove shown from the back-of-hand side, centered and fully extended, presenting the primary SheCurrent colorway.', '100 mm macro-capable lens, perfectly even top-down perspective, shadowless high-key lighting, pure warm-white background, crisp textile detail.'],
      ['Studio dorsal view, alternate color', 'The alternate SheCurrent colorway shown from the back-of-hand side with identical scale and alignment for variant comparison.', '100 mm lens, fixed top-down camera, matched high-key light and white balance, warm-white seamless background, consistent contact shadow.'],
      ['Studio palm construction, primary color', 'A palm-side product image revealing reinforcement zones, finger openings, thumb geometry and cuff finishing.', '100 mm macro lens, top-down camera, cross-polarized diffused light to reveal surface texture without glare, warm-white backdrop.'],
      ['Studio palm construction, alternate color', 'The alternate colorway shown palm-side with the same framing, scale and lighting as the primary version.', '100 mm macro lens, fixed top-down framing, even cross-polarized illumination, accurate neutral color, minimal contact shadow.'],
      ['Rod grip demonstration', 'A tight lifestyle crop of a woman wearing the gloves while firmly holding a fishing rod and reel, making grip and exposed fingertips obvious.', '85 mm lens at hand level, shallow depth of field, clean daylight, reel and gloved hand sharp, boat deck softly blurred.'],
      ['Tackle handling with both hands', 'Both gloved hands opening a clear tackle box and handling a lure, demonstrating dexterity through natural finger placement.', '70 mm lens, close overhead three-quarter angle, bright natural side light, clean realistic highlights, no unsafe hook contact.'],
      ['Selecting a lure', 'A single gloved hand reaching toward an organized lure display, with the glove remaining the visual focal point.', '90 mm lens, side close-up, narrow depth of field, warm outdoor backlight, controlled specular highlights on tackle.'],
      ['Alternate color, two-hand dexterity', 'Both hands in the alternate glove colorway handling small tackle inside a clear box, showing mobility and fingertip access.', '70 mm lens, close three-quarter viewpoint, soft daylight with gentle fill, glove texture and hand anatomy fully realistic.'],
      ['Alternate color, lure selection', 'The alternate glove colorway shown in a tight working moment while selecting a lure from a vertical tackle board.', '90 mm lens, lateral macro-style framing, shallow depth of field, golden natural light, glove in critical focus.'],
      ['Alternate color, reel grip', 'A final grip-proof image showing the alternate gloves holding a fishing rod and reel in a natural ready position.', '85 mm lens, low close angle on the hands, directional daylight, restrained contrast, fishing hardware softly falling out of focus.']
    ]
  },
  'coolcurrent-neck-gaiter': {
    name: 'CoolCurrent Neck Gaiter',
    role: 'soft lightweight women-focused fishing neck gaiter',
    accuracy: 'Preserve the exact tube dimensions, seam placement, fabric drape, edge finishing and printed color distribution shown in the separate CoolCurrent Product Master photographs.',
    scenes: [
      ['Flat product, coral colorway', 'A straight-on flat catalog image of the coral SheCurrent colorway, fully unfolded so the print repeat, seams and proportions are visible.', '100 mm lens, perfectly parallel camera, high-key diffused studio lighting, clean warm-white background, soft grounded shadow.'],
      ['Flat product, deep teal colorway', 'A matching flat catalog image of the deep teal colorway, preserving identical crop and scale for easy comparison.', '100 mm lens, fixed parallel camera, calibrated diffused light, warm-white seamless background, accurate deep-tone color.'],
      ['Flat product, pale coastal colorway', 'A pale coastal colorway presented fully unfolded, emphasizing print clarity, lightweight fabric and straight edge finishing.', '100 mm lens, top-down parallel capture, broad softbox, low contrast, true white balance, barely visible contact shadow.'],
      ['Flat product, minimal line-art colorway', 'A minimal light colorway shown flat with delicate line-art patterning and realistic fabric weave.', '100 mm lens, top-down camera, soft cross-light that reveals weave without wrinkles, neutral warm-white background.'],
      ['Relaxed on-boat lifestyle', 'A smiling woman aged 35 to 45 seated on a fishing boat, wearing the gaiter loosely around her neck with a cap and sunglasses.', '50 mm outdoor editorial lens, eye-level medium portrait, open-shade tropical daylight, turquoise water softly blurred, relaxed authentic posture.'],
      ['Close portrait and fit proof', 'A tighter portrait of a woman on the boat looking down, clearly showing how the gaiter sits around the neck, its drape and scale.', '85 mm portrait lens, slightly elevated angle, soft coastal daylight, shallow depth of field, accurate skin and textile color.']
    ]
  },
  'drypocket-phone-pouch': {
    name: 'DryPocket Phone Pouch',
    role: 'compact transparent waterside phone and valuables pouch',
    accuracy: 'Preserve the exact outer contour, transparent window, zipper path, tether points, edge welds, dimensions and material translucency shown in the separate DryPocket Product Master photographs.',
    scenes: [
      ['Studio front hero', 'A clean front-facing hero image showing the complete pouch, transparent window, zipper and tether laid out without distortion.', '85 mm product lens, camera perfectly parallel, large diffused key light, controlled reflection cards, pale warm-gray seamless background.'],
      ['Phone fit demonstration', 'A woman holding the pouch at chest height with a modern smartphone clearly visible inside, while the opening and tether remain legible.', '70 mm lens, close torso crop, soft studio daylight, hands anatomically correct, transparent material free of distracting glare.'],
      ['Waterside utility loadout', 'The pouch used on a boat with compact fishing essentials visible inside, held naturally by gloved hands to demonstrate usable capacity.', '50 mm environmental close-up, directional morning light, boat and reel context visible but secondary, honest product scale.'],
      ['Macro zipper and seal detail', 'An extreme close-up of fingers operating the waterproof-style zipper pull, emphasizing the closure track, welded edge and water droplets.', '100 mm macro lens, very shallow depth of field, crisp raking light, tactile material detail, realistic droplets, no certification text.']
    ]
  },
  'campnest-hanging-organizer': {
    name: 'CampNest Hanging Organizer',
    role: 'compact triangular hanging camp organizer with visible storage compartments',
    accuracy: 'Preserve the exact triangular silhouette, hanging point, tension lines, pocket layout, flap geometry, edge binding and packed dimensions shown in the separate CampNest Product Master photographs.',
    scenes: [
      ['Open organizer, medium view', 'The organizer hanging from a tree and opened toward camera, holding a beanie, mug and compact camp essentials in clearly separated compartments.', '50 mm lens, eye-level medium view, warm late-afternoon forest light, realistic branch tension, product and contents sharp.'],
      ['Closed organizer in landscape', 'The closed triangular organizer suspended beside a calm mountain lake, clearly showing its compact exterior shape.', '35 mm environmental lens, wide eye-level composition, natural midday forest light, product readable against layered landscape.'],
      ['Packed carry bag', 'The organizer packed into its slim carry bag and leaning against a tree, communicating portability and storage footprint.', '70 mm lens, low three-quarter angle, warm directional woodland light, bag sharp with textured ground softly receding.'],
      ['Open organizer, full frontal system', 'A centered full-frontal image of the open organizer, fully tensioned between anchor points and loaded with practical camp essentials.', '50 mm lens, parallel eye-level camera, balanced forest daylight, symmetrical readable composition, all compartments visible.'],
      ['Closed front construction', 'A closer straight-on view of the closed organizer against a tree, showing exterior panel geometry, bindings and attachment points.', '70 mm lens, camera parallel to front panel, soft dappled shade, clear separation from the dark forest background.'],
      ['Interior detail with text-safe space', 'A close crop of the open organizer on the right side of frame, revealing pocket construction and contents while preserving generous clean negative space on the left.', '85 mm lens, close detail view, warm soft natural light, shallow depth of field, editorial composition designed for optional page copy.']
    ]
  }
};

function makePrompt(rule, scene, index) {
  const [title, direction, camera] = scene;
  return `Create one premium US e-commerce PDP image for SheCurrent Outdoors. This is image ${index} in the ${rule.name} carousel.\n\nREFERENCE HIERARCHY\n1. Use the attached competitor scene reference only for composition, camera position, crop, visual rhythm, lighting logic, body pose and product-to-frame ratio.\n2. Use the separately attached ${rule.name} Product Master photographs as the sole authority for the product itself.\n3. If the two references conflict, the Product Master always wins for every physical product detail.\n\nART DIRECTION\n${direction} ${camera} Build a premium, calm and capable visual language for a women-focused outdoor brand serving casual anglers and beginner campers in the United States. The image should feel refined, practical, adult and trustworthy, never overly rugged, tactical or juvenile. Use the SheCurrent palette naturally: deep evergreen, soft sage, warm sand, controlled coral accents and clean coastal neutrals. Keep styling functional and attainable for a woman aged 32 to 48.\n\nPRODUCT FIDELITY\n${rule.accuracy} Show a ${rule.role}. Do not add, remove, enlarge or redesign any functional element. Do not invent pockets, closures, certifications, labels, textures, seams or accessories. Maintain plausible scale, gravity, tension, fabric behavior, hand interaction and contact shadows.\n\nBRAND AND LEGAL CLEANUP\nRemove all competitor logos, trademarks, distinctive competitor prints, watermarks and readable brand text from the reference. Do not imitate proprietary artwork. Apply only the approved SheCurrent identity when a brand mark is genuinely visible and physically plausible. Do not place promotional copy, badges, prices, reviews or unverified technical claims inside the image.\n\nQUALITY CONTROL\nPhotorealistic commercial photography, natural anatomy, correct fingers, realistic material response, accurate reflections, clean color separation, high micro-detail at the focal plane, restrained sharpening, no CGI gloss, no surreal elements and no visual clutter. Deliver a single finished 4:5 vertical image at 2400 x 3000 px, sRGB, with safe crop margins for Shopify mobile and desktop.`;
}

const generatedProducts = [];

for (const product of master.products) {
  const rule = productRules[product.product_handle];
  if (!rule) throw new Error(`Sem regra visual para ${product.product_handle}`);
  if (rule.scenes.length !== product.files.length) {
    throw new Error(`${product.product_handle}: ${rule.scenes.length} cenas para ${product.files.length} referências`);
  }

  const references = product.files.map((file, index) => {
    const relativeFile = `Referencia de imagens - cena e prompt/${product.product_handle}/${file.file}`;
    return {
      position: index + 1,
      type: rule.scenes[index][0],
      description: rule.scenes[index][1],
      reference_file: relativeFile,
      source_image_url: file.source_image_url,
      prompt: makePrompt(rule, rule.scenes[index], index + 1)
    };
  });

  const markdown = [
    `# ${rule.name}, prompts 1:1`,
    '',
    `Concorrente visual: ${product.competitor}`,
    '',
    `Página auditada: ${product.competitor_page}`,
    '',
    `Total verificado no carrossel: ${references.length} imagens.`,
    '',
    'Regra: para cada geração, anexe a imagem de referência indicada e as fotos reais do produto SheCurrent. A imagem concorrente define a cena. O Product Master define o produto.',
    '',
    ...references.flatMap(reference => [
      `## ${String(reference.position).padStart(2, '0')}. ${reference.type}`,
      '',
      `Anexar como referência de cena: \`${reference.reference_file}\``,
      '',
      'Prompt em inglês:',
      '',
      '```text',
      reference.prompt,
      '```',
      ''
    ])
  ].join('\n');

  const productDir = path.join(refsRoot, product.product_handle);
  fs.writeFileSync(path.join(productDir, 'PROMPTS-EM-INGLES.md'), markdown);
  fs.writeFileSync(path.join(productDir, 'prompts.json'), `${JSON.stringify({ ...product, references }, null, 2)}\n`);
  fs.writeFileSync(path.join(productDir, 'MODELO-DE-PAGINA.md'), [
    `# ${rule.name}`,
    '',
    `- Concorrente auditado: ${product.competitor}`,
    `- Página exata: ${product.competitor_page}`,
    `- Total do carrossel concorrente: ${references.length} imagens`,
    `- Total baixado em \`carrossel-concorrente/\`: ${references.length} imagens`,
    `- Total de prompts em \`PROMPTS-EM-INGLES.md\`: ${references.length} prompts`,
    '- `modelo-pagina-concorrente.jpg`: captura integral e atual da PDP que originou o carrossel.',
    '- `manifest.json`: prova técnica da origem, URLs e contagem de arquivos.',
    '- `prompts.json`: relação estruturada 1:1 entre imagem, cena, origem e prompt.',
    '',
    '## Como gerar',
    '',
    '1. Abra `PROMPTS-EM-INGLES.md`.',
    '2. Escolha a posição desejada.',
    '3. Anexe o arquivo exato indicado em cada seção.',
    `4. Anexe também as fotos reais do ${rule.name}, o Product Master.` ,
    '5. Cole o prompt em inglês e gere.',
    '6. Reprove qualquer resultado que altere a construção física do produto ou mantenha marca concorrente.',
    '',
    'A referência concorrente governa a cena. O Product Master governa o produto.'
  ].join('\n'));

  generatedProducts.push({
    product_handle: product.product_handle,
    product_name: rule.name,
    competitor: product.competitor,
    competitor_page: product.competitor_page,
    carousel_count: references.length,
    references
  });
}

build.referencias_produtos = generatedProducts;
fs.writeFileSync(buildPath, `${JSON.stringify(build, null, 2)}\n`);
console.log(`Gerados ${generatedProducts.reduce((sum, product) => sum + product.references.length, 0)} prompts em inglês, um por referência.`);
