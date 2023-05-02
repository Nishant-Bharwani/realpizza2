const nodemailer = require('nodemailer');
const { EMAIL_USER, EMAIL_PASS } = require('../config');
class MailService {
    async sendMail(mailOptions) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // const mailOptions = {
        //     from: process.env.EMAIL_USER,
        //     to: userEmail,
        //     subject: 'RealPizza Email Verification',
        //     html: `
        //       <p>Hi ${userName},</p>
        //       <p>Thank you for registering with RealPizza</p>
        //       <p>Please click <a href="http://localhost:3000/auth/verify/${token}">here</a> to verify your email address.</p>
        //       <p>If you did not request this, please ignore this email.</p>
        //       <p>Regards,</p>
        //       <p>Team RealPizza</p>
        //     `,
        // };


        await transporter.sendMail(mailOptions);


    }
}

module.exports = new MailService();