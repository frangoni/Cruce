const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const privateKey = process.env.PORT;

const genereteNewToken = data => (
  jwt.sign({
    user: data,
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
  }, privateKey, { algorithm: "HS256" }))

const decode = (idToken) => jwt.verify(idToken, privateKey)

const refreshToken = (data, actualToken) => {
  if (data.exp > Date.now() / 1000 + (60 * 40)) {
    return genereteNewToken(data.user)
  }
  return actualToken
}

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
    const decoded = decode(idToken);
    //TODO  cambiar el obj user por los fields necesarios
    //const {name, id, role} = await User.findOne({ where: { email: decoded.user } })
    //if (id) req.user = {name  id :user. name}
    const user = await User.findOne({
      where: { email: decoded.user },
      include: { all: true },
    });
    if (user) {
      user.dataValues.token = refreshToken(decoded, idToken)
      req.user = user;

    }
    return next();
  } catch (e) {
    console.log(e);
    return next(e);
  }
};

module.exports = { auth, genereteNewToken, decode };
