import type { ButtonProps } from '@chakra-ui/react'
import { Button, Flex, Icon, Image, Link as ChakraLink, SimpleGrid, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import type { IconType } from 'react-icons'
import { PiArrowRight, PiMegaphone, PiRecycle, PiStorefront } from 'react-icons/pi'
import { Link } from 'react-router'

import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2, H3 } from '@/shared/components/typography/Heading.tsx'
import { getPath } from '@/shared/constants/config/routerPaths.ts'
import { ImpactFundsFieldPartnerApplicationUrl } from '@/shared/constants/platform/url.ts'
import { standardPadding } from '@/shared/styles/index.ts'

import { ProjectRowLayout } from '../components/ProjectRowLayout.tsx'

const CIRCULAR_GRANTS_FOCUS_IMAGE_URL =
  'https://storage.googleapis.com/geyser-media/impact-funds/geyser-focus-circular-grants-image.png'
const AFRIBIT_CASE_STUDY_HERO_IMAGE_URL =
  'https://storage.googleapis.com/geyser-media/impact-funds/afribit-case-study-hero.png'

/** Shared image ratio so the paired landing feature cards line up. */
export const LANDING_FEATURE_IMAGE_RATIO = 2376 / 1080

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

const LearnMoreButton = (props: ButtonProps) => (
  <Button
    as={Link}
    to={getPath('discoveryCircularGrants')}
    size="lg"
    variant="outline"
    colorScheme="neutral1"
    rightIcon={<Icon as={PiArrowRight} />}
    {...props}
  >
    {t('Learn more about Circular Grants')}
  </Button>
)

const BecomeFieldPartnerButton = (props: ButtonProps) => (
  <Button
    as={ChakraLink}
    href={ImpactFundsFieldPartnerApplicationUrl}
    isExternal
    flexShrink={0}
    size="lg"
    colorScheme="primary1"
    rightIcon={<Icon as={PiArrowRight} />}
    {...props}
  >
    {t('Become a Field Partner')}
  </Button>
)

/** Explains why Geyser focuses on Circular Grants and links to the full explainer. */
export const CircularGrantsFocus = () => {
  return (
    <ProjectRowLayout
      w="full"
      title={t('Geyser is focusing all its efforts on Circular Grants')}
      headerProps={{ gap: 3 }}
      rightContent={<LearnMoreButton display={{ base: 'none', lg: 'inline-flex' }} />}
    >
      <SimpleGrid w="full" columns={{ base: 1, lg: 2 }} spacing={{ base: 6, lg: 12 }} alignItems="start">
        <VStack spacing={3} align="stretch">
          <Body size={{ base: 'md', lg: 'lg' }} dark>
            {t(
              'Circular Grants fund approved local businesses through Field Partners, with no repayment required. When able, recipients can contribute to a Community Fund supporting others.',
            )}
          </Body>
          <Body size="md" light>
            {t(
              'They address a critical gap where banks are inaccessible and microfinance debt can cause pressure, stigma, trauma and exclusion.',
            )}
          </Body>
          <Body size="md" light>
            {t(
              'After years building Geyser, we believe Circular Grants are the most direct way to turn Bitcoin’s principles into lasting, positive impact.',
            )}
          </Body>
        </VStack>

        <Image
          src={CIRCULAR_GRANTS_FOCUS_IMAGE_URL}
          alt={t('Geyser Impact Fund Circular Grants community')}
          w="full"
          aspectRatio={1672 / 941}
          objectFit="cover"
          borderRadius="card"
        />
      </SimpleGrid>
      <LearnMoreButton display={{ base: 'inline-flex', lg: 'none' }} alignSelf="flex-end" />
    </ProjectRowLayout>
  )
}

/** Describes what Field Partners do and invites new partners to apply. */
export const FieldPartnersPanel = () => {
  return (
    <CardLayout w="full" spacing={{ base: 6, lg: 8 }}>
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        align="flex-start"
        justify="space-between"
        gap={{ base: 4, lg: 10 }}
      >
        <VStack align="flex-start" spacing={3} maxW="3xl">
          <H2 size={{ base: 'xl', lg: '2xl' }} bold sx={{ textWrap: 'balance' }}>
            {t('Circular Grants are powered by our Field Partners')}
          </H2>
          <Body size={{ base: 'md', lg: 'lg' }} light>
            {t(
              'Field Partners identify and onboard possible Circular Grant recipients, manage campaigns from beginning to end, and allocate recirculated community funds responsibly.',
            )}
          </Body>
        </VStack>
        <BecomeFieldPartnerButton display={{ base: 'none', lg: 'inline-flex' }} />
      </Flex>

      <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={{ base: 5, lg: 8 }}>
        {missionPrinciples.map((principle) => (
          <VStack key={principle.title} align="flex-start" spacing={2}>
            <Flex align="center" gap={2}>
              <Icon as={principle.icon} boxSize={6} color="primary1.11" flexShrink={0} aria-hidden />
              <H3 size={{ base: 'md', lg: 'lg' }} bold>
                {t(principle.title)}
              </H3>
            </Flex>
            <Body size="md" light>
              {t(principle.description)}
            </Body>
          </VStack>
        ))}
      </SimpleGrid>

      <BecomeFieldPartnerButton display={{ base: 'inline-flex', lg: 'none' }} alignSelf="flex-end" />
    </CardLayout>
  )
}

/** Feature card linking to the Afribit Kibera Field Partner case study. */
export const FieldPartnerCaseStudy = () => {
  return (
    <CardLayout dense w="full" h="full" spacing={0}>
      <Image
        src={AFRIBIT_CASE_STUDY_HERO_IMAGE_URL}
        alt={t('Afribit Kibera Field Partner case study')}
        w="full"
        aspectRatio={LANDING_FEATURE_IMAGE_RATIO}
        objectFit="cover"
        loading="lazy"
      />
      <VStack align="stretch" spacing={3} flex={1} padding={standardPadding}>
        <H2 size={{ base: 'xl', lg: '2xl' }} bold sx={{ textWrap: 'balance' }}>
          {t('Afribit Kibera shows the model in motion')}
        </H2>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align={{ base: 'flex-start', md: 'flex-end' }}
          justify="space-between"
          gap={{ base: 4, md: 6 }}
        >
          <Body size="md" light>
            {t('Read how Afribit Kibera is pioneering Circular Grants with Geyser in its local community.')}
          </Body>
          <Button
            as={Link}
            to={getPath('discoveryCircularGrantsAfribitCaseStudy')}
            flexShrink={0}
            alignSelf={{ base: 'flex-end', md: 'auto' }}
            size="lg"
            variant="outline"
            colorScheme="neutral1"
            rightIcon={<Icon as={PiArrowRight} />}
          >
            {t('Read the case study')}
          </Button>
        </Flex>
      </VStack>
    </CardLayout>
  )
}

type SupportMovementBandProps = {
  onSupportImpactFund: () => void
}

/** Closing call to action that opens the Geyser Impact Fund donation flow. */
export const SupportMovementBand = ({ onSupportImpactFund }: SupportMovementBandProps) => {
  return (
    <CardLayout w="full">
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        align={{ base: 'flex-start', lg: 'center' }}
        justify="space-between"
        gap={{ base: 5, lg: 10 }}
      >
        <VStack align="flex-start" spacing={2} maxW="3xl">
          <H2 size={{ base: 'xl', lg: '2xl' }} bold>
            {t('Help fund this movement')}
          </H2>
          <Body size={{ base: 'md', lg: 'lg' }} light>
            {t(
              'Help us grow from 2 Field Partners and 10 Circular Grants to our target 12 Field Partners and 24 Circular Grants in 2027!',
            )}
          </Body>
        </VStack>
        <Button
          size="lg"
          colorScheme="primary1"
          onClick={onSupportImpactFund}
          rightIcon={<Icon as={PiArrowRight} />}
          flexShrink={0}
          w={{ base: 'full', lg: 'auto' }}
        >
          {t('Support Geyser Impact Fund')}
        </Button>
      </Flex>
    </CardLayout>
  )
}
