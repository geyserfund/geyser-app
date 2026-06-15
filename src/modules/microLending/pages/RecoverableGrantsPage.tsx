import { Box, Button, Flex, HStack, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiCaretRightBold } from 'react-icons/pi'
import { Link } from 'react-router'

import { Head } from '@/config/Head.tsx'
import { useImpactFundsDonateModal } from '@/modules/impactFunds/hooks/useImpactFundsDonateModal.tsx'
import { RECOVERABLE_GRANTS_CATEGORY_ID } from '@/modules/impactFunds/utils/impactFundDonatePreferences.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H1, H2, H3 } from '@/shared/components/typography/Heading.tsx'
import { getPath } from '@/shared/constants'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { ImpactFundsFieldPartnerApplicationUrl } from '@/shared/constants/platform/url.ts'
import { UserExternalLinksComponent } from '@/shared/molecules/UserExternalLinks.tsx'
import { VideoPlayer } from '@/shared/molecules/VideoPlayer.tsx'
import { standardPadding } from '@/shared/styles/index.ts'

type RecoverableGrantsColors = {
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
  heroAccentBg: string
}

const radius = {
  section: '16px',
  card: 'card',
  inner: 'innerCard',
  button: 'innerCard',
}

const RECOVERABLE_GRANTS_HERO_IMAGE_URL =
  'https://storage.googleapis.com/geyser-media/impact-funds/recoverable-grant-hero.png'
const AFRIBIT_PILOT_SNAPSHOT_VIDEO_URL = 'https://youtu.be/pU1KxP0ddng'

const infoPills = ['0% interest', 'No debt obligation', 'Capital reused locally'] as const

const modelIssues = [
  'Predatory informal debt and exploitative capital traps',
  'Debt shaming and trauma when capital does not return',
  'Outside funders lack trusted local context',
] as const

type FlowStepItem = {
  number: string
  title: string
  description: string
  isDark?: boolean
  isGold?: boolean
}

const flowSteps: readonly FlowStepItem[] = [
  {
    number: '1',
    title: 'Geyser capital pool',
    description: 'Capital allocation and funding format',
    isDark: true,
  },
  {
    number: '2',
    title: 'Field partner validation',
    description: 'Project sourcing, trust layer, and local operations',
  },
  {
    number: '3',
    title: 'Chama cohort',
    description: 'Peer accountability and readiness checks',
  },
  {
    number: '4',
    title: 'Capital return loop',
    description: 'Returned capital funds the next project',
    isGold: true,
  },
]

const faqItems = [
  {
    question: 'How is capital return handled without debt enforcement?',
    answer:
      'Capital return is supported through community agreements, field-partner follow-up, and chama accountability rather than legal debt collection.',
  },
  {
    question: 'Who can start a recoverable grants program?',
    answer:
      'Recoverable grants are currently available to Geyser field partners operating trusted local circular economy hubs.',
  },
  {
    question: 'Where can I follow progress and reporting?',
    answer:
      'Progress, pilot learning, and allocation updates will be shared through Geyser quarterly reports and field-partner case studies.',
  },
] as const

const relatedResources = ['Field Partner Program', 'Impact Fund Reports', 'Afribit Kibera Case Study'] as const

export const RecoverableGrantsPage = () => {
  const { openDonateModal, donateModalElement } = useImpactFundsDonateModal()
  const onDonateClick = () => openDonateModal({ defaultCategoryIds: [RECOVERABLE_GRANTS_CATEGORY_ID] })
  const colors: RecoverableGrantsColors = {
    pageBg: useColorModeValue('white', 'utils.pbg'),
    ink: useColorModeValue('#17120C', 'neutral1.12'),
    muted: useColorModeValue('#5F6268', 'neutral1.10'),
    line: useColorModeValue('#E9E2D4', 'neutral1.6'),
    cream: useColorModeValue('#FFF8EA', 'neutral1.2'),
    pale: useColorModeValue('#F8F9F8', 'neutral1.3'),
    gold: useColorModeValue('#F6CF4A', 'amber.9'),
    amber: useColorModeValue('#F09A34', 'amber.9'),
    surfaceBg: useColorModeValue('white', 'neutral1.3'),
    darkSurfaceBg: useColorModeValue('#17120C', 'neutral1.1'),
    onAmberText: useColorModeValue('#17120C', '#17120C'),
    heroAccentBg: useColorModeValue('#F7931A', 'orange.400'),
  }

  return (
    <>
      {donateModalElement}

      <Head
        title={t('Recoverable Grants')}
        description={t(
          'Reusable capital for trusted local economies through debt-free recoverable grant capital and local field-partner validation.',
        )}
        image={RECOVERABLE_GRANTS_HERO_IMAGE_URL}
        url={`https://geyser.fund${getPath('discoveryRecoverableGrants')}`}
      />

      <Box w="full" bg={colors.pageBg} color={colors.ink}>
        <VStack align="stretch" spacing={0}>
          <Box w="full" bg={colors.pageBg} py={{ base: 4, lg: 5 }}>
            <Box w="full" maxW={`${dimensions.maxWidth + 24 * 2}px`} mx="auto" px={standardPadding}>
              <Breadcrumb colors={colors} />
            </Box>
          </Box>

          <HeroSection colors={colors} onDonateClick={onDonateClick} />

          <PageSection>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 5, lg: 6 }}>
              <InfoCard
                colors={colors}
                eyebrow="01 What are recoverable grants"
                title="Debt-free capital that comes back to the community"
              >
                <Body color={colors.muted} lineHeight="27px">
                  {t(
                    'Recoverable grants fund local entrepreneurs with debt-free recoverable grant capital and no debt obligation. When capital returns through community agreements, it can be deployed again in the same circular economy.',
                  )}
                </Body>
                <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={3} pt={2}>
                  {infoPills.map((pill) => (
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

              <InfoCard colors={colors} eyebrow="02 Why recoverable grants" title="Why this model matters">
                <Body color={colors.muted} lineHeight="27px">
                  {t(
                    'It reduces dependence on predatory informal debt, opens fairer access to capital, and lets trusted local partners decide who is ready.',
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

          <PageSection>
            <Eyebrow colors={colors}>03 How it works</Eyebrow>
            <H2 size={{ base: '34px', lg: '44px' }} lineHeight={{ base: '40px', lg: '48px' }} bold maxW="620px">
              {t('Capital flows through trusted local partners')}
            </H2>
            <Body color={colors.muted} maxW="670px" lineHeight="27px" mt={3}>
              {t(
                'Geyser provides the capital pool and operating format. Field partners source projects, manage local operations, and support capital return through chamas and community agreements.',
              )}
            </Body>
            <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing={4} mt={6}>
              {flowSteps.map((step) => (
                <FlowStep key={step.number} colors={colors} step={step} />
              ))}
            </SimpleGrid>
          </PageSection>

          <PageSection>
            <Eyebrow colors={colors}>04 Afribit case study</Eyebrow>
            <H2 size={{ base: '34px', lg: '44px' }} lineHeight={{ base: '40px', lg: '48px' }} bold>
              {t('Afribit Kibera shows the model in motion')}
            </H2>
            <Body color={colors.muted} maxW="690px" lineHeight="27px" mt={3}>
              {t(
                "In Kibera, recoverable grants are already being piloted through Afribit's trusted local network, participant validation, and capital return follow-up.",
              )}
            </Body>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} templateColumns={{ lg: '1.35fr 1fr' }} mt={6}>
              <CaseStudyCard colors={colors} />
              <VStack align="stretch" spacing={5}>
                <InfoCard colors={colors} eyebrow="Pilot scope" title="2 cohorts 15 people each 6 projects" compact />
                <Button
                  as={Link}
                  to={getPath('discoveryRecoverableGrantsAfribitCaseStudy')}
                  h="54px"
                  borderRadius={radius.button}
                  bg={colors.darkSurfaceBg}
                  color="white"
                  justifyContent="flex-start"
                  px={6}
                  fontSize="md"
                  fontWeight="900"
                >
                  {t('View full case study >')}
                </Button>
              </VStack>
            </SimpleGrid>
          </PageSection>

          <PageSection>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 6, lg: 12 }}>
              <InfoCard colors={colors} eyebrow="05 Transparency" title="How the pilot stays visible and accountable">
                <Body color={colors.muted} lineHeight="27px">
                  {t(
                    'Recoverable grants are still being refined in the open. We share how capital is allocated, what Geyser covers operationally, and what we are learning as the pilot grows.',
                  )}
                </Body>
              </InfoCard>
              <VStack align="stretch" spacing={5} justify="center">
                <HStack spacing={5} align="stretch">
                  <Box
                    bg={colors.darkSurfaceBg}
                    color="white"
                    borderRadius={radius.card}
                    borderWidth="1px"
                    borderColor={colors.line}
                    p={5}
                    minW="155px"
                  >
                    <Eyebrow colors={colors} color={colors.gold}>
                      Platform fee
                    </Eyebrow>
                    <H3 size="32px" bold>
                      {t('5%')}
                    </H3>
                  </Box>
                  <Box bg={colors.pale} borderRadius={radius.card} borderWidth="1px" borderColor={colors.line} p={5}>
                    <Eyebrow colors={colors} color={colors.muted}>
                      Local allocation
                    </Eyebrow>
                    <H3 size="32px" bold>
                      {t('95%')}
                    </H3>
                  </Box>
                </HStack>
                <Body bold lineHeight="27px">
                  {t('Geyser is currently supporting field-partner operations while the model is tested')}
                </Body>
                <Body bold lineHeight="27px">
                  {t('Quarterly reports will share progress, capital return patterns, and pilot learning')}
                </Body>
                <Box bg={colors.cream} borderRadius={radius.card} borderWidth="1px" borderColor={colors.line} p={5}>
                  <Body bold color={colors.muted}>
                    {t(
                      'The goal is to grow a sustainable reusable-capital model without losing local trust and accountability',
                    )}
                  </Body>
                </Box>
              </VStack>
            </SimpleGrid>
          </PageSection>

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
                    07 Donate
                  </Eyebrow>
                  <H2
                    size={{ base: '30px', lg: '40px' }}
                    lineHeight={{ base: '36px', lg: '47px' }}
                    bold
                    color={colors.onAmberText}
                  >
                    {t('Help grow the shared capital pool')}
                  </H2>
                  <Body
                    size={{ base: 'md', lg: '20px' }}
                    lineHeight={{ base: '27px', lg: '31px' }}
                    color={colors.onAmberText}
                  >
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
                  <Button
                    h="54px"
                    borderRadius={radius.button}
                    bg={colors.surfaceBg}
                    color={colors.ink}
                    fontSize={{ base: 'md', lg: '18px' }}
                    fontWeight="900"
                    onClick={onDonateClick}
                  >
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
                    06 Play a part
                  </Eyebrow>
                  <H2
                    size={{ base: '30px', lg: '40px' }}
                    lineHeight={{ base: '36px', lg: '46px' }}
                    bold
                    color={colors.ink}
                  >
                    {t('Launch your own Recoverable Grant pilot in your local community')}
                  </H2>
                  <Body
                    size={{ base: 'md', lg: '20px' }}
                    lineHeight={{ base: '26px', lg: '31px' }}
                    color={colors.muted}
                  >
                    {t(
                      'Help local circular economy hubs launch recoverable grants, reach more entrepreneurs, and turn recycled capital into visible local impact.',
                    )}
                  </Body>
                </VStack>
                <Button
                  as="a"
                  href={ImpactFundsFieldPartnerApplicationUrl}
                  target="_blank"
                  rel="noreferrer"
                  h="54px"
                  borderRadius={radius.button}
                  px={8}
                  bg={colors.darkSurfaceBg}
                  color="white"
                  fontSize={{ base: 'md', lg: '18px' }}
                  fontWeight="900"
                  flexShrink={0}
                  _hover={{ bg: colors.darkSurfaceBg }}
                >
                  {t('Apply to become a Field Partner')}
                </Button>
              </Flex>
            </VStack>
          </PageSection>

          <PageSection>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} templateColumns={{ lg: '1.4fr 0.75fr' }}>
              <Box
                bg={colors.pale}
                borderRadius={radius.section}
                borderWidth="1px"
                borderColor={colors.line}
                p={{ base: 6, lg: 8 }}
              >
                <Eyebrow colors={colors}>08 FAQ</Eyebrow>
                <H2 size={{ base: '32px', lg: '40px' }} bold mt={2} mb={5}>
                  {t('Common questions')}
                </H2>
                <VStack align="stretch" spacing={4}>
                  {faqItems.map((item) => (
                    <Box
                      key={item.question}
                      bg={colors.surfaceBg}
                      borderRadius={radius.card}
                      borderWidth="1px"
                      borderColor={colors.line}
                      p={5}
                    >
                      <Body bold>{t(item.question)}</Body>
                      <Body color={colors.muted} lineHeight="25px" mt={2}>
                        {t(item.answer)}
                      </Body>
                    </Box>
                  ))}
                </VStack>
              </Box>
              <Box
                bg={colors.cream}
                borderRadius={radius.section}
                borderWidth="1px"
                borderColor={colors.line}
                p={{ base: 6, lg: 8 }}
              >
                <Eyebrow colors={colors}>Further reading</Eyebrow>
                <H3 size="28px" bold mt={2} mb={4}>
                  {t('Related resources')}
                </H3>
                <VStack align="flex-start" spacing={4}>
                  {relatedResources.map((resource) => (
                    <Body key={resource} color={colors.muted}>
                      {t(resource)}
                    </Body>
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

const Breadcrumb = ({ colors }: { colors: RecoverableGrantsColors }) => (
  <HStack spacing={2} color={colors.muted}>
    <Body
      as={Link}
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
      as={Link}
      to={getPath('discoveryRecoverableGrants')}
      size="xs"
      bold
      letterSpacing="0.18em"
      textTransform="uppercase"
      color={colors.ink}
      aria-current="page"
    >
      {t('Recoverable Grants')}
    </Body>
  </HStack>
)

const HeroSection = ({ colors, onDonateClick }: { colors: RecoverableGrantsColors; onDonateClick: () => void }) => (
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
      backgroundImage={`url('${RECOVERABLE_GRANTS_HERO_IMAGE_URL}')`}
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
            'Recoverable grants bring debt-free recoverable grant capital to local entrepreneurs through trusted field partners and reusable capital return loops.',
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
            borderRadius={radius.button}
            bg={colors.surfaceBg}
            color={colors.ink}
            fontSize="sm"
            fontWeight="600"
          >
            {t('Apply as partner')}
          </Button>
          <Button
            h="42px"
            px="18px"
            borderRadius={radius.button}
            bg={colors.heroAccentBg}
            color={colors.onAmberText}
            fontSize="sm"
            fontWeight="600"
            onClick={onDonateClick}
            _hover={{ bg: colors.heroAccentBg }}
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
  colors: RecoverableGrantsColors
  color?: string
}) => (
  <Body size="xs" bold color={color ?? colors.gold} letterSpacing="0.18em" textTransform="uppercase">
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
  colors: RecoverableGrantsColors
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
    <H2
      size={compact ? { base: '26px', lg: '32px' } : { base: '32px', lg: '40px' }}
      lineHeight={compact ? { base: '32px', lg: '38px' } : { base: '38px', lg: '46px' }}
      bold
    >
      {t(title)}
    </H2>
    {children}
  </VStack>
)

const FlowStep = ({ colors, step }: { colors: RecoverableGrantsColors; step: FlowStepItem }) => {
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
      <Body size="xs" bold color={step.isDark ? colors.gold : step.isGold ? colors.onAmberText : colors.ink}>
        {step.number}
      </Body>
      <H3 size="24px" lineHeight="30px" bold color="inherit">
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

const CaseStudyCard = ({ colors }: { colors: RecoverableGrantsColors }) => (
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
        {t('Afribit Kibera recoverable grant cohort')}
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
