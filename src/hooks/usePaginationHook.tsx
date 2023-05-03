import { useState } from 'react'

import { PaginationInput } from '../types/generated/graphql'
import { validNumber } from '../utils'
import { useListenerState } from './useListenerState'
import { getNestedValue } from './useQueryWithPagination'

export type usePaginationHookProps<TEntity, TTransformed = TEntity> = {
  fetchMore: any
  queryName: string | string[]
  itemLimit?: number
  cursorID?: number
  where?: any
  orderBy?: any
  resultMap?: (_: TEntity[]) => TTransformed[]
}

export type PaginatedListType<
  TEntity,
  TTransformed = TEntity,
> = TTransformed extends never[] ? TEntity[] : TTransformed[]

const thresholdNoOfAggregatedResultsToFetchMore = 5
const noOfTimesToRefetchMore = 5

export const usePaginationHook = <TEntity, TTransformed = TEntity>({
  fetchMore,
  queryName,
  itemLimit = 10,
  cursorID,
  where,
  orderBy,
  resultMap,
}: usePaginationHookProps<TEntity, TTransformed>) => {
  const [list, setList] = useState<PaginatedListType<TEntity, TTransformed>>(
    [] as unknown as PaginatedListType<TEntity, TTransformed>,
  )

  const [noMoreItems, setNoMoreItems] = useListenerState(false)

  const [isLoadingMore, setIsLoadingMore] = useListenerState(false)

  const [pagination, setPagination] = useListenerState<PaginationInput>({
    take: itemLimit,
    ...(cursorID !== undefined && { id: cursorID }),
  })

  const handleDataUpdate = (data: TEntity[]) => {
    if (data) {
      if (data.length < itemLimit) {
        setNoMoreItems(true)
      }

      handlePaginationChange(data)

      const mappedData = handleMapData(data)

      if (
        data.length === itemLimit &&
        data.length - mappedData.length >
          thresholdNoOfAggregatedResultsToFetchMore &&
        !noMoreItems.current
      ) {
        fetchNext()
      }

      setList(mappedData)
    }
  }

  const handlePaginationChange = (tempData: any[]) => {
    if (tempData.length > 0) {
      const options: PaginationInput = {}
      options.cursor = {
        id: validNumber.test(`${tempData[tempData.length - 1].id}`)
          ? Number(tempData[tempData.length - 1].id)
          : tempData[tempData.length - 1].id,
      }
      options.take = itemLimit
      setPagination(options)
    }
  }

  const handleMapData = (
    data: TEntity[],
  ): PaginatedListType<TEntity, TTransformed> => {
    if (resultMap) {
      return resultMap(data) as PaginatedListType<TEntity, TTransformed>
    }

    return data as PaginatedListType<TEntity, TTransformed>
  }

  const fetchNext = async (count?: number) => {
    if (noMoreItems.current) {
      return
    }

    setIsLoadingMore(true)

    await fetchMore({
      variables: {
        input: {
          pagination: pagination.current,
          where,
          orderBy,
        },
      },
      updateQuery(_: any, { fetchMoreResult }: any) {
        const data = getNestedValue(fetchMoreResult, queryName)

        if (data.length < itemLimit) {
          setNoMoreItems(true)
        }

        handlePaginationChange(data)

        const mappedData = handleMapData(data)

        setList(
          (current) =>
            [...current, ...mappedData] as PaginatedListType<
              TEntity,
              TTransformed
            >,
        )
        // If the aggregated length of the data is too small next pagination is automatically fetched
        if (
          data.length === itemLimit &&
          data.length - mappedData.length >=
            thresholdNoOfAggregatedResultsToFetchMore &&
          (count ? count < noOfTimesToRefetchMore : true)
        ) {
          fetchNext(count ? count + 1 : 1)
        }

        return null
      },
    })

    setIsLoadingMore(false)
  }

  return {
    handleDataUpdate,
    isLoadingMore,
    fetchNext,
    noMoreItems,
    data: list,
  }
}
