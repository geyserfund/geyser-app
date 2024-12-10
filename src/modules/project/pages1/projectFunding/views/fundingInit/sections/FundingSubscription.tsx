import { HStack, Radio, RadioGroup, VStack } from '@chakra-ui/react'
import { Loader } from '@giphy/react-components'
import { t } from 'i18next'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { useSubscriptionBuy } from '@/modules/project/pages1/projectView/hooks/useSubscriptionBuy'
import { CardLayout } from '@/shared/components/layouts'
import { Body, H2 } from '@/shared/components/typography'
import { SubscriptionCurrencyType, UserSubscriptionInterval } from '@/types'
import { centsToDollars } from '@/utils'

export const PaymentIntervalLabelMap = {
  [UserSubscriptionInterval.Monthly]: 'month',
  [UserSubscriptionInterval.Yearly]: 'year',
  [UserSubscriptionInterval.Weekly]: 'week',
  [UserSubscriptionInterval.Quarterly]: 'quarter',
}

export const FundingSubscription = () => {
  const { project, formState } = useFundingFormAtom()

  const { subscriptions } = project

  const { addSubscriptionToBasket } = useSubscriptionBuy()

  const handleSubscriptionChange = (id: string) => {
    addSubscriptionToBasket(id)
  }

  const currentSubscriptionId = formState.subscription?.subscriptionId?.toString()

  return (
    <CardLayout width="100%" spacing={6}>
      <H2 size="2xl" bold>
        {t('Make a recurring contribution')}
      </H2>

      {subscriptions ? (
        <RadioGroup defaultValue={currentSubscriptionId} onChange={handleSubscriptionChange}>
          <HStack spacing={5} direction="row">
            {subscriptions.map((sub) => {
              return (
                <HStack
                  key={sub.id}
                  w="full"
                  justifyContent="space-between"
                  border="1px solid"
                  borderColor={'neutral1.6'}
                  background={sub.id === currentSubscriptionId ? 'primary1.2' : 'transparent'}
                  padding={4}
                  borderRadius={'12px'}
                >
                  <Radio
                    display="flex"
                    w="full"
                    justifyContent="space-between"
                    value={sub.id}
                    flexDirection="row-reverse"
                    placeContent={'space-between'}
                    placeItems={'center'}
                  >
                    <VStack flex={1} alignItems="flex-start">
                      <Body size="sm">{sub.name}</Body>
                      <Body size="sm" light>{`${centsToDollars(sub.cost)}${
                        sub.currency === SubscriptionCurrencyType.Usdcent ? '$' : ' sats'
                      } / ${PaymentIntervalLabelMap[sub.interval]}`}</Body>
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
