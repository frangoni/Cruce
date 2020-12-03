const express = require("express");
const app = express();
const server = require("http").Server(app); //es necesario para usar websockets armar un server http y pasarle la app de express
const io = require("socket.io")(server);

io.on("connection", (socket) => {
  const room = socket.handshake.query.role
  console.log("Conexión establecida", socket.handshake.query);
  socket.join("Cadete");
});

module.exports = { server, io, app };
