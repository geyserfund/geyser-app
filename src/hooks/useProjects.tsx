import { useQuery } from '@apollo/client';
import { QUERY_PROJECTS } from '../graphql';
import { IProject } from '../interfaces';

export type OrderByOption =
  | 'Newest Projects'
  | 'Oldest Projects'
  | 'Amount Funded';

type OptionsProps = {
  itemLimit?: number;
  orderBy?: OrderByOption;
};

type ResponseData = IProject[];

// TODO: Leverage auto-generated schema types after
// https://github.com/geyserfund/geyser-app/pull/346 is merged.

// export const useProjects = (options?: OptionsProps) => {
export const useProjects = ({
  itemLimit = 14,
  orderBy = 'Newest Projects',
}: OptionsProps) => {
  // const { itemLimit = 14, orderBy = 'createdAt' } = options || {};

  // function orderByParams(orderByOption: OrderBy): ProjectsOrderByInput {
  function orderByParams(orderByOption: OrderByOption) {
    switch (orderByOption) {
      case 'Newest Projects':
        return {
          // createdAt: OrderByOptions.desc,
          createdAt: 'desc',
        };
      case 'Oldest Projects':
        return {
          // createdAt: OrderByOptions.asc,
          createdAt: 'asc',
        };
      case 'Amount Funded':
        return {
          // balance: OrderByOptions.desc,
          balance: 'desc',
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
