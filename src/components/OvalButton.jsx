import styled from 'styled-components';

export default styled.button`
  font-size: ${props => props.theme.fontSizes.sm};
  font-family: inherit;
  padding: ${props =>
    props.noPadding
      ? '0'
      : `${props.theme.spaces.xs}px ${props.theme.spaces.lg}px`};
  color: ${props => props.theme.colors.background};
  border-radius: 50px;
  border: 1px solid ${props => props.theme.colors.lightGrey};
  cursor: pointer;
  width: ${props => props.width};
  height: ${props => props.height};
`;
