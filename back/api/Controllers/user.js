const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const Cadeteria = require("../Models/Cadeteria");
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
  console.log("req body", req.body);
  try {
    const user = await User.create(req.body);
    Cadeteria.findOrCreate({
      where: {
        name: req.body.cadeteria,
      },
    }).then((cadeteria) => {
      console.log("cadeteria", cadeteria);
      user.setCadeteria(cadeteria[0].id);
    });

    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};
const userData = (req, res, next) => {
  if (req.user) return res.status(200).send(req.user);
  res.status(401).send({ error: "Token invalido" });
};

module.exports = { userValidation, userCreation, userData };
