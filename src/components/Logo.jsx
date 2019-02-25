import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import logo from '../assets/images/logo.png';
import simpleLogo from '../assets/images/simple-logo.png';

const StyledLink = styled(Link)`
  display: inline-block;
  margin: ${props => props.margin};
`;

const Image = styled.img`
  width: ${props => props.theme.spacingUnit * 15}px;
  @media only screen and (min-width: ${props =>
    props.theme.breakpoints.tabPort}) {
    width: ${props => props.theme.spacingUnit * 18}px;
  }
  /* @media only screen and (min-width: ${props =>
    props.theme.breakpoints.tabLand}) {
    width: ${props => props.theme.spacingUnit * 25}px;
  } */
`;

const SimpleImage = styled.img`
  width: ${props => props.theme.spacingUnit * 6}px;
  @media only screen and (min-width: ${props =>
      props.theme.breakpoints.tabPort}) {
    width: ${props => props.theme.spacingUnit * 7}px;
  }
`;

const Logo = ({ authenticated, margin, simple }) => (
  <StyledLink margin={margin} to={authenticated ? '/home' : '/'}>
    {simple ? (
      <SimpleImage src={simpleLogo} alt="liteNote" />
    ) : (
      <Image src={logo} alt="liteNote" />
    )}
  </StyledLink>
);

Logo.propTypes = {
  authenticated: PropTypes.bool,
  margin: PropTypes.string,
  simple: PropTypes.bool,
};

Logo.defaultProps = {
  authenticated: false,
  simple: false,
  margin: '0',
};

export default Logo;
