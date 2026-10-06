import { Box, Button, Flex, HStack, Image, SimpleGrid, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo } from 'react'
import { PiCaretRightBold } from 'react-icons/pi'
import { Link } from 'react-router'

import { Head } from '@/config/Head.tsx'
import { useImpactFundsDonateModal } from '@/modules/impactFunds/hooks/useImpactFundsDonateModal.tsx'
import { CIRCULAR_GRANTS_CATEGORY_ID } from '@/modules/impactFunds/utils/impactFundDonatePreferences.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H1, H2, H3 } from '@/shared/components/typography/Heading.tsx'
import { getPath } from '@/shared/constants'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { UserExternalLinksComponent } from '@/shared/molecules/UserExternalLinks.tsx'
import { standardPadding } from '@/shared/styles/index.ts'

type AfribitCaseStudyColors = {
  pageBg: string
  ink: string
  muted: string
  line: string
  mutedSurfaceBg: string
  surfaceBg: string
  accentBg: string
  accentHoverBg: string
  onAccentText: string
  accentLine: string
  accentText: string
}

const radius = {
  section: '16px',
  card: '10px',
  button: '6px',
  pill: '999px',
}

const AFRIBIT_CASE_STUDY_HERO_IMAGE_URL =
  'https://storage.googleapis.com/geyser-media/impact-funds/afribit-case-study-hero.png'
const AFRIBIT_LOGO_HERO_IMAGE_URL = 'https://storage.googleapis.com/geyser-media/impact-funds/afribit-logo-hero.png'
const AFRIBIT_WORKSHOP_VIDEO_URL = 'https://www.youtube.com/embed/pU1KxP0ddng'

const CHAMA_MODEL_SECTION_ID = 'chama-model'

const scrollToChamaModel = () => {
  document.getElementById(CHAMA_MODEL_SECTION_ID)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const tags = ['0% interest', 'community agreements', 'local field partner', 'reusable capital'] as const

type CohortGroup = {
  eyebrow: string
  title: string
  description: string
  dark?: boolean
}

const cohortGroups: readonly CohortGroup[] = [
  {
    eyebrow: '5 people',
    title: 'Afribit alumni',
    description: 'Previous circular grant participants benchmark expectations and capital return behavior.',
  },
  {
    eyebrow: '5 people',
    title: 'Informal debt survivors',
    description: 'Participants with predatory informal debt experience identify pain points, urgency, and risk.',
  },
  {
    eyebrow: '5 people',
    title: 'First-time participants',
    description:
      'Clean-slate participants help clarify what fair circular grant support needs to feel understandable and safe.',
    dark: true,
  },
] as const

type ModelCardBorderAccent = 'ink' | 'forest' | 'sage'

type ModelCard = {
  title: string
  description: string
  borderAccent: ModelCardBorderAccent
  dark?: boolean
}

const modelCards: readonly ModelCard[] = [
  {
    title: 'Geyser provides capital',
    description: 'Impact Fund capital backs selected local businesses as circular grants.',
    borderAccent: 'ink',
  },
  {
    title: 'Afribit validates trust',
    description: 'Afribit validates participants locally, supports community agreements, and handles reporting.',
    borderAccent: 'forest',
  },
  {
    title: 'Participants commit',
    description: 'Businesses set clear goals, capital return commitments, updates, and communication channels.',
    borderAccent: 'sage',
  },
  {
    title: 'Capital recirculates',
    description: 'Recovered funds can be reused for more Geyser projects in the same community.',
    borderAccent: 'ink',
    dark: true,
  },
] as const

const portfolioProjects = [
  {
    project: 'Krezzy Kicks',
    projectName: 'krezzykickscollectionkibera',
    purpose: 'Inventory and merchant activation',
    status: "Pilot business identified in Afribit's circular grant model with BTC Map listing.",
  },
  {
    project: 'Threewest Collections',
    projectName: '3westcollectionkibera',
    purpose: 'Stock, sales, and Bitcoin payments',
    status: 'Part of the initial cohort list and connected to local Bitcoin commerce.',
  },
  {
    project: 'Malega Shop',
    projectName: null,
    purpose: 'Shop working capital',
    status: 'Listed as a pilot business to be brought online through the Chama process.',
  },
  {
    project: 'Kibera BTC Shop',
    projectName: 'bitcoinshop',
    purpose: 'Merchant growth capital',
    status: 'A local Bitcoin merchant that can demonstrate capital return and impact.',
  },
  {
    project: 'Ruth Shop',
    projectName: null,
    purpose: 'Retail float and stability',
    status: 'Included in the pilot business list with a BTC Map footprint.',
  },
  {
    project: 'Kingshop Kibera',
    projectName: null,
    purpose: 'Story, profile, and campaign launch',
    status: 'A workshop entrepreneur profile that turns local business activity into a Geyser project.',
  },
] as const

const impactStats = [
  ['Interest', '0%'],
  ['Pilot cohorts', '2'],
  ['People per cohort', '15 people'],
  ['Project list', '6'],
] as const

const getModelCardBorderColor = (colors: AfribitCaseStudyColors, accent: ModelCardBorderAccent) => {
  switch (accent) {
    case 'forest':
      return colors.accentText
    case 'sage':
      return colors.accentLine
    default:
      return colors.ink
  }
}

export const AfribitCaseStudyPage = () => {
  const { openDonateModal, donateModalElement } = useImpactFundsDonateModal()
  const onDonateClick = () => openDonateModal({ defaultCategoryIds: [CIRCULAR_GRANTS_CATEGORY_ID] })
  const pageBg = 'utils.pageBg'
  const ink = 'utils.text'
  const muted = 'neutral1.11'
  const line = 'neutral1.6'
  const mutedSurfaceBg = 'neutralAlpha.3'
  const surfaceBg = 'utils.pbg'
  const accentBg = 'primary1.9'
  const accentHoverBg = 'primary1.10'
  const onAccentText = 'utils.primaryContrast'
  const accentLine = 'primary1.8'
  const accentText = 'primary1.11'
  const colors = useMemo<AfribitCaseStudyColors>(
    () => ({
      pageBg,
      ink,
      muted,
      line,
      mutedSurfaceBg,
      surfaceBg,
      accentBg,
      accentHoverBg,
      onAccentText,
      accentLine,
      accentText,
    }),
    [
      accentBg,
      accentHoverBg,
      accentLine,
      accentText,
      ink,
      line,
      muted,
      mutedSurfaceBg,
      onAccentText,
      pageBg,
      surfaceBg,
    ],
  )

  return (
    <>
      {donateModalElement}

      <Head
        title={t('Afribit Case Study')}
        description={t(
          'How Geyser and Afribit are partnering to fund Kibera entrepreneurs with debt-free circular grant capital.',
        )}
        image={AFRIBIT_CASE_STUDY_HERO_IMAGE_URL}
        url={`https://geyser.fund${getPath('discoveryCircularGrantsAfribitCaseStudy')}`}
      />

      <Box w="full" bg={colors.pageBg} color={colors.ink}>
        <VStack align="stretch" spacing={0}>
          <PageSection py={{ base: 4, lg: 5 }}>
            <Breadcrumb colors={colors} />
          </PageSection>

          <HeroSection colors={colors} onDonateClick={onDonateClick} />

          <PageSection>
            <SimpleGrid
              columns={{ base: 1, lg: 2 }}
              templateColumns={{ lg: '1.15fr 0.85fr' }}
              spacing={{ base: 6, lg: 10 }}
            >
              <VideoCard colors={colors} />
              <VStack align="flex-start" spacing={5} justify="center">
                <Eyebrow colors={colors}>{t('What this case study is')}</Eyebrow>
                <H2 size={{ base: '32px', lg: '44px' }} lineHeight={{ base: '38px', lg: '50px' }} bold>
                  {t('Afribit turns local knowledge into safer circular capital.')}
                </H2>
                <Body color={colors.muted} lineHeight="27px">
                  {t(
                    'The pilot tests how Geyser-backed circular grants can support small Kibera businesses without interest, while Afribit validates participants through cohort sessions, community agreements, and monthly reporting.',
                  )}
                </Body>
                <HStack spacing={2} flexWrap="wrap">
                  {tags.map((tag) => (
                    <Box
                      key={tag}
                      bg={colors.mutedSurfaceBg}
                      borderRadius={radius.button}
                      borderWidth="1px"
                      borderColor={colors.line}
                      px={3}
                      py={2}
                    >
                      <Body size="xs" bold>
                        {t(tag)}
                      </Body>
                    </Box>
                  ))}
                </HStack>
              </VStack>
            </SimpleGrid>
          </PageSection>

          <PageSection>
            <Box
              id={CHAMA_MODEL_SECTION_ID}
              scrollMarginTop={{ base: '72px', md: '88px' }}
              bg={colors.surfaceBg}
              borderRadius={radius.section}
              borderWidth="1px"
              borderColor={colors.line}
              p={{ base: 6, lg: 8 }}
            >
              <SimpleGrid
                columns={{ base: 1, lg: 2 }}
                templateColumns={{ lg: '0.85fr 1.15fr' }}
                spacing={{ base: 6, lg: 10 }}
                mb={7}
              >
                <VStack align="flex-start" spacing={3}>
                  <Eyebrow colors={colors}>{t('The chama')}</Eyebrow>
                  <H2 size={{ base: '32px', lg: '42px' }} lineHeight={{ base: '38px', lg: '48px' }} bold>
                    {t('A cohort-based trust layer for capital.')}
                  </H2>
                </VStack>
                <Body lineHeight="27px">
                  {t(
                    'Each pilot cohort brings together 15 people and divides them into three feedback groups. The aim is to validate need, surface risk, set capital return commitments, and turn businesses into Geyser-listed circular grant projects.',
                  )}
                </Body>
              </SimpleGrid>
              <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={4}>
                {cohortGroups.map((group) => (
                  <Box
                    key={group.title}
                    bg={group.dark ? colors.accentBg : colors.pageBg}
                    color={group.dark ? colors.onAccentText : colors.ink}
                    borderRadius={radius.card}
                    borderWidth="1px"
                    borderColor={group.dark ? 'transparent' : colors.line}
                    p={5}
                    minH="178px"
                  >
                    <Eyebrow colors={colors} color={group.dark ? colors.onAccentText : colors.accentText}>
                      {t(group.eyebrow)}
                    </Eyebrow>
                    <H3 size="24px" lineHeight="30px" bold mt={3} color="inherit">
                      {t(group.title)}
                    </H3>
                    <Body color={group.dark ? colors.onAccentText : colors.muted} lineHeight="24px" mt={3}>
                      {t(group.description)}
                    </Body>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
          </PageSection>

          <PageSection>
            <SimpleGrid
              columns={{ base: 1, lg: 2 }}
              templateColumns={{ lg: '0.85fr 1.15fr' }}
              spacing={{ base: 6, lg: 10 }}
            >
              <VStack align="flex-start" spacing={4}>
                <Eyebrow colors={colors}>{t('Circular grants')}</Eyebrow>
                <H2 size={{ base: '34px', lg: '44px' }} lineHeight={{ base: '40px', lg: '48px' }} bold>
                  {t('0% interest capital, without the debt burden.')}
                </H2>
                <Body color={colors.muted} lineHeight="27px">
                  {t(
                    'A circular grant acts like patient working capital. If the business succeeds, funds return to the system and can support the next entrepreneur. If it struggles, the model is designed around trust, reporting, and support rather than extractive interest.',
                  )}
                </Body>
              </VStack>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                {modelCards.map((card) => (
                  <Box
                    key={card.title}
                    bg={card.dark ? colors.accentBg : colors.surfaceBg}
                    color={card.dark ? colors.onAccentText : colors.ink}
                    borderBottomLeftRadius={radius.card}
                    borderBottomRightRadius={radius.card}
                    borderTopLeftRadius={0}
                    borderTopRightRadius={0}
                    borderWidth="1px"
                    borderColor={colors.line}
                    borderTopWidth="3px"
                    borderTopColor={getModelCardBorderColor(colors, card.borderAccent)}
                    p={5}
                    minH="164px"
                  >
                    <H3 size="22px" lineHeight="28px" bold color="inherit">
                      {t(card.title)}
                    </H3>
                    <Body color={card.dark ? colors.onAccentText : colors.muted} lineHeight="24px" mt={3}>
                      {t(card.description)}
                    </Body>
                  </Box>
                ))}
              </SimpleGrid>
            </SimpleGrid>
          </PageSection>

          <PageSection>
            <Box bg={colors.accentBg} color={colors.onAccentText} borderRadius={radius.section} p={{ base: 6, lg: 8 }}>
              <SimpleGrid
                columns={{ base: 1, lg: 2 }}
                templateColumns={{ lg: '0.95fr 1.05fr' }}
                spacing={{ base: 5, lg: 8 }}
                mb={7}
              >
                <VStack align="flex-start" spacing={3}>
                  <Eyebrow colors={colors} color={colors.onAccentText}>
                    {t('The chama portfolio')}
                  </Eyebrow>
                  <H2
                    size={{ base: '34px', lg: '44px' }}
                    lineHeight={{ base: '40px', lg: '48px' }}
                    bold
                    color="inherit"
                  >
                    {t('Six Geyser projects backed as circular grants.')}
                  </H2>
                </VStack>
                <Body color={colors.onAccentText} lineHeight="27px">
                  {t(
                    'Each project represents a small business or local merchant entering the cohort: clear story, clear use of funds, and a capital return commitment tracked with Afribit.',
                  )}
                </Body>
              </SimpleGrid>
              <PortfolioTable colors={colors} />
            </Box>
          </PageSection>

          <PageSection>
            <SimpleGrid columns={{ base: 1, lg: 2 }} templateColumns={{ lg: '2fr 1fr' }} spacing={5}>
              <Box
                bg={colors.surfaceBg}
                borderRadius={radius.section}
                borderWidth="1px"
                borderColor={colors.line}
                p={{ base: 6, lg: 8 }}
              >
                <Eyebrow colors={colors}>{t('Fund reusable capital')}</Eyebrow>
                <H2 size={{ base: '34px', lg: '44px' }} lineHeight={{ base: '40px', lg: '48px' }} bold mt={3}>
                  {t('Fund more Impact Fund circular grants.')}
                </H2>
                <Body lineHeight="27px" mt={4} maxW="720px" color={colors.muted}>
                  {t(
                    'Support businesses that can return capital, recycle sats, and create compounding impact across local Bitcoin communities.',
                  )}
                </Body>
                <Button
                  h="42px"
                  px={5}
                  mt={6}
                  borderRadius={radius.button}
                  bg={colors.accentBg}
                  color={colors.onAccentText}
                  fontSize="sm"
                  fontWeight="800"
                  onClick={onDonateClick}
                  _hover={{ bg: colors.accentHoverBg }}
                >
                  {t('Donate')}
                </Button>
              </Box>
              <Box
                bg={colors.accentBg}
                color={colors.onAccentText}
                borderRadius={radius.section}
                p={{ base: 6, lg: 8 }}
              >
                <Eyebrow colors={colors} color={colors.onAccentText}>
                  {t('Why it matters')}
                </Eyebrow>
                <VStack align="stretch" spacing={0} mt={5}>
                  {impactStats.map(([label, value]) => (
                    <HStack
                      key={label}
                      justify="space-between"
                      borderBottomWidth={label === 'Project list' ? 0 : '1px'}
                      borderBottomColor={colors.accentLine}
                      py={3}
                    >
                      <Body color={colors.onAccentText}>{t(label)}</Body>
                      <Body bold color={colors.onAccentText}>
                        {t(value)}
                      </Body>
                    </HStack>
                  ))}
                </VStack>
              </Box>
            </SimpleGrid>
          </PageSection>

          <FooterSection />
        </VStack>
      </Box>
    </>
  )
}

const Breadcrumb = ({ colors }: { colors: AfribitCaseStudyColors }) => (
  <HStack spacing={2} color={colors.muted} flexWrap="wrap">
    <Body as={Link} to={getPath('discoveryImpactFunds')} size="xs" bold _hover={{ color: colors.ink }}>
      {t('Impact Funds')}
    </Body>
    <PiCaretRightBold size={11} />
    <Body as={Link} to={getPath('discoveryCircularGrants')} size="xs" bold _hover={{ color: colors.ink }}>
      {t('Circular Grant')}
    </Body>
    <PiCaretRightBold size={11} />
    <Body size="xs" bold color={colors.ink} aria-current="page">
      {t('Afribit Case Study')}
    </Body>
  </HStack>
)

const HeroSection = ({ colors, onDonateClick }: { colors: AfribitCaseStudyColors; onDonateClick: () => void }) => (
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
    bg="utils.blackContrast"
  >
    <Box
      position="absolute"
      inset={0}
      backgroundImage={`url('${AFRIBIT_CASE_STUDY_HERO_IMAGE_URL}')`}
      backgroundPosition={{ base: 'center', lg: 'center' }}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
    />
    <Box
      position="absolute"
      inset={0}
      bg="linear-gradient(90deg, rgba(0,0,0,0.76), rgba(0,0,0,0.42), rgba(0,0,0,0.08))"
    />
    <Flex
      position="relative"
      w="full"
      maxW={`${dimensions.maxWidth + 24 * 2}px`}
      minH={dimensions.impactLendingHero.minHeight}
      mx="auto"
      align="center"
      justify="space-between"
      gap={8}
      px={standardPadding}
      py={{ base: 10, lg: 12 }}
      direction={{ base: 'column', lg: 'row' }}
    >
      <VStack align="flex-start" spacing={5} maxW={{ base: 'full', lg: '650px' }}>
        <Eyebrow colors={colors} color="utils.whiteContrast">
          {t('Geyser x Afribit Kibera')}
        </Eyebrow>
        <H1 size={{ base: '36px', lg: '56px' }} lineHeight={{ base: '42px', lg: '62px' }} bold color="white">
          {t('Partnering to fund Kibera entrepreneurs with reusable capital.')}
        </H1>
        <Body color="whiteAlpha.900" lineHeight="27px" maxW="620px">
          {t(
            'Afribit brings local trust, participant validation, and monthly monitoring. Geyser brings debt-free circular grant capital that can return and fund the next business.',
          )}
        </Body>
        <HStack spacing={3} flexWrap="wrap" pt={2}>
          <Button
            h="42px"
            px={5}
            borderRadius={radius.button}
            bg={colors.accentBg}
            color={colors.onAccentText}
            fontSize="sm"
            fontWeight="800"
            onClick={onDonateClick}
            _hover={{ bg: colors.accentHoverBg }}
          >
            {t('Donate')}
          </Button>
          <Button
            type="button"
            h="42px"
            px={5}
            borderRadius={radius.button}
            bg="utils.whiteContrast"
            color="utils.blackContrast"
            fontSize="sm"
            fontWeight="800"
            onClick={scrollToChamaModel}
            _hover={{ bg: 'utils.whiteContrast' }}
          >
            {t('See the Chama model')}
          </Button>
        </HStack>
      </VStack>
      <VStack
        spacing={2}
        bg="utils.whiteContrast"
        color="utils.blackContrast"
        borderRadius={radius.pill}
        borderWidth="1px"
        borderColor={colors.line}
        w={{ base: '210px', lg: '250px' }}
        h={{ base: '210px', lg: '250px' }}
        flexShrink={0}
        align="center"
        justify="center"
        textAlign="center"
        p={6}
      >
        <Image src={AFRIBIT_LOGO_HERO_IMAGE_URL} alt={t('Afribit partnership')} maxW="132px" />
        <Body size="xs" bold>
          {t('Partnership')}
        </Body>
        <Body size="sm" lineHeight="21px">
          {t('Local trust meets reusable Bitcoin capital.')}
        </Body>
      </VStack>
    </Flex>
  </Box>
)

const VideoCard = ({ colors }: { colors: AfribitCaseStudyColors }) => (
  <VStack align="stretch" spacing={3}>
    <Box
      bg={colors.mutedSurfaceBg}
      borderRadius={radius.section}
      borderWidth="1px"
      borderColor={colors.line}
      minH={{ base: '280px', lg: '400px' }}
      position="relative"
    >
      <Box
        as="iframe"
        src={AFRIBIT_WORKSHOP_VIDEO_URL}
        title={t('Afribit Kibera')}
        w="full"
        h="full"
        minH={{ base: '280px', lg: '400px' }}
        border="0"
        borderRadius={radius.section}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </Box>
    <Body size="sm" color={colors.muted}>
      {t('Video: Afribit workshop activity and entrepreneur onboarding in Kibera.')}
    </Body>
  </VStack>
)

const PortfolioTable = ({ colors }: { colors: AfribitCaseStudyColors }) => (
  <Box overflowX="auto" borderRadius={radius.card}>
    <Box
      minW="780px"
      bg={colors.surfaceBg}
      color={colors.ink}
      borderRadius={radius.card}
      borderWidth="1px"
      borderColor={colors.line}
      overflow="hidden"
    >
      <SimpleGrid columns={3} templateColumns="1.1fr 1fr 1.75fr" bg={colors.mutedSurfaceBg}>
        {['Project', 'Capital purpose', 'Chama status'].map((heading) => (
          <Body
            key={heading}
            size="xs"
            bold
            letterSpacing="0.12em"
            textTransform="uppercase"
            color={colors.muted}
            px={5}
            py={4}
          >
            {t(heading)}
          </Body>
        ))}
      </SimpleGrid>
      {portfolioProjects.map((row) => (
        <SimpleGrid
          key={row.project}
          columns={3}
          templateColumns="1.1fr 1fr 1.75fr"
          borderBottomWidth="1px"
          borderBottomColor={colors.line}
        >
          {row.projectName ? (
            <Body
              as={Link}
              to={getPath('project', row.projectName)}
              bold
              px={5}
              py={5}
              color={colors.accentText}
              textDecoration="underline"
              textUnderlineOffset="3px"
              _hover={{ color: colors.ink }}
            >
              {t(row.project)}
            </Body>
          ) : (
            <Body bold px={5} py={5}>
              {t(row.project)}
            </Body>
          )}
          <Body px={5} py={5} lineHeight="24px">
            {t(row.purpose)}
          </Body>
          <Body px={5} py={5} color={colors.muted} lineHeight="24px">
            {t(row.status)}
          </Body>
        </SimpleGrid>
      ))}
    </Box>
  </Box>
)

const PageSection = ({
  children,
  py = dimensions.impactLendingSection.paddingY,
}: {
  children: React.ReactNode
  py?: React.ComponentProps<typeof Box>['py']
}) => (
  <Box w="full" px={standardPadding} py={py}>
    <Box maxW={`${dimensions.maxWidth + 24 * 2}px`} mx="auto">
      {children}
    </Box>
  </Box>
)

const Eyebrow = ({
  children,
  colors,
  color,
}: {
  children: React.ReactNode
  colors: AfribitCaseStudyColors
  color?: string
}) => (
  <Body size="sm" medium color={color ?? colors.muted}>
    {children}
  </Body>
)

const FooterSection = () => (
  <Box w="full" px={standardPadding} pb={{ base: 28, lg: 10 }}>
    <Box maxW={`${dimensions.maxWidth + 24 * 2}px`} mx="auto">
      <UserExternalLinksComponent />
    </Box>
  </Box>
)
