import { HStack, Radio, RadioGroup, VStack } from '@chakra-ui/react'
import { Loader } from '@giphy/react-components'
import { t } from 'i18next'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { selectedGoalIdAtom } from '@/modules/project/funding/state/selectedGoalAtom'
import { recurringIntervals } from '@/modules/project/recurring/graphql.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body, H2 } from '@/shared/components/typography'
import { centsToDollars, commaFormatted } from '@/utils'

export const PaymentIntervalLabelMap = {
  [recurringIntervals.monthly]: 'month',
  [recurringIntervals.yearly]: 'year',
}

interface LocationState {
  projectGoalId: string
}

export const FundingSubscription = () => {
  const { project, formState, updateSubscription } = useFundingFormAtom()
  const setSelectedGoalId = useSetAtom(selectedGoalIdAtom)

  const location = useLocation()
  const navigate = useNavigate()
  const { projectGoalId } = (location.state as LocationState) || {}

  const { subscriptions } = project

  const handleSubscriptionChange = (id: string) => {
    updateSubscription({ id: Number(id) })
  }

  useEffect(() => {
    if (projectGoalId) {
      setSelectedGoalId(projectGoalId)
      navigate({ pathname: location.pathname, search: location.search }, { replace: true })
    }
    // subscribing to navigate causes rerender loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectGoalId, project.name, setSelectedGoalId])

  const currentSubscriptionId = formState.subscription?.subscriptionId?.toString()

  return (
    <CardLayout width="100%" spacing={6}>
      <H2 size="2xl" bold>
        {t('Choose a membership')}
      </H2>

      {subscriptions ? (
        <RadioGroup value={currentSubscriptionId} onChange={handleSubscriptionChange}>
          <HStack spacing={5} direction="row" alignItems="stretch">
            {subscriptions.map((sub) => {
              return (
                <HStack
                  key={sub.id}
                  w="full"
                  justifyContent="space-between"
                  border="1px solid"
                  borderColor={'neutral1.6'}
                  background={sub.id.toString() === currentSubscriptionId ? 'primary1.2' : 'transparent'}
                  padding={4}
                  borderRadius={'12px'}
                >
                  <Radio
                    display="flex"
                    w="full"
                    justifyContent="space-between"
                    value={sub.id.toString()}
                    flexDirection="row-reverse"
                    placeContent={'space-between'}
                    placeItems={'center'}
                  >
                    <VStack flex={1} alignItems="flex-start">
                      <Body size="sm">{sub.name}</Body>
                      <Body size="sm" light>
                        {`${centsToDollars(sub.amountUsdCent)} / ${commaFormatted(sub.amountBtcSat)} sats / ${
                          PaymentIntervalLabelMap[sub.interval]
                        }`}
                      </Body>
                      {sub.description && (
                        <Body size="xs" light color="neutral1.10">
                          {sub.description}
                        </Body>
                      )}
                    </VStack>
                  </Radio>
                </HStack>
              )
            })}
          </HStack>
        </RadioGroup>
      ) : (
        <Loader />
      )}
    </CardLayout>
  )
}
