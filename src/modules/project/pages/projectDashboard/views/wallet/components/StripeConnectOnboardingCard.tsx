import { Button, HStack, Icon, Link, Tag, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect } from 'react'
import { PiClock, PiWarningFill } from 'react-icons/pi'

import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import {
  useCreateStripeConnectAccountMutation,
  useProjectStripeConnectStatusQuery,
  useRefreshStripeConnectOnboardingLinkMutation,
} from '@/types'

type StripeConnectOnboardingCardProps = {
  isTiaProject: boolean
  projectId?: string | number | bigint
  withCard?: boolean
  compact?: boolean
  selected?: boolean
  onReadyStateChange?: (isReady: boolean) => void
}

const openOnboardingUrl = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer')
}

type StripeDisabledReason = 'requirements.past_due' | 'requirements.pending_verification' | 'under_review'

type StripeStatusType = 'enabled' | 'action_required' | 'processing' | null
const STRIPE_DISABLED_REASONS = {
  pastDue: 'requirements.past_due',
  pendingVerification: 'requirements.pending_verification',
  underReview: 'under_review',
} as const

type StripeClickHandlerParams = {
  projectId?: string | number | bigint
  isTiaProject: boolean
  hasAccount: boolean
  isProcessing: boolean
  createStripeConnectAccount: ReturnType<typeof useCreateStripeConnectAccountMutation>[0]
  refreshStripeConnectOnboardingLink: ReturnType<typeof useRefreshStripeConnectOnboardingLinkMutation>[0]
  refetch: () => void
}

type StripeCompactContentProps = {
  statusType: StripeStatusType
  compactIntroCopy: string
  isTiaProject: boolean
  disabledReasonLabel: string | null
  isActionRequired: boolean
  isProcessing: boolean
  isReady: boolean
  isBusy: boolean
  onClick: () => void
  compactActionLabel: string
}

type StripeMainContentProps = {
  actionLabel: string
  isReady: boolean
  isTiaProject: boolean
  isBusy: boolean
  onClick: () => void
  status?: {
    chargesEnabled?: boolean | null
    payoutsEnabled?: boolean | null
    detailsSubmitted?: boolean | null
  } | null
  disabledReasonLabel: string | null
}

function getStripeStatusType(reason?: string | null, isReady?: boolean): StripeStatusType {
  if (isReady) return 'enabled'
  if (reason === STRIPE_DISABLED_REASONS.pastDue) return 'action_required'
  if (reason === STRIPE_DISABLED_REASONS.pendingVerification || reason === STRIPE_DISABLED_REASONS.underReview) {
    return 'processing'
  }

  return null
}

const getStripeDisabledReasonLabel = (reason?: string | null) => {
  if (!reason) return null

  const reasonMap: Record<StripeDisabledReason, string> = {
    [STRIPE_DISABLED_REASONS.pastDue]: t(
      'Stripe needs additional details to activate this account. Click "Resume\u00A0onboarding".',
    ),
    [STRIPE_DISABLED_REASONS.pendingVerification]: t(
      'Stripe verification is still in progress. Please check again shortly.',
    ),
    [STRIPE_DISABLED_REASONS.underReview]: t('Stripe is reviewing this account.'),
  }

  if (reason in reasonMap) {
    return reasonMap[reason as StripeDisabledReason]
  }

  return t('Stripe requires additional action to activate this account.')
}

function getCompactActionLabel(statusType: StripeStatusType, hasAccount: boolean): string {
  if (statusType === 'processing') return t('Re-sync')
  if (hasAccount) return t('Resume onboarding')
  return t('Configure Stripe Connect')
}

function getCardActionLabel(
  isTiaProject: boolean,
  isReady: boolean,
  statusType: StripeStatusType,
  hasAccount: boolean,
): string {
  if (!isTiaProject) return t('TIA only')
  if (isReady) return t('Connected')
  if (statusType === 'processing') return t('Re-sync')
  if (hasAccount) return t('Resume onboarding')
  return t('Connect Stripe')
}

function StripeStatusIndicator({ statusType }: { statusType: StripeStatusType }) {
  if (statusType === 'enabled') {
    return (
      <Body size="sm" medium color="primary1.9">
        {t('Enabled')}
      </Body>
    )
  }

  if (statusType === 'action_required') {
    return (
      <HStack spacing={1} color="orange.9">
        <Icon as={PiWarningFill} boxSize={4} />
        <Body size="sm" medium color="orange.9">
          {t('Action Required')}
        </Body>
      </HStack>
    )
  }

  if (statusType === 'processing') {
    return (
      <HStack spacing={1} color="orange.9">
        <Icon as={PiClock} boxSize={4} />
        <Body size="sm" medium color="orange.9">
          {t('Processing')}
        </Body>
      </HStack>
    )
  }

  return null
}

function createStripeClickHandler({
  projectId,
  isTiaProject,
  hasAccount,
  isProcessing,
  createStripeConnectAccount,
  refreshStripeConnectOnboardingLink,
  refetch,
}: StripeClickHandlerParams): () => void {
  return () => {
    if (!projectId || !isTiaProject) return

    if (!hasAccount) {
      createStripeConnectAccount({ variables: { projectId } })
      return
    }

    if (isProcessing) {
      refetch()
      return
    }

    refreshStripeConnectOnboardingLink({ variables: { projectId } })
  }
}

function StripeCompactContent({
  statusType,
  compactIntroCopy,
  isTiaProject,
  disabledReasonLabel,
  isActionRequired,
  isProcessing,
  isReady,
  isBusy,
  onClick,
  compactActionLabel,
}: StripeCompactContentProps) {
  const showInlineErrorWithAction = disabledReasonLabel && (isActionRequired || isProcessing) && !isReady

  return (
    <VStack w="full" alignItems="start" spacing={4}>
      <HStack w="full" justifyContent="space-between" alignItems="start">
        <Body size="lg" medium>
          {t('Receive in your bank account')}
        </Body>
        <StripeStatusIndicator statusType={statusType} />
      </HStack>

      <Body size="md" light>
        {compactIntroCopy}
      </Body>

      {isTiaProject && (
        <Body size="md" light>
          {t(
            'Contributions will be charged an additional processing fee of 3.5% + 30c per contribution. Payout time is dependent on card issuers.',
          )}
        </Body>
      )}

      {showInlineErrorWithAction ? (
        <HStack
          w="full"
          justifyContent="space-between"
          alignItems="center"
          spacing={4}
          flexWrap={{ base: 'wrap', md: 'nowrap' }}
        >
          <Body size="xs" color="secondary.red" medium flex={1} minW="220px">
            {disabledReasonLabel}
          </Body>
          <Button
            size="md"
            variant="outline"
            colorScheme="primary1"
            onClick={onClick}
            isDisabled={!isTiaProject || isBusy}
            isLoading={isBusy}
            width={{ base: '100%', md: 'auto' }}
            minW={{ base: 'unset', md: '240px' }}
          >
            {isProcessing ? t('Re-sync') : t('Resume onboarding')}
          </Button>
        </HStack>
      ) : (
        <>
          {disabledReasonLabel && (
            <Body size="xs" color="secondary.red" medium>
              {disabledReasonLabel}
            </Body>
          )}

          <HStack w="full" justifyContent={{ base: 'stretch', md: 'flex-end' }}>
            <Button
              size="md"
              variant={isReady ? 'solid' : 'outline'}
              colorScheme="primary1"
              onClick={onClick}
              isDisabled={!isTiaProject || isBusy}
              isLoading={isBusy}
              width={{ base: '100%', md: 'auto' }}
              minW={{ base: 'unset', md: '240px' }}
            >
              {isReady ? t('Manage Stripe Connect') : compactActionLabel}
            </Button>
          </HStack>
        </>
      )}
    </VStack>
  )
}

function StripeMainContent({
  actionLabel,
  isReady,
  isTiaProject,
  isBusy,
  onClick,
  status,
  disabledReasonLabel,
}: StripeMainContentProps) {
  return (
    <VStack w="full" alignItems="start" spacing={3}>
      <HStack w="full" justifyContent="space-between">
        <Body size="lg" medium>
          {t('Stripe Connect')}
        </Body>
        <Button
          size="md"
          variant={isReady ? 'solid' : 'outline'}
          colorScheme="primary1"
          onClick={onClick}
          isDisabled={!isTiaProject || isBusy}
          isLoading={isBusy}
        >
          {actionLabel}
        </Button>
      </HStack>

      <Body size="sm" light>
        {isTiaProject
          ? t(
              'Enable fiat card contributions for this project. Checkout is charged in USD; card issuers may convert to local currency.',
            )
          : t('Stripe Connect is available only for Take It All projects.')}
      </Body>

      {isTiaProject && (
        <HStack spacing={2} flexWrap="wrap">
          <Tag colorScheme={status?.chargesEnabled ? 'green' : 'gray'}>{t('Charges')}</Tag>
          <Tag colorScheme={status?.payoutsEnabled ? 'green' : 'gray'}>{t('Payouts')}</Tag>
          <Tag colorScheme={status?.detailsSubmitted ? 'green' : 'gray'}>{t('Details submitted')}</Tag>
        </HStack>
      )}

      {disabledReasonLabel && (
        <Body size="xs" color="secondary.red" medium>
          {disabledReasonLabel}
        </Body>
      )}

      <Body size="xs" light>
        <Link href="https://stripe.com/connect" isExternal textDecoration="underline">
          {t('Learn more about Stripe Connect')}
        </Link>
      </Body>
    </VStack>
  )
}

export const StripeConnectOnboardingCard = ({
  isTiaProject,
  projectId,
  withCard = true,
  compact = false,
  selected = false,
  onReadyStateChange,
}: StripeConnectOnboardingCardProps) => {
  const { data, loading, refetch } = useProjectStripeConnectStatusQuery({
    variables: { projectId },
    skip: !projectId || !isTiaProject,
    fetchPolicy: 'network-only',
  })

  const [createStripeConnectAccount, createStripeConnectAccountOptions] = useCreateStripeConnectAccountMutation({
    onCompleted(result) {
      const url = result?.createStripeConnectAccount?.onboardingUrl
      if (url) openOnboardingUrl(url)
      refetch()
    },
  })

  const [refreshStripeConnectOnboardingLink, refreshStripeConnectOnboardingLinkOptions] =
    useRefreshStripeConnectOnboardingLinkMutation({
      onCompleted(result) {
        const url = result?.refreshStripeConnectOnboardingLink?.onboardingUrl
        if (url) openOnboardingUrl(url)
        refetch()
      },
    })

  const status = data?.projectStripeConnectStatus
  const isReady = Boolean(status?.isReady)
  const hasAccount = Boolean(status?.accountId)
  const isSelected = selected || isReady
  const statusType = getStripeStatusType(status?.disabledReason, isReady)
  const disabledReasonLabel = getStripeDisabledReasonLabel(status?.disabledReason)
  const isActionRequired = statusType === 'action_required'
  const isProcessing = statusType === 'processing'
  const isBusy =
    loading || createStripeConnectAccountOptions.loading || refreshStripeConnectOnboardingLinkOptions.loading

  useEffect(() => {
    onReadyStateChange?.(isReady)
  }, [isReady, onReadyStateChange])

  const handleClick = createStripeClickHandler({
    projectId,
    isTiaProject,
    hasAccount,
    isProcessing,
    createStripeConnectAccount,
    refreshStripeConnectOnboardingLink,
    refetch,
  })

  const actionLabel = getCardActionLabel(isTiaProject, isReady, statusType, hasAccount)
  const compactActionLabel = getCompactActionLabel(statusType, hasAccount)
  const compactIntroCopy = isTiaProject
    ? t('Configure Stripe Connect to receive fiat payments directly in your bank account.')
    : t('Stripe Connect is only available for take-it-all projects.')

  const compactContent = (
    <StripeCompactContent
      statusType={statusType}
      compactIntroCopy={compactIntroCopy}
      isTiaProject={isTiaProject}
      disabledReasonLabel={disabledReasonLabel}
      isActionRequired={isActionRequired}
      isProcessing={isProcessing}
      isReady={isReady}
      isBusy={isBusy}
      onClick={handleClick}
      compactActionLabel={compactActionLabel}
    />
  )

  const content = (
    <StripeMainContent
      actionLabel={actionLabel}
      isReady={isReady}
      isTiaProject={isTiaProject}
      isBusy={isBusy}
      onClick={handleClick}
      status={status}
      disabledReasonLabel={disabledReasonLabel}
    />
  )

  if (compact) {
    if (!withCard) return compactContent
    return (
      <VStack
        w="full"
        borderWidth="1px"
        borderColor={isSelected ? 'primary1.8' : 'neutral1.4'}
        borderRadius="16px"
        p={6}
        alignItems="start"
        spacing={0}
      >
        {compactContent}
      </VStack>
    )
  }

  if (!withCard) {
    return content
  }

  return <CardLayout padding={4}>{content}</CardLayout>
}
