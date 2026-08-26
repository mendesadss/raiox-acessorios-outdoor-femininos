# Auditoria visual das imagens de referência

Data da revisão: 26/08/2026

## Resultado

As 32 imagens dos cinco carrosséis foram abertas e revisadas visualmente. Todas correspondem ao produto indicado no respectivo manifesto. Não foi encontrada imagem de outro produto, arquivo quebrado ou download inválido.

| Produto da loja | Concorrente e produto de origem | Esperadas | Baixadas | Corretas | Cenas únicas |
|---|---|---:|---:|---:|---:|
| TideSafe Crossbody | FisheWear x Orvis, Unbound Brown Mini Sling | 6 | 6 | 6 | 6 |
| SolShield Fingerless Gloves | AFTCO, Solblok Gloves | 10 | 10 | 10 | 7 |
| CoolCurrent Neck Gaiter | Free Fly Apparel, Bamboo Lightweight Hoodies | 6 | 6 | 6 | 6 |
| DryPocket Phone Pouch | Earth Pak, Waterproof Phone Case | 4 | 4 | 4 | 4 |
| CampNest Hanging Organizer | Tilda Outdoors, Hanging Tent Organiser | 6 | 6 | 6 | 6 |
| **Total** |  | **32** | **32** | **32** | **29** |

## Duplicatas de origem

O carrossel público da AFTCO entrega dez posições, mas três são repetições binárias de cenas anteriores. Elas foram preservadas para documentar o carrossel real do concorrente, porém não devem gerar prompts tratados como novos ângulos.

| Arquivo repetido | Igual a | Decisão |
|---|---|---|
| `solshield-fingerless-gloves/carrossel-concorrente/referencia-08.jpg` | `referencia-06.jpg` | manter como evidência, reutilizar o prompt da cena 06 |
| `solshield-fingerless-gloves/carrossel-concorrente/referencia-09.jpg` | `referencia-07.jpg` | manter como evidência, reutilizar o prompt da cena 07 |
| `solshield-fingerless-gloves/carrossel-concorrente/referencia-10.jpg` | `referencia-05.jpg` | manter como evidência, reutilizar o prompt da cena 05 |

## Critério usado

1. Conferência do produto, silhueta, material, estampa e contexto em cada arquivo.
2. Comparação com o título e a URL da página de produto registrados no manifesto.
3. Verificação de dimensões e abertura do arquivo.
4. Hash SHA-256 para separar cenas únicas de duplicatas exatas.
5. Quantidade correta significa o total realmente publicado no carrossel de origem, com duplicatas declaradas separadamente.

## Regra para geração

Cada prompt deve apontar para a imagem específica que será anexada. Uma duplicata exata não vira uma falsa cena nova. Antes da geração final, o operador substitui qualquer ativo de concorrente por fotografia ou render próprio da SheCurrent e preserva apenas composição, enquadramento e função comercial como referência.
