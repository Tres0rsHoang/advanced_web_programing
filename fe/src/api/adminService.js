import request from "./request";

const toggleAdminApi = async (userId) => {
  return await request('PATCH', '/admin/toggle-admin', {user_id:  userId });
}

const toggleLockAccountApi = async (userId) => {
  return await request('PATCH', '/admin/toggle-lock-account', { user_id: userId });
}

const toggleClassApi = async (classId) => {
  return await request('PATCH', '/admin/toggle-class', {class_id:  classId });
}

const getUserListApi = async () => {
  return await request('GET', '/admin/user-list');
}

const getClassroomListApi = async () => {
  return await request('GET', '/admin/classes');
}

const adminMapStudentApi = async (classId, studentId, inClassId) => {
  return await request('POST', '/admin/map-student', { class_id: classId,student_id: studentId,in_class_id: inClassId });
}

export { adminMapStudentApi, getClassroomListApi, getUserListApi, toggleAdminApi, toggleClassApi, toggleLockAccountApi };

