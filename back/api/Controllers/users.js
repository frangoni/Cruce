const User = require("../Models/User");
const nodemailer = require("nodemailer");

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
    ); /* .then((user) => {
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "",
          pass: "",
        },
      });
      const mailOptions = {
        from: "cruce@cruce.com",
        to: user.email,
        subject: `Ya podes empezar a tomar ordenes ${user.nombre}!`,
        html: "",
        attachments: [
          {
            filename: "",
            cid: "",
            //same cid value as in the html img src
          },
        ],
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("----- Email enviadoo ----- ");
        }
      });
    }); */
    console.log(changes, modified);
    return res.send(modified);
  } catch (e) {
    console.log(e);
    return res.status(503).end();
  }
};
module.exports = { getAllCadetes, getAllEmpresas, acceptById };
