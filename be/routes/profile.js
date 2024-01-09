import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from "uuid";
import authenToken from "../helper/authenticate_token.js";
import databaseConnection from '../helper/database_connection.js';
import databaseQuery from '../helper/database_query.js';
import { getStudentScore, isStudent } from '../ultis/student_utils.js';
import { mapStudentByInClassId, unMapStudent } from '../ultis/teacher_utils.js';
import { getCurrentUserId, isClassActive, isMemberInClass } from '../ultis/user_utils.js';
import { sendNotification, sendToAllMemberInClass } from './notifications.js';

const profileRouter = express.Router();
const databaseRequest = await databaseConnection();

profileRouter.get('/', authenToken, async function (req, res, next) {
    try {
        const userId = await getCurrentUserId(req, res);

        var sql = `SELECT email, phone_number, first_name, last_name, is_admin
    FROM [user] WHERE id = '${userId}'`;
        var result = {};
        var information = await databaseQuery(databaseRequest, sql);
        result['information'] = information[0];

        var sql = `SELECT classroom_id, name, subject 
    FROM classroom_teacher t JOIN classroom c ON t.classroom_id = c.id
    WHERE t.teacher_id = '${userId}' AND c.is_active = 1`;

        var isTeacherClasses = await databaseQuery(databaseRequest, sql);
        result['is_teacher_classes'] = isTeacherClasses;

        var sql = `SELECT classroom_id, name, subject
    FROM classroom_student s JOIN classroom c ON s.classroom_id = c.id
    WHERE student_id = '${userId}' AND c.is_active = 1`;

        var isStudentClasses = await databaseQuery(databaseRequest, sql);

        for (const element of isStudentClasses) {
            var classId = element['classroom_id'];

            var sql = `SELECT CONCAT(u.first_name,' ', u.last_name) as full_name
            FROM classroom_teacher ct
            JOIN [user] u ON u.id = ct.teacher_id
            WHERE ct.classroom_id = '${classId}'`;

            var sqlResult = await databaseQuery(databaseRequest, sql);

            element['teacher_name'] = sqlResult[0]['full_name'];
        }

        result['is_student_classes'] = isStudentClasses;

        var sql = `SELECT n.content, n.create_time
    FROM notification n 
    JOIN [user] u ON u.id = n.user_id
    WHERE u.id = '${userId}' ORDER BY create_time DESC`;

        var notificationList = await databaseQuery(databaseRequest, sql);

        result['notification_list'] = notificationList;

        res.send(result);
    }
    catch (err) {
        console.log("ERROR[/profile]:", err);
    }
});

profileRouter.patch('/', authenToken, async function (req, res, next) {
    try {
        let reqData = req.body;

        if (typeof (req.body) == "string") {
            reqData = JSON.parse(req.body);
        }

        const authorizationHeader = req.headers['authorization'];
        const accessToken = authorizationHeader.split(' ')[1];

        const refreshTokenId = jwt.decode(accessToken)['refresh_token_id'];
        const userIdSql = `SELECT user_id FROM [refresh_authen] WHERE id = '${refreshTokenId}'`;

        const userIdQueryResult = await databaseQuery(databaseRequest, userIdSql);

        const userId = userIdQueryResult[0]['user_id'];

        if (reqData['password']) {
            const hashPassword = await bcrypt.hash(reqData['password'], parseInt(process.env.SALT_ROUNDS)).catch(err => console.error(err.message));
            reqData['password'] = hashPassword;
        }

        const sql = "UPDATE [user]"

        let setSql = "SET";

        const whereSql = `WHERE id = '${userId}'`;

        const params = [userId];

        Object.keys(reqData).forEach(function (key) {
            setSql += ` ${key} = '${reqData[key]}',`;
        });

        setSql = setSql.slice(0, -1);

        const result = await databaseQuery(databaseRequest, `${sql} ${setSql} ${whereSql}`).catch(err => {
            res.status(202).json({ "messages": "Update user profile fail (error query)" });
        });

        res.status(200).json({ "messages": "Update user profile successfully" });
    }
    catch (err) {
        console.log("ERROR[/profile]:", err);
    }
});

profileRouter.patch('/map-student', authenToken, isClassActive, isStudent, async function (req, res) {
    try {
        let reqData = req.body;

        if (typeof (req.body) == "string") {
            reqData = JSON.parse(req.body);
        }

        const classId = reqData['class_id'];
        const inClassId = reqData['in_class_id'];
        const currentUserId = await getCurrentUserId(req, res);

        const messages = await mapStudentByInClassId(classId, currentUserId, inClassId);

        var statusCode = 200;
        if (messages.includes("ERROR")) statusCode = 202;

        res.status(statusCode).send({ messages: messages });
    }
    catch (err) {
        console.log("ERROR[/profile/map-student]:", err);
    }
});

profileRouter.get('/get-grade', authenToken, isClassActive, isStudent, async function (req, res) {
    try {
        let reqData = req.body;

        if (typeof (req.body) == "string") {
            reqData = JSON.parse(req.body);
        }

        const classId = reqData['class_id'];
        const currentUserId = await getCurrentUserId(req, res);
        const studentScore = await getStudentScore(classId, currentUserId);

        const result = studentScore.filter((element) => {
            return element['is_finalized'] != false;
        });

        res.send(result);
    }
    catch (err) {
        console.log("ERROR[/profile/get-grade]:", err);
    }
});

profileRouter.post('/comment', authenToken, async function (req, res) {
    try {
        let reqData = req.body;

        if (typeof (req.body) == "string") {
            reqData = JSON.parse(req.body);
        }
        const id = uuidv4();

        const gradeId = reqData['grade_id'];
        const content = reqData['content'];
        const userId = await getCurrentUserId(req, res);

        var sql = `SELECT g.classroom_id, c.name
    FROM classroom_grade g
    JOIN classroom c ON c.id = g.classroom_id
    WHERE g.id = '${gradeId}'`;

        var classId = await databaseQuery(databaseRequest, sql);
        if (classId.length == 0) {
            res.status(202).send({ messages: "ERROR: invalid grade_id" });
            return;
        }
        const className = classId[0]['name']
        classId = classId[0]['classroom_id'];

        var sql = `SELECT is_active FROM classroom WHERE id = '${classId}'`;
        var isActive = await databaseQuery(databaseRequest, sql);
        if (isActive[0]['is_active'] == false) {
            res.status(202).send({ messages: "ERROR: This class is no longger active" });
            return;
        }

        var isMember = await isMemberInClass(classId, userId);

        if (!isMember) {
            res.status(202).send({ messages: "ERROR: You are not member in this class" });
            return
        }

        var sql = `INSERT INTO comment VALUES ('${id}', '${content}', '${gradeId}', '${userId}', SYSDATETIME())`;
        await databaseQuery(databaseRequest, sql);

        if (isMember['type'] == 'teacher') {
            sendToAllMemberInClass(classId, userId, `${isMember['name']} in class ${className} have been comment on grade review`);
        }
        else if (isMember['type'] == 'student') {
            var notiId = uuidv4();

            var sql = `SELECT teacher_id 
        FROM classroom_teacher 
        WHERE classroom_id = '${classId}'`;

            const teacherList = await databaseQuery(databaseRequest, sql);

            var sql = `SELECT CONCAT(u.first_name,' ', u.last_name) as full_name
        FROM [user] u
        WHERE id = '${userId}'`;

            var studentName = await databaseQuery(databaseRequest, sql);
            studentName = studentName[0]['full_name'];

            for (const element of teacherList) {
                sendNotification(notiId, classId, element['teacher_id'], `${studentName} have been comment on grade review`);
            }
        }

        res.send({ messages: "Add new comment successffuly" });
    }
    catch (err) {
        console.log("ERROR[/profile/comment]:", err);
    }
});

profileRouter.patch('/un-mapping', authenToken, isClassActive, isStudent, async function (req, res) {
    try {
        let reqData = req.body;

        if (typeof (req.body) == "string") {
            reqData = JSON.parse(req.body);
        }

        const classId = reqData['class_id'];
        const userId = await getCurrentUserId(req, res);

        const messages = await unMapStudent(classId, userId);

        if (messages.includes("ERROR")) res.status(202).send({messages: messages});

        res.status(200).send({messages: messages});
    }
    catch (err) {
        console.log("ERROR[/profile/un-mapping]:", err);
    }
});

export default profileRouter;