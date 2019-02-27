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

const SearchForm = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
`;

const Search = ({
  searchMethod,
  setSearchMethod,
  title,
  setTitle,
  tagName,
  setTagName,
  tags,
  addTag,
}) => (
  <SearchContainer>
    <ButtonContainer>
      <Label margin={`0 ${spaces.sm}px 0 0`}>Search by:</Label>
      <Button
        margin={`0 ${spaces.xs}px 0 0`}
        selected={searchMethod === 'title'}
        onClick={() => setSearchMethod('title')}
      >
        Title
      </Button>
      <Button
        selected={searchMethod === 'tags'}
        onClick={() => setSearchMethod('tags')}
      >
        Tags
      </Button>
    </ButtonContainer>
    {searchMethod === 'title' ? (
      <Input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Start typing the title..."
      />
    ) : (
      <SearchForm onSubmit={e => addTag(e, tagName)}>
        <Input
          value={tagName}
          onChange={e => setTagName(e.target.value)}
          placeholder="Enter the tag name and press 'Enter'"
        />
        <input type="submit" style={{ display: 'none' }} />
      </SearchForm>
    )}
  </SearchContainer>
);

const Home = ({ history }) => {
  const [searchMethod, setSearchMethod] = useState('title');
  const [title, setTitle] = useState('');
  const [tagName, setTagName] = useState('');
  const [tags, setTags] = useState([]);

  const addTag = (e, newTagName) => {
    e.preventDefault();
    console.log(tagName);
  };

  return (
    <div data-testid="home-page">
      <Navbar />
      <ContentLimiter>
        <MainContainer>
          <Search
            searchMethod={searchMethod}
            setSearchMethod={setSearchMethod}
            title={title}
            setTitle={setTitle}
            tagName={tagName}
            setTagName={setTagName}
            tags={tags}
            addTag={addTag}
          />
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

Search.propTypes = {
  searchMethod: PropTypes.string.isRequired,
  setSearchMethod: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  setTagName: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  tagName: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withRouter(Home);
