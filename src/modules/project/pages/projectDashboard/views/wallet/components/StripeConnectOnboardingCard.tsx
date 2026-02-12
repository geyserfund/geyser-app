import { Button, HStack, Icon, Link, Tag, VStack } from '@chakra-ui/react'
import { gql, useMutation, useQuery } from '@apollo/client'
import { t } from 'i18next'
import { useEffect } from 'react'
import { PiClock, PiWarningFill } from 'react-icons/pi'

import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'

const QUERY_PROJECT_STRIPE_CONNECT_STATUS = gql`
  query ProjectStripeConnectStatus($projectId: BigInt!) {
    projectStripeConnectStatus(projectId: $projectId) {
      accountId
      chargesEnabled
      payoutsEnabled
      detailsSubmitted
      disabledReason
      isReady
    }
  }
`

const MUTATION_CREATE_STRIPE_CONNECT_ACCOUNT = gql`
  mutation CreateStripeConnectAccount($projectId: BigInt!) {
    createStripeConnectAccount(projectId: $projectId) {
      accountId
      onboardingUrl
      status {
        accountId
        chargesEnabled
        payoutsEnabled
        detailsSubmitted
        disabledReason
        isReady
      }
    }
  }
`

const MUTATION_REFRESH_STRIPE_CONNECT_ONBOARDING_LINK = gql`
  mutation RefreshStripeConnectOnboardingLink($projectId: BigInt!) {
    refreshStripeConnectOnboardingLink(projectId: $projectId) {
      accountId
      onboardingUrl
      status {
        accountId
        chargesEnabled
        payoutsEnabled
        detailsSubmitted
        disabledReason
        isReady
      }
    }
  }
`

type StripeConnectOnboardingCardProps = {
  isIdentityVerified: boolean
  isTiaProject: boolean
  projectId?: string | number | bigint
  onRequireVerification: () => void
  withCard?: boolean
  compact?: boolean
  selected?: boolean
  onReadyStateChange?: (isReady: boolean) => void
}

const openOnboardingUrl = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer')
}

const getStripeDisabledReasonLabel = (reason?: string | null) => {
  if (!reason) return null

  const reasonMap: Record<string, string> = {
    'requirements.past_due': t(
      'Stripe needs additional details to activate this account. Click "Resume\u00A0onboarding".',
    ),
    'requirements.pending_verification': t('Stripe verification is still in progress. Please check again shortly.'),
    under_review: t('Stripe is reviewing this account.'),
  }

  return reasonMap[reason] || t('Stripe requires additional action to activate this account.')
}

export const StripeConnectOnboardingCard = ({
  isIdentityVerified,
  isTiaProject,
  projectId,
  onRequireVerification,
  withCard = true,
  compact = false,
  selected = false,
  onReadyStateChange,
}: StripeConnectOnboardingCardProps) => {
  const { data, loading, refetch } = useQuery(QUERY_PROJECT_STRIPE_CONNECT_STATUS, {
    variables: { projectId },
    skip: !projectId || !isTiaProject,
    fetchPolicy: 'network-only',
  })

  const [createStripeConnectAccount, createStripeConnectAccountOptions] = useMutation(
    MUTATION_CREATE_STRIPE_CONNECT_ACCOUNT,
    {
      onCompleted(result) {
        const url = result?.createStripeConnectAccount?.onboardingUrl
        if (url) openOnboardingUrl(url)
        refetch()
      },
    },
  )

  const [refreshStripeConnectOnboardingLink, refreshStripeConnectOnboardingLinkOptions] = useMutation(
    MUTATION_REFRESH_STRIPE_CONNECT_ONBOARDING_LINK,
    {
      onCompleted(result) {
        const url = result?.refreshStripeConnectOnboardingLink?.onboardingUrl
        if (url) openOnboardingUrl(url)
        refetch()
      },
    },
  )

  const status = data?.projectStripeConnectStatus
  const isReady = Boolean(status?.isReady)
  const hasAccount = Boolean(status?.accountId)
  const isSelected = selected || isReady
  const disabledReasonLabel = getStripeDisabledReasonLabel(status?.disabledReason)
  const isActionRequired = status?.disabledReason === 'requirements.past_due'
  const isProcessing =
    status?.disabledReason === 'requirements.pending_verification' || status?.disabledReason === 'under_review'
  const isBusy =
    loading || createStripeConnectAccountOptions.loading || refreshStripeConnectOnboardingLinkOptions.loading

  useEffect(() => {
    onReadyStateChange?.(isReady)
  }, [isReady, onReadyStateChange])

  const handleClick = () => {
    if (!projectId || !isTiaProject) return
    if (!isIdentityVerified) {
      onRequireVerification()
      return
    }

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

  const statusIndicator = isReady ? (
    <Body size="sm" medium color="primary1.9">
      {t('Enabled')}
    </Body>
  ) : isActionRequired ? (
    <HStack spacing={1} color="orange.9">
      <Icon as={PiWarningFill} boxSize={4} />
      <Body size="sm" medium color="orange.9">
        {t('Action Required')}
      </Body>
    </HStack>
  ) : isProcessing ? (
    <HStack spacing={1} color="orange.9">
      <Icon as={PiClock} boxSize={4} />
      <Body size="sm" medium color="orange.9">
        {t('Processing')}
      </Body>
    </HStack>
  ) : null

  const actionLabel = !isTiaProject
    ? t('TIA only')
    : isReady
    ? t('Connected')
    : isProcessing
    ? t('Re-sync')
    : hasAccount
    ? t('Resume onboarding')
    : t('Connect Stripe')

  const compactContent = (
    <VStack w="full" alignItems="start" spacing={4}>
      <HStack w="full" justifyContent="space-between" alignItems="start">
        <Body size="lg" medium>
          {t('Receive in your bank account')}
        </Body>
        {statusIndicator}
      </HStack>

      <Body size="md" light>
        {isTiaProject
          ? t('Configure Stripe Connect to receive payments directly in your bank account.')
          : t('Available only for Take It All projects.')}
      </Body>

      <Body size="md" light>
        {isTiaProject
          ? t(
              'Contributions will be charged an additional processing fee of 3.5% + 30c per contribution. Payout time is dependent on card issuers.',
            )
          : t('Available only for Take It All projects.')}
      </Body>

      {(disabledReasonLabel && (isActionRequired || isProcessing) && !isReady) ? (
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
            onClick={handleClick}
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
              onClick={handleClick}
              isDisabled={!isTiaProject || isBusy}
              isLoading={isBusy}
              width={{ base: '100%', md: 'auto' }}
              minW={{ base: 'unset', md: '240px' }}
            >
              {isReady
                ? t('Manage Stripe Connect')
                : isProcessing
                ? t('Re-sync')
                : hasAccount
                ? t('Resume onboarding')
                : t('Configure Stripe Connect')}
            </Button>
          </HStack>
        </>
      )}
    </VStack>
  )

  const content = (
    <VStack w="full" alignItems="start" spacing={3}>
      <HStack w="full" justifyContent="space-between">
        <Body size="lg" medium>
          {t('Stripe Connect')}
        </Body>
        <Button
          size="md"
          variant={isReady ? 'solid' : 'outline'}
          colorScheme="primary1"
          onClick={handleClick}
          isDisabled={!isTiaProject || isBusy}
          isLoading={isBusy}
        >
          {actionLabel}
        </Button>
      </HStack>

      <Body size="sm" light>
        {isTiaProject
          ? t('Enable fiat card contributions for this project. Checkout is charged in USD; card issuers may convert to local currency.')
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

  return (
    <CardLayout padding={4}>
      {content}
    </CardLayout>
  )
}
