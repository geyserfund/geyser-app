/* eslint-disable complexity */
import { Button, HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import React, { useEffect, useState } from 'react'
import { Address, Hex } from 'viem'

import { useUserAccountKeys } from '@/modules/auth/hooks/useUserAccountKeys.ts'
import { userAccountKeysAtom } from '@/modules/auth/state/userAccountKeysAtom.ts'
import { decryptString, encryptString } from '@/modules/project/forms/accountPassword/encryptDecrptString.ts'
import { AccountKeys, generatePreImageHash } from '@/modules/project/forms/accountPassword/keyGenerationHelper.ts'
import { satsToWei } from '@/modules/project/funding/hooks/useFundingAPI.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { SkeletonLayout } from '@/shared/components/layouts/SkeletonLayout.tsx'
import {
  PaymentStatus,
  PaymentType,
  PayoutContractType,
  PayoutStatus,
  ProjectForProfileContributionsFragment,
  RskToLightningSwapPaymentDetailsFragment,
  RskToOnChainSwapPaymentDetails,
  usePayoutInitiateMutation,
  usePayoutPaymentCreateMutation,
  usePayoutRequestMutation,
} from '@/types/index.ts'
import { commaFormatted, useNotification } from '@/utils/index.ts'

import { createCallDataForLockCall } from '../../utils/createCallDataForLockCall.ts'
import { BitcoinPayoutForm } from './components/BitcoinPayoutForm.tsx'
import { BitcoinPayoutProcessed } from './components/BitcoinPayoutProcessed.tsx'
import { BitcoinPayoutWaitingConfirmation } from './components/BitcoinPayoutWaitingConfirmation.tsx'
import { LightningPayoutForm } from './components/LightningPayoutForm.tsx'
import { LightningPayoutProcessed } from './components/LightningPayoutProcessed.tsx'
import { PayoutMethodSelection } from './components/PayoutMethodSelection.tsx'
import { createAndSignPrismWithdrawMessage } from './createAndSignPrismPayout.ts'
import { createAndSignClaimMessage } from './createAndSignRefundAndPayout.ts'
import { usePayoutWithBitcoinForm } from './hooks/usePayoutWithBitcoinForm.ts'
import { BitcoinPayoutFormData } from './hooks/usePayoutWithBitcoinForm.ts'
import { usePayoutWithLightningForm } from './hooks/usePayoutWithLightningForm.ts'
import { LightningPayoutFormData } from './hooks/usePayoutWithLightningForm.ts'
import { PayoutMethod } from './types.ts'

type PayoutRskProps = {
  isOpen: boolean
  onClose: () => void
  project: ProjectForProfileContributionsFragment
  rskAddress?: string
  payoutAmountOverride?: number
  onCompleted?: () => void
}

export const MAX_SATS_FOR_LIGHTNING = 5000000 // 5,000,000 sats is the maximum amount for Lightning refunds

/** RefundRsk: Component for handling refund payouts with Lightning or On-Chain Bitcoin */
export const PayoutRsk: React.FC<PayoutRskProps> = ({
  isOpen,
  onClose,
  project,
  rskAddress,
  payoutAmountOverride,
  onCompleted,
}) => {
  const toast = useNotification()

  useUserAccountKeys()

  const userAccountKeys = useAtomValue(userAccountKeysAtom)

  const [selectedMethod, setSelectedMethod] = useState<PayoutMethod>(PayoutMethod.OnChain)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isProcessed, setIsProcessed] = useState(false)
  const [isWaitingConfirmation, setIsWaitingConfirmation] = useState(false)
  const [refundAddress, setRefundAddress] = useState<string | null>(null)

  const [lockTxId, setLockTxId] = useState('')
  const [refundTxId, setRefundTxId] = useState('')
  const [payoutInvoiceId, setPayoutInvoiceId] = useState('')

  const [payoutRequest, { data: payoutRequestData, loading: payoutRequestLoading }] = usePayoutRequestMutation()

  const [payoutPaymentCreate, { loading: isPayoutPaymentCreateLoading }] = usePayoutPaymentCreateMutation()
  const [payoutInitiate, { loading: isPayoutInitiateLoading }] = usePayoutInitiateMutation()

  const [swapData, setSwapData] = useState<any>(null)

  useEffect(() => {
    if (isOpen) {
      payoutRequest({
        variables: {
          input: {
            projectId: project.id,
            rskAddress: rskAddress || userAccountKeys?.rskKeyPair.address,
          },
        },
      })
    }
  }, [isOpen, payoutRequest, project.id, userAccountKeys?.rskKeyPair.address, rskAddress])

  const payout = payoutRequestData?.payoutRequest.payout
  const isProcessing = payout?.status === PayoutStatus.Processing
  const payoutMetadata = payoutRequestData?.payoutRequest.payoutMetadata
  const contractType = payoutMetadata?.contractType
  const latestPayment = isProcessing
    ? payout?.payments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
    : null
  const isClaimable =
    isProcessing &&
    latestPayment?.paymentType === PaymentType.RskToOnChainSwap &&
    latestPayment?.status === PaymentStatus.Claimable

  const createPayoutSignature = (params: { lockCallData: Hex; accountKeys: AccountKeys; amount: number }) => {
    const { lockCallData, accountKeys, amount } = params

    console.log('CONTRACT TYPE', contractType)
    console.log('PAYOUT METADATA', JSON.stringify(payoutMetadata))
    if (contractType === PayoutContractType.Prism) {
      if (!payoutMetadata?.prismContractAddress) {
        throw new Error('Missing Prism contract address for payout')
      }

      if (!payoutMetadata?.projectKey) {
        throw new Error('Missing Prism project key for payout')
      }

      return createAndSignPrismWithdrawMessage({
        prismContractAddress: payoutMetadata.prismContractAddress,
        prismDomainSeparator: payoutMetadata.prismDomainSeparator || undefined,
        swapContractAddress: payoutMetadata.swapContractAddress || '',
        receiverAddress: accountKeys.address,
        amount: satsToWei(amount),
        projectKey: payoutMetadata.projectKey,
        nonce: payoutMetadata.nonce || 0,
        deadline: payoutRequestData?.payoutRequest.payout.expiresAt || 0,
        lockCallData,
        rskPrivateKey: accountKeys.privateKey,
      })
    }

    return createAndSignClaimMessage({
      aonContractAddress: payoutMetadata?.aonContractAddress || '',
      swapContractAddress: payoutMetadata?.swapContractAddress || '',
      creatorAddress: accountKeys.address,
      amount: satsToWei(amount),
      nonce: payoutMetadata?.nonce || 0,
      deadline: payoutRequestData?.payoutRequest.payout.expiresAt || 0,
      processingFee: 0,
      lockCallData,
      rskPrivateKey: accountKeys.privateKey,
    })
  }

  const handleLightningSubmit = async (data: LightningPayoutFormData, accountKeys: AccountKeys) => {
    setIsSubmitting(true)
    try {
      const amount = payoutRequestData?.payoutRequest.payout.amount || 0

      const { data: payoutPaymentCreateResponse } = await payoutPaymentCreate({
        variables: {
          input: {
            payoutId: payoutRequestData?.payoutRequest.payout.id,
            payoutPaymentInput: {
              rskToLightningSwap: {
                lightningAddress: data.lightningAddress,
                boltz: {
                  refundPublicKey: accountKeys.publicKey,
                },
              },
            },
          },
        },
      })

      if (
        !payoutPaymentCreateResponse?.payoutPaymentCreate ||
        !payoutPaymentCreateResponse.payoutPaymentCreate.payment ||
        !payoutPaymentCreateResponse.payoutPaymentCreate.swap
      ) {
        throw new Error('Failed to create payment')
      }

      const { swap, payment } = payoutPaymentCreateResponse.payoutPaymentCreate

      const paymentDetails = payment?.paymentDetails as RskToLightningSwapPaymentDetailsFragment

      const swapObj = JSON.parse(swap)
      swapObj.privateKey = accountKeys.privateKey
      swapObj.preimageHash = paymentDetails.swapPreimageHash
      swapObj.paymentId = payment?.id
      setSwapData(swapObj)

      setPayoutInvoiceId(paymentDetails.lightningInvoiceId)

      const callDataHex = createCallDataForLockCall({
        preimageHash: `0x${paymentDetails.swapPreimageHash}` as Hex,
        claimAddress: swapObj?.claimAddress as Address,
        refundAddress: accountKeys.address as Address,
        timelock: swapObj?.timeoutBlockHeight || 0n,
      })

      const { signature } = createPayoutSignature({ lockCallData: callDataHex, accountKeys, amount })

      await payoutInitiate({
        variables: {
          input: {
            payoutId: payoutRequestData?.payoutRequest.payout.id,
            signature,
            callDataHex,
          },
        },
        onCompleted(data) {
          if (data.payoutInitiate.txHash) {
            setLockTxId(data.payoutInitiate.txHash)
          }
        },
      })

      setIsProcessed(true)
      onCompleted?.()
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
    if (isProcessing && isClaimable) {
      const paymentDetails = latestPayment?.paymentDetails as RskToOnChainSwapPaymentDetails

      const swapObj = JSON.parse(paymentDetails.swapMetadata)

      swapObj.privateKey = accountKeys.privateKey
      swapObj.preimageHash = paymentDetails.swapPreimageHash
      swapObj.preimageHex = await decryptString({
        encryptedString: swapObj.preimageHexEncrypted || '',
        password: data.accountPassword || '',
      })
      swapObj.paymentId = latestPayment.id
      setSwapData(swapObj)

      setIsWaitingConfirmation(true)
      setRefundAddress(data.bitcoinAddress)
      toast.info({
        title: t('Refund initiated'),
        description: t('Your Bitcoin on-chain refund will be processed shortly'),
      })

      return
    }

    setIsSubmitting(true)
    try {
      // TODO: Implement actual Bitcoin on-chain refund API call

      const { preimageHash, preimageHex } = generatePreImageHash()

      const preimageHexEncrypted = await encryptString({
        plainText: preimageHex,
        password: data.accountPassword || '',
      })

      const amount = payoutRequestData?.payoutRequest.payout.amount || 0

      const { data: payoutPaymentCreateResponse } = await payoutPaymentCreate({
        variables: {
          input: {
            payoutId: payoutRequestData?.payoutRequest.payout.id,
            payoutPaymentInput: {
              rskToOnChainSwap: {
                boltz: {
                  claimPublicKey: accountKeys.publicKey,
                  preimageHash,
                  preimageHexEncrypted,
                },
              },
            },
          },
        },
      })

      if (
        !payoutPaymentCreateResponse?.payoutPaymentCreate ||
        !payoutPaymentCreateResponse.payoutPaymentCreate.payment ||
        !payoutPaymentCreateResponse.payoutPaymentCreate.swap
      ) {
        throw new Error('Failed to create payment')
      }

      const { swap, payment } = payoutPaymentCreateResponse.payoutPaymentCreate

      const swapObj = JSON.parse(swap)
      swapObj.privateKey = accountKeys.privateKey
      swapObj.preimageHash = preimageHash
      swapObj.preimageHex = preimageHex
      swapObj.paymentId = payment?.id
      setSwapData(swapObj)

      const callDataHex = createCallDataForLockCall({
        preimageHash: `0x${preimageHash}` as Hex,
        claimAddress: swapObj?.lockupDetails?.claimAddress as Address,
        refundAddress: accountKeys.address as Address,
        timelock: swapObj?.lockupDetails?.timeoutBlockHeight || 0n,
      })

      const { signature } = createPayoutSignature({ lockCallData: callDataHex, accountKeys, amount })

      // Simulate processing delay
      await payoutInitiate({
        variables: {
          input: {
            payoutId: payoutRequestData?.payoutRequest.payout.id,
            signature,
            callDataHex,
          },
        },
        onCompleted(data) {
          if (data.payoutInitiate.txHash) {
            setLockTxId(data.payoutInitiate.txHash)
          }
        },
      })
      setIsWaitingConfirmation(true)
      setRefundAddress(data.bitcoinAddress)
      toast.info({
        title: t('Refund initiated'),
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

  const handleCompleted = () => {
    onCompleted?.()
    handleClose()
  }

  const enableSubmit = selectedMethod === PayoutMethod.Lightning ? lightningForm.enableSubmit : bitcoinForm.enableSubmit
  const hasPayout = Boolean(payout?.id)

  const handleSubmit = () => {
    if (!hasPayout) {
      toast.error({
        title: t('Unable to load payout details'),
        description: t('Please wait a moment and try again.'),
      })
      return
    }

    if (selectedMethod === PayoutMethod.Lightning) {
      lightningForm.handleSubmit()
    } else {
      bitcoinForm.handleSubmit()
    }
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
          <LightningPayoutProcessed isRefund={true} invoiceId={payoutInvoiceId} onClose={handleCompleted} />
        ) : (
          <BitcoinPayoutProcessed isRefund={true} onClose={handleCompleted} refundTxId={refundTxId} />
        )}
      </Modal>
    )
  }

  if (isWaitingConfirmation) {
    return (
      <Modal isOpen={isOpen} size="lg" title={t('Please wait for swap confirmation')} onClose={() => {}} noClose={true}>
        <BitcoinPayoutWaitingConfirmation
          swapData={swapData}
          lockTxId={lockTxId}
          refundAddress={refundAddress || ''}
          setIsProcessed={setIsProcessed}
          setRefundTxId={setRefundTxId}
        />
      </Modal>
    )
  }

  const totalAmount = payout?.amount ?? payoutAmountOverride ?? 0

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="lg"
      title={t('Claim Payout')}
      subtitle={`${t('Total payout amount')}: ${commaFormatted(totalAmount)} sats`}
      subtitleProps={{ bold: true }}
      bodyProps={{ gap: 4 }}
    >
      {payoutRequestLoading ? (
        <RefundRskSkeleton />
      ) : (
        <>
          {/* Payout Method Selection */}
          <PayoutMethodSelection
            selectedMethod={selectedMethod}
            setSelectedMethod={setSelectedMethod}
            disableLightning={totalAmount > MAX_SATS_FOR_LIGHTNING || isClaimable}
          />

          {/* Form Section */}
          <CardLayout w="full" p={6}>
            {selectedMethod === PayoutMethod.Lightning ? (
              <LightningPayoutForm form={lightningForm.form} satsAmount={totalAmount} />
            ) : (
              <BitcoinPayoutForm form={bitcoinForm.form} satsAmount={totalAmount} />
            )}
          </CardLayout>

          <Button
            w="full"
            size="lg"
            colorScheme="primary1"
            variant="solid"
            isLoading={isSubmitting || isPayoutInitiateLoading || isPayoutPaymentCreateLoading}
            isDisabled={!enableSubmit || payoutRequestLoading}
            onClick={handleSubmit}
          >
            {t('Claim Payout')}
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
