import {
  ApolloClient,
  ApolloClientOptions,
  createHttpLink,
  from,
  NormalizedCacheObject,
  split,
} from '@apollo/client'
import { RetryLink } from '@apollo/client/link/retry'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'

import { __development__, API_SERVICE_ENDPOINT } from '../../constants'
import { cache } from './apollo-client-cache'

const retryLink = new RetryLink({
  attempts(count, _, error) {
    const err = error.result.error
    return (
      err &&
      Boolean(
        (err.code === 'STALE_REFRESH_TOKEN' ||
          err.code === 'EXPIRED_REFRESH_TOKEN' ||
          err.code === 'INVALIDE_REFRESH_TOKEN') &&
          count <= 2,
      )
    )
  },
  delay: {
    initial: 300,
  },
})

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
  link: from([retryLink, splitLink]),
  cache,
}

export const client = new ApolloClient(clientConfig)
