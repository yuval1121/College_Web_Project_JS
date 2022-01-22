import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import AuthContext from '../../context/auth/AuthContext';
import AlertContext from '../../context/alert/AlertContext';
import { useNavigate } from 'react-router-dom';

const Login = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const redirect = useNavigate();

  const { setAlert } = alertContext;

  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      redirect('/');
    }
    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isAuthenticated]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      login({ email, password });
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            type={'email'}
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
          />
        </div>

        <input
          type={'submit'}
          value={'Login'}
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

Login.propTypes = {};

export default Login;
