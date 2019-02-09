import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
*,
*:after,
*:before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
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
    color: ${props => props.theme.colors.darkGrey};
    box-sizing: border-box;
    overflow-x: hidden;
    line-height: 1.5;
    word-wrap: break-word;
    font-kerning: normal;
    -moz-font-feature-settings: "kern", "liga", "clig", "calt";
    -ms-font-feature-settings: "kern", "liga", "clig", "calt";
    -webkit-font-feature-settings: "kern", "liga", "clig", "calt";
    font-feature-settings: "kern", "liga", "clig", "calt";
}`;
