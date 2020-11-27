const Order = require("../Models/Order");

const postOrders = (req, res, next) => {
  Order.bulkCreate(req.body).then((a) => res.send(a));
};

const getOrders = (req, res, next) => {
  Order.findAll({
    where: { state: "Pendiente de retiro en sucursal" },
  }).then((orders) => res.status(200).send(orders));
};

const getAllOrdes = async (req, res, next) => {
  try {
    const orders = await Order.findAll({ raw: true })
    const parsedOrders = orders.map(order => ({
      ...order,
      client: JSON.parse(order.client),
      destination: JSON.parse(order.destination),
      products: JSON.parse(order.products)
    }))
    res.status(200).send(parsedOrders);
  }
  catch (e) {
    console.log(e)
    res.status(503).end()
  }
};

module.exports = { postOrders, getOrders, getAllOrdes };
