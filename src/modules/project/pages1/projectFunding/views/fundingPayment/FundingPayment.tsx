import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Outlet } from 'react-router-dom'

import { CardLayout } from '@/shared/components/layouts'
import { Body, H1 } from '@/shared/components/typography'

import { FundingLayout } from '../../layouts/FundingLayout'

export const FundingPayment = () => {
  return (
    <FundingLayout>
      <CardLayout spacing={2}>
        <VStack flex={1} w="full">
          <H1 size="2xl">{t('Invoice')}</H1>
          <VStack></VStack>
        </VStack>

        <Body light>
          {t(
            'Geyser is not a store. It’s a way to bring creative projects to life using Bitcoin. Your donation will support a creative project that has yet to be developed. There’s a risk that, despite a creator’s best efforts, your reward will not be fulfilled, and we urge you to consider this risk prior to backing it. Geyser is not responsible for project claims or reward fulfillment.',
          )}
        </Body>
      </CardLayout>

      <Outlet />
    </FundingLayout>
  )
}
