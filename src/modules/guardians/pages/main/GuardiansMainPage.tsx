import { Box, HStack, Image, Link, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { Trans } from 'react-i18next'

import { Head } from '@/config/Head'
import { Body, H2 } from '@/shared/components/typography'
import { BodyProps } from '@/shared/components/typography/Body'
import { HeaderProps } from '@/shared/components/typography/Heading'
import { GuardiansSeoImageUrl } from '@/shared/constants'
import { dimensions } from '@/shared/constants/components/dimensions'
import { VideoPlayer } from '@/shared/molecules/VideoPlayer'
import { fonts } from '@/shared/styles'
import { GuardianType } from '@/types'
import { useMobileMode } from '@/utils'

import { PartnerUrls } from '../../data'
import { guardianRewardsDiscountItemsAtom } from '../../state/guardianRewards'
import { Copyright } from './components/Copyright'
import { DesktopGuardiansIllustration } from './components/DesktopGuardiansIllustration'
import { GuardianUsers } from './components/GuardianUsers'
import { MobileGuardiansIllustration } from './components/MobileGuardiansIllustration'

export const GuardiansMainPage = () => {
  const isMobile = useMobileMode()

  const textSize = { base: '16px', sm: '18px', md: '20x', lg: '22px', xl: '24px', '3xl': '28px' }
  const ctaTextSize = { base: '14px', sm: '20px', md: '22x', lg: '24px', xl: '28px', '3xl': '32px' }

  const guardianDiscountItems = useAtomValue(guardianRewardsDiscountItemsAtom)

  return (
    <>
      <Head
        title={t('Geyser Guardians')}
        description={t(
          'Geyser Guardians play a vital role in bitcoin adoption. By becoming a Guardian, you directly fund creator grants and receive exclusive perks in return.',
        )}
        image={GuardiansSeoImageUrl}
        type="article"
      />
      <VStack w="full" paddingTop={{ base: 16, md: 20, lg: 6 }} paddingBottom={{ base: '60px', lg: 24 }}>
        <VStack
          w="full"
          zIndex={2}
          maxWidth={dimensions.guardians.textMaxWidth}
          fontFamily={fonts.cormorant}
          px={{ base: 3, lg: 6 }}
          spacing={{ base: 2, md: 3, lg: 6 }}
        >
          <VStack w="full" spacing={0}>
            <Body fontSize={textSize} textAlign={'center'} medium light lineHeight={'1.2'}>
              {t(
                'Bitcoin adoption still has a long way to go, and Bitcoin creators are working tirelessly to bring that vision to life. Geyser’s mission is to support these creators and empower them to push Bitcoin adoption forward. Geyser Guardians play a vital role in this mission. By becoming a Guardian, you directly fund creator grants and receive exclusive perks in return.',
              )}
            </Body>
            <Body fontSize={textSize} textAlign={'center'} medium light lineHeight={'1.2'}>
              {t('Become a Guardian now!')}
            </Body>
          </VStack>

          <VStack w="full" spacing={0}>
            <Body
              size={{ base: '16px', md: '18px', lg: '20px' }}
              light
              fontWeight={700}
              textTransform={'uppercase'}
              color="error.9"
            >
              <Trans
                i18nKey="The first {{count}} guardians get {{discount}} off. {{left}} left."
                values={{ count: 121, discount: '10%', left: guardianDiscountItems }}
              >
                {'The first '}
                <Body as="span" color="guardians.LEGEND.text">{`{{count}}`}</Body>
                {' guardians get '}
                <Body as="span" color="guardians.LEGEND.text">{`{{discount}}`}</Body>
                {' off. '}
                <Body as="span" color="guardians.LEGEND.text">{`{{left}}`}</Body>
                {' left.'}
              </Trans>
            </Body>
            <Body size={ctaTextSize} textTransform={'uppercase'} bold light marginTop={{ base: '-6px', lg: '-10px' }}>
              {t('Select a character to explore perks')}
            </Body>
          </VStack>
        </VStack>
        {isMobile ? <MobileGuardiansIllustration /> : <DesktopGuardiansIllustration />}
        <VStack
          w="full"
          h="full"
          maxWidth={dimensions.guardians.textMaxWidth}
          spacing={{ base: '32px', lg: '96px' }}
          px={{ base: 3, lg: 6 }}
        >
          <VStack w="full">
            <VStack w="full" spacing={0}>
              <GuardianHeader>{t('Why Geyser')}</GuardianHeader>
              <GuardianBody>{t('Words from creators on Geyser')}</GuardianBody>
            </VStack>
            <Box width="100%" borderRadius={'8px'} overflow={'hidden'}>
              <VideoPlayer width="100%" height="100%" url={'https://www.youtube.com/watch?v=SqNPogWpmAg'} />
            </Box>
          </VStack>
          <VStack w="full" spacing={{ base: '16px', lg: '32px' }}>
            <GuardianHeader>{t('Geyser Manifesto')}</GuardianHeader>

            <VStack w="full" maxWidth={'full'} alignItems={'flex-start'} spacing={{ base: '16px', lg: '32px' }}>
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

              <VStack alignItems={'flex-start'}>
                <GuardianBody medium>{t('- Geyser Team')}</GuardianBody>
                <HStack>
                  <GuardianBody textDecoration={'underline'} medium as={Link} href={'https://twitter.com/metamick14'}>
                    {t('Metamick')}
                  </GuardianBody>
                  <GuardianBody textDecoration={'underline'} medium as={Link} href={'https://x.com/steliosrammos'}>
                    {t('Stelios')}
                  </GuardianBody>
                  <GuardianBody textDecoration={'underline'} medium as={Link} href={'https://x.com/sajald77'}>
                    {t('Sajal')}
                  </GuardianBody>
                  <GuardianBody textDecoration={'underline'} medium as={Link} href={'https://primal.net/vladimir'}>
                    {t('Vlad')}
                  </GuardianBody>
                </HStack>
              </VStack>
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
                {PartnerUrls.slice(0, 3).map((partner, index) => (
                  <Link href={partner.link} isExternal key={partner.image}>
                    <Image
                      src={partner.image}
                      alt="Partner"
                      maxWidth="300px"
                      width={'auto'}
                      height={'72px'}
                      objectFit={'contain'}
                      key={partner.image}
                    />
                  </Link>
                ))}
              </HStack>

              <HStack flexWrap={'wrap'} spacing={8} justifyContent={'center'}>
                {PartnerUrls.slice(3, 9).map((partner, index) => (
                  <Link href={partner.link} isExternal key={partner.image}>
                    <Image
                      src={partner.image}
                      alt="Partner"
                      maxWidth="150px"
                      width={'auto'}
                      height={'32px'}
                      objectFit={'contain'}
                      key={partner.image}
                    />
                  </Link>
                ))}
              </HStack>
            </VStack>
          </VStack>
          <Copyright />
        </VStack>
      </VStack>
    </>
  )
}

export const GuardianHeader = ({ children, ...rest }: HeaderProps) => {
  return (
    <H2 fontSize={{ base: '28px', md: '32px', lg: '56px', xl: '72px' }} fontWeight={600} {...rest}>
      {children}
    </H2>
  )
}

export const GuardianBody = ({ children, ...props }: BodyProps) => {
  return (
    <Body fontSize={{ base: '16px', md: '18px', lg: '24px', '3xl': '28px' }} light medium {...props}>
      {children}
    </Body>
  )
}
