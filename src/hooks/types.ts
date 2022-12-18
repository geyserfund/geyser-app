import { ApolloError } from '@apollo/client';
import React from 'react';

export type PaginationHookReturn<T> = {
  isLoading: boolean;
  isLoadingMore: React.MutableRefObject<boolean>;
  error: ApolloError | undefined;
  data: T[];
  count: number;
  fetchNext: () => Promise<void>;
  noMoreItems: boolean;
};
