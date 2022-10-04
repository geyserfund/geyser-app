import { useQuery } from '@apollo/client';
import { QUERY_GET_FUNDING_TXS_LANDING } from '../graphql';
import { IFundingTx } from '../interfaces';

type OptionsProps = {
  itemLimit?: number;
};

type ResponseData = IFundingTx[];

/**
 * Hook for fetching project funding transactions
 * across the entire Geyser platform.
 */
export const useProjectFundingTransactions = (options?: OptionsProps) => {
  const { itemLimit = 10 } = options || {};

  const {
    loading: isLoading,
    error,
    data: responseData,
    fetchMore,
  } = useQuery(QUERY_GET_FUNDING_TXS_LANDING, {
    variables: { input: { pagination: { take: itemLimit } } },
  });

  return {
    isLoading,
    error,
    data: (responseData?.getFundingTxs || []) as ResponseData,
    fetchMore,
  };
};
