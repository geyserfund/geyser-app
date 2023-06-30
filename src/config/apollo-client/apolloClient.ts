import {
  ApolloClient,
  ApolloClientOptions,
  createHttpLink,
  FetchResult,
  from,
  NormalizedCacheObject,
  Observable,
  split,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { RetryLink } from '@apollo/client/link/retry'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'

import { __development__, API_SERVICE_ENDPOINT } from '../../constants'
import { cache } from './apollo-client-cache'

const link = new RetryLink({
  attempts(count, operation, error) {
    console.log('checking error in retry link', error, error.status)
    return false
  },
  delay(count, operation, error) {
    return 500
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
function timeout(ms: number) {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const errorLink = onError(
  ({ networkError, graphQLErrors, forward, operation, response }) => {
    console.log(
      'network error in error link',
      networkError,
      // @ts-ignore
      networkError?.response,
      // @ts-ignore
      networkError?.result,
    )
    console.log('network resoibse in error link', response)
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (err && err.extensions && err.extensions.code) {
          switch (err.extensions.code) {
            case 'UNAUTHENTICATED':
              window.location.href = `${window.location.pathname}?loggedOut=true`
              break
            case 'EXPIRED_REFRESH_TOKEN': {
              window.location.href = `${window.location.pathname}?loggedOut=true`
              break
            }

            case 'STALE_REFRESH_TOKEN': {
              const observable = new Observable<
                FetchResult<Record<string, any>>
              >((observer) => {
                // used an annonymous function for using an async function
                ;(async () => {
                  try {
                    await timeout(500)

                    // Retry the failed request
                    const subscriber = {
                      next: observer.next.bind(observer),
                      error: observer.error.bind(observer),
                      complete: observer.complete.bind(observer),
                    }

                    forward(operation).subscribe(subscriber)
                  } catch (err) {
                    observer.error(err)
                  }
                })()
              })

              return observable
            }

            default:
              break
          }
        }
      }
    }
  },
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
  link: from([link, errorLink, splitLink]),
  cache,
}

export const client = new ApolloClient(clientConfig)
