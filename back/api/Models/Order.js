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
    creationDate : {
      type : DataTypes.DATE,
      allowNull:true, 
    },
    // STRINGIFY JSON/////
    client : {
      type :  DataTypes.STRING,
      allowNull:true
    },
    destination : {
      type :DataTypes.STRING,
     allowNull:true

    },
    products : {
      type : DataTypes.STRING,
      allowNull:true
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
      defaultValue="Pendiente de retiro en sucursal",
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
