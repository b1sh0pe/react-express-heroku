const db = require("../sequelize/models");

function getAllCategories() {
  return db.category.findAll({
    raw: true
  });
}

module.exports = {
  getAllCategories
};