const express = require("express");
const router = express.Router();
const userRoutes = require("./user");
const usersRoutes = require("./users");
const branchRoutes = require("./branch");
const orderRoutes = require("./order");
const productRoutes = require("./product");
const orderproductRoutes = require("./orderproduct");

///////////////////////////////////////////////////////////////////////////////////////////////////////////RUTAS
router.use("/user", userRoutes);
router.use("/users", usersRoutes);
router.use("/branch", branchRoutes);
router.use("/order", orderRoutes);
router.use("/product", productRoutes);
router.use("/orderproduct", orderproductRoutes);

module.exports = router;
