require('dotenv').config();
const Sequelize = require('sequelize');
const db = new Sequelize('cruce', 'postgres', 'root', {
  dialect: 'postgres',
  host: 'localhost',
  logging: false,
});

module.exports = db;
