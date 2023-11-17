const nodemailer = require('nodemailer');

// Configuración del transportador (nodemailer)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tucorreo@gmail.com', // Tu dirección de correo
        pass: 'tucontraseña' // Tu contraseña de correo
    }
});

module.exports = transporter; 