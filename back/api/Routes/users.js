const express = require("express");
const router = express.Router();
const {
  getAllCadetes,
  getAllEmpresas,
  acceptById,
  userDelete,
} = require("../Controllers/users");
const { auth } = require("../Middleware/auth");
const isAdmin = require("../Middleware/isAdmin");

router.get("/cadetes", auth, isAdmin, getAllCadetes);
router.get("/empresas", auth, isAdmin, getAllEmpresas);
router.put("/cadetes/:id", auth, isAdmin, acceptById);
router.put("/empresas/:id", auth, isAdmin, acceptById);
router.post("/delete", userDelete);

module.exports = router;
