import React, { useEffect, useState } from 'react';
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
import { useSubscription } from '@apollo/client';
import {
  PROJECT_CREATION_SUBSCRIPTION,
  FUNDING_TX_CONFIRMED_SUBSCRIPTION,
} from '../../graphql/subscriptions';
import { isMobileMode } from '../../utils';

const { topNavBar: topNavBarDimensions } = dimensions;

export const LandingPage = () => {
  const isMobile = isMobileMode();

  /* 
    START PLACEHOLDER 

    Used to demonstrate the project and fundingTx subscriptions
  */
   const { data } = useSubscription(PROJECT_CREATION_SUBSCRIPTION, {
      // variables: { },
   });

  const [projects, setProjects] = useState([]);
  const [fundingTxs, setFundingTxs] = useState([]);

  useEffect(() => {
    if (data?.projectCreated) {
      setProjects([...projects, data.projectCreated.project]);
    }
  }, [data]);

  useEffect(() => {
    if (fundingTxsConfirmedSubData?.fundingTxConfirmed) {
      setFundingTxs([
        ...fundingTxs,
        fundingTxsConfirmedSubData.fundingTxConfirmed.fundingTx,
      ]);
    }
  });
  /* END PLACEHOLDER */

  return (
    <Box
      position="relative"
      paddingTop={`${topNavBarDimensions.desktop.height}px`}
      width="full"
      height="full"
    >
      {/* PLACEHOLDER START */}
      {projects.map((project) => {
        console.log('PROJECT', project);
        return <Text key={project.id}> New project: {project.name} </Text>;
      })}
      {fundingTxs.map((fundingTx) => {
        console.log('FUNDING TX', fundingTx);
        return (
          <Text key={fundingTx.id}>
            {' '}
            New confirmed funding tx: {fundingTx.id}{' '}
          </Text>
        );
      })}
      {/* PLACEHOLDER END */}
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
