// for form titles
import styled from 'styled-components';

export default styled.h3`
  font-size: ${({ theme: { fontSizes } }) => fontSizes.xl};
  text-align: ${props => props.textAlign};
  margin: ${props => props.margin};
  font-weight: 400;
  color: ${({ white, theme: { colors } }) =>
    white ? colors.white : colors.body};
`;
