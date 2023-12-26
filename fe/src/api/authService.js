import axios from "./axios";

const loginApi = (email, password) => {
    return axios.post("/login", {email, password}, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
}

const logoutApi = () => {
  return axios.get("/logout", {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
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

export { loginApi, logoutApi, signUpApi, getCurrentUserApi, updateUserProfileApi };