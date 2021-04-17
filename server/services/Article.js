const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../sequelize/models");
const Category = require("../services/Category");

function getHtmlContent(url) {
  return axios.get(url).then(
    (response) => {
      return response.data;
    }
  ).catch(
    err => console.error(err)
  );
}

function getNewsByCategory(categoryId) {
  if (!categoryId && typeof categoryId !== "number") {
    console.error(`[services/Article] Error in getNewsByCategory method. Wrong categoryId. Category id: ${categoryId}`);
    return Promise.reject(new Error("Invalid data."));
  }

  return db.category.findOne({
    where: {
      id: categoryId
    },
    raw: true
  }).then(
    (foundCategory) => {
      if (foundCategory) {
        return getHtmlContent(foundCategory.url);
      }
    }
  ).then(
    (htmlContent) => {
      if (htmlContent) {
        const $ = cheerio.load(htmlContent);
        const posts = $(".post-item .post-link").slice(0, 5);
        return posts.get().map(element => $(element).attr("href"));
      }
    }
  );
}

function parseArticle(url) {
  if (!url || typeof url !== "string" || !url.startsWith("http")) {
    console.error("[services/Article] Error in parseArticle method. Wrong categoryId or url.");
    console.error(`[services/Article] Url: ${url}`);
    return Promise.reject(new Error("Invalid data."));
  }

  return getHtmlContent(url).then(
    (htmlContent) => {
      const $ = cheerio.load(htmlContent);

      let title = null;
      const titleElem = $(".post-content > h1");
      if (titleElem) {
        title = titleElem.text();
        titleElem.remove();
      }

      const postData = $(".post-content > .post-data");
      if (postData) {
        postData.remove();
      }
      
      const tags = $(".post-content .post-tags");
      if (tags) {
        tags.remove();
      }

      const readAlso = $(".post-content .custom-related-posts");
      if (readAlso) {
        readAlso.remove();
      }

      return {
        title,
        url,
        content: $(".post-content").html().trim()
      };
    }
  )
}

function saveArticles(categoryId) {
  if (!categoryId && typeof categoryId !== "number") {
    console.error(`[services/Article] Error in saveNews method. Wrong categoryId. Category id: ${categoryId}`);
    return Promise.reject(new Error("Invalid data."));
  }

  return getNewsByCategory(categoryId).then(
    (postUrls) => {
      return Promise.all(postUrls.map(url => parseArticle(url)));
    }
  ).then(
    (parsedArticles) => {
      return parsedArticles.map(
        article => {
          return db.article.findOne({
            where: {
              url: article.url
            }
          }).then(
            (foundArticle) => {
              return foundArticle || db.article.create(
                Object.assign(article, { category_id: categoryId })
              );
            }
          )
        }
      )
    }
  )
}

function saveArticlesForAllCategories() {
  return Category.getAllCategories().then(
    (categories) => {
      return Promise.all(
        categories.map(category => saveArticles(category.id))
      );
    }
  );
}

function getArticles(page, perPage) {
  if (!page || page < 0 || !perPage || perPage < 0 || 
    typeof page !== "number" || typeof perPage !== "number") {
    console.error(`[services/Article] Error in getArticles method. Page: ${page}. Per page: ${perPage}`);
    return Promise.reject(new Error("Invalid data."));
  }

  const limit = perPage;
  const offset = (page - 1) * limit;

  return db.article.findAndCountAll({
    attributes: [
      "id",
      "title",
      "content",
      [db.Sequelize.col("articleCategory.name"), "category_name"],
      "url",
      "updated"
    ],
    include: [{
      model: db.category,
      as: "articleCategory",
      attributes: []
    }],
    limit: limit,
    offset: offset,
    order: [
      ["updated", "DESC"]
    ],
    raw: true
  }).then(
    function (articles) {
      const articlesData = articles.rows.map(article => {
        const $ = cheerio.load(article.content);
        const text = $("p").text();

        return Object.assign(article, {
          excerpt: text
        });
      });

      return {
        count: articles.count,
        rows: articlesData
      };
    }
  );
}

function getArticleById(articleId) {
  if (!articleId || typeof articleId !== "number") {
    console.error(`[services/Article] Error in getArticleById method. Article id: ${articleId}`);
    return Promise.reject(new Error("Invalid data."));
  }

  return db.article.findOne({
    where: {
      id: articleId
    }
  });
}

module.exports = {
  getHtmlContent,
  parseArticle,
  saveArticles,
  saveArticlesForAllCategories,
  getArticles,
  getArticleById
};