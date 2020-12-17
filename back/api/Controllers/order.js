const Cadeteria = require("../Models/Cadeteria");
const Order = require("../Models/Order");
const User = require("../Models/User");
const { Op } = require("sequelize");

const postOrders = (req, res, next) => {
  const { orders, user } = req.body;
  if (user.role == "Empresa") {
    User.findByPk(user.id).then(async (user) => {
      const cadeterias = await user.getCadeteria({ raw: true });
      Order.bulkCreate(orders, {
        individualHooks: false,
        user: user,
        cadeterias,
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
  const cadete = await User.findByPk(id);
  const order = await Order.findByPk(orderId);
  if (order.cadeteId) {
    res.send("Esta orden ya fue tomada!");
  } else {
    order.setCadete(cadete);
    order.state = "Pendiente de retiro en sucursal";
    order.assignedDate = Date.now();
    const tienda = await order.getEmpresa({ include: Cadeteria });
    const cadeterias = await tienda.getCadeteria({ raw: true });
    order.save({ cadeterias });
    res.send("Te asignaste correctamente!");
  }
};

const getAllOrdes = async (req, res, next) => {
  try {
    const { role, id, cadeteria } = req.user;
    const id_tiendas = [];
    if (role == "Cadete") {
      const tiendas_cadeterias = await cadeteria[0].getUsers({ raw: true }); //cadeteria[0] porque es un array, que si sos cadete solo tiene un elemento
      tiendas_cadeterias.map((user) => id_tiendas.push(user.id));
    }
    let orders;
    role == "Admin"
      ? (orders = await Order.findAll(
          { raw: true },
          {
            include: [{ model: User, as: "empresa" }],
          }
        ))
      : (orders = await Order.findAll({
          where:
            role == "Cadete"
              ? { state: "Pendiente", empresaId: id_tiendas }
              : {
                  empresaId: id,
                  state: "Pendiente",
                },
          raw: true,
        }));
  
    const parsedOrders = orders.map((order) => ({
      ...order,
      client: JSON.parse(order.client),
      destination: JSON.parse(order.destination),
      products: JSON.parse(order.products),
    }));
    res.status(200).send(parsedOrders);
  } catch (e) {
    res.status(503).end();
  }
};

const getSingleOrder = (req, res, next) => {
  Order.findByPk(req.params.id, {
    include: [
      { model: User, as: "empresa" },
      { model: User, as: "cadete" },
    ],
  })
    .then((order) => {
      res.status(200).send(order);
    })
    .catch((err) => console.log(err));
};

const singleOrderUpdate = (req, res, next) => {
  const id = req.params.id;
  const state = req.body.state;
  const userId = req.body.userId;

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
  User.findByPk(userId)
    .then(async (user) => {
      return await user.getCadeteria({ raw: true });
    })
    .then((cadeterias) => {
      Order.update(date(state), {
        where: { orderId: id },
        individualHooks: true,
        cadeterias,
      }).then(() => {
        Order.findOne({
          where: { orderId: id },
          include: [{ model: User, as: "empresa" }],
        }).then((orden) => {
          res.send(orden);
        });
      });
    });
};

const getMyOrdes = async (req, res, next) => {
  const userId = req.user.id;
  const role = req.user.role;
  const page = req.params.page;
  const { fecha, estado, tienda } = req.query;
  const parsedFecha = JSON.parse(fecha);

  const filters = () => {
    let filter = {
      cadeteId: userId,
      state: estado,
      creationDate: {
        [Op.between]: [parsedFecha.de, parsedFecha.hasta],
      },
    };
    if (role == "Empresa") {
      delete filter.cadeteId;
      filter = { ...filter, empresaId: userId };
    } else if (role == "Admin") {
      delete filter.cadeteId;
    }
    if (tienda) return { ...filter, empresaId: tienda };
    return filter;
  };
  try {
    const orders = await Order.findAndCountAll({
      where: filters(),
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
    res.status(503).end();
  }
};

const postObservaciones = async (req, res, next) => {
  const observaciones = req.body.observaciones
  const id = req.body.orderId
  Order.update({ comments: observaciones }, { where: { id } })
  .then(() => res.status(200).send('Observacion creada'))
}

module.exports = {
  postOrders,
  getAllOrdes,
  pickUp,
  getSingleOrder,
  singleOrderUpdate,
  getMyOrdes,
  postObservaciones
};
