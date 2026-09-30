import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Link as ChakraLink,
  SimpleGrid,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo } from 'react'
import { PiArrowRight, PiCaretRightBold, PiChartLineUp } from 'react-icons/pi'
import { Link as RouterLink, useSearchParams } from 'react-router'

import { Head } from '@/config/Head.tsx'
import { CircularGrantProjects } from '@/modules/discovery/pages/landing/views/mainView/defaultView/sections/CircularGrantProjects.tsx'
import { useImpactFundsDonateModal } from '@/modules/impactFunds/hooks/useImpactFundsDonateModal.tsx'
import { CIRCULAR_GRANTS_CATEGORY_ID } from '@/modules/impactFunds/utils/impactFundDonatePreferences.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H1, H2, H3 } from '@/shared/components/typography/Heading.tsx'
import { getPath } from '@/shared/constants'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { LATIN_AMERICA_COUNTRY_CODES } from '@/shared/constants/platform/regionCountryCodes.ts'
import { GeyserTwitterUrl, ImpactFundsFieldPartnerApplicationUrl } from '@/shared/constants/platform/url.ts'
import { UserExternalLinksComponent } from '@/shared/molecules/UserExternalLinks.tsx'
import { VideoPlayer } from '@/shared/molecules/VideoPlayer.tsx'
import { standardPadding } from '@/shared/styles/index.ts'

type CircularGrantsColors = {
  pageBg: string
  ink: string
  muted: string
  line: string
  cream: string
  pale: string
  gold: string
  amber: string
  surfaceBg: string
  darkSurfaceBg: string
  onAmberText: string
  eyebrow: string
}

const radius = {
  section: '16px',
  card: 'card',
  inner: 'innerCard',
}

// The externally managed storage object keeps its historical name for continuity.
const CIRCULAR_GRANTS_HERO_IMAGE_URL =
  'https://storage.googleapis.com/geyser-media/impact-funds/recoverable-grant-hero.png'
const AFRIBIT_PILOT_SNAPSHOT_VIDEO_URL = 'https://youtu.be/pU1KxP0ddng'
const FIELD_PARTNER_BOOKLET_URL =
  'https://www.figma.com/deck/uNXI6qZWMee1UjC28MrY9K/Field-Partner-Booklet--EXT-?node-id=92-260&t=km4JTKHId4nKnd6S-1'

export const circularGrantInfoPills = ['0% interest', 'No debt obligation', 'No shaming'] as const

const modelIssues = [
  'Formal banking remains inaccessible for many local entrepreneurs',
  'Debt can bring pressure, stigma, trauma and exclusion',
  'Outside funders lack trusted local context',
] as const

type FlowStepItem = {
  number: string
  title: string
  description: string
  isDark?: boolean
  isGold?: boolean
}

type FaqItem = {
  question: string
  answer: string
  links?: readonly {
    label: string
    href: string
    isExternal?: boolean
  }[]
}

export const circularGrantFlowSteps: readonly FlowStepItem[] = [
  {
    number: '1',
    title: 'Approve the Field Partner',
    description: 'Geyser interviews, approves, and onboards a trusted local organisation.',
    isDark: true,
  },
  {
    number: '2',
    title: 'Verify a local business',
    description: 'The Field Partner checks the entrepreneur, business, budget, and local benefit.',
  },
  {
    number: '3',
    title: 'Create and launch the campaign',
    description: 'The Field Partner builds the story and media; Geyser reviews and amplifies it.',
  },
  {
    number: '4',
    title: 'Support delivery and reuse',
    description: 'Partners guide reporting, while voluntary contributions can support the next grant.',
    isGold: true,
  },
]

export const circularGrantFaqItems: readonly FaqItem[] = [
  {
    question: 'How is capital return handled without debt enforcement?',
    answer:
      'Capital return is supported through community agreements, field-partner follow-up, and chama accountability rather than legal debt collection.',
  },
  {
    question: 'Who can start a circular grants program?',
    answer:
      'Circular grants are currently available to Geyser field partners operating trusted local circular economy hubs.',
  },
  {
    question: 'Where can I learn more about becoming a Field Partner?',
    answer: 'Read the Field Partner Booklet for an overview of the program and how to apply.',
    links: [{ label: 'Open the Field Partner Booklet', href: FIELD_PARTNER_BOOKLET_URL, isExternal: true }],
  },
  {
    question: 'Where can I follow progress and reporting?',
    answer: 'The best way to stay in touch is to follow Geyser on X and subscribe to our newsletter.',
    links: [
      { label: 'Follow Geyser on X', href: GeyserTwitterUrl, isExternal: true },
      { label: 'Subscribe to the newsletter', href: getPath('newsletter') },
    ],
  },
] as const

export const CircularGrantsPage = () => {
  const [searchParams] = useSearchParams()
  const { openDonateModal, donateModalElement } = useImpactFundsDonateModal()
  const onDonateClick = () => openDonateModal({ defaultCategoryIds: [CIRCULAR_GRANTS_CATEGORY_ID] })
  const pageBg = useColorModeValue('white', 'utils.pbg')
  const ink = useColorModeValue('#17120C', 'neutral1.12')
  const muted = useColorModeValue('#5F6268', 'neutralAlpha.11')
  const line = useColorModeValue('#E9E2D4', 'neutral1.6')
  const cream = useColorModeValue('#FFF8EA', 'neutral1.2')
  const pale = useColorModeValue('#F8F9F8', 'neutral1.3')
  const gold = useColorModeValue('#F6CF4A', 'amber.9')
  const amber = useColorModeValue('#F09A34', 'amber.9')
  const surfaceBg = useColorModeValue('white', 'neutral1.3')
  const darkSurfaceBg = useColorModeValue('#17120C', 'neutral1.1')
  const onAmberText = useColorModeValue('#17120C', '#17120C')
  const eyebrow = useColorModeValue('primary1.11', 'primary1.9')
  const colors = useMemo<CircularGrantsColors>(
    () => ({
      pageBg,
      ink,
      muted,
      line,
      cream,
      pale,
      gold,
      amber,
      surfaceBg,
      darkSurfaceBg,
      onAmberText,
      eyebrow,
    }),
    [amber, cream, darkSurfaceBg, eyebrow, gold, ink, line, muted, onAmberText, pageBg, pale, surfaceBg],
  )

  return (
    <>
      {donateModalElement}

      <Head
        title={t('Circular Grants')}
        description={t(
          'Reusable capital for trusted local economies through debt-free circular grant capital and local field-partner validation.',
        )}
        image={CIRCULAR_GRANTS_HERO_IMAGE_URL}
        url={`https://geyser.fund${getPath('discoveryCircularGrants')}`}
      />

      <Box w="full" bg={colors.pageBg} color={colors.ink}>
        <VStack align="stretch" spacing={0}>
          <PageSection py={{ base: 4, lg: 5 }}>
            <Breadcrumb colors={colors} />
          </PageSection>
          <HeroSection colors={colors} onDonateClick={onDonateClick} />
          <CircularGrantProjectsSection region={searchParams.get('region')} />
          <OverviewSection colors={colors} />
          <HowItWorksSection colors={colors} />
          <CaseStudySection colors={colors} />
          <TransparencySection colors={colors} />
          <ActionSections colors={colors} onDonateClick={onDonateClick} />
          <FaqSection colors={colors} />
          <FooterSection />
        </VStack>
      </Box>
    </>
  )
}

const CircularGrantProjectsSection = ({ region }: { region: string | null }) => {
  const where =
    region === 'africa'
      ? { region: 'Africa' }
      : region === 'latin-america'
      ? { countryCodes: [...LATIN_AMERICA_COUNTRY_CODES] }
      : undefined

  return (
    <PageSection>
      <CircularGrantProjects title="Circular Grants" where={where} take={6} />
    </PageSection>
  )
}

const OverviewSection = ({ colors }: { colors: CircularGrantsColors }) => (
  <PageSection>
    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 5, lg: 6 }}>
      <InfoCard colors={colors} eyebrow="01 What are circular grants" title="Ethical capital without debt or pressure">
        <Body color={colors.muted} lineHeight="27px">
          {t(
            'A Circular Grant provides capital to an approved local business, with no repayment required. If they choose and are able, recipients can contribute to a Community Fund that supports other local entrepreneurs.',
          )}
        </Body>
        <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={3} pt={2}>
          {circularGrantInfoPills.map((pill) => (
            <Box
              key={pill}
              bg={colors.surfaceBg}
              borderRadius={radius.inner}
              borderWidth="1px"
              borderColor={colors.line}
              p={4}
            >
              <Body bold>{t(pill)}</Body>
            </Box>
          ))}
        </SimpleGrid>
      </InfoCard>

      <InfoCard colors={colors} eyebrow="02 Why circular grants" title="Why this model matters">
        <Body color={colors.muted} lineHeight="27px">
          {t(
            'Circular Grants create a humane path to capital while Field Partners provide the local knowledge and trusted relationships that outside funders cannot.',
          )}
        </Body>
        <VStack align="stretch" spacing={3} pt={2}>
          {modelIssues.map((issue) => (
            <Box
              key={issue}
              bg={colors.surfaceBg}
              borderRadius={radius.inner}
              borderWidth="1px"
              borderColor={colors.line}
              p={4}
            >
              <Body bold>{t(issue)}</Body>
            </Box>
          ))}
        </VStack>
      </InfoCard>
    </SimpleGrid>
  </PageSection>
)

const HowItWorksSection = ({ colors }: { colors: CircularGrantsColors }) => (
  <PageSection>
    <Eyebrow colors={colors}>03 How it works</Eyebrow>
    <H2 size={{ base: '2xl', lg: '3xl' }} bold maxW="720px" mt={2}>
      {t('From local need to lasting community impact')}
    </H2>
    <Body size={{ base: 'md', lg: 'lg' }} color={colors.muted} maxW="760px" lineHeight="1.6" mt={3}>
      {t(
        'Geyser governs the programme while Field Partners operate locally: sourcing trusted businesses, building campaigns, supporting delivery, and documenting outcomes.',
      )}
    </Body>
    <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing={4} mt={6}>
      {circularGrantFlowSteps.map((step) => (
        <FlowStep key={step.number} colors={colors} step={step} />
      ))}
    </SimpleGrid>
  </PageSection>
)

const CaseStudySection = ({ colors }: { colors: CircularGrantsColors }) => (
  <PageSection>
    <Eyebrow colors={colors}>04 Afribit case study</Eyebrow>
    <H2 size={{ base: '2xl', lg: '3xl' }} bold mt={2}>
      {t('Afribit Kibera shows the model in motion')}
    </H2>
    <Body size={{ base: 'md', lg: 'lg' }} color={colors.muted} maxW="690px" lineHeight="1.6" mt={3}>
      {t(
        "In Kibera, circular grants are already being piloted through Afribit's trusted local network, participant validation, and capital return follow-up.",
      )}
    </Body>
    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} templateColumns={{ lg: '1.35fr 1fr' }} mt={6}>
      <CaseStudyCard colors={colors} />
      <VStack align="stretch" spacing={5}>
        <InfoCard colors={colors} eyebrow="Pilot scope" title="2 cohorts 15 people each 6 projects" compact />
        <Button
          as={RouterLink}
          to={getPath('discoveryCircularGrantsAfribitCaseStudy')}
          size="lg"
          colorScheme="primary1"
          justifyContent="flex-start"
          rightIcon={<Icon as={PiArrowRight} />}
        >
          {t('View full case study')}
        </Button>
      </VStack>
    </SimpleGrid>
  </PageSection>
)

const TransparencySection = ({ colors }: { colors: CircularGrantsColors }) => (
  <PageSection>
    <CardLayout bg={colors.pale} borderColor={colors.line} borderRadius={radius.section} p={{ base: 6, lg: 8 }}>
      <Flex direction={{ base: 'column', sm: 'row' }} gap={4} align="flex-start">
        <Flex align="center" justify="center" boxSize={12} borderRadius="full" bg="primary1.3" flexShrink={0}>
          <Icon as={PiChartLineUp} boxSize={6} color="primary1.11" aria-hidden />
        </Flex>
        <VStack align="flex-start" spacing={4} maxW="820px">
          <H2 size={{ base: '2xl', lg: '3xl' }} bold>
            {t('05 Transparency: where the pilot stands today')}
          </H2>
          <Body size={{ base: 'md', lg: 'lg' }} color={colors.muted} lineHeight="1.6">
            {t(
              'Circular Grants are still being refined in the open. Review the current pilot, the outcomes we are working toward, and the reporting we plan to add next.',
            )}
          </Body>
          <Button
            as={RouterLink}
            to={getPath('discoveryCircularGrantsTransparency')}
            size="lg"
            colorScheme="primary1"
            rightIcon={<Icon as={PiArrowRight} />}
          >
            {t('View Circular Grants transparency')}
          </Button>
        </VStack>
      </Flex>
    </CardLayout>
  </PageSection>
)

const ActionSections = ({ colors, onDonateClick }: { colors: CircularGrantsColors; onDonateClick: () => void }) => (
  <PageSection>
    <VStack align="stretch" spacing={{ base: 5, lg: 6 }}>
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        align="center"
        justify="space-between"
        gap={{ base: 6, lg: 8 }}
        bg={colors.amber}
        borderRadius={radius.card}
        borderWidth="1px"
        borderColor={colors.line}
        p={{ base: 6, lg: 8 }}
      >
        <VStack align="flex-start" spacing={{ base: 4, lg: 5 }} maxW="760px">
          <Eyebrow colors={colors} color={colors.onAmberText}>
            06 Donate
          </Eyebrow>
          <H2 size={{ base: '2xl', lg: '3xl' }} bold color={colors.onAmberText}>
            {t('Help grow the shared capital pool')}
          </H2>
          <Body size={{ base: 'md', lg: 'lg' }} lineHeight="1.6" color={colors.onAmberText}>
            {t(
              'We are allocating 3M sats per quarter to circular economy hubs. Donate to the Geyser Impact Fund to help expand this pilot and its reach.',
            )}
          </Body>
        </VStack>
        <VStack
          align="stretch"
          spacing={{ base: 5, lg: 6 }}
          bg={colors.darkSurfaceBg}
          borderRadius={radius.card}
          borderWidth="1px"
          borderColor={colors.line}
          p={{ base: 6, lg: 8 }}
          w={{ base: 'full', lg: '370px' }}
          justify="center"
          flexShrink={0}
        >
          <Eyebrow colors={colors} color="whiteAlpha.800">
            {t('GEYSER Quarterly pool')}
          </Eyebrow>
          <H3 size={{ base: '48px', lg: '56px' }} lineHeight={{ base: '52px', lg: '60px' }} bold color="white">
            {t('3M sats')}
          </H3>
          <Button size="lg" colorScheme="primary1" onClick={onDonateClick}>
            {t('Donate')}
          </Button>
        </VStack>
      </Flex>

      <Flex
        direction={{ base: 'column', lg: 'row' }}
        align={{ base: 'stretch', lg: 'center' }}
        justify="space-between"
        gap={6}
        bg={colors.pale}
        borderWidth="1px"
        borderColor={colors.line}
        borderRadius={radius.card}
        p={{ base: 6, lg: 8 }}
      >
        <VStack align="flex-start" spacing={2} maxW="710px">
          <Eyebrow colors={colors} color={colors.muted}>
            07 Play a part
          </Eyebrow>
          <H2 size={{ base: '2xl', lg: '3xl' }} bold color={colors.ink}>
            {t('Launch your own Circular Grant pilot in your local community')}
          </H2>
          <Body size={{ base: 'md', lg: 'lg' }} lineHeight="1.6" color={colors.muted}>
            {t(
              'Help local circular economy hubs launch circular grants, reach more entrepreneurs, and turn recycled capital into visible local impact.',
            )}
          </Body>
        </VStack>
        <Button
          as="a"
          href={ImpactFundsFieldPartnerApplicationUrl}
          target="_blank"
          rel="noreferrer"
          size="lg"
          colorScheme="primary1"
          rightIcon={<Icon as={PiArrowRight} />}
          flexShrink={0}
        >
          {t('Apply to become a Field Partner')}
        </Button>
      </Flex>
    </VStack>
  </PageSection>
)

const FaqSection = ({ colors }: { colors: CircularGrantsColors }) => (
  <PageSection>
    <VStack align="stretch" spacing={{ base: 6, lg: 8 }} w="full">
      <H2 size={{ base: '2xl', lg: '3xl' }} bold color={colors.ink} textAlign="center" w="full">
        {t('FAQ')}
      </H2>
      <Accordion
        allowToggle
        w="full"
        display="flex"
        flexDirection="column"
        gap={{ base: 2, lg: 3 }}
        sx={{ '& > *:last-child': { borderBottom: '0 !important' } }}
      >
        {circularGrantFaqItems.map((item) => (
          <AccordionItem
            key={item.question}
            borderWidth="0"
            borderTopWidth="0"
            borderBottomWidth="0"
            borderRadius={radius.inner}
            sx={{ '&:last-of-type': { borderBottom: '0 !important' }, '&::before': { display: 'none' } }}
          >
            <AccordionButton
              minH={{ base: '64px', lg: '72px' }}
              px={{ base: 3, lg: 5 }}
              py={3}
              borderRadius={radius.inner}
              transition="background-color 160ms ease"
              _hover={{ bg: colors.pale }}
            >
              <Box flex="1" textAlign="left">
                <Body bold sx={{ textWrap: 'pretty' }}>
                  {t(item.question)}
                </Body>
              </Box>
              <AccordionIcon color={colors.muted} boxSize={5} />
            </AccordionButton>
            <AccordionPanel px={{ base: 3, lg: 5 }} pb={{ base: 5, lg: 6 }}>
              <Body color={colors.muted} lineHeight="25px">
                {t(item.answer)}
              </Body>
              {item.links && (
                <HStack spacing={4} mt={3} flexWrap="wrap">
                  {item.links.map((link) =>
                    link.isExternal ? (
                      <ChakraLink
                        key={link.label}
                        href={link.href}
                        isExternal
                        color={colors.ink}
                        fontWeight="700"
                        textDecor="underline"
                      >
                        {t(link.label)}
                      </ChakraLink>
                    ) : (
                      <ChakraLink
                        key={link.label}
                        as={RouterLink}
                        to={link.href}
                        color={colors.ink}
                        fontWeight="700"
                        textDecor="underline"
                      >
                        {t(link.label)}
                      </ChakraLink>
                    ),
                  )}
                </HStack>
              )}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </VStack>
  </PageSection>
)

const Breadcrumb = ({ colors }: { colors: CircularGrantsColors }) => (
  <HStack spacing={2} color={colors.muted}>
    <Body
      as={RouterLink}
      to={getPath('discoveryImpactFunds')}
      size="xs"
      bold
      letterSpacing="0.18em"
      textTransform="uppercase"
      _hover={{ color: colors.ink }}
    >
      {t('Impact Fund')}
    </Body>
    <PiCaretRightBold size={11} />
    <Body
      as={RouterLink}
      to={getPath('discoveryCircularGrants')}
      size="xs"
      bold
      letterSpacing="0.18em"
      textTransform="uppercase"
      color={colors.ink}
      aria-current="page"
    >
      {t('Circular Grants')}
    </Body>
  </HStack>
)

const HeroSection = ({ colors, onDonateClick }: { colors: CircularGrantsColors; onDonateClick: () => void }) => (
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
      backgroundImage={`url('${CIRCULAR_GRANTS_HERO_IMAGE_URL}')`}
      backgroundPosition={{ base: 'center', lg: '64% 42%' }}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
    />
    <Box
      position="absolute"
      inset={0}
      bg="linear-gradient(90deg, rgba(0,0,0,0.72), rgba(0,0,0,0.34), rgba(0,0,0,0.08))"
    />
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
        <H1 size={{ base: '3xl', md: '4xl', lg: '48px' }} lineHeight={{ base: '1.12', lg: '54px' }} bold color="white">
          {t('Reusable capital for trusted local economies')}
        </H1>
        <Body size={{ base: 'md', lg: 'lg' }} color="whiteAlpha.900" lineHeight={{ base: '26px', lg: '28px' }}>
          {t(
            'Circular grants bring debt-free circular grant capital to local entrepreneurs through trusted field partners and reusable capital return loops.',
          )}
        </Body>
        <HStack spacing={3} flexWrap="wrap" pt="8px">
          <Button
            as="a"
            href={ImpactFundsFieldPartnerApplicationUrl}
            target="_blank"
            rel="noreferrer"
            size="lg"
            colorScheme="primary1"
            rightIcon={<Icon as={PiArrowRight} />}
          >
            {t('Apply as partner')}
          </Button>
          <Button
            size="lg"
            bg={colors.surfaceBg}
            color={colors.ink}
            onClick={onDonateClick}
            _hover={{ bg: colors.surfaceBg }}
          >
            {t('Donate')}
          </Button>
        </HStack>
      </VStack>
    </Flex>
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
  colors: CircularGrantsColors
  color?: string
}) => (
  <Body size="xs" bold color={color ?? colors.eyebrow} letterSpacing="0.18em" textTransform="uppercase">
    {children}
  </Body>
)

const InfoCard = ({
  colors,
  eyebrow,
  title,
  children,
  compact,
}: {
  colors: CircularGrantsColors
  eyebrow: string
  title: string
  children?: React.ReactNode
  compact?: boolean
}) => (
  <VStack
    align="stretch"
    spacing={4}
    bg={colors.pale}
    borderRadius={radius.section}
    borderWidth="1px"
    borderColor={colors.line}
    p={{ base: 6, lg: 7 }}
  >
    <Eyebrow colors={colors}>{t(eyebrow)}</Eyebrow>
    <H2 size={compact ? { base: 'xl', lg: '2xl' } : { base: '2xl', lg: '3xl' }} bold>
      {t(title)}
    </H2>
    {children}
  </VStack>
)

const FlowStep = ({ colors, step }: { colors: CircularGrantsColors; step: FlowStepItem }) => {
  const bg = step.isDark ? colors.darkSurfaceBg : step.isGold ? colors.gold : colors.surfaceBg
  const color = step.isDark ? 'white' : step.isGold ? colors.onAmberText : colors.ink

  return (
    <VStack
      align="stretch"
      spacing={3}
      bg={bg}
      color={color}
      borderRadius={radius.card}
      borderWidth="1px"
      borderColor={colors.line}
      p={5}
      minH="170px"
    >
      <Body size="xs" bold color={step.isDark ? colors.gold : step.isGold ? colors.onAmberText : colors.eyebrow}>
        {step.number}
      </Body>
      <H3 size={{ base: 'md', lg: 'lg' }} bold color="inherit">
        {t(step.title)}
      </H3>
      <Body
        size="sm"
        color={step.isDark ? 'whiteAlpha.800' : step.isGold ? colors.onAmberText : colors.muted}
        lineHeight="23px"
        opacity={step.isGold ? 0.85 : undefined}
      >
        {t(step.description)}
      </Body>
    </VStack>
  )
}

const CaseStudyCard = ({ colors }: { colors: CircularGrantsColors }) => (
  <Box
    bg={colors.darkSurfaceBg}
    color="white"
    borderRadius={radius.section}
    borderWidth="1px"
    borderColor={colors.line}
    p={5}
  >
    <VStack align="stretch" spacing={4}>
      <Eyebrow colors={colors} color={colors.gold}>
        {t('Pilot snapshot')}
      </Eyebrow>
      <H3 size={{ base: '28px', lg: '34px' }} lineHeight={{ base: '34px', lg: '40px' }} bold color="white">
        {t('Afribit Kibera circular grant cohort')}
      </H3>
      <Box overflow="hidden" borderRadius={radius.card}>
        <VideoPlayer url={AFRIBIT_PILOT_SNAPSHOT_VIDEO_URL} />
      </Box>
      <Box
        bg={colors.cream}
        color={colors.ink}
        borderRadius={radius.card}
        borderWidth="1px"
        borderColor={colors.line}
        p={5}
      >
        <Body bold lineHeight="25px">
          {t(
            'Local trust, participant validation, and monthly follow-up keep capital accountable without formal debt enforcement.',
          )}
        </Body>
      </Box>
    </VStack>
  </Box>
)

const FooterSection = () => (
  <Box w="full" px={standardPadding} pb={{ base: 28, lg: 10 }}>
    <Box maxW={`${dimensions.maxWidth + 24 * 2}px`} mx="auto">
      <UserExternalLinksComponent />
    </Box>
  </Box>
)
