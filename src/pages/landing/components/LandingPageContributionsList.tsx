import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button, Divider, VStack } from '@chakra-ui/react';

import Loader from '../../../components/ui/Loader';
import { ProjectFundingContributionsFeedItem } from '../../../components/molecules';
import { AlertBox } from '../../../components/ui';
import { useProjectFundingTransactions } from '../../../hooks/useProjectFundingTransactions';
import { Project } from '../../../types/generated/graphql';
import { PaginationInput } from '../../../types/generated/graphql';
import { aggregateTransactions, FundingTxWithCount } from '../../../utils';
import { ScrollInvoke } from '../../../helpers';
import { useListenerState } from '../../../hooks';

type Props = {
  itemLimit?: number;
};

export const LandingPageContributionsList = ({ itemLimit = 10 }: Props) => {
  const {
    isLoading,
    error,
    data,
    fetchMore,
    setPaginationOptions,
    paginationOptions,
  } = useProjectFundingTransactions({
    itemLimit,
  });

  const [contributions, setContributions] = useState<FundingTxWithCount[]>([]);
  const [isShowingAllContributions, setIsShowingAllContributions] =
    useState(false);

  const [isLoadingMore, setIsLoadingMore] = useListenerState(false);

  const pagination = useRef(paginationOptions);
  const setPagination = (value: PaginationInput) => {
    pagination.current = value;
    setPaginationOptions(value);
  };

  useEffect(() => {
    const options: PaginationInput = {};

    if (data && data.length > 0) {
      const newContributions = aggregateTransactions(data);
      setContributions(newContributions);
      if (
        data.length === 10 &&
        newContributions.length < 10 &&
        !isShowingAllContributions
      ) {
        handleLoadMoreButtonTapped();
      }

      options.cursor = {
        id: Number(data[data.length - 1].id),
      };
    }

    options.take = itemLimit;
    setPagination(options);
  }, [data]);

  const handleLoadMoreButtonTapped = async () => {
    setIsLoadingMore(true);

    await fetchMore({
      variables: {
        input: {
          pagination: pagination.current,
        },
      },
      updateQuery: (_, { fetchMoreResult }) => {
        if (fetchMoreResult.getFundingTxs.length < itemLimit) {
          setIsShowingAllContributions(true);
        }

        // return the result and let our `InMemoryCache` type policies handle
        // the merging logic.
        return {
          getFundingTxs: fetchMoreResult.getFundingTxs,
        };
      },
    });

    setIsLoadingMore(false);
  };

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
                  md: '375px',
                }}
              />
            );
          }

          return null;
        })}
      </VStack>

      {isShowingAllContributions === false ? (
        <>
          <Divider />
          {isLoadingMore.current && <Loader />}
          <ScrollInvoke
            onScrollEnd={handleLoadMoreButtonTapped}
            isLoading={isLoadingMore.current}
          />
        </>
      ) : null}
    </VStack>
  );
};
