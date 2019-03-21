import React, { useState, useContext } from 'react';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { ClipLoader } from 'react-spinners';

import theme from '../theme';
import authContext from '../authContext';
import { LOGIN_USER } from '../queries/auth';

import LgHeading from '../components/typography/LgHeading';
import Paragraph from '../components/typography/Paragraph';
import Field from '../components/ui/Field';
import Background from '../components/ui/Background';
import FormBody from '../components/ui/FormBody';
import Logo from '../components/ui/Logo';
import Center from '../components/helpers/Center';
import CtaButton from '../components/ui/CtaButton';
import { LinkPrimary } from '../components/ui/Link';
import Snackbar from '../components/ui/Snackbar';

const Login = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const authCtx = useContext(authContext);

  const loginHandler = async (e, client) => {
    e.preventDefault();
    const validationErrors = {};
    if (username.length < 3) {
      validationErrors.username = 'Incorrect username';
    }
    if (password.length < 5) {
      validationErrors.password = 'Incorrect password';
    }
    if (!_.isEmpty(validationErrors)) return setErrors(validationErrors);

    setLoading(true);
    const {
      data: { login },
      error,
    } = await client.query({
      query: LOGIN_USER,
      variables: {
        username,
        password,
      },
    });
    setLoading(false);
    // eslint-disable-next-line no-console
    if (error) console.error(error);
    if (login.errors.length) {
      const errObj = {};
      login.errors.forEach(err => {
        const { field, message } = err;
        errObj[field] = message;
      });
      return setErrors(errObj);
    }
    // eslint-disable-next-line no-undef
    localStorage.setItem('token', `Bearer ${login.token}`);
    authCtx.setAuthenticated(true);
    return history.push('/home');
  };

  if (localStorage.getItem('expiredSnackbar')) {
    setTimeout(() => localStorage.removeItem('expiredSnackbar'), 5000);
  }

  return (
    <ApolloConsumer>
      {client => (
        <Background>
          <Center>
            <Logo authenticated={false} />
          </Center>
          <FormBody
            data-testid="login-form"
            onSubmit={e => loginHandler(e, client)}
          >
            <LgHeading textAlign="center" margin={`0 0 ${theme.spaces.xl}px 0`}>
              Sign in to your account
            </LgHeading>
            <Field
              type="text"
              id="username"
              name="username"
              label="Username"
              value={username}
              changed={e => setUsername(e.target.value)}
              error={errors.username}
              required
            />
            <Field
              type="password"
              id="password"
              name="password"
              label="Password"
              value={password}
              changed={e => setPassword(e.target.value)}
              error={errors.password}
              required
            />
            <Center margin={`0 0 ${theme.spaces.lg}px 0`}>
              <CtaButton width="12.5rem" height="3.7rem" type="submit">
                {' '}
                {/* FIX WIDTH AND HEIGHT FOR LOGIN SIZE */}
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
                  'Login'
                )}
              </CtaButton>
            </Center>
            <Center>
              <Paragraph>
                Don&apos;t have an account?
                <LinkPrimary to="/register"> Register</LinkPrimary>
              </Paragraph>
            </Center>
          </FormBody>
          <Snackbar
            pose={localStorage.getItem('expiredSnackbar') ? 'on' : 'off'}
            info
          >
            Token has expired, login to your account.
          </Snackbar>
        </Background>
      )}
    </ApolloConsumer>
  );
};

Login.propTypes = {
  history: PropTypes.shape({}),
};

Login.defaultProps = {
  history: {},
};

export default withRouter(Login);
