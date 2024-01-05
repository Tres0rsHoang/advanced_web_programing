import jwt from 'jsonwebtoken';
import databaseConnection from '../helper/database_connection.js';
import databaseQuery from '../helper/database_query.js';

const databaseRequest = await databaseConnection();

export async function getCurrentUserId(req, res) {
    const authorizationHeader = req.headers['authorization'];
    const accessToken = authorizationHeader.split(' ')[1];
    const refreshTokenId = jwt.decode(accessToken)['refresh_token_id'];
    const userIdSql = `SELECT user_id FROM [refresh_authen] WHERE id = '${refreshTokenId}'`;
    const userId = await databaseQuery(databaseRequest, userIdSql);
    
    if (userId.length > 0) {
        return userId[0]["user_id"];
    }
    else {
        res.status(200).json({ "message": "ERROR: Invalid access token" });
    }
}