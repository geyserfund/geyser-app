import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  Link as ChakraLink,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Spinner,
  useColorModeValue,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import {
  PiArrowRightBold,
  PiArrowUpRightBold,
  PiCalendarBold,
  PiChartBarBold,
  PiCoinsDuotone,
  PiHouse,
  PiRocketLaunchDuotone,
  PiScalesBold,
} from 'react-icons/pi'
import { Link } from 'react-router'

import { Head } from '@/config/Head.tsx'
import { useBTCConverter } from '@/helpers/useBTCConverter.ts'
import { getCommittedAmountDisplay, getSatsAmountDisplay } from '@/modules/impactFunds/utils/formatCommittedAmount.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { getPath } from '@/shared/constants'
import { usdRateAtom } from '@/shared/state/btcRateAtom.ts'
import { type ImpactFundsQuery, ImpactFundSponsorTier, useImpactFundsQuery } from '@/types'

import { FundingModelsShowcase } from '../components/FundingModelsShowcase.tsx'
import { ImpactFlowStrip } from '../components/ImpactFlowStrip.tsx'
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

const LATAM_IMPACT_FUND_NAME = 'latam-impact-fund'

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

/** Main landing page for browsing live Impact Funds and understanding how the program works. */
export const ImpactFundsMainPage = () => {
  const { data, loading, error } = useImpactFundsQuery()
  const usdRate = useAtomValue(usdRateAtom)
  const { getUSDAmount, getSatoshisFromUSDCents } = useBTCConverter()
  const pageSpacing = { base: 6, lg: 8 }
  const statMutedBg = useColorModeValue('neutral1.2', 'neutral1.2')
  const statIconBg = useColorModeValue('primary1.100', 'primary1.900')
  const statIconColor = useColorModeValue('primary1.600', 'primary1.300')
  const statPrimaryTextColor = useColorModeValue('neutral1.11', 'neutral1.12')
  const statSubtleColor = useColorModeValue('neutral1.8', 'neutral1.11')
  const statTertiaryColor = useColorModeValue('neutral1.7', 'neutral1.10')
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

  const pageHead = (
    <Head
      title={t('Impact Funds')}
      description={t('Support and apply to Geyser Impact Funds.')}
      image={IMPACT_FUNDS_IMAGE_URL}
    />
  )

  if (loading) {
    return (
      <VStack align="stretch" spacing={pageSpacing} paddingTop={{ base: 2, lg: 6 }} paddingBottom={8}>
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
      <VStack align="stretch" spacing={pageSpacing} paddingTop={{ base: 2, lg: 6 }} paddingBottom={8}>
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

  const totalDistributedSats = impactFunds.reduce((total, fund) => total + (fund.metrics.awardedTotalSats || 0), 0)
  const totalProjectsFunded = impactFunds.reduce((total, fund) => total + (fund.metrics.projectsFundedCount || 0), 0)
  const totalDistributedUsd =
    usdRate > 0 ? usdFormatter.format(getUSDAmount(totalDistributedSats as Parameters<typeof getUSDAmount>[0])) : null

  return (
    <VStack align="stretch" spacing={pageSpacing} paddingTop={{ base: 2, lg: 6 }} paddingBottom={8}>
      {pageHead}

      <VStack w="full" gap={4} alignItems="start">
        <HStack w="full" justifyContent="space-between" alignItems="start">
          <VStack gap={0} alignItems="start">
            <H2 size={{ base: 'xl', lg: '3xl' }} bold>
              {t('Impact Funds')}
            </H2>
            <Body size="md" textAlign="start">
              {t(
                'Impact Funds combine committed sponsor capital with a transparent process for selecting and supporting small to medium size projects in the Bitcoin ecosystem.',
              )}
            </Body>
          </VStack>
          <Button
            as={Link}
            to={getPath('discoveryLanding')}
            variant="ghost"
            colorScheme="neutral1"
            size="lg"
            leftIcon={<Icon as={PiHouse} />}
          >
            {t('Home')}
          </Button>
        </HStack>

        <ImpactFlowStrip />
      </VStack>

      <VStack align="stretch" spacing={4}>
        <H2 size="xl" bold>
          {t('Achieved so far')}
        </H2>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
          <Box p={6} bg={statMutedBg} borderRadius="lg">
            <HStack spacing={4}>
              <Flex
                w="48px"
                h="48px"
                flexShrink={0}
                borderRadius="lg"
                alignItems="center"
                justifyContent="center"
                bg={statIconBg}
              >
                <Icon as={PiCoinsDuotone} boxSize={6} color={statIconColor} />
              </Flex>
              <VStack align="start" spacing={0}>
                <HStack spacing={2} align="baseline">
                  <H2 size="xl" bold lineHeight={1.2} color={statPrimaryTextColor}>
                    {`${numberFormatter.format(totalDistributedSats)} sats`}
                  </H2>
                  {totalDistributedUsd && (
                    <Body size="xs" color={statTertiaryColor}>
                      {totalDistributedUsd}
                    </Body>
                  )}
                </HStack>
                <Body
                  size="xs"
                  fontSize={{ base: '10px', md: '12px' }}
                  color={statSubtleColor}
                  textTransform="uppercase"
                  letterSpacing="wide"
                  fontWeight="medium"
                  noOfLines={1}
                  whiteSpace="nowrap"
                >
                  {t('Total distributed')}
                </Body>
              </VStack>
            </HStack>
          </Box>
          <Box p={6} bg={statMutedBg} borderRadius="lg">
            <HStack spacing={4}>
              <Flex
                w="48px"
                h="48px"
                flexShrink={0}
                borderRadius="lg"
                alignItems="center"
                justifyContent="center"
                bg={statIconBg}
              >
                <Icon as={PiRocketLaunchDuotone} boxSize={6} color={statIconColor} />
              </Flex>
              <VStack align="start" spacing={0}>
                <H2 size="xl" bold lineHeight={1.2} color={statPrimaryTextColor}>
                  {numberFormatter.format(totalProjectsFunded)}
                </H2>
                <Body
                  size="xs"
                  fontSize={{ base: '10px', md: '12px' }}
                  color={statSubtleColor}
                  textTransform="uppercase"
                  letterSpacing="wide"
                  fontWeight="medium"
                  noOfLines={1}
                  whiteSpace="nowrap"
                >
                  {t('Total funded projects')}
                </Body>
              </VStack>
            </HStack>
          </Box>
          <Box p={6} bg={statMutedBg} borderRadius="lg">
            <HStack spacing={4}>
              <Flex
                w="48px"
                h="48px"
                flexShrink={0}
                borderRadius="lg"
                alignItems="center"
                justifyContent="center"
                bg={statIconBg}
              >
                <Icon as={PiCalendarBold} boxSize={6} color={statIconColor} />
              </Flex>
              <VStack align="start" spacing={0}>
                <H2 size="xl" bold lineHeight={1.2} color={statPrimaryTextColor}>
                  {t('4+ years')}
                </H2>
                <Body
                  size="xs"
                  fontSize={{ base: '10px', md: '12px' }}
                  color={statSubtleColor}
                  textTransform="uppercase"
                  letterSpacing="wide"
                  fontWeight="medium"
                  noOfLines={1}
                  whiteSpace="nowrap"
                >
                  {t('Supporting projects')}
                </Body>
              </VStack>
            </HStack>
          </Box>
        </SimpleGrid>
      </VStack>

      <VStack align="stretch" spacing={4}>
        <H2 size="xl" bold>
          {t('Impact Funds')}
        </H2>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {impactFunds.map((fund) => {
            const amountDisplay = getFundAmountDisplay(fund)
            const isLatamImpactFund = fund.name === LATAM_IMPACT_FUND_NAME
            const foundingSponsors = isLatamImpactFund
              ? fund.liveSponsors.filter((sponsor) => sponsor.tier === ImpactFundSponsorTier.Tier_1)
              : []

            if (isLatamImpactFund) {
              return (
                <CardLayout
                  key={fund.id}
                  dense
                  noborder
                  p={0}
                  minH={{ base: '620px', lg: '680px' }}
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
                    <VStack w="full" h="full" spacing={0} align="stretch">
                      <Box h={{ base: '240px', lg: '380px' }} bg={cardImageBg} overflow="hidden" position="relative">
                        {fund.heroImage && (
                          <Image
                            src={fund.heroImage}
                            alt=""
                            w="full"
                            h="full"
                            display="block"
                            objectFit="cover"
                            objectPosition="calc(50% + 40px) center"
                          />
                        )}
                        <Badge
                          position="absolute"
                          top={4}
                          right={4}
                          zIndex={1}
                          variant="soft"
                          colorScheme="primary1"
                          size="md"
                          borderRadius="full"
                          px={3}
                          py={1}
                          textTransform="none"
                        >
                          {t('Next funds deployment soon')}
                        </Badge>
                      </Box>
                      <VStack w="full" bg="utils.pbg" pt={5} pb={5} align="start" spacing={3} flex={1}>
                        <HStack w="full" justifyContent="space-between" alignItems="baseline" spacing={3} px={5}>
                          <H2 size="xl" bold lineHeight={1.2} flex={1}>
                            <LinkOverlay as={Link} to={getPath('impactFunds', encodeURIComponent(fund.name))}>
                              {fund.title}
                            </LinkOverlay>
                          </H2>
                          {amountDisplay && (
                            <VStack align="end" spacing={0} flexShrink={0}>
                              <Body size="md" bold whiteSpace="nowrap" lineHeight={1.2} textAlign="right">
                                {amountDisplay.primary}
                              </Body>
                              {amountDisplay.secondary && (
                                <Body
                                  size="xs"
                                  whiteSpace="nowrap"
                                  lineHeight={1.2}
                                  textAlign="right"
                                  color={sectionMutedTextColor}
                                >
                                  {amountDisplay.secondary}
                                </Body>
                              )}
                            </VStack>
                          )}
                        </HStack>

                        {fund.subtitle && (
                          <Body size="md" lineHeight={1.4} px={5}>
                            {fund.subtitle}
                          </Body>
                        )}

                        {fund.metrics.projectsFundedCount > 0 && (
                          <Body size="sm" color={sectionMutedTextColor} px={5}>
                            {t('{{projectCount}} projects supported', {
                              projectCount: numberFormatter.format(fund.metrics.projectsFundedCount),
                            })}
                          </Body>
                        )}

                        <Flex
                          w="full"
                          px={5}
                          mt="auto"
                          pt={3}
                          justifyContent="space-between"
                          alignItems={{ base: 'stretch', md: 'center' }}
                          gap={4}
                          flexWrap="wrap"
                        >
                          {foundingSponsors.length > 0 ? (
                            <Wrap spacing={3} align="center" justify="flex-start" flex="1 1 auto">
                              {foundingSponsors.map((sponsor) => {
                                const sponsorContent = sponsor.image ? (
                                  <Image src={sponsor.image} alt={sponsor.name} w="full" h="full" objectFit="contain" />
                                ) : (
                                  <Body size="sm" bold color={sectionPrimaryTextColor}>
                                    {sponsor.name}
                                  </Body>
                                )

                                const sponsorCard = (
                                  <Flex
                                    w={{ base: '96px', sm: '111px' }}
                                    h={{ base: '42px', sm: '48px' }}
                                    align="center"
                                    justify="center"
                                  >
                                    {sponsorContent}
                                  </Flex>
                                )

                                return (
                                  <WrapItem key={sponsor.id}>
                                    {sponsor.url ? (
                                      <ChakraLink href={sponsor.url} isExternal _hover={{ textDecoration: 'none' }}>
                                        {sponsorCard}
                                      </ChakraLink>
                                    ) : (
                                      sponsorCard
                                    )}
                                  </WrapItem>
                                )
                              })}
                            </Wrap>
                          ) : (
                            <Box flex={1} />
                          )}
                          <CardCta to={getPath('impactFunds', encodeURIComponent(fund.name))} />
                        </Flex>
                      </VStack>
                    </VStack>
                  </LinkBox>
                </CardLayout>
              )
            }

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
                  <VStack w="full" h="full" spacing={0} align="stretch">
                    <Box h={{ base: '240px', lg: '380px' }} bg={cardImageBg} overflow="hidden">
                      {fund.heroImage && (
                        <Image
                          src={fund.heroImage}
                          alt=""
                          w="full"
                          h="full"
                          display="block"
                          objectFit="contain"
                          objectPosition="center"
                          transform={{ base: 'scale(1.08)', md: 'scale(1.02)' }}
                        />
                      )}
                    </Box>
                    <VStack w="full" bg="utils.pbg" pt={5} pb={5} align="start" spacing={3} flex={1}>
                      <HStack w="full" justifyContent="space-between" alignItems="baseline" spacing={3} px={5}>
                        <H2 size="xl" bold lineHeight={1.2} flex={1}>
                          <LinkOverlay as={Link} to={getPath('impactFunds', encodeURIComponent(fund.name))}>
                            {fund.title}
                          </LinkOverlay>
                        </H2>
                        {amountDisplay && (
                          <VStack align="end" spacing={0} flexShrink={0}>
                            <Body size="md" bold whiteSpace="nowrap" lineHeight={1.2} textAlign="right">
                              {amountDisplay.primary}
                            </Body>
                            {amountDisplay.secondary && (
                              <Body
                                size="xs"
                                whiteSpace="nowrap"
                                lineHeight={1.2}
                                textAlign="right"
                                color={sectionMutedTextColor}
                              >
                                {amountDisplay.secondary}
                              </Body>
                            )}
                          </VStack>
                        )}
                      </HStack>
                      {fund.subtitle && (
                        <Body size="md" lineHeight={1.4} px={5}>
                          {fund.subtitle}
                        </Body>
                      )}
                      <HStack w="full" px={5} mt="auto" pt={3} justifyContent="space-between" alignItems="center">
                        {fund.metrics.projectsFundedCount > 0 ? (
                          <Body size="sm" color={sectionMutedTextColor}>
                            {t('{{projectCount}} projects supported', {
                              projectCount: numberFormatter.format(fund.metrics.projectsFundedCount),
                            })}
                          </Body>
                        ) : (
                          <Box />
                        )}
                        <CardCta to={getPath('impactFunds', encodeURIComponent(fund.name))} />
                      </HStack>
                    </VStack>
                  </VStack>
                </LinkBox>
              </CardLayout>
            )
          })}
        </SimpleGrid>
      </VStack>

      {impactFunds.length === 0 && (
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

        <VStack align="stretch" spacing={3} pt={2}>
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
    </VStack>
  )
}
