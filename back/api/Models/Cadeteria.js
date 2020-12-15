const { Model, DataTypes } = require("sequelize");
const db = require("../db");

class Cadeteria extends Model {}

Cadeteria.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    accepted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    rejected: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: db,
    modelName: "cadeteria",
  }
);

module.exports = Cadeteria;
