import { Box, Button, Image, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import React, { useCallback, useState } from 'react'

import { Body } from '@/shared/components/typography/Body.tsx'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import { usePaymentSwapClaimTxBroadcastMutation } from '@/types/index.ts'
import { useNotification } from '@/utils/index.ts'

import { useRefund } from '../../fundingPayment/views/paymentOnchain/hooks/useRefund.ts'
import { useTransactionStatusUpdate } from '../../fundingPayment/views/paymentOnchain/hooks/useTransactionStatusUpdate.ts'

type BitcoinPayoutWaitingConfirmationProps = {
  isRefund?: boolean
  onClose: () => void
  swapData?: any
  refundAddress: string
  setIsProcessed: (isProcessed: boolean) => void
  setRefundTxId: (refundTxId: string) => void
  onCompleted?: () => void
}

/** BitcoinPayoutProcessed: Success screen for Bitcoin on-chain payout completion */
export const BitcoinPayoutWaitingConfirmation: React.FC<BitcoinPayoutWaitingConfirmationProps> = ({
  isRefund = false,
  onClose,
  swapData,
  refundAddress,
  setIsProcessed,
  setRefundTxId,
  onCompleted,
}) => {
  const toast = useNotification()

  const [isReadyToBeClaimed, setIsReadyToBeClaimed] = useState(false)
  const [isClaiming, setIsClaiming] = useState(false)

  useTransactionStatusUpdate({
    swapId: swapData.id,
    handleClaimCoins: () => setIsReadyToBeClaimed(true),
  })

  const { initiateRefundToGetRefundTx } = useRefund()

  const [paymentSwapClaimTxBroadcast] = usePaymentSwapClaimTxBroadcastMutation()

  const handleInitiateRefund = useCallback(async () => {
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
            onCompleted?.()
            toast.success({
              title: t('Transaction broadcasted successfully!'),
              description: t('Your Bitcoin on-chain claim will be processed shortly'),
            })
          }
        },
        onError(error) {
          setIsClaiming(false)
          toast.error({
            title: t('Something went wrong'),
            description: t('Please try again'),
          })
        },
      })
    } else {
      setIsClaiming(false)
      toast.error({
        title: t('Something went wrong'),
        description: t('Please try again'),
      })
    }
  }, [
    initiateRefundToGetRefundTx,
    refundAddress,
    swapData,
    toast,
    paymentSwapClaimTxBroadcast,
    setIsProcessed,
    setRefundTxId,
    onCompleted,
  ])

  return (
    <VStack w="full" spacing={6} alignItems="center">
      {/* Illustration Placeholder */}
      <Box w="300px" h="300px">
        <Image
          src={'https://storage.googleapis.com/geyser-projects-media/app/refund/get_refund.webp'}
          alt={'Get refund'}
          width="100%"
          height="100%"
          objectFit="cover"
        />
      </Box>

      {/* Success Message */}
      <VStack spacing={4} alignItems="start" w="full">
        <Body size="md" textAlign="center" color="neutral1.12">
          {t('Confirm and claim your funds.')}
        </Body>

        <Feedback variant={FeedBackVariant.WARNING}>
          <Body>
            {t(
              'It make take a few minutes to activate the claim funds button. Please keep this modal open to complete the process',
            )}
          </Body>
        </Feedback>
      </VStack>

      <Button
        w="full"
        maxW="300px"
        size="lg"
        colorScheme="primary1"
        variant="solid"
        isDisabled={!isReadyToBeClaimed}
        onClick={handleInitiateRefund}
        isLoading={isClaiming}
      >
        {t('Claim your funds')}
      </Button>
    </VStack>
  )
}
