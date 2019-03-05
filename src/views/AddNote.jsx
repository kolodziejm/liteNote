import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

import { CREATE_OR_UPDATE_NOTE, GET_ALL_NOTES } from '../queries/notes';
import theme from '../theme';
import uiContext from '../uiContext';

import Navbar from '../components/Navbar';
import Field from '../components/ui/Field';
import TagForm from '../components/TagForm';
import NoteContainer from '../components/helpers/NoteContainer';

const { spaces } = theme;

const AddNote = ({ history }) => {
  const [title, setTitle] = useState('');
  const [tagName, setTagName] = useState('');
  const [tags, setTags] = useState([]);
  const [noteContent, setNoteContent] = useState('');
  const [noteId, setNoteId] = useState('');
  const [lastSnapshot, setLastSnapshot] = useState({});
  const [errors, setErrors] = useState({});

  const uiCtx = useContext(uiContext);

  const addTag = (e, newTagName) => {
    e.preventDefault();
    console.log(tagName);
    // ... setTags() ...
  };

  const saveNote = (e, createOrUpdateNote) => {
    e.preventDefault();
    // title validation (can't be empty)
    createOrUpdateNote()
      .then(({ data: { createOrUpdateNote: { note, errors: resErrors } } }) => {
        uiCtx.noteSaved = true;
        history.push(`/edit-note/${note._id}`); // redirect user to a single note page  - editNote view - /edit-note/:id path. Better UX, if he'd refresh the page it won't be blank, it will be filled with the created note data.
      })
      .catch(err => console.log(err));
  };

  return (
    <div data-testid="note-view">
      <Navbar simple />
      <NoteContainer>
        <Field
          id="title"
          label="Title"
          name="title"
          type="text"
          required
          value={title}
          changed={e => setTitle(e.target.value)}
        />
        <TagForm
          addTag={addTag}
          setTagName={setTagName}
          tagName={tagName}
          tags={tags}
          placeholder="Provide a tag name and press 'Enter'"
          id="create-tag"
          name="create-tag"
          label="Add tags - optional"
          marginBottom={`${spaces.md}px`}
        />
        <CKEditor
          onInit={editor => {
            editor.ui.view.editable.element.parentElement.insertBefore(
              editor.ui.view.toolbar.element,
              editor.ui.view.editable.element
            );
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setNoteContent(data);
          }}
          editor={DecoupledEditor}
        />
        <Mutation
          mutation={CREATE_OR_UPDATE_NOTE}
          variables={{ title, tags, content: noteContent, id: noteId }}
          refetchQueries={() => [{ query: GET_ALL_NOTES }]}
        >
          {(createOrUpdateNote, { loading, error }) => {
            if (loading) return <p>Loading...</p>;
            return (
              <button
                type="submit"
                onClick={e => saveNote(e, createOrUpdateNote)}
              >
                Save
              </button>
            );
          }}
        </Mutation>
      </NoteContainer>
    </div>
  );
};

AddNote.propTypes = {
  history: PropTypes.shape({}),
};

AddNote.defaultProps = {
  history: {},
};

export default withRouter(AddNote);
