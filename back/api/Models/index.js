

const Order = require("./Order");
const User = require("./User");
const db = require("../db/index");


Order.hasOne(User, { as: "Cadete" });
Order.hasOne(User, { as: "Empresa" });


module.exports = db;
