import styled from 'styled-components';

export default styled.div`
  min-height: 100%;
  background: ${({ theme: { colors } }) => colors.primary};
  padding: ${({ theme: { spaces } }) => `0 ${spaces.xs}px`};
`;
