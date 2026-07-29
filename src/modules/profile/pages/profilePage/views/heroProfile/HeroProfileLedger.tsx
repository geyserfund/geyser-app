import {
  Box,
  Button,
  ButtonProps,
  Grid,
  HStack,
  Icon,
  IconButton,
  Image,
  SimpleGrid,
  Skeleton,
  Stack,
  StackProps,
  useClipboard,
  VStack,
} from '@chakra-ui/react'
import { useSetAtom } from 'jotai'
import { type ReactNode, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IconType } from 'react-icons'
import {
  PiArrowRight,
  PiCheckCircleFill,
  PiCopy,
  PiGear,
  PiHandshake,
  PiInfo,
  PiLock,
  PiShareNetwork,
  PiSparkle,
} from 'react-icons/pi'
import { Link } from 'react-router'

import { ExternalAccountType } from '@/modules/auth'
import { guardianRewardsMap } from '@/modules/guardians/utils/constants'
import { heroCardAtom } from '@/modules/profile/state/heroCardAtom'
import { guardianColors, ProfileAvatar } from '@/shared/components/display/ProfileAvatar'
import { TooltipPopover } from '@/shared/components/feedback/TooltipPopover'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body, H1, H2 } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { guardianText } from '@/shared/constants/assets/guardianAssets'
import { useModal } from '@/shared/hooks'
import { getExternalAccountsButtons } from '@/shared/utils/user/getExternalAccountsButtons'
import {
  HeroCommunityRole,
  HeroProjectCategory,
  HeroProjectRelationship,
  UserBadge,
  UserHeroImpact,
  UserHeroImpactStat,
  UserHeroProject,
  UserHeroTrust,
  useUserBadgesQuery,
  useUserHeroProfileQuery,
  useUserHeroProjectsQuery,
} from '@/types'
import { getShortAmountLabel, toInt, useMobileMode, useNotification } from '@/utils'

import { useUserProfileAtom, useViewingOwnProfileAtomValue } from '../../../../state'
import { MediaCarouselForCards } from '../account/views/badges/MediaCarouselForCards'
import { ProfileProjectCard } from '../profileTabs/components/ProfileProjectCard'
import { ProfileContributions } from '../profileTabs/views/ProfileContributions'
import { ProfileFollowed } from '../profileTabs/views/ProfileFollowed'
import { ProfilePurchases } from '../profileTabs/views/ProfilePurchases'

const EXPLAINERS = {
  trust: 'Signals Geyser can verify about this Hero, including identity and community standing.',
  identityVerified: 'This Hero completed identity verification with Geyser.',
  fieldPartner:
    'Field Partners are Geyser vetted partners who discover, onboard, and monitor projects in their local communities.',
  impact: 'Every Geyser user is a Hero of Bitcoin adoption. Their profile highlights their impact and achievements.',
  built: 'Projects this Hero created on Geyser.',
  backed: 'Confirmed funding this Hero contributed directly to projects.',
  backedProjects: 'Projects this Hero supported directly or helped fund through referrals.',
  enabled: 'Confirmed funding attributed to this Hero’s referral links.',
  onboarded: 'Projects assigned to this Hero as a Field Partner.',
  achievements: 'Milestones, badges and recognitions earned on Geyser.',
} as const

type ProfileView = 'PUBLIC' | 'PRIVATE'
type PrivateView = 'CONTRIBUTIONS' | 'PURCHASES' | 'FOLLOWED'

const PRIVATE_VIEW_IDS: Record<PrivateView, string> = {
  CONTRIBUTIONS: 'contributions',
  PURCHASES: 'purchases',
  FOLLOWED: 'followed-projects',
}

export const HeroProfileLedger = () => {
  const { userProfile, isLoading: isProfileLoading } = useUserProfileAtom()
  const isOwner = useViewingOwnProfileAtomValue()
  const [profileView, setProfileView] = useState<ProfileView>('PUBLIC')
  const where = useMemo(() => ({ id: userProfile.id }), [userProfile.id])

  const { data, loading, error } = useUserHeroProfileQuery({
    variables: { where },
    skip: !userProfile.id,
  })

  const heroProfile = data?.user.heroProfile

  useEffect(() => {
    setProfileView('PUBLIC')
  }, [isOwner, userProfile.id])

  if (isProfileLoading || loading) return <HeroProfileSkeleton />
  if (error || !heroProfile) return <HeroProfileError />

  return (
    <VStack w="full" spacing={5} alignItems="stretch" px={{ base: 0, md: 2 }} pb={8}>
      <IdentityHeader heroProfile={heroProfile} />

      {isOwner ? (
        <HStack
          alignSelf={{ base: 'stretch', md: 'center' }}
          bgColor="neutral1.3"
          borderRadius="full"
          p={1}
          role="tablist"
          aria-label="Profile visibility"
          flexShrink={0}
        >
          <SegmentButton
            id="public-profile-tab"
            aria-controls="public-profile-panel"
            selected={profileView === 'PUBLIC'}
            onClick={() => setProfileView('PUBLIC')}
          >
            Public profile
          </SegmentButton>
          <SegmentButton
            id="private-activity-tab"
            aria-controls="private-activity-panel"
            selected={profileView === 'PRIVATE'}
            onClick={() => setProfileView('PRIVATE')}
            leftIcon={<PiLock />}
          >
            Private activity
          </SegmentButton>
        </HStack>
      ) : null}

      {profileView === 'PUBLIC' || !isOwner ? (
        <Box id="public-profile-panel" role="tabpanel" aria-labelledby="public-profile-tab">
          <PublicLedger heroProfile={heroProfile} />
        </Box>
      ) : (
        <Box id="private-activity-panel" role="tabpanel" aria-labelledby="private-activity-tab">
          <PrivateActivity />
        </Box>
      )}
    </VStack>
  )
}

const IdentityHeader = ({ heroProfile }: { heroProfile: { trust: UserHeroTrust; impact: UserHeroImpact } }) => {
  const { t } = useTranslation()
  const { userProfile } = useUserProfileAtom()
  const isOwner = useViewingOwnProfileAtomValue()
  const toast = useNotification()
  const shareModal = useModal<{ currentIndex: number }>()
  const setHeroCard = useSetAtom(heroCardAtom)
  const { onCopy } = useClipboard(userProfile.heroId)
  const accountButtons = getExternalAccountsButtons({ accounts: userProfile.externalAccounts })
  const [bioExpanded, setBioExpanded] = useState(false)

  useEffect(() => {
    setHeroCard({ user: userProfile, impact: heroProfile.impact, trust: heroProfile.trust, isOpen: true })
  }, [heroProfile.impact, heroProfile.trust, setHeroCard, userProfile])

  return (
    <CardLayout mobileDense w="full" p={{ base: 4, md: 6 }} spacing={0} flexShrink={0}>
      <Stack direction={{ base: 'column', md: 'row' }} w="full" justifyContent="space-between" spacing={5}>
        <HStack alignItems="flex-start" spacing={{ base: 3, md: 5 }} minW={0}>
          <ProfileAvatar
            src={userProfile.imageUrl || ''}
            h={{ base: '72px', md: '96px' }}
            w={{ base: '72px', md: '96px' }}
            guardian={userProfile.guardianType}
            wrapperProps={{ padding: '3px', flexShrink: 0 }}
          />
          <VStack alignItems="start" spacing={2} minW={0}>
            <HStack spacing={2} flexWrap="wrap">
              <H1 size="3xl" bold wordBreak="break-word">
                {userProfile.username}
              </H1>
              {heroProfile.trust.communityRole === HeroCommunityRole.FieldPartner ? (
                <TrustPill icon={PiHandshake} label="Field Partner" explainer={EXPLAINERS.fieldPartner} />
              ) : null}
              {heroProfile.trust.identityVerified ? (
                <TrustPill icon={PiCheckCircleFill} label="Identity verified" explainer={EXPLAINERS.identityVerified} />
              ) : null}
            </HStack>
            <Button
              size="xs"
              variant="soft"
              colorScheme="neutral1"
              rightIcon={<PiCopy />}
              onClick={() => {
                onCopy()
                toast.success({ title: t('Hero ID Copied!') })
              }}
            >
              Hero ID: {userProfile.heroId}
            </Button>
            {userProfile.bio ? (
              <VStack alignItems="start" spacing={0.5}>
                <Body
                  size="md"
                  color="neutral1.11"
                  maxW="720px"
                  whiteSpace="pre-line"
                  noOfLines={bioExpanded ? undefined : { base: 4, md: 3 }}
                >
                  {userProfile.bio}
                </Body>
                {userProfile.bio.length > 220 ? (
                  <Button size="xs" variant="link" onClick={() => setBioExpanded((current) => !current)}>
                    {bioExpanded ? 'Show less' : 'Show more'}
                  </Button>
                ) : null}
              </VStack>
            ) : null}
            <HStack flexWrap="wrap" spacing={2}>
              {accountButtons.map(({ key, icon, props }) => (
                <IconButton
                  key={key}
                  aria-label={`Open ${key} profile`}
                  icon={icon as any}
                  size="sm"
                  variant="soft"
                  colorScheme="neutral1"
                  {...props}
                />
              ))}
            </HStack>
          </VStack>
        </HStack>

        <Stack direction={{ base: 'row', md: 'column' }} alignItems="stretch" flexWrap="wrap">
          <Button
            leftIcon={<PiShareNetwork />}
            variant="outline"
            onClick={() => shareModal.onOpen({ currentIndex: 0 })}
          >
            Share Hero Card
          </Button>
          {isOwner ? (
            <Button as={Link} to={getPath('userProfileSettings', String(userProfile.id))} leftIcon={<PiGear />}>
              View Profile Settings
            </Button>
          ) : null}
        </Stack>
      </Stack>

      {shareModal.isOpen ? (
        <MediaCarouselForCards
          title="Share Hero Card"
          description="A snapshot of this Hero’s verified trust, impact, and achievements."
          imageLinkList={[]}
          size="md"
          bodyProps={{ as: VStack, gap: 4 }}
          {...shareModal}
        />
      ) : null}
    </CardLayout>
  )
}

const PublicLedger = ({ heroProfile }: { heroProfile: { trust: UserHeroTrust; impact: UserHeroImpact } }) => {
  const hasEvidence =
    heroProfile.impact.built.projectsCount +
      heroProfile.impact.backed.projectsCount +
      heroProfile.impact.enabled.projectsCount +
      heroProfile.impact.onboarded.projectsCount >
    0

  return (
    <>
      <ImpactSummary impact={heroProfile.impact} />
      <Grid
        templateAreas={{
          base: '"trust" "projects" "achievements"',
          lg: '"projects trust" "projects achievements"',
        }}
        templateColumns={{ base: '1fr', lg: 'minmax(0, 1fr) 320px' }}
        gap={5}
        alignItems="start"
        flexShrink={0}
      >
        <Box gridArea="trust">
          <TrustCard trust={heroProfile.trust} />
        </Box>
        <VStack gridArea="projects" spacing={5} alignItems="stretch" minW={0}>
          {hasEvidence ? (
            <>
              <HeroProjectSection
                category={HeroProjectCategory.Built}
                title="Projects built"
                explainer={EXPLAINERS.built}
              />
              <HeroProjectSection
                category={HeroProjectCategory.Backed}
                title="Projects backed"
                explainer={EXPLAINERS.backedProjects}
              />
              <HeroProjectSection
                category={HeroProjectCategory.Onboarded}
                title="Projects onboarded"
                explainer={EXPLAINERS.onboarded}
              />
            </>
          ) : (
            <CardLayout w="full" py={12} alignItems="center" spacing={2}>
              <Icon as={PiSparkle} boxSize={8} color="primary1.9" />
              <H2 size="lg">This Hero’s project story is just getting started</H2>
              <Body color="neutral1.10">
                Public project evidence will appear here as they build, back, or onboard projects.
              </Body>
            </CardLayout>
          )}
        </VStack>
        <Box gridArea="achievements">
          <AchievementsCard />
        </Box>
      </Grid>
    </>
  )
}

const ImpactSummary = ({ impact }: { impact: UserHeroImpact }) => (
  <CardLayout w="full" p={{ base: 3, md: 4 }} spacing={2} flexShrink={0} aria-label="Impact summary">
    <HStack spacing={1}>
      <H2 size="md" bold>
        Impact
      </H2>
      <InfoButton label="About Impact" text={EXPLAINERS.impact} />
    </HStack>
    <Body size="sm" color="neutral1.10">
      Every Geyser user is a Hero of Bitcoin adoption. Their profile highlights their impact and achievements.
    </Body>
    <SimpleGrid columns={{ base: 2, md: 4 }} spacing={3} w="full">
      <ImpactMetric label="Built" explainer={EXPLAINERS.built} stat={impact.built} primary="projects" />
      <ImpactMetric label="Backed" explainer={EXPLAINERS.backed} stat={impact.backed} />
      <ImpactMetric label="Enabled" explainer={EXPLAINERS.enabled} stat={impact.enabled} />
      <ImpactMetric label="Onboarded" explainer={EXPLAINERS.onboarded} stat={impact.onboarded} primary="projects" />
    </SimpleGrid>
  </CardLayout>
)

const ImpactMetric = ({
  label,
  explainer,
  stat,
  primary = 'sats',
}: {
  label: string
  explainer: string
  stat: UserHeroImpactStat
  primary?: 'projects' | 'sats'
}) => (
  <Box bgColor="neutral1.3" borderRadius="12px" px={{ base: 3, md: 4 }} py={2.5} minW={0}>
    <HStack spacing={1}>
      <Body size="sm" medium color="neutral1.10">
        {label}
      </Body>
      <InfoButton label={`About ${label}`} text={explainer} />
    </HStack>
    <Body size="xl" bold sx={{ fontVariantNumeric: 'tabular-nums' }}>
      {primary === 'projects'
        ? `${stat.projectsCount} ${stat.projectsCount === 1 ? 'project' : 'projects'}`
        : `${getShortAmountLabel(Number(stat.amountSats), true)} sats`}
    </Body>
    <Body size="xs" color="neutral1.10">
      {primary === 'projects'
        ? `${getShortAmountLabel(Number(stat.amountSats), true)} sats funded`
        : `${stat.projectsCount} ${stat.projectsCount === 1 ? 'project' : 'projects'}`}
    </Body>
  </Box>
)

const HeroProjectSection = ({
  category,
  title,
  explainer,
}: {
  category: HeroProjectCategory
  title: string
  explainer: string
}) => {
  const isMobile = useMobileMode()
  const { userProfile } = useUserProfileAtom()
  const previewTake = isMobile ? 2 : 3
  const toast = useNotification()
  const [loadingMore, setLoadingMore] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const { data, loading, error, fetchMore, refetch } = useUserHeroProjectsQuery({
    variables: {
      where: { id: userProfile.id },
      input: { category, pagination: { take: previewTake } },
    },
    skip: !userProfile.id,
  })
  const response = data?.user.heroProfile.projects
  const projects = response?.projects || []
  const total = response?.pagination.count || 0

  const loadMore = async () => {
    setLoadingMore(true)
    try {
      if (!expanded) {
        await refetch({
          where: { id: userProfile.id },
          input: { category, pagination: { take: 20 } },
        })
        setExpanded(true)
        return
      }

      if (!response?.pagination.cursor?.id) return
      await fetchMore({
        variables: {
          input: {
            category,
            pagination: { cursor: { id: response.pagination.cursor.id }, take: 20 },
          },
        },
        updateQuery(previous, { fetchMoreResult }) {
          const next = fetchMoreResult.user.heroProfile.projects
          return {
            ...fetchMoreResult,
            user: {
              ...fetchMoreResult.user,
              heroProfile: {
                ...fetchMoreResult.user.heroProfile,
                projects: { ...next, projects: [...previous.user.heroProfile.projects.projects, ...next.projects] },
              },
            },
          }
        },
      })
    } catch (error) {
      toast.error({
        title: 'Could not load more projects',
        description: error instanceof Error ? error.message : undefined,
      })
    } finally {
      setLoadingMore(false)
    }
  }

  if (loading) return <Skeleton height="238px" borderRadius="12px" />
  if (error) {
    return (
      <CardLayout w="full" p={{ base: 3, md: 5 }} spacing={3}>
        <SectionHeading title={title} explainer={explainer} />
        <Body color="neutral1.10">We couldn’t load these projects.</Body>
        <Button variant="outline" alignSelf="start" onClick={() => refetch()}>
          Try again
        </Button>
      </CardLayout>
    )
  }

  if (projects.length === 0) return null

  return (
    <CardLayout w="full" p={{ base: 3, md: 5 }} spacing={3}>
      <SectionHeading title={title} explainer={explainer} />
      <VStack w="full" spacing={1} alignItems="stretch">
        {projects.map((item) => (
          <HeroProjectRow
            key={item.project.id}
            item={item as UserHeroProject}
            showRelationships={category !== HeroProjectCategory.Built}
          />
        ))}
      </VStack>
      {projects.length < total ? (
        <Button
          variant="ghost"
          colorScheme="neutral1"
          rightIcon={<PiArrowRight />}
          onClick={loadMore}
          isLoading={loadingMore}
        >
          {expanded ? 'Show more' : `View all ${total}`}
        </Button>
      ) : null}
    </CardLayout>
  )
}

const HeroProjectRow = ({ item, showRelationships }: { item: UserHeroProject; showRelationships: boolean }) => (
  <Box borderRadius="10px" _hover={{ bgColor: 'neutral1.3' }} transition="background-color 0.15s ease">
    <ProfileProjectCard
      project={item.project}
      showStats
      compact
      titleAccessory={
        showRelationships && item.relationships.length ? (
          <ProjectRelationshipPills item={item} display={{ base: 'none', md: 'flex' }} />
        ) : null
      }
      footer={
        showRelationships && item.relationships.length ? (
          <ProjectRelationshipPills item={item} pt={0.5} display={{ base: 'flex', md: 'none' }} />
        ) : null
      }
    />
  </Box>
)

const ProjectRelationshipPills = ({ item, ...props }: { item: UserHeroProject } & StackProps) => (
  <HStack flexWrap="wrap" spacing={1} {...props}>
    {item.relationships.map((relationship) => (
      <Body
        key={relationship}
        size="xs"
        medium
        px={2}
        py={0.5}
        borderRadius="full"
        bgColor={relationship === HeroProjectRelationship.Contributed ? 'blueAlpha.3' : 'orangeAlpha.3'}
        color={relationship === HeroProjectRelationship.Contributed ? 'blueAlpha.11' : 'orangeAlpha.11'}
        whiteSpace="nowrap"
      >
        {relationship === HeroProjectRelationship.Contributed
          ? `Contributed ${getShortAmountLabel(Number(item.contributedSats), true)} sats`
          : `Enabled ${getShortAmountLabel(Number(item.enabledSats), true)} sats`}
      </Body>
    ))}
  </HStack>
)

const TrustCard = ({ trust }: { trust: UserHeroTrust }) => (
  <CardLayout w="full" p={5} spacing={4}>
    <SectionHeading title="Trust" explainer={EXPLAINERS.trust} />
    {trust.identityVerified ? (
      <TrustLine icon={PiCheckCircleFill} title="Identity verified" text={EXPLAINERS.identityVerified} />
    ) : null}
    {trust.communityRole === HeroCommunityRole.FieldPartner ? (
      <TrustLine
        icon={PiHandshake}
        title="Field Partner"
        text={EXPLAINERS.fieldPartner}
        learnMoreTo={getPath('discoveryImpactFunds')}
      />
    ) : null}
    {!trust.identityVerified && !trust.communityRole ? (
      <EmptyReputationState text="No trust signals yet. Identity verification and community standing will appear here." />
    ) : null}
  </CardLayout>
)

const AchievementsCard = () => {
  const { userProfile } = useUserProfileAtom()
  const isOwner = useViewingOwnProfileAtomValue()
  const nostrId =
    userProfile.externalAccounts.find((account) => account.accountType === ExternalAccountType.nostr)?.externalId || ''
  const { data, loading } = useUserBadgesQuery({
    variables: { input: { where: { userId: toInt(userProfile.id) } } },
    skip: !userProfile.id,
  })
  const badges = (data?.userBadges || []) as UserBadge[]

  if (loading) return <Skeleton height="180px" borderRadius="12px" />

  const guardianColor = userProfile.guardianType ? guardianColors[userProfile.guardianType] : undefined
  const hasAchievements = Boolean(userProfile.guardianType) || badges.length > 0

  return (
    <CardLayout w="full" p={5} spacing={4}>
      <SectionHeading title="Achievements" explainer={EXPLAINERS.achievements} />
      {userProfile.guardianType ? (
        <HStack
          bgColor={`${guardianColor}1A`}
          border="1px solid"
          borderColor={guardianColor}
          borderRadius="10px"
          p={3}
          alignItems="center"
        >
          <Image
            src={guardianRewardsMap.find((reward) => reward.guardian === userProfile.guardianType)?.image}
            alt={`${guardianText[userProfile.guardianType]} Guardian badge`}
            boxSize="52px"
            objectFit="contain"
            flexShrink={0}
          />
          <VStack spacing={0} alignItems="start">
            <Body medium>{guardianText[userProfile.guardianType]} Guardian</Body>
            <Body size="xs" color="neutral1.10">
              {userProfile.guardianType === 'LEGEND'
                ? 'Earned the Geyser Guardian title of Legend by making a significant contribution to Geyser.'
                : `Earned the Geyser Guardian title of ${
                    guardianText[userProfile.guardianType]
                  } by supporting Geyser directly.`}
            </Body>
          </VStack>
        </HStack>
      ) : null}
      {badges.slice(0, 4).map((badge) => (
        <HStack key={badge.id} spacing={3}>
          <Image src={badge.badge.image} alt="" boxSize="40px" objectFit="contain" />
          <Body size="sm" medium>
            {badge.badge.name}
          </Body>
        </HStack>
      ))}
      {!hasAchievements ? (
        <EmptyReputationState text="No achievements yet. Milestones and badges will appear here." />
      ) : null}
      {isOwner && badges.length > 0 && !nostrId ? (
        <Body size="xs" color="neutral1.10">
          Connect Nostr in Profile Settings to claim your badges.
        </Body>
      ) : null}
      <Button as={Link} to={getPath('badges')} variant="link" rightIcon={<PiArrowRight />} alignSelf="start">
        Learn more
      </Button>
    </CardLayout>
  )
}

const EmptyReputationState = ({ text }: { text: string }) => (
  <Box bgColor="neutral1.3" borderRadius="10px" px={3} py={3}>
    <Body size="sm" color="neutral1.10">
      {text}
    </Body>
  </Box>
)

const PrivateActivity = () => {
  const [view, setView] = useState<PrivateView>('CONTRIBUTIONS')
  const activePanelId = PRIVATE_VIEW_IDS[view]

  return (
    <CardLayout w="full" p={{ base: 3, md: 6 }} spacing={5} minH="500px" flexShrink={0}>
      <HStack w="full" overflowX="auto" spacing={2} role="tablist" aria-label="Private activity categories">
        <SegmentButton
          id="contributions-tab"
          aria-controls="contributions-panel"
          selected={view === 'CONTRIBUTIONS'}
          onClick={() => setView('CONTRIBUTIONS')}
        >
          Contributions
        </SegmentButton>
        <SegmentButton
          id="purchases-tab"
          aria-controls="purchases-panel"
          selected={view === 'PURCHASES'}
          onClick={() => setView('PURCHASES')}
        >
          Purchases
        </SegmentButton>
        <SegmentButton
          id="followed-projects-tab"
          aria-controls="followed-projects-panel"
          selected={view === 'FOLLOWED'}
          onClick={() => setView('FOLLOWED')}
        >
          Followed Projects
        </SegmentButton>
      </HStack>
      <Box id={`${activePanelId}-panel`} role="tabpanel" aria-labelledby={`${activePanelId}-tab`} w="full">
        {view === 'CONTRIBUTIONS' ? <ProfileContributions /> : null}
        {view === 'PURCHASES' ? <ProfilePurchases /> : null}
        {view === 'FOLLOWED' ? <ProfileFollowed /> : null}
      </Box>
    </CardLayout>
  )
}

const SectionHeading = ({ title, explainer }: { title: string; explainer: string }) => (
  <HStack spacing={1.5}>
    <H2 size="lg" bold>
      {title}
    </H2>
    <InfoButton label={`About ${title}`} text={explainer} />
  </HStack>
)

const InfoButton = ({ label, text }: { label: string; text: string }) => (
  <TooltipPopover text={text} placement="top">
    <IconButton aria-label={label} icon={<PiInfo />} size="xs" variant="ghost" colorScheme="neutral1" />
  </TooltipPopover>
)

const TrustPill = ({ icon, label, explainer }: { icon: IconType; label: string; explainer: string }) => (
  <TooltipPopover text={explainer} placement="bottom-start">
    <HStack
      as="button"
      type="button"
      aria-label={`${label}. ${explainer}`}
      spacing={1}
      px={2.5}
      py={1}
      borderRadius="full"
      bgColor="primary1.3"
      color="primary1.11"
      _focusVisible={{ boxShadow: 'outline' }}
    >
      <Icon as={icon} boxSize={4} />
      <Body size="xs" medium color="inherit">
        {label}
      </Body>
    </HStack>
  </TooltipPopover>
)

const TrustLine = ({
  icon,
  title,
  text,
  learnMoreTo,
}: {
  icon: IconType
  title: string
  text: string
  learnMoreTo?: string
}) => (
  <HStack alignItems="start" spacing={3}>
    <Icon as={icon} boxSize={5} color="primary1.9" mt={0.5} />
    <VStack alignItems="start" spacing={0}>
      <Body medium>{title}</Body>
      <Body size="sm" color="neutral1.10">
        {text}
      </Body>
      {learnMoreTo ? (
        <Button as={Link} to={learnMoreTo} variant="link" rightIcon={<PiArrowRight />} size="sm">
          Learn more
        </Button>
      ) : null}
    </VStack>
  </HStack>
)

type SegmentButtonProps = ButtonProps & {
  selected: boolean
  children: ReactNode
}

const SegmentButton = ({ selected, children, ...props }: SegmentButtonProps) => (
  <Button
    role="tab"
    aria-selected={selected}
    variant={selected ? 'solid' : 'ghost'}
    colorScheme={selected ? 'neutral1' : 'neutral1'}
    color="neutral1.12"
    bgColor={selected ? 'utils.pbg' : 'transparent'}
    boxShadow={selected ? 'sm' : 'none'}
    borderRadius="full"
    flex={1}
    minW="fit-content"
    {...props}
  >
    {children}
  </Button>
)

const HeroProfileSkeleton = () => (
  <VStack w="full" spacing={5}>
    <Skeleton w="full" h="190px" borderRadius="12px" />
    <Skeleton w="full" h="150px" borderRadius="12px" />
    <Grid w="full" templateColumns={{ base: '1fr', lg: '1fr 320px' }} gap={5}>
      <Skeleton h="560px" borderRadius="12px" />
      <Skeleton h="360px" borderRadius="12px" />
    </Grid>
  </VStack>
)

const HeroProfileError = () => (
  <CardLayout w="full" py={12} alignItems="center">
    <H2 size="lg">We couldn’t load this Hero’s reputation ledger.</H2>
    <Body color="neutral1.10">Refresh the page to try again.</Body>
  </CardLayout>
)
