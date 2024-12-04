import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { DateTime } from 'luxon'

import { Body } from '@/shared/components/typography'
import { useCountdown } from '@/shared/hooks/useCountdown'
import { fonts } from '@/shared/styles'
import { toInt, useMobileMode } from '@/utils'

import { SubscribeGuardians } from '../../components/SubscribeGuardians'
import { DesktopGuardiansIllustration } from './components/DesktopGuardiansIllustration'
import { MobileGuardiansIllustration } from './components/MobileGuardiansIllustration'

export const GuardiansMainPage = () => {
  const isMobile = useMobileMode()

  const endDate = DateTime.fromFormat('2024-12-05', 'yyyy-MM-dd').toMillis()

  const { days, hours, seconds } = useCountdown(endDate)

  const textSize = { base: '14px', sm: '16px', md: '18px', lg: '20px', xl: '24px', '3xl': '28px' }

  return (
    <>
      <VStack
        w="full"
        zIndex={2}
        maxWidth="1448px"
        fontFamily={fonts.mazius}
        px={{ base: 3, lg: 6 }}
        spacing={{ base: 2, md: 3, lg: 8 }}
        paddingTop={{ base: '60px', lg: 0 }}
      >
        <Body fontSize={textSize} textAlign={'center'} lineHeight={'1.4'}>
          {t(
            'Geyser’s mission is to push Bitcoin adoption forward. Geyser Guardians are the defenders of this mission.  Their bravery will be rewarded with rare artifacts. Their names shall be remembered in future epochs. Do you have what it takes to become a Geyser Guardian?',
          )}
        </Body>
        <VStack spacing={0} lineHeight={'1.4'}>
          <Body fontSize={textSize} textAlign={'center'} lineHeight={'1.4'}>
            {t('Enter your email to be notified – the first 121 Guardians will get a special deal.')}
          </Body>
          <Body fontSize={textSize} textAlign={'center'} lineHeight={'1.4'}>
            {t('More will be revealed in ')}
            <Body as="span" bold>
              {t(`${days} days, ${hours} hours, ${toInt(seconds)} seconds.`)}
            </Body>
          </Body>
        </VStack>

        <SubscribeGuardians />
      </VStack>
      {isMobile ? <MobileGuardiansIllustration /> : <DesktopGuardiansIllustration />}
    </>
  )
}
