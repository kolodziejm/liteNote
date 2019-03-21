import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { ClipLoader } from 'react-spinners';

import theme from '../theme';
import { REGISTER_USER } from '../queries/auth';

import LgHeading from '../components/typography/LgHeading';
import Paragraph from '../components/typography/Paragraph';
import Field from '../components/ui/Field';
import Background from '../components/ui/Background';
import FormBody from '../components/ui/FormBody';
import Logo from '../components/ui/Logo';
import Center from '../components/helpers/Center';
import CtaButton from '../components/ui/CtaButton';
import { LinkPrimary } from '../components/ui/Link';

const Register = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errors, setErrors] = useState({});

  const submitHandler = (e, registerUser) => {
    e.preventDefault();
    const validationErrors = {};
    if (username.length < 3) {
      validationErrors.username = 'Enter a username with at least 3 characters';
    }
    if (password.length < 5) {
      validationErrors.password = 'Enter a password with at least 5 characters';
    }
    if (password !== passwordConfirm) {
      validationErrors.passwordConfirm = "Passwords don't match";
    }

    if (!_.isEmpty(validationErrors)) return setErrors(validationErrors);
    registerUser()
      .then(({ data }) => {
        const { errors: errs, token } = data.register;
        if (errs.length) {
          const errObj = {};
          errs.forEach(err => {
            const { field, message } = err;
            errObj[field] = message;
          });
          return setErrors(errObj);
        }
        // eslint-disable-next-line no-undef
        localStorage.setItem('token', `Bearer ${token}`);
        return history.push('/home');
      })
      .catch(errs => {
        // eslint-disable-next-line no-console
        console.log(errs);
      });
  };

  return (
    <Mutation
      mutation={REGISTER_USER}
      variables={{ username, password, passwordConfirm }}
    >
      {(registerUser, { loading }) => {
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
                error={errors.password}
                required
              />
              <Field
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                label="Confirm password"
                value={passwordConfirm}
                changed={e => setPasswordConfirm(e.target.value)}
                error={errors.passwordConfirm}
                required
              />
              <Center margin={`0 0 ${theme.spaces.lg}px 0`}>
                <CtaButton width="12.5rem" height="3.7rem" type="submit">
                  {loading ? (
                    <span data-testid="spinner">
                      <ClipLoader
                        loading={loading}
                        color={theme.colors.secondary}
                        sizeUnit="rem"
                        size={2}
                      />
                    </span>
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

Register.propTypes = {
  history: PropTypes.shape({}),
};

Register.defaultProps = {
  history: {},
};

export default withRouter(Register);
