/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';

import Navbar from '../components/Navbar';
import ContentLimiter from '../components/ContentLimiter';
import MainContainer from '../components/MainContainer';
import Input from '../components/Input';
import Label from '../components/typography/Label';
import Button from '../components/Button';

const Home = ({ history }) => {
  return (
    <div data-testid="home-page">
      <Navbar />
      <ContentLimiter>
        <MainContainer>
          <Button>Title</Button>
          <Button>Tags</Button>
        </MainContainer>
      </ContentLimiter>
    </div>
  );
};

Home.propTypes = {
  history: PropTypes.shape({}),
};

Home.defaultProps = {
  history: {},
};

export default withRouter(Home);
