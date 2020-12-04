const Order = require("./Order");
const User = require("./User");
const Cadeteria = require("./Cadeteria");
const db = require("../db/index");

Order.belongsTo(User, { as: "empresa" });
Order.belongsTo(User, { as: "cadete" });
User.belongsToMany(Cadeteria, {
  through: "userCadeteria",
});
Cadeteria.belongsToMany(User, {
  through: "userCadeteria",
});

module.exports = { db, Order, User, Cadeteria };
