'use strict';

let mailer = require ('nodemailer');
//let Future = require ('./future');
let config = require ('../app/config/config');

module.exports = function () {

return function mailSender (mailOptions) {
    let mail = mailOptions ;

    console.log(`MailOptions => ${JSON.stringify(mailOptions)}`);
    let transporter = mailer.createTransport({
        service : config.email.gmail.service,
        auth : {
            user : config.email.gmail.username,
            pass : config.email.gmail.authenticator
        }

    });
    return new Promise((resolve, reject) => {
        transporter.sendMail(mail, function (error, info) {
            if (error) {
                console.log(`mailSender : Error => ${error}`);
                return reject(error);
            }
            else {
                resolve(' Email is/are Sent ');
                console.log('Email is sent');
            }
        });
    });
};



};


