import axios from "./axios";

const createClassApi = (name, section, subject, room) => {
    return axios.post("/classroom/create", {name, section, subject, room}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
}

const joinClassApi = (classCode, type) => {
  return axios.get(`/classroom/join?classCode=${classCode}&type=${type}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  });
}

const sendInviteMailApi = (invitationType, classCode, studentEmail) => {
  return axios.post("/classroom/sendInviteMail", {invitationType, classCode, studentEmail}, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  });
}

const classDetailsApi = (classId) => {
    return axios.get(`classroom/detail?classId=${classId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
      }); 
}

const uploadFileApi = (files, classId) => {
  return axios.post("/classroom/uploadFile", {files, classId}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    }); 
}

const updateGradeApi = (classId, gradeId, grade, studentId) => {
    return axios.patch("/classroom/update-grade", {classId, gradeId, grade, studentId}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
    }); 
}

const mapStudentApi = (classId, currentStudentId, newStudentId) => {
    return axios.patch("/classroom/map-student", {classId, currentStudentId, newStudentId}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
    }); 
}

export { createClassApi, joinClassApi, sendInviteMailApi, classDetailsApi, uploadFileApi, updateGradeApi, mapStudentApi };
