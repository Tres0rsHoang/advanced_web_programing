import Excel from "exceljs";
import express from "express";
import fileUpload from "express-fileupload";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import authenToken from "../helper/authenticate_token.js";
import databaseConnection from '../helper/database_connection.js';
import databaseQuery from '../helper/database_query.js';
import sendMail from "../helper/send_email.js";
import UploadFile from "../helper/upload_file.js";
import { makeClassCode } from "../ultis/string_utils.js";
import { getStudentScore } from "../ultis/student_utils.js";
import { isTeacher, mapStudentByInClassId, updateStudent } from "../ultis/teacher_utils.js";
import { getCurrentUserId, isClassActive, isMemberInClass } from "../ultis/user_utils.js";
import { sendToAllMemberInClass } from "./notifications.js";

const classroomRouter = express.Router();
const databaseRequest = await databaseConnection();
const __dirname = path.resolve(path.dirname(''));

classroomRouter.post('/create', authenToken, async function (req, res, next) {
    try {
        let reqData = req.body;

        if (typeof (req.body) == "string") {
            reqData = JSON.parse(req.body);
        }

        const userId = await getCurrentUserId(req, res);

        const id = uuidv4();
        const classCode = makeClassCode(7);
        const name = reqData['name'];
        const section = reqData['section'];
        const subject = reqData['subject'];
        const room = reqData['room'];

        try {
            var sql = `INSERT INTO classroom VALUES ('${id}', '${name}', '${section}', '${classCode}', '${subject}', '${room}', 1)`;
            await databaseQuery(databaseRequest, sql);

            sql = `INSERT INTO classroom_teacher VALUES ('${userId}', '${id}', 0)`;
            await databaseQuery(databaseRequest, sql);

            res.status(200).json({ "messages": "Create classroom successfully" });
        }
        catch (err) {
            res.status(202).send({ messages: "Create class fail" });
        }
    }
    catch (err) {
        console.log("ERROR[/classroom/create]:", err);
    }
});

classroomRouter.get('/join', authenToken, async function (req, res, next) {
    try {
        const classCode = req.query.classCode;
        const type = req.query.type;
        const currentUser = await getCurrentUserId(req, res);

        var sql = `SELECT classroom.id
        FROM classroom
        WHERE class_code = '${classCode}'`;
        var result = await databaseQuery(databaseRequest, sql);

        if (result.length == 0) {
            res.status(200).json({ "messages": "ERROR: Invalid class code" });
            return;
        }
        const classId = result[0]['id'];

        req.body["class_id"] = classId;
        await isClassActive(req, res, () => { });

        try {
            var isMember = await isMemberInClass(classId, currentUser);

            if (isMember) {
                res.status(202).json({ 'messages': "You already in this class" });
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
                    sql = `INSERT INTO classroom_student VALUES ('${currentUser}', '${classId}', 0, '${inClassId}', NULL)`;
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
            res.status(202).json({ "Error": err });
        }
    }
    catch (err) {
        console.log("ERROR[/classroom/join]:", err);
    }
});

classroomRouter.post('/sendInviteMail', authenToken, async function (req, res, next) {
    try {
        let reqData = req.body;

        if (typeof (req.body) == "string") {
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
            res.status(202).json({ 'messages': "You are not teacher of this class" });
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
            res.status(202).json({ 'messages': "This email already in this class" });
            return;
        }

        var sql = `SELECT 1 FROM [user] u WHERE u.email = '${email}'`;

        sqlResult = await databaseQuery(databaseRequest, sql);

        if (sqlResult.length == 0) {
            res.status(202).json({ 'messages': "This email already in this class" });
            return;
        }

        const verifyUrl = process.env.SITE_URL + '/classroom/join?classCode=' + classCode + '&type=' + invitationType;
        const emailSubject = 'New class invitation';
        const emailContent = `<p>Please click to this link to join new class: <a href='${verifyUrl}'>Click here to verify</a></p>`;

        await sendMail(email, emailSubject, emailContent);

        res.status(200).json({ 'messages': "Send email successfully" });
    }
    catch (err) {
        console.log("ERROR[/classroom/sendInviteMail]:", err);
    }
});

classroomRouter.get('/detail', authenToken, async function (req, res, next) {
    try {
        const classId = req.query.classId;
        req.body["class_id"] = classId;
        await isClassActive(req, res, () => { });
        try {
            var sql = `SELECT *
        FROM classroom
        WHERE classroom.id = '${classId}'`;
            var sqlResult = await databaseQuery(databaseRequest, sql);
            if (sqlResult.length == 0) {
                res.status(202).json({ "messages": "Invalid class id" });
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
        }
        catch (err) {
            res.status(202).json({ messages: err });
        }
    }
    catch (err) {
        console.log("ERROR[/classroom/detail]:", err);
    }
});

classroomRouter.post('/uploadFile', fileUpload({ createParentPath: true }), authenToken, isClassActive, isTeacher, async function (req, res, next) {
    try {
        let reqData = req.body;
        var result = {};

        if (typeof (req.body) == "string") {
            reqData = JSON.parse(req.body);
        }
        const classId = reqData['class_id'];

        const uploadFile = req.files.files
        var fileType = uploadFile.name.split(".")[1];
        if (fileType != "xlsx" && fileType != "csv") {
            res.status(202).send({ "messages": "ERROR: Invalid file type" });
        }

        const filePath = path.join(__dirname, "uploads", uploadFile.name);

        const newFilePath = await UploadFile(filePath, uploadFile);

        const workbook = new Excel.Workbook();
        if (fileType == "xlsx") await workbook.xlsx.readFile(newFilePath);
        else await workbook.csv.readFile(newFilePath);

        const worksheet = workbook.getWorksheet(1);

        var studentIdColumnIndex = -1;
        var firstNameColumnIndex = -1;
        var lastNameColumnIndex = -1;

        var sql = `SELECT name, id
    FROM classroom_grade
    WHERE classroom_id = '${classId}'`;

        const gradeList = await databaseQuery(databaseRequest, sql);
        var formattedGradeList = {};

        gradeList.forEach((element) => {
            element["position"] = -1;
            formattedGradeList[element["name"].toUpperCase().replace(/\s/g, '')] = element;
        });

        var unmappingColumn = [];

        worksheet.getRow(1).values.forEach((columnName, index) => {
            const formattedNameInFile = columnName.toUpperCase().replace(/\s/g, '');
            switch (formattedNameInFile) {
                case "STUDENTID": {
                    studentIdColumnIndex = index;
                    break;
                }
                case "FIRSTNAME": {
                    firstNameColumnIndex = index;
                    break;
                }
                case "LASTNAME": {
                    lastNameColumnIndex = index;
                    break;
                }
                default: {
                    if (formattedGradeList[formattedNameInFile] != undefined && formattedGradeList[formattedNameInFile]['position'] == -1) {
                        formattedGradeList[formattedNameInFile]['position'] = index;
                    }
                    else {
                        unmappingColumn.push(`${columnName}`);
                    }
                    break;
                }
            }
        });
        result["unmapping_columns"] = unmappingColumn;

        var missingValues = [];

        Object.entries(formattedGradeList).forEach(entry => {
            const [key, value] = entry;
            if (value['position'] == -1) {
                missingValues.push(value['name']);
            }
        });

        if (studentIdColumnIndex == -1 || firstNameColumnIndex == -1 || lastNameColumnIndex == -1 || missingValues.length != 0) {
            result["messages"] = "ERROR: Missing mapping value";

            if (studentIdColumnIndex == -1) {
                missingValues.push("Student Id");
            }

            if (firstNameColumnIndex == -1) {
                missingValues.push("First Name");
            }

            if (lastNameColumnIndex == -1) {
                missingValues.push("Last Name");
            }

            result["missing_values"] = missingValues;
            res.status(202).send(result);
            return;
        }

        worksheet.eachRow(function (row, rowNumber) {
            if (rowNumber != 1) {
                const rowsValue = row.values;

                var gradeInforList = [];

                Object.entries(formattedGradeList).forEach(entry => {
                    const [key, value] = entry;

                    var grade = rowsValue[value['position']]['result'] || rowsValue[value['position']] || 0;

                    if (parseFloat(grade) > 10) grade = 10;
                    else if (parseFloat(grade < 0)) grade = 0;

                    gradeInforList.push({
                        gradeId: value['id'],
                        grade: grade
                    });
                });

                var userInfor = {
                    inClassId: rowsValue[studentIdColumnIndex],
                    firstName: rowsValue[firstNameColumnIndex],
                    lastName: rowsValue[lastNameColumnIndex]
                }
                updateStudent(classId, userInfor, gradeInforList);
            }
        });

        res.send({ messages: "Update student grade successully" });
    }
    catch (err) {
        console.log("ERROR[/classroom/uploadFile]:", err);
    }
});

classroomRouter.get('/grade-list', authenToken, isClassActive, isTeacher, async function (req, res) {
    try {
        let reqData = req.body;

        if (typeof (req.body) == "string") {
            reqData = JSON.parse(req.body);
        }

        const classId = reqData['class_id'];

        var sql = `SELECT in_class_id, student_id, first_name, u.last_name, u.email
    FROM classroom_student cstudent 
    JOIN [user] u ON cstudent.student_id = u.id
    WHERE classroom_id = '${classId}'`;

        var sqlResult = await databaseQuery(databaseRequest, sql);

        var result = [];

        for (const element of sqlResult) {
            var studentScore = await getStudentScore(classId, element['student_id']);
            if (element['email'] == null) {
                element['is_mapping'] = 0;
            }
            else {
                element['is_mapping'] = 1;
            }
            delete element['email'];
            element['grade_list'] = studentScore;
            result.push(element);
        }

        res.send(result);
    }
    catch (err) {
        console.log("ERROR[/classroom/grade-list]:", err);
    }
});

classroomRouter.patch('/update-grade', authenToken, isClassActive, isTeacher, async function (req, res) {
    try {
        let reqData = req.body;

        if (typeof (req.body) == "string") {
            reqData = JSON.parse(req.body);
        }

        const gradeId = reqData['grade_id'];
        const studentId = reqData['student_id'];
        var grade = reqData['grade'];

        try {
            if (parseFloat(grade) > 10) grade = 10;
            else if (parseFloat(grade) < 0) grade = 0;
        }
        catch (err) {
            res.status(202).send({ "messages": "ERROR: invalid grade" });
            return;
        }

        var sql = `UPDATE student_grade SET grade = ${grade} WHERE student_id = '${studentId}' AND grade_id = '${gradeId}'`;
        var sqlResult = await databaseQuery(databaseRequest, sql);

        if (sqlResult != 0) {
            res.send({ messages: "Update successfully" });
        }
        else {
            res.status(202).send({ messages: "ERROR: Update fail" });
        }
    }
    catch (err) {
        console.log("ERROR[/classroom/update-grade]:", err);
    }
});

classroomRouter.patch('/map-student', authenToken, isClassActive, isTeacher, async function (req, res) {
    try {
        let reqData = req.body;

        if (typeof (req.body) == "string") {
            reqData = JSON.parse(req.body);
        }

        const classId = reqData['class_id'];
        const studentId = reqData['new_student_id'];
        const currentStudentId = reqData['current_student_id'];

        var sql = `SELECT in_class_id 
    FROM classroom_student 
    WHERE student_id = '${currentStudentId}'`;

        var inClassId = databaseQuery(databaseRequest, sql);

        if (inClassId.length == 0) {
            res.status(202).send({ messages: "Invalid current_student_id" });
            return;
        }
        inClassId = inClassId[0]["in_class_id"];

        const messages = await mapStudentByInClassId(classId, studentId, inClassId);
        var statusCode = 200;
        if (messages.includes("ERROR")) var statusCode = 202;
        res.send({ messages: messages });
    }
    catch (err) {
        console.log("ERROR[/classroom/map-student]:", err);
    }
});

classroomRouter.patch('/finalized-grade', authenToken, isClassActive, isTeacher, async function (req, res) {
    try {
        let reqData = req.body;

        if (typeof (req.body) == "string") {
            reqData = JSON.parse(req.body);
        }

        const classId = reqData['class_id'];
        const gradeId = reqData['grade_id'];

        var sql = `SELECT COUNT(1) as exist_grade 
    FROM classroom_grade 
    WHERE classroom_id = '${classId}' AND id = '${gradeId}'`;

        var existGrade = await databaseQuery(databaseRequest, sql);

        if (existGrade[0]['exist_grade'] == 0) {
            res.send({ messages: "ERROR: invalid grade id" });
            return;
        }

        var sql = `UPDATE student_grade
    SET is_finalized = 1
    WHERE grade_id = '${gradeId}'`;

        const success = await databaseQuery(databaseRequest, sql);

        if (success == 0) {
            res.status(202).send({ messages: "ERROR: grade already finalized" });
            return;
        }

        var userId = await getCurrentUserId(req, res);
        var sql = `SELECT name FROM classroom WHERE id = '${classId}' AND is_active = 1`;
        var className = await databaseQuery(databaseRequest, sql);
        var className = className[0]['name'];

        var sql = `SELECT name FROM classroom_grade WHERE classroom_id = '${classId}' AND id = '${gradeId}'`;
        var gradeName = await databaseQuery(databaseRequest, sql);
        var gradeName = gradeName[0]['name'];

        sendToAllMemberInClass(classId, userId, `Your grade ${gradeName} in class ${className} is finalized now.`);

        res.send({ messages: "Update finalized success" });
    }
    catch (err) {
        console.log("ERROR[/classroom/finalized-grade]:", err);
    }
});

classroomRouter.get('/comment-list', authenToken, isClassActive, async function (req, res) {
    try {
        let reqData = req.body;

        if (typeof (req.body) == "string") {
            reqData = JSON.parse(req.body);
        }

        const classId = reqData['class_id'];

        var sql = `SELECT id, name
    FROM classroom_grade 
    WHERE classroom_id = '${classId}'`;

        var gradeIds = await databaseQuery(databaseRequest, sql);

        for (const element of gradeIds) {
            const gradeId = element['id'];

            var sql = `SELECT c.id, content, grade_id, user_id, create_time
        FROM comment c
        JOIN classroom_grade cg ON cg.id = c.grade_id
        WHERE cg.classroom_id = '${classId}' AND cg.id = '${gradeId}'`;

            var commentList = await databaseQuery(databaseRequest, sql);

            for (const comment of commentList) {
                const commentUser = comment['user_id'];

                var sql = `SELECT CONCAT(u.first_name,' ', u.last_name) as full_name 
            FROM [user] u
            WHERE u.id = '${commentUser}'`;

                const commentUserName = await databaseQuery(databaseRequest, sql);

                comment['comment_user'] = {
                    id: commentUser,
                    name: commentUserName[0]['full_name'],
                }

                delete comment['user_id'];

                const gradeId = comment['grade_id'];

                var sql = `SELECT name FROM classroom_grade WHERE id = '${gradeId}'`;
                const gradeName = await databaseQuery(databaseRequest, sql);

                comment['grade'] = {
                    id: gradeId,
                    name: gradeName[0]['name'],
                }

                delete comment['grade_id'];
            }
        }

        res.send(commentList);
    }
    catch (err) {
        console.log("ERROR[/classroom/comment-list]:", err);
    }
});

export default classroomRouter;