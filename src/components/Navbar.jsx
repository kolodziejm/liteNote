import React from 'react';
import styled from 'styled-components';
import Logo from './ui/Logo';
import ContentLimiter from './helpers/ContentLimiter';

const NavBody = styled.nav`
  background-color: ${({ theme: { colors } }) => colors.primary};
  padding: ${({ theme: { spaces } }) => `${spaces.xs}px ${spaces.sm}px`};
`;

export default () => (
  <NavBody>
    <ContentLimiter>
      <Logo simple authenticated />
    </ContentLimiter>
  </NavBody>
);
