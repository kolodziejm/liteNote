import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import img from '../assets/images/logo.png';

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

const Logo = ({ authenticated, margin }) => (
  <StyledLink margin={margin} to={authenticated ? '/home' : '/'}>
    <Image src={img} alt="liteNote" />
  </StyledLink>
);

Logo.propTypes = {
  authenticated: PropTypes.bool,
  margin: PropTypes.string,
};

Logo.defaultProps = {
  authenticated: false,
  margin: '0',
};

export default Logo;
