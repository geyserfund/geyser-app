import { Button, HStack, Icon, Link, Tag, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect } from 'react'
import { PiClock, PiWarningFill } from 'react-icons/pi'

import { useStripeConnectStatus, type StripeStatusType } from '@/modules/project/hooks/useStripeConnectStatus.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { useCreateStripeConnectAccountMutation, useRefreshStripeConnectOnboardingLinkMutation } from '@/types'

type StripeConnectOnboardingCardProps = {
  isTiaProject: boolean
  projectId?: string | number | bigint
  returnUrl?: string
  withCard?: boolean
  compact?: boolean
  minimal?: boolean
  minimalShowTitle?: boolean
  selected?: boolean
  onReadyStateChange?: (isReady: boolean) => void
}

const openOnboardingUrl = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer')
}

type StripeClickHandlerParams = {
  projectId?: string | number | bigint
  returnUrl?: string
  isTiaProject: boolean
  hasAccount: boolean
  createStripeConnectAccount: ReturnType<typeof useCreateStripeConnectAccountMutation>[0]
  refreshStripeConnectOnboardingLink: ReturnType<typeof useRefreshStripeConnectOnboardingLinkMutation>[0]
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
  onManageClick: () => void
  onResyncClick: () => void
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

type StripeMinimalContentProps = {
  statusType: StripeStatusType
  isBusy: boolean
  onClick: () => void
  statusMessage: string
  actionLabel: string
  showTitle?: boolean
}

function getMinimalActionLabel(statusType: StripeStatusType, hasAccount: boolean, isReady: boolean): string {
  if (isReady) return t('Manage Stripe Connect')
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

function createStripeManageClickHandler({
  projectId,
  returnUrl,
  isTiaProject,
  hasAccount,
  createStripeConnectAccount,
  refreshStripeConnectOnboardingLink,
}: StripeClickHandlerParams): () => void {
  return () => {
    if (!projectId || !isTiaProject) return

    if (!hasAccount) {
      createStripeConnectAccount({ variables: { projectId, returnUrl } })
      return
    }

    refreshStripeConnectOnboardingLink({ variables: { projectId, returnUrl } })
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
  onManageClick,
  onResyncClick,
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
          <HStack w={{ base: '100%', md: 'auto' }} spacing={3} flexWrap={{ base: 'wrap', md: 'nowrap' }}>
            <Button
              size="md"
              variant="outline"
              colorScheme="primary1"
              onClick={onManageClick}
              isDisabled={!isTiaProject || isBusy}
              isLoading={isBusy}
              width={{ base: '100%', md: 'auto' }}
              minW={{ base: 'unset', md: '240px' }}
            >
              {t('Manage Stripe Connect')}
            </Button>
            {isProcessing && (
              <Button
                size="md"
                variant="outline"
                colorScheme="primary1"
                onClick={onResyncClick}
                isDisabled={!isTiaProject || isBusy}
                isLoading={isBusy}
                width={{ base: '100%', md: 'auto' }}
              >
                {t('Re-sync')}
              </Button>
            )}
          </HStack>
        </HStack>
      ) : (
        <>
          {disabledReasonLabel && (
            <Body size="xs" color="secondary.red" medium>
              {disabledReasonLabel}
            </Body>
          )}

          <HStack w="full" justifyContent={{ base: 'stretch', md: 'flex-end' }} spacing={3} flexWrap="wrap">
            <Button
              size="md"
              variant={isReady ? 'solid' : 'outline'}
              colorScheme="primary1"
              onClick={onManageClick}
              isDisabled={!isTiaProject || isBusy}
              isLoading={isBusy}
              width={{ base: '100%', md: 'auto' }}
              minW={{ base: 'unset', md: '240px' }}
            >
              {t('Manage Stripe Connect')}
            </Button>
            {isProcessing && (
              <Button
                size="md"
                variant="outline"
                colorScheme="primary1"
                onClick={onResyncClick}
                isDisabled={!isTiaProject || isBusy}
                isLoading={isBusy}
                width={{ base: '100%', md: 'auto' }}
              >
                {t('Re-sync')}
              </Button>
            )}
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

function getMinimalStatusMessage(statusType: StripeStatusType, disabledReasonLabel: string | null) {
  if (disabledReasonLabel) {
    return disabledReasonLabel
  }

  if (statusType === 'enabled') {
    return t('Stripe Connect is enabled for this project.')
  }

  return ''
}

function StripeMinimalContent({
  statusType,
  isBusy,
  onClick,
  statusMessage,
  actionLabel,
  showTitle = true,
}: StripeMinimalContentProps) {
  return (
    <VStack w="full" alignItems="start" spacing={4}>
      {showTitle ? (
        <HStack w="full" justifyContent="space-between" alignItems="start">
          <Body size="lg" medium>
            {t('Stripe Connect')}
          </Body>
          <StripeStatusIndicator statusType={statusType} />
        </HStack>
      ) : (
        <HStack w="full" justifyContent="flex-end" alignItems="center" spacing={4}>
          <StripeStatusIndicator statusType={statusType} />
        </HStack>
      )}

      <Body size="md" light w="full">
        {statusMessage}
      </Body>

      <HStack w="full" justifyContent={{ base: 'stretch', md: 'flex-end' }}>
        <Button
          size="md"
          variant="outline"
          colorScheme="primary1"
          onClick={onClick}
          isLoading={isBusy}
          width={{ base: '100%', md: 'auto' }}
          minW={{ base: 'unset', md: '240px' }}
        >
          {actionLabel}
        </Button>
      </HStack>
    </VStack>
  )
}

/** Shared Stripe onboarding state for dashboard and project-creation payment setup surfaces. */
export const useStripeConnectOnboardingState = ({
  isTiaProject,
  projectId,
  returnUrl,
  onReadyStateChange,
}: Pick<StripeConnectOnboardingCardProps, 'isTiaProject' | 'projectId' | 'returnUrl' | 'onReadyStateChange'>) => {
  const {
    status,
    isReady,
    hasAccount,
    statusType,
    disabledReasonLabel,
    isActionRequired,
    isProcessing,
    loading: isStatusLoading,
    refetch,
  } = useStripeConnectStatus({
    projectId,
    isTiaProject,
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

  const isBusy =
    isStatusLoading || createStripeConnectAccountOptions.loading || refreshStripeConnectOnboardingLinkOptions.loading

  useEffect(() => {
    onReadyStateChange?.(isReady)
  }, [isReady, onReadyStateChange])

  const handleManageClick = createStripeManageClickHandler({
    projectId,
    returnUrl,
    isTiaProject,
    hasAccount,
    createStripeConnectAccount,
    refreshStripeConnectOnboardingLink,
  })

  return {
    status,
    isReady,
    hasAccount,
    statusType,
    disabledReasonLabel,
    isActionRequired,
    isProcessing,
    isBusy,
    handleClick: handleManageClick,
    handleManageClick,
    handleResyncClick: refetch,
    actionLabel: getCardActionLabel(isTiaProject, isReady, statusType, hasAccount),
    minimalActionLabel: getMinimalActionLabel(statusType, hasAccount, isReady),
    compactIntroCopy: isTiaProject
      ? t('Configure Stripe Connect to receive fiat payments directly in your bank account.')
      : t('Stripe Connect is only available for take-it-all projects.'),
    minimalStatusMessage: getMinimalStatusMessage(statusType, disabledReasonLabel),
  }
}

export const StripeConnectOnboardingCard = ({
  isTiaProject,
  projectId,
  returnUrl,
  withCard = true,
  compact = false,
  minimal = false,
  minimalShowTitle = true,
  selected = false,
  onReadyStateChange,
}: StripeConnectOnboardingCardProps) => {
  const {
    status,
    isReady,
    statusType,
    disabledReasonLabel,
    isActionRequired,
    isProcessing,
    isBusy,
    handleManageClick,
    handleResyncClick,
    actionLabel,
    compactIntroCopy,
    minimalStatusMessage,
  } = useStripeConnectOnboardingState({
    isTiaProject,
    projectId,
    returnUrl,
    onReadyStateChange,
  })
  const isSelected = selected || isReady

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
      onManageClick={handleManageClick}
      onResyncClick={handleResyncClick}
    />
  )

  const content = (
    <StripeMainContent
      actionLabel={actionLabel}
      isReady={isReady}
      isTiaProject={isTiaProject}
      isBusy={isBusy}
      onClick={handleManageClick}
      status={status}
      disabledReasonLabel={disabledReasonLabel}
    />
  )

  const minimalContent = (
    <StripeMinimalContent
      statusType={statusType}
      isBusy={isBusy}
      onClick={handleManageClick}
      statusMessage={minimalStatusMessage}
      actionLabel={getMinimalActionLabel(statusType, Boolean(status?.accountId), isReady)}
      showTitle={minimalShowTitle}
    />
  )

  if (minimal) {
    if (!withCard) return minimalContent
    return <CardLayout padding={4}>{minimalContent}</CardLayout>
  }

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
