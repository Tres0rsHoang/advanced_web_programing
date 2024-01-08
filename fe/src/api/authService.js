import axios from "./axios";

const loginApi = (email, password) => {
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
  return axios.post("/auth/register", {email, password, phoneNumber, firstName, lastName}, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export { loginApi, logoutApi, signUpApi  };
