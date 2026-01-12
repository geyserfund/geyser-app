import { Box, Button, Image, Link, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import React, { useCallback, useState } from 'react'
import { Trans } from 'react-i18next'

import { Body } from '@/shared/components/typography/Body.tsx'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import { getMempoolSpaceUrl } from '@/shared/utils/external/mempool.ts'
import { usePaymentSwapClaimTxBroadcastMutation } from '@/types/index.ts'
import { useNotification } from '@/utils/index.ts'

import { useRefund } from '../../fundingPayment/views/paymentOnchain/hooks/useRefund.ts'
import { useTransactionStatusUpdate } from '../../fundingPayment/views/paymentOnchain/hooks/useTransactionStatusUpdate.ts'
import { ContructingTransactionImageUrl, TransactionReadyToClaimImageUrl } from '../constant.ts'

type BitcoinPayoutWaitingConfirmationProps = {
  swapData?: any
  lockTxId?: string
  refundAddress: string
  setIsProcessed: (isProcessed: boolean) => void
  setRefundTxId: (refundTxId: string) => void
  onCompleted?: () => void
}

/** BitcoinPayoutProcessed: Success screen for Bitcoin on-chain payout completion */
export const BitcoinPayoutWaitingConfirmation: React.FC<BitcoinPayoutWaitingConfirmationProps> = ({
  swapData,
  lockTxId,
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
          src={isReadyToBeClaimed ? TransactionReadyToClaimImageUrl : ContructingTransactionImageUrl}
          alt={'Get refund'}
          width="100%"
          height="100%"
          objectFit="cover"
        />
      </Box>

      {/* Success Message */}
      <VStack spacing={4} alignItems="start" w="full">
        <Body size="md" textAlign="center" color="neutral1.12">
          {isReadyToBeClaimed ? (
            t('Confirm and claim your funds.')
          ) : (
            <>
              {t('We are waiting for the transaction to be confirmed before you can claim the funds.')}
              <Trans i18nKey="You can check the transaction status by <1> clicking here.</1>">
                {'You can check the transaction status by '}
                <Link href={getMempoolSpaceUrl(lockTxId || '')} isExternal>
                  {'clicking here.'}
                </Link>
              </Trans>
            </>
          )}
        </Body>

        {isReadyToBeClaimed ? (
          <Feedback variant={FeedBackVariant.SUCCESS}>
            <Body>{t('Your funds have are ready to be claimed')}</Body>
          </Feedback>
        ) : (
          <Feedback variant={FeedBackVariant.WARNING}>
            <Body>{t('This may take a few minutes. Please keep this window open to finish the process')}</Body>
          </Feedback>
        )}
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
