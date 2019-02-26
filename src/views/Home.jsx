/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';

import theme from '../theme';

import Navbar from '../components/Navbar';
import ContentLimiter from '../components/ContentLimiter';
import MainContainer from '../components/MainContainer';
import Input from '../components/Input';
import Label from '../components/typography/Label';
import Button from '../components/Button';

const { spaces } = theme;

const SearchContainer = styled.div`
  @media only screen and (min-width: ${({ theme: { breakpoints } }) =>
    breakpoints.tabLand}) {
    display: flex;
    justify-content: center;
    align-items: center;
  }}
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin: ${`0 0 ${spaces.sm}px 0`};

  @media only screen and (min-width: ${({ theme: { breakpoints } }) =>
      breakpoints.tabLand}) {
    margin: ${`0 ${spaces.sm}px 0 0`};
  }
`;

// const Search = ({ searchMethod, }) => (
//   <SearchContainer>
//             <ButtonContainer>
//               <Label margin={`0 ${spaces.sm}px 0 0`}>Search by:</Label>
//               <Button margin={`0 ${spaces.xs}px 0 0`} selected>
//                 Title
//               </Button>
//               <Button>Tags</Button>
//             </ButtonContainer>
//             {searchMethod === 'title' ? (
//               <Input placeholder="Start typing the title..." />
//             ) : (
//               <Input placeholder="Enter the tag name and press 'Enter'" />
//             )}
//           </SearchContainer>
// );

const Home = ({ history }) => {
  const [searchMethod, setSearchMethod] = useState('title');
  const [title, setTitle] = useState('');
  const [tagName, setTagName] = useState('');
  const [tags, setTags] = useState([]);

  return (
    <div data-testid="home-page">
      <Navbar />
      <ContentLimiter>
        <MainContainer>
          <SearchContainer>
            <ButtonContainer>
              <Label margin={`0 ${spaces.sm}px 0 0`}>Search by:</Label>
              <Button margin={`0 ${spaces.xs}px 0 0`} selected>
                Title
              </Button>
              <Button>Tags</Button>
            </ButtonContainer>
            {searchMethod === 'title' ? (
              <Input placeholder="Start typing the title..." />
            ) : (
              <Input placeholder="Enter the tag name and press 'Enter'" />
            )}
          </SearchContainer>
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
