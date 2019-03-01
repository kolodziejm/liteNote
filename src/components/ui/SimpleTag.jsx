import styled from 'styled-components';

export default styled.li`
  list-style: none;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.xs};
  color: ${({ theme: { colors } }) => colors.darkGrey};
  background-color: ${({ theme: { colors } }) => colors.secondary};
  padding: ${({ theme: { spaces } }) => `${spaces.xxs}px ${spaces.sm}px`};
  border-radius: ${({ theme: { borderRadiuses } }) => borderRadiuses.sm};
  margin: ${({ theme: { spaces } }) => `0 ${spaces.xs}px ${spaces.xs}px 0`};
`;
