import styled from 'styled-components';

export default styled.p`
  font-size: ${({ large, theme: { fontSizes } }) =>
    large ? fontSizes.md : fontSizes.sm};
  margin: ${props => props.margin};
  max-width: ${props => props.maxWidth};
  color: ${({ theme: { colors }, color }) => {
    switch (color) {
      case 'light':
        return colors.light;
      case 'lightGrey':
        return colors.lightGrey;
      default:
        return colors.body;
    }
  }};
`;
