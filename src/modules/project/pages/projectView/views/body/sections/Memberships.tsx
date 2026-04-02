import { Button, HStack, SimpleGrid, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { useProjectSubscriptionsAPI } from '@/modules/project/API/useProjectSubscriptionsAPI'
import {
  useProjectAtom,
  useRecurringContributionSupportAtom,
  useSubscriptionsAtom,
} from '@/modules/project/hooks/useProjectAtom'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { ProjectFundingStrategy } from '@/types'
import { centsToDollars, commaFormatted } from '@/utils'

import { useSubscriptionBuy } from '../../../hooks/useSubscriptionBuy'
import { BodySectionLayout } from '../components'

const intervalLabel: Record<string, string> = {
  MONTHLY: 'month',
  YEARLY: 'year',
}

export const Memberships = () => {
  const { t } = useTranslation()
  const { buySubscription } = useSubscriptionBuy()
  const { project, isProjectOwner } = useProjectAtom()
  const { subscriptions } = useSubscriptionsAtom()
  const { recurringContributionSupport } = useRecurringContributionSupportAtom()

  useProjectSubscriptionsAPI(true)

  const visiblePlans = subscriptions.filter((plan) => !plan.isHidden)

  if (project.fundingStrategy !== ProjectFundingStrategy.TakeItAll) {
    return null
  }

  if (visiblePlans.length === 0 && !isProjectOwner) {
    return null
  }

  return (
    <BodySectionLayout
      title={t('Memberships')}
      rightComponent={
        isProjectOwner ? (
          <Button as={Link} to={getPath('dashboardMemberships', project.name)} variant="soft" colorScheme="neutral1">
            {visiblePlans.length > 0 ? t('Manage') : t('Create plans')}
          </Button>
        ) : undefined
      }
    >
      {visiblePlans.length === 0 ? (
        <CardLayout w="full" alignItems="start" spacing={3}>
          <Body size="md" light>
            {t('Offer recurring memberships with matching USD and Bitcoin pricing.')}
          </Body>
          <Button as={Link} to={getPath('dashboardMemberships', project.name)} colorScheme="primary1">
            {t('Create your first membership plan')}
          </Button>
        </CardLayout>
      ) : (
        <>
          <Body size="sm" light>
            {recurringContributionSupport?.reason ||
              t('Choose a plan, then pick whether to pay automatically with card or manually with Bitcoin.')}
          </Body>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
            {visiblePlans.map((plan) => (
              <CardLayout key={plan.id} w="full" alignItems="start" spacing={4}>
                <VStack alignItems="start" spacing={2} w="full">
                  <Body size="lg" bold>
                    {plan.name}
                  </Body>
                  {plan.description && (
                    <Body size="sm" light>
                      {plan.description}
                    </Body>
                  )}
                </VStack>
                <VStack alignItems="start" spacing={1} w="full">
                  <Body size="md" bold>{`${centsToDollars(plan.amountUsdCent)} / ${
                    intervalLabel[plan.interval] || 'month'
                  }`}</Body>
                  <Body size="sm" light>{`${commaFormatted(plan.amountBtcSat)} sats / ${
                    intervalLabel[plan.interval] || 'month'
                  }`}</Body>
                </VStack>
                <HStack w="full" justifyContent="space-between">
                  <Body size="xs" light color="neutral1.9">
                    {t('Rail is selected during checkout')}
                  </Body>
                  <Button colorScheme="primary1" onClick={() => buySubscription(plan.id)}>
                    {t('Join')}
                  </Button>
                </HStack>
              </CardLayout>
            ))}
          </SimpleGrid>
        </>
      )}
    </BodySectionLayout>
  )
}
