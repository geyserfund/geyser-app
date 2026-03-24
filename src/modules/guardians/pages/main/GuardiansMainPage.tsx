import { Box, Button, HStack, Icon, SimpleGrid, VStack, useColorModeValue } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { PiArrowRight } from 'react-icons/pi'
import type { ReactNode } from 'react'
import { Link as RouterLink } from 'react-router'

import { Head } from '@/config/Head'
import { Body, H2 } from '@/shared/components/typography'
import type { StackProps } from '@chakra-ui/react'
import type { BodyProps } from '@/shared/components/typography/Body'
import { H3 } from '@/shared/components/typography/Heading'
import type { HeaderProps } from '@/shared/components/typography/Heading'
import {
  getPath,
  GuardiansSeoImageUrl,
  GuardiansSeriesOneBackgroundFullHDUrl,
  GuardiansSeriesOneBackgroundMobileUrl,
  GuardiansSeriesOneBackgroundTabUrl,
} from '@/shared/constants'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { VideoPlayer } from '@/shared/molecules/VideoPlayer'
import { fonts, standardPadding } from '@/shared/styles'
import { GuardianType } from '@/types'

import { guardiansTotalSoldCountAtom } from '../../state/guardianUsers.ts'
import { ButtonArray } from './components/ButtonArray.tsx'
import { Copyright } from './components/Copyright'
import { GuardianRewards } from './components/GuardianRewards.tsx'
import { GuardianUsers } from './components/GuardianUsers'
import { Investors } from './components/Investors.tsx'
import { Partners } from './components/Partners.tsx'

const scrollToElement = (elementId: string) => {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

/** Displays the reworked Guardians landing page with merch, impact, and social proof sections. */
export const GuardiansMainPage = () => {
  const totalSoldCount = useAtomValue(guardiansTotalSoldCountAtom)
  const secondaryCtaHoverBg = useColorModeValue('whiteAlpha.120', 'whiteAlpha.140')

  const communityLabel =
    totalSoldCount > 0 ? t('{{count}} Guardians joined', { count: totalSoldCount }) : t('Limited-edition drop live')

  return (
    <>
      <Head
        title={t('Geyser Guardians')}
        description={t(
          'Limited-edition Guardians merch and collectibles. 100% of proceeds go to Geyser Impact Funds to back grassroots Bitcoin adoption projects worldwide.',
        )}
        image={GuardiansSeoImageUrl}
        type="article"
      />

      <VStack w="full" spacing={{ base: 10, lg: 14 }} pt={{ base: 12, md: 14, lg: 16 }} pb={{ base: 16, lg: 24 }}>
        <Box w="full" px={standardPadding}>
          <VStack w="full" maxW={dimensions.guardians.textMaxWidth} mx="auto" spacing={6}>
            <Box w="full" position="relative" overflow="hidden" borderRadius="3xl">
              <Box
                position="absolute"
                inset={0}
                backgroundImage={{
                  base: `url(${GuardiansSeriesOneBackgroundMobileUrl})`,
                  md: `url(${GuardiansSeriesOneBackgroundTabUrl})`,
                  lg: `url(${GuardiansSeriesOneBackgroundFullHDUrl})`,
                }}
                backgroundPosition={{ base: '72% center', lg: 'center top' }}
                backgroundSize="cover"
                backgroundRepeat="no-repeat"
              />
              <Box
                position="absolute"
                inset={0}
                bgGradient={{
                  base: 'linear(to-b, rgba(11, 15, 19, 0.78), rgba(11, 15, 19, 0.92))',
                  lg: 'linear(to-r, rgba(11, 15, 19, 0.92), rgba(11, 15, 19, 0.62), rgba(11, 15, 19, 0.28))',
                }}
              />

              <VStack
                position="relative"
                align="start"
                spacing={4}
                w="full"
                px={{ base: 5, md: 8, xl: 10 }}
                pt={{ base: 5, md: 7, xl: 9 }}
                pb={{ base: 4, md: 5, xl: 6 }}
                minH={{ base: 'auto', xl: '440px' }}
              >
                  <Body
                    size="sm"
                    color="whiteAlpha.800"
                    textTransform="uppercase"
                    letterSpacing="0.12em"
                    fontWeight={700}
                  >
                    {t('Geyser Guardians')}
                  </Body>

                  <H2
                    fontFamily={fonts.cormorant}
                    fontSize={{ base: '44px', md: '60px', xl: '78px' }}
                    lineHeight={0.92}
                    letterSpacing="-0.02em"
                    color="white"
                  >
                    {t('Collect merch that funds Bitcoin adoption')}
                  </H2>

                  <Body size={{ base: 'md', lg: 'lg' }} color="whiteAlpha.900" w="full" lineHeight={1.65}>
                    {t(
                      'Limited-edition merch and collectibles made with top Bitcoin brands. 100% of proceeds go to Geyser Impact Funds to back grassroots adoption projects around the world.',
                    )}
                  </Body>

                  <HStack spacing={3} flexWrap="wrap">
                    <HeroPill>{communityLabel}</HeroPill>
                    <HeroPill>{t('All prices include shipping')}</HeroPill>
                    <HeroPill>{t('Badges, cards, jerseys, tees, and Bitaxe')}</HeroPill>
                  </HStack>

                  <HStack spacing={3} flexWrap="wrap">
                    <Button
                      size="lg"
                      h={{ base: '52px', lg: '58px' }}
                      px={{ base: 6, lg: 7 }}
                      bg="white"
                      color="gray.900"
                      fontWeight={700}
                      rightIcon={<Icon as={PiArrowRight} />}
                      _hover={{ bg: 'whiteAlpha.900', transform: 'translateY(-1px)' }}
                      transition="all 0.2s ease"
                      onClick={() => scrollToElement('guardians-merch')}
                    >
                      {t('Browse the collection')}
                    </Button>
                    <Button
                      as={RouterLink}
                      to={getPath('impactFunds')}
                      size="lg"
                      h={{ base: '52px', lg: '58px' }}
                      px={{ base: 6, lg: 7 }}
                      bg="whiteAlpha.160"
                      color="white"
                      border="1px solid"
                      borderColor="whiteAlpha.300"
                      backdropFilter="blur(18px)"
                      _hover={{ bg: secondaryCtaHoverBg, textDecoration: 'none' }}
                    >
                      {t('Explore Impact Funds')}
                    </Button>
                  </HStack>
              </VStack>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} w="full">
              <InfoCard
                eyebrow={t('What you collect')}
                title={t('Limited-edition drops')}
                description={t(
                  'Own badges, collectible cards, apparel, and hardware from the Guardians series while supporting the mission.',
                )}
              />
              <InfoCard
                eyebrow={t('Where the money goes')}
                title={t('100% to Impact Funds')}
                description={t(
                  'All proceeds from purchases flow into Geyser Impact Funds to help fund grassroots Bitcoin adoption projects around the world.',
                )}
                muted
              />
              <InfoCard
                eyebrow={t('Why it matters')}
                title={t('Fuel the builders on the ground')}
                description={t(
                  'Local educators, organizers, storytellers, and communities need capital to push adoption forward where it actually happens.',
                )}
              />
            </SimpleGrid>
          </VStack>
        </Box>

        <Box w="full" px={standardPadding}>
          <VStack id="guardians-merch" w="full" maxW={dimensions.guardians.textMaxWidth} mx="auto" spacing={6} align="start">
            <VStack align="start" spacing={2} w="full">
              <SectionEyebrow>{t('Shop the collection')}</SectionEyebrow>
              <GuardianHeader fontSize={{ base: '30px', md: '38px', lg: '46px' }}>
                {t('Choose your Guardian drop')}
              </GuardianHeader>
              <GuardianBody fontSize={{ base: '16px', md: '18px', lg: '22px' }}>
                {t('Jump to a category, then pick the reward that matches how you want to support the mission.')}
              </GuardianBody>
            </VStack>
            <ButtonArray />
          </VStack>
        </Box>

        <Box w="full" px={standardPadding}>
          <Box w="full" maxW={dimensions.guardians.textMaxWidth} mx="auto">
            <GuardianRewards />
          </Box>
        </Box>

        <Box w="full" px={standardPadding}>
          <VStack w="full" maxW={dimensions.guardians.textMaxWidth} mx="auto" spacing={6}>
            <SectionCard w="full">
              <VStack align="start" spacing={6} w="full">
                <VStack align="start" spacing={2}>
                  <SectionEyebrow>{t('Community proof')}</SectionEyebrow>
                  <GuardianHeader fontSize={{ base: '32px', md: '40px', lg: '52px' }}>
                    {t('Meet the Guardians community')}
                  </GuardianHeader>
                  <GuardianBody fontSize={{ base: '16px', md: '18px', lg: '22px' }}>
                    {t('Collectors across the ecosystem are already wearing the mission and funding the next wave of adoption.')}
                  </GuardianBody>
                </VStack>

                <VStack w="full" spacing={8} align="start">
                  <GuardianUsers guardian={GuardianType.Legend} size="lg" />
                  <GuardianUsers guardian={GuardianType.King} size="md" />
                  <GuardianUsers guardian={GuardianType.Knight} size="sm" />
                  <GuardianUsers guardian={GuardianType.Warrior} size="sm" />
                </VStack>
              </VStack>
            </SectionCard>

            <SectionCard w="full" muted>
              <VStack align="start" spacing={6} w="full">
                <VStack align="start" spacing={2}>
                  <SectionEyebrow>{t('Creator perspective')}</SectionEyebrow>
                  <GuardianHeader fontSize={{ base: '32px', md: '40px', lg: '52px' }}>
                    {t('Hear from creators on Geyser')}
                  </GuardianHeader>
                  <GuardianBody fontSize={{ base: '16px', md: '18px', lg: '22px' }}>
                    {t('Why creator funding matters and how Geyser helps projects build momentum.')}
                  </GuardianBody>
                </VStack>
                <Box width="100%" borderRadius="xl" overflow="hidden">
                  <VideoPlayer width="100%" height="100%" url="https://www.youtube.com/watch?v=SqNPogWpmAg" />
                </Box>
              </VStack>
            </SectionCard>
          </VStack>
        </Box>

        <Box w="full" px={standardPadding}>
          <VStack w="full" maxW={dimensions.guardians.textMaxWidth} mx="auto" align="start" spacing={4}>
            <VStack align="start" spacing={4} w="full">
              <Body size="xs" textTransform="uppercase" letterSpacing="0.12em" fontWeight={700} color="neutral1.9">
                {t('What your purchase helps fund')}
              </Body>
              <SimpleGrid w="full" columns={{ base: 1, md: 3 }} spacing={4}>
                <ImpactCard
                  title={t('Educators and organizers')}
                  description={t('Grassroots programs, meetups, local communities, and practical onboarding efforts.')}
                />
                <ImpactCard
                  title={t('Media and storytelling')}
                  description={t('Writers, filmmakers, podcasters, and artists translating Bitcoin to new audiences.')}
                />
                <ImpactCard
                  title={t('Tools and infrastructure')}
                  description={t('Open-source software, hardware, and public goods that help adoption compound over time.')}
                />
              </SimpleGrid>
            </VStack>
          </VStack>
        </Box>

        <Box w="full" px={standardPadding}>
          <SimpleGrid w="full" maxW={dimensions.guardians.textMaxWidth} mx="auto" columns={{ base: 1, xl: 2 }} spacing={6}>
            <SectionCard>
              <VStack align="start" spacing={4} w="full">
                <SectionEyebrow>{t('Ecosystem partners')}</SectionEyebrow>
                <GuardianHeader fontSize={{ base: '32px', md: '40px', lg: '52px' }}>{t('Partners')}</GuardianHeader>
                <Partners />
              </VStack>
            </SectionCard>

            <SectionCard muted>
              <VStack align="start" spacing={4} w="full">
                <SectionEyebrow>{t('Mission-aligned backers')}</SectionEyebrow>
                <GuardianHeader fontSize={{ base: '32px', md: '40px', lg: '52px' }}>{t('Investors')}</GuardianHeader>
                <Investors />
              </VStack>
            </SectionCard>
          </SimpleGrid>
        </Box>

        <Box w="full" px={standardPadding}>
          <VStack w="full" maxW={dimensions.guardians.textMaxWidth} mx="auto">
            <Copyright />
          </VStack>
        </Box>
      </VStack>
    </>
  )
}

const HeroPill = ({ children }: { children: ReactNode }) => {
  return (
    <HStack
      px={4}
      py={2}
      borderRadius="full"
      bg="whiteAlpha.160"
      border="1px solid"
      borderColor="whiteAlpha.200"
    >
      <Body size="sm" color="whiteAlpha.900">
        {children}
      </Body>
    </HStack>
  )
}

const InfoCard = ({
  eyebrow,
  title,
  description,
  muted = false,
}: {
  eyebrow: string
  title: string
  description: string
  muted?: boolean
}) => {
  const background = useColorModeValue(muted ? 'gray.50' : 'white', muted ? 'gray.700' : 'gray.800')
  const borderColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.120')

  return (
    <VStack align="start" spacing={3} bg={background} border="1px solid" borderColor={borderColor} borderRadius="2xl" p={5}>
      <Body size="xs" textTransform="uppercase" letterSpacing="0.12em" fontWeight={700} color="neutral1.9">
        {eyebrow}
      </Body>
      <H3 fontSize={{ base: '26px', lg: '32px' }} lineHeight={1}>
        {title}
      </H3>
      <Body size="sm" color="neutral1.10" lineHeight={1.6}>
        {description}
      </Body>
    </VStack>
  )
}

const SectionCard = ({ children, muted = false, ...props }: { children: ReactNode; muted?: boolean } & StackProps) => {
  const background = useColorModeValue(muted ? 'gray.50' : 'white', muted ? 'gray.700' : 'gray.800')
  const borderColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.120')

  return (
    <VStack
      align="start"
      spacing={6}
      bg={background}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="3xl"
      p={{ base: 5, lg: 6 }}
      {...props}
    >
      {children}
    </VStack>
  )
}

const SectionEyebrow = ({ children }: { children: ReactNode }) => {
  return (
    <Body size="xs" textTransform="uppercase" letterSpacing="0.12em" fontWeight={700} color="neutral1.9">
      {children}
    </Body>
  )
}

const ImpactCard = ({ title, description }: { title: string; description: string }) => {
  const background = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.120')

  return (
    <VStack
      align="start"
      spacing={3}
      bg={background}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="2xl"
      p={5}
      h="full"
    >
      <Body size="sm" bold color="neutral1.12">
        {title}
      </Body>
      <Body size="sm" color="neutral1.10">
        {description}
      </Body>
    </VStack>
  )
}

/** Renders a large Guardians section heading with the page typography style. */
export const GuardianHeader = ({ children, ...rest }: HeaderProps) => {
  return (
    <H2 fontSize={{ base: '28px', md: '32px', lg: '56px', xl: '72px' }} fontWeight={600} fontFamily={fonts.cormorant} {...rest}>
      {children}
    </H2>
  )
}

/** Renders a medium Guardians section heading used in the merch catalog. */
export const GuardianSubHeader = ({ children, ...rest }: HeaderProps) => {
  return (
    <H3 fontSize={{ base: '22px', md: '26px', lg: '32px', xl: '40px' }} bold fontFamily={fonts.cormorant} {...rest}>
      {children}
    </H3>
  )
}

/** Renders shared body copy for the Guardians pages. */
export const GuardianBody = ({ children, ...props }: BodyProps) => {
  return (
    <Body fontSize={{ base: '16px', md: '18px', lg: '24px', '3xl': '28px' }} light medium {...props}>
      {children}
    </Body>
  )
}
