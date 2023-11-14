import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from "uuid";
import authenToken from "./helper/authenticate_token.js";
import databaseConnection from './helper/database_connection.js';
import databaseQuery from './helper/database_query.js';

dotenv.config();
const app = express();

app.use(express.json());

const dbConnection = await databaseConnection("AuthenServer", {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME
}).catch(err => { console.log(err) });

async function authenPassword(email, password) {
    const sql = "SELECT id, `password` FROM `user` WHERE email = ?";
    const params = [email];
    const result = await databaseQuery(dbConnection, sql, params);

    if (result.length > 0) {
        const hash = result[0]['password'];
        const id = result[0]['id'];
        const res = await bcrypt.compare(password, hash).catch(err => console.log(err.message));
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
    const sql = "INSERT INTO refresh_authen (id, user_id, token, is_revoked) VALUES ( ?, ?, ?, ?)";
    const params = [refreshTokenId, userId, refreshToken, false];

    await databaseQuery(dbConnection, sql, params).catch(err => console.err(err));

    return refreshTokenId;
}

app.post('/login', async (req, res) => {
    const reqData = req.body;
    const email = reqData['email'];
    const password = reqData['password'];

    const id = await authenPassword(email, password);
    if (id) {
        const refreshTokenId = await createRefreshToken(id);
        const accessToken = jwt.sign(
            { "refresh_token_id": refreshTokenId },
            process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '5s' }
        );
        res.json({ 'access_token': accessToken });
    }
    else {
        res.status(200).json({ "message": "Password or email is not correct" });
    }
});

app.get('/refreshToken', authenToken, async (req, res) => {
    const authorizationHeader = req.headers['authorization'];
    const accessToken = authorizationHeader.split(' ')[1];
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY, async (err, data) => {
        if (err) {
            res.status(403).json({ "Error": err });
            throw err;
        }
        const refreshTokenId = data['refresh_token_id'];
        const sql = "SELECT * FROM refresh_authen WHERE id = ?";
        const params = [refreshTokenId];
        const result = await databaseQuery(dbConnection, sql, params).catch(err => console.err(err));
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
                        process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '100s' }
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

app.get('/logout', authenToken, async (req, res) => {
    const authorizationHeader = req.headers['authorization'];
    const accessToken = authorizationHeader.split(' ')[1];

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY, async (err, data) => {
        if (err) {
            res.status(403).json({ "Error": err });
            throw err;
        }
        const refreshTokenId = data['refresh_token_id'];
        const sql = "UPDATE refresh_authen SET is_revoked = 1 WHERE id = ?";
        const params = [refreshTokenId];

        await databaseQuery(dbConnection, sql, params).catch(err=> res.status(500).json({"Error": err}));

        res.json({"message" : "Logout successfully"});
    });

});

app.post('/register', async (req, res) => {
    const reqData = req.body;

    const id = uuidv4();
    const email = reqData['email'];
    const firstName = reqData['first_name'];
    const lastName = reqData['last_name'];
    const password = reqData['password'];
    const phoneNumber = reqData['phone_number'];

    const sql = "SELECT * FROM `user` WHERE email = ?";
    const params = [email];

    const results = await databaseQuery(dbConnection, sql, params).catch(err => {
        console.err(err);
        res.status(500).json({ "message": "Server error" });
    });

    if (results.length > 0) {
        res.status(200).json({ "message": "Email already exist" });
    }
    else {
        const hashPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS)).catch(err => console.error(err.message));
        const sql = "INSERT INTO `user`(id, email, `password`, phone_number, first_name, last_name) VALUES ( ?, ?, ?, ?, ?, ?)";
        const params = [id, email, hashPassword, phoneNumber, firstName, lastName];
        databaseQuery(dbConnection, sql, params).catch(err => {
            console.err(err);
            res.status(500).json({ "message": "Create fail" });
        });
        res.status(200).json({ "message": "Create success" });
    }
});

app.get('/profile', authenToken, async (req, res) => {
    const userId = req.body.user_id;
    const sql = "SELECT * FROM `user` WHERE id = ?"
    const params = [userId];
    
    const results = await databaseQuery(dbConnection, sql, params).catch(err => {
        res.status(500).json({"message" : "Server error"});
    });

    if ( results.length <= 0 ) res.status(200).json({"message" : "Invalid user id"});
    else {
        const userInformation = results[0];
        res.status(200).json(userInformation);
    }
});

app.get('/', (req, res) => {
    res.send('Server is running...');
});

export default app;