import styled from 'styled-components';

export default styled.button`
  font-size: ${props => props.theme.fontSizes.sm};
  padding: ${props => `${props.theme.spaces.xs}px ${props.theme.spaces.lg}px`};
  color: ${props => props.theme.colors.background};
  border-radius: 50px;
  border: 1px solid ${props => props.theme.colors.lightGrey};
  cursor: pointer;
`;
