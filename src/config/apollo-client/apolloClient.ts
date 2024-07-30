import { ApolloClient, ApolloClientOptions, createHttpLink, from, NormalizedCacheObject, split } from '@apollo/client'
import { RetryLink } from '@apollo/client/link/retry'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'

import { __development__ } from '../../shared/constants'
import { toInt } from '../../utils'
import { getAppEndPoint } from '../domain'
import { cache } from './apolloClientCache'

const retryLink = new RetryLink({
  attempts(count, _, error) {
    const err = error?.result?.error
    const statusCode = toInt(`${error?.statusCode}`)

    return (
      count <= 4 &&
      (Boolean(
        err &&
          (err.code === 'STALE_REFRESH_TOKEN' ||
            err.code === 'EXPIRED_REFRESH_TOKEN' ||
            err.code === 'INVALIDE_REFRESH_TOKEN'),
      ) ||
        statusCode === 408)
    )
  },
  delay: {
    initial: 300,
  },
})

const apiServiceEndPoint = getAppEndPoint()
const httpLink = createHttpLink({
  uri: `${apiServiceEndPoint}/graphql`,
  credentials: 'include',
})

const prefix = 'wss'

let restartRequestedBeforeConnected = false
let gracefullyRestart = () => {
  restartRequestedBeforeConnected = true
}

let activeSocket: WebSocket | null = null
let timedOut: any = 0

const closeSocket = (socket: WebSocket | null) => {
  if (socket?.readyState === WebSocket?.OPEN) {
    socket?.close(4408, 'Request Timeout')
  }
}

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${prefix}://${apiServiceEndPoint.split('//')[1]}/graphql`,
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
        activeSocket = socket // save the active socket for later use
        // restart by closing the socket which will trigger a silent reconnect
        gracefullyRestart = () => {
          closeSocket(socket)
        }

        // if any restarts were missed during the connection
        // phase, restart and reset the request
        if (restartRequestedBeforeConnected) {
          restartRequestedBeforeConnected = false
          gracefullyRestart()
        }
      },
      ping(received) {
        if (!received) {
          // sent
          timedOut = setTimeout(() => {
            closeSocket(activeSocket)
          }, 5000)
        } // wait 5 seconds for the pong and then close the connection
      },
      pong(received) {
        if (received) {
          clearTimeout(timedOut)
        } // pong is received, clear connection close timeout
      },
    },
  }),
)

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  httpLink,
)

const clientConfig: ApolloClientOptions<NormalizedCacheObject> = {
  link: from([retryLink, splitLink]),
  cache,
  // resolvers: {
  //   Mutation: {
  //     ProjectRewardCreate(_, data, { cache }) {
  //       const reward = data?.projectRewardCreate

  //       cache.writeQuery({
  //         query: QUERY_PROJECT_REWARD,
  //         data: {
  //           __typename: 'ProjectReward',
  //           getProjectReward: reward,
  //         },
  //       })

  //       cache.modify({
  //         fields: {
  //           projectRewardsGet(existingRewards = []) {
  //             return [reward, ...existingRewards]
  //           },
  //         },
  //       })
  //     },
  //   },
  // },
}

export const client = new ApolloClient(clientConfig)
