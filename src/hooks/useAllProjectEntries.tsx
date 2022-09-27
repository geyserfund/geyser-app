import { useQuery } from '@apollo/client';
import { QUERY_ENTRIES_LANDING } from '../graphql';
import { IProjectListEntryItem } from '../interfaces';
import { projectEntryListItems as previewItems } from '../utils/previewData/projectEntryListItems';

type Result = {
  isLoading: boolean;
  error: any;
  data: IProjectListEntryItem[];
};

type OptionsProps = {
  usePreviewData?: boolean;
};

export const useAllProjectEntries = (options?: OptionsProps): Result => {
  const { usePreviewData } = options || {
    usePreviewData: false,
  };

  if (usePreviewData) {
    return {
      isLoading: false,
      error: null,
      data: previewItems,
    };
  }

  const {
    loading: isLoading,
    error,
    data: entriesData,
  } = useQuery(QUERY_ENTRIES_LANDING);

  return {
    isLoading,
    error,
    data: entriesData?.getEntries || [],
  };
};
