"use strict";

const express = require(`express`);
const supertest = require(`supertest`);
const articlesInit = require(`./articles`);
const ArticleService = require(`../data-service/article`);
const CommentService = require(`../data-service/comments`);
const {HttpCode} = require(`../../constants`);

const NOT_EXIST_ID = `NOT_EXIST`;

const mockData = [
  {
    id: `taJX8P`,
    title: `Учим HTML и CSS`,
    createdDate: `28.04.2021, 22:32:25`,
    announce: `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
    fullText: `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Он написал больше 30 хитов. Ёлки — это не просто красивое дерево. Это прочная древесина.`,
    сategory: [`За жизнь`, `Железо`, `Музыка`, `Кино`, `Разное`],
    comments: []
  },
  {
    id: `rK15wv`,
    title: `Как собрать камни бесконечности`,
    createdDate: `22.05.2021, 06:16:58`,
    announce: `Это один из лучших рок-музыкантов.`,
    fullText: `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Из под его пера вышло 8 платиновых альбомов.`,
    сategory: [`Деревья`],
    comments: [
      {id: `hCYAvh`, text: `Мне кажется или я уже читал это где-то?`},
      {id: `WWHU-i`, text: `Совсем немного...`},
      {id: `eS_ZTt`, text: `Хочу такую же футболку :-)`},
      {id: `LlCeFa`, text: `Это где ж такие красоты?`},
      {id: `hiB-Ut`, text: `Плюсую, но слишком много буквы!`},
      {id: `xxVYOB`, text: `Хочу такую же футболку :-)`}
    ]
  },
  {
    id: `1iO_md`,
    title: `Самый лучший музыкальный альбом этого года`,
    createdDate: `24.05.2021, 15:01:25`,
    announce: `Собрать камни бесконечности легко, если вы прирожденный герой. Программировать не настолько сложно, как об этом говорят.`,
    fullText: `Достичь успеха помогут ежедневные повторения.`,
    сategory: [
      `Музыка`,
      `Деревья`,
      `Программирование`,
      `Железо`,
      `Без рамки`,
      `Разное`,
      `IT`
    ],
    comments: [
      {id: `Rq4C70`, text: `Плюсую, но слишком много буквы!`},
      {id: `LRzCAQ`, text: `Плюсую, но слишком много буквы!`},
      {id: `LwAGHo`, text: `Совсем немного...`},
      {id: `gRieL5`, text: `Согласен с автором!`}
    ]
  },
  {
    id: `f1SgTB`,
    title: `Ёлки. История деревьев`,
    createdDate: `23.05.2021, 01:25:49`,
    announce: `Первая большая ёлка была установлена только в 1938 году. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Программировать не настолько сложно, как об этом говорят. Простые ежедневные упражнения помогут достичь успеха. Он написал больше 30 хитов.`,
    fullText: `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
    сategory: [
      `Кино`,
      `Разное`,
      `Железо`,
      `Деревья`,
      `Музыка`,
      `Без рамки`,
      `Программирование`
    ],
    comments: []
  },
  {
    id: `8-nm8F`,
    title: `Обзор новейшего смартфона`,
    createdDate: `10.05.2021, 20:23:13`,
    announce: `Достичь успеха помогут ежедневные повторения. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
    fullText: `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Простые ежедневные упражнения помогут достичь успеха. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
    сategory: [`Разное`, `IT`, `Музыка`, `Без рамки`],
    comments: [
      {
        id: `JbWjGb`,
        text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      },
      {id: `U7t4MU`, text: `Плюсую, но слишком много буквы!`},
      {id: `GHage2`, text: `Это где ж такие красоты?`},
      {id: `loVTv4`, text: `Планируете записать видосик на эту тему?`}
    ]
  }
];

const app = express();
app.use(express.json());
articlesInit(app, new ArticleService(mockData), new CommentService());

const request = supertest(app);

describe(`GET /articles`, () => {

  let response;

  beforeAll(async () => {
    response = await request.get(`/articles`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns a list of 5 articles`, () => expect(response.body.length).toBe(5));
  test(`First article's id equals "${mockData[0].id}"`, () => expect(response.body[0].id).toBe(`${mockData[0].id}`));

});

describe(`GET /articles/:articleId`, () => {

  let response;

  beforeAll(async () => {
    response = await request
      .get(`/articles/${mockData[0].id}`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`article's title is "${mockData[0].title}"`, () => expect(response.body.title).toBe(`${mockData[0].title}`));
});

describe(`POST /articles positive`, () => {

  const newArticle = {
    title: `Новая публикация`,
    createdDate: `2021-04-25 22:47:22`,
    announce: `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Достичь успеха помогут ежедневные повторения. Как начать действовать? Для начала просто соберитесь. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
    fullText: `Это один из лучших рок-музыкантов. Достичь успеха помогут ежедневные повторения.`,
    сategory: [`Разное`]
  };

  let response;

  beforeAll(async () => {
    response = await request
      .post(`/articles`)
      .send(newArticle);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));
  test(`Returns article created`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));
  test(`articles count is changed`, () => request
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(6))
  );
});

describe(`POST /articles negative`, () => {

  const newArticle = {
    title: `Новая публикация`,
    createdDate: `2021-04-25 22:47:22`,
    announce: `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Достичь успеха помогут ежедневные повторения. Как начать действовать? Для начала просто соберитесь. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
    fullText: `Это один из лучших рок-музыкантов. Достичь успеха помогут ежедневные повторения.`,
    сategory: [`Разное`]
  };

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newArticle)) {
      const badArticle = {...newArticle};
      delete badArticle[key];
      await request
        .post(`/articles`)
        .send(badArticle)
        .expect(HttpCode.BAD_REQUEST);
    }
  });

  test(`articles count have not changed`, () => request
    .get(`/articles`).expect((res) => {
      expect(res.body.length).toBe(6);
    })
  );
});

describe(`PUT /articles/:articleId positive`, () => {
  const newArticle = {
    title: `Новая публикация`,
    createdDate: `2021-04-25 22:47:22`,
    announce: `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Достичь успеха помогут ежедневные повторения. Как начать действовать? Для начала просто соберитесь. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
    fullText: `Это один из лучших рок-музыкантов. Достичь успеха помогут ежедневные повторения.`,
    сategory: [`Разное`]
  };
  let response;

  beforeAll(async () => {
    response = await request
      .put(`/articles/${mockData[2].id}`)
      .send(newArticle);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns changed article`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));
  test(`articles is really changed`, () => request
    .get(`/articles/${mockData[2].id}`)
    .expect((res) => expect(res.body.title).toBe(newArticle.title))
  );
});

describe(`PUT /articles/:articleId negative`, () => {
  const validArticle = {
    title: `Новая публикация`,
    createdDate: `2021-04-25 22:47:22`,
    announce: `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Достичь успеха помогут ежедневные повторения. Как начать действовать? Для начала просто соберитесь. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
    fullText: `Это один из лучших рок-музыкантов. Достичь успеха помогут ежедневные повторения.`,
    сategory: [`Разное`]
  };

  test(`Not exist response code is 404`, () => request
    .put(`/articles/${NOT_EXIST_ID}`)
    .send(validArticle)
    .expect(HttpCode.NOT_FOUND)
  );

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(validArticle)) {
      const badArticle = {...validArticle};
      delete badArticle[key];
      await request
        .put(`/articles/${mockData[3].id}`)
        .send(badArticle)
        .expect(HttpCode.BAD_REQUEST);
    }
  });

  test(`Offers count have not changed`, () => request
    .get(`/articles`).expect((res) => {
      expect(res.body.length).toBe(6);
    })
  );
});

describe(`DELETE /articles/:articleId`, () => {
  let response;

  beforeAll(async () => {
    response = await request
      .delete(`/articles/${mockData[2].id}`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns deleted article`, () => expect(response.body.id).toBe(`${mockData[2].id}`));
  test(`Article count is changed`, () => request
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(5))
  );
});

describe(`GET /articles/:articleId/comments`, () => {
  let response;

  beforeAll(async () => {
    response = await request
      .get(`/articles/${mockData[1].id}/comments`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns a list of ${mockData[1].comments.length} comments`, () => expect(response.body.length).toBe(mockData[1].comments.length));
  test(`Correct first comment id`, () => expect(response.body[1].id).toBe(`${mockData[1].comments[1].id}`));
});

describe(`DELETE /articles/:articleId/comments/:commentId`, () => {
  let response;
  const article = mockData[1];
  const comments = article.comments;

  const comment = comments[1];
  const commentsLength = comments.length;

  beforeAll(async () => {
    response = await request
      .delete(`/articles/${article.id}/comments/${comment.id}`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns deleted comment`, () => expect(response.body.id).toBe(`${comment.id}`));
  test(`Comments count is changed`, () => request
    .get(`/articles/${article.id}/comments`)
    .expect((res) => expect(res.body.length).toBe(commentsLength - 1))
  );
});

describe(`POST /articles/:articleId/comments positive`, () => {
  let response;
  const article = mockData[0];
  const commentsLength = article.comments.length;

  const newComment = {
    text: `НОВЫЙ КОММЕНТАРИЙ 1`
  };

  beforeAll(async () => {
    response = await request
      .post(`/articles/${article.id}/comments`).send(newComment);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));
  test(`Returns comment created`, () => expect(response.body).toEqual(expect.objectContaining(newComment)));
  test(`Comments count is changed`, () => request
    .get(`/articles/${article.id}/comments`)
    .expect((res) => expect(res.body.length).toBe(commentsLength + 1))
  );
});

describe(`POST /articles/:articleId/comments negative`, () => {
  const article = mockData[0];
  const badComment = {};

  test(`Without any required property response code is 400`, () => request
    .post(`/articles/${article.id}/comments`)
    .send(badComment)
    .expect(HttpCode.BAD_REQUEST)
  );
});

