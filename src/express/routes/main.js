"use strict";

const {Router} = require(`express`);
const mainRouter = new Router();

mainRouter.get(`/`, (req, res) => res.render(`pages/main`));
mainRouter.get(`/register`, (req, res) => res.render(`pages/registration`));
mainRouter.get(`/login`, (req, res) => res.render(`pages/registration`));
mainRouter.get(`/search`, (req, res) => res.render(`pages/search`));
mainRouter.get(`/categories`, (req, res) => res.render(`pages/admin-categories`));

module.exports = mainRouter;
