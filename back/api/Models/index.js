const Order = require("./Order");
const User = require("./User");
const db = require("../db/index");

Order.belongsTo(User, { as: "empresa" });
Order.belongsTo(User, { as: "cadete" });

module.exports = db;
