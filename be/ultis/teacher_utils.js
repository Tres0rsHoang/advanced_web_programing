import databaseConnection from '../helper/database_connection.js';
import databaseQuery from '../helper/database_query.js';
import { getCurrentUserId } from "../ultis/user_utils.js";

const databaseRequest = await databaseConnection();

export async function isTeacher(req, res, next) {
    let reqData = req.body;

    if (typeof(req.body) == "string") {
        reqData = JSON.parse(req.body);
    }

    const classId = reqData['class_id'];

    if (!classId) {
        res.send({"messages": "ERROR: Can't find class id"});
        return;
    }

    const currentUserId = await getCurrentUserId(req, res);
    var sql = `SELECT 1
    FROM classroom_teacher 
    WHERE teacher_id = '${currentUserId}' AND classroom_id = '${classId}'`;
    
    var sqlResult = await databaseQuery(databaseRequest, sql);

    if (sqlResult.length != 0) {
        next();
        return;
    }
    res.send({"messages": "ERROR: You are not teacher in this class"});
}