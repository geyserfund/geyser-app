import { HStack, Icon, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiRocket } from 'react-icons/pi'

import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body, H2 } from '@/shared/components/typography'
import { lightModeColors } from '@/shared/styles'

import { FlowingGifBackground } from '../../hallOfFame/components/FlowingGifBackground.tsx'

export const LaunchpadTitle = () => {
  return (
    <CardLayout
      w="full"
      dense
      spacing={{ base: 4, lg: 6 }}
      background="linear-gradient(81deg, #FFFBE7 -9.6%, #C4FFF4 109.2%)"
      position="relative"
      backgroundColor="utils.pbg"
      alignItems={{ base: 'start', lg: 'center' }}
    >
      <FlowingGifBackground />

      <HStack w="full" spacing={{ base: 4, lg: 6 }} padding={{ base: 2, lg: 4 }}>
        <Icon
          as={PiRocket}
          color={lightModeColors.orange[9]}
          width={{ base: '95px', lg: '130px' }}
          height="auto"
          zIndex={1}
        />

        <VStack w="full" alignItems={'start'} spacing={{ base: 2, lg: 0 }} zIndex={1}>
          <H2 size={{ base: 'xl', lg: '3xl' }} bold color={lightModeColors.utils.text}>
            {t('Geyser Launchpad')}
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
