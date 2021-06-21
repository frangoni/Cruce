const Sequelize = require('sequelize');

const db = new Sequelize('cruce', 'postgres', process.env.PASS, {
  dialect: 'postgres',
  host: 'localhost',
  logging: false,
});

module.exports = db;
