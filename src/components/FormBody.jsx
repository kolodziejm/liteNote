import styled from 'styled-components';

export default styled.form`
  padding: ${({ theme: { spaces } }) => `${spaces.lg}px ${spaces.sm}px`};
  background: ${({ theme: { colors } }) => colors.background};
  border: 1px solid ${({ theme: { colors } }) => colors.body};
  max-width: ${({ theme: { spacingUnit } }) => `${spacingUnit * 55}px`};
  margin: 0 auto;
  border-radius: ${({ theme: { borderRadiuses } }) => borderRadiuses.lg};

  @media only screen and (min-width: ${({ theme: { breakpoints } }) =>
      breakpoints.tabLand}) {
    padding: ${({ theme: { spaces } }) => `${spaces.lg}px ${spaces.hg}px`};
    max-width: ${({ theme: { spacingUnit } }) => `${spacingUnit * 64}px`};
  }
`;
