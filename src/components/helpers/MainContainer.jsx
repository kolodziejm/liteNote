import styled from 'styled-components';

export default styled.main`
  padding: ${({ theme: { spaces } }) =>
    `${spaces.md}px ${spaces.sm}px 0 ${spaces.sm}px`};
  position: relative;
`;
