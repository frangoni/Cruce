const express = require("express");
const router = express.Router();
const auth = require("../Middleware/auth");
const isAdmin = require("../Middleware/isAdmin");
const {
  getAcceptedCadeterias,
  createCadeteria,
  getSingleCadeteria,
  assignCadeterias,
  getAllCadeterias,
  acceptById,
  cadeteriaDelete,
} = require("../Controllers/cadeterias");

router.get("/all", getAllCadeterias);
router.put("/:id", acceptById);
router.post("/delete", cadeteriaDelete);
router.get("/miscadetes", auth, getSingleCadeteria);
router.get("/", getAcceptedCadeterias);
router.put("/", auth, assignCadeterias);
router.post("/", createCadeteria);

module.exports = router;
