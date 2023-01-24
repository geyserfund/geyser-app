import React from 'react';
import { Box } from '@chakra-ui/layout';
import { LandingNavBar, TopNavBar } from './components/nav';
import { useAuthContext } from './context';
import { LoadingPage } from './pages/loading';
import { Fade } from '@chakra-ui/react';
import { dimensions } from './constants';
import { isMobileMode } from './utils';
import { Router } from './config';
import { ID } from './constants/components';

export const AppLayout = () => {
  const { loading } = useAuthContext();
  const isMobile = isMobileMode();

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <Fade in={true}>
      <Box height={isMobile ? '100%' : '100vh'} display="flex" flexDir="column">
        <TopNavBar />

        <Box
          id={ID.root}
          maxHeight="100%"
          flex="1"
          paddingTop={`${dimensions.topNavBar.desktop.height}px`}
          overflowY="auto"
        >
          <Router />
        </Box>
        {isMobile && <LandingNavBar />}
      </Box>
    </Fade>
  );
};
