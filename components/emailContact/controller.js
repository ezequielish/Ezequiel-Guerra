const nodemailer = require('nodemailer');
const { myEmail, passEmail } = require('../../config');
function sendMail(body) {
    return new Promise((resolve, reject) => {
        const { name, subject, email, message } = body

        if (!name || !email || !message) {
            console.log('[contactController] datos invalidas');
            reject('datos invalidos')
        }

        //AUTH EMAIL
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: myEmail, // TODO:  gmail account
                pass: passEmail // TODO:  gmail password
            }
        });
        const mailOptions = {
            // from: emailClient, // TODO: email sender
            to: myEmail, // TODO: email receiver
            subject: subject,
            text: `Nombre Cliente: ${name} \n Email Cliente: ${email} \n Asunto: ${subject} \n Mensaje: ${message}`
        };

        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                console.log(err)
              reject('ha ocurrido un error')
            }
            resolve('email enviado')
          });

    })
}

module.exports = {
    sendMail
}