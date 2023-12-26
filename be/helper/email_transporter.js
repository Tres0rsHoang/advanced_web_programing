import nodemailer from "nodemailer";

const createNodeMailer = () => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_SENDER_USER,
            pass: process.env.EMAIL_SENDER_APP_PASS,
        }
    });
    return transporter;
}

export default createNodeMailer;