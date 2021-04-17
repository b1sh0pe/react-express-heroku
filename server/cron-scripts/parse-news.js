const cron = require("node-cron");
const Article = require("../services/Article");

const parseTask = cron.schedule("0 */4 * * *", () => {
  return Article.saveArticlesForAllCategories();
});

module.exports = parseTask;