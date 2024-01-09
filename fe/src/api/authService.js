import axios from "./axios";

const loginApi = async (email, password) => {
    return axios.post("/auth/login", {email, password}, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
}

const logoutApi = () => {
  return axios.get("/auth/logout", {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  });
}

const signUpApi = (email, password, phoneNumber, firstName, lastName) => {
  return axios.post("/auth/register", {
    email: email, 
    password: password, 
    phone_number: phoneNumber, 
    first_name: firstName, 
    last_name: lastName
  }, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export { loginApi, logoutApi, signUpApi };

