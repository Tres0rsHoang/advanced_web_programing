import axios from "axios";
import { toast } from "react-toastify";
import { refreshToken } from "./authService";

export default async function request(method, uri, body) {
    let config = {
        withCredentials: true,
        method: method.toLowerCase(),
        url: uri,
        baseURL: process.env.REACT_APP_SITE_API,
        headers: { 
            'Authorization': 'Bearer ' + localStorage.getItem('token') ,
            'Content-Type': 'application/json'
        },
        data: body,
        validateStatus: function (status) {
            return status >= 200 && status < 400
        }
    };

    const response = await axios(config).then(
        function (response) {
            console.log(config, '/n', response.data);
            if (response.status === 202) toast.error(response.data.messages);
            return response;
        }
    ).catch(
        async function (error) {
            try {
                if (error.response?.status === 403) {
                    const refreshResponse = await refreshToken();
                    localStorage.setItem('token', refreshResponse.data.access_token);            
                    return request(method, uri, body);
                }
                if (error.code === "ERR_NETWORK") { 
                    localStorage.clear();
                    //window.location = '/login';
                }
                return Promise.reject(error);
            }
            catch (err) {    
                localStorage.clear();
                window.location = '/login';
            }
        }
    );

    return response;
}