import { ApolloError } from '@apollo/client';
import { useEffect, useRef, useState } from 'react';
import {
  GetFundingTxsWhereInput,
  PaginationInput,
} from '../types/generated/graphql';
import { aggregateTransactions, FundingTxWithCount } from '../utils';
import { useListenerState } from './useListenerState';
import {
  useProjectFundingTransactions,
  useProjectFundingTransactionsProps,
} from './useProjectFundingTransactions';

export type useAggregatedProjectFundingTransactionsProps = {
  itemLimit?: number;
  cursorID?: number;
  where?: GetFundingTxsWhereInput;
  onError?: (error: ApolloError) => void;
};

export const useAggregatedProjectFundingTransactions = ({
  itemLimit = 10,
  where,
  ...rest
}: useProjectFundingTransactionsProps) => {
  const [contributions, setContributions] = useState<FundingTxWithCount[]>([]);
  const [noMoreitems, setNoMoreitems] = useState(false);

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
    where,
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

      if (data.length === 10 && newContributions.length < 10 && !noMoreitems) {
        fetchNext();
      }

      options.cursor = {
        id: Number(data[data.length - 1].id),
      };
    }

    options.take = itemLimit;
    setPagination(options);
  }, [data]);

  const fetchNext = async () => {
    setIsLoadingMore(true);

    await fetchMore({
      variables: {
        input: {
          pagination: pagination.current,
          where,
        },
      },
      updateQuery: (_, { fetchMoreResult }) => {
        if (fetchMoreResult.getFundingTxs.length < itemLimit) {
          setNoMoreitems(true);
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
    fetchNext,
    noMoreitems,
  };
};
