import styled from 'styled-components';
import OvalButton from './OvalButton';

export default styled(OvalButton)`
  border: 0;
  background-size: auto 130%;
  background-image: linear-gradient(
    to bottom,
    ${({ theme: { colors } }) => colors.primary},
    ${({ theme: { colors } }) => colors.secondary}
  );
  moz-transition: all 0.4s ease-in-out;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
  text-decoration: none;

  &:hover,
  &:active,
  &:visited &:focus {
    background-position: 0% 100%;
    moz-transition: all 0.4s ease-in-out;
    -o-transition: all 0.4s ease-in-out;
    -webkit-transition: all 0.4s ease-in-out;
    transition: all 0.4s ease-in-out;
  }
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;
