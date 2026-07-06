import type { SetStateAction } from 'jotai'
import type { Dispatch } from 'react'

import type { PaginationInput } from '../../../types/generated/graphql.ts'
import { validNumber } from '../../../utils/validations/regex.ts'
import { useListenerState } from '../useListenerState'
import { getNestedValue } from '../useQueryWithPagination'

export type PaginatedListType<TEntity, TTransformed = TEntity> = TTransformed extends never[]
  ? TEntity[]
  : TTransformed[]

type SetAtom<Args extends unknown[], Result> = (...args: Args) => Result

const getItemId = (item: unknown) => {
  if (item && typeof item === 'object' && 'id' in item) {
    const { id } = item as { id?: unknown }

    if (id !== null && id !== undefined) {
      return `${id}`
    }
  }

  return undefined
}

export const getUniqueItemsById = <TEntity,>(items: TEntity[]) => {
  const seenIds = new Set<string>()

  return items.filter((item) => {
    const id = getItemId(item)

    if (!id) {
      return true
    }

    if (seenIds.has(id)) {
      return false
    }

    seenIds.add(id)
    return true
  })
}

export const getItemsWithNewIds = <TEntity,>(items: TEntity[], existingIds: Set<string>) => {
  return getUniqueItemsById(items).filter((item) => {
    const id = getItemId(item)
    return !id || !existingIds.has(id)
  })
}

export const getMergedItemIds = <TEntity,>(existingIds: Set<string>, items: TEntity[]) => {
  const itemIds = new Set(existingIds)

  items.forEach((item) => {
    const id = getItemId(item)

    if (id) {
      itemIds.add(id)
    }
  })

  return itemIds
}

export type usePaginationAtomHookProps<TEntity, TTransformed = TEntity> = {
  fetchMore: any
  queryName: string | string[]
  itemLimit?: number
  cursorID?: number
  where?: any
  variables?: any
  orderBy?: any
  resultMap?: (_: TEntity[]) => TTransformed[]
  setData:
    | SetAtom<[SetStateAction<PaginatedListType<TEntity, TTransformed>>], void>
    | Dispatch<SetStateAction<PaginatedListType<TEntity, TTransformed>>>
}

const thresholdNoOfAggregatedResultsToFetchMore = 5
const noOfTimesToRefetchMore = 5

export const usePaginationAtomHook = <TEntity, TTransformed = TEntity>({
  fetchMore,
  queryName,
  itemLimit = 10,
  cursorID,
  where,
  variables,
  orderBy,
  resultMap,
  setData,
}: usePaginationAtomHookProps<TEntity, TTransformed>) => {
  const [noMoreItems, setNoMoreItems] = useListenerState(true)

  const [isLoadingMore, setIsLoadingMore] = useListenerState(false)

  const [pagination, setPagination] = useListenerState<PaginationInput>({
    take: itemLimit,
    ...(cursorID !== undefined && { id: cursorID }),
  })

  const [seenItemIds, setSeenItemIds] = useListenerState(new Set<string>())

  const handleDataUpdate = (data: TEntity[]) => {
    if (data) {
      if (data.length < itemLimit) {
        setNoMoreItems(true)
      } else {
        setNoMoreItems(false)
      }

      const uniqueData = getUniqueItemsById(data)
      setSeenItemIds(getMergedItemIds(new Set<string>(), uniqueData))
      handlePaginationChange(uniqueData)

      const mappedData = handleMapData(uniqueData)

      if (
        uniqueData.length === itemLimit &&
        uniqueData.length - mappedData.length > thresholdNoOfAggregatedResultsToFetchMore &&
        !noMoreItems.current
      ) {
        fetchNext()
      }

      setData(mappedData)
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

  const handleMapData = (data: TEntity[]): PaginatedListType<TEntity, TTransformed> => {
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
        ...variables,
      },
      updateQuery(_: any, { fetchMoreResult }: any) {
        const data = getNestedValue(fetchMoreResult, queryName) || []

        if (data.length < itemLimit) {
          setNoMoreItems(true)
        }

        const newData = getItemsWithNewIds<TEntity>(data, seenItemIds.current)

        if (newData.length === 0) {
          setNoMoreItems(true)
          return null
        }

        setSeenItemIds(getMergedItemIds(seenItemIds.current, newData))
        handlePaginationChange(getUniqueItemsById(data))

        const mappedData: PaginatedListType<TEntity, TTransformed> = handleMapData(newData)

        setData((prev) => {
          const mappedItems = mappedData as Array<TEntity | TTransformed>
          const previousItems = prev as Array<TEntity | TTransformed>
          const uniqueMappedData = getItemsWithNewIds(mappedItems, getMergedItemIds(new Set<string>(), previousItems))

          return [...prev, ...uniqueMappedData] as PaginatedListType<TEntity, TTransformed>
        })

        // If the aggregated length of the data is too small next pagination is automatically fetched
        if (
          data.length === itemLimit &&
          newData.length - mappedData.length >= thresholdNoOfAggregatedResultsToFetchMore &&
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
    setNoMoreItems,
  }
}
