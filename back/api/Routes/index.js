const express = require("express");
const router = express.Router();
const userRoutes = require("./user");
const usersRoutes = require("./users");
const orderRoutes = require("./order");
const cadeterias = require("./cadeterias")

///////////////////////////////////////////////////////////////////////////////////////////////////////////RUTAS
router.use("/user", userRoutes);
router.use("/users", usersRoutes);
router.use("/order", orderRoutes);
router.use("/cadeterias", cadeterias)


module.exports = router;
