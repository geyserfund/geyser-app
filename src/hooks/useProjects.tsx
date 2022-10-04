import { useQuery } from '@apollo/client';
import { QUERY_PROJECTS } from '../graphql';
import { IProject } from '../interfaces';

type OptionsProps = {
  itemLimit?: number;
};

type ResponseData = IProject[];

export const useProjects = (options?: OptionsProps) => {
  const { itemLimit = 14 } = options || {};

  const {
    loading: isLoading,
    error,
    data: responseData,
    fetchMore,
  } = useQuery(QUERY_PROJECTS, {
    variables: {
      input: {
        pagination: { take: itemLimit },

        // TODO: In the future, tt will probably be helpful to make these options more configurable to callers.
        orderBy: {
          createdAt: null,
        },
      },
    },
  });

  return {
    isLoading,
    error,
    data: (responseData?.projects.projects || []) as ResponseData,
    fetchMore,
  };
};
