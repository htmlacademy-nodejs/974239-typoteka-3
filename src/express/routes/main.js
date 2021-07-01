"use strict";

const {Router} = require(`express`);
const {logger} = require(`../../service/lib/logger`);
const {articlesAPI, searchAPI} = require(`../api`);

const mainRouter = new Router();

mainRouter.get(`/`, async (req, res) => {
  let articles = [];
  let categories = [];
  let popular = [];
  try {
    articles = await articlesAPI.getArticles();
    categories = await articlesAPI.getCategories();
    popular = articles.slice(0, 5);
  } catch (err) {
    const response = err.response;
    logger.error(`[ERROR] route: ${req.url}, message: status - ${response && response.status}, data - ${response && response.data}`);
  }
  res.render(`pages/main`, {articles, categories, popular});
});

mainRouter.get(`/register`, (req, res) => res.render(`pages/registration`));
mainRouter.get(`/login`, (req, res) => res.render(`pages/registration`));
mainRouter.get(`/search`, async (req, res) => {
  let articles = null;
  try {
    articles = await searchAPI.searchArticles(req.query);
  } catch (err) {
    const response = err.response;
    logger.error(`[ERROR] route: ${req.url}, message: status - ${response && response.status}, data - ${response && response.data}`);
  }
  res.render(`pages/search`, {articles});
});
mainRouter.get(`/categories`, (req, res) => res.render(`pages/admin-categories`));

module.exports = mainRouter;
