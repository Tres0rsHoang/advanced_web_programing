import request from "./request";

const gradeStructureApi = async (classId, orderBy) => {
  return await request('POST', "/classroom/grade/struture", { classId, orderBy });
}

const removeGradeApi = async (classId, gradeId) => {
  return await request('DELETE', "/classroom/grade/remove", { classId, gradeId });
}

const updateGradeApi = async (classId, gradeId, name, gradeScale) => {
  return await request('PATCH', "/classroom/grade/update", { classId, gradeId, name, gradeScale });
}

const createGradeApi = async (classId, gradeScale, name) => {
  return await request('POST', "/classroom/grade/create", { classId, gradeScale, name });
}

export { createGradeApi, gradeStructureApi, removeGradeApi, updateGradeApi };

