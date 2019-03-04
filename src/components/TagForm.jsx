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
  tagName,
  setTagName,
  tags,
  placeholder,
  id,
  name,
  label,
  marginBottom,
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
    />
    <input type="submit" style={{ display: 'none' }} />
    <FlexList>
      {/* OUTPUT TAGS HERE */}
      <Tag name="Some tag" clicked={() => {}} />
      <Tag name="Some tag name" clicked={() => {}} />
      <Tag name="Some tag name long" clicked={() => {}} />
    </FlexList>
  </Form>
);

TagForm.propTypes = {
  addTag: PropTypes.func.isRequired,
  tagName: PropTypes.string.isRequired,
  setTagName: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.object),
  placeholder: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  marginBottom: PropTypes.string,
};

TagForm.defaultProps = {
  tags: [],
  placeholder: '',
  label: '',
  marginBottom: '0',
};

export default TagForm;
