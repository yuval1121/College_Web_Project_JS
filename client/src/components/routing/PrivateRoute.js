import React, { useContext } from 'react';
import AuthContext from '../../context/auth/AuthContext';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = props => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;

  return isAuthenticated || loading ? (
    props.children
  ) : (
    <Navigate to={'/login'} />
  );
};

PrivateRoute.propTypes = {};

export default PrivateRoute;
