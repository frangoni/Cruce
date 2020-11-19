const User = require('../Models/User')
const jwt = require('jsonwebtoken')
const privateKey = "clavesecreta1234"


const getAllCadetes = async (req, res, next) => {
    if (req.user && (req.user.role == "Admin")) {
        const users = await User.findAll({ where: { role: "Cadete" } });
        return res.send(users)
    }
    res.status(401).send({ error: "token invalido" })
}

const getAllEmpresas = async (req, res, next) => {
    if (req.user && (req.user.role == "Admin")) {
        const users = await User.findAll({ where: { role: "Empresa" } });
        return res.send(users)
    }
    res.status(401).send({ error: "token invalido" })
}

module.exports = { getAllCadetes, getAllEmpresas }