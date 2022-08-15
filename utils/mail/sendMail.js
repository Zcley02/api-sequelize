const nodemailer = require("nodemailer");
const config = require("../../config/config");

const sendMail = async (infoMail) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
      user: config.emailSmtp,
      pass: config.passSmtp,
    },
  });

  await transporter.sendMail(infoMail);

  return { message: "email sent" }

};

module.exports = sendMail;