import styled from 'styled-components';

export default styled.input`
  border: 1px solid
    ${({ error, theme: { colors } }) =>
      error ? colors.danger : colors.lightGrey};
  border-radius: ${({ theme: { borderRadiuses } }) => borderRadiuses.md};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.sm};
  padding: ${({ theme: { spaces } }) =>
    `${spaces.xs}px 0 ${spaces.xs}px ${spaces.sm}px`};
  color: ${({ theme: { colors } }) => colors.body};
  margin: ${props => props.margin};
  display: block;
  width: 100%;
  transition: all 0.3s ease-in-out;
  outline: none;

  &:focus {
    border: 1px solid ${({ theme: { colors } }) => colors.primary};
  }

  &::placeholder {
    font-style: italic;
    color: ${({ theme: { colors } }) => colors.lightBody};
  }
`;
