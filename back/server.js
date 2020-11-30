const express = require("express");
// const app = express();
// const server = require("http").Server(app) //es necesario para usar websockets armar un server http y pasarle la app de express
// const io = require("socket.io")(server)
const { server, io, app } = require("./io")

const volleyball = require("volleyball");
const path = require("path");
const db = require("./api/Models/index");
const routes = require("./api/Routes/index");
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



db.sync({ force: false }).then(() => {
  // app.listen(8000, (req, res) => {
  //   console.log("SERVER EN PUERTO 8000");
  // });
  server.listen(8000, () => { console.log("SERVER EN PUERTO 8000"); })
});
