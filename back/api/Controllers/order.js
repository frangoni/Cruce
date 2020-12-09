const { Order, User } = require("../Models");

const postOrders = (req, res, next) => {
  const { orders, user } = req.body;

  if (user.role == "Empresa") {
    User.findByPk(user.id).then((user) => {
      Order.bulkCreate(orders, {
        individualHooks: false,
        user: user,
      }).then((all) => {
        all.map((orden) => orden.setEmpresa(user));
      });
    });
  } else {
    res.status(403).send("Solo empresas pueden cargar ordenes");
  }
};

const pickUp = async (req, res, next) => {
  const { orderId } = req.body;
  const { id } = req.user;
  console.log("order", req.body);
  const user = await User.findByPk(id);
  const order = await Order.findByPk(orderId);
  order.setCadete(user);
  order.state = "Pendiente de retiro en sucursal";
  order.assignedDate = Date.now();
  order.save();
  res.send(order);
};

const getAllOrdes = async (req, res, next) => {
  const { role, id } = req.user;
  try {
    const orders = await Order.findAll({
      where: role == "Cadete" ? { state: "Pendiente" } : { empresaId: id },
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
  Order.findByPk(req.params.id, {
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
        return { state };
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

const getMyOrdes = async (req, res, next) => {
  const cadeteId = req.user.id;
  const page = req.params.page;
  try {
    const orders = await Order.findAndCountAll({
      where: { cadeteId },
      raw: true,
      order: [["assignedDate", "DESC"]],
      limit: 10,
      offset: 10 * page,
    });
    const parsedOrders = orders.rows.map((order) => ({
      ...order,
      client: JSON.parse(order.client),
      destination: JSON.parse(order.destination),
      products: JSON.parse(order.products),
    }));
    res.status(200).send({ count: orders.count, results: parsedOrders });
  } catch (e) {
    console.log(e);
    res.status(503).end();
  }
};

module.exports = {
  postOrders,
  getAllOrdes,
  pickUp,
  getSingleOrder,
  singleOrderUpdate,
  getMyOrdes,
};
