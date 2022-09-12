// useAuth.js
// hooks de check quyen dang nhap
import { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';
import { apiUser } from '../services/user';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useLocalStorage('user_cgv', null); // luu tru gia tri vao localStorage
    const navigate = useNavigate(); // redirect page

    const login = async (data) => {
        // data : {username, password}
        const tokenLogin = apiUser.loginUserBackend(data);
        if(tokenLogin !== null){
            //luu tokenLogin vao localStorage
            setUser(tokenLogin);
            // quay vao trang home
            navigate('/', { replace: true });
        } else {
            navigate("/login", { replace: true }); // quay lai trang login 
        }
    }

    const logout = () => {
        setUser(null);
        // quay lai trang login
        navigate("/login", { replace: true });
    }

    const value = useMemo(
        // user: chinh la gia tri token luu trong localStorage
        () => ({
            login,
            logout,
            user
        }), [user]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
// ????
export const useAuth = () => {
    return useContext(AuthContext);
}
// { login, logout, user } = useAuth();