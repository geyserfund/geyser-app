import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { QUERY_GET_PROJECT_FUNDERS } from '../graphql';
import { Funder, GetFundersInput } from '../types/generated/graphql';
import { PaginationHookReturn } from './types';
import { usePaginationHook } from './usePaginationHook';

type ResponseData = {
  getFunders: {
    count: number;
    data: Funder[];
  };
};

type QueryVariables = {
  input: GetFundersInput;
};

export type useFundersQueryProps = {
  itemLimit?: number;
  where?: any;
};

export default function useFundersQuery({
  itemLimit = 10,
  where,
}: useFundersQueryProps): PaginationHookReturn<Funder> {
  const [funders, setFunders] = useState<Funder[]>([]);

  const { error, loading, data, fetchMore } = useQuery<
    ResponseData,
    QueryVariables
  >(QUERY_GET_PROJECT_FUNDERS, {
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
      where,
      queryName: 'getFunders',
      itemLimit,
    });

  useEffect(() => {
    if (data && data.getFunders.data && data.getFunders.data.length > 0) {
      const val: any = {};
      console.log('checking data', data.getFunders.data);
      data.getFunders.data.map((funder) => {
        val[funder.id] = funder;
      });

      handleDataUpdate(Object.values(val));
      setFunders(Object.values(val));
    }
  }, [data]);

  return {
    isLoading: loading,
    isLoadingMore,
    noMoreItems,
    data: funders,
    count: data?.getFunders.count || 0,
    error,
    fetchNext,
  };
}
