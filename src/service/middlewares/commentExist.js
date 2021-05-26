"use strict";

const {HttpCode} = require(`../../constants`);

module.exports = (articleService, commentService) => (req, res, next) => {
  const {articleId, commentId} = req.params;
  const article = articleService.findOne(articleId);

  if (!article) {
    return res.status(HttpCode.NOT_FOUND)
        .send(`Article with ${articleId} not found`);
  }

  const comment = commentService.findOne(commentId, article);

  if (!comment) {
    return res.status(HttpCode.NOT_FOUND)
        .send(`Comment with ${commentId} not found`);
  }

  res.locals.article = article;
  res.locals.comment = comment;
  return next();
};
