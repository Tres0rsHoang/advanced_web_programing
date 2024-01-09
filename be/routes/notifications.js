import express from "express";
import { v4 as uuidv4 } from "uuid";
import authenToken from "../helper/authenticate_token.js";
import databaseConnection from '../helper/database_connection.js';
import databaseQuery from '../helper/database_query.js';
import { getCurrentUserId, isClassActive, isMemberInClass } from "../ultis/user_utils.js";

const notificationRouter = express.Router();
const databaseRequest = await databaseConnection();

notificationRouter.get('/classroom', authenToken, isClassActive, async function (req, res) {
    try {
        let reqData = req.body;

        if (typeof (req.body) == "string") {
            reqData = JSON.parse(req.body);
        }

        const classId = reqData['class_id'];
        const currentUserId = await getCurrentUserId(req, res);

        var isMember = isMemberInClass(classId, currentUserId);

        if (!isMember) {
            res.status(202).send({ messages: "You are not member in this class" });
            return;
        }

        var sql = `SELECT id FROM notification n WHERE classroom_id = '${classId}' GROUP BY id`;
        var notiIdList = await databaseQuery(databaseRequest, sql);

        var result = [];

        for (const element of notiIdList) {
            var sql = `SELECT content, create_time FROM notification WHERE id = '${element['id']}'`;
            var notiInfo = await databaseQuery(databaseRequest, sql);

            result.push(notiInfo[0]);
        }

        res.send(result);
    }
    catch (err) {
        console.log("ERROR[/notification/classroom]:", err);
    }
});

notificationRouter.get('/', authenToken, async function (req, res) {
    try {
        const userId = await getCurrentUserId(req, res);

        var sql = `SELECT n.content, n.create_time
    FROM notification n 
    JOIN [user] u ON u.id = n.user_id
    WHERE u.id = '${userId}' ORDER BY create_time DESC`;

        const notiList = await databaseQuery(databaseRequest, sql);

        res.send(notiList);
    }
    catch (err) {
        console.log("ERROR[/notification]:", err);
    }
});

export async function sendNotification(notiId, classId, userId, content) {
    var sql = `INSERT INTO notification VALUES ('${userId}', '${content}', SYSDATETIME(), '${classId}', '${notiId}')`;
    const result = await databaseQuery(databaseRequest, sql);

    if (result != 0) return true;

    return false;
}

export async function sendToAllMemberInClass(classId, userId, content) {
    var isMember = await isMemberInClass(classId, userId);
    if (!isMember) return "You are not member in this class";

    const id = uuidv4();
    var sql = `SELECT student_id FROM classroom_student WHERE classroom_id = '${classId}' AND is_removed = 0`;
    var studentList = await databaseQuery(databaseRequest, sql);

    for (const element of studentList) {
        const student_id = element['student_id'];
        sendNotification(id, classId, student_id, content);
    }

    return "Send notification success";
}

export default notificationRouter;