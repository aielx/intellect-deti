// Игровая комната «Аватар» — цены и услуги. Перенесено из src/data/avatarPrices.ts.

export const ROOM_RENTAL_PRICE_PER_HOUR = 1200;
export const ADDITIONAL_SERVICE_PRICE = 6000;
export const CHARACTER_PRICE = 3000;

// Основное предложение — аренда игровой комнаты.
export const avatarRental = {
  pricePerHour: ROOM_RENTAL_PRICE_PER_HOUR,
  capacity: 'до 10 человек',
  minHours: 'минимум 2 часа',
  includes: [
    'Батутный лабиринт с горками',
    'Настольный футбол и аэрохоккей',
    '4K проектор для мультфильмов',
    'Музыкальное оборудование',
    'Уютная зона для застолья',
    'Можно принести свои угощения',
  ],
};

// Дополнительные услуги к аренде комнаты.
export interface AvatarAddOn {
  id: string;
  icon: string;
  title: string;
  desc: string;
  price: number;
  duration: string;
  hit?: boolean;
}

export const avatarAddOns: AvatarAddOn[] = [
  {
    id: 'quest',
    icon: '🗺️',
    title: 'Квест для детей',
    desc: 'Захватывающие программы для детей и подростков разных возрастов',
    price: ADDITIONAL_SERVICE_PRICE,
    duration: '60 минут',
    hit: true,
  },
  {
    id: 'animators',
    icon: '🎭',
    title: 'Аниматоры',
    desc: 'Профессиональные ведущие с конкурсами, играми и призами',
    price: ADDITIONAL_SERVICE_PRICE,
    duration: '60 минут',
  },
  {
    id: 'hammock',
    icon: '🪂',
    title: 'Улётный гамак',
    desc: 'Необычный день рождения на гамаках — полёт впечатлений!',
    price: ADDITIONAL_SERVICE_PRICE,
    duration: '60 минут',
  },
  {
    id: 'mafia',
    icon: '🎩',
    title: 'Игра «Мафия»',
    desc: 'Интеллектуальная игра для детей постарше и подростков',
    price: ADDITIONAL_SERVICE_PRICE,
    duration: '60 минут',
  },
  {
    id: 'character',
    icon: '🐼',
    title: 'Чебурашка / Панда',
    desc: 'Поздравление от любимого персонажа — радость для малышей!',
    price: CHARACTER_PRICE,
    duration: 'поздравление',
  },
];

// Опции для селекта в форме бронирования.
export const avatarServiceOptions = [
  `Аренда комнаты (${ROOM_RENTAL_PRICE_PER_HOUR} руб./час)`,
  `Квест для детей (${ADDITIONAL_SERVICE_PRICE} руб.)`,
  `Аниматоры (${ADDITIONAL_SERVICE_PRICE} руб.)`,
  `Улётный гамак (${ADDITIONAL_SERVICE_PRICE} руб.)`,
  `Игра «Мафия» (${ADDITIONAL_SERVICE_PRICE} руб.)`,
  `Чебурашка/Панда (${CHARACTER_PRICE} руб.)`,
  'Комплексный праздник (несколько услуг)',
];
