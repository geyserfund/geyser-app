import { ApolloError, useQuery } from '@apollo/client';
import { useEffect, useRef, useState } from 'react';
import { QUERY_GET_PROJECT_FUNDERS } from '../graphql';
import {
  PaginationInput,
  GetFundersInput,
  Funder,
} from '../types/generated/graphql';
import { PaginationHookReturn } from './types';
import { useListenerState } from './useListenerState';

type ResponseData = {
  getFunders: {
    count: number;
    data: Funder[];
  };
};

type QueryVariables = {
  input: GetFundersInput;
};

export type useProjectFunderProps = {
  itemLimit?: number;
  cursorID?: number;
  where?: any;
  onError?: (error: ApolloError) => void;
};

export const useProjectFunders = (
  options?: useProjectFunderProps,
): PaginationHookReturn<Funder> => {
  const { itemLimit = 10, cursorID } = options || {};

  const [paginationOptions, setPaginationOptions] = useState<PaginationInput>({
    take: itemLimit,
    ...(cursorID !== undefined && { id: cursorID }),
  });
  const pagination = useRef(paginationOptions);
  const setPagination = (value: PaginationInput) => {
    pagination.current = value;
    setPaginationOptions(value);
  };

  const [funders, setFunders] = useState<Funder[]>([]);
  const [count, setCount] = useState(0);
  const [noMoreItems, setNoMoreItems] = useState(false);

  const [isLoadingMore, setIsLoadingMore] = useListenerState(false);

  const {
    loading: isLoading,
    error,
    data,
    fetchMore,
  } = useQuery<ResponseData, QueryVariables>(QUERY_GET_PROJECT_FUNDERS, {
    variables: {
      input: {
        pagination: pagination.current,
        where: options?.where,
      },
    },
    fetchPolicy: 'network-only',
    onError: options?.onError,
  });

  useEffect(() => {
    const options: PaginationInput = {};

    if (data && data.getFunders.data.length > 0) {
      setFunders(data.getFunders.data);
      setCount(data.getFunders.count);
      options.cursor = {
        id: Number(data.getFunders.data[data.getFunders.data.length - 1].id),
      };
    }

    options.take = itemLimit;
    setPagination(options);
  }, [data]);

  const fetchNext = async () => {
    setIsLoadingMore(true);

    await fetchMore({
      variables: {
        input: {
          pagination: pagination.current,
          where: options?.where,
        },
      },
      updateQuery: (_, { fetchMoreResult }) => {
        if (fetchMoreResult.getFunders.data.length < itemLimit) {
          setNoMoreItems(true);
        }

        return {
          getFunders: fetchMoreResult.getFunders,
        };
      },
    });

    setIsLoadingMore(false);
  };

  return {
    isLoading,
    error,
    data: funders,
    count,
    fetchNext,
    noMoreItems,
    isLoadingMore,
  };
};
