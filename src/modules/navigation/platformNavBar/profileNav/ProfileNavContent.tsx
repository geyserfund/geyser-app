import {
  Box,
  Button,
  ButtonProps,
  ComponentWithAs,
  Divider,
  HStack,
  Link as ChakraLink,
  MenuItem,
  VStack,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { PiArrowUpRight } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { useAuthContext } from '@/context'
import { followedActivityDotAtom, myProjectsActivityDotAtom } from '@/modules/discovery/state/activityDotAtom'
import { HeroCardButton } from '@/modules/profile/pages/profilePage/views/account/views/HeroCardButton'
import { Body } from '@/shared/components/typography'
import {
  dimensions,
  FeedbackUrl,
  getPath,
  GeyserAboutUrl,
  GeyserGithubUrl,
  GeyserSubscribeUrl,
  GeyserUpdatesUrl,
  GuideUrl,
} from '@/shared/constants'
import { HeroStats, useUserHeroStatsQuery } from '@/types'

import { DiscoveryNavItemKey, discoveryNavItems } from '../../discoveryNav/discoveryNavData'
import { ProfileNavUserInfo } from './components'
import { ModeChange } from './components/ModeChange'

export const ProfileNavContent = () => {
  const { logout, user } = useAuthContext()

  const myProjectActivityDot = useAtomValue(myProjectsActivityDotAtom)
  const followedActivityDot = useAtomValue(followedActivityDotAtom)

  const { data, loading } = useUserHeroStatsQuery({
    variables: {
      where: {
        id: user.id,
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

  return (
    <VStack
      padding={4}
      width={dimensions.mobileSideNav.width}
      spacing={4}
      alignItems={'start'}
      justifyContent={'start'}
      height="100%"
    >
      <VStack w="full" spacing={4}>
        {user.id && (
          <>
            <MenuItem as={Link} height="fit-content" to={getPath('userProfile', user.id)}>
              <ProfileNavUserInfo user={user} />
            </MenuItem>

            <HeroCardButton user={user} stats={stats} isDisabled={loading} />

            <Divider borderColor="neutral1.6" />
          </>
        )}
        <VStack spacing={2} w="full">
          {discoveryNavItems.map((discoveryNav) => {
            const activityDot =
              discoveryNav.key === DiscoveryNavItemKey.MyProjects
                ? myProjectActivityDot
                : discoveryNav.key === DiscoveryNavItemKey.Activity
                ? followedActivityDot
                : false
            return (
              <MenuItem key={discoveryNav.label} as={Link} to={getPath(discoveryNav.path)}>
                <HStack position="relative">
                  <discoveryNav.icon fontSize="18px" />
                  <Body size="md">{discoveryNav.label}</Body>
                  {activityDot ? (
                    <Box
                      position="absolute"
                      top={2}
                      right={'-4'}
                      borderRadius="50%"
                      backgroundColor="error.9"
                      height="6px"
                      width="6px"
                    />
                  ) : null}
                </HStack>
              </MenuItem>
            )
          })}
        </VStack>
        {user.id ? (
          <>
            <Divider borderColor="neutral1.6" />

            <VStack spacing={2} w="full">
              <MenuItem as={Link} to={getPath('userProfileSettings', user.id)}>
                <Body size="md">{t('Settings')}</Body>
              </MenuItem>
              <MenuItem onClick={logout}>
                <Body size="md">{t('Sign Out')}</Body>
              </MenuItem>
            </VStack>
          </>
        ) : null}

        <Divider borderColor="neutral1.6" />

        <MenuItem as={ChakraLink} isExternal href={GeyserUpdatesUrl} _focusVisible={{}} gap={2}>
          <Body size="md">{t('Geyser updates')}</Body>
          <PiArrowUpRight fontSize="18px" />
        </MenuItem>
        <MenuItem as={ChakraLink} isExternal href={GeyserSubscribeUrl} _focusVisible={{}} gap={2}>
          <Body size="md">{t('Subscribe')}</Body>
          <PiArrowUpRight fontSize="18px" />
        </MenuItem>
      </VStack>

      <VStack w="full" spacing={4}>
        <Divider borderColor="neutral1.6" />
        <HStack w="full" paddingX={2} spacing={0} justifyContent="space-between">
          <UserNavExternalButton as={ChakraLink} isExternal href={GuideUrl}>
            {t('Guide')}
          </UserNavExternalButton>
          <UserNavExternalButton as={ChakraLink} isExternal href={FeedbackUrl}>
            {t('Feedback')}
          </UserNavExternalButton>
          <UserNavExternalButton as={ChakraLink} isExternal href={GeyserGithubUrl}>
            {t('Github')}
          </UserNavExternalButton>
          <UserNavExternalButton as={ChakraLink} isExternal href={GeyserAboutUrl}>
            {t('About')}
          </UserNavExternalButton>
        </HStack>
        <Divider borderColor="neutral1.6" />

        <ModeChange />
      </VStack>
    </VStack>
  )
}

const UserNavExternalButton: ComponentWithAs<'button', ButtonProps> = (props) => {
  return (
    <Button
      variant="ghost"
      colorScheme="neutral1"
      size="sm"
      textDecoration={'none'}
      paddingX={0}
      _hover={{ backgroundColor: 'none', textDecoration: 'underline' }}
      {...props}
    />
  )
}
