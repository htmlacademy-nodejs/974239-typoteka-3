"use strict";

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {getRandomInt, shuffle, subtractMonth, formatDate} = require(`../../utils`);
const {ExitCode} = require(`../../constants`);

const DEFAULT_COUNT = 1;
const MAX_ELEMENTS_COUNT = 1000;

const OUTPUT_FILE_NAME = `mocks.json`;
const CATEGORIES_FILE_NAME = `data/categories.txt`;
const ANOUNCES_FILE_NAME = `data/sentences.txt`;
const TITLES_FILE_NAME = `data/titles.txt`;

const getStringsArrayFromFile = async (fileName) => {
  try {
    const content = await fs.readFile(fileName, `utf8`);
    return content.split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

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
  async run(count) {
    if (count > MAX_ELEMENTS_COUNT) {
      console.log(chalk.red(`Не больше ${MAX_ELEMENTS_COUNT} публикаций`));
      process.exit(ExitCode.FAIL);
    }
    count = Number.parseInt(count, 10) || DEFAULT_COUNT;

    const titles = await getStringsArrayFromFile(TITLES_FILE_NAME);
    const anounces = await getStringsArrayFromFile(ANOUNCES_FILE_NAME);
    const categories = await getStringsArrayFromFile(CATEGORIES_FILE_NAME);

    const content = JSON.stringify(generateOffers({count, titles, anounces, categories}));
    try {
      await fs.writeFile(OUTPUT_FILE_NAME, content);
      console.log(chalk.green(`Operation success. File created.`));
      process.exit(ExitCode.SUCCESS);
    } catch (err) {
      console.log(chalk.red(`Can't write data to file...`));
      process.exit(ExitCode.FAIL);
    }
  },
};
