import {
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  Link as ChakraLink,
  SimpleGrid,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { t } from 'i18next'
import type { IconType } from 'react-icons'
import { PiArrowRight, PiHandHeart, PiMegaphone, PiRecycle, PiStorefront } from 'react-icons/pi'
import { Link } from 'react-router'

import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2, H3 } from '@/shared/components/typography/Heading.tsx'
import { getPath } from '@/shared/constants/config/routerPaths.ts'
import { ImpactFundsFieldPartnerApplicationUrl } from '@/shared/constants/platform/url.ts'

const CIRCULAR_GRANTS_HERO_IMAGE_URL = '/images/impact-funds/circular-grants-impact-fund.webp'
const AFRIBIT_CASE_STUDY_HERO_IMAGE_URL =
  'https://storage.googleapis.com/geyser-media/impact-funds/afribit-case-study-hero.png'

type MissionPrinciple = {
  description: string
  icon: IconType
  title: string
}

const missionPrinciples: readonly MissionPrinciple[] = [
  {
    icon: PiStorefront,
    title: 'Onboard local businesses',
    description: 'Field Partners identify, verify, and onboard trusted local businesses with clear plans.',
  },
  {
    icon: PiMegaphone,
    title: 'Launch campaigns',
    description: 'Field Partners shape stories, prepare campaign media, and guide each project through reporting.',
  },
  {
    icon: PiRecycle,
    title: 'Let capital flow locally',
    description: 'Field Partners steward Community Funds so voluntary contributions can support the next entrepreneur.',
  },
] as const

type CircularGrantsMissionProps = {
  onSupportImpactFund: () => void
}

/** Explains Geyser's Circular Grant mission and the ways visitors can participate. */
export const CircularGrantsMission = ({ onSupportImpactFund }: CircularGrantsMissionProps) => {
  const missionBg = useColorModeValue('amber.2', 'amber.3')
  const cardBg = useColorModeValue('utils.pbg', 'neutral1.3')
  const mutedBg = useColorModeValue('neutral1.2', 'neutral1.4')
  const supportBg = useColorModeValue('primary1.2', 'primary1.3')
  const borderColor = useColorModeValue('neutral1.5', 'neutral1.6')
  const secondaryText = 'neutralAlpha.11'

  return (
    <VStack w="full" spacing={{ base: 5, lg: 6 }} align="stretch">
      <CardLayout noborder bg={missionBg} borderRadius="3xl" p={{ base: 5, md: 7, lg: 9 }}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 7, lg: 10 }} alignItems="stretch">
          <VStack align="flex-start" spacing={{ base: 5, lg: 6 }} justify="center">
            <HStack spacing={3}>
              <Flex align="center" justify="center" boxSize={10} borderRadius="full" bg="amber.4">
                <Icon as={PiHandHeart} boxSize={5} color="amber.11" aria-hidden />
              </Flex>
              <Body size="sm" bold color="amber.11" textTransform="uppercase" letterSpacing="0.08em">
                {t('Our focus')}
              </Body>
            </HStack>

            <H2 size={{ base: '2xl', lg: '3xl' }} bold sx={{ textWrap: 'balance' }}>
              {t('Geyser is focusing all its efforts on Circular Grants')}
            </H2>

            <VStack spacing={3} align="stretch">
              <Body size={{ base: 'sm', lg: 'md' }} lineHeight="1.6">
                {t(
                  'Circular Grants fund approved local businesses through Field Partners, with no repayment required. When able, recipients can contribute to a Community Fund supporting others.',
                )}
              </Body>
              <Body size={{ base: 'sm', lg: 'md' }} lineHeight="1.6">
                {t(
                  'They address a critical gap where banks are inaccessible and microfinance debt can cause pressure, stigma, trauma and exclusion.',
                )}
              </Body>
              <Body size={{ base: 'sm', lg: 'md' }} lineHeight="1.6">
                {t(
                  'After years building Geyser, we believe Circular Grants are the most direct way to turn Bitcoin’s principles into lasting, positive impact.',
                )}
              </Body>
            </VStack>

            <Button
              as={Link}
              to={getPath('discoveryCircularGrants')}
              size="lg"
              colorScheme="neutral1"
              rightIcon={<Icon as={PiArrowRight} />}
            >
              {t('Learn more about Circular Grants')}
            </Button>
          </VStack>

          <Image
            src={CIRCULAR_GRANTS_HERO_IMAGE_URL}
            alt={t('Geyser Impact Fund Circular Grants community')}
            w="full"
            aspectRatio={1672 / 941}
            objectFit="cover"
            borderRadius="2xl"
            alignSelf="center"
            loading="lazy"
          />
        </SimpleGrid>
      </CardLayout>

      <CardLayout bg={cardBg} borderColor={borderColor} borderRadius="3xl" p={{ base: 5, md: 7, lg: 8 }} spacing={7}>
        <VStack align="flex-start" spacing={3} maxW="820px">
          <H2 size={{ base: '2xl', lg: '3xl' }} bold sx={{ textWrap: 'balance' }}>
            {t('Circular Grants are powered by our Field Partners')}
          </H2>
          <Body size={{ base: 'md', lg: 'lg' }} color={secondaryText} lineHeight="1.6">
            {t(
              'Field Partners identify and onboard possible Circular Grant recipients, manage campaigns from beginning to end, and allocate recirculated community funds responsibly.',
            )}
          </Body>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
          {missionPrinciples.map((principle) => (
            <VStack key={principle.title} align="flex-start" spacing={3} bg={mutedBg} borderRadius="2xl" p={5}>
              <Flex align="center" justify="center" boxSize={10} borderRadius="full" bg="primary1.3">
                <Icon as={principle.icon} boxSize={5} color="primary1.11" aria-hidden />
              </Flex>
              <H3 size={{ base: 'md', lg: 'lg' }} bold>
                {t(principle.title)}
              </H3>
              <Body size="md" color={secondaryText} lineHeight="1.55">
                {t(principle.description)}
              </Body>
            </VStack>
          ))}
        </SimpleGrid>

        <Button
          as={ChakraLink}
          href={ImpactFundsFieldPartnerApplicationUrl}
          isExternal
          alignSelf="flex-start"
          size="lg"
          colorScheme="primary1"
          rightIcon={<Icon as={PiArrowRight} />}
        >
          {t('Become a Field Partner')}
        </Button>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 5, lg: 8 }} alignItems="center">
          <Image
            src={AFRIBIT_CASE_STUDY_HERO_IMAGE_URL}
            alt={t('Afribit Kibera Field Partner case study')}
            w="full"
            h={{ base: '220px', lg: '300px' }}
            objectFit="cover"
            borderRadius="2xl"
          />
          <VStack align="flex-start" spacing={4}>
            <Body size="sm" bold color="primary1.11" textTransform="uppercase" letterSpacing="0.08em">
              {t('Field Partner case study')}
            </Body>
            <H3 size={{ base: 'xl', lg: '2xl' }} bold>
              {t('Afribit Kibera shows the model in motion')}
            </H3>
            <Body size={{ base: 'md', lg: 'lg' }} color={secondaryText} lineHeight="1.6">
              {t('Read how Afribit Kibera is pioneering Circular Grants with Geyser in its local community.')}
            </Body>
            <Button
              as={Link}
              to={getPath('discoveryCircularGrantsAfribitCaseStudy')}
              variant="outline"
              colorScheme="neutral1"
              rightIcon={<Icon as={PiArrowRight} />}
            >
              {t('Read the case study')}
            </Button>
          </VStack>
        </SimpleGrid>
      </CardLayout>

      <CardLayout noborder bg={supportBg} borderRadius="3xl" p={{ base: 5, md: 7, lg: 8 }}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align={{ base: 'flex-start', md: 'center' }}
          justify="space-between"
          gap={{ base: 6, lg: 10 }}
        >
          <HStack align="flex-start" spacing={4} maxW="760px">
            <Flex align="center" justify="center" boxSize={12} borderRadius="full" bg="primary1.4" flexShrink={0}>
              <Icon as={PiHandHeart} boxSize={6} color="primary1.11" aria-hidden />
            </Flex>
            <VStack align="flex-start" spacing={2}>
              <H2 size={{ base: 'xl', lg: '3xl' }} bold>
                {t('Help fund this movement')}
              </H2>
              <Body size={{ base: 'md', lg: 'lg' }} color={secondaryText} lineHeight="1.6">
                {t(
                  'Help us take Geyser from 2 Field Partners and 10 Circular Grants to 12 Field Partners and 24 Circular Grants in 2027!',
                )}
              </Body>
            </VStack>
          </HStack>
          <Button
            size="lg"
            colorScheme="primary1"
            onClick={onSupportImpactFund}
            rightIcon={<Icon as={PiArrowRight} />}
            flexShrink={0}
            w={{ base: 'full', md: 'auto' }}
          >
            {t('Support Geyser Impact Fund')}
          </Button>
        </Flex>
      </CardLayout>
    </VStack>
  )
}
