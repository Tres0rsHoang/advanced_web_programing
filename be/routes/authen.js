import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from "uuid";
import authenToken from "../helper/authenticate_token.js";
import databaseConnection from '../helper/database_connection.js';
import databaseQuery from '../helper/database_query.js';
import sendMail from '../helper/send_email.js';
import { authenPassword, createRefreshToken } from '../ultis/authen_utils.js';

const authenRouter = express.Router();

const databaseRequest = await databaseConnection();

authenRouter.post('/login', async function (req, res, next) {
    try {
        let reqData = req.body;

        if (typeof (req.body) == "string") {
            reqData = JSON.parse(req.body);
        }

        const email = reqData['email'];
        const password = reqData['password'];

        const id = await authenPassword(email, password);

        if (id == 'unverify_email') {
            res.status(202).json({ "messages": "Please verify your email" });
            return;
        }
        if (id == 'locked') {
            res.send({ messages: "Your account is locked" });
            return;
        }

        if (id) {
            const refreshTokenId = await createRefreshToken(id);

            const accessToken = jwt.sign(
                { "user_id": id },
                process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '5m' }
            );

            res.cookie('bao_home_server_jwt', refreshTokenId, {
                httpOnly: true,
                sameSite: 'None', secure: true,
                maxAge: 24 * 60 * 60 * 1000
            });

            res.json({ 'access_token': accessToken });
        }
        else {
            res.status(202).json({ "messages": "Password or email is not correct" });
        }
    }
    catch (err) {
        console.log("ERROR[/auth/login]:", err);
    }
});

authenRouter.get('/refreshToken', async function (req, res, next) {
    try {
        if (req.cookies?.bao_home_server_jwt) {
            const refreshToken = req.cookies.bao_home_server_jwt;
            var sql = `SELECT user_id FROM refresh_authen WHERE token = '${refreshToken}' AND is_revoked = 0`;
            var userId = await databaseQuery(databaseRequest, sql);
            if (userId.length == 0) return res.status(406).json({ message: 'Unauthorized' });
            userId = userId[0]['user_id'];

            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY, (err, data) => {
                if (err) {
                    return res.status(406).json({ message: 'Unauthorized' });
                }
                else {
                    const accessToken = jwt.sign({
                        user_id: userId
                    }, process.env.ACCESS_TOKEN_SECRET_KEY, {
                        expiresIn: '5m'
                    });
                    return res.json({ access_token: accessToken });
                }
            });
        } else {
            return res.status(406).json({ message: 'Unauthorized' });
        }
    }
    catch (err) {
        console.log("ERROR[/auth/refreshToken]:", err);
    }
});

authenRouter.get('/logout', authenToken, async function (req, res, next) {
    try {
        if (req.cookies?.bao_home_server_jwt) {
            const refreshToken = req.cookies.bao_home_server_jwt;
            var sql = `SELECT user_id FROM refresh_authen WHERE token = '${refreshToken}'`;
            var userId = await databaseQuery(databaseRequest, sql);
            if (userId.length == 0) return res.status(406).json({ message: 'Unauthorized' });
            userId = userId[0]['user_id'];

            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY, async (err, data) => {
                if (err) {
                    return res.status(406).json({ message: 'Unauthorized' });
                }
                else {
                    const sql = `UPDATE [refresh_authen] SET is_revoked = 1 WHERE token = '${refreshToken}'`;

                    await databaseQuery(databaseRequest, sql);

                    res.json({ "messages": "Logout successfully" });
                }
            });
        } else {
            return res.status(406).json({ message: 'Unauthorized' });
        }
    }
    catch (err) {
        console.log("ERROR[/auth/logout]:", err);
    }

});

authenRouter.post('/register', async function (req, res, next) {
    try {
        let reqData = req.body;

        if (typeof (req.body) == "string") {
            reqData = JSON.parse(req.body);
        }

        const id = uuidv4();
        const email = reqData['email'];
        const firstName = reqData['first_name'];
        const lastName = reqData['last_name'];
        const password = reqData['password'];
        const phoneNumber = reqData['phone_number'];

        const sql = `SELECT * FROM [user] WHERE email = '${email}'`;

        const results = await databaseQuery(databaseRequest, sql);

        if (results.length > 0) {
            res.status(202).json({ "messages": "Email already exist" });
        }
        else {
            const hashPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS)).catch(err => console.error(err.message));
            const sql = `INSERT INTO [user](id, email, password, phone_number, first_name, last_name, is_verify, is_admin, is_locked) VALUES ( '${id}', '${email}', '${hashPassword}', '${phoneNumber}', '${firstName}', '${lastName}', 0, 0, 0)`;

            const verifyUrl = req.protocol + '://' + req.get('host') + req.originalUrl + '/verify-email?userId=' + id;
            const emailSubject = 'Verify your resgister';
            const emailContent = `<p>Please click to this link to verify your email: <a href='${verifyUrl}'>Click here to verify</a></p>`;

            await sendMail(email, emailSubject, emailContent);

            await databaseQuery(databaseRequest, sql);
            res.status(200).json({ "messages": "Send verify email success" });
        }
    }
    catch (err) {
        console.log("ERROR[/auth/register]:", err);
    }
});

authenRouter.get('/register/verify-email', async function (req, res, next) {
    try {
        const userId = req.query.userId;
        const sql = `UPDATE [user] SET is_verify = 1 WHERE id = '${userId}'`;
        await databaseQuery(databaseRequest, sql);
        res.send({ messages: "Verify successfully" });
    }
    catch (err) {
        console.log("ERROR[/auth/register/verify-email]:", err);
    }
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

authenRouter.post('/reset-password', async function (req, res, next) {
    try {
        let reqData = req.body;

        if (typeof (req.body) == "string") {
            reqData = JSON.parse(req.body);
        }
        const resetPasswordCode = getRandomInt(1000, 9999);
        const email = reqData['email'];

        var sql = `SELECT COUNT(1) as number_of_user FROM [user] WHERE email = '${email}'`;
        var sqlResult = await databaseQuery(databaseRequest, sql);
        var numberOfUser = sqlResult[0]['number_of_user'];

        if (numberOfUser == 0) {
            res.status(202).json({ "messages": "ERROR: Invalid email" });
        }

        sql = `UPDATE [user] SET reset_password_code = ${resetPasswordCode} WHERE email = '${email}'`;
        await databaseQuery(databaseRequest, sql);

        const resetPasswordUrl = process.env.SITE_URL + `/reset-password?email=${email}&reset-code=${resetPasswordCode}`;
        const emailSubject = 'Reset your password';
        const emailContent = `<p>Please click to this link to reset your password: <a href='${resetPasswordUrl}'>Click here to reset</a></p>`;
        const result = await sendMail(email, emailSubject, emailContent);

        res.send(result);
    }
    catch (err) {
        console.log("ERROR[/auth/reset-password]:", err);
    }
});

authenRouter.patch('/confirm-reset-password', async function (req, res, next) {
    try {
        let reqData = req.body;

        if (typeof (req.body) == "string") {
            reqData = JSON.parse(req.body);
        }

        const resetPasswordCode = reqData['reset_code'];
        const email = reqData['email'];
        const newPassword = reqData['new_password'];
        const hashPassword = await bcrypt.hash(newPassword, parseInt(process.env.SALT_ROUNDS)).catch(err => console.error(err.message));

        const sql = `SELECT COUNT(1) FROM [user] WHERE email = '${email}' AND reset_password_code = ${resetPasswordCode}`;
        const result = await databaseQuery(databaseRequest, sql);

        if (result != 0) {
            const sql = `UPDATE [user] SET password = '${hashPassword}', reset_password_code = NULL WHERE email = '${email}'`;
            await databaseQuery(databaseRequest, sql);
            res.status(200).json({ "messages": "Change password successfully" })
        }
        else {
            res.status(202).json({ "messages": "Fail to change password" });
        }
    }
    catch (err) {
        console.log("ERROR[/auth/confirm-reset-password]:", err);
    }
});

authenRouter.get('/', async function (req, res, next) {
    res.send("Server is running...");
});

export default authenRouter;