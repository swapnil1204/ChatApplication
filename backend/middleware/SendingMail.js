const nodemailer = require('nodemailer');
require('dotenv').config;

/**
 * @function : sendingMail()
 * @description : this method write send mail using 'gmail' services attached with url.
 * @param  : { url }
 * @file : SendingMail.js
 * @exports : sendingMail()
 */

exports.sendingMail = (url) => {
    try {
        console.log("email=========>", process.env.email)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.emailFrom,
                pass: process.env.password
            },
        });
        const mailOptions = {
            from: process.env.emailFrom, //'wanderlust672@gmail.com',
            to: process.env.emailTo, //'swapnilbamb1204@gmail.com',
            subject: 'reset link attached with mail',
            text: 'Your Email verifaction link is:\n\n' + url
        };
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log("error while sending mail", err)
            } else
                console.log('mail send  this is message id ', info.messageId);
        });
    } catch (error) {
        console.log("Exception not handled while sending mail");
    }
}


