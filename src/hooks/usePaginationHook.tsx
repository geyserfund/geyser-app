import { PaginationInput } from '../types/generated/graphql';
import { useListenerState } from './useListenerState';

export type usePaginationHookProps = {
  fetchMore: any;
  queryName: string;
  itemLimit?: number;
  cursorID?: number;
  where?: any;
  orderBy?: any;
};

export const usePaginationHook = <Type,>({
  fetchMore,
  queryName,
  itemLimit = 10,
  cursorID,
  where,
  orderBy,
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
      setList(data);

      if (data.length < itemLimit) {
        setNoMoreItems(true);
      }

      const options: PaginationInput = {};

      const tempData: any = data;
      options.cursor = {
        id: Number(tempData[tempData.length - 1].id),
      };
      options.take = itemLimit;
      setPagination(options);
    }
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
        } else {
          setNoMoreItems(false);
        }

        handleDataUpdate([...list.current, ...fetchMoreResult[queryName]]);

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
