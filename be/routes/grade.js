import express from "express";
import { v4 as uuidv4 } from "uuid";
import authenToken from "../helper/authenticate_token.js";
import databaseConnection from '../helper/database_connection.js';
import databaseQuery from '../helper/database_query.js';
import getCurrentUserId from "../helper/get_current_user.js";

const gradeRouter = express.Router();
const databaseRequest = await databaseConnection();

async function isTeacher(req, res, next) {
    let reqData = req.body;

    if (typeof(req.body) == "string") {
        reqData = JSON.parse(req.body);
    }

    const classId = reqData['class_id'];
    if (!classId) {
        res.status(200).json({"messages": "ERROR: Can't find class id"});
        return;
    }

    const currentUserId = await getCurrentUserId(req, res);
    var sql = `SELECT 1
    FROM classroom_teacher 
    WHERE teacher_id = '${currentUserId}' AND is_deleted = 0
    AND classroom_id = '${classId}'`;
    
    var sqlResult = await databaseQuery(databaseRequest, sql);

    if (sqlResult.length != 0) {
        next();
        return;
    }
    res.status(200).json({"messages": "ERROR: You are not teacher in this class"});
}

gradeRouter.post('/create', authenToken, isTeacher, async function(req, res, next) {
    let reqData = req.body;

    if (typeof(req.body) == "string") {
        reqData = JSON.parse(req.body);
    }

    const classId = reqData['class_id'];
    const gradeScale = reqData['grade_scale'];
    const name = reqData['name'];
    const id = uuidv4();

    var sql = `INSERT INTO classroom_grade VALUES ('${id}', ${gradeScale}, '${name}', '${classId}', 0)`;
    await databaseQuery(databaseRequest, sql);

    res.status(200).json({"messages": "Insert new grade successfully"});
});

gradeRouter.post('/struture', authenToken, isTeacher, async function(req, res, next) {
    let reqData = req.body;

    if (typeof(req.body) == "string") {
        reqData = JSON.parse(req.body);
    }

    const classId = reqData['class_id'];

    var sql = `SELECT id, grade_scale, name
    FROM classroom_grade
    WHERE classroom_id = '${classId}'
    AND is_delete = 0`;

    var sqlResult = await databaseQuery(databaseRequest, sql);
    
    res.status(200).json({"messages" : "Success", "data" : sqlResult});
});

export default gradeRouter;