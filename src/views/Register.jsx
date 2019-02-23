import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ClipLoader } from 'react-spinners';

import theme from '../theme';
import { REGISTER_USER } from '../queries/auth';

import LgHeading from '../components/typography/LgHeading';
import Paragraph from '../components/typography/Paragraph';
import Field from '../components/Field';
import Background from '../components/Background';
import FormBody from '../components/FormBody';
import Logo from '../components/Logo';
import Center from '../components/Center';
import CtaButton from '../components/CtaButton';
import { LinkPrimary } from '../components/Link';

/* eslint-disable no-unused-vars */

const Register = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errors, setErrors] = useState({});

  const submitHandler = (e, registerUser) => {
    e.preventDefault();
    registerUser()
      .then(data => {
        console.log(data);
        // if errors - set errors and return. Otherwise set the token and push to home
      })
      .catch(errs => {
        /* eslint-disable */
        console.log(errs);
        /* eslint-disable  */
      });
  };

  return (
    <Mutation
      mutation={REGISTER_USER}
      variables={{ username, password, passwordConfirm }}
    >
      {(registerUser, { data, loading }) => {
        return (
          <Background>
            <Center>
              <Logo authenticated={false} />
            </Center>
            <FormBody
              data-testid="register-form"
              onSubmit={e => submitHandler(e, registerUser)}
            >
              <LgHeading
                textAlign="center"
                margin={`0 0 ${theme.spaces.xl}px 0`}
              >
                Create account
              </LgHeading>
              <Field
                type="text"
                id="username"
                name="username"
                label="Username"
                helper="Must be at least 3 characters long"
                value={username}
                changed={e => setUsername(e.target.value)}
                error={errors.username}
                required
              />
              <Field
                type="password"
                id="password"
                name="password"
                helper="Must be at least 5 characters long"
                label="Password"
                value={password}
                changed={e => setPassword(e.target.value)}
                required
              />
              <Field
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                label="Confirm password"
                value={passwordConfirm}
                changed={e => setPasswordConfirm(e.target.value)}
                required
              />
              <Center margin={`0 0 ${theme.spaces.lg}px 0`}>
                <CtaButton width="12.5rem" height="3.7rem" type="submit">
                  {loading ? (
                    <ClipLoader
                      loading={loading}
                      color={theme.colors.secondary}
                      sizeUnit="rem"
                      size={2}
                    />
                  ) : (
                    'Register'
                  )}
                </CtaButton>
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
      }}
    </Mutation>
  );
};

/* eslint-disable no-unused-vars */

Register.propTypes = {
  history: PropTypes.shape({}),
};

Register.defaultProps = {
  history: {},
};

export default withRouter(Register);
