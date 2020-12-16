const express = require("express");
const router = express.Router();
const { auth } = require("../Middleware/auth")
const getMetricas = require("../Controllers/metricas");

router.get("/", auth, getMetricas);

module.exports = router;