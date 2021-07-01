"use strict";

const {Router} = require(`express`);
const {articlesAPI} = require(`../api`);
const {logger} = require(`../../service/lib/logger`);
const {nanoid} = require(`nanoid`);
const multer = require(`multer`);
const path = require(`path`);

const UPLOAD_DIR = `../upload/img/`;

const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (req, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  }
});

const upload = multer({storage});

const articlesRouter = new Router();

articlesRouter.post(`/add`,
    upload.single(`photo`),
    async (req, res) => {

      const {body, file} = req;
      const data = {
        title: body.title,
        createdDate: body.createdDate,
        announce: body.announce,
        fullText: body.fullText,
        picture: file ? {
          orig: file.filename,
          big: file.filename,
          small: file.filename,
        } : null,
        сategory: []
      };

      try {
        await articlesAPI.createArticle(data);
        res.redirect(`/my`);
      } catch (e) {
        res.redirect(`back`);
      }
    }
);

articlesRouter.get(`/category/:id`, (req, res) => res.render(`pages/publications-by-category`));

articlesRouter.get(`/add`, (req, res) => res.render(`pages/admin-add-new-post-empty`));

articlesRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  let article;
  try {
    article = await articlesAPI.getArticle(id);
  } catch (err) {
    const response = err.response;
    logger.error(`[ERROR] route: ${req.url}, message: status - ${response && response.status}, data - ${response && response.data}`);
  }
  res.render(`pages/admin-add-new-post`, {article});
});

articlesRouter.get(`/:id`, (req, res) => res.render(`pages/post-user`));

module.exports = articlesRouter;
