import React from 'react';
import { Divider, VStack } from '@chakra-ui/react';

import Loader from '../../../components/ui/Loader';
import { ProjectFundingContributionsFeedItem } from '../../../components/molecules';
import { AlertBox } from '../../../components/ui';
import { Project } from '../../../types/generated/graphql';
import { FundingTxWithCount } from '../../../utils';
import { ScrollInvoke } from '../../../helpers';
import { useAggregatedProjectFundingTransactions } from '../../../hooks/useAggregatedProjectFundingTransactions';

type Props = {
  itemLimit?: number;
};

export const LandingPageContributionsList = ({ itemLimit = 10 }: Props) => {
  const { isLoading, isLoadingMore, error, data, noMoreitems, fetchNext } =
    useAggregatedProjectFundingTransactions({
      itemLimit,
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

  if (isLoading && !data) {
    return <Loader />;
  }

  if (data?.length === 0) {
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
        {data.map((contribution: FundingTxWithCount) => {
          if (contribution.sourceResource?.__typename === 'Project') {
            return (
              <ProjectFundingContributionsFeedItem
                key={contribution.id}
                linkedProject={contribution.sourceResource as Project}
                fundingTx={contribution}
                count={contribution.count}
                width={{
                  base: '100%',
                  md: '375px',
                }}
              />
            );
          }

          return null;
        })}
      </VStack>

      {noMoreitems === false ? (
        <>
          <Divider />
          {isLoadingMore.current && <Loader />}
          <ScrollInvoke
            elementId="app-route-content-root"
            onScrollEnd={fetchNext}
            isLoading={isLoadingMore.current}
          />
        </>
      ) : null}
    </VStack>
  );
};
