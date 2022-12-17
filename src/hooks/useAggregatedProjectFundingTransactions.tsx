import { useEffect, useRef, useState } from 'react';
import { PaginationInput } from '../types/generated/graphql';
import { aggregateTransactions, FundingTxWithCount } from '../utils';
import { useListenerState } from './useListenerState';
import {
  useProjectFundingTransactions,
  useProjectFundingTransactionsProps,
} from './useProjectFundingTransactions';

export const useAggregatedProjectFundingTransactions = ({
  itemLimit = 10,
  ...rest
}: useProjectFundingTransactionsProps) => {
  const [contributions, setContributions] = useState<FundingTxWithCount[]>([]);
  const [isShowingAllContributions, setIsShowingAllContributions] =
    useState(false);

  const [isLoadingMore, setIsLoadingMore] = useListenerState(false);

  const {
    isLoading,
    error,
    data,
    fetchMore,
    setPaginationOptions,
    paginationOptions,
  } = useProjectFundingTransactions({
    itemLimit,
    ...rest,
  });

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

  return {
    isLoading,
    isLoadingMore,
    error,
    data: contributions,
    fetchMore: handleLoadMoreButtonTapped,
    isShowingAllContributions,
  };
};
