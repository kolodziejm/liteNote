import styled from 'styled-components';
import OvalButton from './OvalButton';

export default styled(OvalButton)`
  transform: ${props => props.transform};
  background-size: auto 130%;
  background-image: linear-gradient(
    to bottom,
    ${props => props.theme.colors.primary},
    ${props => props.theme.colors.secondary}
  );
  moz-transition: all 0.4s ease-in-out;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;

  &:hover,
  &:active,
  &:visited &:focus {
    background-position: 0% 100%;
    moz-transition: all 0.4s ease-in-out;
    -o-transition: all 0.4s ease-in-out;
    -webkit-transition: all 0.4s ease-in-out;
    transition: all 0.4s ease-in-out;
  }
`;
