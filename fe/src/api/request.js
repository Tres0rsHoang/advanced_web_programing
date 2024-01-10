import axios from "axios";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export default async function request(method, uri, body) {
    let config = {
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
            if (response.status === 202) toast.error(response.data.messages);
            return response;
        }
    ).catch(
        function (error) {
            toast.error("Server not responding...");
            return redirect("/login");
            //return Promise.reject(error)
        }
    );

    return response;
}