const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const privateKey = "clavesecreta1234";

const userValidation = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    const hash = await user.hash(password);
    if (hash == user.password && user.accepted) {
      //generar un jwt
      const encrypt = {
        user: user.email,
        exp: Math.floor(Date.now() / 1000) + 3600,
      };
      const token = jwt.sign(encrypt, privateKey, { algorithm: "HS256" });
      return res.status(200).send({ user, token });
    }

    res.status(403).send({ error: "Contraseña incorrecta" });
  } catch (e) {
    res.status(403).send({ error: "Usuario invalido" });
  }
};

const userCreation = async (req, res, next) => {
  try {
    console.log('req body', req.body)
    const user = await User.create(req.body);
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

const userData = (req, res, next) => {
  if (req.user) return res.send(req.user);
  res.status(401).send({ error: "token invalido" });
};

module.exports = { userValidation, userCreation, userData };
