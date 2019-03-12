import styled from 'styled-components';

export default styled.main`
  padding: ${({ theme: { spaces } }) =>
    `${spaces.md}px ${spaces.sm}px ${spaces.xxl}px ${spaces.sm}px`};
  position: relative;
`;
