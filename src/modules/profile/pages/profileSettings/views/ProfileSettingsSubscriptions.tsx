import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  HStack,
  Icon,
  LinkBox,
  LinkOverlay,
  Stack,
  VStack,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { useState } from 'react'
import { PiInfo } from 'react-icons/pi'
import { Link } from 'react-router'

import { useAuthContext } from '@/context'
import { TooltipPopover } from '@/shared/components/feedback/TooltipPopover.tsx'
import { SkeletonLayout } from '@/shared/components/layouts'
import { Body, H2 } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { useModal } from '@/shared/hooks'
import { AlertDialogue } from '@/shared/molecules/AlertDialogue'
import {
  RecurringContributionsQuery,
  useRecurringContributionCancelMutation,
  useRecurringContributionPortalSessionCreateMutation,
  useRecurringContributionsQuery,
} from '@/types/index.ts'
import { centsToDollars, commaFormatted } from '@/utils'
import { useNotification } from '@/utils/tools/Notification.tsx'

import { ProfileSettingsLayout } from '../common/ProfileSettingsLayout.tsx'

const intervalLabel: Record<string, string> = {
  MONTHLY: 'Monthly',
  YEARLY: 'Yearly',
}

const statusTitle: Record<string, string> = {
  ACTIVE: 'Active recurring payments',
  PAUSED: 'Paused recurring payments',
  CANCELED: 'Canceled recurring payments',
}

const formatAmount = (item: RecurringContributionItem) => {
  if (item.currency.toUpperCase().includes('USD')) {
    return `${centsToDollars(item.amount)} USD`
  }

  return `${commaFormatted(item.amount)} sats`
}

const renewalLabel: Record<string, string> = {
  STRIPE: 'Automated',
  BANXA: 'Manual',
  BITCOIN: 'Manual',
}

type RecurringContributionCardProps = {
  item: RecurringContributionItem
  onManageBilling(item: RecurringContributionItem): void
  onCancel(item: RecurringContributionItem): void
  isManagingBilling: boolean
  isCanceling: boolean
}

type RecurringContributionItem = NonNullable<
  NonNullable<RecurringContributionsQuery['me']>['recurringContributions']
>[number]

const RecurringContributionCard = ({
  item,
  onManageBilling,
  onCancel,
  isManagingBilling,
  isCanceling,
}: RecurringContributionCardProps) => {
  const projectTitle = item.project?.title || t('Recurring donation')
  const projectPath = item.project?.name ? getPath('project', item.project.name) : null
  const cadence = (intervalLabel[item.interval] || item.interval).toLowerCase()
  const title = `${projectTitle} - ${formatAmount(item)} ${cadence}`
  const canManageBilling = item.paymentMethod === 'STRIPE' && item.status !== 'CANCELED' && item.status !== 'PENDING'
  const canCancel = item.status !== 'CANCELED'

  return (
    <Card
      as={LinkBox}
      variant="outline"
      borderRadius="xl"
      borderColor="neutralAlpha.6"
      bg="neutralAlpha.1"
      transition="border-color 0.2s ease, box-shadow 0.2s ease"
      _hover={
        projectPath
          ? {
              borderColor: 'primary1.9',
              boxShadow: 'md',
            }
          : undefined
      }
    >
      <CardBody>
        <VStack alignItems="start" spacing={4}>
          <HStack
            w="full"
            alignItems={{ base: 'start', md: 'center' }}
            justifyContent="space-between"
            spacing={4}
            flexDirection={{ base: 'column', md: 'row' }}
          >
            <HStack alignItems="center" spacing={3} w="full" minW={0}>
              <Avatar size="md" name={projectTitle} src={item.project?.thumbnailImage || undefined} borderRadius="lg" />
              <VStack alignItems="start" spacing={1} flex={1} minW={0}>
                <Body size="md" medium>
                  {projectPath ? (
                    <LinkOverlay as={Link} to={projectPath}>
                      {title}
                    </LinkOverlay>
                  ) : (
                    title
                  )}
                </Body>
              </VStack>
            </HStack>
            {(canManageBilling || canCancel) && (
              <HStack
                spacing={3}
                w={{ base: 'full', md: 'auto' }}
                justifyContent={{ base: 'stretch', md: 'flex-end' }}
                alignItems="center"
                position="relative"
                zIndex={1}
              >
                {canManageBilling && (
                  <Button
                    size="md"
                    minH="42px"
                    px={5}
                    variant="solid"
                    colorScheme="primary1"
                    onClick={() => onManageBilling(item)}
                    isLoading={isManagingBilling}
                    flex={{ base: 1, md: 'unset' }}
                  >
                    {t('Manage Billing')}
                  </Button>
                )}
                {canCancel && (
                  <Button
                    size="md"
                    minH="42px"
                    px={5}
                    variant="outline"
                    colorScheme="neutral1"
                    onClick={() => onCancel(item)}
                    isLoading={isCanceling}
                    flex={{ base: 1, md: 'unset' }}
                  >
                    {t('Cancel')}
                  </Button>
                )}
              </HStack>
            )}
          </HStack>
          {item.lastChargeFailureMessage && (
            <Body size="sm" color="secondary.red1">
              {item.lastChargeFailureMessage}
            </Body>
          )}
          <HStack
            w="full"
            alignItems="flex-start"
            justifyContent="flex-start"
            spacing={8}
            flexDirection={{ base: 'column', md: 'row' }}
          >
            <VStack alignItems="start" spacing={1}>
              <HStack h="24px" alignItems="center">
                <Body size="xs" color="neutralAlpha.9" lineHeight="short">
                  {t('Next billing')}
                </Body>
              </HStack>
              <Body>{item.nextBillingAt ? new Date(item.nextBillingAt).toLocaleDateString() : t('Not scheduled')}</Body>
            </VStack>
            <VStack alignItems="start" spacing={1}>
              <HStack spacing={1} alignItems="center" h="24px">
                <Body size="xs" color="neutralAlpha.9" lineHeight="short">
                  {t('Renewal method')}
                </Body>
                <TooltipPopover
                  text={t(
                    'Automated renewals are charged automatically. Manual renewals require you to come back and complete each payment yourself before the due date.',
                  )}
                >
                  <Box as="span" color="neutralAlpha.9" cursor="help">
                    <Icon as={PiInfo} boxSize={3.5} />
                  </Box>
                </TooltipPopover>
              </HStack>
              <Body>{t(renewalLabel[item.paymentMethod] || 'Renewal')}</Body>
            </VStack>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  )
}

export const ProfileSettingsSubscriptions = () => {
  const { user } = useAuthContext()
  const toast = useNotification()
  const cancelModal = useModal()
  const [selectedRecurringContribution, setSelectedRecurringContribution] = useState<RecurringContributionItem | null>(
    null,
  )
  const [managingBillingId, setManagingBillingId] = useState<string | null>(null)

  const { data, loading, error, refetch } = useRecurringContributionsQuery({
    fetchPolicy: 'cache-and-network',
  })
  
  const [cancelRecurringContribution, cancelRecurringContributionOptions] = useRecurringContributionCancelMutation()
  const [createPortalSession, createPortalSessionOptions] = useRecurringContributionPortalSessionCreateMutation()

  const recurringContributions = (data?.me?.recurringContributions ?? []).filter(
    (item) => item.kind === 'DONATION' && item.status !== 'PENDING',
  )
  const grouped = recurringContributions.reduce<Record<string, RecurringContributionItem[]>>((accumulator, item) => {
    const bucket = accumulator[item.status] || []
    bucket.push(item)
    accumulator[item.status] = bucket
    return accumulator
  }, {})

  const handleManageBilling = async (item: RecurringContributionItem) => {
    try {
      setManagingBillingId(item.id)
      const { data } = await createPortalSession({
        variables: {
          input: {
            id: item.id,
            returnUrl: window.location.href,
          },
        },
      })

      const url = data?.recurringContributionPortalSessionCreate?.url
      if (!url) {
        toast.error({
          title: t('Unable to open billing portal.'),
          description: t('Please try again.'),
        })
        return
      }

      window.open(url, '_blank', 'noopener,noreferrer')
    } catch (error) {
      toast.error({
        title: t('Unable to open billing portal.'),
        description: error instanceof Error ? error.message : t('Please try again.'),
      })
    } finally {
      setManagingBillingId(null)
    }
  }

  const openCancelModal = (item: RecurringContributionItem) => {
    setSelectedRecurringContribution(item)
    cancelModal.onOpen()
  }

  const handleCancelRecurringContribution = async () => {
    if (!selectedRecurringContribution) return

    try {
      await cancelRecurringContribution({
        variables: {
          input: {
            id: selectedRecurringContribution.id,
          },
        },
      })

      cancelModal.onClose()
      setSelectedRecurringContribution(null)
      await refetch()
      toast.success({
        title: t('Recurring payment canceled.'),
      })
    } catch (error) {
      toast.error({
        title: t('Unable to cancel recurring payment.'),
        description: error instanceof Error ? error.message : t('Please try again.'),
      })
    }
  }

  return (
    <ProfileSettingsLayout desktopTitle={t('Recurring Payments')}>
      <Stack spacing={8} px={{ base: 0, lg: 6 }} w="full">
        <Body size="md" color="neutralAlpha.11" regular>
          {t('View the recurring donations you have started across Geyser.')}
        </Body>

        {loading ? (
          <Stack spacing={8} m={8} w="full">
            {[1, 2].map((section) => (
              <Box key={section}>
                <SkeletonLayout height="24px" width="200px" mb={2} />
                <SkeletonLayout height="120px" borderRadius="xl" />
              </Box>
            ))}
          </Stack>
        ) : error ? (
          <Card variant="outline" borderRadius="xl" borderColor="neutralAlpha.6">
            <CardBody>
              <VStack alignItems="start" spacing={4}>
                <Body size="md" bold>
                  {t('Unable to load recurring payments')}
                </Body>
                <Body size="sm" light>
                  {t('Please try again.')}
                </Body>
                <Button
                  colorScheme="primary1"
                  onClick={() => {
                    refetch()
                  }}
                >
                  {t('Retry')}
                </Button>
              </VStack>
            </CardBody>
          </Card>
        ) : recurringContributions.length === 0 ? (
          <Card variant="outline" borderRadius="xl" borderColor="neutralAlpha.6">
            <CardBody>
              <Body size="sm" light>
                {t('You do not have any recurring payments yet.')}
              </Body>
            </CardBody>
          </Card>
        ) : (
          <Stack spacing={8}>
            {Object.entries(grouped).map(([status, items]) => (
              <Box key={status}>
                <H2 size="lg" mb={2}>
                  {t(statusTitle[status] || status)}
                </H2>
                <Stack spacing={4}>
                  {items.map((item) => (
                    <RecurringContributionCard
                      key={item.id}
                      item={item}
                      onManageBilling={handleManageBilling}
                      onCancel={openCancelModal}
                      isManagingBilling={createPortalSessionOptions.loading && managingBillingId === item.id}
                      isCanceling={
                        cancelRecurringContributionOptions.loading && selectedRecurringContribution?.id === item.id
                      }
                    />
                  ))}
                </Stack>
              </Box>
            ))}
          </Stack>
        )}
      </Stack>
      <AlertDialogue
        isOpen={cancelModal.isOpen}
        onClose={() => {
          cancelModal.onClose()
          setSelectedRecurringContribution(null)
        }}
        title={t('Cancel recurring payment')}
        description={t(
          'This will stop future renewals for this recurring payment. You can still manage active card billing in Stripe before canceling.',
        )}
        hasCancel
        negativeButtonProps={{
          onClick: handleCancelRecurringContribution,
          isLoading: cancelRecurringContributionOptions.loading,
          children: t('Cancel recurring payment'),
        }}
      >
        {selectedRecurringContribution && (
          <VStack alignItems="start" spacing={1}>
            <Body size="sm">{selectedRecurringContribution.project?.title || t('Recurring donation')}</Body>
            <Body size="sm" color="neutralAlpha.11">
              {formatAmount(selectedRecurringContribution)} ·{' '}
              {t(intervalLabel[selectedRecurringContribution.interval] || selectedRecurringContribution.interval)}
            </Body>
            {user?.id && selectedRecurringContribution.paymentMethod === 'STRIPE' && (
              <Body size="sm" color="neutralAlpha.11">
                {t('You can also update payment details from Manage billing.')}
              </Body>
            )}
          </VStack>
        )}
      </AlertDialogue>
    </ProfileSettingsLayout>
  )
}
