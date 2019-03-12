import styled from 'styled-components';

const NoteContainer = styled.div`
  margin: 0 auto;
  max-width: 986px;
  padding: ${({ theme: { spaces } }) =>
    `${spaces.md}px ${spaces.xs}px ${spaces.xl}px ${spaces.xs}px`};
  position: relative;

  @media only screen and (min-width: ${({ theme: { breakpoints } }) =>
      breakpoints.desktop}) {
    padding: ${({ theme: { spaces } }) => `${spaces.xl}px 0`};
  }
`;

export default NoteContainer;
