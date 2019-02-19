import styled from 'styled-components';

export default styled.div`
  min-height: 100%;
  background: ${props => props.theme.colors.primary};
  padding: ${props => `0 ${props.theme.spacingUnit}px`}
`;