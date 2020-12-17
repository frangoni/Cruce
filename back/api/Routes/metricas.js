const express = require("express");
const router = express.Router();
const { auth } = require("../Middleware/auth");
const { getMetricas, fetchUser } = require("../Controllers/metricas");

router.get("/", auth, getMetricas);
router.get("/:id", fetchUser);
module.exports = router;
