import styled from 'styled-components';

export default styled.form`
  padding: ${props => `${props.theme.spaces.lg}px ${props.theme.spaces.sm}px`};
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.body};
  max-width: ${props => `${props.theme.spacingUnit * 55}px`};
  margin: 0 auto;
  border-radius: ${props => props.theme.borderRadiuses.lg};
`;