import { DocumentNode, QueryHookOptions, useQuery } from '@apollo/client'
import { isDocumentNode } from '@apollo/client/utilities'

import { PaginationHookReturn, QueryResponseData } from './types'
import { usePaginationHook } from './usePaginationHook'

export type useQueryWithPaginationProps<TEntity, TTransformed = TEntity> = {
  query: DocumentNode
  queryName: string | string[]
  itemLimit?: number
  where?: any
  orderBy?: any
  resultMap?: (_: TEntity[]) => TTransformed[]
  options?: QueryHookOptions
  skipPagination?: boolean
}

export const useQueryWithPagination = <TEntity, TTransformed = TEntity>({
  itemLimit = 10,
  where,
  query,
  queryName,
  resultMap,
  orderBy,
  options,
  skipPagination,
}: useQueryWithPaginationProps<TEntity, TTransformed>) => {
  if (!isDocumentNode(query)) {
    throw Error('Invalid query')
  }

  const { error, loading, fetchMore, refetch } = useQuery<
    QueryResponseData<TEntity>
  >(query, {
    fetchPolicy: 'network-only',
    variables: {
      input: {
        pagination: {
          take: itemLimit,
        },
        where,
        orderBy,
      },
    },
    ...options,
    onCompleted(data) {
      const resultItems = getNestedValue<QueryResponseData<TEntity>>(
        data,
        queryName,
      )
      handleDataUpdate(resultItems)
      if (skipPagination) {
        setNoMoreItems(true)
      }

      if (options && options.onCompleted) {
        options.onCompleted(data)
      }
    },
  })

  const {
    data,
    isLoadingMore,
    fetchNext,
    noMoreItems,
    handleDataUpdate,
    setNoMoreItems,
  } = usePaginationHook<TEntity, TTransformed>({
    fetchMore,
    resultMap,
    queryName,
    itemLimit,
    where,
    orderBy,
  })

  return {
    isLoading: loading,
    isLoadingMore,
    noMoreItems,
    data,
    error,
    fetchNext,
    refetch,
  } as PaginationHookReturn<(typeof data)[number]>
}

export function getNestedValue<T extends Record<string, any>>(
  obj: T,
  name: string | string[],
) {
  if (typeof name === 'string') {
    return obj[name]
  }

  if (typeof name === 'object') {
    let finalValue = obj
    name.map((val) => {
      finalValue = finalValue[val]
    })
    return finalValue
  }
}
