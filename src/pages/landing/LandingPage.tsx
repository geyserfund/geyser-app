import React from 'react';
import {
  Box,
  Divider,
  Heading,
  HStack,
  Icon,
  Link,
  Stack,
  VStack,
  Text,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { AppFooter } from '../../components/molecules';

import { ActivityView, LandingPageProjectsList, TopBanner } from './components';
import { BsArrowRight } from 'react-icons/bs';
import { dimensions } from '../../constants';

const { topNavBar: topNavBarDimensions } = dimensions;

export const LandingPage = () => {
  return (
    <Box
      position="relative"
      paddingTop={topNavBarDimensions.desktop.height}
      width="full"
      height="full"
    >
      <TopBanner />

      <Stack
        direction="row"
        paddingY="30px"
        paddingX="60px"
        width="full"
        height="auto"
        minH={'full'}
        overflow="hidden"
        spacing={30}
      >
        <Box height="full" flex="1">
          <ActivityView />
        </Box>

        <Divider orientation="vertical" borderWidth={'1px'} height="auto" />

        <Box width="400px" minWidth="400px" flexBasis={1} height="full">
          <VStack
            alignItems="left"
            paddingLeft={30}
            paddingRight={30}
            spacing={4}
          >
            <HStack justify="space-between" align="center">
              <Heading as="h5" size="sm">
                Top Projects
              </Heading>

              <Link
                as={ReactRouterLink}
                to={'/project-discovery'}
                display="flex"
                flexDirection={'row'}
                alignItems="center"
                color={'brand.neutral600'}
                fontSize="12px"
              >
                <Text size="sm">See All Projects</Text>

                <Icon as={BsArrowRight} marginLeft={1} />
              </Link>
            </HStack>

            <Divider borderWidth="2px" borderRadius="full" />

            <LandingPageProjectsList />
          </VStack>
        </Box>
      </Stack>

      <AppFooter />
    </Box>
  );
};
