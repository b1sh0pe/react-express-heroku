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
    username: "vsdddvmfxyqshv",
    password: "c6060286ab0c301cac545dec014b5211f64a9951b04dd6686d2955ce85674956",
    database: "d3op51g68at5su",
    host: "ec2-54-220-35-19.eu-west-1.compute.amazonaws.com",
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
  }
};