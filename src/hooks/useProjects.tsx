import { useQuery } from '@apollo/client';
import { QUERY_PROJECTS } from '../graphql';
import { IProject } from '../interfaces';

export type OrderBy = 'createdAt' | 'projectTitle' | 'contributionsCount';

type OptionsProps = {
  itemLimit?: number;
  orderBy?: OrderBy;
};

type ResponseData = IProject[];

export const useProjects = (options?: OptionsProps) => {
  const { itemLimit = 14, orderBy = 'createdAt' } = options || {};

  function orderByParams(orderByOption: OrderBy) {
    switch (orderByOption) {
      case 'createdAt':
        return {
          createdAt: null,
        };
      case 'contributionsCount':
        return {
          contributions: null,
        };
      case 'projectTitle':
        return {
          projectTitle: null,
        };
      default:
        break;
    }
  }

  const {
    loading: isLoading,
    error,
    data: responseData,
    fetchMore,
  } = useQuery(QUERY_PROJECTS, {
    variables: {
      input: {
        pagination: { take: itemLimit },
        orderBy: orderByParams(orderBy),
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
