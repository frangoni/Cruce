const { Model, DataTypes } = require("sequelize");
const db = require("../db");

class Product extends Model {}

Product.init(
  {
    sku: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  { sequelize: db, modelName: "product" }
);

module.exports = Product;
