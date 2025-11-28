import { Button, HStack, Icon, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import React, { useEffect, useState } from 'react'
import { PiWarningCircleBold } from 'react-icons/pi'

import { useUserAccountKeys } from '@/modules/auth/hooks/useUserAccountKeys.ts'
import { userAccountKeysAtom } from '@/modules/auth/state/userAccountKeysAtom.ts'
import { AccountKeys, generatePreImageHash } from '@/modules/project/forms/accountPassword/keyGenerationHelper.ts'
import { satsToWei } from '@/modules/project/funding/hooks/useFundingAPI.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { SkeletonLayout } from '@/shared/components/layouts/SkeletonLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { usePledgeRefundInitiateMutation, usePledgeRefundRequestMutation } from '@/types/index.ts'
import { commaFormatted, useNotification } from '@/utils/index.ts'

import { BitcoinPayoutForm } from './components/BitcoinPayoutForm.tsx'
import { BitcoinPayoutProcessed } from './components/BitcoinPayoutProcessed.tsx'
import { BitcoinPayoutWaitingConfirmation } from './components/BitcoinPayoutWaitingConfirmation.tsx'
import { LightningPayoutForm } from './components/LightningPayoutForm.tsx'
import { LightningPayoutProcessed } from './components/LightningPayoutProcessed.tsx'
import { PayoutMethodSelection } from './components/PayoutMethodSelection.tsx'
import { createAndSignRefundMessage } from './createAndSignRefundAndPayout.ts'
import { usePayoutWithBitcoinForm } from './hooks/usePayoutWithBitcoinForm.ts'
import { BitcoinPayoutFormData } from './hooks/usePayoutWithBitcoinForm.ts'
import { usePayoutWithLightningForm } from './hooks/usePayoutWithLightningForm.ts'
import { LightningPayoutFormData } from './hooks/usePayoutWithLightningForm.ts'
import { MAX_SATS_FOR_LIGHTNING } from './PayoutRsk.tsx'
import { PayoutMethod } from './types.ts'

type RefundRskProps = {
  isOpen: boolean
  onClose: () => void
  contributionUUID: string
  projectId?: number
  rskAddress?: string
  privateKey?: string
  publicKey?: string
}

/** RefundRsk: Component for handling refund payouts with Lightning or On-Chain Bitcoin */
export const RefundRsk: React.FC<RefundRskProps> = ({
  isOpen,
  onClose,
  contributionUUID,
  projectId,
  rskAddress,
  privateKey,
  publicKey,
}) => {
  const toast = useNotification()

  useUserAccountKeys()

  const userAccountKeys = useAtomValue(userAccountKeysAtom)

  const refundFileAccountKeys = privateKey
    ? ({ derivationPath: '', address: privateKey, privateKey, publicKey } as AccountKeys)
    : undefined

  const [selectedMethod, setSelectedMethod] = useState<PayoutMethod>(PayoutMethod.OnChain)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isProcessed, setIsProcessed] = useState(false)
  const [isWaitingConfirmation, setIsWaitingConfirmation] = useState(false)
  const [refundAddress, setRefundAddress] = useState<string | null>(null)
  const [refundTxId, setRefundTxId] = useState('')

  const [continueRefund, setContinueRefund] = useState(false)

  const [
    pledgeRefundRequest,
    { data: pledgeRefundRequestData, loading: pledgeRefundRequestLoading, error: pledgeRefundRequestError },
  ] = usePledgeRefundRequestMutation()

  const [pledgeRefundInitiate, { loading: isPledgeRefundInitiateLoading }] = usePledgeRefundInitiateMutation()

  const [swapData, setSwapData] = useState<any>(null)

  useEffect(() => {
    if (isOpen) {
      pledgeRefundRequest({
        variables: {
          input: {
            contributionUuid: contributionUUID,
            projectId,
            rskAddress: rskAddress || userAccountKeys?.rskKeyPair.address,
          },
        },
      })
    }
  }, [isOpen, pledgeRefundRequest, contributionUUID, projectId, userAccountKeys?.rskKeyPair.address, rskAddress])

  const handleLightningSubmit = async (data: LightningPayoutFormData, accountKeys: AccountKeys) => {
    setIsSubmitting(true)
    try {
      const amount =
        (pledgeRefundRequestData?.pledgeRefundRequest.refund.amount || 0) -
        (pledgeRefundRequestData?.pledgeRefundRequest.refundProcessingFee || 0)

      const { signature } = createAndSignRefundMessage({
        aonContractAddress: pledgeRefundRequestData?.pledgeRefundRequest.refundMetadata.aonContractAddress || '',
        swapContractAddress: pledgeRefundRequestData?.pledgeRefundRequest.refundMetadata.swapContractAddress || '',
        contributorAddress: accountKeys.address,
        amount: satsToWei(amount),
        nonce: pledgeRefundRequestData?.pledgeRefundRequest.refundMetadata.nonce || 0,
        deadline: pledgeRefundRequestData?.pledgeRefundRequest.refund.expiresAt || 0,
        rskPrivateKey: accountKeys.privateKey,
      })

      await pledgeRefundInitiate({
        variables: {
          input: {
            pledgeRefundId: pledgeRefundRequestData?.pledgeRefundRequest.refund.id,
            signature,
            rskAddress: accountKeys.address,
            pledgeRefundPaymentInput: {
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
      // TODO: Implement actual Bitcoin on-chain refund API call

      const { preimageHash, preimageHex } = generatePreImageHash()

      const amount =
        (pledgeRefundRequestData?.pledgeRefundRequest.refund.amount || 0) -
        (pledgeRefundRequestData?.pledgeRefundRequest.refundProcessingFee || 0)

      const { signature } = createAndSignRefundMessage({
        aonContractAddress: pledgeRefundRequestData?.pledgeRefundRequest.refundMetadata.aonContractAddress || '',
        swapContractAddress: pledgeRefundRequestData?.pledgeRefundRequest.refundMetadata.swapContractAddress || '',
        contributorAddress: accountKeys.address,
        amount: satsToWei(amount),
        nonce: pledgeRefundRequestData?.pledgeRefundRequest.refundMetadata.nonce || 0,
        deadline: pledgeRefundRequestData?.pledgeRefundRequest.refund.expiresAt || 0,
        rskPrivateKey: accountKeys.privateKey,
      })

      // Simulate processing delay
      await pledgeRefundInitiate({
        variables: {
          input: {
            pledgeRefundId: pledgeRefundRequestData?.pledgeRefundRequest.refund.id,
            signature,
            pledgeRefundPaymentInput: {
              rskToOnChainSwap: {
                boltz: {
                  userClaimAddress: data.bitcoinAddress,
                  claimPublicKey: accountKeys.publicKey,
                  preimageHash,
                },
              },
            },
          },
        },
        onCompleted(data) {
          if (data.pledgeRefundInitiate.swap) {
            const swapObj = JSON.parse(data.pledgeRefundInitiate.swap)
            swapObj.privateKey = accountKeys.privateKey
            swapObj.preimageHash = preimageHash
            swapObj.preimageHex = preimageHex
            swapObj.paymentId = data.pledgeRefundInitiate.payment?.id
            setSwapData(swapObj)
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
  const lightningForm = usePayoutWithLightningForm(handleLightningSubmit, refundFileAccountKeys)
  const bitcoinForm = usePayoutWithBitcoinForm(handleBitcoinSubmit, refundFileAccountKeys)

  const handleClose = () => {
    setIsProcessed(false)
    setIsSubmitting(false)
    setContinueRefund(false)
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
          <BitcoinPayoutProcessed isRefund={true} refundTxId={refundTxId} onClose={handleClose} />
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

  const ContinueRefundContent = () => {
    return (
      <VStack spacing={4} alignItems="start" w="full">
        <Body size={'md'} medium>
          {t('Refund all of the contributions you have made to this project.')} <br />
          {t('Are you sure you want to continue with the refund?')}
        </Body>
        <Body size={'xl'} bold>
          {t('Total refund amount')}
          {': '}
          {commaFormatted(pledgeRefundRequestData?.pledgeRefundRequest.refund.amount)} sats
        </Body>
        <Body size={'md'} medium></Body>
        <HStack spacing={4} w="full" justifyContent="space-between">
          <Button size={'lg'} colorScheme={'neutral1'} variant={'outline'} onClick={handleClose}>
            {t('No, cancel')}
          </Button>
          <Button size={'lg'} colorScheme={'primary1'} variant={'solid'} onClick={() => setContinueRefund(true)}>
            {t('Yes, continue with the refund')}
          </Button>
        </HStack>
      </VStack>
    )
  }

  const totalAmount = pledgeRefundRequestData?.pledgeRefundRequest.refund.amount || 0

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="lg"
      title={t('Refund you contribution')}
      subtitle={`${t('Total refund amount')}: ${commaFormatted(totalAmount)} sats`}
      subtitleProps={{ bold: true }}
      bodyProps={{ gap: 4 }}
    >
      {pledgeRefundRequestLoading ? (
        <RefundRskSkeleton />
      ) : !continueRefund ? (
        <ContinueRefundContent />
      ) : (
        <>
          {/* Payout Method Selection */}
          <PayoutMethodSelection
            selectedMethod={selectedMethod}
            setSelectedMethod={setSelectedMethod}
            disableLightning={totalAmount > MAX_SATS_FOR_LIGHTNING}
          />

          {/* Form Section */}
          <CardLayout w="full" p={6}>
            {selectedMethod === PayoutMethod.Lightning ? (
              <LightningPayoutForm
                form={lightningForm.form}
                satsAmount={totalAmount}
                disablePassword={Boolean(privateKey)}
              />
            ) : (
              <BitcoinPayoutForm
                form={bitcoinForm.form}
                satsAmount={totalAmount}
                disablePassword={Boolean(privateKey)}
              />
            )}
          </CardLayout>

          <Button
            w="full"
            size="lg"
            colorScheme="primary1"
            variant="solid"
            isLoading={isSubmitting || isPledgeRefundInitiateLoading}
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
