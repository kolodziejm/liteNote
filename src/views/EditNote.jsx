import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { ClipLoader } from 'react-spinners';
import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import uniqid from 'uniqid';
import _ from 'lodash';

import { UPDATE_NOTE, GET_ALL_NOTES, GET_NOTE } from '../queries/notes';
import theme from '../theme';
import uiContext from '../uiContext';

import Navbar from '../components/Navbar';
import Field from '../components/ui/Field';
import TagForm from '../components/TagForm';
import NoteContainer from '../components/helpers/NoteContainer';
import ActionButton from '../components/ui/ActionButton';

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
  const [snapshot, setSnapshot] = useState({
    title: '',
    tags: [],
    noteContent: '',
  });

  const [loading, setLoading] = useState(true);
  const [notesDiffer, setNotesDiffer] = useState(false);

  const uiCtx = useContext(uiContext);

  const addTag = (e, newTagName) => {
    e.preventDefault();
    if (loading) return;
    const newTag = { id: uniqid(), tagName: newTagName };
    setTags([...tags, newTag]);
    setTagName('');
  };

  const deleteTag = (e, tagId) => {
    e.preventDefault();
    const tagsAfterDelete = tags.filter(tag => tag.id !== tagId);
    setTags(tagsAfterDelete);
  };

  const saveNote = (e, updateNote) => {
    e.preventDefault();
    if (!title) return setErrors({ title: 'Set a title for the note' });
    setErrors({});
    updateNote()
      .then(({ data: { createOrUpdateNote: { errors: resErrors } } }) => {
        // set snapshot to the response, change updateNote fields
        console.log(resErrors);
        uiCtx.noteSaved = true;
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await client.query({
        query: GET_NOTE,
        variables: { id: noteId },
      });
      const noTypenameTags = data.getNote.tags.map(
        // eslint-disable-next-line no-param-reassign
        tag => delete tag.__typename
      );
      await setTitle(data.getNote.title);
      setTags(data.getNote.tags);
      setNoteContent(data.getNote.content);
      setSnapshot({
        title: data.getNote.title,
        tags: data.getNote.tags,
        content: data.getNote.content,
      });
      setLoading(false);
      setNotesDiffer(false);
    };
    fetchData();
    console.log(noteContent);
  }, []);

  useEffect(() => {
    if (title !== snapshot.title) {
      setNotesDiffer(true);
    } else {
      setNotesDiffer(false);
    }
  }, [title]);

  useEffect(() => {
    if (!_.isEqual(tags, snapshot.tags)) {
      setNotesDiffer(true);
    } else {
      setNotesDiffer(false);
    }
  }, [tags]);

  useEffect(() => {
    if (noteContent !== snapshot.content) {
      setNotesDiffer(true);
    } else {
      setNotesDiffer(false);
    }
  }, [noteContent]);

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
          marginBottom={`${spaces.md}px`}
        />
        <CKEditor
          data={noteContent}
          disabled={loading}
          onInit={editor => {
            editor.ui.view.editable.element.parentElement.insertBefore(
              editor.ui.view.toolbar.element,
              editor.ui.view.editable.element
            );
            editor.setData('<p>&nbsp;</p>');
          }}
          onChange={(event, editor) => {
            const content = editor.getData();
            setNoteContent(content);
          }}
          editor={DecoupledEditor}
        />
        <Mutation
          mutation={UPDATE_NOTE}
          variables={{ title, tags, content: noteContent, id: noteId }}
          refetchQueries={() => [
            { query: GET_ALL_NOTES },
            { query: GET_NOTE, variables: { id: noteId } },
          ]}
        >
          {(updateNote, { saveLoading, saveError }) => {
            return (
              <ActionButton
                noPadding
                success
                disabled={loading || saveLoading || !notesDiffer}
                width="13.4rem"
                height="4.3rem"
                margin={`${spaces.md}px 0 0 0`}
                type="submit"
                onClick={e => saveNote(e, updateNote)}
              >
                {loading || saveLoading ? (
                  <span data-testid="spinner">
                    <ClipLoader
                      loading={loading}
                      color={theme.colors.primary}
                      sizeUnit="rem"
                      size={2}
                    />
                  </span>
                ) : (
                  'Save note'
                )}
              </ActionButton>
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
