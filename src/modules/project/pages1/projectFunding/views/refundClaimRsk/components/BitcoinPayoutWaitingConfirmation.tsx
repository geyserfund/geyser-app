import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import React, { useCallback, useEffect, useState } from 'react'

import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { AlertDialogue } from '@/shared/molecules/AlertDialogue.tsx'
import { useNotification } from '@/utils/index.ts'

import { useRefund } from '../../fundingPayment/views/paymentOnchain/hooks/useRefund.ts'
import {
  SwapStatusUpdate,
  useTransactionStatusUpdate,
} from '../../fundingPayment/views/paymentOnchain/hooks/useTransactionStatusUpdate.ts'

type BitcoinPayoutWaitingConfirmationProps = {
  isRefund?: boolean
  onClose: () => void
  swapData: any
  refundAddress: string
  setIsProcessed: (isProcessed: boolean) => void
}

/** BitcoinPayoutProcessed: Success screen for Bitcoin on-chain payout completion */
export const BitcoinPayoutWaitingConfirmation: React.FC<BitcoinPayoutWaitingConfirmationProps> = ({
  isRefund = false,
  onClose,
  swapData,
  refundAddress,
  setIsProcessed,
}) => {
  const alertModalProps = useModal()
  usePayoutWithTransaction(swapData, refundAddress, setIsProcessed)

  return (
    <>
      <VStack w="full" spacing={6} alignItems="center">
        {/* Header */}
        <VStack w="full" spacing={0}>
          <Body size="lg" medium textAlign="center">
            {t('Please wait for swap confirmation')}
          </Body>
          <Body size="sm" textAlign="center" color="neutral1.10" lineHeight="1.5">
            {t('Warning: Do not close this modal')}
          </Body>
        </VStack>

        {/* Illustration Placeholder */}
        <CardLayout
          w="full"
          maxW="300px"
          h="200px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          backgroundColor="neutral1.3"
          borderColor="neutral1.6"
        >
          <Body size="md" color="neutral1.11">
            {t('Illustration')}
          </Body>
        </CardLayout>

        {/* Success Message */}
        <VStack spacing={4} alignItems="center" w="full">
          <Body size="md" textAlign="center" color="neutral1.12">
            {t('Your payout processing has started, please wait for confirmation.')}
          </Body>

          <Body size="sm" textAlign="center" color="neutral1.10" lineHeight="1.5">
            {t(
              'Swap confirmation may take a few minutes. Please keep this modal open to complete the refund process. Closing this modal will cancel the refund as your password will be lost. This ensures we never have control of your funds.',
            )}
          </Body>
        </VStack>

        {/* Action Button */}
        <Button w="full" maxW="300px" size="lg" colorScheme="neutral1" variant="outline" onClick={onClose}>
          {isRefund ? t('Close') : t('Go back to my project')}
        </Button>
      </VStack>
      <AlertDialogue
        {...alertModalProps}
        title={t('Warning')}
        description={t(
          'Closing this modal will cancel the refund as your password will be lost. This ensures we never have control of your funds.',
        )}
        hasCancel={true}
        negativeButtonProps={{
          children: t('Close'),
          onClick: onClose,
        }}
      />
    </>
  )
}

const usePayoutWithTransaction = (
  swapData: any,
  refundAddress: string,
  setIsProcessed: (isProcessed: boolean) => void,
) => {
  const toast = useNotification()
  const { initiateRefund } = useRefund()

  const [swapStatusUpdateData, setSwapStatusUpdateData] = useState<SwapStatusUpdate>()

  const handleClaimCoins = useCallback(async () => {
    try {
      const result = await initiateRefund(refundAddress, swapData, 'serverLock')
      if (result) {
        setIsProcessed(true)
      } else {
        toast.error({
          title: 'Refund failed',
          description: 'Error initiating refund',
        })
      }
    } catch (error) {
      toast.error({
        title: 'Refund failed',
        description: 'Error initiating refund',
      })
    }
  }, [initiateRefund, setIsProcessed, refundAddress, swapData, toast])

  const handleSwapStatusUpdate = useCallback(
    (swapStatusUpdate: SwapStatusUpdate) => {
      if (!swapData) {
        setSwapStatusUpdateData(swapStatusUpdate)
      }
    },
    [setSwapStatusUpdateData, swapData],
  )

  useEffect(() => {
    if (swapStatusUpdateData) {
      handleClaimCoins()
    }
  }, [swapStatusUpdateData, handleClaimCoins])

  useTransactionStatusUpdate({
    swapId: swapData.id,
    handleClaimCoins: handleSwapStatusUpdate,
  })
}
