const express = require("express");
const app = express();
const server = require("http").Server(app); //es necesario para usar websockets armar un server http y pasarle la app de express
const io = require("socket.io")(server);
const User = require("./api/Models/User");

io.on("connection", async (socket) => {
  const { id } = socket.handshake.query;
  const user = await User.findByPk(id);
  const cadeterias = await user.getCadeteria({ raw: true });
  cadeterias.forEach((cadeteria) => {
    socket.join(cadeteria.name);
  
  });
});

module.exports = { server, io, app };
