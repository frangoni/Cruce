///////////////////////////////////////////////////////////////////////////////////////////////////////////order
const express = require("express");
const router = express.Router();
const { auth } = require("../Middleware/auth")
const { authSingleOrder } = require("../Middleware/authSingleOrder")

const {
  postOrders,
  getAllOrdes,
  pickUp,
  getSingleOrder,
  singleOrderUpdate,
  getMyOrdes,
  postObservaciones
} = require("../Controllers/order");

router.get("/:id", auth, authSingleOrder, getSingleOrder);
router.put('/observaciones', auth, postObservaciones)
router.post("/excel", postOrders); //TODO aca hay que usar el middleware para saber si esta autenticado
router.put("/:id", singleOrderUpdate);
router.get("/", auth, getAllOrdes);
router.put("/", auth, pickUp);
router.get("/myorders/:page", auth, getMyOrdes);

module.exports = router;
