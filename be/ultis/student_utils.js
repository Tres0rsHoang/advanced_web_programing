import databaseConnection from '../helper/database_connection.js';
import databaseQuery from '../helper/database_query.js';
import { getCurrentUserId } from "../ultis/user_utils.js";

const databaseRequest = await databaseConnection();

export async function isStudent(req, res, next) {
    let reqData = req.body;

    if (typeof(req.body) == "string") {
        reqData = JSON.parse(req.body);
    }

    const classId = reqData['class_id'];

    if (!classId) {
        res.status(202).send({"messages": "ERROR: Can't find class id"});
        return;
    }

    const currentUserId = await getCurrentUserId(req, res);
    var sql = `SELECT 1
    FROM classroom_student 
    WHERE student_id = '${currentUserId}' AND classroom_id = '${classId}' AND is_removed = 0`;

    var sqlResult = await databaseQuery(databaseRequest, sql);

    if (sqlResult.length != 0) {
        next();
        return;
    }
    res.status(202).send({"messages": "ERROR: You are not student in this class"});
}

export async function getStudentScore(classId, studentId) {
    var sql = `SELECT c.id, g.grade, c.name , g.is_finalized
    FROM student_grade g
    JOIN classroom_grade c ON g.grade_id = c.id
    WHERE student_id = '${studentId}' 
    AND c.classroom_id = '${classId}'`;
    var sqlResult = await databaseQuery(databaseRequest, sql);

    return sqlResult;
}