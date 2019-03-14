import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import authContext from '../authContext';
import Navbar from '../components/Navbar';
import LgHeading from '../components/typography/LgHeading';
import XlHeading from '../components/typography/XlHeading';
import MdHeading from '../components/typography/MdHeading';
import Center from '../components/helpers/Center';

const NotFound = () => {
  const authCtx = useContext(authContext);

  return (
    <>
      <Navbar simple />
      <Center margin="32px 0 0 0">
        <LgHeading>Page wasn&apos;t found</LgHeading>
        <XlHeading>:(</XlHeading>
        <Link
          style={{ textDecoration: 'none' }}
          to={authCtx.authenticated ? '/home' : '/'}
        >
          <MdHeading>Take me somewhere safe</MdHeading>
        </Link>
      </Center>
    </>
  );
};

export default NotFound;
