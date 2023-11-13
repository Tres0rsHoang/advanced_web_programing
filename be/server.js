import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import express from 'express';
import { v4 as uuidv4 } from "uuid";
import authenToken from "./helper/authenticate_token.js";
import databaseConnection from './helper/database_connection.js';
import databaseQuery from './helper/database_query.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());

const dbConnection = await databaseConnection("AuthenServer", {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME
}).catch(err => { console.log(err) });

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

app.listen(PORT, () => {
    console.log(`Data server is running at PORT ${PORT}`);
});