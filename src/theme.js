const spacingUnit = 8
export default {
  colors: {
    background: '#F8F8F8',
    darkGrey: '#333333',
    body: '#555555',
    lightGrey: '#D8D8D8',
    primary: '#531CB3',
    secondary: '#97DFFC',
    danger: '#FE5F55',
    success: '#3CD070',
    white: '#E7ECEF',
  },
  fonts: {
    raleway: 'Raleway, sans-serif',
    lusitana: 'Lusitana, serif',
  },
  fontSizes: {
    xs: '1.25rem',
    sm: '1.6rem',
    md: '2rem',
    l: '2.56rem',
    xl: '3.84rem',
    xxl: '4.8rem',
    hg: '9.6rem',
  },
  borderRadiuses: {
    sm: '2px',
    md: '4px',
    lg: '8px'   
  },
  spacingUnit,
  spaces: {
    xxs: spacingUnit / 2, 
    xs: spacingUnit,
    sm: spacingUnit * 2,
    md: spacingUnit * 3,
    lg: spacingUnit * 4,
    xl: spacingUnit * 5,
    xxl: spacingUnit * 6
  },
  breakpoints: {
    tabPort: '37.5em',
    tabLand: '56.25em',
    desktop: '75em',
  },
};
