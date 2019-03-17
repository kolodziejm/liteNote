import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { withRouter } from 'react-router-dom';

import theme from '../theme';
import Navbar from '../components/Navbar';
import XlHeading from '../components/typography/XlHeading';
import MdHeading from '../components/typography/MdHeading';
import Paragraph from '../components/typography/Paragraph';
import Center from '../components/helpers/Center';
import CtaButton from '../components/ui/CtaButton';
import Card from '../components/ui/Card';
import Logo from '../components/ui/Logo';

import headerImg from '../assets/images/landing-header.jpg';
import accessImg from '../assets/images/access-illustration.svg';
import editorImg from '../assets/images/editor-illustration.svg';
import tagsImg from '../assets/images/tags-illustration.svg';

const Header = styled.header`
  height: 60vh;
  min-height: 560px;
  background-image: linear-gradient(
      rgba(84, 28, 181, 0.9),
      rgba(84, 28, 181, 0.9)
    ),
    url(${headerImg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  padding: ${({ theme: { spaces, spacingUnit } }) =>
    `${spacingUnit * 12}px ${spaces.sm}px ${spaces.md}px ${spaces.sm}px`};
`;

const AboutSection = styled.section`
  padding: ${({ theme: { spaces } }) => `${spaces.xxl}px ${spaces.sm}px`};
`;

const FeaturesSection = styled.section`
  padding: ${({ theme: { spaces } }) => `${spaces.xxl}px ${spaces.sm}px`};
`;

const CtaSection = styled.section`
  padding: ${({ theme: { spaces } }) => `${spaces.xxl}px ${spaces.sm}px`};
  background: ${({ theme: { colors } }) => colors.lightGrey};
`;

const Footer = styled.footer`
  padding: ${({ theme: { spaces } }) => `${spaces.sm}px ${spaces.sm}px`};
  background: ${({ theme: { colors } }) => colors.primary};
`;

const CardsList = styled.div`
  list-style: none;
  margin: 0 auto;
  max-width: 1200px;
  @media only screen and (min-width: ${({ theme: { spacingUnit } }) =>
      `${spacingUnit * 132}px`}) {
    display: flex;
  }
`;

const ContentLimiter = styled.div`
  margin: 0 auto;
  max-width: 960px;
`;

const { spaces } = theme;

const FeatureCard = ({ title, image }) => (
  <Card maxWidth="320px" margin={`0 auto ${spaces.sm}px auto`}>
    <Center margin={`0 0 ${spaces.sm}px 0`}>
      <MdHeading>{title}</MdHeading>
    </Center>
    <img style={{ maxWidth: '250px' }} src={image} alt={title} />
  </Card>
);

FeatureCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

const Landing = ({ history }) => {
  const redirectToRegister = () => {
    history.push('/register');
  };

  return (
    <>
      <Navbar landing />
      <Header>
        <XlHeading textAlign="center" white>
          Organize your life.
        </XlHeading>
        <Center margin={`${spaces.md}px 0 0 0`}>
          <Paragraph large color="lightGrey">
            Looking for a place to start your journal or store your knowledge?
          </Paragraph>
          <Paragraph large color="lightGrey">
            LiteNote has you covered.
          </Paragraph>
          <CtaButton
            onClick={redirectToRegister}
            width="19.5rem"
            height="4.7rem"
            margin={`${spaces.lg}px 0 0 0`}
          >
            Create account
          </CtaButton>
        </Center>
      </Header>
      <AboutSection>
        <XlHeading margin={`0 0 ${spaces.lg}px 0`} textAlign="center">
          Create your workflow
        </XlHeading>
        <ContentLimiter>
          <Paragraph>
            LiteNote allows you to create notes using powerful rich text editor.
            You can organize your notes using the tags you set up for quick and
            easy access. Whether it&apos;s a journal, builds for your favorite
            video game or notes for your foreign language lessons - you can
            store and organize them here!
          </Paragraph>
        </ContentLimiter>
      </AboutSection>
      <FeaturesSection>
        <XlHeading margin={`0 0 ${spaces.lg}px 0`} textAlign="center">
          Features
        </XlHeading>
        <CardsList>
          <FeatureCard title="Powerful, easy to use editor" image={editorImg} />
          <FeatureCard title="Access your notes anywhere" image={accessImg} />
          <FeatureCard
            title="Organize your notes easily with tags"
            image={tagsImg}
          />
        </CardsList>
      </FeaturesSection>
      <CtaSection>
        <XlHeading margin={`0 0 ${spaces.md}px 0`} textAlign="center">
          Start using liteNote today!
        </XlHeading>
        <Center>
          <Paragraph large>It&apos;s completely free!</Paragraph>
          <CtaButton
            onClick={redirectToRegister}
            width="19.5rem"
            height="4.7rem"
            margin={`${spaces.lg}px 0 0 0`}
          >
            Create account
          </CtaButton>
        </Center>
      </CtaSection>
      <Footer>
        <Center>
          <Logo />
          <Paragraph large color="light">
            Copyright &copy; Marcin Kołodziej 2019
          </Paragraph>
        </Center>
      </Footer>
    </>
  );
};

export default withRouter(Landing);
