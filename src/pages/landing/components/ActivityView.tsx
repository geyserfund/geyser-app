import React, { useEffect, useState } from 'react';
import {
  HStack,
  Text,
  VStack,
  Skeleton,
  Divider,
  Link,
  Avatar,
  Button,
  Box,
  Image,
} from '@chakra-ui/react';
import { useQuery } from '@apollo/client';

import { isMobileMode, useNotification } from '../../../utils';
import {
  QUERY_GET_FUNDING_TXS_LANDING,
  QUERY_ENTRIES_LANDING,
} from '../../../graphql';

import { colors } from '../../../constants';

import { EntryCard } from '../../projectView/components/EntryCard';
import { ProjectFundingContributionFeedItem } from '../../../components/molecules';

const Contribution = ({ contribution }: { contribution: any }) => {
  console.log(contribution);
  const { sourceResource: project, ...fundingTx } = contribution;
  return (
    <ProjectFundingContributionFeedItem
      fundingTx={fundingTx}
      project={project}
      maxWidth="60%"
    />
  );
};

export const ActivityView = () => {
  const isMobile = isMobileMode();
  const [view, setView] = useState('entries');
  const { toast } = useNotification();

  const {
    loading: entriesLoading,
    error: entriesError,
    data: entriesData,
  } = useQuery(QUERY_ENTRIES_LANDING);
  const {
    loading: fundingTxsLoading,
    error: fundingTxsError,
    data: fundingTxsData,
  } = useQuery(QUERY_GET_FUNDING_TXS_LANDING, { variables: {} });

  useEffect(() => {
    if (entriesError) {
      toast({
        title: 'Could not load entries',
        description: 'Please refresh the page',
        status: 'error',
      });
    }
  }, [entriesError]);

  useEffect(() => {
    if (fundingTxsError) {
      toast({
        title: 'Could not load contributions',
        description: 'Please refresh the page',
        status: 'error',
      });
    }
  }, [fundingTxsError]);

  const entries = (entriesData && entriesData.getEntries) || [];
  const contributions: any[] =
    (fundingTxsData && fundingTxsData.getFundingTxs) || [];

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="left"
      overflow="hidden"
      flex="1"
      paddingLeft={30}
      paddingRight={15}
    >
      <Box display="flex">
        <Box w="15%">
          <Button
            _hover={{ backgroundColor: 'none' }}
            w="100%"
            rounded="none"
            bg="none"
            fontWeight={view === 'entries' ? 'bold' : 'normal'}
            fontSize="16px"
            marginTop="10px"
            onClick={() => setView('entries')}
          >
            Entries
          </Button>
        </Box>
        <Box w="15%">
          <Button
            _hover={{ backgroundColor: 'none' }}
            w="100%"
            rounded="none"
            bg="none"
            fontWeight={view === 'entries' ? 'normal' : 'bold'}
            fontSize="16px"
            marginTop="10px"
            onClick={() => setView('contributions')}
          >
            Contributions
          </Button>
        </Box>
      </Box>
      <HStack w="100%" spacing={0} marginBottom={15}>
        <Box
          bg={view === 'entries' ? colors.primary500 : 'lightgrey'}
          w="15%"
          h="3px"
        ></Box>
        <Box
          bg={view === 'entries' ? 'lightgrey' : colors.primary500}
          w="15%"
          h="3px"
          roundedLeft="lg"
        ></Box>
        <Box bg="lightgrey" w="70%" h="3px" roundedRight="lg"></Box>
      </HStack>
      <VStack
        spacing={'15px'}
        width="100%"
        overflow="auto"
        height={isMobile ? 'calc(100% - 44px)' : '100%'}
        paddingBottom="10px"
        paddingRight={view === 'entries' ? 30 : 10}
        paddingLeft={view === 'entries' ? 30 : 0}
        justifyItems="left"
      >
        {view === 'entries'
          ? !entriesLoading &&
            entries.length > 0 &&
            entries.map((entry: any, index: number) => (
              <EntryCard key={index} entry={entry} />
            ))
          : !fundingTxsLoading &&
            contributions.length > 0 &&
            contributions.map((contribution, index) => (
              <Contribution key={index} contribution={contribution} />
            ))}
      </VStack>
    </Box>
  );
};
