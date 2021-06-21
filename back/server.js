require("dotenv").config();
const express = require("express");
const { server, app } = require("./io");
const volleyball = require("volleyball");
const path = require("path");
const db = require("./api/Models/index");
const routes = require("./api/Routes/index");
////////////////////////////////////////////////////////////////////////////////////////////////////////////MIDDLEWARES
const PORT = process.env.PORT || 8001;

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

db.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log("SERVER EN PUERTO:", PORT);
  });
});
