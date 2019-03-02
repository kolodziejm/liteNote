/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components';
import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

import theme from '../theme';

import Navbar from '../components/Navbar';
import Field from '../components/ui/Field';
import TagForm from '../components/TagForm';

const { spaces } = theme;

const NoteContainer = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: ${`${spaces.xl}px ${spaces.xs}px`};
`;

const AddNote = () => {
  const [title, setTitle] = useState('');
  const [tagName, setTagName] = useState('');
  const [tags, setTags] = useState([]);
  const [created, setCreated] = useState(false);
  const [lastSnapshot, setLastSnapshot] = useState({});

  const addTag = (e, newTagName) => {
    e.preventDefault();
    console.log(tagName);
    // ... setTags() ...
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
          changed={() => {}}
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
        />
        <CKEditor
          onInit={editor => {
            console.log('Editor is ready to use!', editor);
            editor.ui.view.editable.element.parentElement.insertBefore(
              editor.ui.view.toolbar.element,
              editor.ui.view.editable.element
            );
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log(data);
          }}
          editor={DecoupledEditor}
        />
      </NoteContainer>
    </div>
  );
};

export default AddNote;
