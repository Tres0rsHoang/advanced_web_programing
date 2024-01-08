import { toast } from "react-toastify";
import { loginApi } from "../../api/authService";
import { getCurrentUserApi } from "../../api/profileService";

export const FETCH_USER_LOGIN = 'FETCH_USER_LOGIN';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_GOOGLE_SUCCESS = 'FETCH_GOOGLE_SUCCESS';

export const USER_LOGOUT = 'USER_LOGOUT';
export const GOOGLE_LOGOUT = 'GOOGLE_LOGOUT';
export const USER_REFRESH = 'USER_REFRESH';


export const handleLoginRedux = (email, password) => {
    return async (dispatch, getState) => {
        dispatch({type: FETCH_USER_LOGIN});
        try {
            let response = await loginApi(email.trim(), password);
            if (response && response.data.access_token) {
                localStorage.setItem('token', response.data.access_token);
                try {
                let response2 = await getCurrentUserApi();
                if (response2 && response2.data) {
                    localStorage.setItem('user', JSON.stringify(response2.data.information));
                    dispatch({
                        type: FETCH_USER_SUCCESS,
                        data: {
                            email: email.trim(),
                            token: response.data.access_token,
                            firstName: response2.data.information.first_name,
                            lastName: response2.data.information.last_name,
                            imageUrl: response2.data.information.image_url,
                            auth: true,
                            authGoogle: false
                        }
                    })
                } else {
                    if (response2 && response2.data.error) {
                        toast.error(response2.data.error);
                    }

                    dispatch({
                        type: FETCH_USER_ERROR,
                    })
                }
                } catch {
                    toast.error("Server not responding...");
                    return;
                }
            } else {
                if (response && response.data.error) {
                    toast.error(response.data.error);
                }

                dispatch({
                    type: FETCH_USER_ERROR,
                })
            }
        } catch {
          toast.error("Server not responding...");
          return;
        }
    }
}

export const handleGoogleLoginRedux = (res) => {
    return async (dispatch, getState) => {
        dispatch({type: FETCH_USER_LOGIN});

        if (res) {
            localStorage.setItem('token', res.accessToken);
            localStorage.setItem('user', JSON.stringify(res.profileObj));
            dispatch({
                type: FETCH_GOOGLE_SUCCESS,
                data: {
                    email: res.profileObj.email.trim(),
                    token: res.accessToken,
                    firstName: res.profileObj.givenName,
                    lastName: res.profileObj.familyName,
                    imageUrl: res.profileObj.imageUrl,
                    auth: true,
                    authGoogle: true
                }
            })
        } else {
            toast.error("Google login failed!");

            dispatch({
                type: FETCH_USER_ERROR,
            })
        }
    }
}

export const handleLogoutRedux = () => {
    return (dispatch, getState) => {
        dispatch({
            type: USER_LOGOUT
        })
    }
}

export const handleGoogleLogoutRedux = () => {
    return (dispatch, getState) => {
        dispatch({
            type: GOOGLE_LOGOUT
        })
    }
}

export const handleRefresh = () => {
    return (dispatch, getState) => {
        dispatch({
            type: USER_REFRESH
        })
    }
}