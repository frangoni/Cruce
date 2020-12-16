const User = require("../Models/User");
const nodemailer = require("nodemailer");
const postEmail = require("../services/mail");
const Cadeteria = require("../Models/Cadeteria");

const getAllCadetes = async (req, res, next) => {
  try {
    const users = await User.findAll({
      where: { role: "Cadete", rejected: false },
      include: [{ model: Cadeteria }],
    });
    return res.send(users);
  } catch (e) {
    console.log(e);
    return res.status(503).end();
  }
};

const getAllEmpresas = async (req, res, next) => {
  try {
    const users = await User.findAll({
      where: { role: "Empresa", rejected: false },
    });
    return res.send(users);
  } catch (e) {
    console.log(e);
    return res.status(503).end();
  }
};

const acceptById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [changes, modified] = await User.update(
      { accepted: true }, //acc: false --> pending
      {
        where: {
          id,
        },
        returning: true,
        plain: true,
      }
    ).then(() =>
      User.findOne({ where: { id: id } }).then((user) => postEmail(user))
    );
    return res.send(modified);
  } catch (e) {
    console.log(e);
    return res.status(503).end();
  }
};

const userDelete = (req, res, next) => {
  const id = req.body.content;
  User.update({ rejected: true, accepted: false }, { where: { id: id } })
    .then(() => res.status(200).send("Usuario rechazado"))
    .catch((e) => res.status(500).send(e));
};

module.exports = { getAllCadetes, getAllEmpresas, acceptById, userDelete };
