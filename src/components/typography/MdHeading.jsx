import styled from 'styled-components';

export default styled.h3`
  font-size: ${({ theme: { fontSizes } }) => fontSizes.md};
  text-align: ${props => props.textAlign};
  margin: ${props => props.margin};
  font-weight: 700;
`;
