import styled from 'styled-components';

export default styled.p`
  font-size: ${({ theme: { fontSizes } }) => fontSizes.sm};
  margin: ${props => props.margin};
`;
