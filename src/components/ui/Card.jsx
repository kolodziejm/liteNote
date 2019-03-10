import styled from 'styled-components';

export default styled.li`
  max-width: ${({ maxWidth }) => maxWidth};
  margin: ${({ margin }) => margin};
  list-style: none;
  box-shadow: 0 3px 6px ${({ theme: { colors } }) => colors.shadow};
  border-radius: ${({ theme: { borderRadiuses } }) => borderRadiuses.lg};
  padding: ${({ theme: { spaces } }) => `${spaces.md}px ${spaces.sm}px`};
  transition: all 0.3s ease-in-out;

  @media only screen and (min-width: ${({ theme: { breakpoints } }) =>
      breakpoints.tabPort}) {
    padding: ${({ theme: { spaces } }) => `${spaces.md}px ${spaces.md}px`};
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px ${({ theme: { colors } }) => colors.shadow};
  }
`;
