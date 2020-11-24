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
        exp: Math.floor(Date.now() / 1000) + 3600,
      };
      const token = jwt.sign(encrypt, privateKey, { algorithm: "HS256" });
      return res.send(token);
    }
    res.status(401).send({ error: "acceso denegado" });
  } catch (e) {
    console.log(e);
  }
};

const userCreation = async (req, res, next) => {
  try {
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
