const Order = require("../Models/Order");
const User = require("../Models/User");

const postOrders = (req, res, next) => {
  const { orders, user } = req.body;
  if (user.role == "Empresa") {
    User.findByPk(user.id).then((user) => {
      Order.bulkCreate(orders).then((all) => {
        all.map((orden) => orden.setEmpresa(user));
      });
    });
  } else {
    res.send("Solo empresas pueden cargar ordenes");
  }
};

const getOrders = (req, res, next) => {
  Order.findAll({
    where: { state: "Pendiente de retiro en sucursal" },
  }).then((orders) => res.status(200).send(orders));
};

const pickUp = async (req, res, next) => {
  const { cadeteId, orderId } = req.body
  const user = await User.findByPk(cadeteId)
  const order = await Order.findByPk(orderId)
  order.setCadete(user)
  order.state = "Pendiente de retiro en sucursal"
  order.assignedDate = Date.now()
  order.save()
  res.send(order)

}

const getAllOrdes = async (req, res, next) => {
  try {
    const orders = await Order.findAll({ where: {}, raw: true })
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

module.exports = { postOrders, getOrders, getAllOrdes, pickUp };
