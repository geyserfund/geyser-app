import { useQuery } from '@apollo/client';
import { QUERY_PROJECTS } from '../graphql';
import { IProject } from '../interfaces';

type OptionsProps = {
  itemLimit?: number;
};

export const useProjects = (options?: OptionsProps) => {
  const { itemLimit = 14 } = options || {};

  const {
    loading: isLoading,
    error,
    data: projectsData,
  } = useQuery(QUERY_PROJECTS, {
    variables: { input: { pagination: { take: itemLimit } } },
  });

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
