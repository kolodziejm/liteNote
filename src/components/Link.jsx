import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export const LinkPrimary = styled(StyledLink)`
  color: ${props => props.theme.colors.primary};
`;

export const LinkSecondary = styled(StyledLink)`
  color: ${props => props.theme.colors.secondary};
`;
