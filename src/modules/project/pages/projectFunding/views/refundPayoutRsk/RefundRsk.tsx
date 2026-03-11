/* eslint-disable complexity */
import { Button, HStack, Icon, Link as ChakraLink, Stack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { PiInfoBold, PiWarningCircleBold } from 'react-icons/pi'
import { Trans } from 'react-i18next'
import { Address, Hex } from 'viem'

import { useUserAccountKeys } from '@/modules/auth/hooks/useUserAccountKeys.ts'
import { userAccountKeysAtom } from '@/modules/auth/state/userAccountKeysAtom.ts'
import { decryptString, encryptString } from '@/modules/project/forms/accountPassword/encryptDecrptString.ts'
import { AccountKeys, generatePreImageHash } from '@/modules/project/forms/accountPassword/keyGenerationHelper.ts'
import { satsToWei } from '@/modules/project/funding/hooks/useFundingAPI.ts'
import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { SkeletonLayout } from '@/shared/components/layouts/SkeletonLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import { getRootstockExplorerTxUrl } from '@/shared/utils/external/rootstock.ts'
import {
  PaymentStatus,
  PaymentType,
  PledgeRefundStatus,
  RskToLightningSwapPaymentDetailsFragment,
  RskToOnChainSwapPaymentDetails,
  usePledgeRefundInitiateMutation,
  usePledgeRefundPaymentCreateMutation,
  usePledgeRefundRequestMutation,
} from '@/types/index.ts'
import { commaFormatted, useNotification } from '@/utils/index.ts'

import { createCallDataForLockCall } from '../../utils/createCallDataForLockCall.ts'
import { createAndSignLockTransaction } from '../../utils/createLockTransaction.ts'
import { BitcoinPayoutForm } from './components/BitcoinPayoutForm.tsx'
import { BitcoinPayoutProcessed } from './components/BitcoinPayoutProcessed.tsx'
import { BitcoinPayoutWaitingConfirmation } from './components/BitcoinPayoutWaitingConfirmation.tsx'
import { DEFAULT_LIGHTNING_PAYOUT_MAX_SATS, MAX_SATS_FOR_LIGHTNING } from './constant.ts'
import { LightningPayoutForm } from './components/LightningPayoutForm.tsx'
import { LightningPayoutProcessed } from './components/LightningPayoutProcessed.tsx'
import { PayoutMethodSelection } from './components/PayoutMethodSelection.tsx'
import { PayoutProgressSidebar, PayoutProgressStep } from './components/PayoutProgressSidebar.tsx'
import { createAndSignRefundMessage } from './createAndSignRefundAndPayout.ts'
import { usePayoutWithBitcoinForm } from './hooks/usePayoutWithBitcoinForm.ts'
import { BitcoinPayoutFormData } from './hooks/usePayoutWithBitcoinForm.ts'
import { usePayoutWithLightningForm } from './hooks/usePayoutWithLightningForm.ts'
import { LightningPayoutFormData } from './hooks/usePayoutWithLightningForm.ts'
import { PayoutFlowSwapData, PayoutMethod } from './types.ts'

type RefundRskProps = {
  isOpen: boolean
  onClose: () => void
  contributionUUID: string
  projectId?: number
  rskAddress?: string
  privateKey?: string
  publicKey?: string
  onCompleted?: () => void
}

type RefundProgressStage = 'setup' | 'waiting_confirmation' | 'claim_ready' | 'completed'

function getRefundProgressSteps(params: {
  method: PayoutMethod
  stage: RefundProgressStage
}): PayoutProgressStep[] {
  const { method, stage } = params

  if (method === PayoutMethod.Lightning) {
    return [
      {
        title: t('Choose refund method'),
        description: t('Choose your refund method and authorize the transfer.'),
        status: stage === 'setup' ? 'current' : 'complete',
      },
      {
        title: t('Process refund'),
        description: t('We route the refund to your Lightning destination.'),
        status: stage === 'completed' ? 'complete' : 'upcoming',
      },
      {
        title: t('Refund sent'),
        description: t('Your refund has been submitted successfully.'),
        status: stage === 'completed' ? 'complete' : 'upcoming',
      },
    ]
  }

  if (stage === 'completed') {
    return [
      {
        title: t('Choose refund method'),
        description: t('Choose your refund method and authorize the transfer.'),
        status: 'complete',
      },
      {
        title: t('Wait for confirmations'),
        description: t('Bitcoin Rootstock network confirmations are required before claiming.'),
        status: 'complete',
      },
      {
        title: t('Claim refund'),
        description: t('Broadcast your claim transaction to claim the funds.'),
        status: 'complete',
      },
      {
        title: t('Refund sent'),
        description: t('Your on-chain refund has been completed.'),
        status: 'complete',
      },
    ]
  }

  if (stage === 'claim_ready') {
    return [
      {
        title: t('Choose refund method'),
        description: t('Choose your refund method and authorize the transfer.'),
        status: 'complete',
      },
      {
        title: t('Wait for confirmations'),
        description: t('Bitcoin Rootstock network confirmations are required before claiming.'),
        status: 'complete',
      },
      {
        title: t('Claim refund'),
        description: t('Broadcast your claim transaction to claim the funds.'),
        status: 'current',
      },
      {
        title: t('Refund sent'),
        description: t('Your on-chain refund has been completed.'),
        status: 'upcoming',
      },
    ]
  }

  if (stage === 'waiting_confirmation') {
    return [
      {
        title: t('Choose refund method'),
        description: t('Choose your refund method and authorize the transfer.'),
        status: 'complete',
      },
      {
        title: t('Wait for confirmations'),
        description: t('Bitcoin Rootstock network confirmations are required before claiming.'),
        status: 'current',
      },
      {
        title: t('Claim refund'),
        description: t('Broadcast your claim transaction to claim the funds.'),
        status: 'upcoming',
      },
      {
        title: t('Refund sent'),
        description: t('Your on-chain refund has been completed.'),
        status: 'upcoming',
      },
    ]
  }

  return [
    {
      title: t('Choose refund method'),
      description: t('Choose your refund method and authorize the transfer.'),
      status: 'current',
    },
    {
      title: t('Wait for confirmations'),
      description: t('Bitcoin Rootstock network confirmations are required before claiming.'),
      status: 'upcoming',
    },
    {
      title: t('Claim refund'),
      description: t('Broadcast your claim transaction to claim the funds.'),
      status: 'upcoming',
    },
    {
      title: t('Refund sent'),
      description: t('Your on-chain refund has been completed.'),
      status: 'upcoming',
    },
  ]
}

const ContinueRefundContent = () => {
  return (
    <VStack spacing={4} alignItems="start" w="full">
      <Body size={'md'} medium>
        {t('Refund all of the contributions you have made to this project.')} <br />
        {t('Are you sure you want to continue with the refund?')}
      </Body>
    </VStack>
  )
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
  onCompleted,
}) => {
  const toast = useNotification()

  useUserAccountKeys()

  const userAccountKeys = useAtomValue(userAccountKeysAtom)

  const refundFileAccountKeys = privateKey
    ? ({ derivationPath: '', address: rskAddress, privateKey, publicKey } as AccountKeys)
    : undefined

  const [selectedMethod, setSelectedMethod] = useState<PayoutMethod>(PayoutMethod.OnChain)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isProcessed, setIsProcessed] = useState(false)
  const [isWaitingConfirmation, setIsWaitingConfirmation] = useState(false)
  const [isWaitingClaimReady, setIsWaitingClaimReady] = useState(false)
  const [refundAddress, setRefundAddress] = useState<string | null>(null)
  const [lockTxId, setLockTxId] = useState('')
  const [refundTxId, setRefundTxId] = useState('')
  const [refundInvoiceId, setRefundInvoiceId] = useState('')

  const [continueRefund, setContinueRefund] = useState(false)
  const hasDefaultedMethodRef = useRef(false)
  const hasRequestedRefundRef = useRef(false)

  const [
    pledgeRefundRequest,
    { data: pledgeRefundRequestData, loading: pledgeRefundRequestLoading, error: pledgeRefundRequestError },
  ] = usePledgeRefundRequestMutation()

  const [pledgeRefundPaymentCreate, { loading: isPledgeRefundPaymentCreateLoading }] =
    usePledgeRefundPaymentCreateMutation()
  const [pledgeRefundInitiate, { loading: isPledgeRefundInitiateLoading }] = usePledgeRefundInitiateMutation()

  const [swapData, setSwapData] = useState<PayoutFlowSwapData | null>(null)
  const waitingNotice = isWaitingClaimReady ? (
    t('Your funds are ready to be claimed')
  ) : (
    <Trans i18nKey="We are waiting for the transaction to be confirmed before you can claim the funds. You can check the transaction status by <1>clicking here</1>.">
      {'We are waiting for the transaction to be confirmed before you can claim the funds. You can check the transaction status by '}
      <ChakraLink href={getRootstockExplorerTxUrl(lockTxId || '')} textDecoration="underline" isExternal>
        {'clicking here'}
      </ChakraLink>
      {'.'}
    </Trans>
  )

  useEffect(() => {
    if (!isOpen) {
      hasRequestedRefundRef.current = false
      return
    }

    if (hasRequestedRefundRef.current) {
      return
    }

    hasRequestedRefundRef.current = true
    pledgeRefundRequest({
      variables: {
        input: {
          contributionUuid: contributionUUID,
          projectId,
          rskAddress: rskAddress || userAccountKeys?.rskKeyPair.address,
        },
      },
    }).catch(() => {
      hasRequestedRefundRef.current = false
    })
  }, [isOpen, pledgeRefundRequest, contributionUUID, projectId, userAccountKeys?.rskKeyPair.address, rskAddress])

  const isProcessing = pledgeRefundRequestData?.pledgeRefundRequest.refund.status === PledgeRefundStatus.Processing
  const latestPayment = isProcessing
    ? [...(pledgeRefundRequestData?.pledgeRefundRequest.refund.payments ?? [])].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )[0]
    : null
  const activeLightningPayment = latestPayment?.paymentType === PaymentType.RskToLightningSwap ? latestPayment : null
  const activeOnChainPayment = latestPayment?.paymentType === PaymentType.RskToOnChainSwap ? latestPayment : null
  const activeLightningInvoiceId = activeLightningPayment
    ? (activeLightningPayment.paymentDetails as RskToLightningSwapPaymentDetailsFragment).lightningInvoiceId
    : ''

  // isClaimable is the case when the funds are in the bitcoin address, ready for the user to claim
  const isClaimable = activeOnChainPayment?.status === PaymentStatus.Claimable
  const latestOnChainPaymentDetails =
    activeOnChainPayment?.paymentDetails as RskToOnChainSwapPaymentDetails | undefined
  const persistedOnChainAddress = latestOnChainPaymentDetails?.onChainAddress || ''
  const shouldResumeOnChainRefund = Boolean(
    activeOnChainPayment && [PaymentStatus.Pending, PaymentStatus.Claimable].includes(activeOnChainPayment.status),
  )
  const shouldRequestBitcoinAddressOnResume = shouldResumeOnChainRefund && !persistedOnChainAddress

  // isRefundable is the case when the funds are in the swap contract, user needs to wait for the funds to be refunded
  const isRefundable =
    isProcessing &&
    (latestPayment?.status === PaymentStatus.Refundable || latestPayment?.status === PaymentStatus.Refunding)

  // isRetryable  is the case when the funds are in the user rsk address
  const isRetryable = isProcessing && latestPayment?.status === PaymentStatus.Refunded

  const totalAmount = pledgeRefundRequestData?.pledgeRefundRequest.refund.amount || 0
  const shouldShowProcessedScreen = isProcessed || Boolean(activeLightningPayment)
  const progressMethod = shouldShowProcessedScreen
    ? activeLightningPayment
      ? PayoutMethod.Lightning
      : selectedMethod
    : selectedMethod
  const progressStage: RefundProgressStage = shouldShowProcessedScreen
    ? 'completed'
    : isWaitingConfirmation
      ? isWaitingClaimReady
        ? 'claim_ready'
        : 'waiting_confirmation'
      : shouldResumeOnChainRefund
        ? isClaimable
          ? 'claim_ready'
          : 'waiting_confirmation'
      : 'setup'
  const progressSteps = getRefundProgressSteps({ method: progressMethod, stage: progressStage })
  const activeProgressStep =
    progressSteps.find((step) => step.status === 'current') ??
    [...progressSteps].reverse().find((step) => step.status === 'complete')
  const activeProgressDescription = activeProgressStep?.description
  const shouldShowMethodSelectionStep = !latestPayment && !shouldResumeOnChainRefund

  useEffect(() => {
    if (!isOpen) {
      hasDefaultedMethodRef.current = false
      return
    }

    if (!continueRefund || latestPayment || shouldResumeOnChainRefund || hasDefaultedMethodRef.current) {
      return
    }

    if (isClaimable) {
      setSelectedMethod(PayoutMethod.OnChain)
      hasDefaultedMethodRef.current = true
      return
    }

    if (!totalAmount) {
      return
    }

    setSelectedMethod(totalAmount < DEFAULT_LIGHTNING_PAYOUT_MAX_SATS ? PayoutMethod.Lightning : PayoutMethod.OnChain)
    hasDefaultedMethodRef.current = true
  }, [continueRefund, latestPayment, shouldResumeOnChainRefund, isClaimable, isOpen, totalAmount])

  const handleLightningSubmit = async (data: LightningPayoutFormData, accountKeys: AccountKeys) => {
    setIsSubmitting(true)
    try {
      const amount =
        (pledgeRefundRequestData?.pledgeRefundRequest.refund.amount || 0) -
        (pledgeRefundRequestData?.pledgeRefundRequest.refundProcessingFee || 0) -
        (isRetryable ? pledgeRefundRequestData?.pledgeRefundRequest.refundProcessingFee || 0 : 0)

      const { data: pledgeRefundPaymentCreateResponse } = await pledgeRefundPaymentCreate({
        variables: {
          input: {
            pledgeRefundId: pledgeRefundRequestData?.pledgeRefundRequest.refund.id,
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

      if (
        !pledgeRefundPaymentCreateResponse?.pledgeRefundPaymentCreate ||
        !pledgeRefundPaymentCreateResponse.pledgeRefundPaymentCreate.payment ||
        !pledgeRefundPaymentCreateResponse.pledgeRefundPaymentCreate.swap
      ) {
        throw new Error('Failed to create payment')
      }

      const { swap, payment } = pledgeRefundPaymentCreateResponse.pledgeRefundPaymentCreate
      const paymentDetails = payment?.paymentDetails as RskToLightningSwapPaymentDetailsFragment

      const swapObj = JSON.parse(swap)
      swapObj.privateKey = accountKeys.privateKey
      swapObj.preimageHash = paymentDetails.swapPreimageHash
      swapObj.paymentId = payment?.id
      setSwapData(swapObj)

      setRefundInvoiceId(paymentDetails.lightningInvoiceId)

      let userLockTxHex = ''

      if (isRetryable) {
        userLockTxHex = await createAndSignLockTransaction({
          preimageHash: `0x${paymentDetails.swapPreimageHash}`,
          claimAddress: swapObj.claimAddress as Address,
          refundAddress: accountKeys.address as Address,
          timelock: swapObj?.timeoutBlockHeight || 0,
          amount: satsToWei(amount), // subract fees
          privateKey: `0x${accountKeys.privateKey}`,
        })
      }

      const callDataHex = createCallDataForLockCall({
        preimageHash: `0x${paymentDetails.swapPreimageHash}` as Hex,
        claimAddress: swapObj?.claimAddress as Address,
        refundAddress: accountKeys.address as Address,
        timelock: swapObj?.timeoutBlockHeight || 0n,
      })

      const { signature } = createAndSignRefundMessage({
        aonContractAddress: pledgeRefundRequestData?.pledgeRefundRequest.refundMetadata.aonContractAddress || '',
        swapContractAddress: pledgeRefundRequestData?.pledgeRefundRequest.refundMetadata.swapContractAddress || '',
        contributorAddress: accountKeys.address,
        amount: satsToWei(amount),
        nonce: pledgeRefundRequestData?.pledgeRefundRequest.refundMetadata.nonce || 0,
        deadline: pledgeRefundRequestData?.pledgeRefundRequest.refund.expiresAt || 0,
        processingFee: satsToWei(pledgeRefundRequestData?.pledgeRefundRequest.refundProcessingFee || 0),
        lockCallData: callDataHex,
        rskPrivateKey: accountKeys.privateKey,
      })

      await pledgeRefundInitiate({
        variables: {
          input: {
            pledgeRefundId: pledgeRefundRequestData?.pledgeRefundRequest.refund.id,
            signature,
            rskAddress: rskAddress || accountKeys.address,
            callDataHex,
            userLockTxHex,
          },
        },
        onCompleted(data) {
          if (data.pledgeRefundInitiate.txHash) {
            setLockTxId(data.pledgeRefundInitiate.txHash)
          }
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
    if (activeOnChainPayment && latestOnChainPaymentDetails) {
      const paymentDetails = latestOnChainPaymentDetails

      const swapObj = JSON.parse(paymentDetails.swapMetadata)

      swapObj.id = swapObj.id || paymentDetails.swapId
      swapObj.privateKey = accountKeys.privateKey
      swapObj.preimageHash = paymentDetails.swapPreimageHash
      swapObj.preimageHex = await decryptString({
        encryptedString: swapObj.preimageHexEncrypted || '',
        password: data.accountPassword || '',
      })
      swapObj.paymentId = activeOnChainPayment.id
      setSwapData(swapObj)

      setLockTxId(paymentDetails.onChainTxId || '')
      setIsWaitingConfirmation(true)
      setIsWaitingClaimReady(isClaimable)
      setRefundAddress(paymentDetails.onChainAddress || data.bitcoinAddress || null)
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

      const amount =
        (pledgeRefundRequestData?.pledgeRefundRequest.refund.amount || 0) -
        (pledgeRefundRequestData?.pledgeRefundRequest.refundProcessingFee || 0) -
        (isRetryable ? pledgeRefundRequestData?.pledgeRefundRequest.refundProcessingFee || 0 : 0)

      const { data: pledgeRefundPaymentCreateResponse } = await pledgeRefundPaymentCreate({
        variables: {
          input: {
            pledgeRefundId: pledgeRefundRequestData?.pledgeRefundRequest.refund.id,
            pledgeRefundPaymentInput: {
              rskToOnChainSwap: {
                onChainAddress: data.bitcoinAddress || undefined,
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
        !pledgeRefundPaymentCreateResponse?.pledgeRefundPaymentCreate ||
        !pledgeRefundPaymentCreateResponse.pledgeRefundPaymentCreate.payment ||
        !pledgeRefundPaymentCreateResponse.pledgeRefundPaymentCreate.swap
      ) {
        throw new Error('Failed to create payment')
      }

      const { swap, payment } = pledgeRefundPaymentCreateResponse.pledgeRefundPaymentCreate
      const paymentDetails = payment?.paymentDetails as RskToOnChainSwapPaymentDetails

      const swapObj = JSON.parse(swap)
      swapObj.id = swapObj.id || paymentDetails.swapId
      swapObj.privateKey = accountKeys.privateKey
      swapObj.preimageHash = preimageHash
      swapObj.preimageHex = preimageHex
      swapObj.paymentId = payment?.id
      setSwapData(swapObj)

      const claimAddress = swapObj?.lockupDetails?.claimAddress as Address
      const timelock = swapObj?.lockupDetails?.timeoutBlockHeight || 0n
      const refundAddress = accountKeys.address as Address

      let userLockTxHex = ''
      if (isRetryable) {
        userLockTxHex = await createAndSignLockTransaction({
          preimageHash: `0x${preimageHash}`,
          claimAddress,
          refundAddress,
          timelock,
          amount: satsToWei(amount),
          privateKey: `0x${accountKeys.privateKey}`,
        })
      }

      const callDataHex = createCallDataForLockCall({
        preimageHash: `0x${preimageHash}` as Hex,
        claimAddress,
        refundAddress,
        timelock,
      })

      const { signature } = createAndSignRefundMessage({
        aonContractAddress: pledgeRefundRequestData?.pledgeRefundRequest.refundMetadata.aonContractAddress || '',
        swapContractAddress: pledgeRefundRequestData?.pledgeRefundRequest.refundMetadata.swapContractAddress || '',
        contributorAddress: accountKeys.address,
        amount: satsToWei(amount),
        nonce: pledgeRefundRequestData?.pledgeRefundRequest.refundMetadata.nonce || 0,
        deadline: pledgeRefundRequestData?.pledgeRefundRequest.refund.expiresAt || 0,
        processingFee: satsToWei(pledgeRefundRequestData?.pledgeRefundRequest.refundProcessingFee || 0),
        lockCallData: callDataHex,
        rskPrivateKey: accountKeys.privateKey,
      })

      // Simulate processing delay
      await pledgeRefundInitiate({
        variables: {
          input: {
            pledgeRefundId: pledgeRefundRequestData?.pledgeRefundRequest.refund.id,
            signature,
            rskAddress: rskAddress || accountKeys.address,
            callDataHex,
            userLockTxHex,
          },
        },
        onCompleted(data) {
          if (data.pledgeRefundInitiate.txHash) {
            setLockTxId(data.pledgeRefundInitiate.txHash)
          }
        },
      })
      setIsWaitingConfirmation(true)
      setIsWaitingClaimReady(false)
      setRefundAddress(data.bitcoinAddress || null)
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
  const bitcoinForm = usePayoutWithBitcoinForm(handleBitcoinSubmit, refundFileAccountKeys, {
    requireBitcoinAddress: !shouldResumeOnChainRefund || shouldRequestBitcoinAddressOnResume,
  })

  useEffect(() => {
    if (isOpen && shouldResumeOnChainRefund) {
      bitcoinForm.form.reset({
        bitcoinAddress: persistedOnChainAddress,
        accountPassword: '',
      })
    }
  }, [isOpen, shouldResumeOnChainRefund, persistedOnChainAddress, bitcoinForm.form])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    if (activeLightningPayment) {
      setSelectedMethod(PayoutMethod.Lightning)
      setRefundInvoiceId(activeLightningInvoiceId)
      return
    }

    if (latestOnChainPaymentDetails) {
      setSelectedMethod(PayoutMethod.OnChain)
      bitcoinForm.form.reset({
        bitcoinAddress: persistedOnChainAddress,
        accountPassword: '',
      })
    }
  }, [
    isOpen,
    activeLightningPayment?.id,
    activeLightningInvoiceId,
    activeOnChainPayment?.id,
    persistedOnChainAddress,
    bitcoinForm.form,
  ])

  const handleClose = () => {
    setIsProcessed(false)
    setIsSubmitting(false)
    setIsWaitingConfirmation(false)
    setIsWaitingClaimReady(false)
    setContinueRefund(false)
    onClose()
  }

  const handleCompleted = () => {
    onCompleted?.()
    handleClose()
  }

  const shouldShowContinueRefundPrompt = !continueRefund && !latestPayment && !shouldResumeOnChainRefund
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

  if (isRefundable) {
    return (
      <Modal isOpen={isOpen} size="lg" title={t('Funds are being processed')} onClose={handleClose}>
        <Icon as={PiInfoBold} fontSize="120px" color="info.9" />
        <VStack spacing={4} w="full" alignItems="center">
          <Body size="md" textAlign="center">
            {t(
              'Your previous claim attempt encountered an issue. Your funds are currently in the swap contract and we are processing them in the background to return them to your account.',
            )}
          </Body>
          <Body size="md" textAlign="center">
            {t('Please wait while we resolve this. Once complete, you will be able to claim your funds.')}
          </Body>
          <Body size="sm" textAlign="center" color="neutral1.11">
            {t('If you do not see this resolved within 24 hours, please contact us at')}{' '}
            <Body as="span" size="sm" bold color="primary1.11">
              support@geyser.fund
            </Body>
          </Body>
        </VStack>
      </Modal>
    )
  }

  // Show processed screen after successful submission
  if (isProcessed) {
    return (
      <Modal isOpen={isOpen} onClose={handleCompleted} size="4xl" contentProps={{ maxW: '980px' }}>
        {renderModalContent({
          title:
            selectedMethod === PayoutMethod.Lightning
              ? t('Refund Processed (Off-Chain)')
              : t('Refund Processed (On-Chain)'),
          description: selectedMethod === PayoutMethod.OnChain ? undefined : activeProgressDescription,
          content:
            selectedMethod === PayoutMethod.Lightning ? (
              <LightningPayoutProcessed isRefund={true} invoiceId={refundInvoiceId} onClose={handleCompleted} />
            ) : (
              <BitcoinPayoutProcessed isRefund={true} refundTxId={refundTxId} onClose={handleCompleted} />
            ),
        })}
      </Modal>
    )
  }

  if (isWaitingConfirmation) {
    return (
      <Modal isOpen={isOpen} size="4xl" onClose={() => {}} noClose={true} contentProps={{ maxW: '980px' }}>
        {renderModalContent({
          notice: (
            <Feedback variant={isWaitingClaimReady ? FeedBackVariant.SUCCESS : FeedBackVariant.INFO} w="full">
              <Body>{waitingNotice}</Body>
            </Feedback>
          ),
          title: isWaitingClaimReady ? t('Claim refund') : t('Please wait for swap confirmation'),
          description: activeProgressDescription,
          content: (
            <BitcoinPayoutWaitingConfirmation
              swapData={swapData}
              refundAddress={refundAddress || ''}
              initialReadyToBeClaimed={isWaitingClaimReady}
              onReadyToBeClaimed={() => setIsWaitingClaimReady(true)}
              setIsProcessed={setIsProcessed}
              setRefundTxId={setRefundTxId}
            />
          ),
        })}
      </Modal>
    )
  }

  const modalTitle = getRefundModalTitle({
    shouldShowContinueRefundPrompt,
    shouldResumeOnChainRefund,
    shouldRequestBitcoinAddressOnResume,
  })
  const modalSubtitle = `${t('Total refund amount')}: ${commaFormatted(totalAmount)} sats`
  const submitLabel = getRefundSubmitLabel({
    shouldResumeOnChainRefund,
    shouldRequestBitcoinAddressOnResume,
  })
  const modalDescription = shouldResumeOnChainRefund ? undefined : continueRefund ? activeProgressDescription : undefined

  function renderModalContent(params: {
    notice?: ReactNode
    title?: ReactNode
    subtitle?: ReactNode
    description?: ReactNode
    content: ReactNode
    footer?: ReactNode
  }) {
    const { notice, title, subtitle, description, content, footer } = params

    return (
      <Stack direction={{ base: 'column', lg: 'row' }} spacing={6} align="stretch" w="full">
        <PayoutProgressSidebar amount={totalAmount} steps={progressSteps} label={t('Pending refund')} />
        <VStack flex={1} spacing={4} align="stretch" minH="100%">
          {(title || subtitle || description) && (
            <VStack spacing={2} align="stretch">
              {title && (
                <Body as="h2" size="2xl" bold color="neutral1.12">
                  {title}
                </Body>
              )}
              {subtitle && (
                <Body size="md" bold color="neutral1.12">
                  {subtitle}
                </Body>
              )}
              {description && (
                <Body size="md" color="neutral1.10">
                  {description}
                </Body>
              )}
            </VStack>
          )}
          {notice}
          <VStack flex={1} spacing={4} align="stretch">
            {content}
          </VStack>
          {footer}
        </VStack>
      </Stack>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="4xl" bodyProps={{ gap: 4 }} contentProps={{ maxW: '980px' }}>
      {pledgeRefundRequestLoading
        ? renderModalContent({
            title: modalTitle,
            subtitle: modalSubtitle,
            description: modalDescription,
            content: <RefundRskSkeleton />,
          })
        : shouldShowContinueRefundPrompt
          ? renderModalContent({
              title: t('Refund your contribution'),
              subtitle: modalSubtitle,
              content: <ContinueRefundContent />,
              footer: (
                <Stack direction={{ base: 'column', md: 'row' }} spacing={4} w="full">
                  <Button
                    flex={1}
                    w="full"
                    size="lg"
                    colorScheme="neutral1"
                    variant="outline"
                    onClick={handleClose}
                  >
                    {t('No, cancel')}
                  </Button>
                  <Button
                    flex={1}
                    w="full"
                    size="lg"
                    colorScheme="primary1"
                    variant="solid"
                    onClick={() => setContinueRefund(true)}
                  >
                    {t('Yes, continue with the refund')}
                  </Button>
                </Stack>
              ),
            })
          : renderModalContent({
              title: modalTitle,
              subtitle: modalSubtitle,
              description: modalDescription,
              content: (
                <>
                  {shouldShowMethodSelectionStep && (
                    <PayoutMethodSelection
                      selectedMethod={selectedMethod}
                      setSelectedMethod={setSelectedMethod}
                      disableLightning={totalAmount > MAX_SATS_FOR_LIGHTNING || isClaimable}
                    />
                  )}

                  {shouldResumeOnChainRefund ? (
                    <BitcoinPayoutForm
                      form={bitcoinForm.form}
                      satsAmount={totalAmount}
                      disableBitcoinAddress={shouldResumeOnChainRefund && !shouldRequestBitcoinAddressOnResume}
                      showBitcoinAddress={!shouldResumeOnChainRefund || shouldRequestBitcoinAddressOnResume}
                    />
                  ) : selectedMethod === PayoutMethod.Lightning ? (
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
                      disableBitcoinAddress={false}
                      showBitcoinAddress={true}
                    />
                  )}
                </>
              ),
              footer: (
                <Button
                  w="full"
                  size="lg"
                  colorScheme="primary1"
                  variant="solid"
                  isLoading={isSubmitting || isPledgeRefundInitiateLoading || isPledgeRefundPaymentCreateLoading}
                  isDisabled={!enableSubmit}
                  onClick={handleSubmit}
                >
                  {submitLabel}
                </Button>
              ),
            })}
    </Modal>
  )
}

/** RefundRskSkeleton: Loading skeleton for the refund modal with payout method selection */
export const RefundRskSkeleton = () => {
  return (
    <VStack w="full" spacing={4} alignItems="start">
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
      <VStack w="full" spacing={4} alignItems="start" pt={2}>
        <SkeletonLayout height="20px" width="100px" />
        <SkeletonLayout height="40px" width="100%" />
        <SkeletonLayout height="20px" width="160px" />
        <SkeletonLayout height="40px" width="100%" />
      </VStack>

      {/* Submit Button Skeleton */}
      <SkeletonLayout height="48px" width="100%" />
    </VStack>
  )
}

function getRefundModalTitle(params: {
  shouldShowContinueRefundPrompt: boolean
  shouldResumeOnChainRefund: boolean
  shouldRequestBitcoinAddressOnResume: boolean
}): string {
  const { shouldShowContinueRefundPrompt, shouldResumeOnChainRefund, shouldRequestBitcoinAddressOnResume } = params

  if (shouldShowContinueRefundPrompt) {
    return t('Refund your contribution')
  }

  if (!shouldResumeOnChainRefund) {
    return t('Choose a refund method')
  }

  if (shouldRequestBitcoinAddressOnResume) {
    return t('Resume your refund')
  }

  return t('Confirm your password to resume the refund')
}

function getRefundSubmitLabel(params: {
  shouldResumeOnChainRefund: boolean
  shouldRequestBitcoinAddressOnResume: boolean
}): string {
  const { shouldResumeOnChainRefund, shouldRequestBitcoinAddressOnResume } = params

  if (!shouldResumeOnChainRefund) {
    return t('Confirm refund method')
  }

  if (shouldRequestBitcoinAddressOnResume) {
    return t('Resume my refund')
  }

  return t('Confirm my password')
}
