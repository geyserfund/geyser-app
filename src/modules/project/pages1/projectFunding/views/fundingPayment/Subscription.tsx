import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { useListenFundingSuccess } from '@/modules/project/funding/hooks/useListenFundingSuccess'
import { Body, H1 } from '@/shared/components/typography'

import { ReachOutForHelpButton } from './components/ReachOutForHelpButton'
import { PaymentCard } from './views/PaymentCard'

export const Subscription = () => {
  useListenFundingSuccess()
  return (
    <>
      <VStack flex={1} w="full" alignItems="start">
        <H1 size="2xl" bold>
          {t('Subscribe')}
        </H1>
        <VStack w="full" spacing={6}>
          <PaymentCard />
        </VStack>
      </VStack>

      <VStack w="full" spacing={3}>
        <ReachOutForHelpButton />
        <Body light size="xs">
          {t(
            'Geyser is not a store. It’s a way to bring creative projects to life using Bitcoin. Your donation will support a creative project that has yet to be developed. There’s a risk that, despite a creator’s best efforts, your reward will not be fulfilled, and we urge you to consider this risk prior to backing it. Geyser is not responsible for project claims or reward fulfillment.',
          )}
        </Body>
      </VStack>
    </>
  )
}
