const jwt = require("jsonwebtoken");
const privateKey = "clavesecreta1234";
const User = require("../Models/User");

const auth = async (req, res, next) => {
  console.log("REQ.HEADER",req.headers)
  console.log("REQ.BODY", req.body)
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
    const decoded = jwt.verify(idToken, privateKey); // decoded guarda los datos que guardamos en el encrypt, si se verifica el token, te da tus datos
    const user = await User.findOne({ where: { email: decoded.user } });
    if (user) req.user = user;
    return next();
  } catch (e) {
    return next();
  }
};

module.exports = auth;
