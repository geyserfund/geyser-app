import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { DateTime } from 'luxon'

import { Body, H1 } from '@/shared/components/typography'
import { dimensions } from '@/shared/constants'
import { useCountdown } from '@/shared/hooks/useCountdown'
import { fonts } from '@/shared/styles'
import { toInt, toPx, useMobileMode } from '@/utils'

import { DesktopGuardiansIllustration } from './components/DesktopGuardiansIllustration'
import { MobileGuardiansIllustration } from './components/MobileGuardiansIllustration'
import { SubscribeGuardians } from './components/SubscribeGuardians'

export const Guardians = () => {
  const isMobile = useMobileMode()

  const endDate = DateTime.fromFormat('2024-12-05', 'yyyy-MM-dd').toMillis()

  const { days, hours, seconds } = useCountdown(endDate)

  return (
    <VStack
      w="full"
      maxWidth={dimensions.guardians.maxWidth}
      spacing={4}
      fontFamily={fonts.mazius}
      fontStyle="normal"
      marginTop={{
        base: `-${toPx(dimensions.topNavBar.mobile.height)}`,
        lg: `-${toPx(dimensions.topNavBar.desktop.height)}`,
      }}
      h={'100vh'}
      backgroundColor={'guardians.background'}
      overflow="hidden"
      position="relative"
    >
      <VStack zIndex={2} w="full" pt={{ base: 20, lg: 6, xl: 4 }} spacing={{ base: 0, lg: 6 }} position="relative">
        <H1 fontSize={{ base: '32px', md: '48px', lg: '56px', xl: '72px' }} fontWeight={{ base: 'bold', lg: 'normal' }}>
          {t('GEYSER GUARDIANS')}
        </H1>
        <VStack
          w="full"
          maxWidth="1448px"
          fontFamily={fonts.ptSerif}
          px={{ base: 3, lg: 6 }}
          spacing={{ base: 3, lg: 8 }}
        >
          <Body
            fontSize={{ base: '16px', md: '20px', lg: '24px', xl: '28px', '3xl': '32px' }}
            textAlign={'center'}
            lineHeight={'1.4'}
          >
            {t(
              'Geyser’s mission is to push Bitcoin adoption forward. Geyser Guardians are the defenders of this mission.  Their bravery will be rewarded with rare artifacts. Their names shall be remembered in future epochs. Do you have what it takes to become a Geyser Guardian?',
            )}
          </Body>
          <VStack spacing={0} lineHeight={'1.4'}>
            <Body
              fontSize={{ base: '16px', md: '20px', lg: '24px', xl: '28px', '3xl': '32px' }}
              textAlign={'center'}
              lineHeight={'1.4'}
            >
              {t('Enter your email to be notified – the first 121 Guardians will get a special deal.')}
            </Body>
            <Body
              fontSize={{ base: '16px', md: '20px', lg: '24px', xl: '28px', '3xl': '32px' }}
              textAlign={'center'}
              lineHeight={'1.4'}
            >
              {t('More will be revealed in ')}
              <Body as="span" bold>
                {t(`${days} days, ${hours} hours, ${toInt(seconds)} seconds.`)}
              </Body>
            </Body>
          </VStack>

          <SubscribeGuardians />
        </VStack>
      </VStack>
      {isMobile ? <MobileGuardiansIllustration /> : <DesktopGuardiansIllustration />}
    </VStack>
  )
}
