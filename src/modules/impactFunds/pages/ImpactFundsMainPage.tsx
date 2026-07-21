import { Box, Button, Flex, HStack, Icon, Image, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo, useState } from 'react'
import { PiArrowRightBold } from 'react-icons/pi'
import { Link } from 'react-router'

import { Head } from '@/config/Head.tsx'
import { useBTCConverter } from '@/helpers/useBTCConverter.ts'
import { useImpactFundsDonateModal } from '@/modules/impactFunds/hooks/useImpactFundsDonateModal.tsx'
import { IMPACT_FUNDS_IMAGE_URL } from '@/modules/impactFunds/utils/constants.ts'
import { RECOVERABLE_GRANTS_CATEGORY_ID } from '@/modules/impactFunds/utils/impactFundDonatePreferences.ts'
import { LabifBanner } from '@/shared/components/LabifBanner.tsx'
import { RecoverableGrantPoolCard } from '@/shared/components/RecoverableGrantPoolCard.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H1, H2, H3 } from '@/shared/components/typography/Heading.tsx'
import { getAiSeoPageContent, getPath } from '@/shared/constants'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { ImpactFundsFieldPartnerApplicationUrl } from '@/shared/constants/platform/url.ts'
import { UserExternalLinksComponent } from '@/shared/molecules/UserExternalLinks.tsx'
import { standardPadding } from '@/shared/styles/index.ts'
import { buildCollectionPageJsonLd } from '@/shared/utils/seo.ts'
import {
  type ImpactFundsFieldPartnerLeaderboardQuery,
  type ImpactFundsQuery,
  ProjectSubCategory,
  useImpactFundsFieldPartnerLeaderboardQuery,
  useImpactFundsQuery,
} from '@/types'
import type { USDCents } from '@/types/index.ts'
import { getShortAmountLabel } from '@/utils/index.ts'

const LATIN_AMERICA_IMPACT_FUND_NAME = 'latam-impact-fund'
const FALLBACK_FIELD_PARTNER_COUNT = 100
const LEADERBOARD_INITIAL_ROW_COUNT = 7
const LEADERBOARD_MAX_ROW_COUNT = 20
const IMPACT_FUNDS_PAPER_HERO_IMAGE_URL =
  'https://app.paper.design/file-assets/01KT2DBTZTEZXFBD7X82K0GAKQ/01KT9B8FMANZ6KR4BJWZ6F7W0V.jpg'
const AFRIBIT_WORKSHOP_DESCRIPTION =
  'Afribit workshop activity shows the next step after education: meeting entrepreneurs, capturing their stories, and helping local businesses become fundable campaigns.'
const AFRIBIT_WORKSHOP_VIDEO_URL = 'https://www.youtube.com/watch?v=pU1KxP0ddng'
const CIRCULAR_ECONOMIES_REPORT_URL =
  'https://storage.googleapis.com/geyser-media/impact-funds/Circular-Economies-Report.pdf'
const IMPACT_REPORTS_2022_2024_URL =
  'https://storage.googleapis.com/geyser-media/impact-funds/Impact%20Reports%20-%202022-2024.pdf'
const FIELD_PARTNERS_PRESENTATION_URL =
  'https://storage.googleapis.com/geyser-media/impact-funds/Field%20Partners%20-%20Presentation.pdf'
const RECOVERABLE_GRANTS_PRESENTATION_URL =
  'https://storage.googleapis.com/geyser-media/impact-funds/recoverable-grant-booklet.pdf'
const ABOUT_SECTION_STATS = [
  {
    value: '279M sats',
    label: 'allocated through Impact Fund projects',
    isDark: false,
  },
  {
    value: '12.21M sats',
    label: 'funding enabled by Field Partners',
    isDark: false,
  },
  {
    value: '20 projects',
    label: 'launched, supported, or promoted by Field Partners',
    isDark: false,
  },
  {
    value: `${FALLBACK_FIELD_PARTNER_COUNT} partners`,
    label: 'trusted local field network, and growing from 40 different countries',
    isDark: true,
  },
] as const
const LEADERBOARD_HEADERS = ['Rank', 'Field Partner', 'Country', 'Projects enabled', 'Enabled contribution'] as const

type ImpactFundListItem = ImpactFundsQuery['impactFunds'][number]
type FieldPartnerLeaderboardItem =
  ImpactFundsFieldPartnerLeaderboardQuery['impactFundFieldPartnerLeaderboard']['rows'][number]
type SponsorListItem = { id: string; name: string; image?: string | null; url?: string | null }
type FieldPartnerLeaderboardRow = {
  rank: number
  fieldPartnerId: string
  fieldPartner: string
  country: string
  projectsLaunched: string
  enabledContribution: string
}
type SectionColors = {
  pageBg: string
  surfaceBg: string
  mutedSurfaceBg: string
  darkSurfaceBg: string
  emphasisCardBg: string
  emphasisCardBorder: string
  emphasisCardText: string
  emphasisCardMutedText: string
  emphasisCardEyebrow: string
  emphasisCardAccent: string
  emphasisCardMetric: string
  emphasisCardButtonBg: string
  emphasisCardButtonText: string
  sponsorTileBg: string
  sponsorLogoBackdrop: string
  surfaceActionButtonBg: string
  surfaceActionButtonText: string
  primaryText: string
  secondaryText: string
  mutedText: string
  borderColor: string
  accentText: string
  accentBg: string
  accentSurfaceText: string
  amberBg: string
  amberText: string
  amberLinkHover: string
  reportCardBg: string
  resourceEyebrow: string
}

const howItWorksSteps = [
  {
    label: '01 Discover',
    title: 'Discover trusted local projects',
    description: 'Field Partners identify projects with real community context and proof of work.',
  },
  {
    label: '02 Launch',
    title: 'Launch projects and deploy reusable capital',
    description: 'They support onboarding, project creation, workshops, promotion, and contributor trust.',
  },
  {
    label: '03 Allocate',
    title: 'Allocate capital for grassroots impact',
    description: 'Recoverable grants help projects grow, return capital, and keep sats circulating.',
  },
] as const

const resourceCards = {
  caseStudies: [
    {
      eyebrow: 'Field story',
      title: 'Berlin Festival',
      description: 'How workshops turned public awareness into funded local projects.',
      imageUrl: '/images/impact-funds/success-stories/berlin-wall-fest.png',
      url: 'https://guide.geyser.fund/geyser-docs/your-project-guides/success-stories/berlin-walls-fest',
    },
    {
      eyebrow: 'Partner story',
      title: 'Bitcoin Kampala',
      description: 'How a trusted local partner helped projects launch and raise.',
      imageUrl: IMPACT_FUNDS_PAPER_HERO_IMAGE_URL,
      url: 'https://guide.geyser.fund/geyser-docs/product-guides/impact-funds/bitcoin-kampala',
    },
  ],
  reports: [
    {
      eyebrow: 'Report',
      title: 'Circular Economies Report',
      url: CIRCULAR_ECONOMIES_REPORT_URL,
    },
    {
      eyebrow: 'Report',
      title: 'Grants Impact Reports 2022–2024',
      url: IMPACT_REPORTS_2022_2024_URL,
    },
  ],
  guides: [
    {
      eyebrow: 'Start here',
      title: 'Field Partner Booklet',
      url: FIELD_PARTNERS_PRESENTATION_URL,
      isAccent: true,
    },
    {
      eyebrow: 'Reusable capital',
      title: 'Recoverable Grants Booklet',
      url: RECOVERABLE_GRANTS_PRESENTATION_URL,
    },
  ],
} as const

/** Main landing page for browsing live Impact Funds and understanding how the program works. */
export const ImpactFundsMainPage = () => {
  const { openDonateModal, donateModalElement } = useImpactFundsDonateModal()
  const [isShowingAllPartners, setIsShowingAllPartners] = useState(false)
  const { data } = useImpactFundsQuery()
  const { data: fieldPartnerLeaderboardData } = useImpactFundsFieldPartnerLeaderboardQuery({
    variables: {
      input: {
        limit: LEADERBOARD_MAX_ROW_COUNT,
      },
    },
  })
  const impactFundsSeoContent = getAiSeoPageContent('impactFunds')
  const { getSatoshisFromUSDCents } = useBTCConverter()

  const pageBg = useColorModeValue('white', 'utils.pbg')
  const surfaceBg = useColorModeValue('white', 'neutral1.4')
  const mutedSurfaceBg = useColorModeValue('#F5F6F6', 'neutral1.2')
  const darkSurfaceBg = useColorModeValue('#17120C', 'neutral1.2')
  const emphasisCardBg = useColorModeValue('#17120C', 'neutral1.5')
  const emphasisCardBorder = useColorModeValue('transparent', 'neutral1.6')
  const emphasisCardText = useColorModeValue('white', 'neutral1.12')
  const emphasisCardMutedText = useColorModeValue('whiteAlpha.800', 'neutral1.11')
  const emphasisCardEyebrow = useColorModeValue('whiteAlpha.800', 'neutral1.10')
  const emphasisCardAccent = useColorModeValue('#00E0B0', 'primary1.9')
  const emphasisCardMetric = useColorModeValue('#F09A34', 'amber.9')
  const emphasisCardButtonBg = useColorModeValue('white', 'neutral1.12')
  const emphasisCardButtonText = useColorModeValue('black', 'neutral1.1')
  const sponsorTileBg = useColorModeValue('white', 'neutral1.5')
  const sponsorLogoBackdrop = useColorModeValue('white', 'neutral1.12')
  const surfaceActionButtonBg = useColorModeValue('#17120C', 'neutral1.12')
  const surfaceActionButtonText = useColorModeValue('white', 'neutral1.1')
  const primaryText = useColorModeValue('black', 'utils.text')
  const secondaryText = useColorModeValue('#626872', 'neutral1.11')
  const mutedText = useColorModeValue('#626872', 'neutral1.10')
  const borderColor = useColorModeValue('#E2E4E6', 'neutral1.5')
  const accentText = useColorModeValue('#3F8F7C', 'primary1.9')
  const accentBg = useColorModeValue('#00E0B0', 'primary1.9')
  const accentSurfaceText = useColorModeValue('black', 'neutral1.1')
  const amberBg = useColorModeValue('#F09A34', 'amber.9')
  const amberText = useColorModeValue('black', 'neutral1.1')
  const amberLinkHover = useColorModeValue('#17120C', 'neutral1.1')
  const reportCardBg = useColorModeValue('#FFF7EC', 'neutral1.4')
  const resourceEyebrow = useColorModeValue('#A9672C', 'amber.9')
  const colors: SectionColors = useMemo(
    () => ({
      pageBg,
      surfaceBg,
      mutedSurfaceBg,
      darkSurfaceBg,
      emphasisCardBg,
      emphasisCardBorder,
      emphasisCardText,
      emphasisCardMutedText,
      emphasisCardEyebrow,
      emphasisCardAccent,
      emphasisCardMetric,
      emphasisCardButtonBg,
      emphasisCardButtonText,
      sponsorTileBg,
      sponsorLogoBackdrop,
      surfaceActionButtonBg,
      surfaceActionButtonText,
      primaryText,
      secondaryText,
      mutedText,
      borderColor,
      accentText,
      accentBg,
      accentSurfaceText,
      amberBg,
      amberText,
      amberLinkHover,
      reportCardBg,
      resourceEyebrow,
    }),
    [
      pageBg,
      surfaceBg,
      mutedSurfaceBg,
      darkSurfaceBg,
      emphasisCardBg,
      emphasisCardBorder,
      emphasisCardText,
      emphasisCardMutedText,
      emphasisCardEyebrow,
      emphasisCardAccent,
      emphasisCardMetric,
      emphasisCardButtonBg,
      emphasisCardButtonText,
      sponsorTileBg,
      sponsorLogoBackdrop,
      surfaceActionButtonBg,
      surfaceActionButtonText,
      primaryText,
      secondaryText,
      mutedText,
      borderColor,
      accentText,
      accentBg,
      accentSurfaceText,
      amberBg,
      amberText,
      amberLinkHover,
      reportCardBg,
      resourceEyebrow,
    ],
  )

  const impactFunds = data?.impactFunds || []
  const latinAmericaImpactFund = impactFunds.find((fund) => fund.name === LATIN_AMERICA_IMPACT_FUND_NAME)
  const aggregatedSponsors = getAggregatedSponsors(impactFunds)
  const sponsors = aggregatedSponsors
  const fieldPartnerLeaderboardRows = getFieldPartnerLeaderboardRows(
    fieldPartnerLeaderboardData?.impactFundFieldPartnerLeaderboard.rows || [],
  )
  const rowsToShow = isShowingAllPartners
    ? fieldPartnerLeaderboardRows
    : fieldPartnerLeaderboardRows.slice(0, LEADERBOARD_INITIAL_ROW_COUNT)

  const getFundAmountDisplay = (fund: ImpactFundListItem) => {
    if (fund.amountCommitted === null || fund.amountCommitted === undefined) return ''

    const amountSats =
      fund.amountCommitted === 0
        ? fund.metrics.awardedTotalSats
        : fund.amountCommittedCurrency === 'USDCENT'
        ? getSatoshisFromUSDCents((fund.amountCommitted ?? 0) as USDCents)
        : fund.amountCommitted ?? 0

    return `${getShortAmountLabel(amountSats, true)} sats`
  }

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

  return (
    <>
      {pageHead}

      {donateModalElement}

      <PageShell colors={colors}>
        <HeroSection colors={colors} onDonateClick={() => openDonateModal()} />
        <AboutSection colors={colors} />
        <HowItWorksSection colors={colors} />
        <LeaderboardSection
          colors={colors}
          rows={rowsToShow}
          totalRows={fieldPartnerLeaderboardRows.length}
          isShowingAllPartners={isShowingAllPartners}
          onShowAll={() => setIsShowingAllPartners(true)}
        />
        <SponsorsAndFundsSection
          colors={colors}
          sponsors={sponsors}
          committedAmount={
            latinAmericaImpactFund ? getFundAmountDisplay(latinAmericaImpactFund) : t('120,000,000 sats')
          }
          onDonateClick={() => openDonateModal({ defaultCategoryIds: [RECOVERABLE_GRANTS_CATEGORY_ID] })}
        />
        <ResourcesSection colors={colors} />
        <BookletsSection colors={colors} />
        <FooterSection />
      </PageShell>
    </>
  )
}

const getAggregatedSponsors = (impactFunds: ImpactFundsQuery['impactFunds']) => {
  const sponsorById = new Map<string, SponsorListItem>()
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

  return Array.from(sponsorById.values()).sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }),
  )
}

const compactSatsFormatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 2,
})

const formatLeaderboardSats = (sats: number) => {
  return `${compactSatsFormatter.format(sats).replace('K', 'k')} sats`
}

const getFieldPartnerLeaderboardRows = (rows: FieldPartnerLeaderboardItem[]): FieldPartnerLeaderboardRow[] => {
  return rows.map((row) => ({
    rank: row.rank,
    fieldPartnerId: String(row.fieldPartnerId),
    fieldPartner: row.fieldPartner,
    country: row.country,
    projectsLaunched: String(row.projectsLaunched),
    enabledContribution: formatLeaderboardSats(row.enabledContributionSats),
  }))
}

const PageShell = ({ children, colors }: { children: React.ReactNode; colors: SectionColors }) => {
  return (
    <Box bg={colors.pageBg} color={colors.primaryText}>
      <VStack align="stretch" spacing={0}>
        {children}
      </VStack>
    </Box>
  )
}

const PageSection = ({
  children,
  colors,
  py = dimensions.impactLendingSection.paddingY,
  bg,
}: {
  children: React.ReactNode
  colors: SectionColors
  py?: object
  bg?: string
}) => {
  return (
    <Box w="full" bg={bg || colors.pageBg} py={py}>
      <Box w="full" maxW={`${dimensions.maxWidth + 24 * 2}px`} mx="auto" px={standardPadding}>
        {children}
      </Box>
    </Box>
  )
}

const FullWidthSection = ({
  children,
  bg,
  py = dimensions.impactLendingSection.paddingY,
}: {
  children: React.ReactNode
  bg: string
  py?: React.ComponentProps<typeof Box>['py']
}) => (
  <Box w="100vw" maxW="100vw" position="relative" left="50%" right="50%" ml="-50vw" mr="-50vw" bg={bg} py={py}>
    <Box w="full" maxW={`${dimensions.maxWidth + 24 * 2}px`} mx="auto" px={standardPadding}>
      {children}
    </Box>
  </Box>
)

const Eyebrow = ({ children, color }: { children: React.ReactNode; color: string }) => (
  <Body size="sm" bold color={color} letterSpacing="0.12em" textTransform="uppercase">
    {children}
  </Body>
)

const HeroSection = ({ colors, onDonateClick }: { colors: SectionColors; onDonateClick: () => void }) => {
  const overlayGradient = useColorModeValue(
    `linear-gradient(
      90deg,
      var(--chakra-colors-blackAlpha-900) 0%,
      var(--chakra-colors-blackAlpha-900) 24%,
      var(--chakra-colors-blackAlpha-800) 42%,
      var(--chakra-colors-blackAlpha-500) 66%,
      var(--chakra-colors-blackAlpha-200) 100%
    )`,
    `linear-gradient(
      90deg,
      var(--chakra-colors-blackAlpha-900) 0%,
      var(--chakra-colors-blackAlpha-800) 24%,
      var(--chakra-colors-blackAlpha-700) 42%,
      var(--chakra-colors-blackAlpha-500) 66%,
      var(--chakra-colors-blackAlpha-200) 100%
    )`,
  )

  return (
    <Box
      w="100vw"
      maxW="100vw"
      position="relative"
      left="50%"
      right="50%"
      ml="-50vw"
      mr="-50vw"
      overflow="hidden"
      minH={dimensions.impactLendingHero.minHeight}
      bg={colors.darkSurfaceBg}
    >
      <Box
        position="absolute"
        inset={0}
        backgroundImage={`url('${IMPACT_FUNDS_PAPER_HERO_IMAGE_URL}')`}
        backgroundPosition={{ base: 'center', lg: '78% 34%' }}
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
      />
      <Box position="absolute" inset={0} bg={overlayGradient} />

      <Flex
        position="relative"
        w="full"
        maxW={`${dimensions.maxWidth + 24 * 2}px`}
        minH={dimensions.impactLendingHero.minHeight}
        mx="auto"
        px={standardPadding}
        py={{ base: 10, lg: 12 }}
        align="center"
      >
        <VStack align="flex-start" spacing="22px" maxW={{ base: 'full', lg: '760px' }}>
          <H1
            size={{ base: '40px', md: '4xl', lg: '48px' }}
            bold
            lineHeight={{ base: '46px', lg: '54px' }}
            color="white"
            sx={{ textWrap: 'balance' }}
          >
            {t('Geyser Impact Fund')}
          </H1>
          <Body size={{ base: 'md', lg: 'lg' }} medium lineHeight={{ base: '26px', lg: '28px' }} color="whiteAlpha.900">
            {t(
              'Creating local impact through Field Partners - our local trust network that helps projects launch, raise funds, run workshops, and access recoverable grant capital.',
            )}
          </Body>
          <HStack spacing={3} flexWrap="wrap" pt="8px">
            <Button
              as="a"
              href={ImpactFundsFieldPartnerApplicationUrl}
              target="_blank"
              rel="noreferrer"
              h="42px"
              px="18px"
              borderRadius="6px"
              bg="white"
              color={colors.darkSurfaceBg}
              fontSize="sm"
              fontWeight="600"
            >
              {t('Become a Field Partner')}
            </Button>
            <Button
              h="42px"
              px="18px"
              borderRadius="6px"
              bg="#F7931A"
              color={colors.darkSurfaceBg}
              onClick={onDonateClick}
              fontSize="sm"
              fontWeight="600"
              _hover={{ bg: '#F7931A' }}
            >
              {t('Donate')}
            </Button>
          </HStack>
        </VStack>
      </Flex>
    </Box>
  )
}

const AboutSection = ({ colors }: { colors: SectionColors }) => {
  const topSectionTextColor = useColorModeValue('black', 'white')
  const statMutedTextColor = useColorModeValue('neutral1.9', 'neutral1.11')

  return (
    <PageSection colors={colors}>
      <VStack align="stretch" spacing={{ base: 8, lg: 10 }}>
        <VStack align="stretch" spacing={{ base: 6, lg: 8 }}>
          <VStack align="flex-start" spacing="14px">
            <Eyebrow color={colors.accentText}>{t('About the Impact Fund')}</Eyebrow>
            <H2
              size={{ base: '3xl', lg: '40px' }}
              lineHeight={{ base: '38px', lg: '44px' }}
              bold
              color={topSectionTextColor}
              sx={{ textWrap: 'balance' }}
            >
              {t('Impact happens locally. Field Partners bring Bitcoin tooling and capital to local realities.')}
            </H2>
          </VStack>
          <Body size={{ base: 'md', lg: '18px' }} lineHeight={{ base: '26px', lg: '29px' }} color={topSectionTextColor}>
            {t(
              'The Geyser Impact Fund backs the Field Partners and the fundraisers, campaigns or recoverable grant projects they onboard.',
            )}
          </Body>
        </VStack>

        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing="14px">
          {ABOUT_SECTION_STATS.map((stat) => (
            <VStack
              key={stat.label}
              align="flex-start"
              justify="center"
              spacing="6px"
              bg={stat.isDark ? colors.emphasisCardBg : colors.mutedSurfaceBg}
              borderWidth="1px"
              borderColor={stat.isDark ? colors.emphasisCardBorder : colors.borderColor}
              borderRadius="8px"
              px="22px"
              py="20px"
              minH="126px"
            >
              <Body
                size="30px"
                lineHeight="34px"
                bold
                color={stat.isDark ? colors.emphasisCardMetric : topSectionTextColor}
              >
                {stat.value}
              </Body>
              <Body
                size="sm"
                lineHeight="20px"
                medium
                color={stat.isDark ? colors.emphasisCardMutedText : statMutedTextColor}
              >
                {t(stat.label)}
              </Body>
            </VStack>
          ))}
        </SimpleGrid>
      </VStack>
    </PageSection>
  )
}

const HowItWorksSection = ({ colors }: { colors: SectionColors }) => {
  const headingColor = useColorModeValue('black', 'white')
  const sectionEyebrowColor = useColorModeValue('#0F8B75', 'primary1.9')
  const stepAccentColor = useColorModeValue('#F7931A', 'orange.400')
  const cardBorderColor = useColorModeValue('#E6E8EA', 'neutral1.5')

  return (
    <FullWidthSection bg={colors.mutedSurfaceBg}>
      <VStack align="stretch" spacing={{ base: 6, lg: 8 }}>
        <VStack align="flex-start" spacing="10px">
          <Eyebrow color={sectionEyebrowColor}>{t('How it works')}</Eyebrow>
          <H2
            size={{ base: '32px', lg: '36px' }}
            lineHeight={{ base: '38px', lg: '40px' }}
            bold
            color={headingColor}
            sx={{ textWrap: 'balance' }}
          >
            {t('How impact moves through the Field Partner network.')}
          </H2>
        </VStack>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing="14px">
          {howItWorksSteps.map((step) => (
            <VStack
              key={step.label}
              align="flex-start"
              spacing="12px"
              bg={colors.surfaceBg}
              borderWidth="1px"
              borderColor={cardBorderColor}
              borderRadius="8px"
              p={{ base: 5, lg: 6 }}
              minH={{ base: 'auto', lg: '190px' }}
            >
              <Eyebrow color={stepAccentColor}>{t(step.label)}</Eyebrow>
              <H3
                size={{ base: '24px', lg: '22px' }}
                lineHeight={{ base: '29px', lg: '27px' }}
                bold
                color={headingColor}
              >
                {t(step.title)}
              </H3>
              <Body size="15px" lineHeight="23px" color={colors.secondaryText}>
                {t(step.description)}
              </Body>
            </VStack>
          ))}
        </SimpleGrid>
      </VStack>
    </FullWidthSection>
  )
}

const LeaderboardSection = ({
  colors,
  rows,
  totalRows,
  isShowingAllPartners,
  onShowAll,
}: {
  colors: SectionColors
  rows: FieldPartnerLeaderboardRow[]
  totalRows: number
  isShowingAllPartners: boolean
  onShowAll: () => void
}) => (
  <PageSection colors={colors}>
    <VStack align="stretch" spacing={6}>
      <H2 size={{ base: '32px', lg: '36px' }} lineHeight={{ base: '38px', lg: '42px' }} bold color={colors.primaryText}>
        {t('Field Partners')}
      </H2>

      <Body size="md" lineHeight="26px" color={colors.secondaryText} w="full">
        {t(
          'Field Partners are vetted, local community leaders who are closest to the work happening on the ground. They onboard local projects that need funding, provide them with support and share impact reports.',
        )}
      </Body>

      <Box
        borderWidth="1px"
        borderColor={colors.borderColor}
        borderRadius="8px"
        overflow="hidden"
        bg={colors.surfaceBg}
      >
        <Box display={{ base: 'none', md: 'block' }}>
          <Box w="full">
            <LeaderboardHeader colors={colors} />
            <VStack align="stretch" spacing={0}>
              {rows.length > 0 ? (
                rows.map((row) => <LeaderboardRow key={`${row.rank}-${row.fieldPartner}`} colors={colors} row={row} />)
              ) : (
                <Flex
                  minH="84px"
                  align="center"
                  justify="center"
                  borderBottomWidth="1px"
                  borderColor={colors.borderColor}
                >
                  <Body size="sm" color={colors.secondaryText}>
                    {t('No Field Partner projects found yet.')}
                  </Body>
                </Flex>
              )}
            </VStack>
          </Box>
        </Box>
        <MobileLeaderboardRows colors={colors} rows={rows} />
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align={{ base: 'stretch', md: 'center' }}
          justify="space-between"
          gap={4}
          bg={colors.mutedSurfaceBg}
          p={4}
        >
          <Body size="sm" medium color={colors.secondaryText}>
            {t(
              'Ranked by funding enabled for local projects through onboarding, workshops, promotion, and recoverable grant support.',
            )}
          </Body>
          {!isShowingAllPartners && totalRows > rows.length ? (
            <Button size="sm" colorScheme="neutral1" onClick={onShowAll} flexShrink={0}>
              {t('Show more: view top 20')}
            </Button>
          ) : null}
        </Flex>
      </Box>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'flex-start', md: 'center' }}
        justify="space-between"
        gap={5}
        bg={colors.mutedSurfaceBg}
        borderWidth="1px"
        borderColor={colors.borderColor}
        borderRadius="card"
        p={{ base: 5, lg: 6 }}
      >
        <VStack align="flex-start" spacing={1} maxW="760px">
          <H3
            size={{ base: '24px', lg: '26px' }}
            lineHeight={{ base: '30px', lg: '32px' }}
            bold
            color={colors.primaryText}
          >
            {t('Become a Field Partner')}
          </H3>
          <Body
            size={{ base: '15px', lg: '16px' }}
            lineHeight={{ base: '23px', lg: '24px' }}
            color={colors.secondaryText}
            whiteSpace={{ base: 'normal', lg: 'nowrap' }}
          >
            {t('Help trusted local projects launch, fundraise, host workshops, and report their impact.')}
          </Body>
        </VStack>
        <Flex direction={{ base: 'column', md: 'row' }} align="stretch" gap={3} w={{ base: 'full', md: 'auto' }}>
          <Button
            as="a"
            href={FIELD_PARTNERS_PRESENTATION_URL}
            target="_blank"
            rel="noreferrer"
            h="48px"
            borderRadius="innerCard"
            variant="outline"
            borderColor={colors.borderColor}
            color={colors.primaryText}
            px={6}
            w={{ base: 'full', md: 'auto' }}
          >
            {t('See Field Partner Booklet')}
          </Button>
          <Button
            as="a"
            href={ImpactFundsFieldPartnerApplicationUrl}
            target="_blank"
            rel="noreferrer"
            h="48px"
            borderRadius="innerCard"
            bg={colors.surfaceActionButtonBg}
            color={colors.surfaceActionButtonText}
            px={6}
            w={{ base: 'full', md: 'auto' }}
            _hover={{ bg: colors.surfaceActionButtonBg, opacity: 0.92 }}
          >
            {t('Apply now')}
          </Button>
        </Flex>
      </Flex>
    </VStack>
  </PageSection>
)

const LEADERBOARD_RANK_COLUMN_WIDTH = '72px'

const MobileLeaderboardRows = ({ colors, rows }: { colors: SectionColors; rows: FieldPartnerLeaderboardRow[] }) => {
  if (rows.length === 0) {
    return (
      <Flex display={{ base: 'flex', md: 'none' }} minH="84px" align="center" justify="center" p={4}>
        <Body size="sm" color={colors.secondaryText} textAlign="center">
          {t('No Field Partner projects found yet.')}
        </Body>
      </Flex>
    )
  }

  return (
    <VStack display={{ base: 'flex', md: 'none' }} align="stretch" spacing={0}>
      {rows.map((row) => (
        <VStack
          key={`${row.rank}-${row.fieldPartner}`}
          align="stretch"
          spacing={4}
          p={4}
          borderBottomWidth="1px"
          borderColor={colors.borderColor}
        >
          <Flex align="center" justify="space-between" gap={3}>
            <HStack spacing={3} minW={0}>
              <Flex
                align="center"
                justify="center"
                w="28px"
                h="28px"
                flexShrink={0}
                borderRadius="full"
                bg={row.rank === 1 ? colors.accentBg : colors.mutedSurfaceBg}
              >
                <Body size="xs" bold lineHeight={1} color={colors.primaryText}>
                  {row.rank}
                </Body>
              </Flex>
              <Body
                as={Link}
                to={getPath('userProfile', row.fieldPartnerId)}
                size="md"
                bold
                color={colors.primaryText}
                noOfLines={1}
                _hover={{ color: colors.accentText, textDecoration: 'underline' }}
              >
                {row.fieldPartner}
              </Body>
            </HStack>
            <Body size="md" bold color={colors.primaryText} textAlign="right" flexShrink={0}>
              {row.enabledContribution}
            </Body>
          </Flex>
          <SimpleGrid columns={2} spacing={3}>
            <LeaderboardMetric label={t('Country')} value={row.country} colors={colors} />
            <LeaderboardMetric label={t('Projects enabled')} value={row.projectsLaunched} colors={colors} />
          </SimpleGrid>
        </VStack>
      ))}
    </VStack>
  )
}

const LeaderboardMetric = ({ label, value, colors }: { label: string; value: string; colors: SectionColors }) => (
  <VStack align="flex-start" spacing={1} minW={0}>
    <Body size="xs" bold color={colors.secondaryText} letterSpacing="0.08em" textTransform="uppercase">
      {label}
    </Body>
    <Body size="sm" color={colors.secondaryText} noOfLines={1}>
      {value}
    </Body>
  </VStack>
)

const LeaderboardHeader = ({ colors }: { colors: SectionColors }) => {
  return (
    <HStack
      spacing={0}
      h="44px"
      px={4}
      w="full"
      bg={colors.mutedSurfaceBg}
      borderBottomWidth="1px"
      borderColor={colors.borderColor}
    >
      {LEADERBOARD_HEADERS.map((header, index) => (
        <Box key={header} flex={index === 0 ? `0 0 ${LEADERBOARD_RANK_COLUMN_WIDTH}` : 1} minW={0}>
          <Body
            size="xs"
            bold
            color={colors.secondaryText}
            letterSpacing="0.11em"
            textTransform="uppercase"
            textAlign={index === LEADERBOARD_HEADERS.length - 1 ? 'right' : 'left'}
          >
            {t(header)}
          </Body>
        </Box>
      ))}
    </HStack>
  )
}

const LeaderboardRow = ({ colors, row }: { colors: SectionColors; row: FieldPartnerLeaderboardRow }) => (
  <HStack
    spacing={0}
    minH="42px"
    px={4}
    w="full"
    align="center"
    borderBottomWidth="1px"
    borderColor={colors.borderColor}
  >
    <Box flex={`0 0 ${LEADERBOARD_RANK_COLUMN_WIDTH}`} flexShrink={0}>
      <Flex
        align="center"
        justify="center"
        w="24px"
        h="24px"
        borderRadius="full"
        bg={row.rank === 1 ? colors.accentBg : colors.mutedSurfaceBg}
      >
        <Body size="xs" bold lineHeight={1} color={colors.primaryText}>
          {row.rank}
        </Body>
      </Flex>
    </Box>
    <Box flex={1} minW={0}>
      <Body
        as={Link}
        to={getPath('userProfile', row.fieldPartnerId)}
        size="sm"
        bold
        color={colors.primaryText}
        noOfLines={1}
        _hover={{ color: colors.accentText, textDecoration: 'underline' }}
      >
        {row.fieldPartner}
      </Body>
    </Box>
    <Box flex={1} minW={0}>
      <Body size="sm" color={colors.secondaryText} noOfLines={1}>
        {row.country}
      </Body>
    </Box>
    <Box flex={1} minW={0}>
      <Body size="sm" color={colors.secondaryText} noOfLines={1}>
        {row.projectsLaunched}
      </Body>
    </Box>
    <Box flex={1} minW={0}>
      <Body size="md" bold color={colors.primaryText} textAlign="right" noOfLines={1}>
        {row.enabledContribution}
      </Body>
    </Box>
  </HStack>
)

const SponsorsAndFundsSection = ({
  colors,
  sponsors,
  committedAmount,
  onDonateClick,
}: {
  colors: SectionColors
  sponsors: readonly SponsorListItem[]
  committedAmount: string
  onDonateClick: () => void
}) => {
  const partnerFundPath = getPath('impactFunds', LATIN_AMERICA_IMPACT_FUND_NAME)

  return (
    <PageSection colors={colors}>
      <VStack align="stretch" spacing={{ base: 8, lg: 10 }}>
        <VStack align="stretch" spacing={5}>
          <VStack align="flex-start" spacing={2}>
            <H2
              size={{ base: '32px', lg: '42px' }}
              lineHeight={{ base: '38px', lg: '48px' }}
              bold
              color={colors.primaryText}
              sx={{ textWrap: 'balance' }}
            >
              {t('Active Funds')}
            </H2>
          </VStack>
          <VStack align="stretch" spacing={5}>
            <LabifBanner
              learnMoreTo={partnerFundPath}
              applicationTo={`${partnerFundPath}#apply`}
              committedAmount={committedAmount || t('200,000,000 sats')}
            />
            <RecoverableGrantPoolCard onDonateClick={onDonateClick} />
          </VStack>
        </VStack>
        <VStack align="flex-start" spacing={3}>
          <H2
            size={{ base: '32px', lg: '42px' }}
            lineHeight={{ base: '38px', lg: '48px' }}
            bold
            color={colors.primaryText}
            sx={{ textWrap: 'balance' }}
          >
            {t('Sponsors')}
          </H2>
          <SimpleGrid columns={{ base: 2, sm: 3, lg: 4, xl: 5 }} spacing={4} w="full">
            {sponsors.length === 0 ? (
              <Flex align="center" justify="center" gridColumn="1 / -1" minH={{ base: '120px', lg: '170px' }}>
                <Body size="md" lineHeight="26px" color={colors.mutedText} textAlign="center" maxW="420px">
                  {t('Partner sponsors will appear here as funds grow.')}
                </Body>
              </Flex>
            ) : (
              sponsors.map((sponsor) => <SponsorTile key={sponsor.id} sponsor={sponsor} colors={colors} />)
            )}
          </SimpleGrid>
        </VStack>
      </VStack>
    </PageSection>
  )
}

const SponsorTile = ({ sponsor, colors }: { sponsor: SponsorListItem; colors: SectionColors }) => (
  <Flex
    as={sponsor.url ? 'a' : undefined}
    href={sponsor.url || undefined}
    target={sponsor.url ? '_blank' : undefined}
    rel={sponsor.url ? 'noreferrer' : undefined}
    align="center"
    justify="center"
    borderWidth="1px"
    borderColor={colors.borderColor}
    borderRadius="innerCard"
    h={{ base: '84px', lg: '108px' }}
    px={4}
    bg={colors.sponsorTileBg}
  >
    {sponsor.image ? (
      <Flex
        align="center"
        justify="center"
        bg={colors.sponsorLogoBackdrop}
        borderRadius="innerCard"
        px={3}
        py={2}
        maxW="full"
      >
        <Image src={sponsor.image} alt={sponsor.name} maxH="64px" maxW="200px" objectFit="contain" />
      </Flex>
    ) : (
      <Body size={{ base: 'md', lg: '20px' }} lineHeight="24px" bold color={colors.primaryText} textAlign="center">
        {sponsor.name}
      </Body>
    )}
  </Flex>
)

const ResourcesSection = ({ colors }: { colors: SectionColors }) => (
  <FullWidthSection bg={colors.darkSurfaceBg}>
    <VStack align="stretch" spacing={{ base: 8, lg: 10 }}>
      <VStack align="flex-start" spacing={{ base: 4, lg: 5 }}>
        <Eyebrow color={colors.accentBg}>{t('Impact in action')}</Eyebrow>
        <H2
          size={{ base: '36px', lg: '48px' }}
          lineHeight={{ base: '42px', lg: '56px' }}
          bold
          color={colors.emphasisCardText}
          sx={{ textWrap: 'balance' }}
        >
          {t('What was our impact so far?')}
        </H2>
        <Body
          size={{ base: 'md', lg: '22px' }}
          lineHeight={{ base: '26px', lg: '32px' }}
          color={colors.emphasisCardMutedText}
          w="full"
        >
          {t('Explore the case studies, workshops, and reports made possible through the Impact Fund.')}
        </Body>
      </VStack>

      <VStack align="stretch" spacing={{ base: 5, lg: 7 }}>
        <H3
          size={{ base: '28px', lg: '34px' }}
          lineHeight={{ base: '34px', lg: '40px' }}
          bold
          color={colors.emphasisCardText}
        >
          {t('Case Studies')}
        </H3>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 4, lg: 5 }}>
          {resourceCards.caseStudies.map((card) => (
            <ResourceCard
              key={card.title}
              colors={colors}
              eyebrow={card.eyebrow}
              title={card.title}
              description={card.description}
              imageUrl={card.imageUrl}
              url={'url' in card ? card.url : undefined}
              variant="caseStudy"
            />
          ))}
        </SimpleGrid>
      </VStack>

      <VStack align="stretch" spacing={{ base: 5, lg: 7 }}>
        <H3
          size={{ base: '28px', lg: '34px' }}
          lineHeight={{ base: '34px', lg: '40px' }}
          bold
          color={colors.emphasisCardText}
        >
          {t('Workshops')}
        </H3>
        <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={{ base: 5, lg: 6 }} templateColumns={{ xl: '1.8fr 1fr' }}>
          <WorkshopVideoCard colors={colors} />
          <WorkshopResourcesCard colors={colors} />
        </SimpleGrid>
      </VStack>

      <VStack align="stretch" spacing={{ base: 5, lg: 6 }}>
        <H3
          size={{ base: '28px', lg: '34px' }}
          lineHeight={{ base: '34px', lg: '40px' }}
          bold
          color={colors.emphasisCardText}
        >
          {t('Impact Reports')}
        </H3>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 4, lg: 5 }} alignItems="stretch">
          {resourceCards.reports.map((card) => (
            <ResourceCard key={card.title} colors={colors} {...card} variant="guide" isReport />
          ))}
        </SimpleGrid>
      </VStack>
    </VStack>
  </FullWidthSection>
)

const BookletsSection = ({ colors }: { colors: SectionColors }) => (
  <PageSection colors={colors}>
    <VStack align="stretch" spacing={{ base: 5, lg: 6 }}>
      <H2
        size={{ base: '32px', lg: '42px' }}
        lineHeight={{ base: '38px', lg: '48px' }}
        bold
        color={colors.primaryText}
        sx={{ textWrap: 'balance' }}
      >
        {t('Booklets')}
      </H2>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 4, lg: 5 }} alignItems="stretch">
        {resourceCards.guides.map((card) => (
          <ResourceCard
            key={card.title}
            colors={colors}
            eyebrow={card.eyebrow}
            title={card.title}
            url={'url' in card ? card.url : undefined}
            isAccent={'isAccent' in card ? card.isAccent : false}
            variant="guide"
          />
        ))}
      </SimpleGrid>
    </VStack>
  </PageSection>
)

const WorkshopVideoCard = ({ colors }: { colors: SectionColors }) => (
  <Flex
    direction={{ base: 'column', lg: 'row' }}
    bg={colors.surfaceBg}
    borderRadius="card"
    p={{ base: 4, lg: 5 }}
    gap={{ base: 5, lg: 7 }}
    minH={{ base: 'auto', lg: '290px' }}
  >
    <Box
      position="relative"
      overflow="hidden"
      borderRadius="innerCard"
      minH={{ base: '190px', lg: '250px' }}
      flex={{ base: 'none', lg: 1.45 }}
    >
      <Box
        as="iframe"
        title={t('Afribit Kibera workshop video')}
        src="https://www.youtube.com/embed/pU1KxP0ddng"
        w="full"
        h="full"
        minH={{ base: '190px', lg: '250px' }}
        border={0}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      />
      <Box position="absolute" bottom={4} left={4} bg="black" px={3} py={2}>
        <Body size="xs" bold color="white">
          {t('Afribit Kibera')}
        </Body>
      </Box>
    </Box>
    <VStack align="flex-start" justify="center" spacing={4} flex={1} py={{ base: 0, lg: 4 }}>
      <Eyebrow color="#E75E4F">{t('Afribit')}</Eyebrow>
      <H3 size={{ base: '26px', lg: '30px' }} lineHeight={{ base: '32px', lg: '36px' }} bold color={colors.primaryText}>
        {t('Kibera projects preparing to fundraise.')}
      </H3>
      <Body size={{ base: 'md', lg: '18px' }} lineHeight={{ base: '26px', lg: '29px' }} color={colors.secondaryText}>
        {t(AFRIBIT_WORKSHOP_DESCRIPTION)}
      </Body>
      <HStack
        as="a"
        href={AFRIBIT_WORKSHOP_VIDEO_URL}
        target="_blank"
        rel="noreferrer"
        spacing={1.5}
        color="#E75E4F"
        textDecoration="underline"
        _hover={{ color: colors.primaryText, textDecoration: 'underline' }}
      >
        <Body size={{ base: 'md', lg: '18px' }} lineHeight={{ base: '26px', lg: '29px' }} bold>
          {t('Watch Afribit workshop video')}
        </Body>
        <Icon as={PiArrowRightBold} boxSize={4} />
      </HStack>
    </VStack>
  </Flex>
)

const WorkshopResourcesCard = ({ colors }: { colors: SectionColors }) => (
  <VStack
    align="stretch"
    justify="space-between"
    bg={colors.accentBg}
    borderRadius="card"
    p={{ base: 5, lg: 7 }}
    minH={{ lg: '290px' }}
  >
    <VStack align="flex-start" spacing={4}>
      <Eyebrow color={colors.accentSurfaceText}>{t('Workshop resources')}</Eyebrow>
      <H3
        size={{ base: '26px', lg: '30px' }}
        lineHeight={{ base: '32px', lg: '36px' }}
        bold
        color={colors.accentSurfaceText}
      >
        {t('View all Workshop resources')}
      </H3>
      <Body
        size={{ base: 'md', lg: '18px' }}
        lineHeight={{ base: '26px', lg: '29px' }}
        color={colors.accentSurfaceText}
      >
        {t('Find workshop decks, case studies, and ways to host or sponsor a local crowdfunding workshop.')}
      </Body>
    </VStack>
    <Button
      as={Link}
      to={getPath('discoveryImpactFundsWorkshops')}
      h="52px"
      borderRadius="innerCard"
      bg={colors.surfaceActionButtonBg}
      color={colors.surfaceActionButtonText}
      fontSize="md"
      fontWeight="900"
      _hover={{ bg: colors.surfaceActionButtonBg, opacity: 0.92 }}
    >
      {t('Open workshop resources')}
    </Button>
  </VStack>
)

type ResourceCardProps = {
  colors: SectionColors
  eyebrow: string
  title: string
  description?: string
  imageUrl?: string
  url?: string
  isAccent?: boolean
  isReport?: boolean
  variant?: 'caseStudy' | 'guide'
}

const ResourceCard = (props: ResourceCardProps) => {
  if (props.description) {
    return <CaseStudyResourceCard {...props} description={props.description} />
  }

  return <DownloadResourceCard {...props} />
}

const CaseStudyResourceCard = ({
  colors,
  eyebrow,
  title,
  description,
  imageUrl,
  url,
}: ResourceCardProps & { description: string; imageUrl?: string }) => (
  <VStack
    as={url ? 'a' : undefined}
    href={url}
    target={url ? '_blank' : undefined}
    rel={url ? 'noreferrer' : undefined}
    align="stretch"
    spacing={{ base: 5, lg: 6 }}
    bg={colors.surfaceBg}
    borderRadius="card"
    p={{ base: 5, lg: 7 }}
    minH={{ lg: '300px' }}
    _hover={url ? { textDecoration: 'none', borderColor: colors.amberBg } : undefined}
  >
    <Eyebrow color="#A9672C">{t(eyebrow)}</Eyebrow>
    <H3 size={{ base: '26px', lg: '30px' }} lineHeight={{ base: '32px', lg: '36px' }} bold color={colors.primaryText}>
      {t(title)}
    </H3>
    {imageUrl ? (
      <Image
        src={imageUrl}
        alt={title}
        h={{ base: '116px', lg: '128px' }}
        borderRadius="innerCard"
        objectFit="cover"
        objectPosition="center"
      />
    ) : (
      <Box h={{ base: '96px', lg: '108px' }} borderRadius="innerCard" bg="#E6E8EA" />
    )}
    <Body size={{ base: 'md', lg: '20px' }} lineHeight={{ base: '26px', lg: '30px' }} color={colors.secondaryText}>
      {t(description)}
    </Body>
  </VStack>
)

const DownloadResourceCard = ({ colors, eyebrow, title, url, isAccent, isReport }: ResourceCardProps) => (
  <VStack
    align="stretch"
    spacing={{ base: 5, lg: 6 }}
    bg={isReport ? colors.reportCardBg : isAccent ? colors.accentBg : colors.surfaceBg}
    borderWidth={isReport || !isAccent ? '1px' : undefined}
    borderColor={isReport ? colors.amberBg : !isAccent ? colors.borderColor : undefined}
    borderRadius="card"
    p={{ base: 5, lg: 7 }}
    minH={{ lg: '280px' }}
  >
    <Eyebrow color={isAccent ? colors.accentSurfaceText : colors.resourceEyebrow}>{t(eyebrow)}</Eyebrow>
    <H3
      size={{ base: '24px', lg: '28px' }}
      lineHeight={{ base: '30px', lg: '34px' }}
      bold
      color={isAccent ? colors.accentSurfaceText : colors.primaryText}
    >
      {t(title)}
    </H3>
    <Button
      as={url ? 'a' : undefined}
      href={url}
      target={url ? '_blank' : undefined}
      rel={url ? 'noreferrer' : undefined}
      h="52px"
      borderRadius="innerCard"
      bg={isAccent ? colors.surfaceActionButtonBg : colors.amberBg}
      color={isAccent ? colors.surfaceActionButtonText : colors.amberText}
      fontSize="md"
      fontWeight="900"
      mt="auto"
      _hover={{ bg: isAccent ? colors.surfaceActionButtonBg : colors.amberBg, opacity: 0.92 }}
    >
      {t('Download PDF')}
    </Button>
  </VStack>
)

const FooterSection = () => (
  <Box w="full" px={standardPadding} pb={{ base: 28, lg: 10 }}>
    <Box maxW={`${dimensions.maxWidth + 24 * 2}px`} mx="auto">
      <UserExternalLinksComponent />
    </Box>
  </Box>
)
