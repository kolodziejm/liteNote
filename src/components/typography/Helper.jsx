import styled from "styled-components";

export default styled.p`
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.error ? props.theme.colors.danger : props.theme.colors.body};
  margin: ${props => props.margin};
`;