import { HStack, Image, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body, H2 } from '@/shared/components/typography'
import { LaunchPadIllustrationUrl } from '@/shared/constants/platform/url.ts'
import { lightModeColors } from '@/shared/styles'
import { TitleHeaderGradient } from '@/shared/styles/custom.ts'

import { FlowingGifBackground } from '../../heroes/components/FlowingGifBackground.tsx'

export const LaunchpadTitle = () => {
  return (
    <CardLayout
      w="full"
      dense
      spacing={{ base: 4, lg: 6 }}
      background={TitleHeaderGradient}
      position="relative"
      backgroundColor="utils.pbg"
      alignItems={{ base: 'start', lg: 'center' }}
    >
      <FlowingGifBackground />

      <HStack w="full" spacing={{ base: 4, lg: 6 }} padding={{ base: 2, lg: 4 }}>
        <Image
          width={{ base: '95px', lg: '120px' }}
          height="auto"
          zIndex={1}
          src={LaunchPadIllustrationUrl}
          alt="Launchpad illustration"
        />

        <VStack w="full" alignItems={'start'} spacing={{ base: 2, lg: 0 }} zIndex={1}>
          <H2 size={{ base: 'xl', lg: '3xl' }} bold color={lightModeColors.utils.text}>
            {t('Launchpad')}
          </H2>

          <Body size={{ base: 'sm', lg: 'xl' }} medium color={lightModeColors.neutral1[11]}>
            {t('Where grassroots Bitcoin projects come to life. ')}{' '}
            {t(
              'Geyser rallies the Bitcoin community to fund ideas, products, and causes that drive real-world adoption from the ground up.',
            )}
          </Body>
        </VStack>
      </HStack>
    </CardLayout>
  )
}
