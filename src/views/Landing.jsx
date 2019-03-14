import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

import theme from '../theme';
import Navbar from '../components/Navbar';
import XlHeading from '../components/typography/XlHeading';
import Paragraph from '../components/typography/Paragraph';
import Center from '../components/helpers/Center';
import CtaButton from '../components/ui/CtaButton';

import headerImg from '../assets/images/landing-header.jpg';

const Header = styled.header`
  height: 60vh;
  background-image: linear-gradient(
      rgba(84, 28, 181, 0.9),
      rgba(84, 28, 181, 0.9)
    ),
    url(${headerImg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  padding: ${({ theme: { spaces, spacingUnit } }) =>
    `${spacingUnit * 15}px ${spaces.sm}px ${spaces.md}px ${spaces.sm}px`};
`;

const { spaces } = theme;

const Landing = () => {
  const redirectToRegister = () => {};

  return (
    <>
      <Navbar landing />
      <Header>
        <XlHeading textAlign="center" white>
          Organize your life.
        </XlHeading>
        <Center margin={`${spaces.md}px 0 0 0`}>
          <Paragraph color="lightGrey">
            Looking for a place for your journal or your life-changing project?
          </Paragraph>
          <Paragraph color="lightGrey">LiteNote has you covered.</Paragraph>
          <CtaButton
            onClick={redirectToRegister}
            width="20.5rem"
            height="4.7rem"
            margin={`${spaces.lg}px 0 0 0`}
          >
            Create account
          </CtaButton>
        </Center>
      </Header>
    </>
  );
};

export default Landing;
