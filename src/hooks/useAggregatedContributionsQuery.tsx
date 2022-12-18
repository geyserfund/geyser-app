import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { QUERY_GET_FUNDING_TXS_LANDING } from '../graphql';
import { FundingTx, GetFundingTxsInput } from '../types/generated/graphql';
import { aggregateTransactions, FundingTxWithCount } from '../utils';
import { PaginationHookReturn } from './types';
import { usePaginationHook } from './usePaginationHook';

type ResponseData = {
  getFundingTxs: {
    count: number;
    data: FundingTx[];
  };
};

type QueryVariables = {
  input: GetFundingTxsInput;
};

export type useAggregatedContributionsQueryProps = {
  itemLimit?: number;
  where?: any;
};

export default function useAggregatedContributionsQuery({
  itemLimit = 10,
  where,
}: useAggregatedContributionsQueryProps): PaginationHookReturn<FundingTxWithCount> {
  const [contributions, setContributions] = useState<FundingTxWithCount[]>([]);

  const { error, loading, data, fetchMore } = useQuery<
    ResponseData,
    QueryVariables
  >(QUERY_GET_FUNDING_TXS_LANDING, {
    variables: {
      input: {
        pagination: {
          take: itemLimit,
        },
        where,
      },
    },
  });

  const { isLoadingMore, fetchNext, noMoreItems, handleDataUpdate } =
    usePaginationHook({
      fetchMore,
      queryName: 'getFundingTxs',
      itemLimit,
    });

  useEffect(() => {
    if (data && data.getFundingTxs.data) {
      handleDataUpdate(data.getFundingTxs.data);

      const newContributions = aggregateTransactions(data.getFundingTxs.data);
      setContributions(newContributions);

      if (
        data.getFundingTxs.data.length === 10 &&
        newContributions.length < 8 &&
        !noMoreItems
      ) {
        fetchNext();
      }
    }
  }, [data]);
  return {
    isLoading: loading,
    isLoadingMore,
    noMoreItems,
    data: contributions,
    count: data?.getFundingTxs.count || 0,
    error,
    fetchNext,
  };
}
