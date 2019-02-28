import styled from 'styled-components';

export default styled.button`
  cursor: pointer;
  padding: ${({ theme: { spaces } }) => `${spaces.xxs}px ${spaces.sm}px`};
  font-family: inherit;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.sm};
  background: ${({ selected, theme: { colors } }) =>
    selected ? colors.primary : colors.white};
  color: ${({ selected, theme: { colors } }) =>
    selected ? colors.white : colors.body};
  border: 1px solid ${({ theme: { colors } }) => colors.lightGrey};
  margin: ${props => props.margin};
  outline-color: ${({ theme: { colors } }) => colors.secondary};
  transition: all 0.3s ease-in-out;
`;
