import { useQuery } from '@apollo/client';
import { QUERY_ENTRIES_LANDING } from '../graphql';

type OptionsProps = {
  itemLimit?: number;
};

/**
 * Hook for fetching project entries across the entire Geyser platform.
 */
export const useProjectEntries = (options?: OptionsProps) => {
  const { itemLimit = 10 } = options || {};

  const {
    loading: isLoading,
    error,
    data: entriesData,
    fetchMore,
  } = useQuery(QUERY_ENTRIES_LANDING, {
    variables: { input: { pagination: { take: itemLimit } } },
  });

  return {
    isLoading,
    error,
    data: entriesData?.getEntries || [],
    fetchMore,
  };
};
