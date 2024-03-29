import request from "./request";

const classroomNotificationsApi = async (classId) => {
  return await request('POST', "/notification/classroom", {class_id: classId});
}

const selfNotificationsApi = async () => {
  return await request('GET', "/notification");
}

export { classroomNotificationsApi, selfNotificationsApi };
