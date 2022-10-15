import { useQuery } from '@apollo/client';
import { QUERY_ENTRIES_LANDING_PAGE } from '../graphql';
import {
  GetEntriesInput,
  Entry,
  PaginationInput,
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
};

/**
 * Hook for fetching project entries across the entire Geyser platform.
 */
export const useProjectEntries = (options?: OptionsProps) => {
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
  } = useQuery<ResponseData, QueryVariables>(QUERY_ENTRIES_LANDING_PAGE, {
    variables: {
      input: {
        pagination: paginationOptions,
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
