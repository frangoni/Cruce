const Order = require("./Order");
const User = require("./User");
const Cadeteria = require("./Cadeteria");
const db = require("../db/index");

Order.belongsTo(User, { as: "empresa" });
Order.belongsTo(User, { as: "cadete" });

// Una cadeteria tiene varios cadetes
Cadeteria.belongsToMany(User, { through: "CadeteriaUsers" });

// Una tienda puede trabajar con varias cadeterías
User.belongsToMany(Cadeteria, { through: "CadeteriaUsers" });

module.exports = db;
