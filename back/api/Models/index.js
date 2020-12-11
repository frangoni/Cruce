const Order = require("./Order");
const User = require("./User");
const Cadeteria = require("./Cadeteria")
const db = require("../db/index");

Order.belongsTo(User, { as: "empresa" });
Order.belongsTo(User, { as: "cadete" });

Cadeteria.belongsToMany(User, { through: 'CadeteriaUsers' });
User.belongsToMany(Cadeteria, { through: 'CadeteriaUsers' });


module.exports = db;
