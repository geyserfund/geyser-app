import { useQuery } from '@apollo/client';
import { QUERY_ALL_GEYSER_PROJECT_ENTRIES } from '../graphql';
import {
  GetEntriesInput,
  Entry,
  PaginationInput,
  GetEntriesOrderByInput,
  OrderByOptions,
} from '../types/generated/graphql';

type ResponseData = {
  getEntries: Entry[];
};

type QueryVariables = {
  input: GetEntriesInput;
};

type OptionsProps = {
  itemLimit?: number;
  cursorID?: number;
  orderBy?: GetEntriesOrderByInput;
};

/**
 * Hook for fetching project entries across the entire Geyser platform.
 */
export const useAllGeyserProjectEntries = ({
  itemLimit = 14,
  orderBy = { publishedAt: OrderByOptions.Desc },
  cursorID,
}: OptionsProps) => {
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
  } = useQuery<ResponseData, QueryVariables>(QUERY_ALL_GEYSER_PROJECT_ENTRIES, {
    variables: {
      input: {
        pagination: paginationOptions,
        orderBy,
      },
    },
  });

  return {
    isLoading,
    error,
    data: responseData?.getEntries || [],
    fetchMore,
  };
};
