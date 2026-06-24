const nodeMailer = require("nodemailer");
require("dotenv").config();

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  },
});

const sendVerificationEmail = async(email,token) => {
  // const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;
  const verificationUrl = `${process.env.CLIENT_URL}/api/auth/verify-email?token=${token}`;

  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to:email,
    subject: "Verify Your Email",
    html: `
    <h2>Book Store</h2>
    <p>Click link below:</p>
    <a href="${verificationUrl}"> Verify Email </a>`
  })
}

module.exports = {transporter, sendVerificationEmail,};