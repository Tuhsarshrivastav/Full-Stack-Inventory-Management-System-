const nodemailer = require("nodemailer");

function sendEmail(email, otp) {
  console.log(otp);
  var email = email;
  var otp = otp;
  const mail = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: process.env.email,
      pass: process.env.password,
    },
  });
  var mailOptions = {
    from: "ims@12345",
    to: email,
    subject: "Reset Password Link - wenestor.com",
    html:
      '<p>You requested for reset password, kindly use this <a href="http://localhost:3000/reset-password?token=' +
      otp +
      '">link</a> to reset your password</p>',
  };
  mail.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(0);
    }
  });
}
module.exports = sendEmail;
