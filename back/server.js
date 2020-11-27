const express = require("express");
const app = express();
const volleyball = require("volleyball");
const path = require("path");
const db = require("./api/Models/index");
const routes = require("./api/Routes/index");
const socketio = require("socket.io");
////////////////////////////////////////////////////////////////////////////////////////////////////////////MIDDLEWARES
app.use(volleyball);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(__dirname + "/public"));

///////////////////////////////////////////////////////////////////////////////////////////////////////////ROUTING
app.use("/api", routes);

///////////////////////////////////////////////////////////////////////////////////////////////////////////RENDER HTML
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

const server = db.sync({ force: false }).then(() => {
  app.listen(8000, (req, res) => {
    console.log("SERVER EN PUERTO 8000");
  });
});

//SOCKETS
const io = socketio(server);
io.on("connection", (socket) => {
  console.log("Un nuevo cliente se ha conectado!" + socket);
});
