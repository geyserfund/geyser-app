import { Box, Divider, forwardRef, HStack, Image, SimpleGrid, VStack } from '@chakra-ui/react'
import { PiCheckCircleFill, PiHandshake } from 'react-icons/pi'

import { GeyserLogoIcon } from '@/components/icons/svg/GeyserLogoIcon'
import { ProfileAvatar } from '@/shared/components/display/ProfileAvatar'
import { guardianColors } from '@/shared/components/display/ProfileAvatar'
import { Body, H2 } from '@/shared/components/typography'
import { guardianJewels, guardianText } from '@/shared/constants/assets/guardianAssets'
import {
  GuardianType,
  HeroCommunityRole,
  UserForProfilePageFragment,
  UserHeroImpact,
  UserHeroImpactStat,
  UserHeroStats,
  UserHeroTrust,
} from '@/types'
import { getShortAmountLabel } from '@/utils'

type HeroCardProps = {
  user: UserForProfilePageFragment
  stats?: UserHeroStats
  impact?: UserHeroImpact
  trust?: UserHeroTrust
}

const heroSinceFormatter = new Intl.DateTimeFormat(undefined, { month: 'short', year: 'numeric' })

export const HeroCard = forwardRef(({ user, stats, impact, trust }: HeroCardProps, ref) => {
  const heroSince = heroSinceFormatter.format(new Date(user.createdAt))
  const unifiedImpact = impact || getLegacyImpact(stats)
  const headerBackground = user.guardianType ? guardianColors[user.guardianType] : 'black'

  return (
    <VStack
      ref={ref}
      w="330px"
      h="430px"
      alignItems="stretch"
      spacing={0}
      overflow="hidden"
      borderRadius="24px"
      bgColor="white"
      color="blackAlpha.900"
      border="1px solid"
      borderColor="blackAlpha.200"
      boxShadow="2xl"
    >
      <HeroCardHeader guardianType={user.guardianType} background={headerBackground} />

      <VStack px={5} py={4} spacing={4} alignItems="stretch" flex={1}>
        <HeroCardIdentity user={user} trust={trust} />

        <Divider />
        <VStack flex={1} alignItems="stretch" justifyContent="center">
          <SimpleGrid columns={2} spacing={2}>
            <CardMetric
              label="Built"
              value={unifiedImpact.built.amountSats}
              count={unifiedImpact.built.projectsCount}
              primary="projects"
            />
            <CardMetric
              label="Backed"
              value={unifiedImpact.backed.amountSats}
              count={unifiedImpact.backed.projectsCount}
            />
            <CardMetric
              label="Enabled"
              value={unifiedImpact.enabled.amountSats}
              count={unifiedImpact.enabled.projectsCount}
            />
            <CardMetric
              label="Onboarded"
              value={unifiedImpact.onboarded.amountSats}
              count={unifiedImpact.onboarded.projectsCount}
              primary="projects"
            />
          </SimpleGrid>
        </VStack>
        <Body size="xs" color="blackAlpha.600" alignSelf="center">
          Hero since {heroSince}
        </Body>
      </VStack>
      <Box h="6px" bgColor={headerBackground} />
    </VStack>
  )
})

const getLegacyImpact = (stats?: UserHeroStats): UserHeroImpact => ({
  built: {
    amountSats: stats?.creatorStats.contributionsTotal || 0,
    projectsCount: stats?.creatorStats.projectsCount || 0,
  },
  backed: {
    amountSats: stats?.contributorStats.contributionsTotal || 0,
    projectsCount: stats?.contributorStats.projectsCount || 0,
  },
  enabled: {
    amountSats: stats?.ambassadorStats.contributionsTotal || 0,
    projectsCount: stats?.ambassadorStats.projectsCount || 0,
  },
  onboarded: { amountSats: 0, projectsCount: 0 },
})

const HeroCardHeader = ({ guardianType, background }: { guardianType?: GuardianType | null; background: string }) => (
  <HStack
    bgColor={background}
    color={guardianType ? 'blackAlpha.900' : 'white'}
    px={4}
    py={3}
    justifyContent="space-between"
    spacing={2}
  >
    <HStack spacing={2} minW={0}>
      <GeyserLogoIcon boxSize={5} color="inherit" />
      <Body size="sm" bold color="inherit" isTruncated>
        Hero of Bitcoin Adoption
      </Body>
    </HStack>
    {guardianType ? (
      <Image
        src={guardianJewels[guardianType]}
        alt={`${guardianText[guardianType]} Guardian gemstone`}
        boxSize={7}
        objectFit="contain"
        flexShrink={0}
      />
    ) : null}
  </HStack>
)

const HeroCardIdentity = ({ user, trust }: { user: UserForProfilePageFragment; trust?: UserHeroTrust }) => (
  <HStack spacing={3} alignItems="center">
    <ProfileAvatar
      src={user.imageUrl || ''}
      h="64px"
      w="64px"
      guardian={user.guardianType}
      wrapperProps={{ padding: '2px', flexShrink: 0 }}
    />
    <VStack alignItems="start" spacing={0} minW={0}>
      <H2 size="lg" bold isTruncated maxW="210px">
        {user.username || 'Anonymous Hero'}
      </H2>
      {trust?.identityVerified || trust?.communityRole ? (
        <HStack spacing={1} flexWrap="nowrap" mt={1.5}>
          {trust.identityVerified ? <CardPill icon={<PiCheckCircleFill />} label="Identity verified" /> : null}
          {trust.communityRole === HeroCommunityRole.FieldPartner ? (
            <CardPill icon={<PiHandshake />} label="Field Partner" />
          ) : null}
        </HStack>
      ) : null}
    </VStack>
  </HStack>
)

const CardPill = ({ icon, label }: { icon: React.ReactElement; label: string }) => (
  <HStack spacing={0.5} px={1.5} py={1} bgColor="green.50" color="green.800" borderRadius="full" whiteSpace="nowrap">
    {icon}
    <Body fontSize="10px" lineHeight="1.2" medium color="inherit">
      {label}
    </Body>
  </HStack>
)

const CardMetric = ({
  label,
  value,
  count,
  primary = 'sats',
}: {
  label: string
  value: UserHeroImpactStat['amountSats']
  count: number
  primary?: 'projects' | 'sats'
}) => (
  <Box bgColor="blackAlpha.50" borderRadius="10px" px={2.5} py={2}>
    <Body size="xs" color="blackAlpha.600">
      {label}
    </Body>
    <Body size="sm" bold>
      {primary === 'projects'
        ? `${count} ${count === 1 ? 'project' : 'projects'}`
        : `${getShortAmountLabel(Number(value), true)} sats`}
    </Body>
    <Body size="xs" color="blackAlpha.500">
      {primary === 'projects'
        ? `${getShortAmountLabel(Number(value), true)} sats funded`
        : `${count} ${count === 1 ? 'project' : 'projects'}`}
    </Body>
  </Box>
)
