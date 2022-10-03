import { useQuery } from '@apollo/client';
import { QUERY_ENTRIES_LANDING } from '../graphql';
import { projectEntryListItems as previewItems } from '../utils/previewData/projectEntryListItems';

type OptionsProps = {
  itemLimit?: number;
  usePreviewData?: boolean;
};

/**
 * Hook for fetching project entries across the entire Geyser platform.
 */
export const useProjectEntries = (options?: OptionsProps) => {
  const { usePreviewData = false, itemLimit = 10 } = options || {};

  if (usePreviewData) {
    return {
      isLoading: false,
      error: null,
      data: previewItems,
      fetchMore: () => {},
    };
  }

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
