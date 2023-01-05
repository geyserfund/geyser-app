import { ApolloError } from '@apollo/client';
import React from 'react';

export type PaginationHookReturn<T> = {
  isLoading: boolean;
  isLoadingMore: React.MutableRefObject<boolean>;
  noMoreItems: React.MutableRefObject<boolean>;
  error: ApolloError | undefined;
  data: T[];
  count?: number;
  fetchNext: () => Promise<void>;
  refetch: any;
};

export type QueryResponseData<T> = {
  [key: string]: T[];
};
