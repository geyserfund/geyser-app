import {
  ApolloClient,
  ApolloClientOptions,
  createHttpLink,
  from,
  NormalizedCacheObject,
  // ApolloLink,
  // Observable,
  // FetchResult,
  // Operation,
  split,
} from '@apollo/client';
import { API_SERVICE_ENDPOINT } from '../../constants';
import { getMainDefinition } from '@apollo/client/utilities';
import { onError } from '@apollo/client/link/error';
import { customHistory } from '..';
import { cache } from './apollo-client-cache';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const wsLink = new GraphQLWsLink(
  createClient({
    url: `wss://api.dev.geyser.fund/graphql`,
  }),
);

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

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const clientConfig: ApolloClientOptions<NormalizedCacheObject> = {
  link: from([errorLink, splitLink]),
  cache,
};

export const client = new ApolloClient(clientConfig);
