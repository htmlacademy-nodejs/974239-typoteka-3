"use strict";

const express = require(`express`);
const {Router} = require(`express`);
const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {HttpCode} = require(`../../constants`);

const app = express();
const mainRouter = new Router();

const DEFAULT_PORT = 3000;
const FILENAME = `mocks.json`;

mainRouter.get(`/posts`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILENAME);
    const mocks = JSON.parse(fileContent);
    res.status(HttpCode.OK).send(mocks);
  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send([]);
  }
});

app.use(express.json());
app.use(`/`, mainRouter);

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).send(`Not found`);
});

module.exports = {
  name: `--server`,
  run(port) {
    port = Number.parseInt(port, 10) || DEFAULT_PORT;
    app.listen(port, () => console.info(chalk.green(`Ожидаю соединений на ${port}`)));
  },
};
