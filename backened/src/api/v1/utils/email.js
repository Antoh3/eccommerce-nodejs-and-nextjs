const nodemailer = require("nodemailer")
const {
    getEmailSender,
    getSmtpHost,
    getSmtpPort,
    getEmailPassword
} = require('./appConfig');



// nodemailer
const emailSender = getEmailSender();
const emailPassword = getEmailPassword()
const smtpHost = getSmtpHost();
const  smtpPort = getSmtpPort();


const connectionData = {
    host: smtpHost, // Replace with your SMTP server
    port: smtpPort,      // Typically 587 for TLS, 465 for SSL
    secure: false,       // Set to true if using port 465
    auth: {
        user: emailSender, // Your email address
        pass: emailPassword  // Your email password
    }
}


module.exports.sendVerificationEmail = async (email,link) =>{
    const transpoter = await nodemailer.createTransport(connectionData)
    const mailOptions = {
        from: emailSender,
        to: email,
        subject: "Verification link",
        text: link,
        html:`<h1>${link}</h1>`
    }

    await transpoter.sendMail(mailOptions,(error, info) =>{
        if (error) {
            return console.log('Error occurred while sendin email:', error);
          }
          console.log('Email sent:', info.response);
    });
}