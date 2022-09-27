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
        height="full"
      >
        <Box height="full" flex="1">
          <ActivityView />
        </Box>

        <Divider orientation="vertical" marginLeft={30} borderWidth={'1px'} />

        <Box width="400px" minWidth="400px" flexBasis={1} height="full">
          <ProjectsList />
        </Box>
      </Stack>

      <Footer />
    </Box>
  );
};
