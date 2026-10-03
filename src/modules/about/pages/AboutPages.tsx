import { Box, Button, HStack, Icon, Link as ChakraLink, SimpleGrid, VStack, useColorModeValue } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowRight } from 'react-icons/pi'
import { Link } from 'react-router'

import { Head } from '@/config/Head.tsx'
import { impactFundsAboutStats, impactFundsResourceCards } from '@/modules/impactFunds/pages/ImpactFundsMainPage.tsx'
import { impactFundWorkshopDecks } from '@/modules/impactFunds/pages/ImpactFundsWorkshopsPage.tsx'
import {
  circularGrantFaqItems,
  circularGrantFlowSteps,
  circularGrantInfoPills,
} from '@/modules/microLending/pages/CircularGrantsPage.tsx'
import { DiscoveryBottomNav } from '@/modules/navigation/discoveryNav/DiscoveryBottomNav.tsx'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body, H1, H2, H3 } from '@/shared/components/typography'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { getPath } from '@/shared/constants/index.ts'
import { ImpactFundsFieldPartnerApplicationUrl } from '@/shared/constants/platform/url.ts'
import { useImpactFundsFieldPartnerLeaderboardQuery, useImpactFundsQuery } from '@/types/index.ts'
import { getShortAmountLabel } from '@/utils/index.ts'

type AboutTopic = 'overview' | 'fieldPartners' | 'whereGeyserWorks' | 'impact' | 'dueDiligence'

const topicContent: Record<AboutTopic, { title: string; description: string }> = {
  overview: {
    title: 'What is Geyser?',
    description:
      'Geyser helps trusted local leaders move Bitcoin capital into projects that make a difference in their communities.',
  },
  fieldPartners: {
    title: 'Field Partners',
    description:
      'Field Partners are the trusted local network that helps projects launch, access capital, and report on impact.',
  },
  whereGeyserWorks: {
    title: 'Where Geyser Works',
    description: 'Geyser works through local Field Partners who understand the communities and projects they support.',
  },
  impact: {
    title: 'Impact',
    description:
      'Impact Funds and Circular Grants help capital circulate through local economies and support practical Bitcoin adoption.',
  },
  dueDiligence: {
    title: 'Due Diligence',
    description: 'Trust is built through local context, clear funding controls, and public learning about what works.',
  },
}

const topicPaths: Record<AboutTopic, string> = {
  overview: getPath('about'),
  fieldPartners: getPath('aboutFieldPartners'),
  whereGeyserWorks: getPath('aboutWhereGeyserWorks'),
  impact: getPath('aboutImpact'),
  dueDiligence: getPath('aboutDueDiligence'),
}

const dueDiligencePrinciples = [
  {
    number: '01',
    title: 'Local validation',
    description: 'Field Partners bring context about the people, needs, and commitments behind a project.',
  },
  {
    number: '02',
    title: 'Funding controls',
    description: 'Funding models and contribution flows are designed to make allocation visible and deliberate.',
  },
  {
    number: '03',
    title: 'Evidence and reporting',
    description: 'Projects and partners are encouraged to share progress, outcomes, and lessons.',
  },
  {
    number: '04',
    title: 'Honest limits',
    description: 'Due diligence reduces avoidable risk; it does not guarantee a project outcome.',
  },
] as const

const overviewPathways = [
  {
    title: 'Circular Grants',
    description: 'Reusable, debt-free capital that can return to the next local entrepreneur.',
    action: 'Explore Circular Grants',
    to: getPath('discoveryCircularGrants'),
  },
  {
    title: 'Impact Funds',
    description: 'Coordinated capital for trusted projects, with public reporting on outcomes.',
    action: 'See our impact',
    to: `${getPath('discoveryImpactFunds')}#impact`,
  },
  {
    title: 'Field Partners',
    description: 'Local teams who source projects, build trust, and keep capital working on the ground.',
    action: 'Meet Field Partners',
    to: `${getPath('discoveryImpactFunds')}#field-partners`,
  },
] as const

export const AboutOverviewPage = () => <AboutPage topic="overview" />
export const AboutFieldPartnersPage = () => <AboutPage topic="fieldPartners" />
export const AboutWhereGeyserWorksPage = () => <AboutPage topic="whereGeyserWorks" />
export const AboutImpactPage = () => <AboutPage topic="impact" />
export const AboutDueDiligencePage = () => <AboutPage topic="dueDiligence" />

export const AboutPage = ({ topic }: { topic: AboutTopic }) => {
  const content = topicContent[topic]
  const pageBg = useColorModeValue('white', 'utils.pbg')
  const mutedColor = 'neutralAlpha.11'

  return (
    <Box w="full" minH="100vh" bg={pageBg}>
      <Head
        title={t(content.title)}
        description={t(content.description)}
        url={`https://geyser.fund${topicPaths[topic]}`}
      />
      <VStack
        w="full"
        maxW={dimensions.maxWidth}
        mx="auto"
        px={{ base: 5, md: 8 }}
        pt={{ base: 10, lg: 14 }}
        pb={{ base: 28, lg: 20 }}
        spacing={{ base: 12, lg: 16 }}
        align="stretch"
      >
        <VStack align="start" spacing={4} maxW="760px">
          <Body size="sm" bold color="primary1.11">
            {t('About')}
          </Body>
          <H1 size={{ base: '2xl', lg: '4xl' }} bold lineHeight={{ base: '1.15', lg: '1.1' }}>
            {t(content.title)}
          </H1>
          <Body size={{ base: 'md', lg: 'lg' }} color={mutedColor} lineHeight={1.6}>
            {t(content.description)}
          </Body>
        </VStack>

        {topic === 'overview' ? <OverviewContent /> : null}
        {topic === 'fieldPartners' ? <FieldPartnersContent /> : null}
        {topic === 'whereGeyserWorks' ? <WhereGeyserWorksContent /> : null}
        {topic === 'impact' ? <ImpactContent /> : null}
        {topic === 'dueDiligence' ? <DueDiligenceContent /> : null}
      </VStack>
      <DiscoveryBottomNav />
    </Box>
  )
}

const SectionHeader = ({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) => {
  const mutedColor = 'neutralAlpha.11'

  return (
    <VStack align="start" spacing={2} maxW="720px">
      {eyebrow ? (
        <Body size="sm" bold color="primary1.11">
          {t(eyebrow)}
        </Body>
      ) : null}
      <H2 size={{ base: 'xl', lg: '3xl' }} bold>
        {t(title)}
      </H2>
      {description ? (
        <Body size={{ base: 'md', lg: 'lg' }} color={mutedColor} lineHeight={1.6}>
          {t(description)}
        </Body>
      ) : null}
    </VStack>
  )
}

const OverviewContent = () => {
  const mutedColor = 'neutralAlpha.11'
  const cardBg = useColorModeValue('neutral1.2', 'neutral1.3')

  return (
    <VStack align="stretch" spacing={{ base: 12, lg: 16 }}>
      <VStack align="stretch" spacing={6}>
        <SectionHeader
          eyebrow="How Geyser works"
          title="Bitcoin capital works best when it understands local reality."
          description="Geyser connects people who want to fund meaningful work with Field Partners and projects rooted in local communities."
        />
        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={4}>
          {overviewPathways.map((pathway) => (
            <CardLayout key={pathway.title} h="full" align="start" spacing={5} bg={cardBg} hover>
              <VStack align="start" spacing={2} flex={1}>
                <H3 size={{ base: 'md', lg: 'lg' }} bold>
                  {t(pathway.title)}
                </H3>
                <Body size="sm" color={mutedColor} lineHeight={1.5}>
                  {t(pathway.description)}
                </Body>
              </VStack>
              <Button
                as={Link}
                to={pathway.to}
                size="md"
                variant="solid"
                bg="neutral1.12"
                color="white"
                fontWeight={600}
                rightIcon={<Icon as={PiArrowRight} />}
                _hover={{ bg: 'neutral1.11', color: 'white' }}
              >
                {t(pathway.action)}
              </Button>
            </CardLayout>
          ))}
        </SimpleGrid>
      </VStack>

      <CircularGrantModelSection />
      <ProgramResourcesSection />

      <CardLayout
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'stretch', md: 'center' }}
        justify="space-between"
        spacing={4}
        bg={cardBg}
      >
        <VStack align="start" spacing={1} minW={0}>
          <H3 size="md" bold>
            {t('How we build trust')}
          </H3>
          <Body size="sm" color={mutedColor}>
            {t('Read how local context, funding controls, and public learning shape Geyser due diligence.')}
          </Body>
        </VStack>
        <Button
          as={Link}
          to={getPath('aboutDueDiligence')}
          variant="outline"
          colorScheme="neutral1"
          rightIcon={<Icon as={PiArrowRight} />}
        >
          {t('Due Diligence')}
        </Button>
      </CardLayout>
    </VStack>
  )
}

const FieldPartnersContent = () => (
  <VStack align="start" spacing={10}>
    <SectionHeader
      title="A local trust network"
      description="Field Partners are vetted local community leaders who onboard projects, support delivery, and share what they learn with the wider Geyser community."
    />
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} w="full">
      {impactFundWorkshopDecks.map((deck) => (
        <CardLayout key={deck.title} hover>
          <H3 size="md" bold>
            {t(deck.description)}
          </H3>
          <ChakraLink href={deck.url} isExternal color="primary1.11" mt={3} display="inline-block">
            {t('Open workshop deck')}
          </ChakraLink>
        </CardLayout>
      ))}
    </SimpleGrid>
    <HStack spacing={3} flexWrap="wrap">
      <Button as={ChakraLink} href={ImpactFundsFieldPartnerApplicationUrl} isExternal colorScheme="primary1" size="lg">
        {t('Apply to become a Field Partner')}
      </Button>
      <Button as={Link} to={`${getPath('discoveryImpactFunds')}#field-partners`} variant="outline" colorScheme="neutral1">
        {t('See Field Partners')}
      </Button>
    </HStack>
  </VStack>
)

const WhereGeyserWorksContent = () => {
  const { data, loading } = useImpactFundsFieldPartnerLeaderboardQuery({ variables: { input: { limit: 100 } } })
  const countries = Array.from(
    new Set((data?.impactFundFieldPartnerLeaderboard.rows ?? []).map((row) => row.country)),
  ).sort()

  return (
    <VStack align="start" spacing={8} w="full">
      <SectionHeader
        title="Local work, connected globally"
        description="Our Field Partner network grows from the places where projects are being built. The countries below reflect the current public partner leaderboard."
      />
      {loading ? <Body>{t('Loading Field Partner countries…')}</Body> : null}
      {!loading && countries.length === 0 ? (
        <Body>{t('Field Partner locations will appear here as the network grows.')}</Body>
      ) : null}
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={3} w="full">
        {countries.map((country) => (
          <CardLayout key={country} dense py={4} px={5}>
            <H3 size="md">{country}</H3>
          </CardLayout>
        ))}
      </SimpleGrid>
    </VStack>
  )
}

const ImpactContent = () => {
  const { data, loading } = useImpactFundsQuery()
  const mutedColor = 'neutralAlpha.11'

  return (
    <VStack align="start" spacing={10}>
      <SectionHeader
        title="Impact happens locally."
        description="Impact Funds channel capital toward trusted projects, while Circular Grants help capital return to the same local economy and support the next entrepreneur."
      />
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={4} w="full">
        {impactFundsAboutStats.map((stat) => (
          <CardLayout key={stat.label}>
            <H3 size="lg" bold>
              {t(stat.value)}
            </H3>
            <Body mt={2} color={mutedColor}>
              {t(stat.label)}
            </Body>
          </CardLayout>
        ))}
      </SimpleGrid>
      <VStack align="stretch" spacing={4} w="full">
        <H2 size={{ base: 'xl', lg: '3xl' }} bold>
          {t('Impact Funds and the work they support')}
        </H2>
        {loading ? <Body>{t('Loading Impact Funds…')}</Body> : null}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          {(data?.impactFunds ?? []).map((fund) => (
            <CardLayout key={fund.id}>
              <H3 size="lg" bold>
                {t(fund.title)}
              </H3>
              <Body mt={2} color={mutedColor}>
                {t(fund.subtitle ?? 'Capital allocated through trusted local projects.')}
              </Body>
              <Body mt={4} bold>
                {t('{{amount}} sats awarded across {{projects}} projects', {
                  amount: getShortAmountLabel(fund.metrics.awardedTotalSats, true),
                  projects: fund.metrics.projectsFundedCount,
                })}
              </Body>
            </CardLayout>
          ))}
        </SimpleGrid>
      </VStack>
      <ProgramResourcesSection />
      <Button as={Link} to={getPath('discoveryImpactFunds')} colorScheme="primary1" size="lg">
        {t('Explore Impact Funds')}
      </Button>
    </VStack>
  )
}

const DueDiligenceContent = () => {
  const mutedColor = 'neutralAlpha.11'
  const cardBg = useColorModeValue('neutral1.2', 'neutral1.3')

  return (
    <VStack align="stretch" spacing={{ base: 12, lg: 16 }}>
      <VStack align="stretch" spacing={6}>
        <SectionHeader
          eyebrow="Our process"
          title="Trust is a process, not a badge."
          description="Geyser combines Field Partner context, project review, controlled funding flows, and ongoing reporting to make decisions more accountable."
        />
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
          {dueDiligencePrinciples.map((principle) => (
            <CardLayout key={principle.title} bg={cardBg} minH="180px">
              <Body size="sm" bold color="primary1.11">
                {principle.number}
              </Body>
              <H3 size={{ base: 'md', lg: 'lg' }} bold>
                {t(principle.title)}
              </H3>
              <Body color={mutedColor} lineHeight={1.6}>
                {t(principle.description)}
              </Body>
            </CardLayout>
          ))}
        </SimpleGrid>
      </VStack>

      <VStack align="stretch" spacing={6}>
        <SectionHeader
          eyebrow="In the open"
          title="What we are still learning"
          description="Circular Grants are being refined in public. Capital return depends on community agreements and follow-up, and reporting will help us understand what works across different local contexts."
        />
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
          {circularGrantFaqItems.slice(0, 2).map((item) => (
            <CardLayout key={item.question} bg={cardBg}>
              <H3 size="md" bold>
                {t(item.question)}
              </H3>
              <Body color={mutedColor} lineHeight={1.6}>
                {t(item.answer)}
              </Body>
            </CardLayout>
          ))}
        </SimpleGrid>
      </VStack>

      <CardLayout
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'stretch', md: 'center' }}
        justify="space-between"
        spacing={4}
        bg={cardBg}
      >
        <VStack align="start" spacing={1} minW={0}>
          <H3 size="md" bold>
            {t('See this in practice')}
          </H3>
          <Body size="sm" color={mutedColor}>
            {t('Field Partners are the local trust layer behind Geyser due diligence.')}
          </Body>
        </VStack>
        <Button
          as={Link}
          to={`${getPath('discoveryImpactFunds')}#field-partners`}
          bg="neutral1.12"
          color="white"
          fontWeight={600}
          rightIcon={<Icon as={PiArrowRight} />}
          _hover={{ bg: 'neutral1.11', color: 'white' }}
        >
          {t('Meet Field Partners')}
        </Button>
      </CardLayout>
    </VStack>
  )
}

const CircularGrantModelSection = () => {
  const mutedColor = 'neutralAlpha.11'
  const cardBg = useColorModeValue('neutral1.2', 'neutral1.3')

  return (
    <VStack align="stretch" spacing={6} w="full">
      <SectionHeader
        eyebrow="Circular Grants"
        title="Capital that keeps moving"
        description="Circular Grants provide debt-free capital to local entrepreneurs. When capital returns through community agreements, it can be deployed again in the same local economy."
      />
      <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={3}>
        {circularGrantInfoPills.map((pill) => (
          <CardLayout key={pill} bg={cardBg} py={4} align="center">
            <Body bold>{t(pill)}</Body>
          </CardLayout>
        ))}
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing={4}>
        {circularGrantFlowSteps.map((step) => (
          <CardLayout key={step.number} bg={cardBg}>
            <Body size="sm" bold color="primary1.11">
              {t('Step {{number}}', { number: step.number })}
            </Body>
            <H3 size="md" bold>
              {t(step.title)}
            </H3>
            <Body size="sm" color={mutedColor} lineHeight={1.5}>
              {t(step.description)}
            </Body>
          </CardLayout>
        ))}
      </SimpleGrid>
    </VStack>
  )
}

const ProgramResourcesSection = () => {
  const mutedColor = 'neutralAlpha.11'
  const cardBg = useColorModeValue('neutral1.2', 'neutral1.3')

  return (
    <VStack align="stretch" spacing={6} w="full">
      <SectionHeader
        eyebrow="Learn more"
        title="Explore the work behind the model"
        description="Read the case studies, reports, and workshop resources that document how local projects move from trust to impact."
      />
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {[...impactFundsResourceCards.caseStudies, ...impactFundsResourceCards.reports].map((resource) => (
          <CardLayout key={resource.title} bg={cardBg} hover as={ChakraLink} href={resource.url} isExternal>
            <Body size="sm" bold color="primary1.11">
              {t(resource.eyebrow)}
            </Body>
            <H3 size="md" bold>
              {t(resource.title)}
            </H3>
            {'description' in resource ? (
              <Body size="sm" color={mutedColor} lineHeight={1.5}>
                {t(resource.description)}
              </Body>
            ) : null}
            <HStack spacing={1} color="black" pt={1}>
              <Body size="sm" fontWeight={600}>
                {t('Read resource')}
              </Body>
              <Icon as={PiArrowRight} />
            </HStack>
          </CardLayout>
        ))}
      </SimpleGrid>
    </VStack>
  )
}
