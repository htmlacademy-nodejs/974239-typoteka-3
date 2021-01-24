"use strict";

const fs = require(`fs`);
const {getRandomInt, shuffle, subtractMonth, formatDate} = require(`../../utils`);
const {ExitCode} = require(`../../constants`);

const DEFAULT_COUNT = 1;
const MAX_ELEMENTS_COUNT = 1000;

const FILE_NAME = `mocks.json`;

const TITLES = [
  `Ёлки. История деревьев`,
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  `Обзор новейшего смартфона`,
  `Лучшие рок-музыканты 20-века`,
  `Как начать программировать`,
  `Учим HTML и CSS`,
  `Что такое золотое сечение`,
  `Как собрать камни бесконечности`,
  `Борьба с прокрастинацией`,
  `Рок — это протест`,
  `Самый лучший музыкальный альбом этого года`,
];

const ANOUNCES = [
  `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  `Первая большая ёлка была установлена только в 1938 году.`,
  `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
  `Собрать камни бесконечности легко, если вы прирожденный герой.`,
  `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  `Программировать не настолько сложно, как об этом говорят.`,
  `Простые ежедневные упражнения помогут достичь успеха.`,
  `Это один из лучших рок-музыкантов.`,
  `Он написал больше 30 хитов.`,
  `Из под его пера вышло 8 платиновых альбомов.`,
  `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  `Достичь успеха помогут ежедневные повторения.`,
  `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
  `Как начать действовать? Для начала просто соберитесь.`,
  `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
  `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
];

const CATEGORIES = [
  `Деревья`,
  `За жизнь`,
  `Без рамки`,
  `Разное`,
  `IT`,
  `Музыка`,
  `Кино`,
  `Программирование`,
  `Железо`,
];

const now = new Date().valueOf();
const threeMonthAgo = subtractMonth(now, 3);

const generateOffers = ({count, titles, anounces, categories}) =>
  new Array(count).fill({}).map(() => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    createdDate: formatDate(getRandomInt(threeMonthAgo, now)),
    announce: shuffle(anounces).slice(0, getRandomInt(1, 5)).join(` `),
    fullText: shuffle(anounces).slice(0, getRandomInt(1, 5)).join(` `),
    сategory: shuffle(categories).slice(0, getRandomInt(1, categories.length)),
  }));

module.exports = {
  name: `--generate`,
  run(count) {
    if (count > MAX_ELEMENTS_COUNT) {
      console.error(`Не больше ${MAX_ELEMENTS_COUNT} публикаций`);
      process.exit(ExitCode.FAIL);
    }
    count = Number.parseInt(count, 10) || DEFAULT_COUNT;

    const content = JSON.stringify(generateOffers({count, titles: TITLES, anounces: ANOUNCES, categories: CATEGORIES}));
    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        console.error(`Can't write data to file...`);
        process.exit(ExitCode.FAIL);
      }
      console.info(`Operation success. File created.`);
      process.exit(ExitCode.SUCCESS);
    });
  },
};
