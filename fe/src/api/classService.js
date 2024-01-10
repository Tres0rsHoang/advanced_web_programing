import request from "./request";

const createClassApi = async (name, section, subject, room) => {
  return await request('POST', "/classroom/create", {name, section, subject, room});
}

const joinClassApi = async (classCode, type) => {
  return await request('GET', `/classroom/join?classCode=${classCode}&type=${type}`);
}

const sendInviteMailApi = async (invitationType, classCode, studentEmail) => {
  return await request('POST', "/classroom/sendInviteMail", {
    invitation_type: invitationType, 
    class_code: classCode, 
    student_email: studentEmail
  });
}

const classDetailsApi = async (classId) => {
  return await request('GET', `classroom/detail?classId=${classId}`);
}

const uploadFileApi = async (files, classId) => {
  return await request('POST', "/classroom/uploadFile", {files, classId});
}

const updateGradeApi = async (classId, gradeId, grade, studentId) => {
  return await request('PATCH', "/classroom/update-grade", {classId, gradeId, grade, studentId});
}

const mapStudentApi = async (classId, currentStudentId, newStudentId) => {
  return await request('PATCH', "/classroom/map-student", {classId, currentStudentId, newStudentId});
}

const gradeStructureApi = async (classId, orderBy) => {
  return await request('POST', "/classroom/grade/struture", {class_id: classId, order_by: orderBy});
}

export { classDetailsApi, createClassApi, joinClassApi, mapStudentApi, sendInviteMailApi, updateGradeApi, uploadFileApi, gradeStructureApi };

