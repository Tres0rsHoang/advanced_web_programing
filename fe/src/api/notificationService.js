import axios from "./axios";

const classroomNotificationsApi = (classId) => {
    return axios.get("/notification/classroom", {class_id: classId}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
    });
}

const selfNotificationsApi = () => {
  return axios.get("/notification", {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  });
}

export { classroomNotificationsApi, selfNotificationsApi };
