import { Box, Button, Flex, HStack, Image, SimpleGrid, VStack } from '@chakra-ui/react'
import { PiCaretRightBold } from 'react-icons/pi'
import { Link } from 'react-router'

import { Head } from '@/config/Head.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H1, H2, H3 } from '@/shared/components/typography/Heading.tsx'
import { getPath } from '@/shared/constants'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { UserExternalLinksComponent } from '@/shared/molecules/UserExternalLinks.tsx'
import { standardPadding } from '@/shared/styles/index.ts'

const colors = {
  pageBg: '#FFFFFF',
  ink: '#17120C',
  muted: '#5F6268',
  line: '#E9E2D4',
  cream: '#FFF8EA',
  pale: '#F8F9F8',
  beige: '#EAE3D4',
  gold: '#F6CF4A',
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

type ModelCard = {
  title: string
  description: string
  borderColor: string
  dark?: boolean
}

const modelCards: readonly ModelCard[] = [
  {
    title: 'Geyser provides capital',
    description: 'Impact Fund capital backs selected local businesses as recoverable grants.',
    borderColor: colors.ink,
  },
  {
    title: 'Afribit validates trust',
    description: 'Afribit acts as guarantor, insurer, monitor, and local reporting partner.',
    borderColor: '#00A884',
  },
  {
    title: 'Borrowers commit',
    description: 'Businesses set clear goals, repayment commitments, updates, and communication channels.',
    borderColor: colors.gold,
  },
  {
    title: 'Capital recirculates',
    description: 'Recovered funds can be reused for more Geyser projects in the same community.',
    borderColor: colors.ink,
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

export const AfribitCaseStudyPage = () => {
  return (
    <>
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
            <Breadcrumb />
          </PageSection>

          <PageSection py={0}>
            <HeroSection />
          </PageSection>

          <PageSection py={{ base: 10, lg: 14 }}>
            <SimpleGrid
              columns={{ base: 1, lg: 2 }}
              templateColumns={{ lg: '1.15fr 0.85fr' }}
              spacing={{ base: 7, lg: 12 }}
            >
              <VideoCard />
              <VStack align="flex-start" spacing={5} justify="center">
                <Eyebrow color={colors.muted}>{t('What this case study is')}</Eyebrow>
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
                    <Box key={tag} bg={colors.beige} borderRadius={radius.button} px={3} py={2}>
                      <Body size="xs" bold>
                        {t(tag)}
                      </Body>
                    </Box>
                  ))}
                </HStack>
              </VStack>
            </SimpleGrid>
          </PageSection>

          <PageSection py={{ base: 6, lg: 9 }}>
            <Box bg={colors.beige} borderRadius={radius.section} p={{ base: 6, lg: 8 }}>
              <SimpleGrid
                columns={{ base: 1, lg: 2 }}
                templateColumns={{ lg: '0.85fr 1.15fr' }}
                spacing={{ base: 6, lg: 10 }}
                mb={7}
              >
                <VStack align="flex-start" spacing={3}>
                  <Eyebrow color={colors.muted}>{t('The chama')}</Eyebrow>
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
                    bg={group.dark ? colors.ink : 'white'}
                    color={group.dark ? 'white' : colors.ink}
                    borderRadius={radius.card}
                    p={5}
                    minH="178px"
                  >
                    <Eyebrow color={group.dark ? colors.gold : '#00A884'}>{t(group.eyebrow)}</Eyebrow>
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

          <PageSection py={{ base: 10, lg: 14 }}>
            <SimpleGrid
              columns={{ base: 1, lg: 2 }}
              templateColumns={{ lg: '0.85fr 1.15fr' }}
              spacing={{ base: 7, lg: 12 }}
            >
              <VStack align="flex-start" spacing={4}>
                <Eyebrow color={colors.muted}>{t('Recoverable grants')}</Eyebrow>
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
                    bg={card.dark ? colors.ink : 'white'}
                    color={card.dark ? 'white' : colors.ink}
                    borderRadius={radius.card}
                    borderWidth="1px"
                    borderColor={card.dark ? colors.ink : colors.line}
                    borderTopWidth="3px"
                    borderTopColor={card.borderColor}
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

          <PageSection py={{ base: 8, lg: 11 }}>
            <Box bg={colors.ink} color="white" borderRadius={radius.section} p={{ base: 6, lg: 8 }}>
              <SimpleGrid
                columns={{ base: 1, lg: 2 }}
                templateColumns={{ lg: '0.95fr 1.05fr' }}
                spacing={{ base: 5, lg: 10 }}
                mb={7}
              >
                <VStack align="flex-start" spacing={3}>
                  <Eyebrow color={colors.gold}>{t('The chama portfolio')}</Eyebrow>
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
              <PortfolioTable />
            </Box>
          </PageSection>

          <PageSection py={{ base: 8, lg: 11 }}>
            <SimpleGrid columns={{ base: 1, lg: 2 }} templateColumns={{ lg: '2fr 1fr' }} spacing={5}>
              <Box bg={colors.gold} borderRadius={radius.section} p={{ base: 6, lg: 8 }}>
                <Eyebrow color={colors.ink}>{t('Fund reusable capital')}</Eyebrow>
                <H2 size={{ base: '34px', lg: '44px' }} lineHeight={{ base: '40px', lg: '48px' }} bold mt={3}>
                  {t('Fund more Impact Fund recoverable grants.')}
                </H2>
                <Body lineHeight="27px" mt={4} maxW="720px">
                  {t(
                    'Support businesses that can repay, recycle capital, and create compounding impact across local Bitcoin communities.',
                  )}
                </Body>
                <Button
                  as={Link}
                  to={getPath('discoveryImpactFunds')}
                  h="42px"
                  px={5}
                  mt={6}
                  borderRadius={radius.button}
                  bg={colors.ink}
                  color="white"
                  fontSize="sm"
                  fontWeight="800"
                >
                  {t('Fund recoverable grants')}
                </Button>
              </Box>
              <Box bg={colors.ink} color="white" borderRadius={radius.section} p={{ base: 6, lg: 8 }}>
                <Eyebrow color={colors.gold}>{t('Why it matters')}</Eyebrow>
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

const Breadcrumb = () => (
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

const HeroSection = () => (
  <Box
    position="relative"
    overflow="hidden"
    borderRadius={radius.section}
    minH={{ base: '520px', lg: '525px' }}
    bg={colors.ink}
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
      minH={{ base: '520px', lg: '525px' }}
      align={{ base: 'flex-end', lg: 'center' }}
      justify="space-between"
      gap={8}
      px={{ base: 6, lg: 8 }}
      py={{ base: 8, lg: 10 }}
      direction={{ base: 'column', lg: 'row' }}
    >
      <VStack align="flex-start" spacing={5} maxW={{ base: 'full', lg: '650px' }}>
        <Eyebrow color={colors.gold}>{t('Geyser x Afribit Kibera')}</Eyebrow>
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
            as={Link}
            to={getPath('discoveryImpactFunds')}
            h="42px"
            px={5}
            borderRadius={radius.button}
            bg={colors.ink}
            color="white"
            fontSize="sm"
            fontWeight="800"
          >
            {t('Fund the partnership')}
          </Button>
          <Button
            as="a"
            href="#chama-model"
            h="42px"
            px={5}
            borderRadius={radius.button}
            bg={colors.gold}
            color={colors.ink}
            fontSize="sm"
            fontWeight="800"
          >
            {t('See the Chama model')}
          </Button>
        </HStack>
      </VStack>
      <VStack
        spacing={2}
        bg="white"
        color={colors.ink}
        borderRadius={radius.pill}
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

const VideoCard = () => (
  <VStack align="stretch" spacing={3}>
    <Box bg={colors.ink} borderRadius={radius.section} minH={{ base: '280px', lg: '400px' }} position="relative">
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
          borderLeft={`15px solid ${colors.ink}`}
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

const PortfolioTable = () => (
  <Box overflowX="auto" borderRadius={radius.card}>
    <Box minW="940px" bg="white" color={colors.ink} borderRadius={radius.card} overflow="hidden">
      <SimpleGrid columns={4} templateColumns="1.1fr 1fr 1.75fr 0.65fr" bg={colors.gold}>
        {['Project', 'Capital purpose', 'Chama status', ''].map((heading) => (
          <Body key={heading || 'action'} size="xs" bold letterSpacing="0.12em" textTransform="uppercase" px={5} py={4}>
            {t(heading)}
          </Body>
        ))}
      </SimpleGrid>
      {portfolioProjects.map((row) => (
        <SimpleGrid
          key={row.project}
          columns={4}
          templateColumns="1.1fr 1fr 1.75fr 0.65fr"
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
          <Body px={5} py={5} bold>
            {t('See project ->')}
          </Body>
        </SimpleGrid>
      ))}
    </Box>
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

const FooterSection = () => (
  <Box w="full" px={standardPadding} pb={{ base: 28, lg: 10 }}>
    <Box maxW={`${dimensions.maxWidth + 24 * 2}px`} mx="auto">
      <UserExternalLinksComponent />
    </Box>
  </Box>
)
