import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const submitHandler = e => {
    e.preventDefault();
  };

  return (
    <form onSubmit={submitHandler}>
      <input type="text" name="" id="" />
    </form>
  );
};

// Register.propTypes = {};

export default Register;
