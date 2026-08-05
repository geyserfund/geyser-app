import { Box, Button, HStack, Icon, Image, Link as ChakraLink, Tooltip, VStack } from '@chakra-ui/react'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import React, { useEffect, useRef, useState } from 'react'
import { PiQuestion } from 'react-icons/pi'
import { useNavigate } from 'react-router'
import { getAddress } from 'viem'

import { authUserAtom } from '@/modules/auth/state/authAtom.ts'
import { userAccountKeysAtom } from '@/modules/auth/state/userAccountKeysAtom.ts'
import {
  AccountKeys,
  generateKeysFromSeedHex,
} from '@/modules/project/forms/accountPassword/keyGenerationHelper.ts'
import {
  AonClaimBroadcastMutation,
  AonClaimBroadcastMutationVariables,
  AonClaimPrepareMutation,
  AonClaimPrepareMutationVariables,
  MUTATION_AON_CLAIM_BROADCAST,
  MUTATION_AON_CLAIM_PREPARE,
} from '@/modules/project/graphql/mutation/aonClaimMutation.ts'
import { MUTATION_PAYOUT_CANCEL } from '@/modules/project/graphql/mutation/payoutMutation.ts'
import {
  AonClaimStatusQuery,
  AonClaimStatusQueryVariables,
  AonClaimUiStatus,
  QUERY_AON_CLAIM_STATUS,
} from '@/modules/project/graphql/query/aonClaimQuery.ts'
import { QUERY_PAYOUT_ACTIVE } from '@/modules/project/graphql/query/payoutQuery.ts'
import { createAndSignAonClaimTransaction } from '@/modules/project/pages/projectFunding/utils/createAndSignAonClaimTransaction.ts'
import { ControlledTextInput } from '@/shared/components/controlledInput/ControlledTextInput.tsx'
import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { SkeletonLayout } from '@/shared/components/layouts/SkeletonLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import { getRootstockBlockscoutUrl } from '@/shared/utils/external/mempool.ts'
import {
  PaymentStatus,
  PaymentType,
  PayoutStatus,
  ProjectAonGoalStatus,
  ProjectForProfileContributionsFragment,
} from '@/types/index.ts'
import { commaFormatted, useNotification } from '@/utils/index.ts'

import { RefundProcessedImageUrl } from '../constant.ts'
import { usePayoutWithRootstockForm } from '../hooks/usePayoutWithRootstockForm.ts'
import { RootstockPayoutFormData } from '../hooks/usePayoutWithRootstockForm.ts'
import { PayoutFlowLayout } from './PayoutFlowLayout.tsx'
import { FeeSection, PayoutSummaryPanel } from './PayoutSummaryPanel.tsx'
import { PayoutStepLayout } from './PayoutStepLayout.tsx'

type AonClaimToEoaProps = {
  isOpen: boolean
  onClose: () => void
  project: ProjectForProfileContributionsFragment
  onCompleted?: () => void
}

type ClaimPrepareState = AonClaimPrepareMutation['aonClaimPrepare'] | null
type ClaimPhase = 'idle' | 'preparing' | 'signing' | 'submitted' | 'confirmed' | 'failed'

const CLAIM_STATUS_POLL_MS = 10_000

const isAlreadyClaimedError = (message: string) => {
  const lower = message.toLowerCase()
  return (
    lower.includes('already claimed') ||
    lower.includes('alreadyclaimed') ||
    lower.includes('cannotclaimclaimed')
  )
}

const isGasError = (message: string) => {
  const lower = message.toLowerCase()
  return lower.includes('insufficient rbtc') || lower.includes('network fees') || lower.includes('gas')
}

const isActiveStandardPayoutBlockingClaim = (message: string) => {
  const lower = message.toLowerCase()
  return (
    lower.includes('cancel that unpaid attempt') ||
    lower.includes('payout payment is already in progress') ||
    lower.includes('ambiguous active payout')
  )
}

const STANDARD_BLOCKING_PAYMENT_TYPES = new Set<PaymentType>([
  PaymentType.RskNativeTransfer,
  PaymentType.RskToLightningSwap,
  PaymentType.RskToOnChainSwap,
])

type AonClaimToEoaContentProps = {
  isOpen: boolean
  onClose: () => void
  project: ProjectForProfileContributionsFragment
  onCompleted?: () => void
}

/** Remounts session state each time the modal opens so close/open never syncs props through effects. */
export const AonClaimToEoa: React.FC<AonClaimToEoaProps> = ({ isOpen, onClose, project, onCompleted }) => {
  const [sessionKey, setSessionKey] = useState(0)
  const [wasOpen, setWasOpen] = useState(isOpen)
  const [hasOpened, setHasOpened] = useState(isOpen)

  if (isOpen !== wasOpen) {
    setWasOpen(isOpen)
    if (isOpen) {
      setSessionKey((key) => key + 1)
      setHasOpened(true)
    }
  }

  if (!hasOpened) {
    return null
  }

  return (
    <AonClaimToEoaContent
      key={sessionKey}
      isOpen={isOpen}
      onClose={onClose}
      project={project}
      onCompleted={onCompleted}
    />
  )
}

const AonClaimToEoaContent: React.FC<AonClaimToEoaContentProps> = ({ isOpen, onClose, project, onCompleted }) => {
  const toast = useNotification()
  const navigate = useNavigate()
  const user = useAtomValue(authUserAtom)
  const userAccountKeys = useAtomValue(userAccountKeysAtom)

  const aonGoalStatus = project.aonGoal?.status
  const aonGoalClaimed = aonGoalStatus === ProjectAonGoalStatus.Claimed

  const [prepareState, setPrepareState] = useState<ClaimPrepareState>(null)
  const [prepareError, setPrepareError] = useState<string | null>(null)
  const [isAlreadyClaimed, setIsAlreadyClaimed] = useState(aonGoalClaimed)
  const [claimPhase, setClaimPhase] = useState<ClaimPhase>(aonGoalClaimed ? 'confirmed' : 'preparing')
  const [txHash, setTxHash] = useState('')
  const [failureReason, setFailureReason] = useState<string | null>(null)
  const [blockingPayoutId, setBlockingPayoutId] = useState<string | null>(null)
  const [isCancellingBlockingPayout, setIsCancellingBlockingPayout] = useState(false)
  const [prevAonGoalStatus, setPrevAonGoalStatus] = useState(aonGoalStatus)
  const [prepareAttempt, setPrepareAttempt] = useState(0)
  const hasPreparedRef = useRef(false)
  const hasNotifiedCompletedRef = useRef(false)

  if (aonGoalStatus !== prevAonGoalStatus) {
    setPrevAonGoalStatus(aonGoalStatus)
    if (aonGoalClaimed) {
      setIsAlreadyClaimed(true)
      setClaimPhase('confirmed')
    }
  }

  const [aonClaimPrepare, { loading: prepareLoading }] = useMutation<
    AonClaimPrepareMutation,
    AonClaimPrepareMutationVariables
  >(MUTATION_AON_CLAIM_PREPARE)

  const [aonClaimBroadcast] = useMutation<AonClaimBroadcastMutation, AonClaimBroadcastMutationVariables>(
    MUTATION_AON_CLAIM_BROADCAST,
  )

  const [payoutCancel] = useMutation(MUTATION_PAYOUT_CANCEL)
  const [loadActivePayout] = useLazyQuery(QUERY_PAYOUT_ACTIVE)

  const shouldPollClaimStatus = claimPhase === 'submitted'

  const { data: claimStatusData, startPolling, stopPolling } = useQuery<
    AonClaimStatusQuery,
    AonClaimStatusQueryVariables
  >(QUERY_AON_CLAIM_STATUS, {
    variables: { projectId: project.id },
    skip: !shouldPollClaimStatus,
    fetchPolicy: 'network-only',
  })

  const polledStatus = claimStatusData?.aonClaimStatus?.status as AonClaimUiStatus | undefined
  const polledTxHash = claimStatusData?.aonClaimStatus?.txHash
  const polledFailureReason = claimStatusData?.aonClaimStatus?.failureReason
  const [prevPolledStatus, setPrevPolledStatus] = useState(polledStatus)

  if (polledStatus !== prevPolledStatus) {
    setPrevPolledStatus(polledStatus)

    if (polledTxHash) {
      setTxHash(polledTxHash)
    }

    if (polledStatus === 'CONFIRMED') {
      setClaimPhase('confirmed')
      setIsAlreadyClaimed(true)
      setFailureReason(null)
    } else if (polledStatus === 'FAILED') {
      setClaimPhase('failed')
      setFailureReason(polledFailureReason || t('Claim transaction failed. Please try again.'))
    }
  }

  useEffect(() => {
    if (polledStatus !== 'CONFIRMED' || hasNotifiedCompletedRef.current) {
      return
    }

    hasNotifiedCompletedRef.current = true
    onCompleted?.()
  }, [onCompleted, polledStatus])

  useEffect(() => {
    if (!isOpen || aonGoalClaimed) {
      return
    }

    if (hasPreparedRef.current) {
      return
    }

    let cancelled = false
    hasPreparedRef.current = true

    const resolveBlockingPayoutId = async () => {
      try {
        const { data } = await loadActivePayout({
          variables: { projectId: project.id },
          fetchPolicy: 'network-only',
        })
        const payout = data?.payoutActive?.payout
        if (!payout?.id) {
          return null
        }
        if (payout.status !== PayoutStatus.Pending && payout.status !== PayoutStatus.Processing) {
          return null
        }
        const hasBlockingPayment = (payout.payments || []).some(
          (payment: { paymentType?: PaymentType; status?: PaymentStatus }) =>
            payment.paymentType != null &&
            STANDARD_BLOCKING_PAYMENT_TYPES.has(payment.paymentType) &&
            (payment.status === PaymentStatus.Unpaid || payment.status === PaymentStatus.Pending),
        )
        return hasBlockingPayment ? String(payout.id) : null
      } catch {
        return null
      }
    }

    aonClaimPrepare({ variables: { projectId: project.id } })
      .then(({ data }) => {
        if (cancelled) {
          return
        }

        const prepared = data?.aonClaimPrepare
        if (!prepared) {
          throw new Error(t('Unable to prepare AON claim. Please try again.'))
        }

        if (!prepared.simulationOk && prepared.claimableAmountSats <= 0) {
          setIsAlreadyClaimed(true)
          setClaimPhase('confirmed')
          return
        }

        setPrepareState(prepared)
        setClaimPhase('idle')
      })
      .catch(async (error: any) => {
        if (cancelled) {
          return
        }

        hasPreparedRef.current = false
        const message =
          error?.graphQLErrors?.[0]?.message || error?.message || t('Please wait a moment and try again.')

        if (isAlreadyClaimedError(message)) {
          setIsAlreadyClaimed(true)
          setClaimPhase('confirmed')
          return
        }

        let blockingPayoutIdFromLookup: string | null = null
        if (isActiveStandardPayoutBlockingClaim(message)) {
          blockingPayoutIdFromLookup = await resolveBlockingPayoutId()
        }

        if (cancelled) {
          return
        }

        if (blockingPayoutIdFromLookup) {
          setBlockingPayoutId(blockingPayoutIdFromLookup)
        }
        setPrepareError(message)
        setClaimPhase('idle')
      })

    return () => {
      cancelled = true
    }
  }, [aonClaimPrepare, aonGoalClaimed, isOpen, loadActivePayout, prepareAttempt, project.id])

  useEffect(() => {
    if (!shouldPollClaimStatus) {
      stopPolling()
      return
    }

    startPolling(CLAIM_STATUS_POLL_MS)
    return () => {
      stopPolling()
    }
  }, [shouldPollClaimStatus, startPolling, stopPolling])

  const goToWalletWithdraw = () => {
    onCompleted?.()
    onClose()

    if (!user?.id) {
      toast.error({
        title: t('Unable to open wallet settings'),
        description: t('Please open Profile → Wallet settings to withdraw.'),
      })
      return
    }

    navigate(`${getPath('userProfileSettingsWallet', String(user.id))}?action=withdraw`)
  }

  const handleClaimSubmit = async (_data: RootstockPayoutFormData, accountKeys: AccountKeys) => {
    if (!prepareState) {
      return
    }

    setClaimPhase('signing')
    try {
      const expectedCreator = getAddress(prepareState.creatorAddress)
      const derivedAddress = getAddress(accountKeys.address)

      if (expectedCreator.toLowerCase() !== derivedAddress.toLowerCase()) {
        throw new Error(
          t(
            'Your account password does not match the Rootstock wallet that owns this campaign. Recover your password or contact support.',
          ),
        )
      }

      const { signedTxHex } = await createAndSignAonClaimTransaction({
        contractAddress: getAddress(prepareState.contractAddress),
        privateKey: accountKeys.privateKey,
        claimCalldata: prepareState.claimCalldata,
        processingFeeSats: prepareState.processingFeeSats,
      })

      const { data: broadcastData } = await aonClaimBroadcast({
        variables: {
          projectId: project.id,
          signedTxHex,
        },
      })

      const hash = broadcastData?.aonClaimBroadcast?.txHash
      if (!hash) {
        throw new Error(t('Claim broadcast did not return a transaction hash.'))
      }

      setTxHash(hash)
      setFailureReason(null)
      setClaimPhase('submitted')
    } catch (error: any) {
      const message =
        error?.graphQLErrors?.[0]?.message || error?.message || t('Failed to claim funds. Please try again.')

      if (isAlreadyClaimedError(message)) {
        setIsAlreadyClaimed(true)
        setClaimPhase('confirmed')
        return
      }

      if (isActiveStandardPayoutBlockingClaim(message)) {
        try {
          const { data } = await loadActivePayout({
            variables: { projectId: project.id },
            fetchPolicy: 'network-only',
          })
          const payout = data?.payoutActive?.payout
          if (payout?.id) {
            setBlockingPayoutId(String(payout.id))
          }
        } catch {
          // ignore lookup failure; prepare error UI may still offer cancel later
        }
        setPrepareError(message)
        setClaimPhase('idle')
        return
      }

      setClaimPhase('failed')
      setFailureReason(
        isGasError(message)
          ? t(
              'Your Geyser Rootstock wallet needs a small amount of RBTC to pay network fees before you can claim. Add gas, then try again.',
            )
          : message,
      )
      toast.error({
        title: t('Claim failed'),
        description: isGasError(message)
          ? t(
              'Your Geyser Rootstock wallet needs a small amount of RBTC to pay network fees before you can claim. Add gas, then try again.',
            )
          : message,
      })
    }
  }

  const claimForm = usePayoutWithRootstockForm(handleClaimSubmit, undefined, {
    requireRootstockAddress: false,
    storeKeyPair: true,
    deriveKeysFromSeed: (seedHex: string) => {
      if (!userAccountKeys?.encryptedSeed && !seedHex) {
        throw new Error(t('Unable to find your account keys'))
      }

      return generateKeysFromSeedHex(seedHex)
    },
  })

  const handleClose = () => {
    claimForm.reset()
    stopPolling()
    onClose()
  }

  const handleRetry = () => {
    hasPreparedRef.current = false
    setFailureReason(null)
    setTxHash('')
    setPrepareState(null)
    setPrepareError(null)
    setBlockingPayoutId(null)
    setClaimPhase('preparing')
    setPrepareAttempt((attempt) => attempt + 1)
  }

  const handleAbandonBlockingPayout = async () => {
    if (!blockingPayoutId) {
      return
    }

    setIsCancellingBlockingPayout(true)
    try {
      const { data } = await payoutCancel({
        variables: {
          input: {
            payoutId: blockingPayoutId,
            reason: 'Abandoned unpaid standard payout to switch to direct AON claim',
          },
        },
      })

      if (!data?.payoutCancel?.success) {
        throw new Error(data?.payoutCancel?.message || t('Unable to cancel the unpaid payout attempt.'))
      }

      toast.success({
        title: t('Unpaid payout cancelled'),
        description: t('You can now claim funds directly to your Rootstock wallet.'),
      })
      handleRetry()
    } catch (error: any) {
      const message =
        error?.graphQLErrors?.[0]?.message || error?.message || t('Unable to cancel the unpaid payout attempt.')
      toast.error({
        title: t('Could not cancel payout'),
        description: message,
      })
    } finally {
      setIsCancellingBlockingPayout(false)
    }
  }

  const claimableAmount = prepareState?.claimableAmountSats ?? project.aonGoal?.balance ?? 0
  const feeSections: FeeSection[] = [
    {
      key: 'processing',
      label: t('Processing fee'),
      tooltip: t('No processing fee. You only pay Rootstock network gas from your wallet.'),
      summary: {
        totalAmount: prepareState?.processingFeeSats ?? 0,
        currency: 'BTCSAT',
        items: [],
      },
      deductsFromNet: false,
    },
  ]

  const isConfirmed = claimPhase === 'confirmed' || isAlreadyClaimed
  const isSubmitted = claimPhase === 'submitted'
  const isFailed = claimPhase === 'failed'
  const isSubmitting = claimPhase === 'signing'

  if (isConfirmed && !isSubmitted) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose} size="lg" title={t('Funds claimed')}>
        <VStack spacing={4} w="full" alignItems="stretch">
          <Feedback variant={FeedBackVariant.INFO} w="full">
            <Body>
              {t(
                'These campaign funds are confirmed in your Geyser Rootstock wallet. You can withdraw them to Lightning, Bitcoin, or another Rootstock address.',
              )}
            </Body>
          </Feedback>
          {txHash ? (
            <Body size="sm" color="neutral1.10">
              {t('Track the transaction')}{' '}
              <Body as="span" textDecoration="underline" color="primary1.9">
                <ChakraLink href={getRootstockBlockscoutUrl(txHash)} isExternal>
                  {t('here')}
                </ChakraLink>
              </Body>
              .
            </Body>
          ) : null}
          <Button w="full" size="lg" colorScheme="primary1" onClick={goToWalletWithdraw}>
            {t('Withdraw from my Rootstock wallet')}
          </Button>
          <Button w="full" size="lg" colorScheme="neutral1" variant="outline" onClick={handleClose}>
            {t('Close')}
          </Button>
        </VStack>
      </Modal>
    )
  }

  if (isFailed) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose} size="lg" title={t('Claim failed')}>
        <VStack spacing={4} w="full" alignItems="stretch">
          <Feedback variant={FeedBackVariant.ERROR} w="full">
            <Body>{failureReason || t('Claim transaction failed. Please try again.')}</Body>
          </Feedback>
          {txHash ? (
            <Body size="sm" color="neutral1.10">
              {t('Track the transaction')}{' '}
              <Body as="span" textDecoration="underline" color="primary1.9">
                <ChakraLink href={getRootstockBlockscoutUrl(txHash)} isExternal>
                  {t('here')}
                </ChakraLink>
              </Body>
              .
            </Body>
          ) : null}
          <Button w="full" size="lg" colorScheme="primary1" onClick={handleRetry}>
            {t('Try again')}
          </Button>
          <Button w="full" size="lg" colorScheme="neutral1" variant="outline" onClick={handleClose}>
            {t('Close')}
          </Button>
        </VStack>
      </Modal>
    )
  }

  if (isSubmitted) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose} size="4xl" noClose contentProps={{ maxW: '980px' }}>
        <PayoutFlowLayout
          title={t('Transaction submitted')}
          description={t(
            'Your claim is waiting for Rootstock confirmations. Funds are not available to withdraw until confirmation completes.',
          )}
          content={
            <PayoutStepLayout
              illustration={
                <Box w="300px" h="300px">
                  <Image
                    src={RefundProcessedImageUrl}
                    alt={t('Claim submitted')}
                    width="100%"
                    height="100%"
                    objectFit="cover"
                  />
                </Box>
              }
              content={
                <VStack w="full" spacing={4} alignItems="center">
                  <Body size="lg" medium textAlign="center">
                    {t('Claim submitted')}
                  </Body>
                  <Body size="md" textAlign="center" color="neutral1.12">
                    {t(
                      'Waiting for confirmations. This can take a few minutes. Keep this page open or come back later — we will not treat a long wait as a failure.',
                    )}
                  </Body>
                  {txHash ? (
                    <Body size="sm" textAlign="center" color="neutral1.10">
                      {t('Track the transaction')}{' '}
                      <Body as="span" textDecoration="underline" color="primary1.9">
                        <ChakraLink href={getRootstockBlockscoutUrl(txHash)} isExternal>
                          {t('here')}
                        </ChakraLink>
                      </Body>
                      .
                    </Body>
                  ) : null}
                </VStack>
              }
              action={
                <Button w="full" size="lg" colorScheme="neutral1" variant="outline" onClick={handleClose}>
                  {t('Close')}
                </Button>
              }
            />
          }
          summary={<PayoutSummaryPanel amount={claimableAmount} fees={feeSections} />}
        />
      </Modal>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="4xl" noClose contentProps={{ maxW: '980px' }}>
      <PayoutFlowLayout
        progressSteps={[
          {
            title: t('Claim to my Rootstock wallet'),
            description: t('Release escrowed funds to your Geyser wallet'),
            status: 'current',
          },
          {
            title: t('Withdraw'),
            description: t('Cash out from your Rootstock wallet'),
            status: 'upcoming',
          },
        ]}
        title={t('Claim to my Rootstock wallet')}
        description={t(
          'This releases your campaign funds from escrow into your Geyser Rootstock wallet. You will withdraw in a second step.',
        )}
        notice={
          <Feedback variant={FeedBackVariant.INFO} w="full">
            <Body size="sm">
              {t(
                'Your Rootstock wallet must hold a small amount of RBTC to pay network gas for this claim. The claim itself has no processing fee.',
              )}
            </Body>
          </Feedback>
        }
        content={
          prepareLoading || claimPhase === 'preparing' || (!prepareState && !prepareError) ? (
            <VStack w="full" spacing={3}>
              <SkeletonLayout height="48px" width="100%" />
              <SkeletonLayout height="48px" width="100%" />
              <SkeletonLayout height="80px" width="100%" />
            </VStack>
          ) : prepareError ? (
            <VStack w="full" spacing={4} alignItems="stretch">
              <Feedback variant={FeedBackVariant.ERROR} text={prepareError} />
              {blockingPayoutId ? (
                <>
                  <Body size="sm" color="neutral1.11">
                    {t(
                      'You have an unpaid payout attempt in progress. Cancel it to claim directly, or wait for it to finish.',
                    )}
                  </Body>
                  <Button
                    w="full"
                    size="lg"
                    colorScheme="primary1"
                    isLoading={isCancellingBlockingPayout}
                    onClick={handleAbandonBlockingPayout}
                  >
                    {t('Cancel unpaid payout and continue')}
                  </Button>
                </>
              ) : null}
            </VStack>
          ) : (
            <VStack w="full" spacing={6} alignItems="start">
              <Body size="sm" color="neutral1.11">
                {t('Claimable amount')}:{' '}
                <Body as="span" bold>
                  {commaFormatted(claimableAmount)} sats
                </Body>
              </Body>

              {prepareState?.creatorAddress ? (
                <Body size="sm" color="neutral1.10" wordBreak="break-all">
                  {t('Destination (your Geyser Rootstock wallet)')}: {prepareState.creatorAddress}
                </Body>
              ) : null}

              <VStack w="full" spacing={2} alignItems="start">
                <HStack spacing={2} alignItems="center">
                  <Body size="sm" color="neutral1.11">
                    {t('Account password')}
                  </Body>
                  <Tooltip label={t('This unlocks your personal Geyser Rootstock key to sign the claim.')} hasArrow>
                    <span>
                      <Icon as={PiQuestion} color="neutral1.9" boxSize={4} cursor="help" />
                    </span>
                  </Tooltip>
                </HStack>
                <ControlledTextInput
                  name="accountPassword"
                  control={claimForm.form.control}
                  type="password"
                  placeholder=""
                  size="md"
                />
              </VStack>
            </VStack>
          )
        }
        footer={
          <Button
            w="full"
            size="lg"
            colorScheme="primary1"
            isLoading={isSubmitting}
            isDisabled={!claimForm.enableSubmit || prepareLoading || !prepareState || Boolean(prepareError)}
            onClick={claimForm.handleSubmit}
          >
            {t('Claim to my Rootstock wallet')}
          </Button>
        }
        summary={<PayoutSummaryPanel amount={claimableAmount} fees={feeSections} />}
      />
    </Modal>
  )
}
