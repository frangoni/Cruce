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
        values: [
          "Pendiente",
          "Pendiente de retiro en sucursal",
          "Retirado",
          "Entregado",
          "Cancelado",
        ],
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
        return (
          this.getDataValue("deliveredDate") - this.getDataValue("pickedDate")
        );
      },
    },
  },
  { sequelize: db, modelName: "order" }
);

Order.addHook("afterBulkCreate", async (order, options) => {
  // We can use `options.transaction` to perform some other call
  // using the same transaction of the call that triggered this hook
  // const orders = await Order.findAll({ where: {}, raw: true })
  const parsedOrders = order.map((order) => ({
    ...order.dataValues,
    client: JSON.parse(order.dataValues.client),
    destination: JSON.parse(order.dataValues.destination),
    products: JSON.parse(order.dataValues.products),
  }));
  io.emit("ordersCreated", JSON.stringify(parsedOrders));
});
Order.addHook("afterUpdate", async (order, options) => {
  if (options.fields.includes("cadeteId")) {
    io.to("Cadete").emit(
      "dbModifications",
      JSON.stringify({
        orderId: order.dataValues.id,
        cadeteId: order.dataValues.cadeteId,
        state: order.dataValues.state,
      })
    );
  }
  if (options.fields.includes("state")) {
    io.emit(
      "stateUpdate",
      JSON.stringify({
        orderId: order.dataValues.id,
        state: order.dataValues.state,
      })
    );
  }
  console.log(options);
});

module.exports = Order;
