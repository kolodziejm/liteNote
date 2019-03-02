import React from 'react';
import PropTypes from 'prop-types';

import NavBody from './ui/NavBody';
import Logo from './ui/Logo';
import ContentLimiter from './helpers/ContentLimiter';
import Center from './helpers/Center';

const Navbar = ({ simple }) => (
  <NavBody>
    <ContentLimiter>
      {simple ? (
        <Center>
          <Logo simple authenticated />
        </Center>
      ) : (
        <Logo simple authenticated />
      )}
    </ContentLimiter>
  </NavBody>
);

Navbar.propTypes = {
  simple: PropTypes.bool,
};

Navbar.defaultProps = {
  simple: false,
};

export default Navbar;
