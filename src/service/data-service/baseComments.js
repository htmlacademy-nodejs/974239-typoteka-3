"use strict";

class BaseCommentsService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll() {
    return this._articles.reduce((comments, article) =>
      [...comments, ...article.comments]
    , []);
  }
}

module.exports = BaseCommentsService;
