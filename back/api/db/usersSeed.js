const User = require("../Models/User");
const Cadeteria = require("../Models/Cadeteria");
const db = require("../Models/index");

db.sync({ force: true }).then(async () => {
  const cadeterias = await Cadeteria.bulkCreate([
    { name: "Avioneta veloz" },
    { name: "Camioneta veloz" },
    { name: "Motoneta Veloz" },
    { name: "Motoneta Agil" },
    { name: "Motoneta Rapida" },
    { name: "Motoneta Ligera" },
    { name: "Motoneta Espacial" },
    { name: "Maquina del Espacio" },
    { name: "Ussain Bolt" },
  ]);
  const users = await User.bulkCreate(
    [
      {
        name: "Admin",
        email: "admin@admin.com",
        password: "1234",
        company: "Admin",
        accepted: true,
        role: "Admin",
      },
      {
        name: "Seba",
        email: "seba.wetzel@gmail.com",
        password: "1234",
        company: "Motoneta veloz",
        accepted: false,
        role: "Cadete",
      },
      {
        name: "Feli",
        email: "feli@gmail.com",
        password: "1234",
        company: "Motoneta veloz",
        accepted: false,
        role: "Cadete",
      },
      {
        name: "Fran",
        email: "fran@gmail.com",
        password: "1234",
        company: "Motoneta veloz",
        accepted: false,
        role: "Cadete",
      },
      {
        name: "Gus",
        email: "gus@gmail.com",
        password: "1234",
        company: "Motoneta veloz",
        accepted: false,
        role: "Cadete",
      },
      {
        name: "Lucas",
        email: "lucas@gmail.com",
        password: "1234",
        company: "Motoneta veloz",
        accepted: false,
        role: "Cadete",
      },
      {
        name: "Joaco",
        email: "joaco@gmail.com",
        password: "1234",
        company: "Motoneta veloz",
        accepted: true,
        role: "Cadete",
      },
      {
        name: "Lara",
        email: "lara@gmail.com",
        password: "1234",
        company: "Motoneta veloz",
        accepted: false,
        role: "Cadete",
      },
      {
        name: "Lucho",
        email: "lucho@gmail.com",
        password: "1234",
        company: "Motoneta veloz",
        accepted: false,
        role: "Cadete",
      },
      {
        name: "Dani",
        email: "dani.gordoli@gmail.com",
        password: "1234",
        company: "Motoneta veloz",
        accepted: false,
        role: "Cadete",
      },
      {
        name: "Vitto",
        email: "vitto@gmail.com",
        password: "1234",
        company: "Motoneta veloz",
        accepted: true,
        role: "Cadete",
      },
      {
        name: "Farmacias del pueblo",
        email: "farma@gmail.com",
        password: "1234",
        company: "Farmacias del pueblo",
        accepted: true,
        role: "Empresa",
      },
      {
        name: "Gabarino",
        email: "garbarino@gmail.com",
        password: "1234",
        company: "Garbarino",
        accepted: true,
        role: "Empresa",
      },
      {
        name: "GPS Farma",
        email: "gpsfarma@gmail.com",
        password: "1234",
        company: "GPS Farma",
        accepted: true,
        role: "Empresa",
      },
    ],
    { individualHooks: true }
  );

  users.map((user) => {
    let start = 0;
    let end = 0;
    do {
      start = Math.floor(Math.random() * 9);
      end = Math.floor(Math.random() * (9 - start) + start);
    } while (end - start < 3);

    const single = Math.floor(Math.random() * (9 - start) + start);
    const shuffleCadeterias = [...cadeterias].sort(() => {
      return 0.5 - Math.random();
    });
    if (user.role === "Empresa")
      user.addCadeteria(shuffleCadeterias.slice(start, end));
    else user.addCadeteria(shuffleCadeterias[single]);
  });
});
