const Sequelize = require("sequelize");

const db = new Sequelize("postgres://postgres:gustihero@localhost:5433/cruce", {
  dialect: "postgres",
  host: "localhost",
  logging: false,
});

module.exports = db;
