import { useQuery } from '@apollo/client';
import { QUERY_PROJECTS } from '../graphql';
import {
  OrderByOptions,
  PaginationInput,
  Project,
  ProjectsGetQueryInput,
  ProjectsOrderByInput,
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
  orderBy?: [ProjectsOrderByInput];
};

export const useProjects = ({
  itemLimit = 14,
  orderBy = [{ balance: OrderByOptions.Desc }],
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
  } = useQuery<ResponseData, QueryVariables>(QUERY_PROJECTS, {
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
    data: responseData?.projects.projects || [],
    fetchMore,
  };
};
