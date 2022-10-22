import { useQuery } from '@apollo/client';
import { QUERY_GET_FUNDING_TXS_LANDING } from '../graphql';
import {
  FundingTx,
  GetFundingTxsInput,
  PaginationInput,
} from '../types/generated/graphql';

type ResponseData = {
  getFundingTxs: FundingTx[];
};

type QueryVariables = {
  input: GetFundingTxsInput;
};

type OptionsProps = {
  itemLimit?: number;
  cursorID?: number;
};

/**
 * Hook for fetching project funding transactions
 * across the entire Geyser platform.
 */
export const useProjectFundingTransactions = (options?: OptionsProps) => {
  const { itemLimit = 10, cursorID } = options || {};

  const paginationOptions: PaginationInput = {
    take: itemLimit,
  };

  if (cursorID !== undefined) {
    paginationOptions.cursor = { id: cursorID };
  }

  const {
    loading: isLoading,
    error,
    data: responseData,
    fetchMore,
  } = useQuery<ResponseData, QueryVariables>(QUERY_GET_FUNDING_TXS_LANDING, {
    variables: {
      input: {
        pagination: paginationOptions,
      },
    },
  });

  return {
    isLoading,
    error,
    data: responseData?.getFundingTxs || [],
    fetchMore,
  };
};
