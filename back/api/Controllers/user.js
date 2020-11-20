const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const privateKey = "clavesecreta1234";

const userValidation = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ where: { email } });
    const hash = await user.hash(password);
    if (hash == user.password) {
      //generar un jwt
      const encrypt = {
        user: user.email,
        exp: Math.floor(Date.now() / 1000) + 3600, //expira en una hora
      };
      const token = jwt.sign(encrypt, privateKey, { algorithm: "HS256" });
      return res.send(token);
    }
    res.status(401).send({ error: "Contraseña incorrecta" });
  } catch (e) {
    res.send({ error: "Usuario invalido" });
  }
};

const userCreation = async (req, res, next) => {
  const { email, password, name, role } = req.body;
  const userExists = await User.findOne({ where: { email } });
  if (userExists)
    return res.status(403).send({ error: "el usuario ya existe" });
  const user = await User.create({ email, password, name, role });
  res.status(201).send(user);
};

const userData = (req, res, next) => {
  if (req.user) return res.send(req.user);
  res.status(401).send({ error: "token invalido" });
};

module.exports = { userValidation, userCreation, userData };
