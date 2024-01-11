import Excel from "exceljs";
import express from "express";
import fileUpload from "express-fileupload";
import path from "path";
import authenToken from "../helper/authenticate_token.js";
import databaseConnection from '../helper/database_connection.js';
import databaseQuery from '../helper/database_query.js';
import UploadFile from "../helper/upload_file.js";
import { isAdmin } from "../ultis/authen_utils.js";
import { isMapping, mapStudentByInClassId, unMapStudent } from "../ultis/teacher_utils.js";
import { getCurrentUserId } from "../ultis/user_utils.js";

const adminRouter = express.Router();
const databaseRequest = await databaseConnection();
const __dirname = path.resolve(path.dirname(''));

adminRouter.patch('/toggle-admin', authenToken, isAdmin, async function (req, res) {
    try {
        let reqData = req.body;

        if (typeof (req.body) == "string") {
            reqData = JSON.parse(req.body);
        }

        const userId = reqData['user_id'];

        const currentUserId = await getCurrentUserId(req, res);

        if (userId == currentUserId) {
            res.status(202).send({ messages: "You can't toggle yourself" });
            return;
        }

        var sql = `SELECT is_admin FROM [user] WHERE id = '${userId}'`;

        var isAdmin = 0;

        try {
            isAdmin = await databaseQuery(databaseRequest, sql);
            isAdmin = isAdmin[0]['is_admin'];
        }
        catch (err) {
            res.status(202).send({ messages: "Invalid user_id" });
            return;
        }

        var set = "is_admin = 1";

        if (isAdmin == 1) set = "is_admin = 0";


        var sql = `UPDATE [user] SET ${set} WHERE id = '${userId}'`;
        var sqlResult = await databaseQuery(databaseRequest, sql);


        if (sqlResult != 0) {
            if (isAdmin != 0) {
                res.status(200).send({ messages: `${userId} is no longer admin` });
                return;
            }
            res.status(200).send({ messages: `${userId} is admin now` });
            return;
        }

        res.status(202).send({ messages: "ERROR: nothing to change" });
    }
    catch (err) {
        console.log("ERROR[/admin/toggle-admin]:", err);
    }
});

adminRouter.get('/user-list', authenToken, isAdmin, async function (req, res) {
    try {
        var sql = `SELECT id, first_name, last_name, email, phone_number, is_verify, is_locked, is_admin, image_url FROM [user] WHERE email IS NOT NULL`;

        var sqlResult = await databaseQuery(databaseRequest, sql);

        res.send(sqlResult);
    }
    catch (err) {
        console.log("ERROR[/admin/user-list]:", err);
    }
});

adminRouter.patch('/toggle-lock-account', authenToken, isAdmin, async function (req, res) {
    try {
        let reqData = req.body;

        if (typeof (req.body) == "string") {
            reqData = JSON.parse(req.body);
        }

        const userId = reqData['user_id'];


        const currentUserId = await getCurrentUserId(req, res);

        if (userId == currentUserId) {
            res.status(202).send({ messages: "You can't toggle yourself" });
            return;
        }

        var sql = `SELECT is_locked FROM [user] WHERE id = '${userId}'`;

        var isLocked = 0;

        try {
            isLocked = await databaseQuery(databaseRequest, sql);
            isLocked = isLocked[0]['is_locked'];
        }
        catch (err) {
            res.status(202).send({ messages: "Invalid user_id" });
            return;
        }

        var set = "is_locked = 1";

        if (isLocked == 1) set = "is_locked = 0";

        var sql = `UPDATE [user] SET ${set} WHERE id = '${userId}'`;
        var sqlResult = await databaseQuery(databaseRequest, sql);

        if (sqlResult != 0) {
            if (isLocked != 0) {
                res.send({ messages: `${userId} is unlocked` });
                return;
            }
            res.send({ messages: `${userId} is locked` });
            return;
        }

        res.status(202).send({ messages: "ERROR: nothing to change" });
    }
    catch (err) {
        console.log("ERROR[/admin/toggle-lock-account]:", err);
    }
});

adminRouter.patch('/map-student', authenToken, isAdmin, async function (req, res) {
    try {
        let reqData = req.body;

        if (typeof (req.body) == "string") {
            reqData = JSON.parse(req.body);
        }

        const studentId = reqData['student_id'];
        const classId = reqData['class_id'];
        const inClassId = reqData['in_class_id'];

        const messages = await mapStudentByInClassId(classId, studentId, inClassId);
        var statusCode = 200;
        if (messages.includes("ERROR")) statusCode = 202;

        res.status(statusCode).send({ messages: messages });
    }
    catch (err) {
        console.log("ERROR[/admin/map-student]:", err);
    }
});

adminRouter.patch('/un-mapping', authenToken, isAdmin, async function (req, res) {
    try {
        let reqData = req.body;

        if (typeof (req.body) == "string") {
            reqData = JSON.parse(req.body);
        }

        var studentId = reqData['student_id']??undefined;
        const classId = reqData['class_id'];
        const inClassId = reqData['in_class_id'];

        if (studentId) {
            var isMap = await isMapping(studentId);
        }
        if (!isMap) {
            var sql = `SELECT student_id FROM classroom_student WHERE in_class_id = '${inClassId}' AND is_removed = 0`;
            var sqlResult = await databaseQuery(databaseRequest, sql);

            if (sqlResult.length == 0) {
                res.status(202).send({ messages: "Invalid in_class_id" });
                return;
            }
            studentId = sqlResult[0]['student_id'];
        }
        
        const messages = await unMapStudent(classId, studentId);

        var statusCode = 200;
        if (messages.includes("ERROR")) statusCode = 202;

        res.status(statusCode).send({ messages: messages });
    }
    catch (err) {
        console.log("ERROR[/admin/un-mapping]:", err);
    }
});

adminRouter.get('/classes', authenToken, isAdmin, async function (req, res) {
    try {
        var sql = `SELECT c.id, c.name, c.subject, c.is_active, CONCAT(u.first_name,' ', u.last_name) as teacher_name
        FROM classroom c
        JOIN classroom_teacher ct ON ct.classroom_id = c.id
        JOIN [user] u ON u.id = ct.teacher_id`;

        var sqlResult = await databaseQuery(databaseRequest, sql);

        if (sqlResult.length != 0) {
            for (const classroom of sqlResult) {
                var classId = classroom['id'];
                var sql = `SELECT previous_id, in_class_id, student_id, CONCAT(u.first_name,' ', u.last_name) as student_name
                FROM classroom_student cs
                JOIN [user] u ON u.id = cs.student_id
                WHERE classroom_id = '${classId}' AND is_removed = 0`;

                var userInClassRes = await databaseQuery(databaseRequest, sql);

                var userInClass = [];

                for (const element of userInClassRes) {
                    if (element['previous_id'] != null) element['is_mapping'] = true;
                    else element['is_mapping'] = false;
                    delete element['previous_id'];
                    userInClass.push(element);
                }

                classroom['user_in_class'] = userInClass;
            }
            res.send(sqlResult);
        }

        res.send([]);
    }
    catch (err) {
        console.log("ERROR[/admin/classes]:", err);
    }
});

adminRouter.patch('/toggle-class', authenToken, isAdmin, async function (req, res) {
    try {
        let reqData = req.body;

        if (typeof (req.body) == "string") {
            reqData = JSON.parse(req.body);
        }

        const classId = reqData['class_id'];

        var sql = `SELECT is_active FROM classroom WHERE id = '${classId}'`;
        var isActive = await databaseQuery(databaseRequest, sql);
        if (isActive.length == 0) {
            res.status(202).send({ messages: "ERROR: invalid class_id" });
            return;
        }
        isActive = isActive[0]['is_active'];
        isActive = !isActive;

        var value = (isActive == false) ? 0 : 1;

        var sql = `UPDATE classroom 
    SET is_active = ${value}
    WHERE id = '${classId}'`;

        var result = await databaseQuery(databaseRequest, sql);

        if (result != 0) {
            if (!isActive) res.send({ messages: `Class ${classId} is no longger active` });
            else res.send({ messages: `Class ${classId} is active now` });
            return;
        }

        res.status(202).send({ messages: "ERROR: Notthing to change" });
    }
    catch (err) {
        console.log("ERROR[/admin/toggle-class]:", err);
    }
});

adminRouter.post('/uploadFile', fileUpload({ createParentPath: true }), authenToken, isAdmin, async function (req, res) {
    try {
        let reqData = req.body;
        var result = {};

        if (typeof (req.body) == "string") {
            reqData = JSON.parse(req.body);
        }
        const classId = reqData['class_id'];

        const uploadFile = req.files.files;

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

        var studentIdIndex = -1;
        var inClassIdIndex = -1;

        worksheet.getRow(1).values.forEach((columnName, index) => {
            const formattedNameInFile = columnName.toUpperCase().replace(/\s/g, '');
            switch (formattedNameInFile) {
                case "STUDENTID": {
                    studentIdIndex = index;
                    break;
                }
                case "INCLASSID": {
                    inClassIdIndex = index;
                    break;
                }
            }
        });

        var missingValues = [];

        if (studentIdIndex == -1 || inClassIdIndex == -1) {
            result["messages"] = "ERROR: Missing mapping value";

            if (studentIdIndex == -1) {
                missingValues.push("Student Id");
            }

            if (inClassIdIndex == -1) {
                missingValues.push("In Class Id");
            }

            result["missing_values"] = missingValues;
            res.status(202).send(result);
            return;
        }

        const invalid = [];

        const mappingSuccess = [];

        await new Promise((resolve) => {
            worksheet.eachRow(async (row, rowNumber) => {
                if (rowNumber != 1) {
                    var rowValues = row.values;
                    var messages = await mapStudentByInClassId(classId, rowValues[studentIdIndex] ?? null, rowValues[inClassIdIndex] ?? null);
                    if (messages.includes("ERROR")) {
                        invalid.push({
                            student_id: rowValues[studentIdIndex],
                            in_class_id: rowValues[inClassIdIndex],
                            reason: messages
                        });
                    }
                    else {
                        mappingSuccess.push({
                            student_id: rowValues[studentIdIndex],
                            in_class_id: rowValues[inClassIdIndex]
                        });
                    }
                }

                if (rowNumber === worksheet.rowCount) {
                    resolve()
                }
            })
        });

        res.send({ mapping_error_list: invalid, mapping_success_list: mappingSuccess });
    }
    catch (err) {
        console.log("ERROR[/admin/uploadFile]:", err);
    }
});

export default adminRouter;