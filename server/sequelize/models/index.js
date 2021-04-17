const fs = require("fs");
const Sequelize = require("sequelize");
const path = require("path");

const config = require("../config");

const db = {};
const sequelizeModelsDir = "./sequelize/models";
const mode = process.env.NODE_ENV || "development";

function sequelizeOptions(dbConfig) {
  let logging = false;
  if (mode === "development") {
    logging = function (message) {
      console.log("[Sequelize logs] " + message);
    };
  }

  return {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    dialectOptions: dbConfig.dialectOptions,
    pool: dbConfig.pool,
    logging
  };
}

const dbConfig = config[mode];

const sequelize = new Sequelize(
  dbConfig.database, dbConfig.username, dbConfig.password, sequelizeOptions(dbConfig)
);

fs.readdirSync(sequelizeModelsDir).filter(
  function (file) {
    return file.indexOf(".") !== 0 &&
      file !== "index.js" &&
      file.slice(-3) === ".js";
  }
).forEach(
  function (file) {
    const model = require(path.resolve(sequelizeModelsDir + "/" + file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  }
);

Object.keys(db).forEach(
  function (modelName) {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;