const jwt = require("jsonwebtoken");
const privateKey = "clavesecreta1234";
const User = require("../Models/User");
const Cadeteria = require("../Models/Cadeteria");

const auth = async (req, res, next) => {
  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    console.error("No token found");
    return res.status(403).json({ error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(idToken, privateKey);
    //TODO  cambiar el obj user por los fields necesarios
    //const {name, id, role} = await User.findOne({ where: { email: decoded.user } })
    //if (id) req.user = {name  id :user. name}
    const user = await User.findOne({
      where: { email: decoded.user },
      include: { all: true },
    });
    if (user) req.user = user;
    return next();
  } catch (e) {
    console.log(e);
    return next(e);
  }
};
module.exports = auth;
