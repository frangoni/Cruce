const express = require("express")
const router = express.Router()
const { userValidation, userCreation } = require("../Controllers/user")

router.post('/login', userValidation)

router.post('/register', userCreation)

module.exports = router