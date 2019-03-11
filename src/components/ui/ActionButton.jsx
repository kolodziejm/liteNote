import styled from 'styled-components';
import OvalButton from './OvalButton';

export default styled(OvalButton)`
  background-color: ${({ success, theme: { colors } }) =>
    success && colors.success};
  background-color: ${({ danger, theme: { colors } }) =>
    danger && colors.danger};
  background-color: ${({ warning, theme: { colors } }) =>
    warning && colors.secondary};
  border: 1px solid
    ${({ success, danger, warning, theme: { colors } }) => {
      if (success) {
        return colors.success;
      }
      if (danger) {
        return colors.danger;
      }
      if (warning) {
        return colors.secondary;
      }
      return colors.body;
    }};
  color: ${({ theme: { colors } }) => colors.darkGrey};
  font-weight: 700;
  transition: all 0.2s ease-in-out;
  outline: none;

  &:hover,
  &:focus {
    transform: translateY(-2px);
    box-shadow: 0px 2px 4px ${({ theme: { colors } }) => colors.shadow};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${({ theme: { colors } }) => colors.lightGrey};
    border: 1px solid ${({ theme: { colors } }) => colors.lightGrey};

    &:hover,
    &:focus {
      transform: translateY(0);
      box-shadow: none;
    }
  }
`;
