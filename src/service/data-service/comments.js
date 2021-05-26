"use strict";
const {nanoid} = require(`nanoid`);
const {NANO_ID_LENGTH} = require(`../../constants`);

class CommentService {
  findAll(article) {
    return article.comments;
  }

  findOne(id, article) {
    return article.comments.find((comment) => comment.id === id);
  }

  drop(id, article) {
    const commentToDelete = article.comments.find((comment) => comment.id === id);

    if (!commentToDelete) {
      return null;
    }

    article.comments = article.comments.filter((comment) => comment.id !== commentToDelete.id);

    return commentToDelete;
  }

  create(article, comment) {

    const newComment = Object.assign({id: nanoid(NANO_ID_LENGTH)}, comment);
    article.comments.push(newComment);

    return newComment;
  }
}

module.exports = CommentService;
