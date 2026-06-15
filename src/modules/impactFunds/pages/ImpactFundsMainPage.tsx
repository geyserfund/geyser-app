import { Badge, Box, Button, Flex, HStack, Icon, Image, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { useMemo, useState } from 'react'
import { PiArrowRightBold } from 'react-icons/pi'
import { Link } from 'react-router'

import { Head } from '@/config/Head.tsx'
import { useBTCConverter } from '@/helpers/useBTCConverter.ts'
import { useImpactFundsDonateModal } from '@/modules/impactFunds/hooks/useImpactFundsDonateModal.tsx'
import { IMPACT_FUNDS_IMAGE_URL } from '@/modules/impactFunds/utils/constants.ts'
import { getCommittedAmountDisplay, getSatsAmountDisplay } from '@/modules/impactFunds/utils/formatCommittedAmount.ts'
import { RECOVERABLE_GRANTS_CATEGORY_ID } from '@/modules/impactFunds/utils/impactFundDonatePreferences.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H1, H2, H3 } from '@/shared/components/typography/Heading.tsx'
import { getAiSeoPageContent, getPath } from '@/shared/constants'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { ImpactFundsFieldPartnerApplicationUrl } from '@/shared/constants/platform/url.ts'
import { UserExternalLinksComponent } from '@/shared/molecules/UserExternalLinks.tsx'
import { usdRateAtom } from '@/shared/state/btcRateAtom.ts'
import { standardPadding } from '@/shared/styles/index.ts'
import { buildCollectionPageJsonLd } from '@/shared/utils/seo.ts'
import {
  type ImpactFundsFieldPartnerLeaderboardQuery,
  type ImpactFundsQuery,
  ProjectSubCategory,
  useImpactFundsFieldPartnerLeaderboardQuery,
  useImpactFundsQuery,
} from '@/types'

const LATIN_AMERICA_IMPACT_FUND_NAME = 'latam-impact-fund'
const FALLBACK_FIELD_PARTNER_COUNT = 100
const LEADERBOARD_INITIAL_ROW_COUNT = 7
const LEADERBOARD_MAX_ROW_COUNT = 20
const IMPACT_FUNDS_PAPER_HERO_IMAGE_URL =
  'https://app.paper.design/file-assets/01KT2DBTZTEZXFBD7X82K0GAKQ/01KT9B8FMANZ6KR4BJWZ6F7W0V.jpg'
const AFRIBIT_WORKSHOP_DESCRIPTION =
  'Afribit workshop activity shows the next step after education: meeting entrepreneurs, capturing their stories, and helping local businesses become fundable campaigns.'
const CIRCULAR_ECONOMIES_REPORT_URL =
  'https://storage.googleapis.com/geyser-media/impact-funds/Circular-Economies-Report.pdf'
const FIELD_PARTNERS_PRESENTATION_URL =
  'https://storage.googleapis.com/geyser-media/impact-funds/Field%20Partners%20-%20Presentation.pdf'
const RECOVERABLE_GRANTS_PRESENTATION_URL =
  'https://storage.googleapis.com/geyser-media/impact-funds/Recoverable%20Grant%20-%20Presentation%202026.06.pdf'
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
const LEADERBOARD_HEADERS = ['Rank', 'Field Partner', 'Country', 'Projects launched', 'Enabled contribution'] as const

type ImpactFundListItem = ImpactFundsQuery['impactFunds'][number]
type FieldPartnerLeaderboardItem = ImpactFundsFieldPartnerLeaderboardQuery['impactFundFieldPartnerLeaderboard']['rows'][number]
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
  amberBg: string
  amberText: string
  amberLinkHover: string
}

const howItWorksSteps = [
  {
    label: '01 Discover',
    title: 'Field Partners find trusted local projects to raise funds',
    description: 'Field Partners identify projects with real community context and proof of work.',
  },
  {
    label: '02 Launch',
    title: 'They help them them and deploy reusable capital',
    description: 'They support onboarding, project creation, workshops, promotion, and contributor trust.',
  },
  {
    label: '03 Allocate',
    title: 'Sats enter the ecosystem and enable grassroots impact',
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
  guides: [
    {
      eyebrow: 'Start here',
      title: 'Become a Field Partner Guide',
      url: FIELD_PARTNERS_PRESENTATION_URL,
      isAccent: true,
    },
    {
      eyebrow: 'Reusable capital',
      title: 'Recoverable Grants Explainer',
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
  const usdRate = useAtomValue(usdRateAtom)
  const { getUSDAmount, getSatoshisFromUSDCents } = useBTCConverter()

  const pageBg = useColorModeValue('white', 'utils.pbg')
  const surfaceBg = useColorModeValue('white', 'neutral1.4')
  const mutedSurfaceBg = useColorModeValue('#F5F6F6', 'neutral1.2')
  const darkSurfaceBg = useColorModeValue('#17120C', 'neutral1.2')
  const emphasisCardBg = useColorModeValue('#17120C', 'neutral1.5')
  const emphasisCardBorder = useColorModeValue('transparent', 'neutral1.6')
  const emphasisCardText = useColorModeValue('white', 'neutral1.12')
  const emphasisCardMutedText = useColorModeValue('whiteAlpha.800', 'neutral1.11')
  const emphasisCardEyebrow = useColorModeValue('whiteAlpha.800', 'neutral1.10')
  const emphasisCardAccent = useColorModeValue('#00E0B0', 'primary1.300')
  const emphasisCardMetric = useColorModeValue('#F09A34', 'amber.9')
  const emphasisCardButtonBg = useColorModeValue('white', 'neutral1.12')
  const emphasisCardButtonText = useColorModeValue('black', 'neutral1.1')
  const sponsorTileBg = useColorModeValue('white', 'neutral1.5')
  const sponsorLogoBackdrop = useColorModeValue('white', 'neutral1.12')
  const surfaceActionButtonBg = useColorModeValue('#17120C', 'neutral1.12')
  const surfaceActionButtonText = useColorModeValue('white', 'neutral1.1')
  const primaryText = useColorModeValue('black', 'neutral1.12')
  const secondaryText = useColorModeValue('#626872', 'neutral1.10')
  const mutedText = useColorModeValue('#626872', 'neutral1.9')
  const borderColor = useColorModeValue('#E2E4E6', 'neutral1.5')
  const accentText = useColorModeValue('#3F8F7C', 'primary1.200')
  const accentBg = useColorModeValue('#00E0B0', 'primary1.500')
  const amberBg = useColorModeValue('#F09A34', 'amber.9')
  const amberText = useColorModeValue('black', 'neutral1.1')
  const amberLinkHover = useColorModeValue('#17120C', 'neutral1.1')
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
      amberBg,
      amberText,
      amberLinkHover,
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
      amberBg,
      amberText,
      amberLinkHover,
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

    return (fund.amountCommitted === 0 ? awardedAmountDisplay : committedAmountDisplay)?.primary || ''
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
          partnerFund={latinAmericaImpactFund}
          getFundAmountDisplay={getFundAmountDisplay}
        />
        <CommitmentSection
          colors={colors}
          onDonateClick={() => openDonateModal({ defaultCategoryIds: [RECOVERABLE_GRANTS_CATEGORY_ID] })}
        />
        <ResourcesSection colors={colors} />
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
    projectsLaunched: `${row.projectsLaunched} onboarded`,
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
            size={{ base: '3xl', md: '4xl', lg: '48px' }}
            bold
            lineHeight={{ base: '1.12', lg: '54px' }}
            color="white"
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
  const statMutedTextColor = useColorModeValue('neutral1.9', 'neutral1.10')

  return (
    <PageSection colors={colors}>
      <VStack align="stretch" spacing={{ base: 8, lg: 10 }}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 6, lg: 12 }}>
          <VStack align="flex-start" spacing="14px">
            <Eyebrow color={colors.accentText}>{t('About the Impact Fund')}</Eyebrow>
            <H2
              size={{ base: '3xl', lg: '40px' }}
              lineHeight={{ base: '38px', lg: '44px' }}
              bold
              color={topSectionTextColor}
            >
              {t('Impact happens locally. Field Partners bring Bitcoin tooling and capital to local realities.')}
            </H2>
          </VStack>
          <VStack align="flex-start" spacing="18px" pt={{ base: 0, lg: 4 }}>
            <Body
              size={{ base: 'lg', lg: '22px' }}
              medium
              lineHeight={{ base: '30px', lg: '32px' }}
              color={topSectionTextColor}
            >
              {t(
                'The Impact Fund backs our vetted local partners who are closest to the work and best placed to identify credible projects.',
              )}
            </Body>
            <Body size="md" lineHeight="27px" color={colors.secondaryText}>
              {t(
                "They reduce distance, increase trust, help projects launch and promote campaigns, then support recoverable grants whose capital can return and be redeployed where it's most needed.",
              )}
            </Body>
          </VStack>
        </SimpleGrid>

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
  const sectionEyebrowColor = useColorModeValue('#0F8B75', 'primary1.300')
  const stepAccentColor = useColorModeValue('#F7931A', 'orange.400')
  const cardBorderColor = useColorModeValue('#E6E8EA', 'neutral1.5')

  return (
    <FullWidthSection bg={colors.mutedSurfaceBg}>
      <VStack align="stretch" spacing={{ base: 6, lg: 8 }}>
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          justify="space-between"
          align={{ base: 'flex-start', lg: 'flex-end' }}
          gap={6}
        >
          <VStack align="flex-start" spacing="10px" maxW="620px">
            <Eyebrow color={sectionEyebrowColor}>{t('How it works')}</Eyebrow>
            <H2 size={{ base: '3xl', lg: '36px' }} lineHeight={{ base: '38px', lg: '40px' }} bold color={headingColor}>
              {t('How impact moves through the trusted field network.')}
            </H2>
          </VStack>
          <Body size="md" lineHeight="24px" color={colors.secondaryText} maxW={{ base: 'full', lg: '360px' }}>
            {t('The model is built for trust, accountability, and reusable capital.')}
          </Body>
        </Flex>
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
              p="24px"
              minH="190px"
            >
              <Eyebrow color={stepAccentColor}>{t(step.label)}</Eyebrow>
              <H3 size="22px" lineHeight="27px" bold color={headingColor}>
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
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        align={{ base: 'flex-start', md: 'flex-end' }}
        gap={4}
      >
        <VStack align="flex-start" spacing={3}>
          <Eyebrow color={colors.accentText}>{t('Trusted Field Partners')}</Eyebrow>
          <H2
            size={{ base: '3xl', lg: '42px' }}
            lineHeight={{ base: '38px', lg: '46px' }}
            bold
            color={colors.primaryText}
          >
            {t('Field Partner leaderboard')}
          </H2>
        </VStack>
        <Badge
          borderRadius="full"
          px={4}
          py={2}
          bg={colors.accentBg}
          color={colors.primaryText}
          textTransform="none"
          fontSize="sm"
        >
          {t('Quarterly rewards eligible')}
        </Badge>
      </Flex>

      <Box
        borderWidth="1px"
        borderColor={colors.borderColor}
        borderRadius="8px"
        overflow="hidden"
        bg={colors.surfaceBg}
      >
        <Box overflowX="auto">
          <Box w="full" minW={{ base: '640px', md: 'full' }}>
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
    </VStack>
  </PageSection>
)

const LEADERBOARD_RANK_COLUMN_WIDTH = '72px'

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
  partnerFund,
  getFundAmountDisplay,
}: {
  colors: SectionColors
  sponsors: readonly SponsorListItem[]
  partnerFund?: ImpactFundListItem
  getFundAmountDisplay: (fund: ImpactFundListItem) => string
}) => {
  const partnerFundPath = getPath('impactFunds', LATIN_AMERICA_IMPACT_FUND_NAME)

  return (
    <PageSection colors={colors}>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 7, lg: 8 }} templateColumns={{ lg: '1fr 440px' }}>
        <VStack align="stretch" spacing={5}>
          <Eyebrow color={colors.accentText}>{t('Sponsors so far')}</Eyebrow>
          <SimpleGrid
            columns={{ base: 1, sm: 2, xl: 4 }}
            spacing={4}
            bg={colors.mutedSurfaceBg}
            borderWidth="1px"
            borderColor={colors.borderColor}
            borderRadius="8px"
            p={{ base: 5, lg: 8 }}
            minH={{ base: 'auto', lg: '230px' }}
          >
            {sponsors.length === 0 ? (
              <Flex align="center" justify="center" gridColumn="1 / -1" minH={{ base: '120px', lg: '150px' }}>
                <Body size="md" lineHeight="26px" color={colors.mutedText} textAlign="center" maxW="420px">
                  {t('Partner sponsors will appear here as funds grow.')}
                </Body>
              </Flex>
            ) : (
              sponsors.slice(0, 10).map((sponsor) => <SponsorTile key={sponsor.id} sponsor={sponsor} colors={colors} />)
            )}
          </SimpleGrid>
        </VStack>
        <VStack align="stretch" spacing={5}>
          <Eyebrow color={colors.accentText}>{t('Partner funds')}</Eyebrow>
          <VStack
            as={Link}
            to={partnerFundPath}
            align="stretch"
            justify="space-between"
            bg={colors.emphasisCardBg}
            borderWidth="1px"
            borderColor={colors.emphasisCardBorder}
            borderRadius="8px"
            p={{ base: 7, lg: 9 }}
            minH={{ base: '260px', lg: '236px' }}
            _hover={{ textDecoration: 'none' }}
          >
            <VStack align="flex-start" spacing={3}>
              <H3
                size={{ base: '30px', lg: '33px' }}
                lineHeight={{ base: '36px', lg: '39px' }}
                bold
                color={colors.emphasisCardText}
              >
                {partnerFund?.title || t('Latin America Bitcoin Impact Fund')}
              </H3>
              <Body
                size={{ base: 'md', lg: '18px' }}
                lineHeight={{ base: '26px', lg: '28px' }}
                color={colors.emphasisCardMutedText}
              >
                {t(
                  'Additional partner funds can be routed through local Field Partners and debt-free recoverable grant capital.',
                )}
              </Body>
            </VStack>
            <HStack justify="space-between" align="flex-end" pt={4}>
              <Eyebrow color={colors.emphasisCardAccent}>{t('LABIF')}</Eyebrow>
              <Body size="24px" lineHeight="28px" bold color={colors.emphasisCardMetric}>
                {partnerFund ? getFundAmountDisplay(partnerFund) : '$140,000'}
              </Body>
            </HStack>
          </VStack>
        </VStack>
      </SimpleGrid>
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
    borderRadius="8px"
    h={{ base: '58px', lg: '68px' }}
    px={4}
    bg={colors.sponsorTileBg}
  >
    {sponsor.image ? (
      <Flex
        align="center"
        justify="center"
        bg={colors.sponsorLogoBackdrop}
        borderRadius="6px"
        px={3}
        py={2}
        maxW="full"
      >
        <Image src={sponsor.image} alt={sponsor.name} maxH="38px" maxW="160px" objectFit="contain" />
      </Flex>
    ) : (
      <Body size={{ base: 'md', lg: '20px' }} lineHeight="24px" bold color={colors.primaryText} textAlign="center">
        {sponsor.name}
      </Body>
    )}
  </Flex>
)

const CommitmentSection = ({ colors, onDonateClick }: { colors: SectionColors; onDonateClick: () => void }) => (
  <PageSection colors={colors}>
    <VStack align="stretch" spacing={{ base: 5, lg: 6 }}>
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        align="center"
        justify="space-between"
        gap={{ base: 8, lg: 12 }}
        bg={colors.amberBg}
        borderRadius="8px"
        p={{ base: 6, lg: 8 }}
      >
        <VStack align="flex-start" spacing={{ base: 4, lg: 5 }} maxW="760px">
          <Eyebrow color={colors.amberText}>{t('Recoverable grant pool')}</Eyebrow>
          <H2
            size={{ base: '30px', lg: '40px' }}
            lineHeight={{ base: '36px', lg: '47px' }}
            bold
            color={colors.amberText}
          >
            {t('Donate reusable capital for local projects.')}
          </H2>
          <Body size={{ base: 'md', lg: '20px' }} lineHeight={{ base: '27px', lg: '31px' }} color={colors.amberText}>
            {t(
              'Your contribution helps Field Partners deploy recoverable grants to projects they have helped launch, promote, and support on the ground.',
            )}
          </Body>
          <Body
            as={Link}
            to={getPath('discoveryRecoverableGrants')}
            size={{ base: 'md', lg: '18px' }}
            bold
            color={colors.amberText}
            textDecoration="underline"
            _hover={{ color: colors.amberLinkHover }}
          >
            {t('Learn about recoverable grants')}
          </Body>
        </VStack>
        <VStack
          align="stretch"
          spacing={{ base: 5, lg: 6 }}
          bg={colors.emphasisCardBg}
          borderWidth="1px"
          borderColor={colors.emphasisCardBorder}
          borderRadius="8px"
          p={{ base: 6, lg: 8 }}
          w={{ base: 'full', lg: '370px' }}
          justify="center"
          flexShrink={0}
        >
          <Eyebrow color={colors.emphasisCardEyebrow}>{t('GEYSER Quarterly pool')}</Eyebrow>
          <H3
            size={{ base: '48px', lg: '56px' }}
            lineHeight={{ base: '52px', lg: '60px' }}
            bold
            color={colors.emphasisCardText}
          >
            {t('3M sats')}
          </H3>
          <Button
            h="54px"
            borderRadius="8px"
            bg={colors.emphasisCardButtonBg}
            color={colors.emphasisCardButtonText}
            fontSize={{ base: 'md', lg: '18px' }}
            fontWeight="900"
            onClick={onDonateClick}
            _hover={{ bg: colors.emphasisCardButtonBg, opacity: 0.92 }}
          >
            {t('Donate to Impact Fund')}
          </Button>
        </VStack>
      </Flex>

      <Flex
        direction={{ base: 'column', lg: 'row' }}
        align={{ base: 'stretch', lg: 'center' }}
        justify="space-between"
        gap={6}
        bg={colors.mutedSurfaceBg}
        borderWidth="1px"
        borderColor={colors.borderColor}
        borderRadius="8px"
        p={{ base: 6, lg: 9 }}
      >
        <VStack align="flex-start" spacing={2} maxW="710px">
          <H2
            size={{ base: '30px', lg: '40px' }}
            lineHeight={{ base: '36px', lg: '46px' }}
            bold
            color={colors.primaryText}
          >
            {t('Become a trusted Field Partner')}
          </H2>
          <Body
            size={{ base: 'md', lg: '20px' }}
            lineHeight={{ base: '26px', lg: '31px' }}
            color={colors.secondaryText}
          >
            {t(
              'Apply if you are already active locally and ready to help projects launch, raise funds, host workshops, promote campaigns, and report impact.',
            )}
          </Body>
        </VStack>
        <Button
          as="a"
          href={ImpactFundsFieldPartnerApplicationUrl}
          target="_blank"
          rel="noreferrer"
          size="lg"
          h="54px"
          borderRadius="8px"
          px={8}
          bg={colors.surfaceActionButtonBg}
          color={colors.surfaceActionButtonText}
          fontSize={{ base: 'md', lg: '18px' }}
          fontWeight="900"
          flexShrink={0}
          _hover={{ bg: colors.surfaceActionButtonBg, opacity: 0.92 }}
        >
          {t('Apply to become a Field Partner')}
        </Button>
      </Flex>
    </VStack>
  </PageSection>
)

const ResourcesSection = ({ colors }: { colors: SectionColors }) => (
  <FullWidthSection bg={colors.darkSurfaceBg}>
    <VStack align="stretch" spacing={{ base: 8, lg: 10 }}>
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        justify="space-between"
        align={{ base: 'flex-start', lg: 'flex-end' }}
        gap={{ base: 5, lg: 10 }}
      >
        <VStack align="flex-start" spacing={{ base: 4, lg: 5 }}>
          <Eyebrow color={colors.accentBg}>{t('Resources')}</Eyebrow>
          <H2
            size={{ base: '40px', lg: '56px' }}
            lineHeight={{ base: '46px', lg: '64px' }}
            bold
            color={colors.emphasisCardText}
          >
            {t('Learn how local impact gets built')}
          </H2>
        </VStack>
        <Body
          size={{ base: 'md', lg: '22px' }}
          lineHeight={{ base: '26px', lg: '32px' }}
          color={colors.emphasisCardMutedText}
          maxW="430px"
        >
          {t('Case studies prove the model. Reports show results. Guides help you act.')}
        </Body>
      </Flex>

      <VStack align="stretch" spacing={{ base: 5, lg: 7 }}>
        <H3
          size={{ base: '32px', lg: '40px' }}
          lineHeight={{ base: '38px', lg: '46px' }}
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
          size={{ base: '32px', lg: '40px' }}
          lineHeight={{ base: '38px', lg: '46px' }}
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
        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={{ base: 5, lg: 6 }}>
          <H3
            size={{ base: '32px', lg: '38px' }}
            lineHeight={{ base: '38px', lg: '44px' }}
            bold
            color={colors.emphasisCardText}
          >
            {t('Impact Reports')}
          </H3>
          <H3
            size={{ base: '32px', lg: '38px' }}
            lineHeight={{ base: '38px', lg: '44px' }}
            bold
            color={colors.emphasisCardText}
            gridColumn={{ base: 'auto', lg: 'span 2' }}
          >
            {t('Guides')}
          </H3>
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={{ base: 4, lg: 5 }} alignItems="stretch">
          <ResourceCard
            colors={colors}
            eyebrow="Report"
            title="Circular Economies Report"
            url={CIRCULAR_ECONOMIES_REPORT_URL}
            variant="guide"
            isReport
          />
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
    </VStack>
  </FullWidthSection>
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
    <Flex
      position="relative"
      align="center"
      justify="center"
      bg="#111"
      borderRadius="innerCard"
      minH={{ base: '220px', lg: '250px' }}
      flex={{ base: 'none', lg: 1.45 }}
    >
      <Flex align="center" justify="center" w="64px" h="46px" borderRadius="12px" bg="#F7CC45">
        <Box
          as="span"
          ml="4px"
          w="0"
          h="0"
          borderTop="10px solid transparent"
          borderBottom="10px solid transparent"
          borderLeft="16px solid #111"
        />
      </Flex>
      <Box position="absolute" bottom={4} left={4} bg="black" px={3} py={2}>
        <Body size="xs" bold color="white">
          {t('Afribit Kibera')}
        </Body>
      </Box>
    </Flex>
    <VStack align="flex-start" justify="center" spacing={4} flex={1} py={{ base: 0, lg: 4 }}>
      <Eyebrow color="#E75E4F">{t('Afribit')}</Eyebrow>
      <H3 size={{ base: '28px', lg: '34px' }} lineHeight={{ base: '34px', lg: '40px' }} bold color={colors.primaryText}>
        {t('Kibera projects preparing to fundraise.')}
      </H3>
      <Body size={{ base: 'md', lg: '18px' }} lineHeight={{ base: '26px', lg: '29px' }} color={colors.secondaryText}>
        {t(AFRIBIT_WORKSHOP_DESCRIPTION)}
      </Body>
      <HStack
        as={Link}
        to={getPath('discoveryRecoverableGrantsAfribitCaseStudy')}
        spacing={1.5}
        color="#E75E4F"
        textDecoration="underline"
        _hover={{ color: colors.primaryText, textDecoration: 'underline' }}
      >
        <Body size={{ base: 'md', lg: '18px' }} lineHeight={{ base: '26px', lg: '29px' }} bold>
          {t('See Afribit case study')}
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
    p={{ base: 6, lg: 7 }}
    minH={{ base: '230px', lg: '290px' }}
  >
    <VStack align="flex-start" spacing={4}>
      <Eyebrow color={colors.primaryText}>{t('Workshop resources')}</Eyebrow>
      <H3 size={{ base: '28px', lg: '34px' }} lineHeight={{ base: '34px', lg: '40px' }} bold color={colors.primaryText}>
        {t('View all Workshop resources')}
      </H3>
      <Body size={{ base: 'md', lg: '18px' }} lineHeight={{ base: '26px', lg: '29px' }} color={colors.primaryText}>
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
    spacing={6}
    bg={colors.surfaceBg}
    borderRadius="card"
    p={{ base: 6, lg: 7 }}
    minH={{ base: '290px', lg: '300px' }}
    _hover={url ? { textDecoration: 'none', borderColor: colors.amberBg } : undefined}
  >
    <Eyebrow color="#A9672C">{t(eyebrow)}</Eyebrow>
    <H3 size={{ base: '28px', lg: '34px' }} lineHeight={{ base: '34px', lg: '40px' }} bold color={colors.primaryText}>
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
    spacing={6}
    bg={isReport ? '#FFF7EC' : isAccent ? colors.accentBg : colors.surfaceBg}
    borderWidth={isReport ? '1px' : undefined}
    borderColor={isReport ? colors.amberBg : undefined}
    borderRadius="card"
    p={{ base: 6, lg: 7 }}
    minH={{ base: '240px', lg: '280px' }}
  >
    <Eyebrow color={isAccent ? colors.primaryText : '#A9672C'}>{t(eyebrow)}</Eyebrow>
    <H3 size={{ base: '24px', lg: '28px' }} lineHeight={{ base: '30px', lg: '34px' }} bold color={colors.primaryText}>
      {t(title)}
    </H3>
    <Button
      as={url ? 'a' : undefined}
      href={url}
      target={url ? '_blank' : undefined}
      rel={url ? 'noreferrer' : undefined}
      h="52px"
      borderRadius="innerCard"
      bg={isAccent ? colors.darkSurfaceBg : colors.amberBg}
      color={isAccent ? 'white' : colors.primaryText}
      fontSize="md"
      fontWeight="900"
      mt="auto"
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
