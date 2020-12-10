const express = require("express");
const router = express.Router();
const auth = require("../Middleware/auth")
const {
    getAllCadeterias,
    createCadeteria,
    getSingleCadeteria,
    assignCadeterias
} = require("../Controllers/cadeterias");


router.get("/", getAllCadeterias);
router.post("/", createCadeteria);
router.put("/", auth, assignCadeterias)
router.get("/:id", auth, getSingleCadeteria);


module.exports = router;