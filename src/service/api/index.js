"use strict";

const {
  CategoryService,
  SearchService,
  ArticleService,
  CommentService,
  BaseCommentsService
} = require(`../data-service`);

const {Router} = require(`express`);
const {getMockData} = require(`../lib/get-mock-data`);
const categoryInit = require(`./categories`);
const searchInit = require(`./search`);
const articlesInit = require(`./articles`);
const commentsInit = require(`./comments`);

const apiRouter = new Router();

(async () => {
  const mockData = await getMockData();

  categoryInit(apiRouter, new CategoryService(mockData));
  articlesInit(apiRouter, new ArticleService(mockData), new CommentService());
  searchInit(apiRouter, new SearchService(mockData));
  commentsInit(apiRouter, new BaseCommentsService(mockData));

})();

module.exports = apiRouter;
