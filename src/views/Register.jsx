import React, { useState } from 'react';

import theme from '../theme';

import LgHeading from '../components/typography/LgHeading';
import Paragraph from '../components/typography/Paragraph';
import Field from '../components/Field';
import Background from '../components/Background';
import FormBody from '../components/FormBody';
import Logo from '../components/Logo';
import Center from '../components/Center';
import CtaButton from '../components/CtaButton';
import { LinkPrimary } from '../components/Link';

const Register = () => {
  const [username] = useState('');
  const [password] = useState('');
  const [passwordConfirm] = useState('');
  // const [errors, setErrors] = useState({});

  // useEffect

  // const submitHandler = e => {
  //   e.preventDefault();
  // };

  return (
    <Background>
      <Center>
        <Logo authenticated={false} transform="translateX()" />
      </Center>
      <FormBody>
        <LgHeading textAlign="center" margin={`0 0 ${theme.spaces.xl}px 0`}>
          Create account
        </LgHeading>
        <Field
          type="text"
          id="username"
          name="username"
          label="Username"
          helper="Must be at least 3 characters long"
          value={username}
          changed={() => {}}
          required
        />
        <Field
          type="password"
          id="password"
          name="password"
          helper="Must be at least 5 characters long"
          label="Password"
          value={password}
          changed={() => {}}
          required
        />
        <Field
          type="password"
          id="passwordConfirm"
          name="passwordConfirm"
          label="Confirm password"
          value={passwordConfirm}
          changed={() => {}}
          required
        />
        <Center margin={`0 0 ${theme.spaces.lg}px 0`}>
          <CtaButton type="submit">Register</CtaButton>
        </Center>
        <Center>
          <Paragraph>
            Already a user?
            <LinkPrimary to="/login"> Login</LinkPrimary>
          </Paragraph>
        </Center>
      </FormBody>
    </Background>
  );
};

// Register.propTypes = {};

export default Register;
