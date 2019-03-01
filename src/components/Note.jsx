import React from 'react';
import PropTypes from 'prop-types';

import theme from '../theme';

import Card from './ui/Card';
import MdHeading from './typography/MdHeading';
import Paragraph from './typography/Paragraph';

import SimpleTag from './ui/SimpleTag';
import FlexList from './helpers/FlexList';

const { spaces } = theme;

const Note = ({ title, excerpt, margin }) => (
  <Card maxWidth="320px" margin={margin}>
    <MdHeading margin={`0 0 ${spaces.sm}px 0`}>{title}</MdHeading>
    <FlexList>
      <SimpleTag>Tag 1</SimpleTag>
      <SimpleTag>Tag 2</SimpleTag>
      <SimpleTag>Tag 3 longer</SimpleTag>
      <SimpleTag>Tag 4 extremely long</SimpleTag>
    </FlexList>
    <Paragraph>{excerpt}</Paragraph>
  </Card>
);

Note.propTypes = {
  title: PropTypes.string.isRequired,
  // tags: PropTypes.arrayOf(PropTypes.object),
  excerpt: PropTypes.string,
  margin: PropTypes.string,
};

Note.defaultProps = {
  // tags: [],
  excerpt: '',
  margin: '0',
};

export default Note;
