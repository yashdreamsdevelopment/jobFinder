const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "lowell87@ethereal.email",
    pass: "E9rgZBpWY4QASdJJsF",
  },
});

const shootMail = async (name, email, token) => {
  try {
    const info = await transporter.sendMail({
      from: '"Jobs Finder" <no-reply@jobsFinder.com>',
      to: email,
      subject: "Account Verification",
      html: `<h1>Hi ${name} 👋</h1> <h2>Verify Your Account</h2> <a href='http://localhost:5173/verifyEmail?token=${token}'>Verify</a>`,
    });

    if (info.messageId) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

module.exports = shootMail;
