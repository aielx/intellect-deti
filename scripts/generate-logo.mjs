// Генерация PNG-иконок бренда из public/brand/favicon.svg и emblem.svg (через Sharp).
// Запуск: node scripts/generate-logo.mjs
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const BRAND = 'public/brand';
const faviconSvg = path.join(BRAND, 'favicon.svg');
const emblemSvg = path.join(BRAND, 'emblem.svg');

const jobs = [
  { src: faviconSvg, out: 'icon-192.png', size: 192 },
  { src: faviconSvg, out: 'icon-512.png', size: 512 },
  { src: emblemSvg, out: 'icon-512-maskable.png', size: 512, pad: true },
  { src: faviconSvg, out: 'apple-touch-icon-180.png', size: 180 },
];

for (const j of jobs) {
  const svg = await readFile(j.src);
  let img = sharp(svg, { density: 384 }).resize(j.size, j.size);
  if (j.pad) {
    // Для maskable: фон градиентом, эмблема с отступами (~safe zone).
    img = sharp({
      create: { width: j.size, height: j.size, channels: 4, background: { r: 49, g: 46, b: 129, alpha: 1 } },
    }).composite([{ input: await sharp(svg, { density: 384 }).resize(Math.round(j.size * 0.72)).toBuffer(), gravity: 'center' }]);
  }
  await img.png().toFile(path.join(BRAND, j.out));
  console.log(`ok ${j.out} (${j.size}x${j.size})`);
}
