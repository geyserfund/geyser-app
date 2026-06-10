import { Box, Button, Flex, HStack, Image, SimpleGrid, VStack } from '@chakra-ui/react'
import { PiCaretRightBold } from 'react-icons/pi'
import { Link } from 'react-router'

import { Head } from '@/config/Head.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H1, H2, H3 } from '@/shared/components/typography/Heading.tsx'
import { getPath } from '@/shared/constants'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { ImpactFundsFieldPartnerApplicationUrl } from '@/shared/constants/platform/url.ts'
import { UserExternalLinksComponent } from '@/shared/molecules/UserExternalLinks.tsx'
import { standardPadding } from '@/shared/styles/index.ts'

const colors = {
  pageBg: '#FFFFFF',
  ink: '#17120C',
  muted: '#5F6268',
  line: '#E9E2D4',
  cream: '#FFF8EA',
  pale: '#F8F9F8',
  gold: '#F1D05C',
}

const RECOVERABLE_GRANTS_HERO_IMAGE_URL =
  'https://storage.googleapis.com/geyser-media/impact-funds/recoverable-grant-hero.png'
const AFRIBIT_RECOVERABLE_GRANT_COHORT_IMAGE_URL =
  'https://storage.googleapis.com/geyser-media/impact-funds/afribit-recoverable-grant-cohort-lady.png'

const t = (value: string) => value

const infoPills = ['0% interest', 'No debt obligation', 'Capital reused locally'] as const

const modelIssues = [
  'Loan sharks and exploitative informal debt',
  'Debt shaming and trauma from lack of repayment',
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
    title: 'Repayment loop',
    description: 'Capital returns and funds the next project',
    isGold: true,
  },
]

const faqItems = [
  {
    question: 'How is repayment handled without debt enforcement?',
    answer:
      'Repayment is supported through social contracts, field-partner follow-up, and chama accountability rather than legal debt collection.',
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
  return (
    <>
      <Head
        title={t('Recoverable Grants')}
        description={t(
          'Reusable capital for trusted local economies through 0% interest, debt-free Bitcoin grants and local field-partner validation.',
        )}
        image={RECOVERABLE_GRANTS_HERO_IMAGE_URL}
        url={`https://geyser.fund${getPath('discoveryRecoverableGrants')}`}
      />

      <Box w="full" bg={colors.pageBg} color={colors.ink}>
        <VStack align="stretch" spacing={0}>
          <Box w="full" bg={colors.pageBg} py={{ base: 4, lg: 5 }}>
            <Box w="full" maxW={`${dimensions.maxWidth + 24 * 2}px`} mx="auto" px={standardPadding}>
              <Breadcrumb />
            </Box>
          </Box>

          <HeroSection />

          <PageSection py={{ base: 7, lg: 8 }}>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 5, lg: 6 }}>
              <InfoCard
                eyebrow="01 What are recoverable grants"
                title="Debt-free capital that comes back to the community"
              >
                <Body color={colors.muted} lineHeight="27px">
                  {t(
                    'Recoverable grants fund local entrepreneurs with 0% interest and no debt obligation. When capital is repaid through social contracts, it can be deployed again in the same circular economy.',
                  )}
                </Body>
                <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={3} pt={2}>
                  {infoPills.map((pill) => (
                    <Box key={pill} bg="white" borderRadius="8px" p={4}>
                      <Body bold>{t(pill)}</Body>
                    </Box>
                  ))}
                </SimpleGrid>
              </InfoCard>

              <InfoCard eyebrow="02 Why recoverable grants" title="Why this model matters">
                <Body color={colors.muted} lineHeight="27px">
                  {t(
                    'It reduces dependence on loan sharks, opens fairer access to capital, and lets trusted local partners decide who is ready.',
                  )}
                </Body>
                <VStack align="stretch" spacing={3} pt={2}>
                  {modelIssues.map((issue) => (
                    <Box key={issue} bg="white" borderRadius="8px" p={4}>
                      <Body bold>{t(issue)}</Body>
                    </Box>
                  ))}
                </VStack>
              </InfoCard>
            </SimpleGrid>
          </PageSection>

          <PageSection py={{ base: 4, lg: 5 }}>
            <Eyebrow>03 How it works</Eyebrow>
            <H2 size={{ base: '34px', lg: '44px' }} lineHeight={{ base: '40px', lg: '48px' }} bold maxW="620px">
              {t('Capital flows through trusted local partners')}
            </H2>
            <Body color={colors.muted} maxW="670px" lineHeight="27px" mt={3}>
              {t(
                'Geyser provides the capital pool and operating format. Field partners source projects, manage local operations, and support repayment through chamas and social accountability.',
              )}
            </Body>
            <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing={4} mt={6}>
              {flowSteps.map((step) => (
                <FlowStep key={step.number} step={step} />
              ))}
            </SimpleGrid>
          </PageSection>

          <PageSection py={{ base: 8, lg: 10 }}>
            <Eyebrow>06 Afribit case study</Eyebrow>
            <H2 size={{ base: '34px', lg: '44px' }} lineHeight={{ base: '40px', lg: '48px' }} bold>
              {t('Afribit Kibera shows the model in motion')}
            </H2>
            <Body color={colors.muted} maxW="690px" lineHeight="27px" mt={3}>
              {t(
                "In Kibera, recoverable grants are already being piloted through Afribit's trusted local network, borrower validation, and repayment follow-up.",
              )}
            </Body>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} templateColumns={{ lg: '1.35fr 1fr' }} mt={6}>
              <CaseStudyCard />
              <VStack align="stretch" spacing={5}>
                <InfoCard eyebrow="Pilot scope" title="2 cohorts 15 people each 6 projects" compact />
                <Button
                  as={Link}
                  to={getPath('discoveryRecoverableGrantsAfribitCaseStudy')}
                  h="64px"
                  borderRadius="12px"
                  bg={colors.ink}
                  color="white"
                  justifyContent="flex-start"
                  px={6}
                  fontSize="lg"
                  fontWeight="900"
                >
                  {t('View full case study >')}
                </Button>
              </VStack>
            </SimpleGrid>
          </PageSection>

          <PageSection py={{ base: 8, lg: 10 }}>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 6, lg: 12 }}>
              <InfoCard eyebrow="04 Transparency" title="How the pilot stays visible and accountable">
                <Body color={colors.muted} lineHeight="27px">
                  {t(
                    'Recoverable grants are still being refined in the open. We share how capital is allocated, what Geyser covers operationally, and what we are learning as the pilot grows.',
                  )}
                </Body>
              </InfoCard>
              <VStack align="stretch" spacing={5} justify="center">
                <HStack spacing={5} align="stretch">
                  <Box bg="#15201F" color="white" borderRadius="8px" p={5} minW="155px">
                    <Eyebrow color={colors.gold}>Platform fee</Eyebrow>
                    <H3 size="32px" bold>
                      {t('5%')}
                    </H3>
                  </Box>
                  <Box p={5}>
                    <Eyebrow color={colors.muted}>Local allocation</Eyebrow>
                    <H3 size="32px" bold>
                      {t('95%')}
                    </H3>
                  </Box>
                </HStack>
                <Body bold lineHeight="27px">
                  {t('Geyser is currently supporting field-partner operations while the model is tested')}
                </Body>
                <Body bold lineHeight="27px">
                  {t('Quarterly reports will share progress, repayment patterns, and pilot learning')}
                </Body>
                <Box bg={colors.cream} borderRadius="10px" p={5}>
                  <Body bold color="#8E6325">
                    {t(
                      'The goal is to grow a sustainable reusable-capital model without losing local trust and accountability',
                    )}
                  </Body>
                </Box>
              </VStack>
            </SimpleGrid>
          </PageSection>

          <PageSection py={{ base: 8, lg: 10 }}>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
              <InfoCard
                eyebrow="06 Play a part"
                title="Launch your own Recoverable Grant pilot in your local community"
              >
                <Body color={colors.muted} lineHeight="27px">
                  {t(
                    'Help local circular economy hubs launch recoverable grants, reach more entrepreneurs, and turn recycled capital into visible local impact.',
                  )}
                </Body>
                <Button
                  as="a"
                  href={ImpactFundsFieldPartnerApplicationUrl}
                  target="_blank"
                  rel="noreferrer"
                  alignSelf="flex-start"
                  borderRadius="999px"
                  bg={colors.ink}
                  color="white"
                  mt={2}
                >
                  {t('Fill in form')}
                </Button>
              </InfoCard>
              <Box bg={colors.ink} color="white" borderRadius="16px" p={{ base: 6, lg: 8 }}>
                <VStack align="flex-start" spacing={5}>
                  <Eyebrow color={colors.gold}>07 Contribute</Eyebrow>
                  <H2 size={{ base: '32px', lg: '42px' }} lineHeight={{ base: '38px', lg: '48px' }} bold>
                    {t('Help grow the shared capital pool')}
                  </H2>
                  <Body color="whiteAlpha.800" lineHeight="27px">
                    {t(
                      'We are allocating 3M sats per quarter to circular economy hubs. Contribute to the Geyser Impact Fund to help expand this pilot and its reach.',
                    )}
                  </Body>
                  <HStack spacing={4} flexWrap="wrap">
                    <Button
                      as={Link}
                      to={getPath('discoveryImpactFunds')}
                      bg={colors.gold}
                      color={colors.ink}
                      borderRadius="999px"
                    >
                      {t('Contribute')}
                    </Button>
                    <Body size="24px" bold color="white">
                      {t('3M sats / quarter')}
                    </Body>
                  </HStack>
                </VStack>
              </Box>
            </SimpleGrid>
          </PageSection>

          <PageSection py={{ base: 8, lg: 12 }}>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} templateColumns={{ lg: '1.4fr 0.75fr' }}>
              <Box
                bg={colors.pale}
                borderRadius="16px"
                borderWidth="1px"
                borderColor={colors.line}
                p={{ base: 6, lg: 8 }}
              >
                <Eyebrow>08 FAQ</Eyebrow>
                <H2 size={{ base: '32px', lg: '40px' }} bold mt={2} mb={5}>
                  {t('Common questions')}
                </H2>
                <VStack align="stretch" spacing={4}>
                  {faqItems.map((item) => (
                    <Box
                      key={item.question}
                      bg="white"
                      borderRadius="10px"
                      borderWidth="1px"
                      borderColor={colors.line}
                      p={5}
                    >
                      <Body bold>{t(item.question)}</Body>
                      <Body color={colors.muted} lineHeight="25px" mt={2}>
                        {t(`> ${item.answer}`)}
                      </Body>
                    </Box>
                  ))}
                </VStack>
              </Box>
              <Box
                bg={colors.cream}
                borderRadius="16px"
                borderWidth="1px"
                borderColor={colors.line}
                p={{ base: 6, lg: 8 }}
              >
                <Eyebrow>Further reading</Eyebrow>
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

const Breadcrumb = () => (
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

const HeroSection = () => (
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
    bg={colors.ink}
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
      minH={{ base: '420px', lg: '396px' }}
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
            'Recoverable grants bring 0% interest, debt-free Bitcoin capital to local entrepreneurs through trusted field partners and reusable repayment loops.',
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
            color={colors.ink}
            fontSize="sm"
            fontWeight="600"
          >
            {t('Apply as partner')}
          </Button>
          <Button
            as={Link}
            to={getPath('discoveryImpactFunds')}
            h="42px"
            px="18px"
            borderRadius="6px"
            bg="#F7931A"
            color={colors.ink}
            fontSize="sm"
            fontWeight="600"
          >
            {t('Contribute')}
          </Button>
        </HStack>
      </VStack>
    </Flex>
  </Box>
)

const PageSection = ({ children, py }: { children: React.ReactNode; py?: React.ComponentProps<typeof Box>['py'] }) => (
  <Box w="full" px={standardPadding} py={py}>
    <Box maxW={`${dimensions.maxWidth + 24 * 2}px`} mx="auto">
      {children}
    </Box>
  </Box>
)

const Eyebrow = ({ children, color = colors.gold }: { children: React.ReactNode; color?: string }) => (
  <Body size="xs" bold color={color} letterSpacing="0.18em" textTransform="uppercase">
    {children}
  </Body>
)

const InfoCard = ({
  eyebrow,
  title,
  children,
  compact,
}: {
  eyebrow: string
  title: string
  children?: React.ReactNode
  compact?: boolean
}) => (
  <VStack
    align="stretch"
    spacing={4}
    bg={colors.cream}
    borderRadius="16px"
    borderWidth="1px"
    borderColor={colors.line}
    p={{ base: 6, lg: 7 }}
  >
    <Eyebrow>{eyebrow}</Eyebrow>
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

const FlowStep = ({ step }: { step: FlowStepItem }) => {
  const bg = step.isDark ? colors.ink : step.isGold ? colors.gold : colors.cream
  const color = step.isDark ? 'white' : colors.ink

  return (
    <VStack
      align="stretch"
      spacing={3}
      bg={bg}
      color={color}
      borderRadius="14px"
      borderWidth={step.isDark || step.isGold ? 0 : '1px'}
      borderColor={colors.line}
      p={5}
      minH="170px"
    >
      <Body size="xs" bold color={step.isDark ? colors.gold : colors.ink}>
        {step.number}
      </Body>
      <H3 size="24px" lineHeight="30px" bold color="inherit">
        {t(step.title)}
      </H3>
      <Body size="sm" color={step.isDark ? 'whiteAlpha.800' : colors.muted} lineHeight="23px">
        {t(step.description)}
      </Body>
    </VStack>
  )
}

const CaseStudyCard = () => (
  <Box bg={colors.ink} color="white" borderRadius="16px" p={5}>
    <VStack align="stretch" spacing={4}>
      <Eyebrow>Pilot snapshot</Eyebrow>
      <Box position="relative" overflow="hidden" borderRadius="10px">
        <Image
          src={AFRIBIT_RECOVERABLE_GRANT_COHORT_IMAGE_URL}
          alt={t('Afribit Kibera recoverable grant cohort')}
          w="full"
          h={{ base: '280px', lg: '370px' }}
          objectFit="cover"
          borderRadius="10px"
        />
        <Box position="absolute" inset={0} bg="linear-gradient(0deg, rgba(0,0,0,0.64), rgba(0,0,0,0.05))" />
        <H3
          position="absolute"
          left={5}
          bottom={5}
          maxW="360px"
          size={{ base: '28px', lg: '34px' }}
          lineHeight={{ base: '34px', lg: '40px' }}
          bold
          color="white"
        >
          {t('Afribit Kibera recoverable grant cohort')}
        </H3>
      </Box>
      <Box bg="#FFF1CC" color={colors.ink} borderRadius="10px" p={5}>
        <Body bold lineHeight="25px">
          {t(
            'Local trust, borrower validation, and monthly follow-up keep capital accountable without formal debt enforcement.',
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
