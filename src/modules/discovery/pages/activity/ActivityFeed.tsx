import { HStack, VStack } from '@chakra-ui/react'
import { PiBell, PiGlobe } from 'react-icons/pi'
import { Outlet, useNavigate } from 'react-router'

import { AnimatedNavBar, AnimatedNavBarItem } from '@/shared/components/navigation/AnimatedNavBar'
import { useAnimatedNavBar } from '@/shared/components/navigation/useAnimatedNavBar'
import { dimensions, getPath } from '@/shared/constants'

import { useLastVisistedFollowedProjects } from '../../hooks/useLastVisited'

export const Activity = () => {
  const navigate = useNavigate()

  useLastVisistedFollowedProjects()

  const items: AnimatedNavBarItem[] = [
    {
      name: 'Projects I Follow',
      key: 'projectsIFollow',
      icon: PiBell,
      onClick() {
        navigate(getPath('discoveryActivityFollowed'))
      },
    },
    {
      name: 'Global Feed',
      key: 'globalFeed',
      icon: PiGlobe,
      onClick() {
        navigate(getPath('discoveryActivityGlobal'))
      },
    },
  ]

  const { ...animatedNavBarProps } = useAnimatedNavBar({
    items,
    defaultView: 'projectsIFollow',
  })

  return (
    <VStack
      h="full"
      paddingTop={{ base: `${dimensions.animatedNavBar.height.base}px`, lg: 0 }}
      width="full"
      spacing={4}
      borderTopRadius="xl"
      bg="neutralAlpha.1"
    >
      <HStack
        position={{ base: 'fixed', lg: 'sticky' }}
        paddingX={{ base: 3, lg: 0 }}
        top={{ base: `${dimensions.topNavBar.mobile.height}px`, lg: 0 }}
        width="full"
        justifyContent="center"
        alignItems="center"
        zIndex={2}
      >
        <AnimatedNavBar {...animatedNavBarProps} showIcon showLabel />
      </HStack>
      <Outlet />
    </VStack>
  )
}
