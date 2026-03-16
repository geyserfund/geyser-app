import { useQuery } from '@apollo/client'
import { Box, Card, CardBody, HStack, Stack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import {
  QUERY_RECURRING_CONTRIBUTIONS,
  RecurringContribution,
  RecurringContributionsQuery,
} from '@/modules/project/recurring/graphql'
import { SkeletonLayout } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { centsToDollars, commaFormatted } from '@/utils'

import { ProfileSettingsLayout } from '../common/ProfileSettingsLayout.tsx'

const intervalLabel: Record<string, string> = {
  MONTHLY: 'Monthly',
  YEARLY: 'Yearly',
}

const statusTitle: Record<string, string> = {
  ACTIVE: 'Active recurring payments',
  PAUSED: 'Paused recurring payments',
  CANCELED: 'Canceled recurring payments',
  PENDING: 'Pending recurring payments',
}

const RecurringDetail = ({ label, value }: { label: string; value: string }) => (
  <HStack flexWrap="wrap">
    <Body color="neutralAlpha.9">{label}</Body>
    <Body color="black">{value}</Body>
  </HStack>
)

const formatAmount = (item: RecurringContribution) => {
  if (item.currency.toUpperCase().includes('USD')) {
    return `${centsToDollars(item.amount)} USD`
  }

  return `${commaFormatted(item.amount)} sats`
}

const railLabel: Record<string, string> = {
  STRIPE: 'Card',
  BANXA: 'Card / Bank Transfer',
  BITCOIN: 'Bitcoin',
}

const RecurringContributionCard = ({ item }: { item: RecurringContribution }) => {
  const title = item.project?.title || t('Recurring donation')

  return (
    <Card variant="outline" borderRadius="xl" borderColor="neutralAlpha.6">
      <CardBody>
        <VStack alignItems="start" spacing={3}>
          <Body size="lg">{title}</Body>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4} color="neutralAlpha.11">
            <RecurringDetail label={t('Status:')} value={item.status.toLowerCase()} />
            <RecurringDetail label={t('Amount:')} value={formatAmount(item)} />
            <RecurringDetail label={t('Interval:')} value={intervalLabel[item.interval] || item.interval} />
            <RecurringDetail label={t('Rail:')} value={t(railLabel[item.paymentMethod] || item.paymentMethod)} />
            {item.nextBillingAt && (
              <RecurringDetail label={t('Next billing:')} value={new Date(item.nextBillingAt).toLocaleDateString()} />
            )}
          </Stack>
          {item.lastChargeFailureMessage && (
            <Body size="sm" color="secondary.red1">
              {item.lastChargeFailureMessage}
            </Body>
          )}
        </VStack>
      </CardBody>
    </Card>
  )
}

export const ProfileSettingsSubscriptions = () => {
  const { data, loading } = useQuery<RecurringContributionsQuery>(QUERY_RECURRING_CONTRIBUTIONS, {
    fetchPolicy: 'cache-and-network',
  })

  const recurringContributions = (data?.me?.recurringContributions ?? []).filter((item) => item.kind === 'DONATION')
  const grouped = recurringContributions.reduce<Record<string, RecurringContribution[]>>((accumulator, item) => {
    const bucket = accumulator[item.status] || []
    bucket.push(item)
    accumulator[item.status] = bucket
    return accumulator
  }, {})

  return (
    <ProfileSettingsLayout desktopTitle={t('Recurring Payments')}>
      <Stack spacing={8} px={{ base: 0, lg: 6 }} w="full">
        <Body size="sm" color="neutralAlpha.11" regular>
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
                <Body size="md" mb={2}>
                  {t(statusTitle[status] || status)}
                </Body>
                <Stack spacing={4}>
                  {items.map((item) => (
                    <RecurringContributionCard key={item.id} item={item} />
                  ))}
                </Stack>
              </Box>
            ))}
          </Stack>
        )}
      </Stack>
    </ProfileSettingsLayout>
  )
}
