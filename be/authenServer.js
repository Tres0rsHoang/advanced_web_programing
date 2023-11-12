import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from "uuid";
import authenToken from "./helper/authenticate_token.js";
import databaseConnection from './helper/database_connection.js';
import databaseQuery from './helper/database_query.js';

dotenv.config();
const app = express();
const PORT = 9500;

app.use(express.json());

const dbConnection = await databaseConnection("AuthenServer",{
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME
}).catch(err => { console.err(err) });

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
        {"id": refreshTokenId},
        process.env.REFRESH_TOKEN_SECRET_KEY, 
        { expiresIn: "7d"}
    )
    const sql = "INSERT INTO refresh_authen (id, user_id, token, is_revoked) VALUES ( ?, ?, ?, ?)";
    const params = [refreshTokenId, userId, refreshToken, true];
    
    await databaseQuery(dbConnection, sql, params).catch(err => console.err(err));
}

app.post('/login', async (req, res) => {
    const reqData = req.body;
    const email = reqData['email'];
    const password = reqData['password'];

    const id = await authenPassword(email, password);
    if (id) {
        const accessToken = jwt.sign(
            { "id": id },
            process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '100s' }
        );
        createRefreshToken(id);
        res.json({ 'access_token': accessToken });
    }
    else {
        res.status(200).json({ "message": "Password or email is not correct" });
    }
});

app.get('/refreshToken', authenToken, async (req, res) => {
    const authorizationHeader = req.headers['authorization'];
    const accessToken = authorizationHeader.split(' ')[1];    
    const token = jwt.decode(
        accessToken
    );

   res.json({token});
});

app.listen(PORT, () => {
    console.log(`Authen Server is running at PORT ${PORT}`);
});