const Order = require("../Models/Order");

const authSingleOrder = async (req, res, next) => {
    const user = req.user;
    const id = req.params.id
  try {
    Order.findByPk(id)
    .then((order) => {
      if (order.cadeteId == user.id || user.role === "Empresa" || user.role === "Admin")  {
        return next();
      }
    });
  } catch (e) {
      console.log('No estas autorizado')
    return next(e);
  }
};

module.exports = { authSingleOrder };
