import { ApolloError, useQuery } from '@apollo/client';
import { useState } from 'react';
import { QUERY_GET_FUNDING_TXS_LANDING } from '../graphql';
import {
  FundingTx,
  GetFundingTxsInput,
  PaginationInput,
  GetFundingTxsWhereInput,
} from '../types/generated/graphql';

type ResponseData = {
  getFundingTxs: {
    count: number;
    data: FundingTx[];
  };
};

type QueryVariables = {
  input: GetFundingTxsInput;
};

export type useProjectFundingTransactionsProps = {
  itemLimit?: number;
  cursorID?: number;
  where?: GetFundingTxsWhereInput;
  onError?: (error: ApolloError) => void;
};

/**
 * Hook for fetching project funding transactions
 * across the entire Geyser platform.
 */
export const useProjectFundingTransactions = (
  options?: useProjectFundingTransactionsProps,
) => {
  const { itemLimit = 10, cursorID } = options || {};

  const [paginationOptions, setPaginationOptions] = useState<PaginationInput>({
    take: itemLimit,
    ...(cursorID !== undefined && { id: cursorID }),
  });

  const {
    loading: isLoading,
    error,
    fetchMore,
    data,
  } = useQuery<ResponseData, QueryVariables>(QUERY_GET_FUNDING_TXS_LANDING, {
    variables: {
      input: {
        pagination: paginationOptions,
        where: options?.where,
      },
    },
    onError: options?.onError,
  });

  return {
    isLoading,
    error,
    data: data?.getFundingTxs.data || [],
    count: data?.getFundingTxs.count || 0,
    fetchMore,
    paginationOptions,
    setPaginationOptions,
  };
};
