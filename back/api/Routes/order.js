///////////////////////////////////////////////////////////////////////////////////////////////////////////order
const express = require("express");
const router = express.Router();
const { postOrders, getOrders } = require("../Controllers/order");
/* const auth = require("../Middleware/auth");
 */
router.post("/excel", postOrders);
router.get("/", getOrders);
module.exports = router;
