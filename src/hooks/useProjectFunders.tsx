import { ApolloError, useQuery } from '@apollo/client';
import { useState } from 'react';
import { QUERY_GET_PROJECT_FUNDERS } from '../graphql';
import {
  PaginationInput,
  GetFundersInput,
  Funder,
} from '../types/generated/graphql';
import { useListenerState } from './useListenerState';

type ResponseData = {
  getFunders: Funder[];
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

export const useProjectFunders = (options?: useProjectFunderProps) => {
  const { itemLimit = 10, cursorID } = options || {};

  const [pagination, setPagination] = useListenerState<PaginationInput>({
    take: itemLimit,
    ...(cursorID !== undefined && { id: cursorID }),
  });

  const [responseData, setResponseData] = useState<Funder[]>([]);

  const [noMoreItems, setNoMoreItems] = useState(false);

  const [isLoadingMore, setIsLoadingMore] = useListenerState(false);

  const {
    loading: isLoading,
    error,
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
    onCompleted(data: ResponseData) {
      setResponseData(data?.getFunders || []);

      if (data?.getFunders.length < itemLimit) {
        setNoMoreItems(true);
      }

      const options: PaginationInput = {};
      options.cursor = {
        id: Number(responseData[responseData.length - 1].id),
      };
      options.take = itemLimit;
      setPagination(options);
    },
  });

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
        if (fetchMoreResult.getFunders.length < itemLimit) {
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
    data: responseData,
    fetchNext,
    noMoreItems,
    isLoadingMore,
  };
};
