import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
import authenToken from "../helper/authenticate_token.js";
import databaseConnection from '../helper/database_connection.js';
import databaseQuery from '../helper/database_query.js';
import { getStudentScore, isStudent } from '../ultis/student_utils.js';
import { mapStudentByInClassId } from '../ultis/teacher_utils.js';
import { getCurrentUserId, isClassActive } from '../ultis/user_utils.js';

const profileRouter = express.Router();
const databaseRequest = await databaseConnection();

profileRouter.get('/', authenToken, async function(req, res, next){
    const userId = await getCurrentUserId(req, res);
    
    var sql = `SELECT email, phone_number, first_name, last_name
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
    result['is_student_classes'] = isStudentClasses;

    res.send(result);
});

profileRouter.patch('/', authenToken, async function(req, res, next) {
    let reqData = req.body;

    if (typeof(req.body) == "string") {
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

    Object.keys(reqData).forEach(function(key){
        setSql += ` ${key} = '${reqData[key]}',`;
    });

    setSql = setSql.slice(0, -1); 

    const result = await databaseQuery(databaseRequest, `${sql} ${setSql} ${whereSql}`).catch(err => {
        res.status(200).json({"messages" : "Update user profile fail (error query)"});
    });

    res.status(200).json({"messages" : "Update user profile successfully"});
});

profileRouter.patch('/map-student', authenToken, isClassActive, isStudent, async function(req, res) {
    let reqData = req.body;

    if (typeof(req.body) == "string") {
        reqData = JSON.parse(req.body);
    }

    const classId = reqData['class_id'];
    const inClassId = reqData['in_class_id'];
    const currentUserId = await getCurrentUserId(req, res);

    const messages = await mapStudentByInClassId(classId, currentUserId, inClassId);

    res.send({messages: messages});
});

profileRouter.get('/get-grade', authenToken, isClassActive, isStudent, async function(req, res) {
    let reqData = req.body;

    if (typeof(req.body) == "string") {
        reqData = JSON.parse(req.body);
    }

    const classId = reqData['class_id'];
    const currentUserId = await getCurrentUserId(req, res);
    const studentScore = await getStudentScore(classId, currentUserId);

    const result = studentScore.filter((element) => {
        return element['is_finalized'] != false;
    });

    res.send(result);
});

export default profileRouter;