import React, { createContext, useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import useAxios from '../hooks/useAxios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null);


const Provider = ({ children }) => {
    const axiosInstance = useAxios();
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fs() {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error("Token is empty");
                }
                const { data: response } = await axiosInstance.post('token-login', { reqtoken: token });
                setUser({ name: response.name, email: response.email, role: response.role, location: response.location });
                localStorage.setItem('token', response.token);

            } catch (err) {
                console.log(err);
                toast.error(err?.response?.data?.message || err?.message || err);

            }
        }
        fs();
    }, []);

    const authInfo = {
        user, setUser
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
            <Toaster />
        </AuthContext.Provider>
    );
};

export default Provider;