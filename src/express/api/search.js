'use strict';

const Base = require(`./base`);

class Search extends Base {
  searchArticles(params) {
    return this._load(`/search`, {
      params
    });
  }
}

module.exports = Search;
