///////////////////////////////////////////////////////////////////////////////////////////////////////////order
const express = require("express");
const router = express.Router();
const { postOrders, getAllOrdes, pickUp, getMyOrdes } = require("../Controllers/order");
const auth = require("../Middleware/auth")


router.post("/excel", postOrders) //TODO aca hay que usar el middleware para saber si esta autenticado
router.get("/", auth, getAllOrdes)
router.get("/myorders/:page", auth, getMyOrdes)
router.put("/", pickUp)
module.exports = router;
