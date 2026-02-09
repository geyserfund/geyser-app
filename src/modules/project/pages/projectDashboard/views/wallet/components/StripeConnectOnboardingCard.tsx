import { Button, HStack, Link, Tag, VStack } from '@chakra-ui/react'
import { gql, useMutation, useQuery } from '@apollo/client'
import { t } from 'i18next'
import { useEffect } from 'react'

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
  onSelect?: () => void
  onReadyStateChange?: (isReady: boolean) => void
}

const openOnboardingUrl = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer')
}

const getStripeDisabledReasonLabel = (reason?: string | null) => {
  if (!reason) return null

  const reasonMap: Record<string, string> = {
    'requirements.past_due': t('Stripe needs additional details to activate this account. Click "Resume onboarding".'),
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
  onSelect,
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

    refreshStripeConnectOnboardingLink({ variables: { projectId } })
  }

  const actionLabel = !isTiaProject
    ? t('TIA only')
    : isReady
    ? t('Connected')
    : hasAccount
    ? t('Resume onboarding')
    : t('Connect Stripe')

  const compactContent = (
    <VStack w="full" alignItems="start" spacing={4}>
      <HStack w="full" justifyContent="space-between" alignItems="start">
        <Body size="lg" medium>
          {t('Receive in Fiat through Stripe Connect')}
        </Body>
        {isReady && (
          <Body size="sm" medium color="primary1.9">
            {t('Enabled')}
          </Body>
        )}
      </HStack>

      <Body size="md" light>
        {isTiaProject
          ? t('Configure Stripe Connect to receive payments in fiat. Checkout is charged in USD and card issuers may convert to local currency.')
          : t('Available only for Take It All projects.')}
      </Body>

      {disabledReasonLabel && (
        <Body size="xs" color="secondary.red" medium>
          {t('Action required')}: {disabledReasonLabel}
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
          {isReady ? t('Manage Stripe Connect') : hasAccount ? t('Resume onboarding') : t('Configure Stripe Connect')}
        </Button>
      </HStack>
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
          {t('Action required')}: {disabledReasonLabel}
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
        cursor="pointer"
        onClick={onSelect}
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
