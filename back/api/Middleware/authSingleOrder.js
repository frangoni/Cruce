const Order = require("../Models/Order");
const User = require("../Models/User");

const authSingleOrder = async (req, res, next) => {
  const user = req.user;
  const id = req.params.id;
  try {
    const order = await Order.findByPk(id);
    const creator = await User.findByPk(order.empresaId, { include: { all: true } });
    const ids = [];
    creator.cadeteria.map((cadeteria) => ids.push(cadeteria.id));
    if (user.role == "Cadete" && ids.includes(user.cadeteria[0].id)) return next();
    if (user.role == "Empresa" && order.empresaId == user.id) return next();
    if (user.role == "Admin") return next();
  } catch (e) {
    console.log("No estas autorizado");
    return next(e);
  }
};

module.exports = { authSingleOrder };
