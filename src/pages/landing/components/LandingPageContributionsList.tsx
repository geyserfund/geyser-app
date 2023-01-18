import React from 'react';
import { VStack } from '@chakra-ui/react';

import Loader from '../../../components/ui/Loader';
import { ProjectFundingContributionsFeedItem } from '../../../components/molecules';
import { AlertBox } from '../../../components/ui';
import { FundingMethod, Project } from '../../../types/generated/graphql';
import { aggregateTransactions, FundingTxWithCount } from '../../../utils';
import { ScrollInvoke } from '../../../helpers';
import { useQueryWithPagination } from '../../../hooks';
import { QUERY_GET_FUNDING_TXS_LANDING } from '../../../graphql';

const itemLimit = 50;

export const LandingPageContributionsList = () => {
  const {
    isLoading,
    isLoadingMore,
    noMoreItems,
    data: contributions,
    error,
    fetchNext,
  } = useQueryWithPagination<FundingTxWithCount>({
    itemLimit,
    queryName: 'getFundingTxs',
    query: QUERY_GET_FUNDING_TXS_LANDING,
    resultMap: aggregateTransactions,
    where: {
      OR: [
        {
          method: null,
        },
        {
          NOT: {
            method: FundingMethod.PodcastKeysend,
          },
        },
      ],
    },
  });

  if (error) {
    return (
      <AlertBox
        height="200px"
        status="error"
        title="An error occurred while attempting to fetch contributions."
        message="Please try refreshing the page. You may also want to contact support if the problem persists."
      />
    );
  }

  if (isLoading) {
    return <Loader width="100%" />;
  }

  if (contributions?.length === 0) {
    return (
      <AlertBox
        height="200px"
        status="info"
        colorScheme={'gray'}
        title="There are currently no project contributions."
        message="Please try refreshing the page. You may also want to contact support if the problem persists."
      />
    );
  }

  return (
    <VStack flexDirection={'column'} spacing={6} width="full">
      <VStack alignItems={'center'} width="full" spacing={'24px'}>
        {contributions.map((contribution: FundingTxWithCount) => {
          if (contribution.sourceResource?.__typename === 'Project') {
            return (
              <ProjectFundingContributionsFeedItem
                key={contribution.id}
                linkedProject={contribution.sourceResource as Project}
                fundingTx={contribution}
                count={contribution.count}
                width={{
                  base: '100%',
                  md: '382px',
                }}
              />
            );
          }

          return null;
        })}
      </VStack>

      <ScrollInvoke
        elementId="app-route-content-root"
        onScrollEnd={fetchNext}
        isLoading={isLoadingMore}
        noMoreItems={noMoreItems}
      />
    </VStack>
  );
};
