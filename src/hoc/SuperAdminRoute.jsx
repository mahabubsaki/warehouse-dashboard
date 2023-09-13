import React, { useContext } from 'react';

import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/Provider';

const SuperAdminRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (user.role == 'warehouseManager' || user.role == 'admin' || user.role == 'warehouseAdmin') {
        return children;
    }
    return <Navigate to={'/'} />;
};

export default SuperAdminRoute;