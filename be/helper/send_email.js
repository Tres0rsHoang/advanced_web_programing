import emailTransporter from './email_transporter.js';

export default async function (emailAddress, emailSubject, emailContent) {
    return new Promise((resolve, reject) => {
        const transporter = emailTransporter();
        const emailOptions = {
            from: `"AdvancedWebSite" <${process.env.EMAIL_SENDER_USER}>`,
            to: emailAddress,
            subject: emailSubject,
            html: emailContent
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