import axios from "axios";

const instance =  axios.create({
    baseURL: 'https://advanced-web-programing.vercel.app'
    //baseURL: 'http://localhost:9000'
});

axios.interceptors.response.use(function (response) {
    return response.data ? response.data : {statusCode: response.status };

}, function (error) {
    console.log(error.response)
    let res = {};

    if(error.response) {
        res.data = error.response.data;
        res.status = error.response.status;
        res.headers = error.response.headers;
    } else if(error.request) {
        console.log(error.request);
    } else {
        console.log("Error: ", error.message);
    }

    return res;

    //return Promise.reject(error);
});

export default instance;
