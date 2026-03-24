import { Box, Button, HStack, Image, Spinner } from '@chakra-ui/react'
import { t } from 'i18next'
import React, { useCallback, useEffect, useState } from 'react'

import { Body } from '@/shared/components/typography/Body.tsx'
import { usePaymentSwapClaimTxBroadcastMutation } from '@/types/index.ts'
import { useNotification } from '@/utils/index.ts'

import { useRefund } from '../../fundingPayment/views/paymentOnchain/hooks/useRefund.ts'
import {
  SwapStatusUpdate,
  useTransactionStatusUpdate,
} from '../../fundingPayment/views/paymentOnchain/hooks/useTransactionStatusUpdate.ts'
import { ContructingTransactionImageUrl, TransactionReadyToClaimImageUrl } from '../constant.ts'
import { PayoutFlowSwapData } from '../types.ts'
import { PayoutStepLayout } from './PayoutStepLayout.tsx'

type BitcoinPayoutWaitingConfirmationProps = {
  swapData?: PayoutFlowSwapData | null
  refundAddress?: string
  setIsProcessed: (isProcessed: boolean) => void
  setRefundTxId: (refundTxId: string) => void
  setLockTxId?: (lockTxId: string) => void
  initialReadyToBeClaimed?: boolean
  onReadyToBeClaimed?: () => void
}

/** BitcoinPayoutProcessed: Success screen for Bitcoin on-chain payout completion */
export const BitcoinPayoutWaitingConfirmation: React.FC<BitcoinPayoutWaitingConfirmationProps> = ({
  swapData,
  refundAddress,
  setIsProcessed,
  setRefundTxId,
  setLockTxId,
  initialReadyToBeClaimed = false,
  onReadyToBeClaimed,
}) => {
  const toast = useNotification()
  const swapId = swapData?.id || swapData?.swapId

  const [isReadyToBeClaimed, setIsReadyToBeClaimed] = useState(initialReadyToBeClaimed)
  const [isClaiming, setIsClaiming] = useState(false)

  useEffect(() => {
    if (initialReadyToBeClaimed) {
      setIsReadyToBeClaimed(true)
    }
  }, [initialReadyToBeClaimed])

  useTransactionStatusUpdate({
    swapId,
    handleProcessing(swapStatusUpdate: SwapStatusUpdate) {
      if (swapStatusUpdate.transaction?.id) {
        setLockTxId?.(swapStatusUpdate.transaction.id)
      }
    },
    handleConfirmed(swapStatusUpdate: SwapStatusUpdate) {
      if (swapStatusUpdate.transaction?.id) {
        setLockTxId?.(swapStatusUpdate.transaction.id)
      }
    },
    handleClaimCoins(swapStatusUpdate: SwapStatusUpdate) {
      if (swapStatusUpdate.transaction?.id) {
        setLockTxId?.(swapStatusUpdate.transaction.id)
      }

      setIsReadyToBeClaimed(true)
      onReadyToBeClaimed?.()
    },
  })

  const { initiateRefundToGetRefundTx } = useRefund()

  const [paymentSwapClaimTxBroadcast] = usePaymentSwapClaimTxBroadcastMutation()

  const handleClaimError = useCallback(() => {
    setIsClaiming(false)
    toast.error({
      title: t('Something went wrong'),
      description: t('Please try again'),
    })
  }, [toast])

  const handleInitiateRefund = useCallback(async () => {
    if (!refundAddress) {
      toast.error({
        title: t('Missing Bitcoin address'),
        description: t('Please reopen the payout flow and provide your Bitcoin address.'),
      })
      return
    }

    if (!swapData) {
      toast.error({
        title: t('Missing swap details'),
        description: t('Please reopen the payout flow and try again.'),
      })
      return
    }

    setIsClaiming(true)
    const refundTransactionHex = await initiateRefundToGetRefundTx(refundAddress, swapData, 'serverLock')
    if (refundTransactionHex) {
      paymentSwapClaimTxBroadcast({
        variables: {
          input: {
            paymentId: swapData.paymentId,
            signedTxHex: refundTransactionHex,
          },
        },
        onCompleted(data) {
          if (data.paymentSwapClaimTxBroadcast.txHash) {
            setIsClaiming(false)

            setIsProcessed(true)
            setRefundTxId(data.paymentSwapClaimTxBroadcast.txHash)
            toast.success({
              title: t('Transaction broadcasted successfully!'),
              description: t('Your Bitcoin on-chain claim will be processed shortly'),
            })
          }
        },
        onError() {
          handleClaimError()
        },
      })
    } else {
      handleClaimError()
    }
  }, [
    handleClaimError,
    initiateRefundToGetRefundTx,
    refundAddress,
    swapData,
    toast,
    paymentSwapClaimTxBroadcast,
    setIsProcessed,
    setRefundTxId,
  ])

  return (
    <PayoutStepLayout
      illustration={
        <Box w="300px" h="300px">
          <Image
            src={isReadyToBeClaimed ? TransactionReadyToClaimImageUrl : ContructingTransactionImageUrl}
            alt={t('Get refund')}
            width="100%"
            height="100%"
            objectFit="cover"
          />
        </Box>
      }
      content={
        !isReadyToBeClaimed ? (
          <HStack spacing={3} alignItems="center" justifyContent="center" w="full" mt={-2}>
            <Spinner color="primary1.9" size="md" thickness="3px" sx={{ animationDuration: '1.8s' }} />
            <Body size="md" color="neutral1.11" textAlign="center">
              {t('Waiting for transaction confirmation...')}
            </Body>
          </HStack>
        ) : null
      }
      action={
        isReadyToBeClaimed ? (
          <Button
            w="full"
            size="lg"
            colorScheme="primary1"
            variant="solid"
            isDisabled={!refundAddress}
            onClick={handleInitiateRefund}
            isLoading={isClaiming}
          >
            {t('Claim my funds')}
          </Button>
        ) : undefined
      }
    />
  )
}
