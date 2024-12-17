import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Trans } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { useCountdown } from '@/shared/hooks/useCountdown'
import { fonts } from '@/shared/styles'
import { toInt, useMobileMode } from '@/utils'

import { SubscribeGuardians } from '../../components/SubscribeGuardians'
import { DesktopGuardiansIllustration } from './components/DesktopGuardiansIllustration'
import { MobileGuardiansIllustration } from './components/MobileGuardiansIllustration'

export const GuardiansMainPage = () => {
  const isMobile = useMobileMode()
  const navigate = useNavigate()

  const { days, hours, seconds } = useCountdown(1734548400000)

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
          <Trans i18nKey="Geyser’s <1>mission</1> is to push Bitcoin adoption forward. Geyser Guardians are the defenders of this mission. Their bravery will be rewarded with rare artifacts. Their names shall be remembered in future epochs, and soon, you can become one of them. Enter your email to be notified first–the first 121 Guardians will get a special deal.">
            {'Geyser’s '}

            <Body
              as="span"
              color="primary1.11"
              textDecoration={'underline'}
              onClick={() => navigate(getPath('manifesto'))}
              _hover={{ cursor: 'pointer' }}
            >
              mission
            </Body>

            {
              ' is to push Bitcoin adoption forward. Geyser Guardians are the defenders of this mission. Their bravery will be rewarded with rare artifacts. Their names shall be remembered in future epochs, and soon, you can become one of them. Enter your email to be notified first–the first 121 Guardians will get a special deal.'
            }
          </Trans>{' '}
          <Body as="span">{t('More will be revealed in')}</Body>{' '}
          <Body as="span" bold>
            {t(`${days} days, ${hours} hours, ${toInt(seconds)} seconds.`)}
          </Body>
        </Body>

        <SubscribeGuardians />
      </VStack>
      {isMobile ? <MobileGuardiansIllustration /> : <DesktopGuardiansIllustration />}
    </>
  )
}
