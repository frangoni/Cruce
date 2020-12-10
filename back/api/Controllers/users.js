const User = require("../Models/User");
const nodemailer = require("nodemailer");
const postEmail = require("../services/mail");
const getAllCadetes = async (req, res, next) => {
  try {
    const users = await User.findAll({ where: { role: "Cadete" } });
    return res.send(users);
  } catch (e) {
    console.log(e);
    return res.status(503).end();
  }
};

const getAllEmpresas = async (req, res, next) => {
  try {
    const users = await User.findAll({ where: { role: "Empresa" } });
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
      { accepted: true },
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
  console.log(req.body);
  const id = req.body.content;

  User.destroy({ where: { id: id } })
    .then(() => res.status(200).send("Eliminado"))
    .catch((e) => res.status(500).send(e));
};

module.exports = { getAllCadetes, getAllEmpresas, acceptById, userDelete };
