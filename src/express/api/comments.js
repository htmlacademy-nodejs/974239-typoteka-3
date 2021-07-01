'use strict';

const Base = require(`./base`);

class Comments extends Base {
  getComments() {
    return this._load(`/comments`);
  }
}

module.exports = Comments;
