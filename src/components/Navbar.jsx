import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import ContentLimiter from './ContentLimiter';

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
