import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import theme from '../theme';

import MdHeading from './typography/MdHeading';
import Paragraph from './typography/Paragraph';

const ModalBody = styled.div`
  background-color: ${({ theme: { colors } }) => colors.background};
  border-radius: ${({ theme: { borderRadiuses } }) => borderRadiuses.lg};
  padding: ${({ theme: { spaces } }) => `${spaces.md}px ${spaces.sm}px`};
  max-width: ${({ theme: { spacingUnit } }) => `${spacingUnit * 50}px`};
  box-shadow: 0 3px 6px ${({ theme: { colors } }) => colors.lightBody};
  margin: 0 auto;

  @media only screen and (min-width: ${({ theme: { breakpoints } }) =>
      breakpoints.tabLand}) {
    padding: ${({ theme: { spaces } }) => `${spaces.lg}px ${spaces.md}px`};
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const { spaces } = theme;

const Modal = ({ title, description, children }) => (
  <ModalBody>
    <MdHeading margin={`0 0 ${spaces.md}px 0`}>{title}</MdHeading>
    <Paragraph margin={`0 0 ${spaces.md}px 0`}>{description}</Paragraph>
    <Actions>{children}</Actions>
  </ModalBody>
);

Modal.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
};

Modal.defaultProps = {
  title: '',
  description: '',
  children: '',
};

export default Modal;
