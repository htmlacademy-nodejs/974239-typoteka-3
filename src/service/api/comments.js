"use strict";

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);
const route = new Router();

module.exports = (app, commentsService) => {
  app.use(`/comments`, route);

  route.get(`/`, (req, res) => {
    const comments = commentsService.findAll();
    return res.status(HttpCode.OK).send(comments);
  });
};
