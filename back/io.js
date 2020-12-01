const express = require("express");
const app = express();
const server = require("http").Server(app); //es necesario para usar websockets armar un server http y pasarle la app de express
const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log("Conexión establecida");
  socket.join("cadetes");
});

module.exports = { server, io, app };
