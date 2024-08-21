import { HStack, VStack } from '@chakra-ui/react'
import { useMemo } from 'react'
import { PiBell, PiLightning, PiRocket, PiShoppingBag, PiUser } from 'react-icons/pi'

import { CardLayout } from '@/shared/components/layouts'
import { AnimatedNavBar, AnimatedNavBarItem } from '@/shared/components/navigation/AnimatedNavBar'
import { useAnimatedNavBar } from '@/shared/components/navigation/useAnimatedNavBar'
import { dimensions } from '@/shared/constants'
import { useMobileMode } from '@/utils'

import { useUserProfileAtom, useViewingOwnProfileAtomValue } from '../../../../state'
import { Account } from '../account/Account'
import { ProfileContributions } from './views/ProfileContributions'
import { ProfileFollowed } from './views/ProfileFollowed'
import { ProfileProjects } from './views/ProfileProjects'
import { ProfilePurchases } from './views/ProfilePurchases'

enum ProfileTabsList {
  PROFILE = 'Profile',
  PROJECTS = 'Projects',
  CONTRIBUTIONS = 'Contributions',
  PURCHASES = 'Purchases',
  FOLLOWED = 'Followed',
}

export const ProfileTabs = () => {
  const isMobile = useMobileMode()

  const { isLoading } = useUserProfileAtom()

  const isViewingOwnProfile = useViewingOwnProfileAtomValue()

  const items: AnimatedNavBarItem[] = useMemo(() => {
    const tabList: AnimatedNavBarItem[] = []

    if (isMobile) {
      tabList.push({
        name: 'Profile',
        icon: PiUser,
        key: ProfileTabsList.PROFILE,
        render: () => <Account />,
      })
    }

    tabList.push({
      name: 'Projects',
      icon: PiRocket,
      key: ProfileTabsList.PROJECTS,
      render: () => <ProfileProjects />,
    })

    tabList.push({
      name: 'Contributions',
      icon: PiLightning,
      key: ProfileTabsList.CONTRIBUTIONS,
      render: () => <ProfileContributions />,
    })

    if (isViewingOwnProfile) {
      tabList.push({
        name: 'Purchases',
        icon: PiShoppingBag,
        key: ProfileTabsList.PURCHASES,
        render: () => <ProfilePurchases />,
      })
    }

    tabList.push({
      name: 'Followed',
      icon: PiBell,
      key: ProfileTabsList.FOLLOWED,
      render: () => <ProfileFollowed />,
    })

    return tabList
  }, [isViewingOwnProfile, isMobile])

  const { render, ...animatedNavBarProps } = useAnimatedNavBar({
    items,
    defaultView: isMobile ? ProfileTabsList.PROFILE : ProfileTabsList.PROJECTS,
  })

  return (
    <CardLayout mobileDense flex={1} height="100%" overflow="hidden" position="relative" zIndex={2} padding={0}>
      <HStack
        w="full"
        position={{ base: 'fixed', lg: 'absolute' }}
        left={0}
        paddingTop={{ base: 0, lg: 6 }}
        paddingX={{ base: 3, lg: 6 }}
        paddingBottom={{ base: 3, lg: 6 }}
        backgroundColor={'utils.pbg'}
        zIndex={1}
      >
        <AnimatedNavBar {...animatedNavBarProps} showLabel={!isMobile} showIcon={isMobile} loading={isLoading} />
      </HStack>
      <VStack
        height="100%"
        width="full"
        overflowY="auto"
        paddingX={{ base: 0, lg: 6 }}
        paddingBottom={10}
        paddingTop={{
          base: `${dimensions.animatedNavBar.height.base + 12 * 2}px`,
          lg: `${dimensions.animatedNavBar.height.base + 24 * 2}px`,
        }}
        spacing={2}
      >
        {render && render()}
      </VStack>
    </CardLayout>
  )
}
