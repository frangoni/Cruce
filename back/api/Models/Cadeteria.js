const { Model, DataTypes } = require("sequelize");
const db = require("../db");

class Cadeteria extends Model {}

Cadeteria.init(
  {
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    modelName: "cadeteria",
  }
);

module.exports = Cadeteria;
