import { Box, Button, Flex, HStack, Icon, Image, Link as ChakraLink, SimpleGrid, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo } from 'react'
import {
  PiArrowRight,
  PiArrowSquareOutBold,
  PiCaretRightBold,
  PiHandshake,
  PiMegaphone,
  PiRecycle,
  PiStorefront,
  PiXLogo,
} from 'react-icons/pi'
import { Link } from 'react-router'

import { Head } from '@/config/Head.tsx'
import { useImpactFundsDonateModal } from '@/modules/impactFunds/hooks/useImpactFundsDonateModal.tsx'
import { CIRCULAR_GRANTS_CATEGORY_ID } from '@/modules/impactFunds/utils/impactFundDonatePreferences.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H1, H2, H3 } from '@/shared/components/typography/Heading.tsx'
import { getPath } from '@/shared/constants'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { ImpactFundsFieldPartnerApplicationUrl } from '@/shared/constants/platform/url.ts'
import { UserExternalLinksComponent } from '@/shared/molecules/UserExternalLinks.tsx'
import { SubscribeForm } from '@/shared/sections/SubscribeForm.tsx'
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

const HOW_IT_WORKS_SECTION_ID = 'how-it-works'

const scrollToHowItWorks = () => {
  document.getElementById(HOW_IT_WORKS_SECTION_ID)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const sectionLinks = [
  { id: 'impact', label: 'Impact' },
  { id: 'what-is-afribit', label: 'What is Afribit' },
  { id: 'why-circular-grants', label: 'Why Circular Grants' },
  { id: HOW_IT_WORKS_SECTION_ID, label: 'How it works' },
  { id: 'beneficiaries', label: 'Beneficiaries' },
  { id: 'get-started', label: 'Get started' },
] as const

const tags = ['No debt', 'No interest', 'No penalty', 'Voluntary forwarding'] as const

const impactHighlights = [
  {
    icon: PiStorefront,
    title: 'Empower local merchants',
    description: 'Debt-free grants help entrepreneurs restock, improve their businesses, and serve more customers.',
  },
  {
    icon: PiMegaphone,
    title: 'Grow the Bitcoin merchant network',
    description: 'Public campaigns and local support bring more businesses into Kibera’s circular Bitcoin economy.',
  },
  {
    icon: PiRecycle,
    title: 'Keep support moving locally',
    description: 'Recipients who choose to forward later can help the Community Fund support another entrepreneur.',
  },
] as const

const impactStats = [
  ['Funded beneficiaries', '6'],
  ['Repayment obligation', 'None'],
  ['Forwarding', 'Always voluntary'],
] as const

const grantPrinciples = [
  {
    title: 'A grant, not a loan',
    description: 'There is no debt balance, lender, collector, interest, or repayment obligation.',
  },
  {
    title: 'No penalty or pressure',
    description: 'A beneficiary is never penalised, shamed, or excluded if they cannot forward funds.',
  },
  {
    title: 'No required schedule',
    description: 'A forwarding estimate may be discussed, but it is never a commitment or payment schedule.',
  },
] as const

const programmeSteps = [
  {
    number: '01',
    title: 'Identify and verify',
    description: 'Afribit finds local entrepreneurs, understands their needs, and verifies each potential beneficiary.',
  },
  {
    number: '02',
    title: 'Build and launch',
    description:
      'Afribit helps prepare an all-or-nothing Geyser campaign with a clear story, budget, and grant purpose.',
  },
  {
    number: '03',
    title: 'Fund and support',
    description:
      'Once funded, the grant is released and Afribit supports delivery, content, and public progress updates.',
  },
  {
    number: '04',
    title: 'Forward when able',
    description:
      'If they choose and are able, recipients can forward funds into the Community Fund for a future grant.',
  },
] as const

const portfolioProjects = [
  {
    title: "Black and White Fry's Palace",
    projectUrl: 'https://geyser.fund/project/blackandwhitefryspalacekibera',
    announcementUrl: 'https://x.com/geyserfund/status/2076970224641847508?s=20',
    image:
      'https://storage.googleapis.com/geyser-images-distribution-prod-us/f0952061-c9b4-4ee6-91b4-97dd83800433_image_large(1)/image_medium.webp',
    description: 'A local food business growing its space, seating, and Bitcoin customer base.',
  },
  {
    title: 'Krezzy Kicks Collection',
    projectUrl: 'https://geyser.fund/project/krezzykickscollectionkibera',
    announcementUrl: 'https://x.com/geyserfund/status/2082043774637625380?s=20',
    image:
      'https://storage.googleapis.com/geyser-images-distribution-prod-us/a0818e7d-e041-4e46-9f46-7e2103567f87_WhatsAppImage2026-05-18at17.12.21(1)/image_medium.webp',
    description: 'A footwear business expanding stock for online and in-person customers.',
  },
  {
    title: '3 West Collection',
    projectUrl: 'https://geyser.fund/project/3westcollectionkibera',
    announcementUrl: 'https://x.com/geyserfund/status/2082013571525845288?s=20',
    image:
      'https://storage.googleapis.com/geyser-images-distribution-prod-us/002380a4-f3e4-4c22-aef6-3081ed71133e_image_large/image_medium.webp',
    description: 'A clothing and custom-printing business building its local product range.',
  },
  {
    title: 'Mama Nonny Shop',
    projectUrl: 'https://geyser.fund/project/mamanonnyshopkibera',
    announcementUrl: 'https://x.com/geyserfund/status/2082451350856614313?s=20',
    image:
      'https://storage.googleapis.com/geyser-images-distribution-prod-us/d86d02a2-a805-4c1b-970f-c4d229568a7a_WhatsAppImage2026-07-01at13.48.25(1)/image_medium.webp',
    description: 'A neighbourhood shop using its grant to carry more reliable everyday stock.',
  },
  {
    title: 'Ruth Community Mart',
    projectUrl: 'https://geyser.fund/project/ruthcommunitymartkibera',
    announcementUrl: 'https://x.com/geyserfund/status/2082466468579467572?s=20',
    image:
      'https://storage.googleapis.com/geyser-images-distribution-prod-us/309c24ba-1f66-4c1c-8af2-6f0ee35fb092_image_large(2)/image_medium.webp',
    description: 'A community shop improving its space and helping nearby merchants adopt Bitcoin.',
  },
  {
    title: "King's Shop Kibera",
    projectUrl: 'https://geyser.fund/project/kingsshopkibera?hero=geyserpromotion',
    announcementUrl: 'https://x.com/geyserfund/status/2099860797384020148',
    image:
      'https://storage.googleapis.com/geyser-images-distribution-prod-us/61b3ba5e-d6e7-43ef-8d8e-1ca64e76566d_KingShop/image_medium.webp',
    description: 'A shop, water point, and public washroom expanding stock and accepting Bitcoin.',
  },
] as const

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
      accentText,
    }),
    [accentBg, accentHoverBg, accentText, ink, line, muted, mutedSurfaceBg, onAccentText, pageBg, surfaceBg],
  )

  return (
    <>
      {donateModalElement}

      <Head
        title={t('Afribit Kibera Circular Grants Case Study')}
        description={t(
          'How Geyser and Field Partner Afribit Kibera are helping local entrepreneurs access Circular Grants without debt or repayment obligations.',
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
          <SectionNavigation colors={colors} />

          <PageSection>
            <SectionAnchor id="impact">
              <SectionHeading
                colors={colors}
                eyebrow="Impact"
                title="Stronger local businesses. More Bitcoin merchants. Support that stays close to the community."
                description="Afribit combines trusted local relationships with transparent Geyser campaigns to help Kibera entrepreneurs grow without taking on debt."
              />
              <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={4} mt={{ base: 6, lg: 8 }}>
                {impactHighlights.map((highlight) => (
                  <CardLayout key={highlight.title} dense spacing={3} h="full">
                    <Icon as={highlight.icon} boxSize={7} color={colors.accentText} aria-hidden />
                    <H3 size="lg" bold>
                      {t(highlight.title)}
                    </H3>
                    <Body size="md" color={colors.muted} lineHeight="24px">
                      {t(highlight.description)}
                    </Body>
                  </CardLayout>
                ))}
              </SimpleGrid>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={0} mt={4}>
                {impactStats.map(([label, value], index) => (
                  <VStack
                    key={label}
                    align="flex-start"
                    spacing={1}
                    py={4}
                    px={{ base: 0, md: 5 }}
                    borderTopWidth={{ base: index === 0 ? '1px' : 0, md: '1px' }}
                    borderBottomWidth="1px"
                    borderLeftWidth={{ base: 0, md: index === 0 ? 0 : '1px' }}
                    borderColor={colors.line}
                  >
                    <Body size="xs" bold color={colors.muted}>
                      {t(label)}
                    </Body>
                    <H3 size="xl" bold>
                      {t(value)}
                    </H3>
                  </VStack>
                ))}
              </SimpleGrid>
            </SectionAnchor>
          </PageSection>

          <PageSection>
            <SectionAnchor id="what-is-afribit">
              <SimpleGrid
                columns={{ base: 1, lg: 2 }}
                templateColumns={{ lg: '1.1fr 0.9fr' }}
                spacing={{ base: 6, lg: 10 }}
                alignItems="center"
              >
                <VideoCard colors={colors} />
                <VStack align="flex-start" spacing={5}>
                  <SectionHeading
                    colors={colors}
                    eyebrow="What is Afribit"
                    title="Kibera’s local trust bridge for Circular Grants."
                    description="Afribit is a Geyser Field Partner rooted in Kibera. It identifies and verifies local entrepreneurs, helps them tell their stories and build campaigns, supports delivery after funding, and documents progress for the community and contributors."
                  />
                  <Body color={colors.muted} lineHeight="27px">
                    {t(
                      'Through its local chama, Afribit brings together experienced merchants and new beneficiaries to share practical knowledge, understand business needs, and build accountability around every grant.',
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
            </SectionAnchor>
          </PageSection>

          <PageSection>
            <SectionAnchor id="why-circular-grants">
              <Box
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
                >
                  <SectionHeading
                    colors={colors}
                    eyebrow="Why they provide Circular Grants"
                    title="Business support without debt-based pressure."
                    description="Many local entrepreneurs struggle to access fair funding, while high-interest or informal debt can make a difficult situation worse. Circular Grants give approved businesses funds for a clear purpose without creating a repayment obligation."
                  />
                  <SimpleGrid columns={{ base: 1, md: 3, lg: 1 }} spacing={3}>
                    {grantPrinciples.map((principle) => (
                      <Box
                        key={principle.title}
                        borderLeftWidth="3px"
                        borderColor={colors.accentText}
                        bg={colors.pageBg}
                        p={4}
                      >
                        <H3 size="md" bold>
                          {t(principle.title)}
                        </H3>
                        <Body size="sm" color={colors.muted} mt={1} lineHeight="22px">
                          {t(principle.description)}
                        </Body>
                      </Box>
                    ))}
                  </SimpleGrid>
                </SimpleGrid>
              </Box>
            </SectionAnchor>
          </PageSection>

          <PageSection>
            <SectionAnchor id={HOW_IT_WORKS_SECTION_ID}>
              <SectionHeading
                colors={colors}
                eyebrow="How does it work"
                title="From local introduction to a public, supported grant."
                description="Afribit manages the local relationship and campaign journey end to end, while Geyser reviews and hosts the campaign and contributors help fund it."
              />
              <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4} mt={{ base: 6, lg: 8 }}>
                {programmeSteps.map((step) => (
                  <Box
                    key={step.number}
                    bg={step.number === '04' ? colors.accentBg : colors.surfaceBg}
                    color={step.number === '04' ? colors.onAccentText : colors.ink}
                    borderRadius={radius.card}
                    borderWidth="1px"
                    borderColor={step.number === '04' ? colors.accentBg : colors.line}
                    p={5}
                  >
                    <Body size="xs" bold color="inherit">
                      {step.number}
                    </Body>
                    <H3 size="lg" bold color="inherit" mt={3}>
                      {t(step.title)}
                    </H3>
                    <Body
                      size="sm"
                      color={step.number === '04' ? colors.onAccentText : colors.muted}
                      lineHeight="22px"
                      mt={2}
                    >
                      {t(step.description)}
                    </Body>
                  </Box>
                ))}
              </SimpleGrid>
            </SectionAnchor>
          </PageSection>

          <PageSection>
            <SectionAnchor id="beneficiaries">
              <Box
                bg={colors.accentBg}
                color={colors.onAccentText}
                borderRadius={radius.section}
                p={{ base: 6, lg: 8 }}
              >
                <SectionHeading
                  colors={colors}
                  color={colors.onAccentText}
                  eyebrow="Who are the beneficiaries"
                  title="Six Kibera businesses funded through Geyser."
                  description="Explore every public campaign and the announcement that introduced each funded entrepreneur."
                />
                <PortfolioCards />
              </Box>
            </SectionAnchor>
          </PageSection>

          <PageSection>
            <SectionAnchor id="get-started">
              <SectionHeading
                colors={colors}
                eyebrow="How to get started"
                title="Bring Circular Grants to your community—or follow what launches next."
              />
              <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={4} mt={{ base: 6, lg: 8 }}>
                <CardLayout dense spacing={4} h="full">
                  <Icon as={PiHandshake} boxSize={7} color={colors.accentText} aria-hidden />
                  <H3 size="xl" bold>
                    {t('Become a Field Partner')}
                  </H3>
                  <Body color={colors.muted} lineHeight="25px">
                    {t(
                      'Know your local businesses and want to steward transparent, debt-free grants? Apply to source beneficiaries, support their campaigns, and grow your local Community Fund.',
                    )}
                  </Body>
                  <Button
                    as={ChakraLink}
                    href={ImpactFundsFieldPartnerApplicationUrl}
                    isExternal
                    alignSelf="flex-start"
                    colorScheme="primary1"
                    rightIcon={<Icon as={PiArrowRight} />}
                  >
                    {t('Apply to become a Field Partner')}
                  </Button>
                </CardLayout>
                <CardLayout dense spacing={4} h="full">
                  <Icon as={PiMegaphone} boxSize={7} color={colors.accentText} aria-hidden />
                  <H3 size="xl" bold>
                    {t('Join our mailing list')}
                  </H3>
                  <Body color={colors.muted} lineHeight="25px">
                    {t('Get instant access to the latest Circular Grant launches and updates from Geyser.')}
                  </Body>
                  <SubscribeForm
                    maxWidth="full"
                    buttonProps={{
                      children: t('Join'),
                      colorScheme: 'primary1',
                      variant: 'solid',
                    }}
                    inputProps={{
                      backgroundColor: colors.pageBg,
                      placeholder: t('Enter your email'),
                    }}
                  />
                </CardLayout>
              </SimpleGrid>
            </SectionAnchor>
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
      {t('Circular Grants')}
    </Body>
    <PiCaretRightBold size={11} />
    <Body size="xs" bold color={colors.ink} aria-current="page">
      {t('Afribit Kibera case study')}
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
      backgroundPosition="center"
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
          {t('Geyser × Afribit Kibera')}
        </Eyebrow>
        <H1 size={{ base: '36px', lg: '56px' }} lineHeight={{ base: '42px', lg: '62px' }} bold color="white">
          {t('Partnering to support Kibera entrepreneurs through Circular Grants.')}
        </H1>
        <Body color="whiteAlpha.900" lineHeight="27px" maxW="620px">
          {t(
            'Afribit brings local trust, beneficiary verification, and ongoing support. Geyser helps approved local businesses raise grants without debt or repayment obligations. If and when recipients are able, they may voluntarily forward money into the Community Fund so another entrepreneur can receive support.',
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
            onClick={scrollToHowItWorks}
            _hover={{ bg: 'utils.whiteContrast' }}
          >
            {t('See how it works')}
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
          {t('Field Partner')}
        </Body>
        <Body size="sm" lineHeight="21px">
          {t('Local knowledge helps grants reach trusted entrepreneurs and go further within the community.')}
        </Body>
      </VStack>
    </Flex>
  </Box>
)

const SectionNavigation = ({ colors }: { colors: AfribitCaseStudyColors }) => (
  <PageSection py={{ base: 5, lg: 6 }}>
    <VStack align="stretch" spacing={3}>
      <Body size="xs" bold color={colors.muted}>
        {t('Explore the case study')}
      </Body>
      <HStack
        spacing={2}
        overflowX="auto"
        pb={1}
        sx={{ '&::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none' }}
      >
        {sectionLinks.map((section) => (
          <Button
            key={section.id}
            as={ChakraLink}
            href={`#${section.id}`}
            size="sm"
            variant="outline"
            colorScheme="neutral1"
            borderRadius={radius.pill}
            flexShrink={0}
          >
            {t(section.label)}
          </Button>
        ))}
      </HStack>
    </VStack>
  </PageSection>
)

const VideoCard = ({ colors }: { colors: AfribitCaseStudyColors }) => (
  <VStack align="stretch" spacing={3}>
    <Box
      bg={colors.mutedSurfaceBg}
      borderRadius={radius.section}
      borderWidth="1px"
      borderColor={colors.line}
      minH={{ base: '260px', lg: '360px' }}
      position="relative"
    >
      <Box
        as="iframe"
        src={AFRIBIT_WORKSHOP_VIDEO_URL}
        title={t('Afribit Kibera')}
        w="full"
        h="full"
        minH={{ base: '260px', lg: '360px' }}
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

const PortfolioCards = () => (
  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4} mt={{ base: 6, lg: 8 }}>
    {portfolioProjects.map((project) => (
      <CardLayout key={project.projectUrl} dense p={0} spacing={0} h="full" overflow="hidden" color="utils.text">
        <Image
          src={project.image}
          alt={t(project.title)}
          w="full"
          aspectRatio={16 / 9}
          objectFit="cover"
          loading="lazy"
        />
        <VStack align="stretch" spacing={2.5} p={4} flex={1}>
          <Body size="xs" bold color="primary1.11">
            {t('Funded beneficiary')}
          </Body>
          <H3 size="lg" lineHeight="24px" bold>
            {t(project.title)}
          </H3>
          <Body size="sm" color="neutral1.11" lineHeight="21px" noOfLines={2}>
            {t(project.description)}
          </Body>
          <HStack spacing={2} pt={1} mt="auto">
            <ChakraLink
              href={project.projectUrl}
              display="inline-flex"
              alignItems="center"
              gap={1}
              color="primary1.11"
              fontSize="sm"
              fontWeight="bold"
            >
              {t('Project')}
              <Icon as={PiArrowSquareOutBold} />
            </ChakraLink>
            <ChakraLink
              href={project.announcementUrl}
              isExternal
              display="inline-flex"
              alignItems="center"
              gap={1}
              color="neutral1.12"
              fontSize="sm"
              fontWeight="bold"
            >
              <Icon as={PiXLogo} />
              {t('Announcement')}
            </ChakraLink>
          </HStack>
        </VStack>
      </CardLayout>
    ))}
  </SimpleGrid>
)

const SectionHeading = ({ colors, eyebrow, title, description, color }: SectionHeadingProps) => (
  <VStack align="flex-start" spacing={3} maxW="860px">
    <Eyebrow colors={colors} color={color}>
      {t(eyebrow)}
    </Eyebrow>
    <H2
      size={{ base: '32px', lg: '44px' }}
      lineHeight={{ base: '38px', lg: '50px' }}
      bold
      color={color ?? colors.ink}
      sx={{ textWrap: 'balance' }}
    >
      {t(title)}
    </H2>
    {description ? (
      <Body color={color ?? colors.muted} lineHeight="27px" maxW="760px">
        {t(description)}
      </Body>
    ) : null}
  </VStack>
)

type SectionHeadingProps = {
  colors: AfribitCaseStudyColors
  eyebrow: string
  title: string
  description?: string
  color?: string
}

const SectionAnchor = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <Box id={id} scrollMarginTop={{ base: '72px', md: '88px' }}>
    {children}
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
