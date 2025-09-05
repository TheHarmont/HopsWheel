import React from 'react';
import { Navigate } from 'react-router-dom';
import { hasRole } from '../utils/usersAuth';
import { isAuthenticated }  from '../services/auth.service';

const PrivateRoute = ({ children, requiredRole }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && !hasRole(requiredRole)) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default PrivateRoute;