import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { ApolloConsumer } from 'react-apollo';
import authContext from '../authContext';

import theme from '../theme';

import NavBody from './ui/NavBody';
import Logo from './ui/Logo';
import Center from './helpers/Center';
import FlexBetween from './helpers/FlexBetween';
import CtaButton from './ui/CtaButton';

const { spaces } = theme;

const NavLink = styled(Link)`
  color: ${({ theme: { colors } }) => colors.secondary};
  text-decoration: none;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.sm};
  margin: ${({ margin }) => margin};
  /* font-weight: 700; */
`;

const NavLimiter = styled.div`
  margin: 0 auto;
  max-width: 1160px;
`;

const Navbar = ({ simple, landing, client, history }) => {
  const authCtx = useContext(authContext);

  console.log(history);

  const logoutUser = () => {
    authCtx.setAuthenticated(false);
    localStorage.removeItem('token');
    client.clearStore();
  };

  const redirectToRegister = () => {
    history.push('/register');
  };

  return (
    <NavBody>
      <NavLimiter>
        {simple ? (
          <Center>
            <Logo simple authenticated />
          </Center>
        ) : landing ? (
          <FlexBetween>
            <Logo simple />
            <div>
              <NavLink to="/login" margin={`0 ${spaces.md}px 0 0`}>
                Login
              </NavLink>
              <CtaButton
                onClick={redirectToRegister}
                width="11.5rem"
                height="3.7rem"
              >
                Register
              </CtaButton>
            </div>
          </FlexBetween>
        ) : (
          <FlexBetween>
            <Logo simple authenticated />
            <NavLink onClick={logoutUser} to="/login">
              Logout
            </NavLink>
          </FlexBetween>
        )}
      </NavLimiter>
    </NavBody>
  );
};

Navbar.propTypes = {
  simple: PropTypes.bool,
  landing: PropTypes.bool,
  client: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
};

Navbar.defaultProps = {
  simple: false,
  landing: false,
};

export default withRouter(props => (
  <ApolloConsumer>
    {client => <Navbar {...props} client={client} />}
  </ApolloConsumer>
));
