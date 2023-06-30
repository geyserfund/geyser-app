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
  attempts(count, operation, error) {
    const err = error.result.error
    return (
      err &&
      Boolean(
        err.code === 2 && err.message.includes('refresh token') && count <= 2,
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
