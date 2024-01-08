import express from "express";
import authenToken from "../helper/authenticate_token.js";
import databaseConnection from '../helper/database_connection.js';
import databaseQuery from '../helper/database_query.js';
import { isAdmin } from "../ultis/authen_utils.js";
import { mapStudentByInClassId } from "../ultis/teacher_utils.js";
import { getCurrentUserId } from "../ultis/user_utils.js";

const adminRouter = express.Router();
const databaseRequest = await databaseConnection();

adminRouter.patch('/toggle-admin', authenToken, isAdmin, async function(req, res) {
    let reqData = req.body;

    if (typeof(req.body) == "string") {
        reqData = JSON.parse(req.body);
    }
    
    const userId = reqData['user_id'];

    const currentUserId = await getCurrentUserId(req, res);

    if (userId == currentUserId) {
        res.send({messages: "You can't toggle yourself"});
        return;
    }

    var sql = `SELECT is_admin FROM [user] WHERE id = '${userId}'`;

    var isAdmin = 0;

    try {
        isAdmin = await databaseQuery(databaseRequest, sql);
        isAdmin = isAdmin[0]['is_admin'];
    }
    catch (err) {
        res.send({messages: "Invalid user_id"});
        return;
    }

    var set = "is_admin = 1";

    if (isAdmin == 1) set = "is_admin = 0";
    

    var sql = `UPDATE [user] SET ${set} WHERE id = '${userId}'`;
    var sqlResult = await databaseQuery(databaseRequest, sql);


    if (sqlResult != 0) {
        if (isAdmin != 0) {
            res.send({messages: `${userId} is no longer admin`});
            return;
        }
        res.send({messages: `${userId} is admin now`});
        return;
    }

    res.send({messages: "ERROR: nothing to change"});
});

adminRouter.get('/user-list', authenToken, isAdmin, async function (req, res) {
    var sql = `SELECT id, first_name, last_name, email, phone_number, is_verify, is_locked FROM [user] WHERE email IS NOT NULL`;

    var sqlResult = await databaseQuery(databaseRequest, sql);

    res.send(sqlResult);
});

adminRouter.patch('/toggle-lock-account', authenToken, isAdmin, async function (req, res) {
    let reqData = req.body;

    if (typeof(req.body) == "string") {
        reqData = JSON.parse(req.body);
    }
    
    const userId = reqData['user_id'];

    const currentUserId = await getCurrentUserId(req, res);

    if (userId == currentUserId) {
        res.send({messages: "You can't toggle yourself"});
        return;
    }

    var sql = `SELECT is_locked FROM [user] WHERE id = '${userId}'`;

    var isLocked = 0;

    try {
        isLocked = await databaseQuery(databaseRequest, sql);
        isLocked = isLocked[0]['is_locked'];
    }
    catch (err) {
        res.send({messages: "Invalid user_id"});
        return;
    }

    var set = "is_locked = 1";

    if (isLocked == 1) set = "is_locked = 0";
    
    var sql = `UPDATE [user] SET ${set} WHERE id = '${userId}'`;
    var sqlResult = await databaseQuery(databaseRequest, sql);

    if (sqlResult != 0) {
        if (isLocked != 0) {
            res.send({messages: `${userId} is unlocked`});
            return;
        }
        res.send({messages: `${userId} is locked`});
        return;
    }

    res.send({messages: "ERROR: nothing to change"});
});

adminRouter.patch('/map-student', authenToken, isAdmin, async function (req, res) {
    let reqData = req.body;

    if (typeof(req.body) == "string") {
        reqData = JSON.parse(req.body);
    }
    
    const studentId = reqData['student_id'];
    const classId = reqData['class_id'];
    const inClassId = reqData['in_class_id'];

    const messages = await mapStudentByInClassId(classId, studentId, inClassId);

    res.send({messages: messages});
});

export default adminRouter;