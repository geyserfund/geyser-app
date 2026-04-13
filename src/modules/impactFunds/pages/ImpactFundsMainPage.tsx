import {
  Box,
  Button,
  Flex,
  GridItem,
  HStack,
  Icon,
  Image,
  Link as ChakraLink,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Spinner,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { PiArrowRightBold, PiArrowUpRightBold, PiChartBarBold, PiCoinsDuotone, PiScalesBold } from 'react-icons/pi'
import { Link } from 'react-router'

import { Head } from '@/config/Head.tsx'
import { useBTCConverter } from '@/helpers/useBTCConverter.ts'
import { getCommittedAmountDisplay, getSatsAmountDisplay } from '@/modules/impactFunds/utils/formatCommittedAmount.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { getAiSeoPageContent, getPath } from '@/shared/constants'
import { usdRateAtom } from '@/shared/state/btcRateAtom.ts'
import { buildCollectionPageJsonLd } from '@/shared/utils/seo.ts'
import { type ImpactFundsQuery, ProjectSubCategory, useImpactFundsQuery } from '@/types'

import { FundingModelsShowcase } from '../components/FundingModelsShowcase.tsx'
import { ImpactFlowStrip } from '../components/ImpactFlowStrip.tsx'
import { ImpactFundDonationFlowModal } from '../components/ImpactFundDonationFlowModal.tsx'
import { ImpactFundWhyDonateModal } from '../components/ImpactFundWhyDonateModal.tsx'
import { IMPACT_FUNDS_IMAGE_URL } from '../utils/constants.ts'
import { impactFundFundingModelItems, impactFundFundingOverviewItems } from '../utils/informationContent.ts'

const numberFormatter = new Intl.NumberFormat()
const usdFormatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})
const sponsorHighlights = [
  {
    title: t('Commit capital once or annually'),
    description: t('Sponsors help seed the recurring pool of funding that backs high-impact projects on Geyser.'),
    icon: PiCoinsDuotone,
  },
  {
    title: t('Support allocation'),
    description: t('Sponsors take part in the allocation process and help shape how funding is deployed.'),
    icon: PiScalesBold,
  },
  {
    title: t('Track outcomes'),
    description: t('Sponsors receive transparent updates on funded projects, outcomes, and fund performance.'),
    icon: PiChartBarBold,
  },
] as const

const otherFunds = [
  {
    title: t('HRF Bitcoin Development Fund'),
    description: t(
      'Supports individuals and projects that make Bitcoin and related freedom technologies more powerful tools for human rights defenders operating in challenging political environments.',
    ),
    image:
      'https://cdn-ilccclh.nitrocdn.com/NjtqKQHOTztkdEZtWVwhTXMBkDrrjmBI/assets/images/optimized/rev-f9caff8/hrf.org/wp-content/uploads/2024/08/HRF-Logo.png',
    href: 'https://hrf.org/program/financial-freedom/bitcoin-development-fund/',
    imageFit: 'contain' as const,
  },
  {
    title: t('OpenSats'),
    description: t(
      'Funds Bitcoin-related free and open-source projects and associated education and research initiatives through a public charity model.',
    ),
    image: 'https://soapbox.pub/assets/logos/opensats-logo-soapbox.png',
    href: 'https://opensats.org/about',
    imageFit: 'contain' as const,
  },
] as const

const FEATURED_IMPACT_FUND_NAMES = ['latam-impact-fund', 'africa-impact-fund', 'asia-impact-fund'] as const
const SECONDARY_IMPACT_FUND_NAMES = ['europe-impact-fund', 'north-america-impact-fund'] as const
const PRIORITIZED_IMPACT_FUND_NAMES = [...FEATURED_IMPACT_FUND_NAMES, ...SECONDARY_IMPACT_FUND_NAMES] as const
const LATAM_IMPACT_FUND_NAME = 'latam-impact-fund'
const featuredImpactFundNameSet = new Set<string>(FEATURED_IMPACT_FUND_NAMES)
const secondaryImpactFundNameSet = new Set<string>(SECONDARY_IMPACT_FUND_NAMES)
const prioritizedImpactFundNameSet = new Set<string>(PRIORITIZED_IMPACT_FUND_NAMES)

type ImpactFundListItem = ImpactFundsQuery['impactFunds'][number]

type CardCtaProps = {
  href?: string
  isExternal?: boolean
  to?: string
}

function CardCta({ href, isExternal, to }: CardCtaProps): JSX.Element {
  const content = (
    <HStack spacing={1.5}>
      <Body bold color="neutral1.11">
        {t('Learn More')}
      </Body>
      <Icon as={PiArrowRightBold} className="learn-more-arrow" boxSize={4} color="neutral1.11" />
    </HStack>
  )
  const commonProps = {
    size: 'md' as const,
    variant: 'ghost' as const,
    colorScheme: 'neutral1' as const,
    borderRadius: '8px',
    _hover: { bg: 'transparent' },
    sx: {
      '& .learn-more-arrow': {
        opacity: 0,
        transform: 'translateX(-6px)',
        transition: 'all 0.2s',
      },
    },
  }

  if (to) {
    return (
      <Button as={Link} to={to} {...commonProps}>
        {content}
      </Button>
    )
  }

  return (
    <Button as={ChakraLink} href={href} isExternal={isExternal} {...commonProps}>
      {content}
    </Button>
  )
}

type DonateCardCtaProps = {
  to: string
}

function DonateCardCta({ to }: DonateCardCtaProps): JSX.Element {
  return (
    <Button as={Link} to={to} size="lg" variant="solid" colorScheme="amber" borderRadius="8px">
      {t('Donate')}
    </Button>
  )
}

/** Main landing page for browsing live Impact Funds and understanding how the program works. */
export const ImpactFundsMainPage = () => {
  const { data, loading, error } = useImpactFundsQuery()
  const impactFundsSeoContent = getAiSeoPageContent('impactFunds')
  const usdRate = useAtomValue(usdRateAtom)
  const { getUSDAmount, getSatoshisFromUSDCents } = useBTCConverter()
  const donationModal = useDisclosure()
  const whyDonateModal = useDisclosure()
  const pageSpacing = { base: 6, lg: 8 }
  const statCardBg = useColorModeValue('white', 'neutral1.3')
  const statSeparatorColor = useColorModeValue('neutral1.3', 'whiteAlpha.200')
  const statIconBg = useColorModeValue('primary1.100', 'primary1.900')
  const statIconColor = useColorModeValue('primary1.600', 'primary1.300')
  const statPrimaryTextColor = useColorModeValue('neutral1.11', 'neutral1.12')
  const statSubtleColor = useColorModeValue('neutral1.8', 'neutral1.11')
  const cardImageBg = useColorModeValue('neutral1.2', 'neutral1.3')
  const cardSurfaceBg = useColorModeValue('white', 'neutral1.3')
  const sectionPrimaryTextColor = useColorModeValue('neutral1.11', 'neutral1.12')
  const sectionSecondaryTextColor = useColorModeValue('neutral1.9', 'neutral1.11')
  const sectionMutedTextColor = useColorModeValue('neutral1.8', 'neutral1.10')
  const highlightedSurfaceBg = useColorModeValue('primary1.50', 'primary1.900')
  const highlightedSurfaceBorderColor = useColorModeValue('primary1.200', 'primary1.700')
  const partnerSectionBg = useColorModeValue('transparent', 'rgba(18, 19, 19, 0.96)')
  const partnerSectionPrimaryTextColor = useColorModeValue('neutral1.11', 'neutral1.12')
  const partnerSectionSecondaryTextColor = useColorModeValue('neutral1.9', 'neutral1.11')
  const partnerSectionMutedTextColor = useColorModeValue('neutral1.8', 'neutral1.10')
  const sectionCardShadow = '0 4px 14px rgba(15, 23, 42, 0.05)'
  const interactiveCardShadow = '0 4px 14px rgba(15, 23, 42, 0.05)'
  const interactiveCardHoverShadow = '0 10px 24px rgba(15, 23, 42, 0.10)'
  const partnerSectionBgGradient = useColorModeValue(
    'radial-gradient(circle at top left, rgba(251, 211, 141, 0.55), transparent 32%), radial-gradient(circle at top right, rgba(125, 211, 252, 0.4), transparent 28%), linear-gradient(135deg, rgba(255, 247, 237, 1) 0%, rgba(255, 251, 235, 1) 46%, rgba(239, 246, 255, 1) 100%)',
    'radial-gradient(circle at 10% 18%, rgba(249, 115, 22, 0.18), transparent 24%), radial-gradient(circle at 84% 16%, rgba(56, 189, 248, 0.14), transparent 22%), radial-gradient(circle at 55% 100%, rgba(168, 85, 247, 0.08), transparent 30%), linear-gradient(135deg, rgba(18, 19, 19, 0.98) 0%, rgba(25, 27, 31, 0.98) 52%, rgba(17, 22, 28, 0.98) 100%)',
  )
  const partnerSectionBorderColor = useColorModeValue('transparent', 'whiteAlpha.100')
  const partnerSectionHighlightBg = useColorModeValue('whiteAlpha.300', 'rgba(148, 163, 184, 0.14)')
  const noiseOpacity = useColorModeValue(0.18, 0.12)
  const heroSurfaceBg = useColorModeValue('white', 'neutral1.3')
  const heroImagePanelBg = useColorModeValue('neutral1.2', 'neutral1.4')
  const heroLinkColor = useColorModeValue('neutral1.8', 'neutral1.10')

  const pageHead = (
    <Head
      title={impactFundsSeoContent.title}
      description={impactFundsSeoContent.description}
      image={IMPACT_FUNDS_IMAGE_URL}
      keywords={impactFundsSeoContent.keywords}
      url={`https://geyser.fund${getPath('discoveryImpactFunds')}`}
    >
      <script type="application/ld+json">
        {buildCollectionPageJsonLd({
          name: 'Geyser Impact Funds',
          description: impactFundsSeoContent.description,
          path: getPath('discoveryImpactFunds'),
          about: impactFundsSeoContent.about,
          keywords: impactFundsSeoContent.keywords,
          items: [
            {
              name: 'Impact Funds',
              path: getPath('discoveryImpactFunds'),
              description: 'Find Bitcoin-backed impact funds and sponsor programs.',
            },
            {
              name: 'Humanitarian Fundraisers',
              path: getPath('discoveryFundraisersSubCategory', ProjectSubCategory.Humanitarian),
              description: 'Support humanitarian causes backed by bitcoiners worldwide.',
            },
            {
              name: 'New Campaign Ideas',
              path: getPath('discoveryCampaigns'),
              description: 'Discover all-or-nothing campaigns launching new Bitcoin projects.',
            },
          ],
        })}
      </script>
    </Head>
  )

  if (loading) {
    return (
      <VStack align="stretch" spacing={pageSpacing} paddingBottom={8}>
        {pageHead}
        <CardLayout>
          <VStack py={8}>
            <Spinner />
          </VStack>
        </CardLayout>
      </VStack>
    )
  }

  if (error) {
    return (
      <VStack align="stretch" spacing={pageSpacing} paddingBottom={8}>
        {pageHead}
        <CardLayout>
          <Body>{t('Failed to load impact funds.')}</Body>
        </CardLayout>
      </VStack>
    )
  }

  const impactFunds = data?.impactFunds || []
  const getFundAmountDisplay = (fund: ImpactFundListItem) => {
    const committedAmountDisplay = getCommittedAmountDisplay({
      amountCommitted: fund.amountCommitted,
      amountCommittedCurrency: fund.amountCommittedCurrency,
      usdRate,
      getUSDAmount,
      getSatoshisFromUSDCents,
    })
    const awardedAmountDisplay = getSatsAmountDisplay({
      amountSats: fund.metrics.awardedTotalSats,
      usdRate,
      getUSDAmount,
    })

    return fund.amountCommitted === 0 ? awardedAmountDisplay : committedAmountDisplay
  }

  const impactFundsByName = new Map(impactFunds.map((fund) => [fund.name, fund] as const))
  const orderedImpactFunds = [
    ...PRIORITIZED_IMPACT_FUND_NAMES.flatMap((fundName) => {
      const fund = impactFundsByName.get(fundName)
      return fund ? [fund] : []
    }),
    ...impactFunds.filter((fund) => !prioritizedImpactFundNameSet.has(fund.name)),
  ]
  const featuredImpactFunds = orderedImpactFunds.filter((fund) => featuredImpactFundNameSet.has(fund.name))
  const secondaryImpactFunds = orderedImpactFunds.filter((fund) => secondaryImpactFundNameSet.has(fund.name))
  const additionalImpactFunds = orderedImpactFunds.filter(
    (fund) => !featuredImpactFundNameSet.has(fund.name) && !secondaryImpactFundNameSet.has(fund.name),
  )
  const latamImpactFund = featuredImpactFunds.find((fund) => fund.name === LATAM_IMPACT_FUND_NAME)
  const secondaryFeaturedImpactFunds = featuredImpactFunds.filter((fund) => fund.name !== LATAM_IMPACT_FUND_NAME)
  const compactImpactFunds = [...secondaryImpactFunds, ...additionalImpactFunds]
  const heroArtwork = latamImpactFund?.heroImage || IMPACT_FUNDS_IMAGE_URL

  const getImpactFundImageProps = (fundName: string) => {
    if (fundName === 'latam-impact-fund') {
      return {
        objectFit: 'cover' as const,
        objectPosition: 'center',
        transform: { base: 'scale(1.22)', lg: 'scale(1.34)' },
      }
    }

    return {
      objectFit: 'cover' as const,
      objectPosition: 'center',
      transform: { base: 'scale(1.12)', lg: 'scale(1.18)' },
    }
  }

  const renderImpactFundCard = (fund: ImpactFundListItem, variant: 'hero' | 'featured' | 'compact') => {
    const amountDisplay = getFundAmountDisplay(fund)
    const isHero = variant === 'hero'
    const isFeatured = variant === 'featured'
    const isCompact = variant === 'compact'
    const isMobileHorizontalCompact = isCompact && secondaryImpactFundNameSet.has(fund.name)
    const imageProps = getImpactFundImageProps(fund.name)
    const cardImageProps = isCompact
      ? {
          objectFit: 'cover' as const,
          objectPosition: 'center',
          transform: { lg: 'scale(1.06)' },
        }
      : isHero
      ? {
          objectFit: 'cover' as const,
          objectPosition: imageProps.objectPosition,
          transform: imageProps.transform,
        }
      : imageProps

    return (
      <CardLayout
        key={fund.id}
        dense
        noborder
        p={0}
        h="full"
        overflow="hidden"
        borderRadius="12px"
        transition="all 0.25s"
        boxShadow={interactiveCardShadow}
        _hover={{
          transform: 'translateY(-4px)',
          boxShadow: interactiveCardHoverShadow,
          '.learn-more-arrow': {
            opacity: 1,
            transform: 'translateX(0)',
          },
        }}
      >
        <LinkBox w="full" h="full">
          <Flex
            w="full"
            h="full"
            direction={{
              base: isMobileHorizontalCompact ? 'row' : 'column',
              lg: isCompact || isHero ? 'row' : 'column',
            }}
            align="stretch"
            minH={isHero ? { lg: '360px' } : undefined}
          >
            <Box
              h={
                isHero
                  ? { base: '260px', lg: 'auto' }
                  : isFeatured
                  ? { base: '220px', lg: '280px' }
                  : { base: isMobileHorizontalCompact ? 'auto' : '160px', lg: 'auto' }
              }
              w={
                isHero
                  ? { base: 'full', lg: '44%' }
                  : isCompact
                  ? { base: isMobileHorizontalCompact ? '132px' : 'full', lg: '220px' }
                  : 'full'
              }
              minW={
                isHero
                  ? { lg: '44%' }
                  : isCompact
                  ? { base: isMobileHorizontalCompact ? '132px' : undefined, lg: '220px' }
                  : undefined
              }
              bg={cardImageBg}
              overflow="hidden"
              position="relative"
              flexShrink={0}
              alignSelf="stretch"
            >
              {fund.heroImage && (
                <Image
                  src={fund.heroImage}
                  alt={fund.title}
                  w="full"
                  h="full"
                  display="block"
                  objectFit={cardImageProps.objectFit}
                  objectPosition={cardImageProps.objectPosition}
                  transform={cardImageProps.transform}
                />
              )}
            </Box>

            <VStack
              w="full"
              bg={cardSurfaceBg}
              px={6}
              pt={5}
              pb={5}
              align="stretch"
              spacing={4}
              flex={1}
              minH={
                isCompact
                  ? { base: isMobileHorizontalCompact ? '132px' : undefined, lg: '190px' }
                  : isHero
                  ? { lg: '360px' }
                  : undefined
              }
            >
              <Flex
                direction={{ base: isMobileHorizontalCompact ? 'column' : 'column', sm: 'row' }}
                justifyContent="space-between"
                align={{ base: 'start', sm: 'start' }}
                gap={3}
              >
                <H2 size={isHero || isFeatured ? 'xl' : 'lg'} bold lineHeight={1.2} flex={1}>
                  <LinkOverlay as={Link} to={getPath('impactFunds', encodeURIComponent(fund.name))}>
                    {fund.title}
                  </LinkOverlay>
                </H2>

                {amountDisplay && (
                  <VStack
                    align={{ base: 'start', sm: 'end' }}
                    spacing={0}
                    flexShrink={0}
                    bg={highlightedSurfaceBg}
                    borderRadius="lg"
                    px={3}
                    py={2}
                    minW={{ base: 'auto', sm: '140px' }}
                  >
                    <Body
                      size={isHero || isFeatured ? 'md' : 'sm'}
                      bold
                      whiteSpace="nowrap"
                      lineHeight={1.2}
                      textAlign={{ base: 'left', sm: 'right' }}
                      color={sectionPrimaryTextColor}
                    >
                      {amountDisplay.primary}
                    </Body>
                    {amountDisplay.secondary && (
                      <Body
                        size="xs"
                        whiteSpace="nowrap"
                        lineHeight={1.2}
                        textAlign={{ base: 'left', sm: 'right' }}
                        color={sectionMutedTextColor}
                      >
                        {amountDisplay.secondary}
                      </Body>
                    )}
                  </VStack>
                )}
              </Flex>

              <Flex mt="auto" justifyContent="space-between" alignItems="center" gap={4} flexWrap="wrap">
                {isMobileHorizontalCompact ? null : isCompact ? (
                  <HStack spacing={2} align="baseline">
                    <Body size="xs" color={sectionMutedTextColor} textTransform="uppercase" letterSpacing="wide">
                      {t('Projects supported')}
                    </Body>
                    <Body size="sm" bold color={sectionPrimaryTextColor}>
                      {numberFormatter.format(fund.metrics.projectsFundedCount || 0)}
                    </Body>
                  </HStack>
                ) : (
                  <VStack align="start" spacing={0}>
                    <Body size="xs" color={sectionMutedTextColor} textTransform="uppercase" letterSpacing="wide">
                      {t('Projects supported')}
                    </Body>
                    <Body size={isHero || isFeatured ? 'md' : 'sm'} bold color={sectionPrimaryTextColor}>
                      {numberFormatter.format(fund.metrics.projectsFundedCount || 0)}
                    </Body>
                  </VStack>
                )}
                <HStack ml="auto" spacing={2} flexShrink={0} flexWrap="wrap" justifyContent="flex-end">
                  <CardCta to={getPath('impactFunds', encodeURIComponent(fund.name))} />
                  {fund.donateProject?.name ? (
                    <DonateCardCta to={`${getPath('projectFunding', fund.donateProject.name)}?mode=recurring`} />
                  ) : null}
                </HStack>
              </Flex>
            </VStack>
          </Flex>
        </LinkBox>
      </CardLayout>
    )
  }

  const totalDistributedSats = impactFunds.reduce((total, fund) => total + (fund.metrics.awardedTotalSats || 0), 0)
  const totalProjectsFunded = impactFunds.reduce((total, fund) => total + (fund.metrics.projectsFundedCount || 0), 0)
  const totalDistributedUsd =
    usdRate > 0 ? usdFormatter.format(getUSDAmount(totalDistributedSats as Parameters<typeof getUSDAmount>[0])) : null

  return (
    <VStack align="stretch" spacing={pageSpacing} paddingBottom={8}>
      {pageHead}

      <CardLayout
        w="full"
        dense
        spacing={6}
        alignItems="stretch"
        noborder
        bg={heroSurfaceBg}
        borderRadius="2xl"
        overflow="hidden"
        position="relative"
      >
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          align={{ base: 'stretch', lg: 'center' }}
          justify="space-between"
          gap={{ base: 6, lg: 8 }}
          position="relative"
          minH={{ base: '320px', lg: '280px' }}
          py={{ base: 2, lg: 3 }}
        >
          <VStack
            align="stretch"
            spacing={2}
            flex={1}
            maxW={{ lg: '560px' }}
            alignSelf={{ lg: 'stretch' }}
            pt={{ base: 7, lg: 8 }}
          >
            <H2 size="4xl" bold lineHeight={1.1} mb={2}>
              {t('Support impactful Bitcoin projects worldwide')}
            </H2>
            <Body size="md" color={sectionSecondaryTextColor} maxW="2xl">
              {t(
                'Impact Funds combine committed sponsor capital with a transparent process for selecting and supporting small to medium size projects in the Bitcoin ecosystem.',
              )}
            </Body>
            <VStack align="flex-start" spacing={1} mt={6}>
              <Button
                size="lg"
                colorScheme="amber"
                onClick={donationModal.onOpen}
                fontWeight="bold"
                h="52px"
                px={8}
                borderRadius="8px"
              >
                {t('Donate to an Impact Fund')}
              </Button>

              <Box as="button" type="button" textAlign="left" onClick={whyDonateModal.onOpen}>
                <Body size="sm" color={heroLinkColor} textDecoration="underline">
                  {t('Why donate to an Impact Fund?')}
                </Body>
              </Box>
            </VStack>
          </VStack>

          <Flex flex={1} justify={{ base: 'center', lg: 'flex-end' }} align="center">
            <Box
              w={{ base: 'full', sm: '440px', lg: '520px' }}
              maxW="full"
              h={{ base: '260px', sm: '300px', lg: '360px' }}
              position="relative"
              bg={heroImagePanelBg}
              borderRadius="xl"
              overflow="hidden"
            >
              <Image
                src={heroArtwork}
                alt={t('Impact fund hero artwork')}
                w="full"
                h="full"
                objectFit="contain"
                objectPosition="center"
                transform={{ base: 'scale(1.05)', lg: 'scale(1.08)' }}
              />
            </Box>
          </Flex>
        </Flex>

        <ImpactFlowStrip />
      </CardLayout>

      <VStack align="stretch" spacing={8}>
        <VStack align="start" spacing={2}>
          <H2 size="xl" bold>
            {t('Proven Impact you can verify')}
          </H2>
          <Body size="md" color={sectionSecondaryTextColor}>
            {t('Geyser has been funding Bitcoin projects around the world since 2021.')}
          </Body>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4} alignItems="stretch">
          <GridItem colSpan={{ base: 1, md: 2 }} display="flex">
            <HStack
              align="stretch"
              spacing={0}
              bg={statCardBg}
              borderRadius="xl"
              boxShadow={sectionCardShadow}
              overflow="hidden"
              h="100%"
              w="100%"
            >
              <VStack align="start" spacing={1} p={5} flex={1.6}>
                <H2 size="2xl" bold lineHeight={1.1} color={statPrimaryTextColor}>
                  {`${numberFormatter.format(totalDistributedSats)} sats`}
                </H2>
                <HStack spacing={2} align="baseline">
                  <Body size="sm" color={statSubtleColor} fontWeight="medium">
                    {t('Total distributed')}
                  </Body>
                  {totalDistributedUsd && (
                    <Body size="xs" color={statSubtleColor}>
                      {totalDistributedUsd}
                    </Body>
                  )}
                </HStack>
              </VStack>

              <Box w="1px" bg={statSeparatorColor} flexShrink={0} my={4} />

              <VStack align="start" spacing={1} p={5} flex={1}>
                <H2 size="2xl" bold lineHeight={1.1} color={statPrimaryTextColor}>
                  {numberFormatter.format(totalProjectsFunded)}
                </H2>
                <Body size="sm" color={statSubtleColor} fontWeight="medium">
                  {t('Projects funded')}
                </Body>
              </VStack>
            </HStack>
          </GridItem>

          <VStack
            align="start"
            spacing={1}
            p={5}
            bg={statCardBg}
            borderRadius="xl"
            boxShadow={sectionCardShadow}
            h="100%"
          >
            <HStack spacing={2} align="baseline">
              <H2 size="2xl" bold lineHeight={1.1} color={statPrimaryTextColor}>
                {t('2021')}
              </H2>
              <Body size="sm" color={statSubtleColor} fontWeight="medium">
                {t('Active since')}
              </Body>
            </HStack>
            <Body size="sm" color={statSubtleColor}>
              {t('4+ years supporting projects')}
            </Body>
          </VStack>

          <VStack
            align="start"
            spacing={1}
            p={5}
            bg={statCardBg}
            borderRadius="xl"
            boxShadow={sectionCardShadow}
            h="100%"
          >
            <H2 size="2xl" bold lineHeight={1.1} color={statPrimaryTextColor}>
              {t('5 regions')}
            </H2>
            <Body size="sm" color={statSubtleColor}>
              {t('Impact funds across 5 regions')}
            </Body>
          </VStack>
        </SimpleGrid>
      </VStack>

      {impactFunds.length > 0 ? (
        <VStack align="stretch" spacing={6}>
          <VStack align="stretch" spacing={2}>
            <H2 size="xl" bold>
              {t('Regional Impact Funds')}
            </H2>

            <Body color={sectionSecondaryTextColor}>{t('Explore region-led pools of capital on Geyser.')}</Body>

            <Body size="sm" color={sectionSecondaryTextColor}>
              {t(
                'The following funds are actively accepting applications and have committed capital ready for deployment.',
              )}
            </Body>
          </VStack>

          {latamImpactFund && renderImpactFundCard(latamImpactFund, 'hero')}

          {secondaryFeaturedImpactFunds.length > 0 && (
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
              {secondaryFeaturedImpactFunds.map((fund) => renderImpactFundCard(fund, 'featured'))}
            </SimpleGrid>
          )}

          {compactImpactFunds.length > 0 && (
            <VStack align="stretch" spacing={4}>
              <Body size="sm" color={sectionSecondaryTextColor}>
                {t('The following funds are not currently allocating capital.')}
              </Body>

              <SimpleGrid columns={1} spacing={5}>
                {compactImpactFunds.map((fund) => renderImpactFundCard(fund, 'compact'))}
              </SimpleGrid>
            </VStack>
          )}
        </VStack>
      ) : (
        <CardLayout>
          <Body>{t('No live impact funds yet.')}</Body>
        </CardLayout>
      )}

      <VStack align="stretch" spacing={6}>
        <H2 size="xl" bold>
          {t('How Are Funds Distributed')}
        </H2>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
          {impactFundFundingOverviewItems.map((item) => (
            <Box key={item.title} p={5} bg={cardSurfaceBg} borderRadius="xl" boxShadow={sectionCardShadow}>
              <HStack align="start" spacing={4}>
                <Flex
                  w="42px"
                  h="42px"
                  borderRadius="md"
                  bg={statIconBg}
                  align="center"
                  justify="center"
                  flexShrink={0}
                >
                  <Icon as={item.icon} boxSize={5} color={statIconColor} />
                </Flex>
                <VStack align="stretch" spacing={1}>
                  <Body bold color={sectionPrimaryTextColor}>
                    {item.title}
                  </Body>
                  <Body size="sm" color={sectionSecondaryTextColor}>
                    {item.description}
                  </Body>
                </VStack>
              </HStack>
            </Box>
          ))}
        </SimpleGrid>

        <VStack id="impact-fund-funding-models" align="stretch" spacing={3} pt={2}>
          <H2 size="lg" bold color={sectionSecondaryTextColor}>
            {t('Funding Models')}
          </H2>
          <Body size="sm" color={sectionSecondaryTextColor} maxW="3xl">
            {t(
              'The funds are deployed using different models, based on the type of initiative and the amount to distribute.',
            )}
          </Body>
          <FundingModelsShowcase
            items={impactFundFundingModelItems}
            surfaceBg={cardSurfaceBg}
            primaryTextColor={sectionPrimaryTextColor}
            secondaryTextColor={sectionSecondaryTextColor}
            mutedTextColor={sectionMutedTextColor}
            highlightedSurfaceBg={highlightedSurfaceBg}
            highlightedSurfaceBorderColor={highlightedSurfaceBorderColor}
            noiseOpacity={noiseOpacity}
          />
        </VStack>
      </VStack>

      <Box
        bg={partnerSectionBg}
        bgImage={partnerSectionBgGradient}
        borderRadius="2xl"
        borderWidth="1px"
        borderColor={partnerSectionBorderColor}
        px={{ base: 5, md: 7 }}
        py={{ base: 6, md: 7 }}
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          right={{ base: -8, md: -10 }}
          top={{ base: -10, md: -12 }}
          boxSize={{ base: '120px', md: '180px' }}
          borderRadius="full"
          bg={partnerSectionHighlightBg}
          filter="blur(18px)"
          pointerEvents="none"
        />
        <Box position="absolute" inset={0} pointerEvents="none" opacity={noiseOpacity} overflow="hidden">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <filter id="partnerNoise">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#partnerNoise)" />
          </svg>
        </Box>
        <VStack align="stretch" spacing={3} position="relative">
          <VStack align="stretch" spacing={1}>
            <Flex
              direction={{ base: 'column', md: 'row' }}
              justify="space-between"
              align={{ base: 'stretch', md: 'center' }}
              gap={2}
            >
              <H2 size="xl" bold>
                {t('Become an Impact Fund Partner')}
              </H2>
              <Button
                as={ChakraLink}
                href="https://cal.com/metamick/thirtymin?overlayCalendar=true"
                isExternal
                size="lg"
                variant="solid"
                colorScheme="neutral1"
                alignSelf={{ base: 'stretch', md: 'auto' }}
                rightIcon={<Icon as={PiArrowUpRightBold} />}
                bg={cardSurfaceBg}
                color={partnerSectionPrimaryTextColor}
                boxShadow="0 8px 20px rgba(15, 23, 42, 0.10)"
                _hover={{
                  bg: 'white',
                  color: partnerSectionPrimaryTextColor,
                  transform: 'translateY(-1px)',
                  boxShadow: '0 12px 24px rgba(15, 23, 42, 0.14)',
                }}
              >
                {t('Schedule a call')}
              </Button>
            </Flex>
            <Body color={partnerSectionSecondaryTextColor}>
              {t(
                'Sponsors make meaningful commitments to an Impact Fund, help guide allocation, and expand the number of projects we can support.',
              )}
            </Body>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
            {sponsorHighlights.map((item) => (
              <Box key={item.title} p={5} bg={cardSurfaceBg} borderRadius="xl">
                <HStack align="start" spacing={4}>
                  <Flex
                    w="42px"
                    h="42px"
                    borderRadius="md"
                    bg={statIconBg}
                    align="center"
                    justify="center"
                    flexShrink={0}
                  >
                    <Icon as={item.icon} boxSize={5} color={statIconColor} />
                  </Flex>
                  <VStack align="stretch" spacing={1}>
                    <Body bold color={partnerSectionPrimaryTextColor}>
                      {item.title}
                    </Body>
                    <Body size="sm" color={partnerSectionSecondaryTextColor}>
                      {item.description}
                    </Body>
                  </VStack>
                </HStack>
              </Box>
            ))}
          </SimpleGrid>

          <Box p={{ base: 2, md: 2.5 }} bg={highlightedSurfaceBg} borderRadius="xl">
            <Flex direction="row" justify="flex-start" align="center" gap={1}>
              <Body size="sm" color={partnerSectionMutedTextColor}>
                {t('You can also reach out to us directly at')}{' '}
                <ChakraLink
                  href="mailto:hello@geyser.fund"
                  color={partnerSectionPrimaryTextColor}
                  textDecoration="underline"
                >
                  hello@geyser.fund
                </ChakraLink>
              </Body>
            </Flex>
          </Box>
        </VStack>
      </Box>

      <VStack align="stretch" spacing={6}>
        <VStack align="stretch" spacing={2}>
          <H2 size="xl" bold>
            {t('Other Funds')}
          </H2>
          <Body color={sectionSecondaryTextColor}>
            {t(
              'Impact Funds are focused on distributing smaller amounts to a large number of projects. However, sometimes, projects require larger funding. Below we list other funds that can provide funding for those projects in the Bitcoin space.',
            )}
          </Body>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {otherFunds.map((fund) => (
            <Box
              key={fund.title}
              bg={cardSurfaceBg}
              borderRadius="xl"
              overflow="hidden"
              transition="all 0.25s"
              boxShadow={interactiveCardShadow}
              _hover={{
                transform: 'translateY(-4px)',
                boxShadow: interactiveCardHoverShadow,
                '.learn-more-arrow': {
                  opacity: 1,
                  transform: 'translateX(0)',
                },
              }}
            >
              <LinkBox h="full">
                <VStack h="full" align="stretch" spacing={0}>
                  <Box h={{ base: '220px', lg: '260px' }} bg={cardImageBg} overflow="hidden" p={6}>
                    <Image
                      src={fund.image}
                      alt={fund.title}
                      w="full"
                      h="full"
                      objectFit={fund.imageFit}
                      objectPosition="center"
                    />
                  </Box>
                  <VStack align="stretch" spacing={4} p={6} flex={1}>
                    <VStack align="stretch" spacing={2}>
                      <H2 size="lg" bold lineHeight={1.2}>
                        <LinkOverlay as={ChakraLink} href={fund.href} isExternal>
                          {fund.title}
                        </LinkOverlay>
                      </H2>
                      <Body size="sm" color={sectionSecondaryTextColor}>
                        {fund.description}
                      </Body>
                    </VStack>
                    <Box mt="auto" display="flex" justifyContent="flex-end">
                      <CardCta href={fund.href} isExternal />
                    </Box>
                  </VStack>
                </VStack>
              </LinkBox>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>

      <ImpactFundDonationFlowModal
        impactFunds={orderedImpactFunds}
        isOpen={donationModal.isOpen}
        onClose={donationModal.onClose}
      />
      <ImpactFundWhyDonateModal isOpen={whyDonateModal.isOpen} onClose={whyDonateModal.onClose} />
    </VStack>
  )
}
