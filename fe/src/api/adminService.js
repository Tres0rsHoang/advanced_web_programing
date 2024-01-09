import request from "./request";

const toggleAdminApi = async (userId) => {
  return await request('PATCH', '/admin/toggle-admin', { userId });
}

const toggleLockAccountApi = async (userId) => {
  return await request('PATCH', '/admin/toggle-lock-account', { userId });
}

const toggleClassApi = async (classId) => {
  return await request('PATCH', '/admin/toggle-class', { classId });
}

const getUserListApi = async () => {
  return await request('GET', '/admin/user-list');
}

const getClassroomListApi = async () => {
  return await request('POST', '/admin/classes');
}

const adminMapStudentApi = async (classId, studentId, inClassId) => {
  return await request('POST', '/admin/map-student', { classId, studentId, inClassId });
}

export { adminMapStudentApi, getClassroomListApi, getUserListApi, toggleAdminApi, toggleClassApi, toggleLockAccountApi };

