import { v4 as uuidv4 } from "uuid";
import databaseConnection from '../helper/database_connection.js';
import databaseQuery from '../helper/database_query.js';
import { getCurrentUserId } from "../ultis/user_utils.js";

const databaseRequest = await databaseConnection();

export async function isTeacher(req, res, next) {
    let reqData = req.body;

    if (typeof(req.body) == "string") {
        reqData = JSON.parse(req.body);
    }

    const classId = reqData['class_id'];

    if (!classId) {
        res.send({"messages": "ERROR: Can't find class id"});
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
    res.send({"messages": "ERROR: You are not teacher in this class"});
}

export async function mapStudent(classId, newStudentId, currentStudentId) {
    var sql = `UPDATE classroom_student SET student_id = '${newStudentId}' WHERE student_id = '${currentStudentId}'`;

    await databaseQuery(databaseRequest, sql);
    var sql = `UPDATE sgrade 
    SET sgrade.student_id = '${newStudentId}'
    FROM student_grade sgrade 
    JOIN classroom_grade cgrade ON sgrade.grade_id = cgrade.id
    WHERE cgrade.classroom_id = '${classId}'
    AND sgrade.student_id = '${currentStudentId}'`;

    var sqlResult = await databaseQuery(databaseRequest, sql);
    return sqlResult;
}

export async function updateStudent(classId, userInfor, gradeInforList) {
    var sql = `SELECT student_id
    FROM classroom_student
    WHERE in_class_id = '${userInfor['inClassId']}' AND is_removed = 0 AND classroom_id = '${classId}'`;

    const result = await databaseQuery(databaseRequest, sql);

    if (result.length == 0) {
        const newUserId = uuidv4();

        var sql = `INSERT INTO [user]
        VALUES ('${newUserId}', NULL, NULL, NULL, '${userInfor['firstName']}', '${userInfor['lastName']}', 0, NULL, NULL, 0, 0)`;

        await databaseQuery(databaseRequest, sql);

        var sql = `INSERT INTO classroom_student(student_id, classroom_id, is_removed, in_class_id)
        VALUES ('${newUserId}', '${classId}', 0, '${userInfor['inClassId']}')`;

        await databaseQuery(databaseRequest, sql);

        gradeInforList.forEach(async (element) => {
            const id = uuidv4();
            const gradeId = element["gradeId"];
            const grade = element["grade"];

            var sql = `INSERT INTO student_grade
            VALUES ('${newUserId}', '${gradeId}', ${grade}, 0)`;

            await databaseQuery(databaseRequest, sql);
        });
    }
    else {
        gradeInforList.forEach(async (element) => {
            const gradeId = element["gradeId"];
            const grade = element["grade"];
            const studentId = result[0]['student_id'];

            var sql = `UPDATE student_grade
            SET grade = ${grade}
            WHERE student_id = '${studentId}' AND grade_id = '${gradeId}'`;

            await databaseQuery(databaseRequest, sql);
        });
    }
}

export async function unMapStudent(classId, studentId) {
    var sql = `SELECT student_id, is_removed
    FROM classroom_student 
    WHERE student_id = '${studentId}'
    AND classroom_id = '${classId}'`;

    var sqlResult = await databaseQuery(databaseRequest, sql);

    if (sqlResult.length == 0) return "ERROR: Can't un-mapping student who doesn't mapping";

    var sql = `UPDATE classroom_student 
    SET is_removed = 0
    WHERE student_id = '${studentId}'
    AND classroom_id = '${classId}' AND is_removed = 1`;

    await databaseQuery(databaseRequest, sql);

    var sql = `UPDATE classroom_student 
    SET is_removed = 1
    WHERE student_id = '${studentId}'
    AND classroom_id = '${classId}' AND is_removed = 0`;

    await databaseQuery(databaseRequest, sql);

    return "Un-mapping successfully";
}

export async function mapStudentByInClassId(classId, newStudentId, inClassId) {

    //Sellect current student who hold in class id
    var sql = `SELECT student_id
    FROM classroom_student
    WHERE in_class_id = '${inClassId}' AND is_removed = 0 AND classroom_id = '${classId}'`;

    var currentStudentId = await databaseQuery(databaseRequest, sql);

    if (currentStudentId.length == 0) {
        return "ERROR: invalid in class id";
    }

    currentStudentId = currentStudentId[0]['student_id'];

    // Sellect current in class id of new student id
    var sql = `SELECT in_class_id
    FROM classroom_student
    WHERE is_removed = 0 
    AND classroom_id = '${classId}' 
    AND student_id = '${newStudentId}'`;

    var currentInClassId = await databaseQuery(databaseRequest, sql);

    if (currentInClassId.length == 0) {
        return "ERROR: invalid student id, student not in this class";
    }
    currentInClassId = currentInClassId[0]['in_class_id'];

    //Un map new student from current in class id
    var messages = await unMapStudent(classId, newStudentId);

    // if un map successfully don't need to remove current student
    if (messages != 'Un-mapping successfully') {
        var sql = `UPDATE classroom_student
        SET is_removed = 1 
        WHERE in_class_id = '${currentInClassId}' 
        AND student_id = '${newStudentId}' 
        AND classroom_id = '${classId}'`;

        await databaseQuery(databaseRequest, sql);
    }
    
    try {
        const sqlResult = await mapStudent(classId, newStudentId, currentStudentId);

        if (sqlResult != 0) {
            return "Map successfully";
        }
        else {
            return "ERROR: Map fail";
        }
    }
    catch (err) {
        return "ERROR: Invalid new student id";
    }
}
