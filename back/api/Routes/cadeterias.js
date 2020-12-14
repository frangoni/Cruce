const express = require("express");
const router = express.Router();
const auth = require("../Middleware/auth")
const isAdmin = require("../Middleware/isAdmin")
const {
    getAcceptedCadeterias,
    createCadeteria,
    getSingleCadeteria,
    assignCadeterias,
    getAllCadeterias,
    acceptById,
    cadeteriaDelete
} = require("../Controllers/cadeterias");


router.get("/", getAcceptedCadeterias);
router.post("/", createCadeteria);
router.put("/:id", acceptById); 
router.get('/all', getAllCadeterias)
router.post("/delete", cadeteriaDelete);


module.exports = router;