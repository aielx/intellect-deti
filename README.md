# Интеллект — образовательный центр

Статический сайт образовательного центра «Интеллект» (Ликино-Дулёво) на Astro 7.
Деплой на GitHub Pages через GitHub Actions с кастомным доменом `intellect-deti.ru`.

Центр работает с 2009 года: более 1000 учеников, 40 направлений для детей от 2 до 17 лет,
два филиала в Ликино-Дулёво. На сайте — основное образование, а также суб-бренды центра:
игровая комната «Аватар» (детские праздники) и студия танцев и фитнеса «ManGO».

Дизайн построен на фирменной палитре: **индиго** (доверие, образование) как основной цвет
+ **бирюзовый** акцент + шрифт **Onest**.

> 📘 **Полное пошаговое руководство по публикации и настройке — в [`DEPLOYMENT.md`](./DEPLOYMENT.md)** (GitHub Pages, домен, заявки в Google Sheets, уведомления на e-mail, решение проблем).

## Стек

- **Astro 7** (static site generator) + TypeScript
- **Vanilla JS** (без фреймворков) — `public/js/main.js`
- **Plain CSS** с дизайн-токенами — `src/styles/global.css`
- **Sharp** — фото-пайплайн AVIF/WebP — `scripts/optimize-images.mjs`
- **@fontsource/onest** — self-host шрифт Onest

## Команды

```bash
npm install        # установить зависимости
npm run dev        # локальная разработка (http://localhost:4321)
npm run build      # сборка в dist/
npm run preview    # предпросмотр сборки
npm run images     # перегенерировать оптимизированные фото из intellect/ → public/images/
```

## Структура

```
src/
├── layouts/BaseLayout.astro      # <head>, SEO, JSON-LD, Метрика
├── components/                   # Header, Hero, Stats, Directions, SubBrands,
│                                 # WhyUs, Reviews, Prices, Faq, Contacts, Footer,
│                                 # LeadForm, StickyCta, BackToTop, CookieNotice, Photo
├── content/                      # данные (единый источник правды)
│   ├── site.ts                   # контакты, филиалы, реквизиты, интеграции
│   ├── directions.ts             # 10 направлений обучения
│   ├── reviews.ts                # отзывы
│   ├── faq.ts                    # частые вопросы
│   ├── avatarPrices.ts           # цены игровой комнаты «Аватар»
│   └── photos.ts                 # СГЕНЕРИРОВАНО — метаданные фото
├── pages/
│   ├── index.astro               # главная (лендинг)
│   ├── avatar.astro              # игровая комната «Аватар»
│   ├── mango.astro               # студия танцев и фитнеса «ManGO»
│   ├── oferta.astro              # публичная оферта
│   ├── politika.astro            # политика конфиденциальности
│   ├── rekvizity.astro           # реквизиты
│   ├── oplata/                   # оплата + uspekh/oshibka (noindex)
│   └── 404.astro
└── styles/global.css             # дизайн-токены и базовые стили

public/
├── brand/    # SVG-логотип, favicon, PWA-иконки
├── fonts/    # Onest woff2
├── images/   # оптимизированные фото (СГЕНЕРИРОВАНО из intellect/)
└── js/main.js
```

## Изображения

Исходные фото лежат в `intellect/` (gitignored). Скрипт `npm run images` обрабатывает их
через Sharp → AVIF + WebP разных размеров в `public/images/` и регенерирует `src/content/photos.ts`.
Компонент `Photo.astro` рендерит `<picture>` с srcset.

Фото игровой комнаты «Аватар» (`public/images/avatar/`) используются напрямую
в галерее с lightbox.

## Настройка интеграций

Все интеграции — в `src/content/site.ts`:

### Яндекс.Метрика
`metricaId: '72596923'` — счётчик уже подключён. Цели отслеживаются через `data-goal="..."`.

### Заявки (Google Apps Script webhook)
`leadWebhook` — URL Google Apps Script web-app, который записывает заявки в Google Таблицу
и шлёт e-mail. Пока поле пустое — форма работает в демо-режиме (логирует в консоль).

> 📘 **Пошаговое создание Google Таблицы + Apps Script с готовым кодом — в [`DEPLOYMENT.md`](./DEPLOYMENT.md), раздел «Часть C»**. Код Apps Script там уже адаптирован под поля формы (имя/телефон/возраст/направление).

### Мессенджер MAX
`max` — ссылка на чат центра в MAX. Используется в CTA и контактах.

### Онлайн-оплата
`paymentUrl: 'https://intellect.tvoyklass.com'` — личный кабинет TvoyKlass.
Используется только на странице `/oplata`. Return-страницы: `/oplata/uspekh`, `/oplata/oshibka`.

### Расписание
Расписание подбирается администратором при записи — виджет интеграции не используется.

## Деплой на GitHub Pages

> 📘 **Полное руководство по публикации и привязке домена — в [`DEPLOYMENT.md`](./DEPLOYMENT.md)** (части A и B: GitHub Pages, DNS-записи, HTTPS).

Кратко: при пуше в `main` автоматически запускается `.github/workflows/deploy.yml` — сборка → публикация `dist/` на GitHub Pages. Кастомный домен `intellect-deti.ru` уже прописан в `public/CNAME` и `CNAME` в корне.

## Редактирование контента

- Контакты, адреса, реквизиты, ссылки → `src/content/site.ts`
- Направления обучения → `src/content/directions.ts`
- Отзывы → `src/content/reviews.ts`
- Частые вопросы → `src/content/faq.ts`
- Цены «Аватара» → `src/content/avatarPrices.ts`

После изменения данных — пересоберите (`npm run build`).

## Логотип

SVG-логотип: `public/brand/logo.svg` — эмблема (маскот центра в фирменных цветах:
бирюзовая голова + тёмно-синее тело) + wordmark «Интеллект». Перегенерация PNG-иконок: `node scripts/generate-logo.mjs`.
