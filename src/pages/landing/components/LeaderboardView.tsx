import {
  Box,
  Divider,
  Heading,
  HStack,
  Icon,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { getPath } from '../../../constants';
import { isMobileMode } from '../../../utils';
import { LandingPageProjectsList } from './LandingPageProjectsList';

export const LeaderboardView = () => {
  const isMobile = isMobileMode();
  return (
    <Box flexBasis={1} height="full">
      <VStack
        minWidth="250px"
        alignItems="left"
        paddingRight={isMobile ? '0px' : '30px'}
        spacing={4}
      >
        <VStack alignItems="left">
          <HStack justify="space-between" align="center" my="5px">
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
        </VStack>

        <LandingPageProjectsList />
      </VStack>
    </Box>
  );
};
