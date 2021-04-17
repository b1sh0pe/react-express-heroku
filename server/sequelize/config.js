module.exports = {
  development: {
    username: "postgres",
    password: "postgres",
    database: "react-express-heroku",
    host: "localhost",
    port: "5432",
    dialect: "postgres",
    dialectOptions: {
      encrypt: true,
      requestTimeout: 600000// 10 min
    },
    pool: {
      max: 100,
      idle: 600000,
      acquire: 600000
    }
  },
  production: {}
};