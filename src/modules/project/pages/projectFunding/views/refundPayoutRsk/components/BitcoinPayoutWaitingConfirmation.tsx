import { Box, Button, Image, Link, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import React, { useCallback, useEffect, useState } from 'react'
import { Trans } from 'react-i18next'

import { Body } from '@/shared/components/typography/Body.tsx'
import { getMempoolSpaceUrl } from '@/shared/utils/external/mempool.ts'
import { usePaymentSwapClaimTxBroadcastMutation } from '@/types/index.ts'
import { useNotification } from '@/utils/index.ts'

import { useRefund } from '../../fundingPayment/views/paymentOnchain/hooks/useRefund.ts'
import { useTransactionStatusUpdate } from '../../fundingPayment/views/paymentOnchain/hooks/useTransactionStatusUpdate.ts'
import { ContructingTransactionImageUrl, TransactionReadyToClaimImageUrl } from '../constant.ts'
import { PayoutStepLayout } from './PayoutStepLayout.tsx'

type BitcoinPayoutWaitingConfirmationProps = {
  swapData?: any
  lockTxId?: string
  refundAddress?: string
  setIsProcessed: (isProcessed: boolean) => void
  setRefundTxId: (refundTxId: string) => void
  initialReadyToBeClaimed?: boolean
  onReadyToBeClaimed?: () => void
}

/** BitcoinPayoutProcessed: Success screen for Bitcoin on-chain payout completion */
export const BitcoinPayoutWaitingConfirmation: React.FC<BitcoinPayoutWaitingConfirmationProps> = ({
  swapData,
  lockTxId,
  refundAddress,
  setIsProcessed,
  setRefundTxId,
  initialReadyToBeClaimed = false,
  onReadyToBeClaimed,
}) => {
  const toast = useNotification()

  const [isReadyToBeClaimed, setIsReadyToBeClaimed] = useState(initialReadyToBeClaimed)
  const [isClaiming, setIsClaiming] = useState(false)

  useEffect(() => {
    if (initialReadyToBeClaimed) {
      setIsReadyToBeClaimed(true)
    }
  }, [initialReadyToBeClaimed])

  useTransactionStatusUpdate({
    swapId: swapData.id,
    handleClaimCoins: () => {
      setIsReadyToBeClaimed(true)
      onReadyToBeClaimed?.()
    },
  })

  const { initiateRefundToGetRefundTx } = useRefund()

  const [paymentSwapClaimTxBroadcast] = usePaymentSwapClaimTxBroadcastMutation()

  const handleInitiateRefund = useCallback(async () => {
    if (!refundAddress) {
      toast.error({
        title: t('Missing Bitcoin address'),
        description: t('Please reopen the payout flow and provide your Bitcoin address.'),
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
  ])

  return (
    <PayoutStepLayout
      illustration={
        <Box w="300px" h="300px">
          <Image
            src={isReadyToBeClaimed ? TransactionReadyToClaimImageUrl : ContructingTransactionImageUrl}
            alt={'Get refund'}
            width="100%"
            height="100%"
            objectFit="cover"
          />
        </Box>
      }
      content={
        <VStack spacing={4} alignItems="start" w="full">
          {!isReadyToBeClaimed && (
            <Body size="md" textAlign="center" color="neutral1.12">
              <>
                {t('We are waiting for the transaction to be confirmed before you can claim the funds.')}{' '}
                <Trans i18nKey="You can check the transaction status by <1> clicking here.</1>">
                  {'You can check the transaction status by '}
                  <Link href={getMempoolSpaceUrl(lockTxId || '')} textDecoration="underline" isExternal>
                    {'clicking here.'}
                  </Link>
                </Trans>
              </>
            </Body>
          )}
        </VStack>
      }
      action={
        <Button
          w="full"
          size="lg"
          colorScheme="primary1"
          variant="solid"
          isDisabled={!isReadyToBeClaimed || !refundAddress}
          onClick={handleInitiateRefund}
          isLoading={isClaiming}
        >
          {t('Claim my funds')}
        </Button>
      }
    />
  )
}
