import { useLazyQuery, useMutation } from '@apollo/client'
import { Button, HStack, IconButton, Link as ChakraLink, Stack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { Trans } from 'react-i18next'
import { PiCheck, PiCopy, PiInfoBold } from 'react-icons/pi'
import { Address, Hex } from 'viem'

import {
  MUTATION_USER_WALLET_WITHDRAW_PAYMENT_INITIATE,
  MUTATION_USER_WALLET_WITHDRAW_PAYMENT_PREPARE,
  MUTATION_USER_WALLET_WITHDRAW_PREPARE,
  QUERY_USER_WALLET_WITHDRAW_ACTIVE,
  QUERY_USER_WALLET_WITHDRAW_LATEST,
} from '@/modules/profile/graphql/userWalletWithdraw.ts'
import { AccountKeys, generatePreImageHash } from '@/modules/project/forms/accountPassword/keyGenerationHelper.ts'
import { satsToWei } from '@/modules/project/funding/hooks/useFundingAPI.ts'
import { createCallDataForLockCall } from '@/modules/project/pages/projectFunding/utils/createCallDataForLockCall.ts'
import { createAndSignLockTransaction } from '@/modules/project/pages/projectFunding/utils/createLockTransaction.ts'
import { BitcoinPayoutForm } from '@/modules/project/pages/projectFunding/views/refundPayoutRsk/components/BitcoinPayoutForm.tsx'
import { BitcoinPayoutProcessed } from '@/modules/project/pages/projectFunding/views/refundPayoutRsk/components/BitcoinPayoutProcessed.tsx'
import { BitcoinPayoutWaitingConfirmation } from '@/modules/project/pages/projectFunding/views/refundPayoutRsk/components/BitcoinPayoutWaitingConfirmation.tsx'
import { LightningPayoutForm } from '@/modules/project/pages/projectFunding/views/refundPayoutRsk/components/LightningPayoutForm.tsx'
import { LightningPayoutProcessed } from '@/modules/project/pages/projectFunding/views/refundPayoutRsk/components/LightningPayoutProcessed.tsx'
import { PayoutMethodSelection } from '@/modules/project/pages/projectFunding/views/refundPayoutRsk/components/PayoutMethodSelection.tsx'
import {
  PayoutProgressSidebar,
  PayoutProgressStep,
} from '@/modules/project/pages/projectFunding/views/refundPayoutRsk/components/PayoutProgressSidebar.tsx'
import {
  DEFAULT_LIGHTNING_PAYOUT_MAX_SATS,
  MAX_SATS_FOR_LIGHTNING,
} from '@/modules/project/pages/projectFunding/views/refundPayoutRsk/constant.ts'
import {
  BitcoinPayoutFormData,
  usePayoutWithBitcoinForm,
} from '@/modules/project/pages/projectFunding/views/refundPayoutRsk/hooks/usePayoutWithBitcoinForm.ts'
import {
  LightningPayoutFormData,
  usePayoutWithLightningForm,
} from '@/modules/project/pages/projectFunding/views/refundPayoutRsk/hooks/usePayoutWithLightningForm.ts'
import { PayoutRskSkeleton } from '@/modules/project/pages/projectFunding/views/refundPayoutRsk/PayoutRsk.tsx'
import { PayoutFlowSwapData, PayoutMethod } from '@/modules/project/pages/projectFunding/views/refundPayoutRsk/types.ts'
import { decryptString, encryptString } from '@/modules/project/forms/accountPassword/encryptDecrptString.ts'
import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import { getMempoolSpaceUrl } from '@/shared/utils/external/mempool.ts'
import { useCopyToClipboard } from '@/shared/utils/hooks/useCopyButton.ts'
import {
  PaymentForPayoutRefundFragment,
  PaymentStatus,
  PaymentType,
  PayoutContractType,
  RskToLightningSwapPaymentDetailsFragment,
  RskToOnChainSwapPaymentDetailsFragment,
} from '@/types/index.ts'
import { useNotification } from '@/utils/index.ts'

type UserWalletWithdrawStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'EXPIRED' | 'CANCELLED'

type UserWalletWithdraw = {
  id: string | number
  uuid: string
  amount: number
  status: UserWalletWithdrawStatus
  expiresAt: number | string
  payments?: PaymentForPayoutRefundFragment[]
}

type UserWalletWithdrawMetadata = {
  nonce: number
  swapContractAddress: string
  contractType: PayoutContractType
  requiresUserLockTx: boolean
}

type UserWalletWithdrawResponse = {
  userWalletWithdraw: UserWalletWithdraw
  userWalletWithdrawMetadata: UserWalletWithdrawMetadata
}

type UserWalletWithdrawRskProps = {
  isOpen: boolean
  onClose: () => void
  rskAddress?: string
  onCompleted?: () => void
}

type UserWalletWithdrawStage = 'setup' | 'waiting_confirmation' | 'claim_ready' | 'completed'

const ACTIVE_USER_WALLET_WITHDRAW_STATUSES: UserWalletWithdrawStatus[] = ['PENDING', 'PROCESSING']

export const UserWalletWithdrawRsk: React.FC<UserWalletWithdrawRskProps> = ({
  isOpen,
  onClose,
  rskAddress,
  onCompleted,
}) => {
  const toast = useNotification()
  const [selectedMethod, setSelectedMethod] = useState<PayoutMethod>(PayoutMethod.OnChain)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isProcessed, setIsProcessed] = useState(false)
  const [isWaitingConfirmation, setIsWaitingConfirmation] = useState(false)
  const [isWaitingClaimReady, setIsWaitingClaimReady] = useState(false)
  const [refundAddress, setRefundAddress] = useState<string | null>(null)
  const [lockTxId, setLockTxId] = useState('')
  const [refundTxId, setRefundTxId] = useState('')
  const [withdrawInvoiceId, setWithdrawInvoiceId] = useState('')
  const [swapData, setSwapData] = useState<PayoutFlowSwapData | null>(null)
  const [prepareError, setPrepareError] = useState<string | null>(null)
  const [hasFailedPreviousWithdraw, setHasFailedPreviousWithdraw] = useState(false)
  const [activeWithdrawResponse, setActiveWithdrawResponse] = useState<UserWalletWithdrawResponse | null>(null)
  const hasPreparedRef = useRef(false)
  const hasDefaultedMethodRef = useRef(false)

  const [prepareWithdraw, { data: prepareData, loading: prepareLoading }] = useMutation<{
    userWalletWithdrawPrepare: UserWalletWithdrawResponse
  }>(MUTATION_USER_WALLET_WITHDRAW_PREPARE)
  const [loadLatestWithdraw] = useLazyQuery<{ userWalletWithdrawLatest?: UserWalletWithdrawResponse }>(
    QUERY_USER_WALLET_WITHDRAW_LATEST,
  )
  const [loadActiveWithdraw] = useLazyQuery<{ userWalletWithdrawActive?: UserWalletWithdrawResponse }>(
    QUERY_USER_WALLET_WITHDRAW_ACTIVE,
  )
  const [preparePayment, { loading: isPreparePaymentLoading }] = useMutation<{
    userWalletWithdrawPaymentPrepare: {
      userWalletWithdraw: UserWalletWithdraw
      swap?: string | null
      payment: PaymentForPayoutRefundFragment
    }
  }>(MUTATION_USER_WALLET_WITHDRAW_PAYMENT_PREPARE)
  const [initiatePayment, { loading: isInitiatePaymentLoading }] = useMutation<{
    userWalletWithdrawPaymentInitiate: { userWalletWithdraw: UserWalletWithdraw; txHash?: string | null }
  }>(MUTATION_USER_WALLET_WITHDRAW_PAYMENT_INITIATE)

  const withdrawResponse = activeWithdrawResponse || prepareData?.userWalletWithdrawPrepare
  const userWalletWithdraw = withdrawResponse?.userWalletWithdraw
  const isProcessing = userWalletWithdraw?.status === 'PROCESSING'
  const latestPayment = isProcessing
    ? [...(userWalletWithdraw?.payments ?? [])].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )[0]
    : null
  const activeLightningPayment = latestPayment?.paymentType === PaymentType.RskToLightningSwap ? latestPayment : null
  const activeOnChainPayment = latestPayment?.paymentType === PaymentType.RskToOnChainSwap ? latestPayment : null
  const activeLightningDetails = activeLightningPayment?.paymentDetails as
    | RskToLightningSwapPaymentDetailsFragment
    | undefined
  const activeOnChainDetails = activeOnChainPayment?.paymentDetails as
    | RskToOnChainSwapPaymentDetailsFragment
    | undefined
  const persistedOnChainAddress = activeOnChainDetails?.onChainAddress || ''
  const isClaimable = activeOnChainPayment?.status === PaymentStatus.Claimable
  const isClaiming = activeOnChainPayment?.status === PaymentStatus.Claiming
  const isRefundableRecovery =
    isProcessing &&
    (latestPayment?.status === PaymentStatus.Refundable || latestPayment?.status === PaymentStatus.Refunding)
  const shouldResumeOnChainWithdraw = Boolean(
    activeOnChainPayment && [PaymentStatus.Pending, PaymentStatus.Claimable].includes(activeOnChainPayment.status),
  )
  const shouldRequestBitcoinAddressOnResume = shouldResumeOnChainWithdraw && !persistedOnChainAddress
  const shouldShowProcessedScreen = isProcessed || Boolean(activeLightningPayment) || isClaiming
  const processedMethod = isProcessed
    ? selectedMethod
    : activeLightningPayment
    ? PayoutMethod.Lightning
    : PayoutMethod.OnChain
  const shouldShowFailedRetryState =
    hasFailedPreviousWithdraw && !isRefundableRecovery && !shouldShowProcessedScreen && !isWaitingConfirmation
  const totalAmount = userWalletWithdraw?.amount ?? 0
  const withdrawUuid = userWalletWithdraw?.uuid
  const { hasCopied: hasCopiedWithdrawId, onCopy: onCopyWithdrawId } = useCopyToClipboard(withdrawUuid || '')
  const progressMethod = shouldShowProcessedScreen ? processedMethod : selectedMethod
  const progressStage = getProgressStage({
    shouldShowProcessedScreen,
    isWaitingConfirmation,
    isWaitingClaimReady,
    shouldResumeOnChainWithdraw,
    isClaimable,
    shouldShowFailedRetryState,
  })
  const progressSteps = getUserWalletWithdrawProgressSteps({ method: progressMethod, stage: progressStage })
  const activeProgressStep =
    progressSteps.find((step) => step.status === 'current') ??
    [...progressSteps].reverse().find((step) => step.status === 'complete')
  const activeProgressDescription = activeProgressStep?.description
  const shouldShowMethodSelectionStep = !latestPayment && !shouldResumeOnChainWithdraw
  const modalTitle = getUserWalletWithdrawModalTitle({
    shouldResumeOnChainWithdraw,
    shouldRequestBitcoinAddressOnResume,
    shouldShowFailedRetryState,
  })
  const submitButtonLabel = getUserWalletWithdrawSubmitButtonLabel({
    shouldResumeOnChainWithdraw,
    shouldRequestBitcoinAddressOnResume,
    shouldShowFailedRetryState,
  })

  const lightningForm = usePayoutWithLightningForm(handleLightningSubmit, undefined, undefined, totalAmount)
  const bitcoinForm = usePayoutWithBitcoinForm(handleBitcoinSubmit, undefined, {
    requireBitcoinAddress: !shouldResumeOnChainWithdraw || shouldRequestBitcoinAddressOnResume,
  })

  useEffect(() => {
    if (!isOpen) {
      hasPreparedRef.current = false
      hasDefaultedMethodRef.current = false
      setHasFailedPreviousWithdraw(false)
      setActiveWithdrawResponse(null)
      return
    }

    if (hasPreparedRef.current) return

    hasPreparedRef.current = true
    setPrepareError(null)

    const prepare = async () => {
      try {
        const latestResult = await loadLatestWithdraw({ fetchPolicy: 'network-only' })

        if (latestResult.error) throw latestResult.error

        const latestWithdraw = latestResult.data?.userWalletWithdrawLatest?.userWalletWithdraw
        const latestWithdrawPayment = [...(latestWithdraw?.payments ?? [])].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )[0]

        setHasFailedPreviousWithdraw(
          Boolean(latestWithdraw?.status === 'FAILED' && latestWithdrawPayment?.status === PaymentStatus.Refunded),
        )

        if (latestWithdraw?.status && ACTIVE_USER_WALLET_WITHDRAW_STATUSES.includes(latestWithdraw.status)) {
          const activeResult = await loadActiveWithdraw({ fetchPolicy: 'network-only' })
          if (activeResult.error) throw activeResult.error
          if (activeResult.data?.userWalletWithdrawActive) {
            setActiveWithdrawResponse(activeResult.data.userWalletWithdrawActive)
            return
          }
        }

        setActiveWithdrawResponse(null)
        await prepareWithdraw()
      } catch (error: any) {
        hasPreparedRef.current = false
        setPrepareError(
          error?.graphQLErrors?.[0]?.message || error?.message || t('Please wait a moment and try again.'),
        )
      }
    }

    prepare().catch(() => undefined)
  }, [isOpen, loadActiveWithdraw, loadLatestWithdraw, prepareWithdraw])

  useEffect(() => {
    if (!isOpen || latestPayment || shouldResumeOnChainWithdraw || hasDefaultedMethodRef.current || !totalAmount) return

    setSelectedMethod(totalAmount < DEFAULT_LIGHTNING_PAYOUT_MAX_SATS ? PayoutMethod.Lightning : PayoutMethod.OnChain)
    hasDefaultedMethodRef.current = true
  }, [isOpen, latestPayment, shouldResumeOnChainWithdraw, totalAmount])

  useEffect(() => {
    if (!isOpen) return

    if (activeLightningPayment) {
      setSelectedMethod(PayoutMethod.Lightning)
      setWithdrawInvoiceId(activeLightningDetails?.lightningInvoiceId || '')
      return
    }

    if (activeOnChainDetails) {
      setSelectedMethod(PayoutMethod.OnChain)
      bitcoinForm.form.reset({ bitcoinAddress: persistedOnChainAddress, accountPassword: '' })
    }
  }, [
    isOpen,
    activeLightningPayment,
    activeLightningPayment?.id,
    activeLightningDetails?.lightningInvoiceId,
    activeOnChainDetails,
    activeOnChainPayment?.id,
    persistedOnChainAddress,
    bitcoinForm.form,
  ])

  async function handleLightningSubmit(data: LightningPayoutFormData, accountKeys: AccountKeys) {
    setIsSubmitting(true)
    try {
      const amount = userWalletWithdraw?.amount || 0
      const userWalletWithdrawId = userWalletWithdraw?.id
      const { data: prepareResponse } = await preparePayment({
        variables: {
          input: {
            userWalletWithdrawId,
            userWalletWithdrawPaymentInput: {
              rskToLightningSwap: {
                lightningAddress: data.lightningAddress,
                boltz: { refundPublicKey: accountKeys.publicKey },
              },
            },
          },
        },
      })

      const response = prepareResponse?.userWalletWithdrawPaymentPrepare
      if (!response?.payment || !response.swap) throw new Error('Failed to create payment')

      const paymentDetails = response.payment.paymentDetails as RskToLightningSwapPaymentDetailsFragment
      const swapObj = JSON.parse(response.swap)
      swapObj.privateKey = accountKeys.privateKey
      swapObj.preimageHash = paymentDetails.swapPreimageHash
      swapObj.paymentId = response.payment.id
      setSwapData(swapObj)
      setWithdrawInvoiceId(paymentDetails.lightningInvoiceId)

      const callDataHex = createCallDataForLockCall({
        preimageHash: `0x${paymentDetails.swapPreimageHash}` as Hex,
        claimAddress: swapObj?.claimAddress as Address,
        refundAddress: accountKeys.address as Address,
        timelock: swapObj?.timeoutBlockHeight || 0n,
      })

      const userLockTxHex = await createAndSignLockTransaction({
        preimageHash: `0x${paymentDetails.swapPreimageHash}`,
        claimAddress: swapObj?.claimAddress as Address,
        refundAddress: accountKeys.address as Address,
        timelock: swapObj?.timeoutBlockHeight || 0n,
        amount: satsToWei(Number(swapObj?.expectedAmount ?? amount)),
        privateKey: `0x${accountKeys.privateKey}`,
        gasPrice: swapObj?.geyserGasPriceWei ? BigInt(swapObj.geyserGasPriceWei) : undefined,
        gasLimit: swapObj?.geyserGasLimit ? BigInt(swapObj.geyserGasLimit) : undefined,
      })

      await initiatePayment({
        variables: {
          input: {
            userWalletWithdrawId,
            paymentId: response.payment.id,
            signature: '0x',
            callDataHex,
            userLockTxHex,
            rskAddress: rskAddress || accountKeys.address,
          },
        },
        onCompleted(result) {
          if (result.userWalletWithdrawPaymentInitiate.txHash) {
            setLockTxId(result.userWalletWithdrawPaymentInitiate.txHash)
          }
        },
      })

      setIsProcessed(true)
      toast.success({
        title: t('Withdrawal initiated successfully'),
        description: t('Your Lightning withdrawal will be processed shortly'),
      })
    } catch (error) {
      console.error('Lightning wallet withdrawal error:', error)
      toast.error({ title: t('Something went wrong'), description: t('Please try again') })
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleBitcoinSubmit(data: BitcoinPayoutFormData, accountKeys: AccountKeys) {
    if (activeOnChainPayment && activeOnChainDetails) {
      const swapObj = JSON.parse(activeOnChainDetails.swapMetadata)
      swapObj.id = swapObj.id || activeOnChainDetails.swapId
      swapObj.privateKey = accountKeys.privateKey
      swapObj.preimageHash = activeOnChainDetails.swapPreimageHash
      if (isClaimable) {
        swapObj.preimageHex = await decryptString({
          encryptedString: swapObj.preimageHexEncrypted || '',
          password: data.accountPassword || '',
        })
      }
      swapObj.paymentId = activeOnChainPayment.id
      setSwapData(swapObj)
      setLockTxId(activeOnChainDetails.onChainTxId || '')
      setIsWaitingClaimReady(isClaimable)
      setIsWaitingConfirmation(true)
      setRefundAddress(activeOnChainDetails.onChainAddress || data.bitcoinAddress || null)
      toast.info({
        title: t('Withdrawal initiated'),
        description: t('Your Bitcoin on-chain withdrawal will be processed shortly'),
      })
      return
    }

    setIsSubmitting(true)
    try {
      const { preimageHash, preimageHex } = generatePreImageHash()
      const preimageHexEncrypted = await encryptString({ plainText: preimageHex, password: data.accountPassword || '' })
      const amount = userWalletWithdraw?.amount || 0
      const userWalletWithdrawId = userWalletWithdraw?.id
      const { data: prepareResponse } = await preparePayment({
        variables: {
          input: {
            userWalletWithdrawId,
            userWalletWithdrawPaymentInput: {
              rskToOnChainSwap: {
                onChainAddress: data.bitcoinAddress || undefined,
                boltz: { claimPublicKey: accountKeys.publicKey, preimageHash, preimageHexEncrypted },
              },
            },
          },
        },
      })

      const response = prepareResponse?.userWalletWithdrawPaymentPrepare
      if (!response?.payment || !response.swap) throw new Error('Failed to create payment')

      const paymentDetails = response.payment.paymentDetails as RskToOnChainSwapPaymentDetailsFragment
      const swapObj = JSON.parse(response.swap)
      swapObj.id = swapObj.id || paymentDetails.swapId
      swapObj.privateKey = accountKeys.privateKey
      swapObj.preimageHash = preimageHash
      swapObj.preimageHex = preimageHex
      swapObj.paymentId = response.payment.id
      setSwapData(swapObj)

      const callDataHex = createCallDataForLockCall({
        preimageHash: `0x${preimageHash}` as Hex,
        claimAddress: swapObj?.lockupDetails?.claimAddress as Address,
        refundAddress: accountKeys.address as Address,
        timelock: swapObj?.lockupDetails?.timeoutBlockHeight || 0n,
      })

      const userLockTxHex = await createAndSignLockTransaction({
        preimageHash: `0x${preimageHash}` as Hex,
        claimAddress: swapObj?.lockupDetails?.claimAddress as Address,
        refundAddress: accountKeys.address as Address,
        timelock: swapObj?.lockupDetails?.timeoutBlockHeight || 0n,
        amount: satsToWei(Number(swapObj?.lockupDetails?.amount ?? amount)),
        privateKey: `0x${accountKeys.privateKey}`,
        gasPrice: swapObj?.geyserGasPriceWei ? BigInt(swapObj.geyserGasPriceWei) : undefined,
        gasLimit: swapObj?.geyserGasLimit ? BigInt(swapObj.geyserGasLimit) : undefined,
      })

      await initiatePayment({
        variables: {
          input: {
            userWalletWithdrawId,
            paymentId: response.payment.id,
            signature: '0x',
            callDataHex,
            userLockTxHex,
            rskAddress: rskAddress || accountKeys.address,
          },
        },
        onCompleted(result) {
          if (result.userWalletWithdrawPaymentInitiate.txHash) {
            setLockTxId(result.userWalletWithdrawPaymentInitiate.txHash)
          }
        },
      })

      setIsWaitingConfirmation(true)
      setIsWaitingClaimReady(false)
      setRefundAddress(data.bitcoinAddress || null)
      toast.info({
        title: t('Withdrawal initiated'),
        description: t('Your Bitcoin on-chain withdrawal will be processed shortly'),
      })
    } catch (error) {
      console.error('Bitcoin wallet withdrawal error:', error)
      toast.error({ title: t('Something went wrong'), description: t('Please try again') })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setIsProcessed(false)
    setIsSubmitting(false)
    setIsWaitingConfirmation(false)
    setIsWaitingClaimReady(false)
    setSwapData(null)
    setLockTxId('')
    setRefundTxId('')
    setWithdrawInvoiceId('')
    setRefundAddress(null)
    setHasFailedPreviousWithdraw(false)
    onClose()
  }

  const handleCompleted = () => {
    onCompleted?.()
    handleClose()
  }

  const handleSubmit = () => {
    if (prepareError || !userWalletWithdraw?.id) {
      toast.error({
        title: t('Unable to load withdrawal details'),
        description: prepareError || t('Please wait a moment and try again.'),
      })
      return
    }

    if (selectedMethod === PayoutMethod.Lightning) {
      lightningForm.handleSubmit()
    } else {
      bitcoinForm.handleSubmit()
    }
  }

  function renderModalContent(params: {
    notice?: ReactNode
    title?: ReactNode
    subtitle?: ReactNode
    description?: ReactNode
    content: ReactNode
    footer?: ReactNode
  }) {
    return (
      <Stack direction={{ base: 'column', lg: 'row' }} spacing={6} align="stretch" w="full">
        <PayoutProgressSidebar amount={totalAmount} steps={progressSteps} />
        <VStack flex={1} spacing={4} align="stretch" minH="100%">
          {(params.title || params.subtitle || params.description) && (
            <VStack spacing={2} align="stretch">
              {params.title && (
                <Body as="h2" size="2xl" bold color="neutral1.12">
                  {params.title}
                </Body>
              )}
              {params.subtitle && (
                <Body size="md" bold color="neutral1.12">
                  {params.subtitle}
                </Body>
              )}
              {params.description && (
                <Body size="md" color="neutral1.10">
                  {params.description}
                </Body>
              )}
            </VStack>
          )}
          {params.notice}
          <VStack flex={1} spacing={4} align="stretch">
            {params.content}
          </VStack>
          {params.footer}
        </VStack>
      </Stack>
    )
  }

  if (isRefundableRecovery) {
    return (
      <Modal isOpen={isOpen} size="lg" title={t('Funds are being recovered')} onClose={handleClose}>
        <VStack spacing={4} w="full" alignItems="center">
          <PiInfoBold fontSize="120px" color="var(--chakra-colors-info-9)" />
          <Body size="md" textAlign="center">
            {t(
              'Your previous withdrawal claim expired. The swap is being recovered in the background and the funds are on their way back to your Rootstock wallet.',
            )}
          </Body>
          <Body size="md" textAlign="center">
            {t('Once that refund completes, this withdrawal will reset and you can start again.')}
          </Body>
        </VStack>
      </Modal>
    )
  }

  if (shouldShowProcessedScreen) {
    return (
      <Modal isOpen={isOpen} onClose={handleCompleted} size="4xl" contentProps={{ maxW: '980px' }}>
        {renderModalContent({
          title:
            processedMethod === PayoutMethod.Lightning
              ? t('Withdrawal Processed (Off-Chain)')
              : t('Withdrawal Processed (On-Chain)'),
          description: processedMethod === PayoutMethod.OnChain ? undefined : activeProgressDescription,
          content:
            processedMethod === PayoutMethod.Lightning ? (
              <LightningPayoutProcessed
                hideAction
                invoiceId={isProcessed ? withdrawInvoiceId : activeLightningDetails?.lightningInvoiceId || ''}
                onClose={handleCompleted}
              />
            ) : (
              <BitcoinPayoutProcessed
                hideAction
                onClose={handleCompleted}
                refundTxId={isProcessed ? refundTxId : undefined}
              />
            ),
        })}
      </Modal>
    )
  }

  if (isWaitingConfirmation) {
    const waitingNotice = isWaitingClaimReady ? (
      t('Your funds are ready to be claimed')
    ) : (
      <Trans i18nKey="We are waiting for the Bitcoin lockup transaction to be confirmed before you can claim the funds. You can check its status on <1>mempool.space</1>.">
        {
          'We are waiting for the Bitcoin lockup transaction to be confirmed before you can claim the funds. You can check its status on '
        }
        <ChakraLink href={getMempoolSpaceUrl(lockTxId || '')} textDecoration="underline" isExternal>
          {'mempool.space'}
        </ChakraLink>
        {'.'}
      </Trans>
    )

    return (
      <Modal isOpen={isOpen} size="4xl" onClose={() => {}} noClose={true} contentProps={{ maxW: '980px' }}>
        {renderModalContent({
          notice: (
            <Feedback variant={isWaitingClaimReady ? FeedBackVariant.SUCCESS : FeedBackVariant.INFO} w="full">
              <Body>{waitingNotice}</Body>
            </Feedback>
          ),
          title: isWaitingClaimReady ? t('Claim withdrawal') : t('Please wait for swap confirmation'),
          description: activeProgressDescription,
          content: (
            <BitcoinPayoutWaitingConfirmation
              swapData={swapData}
              refundAddress={refundAddress || ''}
              setLockTxId={setLockTxId}
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

  const failedRetryNotice = shouldShowFailedRetryState ? (
    <Feedback variant={FeedBackVariant.ERROR} w="full">
      <Body>
        {t(
          'Your previous withdrawal attempt failed after the claim window expired. The funds have been returned to your Rootstock wallet, and you can try again now.',
        )}
      </Body>
    </Feedback>
  ) : undefined
  const modalSubtitle = withdrawUuid ? (
    <HStack spacing={6} align="center" justify="space-between" w="full">
      <HStack spacing={2} align="center">
        <Body size="md" color="neutral1.12">
          <Body as="span" bold color="neutral1.12">
            {t('Withdrawal ID')}:
          </Body>{' '}
          {withdrawUuid}
        </Body>
        <IconButton
          aria-label={hasCopiedWithdrawId ? t('Withdrawal ID copied') : t('Copy withdrawal ID')}
          size="xs"
          variant="ghost"
          colorScheme={hasCopiedWithdrawId ? 'primary1' : 'neutral1'}
          icon={hasCopiedWithdrawId ? <PiCheck /> : <PiCopy />}
          onClick={onCopyWithdrawId}
        />
      </HStack>
    </HStack>
  ) : undefined

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="4xl" bodyProps={{ gap: 4 }} contentProps={{ maxW: '980px' }}>
      {prepareLoading
        ? renderModalContent({
            title: modalTitle,
            subtitle: modalSubtitle,
            description: activeProgressDescription,
            content: <PayoutRskSkeleton />,
          })
        : prepareError
        ? renderModalContent({
            title: modalTitle,
            subtitle: modalSubtitle,
            description: activeProgressDescription,
            content: <Feedback variant={FeedBackVariant.ERROR} text={prepareError} />,
          })
        : renderModalContent({
            title: modalTitle,
            subtitle: modalSubtitle,
            description: shouldShowFailedRetryState
              ? t('Choose a withdrawal method below to start a new withdrawal.')
              : activeProgressDescription,
            notice: failedRetryNotice,
            content: (
              <>
                {shouldShowMethodSelectionStep && (
                  <PayoutMethodSelection
                    selectedMethod={selectedMethod}
                    setSelectedMethod={setSelectedMethod}
                    disableLightning={totalAmount > MAX_SATS_FOR_LIGHTNING || isClaimable}
                  />
                )}
                {shouldResumeOnChainWithdraw ? (
                  <BitcoinPayoutForm
                    form={bitcoinForm.form}
                    satsAmount={totalAmount}
                    disableBitcoinAddress={!shouldRequestBitcoinAddressOnResume}
                    showBitcoinAddress={shouldRequestBitcoinAddressOnResume}
                  />
                ) : selectedMethod === PayoutMethod.Lightning ? (
                  <LightningPayoutForm form={lightningForm.form} lightningAddress={lightningForm.lightningAddress} />
                ) : (
                  <BitcoinPayoutForm
                    form={bitcoinForm.form}
                    satsAmount={totalAmount}
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
                isLoading={isSubmitting || isPreparePaymentLoading || isInitiatePaymentLoading}
                isDisabled={
                  (selectedMethod === PayoutMethod.Lightning
                    ? !lightningForm.enableSubmit
                    : !bitcoinForm.enableSubmit) ||
                  prepareLoading ||
                  !userWalletWithdraw?.id ||
                  Boolean(prepareError)
                }
                onClick={handleSubmit}
              >
                {submitButtonLabel}
              </Button>
            ),
          })}
    </Modal>
  )
}

function getUserWalletWithdrawProgressSteps(params: {
  method: PayoutMethod
  stage: UserWalletWithdrawStage
}): PayoutProgressStep[] {
  const { method, stage } = params
  const chooseStep = {
    title: t('Choose withdrawal method'),
    description: t('Choose your withdrawal method and authorize the transfer.'),
  }

  if (method === PayoutMethod.Lightning) {
    return [
      { ...chooseStep, status: stage === 'setup' ? 'current' : 'complete' },
      {
        title: t('Process withdrawal'),
        description: t('We route the withdrawal to your Lightning destination.'),
        status: stage === 'completed' ? 'complete' : 'upcoming',
      },
      {
        title: t('Withdrawal sent'),
        description: t('Your withdrawal has been submitted successfully.'),
        status: stage === 'completed' ? 'complete' : 'upcoming',
      },
    ]
  }

  if (stage === 'completed') {
    return [
      { ...chooseStep, status: 'complete' },
      {
        title: t('Wait for confirmations'),
        description: t('Bitcoin network confirmations are required before claiming.'),
        status: 'complete',
      },
      {
        title: t('Claim withdrawal'),
        description: t('Broadcast your claim transaction to claim the funds.'),
        status: 'complete',
      },
      {
        title: t('Withdrawal sent'),
        description: t('Your on-chain withdrawal has been completed.'),
        status: 'complete',
      },
    ]
  }

  if (stage === 'claim_ready') {
    return [
      { ...chooseStep, status: 'complete' },
      {
        title: t('Wait for confirmations'),
        description: t('Bitcoin network confirmations are required before claiming.'),
        status: 'complete',
      },
      {
        title: t('Claim withdrawal'),
        description: t('Broadcast your claim transaction to claim the funds.'),
        status: 'current',
      },
      {
        title: t('Withdrawal sent'),
        description: t('Your on-chain withdrawal has been completed.'),
        status: 'upcoming',
      },
    ]
  }

  if (stage === 'waiting_confirmation') {
    return [
      { ...chooseStep, status: 'complete' },
      {
        title: t('Wait for confirmations'),
        description: t('Bitcoin network confirmations are required before claiming.'),
        status: 'current',
      },
      {
        title: t('Claim withdrawal'),
        description: t('Broadcast your claim transaction to claim the funds.'),
        status: 'upcoming',
      },
      {
        title: t('Withdrawal sent'),
        description: t('Your on-chain withdrawal has been completed.'),
        status: 'upcoming',
      },
    ]
  }

  return [
    { ...chooseStep, status: 'current' },
    {
      title: t('Wait for confirmations'),
      description: t('Bitcoin network confirmations are required before claiming.'),
      status: 'upcoming',
    },
    {
      title: t('Claim withdrawal'),
      description: t('Broadcast your claim transaction to claim the funds.'),
      status: 'upcoming',
    },
    { title: t('Withdrawal sent'), description: t('Your on-chain withdrawal has been completed.'), status: 'upcoming' },
  ]
}

function getProgressStage(params: {
  shouldShowProcessedScreen: boolean
  isWaitingConfirmation: boolean
  isWaitingClaimReady: boolean
  shouldResumeOnChainWithdraw: boolean
  isClaimable: boolean
  shouldShowFailedRetryState: boolean
}): UserWalletWithdrawStage {
  if (params.shouldShowProcessedScreen) return 'completed'
  if (params.shouldShowFailedRetryState) return 'setup'
  if (params.isWaitingConfirmation) return params.isWaitingClaimReady ? 'claim_ready' : 'waiting_confirmation'
  if (params.shouldResumeOnChainWithdraw) return params.isClaimable ? 'claim_ready' : 'waiting_confirmation'
  return 'setup'
}

function getUserWalletWithdrawModalTitle(params: {
  shouldResumeOnChainWithdraw: boolean
  shouldRequestBitcoinAddressOnResume: boolean
  shouldShowFailedRetryState: boolean
}) {
  if (params.shouldShowFailedRetryState) return t('Previous withdrawal attempt failed')
  if (!params.shouldResumeOnChainWithdraw) return t('Choose a withdrawal method')
  if (params.shouldRequestBitcoinAddressOnResume) return t('Resume your withdrawal')
  return t('Confirm your password to resume the withdrawal')
}

function getUserWalletWithdrawSubmitButtonLabel(params: {
  shouldResumeOnChainWithdraw: boolean
  shouldRequestBitcoinAddressOnResume: boolean
  shouldShowFailedRetryState: boolean
}) {
  if (params.shouldShowFailedRetryState) return t('Try again')
  if (!params.shouldResumeOnChainWithdraw) return t('Confirm withdrawal method')
  if (params.shouldRequestBitcoinAddressOnResume) return t('Resume my withdrawal')
  return t('Confirm my password')
}
