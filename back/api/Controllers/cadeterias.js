const Cadeteria = require("../Models/Cadeteria");
const User = require("../Models/User");

const getAcceptedCadeterias = async (req, res, next) => {
  try {
    const cadeterias = await Cadeteria.findAll({
      where: {
        accepted: true,
        rejected: false,
      },
    });
    res.send(cadeterias);
  } catch (e) {
    res.sendStatus(503);
  }
};

const getAllCadeterias = async (req, res, next) => {
  try {
    const cadeterias = await Cadeteria.findAll({ where: { rejected: false } });
    res.send(cadeterias);
  } catch (e) {
    res.status(503).send(e);
  }
};

const createCadeteria = async (req, res, next) => {
  try {
    const cadeteria = await Cadeteria.create(req.body);
    res.status(201).send(cadeteria);
  } catch (e) {
    res.sendStatus(503);
  }
};

const acceptById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [changes, modified] = await Cadeteria.update(
      { accepted: true },
      {
        where: {
          id,
        },
        returning: true,
        plain: true,
      }
    );
    console.log("modified", modified);
    return res.send(modified);
  } catch (e) {
    console.log(e);
    return res.status(503).end();
  }
};

const cadeteriaDelete = (req, res, next) => {
  const id = req.body.content;
  Cadeteria.update(
    { rejected: true, accepted: false },
    { where: { id }, returning: true, plain: true }
  )
    .then((rejectedCadeteria) => {
      rejectedCadeteria[1].getUsers().then((users) => {
        users.map((user) => {
          if (user.role == "Cadete") {
            user.update(
              { rejected: true, accepted: false },
              { where: { role: "Cadete" } }
            );
          }
        });
      });
    })
    .then(() => res.send("Cadeteria Eliminada"))
    .catch((e) => console.log(e));
};

const getSingleCadeteria = async (req, res, next) => {
  const user = req.user;
  try {
    const cadeterias = await user.getCadeteria();
    res.send(cadeterias);
  } catch (e) {
    res.sendStatus(503);
  }
};

const getSingleCadeteriaCadete = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await User.findByPk(id);
    const cadeterias = await user.getCadeteria();
    res.send(cadeterias);
  } catch (e) {
    res.sendStatus(503);
  }
};

const assignCadeterias = async (req, res, next) => {
  const { cadeteriasIds } = req.body;
  const { user } = req;
  const cadeterias = await Cadeteria.findAll({ where: { id: cadeteriasIds } });
  user.setCadeteria(cadeterias);
  res.send({ msg: "todo piola" });
};

module.exports = {
  getAcceptedCadeterias,
  createCadeteria,
  getSingleCadeteria,
  assignCadeterias,
  getAllCadeterias,
  acceptById,
  cadeteriaDelete,
  getSingleCadeteriaCadete,
};
