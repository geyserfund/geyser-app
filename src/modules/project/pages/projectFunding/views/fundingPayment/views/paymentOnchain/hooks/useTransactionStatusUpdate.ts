import { captureException } from '@sentry/react'
import { useCallback, useEffect } from 'react'
import useWebSocket from 'react-use-websocket'

import { __production__, BOLTZ_DOMAIN } from '@/shared/constants'

import { OnChainErrorStatuses } from '../states/onChainErrror.ts'

const swapServiceWsEndpoint = `wss://${BOLTZ_DOMAIN}/v2/ws`

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
  'transaction.server.mempool',
  'transaction.server.confirmed',
  'swap.expired',
] as const
export type SwapStatusType = (typeof SwapStatus)[number]

export type SwapStatusUpdate = {
  id: string
  status: SwapStatusType
  transaction?: { id: string; hex: string }
  failureReason?: string
}

type useTransactionStatusUpdateProps = {
  swapId?: string
  handleConfirmed?: Function
  handleFailed?: Function
  handleProcessing?: Function
  handleClaimCoins?: Function
  handleClaimed?: Function
}

export const useTransactionStatusUpdate = ({
  swapId,
  handleConfirmed = () => {},
  handleFailed = () => {},
  handleProcessing = () => {},
  handleClaimCoins = () => {},
  handleClaimed = () => {},
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
      try {
        switch (swapStatusUpdate.status) {
          case 'transaction.mempool':
            handleProcessing(swapStatusUpdate)
            break
          case 'transaction.confirmed':
            if (handleConfirmed) {
              handleConfirmed()
            }

            break
          case 'transaction.server.confirmed':
            handleClaimCoins(swapStatusUpdate)
            break
          case 'transaction.claimed':
            handleClaimed(swapStatusUpdate)
            break
          case OnChainErrorStatuses.INVOICE_FAILED:
          case OnChainErrorStatuses.LOCKUP_FAILED:
          case OnChainErrorStatuses.SWAP_EXPIRED:
            handleFailed(swapStatusUpdate)
            break
          default:
            break
        }
      } catch (error) {
        captureException(error)
      }
    },
    [handleConfirmed, handleFailed, handleProcessing, handleClaimCoins],
  )

  useEffect(() => {
    if (lastJsonMessage) {
      if (lastJsonMessage.event === 'update' && lastJsonMessage.args[0]) {
        handleSwapStatusUpdate(lastJsonMessage.args[0])
      }
    }
  }, [lastJsonMessage, handleSwapStatusUpdate])
}
