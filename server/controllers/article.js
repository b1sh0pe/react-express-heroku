const express = require("express");
const router = express.Router();

const { wrapPromiseResponse } = require("../utils");
const Article = require("../services/Article");

router.get("/", wrapPromiseResponse(
  function (req) {
    const requestQueryString = req.query;
    return Article.getArticles(
      parseInt(requestQueryString.page, 10),
      parseInt(requestQueryString.perPage, 10)
    );
  }
));

router.get("/:articleId", wrapPromiseResponse(
  function (req) {
    return Article.getArticleById(req.params.articleId, 10);
  }
));

module.exports = router;