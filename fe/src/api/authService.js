import axios from "./axios";

const loginApi = (email, password) => {
    return axios.post("/login", {email, password}, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
}

const logoutApi = () => {
  return axios.post("/logout", {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
  });
}

const signUpApi = (email, password, phoneNumber, firstName, lastName) => {
  return axios.post("/register", {email, password, phoneNumber, firstName, lastName}, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

const getCurrentUserApi = () => {
    return axios.get("/profile", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("access_token")
        }
      }); 
}

const updateUserProfileApi = (email, phoneNumber, firstName, lastName) => {
  return axios.patch("/profile", {email, phoneNumber, firstName, lastName}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      }
    }); 
}

export { loginApi, logoutApi, signUpApi, getCurrentUserApi, updateUserProfileApi };