// bold
import styled from 'styled-components';

export default styled.label`
  font-size: ${({ theme: { fontSizes } }) => fontSizes.sm};
  display: inline-block;
  font-weight: bold;
  color: ${({ theme: { colors } }) => colors.body};
  margin: ${props => props.margin};
  white-space: nowrap;
  overflow: hidden;
`;
