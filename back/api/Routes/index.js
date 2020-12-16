const express = require("express");
const router = express.Router();
const userRoutes = require("./user");
const usersRoutes = require("./users");
const orderRoutes = require("./order");
const cadeterias = require("./cadeterias");
const metricas = require("./metricas");

///////////////////////////////////////////////////////////////////////////////////////////////////////////RUTAS
router.use("/user", userRoutes);
router.use("/users", usersRoutes);
router.use("/order", orderRoutes);
router.use("/cadeterias", cadeterias);
router.use("/metricas", metricas);

module.exports = router;
