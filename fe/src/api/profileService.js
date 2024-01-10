import request from "./request";

const getCurrentUserApi = async () => {
  return await request('GET', '/profile');
}

const updateUserProfileApi = async (email, phoneNumber, firstName, lastName) => {
  return await request('PATCH', '/profile', {
    "email": email,
    "phone_number": phoneNumber,
    "first_name": firstName,
    "last_name": lastName
  });
}

const profileMapStudentApi = async (classId, inClassId) => {
  return await request('PATCH', "/profile/map-student", {class_id: classId, in_class_id: inClassId});
}

const getGradeApi = async (classId) => {
  return await request('GET', '/profile/get-grade', {class_id: classId});
}

export { getCurrentUserApi, getGradeApi, profileMapStudentApi, updateUserProfileApi };
