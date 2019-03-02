import styled from 'styled-components';

export default styled.nav`
  background-color: ${({ theme: { colors } }) => colors.primary};
  padding: ${({ theme: { spaces } }) => `${spaces.xs}px ${spaces.sm}px`};
`;
