const User = require("../Models/User");
const Cadeteria = require("../Models/Cadeteria");
const { Op } = require("sequelize")
const { genereteNewToken } = require("../Middleware/auth")
const { v4: uuidv4 } = require("uuid")
const postEmail = require("../services/mail")

const userValidation = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    const hash = await user.hash(password);
    if (hash == user.password && user.accepted) {
      //generar un jwt
      const token = genereteNewToken(user.email)
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
    if (user.role == "Cadete") {
      Cadeteria.findOrCreate({
        where: {
          name: req.body.cadeteria,
        },
      }).then((cadeteria) => {
        user.setCadeteria(cadeteria[0].id);
      });
    }
    res.status(201).send(user);
  } catch (err) {
    console.log("err", err)
    res.status(400).send(err);
  }
};
const userData = (req, res, next) => {
  if (req.user) {
    return res.status(200).send(req.user);
  }
  res.status(401).send({ error: "Token invalido" });
};

const resetPassword = async (req, res, next) => {
  const { email } = req.body
  try {
    const user = await User.findOne({ where: { email } })
    if (user) {
      user.reset = uuidv4()
      const savedUser = await user.save()
      postEmail(user, true) //el segundo argumento es para enviar un email de reset
      return res.send({ ok: "Reset pendiente", savedUser })
    }
    else return res.status(404).send({ error: "Datos erroneos" })
  } catch (e) {
    res.status(503).end()
  }
}
const resetPasswordValidator = async (req, res, next) => {
  const { uuid } = req.params
  const { email, password } = req.body
  console.log("UUID:", uuid, " EMAIL:", email, " PASWORD:", password)
  try {
    const user = await User.findOne({ where: { [Op.and]: [{ email }, { reset: uuid }] } })
    if (user) {

      const newPassword = await user.hash(password)
      console.log(newPassword)
      user.password = newPassword
      user.reset = "";
      const savedUser = await user.save()
      return res.send({ ok: "Contraseña cambiada con exito!", savedUser })
    }
    res.status(404).send({ error: "Datos erroneos" })
  }
  catch (e) {
    return res.status(501).send(e)
  }

}
module.exports = { userValidation, userCreation, userData, resetPassword, resetPasswordValidator };
