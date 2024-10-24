import nodemailer from "nodemailer";

// Create a transporter object using default SMTP transport
export const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE, // E.g., 'gmail'
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
