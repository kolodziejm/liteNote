import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { ApolloConsumer } from 'react-apollo';
import authContext from '../authContext';

import NavBody from './ui/NavBody';
import Logo from './ui/Logo';
// import ContentLimiter from './helpers/ContentLimiter';
import Center from './helpers/Center';
import FlexBetween from './helpers/FlexBetween';

const NavLink = styled(Link)`
  color: ${({ theme: { colors } }) => colors.secondary};
  text-decoration: none;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.sm};
  /* font-weight: 700; */
`;

const NavLimiter = styled.div`
  margin: 0 auto;
  max-width: 1160px;
`;

const Navbar = ({ simple, landing, client }) => {
  const authCtx = useContext(authContext);

  const logoutUser = () => {
    authCtx.setAuthenticated(false);
    localStorage.removeItem('token');
    client.clearStore();
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
            <>
              <button type="button">Logout</button>
            </>
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
};

Navbar.defaultProps = {
  simple: false,
  landing: false,
};

export default props => (
  <ApolloConsumer>
    {client => <Navbar {...props} client={client} />}
  </ApolloConsumer>
);
