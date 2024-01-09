import { default as axios, default as request } from "./request";

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

const confirmResetPassword = async (email, resetCode, newPassword) => {
  return await request('PATCH', '/auth/confirm-reset-password', {
    "email": email,
    "reset_code": resetCode,
    "new_password": newPassword
  });
}

export { confirmResetPassword, loginApi, logoutApi, signUpApi };

