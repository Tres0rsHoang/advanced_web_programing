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

const profileUnMapStudentApi = async (classId) => {
  return await request('PATCH', "/profile/un-mapping", {class_id: classId});
}

const getGradeApi = async (classId) => {
  return await request('POST', "/profile/get-grade", { class_id: classId });
}

const createGradeReviewApi = async (gradeId, content, expectedGrade) => {
  return await request('POST', "/profile/comment", { grade_id: gradeId, content: content, expected_grade: expectedGrade });
}

export { getCurrentUserApi, getGradeApi, profileMapStudentApi, profileUnMapStudentApi, updateUserProfileApi, createGradeReviewApi };
