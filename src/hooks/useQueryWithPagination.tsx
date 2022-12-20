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

  const { error, loading, data, fetchMore } = useQuery<QueryResponseData<Type>>(
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
      },
    },
  );
  const { isLoadingMore, fetchNext, noMoreItems, handleDataUpdate } =
    usePaginationHook({
      fetchMore,
      queryName,
      itemLimit,
      where,
      orderBy,
    });

  useEffect(() => {
    if (data && data[queryName]) {
      const resultItems = data[queryName];
      handleDataUpdate(resultItems);

      let newItems;

      if (resultMap) {
        newItems = resultMap(resultItems);
      } else {
        newItems = resultItems;
      }

      setItems(newItems);

      if (
        resultItems.length === itemLimit &&
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
