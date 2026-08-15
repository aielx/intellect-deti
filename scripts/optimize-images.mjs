// Обработка фотоматериалов центра: переименование, ресайз, AVIF/WebP, генерация src/content/photos.ts
// Запуск: npm run images   (исходники в intellect/ не изменяются)
import sharp from 'sharp';
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'intellect';
const OUT = 'public/images';

// [префикс для поиска файла (стабильная часть имени), новое имя, категория, alt-текст]
// Префикс ищется среди реальных файлов intellect/ — устойчиво к опечаткам в длинных хешах.
const PHOTOS = [
  ['00jAyQ', 'english-group-unionjack', 'english', 'Группа учеников на занятии английским языком в центре «Интеллект»'],
  ['0g5Tjp', 'art-group-paintings', 'art', 'Дети показывают свои картины на занятии живописью'],
  ['528i9T', 'art-girl-applique', 'art', 'Девочка делает аппликацию на творческом занятии'],
  ['5dCggG', 'games-keep-it-steady', 'games', 'Девочки играют в настольную игру на логику'],
  ['6pa5XX', 'team-teachers-work', 'team', 'Педагоги центра «Интеллект» за подготовкой к занятиям'],
  ['9t-h9H', 'it-boy-laptop', 'it', 'Ученик ИТ-школы за ноутбуком на занятии по программированию'],
  ['dRwvjn', 'art-girl-beads', 'art', 'Девочка плетёт брелоки из бисера на мастер-классе'],
  ['DrXDRW', 'english-teens-laughing', 'english', 'Подростки смеются на разговорном занятии английским'],
  ['_Eham8', 'english-roleplay-doctor', 'english', 'Педагог играет с малышом в ролевую игру на английском'],
  ['fPMqdX', 'art-fox-mask', 'art', 'Девочка с самодельной маской лисы из бумажной тарелки'],
  ['Gwtd4Y', 'art-kid-floor-painting', 'art', 'Ребёнок смеётся рядом со своей картиной'],
  ['j9Hjon', 'atmosphere-stick-insect', 'atmosphere', 'Дети рассматривают палочника на занятии о насекомых'],
  ['kIVljo', 'games-dobble-boy', 'games', 'Мальчик увлечённо играет в «Доббль»'],
  ['lfj6G2', 'art-cardboard-craft', 'art', 'Мальчики конструируют из картона на мастерской'],
  ['lQxLAv', 'games-chess-boys', 'games', 'Мальчики играют в шахматы на занятии'],
  ['Mqm6TT', 'atmosphere-pizza-class', 'atmosphere', 'Дети в поварских колпаках на кулинарном мастер-классе'],
  ['oHjWtN', 'english-screen-quiz', 'english', 'Интерактивная викторина английских слов на занятии'],
  ['qd1nv8', 'atmosphere-girls-playroom', 'atmosphere', 'Девочки веселятся в игровом зале центра'],
  ['Reerny', 'games-team-challenge', 'games', 'Командная игра на сообразительность'],
  ['rUmfqP', 'english-girl-textbook-smile', 'english', 'Девочка смеётся над учебником английского языка'],
  ['uWlTYJ', 'english-finger-puppets', 'english', 'Девочка с пальчиковыми куклами на занятии английским'],
  ['xBL0ka', 'atmosphere-toddlers-blocks', 'atmosphere', 'Малыши играют с мягкими кубками в игровой зоне'],
  ['xxNjzw', 'it-classroom-wide', 'it', 'ИТ-класс: ученики за ноутбуками на занятии по программированию'],
  ['Y7H7pG', 'english-girl-writing', 'english', 'Девочка пишет в учебнике английского языка'],
  ['YZbbN3', 'games-maze-girls', 'games', 'Девочки играют в деревянный лабиринт с шариком'],
  ['logoped', 'logoped-class', 'logoped', 'Логопед занимается с ребёнком постановкой звуков'],
  ['psixolo', 'psychologist-session', 'psychologist', 'Детский психолог на индивидуальном занятии'],
  ['dance', 'dance-class', 'dance', 'Дети на занятии танцами в студии ManGO'],
  ['podgoto', 'school-prep-class', 'school', 'Дети на занятии по подготовке к школе'],
  ['hudgim', 'gymnastics-class', 'sport', 'Девочка на занятии художественной гимнастикой'],
];

// Собираем список реальных файлов и индексируем по префиксу для устойчивого сопоставления.
const srcDir = await readdir(SRC);
const findSrc = (prefix) => {
  const match = srcDir.find((f) => f.startsWith(prefix));
  if (!match) throw new Error(`Не найден исходник с префиксом «${prefix}» в ${SRC}/`);
  return match;
};

const WIDTHS = [640, 1024, 1600];
const HERO_WIDTHS = [640, 1024, 1600, 2560];
const HEROES = new Set(['english-group-unionjack', 'it-classroom-wide']);

await mkdir(OUT, { recursive: true });
await mkdir('src/content', { recursive: true });

const meta = [];

for (const [prefix, name, category, alt] of PHOTOS) {
  const srcFile = findSrc(prefix);
  const srcPath = path.join(SRC, srcFile);
  const img = sharp(srcPath).rotate(); // учитываем EXIF-ориентацию
  const { width: ow, height: oh } = await img.metadata();
  const widths = (HEROES.has(name) ? HERO_WIDTHS : WIDTHS).filter((w) => w <= ow);

  for (const w of widths) {
    const h = Math.round((oh / ow) * w);
    const resized = sharp(srcPath).rotate().resize(w, h);
    await resized.clone().avif({ quality: 55 }).toFile(path.join(OUT, `${name}-${w}.avif`));
    await resized.clone().webp({ quality: 72 }).toFile(path.join(OUT, `${name}-${w}.webp`));
  }

  meta.push({ name, category, alt, width: ow, height: oh, widths });
  console.log(`ok ${name} (${ow}x${oh}) → ${widths.join(', ')}`);
}

// og-image 1200×630 из hero-кадра
const heroSrc = findSrc(PHOTOS[0][0]);
await sharp(path.join(SRC, heroSrc))
  .rotate()
  .resize(1200, 630, { fit: 'cover', position: 'attention' })
  .jpeg({ quality: 82 })
  .toFile(path.join(OUT, 'og-image.jpg'));
console.log('ok og-image.jpg');

const ts = `// СГЕНЕРИРОВАНО scripts/optimize-images.mjs — не редактировать вручную
export interface PhotoMeta {
  name: string;
  category: string;
  alt: string;
  width: number;
  height: number;
  widths: number[];
}

export const photos: PhotoMeta[] = ${JSON.stringify(meta, null, 2)};

export function srcset(name: string, ext: 'avif' | 'webp', widths: number[]): string {
  return widths.map((w) => \`/images/\${name}-\${w}.\${ext} \${w}w\`).join(', ');
}
`;

await writeFile('src/content/photos.ts', ts);
console.log('ok src/content/photos.ts');
