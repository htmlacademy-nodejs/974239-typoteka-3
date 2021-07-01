"use strict";

const {Router} = require(`express`);
const {articlesAPI, commentsAPI} = require(`../api`);
const {logger} = require(`../../service/lib/logger`);
const myRouter = new Router();

myRouter.get(`/`, async (req, res) => {
  let articles = [];

  try {
    articles = await articlesAPI.getArticles();
  } catch (err) {
    const response = err.response;
    logger.error(`[ERROR] route: ${req.url}, message: status - ${response && response.status}, data - ${response && response.data}`);
  }
  res.render(`pages/admin-publications`, {articles});
});

myRouter.get(`/comments`, async (req, res) => {
  let comments = [];
  try {
    comments = await commentsAPI.getComments();
  } catch (err) {
    const response = err.response;
    logger.error(`[ERROR] route: ${req.url}, message: status - ${response && response.status}, data - ${response && response.data}`);
  }
  res.render(`pages/admin-comments`, {comments});
});

module.exports = myRouter;
