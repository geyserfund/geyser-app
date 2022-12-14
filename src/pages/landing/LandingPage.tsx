import React, { useEffect } from 'react';
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
import { isMobileMode } from '../../utils';
import { gql, useSubscription } from '@apollo/client';

const { topNavBar: topNavBarDimensions } = dimensions;

const HELLO_SUBSCRIPTION = gql`
  subscription Subscription {
    projectCreated {
      hello
    }
  }
`;

export const LandingPage = () => {
  const isMobile = isMobileMode();

  const { data, loading } = useSubscription(HELLO_SUBSCRIPTION, {
    // variables: { },
  });

  useEffect(() => {
    console.log('DATA', data);
  }, [data]);

  console.log(data);

  return (
    <Box
      position="relative"
      paddingTop={`${topNavBarDimensions.desktop.height}px`}
      width="full"
      height="full"
    >
      <h4>New comment: {!loading && data?.projectCreated?.subscribe.hello}</h4>
      <TopBanner />

      <Stack
        direction={{
          base: 'column',
          md: 'row',
        }}
        paddingY="30px"
        paddingX={isMobile ? '10px' : '60px'}
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
          <VStack
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

                  <Icon
                    as={BsArrowRight}
                    strokeWidth={'1px'}
                    fontSize="1.5em"
                  />
                </Link>
              </HStack>

              <Divider borderWidth="2px" borderRadius="full" />
            </VStack>

            <LandingPageProjectsList />
          </VStack>
        </Box>
      </Stack>

      <AppFooter />
    </Box>
  );
};
