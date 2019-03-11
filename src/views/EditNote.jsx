import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Prompt, withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { ClipLoader } from 'react-spinners';
import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import uniqid from 'uniqid';
import _ from 'lodash';

import {
  UPDATE_NOTE,
  GET_ALL_NOTES,
  GET_NOTE,
  DELETE_NOTE,
} from '../queries/notes';
import theme from '../theme';
import uiContext from '../uiContext';

import Navbar from '../components/Navbar';
import Field from '../components/ui/Field';
import TagForm from '../components/TagForm';
import NoteContainer from '../components/helpers/NoteContainer';
import ActionButton from '../components/ui/ActionButton';
import Helper from '../components/typography/Helper';
import Backdrop from '../components/ui/Backdrop';
import Modal from '../components/Modal';

const { spaces } = theme;

const EditNote = ({
  match: {
    params: { id },
  },
  client,
  history,
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

  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notesDiffer, setNotesDiffer] = useState(false);

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

  const saveNote = (e, updateNote) => {
    e.preventDefault();
    if (!title) return setErrors({ title: 'Set a title for the note' });
    setErrors({});
    setLoading(true);
    updateNote()
      .then(
        ({
          data: {
            createOrUpdateNote: {
              note: { title: resTitle, tags: resTags, content: resContent },
              errors: resErrors,
            },
          },
        }) => {
          resTags.forEach(
            // eslint-disable-next-line no-param-reassign
            tag => delete tag.__typename
          );
          setTitle(resTitle);
          setTags(resTags);
          setNoteContent(resContent);
          setSnapshot({
            title: resTitle,
            tags: resTags,
            content: resContent,
          });
          setLoading(false);
          setNotesDiffer(false);
          uiCtx.noteSaved = true;
        }
      )
      .catch(err => console.log(err));
  };

  const deleteNote = deleteMutation => {
    deleteMutation()
      .then(data => history.push('/home'))
      .catch(err => console.dir(err));
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await client.query({
        query: GET_NOTE,
        variables: { id: noteId },
      });
      data.getNote.tags.forEach(
        // eslint-disable-next-line no-param-reassign
        tag => delete tag.__typename
      );
      setTitle(data.getNote.title);
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
  }, []);

  useEffect(() => {
    if (title !== snapshot.title) {
      setNotesDiffer(true);
    } else {
      setNotesDiffer(false);
    }
  }, [title]);

  useEffect(() => {
    const tagNames = tags.map(tag => tag.tagName);
    const snapshotTagNames = snapshot.tags.map(tag => tag.tagName);
    if (!_.isEqual(tagNames, snapshotTagNames)) {
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

  useEffect(() => {
    if (errors.tagName) {
      setTimeout(() => {
        setErrors({ tagName: '' });
      }, 5000);
    }
  }, [errors]);

  return (
    <div data-testid="edit-note">
      <Navbar simple />
      {deleteModal && (
        <Backdrop>
          <Modal
            title="Delete note"
            description="Are you sure you want to delete this note?"
          >
            <ActionButton
              noPadding
              warning
              width="13.4rem"
              height="4.3rem"
              margin={`0 ${spaces.md}px 0 0`}
              type="button"
              onClick={() => setDeleteModal(false)}
            >
              Cancel
            </ActionButton>
            <Mutation
              mutation={DELETE_NOTE}
              variables={{ id: noteId }}
              update={(cache, { data }) => {
                const notes = cache.readQuery({ query: GET_ALL_NOTES });
                const filteredNotes = notes.getAllNotes.filter(
                  ({ _id }) => _id !== noteId
                );
                cache.writeQuery({
                  query: GET_ALL_NOTES,
                  data: {
                    getAllNotes: filteredNotes,
                  },
                });
              }}
            >
              {(deleteMutation, { deleteLoading, deleteError }) => {
                return (
                  <ActionButton
                    disabled={deleteLoading}
                    noPadding
                    danger
                    width="11rem"
                    height="4.3rem"
                    type="button"
                    onClick={() => deleteNote(deleteMutation)}
                  >
                    Delete
                  </ActionButton>
                );
              }}
            </Mutation>
          </Modal>
        </Backdrop>
      )}
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
          error={errors.tagName}
        />
        <Helper margin={`0 0 ${spaces.md}px 0`} error={errors.tagName}>
          {errors.tagName}
        </Helper>
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
                margin={`${spaces.md}px ${spaces.md}px 0 0`}
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
        <ActionButton
          noPadding
          warning
          disabled={loading}
          width="13.4rem"
          height="4.3rem"
          margin={`${spaces.md}px 0 0 0`}
          type="button"
          onClick={() => setDeleteModal(true)}
        >
          Delete note
        </ActionButton>
        <Prompt
          when={notesDiffer}
          message="You have unsaved changes, are you sure you want to leave?"
        />
      </NoteContainer>
    </div>
  );
};

EditNote.propTypes = {
  match: PropTypes.shape({}),
  client: PropTypes.shape({}),
  history: PropTypes.shape({}),
};

EditNote.defaultProps = {
  match: {},
  client: {},
  history: {},
};

export default withRouter(EditNote);
