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
  production: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: "postgres",
    dialectOptions: {
      encrypt: true,
      ssl: {
        require: true,
        rejectUnauthorized: false
      },
      requestTimeout: 600000// 10 min
    },
    pool: {
      max: 100,
      idle: 600000,
      acquire: 600000
    }
  }
};