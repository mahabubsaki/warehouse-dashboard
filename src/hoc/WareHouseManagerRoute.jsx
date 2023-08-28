import React, { useContext } from 'react';
import { AuthContext } from '../context/Provider';
import { Navigate } from 'react-router-dom';

const WareHouseManagerRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (user.role == 'warehouseManager') {
        return children;
    }
    return <Navigate to={'/'} />;
};

export default WareHouseManagerRoute;