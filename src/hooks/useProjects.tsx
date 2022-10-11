import { useQuery } from '@apollo/client';
import { QUERY_PROJECTS } from '../graphql';
import {
  OrderByOptions,
  PaginationInput,
  Project,
  ProjectsGetQueryInput,
} from '../types/generated/graphql';

type ResponseData = {
  projects: {
    projects: Project[];
  };
};

type QueryVariables = {
  input: ProjectsGetQueryInput;
};

type OptionsProps = {
  itemLimit?: number;
  cursorID?: number;
  orderBy?: OrderByOption;
};

export type OrderByOption =
  | 'Newest Projects'
  | 'Oldest Projects'
  | 'Amount Funded';

export const useProjects = ({
  itemLimit = 14,
  orderBy = 'Newest Projects',
  cursorID,
}: OptionsProps) => {
  const paginationOptions: PaginationInput = {
    take: itemLimit,
  };

  if (cursorID !== undefined) {
    paginationOptions.cursor = { id: cursorID };
  }

  function orderByParams(orderByOption: OrderByOption) {
    switch (orderByOption) {
      case 'Newest Projects':
        return {
          createdAt: OrderByOptions.Desc,
        };
      case 'Oldest Projects':
        return {
          createdAt: OrderByOptions.Asc,
        };
      case 'Amount Funded':
        return {
          balance: OrderByOptions.Desc,
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
  } = useQuery<ResponseData, QueryVariables>(QUERY_PROJECTS, {
    variables: {
      input: {
        pagination: paginationOptions,
        orderBy: orderByParams(orderBy),
      },
    },
  });

  return {
    isLoading,
    error,
    data: responseData?.projects.projects || [],
    fetchMore,
  };
};
