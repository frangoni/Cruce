const express = require("express")
const router = express.Router()
const { getAllCadetes, getAllEmpresas } = require("../Controllers/users")
const auth = require("../Middleware/auth")

router.get('/cadetes', auth, getAllCadetes)
router.get('/empresas', auth, getAllEmpresas)


module.exports = router