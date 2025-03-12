import { HStack, Image, Switch, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'

export const EnableFiatContributions = () => {
  return (
    <VStack alignItems={'start'} paddingX={{ base: 0, lg: 6 }}>
      <CardLayout padding={4}>
        <HStack w="full" justifyContent="space-between">
          <Body size="lg" medium>
            {t('Enable fiat contributions')}
          </Body>
          <Switch size="lg" />
        </HStack>
        <HStack flexDirection={{ base: 'column', lg: 'row' }} spacing={8}>
          <Image maxWidth={{ base: '100%', lg: '160px' }} borderRadius="4px" src={'https://picsum.photos/160/70'} />
          <VStack alignItems={'start'}>
            <Body size="sm" light>
              {t(
                'Enable your contributors to fund with fiat. When enabled, all payments are automatically converted to Bitcoin and instantly deposited in your connected Bitcoin wallet.',
              )}
            </Body>
            <Body size="sm" light>
              {t('Fiat contributions have an additional 3.5% fee charged by the third-party payment processor.')}
            </Body>
          </VStack>
        </HStack>
      </CardLayout>
    </VStack>
  )
}
