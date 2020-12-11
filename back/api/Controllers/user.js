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
  
  try {
    const user = await User.create(req.body);
    Cadeteria.findOne({
      where: {
      name: req.body.cadeteria
      }
    })
      .then((cadeteria) => {
      user.setCadeteria(cadeteria.dataValues.id)
    })
    

    /*const cadeteria = await Cadeteria.findOrCreate({
      where: { name: req.body.cadeteria },
    });
    cadeteria.addUser(user); */
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

/* const setCadeteria = async (req, res, next) => {
  const cadeteria = await Cadeteria.findByPk(req.body.cadeteria);
  const user = await User.findByPk(req.body.user);
  cadeteria.addUser(user);
}; */

const userData = (req, res, next) => {
  if (req.user) return res.send(req.user);
  res.status(401).send({ error: "token invalido" });
};

module.exports = { userValidation, userCreation, userData };
