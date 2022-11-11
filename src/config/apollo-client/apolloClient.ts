import {
  ApolloClient,
  ApolloClientOptions,
  createHttpLink,
  from,
  NormalizedCacheObject,
} from '@apollo/client';
import { API_SERVICE_ENDPOINT, __development__ } from '../../constants';
import { onError } from '@apollo/client/link/error';
import { customHistory } from '..';
import { cache } from './apollo-client-cache';
import { customClientTypeDefs } from './customClientTypeDefs';

const httpLink = createHttpLink({
  uri: `${API_SERVICE_ENDPOINT}/graphql`,
  credentials: 'include',
});

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err && err.extensions && err.extensions.code) {
        if (err.extensions.code === 'UNAUTHENTICATED') {
          customHistory.push(customHistory.location.pathname, {
            loggedOut: true,
          });
        }
      }
    }
  }
});

const clientConfig: ApolloClientOptions<NormalizedCacheObject> = {
  link: from([errorLink, httpLink]),
  cache,
};

if (__development__) {
  clientConfig.typeDefs = customClientTypeDefs;
}

export const client = new ApolloClient(clientConfig);
