/* eslint-disable complexity */
import { Button, HStack, Icon, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import React, { useState } from 'react'
import { PiWarningCircleBold } from 'react-icons/pi'
import { Address, Hex } from 'viem'
import { parseSignature } from 'viem'

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
  RskToLightningSwapPaymentDetails,
  RskToOnChainSwapPaymentDetails,
  usePledgeRefundRetryInitiateMutation,
  usePledgeRefundRetryRequestMutation,
} from '@/types/index.ts'
import { useNotification } from '@/utils/index.ts'

import { createAndSignEIP712MessageForPaymentRefund } from '../../utils/createEIP712Message.ts'
import { createAndSignLockTransaction } from '../../utils/createLockTransaction.ts'
import { signatureToVRS } from '../../utils/signEIP712Message.ts'
import { useRefund } from '../fundingPayment/views/paymentOnchain/hooks/useRefund.ts'
import { getRefundSignatureForSubmarineSwap } from '../fundingPayment/views/paymentOnchain/refund/api.ts'
import { BitcoinPayoutForm } from './components/BitcoinPayoutForm.tsx'
import { BitcoinPayoutProcessed } from './components/BitcoinPayoutProcessed.tsx'
import { BitcoinPayoutWaitingConfirmation } from './components/BitcoinPayoutWaitingConfirmation.tsx'
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
  const [refundTxId, setRefundTxId] = useState('')

  const { initiateRefundToGetRefundTx } = useRefund()

  const [swapData, setSwapData] = useState<any>(null)

  const [isWaitingConfirmation, setIsWaitingConfirmation] = useState(false)
  const [refundAddress, setRefundAddress] = useState<string | null>(null)

  const [
    pledgeRefundRetryRequest,
    { data: pledgeRefundRequestData, loading: pledgeRefundRequestLoading, error: pledgeRefundRequestError },
  ] = usePledgeRefundRetryRequestMutation()

  const [pledgeRefundRetryInitiate, { loading: isPledgeRefundRetryInitiateLoading }] =
    usePledgeRefundRetryInitiateMutation()

  const handleLightningSubmit = async (data: LightningPayoutFormData, accountKeys: AccountKeys) => {
    setIsSubmitting(true)

    try {
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

      const newPayment = pledgeRefundRequest?.payment

      let newPreimageHash = ''

      if (newPayment.paymentType === PaymentType.RskToLightningSwap) {
        const newPaymentDetails = newPayment.paymentDetails as LightningToRskSwapPaymentDetailsFragment
        newPreimageHash = newPaymentDetails.swapPreimageHash
      } else if (newPayment.paymentType === PaymentType.RskToOnChainSwap) {
        const newPaymentDetails = newPayment.paymentDetails as OnChainToRskSwapPaymentDetailsFragment
        newPreimageHash = newPaymentDetails.swapPreimageHash
      }

      const swapObj = JSON.parse(pledgeRefundRequest?.swap)
      swapObj.privateKey = userAccountKeyPair?.privateKey
      swapObj.paymentId = pledgeRefundRequest?.payment?.id
      setSwapData(swapObj)

      const amount = BigInt(satsToWei(pledgeRefundRequest?.payment.accountingAmountDue || 0))

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
      let swapId = '' as any

      console.log('pastPayment', pastPayment)
      console.log('swapId', swapId)

      if (pastPayment) {
        if (pastPayment.paymentType === PaymentType.RskToLightningSwap) {
          const pastPaymentDetails = pastPayment.paymentDetails as LightningToRskSwapPaymentDetailsFragment
          const swapData = JSON.parse(pastPaymentDetails.swapMetadata)
          console.log('swapData', swapData)
          timelock = swapData.timeoutBlockHeight
          claimAddress = swapData.claimAddress
          failedSwapPreImageHash = pastPaymentDetails.swapPreimageHash
          swapId = swapData.id
        } else if (pastPayment.paymentType === PaymentType.RskToOnChainSwap) {
          const pastPaymentDetails = pastPayment.paymentDetails as OnChainToRskSwapPaymentDetailsFragment
          const swapData = JSON.parse(pastPaymentDetails.swapMetadata)
          timelock = swapData.lockupDetails.timeoutBlockHeight
          claimAddress = swapData.lockupDetails.claimAddress
          failedSwapPreImageHash = pastPaymentDetails.swapPreimageHash
          swapId = swapData.id
        }
      }

      const refundSignatureResponse = await getRefundSignatureForSubmarineSwap(failedSwapPreImageHash)

      const { r, v, s } = parseSignature(refundSignatureResponse.signature)

      console.log('r', r)
      console.log('v', v)
      console.log('s', s)

      const { v: refundV, r: refundR, s: refundS } = signatureToVRS(refundSignatureResponse.signature)

      console.log('refundV', refundV)
      console.log('refundR', refundR)
      console.log('refundS', refundS)

      console.log('refundSignatureResponse', refundSignatureResponse)

      const lockTxHex = await createAndSignLockTransaction({
        preimageHash: `0x${newPreimageHash}`,
        claimAddress: swapObj.claimAddress as Address,
        refundAddress: accountKeys.address as Address,
        timelock: swapObj?.timeoutBlockHeight || 0,
        amount, // subract fees
        privateKey: `0x${accountKeys.privateKey}`,
      })

      console.log('===============================================')
      console.log('PARAMS FOR REFUND SIGNATURE')
      console.log('preimageHash', `0x${failedSwapPreImageHash}`)
      console.log('amount', amount)
      console.log('claimAddress', claimAddress)
      console.log('refundAddress', accountKeys.address)
      console.log('timelock', timelock)
      console.log('privateKey', accountKeys.privateKey)
      console.log('===============================================')

      await pledgeRefundRetryInitiate({
        variables: {
          input: {
            pledgeRefundId: pledgeRefund.id,
            pledgeRefundSwapPaymentInput: {
              swapRefundSignature: {
                v: refundV,
                r: refundR,
                s: refundS,
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
      setSwapData(swapObj)

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
        if (pastPayment.paymentType === PaymentType.RskToLightningSwap) {
          const pastPaymentDetails = pastPayment.paymentDetails as RskToLightningSwapPaymentDetails
          const swapData = JSON.parse(JSON.parse(pastPaymentDetails.swapMetadata))
          timelock = swapData.timeoutBlockHeight
          claimAddress = swapData.claimAddress
          failedSwapPreImageHash = pastPaymentDetails.swapPreimageHash
        } else if (pastPayment.paymentType === PaymentType.RskToOnChainSwap) {
          const pastPaymentDetails = pastPayment.paymentDetails as RskToOnChainSwapPaymentDetails
          const swapData = JSON.parse(JSON.parse(pastPaymentDetails.swapMetadata))
          timelock = swapData.lockupDetails.timeoutBlockHeight
          claimAddress = swapData.lockupDetails.claimAddress
          failedSwapPreImageHash = pastPaymentDetails.swapPreimageHash
        }
      }

      console.log('claimAddress', claimAddress)
      console.log('failedSwapPreImageHash', failedSwapPreImageHash)
      console.log('timelock', timelock)
      console.log('amount', amount)
      console.log('refundAddress', accountKeys.address)
      console.log('privateKey', accountKeys.privateKey)

      const { v, r, s } = createAndSignEIP712MessageForPaymentRefund({
        preimageHash: `0x${failedSwapPreImageHash}`,
        amount: Number(amount),
        claimAddress: claimAddress as Address,
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
      setIsWaitingConfirmation(true)
      setRefundAddress(data.bitcoinAddress)

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
          <BitcoinPayoutProcessed isRefund={true} onClose={handleClose} refundTxId={refundTxId} />
        )}
      </Modal>
    )
  }

  if (isWaitingConfirmation) {
    return (
      <Modal isOpen={isOpen} size="lg" title={t('Please wait for swap confirmation')} onClose={() => {}}>
        <BitcoinPayoutWaitingConfirmation
          isRefund={true}
          onClose={handleClose}
          swapData={swapData}
          refundAddress={refundAddress || ''}
          setIsProcessed={setIsProcessed}
          setRefundTxId={setRefundTxId}
        />
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
