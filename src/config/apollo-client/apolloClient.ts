import {
  type ApolloLink,
  ApolloClient,
  ApolloClientOptions,
  createHttpLink,
  from,
  NormalizedCacheObject,
  split,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { RetryLink } from '@apollo/client/link/retry'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'

import { __development__, getPath } from '../../shared/constants'
import { toInt } from '../../utils'
import { getAppEndPoint } from '../domain'
import { createApolloCache } from './apolloClientCache'

export type CreateApolloClientOptions = {
  ssr?: boolean
  headers?: Record<string, string>
  initialState?: NormalizedCacheObject
  fetchImplementation?: typeof fetch
  onAuthError?: () => void
}

const logoutCodes = new Set(['EXPIRED_REFRESH_TOKEN', 'INVALID_REFRESH_TOKEN', 'INVALID_ACCESS_TOKEN'])

const createRetryLink = () =>
  new RetryLink({
    attempts(count, _, error) {
      const err = error?.result?.error
      const statusCode = toInt(`${error?.statusCode}`)

      return (
        count <= 4 &&
        (Boolean(err && (err.code === 'STALE_REFRESH_TOKEN' || err.code === 'EXPIRED_ACCESS_TOKEN')) ||
          statusCode === 408)
      )
    },
    delay: {
      initial: 300,
    },
  })

const createErrorLink = ({ ssr, onAuthError }: Pick<CreateApolloClientOptions, 'ssr' | 'onAuthError'>) =>
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach((gqlError) => {
        if (logoutCodes.has(gqlError.extensions?.code as string)) {
          if (ssr) {
            onAuthError?.()
            return
          }

          if (typeof window !== 'undefined') {
            window.location.href = getPath('logout')
          }
        }
      })
    }

    if (networkError) console.log(`[Network error]: ${networkError}`)
  })

const createHttpApolloLink = ({
  headers,
  fetchImplementation,
}: Pick<CreateApolloClientOptions, 'headers' | 'fetchImplementation'>) => {
  const hostName = headers?.host?.split(':')[0]
  const apiServiceEndPoint = getAppEndPoint(hostName)

  return createHttpLink({
    uri: `${apiServiceEndPoint}/graphql`,
    credentials: 'include',
    headers,
    fetch: fetchImplementation,
  })
}

const createBrowserLink = (httpLink: ApolloLink) => {
  const apiServiceEndPoint = getAppEndPoint()
  const wsProtocol = apiServiceEndPoint.startsWith('http://') ? 'ws' : 'wss'

  let restartRequestedBeforeConnected = false
  let gracefullyRestart = () => {
    restartRequestedBeforeConnected = true
  }

  let activeSocket: WebSocket | null = null
  let timedOut: ReturnType<typeof setTimeout> | undefined

  const closeSocket = (socket: WebSocket | null) => {
    if (socket?.readyState === WebSocket?.OPEN) {
      socket?.close(4408, 'Request Timeout')
    }
  }

  const wsLink = new GraphQLWsLink(
    createClient({
      url: `${wsProtocol}://${apiServiceEndPoint.split('//')[1]}/graphql`,
      retryAttempts: Infinity,
      shouldRetry: () => true,
      keepAlive: 10000,
      on: {
        error() {
          if (activeSocket) {
            closeSocket(activeSocket)
          }
        },
        connected(socket: any) {
          activeSocket = socket
          gracefullyRestart = () => {
            closeSocket(socket)
          }

          if (restartRequestedBeforeConnected) {
            restartRequestedBeforeConnected = false
            gracefullyRestart()
          }
        },
        ping(received) {
          if (!received) {
            timedOut = setTimeout(() => {
              closeSocket(activeSocket)
            }, 5000)
          }
        },
        pong(received) {
          if (received && timedOut) {
            clearTimeout(timedOut)
          }
        },
      },
    }),
  )

  return split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    },
    wsLink,
    httpLink,
  )
}

export const createApolloClient = (options: CreateApolloClientOptions = {}) => {
  const { ssr = false, headers, initialState, fetchImplementation, onAuthError } = options

  const httpLink = createHttpApolloLink({ headers, fetchImplementation })
  const link = ssr ? httpLink : createBrowserLink(httpLink)

  const clientConfig: ApolloClientOptions<NormalizedCacheObject> = {
    ssrMode: ssr,
    link: from([createErrorLink({ ssr, onAuthError }), createRetryLink(), link]),
    cache: createApolloCache().restore(initialState || {}),
    connectToDevTools: __development__ && !ssr,
  }

  return new ApolloClient(clientConfig)
}

let browserApolloClient: ApolloClient<NormalizedCacheObject> | null = null

export const getBrowserApolloClient = (initialState?: NormalizedCacheObject) => {
  if (!browserApolloClient) {
    browserApolloClient = createApolloClient({ initialState })
    return browserApolloClient
  }

  if (initialState) {
    browserApolloClient.cache.restore({
      ...browserApolloClient.extract(),
      ...initialState,
    })
  }

  return browserApolloClient
}

export const createServerApolloClient = (options: Omit<CreateApolloClientOptions, 'ssr'> = {}) =>
  createApolloClient({
    ...options,
    ssr: true,
  })
