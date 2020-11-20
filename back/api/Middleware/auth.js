const jwt = require("jsonwebtoken");
const privateKey = "clavesecreta1234";
const User = require("../Models/User");

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
    const user = await User.findOne({ where: { email: decoded.user } });
    if (user) req.user = user;
    return next();
  } catch (e) {
    return next();
  }
};

module.exports = auth;
