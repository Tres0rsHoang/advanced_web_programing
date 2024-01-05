import { logoutApi } from '../../api/authService';
import { FETCH_USER_LOGIN, FETCH_USER_SUCCESS, FETCH_GOOGLE_SUCCESS, FETCH_USER_ERROR, USER_LOGOUT, GOOGLE_LOGOUT, USER_REFRESH } from '../actions/userAction';


    const INITIAL_STATE = {

        account: {
            email: '',
            token: '',
            firstName: '',
            lastName: '',
            imageUrl: '', 
            auth: null, 
            authGoogle: false
        }
    };

    const userReducer = (state = INITIAL_STATE, action) => {

        switch (action.type) {

            case FETCH_USER_LOGIN:

               return {

                 ...state,

               };

            case FETCH_USER_SUCCESS:

               return {
                  ...state, 
                  account: {
                    email: action.data.email,
                    token: action.data.token,
                    firstName: action.data.firstName,
                    lastName: action.data.lastName,
                    imageUrl: action.data.imageUrl, 
                    auth: true , 
                    authGoogle: false
                  }

               };

            case FETCH_GOOGLE_SUCCESS:

                return {
                    ...state, 
                    account: {
                        email: action.data.email,
                        token: action.data.token,
                        firstName: action.data.firstName,
                        lastName: action.data.lastName,
                        imageUrl: action.data.imageUrl, 
                        auth: true , 
                        authGoogle: true
                  }

            };

            case FETCH_USER_ERROR:

               return {
                  ...state, 
                  account: {
                    auth: false,
                    authGoogle: false
                  }

               };

            case USER_LOGOUT:
                logoutApi();
                localStorage.removeItem("token");
                localStorage.removeItem("user");

                return {
                    ...state, 
                    account: {
                        email: '',
                        token: '',
                        firstName: '',
                        lastName: '',
                        imageUrl: '', 
                        auth: false , 
                        authGoogle: false
                    }

                };

            case GOOGLE_LOGOUT:
                localStorage.removeItem("token");
                localStorage.removeItem("user");

                return {
                    ...state, 
                    account: {
                        email: '',
                        token: '',
                        firstName: '',
                        lastName: '',
                        imageUrl: '', 
                        auth: false , 
                        authGoogle: false
                    }

                };
            
            case USER_REFRESH:
                const user = JSON.parse(localStorage.getItem('user'))

                return {
                    ...state, 
                    account: {
                        email: user.email,
                        token: localStorage.getItem('token'),
                        firstName: user.first_name || user.givenName,
                        lastName: user.last_name || user.familyName,
                        imageUrl: user.image_url || user.imageUrl, 
                        auth: true , 
                        authGoogle: user.googleId ? true : false
                    }

            };

            default: return state;

        }

    };

    export default userReducer;