const express = require("express");
const router = express.Router();
const userRoutes = require("./user");
const usersRoutes = require("./users");

const orderRoutes = require("./order");


///////////////////////////////////////////////////////////////////////////////////////////////////////////RUTAS
router.use("/user", userRoutes);
router.use("/users", usersRoutes);
router.use("/order", orderRoutes);


module.exports = router;
