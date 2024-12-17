import { Box, HStack, Image, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import React from 'react'
import { Trans } from 'react-i18next'

import { Body, H2 } from '@/shared/components/typography'
import { HeaderProps } from '@/shared/components/typography/Heading'
import { dimensions } from '@/shared/constants/components/dimensions'
import { VideoPlayer } from '@/shared/molecules/VideoPlayer'
import { fonts } from '@/shared/styles'
import { GuardianType } from '@/types'
import { useMobileMode } from '@/utils'

import { PartnerUrls } from '../../data'
import { DesktopGuardiansIllustration } from './components/DesktopGuardiansIllustration'
import { GuardianUsers } from './components/GuardianUsers'
import { MobileGuardiansIllustration } from './components/MobileGuardiansIllustration'

export const GuardiansMainPage = () => {
  const isMobile = useMobileMode()

  const textSize = { base: '14px', sm: '16px', md: '18px', lg: '20px', xl: '24px', '3xl': '28px' }

  return (
    <VStack paddingTop={{ base: 16, md: 20, lg: 6 }} paddingBottom={{ base: '60px', lg: 24 }}>
      <VStack
        w="full"
        zIndex={2}
        maxWidth={dimensions.guardians.textMaxWidth}
        fontFamily={fonts.cormorant}
        px={{ base: 3, lg: 6 }}
        spacing={{ base: 2, md: 3, lg: 8 }}
      >
        <Body fontSize={textSize} textAlign={'center'} medium light lineHeight={'1.2'}>
          {t(
            'In a world where nihilism and pessimism about the future prevail, Bitcoin brought us hope. Not just hope for a world built on sound money, but hope in the power of action to create meaningful change. The world is malleable, and individuals have the power to reshape it.',
          )}
        </Body>

        <VStack w="full" spacing={0}>
          <Body size={{ base: '10px', sm: '12px', lg: '16px' }} light fontWeight={600} textTransform={'uppercase'}>
            <Trans
              i18nKey="The first {{count}} guardians get {{discount}} off. {{left}} left."
              values={{ count: 121, discount: '10%', left: 21 }}
            >
              {'The first '}
              <Body as="span" color="guardians.king.text">{`{{count}}`}</Body>
              {' guardians get '}
              <Body as="span" color="guardians.king.text">{`{{discount}}`}</Body>
              {' off. '}
              <Body as="span" color="guardians.king.text">{`{{left}}`}</Body>
              {' left.'}
            </Trans>
          </Body>
          <Body size={textSize} textTransform={'uppercase'} bold muted marginTop="-10px">
            {t('CHOOSE YOUR CHARACTER:')}
          </Body>
        </VStack>
      </VStack>
      {isMobile ? <MobileGuardiansIllustration /> : <DesktopGuardiansIllustration />}
      <VStack
        w="full"
        h="full"
        maxWidth={dimensions.guardians.textMaxWidth}
        px={{ base: 3, lg: 6 }}
        spacing={{ base: '32px', lg: '96px' }}
      >
        <VStack w="full">
          <VStack w="full" spacing={0}>
            <GuardianHeader>{t('Why Geyser')}</GuardianHeader>
            <GuardianBody>{t('Words from creators on Geyser')}</GuardianBody>
          </VStack>
          <Box width="100%" borderRadius={'8px'} overflow={'hidden'}>
            <VideoPlayer width="100%" height="100%" url={'https://www.youtube.com/watch?v=b40BxyZGW2I&t=828s'} />
          </Box>
        </VStack>

        <VStack w="full" spacing={{ base: '16px', lg: '32px' }}>
          <GuardianHeader>{t('Geyser Manifesto')}</GuardianHeader>

          <VStack w="full" alignItems={'flex-start'} spacing={{ base: '16px', lg: '32px' }}>
            <GuardianBody>
              {t(
                'In a world where nihilism and pessimism about the future prevail, Bitcoin brought us hope. Not just hope for a world built on sound money, but hope in the power of action to create meaningful change. The world is malleable, and individuals have the power to reshape it.',
              )}
            </GuardianBody>

            <GuardianBody>
              {t(
                'The Cypherpunks understood this. They didn’t wait for permission—they built the tools of freedom. In 1993, the Cypherpunk Manifesto declared, “Cypherpunks write code.” In 2009, Satoshi Nakamoto released Bitcoin’s code. Bitcoin was born out of action and a will for change.',
              )}
            </GuardianBody>
            <GuardianBody>
              {t(
                'The vision has always been to lay sound foundations for the digital era—moving away from the predetermined path of totalitarian control and censorship, and towards decentralization, openness, freedom, and self-sovereignty. To bring about unimaginable wealth and human flourishing.',
              )}
            </GuardianBody>
            <GuardianBody>
              {t(
                'For Bitcoin’s sound principles to take hold in the world, change must happen at all layers of society. Developers, educators, writers, filmmakers, artists, and entire communities all have a role to play in building the Bitcoin world. No act is too small—small actions compound into global grassroots movements.',
              )}
            </GuardianBody>
            <GuardianBody>
              {t(
                'Bitcoin is a peaceful revolution—but peaceful does not mean passive. It’s time to act. Are you a Bitcoiner? Then you are the protagonist of this story, and the tools are in your hands.',
              )}
            </GuardianBody>
            <GuardianBody>{t('What will you do to help bring about Bitcoin adoption?')}</GuardianBody>
          </VStack>
        </VStack>

        <GuardianUsers guardian={GuardianType.Legend} size="lg" />
        <GuardianUsers guardian={GuardianType.King} size="md" />
        <GuardianUsers guardian={GuardianType.Knight} size="sm" />
        <GuardianUsers guardian={GuardianType.Warrior} size="sm" />

        <VStack w="full" spacing={{ base: '16px', lg: '32px' }}>
          <GuardianHeader>{t('Partners')}</GuardianHeader>
          <VStack spacing={8}>
            <HStack flexWrap={'wrap'} spacing={8} justifyContent={'center'}>
              {PartnerUrls.slice(0, 3).map((url, index) => (
                <Image src={url} alt="Partner" width={'auto'} height={'72px'} objectFit={'cover'} key={url} />
              ))}
            </HStack>
            <HStack flexWrap={'wrap'} spacing={8} justifyContent={'center'}>
              {PartnerUrls.slice(3, 5).map((url, index) => (
                <Image src={url} alt="Partner" width={'auto'} height={'64px'} objectFit={'cover'} key={url} />
              ))}
            </HStack>
            <HStack flexWrap={'wrap'} spacing={8} justifyContent={'center'}>
              {PartnerUrls.slice(5, 9).map((url, index) => (
                <Image src={url} alt="Partner" width={'auto'} height={'32px'} objectFit={'cover'} key={url} />
              ))}
            </HStack>
          </VStack>
        </VStack>
      </VStack>
    </VStack>
  )
}

export const GuardianHeader = ({ children, ...rest }: HeaderProps) => {
  return (
    <H2 fontSize={{ base: '28px', md: '32px', lg: '56px', xl: '72px' }} fontWeight={600} {...rest}>
      {children}
    </H2>
  )
}

export const GuardianBody = ({ children }: { children: React.ReactNode }) => {
  return (
    <Body fontSize={{ base: '16px', md: '18px', lg: '24px', '3xl': '28px' }} light medium>
      {children}
    </Body>
  )
}
