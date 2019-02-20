// for form titles
import styled from 'styled-components';

export default styled.h2`
  font-size: ${props => props.theme.fontSizes.xl};
  text-align: ${props => props.textAlign};
  margin: ${props => props.margin};
  font-weight: 400;
`;
