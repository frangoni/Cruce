const User = require('../Models/User')
const jwt = require('jsonwebtoken')
const privateKey = "clavesecreta1234"

const userValidation = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    const hash = await user.hash(password)
    if (hash == user.password) {
        //generar un jwt
        const encrypt = {
            user: user.email,
            exp: Math.floor(Date.now() / 1000) + (60 * 60) //expira en una hora
        }
        const token = jwt.sign(encrypt, privateKey, { algorithm: 'RS256' });
        return res.send(token)
    }
    res.status(401).send({ error: "acceso denegado" })


}

const userCreation = async (req, res, next) => {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email })
    if (userExists) return res.status(403).send({ error: "el usuario ya existe" })
    const user = await User.create({ email, password })
    res.status(201).send(user)
}

module.exports = { userValidation, userCreation }
