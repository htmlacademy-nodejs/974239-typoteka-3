'use strict';

const Base = require(`./base`);

class Articles extends Base {
  getArticles() {
    return this._load(`/articles`);
  }

  getArticle(articleId) {
    return this._load(`/articles/${articleId}`);
  }

  createArticle(data) {
    return this._load(`/articles`, {
      method: `POST`,
      data
    });
  }

  getCategories() {
    return this._load(`/categories`);
  }
}

module.exports = Articles;
