const { Model, DataTypes } = require("sequelize");
const db = require("../db");

class OrderProduct extends Model {}

OrderProduct.init(
  {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  { sequelize: db, modelName: "OrderProduct" }
);

module.exports = OrderProduct;
