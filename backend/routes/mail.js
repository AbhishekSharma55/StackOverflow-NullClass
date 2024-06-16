const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});




const sendEmail = async (to, subject, text) => {

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to : to,
    subject : subject,
    text : text,
    html : "<b>"+text+"</b>"
  };
  try {
    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(info);
        }
      });
    });
  
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;
