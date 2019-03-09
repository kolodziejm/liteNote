import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import uniqid from 'uniqid';

import { CREATE_NOTE, GET_ALL_NOTES } from '../queries/notes';
import theme from '../theme';
import uiContext from '../uiContext';

import Navbar from '../components/Navbar';
import Field from '../components/ui/Field';
import TagForm from '../components/TagForm';
import NoteContainer from '../components/helpers/NoteContainer';
import Helper from '../components/typography/Helper';

const { spaces } = theme;

const AddNote = ({ history }) => {
  const [title, setTitle] = useState('');
  const [tagName, setTagName] = useState('');
  const [tags, setTags] = useState([]);
  const [noteContent, setNoteContent] = useState('');
  const [errors, setErrors] = useState({});

  const uiCtx = useContext(uiContext);

  const addTag = (e, newTagName) => {
    e.preventDefault();
    const tagAlreadyInArray = tags.findIndex(tag => tag.tagName === newTagName);
    if (tagAlreadyInArray !== -1) {
      return setErrors({ tagName: 'This tag is already set' });
    }

    if (tags.length >= 6)
      return setErrors({ tagName: 'Note can have a maximum of 6 tags' });
    if (newTagName.length > 30)
      return setErrors({ tagName: 'Tag name has to be at most 30 characters' });
    setErrors({});
    const newTag = { id: uniqid(), tagName: newTagName };
    setTags([...tags, newTag]);
    setTagName('');
  };

  const deleteTag = (e, tagId) => {
    e.preventDefault();
    const tagsAfterDelete = tags.filter(tag => tag.id !== tagId);
    setTags(tagsAfterDelete);
  };

  const saveNote = (e, createNote) => {
    e.preventDefault();
    if (!title) return setErrors({ title: 'Set a title for the note' });
    setErrors({});
    createNote()
      .then(({ data: { createOrUpdateNote: { note, errors: resErrors } } }) => {
        uiCtx.noteSaved = true;
        history.push(`/edit-note/${note._id}`);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (errors.tagName) {
      setTimeout(() => {
        setErrors({ tagName: '' });
      }, 5000);
    }
  }, [errors]);

  return (
    <div data-testid="add-note">
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
          error={errors.title}
          helper={errors.title}
        />
        <TagForm
          addTag={addTag}
          deleteTag={deleteTag}
          setTagName={setTagName}
          tagName={tagName}
          tags={tags}
          placeholder="Provide a tag name and press 'Enter'"
          id="create-tag"
          name="create-tag"
          label="Add tags - optional"
          error={errors.tagName}
        />
        <Helper margin={`0 0 ${spaces.md}px 0`} error={errors.tagName}>
          {errors.tagName}
        </Helper>
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
          mutation={CREATE_NOTE}
          variables={{ title, tags, content: noteContent, id: '' }}
          refetchQueries={() => [{ query: GET_ALL_NOTES }]}
        >
          {(createNote, { loading, error }) => {
            if (loading) return <p>Loading...</p>;
            return (
              <button type="submit" onClick={e => saveNote(e, createNote)}>
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
