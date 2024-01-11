import request from "./request";

const toggleAdminApi = async (userId) => {
  return await request('PATCH', '/admin/toggle-admin', { user_id: userId });
}

const toggleLockAccountApi = async (userId) => {
  return await request('PATCH', '/admin/toggle-lock-account', { user_id: userId });
}

const toggleClassApi = async (classId) => {
  return await request('PATCH', '/admin/toggle-class', { class_id: classId });
}

const getUserListApi = async () => {
  return await request('GET', '/admin/user-list');
}

const getClassroomListApi = async () => {
  return await request('GET', '/admin/classes');
}

const adminMapStudentApi = async (classId, studentId, inClassId) => {
  return await request('PATCH', '/admin/map-student', { class_id: classId, student_id: studentId, in_class_id: inClassId });
}

const adminUnMappingStudentApi = async (classId, studentId, inClassId) => {
  return await request('PATCH', '/admin/un-mapping', { class_id: classId, student_id: studentId, in_class_id: inClassId });
}

const uploadFile = async (classId, files) => {
  return await request('POST', '/admin/uploadFile', { class_id: classId, files: files });
}

export { adminMapStudentApi, adminUnMappingStudentApi, getClassroomListApi, getUserListApi, toggleAdminApi, toggleClassApi, toggleLockAccountApi, uploadFile };

