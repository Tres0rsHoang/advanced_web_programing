import { default as request } from "./request";

const loginApi = async (email, password) => {
  return await request('POST', "/auth/login", {email, password});
}

const logoutApi = async () => {
  return await request('GET', '/auth/logout');
}

const refreshToken = async () => {
  return await request('GET', '/auth/refreshToken');
}

const signUpApi = async (email, password, phoneNumber, firstName, lastName) => {
  return await request('POST', '/auth/register', {
    email: email, 
    password: password, 
    phone_number: phoneNumber, 
    first_name: firstName, 
    last_name: lastName
  });
}

const confirmResetPassword = async (email, resetCode, newPassword) => {
  return await request('PATCH', '/auth/confirm-reset-password', {
    "email": email,
    "reset_code": resetCode,
    "new_password": newPassword
  });
}

const resetPassword = async ( email ) => {
  return await request('POST', '/auth/reset-password', {
    "email": email
  });
}

export { confirmResetPassword, loginApi, logoutApi, refreshToken, resetPassword, signUpApi };

