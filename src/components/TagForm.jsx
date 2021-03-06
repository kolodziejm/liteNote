import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import theme from '../theme';
import FlexList from './helpers/FlexList';
import Input from './ui/Input';
import Tag from './ui/Tag';
import Label from './typography/Label';

const { spaces } = theme;

const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  margin-bottom: ${({ marginBottom }) => marginBottom};
`;

const TagForm = ({
  addTag,
  deleteTag,
  tagName,
  setTagName,
  tags,
  placeholder,
  id,
  name,
  label,
  marginBottom,
  error,
}) => (
  <Form marginBottom={marginBottom} onSubmit={e => addTag(e, tagName)}>
    {label && (
      <Label margin={`0 0 ${spaces.xxs}px ${spaces.xxs}px`} htmlFor={id}>
        {label}
      </Label>
    )}
    <Input
      value={tagName}
      onChange={e => setTagName(e.target.value)}
      placeholder={placeholder}
      margin={`0 0 ${spaces.xs}px 0`}
      required
      id={id}
      name={name}
      error={error}
    />
    <input type="submit" style={{ display: 'none' }} />
    <FlexList>
      {tags.map(({ id: tagId, tagName: tName }) => (
        <Tag key={tagId} name={tName} clicked={e => deleteTag(e, tagId)} />
      ))}
    </FlexList>
  </Form>
);

TagForm.propTypes = {
  addTag: PropTypes.func.isRequired,
  deleteTag: PropTypes.func.isRequired,
  tagName: PropTypes.string.isRequired,
  setTagName: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.object),
  placeholder: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  marginBottom: PropTypes.string,
  error: PropTypes.string,
};

TagForm.defaultProps = {
  tags: [],
  placeholder: '',
  label: '',
  marginBottom: '0',
  error: '',
};

export default TagForm;
