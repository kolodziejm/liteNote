import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

import { UPDATE_NOTE, GET_ALL_NOTES, GET_NOTE } from '../queries/notes';
import theme from '../theme';
import uiContext from '../uiContext';

import Navbar from '../components/Navbar';
import Field from '../components/ui/Field';
import TagForm from '../components/TagForm';
import NoteContainer from '../components/helpers/NoteContainer';

const { spaces } = theme;

const EditNote = ({
  match: {
    params: { id },
  },
  client,
}) => {
  const [title, setTitle] = useState('');
  const [tagName, setTagName] = useState('');
  const [tags, setTags] = useState([]);
  const [noteContent, setNoteContent] = useState('');
  const [noteId] = useState(id);
  const [errors, setErrors] = useState({});
  const [snapshot, setSnapshot] = useState({});

  const uiCtx = useContext(uiContext);

  const addTag = (e, newTagName) => {
    e.preventDefault();
    console.log(tagName);
    // ... setTags() ...
  };

  const saveNote = (e, updateNote) => {
    e.preventDefault();
    // title validation (can't be empty)
    updateNote()
      .then(({ data: { createOrUpdateNote: { note, errors: resErrors } } }) => {
        console.log(note, resErrors);
        uiCtx.noteSaved = true;
      })
      .catch(err => console.log(err));
  };

  const populateFields = async () => {
    const { data } = await client.query({
      query: GET_NOTE,
      variables: { id: noteId },
    });
    console.log(data);
    setTitle(data.getNote.title);
    setTags(data.getNote.tags);
    setNoteContent(data.getNote.content);
    setSnapshot({
      title: data.getNote.title,
      tags: data.getNote.tags,
      content: data.getNote.content,
    });
  };

  useEffect(() => {
    populateFields();
  }, []);

  return (
    <div data-testid="edit-note">
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
          data={noteContent}
          onInit={editor => {
            editor.ui.view.editable.element.parentElement.insertBefore(
              editor.ui.view.toolbar.element,
              editor.ui.view.editable.element
            );
          }}
          onChange={(event, editor) => {
            const editorContent = editor.getData();
            setNoteContent(editorContent);
          }}
          editor={DecoupledEditor}
        />
        <Mutation
          mutation={UPDATE_NOTE}
          variables={{ title, tags, content: noteContent, id: noteId }}
          refetchQueries={() => [{ query: GET_ALL_NOTES }]}
        >
          {(updateNote, { saveLoading, saveError }) => {
            if (saveLoading) return <p>Loading...</p>;
            return (
              <button type="submit" onClick={e => saveNote(e, updateNote)}>
                Save
              </button>
            );
          }}
        </Mutation>
      </NoteContainer>
    </div>
  );
};

EditNote.propTypes = {
  match: PropTypes.shape({}),
  client: PropTypes.shape({}),
};

EditNote.defaultProps = {
  match: {},
  client: {},
};

export default EditNote;
