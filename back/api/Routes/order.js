///////////////////////////////////////////////////////////////////////////////////////////////////////////order
const express = require("express");
const router = express.Router();
const {
  postOrders,
  getAllOrdes,
  pickUp,
  getSingleOrder,
  singleOrderUpdate
} = require("../Controllers/order");

router.post("/excel", postOrders); //TODO aca hay que usar el middleware para saber si esta autenticado
router.get("/", getAllOrdes);
router.put("/", pickUp);
router.get("/:id", getSingleOrder);
router.put("/:id", singleOrderUpdate);

module.exports = router;
