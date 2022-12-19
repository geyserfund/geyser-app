import { useQuery } from '@apollo/client';
import { getOperationName, isDocumentNode } from '@apollo/client/utilities';
import { getOperationDefinition } from 'apollo-utilities';
import { useEffect, useState } from 'react';
import { QUERY_GET_FUNDING_TXS_LANDING } from '../graphql';
import { FundingTx, GetFundingTxsInput } from '../types/generated/graphql';
import { aggregateTransactions, FundingTxWithCount } from '../utils';
import { PaginationHookReturn } from './types';
import { usePaginationHook } from './usePaginationHook';

export type UseAbstractItemQueryProps = {
  query: typeof QUERY_GET_FUNDING_TXS_LANDING; // type needs to be updated
  itemLimit?: number;
  where?: any; // Can be used to order and filter server-side
  resultMap?: (_: any[]) => any[]; // Can be used to aggregate (and maybe order and filter?) client-side
};

export default function useAbstractItemsQuery<
  TResponseData,
  TQueryVariables,
  THookList,
>({
  itemLimit = 10,
  where,
  query,
  resultMap,
}: UseAbstractItemQueryProps): PaginationHookReturn<THookList> {
  const [items, setItems] = useState<THookList[]>([]);

  /* 
    Verify the query type and obtain the query name
  */
  if (!isDocumentNode(query)) {
    /*
      TODO: 
      1. Throw more useful error
      2. Is this the right hook to do error handling?
    */
    throw Error();
  }

  const queryName = getOperationName(query);

  if (!queryName) {
    throw new Error();
  }

  const { error, loading, data, fetchMore } = useQuery<
    TResponseData,
    TQueryVariables
  >(query, {
    variables: {
      input: {
        pagination: {
          take: itemLimit,
        },
        where,
      },
    },
  });

  const { isLoadingMore, fetchNext, noMoreItems, handleDataUpdate } =
    usePaginationHook({
      fetchMore,
      queryName,
      itemLimit,
    });

  useEffect(() => {
    if (data && data[queryName as keyof typeof data].data) {
      const resultItems = data[queryName as keyof typeof data].data;
      handleDataUpdate(resultItems);

      let newItems;

      if (resultMap) {
        newItems = resultMap(resultItems);
      } else {
        newItems = resultItems;
      }

      setItems(newItems);

      if (resultItems.length === 10 && newItems.length < 8 && !noMoreItems) {
        fetchNext();
      }
    }
  }, [data]);
  return {
    isLoading: loading,
    isLoadingMore,
    noMoreItems,
    data: items,
    count: data?.[queryName as keyof typeof data].count || 0,
    error,
    fetchNext,
  };
}

/* EXAMPLE */
type ResponseData = {
  getFundingTxs: {
    count: number;
    data: FundingTx[];
  };
};

type QueryVariables = {
  input: GetFundingTxsInput;
};

useAbstractItemsQuery<ResponseData, QueryVariables, FundingTxWithCount>({
  query: QUERY_GET_FUNDING_TXS_LANDING,
  itemLimit: 10,
  where: { projectId: 1 },
  resultMap: aggregateTransactions,
});

/* 

MORE NOTES:

1. This abstraction could be extended to encapsulate the fetching logic of multiple item types (eg: entries, project, etc).

For example, by changing the props to: 
{
  queries: [
    {
      query: DocumentNode,
      where: {},
      resultMap: (_: []) => [], // local aggregation function specific to item type
    }
  ],
  resultMap: (_: []) => [], // local aggregation function for entire result list
}

2. This one is just an idea, not sure if it makes sense. We could have an abstract UI component to show the results of
these queries.

eg: ProjectFundingContributionsFeedItem -> `ProjectActivityFeedItem`

The `ProjectActivityFeedItem` could take a `showTypes` array so that it only shows the relevant information. 

For example in the landing page, `showTypes` would be `['entries', 'fundingTxs', 'projects']. In the Project sidebar it 
would be only `['fundingTxs'].
*/
