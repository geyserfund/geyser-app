import {
  ApolloClient,
  ApolloClientOptions,
  createHttpLink,
  from,
  NormalizedCacheObject,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

import { API_SERVICE_ENDPOINT } from '../../constants';
import { cache } from './apollo-client-cache';

const httpLink = createHttpLink({
  uri: `${API_SERVICE_ENDPOINT}/graphql`,
  credentials: 'include',
});

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err && err.extensions && err.extensions.code) {
        if (err.extensions.code === 'UNAUTHENTICATED') {
          window.location.href = `${window.location.pathname}?loggedOut=true`;
        }
      }
    }
  }
});

const clientConfig: ApolloClientOptions<NormalizedCacheObject> = {
  link: from([errorLink, httpLink]),
  cache,
};

export const client = new ApolloClient(clientConfig);
