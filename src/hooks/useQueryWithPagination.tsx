import { DocumentNode, QueryHookOptions, useQuery } from '@apollo/client'
import { isDocumentNode } from '@apollo/client/utilities'

import { PaginationHookReturn, QueryResponseData } from './types'
import { usePaginationHook } from './usePaginationHook'

export type useQueryWithPaginationProps = {
  query: DocumentNode
  queryName: string | string[]
  itemLimit?: number
  where?: any
  orderBy?: any
  resultMap?: (_: any[]) => any[]
  options?: QueryHookOptions
}

export const useQueryWithPagination = <Type,>({
  itemLimit = 10,
  where,
  query,
  queryName,
  resultMap,
  orderBy,
  options,
}: useQueryWithPaginationProps): PaginationHookReturn<Type> => {
  if (!isDocumentNode(query)) {
    throw Error('Invalid query')
  }

  const { error, loading, fetchMore, refetch } = useQuery<
    QueryResponseData<Type>
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
      const resultItems = getNestedValue(data, queryName)
      handleDataUpdate(resultItems)
      if (options && options.onCompleted) {
        options.onCompleted(data)
      }
    },
  })

  const { data, isLoadingMore, fetchNext, noMoreItems, handleDataUpdate } =
    usePaginationHook<Type>({
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
  }
}

export const getNestedValue = (obj: any, name: string | string[]) => {
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
