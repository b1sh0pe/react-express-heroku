const path = require('path');
const axios = require('axios');
const cors = require('cors');
const express = require('express');

const app = express();
const db = require("./sequelize/models");
const parseTask = require("./cron-scripts/parse-news");
const Article = require("./services/Article");

const PORT = process.env.PORT || 5000;

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));
app.use(cors());

app.use(require("./controllers"));

app.listen(PORT, () => {
  parseTask.start();
  Article.saveArticlesForAllCategories().catch(
    (error) => console.error("Error during importing articles on start. Error: " + error)
  );
  console.log(`Server started on port ${PORT}`);
});
