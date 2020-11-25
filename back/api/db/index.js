const Sequelize = require("sequelize");

const db = new Sequelize("cruce", null, null, {
  dialect: "postgres",
  host: "localhost",
  logging: false,
});

module.exports = db;
//"postgres://postgres:gustihero@localhost:5433/cruce"
