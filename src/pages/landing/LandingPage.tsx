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
import { dimensions, getPath } from '../../constants';

const { topNavBar: topNavBarDimensions } = dimensions;

export const LandingPage = () => {
  return (
    <Box
      position="relative"
      paddingTop={`${topNavBarDimensions.desktop.height}px`}
      width="full"
      height="full"
    >
      <TopBanner />

      <Stack
        direction={{
          base: 'column',
          md: 'row',
        }}
        paddingY="30px"
        paddingX="60px"
        width="full"
        height="auto"
        minHeight={'full'}
        overflow="hidden"
        spacing={'64px'}
      >
        <ActivityView
          flexGrow={1}
          minWidth={{
            base: 'full',
            sm: '400px',
          }}
        />

        <Divider orientation="vertical" borderWidth={'1px'} height="auto" />

        <Box
          width={{
            base: 'full',
            md: '300px',
            lg: '400px',
          }}
          maxWidth={{
            base: 'full',
            md: '300px',
            lg: '400px',
          }}
          flexBasis={1}
          height="full"
        >
          <VStack alignItems="left" paddingRight={30} spacing={4}>
            <HStack justify="space-between" align="center">
              <Heading as="h5" size="sm">
                Top Projects
              </Heading>

              <Link
                as={ReactRouterLink}
                to={getPath('projectDiscovery')}
                display="flex"
                flexDirection={'row'}
                alignItems="center"
                color={'brand.neutral600'}
                fontSize="12px"
              >
                <Text size="sm" marginRight={3} color="brand.primary700">
                  All Projects
                </Text>

                <Icon as={BsArrowRight} strokeWidth={'1px'} fontSize="1.5em" />
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
