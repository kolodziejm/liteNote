import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TagBody = styled.li`
  list-style: none;
  background-color: ${({ theme: { colors } }) => colors.primary};
  color: ${({ theme: { colors } }) => colors.white};
  padding: ${({ theme: { spaces } }) =>
    `${spaces.xxs}px 4px ${spaces.xxs}px ${spaces.sm}px `};
  margin: ${({ theme: { spaces } }) => `0 ${spaces.xs}px ${spaces.xs}px 0`};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.xs};
  border: 0;
  border-radius: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TagContent = styled.p`
  margin-right: ${({ theme: { spaces } }) => `${spaces.sm}px`};
`;

const DeleteButton = styled.button`
  cursor: pointer;
  border-radius: 50%;
  border: 0;
  background-color: ${({ theme: { colors } }) => colors.white};
  color: ${({ theme: { colors } }) => colors.danger};
  padding: ${({ theme: { spaces } }) => `${spaces.xxs}px`};
`;

const Tag = ({ name, clicked }) => (
  <TagBody>
    <TagContent>{name}</TagContent>
    <DeleteButton onClick={clicked}>X</DeleteButton>
  </TagBody>
);

Tag.propTypes = {
  name: PropTypes.string.isRequired,
  clicked: PropTypes.func.isRequired,
};

export default Tag;
