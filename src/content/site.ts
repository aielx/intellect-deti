// Контакты, реквизиты и точки интеграции. Правьте здесь — изменения подтянутся по всему сайту.

export interface Branch {
  id: string;
  name: string;
  /** Короткое название района */
  area: string;
  address: string;
  /** Ссылка на Яндекс.Карты для кнопки «построить маршрут» */
  mapHref: string;
  /** id организации на Яндекс.Картах — для встраивания карты филиала */
  yandexOid: string;
}

export const site = {
  name: 'Интеллект',
  tagline: 'образовательный центр',
  parentSite: 'https://intellect-deti.ru',

  phoneDisplay: '+7 (980) 001-05-25',
  phoneHref: 'tel:+79800010525',
  phoneDigits: '79800010525',
  // Мессенджер MAX — ссылка на чат центра.
  max: 'https://max.ru/u/f9LHodD0cOKPoqvGYdP-HD3MM-1M_8LWWn2lY6IBri7ktIMDHdfvJdGzgzQ',
  vk: 'https://vk.com/intellect_deti',
  email: 'deti.intellect@gmail.com',

  // Боты для получения персональной ссылки на оплату.
  // У каждого ученика есть персональная ссылка — её выдаёт администратор, либо можно
  // получить самостоятельно в нашем боте MAX или Telegram.
  bots: {
    max: 'https://max.ru/c/-71207716266030/AZ_WKqQ-WRs',
    telegram: 'https://t.me/IntellectDetiBot',
  },

  // Два филиала в Ликино-Дулёво
  branches: [
    {
      id: 'liaz',
      name: 'Филиал ЛиАЗ',
      area: 'мкр. ЛиАЗ',
      address: 'г. Ликино-Дулёво, ул. 1 Мая, д. 16А',
      mapHref: 'https://yandex.ru/maps/-/CHhcBU~z',
      yandexOid: '224767212992',
    },
    {
      id: 'dulevo',
      name: 'Филиал Дулёво',
      area: 'мкр. Дулёво',
      address: 'г. Ликино-Дулёво, ул. Ленина, 3 (ТД «Дулёво», 2 этаж)',
      mapHref: 'https://yandex.ru/maps/-/CHhcBO0m',
      yandexOid: '56229379267',
    },
  ] satisfies Branch[],

  // Будни — основное время работы, выходные — по расписанию занятий.
  hours: 'Пн–Пт 14:00–20:00 · Сб–Вс 10:00–18:00',

  // Профиль центра на Яндекс.Картах (отзывы + рейтинг).
  yandexProfile: 'https://yandex.ru/profile/224767212992',
  // id организации игровой комнаты «Аватар» — для виджета рейтинга и карты на /avatar.
  avatarOrgId: '184976066902',

  // Реквизиты ИП. Банковские поля заполнены — счёт открыт в Сбербанке.
  legal: {
    entity: 'ИП Логвинова Анна Вячеславовна',
    inn: 'ИНН 507305009212',
    ogrnip: 'ОГРНИП 315503400003449',
    legalAddress: '142670, г. Ликино-Дулёво, ул. 1 Мая, д. 16А',
    email: 'deti.intellect@gmail.com',
    checkingAccount: '40802810140000054839',
    bankName: 'ПАО Сбербанк России',
    bik: '044525225',
    corrAccount: '30101810400000000225',
  },

  // Банк-эквайер для текстов оферты и страницы оплаты.
  paymentProvider: 'ПАО Сбербанк',

  // Онлайн-оплата — личный кабинет в TvoyKlass. Используется только на странице /oplata.
  // Кнопок «Оплатить» в шапке/hero/блоках цен нет — оплата вынесена отдельно.
  paymentUrl: 'https://intellect.tvoyklass.com',

  // ИНТЕГРАЦИИ — заполните при подключении (см. README):
  // id счётчика Яндекс.Метрики (число). Пустая строка — метрика отключена.
  metricaId: '72596923',
  // URL webhook для заявок — Google Apps Script (заявки в Google Таблицу + e-mail).
  // Как создать: см. README (Apps Script doGet/doPost → Таблица + MailApp).
  // Пустая строка — форма заявки работает в демо-режиме (только логирует в консоль).
  leadWebhook: 'https://script.google.com/macros/s/AKfycbxS3l-0WpBOV3E7wRLRrUyzy5W5u-w5SeNN9rIERgRzraUt3qSgdO2CZugRn4uTGw/exec',
};
