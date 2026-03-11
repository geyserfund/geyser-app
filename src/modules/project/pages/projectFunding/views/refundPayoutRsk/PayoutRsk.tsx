/* eslint-disable complexity */
import { Button, HStack, IconButton, Stack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { PiCheck, PiCopy } from 'react-icons/pi'
import { Address, Hex } from 'viem'

import { useUserAccountKeys } from '@/modules/auth/hooks/useUserAccountKeys.ts'
import { decryptString, encryptString } from '@/modules/project/forms/accountPassword/encryptDecrptString.ts'
import {
  AccountKeys,
  generatePreImageHash,
  generateProjectKeysFromSeedHex,
} from '@/modules/project/forms/accountPassword/keyGenerationHelper.ts'
import { satsToWei } from '@/modules/project/funding/hooks/useFundingAPI.ts'
import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { SkeletonLayout } from '@/shared/components/layouts/SkeletonLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import { useCopyToClipboard } from '@/shared/utils/hooks/useCopyButton.ts'
import {
  PaymentStatus,
  PaymentType,
  PayoutContractType,
  PayoutStatus,
  ProjectForProfileContributionsFragment,
  RskToLightningSwapPaymentDetailsFragment,
  RskToOnChainSwapPaymentDetails,
  usePayoutPaymentInitiateMutation,
  usePayoutPaymentPrepareMutation,
  usePayoutPrepareMutation,
} from '@/types/index.ts'
import { useNotification } from '@/utils/index.ts'

import { createCallDataForLockCall } from '../../utils/createCallDataForLockCall.ts'
import { createAndSignLockTransaction } from '../../utils/createLockTransaction.ts'
import { BitcoinPayoutForm } from './components/BitcoinPayoutForm.tsx'
import { BitcoinPayoutProcessed } from './components/BitcoinPayoutProcessed.tsx'
import { BitcoinPayoutWaitingConfirmation } from './components/BitcoinPayoutWaitingConfirmation.tsx'
import { LightningPayoutForm } from './components/LightningPayoutForm.tsx'
import { LightningPayoutProcessed } from './components/LightningPayoutProcessed.tsx'
import { PayoutProgressSidebar, PayoutProgressStep } from './components/PayoutProgressSidebar.tsx'
import { PayoutMethodSelection } from './components/PayoutMethodSelection.tsx'
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
export const DEFAULT_LIGHTNING_PAYOUT_MAX_SATS = 1000000

type PayoutProgressStage = 'setup' | 'waiting_confirmation' | 'claim_ready' | 'completed'

const getPayoutProgressSteps = (params: {
  method: PayoutMethod
  stage: PayoutProgressStage
}): PayoutProgressStep[] => {
  const { method, stage } = params

  if (method === PayoutMethod.Lightning) {
    return [
      {
        title: t('Choose payout method'),
        description: t('Choose your payout method and authorize the transfer.'),
        status: stage === 'setup' ? 'current' : 'complete',
      },
      {
        title: t('Process payout'),
        description: t('We route the payout to your Lightning destination.'),
        status: stage === 'completed' ? 'complete' : 'upcoming',
      },
      {
        title: t('Payout sent'),
        description: t('Your payout has been submitted successfully.'),
        status: stage === 'completed' ? 'complete' : 'upcoming',
      },
    ]
  }

  if (stage === 'completed') {
    return [
      {
        title: t('Choose payout method'),
        description: t('Choose your payout method and authorize the transfer.'),
        status: 'complete',
      },
      {
        title: t('Wait for confirmations'),
        description: t('Bitcoin network confirmations are required before claiming.'),
        status: 'complete',
      },
      {
        title: t('Claim payout'),
        description: t('Broadcast your claim transaction to claim the funds.'),
        status: 'complete',
      },
      {
        title: t('Payout sent'),
        description: t('Your on-chain payout has been completed.'),
        status: 'complete',
      },
    ]
  }

  if (stage === 'claim_ready') {
    return [
      {
        title: t('Choose payout method'),
        description: t('Choose your payout method and authorize the transfer.'),
        status: 'complete',
      },
      {
        title: t('Wait for confirmations'),
        description: t('Bitcoin network confirmations are required before claiming.'),
        status: 'complete',
      },
      {
        title: t('Claim payout'),
        description: t('Broadcast your claim transaction to claim the funds.'),
        status: 'current',
      },
      {
        title: t('Payout sent'),
        description: t('Your on-chain payout has been completed.'),
        status: 'upcoming',
      },
    ]
  }

  if (stage === 'waiting_confirmation') {
    return [
      {
        title: t('Choose payout method'),
        description: t('Choose your payout method and authorize the transfer.'),
        status: 'complete',
      },
      {
        title: t('Wait for confirmations'),
        description: t('Bitcoin network confirmations are required before claiming.'),
        status: 'current',
      },
      {
        title: t('Claim payout'),
        description: t('Broadcast your claim transaction to claim the funds.'),
        status: 'upcoming',
      },
      {
        title: t('Payout sent'),
        description: t('Your on-chain payout has been completed.'),
        status: 'upcoming',
      },
    ]
  }

  return [
    {
      title: t('Choose payout method'),
      description: t('Choose your payout method and authorize the transfer.'),
      status: 'current',
    },
    {
      title: t('Wait for confirmations'),
      description: t('Bitcoin network confirmations are required before claiming.'),
      status: 'upcoming',
    },
    {
      title: t('Claim payout'),
      description: t('Broadcast your claim transaction to claim the funds.'),
      status: 'upcoming',
    },
    {
      title: t('Payout sent'),
      description: t('Your on-chain payout has been completed.'),
      status: 'upcoming',
    },
  ]
}

/** RefundRsk: Component for handling refund payouts with Lightning or On-Chain Bitcoin */
export const PayoutRsk: React.FC<PayoutRskProps> = ({
  isOpen,
  onClose,
  project,
  payoutAmountOverride,
  onCompleted,
}) => {
  const toast = useNotification()

  useUserAccountKeys()

  const [selectedMethod, setSelectedMethod] = useState<PayoutMethod>(PayoutMethod.OnChain)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isProcessed, setIsProcessed] = useState(false)
  const [isWaitingConfirmation, setIsWaitingConfirmation] = useState(false)
  const [isWaitingClaimReady, setIsWaitingClaimReady] = useState(false)
  const [refundAddress, setRefundAddress] = useState<string | null>(null)

  const [lockTxId, setLockTxId] = useState('')
  const [refundTxId, setRefundTxId] = useState('')
  const [payoutInvoiceId, setPayoutInvoiceId] = useState('')

  const hasPreparedPayoutRef = useRef(false)
  const hasDefaultedMethodRef = useRef(false)

  const [payoutPrepare, { data: payoutPrepareData, loading: payoutPrepareLoading }] = usePayoutPrepareMutation()

  const [payoutPaymentPrepare, { loading: isPayoutPaymentPrepareLoading }] = usePayoutPaymentPrepareMutation()
  const [payoutPaymentInitiate, { loading: isPayoutPaymentInitiateLoading }] = usePayoutPaymentInitiateMutation()

  const [swapData, setSwapData] = useState<any>(null)
  const [payoutPrepareError, setPayoutPrepareError] = useState<string | null>(null)

  useEffect(() => {
    if (!isOpen) {
      hasPreparedPayoutRef.current = false
      hasDefaultedMethodRef.current = false
      return
    }

    if (hasPreparedPayoutRef.current) {
      return
    }

    hasPreparedPayoutRef.current = true
    setPayoutPrepareError(null)
    payoutPrepare({
      variables: {
        input: {
          projectId: project.id,
        },
      },
    }).catch((error) => {
      hasPreparedPayoutRef.current = false
      const message = error?.graphQLErrors?.[0]?.message || error?.message || t('Please wait a moment and try again.')
      setPayoutPrepareError(message)
    })
  }, [isOpen, payoutPrepare, project.id])

  const payout = payoutPrepareData?.payoutPrepare.payout
  const isProcessing = payout?.status === PayoutStatus.Processing
  const payoutMetadata = payoutPrepareData?.payoutPrepare.payoutMetadata
  const contractType = payoutMetadata?.contractType
  const latestPayment = isProcessing
    ? [...(payout?.payments ?? [])].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
    : null
  const activeLightningPayment = latestPayment?.paymentType === PaymentType.RskToLightningSwap ? latestPayment : null
  const activeOnChainPayment = latestPayment?.paymentType === PaymentType.RskToOnChainSwap ? latestPayment : null
  const activeLightningInvoiceId = activeLightningPayment
    ? (activeLightningPayment.paymentDetails as RskToLightningSwapPaymentDetailsFragment).lightningInvoiceId
    : ''
  const activeOnChainPaymentDetails = activeOnChainPayment?.paymentDetails as RskToOnChainSwapPaymentDetails | undefined
  const persistedOnChainAddress = activeOnChainPaymentDetails?.onChainAddress || ''
  const isClaimable = activeOnChainPayment?.status === PaymentStatus.Claimable
  const isClaiming = activeOnChainPayment?.status === PaymentStatus.Claiming
  const shouldResumeOnChainPayout = Boolean(
    activeOnChainPayment && [PaymentStatus.Pending, PaymentStatus.Claimable].includes(activeOnChainPayment.status),
  )
  const shouldRequestBitcoinAddressOnResume = shouldResumeOnChainPayout && !persistedOnChainAddress
  const shouldShowProcessedScreen = isProcessed || Boolean(activeLightningPayment) || isClaiming
  const processedMethod = isProcessed
    ? selectedMethod
    : activeLightningPayment
      ? PayoutMethod.Lightning
      : PayoutMethod.OnChain
  const progressMethod = shouldShowProcessedScreen ? processedMethod : selectedMethod
  const progressStage: PayoutProgressStage = shouldShowProcessedScreen
    ? 'completed'
    : shouldResumeOnChainPayout
      ? isClaimable
        ? 'claim_ready'
        : 'waiting_confirmation'
    : isWaitingConfirmation
      ? isWaitingClaimReady
        ? 'claim_ready'
        : 'waiting_confirmation'
      : 'setup'
  const progressSteps = getPayoutProgressSteps({
    method: progressMethod,
    stage: progressStage,
  })
  const totalAmount = payout?.amount ?? payoutAmountOverride ?? 0
  const payoutUuid = payout?.uuid
  const { hasCopied: hasCopiedPayoutId, onCopy: onCopyPayoutId } = useCopyToClipboard(payoutUuid || '')
  const activeProgressStep =
    progressSteps.find((step) => step.status === 'current') ??
    [...progressSteps].reverse().find((step) => step.status === 'complete')
  const activeProgressDescription = activeProgressStep?.description
  const shouldShowMethodSelectionStep = !latestPayment && !shouldResumeOnChainPayout

  useEffect(() => {
    if (!isOpen || latestPayment || shouldResumeOnChainPayout || hasDefaultedMethodRef.current) {
      return
    }

    if (!totalAmount) {
      return
    }

    setSelectedMethod(totalAmount < DEFAULT_LIGHTNING_PAYOUT_MAX_SATS ? PayoutMethod.Lightning : PayoutMethod.OnChain)
    hasDefaultedMethodRef.current = true
  }, [isOpen, latestPayment, shouldResumeOnChainPayout, totalAmount])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    if (activeLightningPayment) {
      setSelectedMethod(PayoutMethod.Lightning)
      setPayoutInvoiceId(activeLightningInvoiceId)
      return
    }

    if (activeOnChainPaymentDetails) {
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
  ])

  const createPayoutSignature = (params: { lockCallData: Hex; accountKeys: AccountKeys; amount: number }) => {
    const { lockCallData, accountKeys, amount } = params

    return createAndSignClaimMessage({
      aonContractAddress: payoutMetadata?.aonContractAddress || '',
      swapContractAddress: payoutMetadata?.swapContractAddress || '',
      creatorAddress: accountKeys.address,
      amount: satsToWei(amount),
      nonce: payoutMetadata?.nonce || 0,
      deadline: payoutPrepareData?.payoutPrepare.payout.expiresAt || 0,
      processingFee: 0n,
      lockCallData,
      rskPrivateKey: accountKeys.privateKey,
    })
  }

  const handleLightningSubmit = async (data: LightningPayoutFormData, accountKeys: AccountKeys) => {
    setIsSubmitting(true)
    try {
      const amount = payoutPrepareData?.payoutPrepare.payout.amount || 0

      const { data: payoutPaymentPrepareResponse } = await payoutPaymentPrepare({
        variables: {
          input: {
            payoutId: payoutPrepareData?.payoutPrepare.payout.id,
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
        !payoutPaymentPrepareResponse?.payoutPaymentPrepare ||
        !payoutPaymentPrepareResponse.payoutPaymentPrepare.payment ||
        !payoutPaymentPrepareResponse.payoutPaymentPrepare.swap
      ) {
        throw new Error('Failed to create payment')
      }

      const { swap, payment } = payoutPaymentPrepareResponse.payoutPaymentPrepare

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

      const isPrismPayout = contractType === PayoutContractType.Prism
      const lockAmountSats = Number(swapObj?.expectedAmount ?? amount)
      const gasPriceWei = swapObj?.geyserGasPriceWei ? BigInt(swapObj.geyserGasPriceWei) : undefined
      const gasLimit = swapObj?.geyserGasLimit ? BigInt(swapObj.geyserGasLimit) : undefined
      const signature = isPrismPayout
        ? '0x'
        : createPayoutSignature({ lockCallData: callDataHex, accountKeys, amount }).signature
      const userLockTxHex = isPrismPayout
        ? await createAndSignLockTransaction({
            preimageHash: `0x${paymentDetails.swapPreimageHash}`,
            claimAddress: swapObj?.claimAddress as Address,
            refundAddress: accountKeys.address as Address,
            timelock: swapObj?.timeoutBlockHeight || 0n,
            amount: satsToWei(lockAmountSats),
            privateKey: `0x${accountKeys.privateKey}`,
            gasPrice: gasPriceWei,
            gasLimit,
          })
        : ''

      await payoutPaymentInitiate({
        variables: {
          input: {
            payoutId: payoutPrepareData?.payoutPrepare.payout.id,
            paymentId: payment.id,
            signature,
            callDataHex,
            userLockTxHex: userLockTxHex || undefined,
            rskAddress: isPrismPayout ? accountKeys.address : undefined,
          },
        },
        onCompleted(data) {
          if (data.payoutPaymentInitiate.txHash) {
            setLockTxId(data.payoutPaymentInitiate.txHash)
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
    if (activeOnChainPayment && activeOnChainPaymentDetails) {
      const paymentDetails = activeOnChainPaymentDetails
      const swapObj = JSON.parse(paymentDetails.swapMetadata)

      swapObj.privateKey = accountKeys.privateKey
      swapObj.preimageHash = paymentDetails.swapPreimageHash
      if (isClaimable) {
        swapObj.preimageHex = await decryptString({
          encryptedString: swapObj.preimageHexEncrypted || '',
          password: data.accountPassword || '',
        })
      }
      swapObj.paymentId = activeOnChainPayment.id
      setSwapData(swapObj)

      setLockTxId(paymentDetails.onChainTxId || '')
      setIsWaitingClaimReady(isClaimable)
      setIsWaitingConfirmation(true)
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

      const amount = payoutPrepareData?.payoutPrepare.payout.amount || 0

      const { data: payoutPaymentPrepareResponse } = await payoutPaymentPrepare({
        variables: {
          input: {
            payoutId: payoutPrepareData?.payoutPrepare.payout.id,
            payoutPaymentInput: {
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
        !payoutPaymentPrepareResponse?.payoutPaymentPrepare ||
        !payoutPaymentPrepareResponse.payoutPaymentPrepare.payment ||
        !payoutPaymentPrepareResponse.payoutPaymentPrepare.swap
      ) {
        throw new Error('Failed to create payment')
      }

      const { swap, payment } = payoutPaymentPrepareResponse.payoutPaymentPrepare

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

      const isPrismPayout = contractType === PayoutContractType.Prism
      const lockAmountSats = Number(swapObj?.lockupDetails?.amount ?? amount)
      const gasPriceWei = swapObj?.geyserGasPriceWei ? BigInt(swapObj.geyserGasPriceWei) : undefined
      const gasLimit = swapObj?.geyserGasLimit ? BigInt(swapObj.geyserGasLimit) : undefined
      const signature = isPrismPayout
        ? '0x'
        : createPayoutSignature({ lockCallData: callDataHex, accountKeys, amount }).signature
      const userLockTxHex = isPrismPayout
        ? await createAndSignLockTransaction({
            preimageHash: `0x${preimageHash}` as Hex,
            claimAddress: swapObj?.lockupDetails?.claimAddress as Address,
            refundAddress: accountKeys.address as Address,
            timelock: swapObj?.lockupDetails?.timeoutBlockHeight || 0n,
            amount: satsToWei(lockAmountSats),
            privateKey: `0x${accountKeys.privateKey}`,
            gasPrice: gasPriceWei,
            gasLimit,
          })
        : ''

      // Simulate processing delay
      await payoutPaymentInitiate({
        variables: {
          input: {
            payoutId: payoutPrepareData?.payoutPrepare.payout.id,
            paymentId: payment.id,
            signature,
            callDataHex,
            userLockTxHex: userLockTxHex || undefined,
            rskAddress: isPrismPayout ? accountKeys.address : undefined,
          },
        },
        onCompleted(data) {
          if (data.payoutPaymentInitiate.txHash) {
            setLockTxId(data.payoutPaymentInitiate.txHash)
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
  const isPrismPayout = contractType === PayoutContractType.Prism
  const keyDerivationOptions = isPrismPayout
    ? {
        deriveKeysFromSeed: (seedHex: string) => generateProjectKeysFromSeedHex(seedHex, project.id),
        storeKeyPair: false,
        requireBitcoinAddress: !shouldResumeOnChainPayout || shouldRequestBitcoinAddressOnResume,
      }
    : {
        requireBitcoinAddress: !shouldResumeOnChainPayout || shouldRequestBitcoinAddressOnResume,
      }

  const lightningForm = usePayoutWithLightningForm(handleLightningSubmit, undefined, keyDerivationOptions)
  const bitcoinForm = usePayoutWithBitcoinForm(handleBitcoinSubmit, undefined, keyDerivationOptions)

  const handleClose = () => {
    setIsProcessed(false)
    setIsSubmitting(false)
    setIsWaitingConfirmation(false)
    setIsWaitingClaimReady(false)
    setSwapData(null)
    setLockTxId('')
    setRefundTxId('')
    setPayoutInvoiceId('')
    setRefundAddress(null)
    onClose()
  }

  const handleCompleted = () => {
    onCompleted?.()
    handleClose()
  }

  const enableSubmit = selectedMethod === PayoutMethod.Lightning ? lightningForm.enableSubmit : bitcoinForm.enableSubmit
  const hasPayout = Boolean(payout?.id)

  const handleSubmit = () => {
    if (payoutPrepareError) {
      toast.error({
        title: t('Unable to load payout details'),
        description: payoutPrepareError,
      })
      return
    }

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

  const renderModalContent = (params: {
    notice?: ReactNode
    title?: ReactNode
    subtitle?: ReactNode
    description?: ReactNode
    content: ReactNode
    footer?: ReactNode
  }) => {
    const { notice, title, subtitle, description, content, footer } = params

    return (
    <Stack direction={{ base: 'column', lg: 'row' }} spacing={6} align="stretch" w="full">
      <PayoutProgressSidebar amount={totalAmount} steps={progressSteps} />
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

  // Show processed screen after successful submission
  if (shouldShowProcessedScreen) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={handleCompleted}
        size="4xl"
        contentProps={{ maxW: '980px' }}
      >
        {renderModalContent({
          title:
            processedMethod === PayoutMethod.Lightning
              ? t('Payout Processed (Off-Chain)')
              : t('Payout Processed (On-Chain)'),
          description: activeProgressDescription,
          content: processedMethod === PayoutMethod.Lightning ? (
            <LightningPayoutProcessed
              isRefund={true}
              invoiceId={
                isProcessed
                  ? payoutInvoiceId
                  : activeLightningInvoiceId
              }
              onClose={handleCompleted}
            />
          ) : (
            <BitcoinPayoutProcessed
              isRefund={true}
              onClose={handleCompleted}
              refundTxId={isProcessed ? refundTxId : undefined}
            />
          ),
        })}
      </Modal>
    )
  }

  if (isWaitingConfirmation) {
    return (
      <Modal
        isOpen={isOpen}
        size="4xl"
        onClose={() => {}}
        noClose={true}
        contentProps={{ maxW: '980px' }}
      >
        {renderModalContent({
          notice: (
            <Feedback variant={isWaitingClaimReady ? FeedBackVariant.SUCCESS : FeedBackVariant.WARNING} w="full">
              <Body>
                {isWaitingClaimReady
                  ? t('Your funds are ready to be claimed')
                  : t('This may take a few minutes. Please keep this window open to finish the process')}
              </Body>
            </Feedback>
          ),
          title: isWaitingClaimReady ? t('Claim payout') : t('Please wait for swap confirmation'),
          description: activeProgressDescription,
          content: (
            <BitcoinPayoutWaitingConfirmation
              swapData={swapData}
              lockTxId={lockTxId}
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

  const modalTitle = shouldResumeOnChainPayout
    ? shouldRequestBitcoinAddressOnResume
      ? t('Resume your payout')
      : t('Confirm your password to resume the payout')
    : t('Choose a payout method')
  const modalDescription = shouldResumeOnChainPayout ? undefined : activeProgressDescription
  const modalSubtitle = payoutUuid ? (
    <HStack spacing={6} align="center" justify="space-between" w="full">
      <HStack spacing={6} align="center" flexWrap="wrap">
        {payoutUuid && (
          <HStack spacing={2} align="center">
            <Body size="md" color="neutral1.12">
              <Body as="span" bold color="neutral1.12">
                {t('Payout ID')}:
              </Body>{' '}
              {payoutUuid}
            </Body>

            <IconButton
              aria-label={hasCopiedPayoutId ? t('Payout ID copied') : t('Copy payout ID')}
              size="xs"
              variant="ghost"
              colorScheme={hasCopiedPayoutId ? 'primary1' : 'neutral1'}
              icon={hasCopiedPayoutId ? <PiCheck /> : <PiCopy />}
              onClick={onCopyPayoutId}
            />
          </HStack>
        )}
      </HStack>
    </HStack>
  ) : undefined

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="4xl"
      bodyProps={{ gap: 4 }}
      contentProps={{ maxW: '980px' }}
    >
      {payoutPrepareLoading ? (
        renderModalContent({
          title: modalTitle,
          subtitle: modalSubtitle,
          description: modalDescription,
          content: <RefundRskSkeleton />,
        })
      ) : payoutPrepareError ? (
        renderModalContent({
          title: modalTitle,
          subtitle: modalSubtitle,
          description: modalDescription,
          content: <Feedback variant={FeedBackVariant.ERROR} text={payoutPrepareError} />,
        })
      ) : (
        renderModalContent({
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

              {shouldResumeOnChainPayout ? (
                <BitcoinPayoutForm
                  form={bitcoinForm.form}
                  satsAmount={totalAmount}
                  disableBitcoinAddress={!shouldRequestBitcoinAddressOnResume}
                  showBitcoinAddress={shouldRequestBitcoinAddressOnResume}
                />
              ) : (
                selectedMethod === PayoutMethod.Lightning ? (
                  <LightningPayoutForm form={lightningForm.form} satsAmount={totalAmount} />
                ) : (
                  <BitcoinPayoutForm
                    form={bitcoinForm.form}
                    satsAmount={totalAmount}
                    disableBitcoinAddress={false}
                    showBitcoinAddress={true}
                  />
                )
              )}
            </>
          ),
          footer: (
            <Button
              w="full"
              size="lg"
              colorScheme="primary1"
              variant="solid"
              isLoading={isSubmitting || isPayoutPaymentInitiateLoading || isPayoutPaymentPrepareLoading}
              isDisabled={!enableSubmit || payoutPrepareLoading || !hasPayout || Boolean(payoutPrepareError)}
              onClick={handleSubmit}
            >
              {shouldResumeOnChainPayout
                ? shouldRequestBitcoinAddressOnResume
                  ? t('Resume my payout')
                  : t('Confirm my password')
                : t('Confirm payout method')}
            </Button>
          ),
        })
      )}
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
