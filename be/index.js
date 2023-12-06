import bcrypt from 'bcrypt';
import cors from "cors";
import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from "uuid";
import authenToken from "./helper/authenticate_token.js";
import databaseConnection from './helper/database_connection.js';
import databaseQuery from './helper/database_query.js';
import sendMail from './helper/send_email.js';

dotenv.config();
const app = express();

app.use(express.json());

app.use(cors());  

const databaseRequest = await databaseConnection();

async function authenPassword(email, password) {
    const sql =`SELECT id, password, is_verify FROM [user] WHERE email = '${email}'`;

    var result = await databaseQuery(databaseRequest, sql);

    if (result.length > 0) {
        const hash = result[0]['password'];
        const id = result[0]['id'];
        const res = await bcrypt.compare(password, hash).catch(err => console.log(err.message));
        if (result[0]['is_verify'] == 0) return "unverify_email";
        if (res) return id;
    }
    return null;
}

async function createRefreshToken(userId) {
    const refreshTokenId = uuidv4();
    const refreshToken = jwt.sign(
        { "id": refreshTokenId },
        process.env.REFRESH_TOKEN_SECRET_KEY,
        { expiresIn: "7d" }
    )
    const sql = `INSERT INTO [refresh_authen] (id, user_id, token, is_revoked) VALUES ( '${refreshTokenId}', '${userId}', '${refreshToken}', 0)`;
    
    await databaseQuery(databaseRequest, sql);

    return refreshTokenId;
}

app.post('/login', async function(req, res, next) {
    let reqData = req.body;

    if (typeof(req.body) == "string") {
        reqData = JSON.parse(req.body);
    }

    const email = reqData['email'];
    const password = reqData['password'];

    const id = await authenPassword(email, password);

    if (id == 'unverify_email') {
        res.status(200).json({ "message": "Unverify email" });
    }
    if (id) {
        const refreshTokenId = await createRefreshToken(id);
        const accessToken = jwt.sign(
            { "refresh_token_id": refreshTokenId },
            process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '5m' }
        );
        res.json({ 'access_token': accessToken });
    }
    else {
        res.status(200).json({ "message": "Password or email is not correct" });
    }
});

app.get('/refreshToken', authenToken, async function(req, res, next) {
    const authorizationHeader = req.headers['authorization'];
    const accessToken = authorizationHeader.split(' ')[1];
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY, async (err, data) => {
        if (err) {
            res.status(403).json({ "Error": err });
            throw err;
        }
        const refreshTokenId = data['refresh_token_id'];
        const sql = `SELECT * FROM refresh_authen WHERE id = '${refreshTokenId}'`;

        const result = await databaseQuery(databaseRequest, sql);

        if (result.length > 0) {
            const refreshToken = result[0]['token'];
            const refreshTokenRevoked = result[0]['is_revoked'];
            if (refreshTokenRevoked == 0) {
                jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY, (err, data) => {
                    if (err) {
                        res.status(403).json({ "Error": err });
                        throw err;
                    }
                    const accessToken = jwt.sign(
                        { "refresh_token_id": refreshTokenId },
                        process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '5m' }
                    );
                    res.status(200).json({ "access_token": accessToken });
                });
            }
            else {
                res.status(403).json({ "message": "Refresh token is revoked" });
            }
        }
        else {
            res.status(403).json({ "Error": "Invalid Access Token" });
        }
    });
});

app.get('/logout', authenToken, async function(req, res, next) {
    const authorizationHeader = req.headers['authorization'];
    const accessToken = authorizationHeader.split(' ')[1];

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY, async (err, data) => {
        if (err) {
            res.status(403).json({ "Error": err });
            throw err;
        }
        const refreshTokenId = data['refresh_token_id'];
        const sql = `UPDATE [refresh_authen] SET is_revoked = 1 WHERE id = '${refreshTokenId}'`;

        await databaseQuery(databaseRequest, sql);

        res.json({ "message": "Logout successfully" });
    });

});

app.post('/register', async function(req, res, next) {
    let reqData = req.body;

    if (typeof(req.body) == "string") {
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
        res.status(200).json({ "message": "Email already exist" });
    }
    else {
        const hashPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS)).catch(err => console.error(err.message));
        const sql = `INSERT INTO [user](id, email, password, phone_number, first_name, last_name, is_verify) VALUES ( '${id}', '${email}', '${hashPassword}', '${phoneNumber}', '${firstName}', '${lastName}', 0)`;

        const verifyUrl = req.protocol + '://' + req.get('host') + req.originalUrl + '/verify-email?userId=' + id;
        const emailSubject = 'Verify your resgister';
        const emailContent = `<p>Please click to this link to verify your email: <a href='${verifyUrl}'>Click here to verify</a></p>`;
 
        await sendMail(email, emailSubject, emailContent).catch((err) => {
            res.status(200).json({ "message": "Error when send verify email" });    
            console.log(err);
        });
        await databaseQuery(databaseRequest, sql);
        res.status(200).json({ "message": "Send verify email success" });
    }
});

app.get('/profile', authenToken, async function(req, res, next){
    const authorizationHeader = req.headers['authorization'];
    const accessToken = authorizationHeader.split(' ')[1];

    const refreshTokenId = jwt.decode(accessToken)['refresh_token_id'];

    const userIdSql = `SELECT user_id FROM [refresh_authen] WHERE id = '${refreshTokenId}'`;
    const userId = await databaseQuery(databaseRequest, userIdSql);

    if (userId.length > 0) {
        const sql = `SELECT * FROM [user] WHERE id = '${userId[0]["user_id"]}'`;
        
        const results = await databaseQuery(databaseRequest, sql);

        res.status(200).json(results[0]);
    }
    else {
        res.status(200).json({ "message": "Invalid access token" });
    }
});

app.patch('/profile', authenToken, async function(req, res, next) {
    let reqData = req.body;

    if (typeof(req.body) == "string") {
        reqData = JSON.parse(req.body);
    }

    const authorizationHeader = req.headers['authorization'];
    const accessToken = authorizationHeader.split(' ')[1];

    const refreshTokenId = jwt.decode(accessToken)['refresh_token_id'];
    const userIdSql = `SELECT user_id FROM [refresh_authen] WHERE id = '${refreshTokenId}'`;
    
    const userIdQueryResult = await databaseQuery(databaseRequest, userIdSql);

    const userId = userIdQueryResult[0]['user_id'];

    if (reqData['password']) {
        const hashPassword = await bcrypt.hash(reqData['password'], parseInt(process.env.SALT_ROUNDS)).catch(err => console.error(err.message));
        reqData['password'] = hashPassword;
    }

    const sql = "UPDATE [user]"

    let setSql = "SET";

    const whereSql = `WHERE id = '${userId}'`;

    const params = [userId];

    Object.keys(reqData).forEach(function(key){
        setSql += ` ${key} = '${reqData[key]}',`;
    });

    setSql = setSql.slice(0, -1); 

    const result = await databaseQuery(databaseRequest, `${sql} ${setSql} ${whereSql}`).catch(err => {
        res.status(200).json({"messages" : "Update user profile fail (error query)"});
    });

    res.status(200).json({"messages" : "Update user profile successfully"});
});

app.get('/register/verify-email', async function(req, res, next) {
    const userId = req.query.userId;
    const sql = `UPDATE [user] SET is_verify = 1 WHERE id = '${userId}'`;
    await databaseQuery(databaseRequest, sql);
    res.send("Verify successfully");
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

app.post('/reset-password', async function (req, res, next) {
    let reqData = req.body;

    if (typeof(req.body) == "string") {
        reqData = JSON.parse(req.body);
    }
    const resetPasswordCode = getRandomInt(1000, 9999);
    const email = reqData['email'];
    const sql = `UPDATE [user] SET reset_password_code = ${resetPasswordCode} WHERE email = '${email}'`;
    await databaseQuery(databaseRequest, sql);

    const resetPasswordUrl = process.env.SITE_URL + `/reset-password?email=${email}&reset-code=${resetPasswordCode}`;
    const emailSubject = 'Reset your password';
    const emailContent = `<p>Please click to this link to reset your password: <a href='${resetPasswordUrl}'>Click here to reset</a></p>`;
    await sendMail(email, emailSubject, emailContent);
    res.send("Password reset email sent");
});

app.patch('/confirm-reset-password', async function (req, res, next) {
    let reqData = req.body;

    if (typeof(req.body) == "string") {
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
        res.status(200).json({"messages" : "Change password successfully"})
    }
    else {
        res.status(200).json({"messages" : "Fail to change password"});
    }
});

app.get('/', async function(req, res, next) {
    res.send("Server is running...");
});

export default app;