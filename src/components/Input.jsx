import styled from 'styled-components';

export default styled.input`
  border: 1px solid ${props => props.error ? props.theme.colors.danger : props.theme.colors.secondary};
  border-radius: ${props => props.theme.borderRadiuses.md};
  font-size: ${props => props.theme.fontSizes.sm};
  padding: ${props => `${props.theme.spacingUnit}px 0 ${props.theme.spacingUnit}px ${props.theme.spacingUnit * 2}px`};
  color: ${props => props.theme.colors.body};
  margin: ${props => props.margin};
  display: block;
  max-width: ${props => `${props.theme.spacingUnit * 36}px`};
  width: 100%;
  transition: all .3s ease-in-out;

  &::placeholder {
    font-style: italic;
    color: ${props => props.theme.colors.body};
  }
`;