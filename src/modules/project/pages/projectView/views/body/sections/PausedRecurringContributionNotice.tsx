import { Button, Stack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo } from 'react'
import { useNavigate } from 'react-router'

import { useAuthContext } from '@/context/auth.tsx'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { recurringPaymentMethods } from '@/modules/project/recurring/graphql.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import { useRecurringContributionsQuery } from '@/types/index.ts'

const AUTO_CANCEL_DAYS = 7
const autoCancelDateFormatter = new Intl.DateTimeFormat(undefined, {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

export const PausedRecurringContributionNotice = () => {
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const { project } = useProjectAtom()
  const projectId = project?.id

  const { data } = useRecurringContributionsQuery({
    skip: !user.id || !projectId,
    fetchPolicy: 'cache-and-network',
  })

  const pausedRecurringContribution = useMemo(
    () =>
      projectId
        ? (data?.me?.recurringContributions ?? []).find(
            (item) =>
              item.kind === 'DONATION' &&
              item.status === 'PAUSED' &&
              item.project?.id === projectId &&
              (item.paymentMethod === recurringPaymentMethods.bitcoin ||
                item.paymentMethod === recurringPaymentMethods.banxa) &&
              item.managementNonce,
          )
        : undefined,
    [data?.me?.recurringContributions, projectId],
  )

  const autoCancelAt = useMemo(() => {
    const baseDate = pausedRecurringContribution?.pausedAt || pausedRecurringContribution?.nextBillingAt
    if (!baseDate) return null

    const cancelAt = new Date(new Date(baseDate).getTime() + AUTO_CANCEL_DAYS * 24 * 60 * 60 * 1000)
    return autoCancelDateFormatter.format(cancelAt)
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
            {autoCancelAt
              ? ` ${t("If you don't renew it, the recurring donation will automatically cancel on {{date}}.", {
                  date: autoCancelAt,
                })}`
              : ''}
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
