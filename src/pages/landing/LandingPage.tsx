import React from 'react';
import { Box, Flex, Divider, Image } from '@chakra-ui/react';
import { Footer } from '../../components/molecules';

import { ActivityView, ProjectsList, TopBanner } from './components';
import SatsFlow from '../../assets/sats-flow.svg';

export const Landing = () => {
  return (
    <Flex
      position="relative"
      paddingTop="60px"
      direction="column"
      height="full"
    >
      <TopBanner />

      <Flex direction="row" paddingY="30px" paddingX="60px">
        <Box width="full" height="full">
          <ActivityView />
        </Box>

        <Divider orientation="vertical" marginLeft={30} />

        <Box width="full" maxWidth={400} height="full">
          <ProjectsList />
        </Box>
      </Flex>

      <Footer />
    </Flex>
  );
};
