import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from './Common';


// handle the private routes
function PrivateRoute({ children }) {

    return getToken() ? children : <Navigate to="/login" />;
}

export default PrivateRoute;