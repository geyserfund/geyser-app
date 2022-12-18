import { ApolloError } from '@apollo/client';
import React, { useEffect, useRef, useState } from 'react';
import {
  GetFundingTxsWhereInput,
  PaginationInput,
} from '../types/generated/graphql';
import { aggregateTransactions, FundingTxWithCount } from '../utils';
import { PaginationHookReturn } from './types';
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
}: useProjectFundingTransactionsProps): PaginationHookReturn<FundingTxWithCount> => {
  const [contributions, setContributions] = useState<FundingTxWithCount[]>([]);
  const [noMoreItems, setNoMoreItems] = useState(false);

  const [isLoadingMore, setIsLoadingMore] = useListenerState(false);

  const {
    isLoading,
    error,
    data,
    count,
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

      if (data.length === 10 && newContributions.length < 10 && !noMoreItems) {
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
        if (fetchMoreResult.getFundingTxs.data.length < itemLimit) {
          setNoMoreItems(true);
        }

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
    count,
    fetchNext,
    noMoreItems,
  };
};
