const { Model, DataTypes } = require("sequelize");
const db = require("../db");

class Order extends Model {}

Order.init(
  {
    //URL DE GOOGLE MAPS
    from: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    orderId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    creationDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    // STRINGIFY JSON/////
    client: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    destination: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    products: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // STRINGIFY JSON/////
    state: {
      type: DataTypes.ENUM({
        values: [
          "Pendiente de retiro en sucursal",
          "Retirado",
          "En progreso",
          "Entregado",
        ],
      }),
      defaultValue: "Pendiente de retiro en sucursal",
    },
    assignedDate: {
      type: DataTypes.DATE,
      defaultValue:null

    },
    pickedDate: {
      type: DataTypes.DATE,
      defaultValue:null

    },
    deliveredDate: {
      type: DataTypes.DATE,
      defaultValue:null
    },
    delay: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.getDataValue('deliveredDate') - this.getDataValue('pickedDate');
      },
    },
  },
  { sequelize: db, modelName: "order" }
);

module.exports = Order;
