import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import React, { useCallback, useState } from 'react'

import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { AlertDialogue } from '@/shared/molecules/AlertDialogue.tsx'
import { usePaymentSwapClaimTxSetMutation } from '@/types/index.ts'
import { useNotification } from '@/utils/index.ts'

import { useRefund } from '../../fundingPayment/views/paymentOnchain/hooks/useRefund.ts'
import { useTransactionStatusUpdate } from '../../fundingPayment/views/paymentOnchain/hooks/useTransactionStatusUpdate.ts'

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
  const toast = useNotification()

  const [isReadyToBeClaimed, setIsReadyToBeClaimed] = useState(false)

  useTransactionStatusUpdate({
    swapId: swapData.id,
    handleClaimCoins: () => setIsReadyToBeClaimed(true),
  })

  const { initiateRefundToGetRefundTx } = useRefund()

  const [paymentSwapClaimTxSet] = usePaymentSwapClaimTxSetMutation()

  const handleInitiateRefund = useCallback(async () => {
    const refundTransactionHex = await initiateRefundToGetRefundTx(refundAddress, swapData, 'serverLock')
    if (refundTransactionHex) {
      paymentSwapClaimTxSet({
        variables: {
          input: {
            paymentId: swapData.id,
            signedTxHex: refundTransactionHex,
          },
        },
        onCompleted(data) {
          if (data.paymentSwapClaimTxSet.success) {
            setIsProcessed(true)
            toast.success({
              title: t('Transaction broadcasted successfully!'),
              description: t('Your Bitcoin on-chain claim will be processed shortly'),
            })
          }
        },
      })
    } else {
      toast.error({
        title: t('Something went wrong'),
        description: t('Please try again'),
      })
    }
  }, [initiateRefundToGetRefundTx, refundAddress, swapData, toast, paymentSwapClaimTxSet, setIsProcessed])

  return (
    <>
      <VStack w="full" spacing={6} alignItems="center">
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

        <Button
          w="full"
          maxW="300px"
          size="lg"
          colorScheme="primary1"
          variant="solid"
          isDisabled={!isReadyToBeClaimed}
          onClick={handleInitiateRefund}
        >
          {t('Get refund')}
        </Button>

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
