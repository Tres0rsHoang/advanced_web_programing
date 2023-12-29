import express from "express";
import { v4 as uuidv4 } from "uuid";
import authenToken from "../helper/authenticate_token.js";
import databaseConnection from '../helper/database_connection.js';
import databaseQuery from '../helper/database_query.js';
import getCurrentUserId from "../helper/get_current_user.js";

const gradeRouter = express.Router();
const databaseRequest = await databaseConnection();

function isNumeric(str) {
    if (typeof str != "string") return false 
    return !isNaN(str) && !isNaN(parseFloat(str))
}

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
    WHERE teacher_id = '${currentUserId}' AND classroom_id = '${classId}'`;
    
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

    var sql = `INSERT INTO classroom_grade VALUES ('${id}', ${gradeScale}, '${name}', '${classId}')`;
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
    WHERE classroom_id = '${classId}'`;

    var sqlResult = await databaseQuery(databaseRequest, sql);
    
    res.status(200).json({"messages" : "Success", "data" : sqlResult});
});

gradeRouter.delete('/remove', authenToken, isTeacher, async function(req, res, next) {
    let reqData = req.body;

    if (typeof(req.body) == "string") {
        reqData = JSON.parse(req.body);
    }

    const classId = reqData['class_id'];
    const gradeId = reqData['grade_id'];

    var sql = `SELECT 1
    FROM classroom_grade
    WHERE classroom_id = '${classId}'
    AND classroom_grade.id = '${gradeId}'`;
    var sqlResult = await databaseQuery(databaseRequest, sql);

    if (sqlResult.length == 0) {
        res.status(200).json({"messages": "ERROR: invalid classroom id or grade id"});
        return;
    }

    sql = `DELETE FROM classroom_grade
    WHERE classroom_id = '${classId}'
    AND classroom_grade.id = '${gradeId}'`;
    var sqlResult = await databaseQuery(databaseRequest, sql);

    if (sqlResult.length == 0) {
        res.status(200).json({"messages": "ERROR: can't find this grade id"});
    }

    res.status(200).json({"messages": "Delete grade successfully"});
});

gradeRouter.patch('/update', authenToken, isTeacher, async function(req, res, next) {
    let reqData = req.body;

    if (typeof(req.body) == "string") {
        reqData = JSON.parse(req.body);
    }

    const classId = reqData['class_id'];
    const gradeId = reqData['grade_id'];
    const name = reqData['name'];
    const gradeScale = reqData['grade_scale'];

    if (name || gradeScale) {
        var update = `UPDATE classroom_grade`;
        var set = `SET`;
        if (name) {
            set = `${set} name='${name}', `;
        }

        if (isNumeric(gradeScale.toString())) {
            set = `${set} grade_scale=${gradeScale}, `;
        }

        set = set.slice(0, -2);

        var where = `WHERE classroom_id = '${classId}'
        AND classroom_grade.id = '${gradeId}'`;

    
        var sql = `${update} ${set} ${where}`;
        var sqlResult = await databaseQuery(databaseRequest, sql);
        if (sqlResult == 0) {
            res.status(200).json({"messages": "ERROR: Can't find classroom id or grade id"});
            return;
        }
        res.status(200).json({"messages": "Update grade successfully"});
    }
    else {
        res.status(200).json({"messages": "ERROR: empty grade name and grade scale"});
    }
});

export default gradeRouter;