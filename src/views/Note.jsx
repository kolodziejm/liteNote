/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components';
import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

import theme from '../theme';

import Navbar from '../components/Navbar';
import Field from '../components/ui/Field';

const { spaces } = theme;

const NoteContainer = styled.div`
  margin: 0 auto;
  max-width: 960px;
`;

const Note = () => {
  const [title, setTitle] = useState('');
  const [tagName, setTagName] = useState('');
  const [tags, setTags] = useState([]);
  const [created, setCreated] = useState(false);
  const [lastSnapshot, setLastSnapshot] = useState({});

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
      </NoteContainer>
    </div>
  );
};

export default Note;
