import { PaginationInput } from '../types/generated/graphql';
import { useListenerState } from './useListenerState';

export type usePaginationHookProps = {
  fetchMore: any;
  queryName: string;
  itemLimit?: number;
  cursorID?: number;
  where?: any;
  orderBy?: any;
  resultMap?: (_: any[]) => any[];
};

export const usePaginationHook = <Type,>({
  fetchMore,
  queryName,
  itemLimit = 10,
  cursorID,
  where,
  orderBy,
  resultMap,
}: usePaginationHookProps) => {
  const [list, setList] = useListenerState<Type[]>([]);

  const [noMoreItems, setNoMoreItems] = useListenerState(false);

  const [isLoadingMore, setIsLoadingMore] = useListenerState(false);

  const [pagination, setPagination] = useListenerState<PaginationInput>({
    take: itemLimit,
    ...(cursorID !== undefined && { id: cursorID }),
  });

  const handleDataUpdate = (data: Type[]) => {
    if (data && data.length > 0) {
      if (data.length < itemLimit) {
        setNoMoreItems(true);
      }

      handlePaginationChange(data);

      const mappedData = handleMapData(data);

      if (
        data.length === itemLimit &&
        mappedData.length < itemLimit - 2 &&
        !noMoreItems.current
      ) {
        fetchNext();
      }

      setList(mappedData);
    }
  };

  const handlePaginationChange = (tempData: any[]) => {
    if (tempData.length > 0) {
      const options: PaginationInput = {};
      options.cursor = {
        id: Number(tempData[tempData.length - 1].id),
      };
      options.take = itemLimit;
      setPagination(options);
    }
  };

  const handleMapData = (data: Type[]) => {
    if (resultMap) {
      return resultMap(data);
    }

    return data;
  };

  const fetchNext = async () => {
    if (noMoreItems.current) {
      return;
    }

    setIsLoadingMore(true);

    await fetchMore({
      variables: {
        input: {
          pagination: pagination.current,
          where,
          orderBy,
        },
      },
      updateQuery: (_: any, { fetchMoreResult }: any) => {
        if (fetchMoreResult[queryName].length < itemLimit) {
          setNoMoreItems(true);
        }

        handlePaginationChange(fetchMoreResult[queryName]);

        const mappedData = handleMapData(fetchMoreResult[queryName]);

        setList([...list.current, ...mappedData]);

        return null;
      },
    });

    setIsLoadingMore(false);
  };

  return {
    handleDataUpdate,
    isLoadingMore,
    fetchNext,
    noMoreItems,
    data: list.current,
  };
};
