import emailTransporter from './email_transporter.js';

export default async function (emailAddress, verifyUrl) {
    return new Promise((resolve, reject) => {
        const transporter = emailTransporter();
        const emailOptions = {
            from: `"AdvancedWebSite" <${process.env.EMAIL_SENDER_USER}>`,
            to: emailAddress,
            subject: "Verify your resgister",
            html: `<p>Please click to this link to verify your email: <a href='${verifyUrl}'>Click here to verify</a></p>`
        }
        const handler = (err, info) => {
            if (err) {
                reject(err);
                throw err;
            }
            resolve(info);
        };
        transporter.sendMail(emailOptions, handler);
    });
};