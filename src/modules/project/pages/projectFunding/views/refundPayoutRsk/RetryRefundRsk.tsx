/* eslint-disable complexity */
import { Button, HStack, Icon, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import React, { useState } from 'react'
import { PiWarningCircleBold } from 'react-icons/pi'
import { Address, Hex } from 'viem'

import { useUserAccountKeys } from '@/modules/auth/hooks/useUserAccountKeys.ts'
import { userAccountKeyPairAtom, userAccountKeysAtom } from '@/modules/auth/state/userAccountKeysAtom.ts'
import { AccountKeys, generatePreImageHash } from '@/modules/project/forms/accountPassword/keyGenerationHelper.ts'
import { satsToWei } from '@/modules/project/funding/hooks/useFundingAPI.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { SkeletonLayout } from '@/shared/components/layouts/SkeletonLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import {
  LightningToRskSwapPaymentDetailsFragment,
  OnChainToRskSwapPaymentDetailsFragment,
  PaymentStatus,
  PaymentType,
  PledgeRefundFragment,
  usePledgeRefundRetryInitiateMutation,
  usePledgeRefundRetryRequestMutation,
} from '@/types/index.ts'
import { useNotification } from '@/utils/index.ts'

import { createAndSignEIP712MessageForPaymentRefund } from '../../utils/createEIP712Message.ts'
import { createAndSignLockTransaction } from '../../utils/createLockTransaction.ts'
import { useRefund } from '../fundingPayment/views/paymentOnchain/hooks/useRefund.ts'
import { BitcoinPayoutForm } from './components/BitcoinPayoutForm.tsx'
import { BitcoinPayoutProcessed } from './components/BitcoinPayoutProcessed.tsx'
import { LightningPayoutForm } from './components/LightningPayoutForm.tsx'
import { LightningPayoutProcessed } from './components/LightningPayoutProcessed.tsx'
import { PayoutMethodSelection } from './components/PayoutMethodSelection.tsx'
import { usePayoutWithBitcoinForm } from './hooks/usePayoutWithBitcoinForm.ts'
import { BitcoinPayoutFormData } from './hooks/usePayoutWithBitcoinForm.ts'
import { usePayoutWithLightningForm } from './hooks/usePayoutWithLightningForm.ts'
import { LightningPayoutFormData } from './hooks/usePayoutWithLightningForm.ts'
import { PayoutMethod } from './types.ts'

type RetryRefundRskProps = {
  isOpen: boolean
  onClose: () => void
  pledgeRefund: PledgeRefundFragment
}

/** RefundRsk: Component for handling refund payouts with Lightning or On-Chain Bitcoin */
export const RetryRefundRsk: React.FC<RetryRefundRskProps> = ({ isOpen, onClose, pledgeRefund }) => {
  const toast = useNotification()

  useUserAccountKeys()

  const userAccountKeys = useAtomValue(userAccountKeysAtom)
  const userAccountKeyPair = useAtomValue(userAccountKeyPairAtom)

  const [selectedMethod, setSelectedMethod] = useState<PayoutMethod>(PayoutMethod.Lightning)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isProcessed, setIsProcessed] = useState(false)

  const { initiateRefundToGetRefundTx } = useRefund()

  // const [swap, setSwapData] = useState()

  const [
    pledgeRefundRetryRequest,
    { data: pledgeRefundRequestData, loading: pledgeRefundRequestLoading, error: pledgeRefundRequestError },
  ] = usePledgeRefundRetryRequestMutation()

  const [pledgeRefundRetryInitiate, { loading: isPledgeRefundRetryInitiateLoading }] =
    usePledgeRefundRetryInitiateMutation()

  const handleLightningSubmit = async (data: LightningPayoutFormData, accountKeys: AccountKeys) => {
    setIsSubmitting(true)

    try {
      const { preimageHash, preimageHex } = generatePreImageHash()

      const response = await pledgeRefundRetryRequest({
        variables: {
          input: {
            pledgeRefundId: pledgeRefund.id,
            pledgeRefundSwapPaymentInput: {
              rskAddress: accountKeys.address,
              rskPublicKey: accountKeys.publicKey,
              rskToLightningSwap: {
                lightningAddress: data.lightningAddress,
              },
            },
          },
        },
      })

      const pledgeRefundRequest = response.data?.pledgeRefundRetryRequest

      if (!pledgeRefundRequest) {
        toast.error({
          title: t('Something went wrong'),
          description: t('Please try again'),
        })
        return
      }

      const swapObj = JSON.parse(pledgeRefundRequest?.swap)
      swapObj.privateKey = userAccountKeyPair?.privateKey
      swapObj.preimageHash = preimageHash
      swapObj.preimageHex = preimageHex
      swapObj.paymentId = pledgeRefundRequest?.payment?.id

      const amount = BigInt(satsToWei(pledgeRefundRequest?.payment.accountingAmountDue || 0))

      const lockTxHex = await createAndSignLockTransaction({
        preimageHash: `0x${preimageHash}`,
        claimAddress: accountKeys.address as Address,
        refundAddress: accountKeys.address as Address,
        timelock: swapObj?.timeoutBlockHeight || 0,
        amount, // subract fees
        privateKey: `0x${accountKeys.privateKey}`,
      })

      const pastPayment = [...pledgeRefund.payments].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )[0]

      if (pastPayment?.status !== PaymentStatus.Failed) {
        toast.warning({
          title: t('Payment already processed'),
        })
        return
      }

      let timelock = 0 as number
      let claimAddress = '' as any
      let failedSwapPreImageHash = '' as any

      if (pastPayment) {
        if (pastPayment.paymentType === PaymentType.LightningToRskSwap) {
          const pastPaymentDetails = pastPayment.paymentDetails as LightningToRskSwapPaymentDetailsFragment
          const swapData = JSON.parse(pastPaymentDetails.swapMetadata)
          timelock = swapData.timeoutBlockHeight
          claimAddress = swapData.claimAddress
          failedSwapPreImageHash = pastPaymentDetails.preimageHash
        } else if (pastPayment.paymentType === PaymentType.OnChainToRskSwap) {
          const pastPaymentDetails = pastPayment.paymentDetails as OnChainToRskSwapPaymentDetailsFragment
          const swapData = JSON.parse(pastPaymentDetails.swapMetadata)
          timelock = swapData.lockupDetails.timeoutBlockHeight
          claimAddress = swapData.lockupDetails.claimAddress
          failedSwapPreImageHash = pastPaymentDetails.preimageHash
        }
      }

      const { v, r, s } = createAndSignEIP712MessageForPaymentRefund({
        preimageHash: `0x${failedSwapPreImageHash}`,
        amount: Number(amount),
        claimAddress,
        refundAddress: accountKeys.address as Address,
        timelock,
        privateKey: accountKeys.privateKey as Hex,
      })

      await pledgeRefundRetryInitiate({
        variables: {
          input: {
            pledgeRefundId: pledgeRefund.id,
            pledgeRefundSwapPaymentInput: {
              swapRefundSignature: {
                v,
                r,
                s,
              },
              rskAddress: accountKeys.address,
              rskPublicKey: accountKeys.publicKey,
              rskToLightningSwap: {
                lockTxHex,
              },
            },
          },
        },
      })

      setIsProcessed(true)
      toast.success({
        title: t('Refund initiated successfully'),
        description: t('Your Lightning refund will be processed shortly'),
      })
    } catch (error) {
      console.error('Lightning refund error:', error)
      toast.error({
        title: t('Something went wrong'),
        description: t('Please try again'),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBitcoinSubmit = async (data: BitcoinPayoutFormData, accountKeys: AccountKeys) => {
    setIsSubmitting(true)
    try {
      const { preimageHash, preimageHex } = generatePreImageHash()

      const pledgeRefundRetryRequestResponse = await pledgeRefundRetryRequest({
        variables: {
          input: {
            pledgeRefundId: pledgeRefund.id,
            pledgeRefundSwapPaymentInput: {
              rskAddress: accountKeys.address,
              rskPublicKey: accountKeys.publicKey,
              rskToOnChainSwap: {
                preimageHash,
              },
            },
          },
        },
      })

      const pledgeRefundRequest = pledgeRefundRetryRequestResponse.data?.pledgeRefundRetryRequest

      if (!pledgeRefundRequest) {
        toast.error({
          title: t('Something went wrong'),
          description: t('Please try again'),
        })
        return
      }

      const swapObj = JSON.parse(pledgeRefundRequest?.swap)
      swapObj.privateKey = userAccountKeyPair?.privateKey
      swapObj.preimageHash = preimageHash
      swapObj.preimageHex = preimageHex
      swapObj.paymentId = pledgeRefundRequest?.payment?.id

      const amount = BigInt(satsToWei(pledgeRefundRequest?.payment.accountingAmountDue || 0))

      const lockTxHex = await createAndSignLockTransaction({
        preimageHash: `0x${preimageHash}`,
        claimAddress: accountKeys.address as Address,
        refundAddress: accountKeys.address as Address,
        timelock: swapObj?.lockupDetails?.timeoutBlockHeight || 0,
        amount,
        privateKey: accountKeys.privateKey as Hex,
      })

      const pastPayment = [...pledgeRefund.payments].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )[0]

      if (pastPayment?.status !== PaymentStatus.Failed) {
        toast.warning({
          title: t('Payment already processed'),
        })
        return
      }

      let timelock = 0 as number
      let claimAddress = '' as any
      let failedSwapPreImageHash = '' as any

      if (pastPayment) {
        if (pastPayment.paymentType === PaymentType.LightningToRskSwap) {
          const pastPaymentDetails = pastPayment.paymentDetails as LightningToRskSwapPaymentDetailsFragment
          const swapData = JSON.parse(pastPaymentDetails.swapMetadata)
          timelock = swapData.timeoutBlockHeight
          claimAddress = swapData.claimAddress
          failedSwapPreImageHash = pastPaymentDetails.preimageHash
        } else if (pastPayment.paymentType === PaymentType.OnChainToRskSwap) {
          const pastPaymentDetails = pastPayment.paymentDetails as OnChainToRskSwapPaymentDetailsFragment
          const swapData = JSON.parse(pastPaymentDetails.swapMetadata)
          timelock = swapData.lockupDetails.timeoutBlockHeight
          claimAddress = swapData.lockupDetails.claimAddress
          failedSwapPreImageHash = pastPaymentDetails.preimageHash
        }
      }

      const { v, r, s } = createAndSignEIP712MessageForPaymentRefund({
        preimageHash: `0x${failedSwapPreImageHash}`,
        amount: Number(amount),
        claimAddress: claimAddress as Address,
        refundAddress: accountKeys.address as Address,
        timelock,
        privateKey: accountKeys.privateKey as Hex,
      })

      const claimTxHex = await initiateRefundToGetRefundTx(data.bitcoinAddress, swapObj)
      if (!claimTxHex) {
        toast.error({
          title: t('Something went wrong'),
          description: t('Please try again'),
        })
        return
      }

      await pledgeRefundRetryInitiate({
        variables: {
          input: {
            pledgeRefundId: pledgeRefundRequestData?.pledgeRefundRetryRequest.refund.id,
            pledgeRefundSwapPaymentInput: {
              swapRefundSignature: {
                v,
                r,
                s,
              },
              rskAddress: userAccountKeys?.rskKeyPair.address,
              rskPublicKey: userAccountKeys?.rskKeyPair.publicKey,
              rskToOnChainSwap: {
                lockTxHex,
                claimTxHex,
              },
            },
          },
        },
      })

      setIsProcessed(true)
      toast.success({
        title: t('Refund initiated successfully'),
        description: t('Your Bitcoin on-chain refund will be processed shortly'),
      })
    } catch (error) {
      console.error('Bitcoin refund error:', error)
      toast.error({
        title: t('Something went wrong'),
        description: t('Please try again'),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get form objects from both hooks
  const lightningForm = usePayoutWithLightningForm(handleLightningSubmit)
  const bitcoinForm = usePayoutWithBitcoinForm(handleBitcoinSubmit)

  const handleClose = () => {
    setIsProcessed(false)
    setIsSubmitting(false)
    onClose()
  }

  const enableSubmit = selectedMethod === PayoutMethod.Lightning ? lightningForm.enableSubmit : bitcoinForm.enableSubmit

  const handleSubmit = () => {
    if (selectedMethod === PayoutMethod.Lightning) {
      lightningForm.handleSubmit()
    } else {
      bitcoinForm.handleSubmit()
    }
  }

  if (pledgeRefundRequestError) {
    return (
      <Modal isOpen={isOpen} size="lg" title={t('Cannot issue refund')} onClose={handleClose}>
        <Icon as={PiWarningCircleBold} fontSize="120px" color="error.9" />
        <Body size="md">{pledgeRefundRequestError.message}</Body>
      </Modal>
    )
  }

  // Show processed screen after successful submission
  if (isProcessed) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        size="lg"
        title={
          selectedMethod === PayoutMethod.Lightning
            ? t('Payout Processed (Off-Chain)')
            : t('Payout Processed (On-Chain)')
        }
      >
        {selectedMethod === PayoutMethod.Lightning ? (
          <LightningPayoutProcessed isRefund={true} onClose={handleClose} />
        ) : (
          <BitcoinPayoutProcessed isRefund={true} onClose={handleClose} />
        )}
      </Modal>
    )
  }

  if (!pledgeRefund) {
    return null
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="lg" title={t('Refund you contribution')} bodyProps={{ gap: 4 }}>
      {pledgeRefundRequestLoading ? (
        <RefundRskSkeleton />
      ) : (
        <>
          {/* Payout Method Selection */}
          <PayoutMethodSelection selectedMethod={selectedMethod} setSelectedMethod={setSelectedMethod} />

          {/* Form Section */}
          <CardLayout w="full" p={6}>
            {selectedMethod === PayoutMethod.Lightning ? (
              <LightningPayoutForm form={lightningForm.form} satsAmount={pledgeRefund.amount} />
            ) : (
              <BitcoinPayoutForm form={bitcoinForm.form} satsAmount={pledgeRefund.amount} />
            )}
          </CardLayout>

          <Button
            w="full"
            size="lg"
            colorScheme="primary1"
            variant="solid"
            isLoading={isSubmitting || isPledgeRefundRetryInitiateLoading}
            isDisabled={!enableSubmit}
            onClick={handleSubmit}
          >
            {t('Claim Refund')}
          </Button>
        </>
      )}
    </Modal>
  )
}

/** RefundRskSkeleton: Loading skeleton for the refund modal with payout method selection */
export const RefundRskSkeleton = () => {
  return (
    <VStack w="full" spacing={4} alignItems="start">
      {/* Payout Method Selection Label Skeleton */}
      <SkeletonLayout height="24px" width="160px" />

      {/* Payout Method Buttons Skeleton */}
      <HStack w="full" spacing={4}>
        <VStack
          flex={1}
          p={6}
          borderWidth="1px"
          borderColor="neutral1.6"
          borderRadius="8px"
          alignItems="center"
          spacing={2}
        >
          <SkeletonLayout height="20px" width="120px" />
          <SkeletonLayout height="16px" width="60px" />
        </VStack>
        <VStack
          flex={1}
          p={6}
          borderWidth="1px"
          borderColor="neutral1.6"
          borderRadius="8px"
          alignItems="center"
          spacing={2}
        >
          <SkeletonLayout height="20px" width="140px" />
          <SkeletonLayout height="16px" width="70px" />
        </VStack>
      </HStack>

      {/* Form Section Skeleton */}
      <CardLayout w="full" p={6}>
        <VStack w="full" spacing={4} alignItems="start">
          <SkeletonLayout height="20px" width="100px" />
          <SkeletonLayout height="40px" width="100%" />
          <SkeletonLayout height="20px" width="80px" />
          <SkeletonLayout height="40px" width="100%" />
        </VStack>
      </CardLayout>

      {/* Submit Button Skeleton */}
      <SkeletonLayout height="48px" width="100%" />
    </VStack>
  )
}
