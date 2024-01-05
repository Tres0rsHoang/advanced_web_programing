import express from "express";
import { v4 as uuidv4 } from "uuid";
import authenToken from "../helper/authenticate_token.js";
import databaseConnection from '../helper/database_connection.js';
import databaseQuery from '../helper/database_query.js';
import { makeClassCode } from "../ultis/string_utils.js";
import { isTeacher } from "../ultis/teacher_utils.js";
import { getCurrentUserId } from "../ultis/user_utils.js";


const classroomRouter = express.Router();
const databaseRequest = await databaseConnection();

classroomRouter.post('/create', authenToken, async function(req, res, next) {
    let reqData = req.body;

    if (typeof(req.body) == "string") {
        reqData = JSON.parse(req.body);
    }

    const userId = await getCurrentUserId(req, res);
    
    const id = uuidv4();
    const classCode = makeClassCode(7);
    const name = reqData['name'];
    const section = reqData['section'];
    const subject = reqData['subject'];
    const room = reqData['room'];

    var sql = `INSERT INTO classroom VALUES ('${id}', '${name}', '${section}', '${classCode}', '${subject}', '${room}')`;
    await databaseQuery(databaseRequest, sql);

    sql = `INSERT INTO classroom_teacher VALUES ('${userId}', '${id}', 0)`;
    await databaseQuery(databaseRequest, sql);
    res.status(200).json({"messages": "Create classroom successfully"});
});

classroomRouter.get('/join', authenToken, async function(req, res, next) {
    try {
        const classCode = req.query.classCode;
        const type = req.query.type;
        const currentUser = await getCurrentUserId(req, res);

        var sql = `SELECT classroom.id
        FROM classroom
        WHERE class_code = '${classCode}'`;
        var result = await databaseQuery(databaseRequest, sql);

        if (result.length == 0) {
            res.status(200).json({"messages": "ERROR: Invalid class code"});
            return;
        }
        const classId = result[0]['id'];

        var sql = `SELECT classroom_student.student_id
        FROM classroom_student
        WHERE classroom_student.is_removed = 0
        AND classroom_student.student_id = '${currentUser}'
        UNION
        SELECT classroom_teacher.teacher_id
        FROM classroom_teacher
        WHERE classroom_teacher.is_deleted = 0
        AND classroom_teacher.teacher_id = '${currentUser}'`;

        result = await databaseQuery(databaseRequest, sql);

        if (result.length != 0) {
            res.status(200).json({'messages': "You already in this class"});
            return;
        }

        if (type == "student") {
            sql = `UPDATE classroom_student
            SET is_removed = 0
            WHERE classroom_id = '${classId}'
            AND student_id = '${currentUser}'`;

            var sqlResult = await databaseQuery(databaseRequest, sql);

            if (sqlResult == 0) {
                var inClassId = makeClassCode(4);

                while (true) {
                    inClassId = makeClassCode(4);
                    sql = `SELECT COUNT(1) as number_of_is_class_id
                    FROM classroom_student
                    WHERE classroom_id = '${inClassId}' AND in_class_id = '${inClassId}'`;
                    var sqlResult = await databaseQuery(databaseRequest, sql);
                    if (sqlResult[0]['number_of_is_class_id'] == 0) break;
                }
                sql = `INSERT INTO classroom_student VALUES ('${currentUser}', '${classId}', 0, '${inClassId}')`;
                await databaseQuery(databaseRequest, sql);
            }

            res.status(200).json({
                "messages": "Join class successfully"
            });
        }
        else if (type == "teacher") {
            sql = `UPDATE classroom_teacher
            SET is_deleted = 0
            WHERE classroom_id = '${classId}'
            AND teacher_id = '${currentUser}'`;

            var sqlResult = await databaseQuery(databaseRequest, sql);

            if (sqlResult == 0) {
                sql = `INSERT INTO classroom_teacher VALUES ('${currentUser}', '${classId}', 0)`;
                await databaseQuery(databaseRequest, sql);
            }
            res.status(200).json({
                "messages": "Join class successfully"
            });
        }
    }
    catch (err) {
        res.status(200).json({"Error" : err});
    }
});

classroomRouter.post('/sendInviteMail', authenToken, async function(req, res, next) {
    let reqData = req.body;

    if (typeof(req.body) == "string") {
        reqData = JSON.parse(req.body);
    }

    const invitationType = reqData['invitation_type'];
    const classCode = reqData['class_code'];
    const email = reqData['student_email'];

    const currentUserId = await getCurrentUserId(req, res);

    var sql = `SELECT 1
    FROM classroom_teacher 
    JOIN classroom on classroom_teacher.classroom_id = classroom.id
    WHERE teacher_id = '${currentUserId}' AND is_deleted = 0
    AND classroom.class_code = '${classCode}'`;

    var sqlResult = await databaseQuery(databaseRequest, sql);

    if (sqlResult.length == 0) {
        res.status(200).json({'messages': "You are not teacher of this class"});
        return;
    }

    sql = `SELECT [user].id 
    FROM [user]
    JOIN classroom_student ON [user].id = classroom_student.student_id
    WHERE email = '${email}' AND classroom_student.is_removed = 0
    UNION
    SELECT [user].id
    FROM [user]
    JOIN classroom_teacher ON [user].id = classroom_teacher.teacher_id
    WHERE email = '${email}' AND classroom_teacher.is_deleted = 0
    ORDER BY [user].id`;

    sqlResult = await databaseQuery(databaseRequest, sql);

    if (sqlResult.length != 0) {
        res.status(200).json({'messages': "This email already in this class"});
        return;
    }

    const verifyUrl = process.env.SITE_URL + '/classroom/join?classCode=' + classCode + '&type=' + invitationType; 
    const emailSubject = 'New class invitation';
    const emailContent = `<p>Please click to this link to join new class: <a href='${verifyUrl}'>Click here to verify</a></p>`;

    await sendMail(email, emailSubject, emailContent);

    res.status(200).json({'messages': "Send email successfully"});
});

classroomRouter.get('/detail', authenToken, async function(req,res,next) {
    const classId = req.query.classId;
    var sql = `SELECT *
    FROM classroom
    WHERE classroom.id = '${classId}'`;
    var sqlResult = await databaseQuery(databaseRequest, sql);
    if (sqlResult.length == 0) {
        res.status(200).json({"messages": "Invalid class id"});
        return;
    }
    var result = sqlResult[0];

    sql = `SELECT [user].id, CONCAT([user].first_name,' ', [user].last_name) as full_name, [user].image_url
    FROM classroom_student
    JOIN [user] ON [user].id = classroom_student.student_id
    WHERE classroom_student.classroom_id = '${classId}'
    AND classroom_student.is_removed = 0`;

    sqlResult = await databaseQuery(databaseRequest, sql);

    result["student_list"] = sqlResult;

    sql = `SELECT [user].id, CONCAT([user].first_name,' ', [user].last_name) as full_name, [user].image_url
    FROM classroom_teacher
    JOIN [user] ON [user].id = classroom_teacher.teacher_id
    WHERE classroom_teacher.classroom_id = '${classId}'
    AND classroom_teacher.is_deleted = 0`;

    sqlResult = await databaseQuery(databaseRequest, sql);
    
    result["teacher_list"] = sqlResult;

    res.status(200).json(result);

});

classroomRouter.post('/updateFile', authenToken, isTeacher, async function(req, res, next) {
    console.log(req.body);
    res.send("OK");
});

export default classroomRouter;