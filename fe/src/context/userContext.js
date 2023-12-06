import { createContext, useState } from 'react';
import { logoutApi } from '../api/authService';

const UserContext = createContext({ email: '', auth: false , authGoogle: false});

const UserProvider = ({ children }) => {
    // User is the name of the "data" that gets stored in context
    const [user, setUser] = useState({ email: '', auth: false, authGoogle: false});

    // Login updates the user data with a name parameter
    const loginContext = (email, token) => {
        localStorage.setItem("access_token", token);
        setUser((user) => ({
        email: email,
        auth: true,
        authGoogle: false
        }));
    };

    const ggLoginContext = (email, token) => {
        localStorage.setItem("access_token", token);
        setUser((user) => ({
        email: email,
        auth: true,
        authGoogle: true
        }));
    }

    // Logout updates the user data to default
    const logout = async () => {
        await logoutApi();
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        setUser((user) => ({
        email: '',
        auth: false,
        authGoogle: false
        }));
    };

    return (
        <UserContext.Provider value={{ user, loginContext, ggLoginContext, logout }}>
        {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider};