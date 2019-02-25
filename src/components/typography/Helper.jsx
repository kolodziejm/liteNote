import styled from 'styled-components';

export default styled.p`
  font-size: ${({ theme: { fontSizes } }) => fontSizes.xs};
  color: ${({ error, theme: { colors } }) =>
    error ? colors.dangerText : colors.body};
  margin: ${props => props.margin};
`;
