///////////////////////////////////////////////////////////////////////////////////////////////////////////order
const express = require("express");
const router = express.Router();
const auth = require("../Middleware/auth")
const {
  postOrders,
  getAllOrdes,
  pickUp,
  getSingleOrder,
  singleOrderUpdate,
  getMyOrdes
} = require("../Controllers/order");

router.post("/excel", postOrders); //TODO aca hay que usar el middleware para saber si esta autenticado
router.get("/", auth, getAllOrdes);
router.put("/", auth, pickUp);
router.get("/:id", getSingleOrder);
router.put("/:id", singleOrderUpdate);
router.get("/myorders/:page", auth, getMyOrdes)

module.exports = router;
