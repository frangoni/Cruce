const nodemailer = require("nodemailer");

const postEmail = (user) =>
  nodemailer.createTestAccount((err, account) => {
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
    let message = {
      from: "<crucecadetear@gmail.com>",
      to: `<${user.email}>`,
      subject: "Nodemailer is unicode friendly ✔",
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
