const express = require("express");
const router = express.Router();
const auth = require("../Middleware/auth")
const {
    getAcceptedCadeterias,
    createCadeteria,
    getSingleCadeteria,
    assignCadeterias,
    getAllCadeterias
} = require("../Controllers/cadeterias");


router.get("/", getAcceptedCadeterias);
router.post("/", createCadeteria);
router.put("/", auth, assignCadeterias)
router.get("/:id", auth, getSingleCadeteria);
router.get('/all', getAllCadeterias)


module.exports = router;