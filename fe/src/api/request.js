import axios from "axios";

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
            return response;
        }
    ).catch(
        function (error) {
            console.log('Show error notification!')
            return Promise.reject(error)
        }
    );

    return response;
}