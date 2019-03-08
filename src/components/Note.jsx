import React from 'react';
import PropTypes from 'prop-types';

import theme from '../theme';

import Card from './ui/Card';
import MdHeading from './typography/MdHeading';
import Paragraph from './typography/Paragraph';

import SimpleTag from './ui/SimpleTag';
import FlexList from './helpers/FlexList';

const { spaces } = theme;

const Note = ({ title, excerpt, margin, tags }) => (
  <Card maxWidth="320px" margin={margin}>
    <MdHeading margin={`0 0 ${spaces.sm}px 0`}>{title}</MdHeading>
    <FlexList>
      {tags.map(({ id, tagName }) => (
        <SimpleTag key={id}>{tagName}</SimpleTag>
      ))}
    </FlexList>
    <Paragraph>{excerpt}</Paragraph>
  </Card>
);

Note.propTypes = {
  title: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.object),
  excerpt: PropTypes.string,
  margin: PropTypes.string,
};

Note.defaultProps = {
  tags: [],
  excerpt: '',
  margin: '0',
};

export default Note;
