// for form titles
import styled from 'styled-components';

export default styled.h2`
  font-size: ${({ theme: { fontSizes } }) => fontSizes.xxl};
  text-align: ${props => props.textAlign};
  margin: ${props => props.margin};
  font-weight: 400;
  color: ${({ white, theme: { colors } }) =>
    white ? colors.white : colors.body};
`;
