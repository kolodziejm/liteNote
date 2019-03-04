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
import TagForm from '../components/TagForm';

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

const NotesList = styled.ul`
  list-style: none;
  margin: 0 auto;
  max-width: 320px;

  @media only screen and (min-width: ${breakpoints.tabPort}) {
    max-width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    @supports (display: grid) {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      column-gap: ${`${spaces.md}px`};
      row-gap: ${`${spaces.md}px`};
      justify-items: center;
    }
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
      <TagForm
        addTag={addTag}
        setTagName={setTagName}
        tagName={tagName}
        tags={tags}
        placeholder="Provide a tag name and press 'Enter'"
        id="tag-search"
        name="tag-search"
      />
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
