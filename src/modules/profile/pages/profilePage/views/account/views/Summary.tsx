import { Box, Button, HStack, Icon, useColorModeValue, VStack } from '@chakra-ui/react'
import { useSetAtom } from 'jotai'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { IconType } from 'react-icons'
import { PiCoins, PiLightning, PiMegaphone, PiRocketLaunch } from 'react-icons/pi'
import { Link } from 'react-router'

import { heroCardAtom } from '@/modules/profile/state/heroCardAtom'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body, H2 } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'

import { SkeletonLayout } from '../../../../../../../shared/components/layouts'
import type { HeroStats } from '../../../../../../../types'
import { useUserHeroStatsQuery } from '../../../../../../../types'
import { getShortAmountLabel } from '../../../../../../../utils'
import { useUserProfileAtom, useViewingOwnProfileAtomValue } from '../../../../../state'

export const Summary = () => {
  const { userProfile, isLoading: userProfileLoading } = useUserProfileAtom()
  const isViewingOwnProfile = useViewingOwnProfileAtomValue()

  const setHeroCard = useSetAtom(heroCardAtom)

  const { data, loading } = useUserHeroStatsQuery({
    skip: !userProfile.id,
    variables: {
      where: {
        id: userProfile.id,
      },
    },
  })

  const stats = useMemo(() => {
    const defaultStats: HeroStats = {
      contributionsCount: 0,
      contributionsTotal: 0,
      contributionsTotalUsd: 0,
      projectsCount: 0,
      rank: 0,
    }

    return {
      ambassadorStats: data?.user?.heroStats?.ambassadorStats ?? defaultStats,
      contributorStats: data?.user?.heroStats?.contributorStats ?? defaultStats,
      creatorStats: data?.user?.heroStats?.creatorStats ?? defaultStats,
    }
  }, [data])

  useEffect(() => {
    setHeroCard({
      user: userProfile,
      stats,
      isOpen: true,
    })
  }, [userProfile, stats, setHeroCard])

  const { t } = useTranslation()

  const renderSkeleton = (children: React.ReactNode) => {
    if (userProfileLoading || loading) return <SkeletonLayout height="70px" width="100%" />
    return children
  }

  return (
    <VStack w="full" alignItems={'start'}>
      {isViewingOwnProfile && userProfile.id ? (
        <AffiliatePromoCard affiliateDashboardPath={getPath('userProfileSettingsAffiliate', String(userProfile.id))} />
      ) : null}

      <Body size="xl" medium>
        {t('Hero Rank')}
      </Body>

      {renderSkeleton(
        <StatBody
          title={t('Contributor')}
          subtitle={t('made in contributions')}
          rank={stats.contributorStats.rank}
          Icon={PiLightning}
          value={
            <Body size="md" medium>
              ${getShortAmountLabel(stats.contributorStats.contributionsTotalUsd).toLocaleLowerCase()}
              <Body as="span" size="md" medium light>
                {' '}
                ({getShortAmountLabel(stats.contributorStats.contributionsTotal)} sats)
              </Body>
            </Body>
          }
        />,
      )}
      {renderSkeleton(
        <StatBody
          title={t('Creator')}
          subtitle={t('raised in contributions')}
          rank={stats.creatorStats.rank}
          Icon={PiRocketLaunch}
          rankPillProps={{
            bgColor: 'pinkAlpha.3',
            textColor: 'pinkAlpha.11',
          }}
          value={
            <Body size="md" medium>
              ${getShortAmountLabel(stats.creatorStats.contributionsTotalUsd).toLocaleLowerCase()}
              <Body as="span" size="md" medium light>
                {' '}
                ({getShortAmountLabel(stats.creatorStats.contributionsTotal)} sats)
              </Body>
            </Body>
          }
        />,
      )}
      {renderSkeleton(
        <StatBody
          title={t('Ambassador')}
          subtitle={t('of enabled contributions')}
          rank={stats.ambassadorStats.rank}
          rankPillProps={{
            bgColor: 'orangeAlpha.3',
            textColor: 'orangeAlpha.11',
          }}
          Icon={PiMegaphone}
          value={
            <Body size="md" medium>
              ${getShortAmountLabel(stats.ambassadorStats.contributionsTotalUsd).toLocaleLowerCase()}
              <Body as="span" size="md" medium light>
                {' '}
                ({getShortAmountLabel(stats.ambassadorStats.contributionsTotal)} sats)
              </Body>
            </Body>
          }
        />,
      )}
    </VStack>
  )
}

const NOISE_TEXTURE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

const AffiliatePromoCard = ({ affiliateDashboardPath }: { affiliateDashboardPath: string }) => {
  const { t } = useTranslation()
  const titleColor = useColorModeValue('neutral1.11', 'neutral1.12')
  const subtitleColor = useColorModeValue('neutral1.9', 'neutral1.11')
  const cardBackground = useColorModeValue(
    'linear-gradient(135deg, var(--chakra-colors-primary1-200) 0%, var(--chakra-colors-primary1-100) 30%, var(--chakra-colors-warning-100) 60%, var(--chakra-colors-warning-200) 100%)',
    'linear-gradient(135deg, var(--chakra-colors-primary1-900) 0%, var(--chakra-colors-primary1-800) 30%, var(--chakra-colors-warning-900) 65%, var(--chakra-colors-warning-800) 100%)',
  )
  const textureOpacity = useColorModeValue(0.14, 0.1)
  const textureBlendMode = useColorModeValue('overlay' as const, 'soft-light' as const)
  const badgeBackground = useColorModeValue('warning.2', 'warning.3')
  const badgeColor = useColorModeValue('warning.11', 'warning.11')
  const buttonBackground = useColorModeValue('neutralAlpha.1', 'neutralAlpha.3')
  const buttonColor = useColorModeValue('neutral1.11', 'neutral1.12')
  const buttonBorderColor = useColorModeValue('neutralAlpha.4', 'neutralAlpha.6')
  const buttonHoverBackground = useColorModeValue('neutralAlpha.2', 'neutralAlpha.4')
  const buttonBoxShadow = useColorModeValue(
    '0 8px 24px var(--chakra-colors-blackAlpha-200)',
    '0 10px 28px var(--chakra-colors-blackAlpha-500)',
  )

  return (
    <CardLayout
      w="full"
      spacing={4}
      borderColor="transparent"
      background={cardBackground}
      mb={2}
      px={{ base: 4, lg: 5 }}
      py={4}
    >
      <Box
        position="absolute"
        inset={0}
        backgroundImage={NOISE_TEXTURE}
        backgroundSize="256px 256px"
        backgroundRepeat="repeat"
        opacity={textureOpacity}
        pointerEvents="none"
        mixBlendMode={textureBlendMode}
      />

      <VStack alignItems="start" spacing={3} position="relative" zIndex={1} w="full">
        <HStack spacing={2} alignItems="center" flexWrap="wrap">
          <Icon as={PiCoins} color="warning.9" boxSize={5} />
          <H2 size="lg" color={titleColor}>
            {t('Ambassador Program')}
          </H2>
          <Body size="xs" medium px={2.5} py={0.5} borderRadius="full" bgColor={badgeBackground} color={badgeColor}>
            {t('New')}
          </Body>
        </HStack>

        <Body size="sm" color={subtitleColor} whiteSpace={{ base: 'normal', md: 'nowrap' }}>
          {t('Help projects launch or get funded, earn Bitcoin.')}
        </Body>

        <Button
          as={Link}
          to={affiliateDashboardPath}
          bg={buttonBackground}
          color={buttonColor}
          borderWidth="1px"
          borderColor={buttonBorderColor}
          _hover={{ bg: buttonHoverBackground }}
          backdropFilter="blur(8px)"
          boxShadow={buttonBoxShadow}
          size="md"
          w="full"
        >
          {t('Learn more')}
        </Button>
      </VStack>
    </CardLayout>
  )
}

type StatBodyProps = {
  title: string
  Icon: IconType
  value: React.ReactNode
  subtitle: string
  rank: number
  rankPillProps?: {
    bgColor?: string
    textColor?: string
  }
}

const StatBody = ({ title, Icon, value, subtitle, rank, rankPillProps }: StatBodyProps) => {
  return (
    <HStack w="full" paddingX={3} paddingY={2} spacing={3} bgColor={'neutral1.3'} borderRadius="8px">
      <Icon fontSize="32px" color="orange.1" />
      <VStack flex="1" alignItems="start" spacing={0}>
        <HStack>
          <Body size="md" medium>
            {title}
          </Body>
          <Body
            size="xs"
            borderRadius={5}
            textColor={rankPillProps?.textColor ?? 'blueAlpha.11'}
            bgColor={rankPillProps?.bgColor ?? 'blueAlpha.3'}
            pr={2}
            pl={2}
            medium
          >{`#${rank || 'N/A'}`}</Body>
        </HStack>
        {value}
        {subtitle && (
          <Body size="sm" light>
            {subtitle}
          </Body>
        )}
      </VStack>
    </HStack>
  )
}
