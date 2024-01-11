import request from "./request";

const gradeStructureApi = async (classId, orderBy) => {
  return await request('POST', "/classroom/grade/structure", {class_id: classId, order_by: orderBy});
}

const removeGradeApi = async (classId, gradeId) => {
  return await request('DELETE', "/classroom/grade/remove", { class_id: classId, grade_id: gradeId });
}

const updateGradeApi = async (classId, gradeId, name, gradeScale) => {
  return await request('PATCH', "/classroom/grade/update", { class_id: classId, grade_id: gradeId, name: name, grade_scale: gradeScale });
}

const createGradeApi = async (classId, gradeScale, name) => {
  return await request('POST', "/classroom/grade/create", { class_id: classId, grade_scale: gradeScale, name: name });
}

export { createGradeApi, gradeStructureApi, removeGradeApi, updateGradeApi };

