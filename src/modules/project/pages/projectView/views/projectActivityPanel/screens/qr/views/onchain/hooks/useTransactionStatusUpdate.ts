import { captureException } from '@sentry/react'
import { useCallback, useEffect } from 'react'
import useWebSocket from 'react-use-websocket'

import { __production__, __staging__ } from '../../../../../../../../../../../constants'

export const getSwapServiceDomain = () => {
  if (__production__) {
    return 'api.boltz.exchange'
  }

  if (__staging__) {
    return 'api.testnet.boltz.exchange'
  }

  return 'swap.dev.geyser.fund'
}

const swapServiceDomain = getSwapServiceDomain()
const swapServiceWsEndpoint = `wss://${swapServiceDomain}/v2/ws`

const HEARTBEAT_INTERVAL_MS = __production__ ? 5_000 : 30_000

const SwapStatus = [
  'swap.created',
  'transaction.mempool',
  'transaction.confirmed',
  'invoice.set',
  'invoice.pending',
  'invoice.paid',
  'transaction.claim.pending',
  'transaction.claimed',
  'invoice.failedToPay',
  'transaction.lockupFailed',
  'swap.expired',
] as const
export type SwapStatusType = (typeof SwapStatus)[number]

export type SwapStatusUpdate = {
  id: string
  status: SwapStatusType
  transaction?: { id: string; hex?: string }
  error?: string
}

type useTransactionStatusUpdateProps = {
  swapId?: string
  handleConfirmed: Function
  handleFailed: Function
}

export const useTransactionStatusUpdate = ({
  swapId,
  handleConfirmed,
  handleFailed,
}: useTransactionStatusUpdateProps) => {
  const { sendMessage, lastJsonMessage, readyState } = useWebSocket<any>(swapServiceWsEndpoint, {
    heartbeat: {
      message: JSON.stringify({ type: 'ping' }),
      returnMessage: JSON.stringify({ type: 'pong' }),
      timeout: 60000, // 1 minute, if no response is received, the connection will be closed
      interval: HEARTBEAT_INTERVAL_MS,
    },

    retryOnError: true,
  })
  // const {HEARTBEAT_INTERVAL_MS= use useWebSocket(swapServiceWsEndpoint, handleMessage)

  useEffect(() => {
    if (readyState && swapId) {
      sendMessage(
        JSON.stringify({
          op: 'subscribe',
          channel: 'swap.update',
          args: [swapId],
        }),
      )
    }
  }, [readyState, swapId])

  const handleSwapStatusUpdate = useCallback(
    async (swapStatusUpdate: SwapStatusUpdate) => {
      const { id, status, error } = swapStatusUpdate

      if (error) {
        handleFailed(swapStatusUpdate)
        return
      }

      console.log(`swap ${id}: received status ${status}`)

      try {
        switch (status) {
          case 'transaction.confirmed':
            handleConfirmed()
            break
          case 'invoice.failedToPay':
            handleFailed(swapStatusUpdate, 'Failed to pay')
            break
          case 'transaction.lockupFailed':
            handleFailed(swapStatusUpdate, "Fees too low, didn't go through in 24 hrs")
            break
          case 'swap.expired':
            handleFailed(swapStatusUpdate, 'Swap Expired')
            break

          default:
            break
        }
      } catch (error) {
        captureException(error)
      }
    },
    [handleConfirmed, handleFailed],
  )
  useEffect(() => {
    if (lastJsonMessage) {
      console.log('last json message', lastJsonMessage)

      if (lastJsonMessage.event === 'update' && lastJsonMessage.args[0]) {
        handleSwapStatusUpdate(lastJsonMessage.args[0])
      }
    }
  }, [lastJsonMessage, handleSwapStatusUpdate])
}
