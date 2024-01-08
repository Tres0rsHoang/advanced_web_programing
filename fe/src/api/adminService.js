import axios from "./axios";

const toggleAdminApi = (userId) => {
    return axios.patch("/admin/toggle-admin", {userId}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
    });
}

const toggleLockAccountApi = (userId) => {
  return axios.patch("/admin/toggle-lock-account", {userId}, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  });
}

const toggleClassApi = (classId) => {
  return axios.patch("/admin/toggle-class", {classId}, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
  });
}

const getUserListApi = () => {
    return axios.post("/admin/user-list", {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });
}

const getClassroomListApi = () => {
    return axios.post("/admin/classes", {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });
}

const adminMapStudentApi = (classId, studentId, inClassId) => {
    return axios.post("/admin/map-student", {classId, studentId, inClassId}, {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });
}

export { toggleAdminApi, toggleLockAccountApi, toggleClassApi, getUserListApi, getClassroomListApi, adminMapStudentApi  };
