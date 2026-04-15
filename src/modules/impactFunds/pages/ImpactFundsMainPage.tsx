import { Box, Spinner, useColorModeValue, useDisclosure, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'

import { Head } from '@/config/Head.tsx'
import { useBTCConverter } from '@/helpers/useBTCConverter.ts'
import { ImpactFundsDonatePreferencesModal } from '@/modules/impactFunds/components/mainPage/ImpactFundsDonatePreferencesModal.tsx'
import { ImpactFundsFeaturedPartnerFundSection } from '@/modules/impactFunds/components/mainPage/ImpactFundsFeaturedPartnerFundSection.tsx'
import { ImpactFundsFundSponsorsSection } from '@/modules/impactFunds/components/mainPage/ImpactFundsFundSponsorsSection.tsx'
import { ImpactFundsHeroSection } from '@/modules/impactFunds/components/mainPage/ImpactFundsHeroSection.tsx'
import { ImpactFundsHowItWorksSection } from '@/modules/impactFunds/components/mainPage/ImpactFundsHowItWorksSection.tsx'
import { ImpactFundsProvenImpactSection } from '@/modules/impactFunds/components/mainPage/ImpactFundsProvenImpactSection.tsx'
import { ImpactFundsSuccessStoriesSection } from '@/modules/impactFunds/components/mainPage/ImpactFundsSuccessStoriesSection.tsx'
import { ImpactFundsTrustNetworkSection } from '@/modules/impactFunds/components/mainPage/ImpactFundsTrustNetworkSection.tsx'
import { ImpactFundsTrustPillarsSection } from '@/modules/impactFunds/components/mainPage/ImpactFundsTrustPillarsSection.tsx'
import { IMPACT_FUNDS_IMAGE_URL } from '@/modules/impactFunds/utils/constants.ts'
import { getCommittedAmountDisplay, getSatsAmountDisplay } from '@/modules/impactFunds/utils/formatCommittedAmount.ts'
import {
  impactFundsCommunityLeadersFallback,
  impactFundsHowItWorksSteps,
  impactFundsSuccessStoriesFallback,
  impactFundsTrustPillars,
} from '@/modules/impactFunds/utils/mainPageContent.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getAiSeoPageContent, getPath } from '@/shared/constants'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { UserExternalLinksComponent } from '@/shared/molecules/UserExternalLinks.tsx'
import { usdRateAtom } from '@/shared/state/btcRateAtom.ts'
import { standardPadding } from '@/shared/styles/index.ts'
import { buildCollectionPageJsonLd } from '@/shared/utils/seo.ts'
import { type ImpactFundsQuery, ProjectSubCategory, useImpactFundsQuery } from '@/types'

const numberFormatter = new Intl.NumberFormat()

/** Slug for the fund shown in Partner Funds (single card). */
const LATIN_AMERICA_IMPACT_FUND_NAME = 'latam-impact-fund'

type ImpactFundListItem = ImpactFundsQuery['impactFunds'][number]

/** Main landing page for browsing live Impact Funds and understanding how the program works. */
export const ImpactFundsMainPage = () => {
  const donateModal = useDisclosure()
  const { data, loading, error } = useImpactFundsQuery()
  const impactFundsSeoContent = getAiSeoPageContent('impactFunds')
  const usdRate = useAtomValue(usdRateAtom)
  const { getUSDAmount, getSatoshisFromUSDCents } = useBTCConverter()
  const donationModal = useDisclosure()
  const whyDonateModal = useDisclosure()
  const pageSpacing = { base: 6, lg: 8 }

  const cardImageBg = useColorModeValue('neutral1.2', 'neutral1.3')
  const cardSurfaceBg = useColorModeValue('white', 'neutral1.3')
  const sectionPrimaryTextColor = useColorModeValue('neutral1.11', 'neutral1.12')
  const sectionSecondaryTextColor = useColorModeValue('neutral1.9', 'neutral1.11')
  const sectionMutedTextColor = useColorModeValue('neutral1.8', 'neutral1.10')
  const sectionCardShadow = '0 4px 14px rgba(15, 23, 42, 0.05)'
  const interactiveCardShadow = '0 4px 14px rgba(15, 23, 42, 0.05)'
  const interactiveCardHoverShadow = '0 10px 24px rgba(15, 23, 42, 0.10)'

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
          name: 'Geyser Impact Fund',
          description: impactFundsSeoContent.description,
          path: getPath('discoveryImpactFunds'),
          about: impactFundsSeoContent.about,
          keywords: impactFundsSeoContent.keywords,
          items: [
            {
              name: 'Impact Fund',
              path: getPath('discoveryImpactFunds'),
              description: 'Fund a Bitcoin-backed impact fund.',
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

  const contentContainerProps = {
    w: '100%' as const,
    maxWidth: `${dimensions.maxWidth + 24 * 2}px`,
    mx: 'auto' as const,
    px: standardPadding,
    paddingBottom: { base: 28, lg: 10 } as const,
  }

  if (loading) {
    return (
      <>
        {pageHead}
        <Box {...contentContainerProps}>
          <CardLayout>
            <VStack py={8}>
              <Spinner />
            </VStack>
          </CardLayout>
        </Box>
      </>
    )
  }

  if (error) {
    return (
      <>
        {pageHead}
        <Box {...contentContainerProps}>
          <CardLayout>
            <Body>{t('Failed to load impact funds.')}</Body>
          </CardLayout>
        </Box>
      </>
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
    const amountLabel = getFundAmountLabel(fund)
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
              lg: isCompact ? 'row' : 'column',
            }}
            align="stretch"
            minH={isHero ? { lg: '520px' } : undefined}
          >
            <Box
              h={
                isHero
                  ? { base: '260px', lg: '320px' }
                  : isFeatured
                  ? { base: '220px', lg: '280px' }
                  : { base: isMobileHorizontalCompact ? 'auto' : '160px', lg: 'auto' }
              }
              w={
                isHero
                  ? 'full'
                  : isCompact
                  ? { base: isMobileHorizontalCompact ? '132px' : 'full', lg: '220px' }
                  : 'full'
              }
              minW={
                isHero
                  ? undefined
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
                  ? undefined
                  : undefined
              }
            >
              <Flex
                direction={{ base: isMobileHorizontalCompact ? 'column' : 'column', sm: 'row' }}
                justifyContent="space-between"
                align={{ base: 'start', sm: 'start' }}
                gap={3}
              >
                <H2 size={isHero ? '2xl' : 'xl'} bold lineHeight={1.2} flex={1}>
                  <LinkOverlay as={Link} to={getPath('impactFunds', encodeURIComponent(fund.name))}>
                    {fund.title}
                  </LinkOverlay>
                </H2>
              </Flex>

              <Flex mt="auto" justifyContent="space-between" alignItems="center" gap={4} flexWrap="wrap">
                <HStack spacing={{ base: 3, lg: 4 }} align="stretch" flexWrap="wrap">
                  {amountDisplay ? (
                    <VStack align="start" spacing={0}>
                      <Body size="xs" color={sectionMutedTextColor} textTransform="uppercase" letterSpacing="wide">
                        {amountLabel}
                      </Body>
                      <Body size={isHero || isFeatured ? 'md' : 'sm'} bold color={sectionPrimaryTextColor}>
                        {amountDisplay.primary}
                      </Body>
                    </VStack>
                  ) : null}

                  <VStack align="end" spacing={0}>
                    <Body size="xs" color={sectionMutedTextColor} textTransform="uppercase" letterSpacing="wide">
                      {t('Projects supported')}
                    </Body>
                    <Body
                      size={isHero || isFeatured ? 'md' : 'sm'}
                      bold
                      color={sectionPrimaryTextColor}
                      textAlign="right"
                    >
                      {numberFormatter.format(fund.metrics.projectsFundedCount || 0)}
                    </Body>
                  </VStack>
                </HStack>
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

  const latinAmericaImpactFund = impactFunds.find((f) => f.name === LATIN_AMERICA_IMPACT_FUND_NAME)

  /** Union of `liveSponsors` from every impact fund (deduped by sponsor id). */
  const sponsorById = new Map<string, { id: string; name: string; image?: string | null; url?: string | null }>()
  for (const fund of impactFunds) {
    for (const sponsor of fund.liveSponsors) {
      const key = String(sponsor.id)
      if (!sponsorById.has(key)) {
        sponsorById.set(key, {
          id: key,
          name: sponsor.name,
          image: sponsor.image,
          url: sponsor.url,
        })
      }
    }
  }

  const aggregatedSponsors = Array.from(sponsorById.values()).sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }),
  )

  return (
    <>
      {pageHead}

      <ImpactFundsHeroSection onDonateClick={donateModal.onOpen} />

      <ImpactFundsDonatePreferencesModal
        isOpen={donateModal.isOpen}
        onClose={donateModal.onClose}
        impactFunds={impactFunds}
      />

      <Box {...contentContainerProps}>
        <VStack align="stretch" spacing={pageSpacing}>
          <ImpactFundsTrustPillarsSection
            pillars={impactFundsTrustPillars}
            sectionPrimaryTextColor={sectionPrimaryTextColor}
            sectionSecondaryTextColor={sectionSecondaryTextColor}
          />

          <ImpactFundsHowItWorksSection
            steps={impactFundsHowItWorksSteps}
            sectionPrimaryTextColor={sectionPrimaryTextColor}
            sectionSecondaryTextColor={sectionSecondaryTextColor}
          />

          <ImpactFundsProvenImpactSection
            totalDistributedSatsFormatted={`${numberFormatter.format(totalDistributedSats)} sats`}
            totalProjectsFundedFormatted={numberFormatter.format(totalProjectsFunded)}
          />

          <ImpactFundsTrustNetworkSection
            leaders={impactFundsCommunityLeadersFallback}
            sectionPrimaryTextColor={sectionPrimaryTextColor}
            sectionSecondaryTextColor={sectionSecondaryTextColor}
            cardSurfaceBg={cardSurfaceBg}
            sectionCardShadow={sectionCardShadow}
          />

          <ImpactFundsSuccessStoriesSection
            stories={impactFundsSuccessStoriesFallback}
            sectionPrimaryTextColor={sectionPrimaryTextColor}
            sectionSecondaryTextColor={sectionSecondaryTextColor}
            cardSurfaceBg={cardSurfaceBg}
            sectionCardShadow={sectionCardShadow}
          />

          <ImpactFundsFundSponsorsSection
            sponsors={aggregatedSponsors}
            sectionPrimaryTextColor={sectionPrimaryTextColor}
            sectionSecondaryTextColor={sectionSecondaryTextColor}
            sectionMutedTextColor={sectionMutedTextColor}
            cardSurfaceBg={cardSurfaceBg}
          />

          {impactFunds.length === 0 ? (
            <CardLayout>
              <Body>{t('No live impact funds yet.')}</Body>
            </CardLayout>
          ) : (
            <>
              {latinAmericaImpactFund ? (
                <ImpactFundsFeaturedPartnerFundSection
                  fundName={latinAmericaImpactFund.name}
                  title={latinAmericaImpactFund.title}
                  heroImage={latinAmericaImpactFund.heroImage}
                  cardImageBg={cardImageBg}
                  amountDisplay={getFundAmountDisplay(latinAmericaImpactFund)}
                  sponsors={latinAmericaImpactFund.liveSponsors.map((s) => ({
                    id: String(s.id),
                    name: s.name,
                    image: s.image,
                    url: s.url,
                  }))}
                  sectionPrimaryTextColor={sectionPrimaryTextColor}
                  sectionSecondaryTextColor={sectionSecondaryTextColor}
                  sectionMutedTextColor={sectionMutedTextColor}
                  interactiveCardShadow={interactiveCardShadow}
                  interactiveCardHoverShadow={interactiveCardHoverShadow}
                />
              ) : null}
            </>
          )}
        </VStack>
        <UserExternalLinksComponent />
      </Box>
    </>
  )
}
