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
        res.status(202).send({"messages": "ERROR: Can't find class id"});
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
    res.status(202).send({"messages": "ERROR: You are not teacher in this class"});
}

export async function mapGradeForNewStudent(classId, newStudentId, currentStudentId) {

    // Update grade for new student
    var sql = `UPDATE sgrade 
    SET sgrade.student_id = '${newStudentId}'
    FROM student_grade sgrade 
    JOIN classroom_grade cgrade ON sgrade.grade_id = cgrade.id
    WHERE cgrade.classroom_id = '${classId}'
    AND sgrade.student_id = '${currentStudentId}'`;

    var sqlResult = await databaseQuery(databaseRequest, sql);

    if (sqlResult != 0) return "Mapping successfully";

    return "ERROR: Mapping fail";
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
            WHERE student_id = '${studentId}' AND grade_id = '${gradeId}' AND is_finalized = 0`;

            await databaseQuery(databaseRequest, sql);
        });
    }
}

export async function unMapStudent(classId, studentId) {
    const mapping = await isMapping(studentId);
    if (!mapping) return "ERROR: This student don't mapping to any student";

    var sql = `SELECT student_id
    FROM classroom_student
    WHERE previous_id = '${studentId}' AND classroom_id = '${classId}' AND is_removed = 1`;

    var previousId = await databaseQuery(databaseRequest, sql);
    console.log(sql);
    previousId = previousId[0]['student_id'];

    var sql = `UPDATE classroom_student
    SET is_removed = 0, student_id = '${studentId}', previous_id = NULL
    WHERE student_id = '${previousId}' 
    AND previous_id = '${studentId}' AND classroom_id = '${classId}'`;

    var updateResult = await databaseQuery(databaseRequest, sql);
    if (updateResult == 0) return "ERROR: Can't update previous student with current student in this class";

    var sql = `UPDATE classroom_student
    SET is_removed = 0, student_id = '${previousId}', previous_id = NULL
    WHERE student_id = '${studentId}'
    AND previous_id = '${previousId}' AND classroom_id = '${classId}' AND previous_id IS NOT NULL`;

    var updateResult = await databaseQuery(databaseRequest, sql);
    if (updateResult == 0) return "ERROR: Can't update current student to previous student in this class";

    const mapGradeResult = await mapGradeForNewStudent(classId, previousId, studentId);

    if (mapGradeResult == "Mapping successfully") return 'Un-mapping successfully';
    return "ERROR: Mapping grade fail";
}

export async function isMapping(studentId) {
    var sql = `SELECT student_id 
    FROM classroom_student cs 
    WHERE cs.previous_id = '${studentId}'`;

    try{
       var result = await databaseQuery(databaseRequest, sql);
       if (result.length == 0) return false;
       return true;
    }
    catch (err) {
        console.log(err);
    }
}

export async function mapStudentByInClassId(classId, newStudentId, inClassId) {
    var sql = `SELECT 1
    FROM classroom_student 
    WHERE in_class_id = '${inClassId}'
    AND student_id = '${newStudentId}'
    AND classroom_id = '${classId}'`;

    var sqlResult = await databaseQuery(databaseRequest, sql);

    if (sqlResult.length != 0) {
        return "ERROR: You can't mapping your self with your old in class id";
    }

    const mapping = await isMapping(newStudentId);
    if (mapping) return "ERROR: This student already mapping to one account";

    var sql = `SELECT student_id, is_removed FROM classroom_student WHERE classroom_id = '${classId}' AND in_class_id = '${inClassId}'`;

    var currentStudentId = await databaseQuery(databaseRequest, sql);
    if (currentStudentId.length == 0) return "ERROR: Can't find current student in this class who hold this in_class_id";
    currentStudentId = currentStudentId[0]['student_id'];

    var sql = `SELECT in_class_id, is_removed FROM classroom_student WHERE classroom_id = '${classId}' AND student_id = '${newStudentId}'`
    var newStudentInClassId = await databaseQuery(databaseRequest, sql);
    if (newStudentInClassId.length == 0) return "ERROR: new student don't have in_class_id";
    newStudentInClassId = newStudentInClassId[0]['in_class_id'];
    var sql = `UPDATE classroom_student
    SET is_removed = 1, student_id = '${currentStudentId}', previous_id = '${newStudentId}'
    WHERE student_id = '${newStudentId}' 
    AND in_class_id = '${newStudentInClassId}' AND classroom_id = '${classId}'`;
    var updateResult = await databaseQuery(databaseRequest, sql);
    if (updateResult == 0) return "ERROR: Can't update new student to current student in this class";

    var sql = `UPDATE classroom_student
    SET is_removed = 0, student_id = '${newStudentId}', previous_id = '${currentStudentId}'
    WHERE student_id = '${currentStudentId}' 
    AND in_class_id = '${inClassId}' AND classroom_id = '${classId}'`;
    var updateResult = await databaseQuery(databaseRequest, sql);
    if (updateResult == 0) return "ERROR: Can't update current student to new student in this class";

    const mapGradeResult = await mapGradeForNewStudent(classId, newStudentId, currentStudentId);
    return mapGradeResult;
}
