/* eslint-disable no-unused-vars */
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
*,
*:after,
*:before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
}

html, body {
  width: 100%;
  height: 100%;
}

div#root {
  height: 100%;
}
 
html {
    font-size: 62.5%; // 1 rem = 10px;

    @media only screen and (min-width: ${props =>
      props.theme.breakpoints.tabPort}) {
        font-size: 66.5%; // 1rem = 10,64px
    }

    @media only screen and (min-width: ${props =>
      props.theme.breakpoints.desktop}) {
        font-size: 69.5%; // 1rem = 11,12px
    }
}
    
body {
    font-family: ${props => props.theme.fonts.raleway}; 
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.body};
    box-sizing: border-box;
    overflow-x: hidden;
    line-height: 1.5;
    word-wrap: break-word;
    font-kerning: normal;
    -moz-font-feature-settings: "kern", "liga", "clig", "calt";
    -ms-font-feature-settings: "kern", "liga", "clig", "calt";
    -webkit-font-feature-settings: "kern", "liga", "clig", "calt";
    font-feature-settings: "kern", "liga", "clig", "calt";
}

.ck-rounded-corners {
  border-radius: ${({ theme: { borderRadiuses } }) =>
    borderRadiuses.lg} !important;
}

.ck-content {
  box-shadow: 0 3px 6px ${({ theme: { colors } }) => colors.shadow} !important;
  min-height: 40rem;
  font-size: 16px;
  color: ${({ theme: { colors } }) => colors.darkGrey};
  transition: all .3s ease-in-out;

  &:focus {
    border-top: 1px solid ${({ theme: { colors } }) =>
      colors.secondary} !important;
  border-left: 1px solid ${({ theme: { colors } }) =>
    colors.lightGrey} !important;
  border-right: 1px solid ${({ theme: { colors } }) =>
    colors.lightGrey} !important;
  border-bottom: 1px solid transparent !important;
}

`;
