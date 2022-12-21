import { DocumentNode, useQuery } from '@apollo/client';
import { isDocumentNode } from '@apollo/client/utilities';
import { useEffect, useState } from 'react';
import { PaginationHookReturn, QueryResponseData } from './types';
import { usePaginationHook } from './usePaginationHook';

export type useQueryWithPaginationProps = {
  query: DocumentNode;
  queryName: string;
  itemLimit?: number;
  where?: any;
  orderBy?: any;
  resultMap?: (_: any[]) => any[];
};

export const useQueryWithPagination = <Type,>({
  itemLimit = 10,
  where,
  query,
  queryName,
  resultMap,
  orderBy,
}: useQueryWithPaginationProps): PaginationHookReturn<Type> => {
  const [items, setItems] = useState<Type[]>([]);

  if (!isDocumentNode(query)) {
    throw Error('Invalid query');
  }

  const { error, loading, fetchMore } = useQuery<QueryResponseData<Type>>(
    query,
    {
      variables: {
        input: {
          pagination: {
            take: itemLimit,
          },
          where,
          orderBy,
        },
        fetch,
      },
      onCompleted(data) {
        const resultItems = data[queryName];
        handleDataUpdate(resultItems);
      },
    },
  );

  const { data, isLoadingMore, fetchNext, noMoreItems, handleDataUpdate } =
    usePaginationHook<Type>({
      fetchMore,
      queryName,
      itemLimit,
      where,
      orderBy,
    });

  useEffect(() => {
    if (data && data.length > 0) {
      let newItems;

      if (resultMap) {
        newItems = resultMap(data);
      } else {
        newItems = data;
      }

      setItems(newItems);

      if (
        data.length === itemLimit &&
        newItems.length < itemLimit - 2 &&
        !noMoreItems.current
      ) {
        fetchNext();
      }
    }
  }, [data]);

  return {
    isLoading: loading,
    isLoadingMore,
    noMoreItems,
    data: items,
    error,
    fetchNext,
  };
};
