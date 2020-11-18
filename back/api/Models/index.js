const Product = require("./Products");
const Branch = require("./Branch");
const Order = require("./Order");
const User = require("./User");
const OrderProduct = require("./OrderProduct");
const db = require("../db/index");

Branch.hasOne(User);
Product.hasOne(User);
Order.hasOne(User, { as: "Cadete" });
Order.hasOne(User, { as: "Empresa" });
Product.belongsToMany(Order, { through: OrderProduct });
Order.belongsToMany(Product, { through: OrderProduct });

module.exports = db;
