// bold
import styled from "styled-components";

export default styled.label`
  font-size: ${props => props.theme.fontSizes.sm};
  display: inline-block;
  font-weight: bold;
  color: ${props => props.theme.colors.body};
  margin: ${props => props.margin};
`;