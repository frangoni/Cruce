const Order = require("../Models/Order");
const User = require("../Models/User");

const postOrders = (req, res, next) => {
  const { orders, user } = req.body;
  if (user.role == "Empresa") {
    User.findByPk(user.id).then((user) => {
      Order.bulkCreate(orders, { individualHooks: false }).then((all) => {
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
  console.log(req.body);
  const { userId, orderId } = req.body;
  const user = await User.findByPk(userId);
  const order = await Order.findByPk(orderId);
  order.setCadete(user);
  order.state = "Pendiente de retiro en sucursal";
  order.assignedDate = Date.now();
  order.save();
  res.send(order);
};

const getAllOrdes = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: { state: "Pendiente" },
      raw: true,
    });
    const parsedOrders = orders.map((order) => ({
      ...order,
      client: JSON.parse(order.client),
      destination: JSON.parse(order.destination),
      products: JSON.parse(order.products),
    }));
    res.status(200).send(parsedOrders);
  } catch (e) {
    console.log(e);
    res.status(503).end();
  }
};

const getSingleOrder = (req, res, next) => {
  Order.findOne({
    where: { orderId: req.params.id },
    include: [{ model: User, as: "empresa" }],
  })
    .then((order) => {
      res.status(200).send(order);
    })
    .catch((err) => console.log(err));
};

const singleOrderUpdate = (req, res, next) => {
  const id = req.params.id;
  const state = req.body.state;

  function date(state) {
    switch (state) {
      case "Pendiente de retiro en sucursal":
        return { state, assignedDate: Date.now() };

      case "Retirado":
        return { state, pickedDate: Date.now() };

      case "Entregado":
        return { state, deliveredDate: Date.now() };

      default:
        return {state};
    }
  }

  Order.update(date(state), {
    where: { orderId: id },
  }).then(() => {
    Order.findOne({
      where: { orderId: id },
      include: [{ model: User, as: "empresa" }],
    }).then((orden) => {
      res.send(orden);
    });
  });
};

module.exports = {
  postOrders,
  getOrders,
  getAllOrdes,
  pickUp,
  getSingleOrder,
  singleOrderUpdate,
};
