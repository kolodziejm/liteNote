import React from 'react';
import PropTypes from 'prop-types';
import { ApolloConsumer } from 'react-apollo';

import NavBody from './ui/NavBody';
import Logo from './ui/Logo';
import ContentLimiter from './helpers/ContentLimiter';
import Center from './helpers/Center';

const Navbar = ({ simple, client }) => {
  // client resetStore on logout button click

  return (
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
};

Navbar.propTypes = {
  simple: PropTypes.bool,
  client: PropTypes.shape({}).isRequired,
};

Navbar.defaultProps = {
  simple: false,
};

export default props => (
  <ApolloConsumer>
    {client => <Navbar {...props} client={client} />}
  </ApolloConsumer>
);
