import styled from 'styled-components';

export default styled.button`
  font-size: ${({ theme: { fontSizes } }) => fontSizes.sm};
  font-family: inherit;
  padding: ${({ noPadding, theme: { spaces } }) =>
    noPadding ? '0' : `${spaces.xs}px ${spaces.lg}px`};
  color: ${({ theme: { colors } }) => colors.background};
  border-radius: 50px;
  border: 1px solid ${({ theme: { colors } }) => colors.lightGrey};
  cursor: pointer;
  width: ${props => props.width};
  height: ${props => props.height};
  margin: ${props => props.margin};
  outline-color: ${({ theme: { colors } }) => colors.secondary};
`;
