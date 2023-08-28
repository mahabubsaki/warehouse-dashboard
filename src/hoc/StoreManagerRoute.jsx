import React, { useContext } from 'react';
import { AuthContext } from '../context/Provider';
import { Navigate } from 'react-router-dom';

const StoreManagerRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (user.role == 'storeManager') {
        return children;
    }
    return <Navigate to={'/'} />;
};

export default StoreManagerRoute;