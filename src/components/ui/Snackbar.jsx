import styled from 'styled-components';
import posed from 'react-pose';

const snackbarProps = {
  on: { bottom: 0 },
  off: { bottom: -50 },
};

export default styled(posed.div(snackbarProps))`
  width: 100%;
  position: fixed;
  left: 50%;
  transform: translateX(-50%) !important;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.sm};
  border-radius: ${({ theme: { borderRadiuses } }) => borderRadiuses.sm};
  font-weight: bold;
  color: ${({ theme: { colors } }) => colors.darkGrey};
  background: ${({ success, info, theme: { colors } }) => {
    if (success) {
      return colors.success;
    }
    if (info) {
      return colors.secondary;
    }
    return colors.body;
  }};
  padding: ${({ theme: { spaces } }) => `${spaces.xs}px ${spaces.sm}px`};

  @media only screen and (min-width: ${({ theme: { breakpoints } }) =>
      breakpoints.tabPort}) {
    width: auto;
  }
`;
