const { Model, DataTypes } = require("sequelize");
const db = require("../db");

class Branch extends Model {}

Branch.init(
  {
    pv: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
    },
  },
  { sequelize: db, modelName: "branch" }
);

module.exports = Branch;
