import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  SimpleGrid,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { useMemo, useState } from 'react'
import { Link } from 'react-router'

import { Head } from '@/config/Head.tsx'
import { useBTCConverter } from '@/helpers/useBTCConverter.ts'
import { ImpactFundsDonatePreferencesModal } from '@/modules/impactFunds/components/mainPage/ImpactFundsDonatePreferencesModal.tsx'
import { IMPACT_FUNDS_IMAGE_URL } from '@/modules/impactFunds/utils/constants.ts'
import { getCommittedAmountDisplay, getSatsAmountDisplay } from '@/modules/impactFunds/utils/formatCommittedAmount.ts'
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
  type ImpactFundsFieldPartnerLeaderboardProjectsQuery,
  type ImpactFundsQuery,
  ProjectsGetWhereInputStatus,
  ProjectSubCategory,
  useImpactFundsFieldPartnerLeaderboardProjectsQuery,
  useImpactFundsQuery,
} from '@/types'

const LATIN_AMERICA_IMPACT_FUND_NAME = 'latam-impact-fund'
const FALLBACK_FIELD_PARTNER_COUNT = 100
const FIELD_PARTNER_PROJECT_FETCH_LIMIT = 250
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

type ImpactFundListItem = ImpactFundsQuery['impactFunds'][number]
type FieldPartnerLeaderboardProject = ImpactFundsFieldPartnerLeaderboardProjectsQuery['projectsGet']['projects'][number]
type SponsorListItem = { id: string; name: string; image?: string | null; url?: string | null }
type FieldPartnerLeaderboardRow = {
  rank: number
  fieldPartner: string
  country: string
  projectsLaunched: string
  workshops: string
  enabledContribution: string
}
type SectionColors = {
  pageBg: string
  surfaceBg: string
  mutedSurfaceBg: string
  darkSurfaceBg: string
  primaryText: string
  secondaryText: string
  mutedText: string
  borderColor: string
  accentText: string
  accentBg: string
  amberBg: string
  amberText: string
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
    description: 'Recoverable grants help projects grow, repay, and keep capital circulating.',
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
    { eyebrow: 'Reusable capital', title: 'Recoverable Grants Explainer' },
  ],
} as const

/** Main landing page for browsing live Impact Funds and understanding how the program works. */
export const ImpactFundsMainPage = () => {
  const donateModal = useDisclosure()
  const [isShowingAllPartners, setIsShowingAllPartners] = useState(false)
  const { data } = useImpactFundsQuery()
  const { data: fieldPartnerProjectsData } = useImpactFundsFieldPartnerLeaderboardProjectsQuery({
    variables: {
      input: {
        where: { status: ProjectsGetWhereInputStatus.Active },
        pagination: { take: FIELD_PARTNER_PROJECT_FETCH_LIMIT },
      },
    },
  })
  const impactFundsSeoContent = getAiSeoPageContent('impactFunds')
  const usdRate = useAtomValue(usdRateAtom)
  const { getUSDAmount, getSatoshisFromUSDCents } = useBTCConverter()

  const colors: SectionColors = {
    pageBg: useColorModeValue('white', 'utils.pbg'),
    surfaceBg: useColorModeValue('white', 'neutral1.3'),
    mutedSurfaceBg: useColorModeValue('#F5F6F6', 'neutral1.3'),
    darkSurfaceBg: useColorModeValue('#17120C', 'neutral1.1'),
    primaryText: useColorModeValue('black', 'neutral1.12'),
    secondaryText: useColorModeValue('#626872', 'neutral1.10'),
    mutedText: useColorModeValue('#626872', 'neutral1.9'),
    borderColor: useColorModeValue('#E2E4E6', 'neutral1.5'),
    accentText: useColorModeValue('#3F8F7C', 'primary1.200'),
    accentBg: useColorModeValue('#00E0B0', 'primary1.500'),
    amberBg: useColorModeValue('#F09A34', 'amber.400'),
    amberText: useColorModeValue('black', 'neutral1.1'),
  }

  const impactFunds = data?.impactFunds || []
  const latinAmericaImpactFund = impactFunds.find((fund) => fund.name === LATIN_AMERICA_IMPACT_FUND_NAME)
  const aggregatedSponsors = getAggregatedSponsors(impactFunds)
  const sponsors = aggregatedSponsors
  const fieldPartnerLeaderboardRows = useMemo(
    () => getFieldPartnerLeaderboardRows(fieldPartnerProjectsData?.projectsGet.projects || []),
    [fieldPartnerProjectsData?.projectsGet.projects],
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

      <ImpactFundsDonatePreferencesModal
        isOpen={donateModal.isOpen}
        onClose={donateModal.onClose}
        impactFunds={impactFunds}
      />

      <PageShell colors={colors}>
        <HeroSection colors={colors} onDonateClick={donateModal.onOpen} />
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
        <CommitmentSection colors={colors} onDonateClick={donateModal.onOpen} />
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

const getHostedWorkshopCount = (project: FieldPartnerLeaderboardProject) => {
  return project.tags.some((tag) => tag.label.toLowerCase().includes('workshop')) ? 1 : 0
}

const getLocationLabel = (project: FieldPartnerLeaderboardProject) => {
  return project.fieldPartner?.location || project.location?.country?.name || project.location?.region || 'Global'
}

const getTopLocationLabel = (countryCounts: Map<string, number>) => {
  return (
    Array.from(countryCounts.entries()).sort((a, b) => {
      const countDifference = b[1] - a[1]
      return countDifference === 0 ? a[0].localeCompare(b[0]) : countDifference
    })[0]?.[0] || 'Global'
  )
}

const getFieldPartnerLeaderboardRows = (projects: FieldPartnerLeaderboardProject[]): FieldPartnerLeaderboardRow[] => {
  const fieldPartners = new Map<
    string,
    {
      fieldPartner: string
      countryCounts: Map<string, number>
      projectsLaunched: number
      workshopsHosted: number
      enabledContributionSats: number
    }
  >()

  for (const project of projects) {
    if (!project.fieldPartner) {
      continue
    }

    const fieldPartnerId = String(project.fieldPartner.id)
    const current = fieldPartners.get(fieldPartnerId) || {
      fieldPartner: project.fieldPartner.username,
      countryCounts: new Map<string, number>(),
      projectsLaunched: 0,
      workshopsHosted: 0,
      enabledContributionSats: 0,
    }
    const locationLabel = getLocationLabel(project)

    current.countryCounts.set(locationLabel, (current.countryCounts.get(locationLabel) || 0) + 1)
    current.projectsLaunched += 1
    current.workshopsHosted += getHostedWorkshopCount(project)
    current.enabledContributionSats += project.balance
    fieldPartners.set(fieldPartnerId, current)
  }

  return Array.from(fieldPartners.values())
    .sort((a, b) => {
      const contributionDifference = b.enabledContributionSats - a.enabledContributionSats
      if (contributionDifference !== 0) return contributionDifference

      const projectDifference = b.projectsLaunched - a.projectsLaunched
      return projectDifference === 0 ? a.fieldPartner.localeCompare(b.fieldPartner) : projectDifference
    })
    .slice(0, LEADERBOARD_MAX_ROW_COUNT)
    .map((row, index) => ({
      rank: index + 1,
      fieldPartner: row.fieldPartner,
      country: getTopLocationLabel(row.countryCounts),
      projectsLaunched: `${row.projectsLaunched} onboarded`,
      workshops: `${row.workshopsHosted} hosted`,
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
  py = { base: 10, lg: 14 },
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

const Eyebrow = ({ children, color }: { children: React.ReactNode; color: string }) => (
  <Body size="sm" bold color={color} letterSpacing="0.12em" textTransform="uppercase">
    {children}
  </Body>
)

const HeroSection = ({ colors, onDonateClick }: { colors: SectionColors; onDonateClick: () => void }) => {
  const heroTextColor = useColorModeValue('black', 'white')
  const heroPrimaryButtonBg = useColorModeValue('white', 'neutral1.12')
  const heroAccentButtonBg = useColorModeValue('#F7931A', 'orange.400')
  const overlayGradient = useColorModeValue(
    'linear-gradient(90deg, var(--chakra-colors-whiteAlpha-800) 0%, var(--chakra-colors-whiteAlpha-700) 36%, var(--chakra-colors-whiteAlpha-300) 58%, var(--chakra-colors-whiteAlpha-100) 100%)',
    'linear-gradient(90deg, var(--chakra-colors-blackAlpha-800) 0%, var(--chakra-colors-blackAlpha-600) 42%, var(--chakra-colors-blackAlpha-200) 100%)',
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
      minH={{ base: '420px', lg: '396px' }}
      bg={colors.mutedSurfaceBg}
    >
      <Box
        position="absolute"
        inset={0}
        backgroundImage={`url('${IMPACT_FUNDS_PAPER_HERO_IMAGE_URL}')`}
        backgroundPosition={{ base: 'center', lg: '78% 34%' }}
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
      />
      <Box position="absolute" inset={0} background={overlayGradient} />

      <Flex
        position="relative"
        w="full"
        maxW={`${dimensions.maxWidth + 24 * 2}px`}
        minH={{ base: '420px', lg: '396px' }}
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
            color={heroTextColor}
          >
            {t('Geyser Impact Fund')}
          </H1>
          <Body size={{ base: 'md', lg: 'lg' }} medium lineHeight={{ base: '26px', lg: '28px' }} color={heroTextColor}>
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
              bg={heroPrimaryButtonBg}
              color={heroTextColor}
              fontSize="sm"
              fontWeight="600"
            >
              {t('Become a Field Partner')}
            </Button>
            <Button
              h="42px"
              px="18px"
              borderRadius="6px"
              bg={heroAccentButtonBg}
              color={heroTextColor}
              onClick={onDonateClick}
              fontSize="sm"
              fontWeight="600"
              _hover={{ bg: heroAccentButtonBg }}
            >
              {t('Contribute to recoverable grants')}
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
  const stats = [
    {
      value: '279M sats',
      label: 'allocated through Impact Fund projects',
    },
    {
      value: '12.21M sats',
      label: 'funding enabled by Field Partners',
    },
    {
      value: '20 projects',
      label: 'launched, supported, or promoted by Field Partners',
    },
    {
      value: t('{{count}} partners', { count: FALLBACK_FIELD_PARTNER_COUNT }),
      label: 'trusted local field network, and growing from 40 different countries',
      isDark: true,
    },
  ]

  return (
    <PageSection colors={colors} py={{ base: 10, lg: '64px' }}>
      <VStack align="stretch" spacing={{ base: 8, lg: '38px' }}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 6, lg: '72px' }}>
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
          <VStack align="flex-start" spacing="18px" pt={{ base: 0, lg: '28px' }}>
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
                "They reduce distance, increase trust, help projects launch and promote campaigns, then support recoverable grants that can be repaid and redeployed where it's most needed.",
              )}
            </Body>
          </VStack>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing="14px">
          {stats.map((stat) => (
            <VStack
              key={stat.label}
              align="flex-start"
              justify="center"
              spacing="6px"
              bg={stat.isDark ? colors.darkSurfaceBg : colors.mutedSurfaceBg}
              borderWidth="1px"
              borderColor={stat.isDark ? colors.darkSurfaceBg : colors.borderColor}
              borderRadius="8px"
              px="22px"
              py="20px"
              minH="126px"
            >
              <Body size="30px" lineHeight="34px" bold color={stat.isDark ? colors.accentBg : topSectionTextColor}>
                {stat.value}
              </Body>
              <Body size="sm" lineHeight="20px" medium color={stat.isDark ? 'white' : statMutedTextColor}>
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
    <PageSection colors={colors} py={{ base: 8, lg: '12px' }}>
      <Box bg={colors.mutedSurfaceBg} px={{ base: 4, lg: '11px' }} py={{ base: 8, lg: '54px' }} minH={{ lg: '464px' }}>
        <VStack align="stretch" spacing={{ base: 7, lg: '30px' }}>
          <Flex
            direction={{ base: 'column', lg: 'row' }}
            justify="space-between"
            align={{ base: 'flex-start', lg: 'flex-end' }}
            gap={6}
          >
            <VStack align="flex-start" spacing="10px" maxW="620px">
              <Eyebrow color={sectionEyebrowColor}>{t('How it works')}</Eyebrow>
              <H2
                size={{ base: '3xl', lg: '36px' }}
                lineHeight={{ base: '38px', lg: '40px' }}
                bold
                color={headingColor}
              >
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
      </Box>
    </PageSection>
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
          <Box minW="920px">
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

const LeaderboardHeader = ({ colors }: { colors: SectionColors }) => {
  const headers = ['Rank', 'Field Partner', 'Country', 'Projects launched', 'Workshops', 'Enabled contribution']

  return (
    <HStack
      spacing={0}
      h="44px"
      px={4}
      bg={colors.mutedSurfaceBg}
      borderBottomWidth="1px"
      borderColor={colors.borderColor}
    >
      {headers.map((header, index) => (
        <Body
          key={header}
          size="xs"
          bold
          color={colors.secondaryText}
          letterSpacing="0.11em"
          textTransform="uppercase"
          w={['72px', '286px', '180px', '190px', '190px', '232px'][index]}
          textAlign={index === headers.length - 1 ? 'right' : 'left'}
          flexShrink={0}
        >
          {t(header)}
        </Body>
      ))}
    </HStack>
  )
}

const LeaderboardRow = ({ colors, row }: { colors: SectionColors; row: FieldPartnerLeaderboardRow }) => (
  <HStack spacing={0} minH="42px" px={4} borderBottomWidth="1px" borderColor={colors.borderColor}>
    <Box w="72px" flexShrink={0}>
      <Flex
        align="center"
        justify="center"
        w="24px"
        h="24px"
        borderRadius="full"
        bg={row.rank === 1 ? colors.accentBg : colors.mutedSurfaceBg}
      >
        <Body size="xs" bold color={colors.primaryText}>
          {row.rank}
        </Body>
      </Flex>
    </Box>
    <Body size="sm" bold color={colors.primaryText} w="286px" flexShrink={0}>
      {row.fieldPartner}
    </Body>
    <Body size="sm" color={colors.secondaryText} w="180px" flexShrink={0}>
      {row.country}
    </Body>
    <Body size="sm" color={colors.secondaryText} w="190px" flexShrink={0}>
      {row.projectsLaunched}
    </Body>
    <Body size="sm" color={colors.secondaryText} w="190px" flexShrink={0}>
      {row.workshops}
    </Body>
    <Body size="md" bold color={colors.primaryText} w="232px" textAlign="right" flexShrink={0}>
      {row.enabledContribution}
    </Body>
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
    <PageSection colors={colors} py={{ base: 9, lg: 12 }}>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 7, lg: 8 }} templateColumns={{ lg: '1fr 440px' }}>
        <VStack align="stretch" spacing={5}>
          <Eyebrow color={colors.accentText}>{t('Sponsors so far')}</Eyebrow>
          <SimpleGrid
            columns={{ base: 1, sm: 2, xl: 4 }}
            spacing={4}
            bg={colors.surfaceBg}
            borderWidth="1px"
            borderColor={colors.borderColor}
            borderRadius="8px"
            p={{ base: 5, lg: 8 }}
            minH={{ base: 'auto', lg: '230px' }}
          >
            {sponsors.slice(0, 10).map((sponsor) => (
              <SponsorTile key={sponsor.id} sponsor={sponsor} colors={colors} />
            ))}
          </SimpleGrid>
        </VStack>
        <VStack align="stretch" spacing={5}>
          <Eyebrow color={colors.accentText}>{t('Partner funds')}</Eyebrow>
          <VStack
            as={Link}
            to={partnerFundPath}
            align="stretch"
            justify="space-between"
            bg={colors.darkSurfaceBg}
            borderRadius="8px"
            p={{ base: 7, lg: 9 }}
            minH={{ base: '260px', lg: '236px' }}
            _hover={{ textDecoration: 'none' }}
          >
            <VStack align="flex-start" spacing={3}>
              <H3 size={{ base: '30px', lg: '33px' }} lineHeight={{ base: '36px', lg: '39px' }} bold color="white">
                {partnerFund?.title || t('Latin America Bitcoin Impact Fund')}
              </H3>
              <Body size={{ base: 'md', lg: '18px' }} lineHeight={{ base: '26px', lg: '28px' }} color="whiteAlpha.800">
                {t('Additional partner funds can be routed through local Field Partners and recoverable grants.')}
              </Body>
            </VStack>
            <HStack justify="space-between" align="flex-end" pt={4}>
              <Eyebrow color={colors.accentBg}>{t('LABIF')}</Eyebrow>
              <Body size="24px" lineHeight="28px" bold color={colors.amberBg}>
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
    bg={colors.surfaceBg}
  >
    {sponsor.image ? (
      <Image src={sponsor.image} alt={sponsor.name} maxH="38px" maxW="160px" objectFit="contain" />
    ) : (
      <Body size={{ base: 'md', lg: '20px' }} lineHeight="24px" bold color={colors.primaryText} textAlign="center">
        {sponsor.name}
      </Body>
    )}
  </Flex>
)

const CommitmentSection = ({ colors, onDonateClick }: { colors: SectionColors; onDonateClick: () => void }) => (
  <PageSection colors={colors} py={{ base: 8, lg: 12 }}>
    <VStack align="stretch" spacing={{ base: 5, lg: 6 }}>
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        align="center"
        justify="space-between"
        gap={{ base: 8, lg: 12 }}
        bg={colors.amberBg}
        borderRadius="8px"
        p={{ base: 7, lg: '42px' }}
        minH={{ base: 'auto', lg: '318px' }}
      >
        <VStack align="flex-start" spacing={{ base: 4, lg: 5 }} maxW="760px">
          <Eyebrow color={colors.amberText}>{t('Recoverable grant pool')}</Eyebrow>
          <H2
            size={{ base: '30px', lg: '40px' }}
            lineHeight={{ base: '36px', lg: '47px' }}
            bold
            color={colors.amberText}
          >
            {t('Contribute reusable capital for local projects.')}
          </H2>
          <Body size={{ base: 'md', lg: '20px' }} lineHeight={{ base: '27px', lg: '31px' }} color={colors.amberText}>
            {t(
              'Your contribution helps Field Partners deploy recoverable grants to projects they have helped launch, promote, and support on the ground.',
            )}
          </Body>
        </VStack>
        <VStack
          align="stretch"
          spacing={{ base: 5, lg: 6 }}
          bg={colors.darkSurfaceBg}
          borderRadius="8px"
          p={{ base: 6, lg: 8 }}
          w={{ base: 'full', lg: '370px' }}
          minH={{ base: '220px', lg: '220px' }}
          justify="center"
          flexShrink={0}
        >
          <Eyebrow color="whiteAlpha.800">{t('GEYSER Quarterly pool')}</Eyebrow>
          <H3 size={{ base: '48px', lg: '56px' }} lineHeight={{ base: '52px', lg: '60px' }} bold color="white">
            {t('3M sats')}
          </H3>
          <Button
            h="54px"
            borderRadius="8px"
            bg={colors.surfaceBg}
            color={colors.primaryText}
            fontSize={{ base: 'md', lg: '18px' }}
            fontWeight="900"
            onClick={onDonateClick}
          >
            {t('Contribute to Impact Fund')}
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
        minH={{ base: 'auto', lg: '170px' }}
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
          colorScheme="neutral1"
          size="lg"
          h="54px"
          borderRadius="8px"
          px={8}
          fontSize={{ base: 'md', lg: '18px' }}
          fontWeight="900"
          flexShrink={0}
        >
          {t('Apply to become a Field Partner')}
        </Button>
      </Flex>
    </VStack>
  </PageSection>
)

const ResourcesSection = ({ colors }: { colors: SectionColors }) => (
  <PageSection colors={colors} bg={colors.darkSurfaceBg} py={{ base: 12, lg: 16 }}>
    <VStack align="stretch" spacing={{ base: 9, lg: 12 }}>
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        justify="space-between"
        align={{ base: 'flex-start', lg: 'flex-end' }}
        gap={{ base: 5, lg: 10 }}
      >
        <VStack align="flex-start" spacing={{ base: 4, lg: 5 }}>
          <Eyebrow color={colors.accentBg}>{t('Resources')}</Eyebrow>
          <H2 size={{ base: '40px', lg: '56px' }} lineHeight={{ base: '46px', lg: '64px' }} bold color="white">
            {t('Learn how local impact gets built')}
          </H2>
        </VStack>
        <Body
          size={{ base: 'md', lg: '22px' }}
          lineHeight={{ base: '26px', lg: '32px' }}
          color="whiteAlpha.800"
          maxW="430px"
        >
          {t('Case studies prove the model. Reports show results. Guides help you act.')}
        </Body>
      </Flex>

      <VStack align="stretch" spacing={{ base: 5, lg: 7 }}>
        <H3 size={{ base: '32px', lg: '40px' }} lineHeight={{ base: '38px', lg: '46px' }} bold color="white">
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
        <H3 size={{ base: '32px', lg: '40px' }} lineHeight={{ base: '38px', lg: '46px' }} bold color="white">
          {t('Workshops')}
        </H3>
        <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={{ base: 5, lg: 6 }} templateColumns={{ xl: '1.8fr 1fr' }}>
          <WorkshopVideoCard colors={colors} />
          <WorkshopResourcesCard colors={colors} />
        </SimpleGrid>
      </VStack>

      <VStack align="stretch" spacing={{ base: 5, lg: 6 }}>
        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={{ base: 5, lg: 6 }}>
          <H3 size={{ base: '32px', lg: '38px' }} lineHeight={{ base: '38px', lg: '44px' }} bold color="white">
            {t('Impact Reports')}
          </H3>
          <H3
            size={{ base: '32px', lg: '38px' }}
            lineHeight={{ base: '38px', lg: '44px' }}
            bold
            color="white"
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
  </PageSection>
)

const WorkshopVideoCard = ({ colors }: { colors: SectionColors }) => (
  <Flex
    direction={{ base: 'column', lg: 'row' }}
    bg={colors.surfaceBg}
    borderRadius="8px"
    p={{ base: 4, lg: 5 }}
    gap={{ base: 5, lg: 7 }}
    minH={{ base: 'auto', lg: '290px' }}
  >
    <Flex
      position="relative"
      align="center"
      justify="center"
      bg="#111"
      borderRadius="2px"
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
    </VStack>
  </Flex>
)

const WorkshopResourcesCard = ({ colors }: { colors: SectionColors }) => (
  <VStack
    align="stretch"
    justify="space-between"
    bg={colors.accentBg}
    borderRadius="8px"
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
      borderRadius="8px"
      bg={colors.darkSurfaceBg}
      color="white"
      fontSize="md"
      fontWeight="900"
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
    borderRadius="8px"
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
        borderRadius="8px"
        objectFit="cover"
        objectPosition="center"
      />
    ) : (
      <Box h={{ base: '96px', lg: '108px' }} borderRadius="8px" bg="#E6E8EA" />
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
    borderRadius="8px"
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
      borderRadius="8px"
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
