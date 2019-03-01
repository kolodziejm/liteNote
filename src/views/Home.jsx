/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { ClipLoader } from 'react-spinners';

import theme from '../theme';
import { GET_ALL_NOTES } from '../queries/notes';

import Navbar from '../components/Navbar';
import ContentLimiter from '../components/helpers/ContentLimiter';
import MainContainer from '../components/helpers/MainContainer';
import Input from '../components/ui/Input';
import Label from '../components/typography/Label';
import Button from '../components/ui/Button';
import Center from '../components/helpers/Center';
import Note from '../components/Note';

import FlexList from '../components/helpers/FlexList';
import Tag from '../components/ui/Tag';

const { spaces, breakpoints } = theme;

const SearchContainer = styled.div`
  margin-bottom: ${() => `${spaces.xxl}px`};
  @media only screen and (min-width: ${breakpoints.tabLand}) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
  margin: ${`0 0 ${spaces.sm}px 0`};

  @media only screen and (min-width: ${breakpoints.tabLand}) {
    margin: ${`0 ${spaces.sm}px 0 0`};
  }
`;

const SearchForm = styled.form`
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
`;

const NotesList = styled.ul`
  list-style: none;
  margin: 0 auto;
  max-width: 320px;

  @media only screen and (min-width: ${breakpoints.tabPort}) {
    max-width: 100%;
    @supports (display: grid) {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      column-gap: ${`${spaces.md}px`};
      row-gap: ${`${spaces.md}px`};
      justify-items: center;
    }
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
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
          margin={`0 0 ${spaces.xs}px 0`}
        />
        <input type="submit" style={{ display: 'none' }} />
        {/* Try Dynamic tags here */}
        <FlexList>
          <Tag name="Some tag" clicked={() => {}} />
          <Tag name="Some tag name" clicked={() => {}} />
          <Tag name="Some tag name long" clicked={() => {}} />
        </FlexList>
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
    // ... setTags() ...
  };

  const searchByTitle = () => {};

  return (
    <div data-testid="home-page">
      <Query query={GET_ALL_NOTES}>
        {({ data, loading, error }) => {
          console.log(data, loading);
          return (
            <>
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
                  {loading ? (
                    <Center>
                      <ClipLoader
                        loading={loading}
                        color={theme.colors.secondary}
                        sizeUnit="rem"
                        size={6}
                      />
                    </Center>
                  ) : (
                    <NotesList>
                      {data.getAllNotes.map(
                        ({
                          _id,
                          title: noteTitle,
                          excerpt,
                          tags: noteTags,
                        }) => {
                          const tagList = noteTags.map(
                            ({ _id: tagId, tagName: name }) => (
                              <div key={tagId}>{name}</div>
                            )
                          );
                          return (
                            <Note
                              key={_id}
                              title={noteTitle}
                              excerpt={excerpt}
                              tags={noteTags}
                              margin={`0 0 ${spaces.md}px 0`}
                            />
                          );
                        }
                      )}
                    </NotesList>
                  )}
                </MainContainer>
              </ContentLimiter>
            </>
          );
        }}
      </Query>
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
