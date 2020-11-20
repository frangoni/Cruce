const { Model, DataTypes } = require("sequelize");
const db = require("../db");

class Order extends Model {}

Order.init(
  {
    receiver: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    //URL DE GOOGLE MAPS
    from: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    //URL DE GOOGLE MAPS
    to: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.ENUM(
        "Entregado",
        "Pendiente de retiro en sucursal",
        "En camino",
        "Devuelto a sucursal"
      ),
      allowNull: true,
    },
    assignedDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    pickedDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deliveredDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    delay: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.getDataValue(deliveredDate) - this.getDataValue(pickedDate);
      },
    },
  },
  { sequelize: db, modelName: "order" }
);

module.exports = Order;
