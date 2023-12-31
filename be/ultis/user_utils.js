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

export async function isClassActive(req, res, next) {
    let reqData = req.body;

    if (typeof(req.body) == "string") {
        reqData = JSON.parse(req.body);
    }

    const classId = reqData['class_id'];
   
    var sql = `SELECT is_active FROM classroom WHERE id = '${classId}'`;
    var isActive = await databaseQuery(databaseRequest, sql);
    if (isActive.length == 0) {
        res.send({messages: "ERROR: invalid class_id"});
        return;
    }
    isActive = isActive[0]['is_active'];

    if (isActive) {
        next();
        return;
    }
    res.send({messages: "ERROR: This class is no longger active"});
}