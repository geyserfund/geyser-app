import { PaginationInput } from '../types/generated/graphql'
import { useListenerState } from './useListenerState'
import { getNestedValue } from './useQueryWithPagination'

export type usePaginationHookProps = {
  fetchMore: any
  queryName: string | string[]
  itemLimit?: number
  cursorID?: number
  where?: any
  orderBy?: any
  resultMap?: (_: any[]) => any[]
}

const thresholdNoOfAggregatedResultsToFetchMore = 10
const noOfTimesToRefetchMore = 5

export const usePaginationHook = <Type,>({
  fetchMore,
  queryName,
  itemLimit = 10,
  cursorID,
  where,
  orderBy,
  resultMap,
}: usePaginationHookProps) => {
  const [list, setList] = useListenerState<Type[]>([])

  const [noMoreItems, setNoMoreItems] = useListenerState(false)

  const [isLoadingMore, setIsLoadingMore] = useListenerState(false)

  const [pagination, setPagination] = useListenerState<PaginationInput>({
    take: itemLimit,
    ...(cursorID !== undefined && { id: cursorID }),
  })

  const handleDataUpdate = (data: Type[]) => {
    if (data && data.length > 0) {
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
        id: Number(tempData[tempData.length - 1].id),
      }
      options.take = itemLimit
      setPagination(options)
    }
  }

  const handleMapData = (data: Type[]) => {
    if (resultMap) {
      return resultMap(data)
    }

    return data
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

        setList([...list.current, ...mappedData])

        if (
          data.length === itemLimit &&
          mappedData.length <= thresholdNoOfAggregatedResultsToFetchMore &&
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
    data: list.current,
  }
}
