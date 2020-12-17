const nodemailer = require("nodemailer");

const postEmail = (user, reset) =>

  nodemailer.createTestAccount((err, account) => {
    console.log("RESET", user.reset)
    if (err) {
      console.error("Failed to create a testing account. " + err.message);
      return process.exit(1);
    }
    console.log("Credentials obtained, sending message...");
    let transporter = nodemailer.createTransport({
      secure: false,
      service: "gmail",
      auth: {
        user: "crucecadetear@gmail.com",
        pass: "cruceCadetear2020",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    let message = reset ? {
      from: "<crucecadetear@gmail.com>",
      to: `<${user.email}>`,
      subject: "Reset de contraseña",
      text: `Olvidaste la contraseña ${user.name}?`,
      html: `<body 
      <h1> Hola ${user.name}! Para resetear la contraseña hast click <a href="http://localhost:8000/reset/${user.reset}"> AQUI </a> </h1>
    </body>`,
    } : {
        from: "<crucecadetear@gmail.com>",
        to: `<${user.email}>`,
        subject: "Ya sos parte del equipo✔",
        text: `Bienvenidio ${user.name}! Podemos confirmarte que ya sos parte de la comunidad de Cruce, te esperamos en la plataforma`,
        html: `<body 
      <h1> Bienvenidio ${user.name}! Podemos confirmarte que ya sos parte de la comunidad de Cruce, te esperamos en la plataforma</h1>
    </body>`,
      };
    transporter.sendMail(message, (err, info) => {
      if (err) {
       
        return process.exit(1);
      }
      res.status(200).json(user);
      
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
  });

module.exports = postEmail;
