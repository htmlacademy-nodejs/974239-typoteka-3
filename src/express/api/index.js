'use strict';

const Articles = require(`./articles`);
const Comments = require(`./comments`);
const Search = require(`./search`);

const TIMEOUT = 1000;

const port = process.env.API_PORT || 3000;
const defaultUrl = `http://localhost:${port}/api/`;

const articlesAPI = new Articles(defaultUrl, TIMEOUT);
const commentsAPI = new Comments(defaultUrl, TIMEOUT);
const searchAPI = new Search(defaultUrl, TIMEOUT);

module.exports = {
  articlesAPI,
  commentsAPI,
  searchAPI,
};
