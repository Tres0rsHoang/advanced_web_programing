import axios from "./axios";

const gradeStructureApi = (classId, orderBy) => {
    return axios.post("/classroom/grade/struture", {classId, orderBy}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
    });
}

const removeGradeApi = (classId, gradeId) => {
  return axios.delete("/classroom/grade/remove", {classId, gradeId}, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  });
}

const updateGradeApi = (classId, gradeId, name, gradeScale) => {
  return axios.patch("/classroom/grade/update", {classId, gradeId, name, gradeScale}, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
  });
}

const createGradeApi = (classId, gradeScale, name) => {
    return axios.post("/classroom/grade/create", {classId, gradeScale, name}, {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });
  }

export { gradeStructureApi, removeGradeApi, updateGradeApi, createGradeApi  };
