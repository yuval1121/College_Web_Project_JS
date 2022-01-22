import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Register = props => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    role: '',
    table: null,
  });

  const { name, email, password, password2 } = user;

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log('Register submit');
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type={'text'}
            name='name'
            value={name}
            onChange={onChange}></input>
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            type={'email'}
            name='email'
            value={email}
            onChange={onChange}></input>
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}></input>
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm password</label>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}></input>
        </div>

        <input
          type={'submit'}
          value={'Register'}
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

Register.propTypes = {};

export default Register;
