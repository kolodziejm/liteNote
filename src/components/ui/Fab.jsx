import styled from 'styled-components';

export default styled.button`
  border: 8px solid
    ${({ success, primary, theme: { colors } }) => {
      if (primary) {
        return colors.primary;
      }
      if (success) {
        return colors.success;
      }
      return colors.body;
    }};
  cursor: pointer;
  border-radius: 50%;
  padding: ${({ theme: { spaces } }) => `${spaces.xs}px`};
  outline: none;
  background-color: ${({ success, primary, theme: { colors } }) => {
    if (primary) {
      return colors.primary;
    }
    if (success) {
      return colors.success;
    }
    return colors.lightGrey;
  }};
  color: ${({ success, primary, theme: { colors } }) => {
    if (primary) {
      return colors.white;
    }
    if (success) {
      return colors.darkGrey;
    }
    return colors.body;
  }};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;

  &:hover,
  &:focus {
    background-color: ${({ theme: { colors } }) => colors.background};
    color: ${({ success, primary, theme: { colors } }) => {
      if (primary) {
        return colors.primary;
      }
      if (success) {
        return colors.success;
      }
      return colors.body;
    }};
  }
`;
