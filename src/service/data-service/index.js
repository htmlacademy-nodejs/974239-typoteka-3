"use strict";

const CategoryService = require(`./category`);
const ArticleService = require(`./article`);
const CommentService = require(`./comments`);
const BaseCommentsService = require(`./baseComments`);
const SearchService = require(`./search`);

module.exports = {
  CategoryService,
  ArticleService,
  CommentService,
  BaseCommentsService,
  SearchService,
};
