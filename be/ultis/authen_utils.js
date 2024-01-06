import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from "uuid";
import databaseConnection from '../helper/database_connection.js';
import databaseQuery from '../helper/database_query.js';

const databaseRequest = await databaseConnection();

export async function authenPassword(email, password) {
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

export async function createRefreshToken(userId) {
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
