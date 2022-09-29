import React from 'react';
import { Box, Divider, Stack } from '@chakra-ui/react';
import { Footer } from '../../components/molecules';

import { ActivityView, ProjectsList, TopBanner } from './components';

export const LandingPage = () => {
  return (
    <Box position="relative" paddingTop="60px" width="full" height="full">
      <TopBanner />

      <Stack
        direction="row"
        paddingY="30px"
        paddingX="60px"
        width="full"
        height="auto"
        minH={'full'}
        spacing={30}
      >
        <Box height="full" flex="1">
          <ActivityView />
        </Box>

        <Divider orientation="vertical" borderWidth={'1px'} height="auto" />

        <Box width="400px" minWidth="400px" flexBasis={1} height="full">
          <ProjectsList />
        </Box>
      </Stack>

      <Footer />
    </Box>
  );
};
