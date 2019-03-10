import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export const LinkPrimary = styled(StyledLink)`
  color: ${({ theme: { colors } }) => colors.primary};
`;

export const LinkSecondary = styled(StyledLink)`
  color: ${({ theme: { colors } }) => colors.secondary};
`;
