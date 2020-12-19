const { Model, DataTypes } = require("sequelize");
const db = require("../db");
const { io } = require("../../io");

class Order extends Model {}

Order.init(
  {
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
        values: ["Pendiente", "Pendiente de retiro en sucursal", "Retirado", "Entregado", "Cancelado"],
      }),
      defaultValue: "Pendiente",
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    assignedDate: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    pickedDate: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    deliveredDate: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    delay: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.getDataValue("deliveredDate") - this.getDataValue("assignedDate");
      },
    },
    delayTransport: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.getDataValue("deliveredDate") - this.getDataValue("pickedDate");
      },
    },
    delayCircuit: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.getDataValue("deliveredDate") - this.getDataValue("creationDate");
      },
    },
  },
  { sequelize: db, modelName: "order" }
);

Order.addHook("afterBulkCreate", async (order, options) => {
  const parsedOrders = order.map((order) => ({
    ...order.dataValues,
    client: JSON.parse(order.dataValues.client),
    destination: JSON.parse(order.dataValues.destination),
    products: JSON.parse(order.dataValues.products),
  }));
  options.cadeterias.forEach((cadeteria) => {
    io.to(cadeteria.name).emit("ordersCreated", JSON.stringify({ empresa: options.user.id, ordenes: parsedOrders }));
  });
  io.to(options.user.name).emit("ordersCreated", JSON.stringify({ empresa: options.user.id, ordenes: parsedOrders }));
});

Order.addHook("afterUpdate", async (order, options) => {
  const parsedOrder = {
    ...order.dataValues,
    client: JSON.parse(order.dataValues.client),
    destination: JSON.parse(order.dataValues.destination),
    products: JSON.parse(order.dataValues.products),
  };
  if (options.fields.includes("state")) {
    options.cadeterias.forEach((cadeteria) => {
      io.to(cadeteria.name).emit("dbModifications", JSON.stringify(parsedOrder));
    });
    io.to(options.tienda.name).emit("dbModifications", JSON.stringify(parsedOrder));
  }
});

module.exports = Order;
