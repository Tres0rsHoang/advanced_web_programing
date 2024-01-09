import axios, { Catch403 } from "./request";

const toggleAdminApi = async (userId) => {
  const response = await axios.patch("/admin/toggle-admin", { userId }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }).catch(err => {
    console.log(err)
  });

  console.log(response);

  if (response.status === 200) return response.data;
  if (response.status === 403) return Catch403();
}

const toggleLockAccountApi = (userId) => {
  return axios.patch("/admin/toggle-lock-account", { userId }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  });
}

const toggleClassApi = (classId) => {
  return axios.patch("/admin/toggle-class", { classId }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  });
}

const getUserListApi = async () => {

  const response = await axios.get("/admin/user-list", {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }).catch(err => {
    console.log(err)
  });

  if (response.status === 200) return response.data;
  if (response.status === 403) return Catch403();
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
  return axios.post("/admin/map-student", { classId, studentId, inClassId }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  });
}

export { adminMapStudentApi, getClassroomListApi, getUserListApi, toggleAdminApi, toggleClassApi, toggleLockAccountApi };

