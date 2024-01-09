import express from "express";
import { v4 as uuidv4 } from "uuid";
import authenToken from "../helper/authenticate_token.js";
import databaseConnection from '../helper/database_connection.js';
import databaseQuery from '../helper/database_query.js';
import { isNumeric } from "../ultis/string_utils.js";
import { isTeacher } from "../ultis/teacher_utils.js";
import { isClassActive } from "../ultis/user_utils.js";

const gradeRouter = express.Router();
const databaseRequest = await databaseConnection();

gradeRouter.post('/create', authenToken, isClassActive, isTeacher, async function (req, res, next) {
    try {
        let reqData = req.body;

        if (typeof (req.body) == "string") {
            reqData = JSON.parse(req.body);
        }

        const classId = reqData['class_id'];
        const gradeScale = reqData['grade_scale'];
        const name = reqData['name'];

        var sql = `SELECT COUNT(1) as exist_grade
    FROM classroom_grade
    WHERE classroom_id = '${classId}' AND name = '${name}'`;

        const existGrade = await databaseQuery(databaseRequest, sql);

        if (existGrade[0]['exist_grade'] != 0) {
            res.status(202).json({ "messages": "ERROR: grade name already exists" });
            return;
        }

        var sql = `SELECT grade_scale
    FROM classroom_grade
    WHERE classroom_id = '${classId}'`;

        const gradeInClass = await databaseQuery(databaseRequest, sql);

        var totalGradeInClass = 0;

        gradeInClass.forEach(element => {
            totalGradeInClass += element['grade_scale'];
        });

        if (gradeScale + totalGradeInClass > 100) {
            res.status(202).json({ "messages": "ERROR: invalid grade scales", "maxium_valid_scale": 100 - totalGradeInClass });
            return;
        }

        const id = uuidv4();

        var sql = `INSERT INTO classroom_grade VALUES ('${id}', ${gradeScale}, '${name}', '${classId}')`;
        await databaseQuery(databaseRequest, sql);

        res.status(200).json({ "messages": "Insert new grade successfully" });
    }
    catch (err) {
        console.log("ERROR[/grade/create]:", err);
    }
});

gradeRouter.post('/struture', authenToken, isClassActive, isTeacher, async function (req, res, next) {
    try {
        let reqData = req.body;

        if (typeof (req.body) == "string") {
            reqData = JSON.parse(req.body);
        }

        const classId = reqData['class_id'];

        var sql = `SELECT id, grade_scale, name
    FROM classroom_grade
    WHERE classroom_id = '${classId}'`;

        if (reqData['order_by'] != '' && reqData['order_by'] != undefined) {
            sql = `${sql} ORDER BY ${reqData['order_by']}`;
        }

        var sqlResult = await databaseQuery(databaseRequest, sql);

        res.status(200).json({ "messages": "Success", "data": sqlResult });
    }
    catch (err) {
        console.log("ERROR[/grade/struture]:", err);
    }
});

gradeRouter.delete('/remove', authenToken, isClassActive, isTeacher, async function (req, res, next) {
    try {
        let reqData = req.body;

        if (typeof (req.body) == "string") {
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
            res.status(202).json({ "messages": "ERROR: invalid classroom id or grade id" });
            return;
        }

        sql = `DELETE FROM classroom_grade
    WHERE classroom_id = '${classId}'
    AND classroom_grade.id = '${gradeId}'`;
        var sqlResult = await databaseQuery(databaseRequest, sql);

        if (sqlResult.length == 0) {
            res.status(202).json({ "messages": "ERROR: can't find this grade id" });
            return;
        }

        res.status(200).json({ "messages": "Delete grade successfully" });
    }
    catch (err) {
        console.log("ERROR[/grade/remove]:", err);
    }
});

gradeRouter.patch('/update', authenToken, isClassActive, isTeacher, async function (req, res, next) {
    try {
        let reqData = req.body;

        if (typeof (req.body) == "string") {
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
                res.status(202).json({ "messages": "ERROR: Can't find classroom id or grade id" });
                return;
            }
            res.status(200).json({ "messages": "Update grade successfully" });
        }
        else {
            res.status(202).json({ "messages": "ERROR: empty grade name and grade scale" });
        }
    }
    catch (err) {
        console.log("ERROR[/grade/update]:", err);
    }
});

export default gradeRouter;