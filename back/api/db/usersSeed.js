const { User, Cadeteria, db } = require("../Models");

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
        name: "Vitto",
        email: "farma@gmail.com",
        password: "1234",
        company: "Farmacias del pueblo",
        accepted: true,
        role: "Empresa",
      },
    ],
    { individualHooks: true }
  );

  users.map((user) => {
    const start = Math.floor(Math.random() * 9);
    const end = Math.floor(Math.random() * (9 - start) + start); //Math.floor(Math.random() *9 - start)
    console.log("start ", start, "end ", end);
    user.addCadeteria(cadeterias.slice(start, end));
  });
});
