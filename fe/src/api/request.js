import axios from "axios";

export default async function request(method, uri, body) {
    let config = {
        method: method.toLowerCase(),
        url: uri,
        baseURL: process.env.REACT_APP_API_URL,
        headers: { 
            'Authorization': 'Bearer ' + localStorage.getItem('token') ,
            'Content-Type': 'application/json'
        },
        body: body,
        validateStatus: function (status) {
            return status >= 200 && status < 400
        }
    }

    return axios(config).then(
        function (response) {
            return response.data
        }
    ).catch(
        function (error) {
            console.log('Show error notification!')
            return Promise.reject(error)
        }
    )
}