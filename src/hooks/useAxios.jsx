import axios from 'axios';
import { useEffect } from 'react';

const instance = axios.create({
    baseURL: 'https://warehouse-backend.vercel.app/', // Replace with your API base URL
});
function useAxios() {
    useEffect(() => {

        const requestInterceptor = axios.interceptors.request.use(
            (config) => {

                const token = localStorage.getItem('authToken');
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );


        return () => {
            axios.interceptors.request.eject(requestInterceptor);
        };
    }, [instance]);
    return instance;
}

export default useAxios;