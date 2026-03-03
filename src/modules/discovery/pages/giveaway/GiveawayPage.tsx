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
import { useMemo, useRef } from 'react'
import { PiArrowRight, PiHandshakeBold, PiListNumbersBold, PiTrophyBold } from 'react-icons/pi'
import { Link as RouterLink } from 'react-router'

import { Head } from '@/config/Head'
import { useAuthContext } from '@/context/auth'
import { LandingProjectCard } from '@/modules/discovery/pages/landing/components/LandingProjectCard.tsx'
import { Body, H2 } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import {
  OrderByDirection,
  ProjectCategory,
  ProjectsGetWhereInputStatus,
  ProjectsOrderByField,
  useAcelerandoVipLeaderboardQuery,
  useAcelerandoVipMyPositionQuery,
  useProjectsForLandingPageQuery,
} from '@/types/index.ts'

import { GiveawayHero } from './components/GiveawayHero.tsx'
import { GiveawayLeaderboard } from './components/GiveawayLeaderboard.tsx'
import { GiveawayProgress } from './components/GiveawayProgress.tsx'

const REFRESH_INTERVAL_MS = 60_000
const MIN_FEATURED_PROJECT_DONATIONS_USD_CENTS = 1_000
const FEATURED_PROJECTS_LIMIT = 5

const howItWorksSteps = [
  {
    title: t('Contribute while logged in'),
    description: t('Make contributions to any project on Geyser while signed into your account.'),
    icon: PiHandshakeBold,
  },
  {
    title: t("Back projects you don't own"),
    description: t('Self-contributions are excluded. Support projects created by other people.'),
    icon: PiTrophyBold,
  },
  {
    title: t('Be in the top 3 of contributors'),
    description: t('The 3 contributors with the most eligible sats on the leaderboard win.'),
    icon: PiListNumbersBold,
  },
]

const faqItems = [
  {
    question: t("Why don't I see my contribution"),
    answer: t('It may be from a logged-out session, still pending, excluded, or delayed by indexing.'),
  },
  {
    question: t('Do contributions to my own projects count'),
    answer: t('No. Self-contributions are excluded.'),
  },
  {
    question: t('What if I refund or charge back'),
    answer: t('Refunded or chargeback-related contributions are excluded.'),
  },
  {
    question: t('How are ties broken'),
    answer: t('Higher score wins; ties go to whoever reached that score first, then lower user ID.'),
  },
  {
    question: t('Can I win more than one ticket'),
    answer: t('No. One ticket per person.'),
  },
  {
    question: t('Where will winners be announced'),
    answer: t('On this page, plus email and inbox notifications.'),
  },
]

export const GiveawayPage = () => {
  const { isLoggedIn } = useAuthContext()
  const featuredSectionRef = useRef<HTMLDivElement>(null)
  const scrollToFeatured = () => featuredSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const giveawayBannerBackground = useColorModeValue(
    "linear-gradient(120deg, rgba(27, 9, 57, 0.86) 12%, rgba(43, 14, 91, 0.62) 64%, rgba(25, 8, 57, 0.8) 100%), url('/images/acelerando-bitcoin-banner.webp')",
    "linear-gradient(120deg, rgba(17, 6, 36, 0.9) 8%, rgba(34, 11, 73, 0.72) 58%, rgba(14, 5, 33, 0.9) 100%), url('/images/acelerando-bitcoin-banner.webp')",
  )
  const mutedText = useColorModeValue('neutral1.9', 'neutral1.10')
  const subtleText = useColorModeValue('neutral1.8', 'neutral1.10')
  const cardBorder = useColorModeValue('neutral1.6', 'neutral1.5')
  const iconBg = useColorModeValue('primary1.3', 'primary1.4')
  const iconColor = useColorModeValue('primary1.11', 'primary1.9')
  const accordionBorder = useColorModeValue('neutral1.4', 'neutral1.5')
  const ctaButtonBg = useColorModeValue('white', 'neutral1.2')
  const ctaButtonColor = useColorModeValue('gray.900', 'neutral1.12')
  const ctaButtonHoverBg = useColorModeValue('neutral1.2', 'neutral1.3')

  const {
    data: causesData,
    loading: causesLoading,
    error: causesError,
    refetch: refetchCauses,
  } = useProjectsForLandingPageQuery({
    variables: {
      input: {
        where: {
          category: ProjectCategory.Cause,
          status: ProjectsGetWhereInputStatus.Active,
        },
        orderBy: [{ field: ProjectsOrderByField.LaunchedAt, direction: OrderByDirection.Desc }],
        pagination: { take: 40 },
      },
    },
  })

  const featuredProjects = useMemo(() => {
    const all = causesData?.projectsGet?.projects ?? []
    const eligibleProjects = all.filter(
      (project) => (project.balanceUsdCent ?? 0) >= MIN_FEATURED_PROJECT_DONATIONS_USD_CENTS,
    )
    const shuffled = [...eligibleProjects].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, FEATURED_PROJECTS_LIMIT)
  }, [causesData])

  const {
    data: leaderboardData,
    loading: leaderboardLoading,
    error: leaderboardError,
    refetch: refetchLeaderboard,
  } = useAcelerandoVipLeaderboardQuery({
    pollInterval: REFRESH_INTERVAL_MS,
    notifyOnNetworkStatusChange: true,
  })

  const {
    data: myPositionData,
    loading: myPositionLoading,
    error: myPositionError,
    refetch: refetchMyPosition,
  } = useAcelerandoVipMyPositionQuery({
    pollInterval: REFRESH_INTERVAL_MS,
    notifyOnNetworkStatusChange: true,
    skip: !isLoggedIn,
  })

  const leaderboard = leaderboardData?.acelerandoVipLeaderboard

  return (
    <>
      <Head
        title={t('VIP Ticket Giveaway: Acelerando Bitcoin')}
        description={t('Win 1 of 3 VIP tickets by becoming a top contributor on Geyser before May 30.')}
        url={`https://geyser.fund${getPath('giveawayAcelerandoVip')}`}
      />

      {/* Hero section — breaks out of Discovery layout padding for full bleed */}
      <GiveawayHero
        leaderboard={leaderboard}
        leaderboardLoading={leaderboardLoading}
        backgroundImage={giveawayBannerBackground}
      />

      {/* Content */}
      <VStack align="stretch" spacing={14} pt={{ base: 8, lg: 12 }}>
        {/* How it works */}
        <VStack align="stretch" spacing={6}>
          <H2 size="xl" bold>
            {t('How It Works')}
          </H2>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
            {howItWorksSteps.map((step, index) => (
              <VStack
                key={step.title}
                align="stretch"
                spacing={4}
                p={6}
                borderRadius="xl"
                border="1px solid"
                borderColor={cardBorder}
                transition="all 0.2s"
                _hover={{ borderColor: iconColor, shadow: 'sm' }}
              >
                <HStack spacing={3}>
                  <Flex
                    w="32px"
                    h="32px"
                    align="center"
                    justify="center"
                    borderRadius="full"
                    bg={iconBg}
                    flexShrink={0}
                  >
                    <Body bold size="sm" color={iconColor}>
                      {index + 1}
                    </Body>
                  </Flex>
                  <Body bold>{step.title}</Body>
                </HStack>
                <Body size="sm" color={mutedText}>
                  {step.description}
                </Body>
              </VStack>
            ))}
          </SimpleGrid>
          <HStack spacing={4} flexWrap="wrap" pt={1}>
            <Body size="sm" color={subtleText}>
              <Body as="span" bold>
                {t('Includes')}
              </Body>
              {': '}
              {t('VIP conference pass')}
            </Body>
            <Body size="sm" color={subtleText}>
              <Body as="span" bold>
                {t('Excludes')}
              </Body>
              {': '}
              {t('travel & accommodation')}
            </Body>
          </HStack>
        </VStack>

        {/* Your Progress */}
        {isLoggedIn ? (
          <GiveawayProgress
            data={myPositionData?.acelerandoVipMyPosition}
            isLoading={myPositionLoading && !myPositionData}
            isError={Boolean(myPositionError)}
            onViewFeatured={scrollToFeatured}
            onRetry={() => {
              refetchMyPosition().catch(() => undefined)
            }}
          />
        ) : (
          <GiveawayProgress data={null} />
        )}

        {/* Leaderboard */}
        <GiveawayLeaderboard
          entries={leaderboard?.entries || []}
          isLoading={leaderboardLoading && !leaderboard}
          isError={Boolean(leaderboardError) && !leaderboard}
          lastUpdatedAt={leaderboard?.updatedAt}
          timezone={leaderboard?.timezone}
          onRetry={() => {
            refetchLeaderboard().catch(() => undefined)
          }}
        />

        {/* Featured Causes */}
        {causesLoading ? (
          <Body size="sm" color={mutedText}>
            {t('Loading featured projects...')}
          </Body>
        ) : causesError ? (
          <VStack align="start" spacing={2}>
            <Body size="sm" color={mutedText}>
              {t('We could not load featured projects right now.')}
            </Body>
            <Button
              size="sm"
              variant="outline"
              colorScheme="neutral1"
              onClick={() => {
                refetchCauses().catch(() => undefined)
              }}
            >
              {t('Retry')}
            </Button>
          </VStack>
        ) : featuredProjects.length > 0 ? (
          <VStack ref={featuredSectionRef} align="stretch" spacing={6}>
            <HStack w="full" justifyContent="space-between" alignItems={{ base: 'start', md: 'end' }} spacing={4}>
              <VStack align="stretch" spacing={1}>
                <H2 size="xl" bold>
                  {t('Featured Projects')}
                </H2>
                <Body size="sm" color={mutedText}>
                  {t('Support these causes — every contribution counts toward your score.')}
                </Body>
              </VStack>
              <Button
                as={RouterLink}
                to={getPath('projectDiscovery')}
                size="md"
                variant="solid"
                colorScheme="primary1"
                flexShrink={0}
              >
                {t('View more projects')}
              </Button>
            </HStack>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 5 }} spacing={5}>
              {featuredProjects.map((project) => (
                <LandingProjectCard key={project.id} project={project} />
              ))}
            </SimpleGrid>
          </VStack>
        ) : null}

        {/* FAQ */}
        <VStack align="stretch" spacing={4}>
          <H2 size="xl" bold>
            {t('FAQ')}
          </H2>
          <Accordion allowToggle>
            {faqItems.map((item) => (
              <AccordionItem key={item.question} borderColor={accordionBorder}>
                <Box as="h3">
                  <AccordionButton py={4}>
                    <Box as="span" flex="1" textAlign="left">
                      <Body bold>
                        {item.question}
                        {'?'}
                      </Body>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </Box>
                <AccordionPanel pb={4}>
                  <Body size="sm" color={mutedText}>
                    {item.answer}
                  </Body>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </VStack>

        {/* Terms */}
        <VStack align="stretch" spacing={2}>
          <Body size="sm" color={subtleText}>
            {t(
              'We may review suspicious activity and disqualify ineligible entries. Final eligibility decisions are made at our discretion.',
            )}
          </Body>
          <ChakraLink
            as={RouterLink}
            to={getPath('legalGiveawayAcelerandoVipTerms')}
            color="primary1.11"
            fontWeight="medium"
            fontSize="sm"
          >
            {t('Read full terms')} &rarr;
          </ChakraLink>
        </VStack>

        {/* Bottom CTA */}
        <Box position="relative" overflow="hidden" borderRadius="xl">
          <Box
            position="absolute"
            inset={0}
            backgroundImage={giveawayBannerBackground}
            backgroundPosition="center"
            backgroundSize="cover"
            backgroundRepeat="no-repeat"
          />
          <Box position="relative" p={{ base: 8, md: 12 }} textAlign="center">
            <VStack spacing={4}>
              <H2 size="2xl" bold color="white">
                {t('Fund Bitcoin ideas and win a ticket')}
              </H2>
              <Body color="whiteAlpha.800" maxW="480px">
                {t('Start contributing to projects on Geyser now to climb the leaderboard and win a VIP ticket.')}
              </Body>
              <Button
                as={RouterLink}
                to={getPath('projectDiscovery')}
                size="lg"
                bg={ctaButtonBg}
                color={ctaButtonColor}
                _hover={{ bg: ctaButtonHoverBg }}
                fontWeight="semibold"
                px={10}
                rightIcon={<Icon as={PiArrowRight} />}
              >
                {t('Browse projects')}
              </Button>
            </VStack>
          </Box>
        </Box>
      </VStack>
    </>
  )
}
