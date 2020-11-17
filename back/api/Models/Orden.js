const { Model, DataTypes } = require("sequelize");
const db = require("../db");

class Order extends Model {}

Order.init(
  {
    receiver: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    from: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    to: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    picked: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    delivered: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    delay: {
      type: DataTypes.VIRTUAL,
    },
  },
  { sequelize: db, modelName: "order" }
);

module.exports = Order;
