///////////////////////////////////////////////////////////////////////////////////////////////////////////order
const express = require("express");
const router = express.Router();
const {postOrders} = require("../Controllers/order");


router.post("/excel", postOrders)

module.exports = router;
