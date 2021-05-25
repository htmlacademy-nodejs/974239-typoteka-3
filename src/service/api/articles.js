"use strict";

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);
const articleValidator = require(`../middlewares/articleValidator`);
const commentValidator = require(`../middlewares/commentValidator`);
const articleExist = require(`../middlewares/articleExist`);
const commentExist = require(`../middlewares/commentExist`);
const route = new Router();

module.exports = (app, articlesService, commentsService) => {
  app.use(`/articles`, route);

  route.get(`/`, (req, res) => {
    const articles = articlesService.findAll();
    return res.status(HttpCode.OK).send(articles);
  });

  route.get(`/:articleId`, articleExist(articlesService), (req, res) => {
    const {article} = res.locals;

    return res.status(HttpCode.OK).json(article);
  });

  route.post(`/`, articleValidator, (req, res) => {
    const article = articlesService.create(req.body);

    return res.status(HttpCode.CREATED)
      .json(article);
  });

  route.put(`/:articleId`, [articleExist(articlesService), articleValidator], (req, res) => {
    const newArticle = req.body;
    const {articleId} = req.params;

    const updatedArticle = articlesService.update(articleId, newArticle);

    return res.status(HttpCode.OK)
      .json(updatedArticle);
  });

  route.delete(`/:articleId`, articleExist(articlesService), (req, res) => {
    const {articleId} = req.params;
    const deletedArticle = articlesService.drop(articleId);

    return res.status(HttpCode.OK)
      .json(deletedArticle);
  });

  route.get(`/:articleId/comments`, articleExist(articlesService), (req, res) => {
    const {article} = res.locals;
    const comments = commentsService.findAll(article);

    return res.status(HttpCode.OK)
      .json(comments);
  });

  route.delete(`/:articleId/comments/:commentId`, [articleExist(articlesService), commentExist(articlesService, commentsService)], (req, res) => {
    const {commentId} = req.params;
    const {article} = res.locals;

    const deletedComment = commentsService.drop(commentId, article);

    return res.status(HttpCode.OK)
      .json(deletedComment);
  });

  route.post(`/:articleId/comments`, [articleExist(articlesService), commentValidator], (req, res) => {
    const {article} = res.locals;

    const comment = commentsService.create(article, req.body);

    return res.status(HttpCode.CREATED)
      .json(comment);
  });
};
