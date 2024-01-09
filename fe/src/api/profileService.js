import axios from "./axios";

const getCurrentUserApi = () => {
    return axios.get("/profile", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
      }); 
}

const updateUserProfileApi = (email, phoneNumber, firstName, lastName) => {
  const params = {
    "email": email,
    "phone_number": phoneNumber,
    "first_name": firstName,
    "last_name": lastName
  };
  
  return axios.patch("/profile", params, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    }); 
}

const profileMapStudentApi = (classId, inClassId) => {
    return axios.patch("/profile/map-student", {class_id: classId, in_class_id: inClassId}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
    }); 
}

const getGradeApi = (classId) => {
    return axios.get("/profile/get-grade", {class_id: classId}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
    }); 
}

export { getCurrentUserApi, updateUserProfileApi, profileMapStudentApi, getGradeApi };