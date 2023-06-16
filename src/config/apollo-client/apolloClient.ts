import {
  ApolloClient,
  ApolloClientOptions,
  createHttpLink,
  from,
  NormalizedCacheObject,
  split,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'

import { __development__, API_SERVICE_ENDPOINT } from '../../constants'
import { cache } from './apollo-client-cache'

const httpLink = createHttpLink({
  uri: `${API_SERVICE_ENDPOINT}/graphql`,
  credentials: 'include',
})

const prefix = __development__ ? 'ws' : 'wss'

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${prefix}://${API_SERVICE_ENDPOINT.split('//')[1]}/graphql`,
  }),
)

const errorLink = onError(({ graphQLErrors, forward, operation }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err && err.extensions && err.extensions.code) {
        switch (err.extensions.code) {
          case 'UNAUTHENTICATED':
            window.location.href = `${window.location.pathname}?loggedOut=true`
            break
          case 'EXPIRED_REFRESH_TOKEN':
            return forward(operation)
          default:
            break
        }
      }
    }
  }
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink,
)

const clientConfig: ApolloClientOptions<NormalizedCacheObject> = {
  link: from([errorLink, splitLink]),
  cache,
}

export const client = new ApolloClient(clientConfig)
