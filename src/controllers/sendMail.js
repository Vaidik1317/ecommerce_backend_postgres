const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",

  secure: true, // true for port 465, false for other ports
  auth: {
    user: "221243107010.ce@gmail.com",
    pass: "thwsqqijmbfziesm",
    // thws qqij mbfz iesm
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(to, subject, text, html) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "221243107010.ce@gmail.com", // sender address
    to,
    subject,
    text, // plain text body
    html,
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

// sendMail().catch(console.error);
module.exports = { sendMail };
