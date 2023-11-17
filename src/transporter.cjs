const nodemailer = require('nodemailer');

// Configuración del transportador (nodemailer)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'estefania.gaviria91@gmail.com', // Tu dirección de correo
        pass: 'vkhb paks snlj xuji' // Tu contraseña de correo
    }
});

module.exports = transporter; 