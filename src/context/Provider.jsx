import React, { createContext, useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import useAxios from '../hooks/useAxios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null);

//test
const Provider = ({ children }) => {
    const axiosInstance = useAxios();
    const [user, setUser] = useState(null);
    const [search, setSearch] = useState('');
    const [mainLoading, setMainLoading] = useState(true);

    useEffect(() => {
        async function fs() {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error("Token is empty");
                }
                const { data: response } = await axiosInstance.post('token-login', { reqtoken: token });

                setUser({ name: response.name, email: response.email, role: response.role, location: response.location, warehouse: response.warehouse, warehouseName: response.warehouseName, warehouses: response.warehouses, profile: response.profile });
                localStorage.setItem('token', response.token);

                setMainLoading(false);
            } catch (err) {

                toast.error(err?.response?.data?.message || err?.message || err, {
                    id: 'clipboard',
                });

                setMainLoading(false);

            }
        }
        fs();
    }, []);

    const authInfo = {
        user, setUser, mainLoading, setMainLoading, search, setSearch
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
            <Toaster />
        </AuthContext.Provider>
    );
};

export default Provider;