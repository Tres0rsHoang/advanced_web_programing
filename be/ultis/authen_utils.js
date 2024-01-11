import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from "uuid";
import databaseConnection from '../helper/database_connection.js';
import databaseQuery from '../helper/database_query.js';
import { getCurrentUserId } from './user_utils.js';

const databaseRequest = await databaseConnection();

export async function authenPassword(email, password) {
    const sql =`SELECT id, password, is_verify, is_locked FROM [user] WHERE email = '${email}'`;

    var result = await databaseQuery(databaseRequest, sql);

    if (result.length > 0) {
        const hash = result[0]['password'];

        const id = result[0]['id'];
        const res = await bcrypt.compare(password, hash).catch(err => console.log(err.message));
        if (result[0]['is_verify'] == 0) return "unverify_email";
        if (result[0]['is_locked'] == 1) return "locked";
        if (res) return id;
    }
    return null;
}

export async function createRefreshToken(userId) {
    const refreshTokenId = uuidv4();

    const refreshToken = jwt.sign(
        { "id": userId },
        process.env.REFRESH_TOKEN_SECRET_KEY,
        { expiresIn: "7d" }
    )
    
    const sql = `INSERT INTO [refresh_authen] (id, user_id, token, is_revoked) VALUES ( '${refreshTokenId}', '${userId}', '${refreshToken}', 0)`;
    await databaseQuery(databaseRequest, sql);

    return refreshToken;
}

export async function isAdmin(req, res, next) {
    const currentUserId = await getCurrentUserId(req, res);

    var sql = `SELECT is_admin FROM [user] WHERE id = '${currentUserId}'`;
    var isAdmin = await databaseQuery(databaseRequest, sql);

    if (isAdmin.length == 0) {
        res.status(202).send({messages: "ERROR: Invalid user id"});
        return;
    }
    if (isAdmin[0]['is_admin'] == true) {
        next();
        return;
    }
    
    res.status(202).send({messages: "ERROR: You are not user admin"});
}
