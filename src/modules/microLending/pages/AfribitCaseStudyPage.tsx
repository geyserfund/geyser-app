import { Box, Button, Flex, HStack, Image, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { PiCaretRightBold } from 'react-icons/pi'
import { Link } from 'react-router'

import { Head } from '@/config/Head.tsx'
import { useImpactFundsDonateModal } from '@/modules/impactFunds/hooks/useImpactFundsDonateModal.tsx'
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
  beige: string
  gold: string
  surfaceBg: string
  darkSurfaceBg: string
  onGoldText: string
  heroAccentBg: string
  accentTeal: string
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

const t = (value: string) => value

const CHAMA_MODEL_SECTION_ID = 'chama-model'

const scrollToChamaModel = () => {
  document.getElementById(CHAMA_MODEL_SECTION_ID)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const tags = ['0% interest', 'social collateral', 'local guarantor', 'reusable capital'] as const

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
    description: 'Previous loan recipients benchmark expectations and repayment behavior.',
  },
  {
    eyebrow: '5 people',
    title: 'Shylock survivors',
    description: 'Borrowers with informal lender experience identify pain points, urgency, and risk.',
  },
  {
    eyebrow: '5 people',
    title: 'First-time borrowers',
    description: 'Clean-slate participants help clarify what fair credit needs to feel understandable and safe.',
    dark: true,
  },
] as const

type ModelCardBorderAccent = 'ink' | 'teal' | 'gold'

type ModelCard = {
  title: string
  description: string
  borderAccent: ModelCardBorderAccent
  dark?: boolean
}

const modelCards: readonly ModelCard[] = [
  {
    title: 'Geyser provides capital',
    description: 'Impact Fund capital backs selected local businesses as recoverable grants.',
    borderAccent: 'ink',
  },
  {
    title: 'Afribit validates trust',
    description: 'Afribit acts as guarantor, insurer, monitor, and local reporting partner.',
    borderAccent: 'teal',
  },
  {
    title: 'Borrowers commit',
    description: 'Businesses set clear goals, repayment commitments, updates, and communication channels.',
    borderAccent: 'gold',
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
    purpose: 'Inventory and merchant activation',
    status: "Pilot business identified in Afribit's lending model with BTC Map listing.",
  },
  {
    project: 'Threewest Collections',
    purpose: 'Stock, sales, and Bitcoin payments',
    status: 'Part of the initial cohort list and connected to local Bitcoin commerce.',
  },
  {
    project: 'Malega Shop',
    purpose: 'Shop working capital',
    status: 'Listed as a pilot business to be brought online through the Chama process.',
  },
  {
    project: 'Kibera BTC Shop',
    purpose: 'Merchant growth capital',
    status: 'A local Bitcoin merchant that can demonstrate repayment behavior and impact.',
  },
  {
    project: 'Ruth Shop',
    purpose: 'Retail float and stability',
    status: 'Included in the pilot business list with a BTC Map footprint.',
  },
  {
    project: 'Kingshop Kibera',
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
    case 'teal':
      return colors.accentTeal
    case 'gold':
      return colors.gold
    default:
      return colors.ink
  }
}

export const AfribitCaseStudyPage = () => {
  const { onDonateClick, donateModalElement } = useImpactFundsDonateModal()
  const colors: AfribitCaseStudyColors = {
    pageBg: useColorModeValue('white', 'utils.pbg'),
    ink: useColorModeValue('#17120C', 'neutral1.12'),
    muted: useColorModeValue('#5F6268', 'neutral1.10'),
    line: useColorModeValue('#E9E2D4', 'neutral1.6'),
    beige: useColorModeValue('#EAE3D4', 'neutral1.2'),
    gold: useColorModeValue('#F6CF4A', 'amber.9'),
    surfaceBg: useColorModeValue('white', 'neutral1.3'),
    darkSurfaceBg: useColorModeValue('#17120C', 'neutral1.1'),
    onGoldText: useColorModeValue('#17120C', '#17120C'),
    heroAccentBg: useColorModeValue('#F7931A', 'orange.400'),
    accentTeal: useColorModeValue('#00A884', 'primary1.300'),
  }

  return (
    <>
      {donateModalElement}

      <Head
        title={t('Afribit Case Study')}
        description={t(
          'How Geyser and Afribit are partnering to fund Kibera entrepreneurs with reusable recoverable grant capital.',
        )}
        image={AFRIBIT_CASE_STUDY_HERO_IMAGE_URL}
        url={`https://geyser.fund${getPath('discoveryRecoverableGrantsAfribitCaseStudy')}`}
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
                <Eyebrow colors={colors} color={colors.muted}>
                  {t('What this case study is')}
                </Eyebrow>
                <H2 size={{ base: '32px', lg: '44px' }} lineHeight={{ base: '38px', lg: '50px' }} bold>
                  {t('Afribit turns local knowledge into safer recoverable capital.')}
                </H2>
                <Body color={colors.muted} lineHeight="27px">
                  {t(
                    'The pilot tests how Geyser-backed recoverable grants can support small Kibera businesses without interest, while Afribit validates borrowers through cohort sessions, guarantor sign-off, social collateral, and monthly reporting.',
                  )}
                </Body>
                <HStack spacing={2} flexWrap="wrap">
                  {tags.map((tag) => (
                    <Box
                      key={tag}
                      bg={colors.beige}
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
              bg={colors.beige}
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
                  <Eyebrow colors={colors} color={colors.muted}>
                    {t('The chama')}
                  </Eyebrow>
                  <H2 size={{ base: '32px', lg: '42px' }} lineHeight={{ base: '38px', lg: '48px' }} bold>
                    {t('A cohort-based trust layer for capital.')}
                  </H2>
                </VStack>
                <Body lineHeight="27px">
                  {t(
                    'Each pilot cohort brings together 15 people and divides them into three feedback groups. The aim is to validate need, surface risk, set repayment commitments, and turn businesses into Geyser-listed recoverable grant projects.',
                  )}
                </Body>
              </SimpleGrid>
              <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={4}>
                {cohortGroups.map((group) => (
                  <Box
                    key={group.title}
                    bg={group.dark ? colors.darkSurfaceBg : colors.surfaceBg}
                    color={group.dark ? 'white' : colors.ink}
                    borderRadius={radius.card}
                    borderWidth="1px"
                    borderColor={colors.line}
                    p={5}
                    minH="178px"
                  >
                    <Eyebrow colors={colors} color={group.dark ? colors.gold : colors.accentTeal}>
                      {t(group.eyebrow)}
                    </Eyebrow>
                    <H3 size="24px" lineHeight="30px" bold mt={3} color="inherit">
                      {t(group.title)}
                    </H3>
                    <Body color={group.dark ? 'whiteAlpha.800' : colors.muted} lineHeight="24px" mt={3}>
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
                <Eyebrow colors={colors} color={colors.muted}>
                  {t('Recoverable grants')}
                </Eyebrow>
                <H2 size={{ base: '34px', lg: '44px' }} lineHeight={{ base: '40px', lg: '48px' }} bold>
                  {t('0% interest capital, without the debt burden.')}
                </H2>
                <Body color={colors.muted} lineHeight="27px">
                  {t(
                    'A recoverable grant acts like patient working capital. If the business succeeds, funds are repaid into the system and can support the next entrepreneur. If it struggles, the model is designed around trust, reporting, and support rather than extractive interest.',
                  )}
                </Body>
              </VStack>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                {modelCards.map((card) => (
                  <Box
                    key={card.title}
                    bg={card.dark ? colors.darkSurfaceBg : colors.surfaceBg}
                    color={card.dark ? 'white' : colors.ink}
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
                    <Body color={card.dark ? 'whiteAlpha.800' : colors.muted} lineHeight="24px" mt={3}>
                      {t(card.description)}
                    </Body>
                  </Box>
                ))}
              </SimpleGrid>
            </SimpleGrid>
          </PageSection>

          <PageSection>
            <Box
              bg={colors.darkSurfaceBg}
              color="white"
              borderRadius={radius.section}
              borderWidth="1px"
              borderColor={colors.line}
              p={{ base: 6, lg: 8 }}
            >
              <SimpleGrid
                columns={{ base: 1, lg: 2 }}
                templateColumns={{ lg: '0.95fr 1.05fr' }}
                spacing={{ base: 5, lg: 8 }}
                mb={7}
              >
                <VStack align="flex-start" spacing={3}>
                  <Eyebrow colors={colors} color={colors.gold}>
                    {t('The chama portfolio')}
                  </Eyebrow>
                  <H2 size={{ base: '34px', lg: '44px' }} lineHeight={{ base: '40px', lg: '48px' }} bold color="white">
                    {t('Six Geyser projects backed as recoverable grants.')}
                  </H2>
                </VStack>
                <Body color="whiteAlpha.850" lineHeight="27px">
                  {t(
                    'Each project represents a small business or local merchant entering the cohort: clear story, clear use of funds, and a repayment commitment tracked with Afribit.',
                  )}
                </Body>
              </SimpleGrid>
              <PortfolioTable colors={colors} />
            </Box>
          </PageSection>

          <PageSection>
            <SimpleGrid columns={{ base: 1, lg: 2 }} templateColumns={{ lg: '2fr 1fr' }} spacing={5}>
              <Box
                bg={colors.gold}
                borderRadius={radius.section}
                borderWidth="1px"
                borderColor={colors.line}
                p={{ base: 6, lg: 8 }}
              >
                <Eyebrow colors={colors} color={colors.onGoldText}>
                  {t('Fund reusable capital')}
                </Eyebrow>
                <H2
                  size={{ base: '34px', lg: '44px' }}
                  lineHeight={{ base: '40px', lg: '48px' }}
                  bold
                  mt={3}
                  color={colors.onGoldText}
                >
                  {t('Fund more Impact Fund recoverable grants.')}
                </H2>
                <Body lineHeight="27px" mt={4} maxW="720px" color={colors.onGoldText}>
                  {t(
                    'Support businesses that can repay, recycle capital, and create compounding impact across local Bitcoin communities.',
                  )}
                </Body>
                <Button
                  h="42px"
                  px={5}
                  mt={6}
                  borderRadius={radius.button}
                  bg={colors.darkSurfaceBg}
                  color="white"
                  fontSize="sm"
                  fontWeight="800"
                  onClick={onDonateClick}
                >
                  {t('Donate')}
                </Button>
              </Box>
              <Box
                bg={colors.darkSurfaceBg}
                color="white"
                borderRadius={radius.section}
                borderWidth="1px"
                borderColor={colors.line}
                p={{ base: 6, lg: 8 }}
              >
                <Eyebrow colors={colors} color={colors.gold}>
                  {t('Why it matters')}
                </Eyebrow>
                <VStack align="stretch" spacing={0} mt={5}>
                  {impactStats.map(([label, value]) => (
                    <HStack
                      key={label}
                      justify="space-between"
                      borderBottomWidth={label === 'Project list' ? 0 : '1px'}
                      borderBottomColor="whiteAlpha.250"
                      py={3}
                    >
                      <Body color="whiteAlpha.850">{t(label)}</Body>
                      <Body bold color="white">
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
    <Body
      as={Link}
      to={getPath('discoveryImpactFunds')}
      size="xs"
      bold
      letterSpacing="0.18em"
      textTransform="uppercase"
      _hover={{ color: colors.ink }}
    >
      {t('Impact Funds')}
    </Body>
    <PiCaretRightBold size={11} />
    <Body
      as={Link}
      to={getPath('discoveryRecoverableGrants')}
      size="xs"
      bold
      letterSpacing="0.18em"
      textTransform="uppercase"
      _hover={{ color: colors.ink }}
    >
      {t('Recoverable Grant')}
    </Body>
    <PiCaretRightBold size={11} />
    <Body size="xs" bold letterSpacing="0.18em" textTransform="uppercase" color={colors.ink} aria-current="page">
      {t('Afribit Case Study')}
    </Body>
  </HStack>
)

const HeroSection = ({
  colors,
  onDonateClick,
}: {
  colors: AfribitCaseStudyColors
  onDonateClick: () => void
}) => (
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
        <Eyebrow colors={colors} color={colors.gold}>
          {t('Geyser x Afribit Kibera')}
        </Eyebrow>
        <H1 size={{ base: '36px', lg: '56px' }} lineHeight={{ base: '42px', lg: '62px' }} bold color="white">
          {t('Partnering to fund Kibera entrepreneurs with reusable capital.')}
        </H1>
        <Body color="whiteAlpha.900" lineHeight="27px" maxW="620px">
          {t(
            'Afribit brings local trust, borrower validation, and monthly monitoring. Geyser brings 0% recoverable grant capital that can return and fund the next business.',
          )}
        </Body>
        <HStack spacing={3} flexWrap="wrap" pt={2}>
          <Button
            h="42px"
            px={5}
            borderRadius={radius.button}
            bg={colors.heroAccentBg}
            color={colors.onGoldText}
            fontSize="sm"
            fontWeight="800"
            onClick={onDonateClick}
            _hover={{ bg: colors.heroAccentBg }}
          >
            {t('Donate')}
          </Button>
          <Button
            type="button"
            h="42px"
            px={5}
            borderRadius={radius.button}
            bg={colors.gold}
            color={colors.onGoldText}
            fontSize="sm"
            fontWeight="800"
            onClick={scrollToChamaModel}
          >
            {t('See the Chama model')}
          </Button>
        </HStack>
      </VStack>
      <VStack
        spacing={2}
        bg={colors.surfaceBg}
        color={colors.ink}
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
        <Body size="xs" bold letterSpacing="0.16em" textTransform="uppercase">
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
      bg={colors.darkSurfaceBg}
      borderRadius={radius.section}
      borderWidth="1px"
      borderColor={colors.line}
      minH={{ base: '280px', lg: '400px' }}
      position="relative"
    >
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w="56px"
        h="44px"
        borderRadius={radius.card}
        bg={colors.gold}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          w={0}
          h={0}
          borderTop="9px solid transparent"
          borderBottom="9px solid transparent"
          borderLeft={`15px solid ${colors.onGoldText}`}
          ml="4px"
        />
      </Box>
      <Box position="absolute" left={4} bottom={4} bg="black" borderRadius={radius.button} px={3} py={2}>
        <Body size="xs" bold color="white">
          {t('Afribit Kibera')}
        </Body>
      </Box>
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
      <SimpleGrid columns={3} templateColumns="1.1fr 1fr 1.75fr" bg={colors.gold}>
        {['Project', 'Capital purpose', 'Chama status'].map((heading) => (
          <Body
            key={heading}
            size="xs"
            bold
            letterSpacing="0.12em"
            textTransform="uppercase"
            color={colors.onGoldText}
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
          <Body bold px={5} py={5}>
            {t(row.project)}
          </Body>
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
  <Body size="xs" bold color={color ?? colors.gold} letterSpacing="0.18em" textTransform="uppercase">
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
