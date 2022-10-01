import { useQuery } from '@apollo/client';
import { QUERY_PROJECTS } from '../graphql';
import { IProject } from '../interfaces';
import { projectListItems as previewItems } from '../utils/previewData/projectListItems';

type Result = {
  isLoading: boolean;
  error: any;
  data: IProject[];
};

type OptionsProps = {
  itemLimit?: number;
  usePreviewData?: boolean;
};

export const useProjects = (options?: OptionsProps): Result => {
  const { usePreviewData = false, itemLimit = 14 } = options || {};

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
    data: projectsData,
  } = useQuery(QUERY_PROJECTS);

  const projects: IProject[] = projectsData?.projects.projects || [];

  return {
    isLoading,
    error,

    // TODO: This could be improved by having the hook
    // accept a custom sorting function
    data: projects.slice(0, itemLimit).sort((a, b) => {
      return new Date(b.updatedAt).valueOf() - new Date(a.updatedAt).valueOf();
    }),
  };
};
