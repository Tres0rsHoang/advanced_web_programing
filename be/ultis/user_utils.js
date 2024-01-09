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
        res.status(200).json({ "messages": "ERROR: Invalid access token" });
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

export async function isMemberInClass(classId, userId) {
    var sql = `SELECT CONCAT(u.first_name,' ', u.last_name) as full_name
    FROM classroom_student cs
    JOIN [user] u ON u.id = cs.student_id
    WHERE student_id = '${userId}' AND classroom_id = '${classId}' AND is_removed = 0`;

    var sqlResult = await databaseQuery(databaseRequest, sql);
    if (sqlResult.length != 0) {
        return {
            type: "student",
            name: sqlResult[0]['full_name']
        }
    }

    var sql = `SELECT CONCAT(u.first_name,' ', u.last_name) as full_name
    FROM classroom_teacher td
    JOIN [user] u ON u.id = td.teacher_id
    WHERE teacher_id = '${userId}' AND classroom_id = '${classId}' AND is_deleted = 0`;

    var sqlResult = await databaseQuery(databaseRequest, sql);

    if (sqlResult.length != 0) {
        return {
            type: "teacher",
            name: sqlResult[0]['full_name']
        };
    }

    return false;
}