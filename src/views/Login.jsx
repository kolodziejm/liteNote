/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ClipLoader } from 'react-spinners';

import theme from '../theme';
import { LOGIN_USER } from '../queries/auth';

import LgHeading from '../components/typography/LgHeading';
import Paragraph from '../components/typography/Paragraph';
import Field from '../components/Field';
import Background from '../components/Background';
import FormBody from '../components/FormBody';
import Logo from '../components/Logo';
import Center from '../components/Center';
import CtaButton from '../components/CtaButton';
import { LinkPrimary } from '../components/Link';

const Login = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const loginHandler = async (e, client) => {
    e.preventDefault();
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
    console.log(login.token);
    // eslint-disable-next-line no-undef
    localStorage.setItem('token', `Bearer ${login.token}`);
    return history.push('/home');
  };

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
