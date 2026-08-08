import sharp from 'sharp';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const src = readFileSync('/home/aiex/Projects/intellect-deti/public/brand/logo.svg', 'utf8');

// Извлекаем внутренний <svg> эмблемы целиком (от '<svg x="0"' до первого '</svg>').
const start = src.indexOf('<svg x="0"');
const end = src.indexOf('</svg>', start) + '</svg>'.length;
const emblem = src.slice(start, end); // включает весь блок эмблемы

const family = "Onest, Manrope, 'Golos Text', Inter, system-ui, sans-serif";

const configs = [
  { name: 'cur',  vb: 342, f1: 38, f2: 13,   x1: 100, y1: 60, x2: 101, y2: 82 },
  { name: 'a46',  vb: 384, f1: 46, f2: 15,   x1: 100, y1: 52, x2: 101, y2: 78 },
  { name: 'b50',  vb: 404, f1: 50, f2: 16.5, x1: 100, y1: 52, x2: 101, y2: 80 },
  { name: 'c54',  vb: 424, f1: 54, f2: 17.5, x1: 100, y1: 52, x2: 101, y2: 82 },
];

function buildSvg(c) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${c.vb} 100" role="img" aria-label="Интеллект — образовательный центр">
${emblem}
  <text x="${c.x1}" y="${c.y1}" font-family="${family}" font-weight="800" font-size="${c.f1}" letter-spacing="-0.5" fill="#1E1B4B">Интеллект</text>
  <text x="${c.x2}" y="${c.y2}" font-family="${family}" font-weight="500" font-size="${c.f2}" letter-spacing="0.3" fill="#5B5470">образовательный центр</text>
</svg>`;
}

const outDir = '/tmp/logo-cmp';
mkdirSync(outDir, { recursive: true });

for (const c of configs) {
  const svg = buildSvg(c);
  writeFileSync(`${outDir}/${c.name}.svg`, svg);
  const png = await sharp(Buffer.from(svg), { density: 192 })
    .resize({ width: Math.round(c.vb * 3) })
    .png()
    .toBuffer();
  writeFileSync(`${outDir}/${c.name}.png`, png);
  console.log(`ok ${c.name}  vb=${c.vb}  ratio=${(c.vb/100).toFixed(2)}`);
}
