import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body } from '@/shared/components/typography/Body.tsx'
import { FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import { Feedback } from '@/shared/molecules/Feedback.tsx'

export const CannotCompleteShippingForThisOrder = () => {
  return (
    <>
      <Feedback variant={FeedBackVariant.WARNING} noIcon padding={{ base: 3, lg: 4 }}>
        <VStack w="full" alignItems="flex-start" spacing={{ base: 0, lg: 2 }}>
          <Body size={{ base: 'md', lg: 'lg' }} medium>
            {t('Shipping conflict')}
          </Body>
          <Body size={{ base: 'sm', lg: 'md' }}>
            {t(
              'The items in your basket cannot all be shipped to a single country. Please adjust your selection or choose items available for global shipping.',
            )}
          </Body>
        </VStack>
      </Feedback>
    </>
  )
}
