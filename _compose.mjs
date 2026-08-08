import sharp from 'sharp';
import { readFileSync } from 'node:fs';

const names = ['cur', 'a46', 'b50', 'c54'];
const labels = ['Текущий 38px', '46px', '50px', '54px'];
const imgs = await Promise.all(names.map(n => sharp(`/tmp/logo-cmp/${n}.png`).toBuffer()));
const metas = await Promise.all(imgs.map(b => sharp(b).metadata()));

const W = Math.max(...metas.map(m => m.width));
const padX = 80, padTop = 70, gap = 50, padBot = 40;
const rows = metas.length;
const H = padTop + rows * 100 * 3 + (rows - 1) * gap + padBot;

const comps = [];
for (let i = 0; i < imgs.length; i++) {
  const top = padTop + i * (100 * 3 + gap);
  const left = padX;
  comps.push({ input: imgs[i], top, left });
  const labelSvg = Buffer.from(
    `<svg width="300" height="40"><text x="0" y="26" font-family="sans-serif" font-size="20" fill="#5B5470">${labels[i]}</text></svg>`
  );
  comps.push({ input: labelSvg, top: top + 130, left: padX + metas[i].width + 30 });
}
await sharp({ create: { width: W + padX*2, height: H, channels: 4, background: { r:255, g:251, b:245, alpha:1 } } })
  .composite(comps)
  .png().toFile('/tmp/logo-cmp/compare.png');
console.log('done', W, H);
