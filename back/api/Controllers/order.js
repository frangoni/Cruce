const Order = require("../Models/Order");

const postOrders = (req, res, next) => {
  Order.bulkCreate(req.body).then((a) => res.send(a));
};

const getOrders = (req, res, next) => {
  Order.findAll({
    where: { state: "Pendiente de retiro en sucursal" },
  }).then((orders) => res.status(200).send(orders));
};

module.exports = { postOrders, getOrders };
