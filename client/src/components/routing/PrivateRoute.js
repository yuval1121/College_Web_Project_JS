import React, { useContext } from 'react';
import AuthContext from '../../context/auth/AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = props => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;

  return isAuthenticated || loading ? (
    props.children
  ) : (
    <Navigate to={'/login'} />
  );
};

export default PrivateRoute;
