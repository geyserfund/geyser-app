import { HStack, Image, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body, H2 } from '@/shared/components/typography'
import { LaunchPadIllustrationUrl } from '@/shared/constants/platform/url.ts'
import { lightModeColors } from '@/shared/styles'

import { FlowingGifBackground } from '../../hallOfFame/components/FlowingGifBackground.tsx'

export const LaunchpadTitle = () => {
  return (
    <CardLayout
      w="full"
      dense
      spacing={{ base: 4, lg: 6 }}
      background="linear-gradient(81deg, #EAF2F8 -9.6%, #AED6F1 109.2%)"
      position="relative"
      backgroundColor="utils.pbg"
      alignItems={{ base: 'start', lg: 'center' }}
    >
      <FlowingGifBackground opacity="0.25" />

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
            {t(
              'These early-stage projects are in countdown mode. To launch, they need 21 followers within 30 days. Help them build momentum — or they might never take off.',
            )}
          </Body>
        </VStack>
      </HStack>
    </CardLayout>
  )
}
