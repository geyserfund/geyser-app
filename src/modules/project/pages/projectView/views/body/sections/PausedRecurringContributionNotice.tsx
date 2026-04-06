import { useQuery } from '@apollo/client'
import { Button, Stack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo } from 'react'
import { useNavigate } from 'react-router'

import { useAuthContext } from '@/context/auth.tsx'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import {
  QUERY_RECURRING_CONTRIBUTIONS,
  RecurringContributionsQuery,
  recurringPaymentMethods,
} from '@/modules/project/recurring/graphql'
import { getPath } from '@/shared/constants'
import { Body } from '@/shared/components/typography/Body.tsx'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'

export const PausedRecurringContributionNotice = () => {
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const { project } = useProjectAtom()

  const { data } = useQuery<RecurringContributionsQuery>(QUERY_RECURRING_CONTRIBUTIONS, {
    skip: !user.id || !project.id,
    fetchPolicy: 'cache-and-network',
  })

  const pausedRecurringContribution = useMemo(
    () =>
      (data?.me?.recurringContributions ?? []).find(
        (item) =>
          item.kind === 'DONATION' &&
          item.status === 'PAUSED' &&
          item.project?.id === project.id &&
          (item.paymentMethod === recurringPaymentMethods.bitcoin ||
            item.paymentMethod === recurringPaymentMethods.banxa) &&
          item.managementNonce,
      ),
    [data?.me?.recurringContributions, project.id],
  )

  const autoCancelAt = useMemo(() => {
    const baseDate = pausedRecurringContribution?.pausedAt || pausedRecurringContribution?.nextBillingAt
    if (!baseDate) return null

    const cancelAt = new Date(new Date(baseDate).getTime() + 7 * 24 * 60 * 60 * 1000)
    return cancelAt.toLocaleDateString()
  }, [pausedRecurringContribution?.nextBillingAt, pausedRecurringContribution?.pausedAt])

  if (!pausedRecurringContribution?.managementNonce) {
    return null
  }

  return (
    <Feedback variant={FeedBackVariant.PRIORITY}>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        align={{ base: 'stretch', md: 'center' }}
        justify="space-between"
        w="full"
      >
        <VStack spacing={1} align="stretch" flex={1}>
          <Body size="xl" bold>
            {t('Recurring payment due')}
          </Body>
          <Body dark>
            {t('You have a recurring donation set up for this project and the next payment is due.')}
            {autoCancelAt ? ` ${t("If you don't renew it, the recurring donation will automatically cancel on")} ${autoCancelAt}.` : ''}
          </Body>
        </VStack>
        <Button
          colorScheme="cyan"
          variant="solid"
          size="lg"
          alignSelf={{ base: 'stretch', md: 'center' }}
          flexShrink={0}
          onClick={() =>
            navigate({
              pathname: getPath('fundingStart', project.name),
              search: `?renewRecurringContribution=${pausedRecurringContribution.managementNonce}`,
            })
          }
        >
          {t('Renew payment now')}
        </Button>
      </Stack>
    </Feedback>
  )
}
