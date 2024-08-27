import { HStack, VStack } from '@chakra-ui/react'
import { PiBell, PiGlobe } from 'react-icons/pi'

import { AnimatedNavBar, AnimatedNavBarItem } from '@/shared/components/navigation/AnimatedNavBar'
import { useAnimatedNavBar } from '@/shared/components/navigation/useAnimatedNavBar'
import { dimensions } from '@/shared/constants'

import GlobalFeed from './components/GlobalFeed'
import ProjectsIFollow from './components/ProjectsIFollowFeed'

export const Activity = () => {
  const items: AnimatedNavBarItem[] = [
    {
      name: 'Projects I Follow',
      key: 'projectsIFollow',
      render: () => <ProjectsIFollow />,
      icon: PiBell,
    },
    {
      name: 'Global Feed',
      key: 'globalFeed',
      render: () => <GlobalFeed />,
      icon: PiGlobe,
    },
  ]

  const { render, ...animatedNavBarProps } = useAnimatedNavBar({ items, defaultView: 'projectsIFollow' })

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
      >
        <AnimatedNavBar {...animatedNavBarProps} showIcon showLabel />
      </HStack>

      {render && render()}
    </VStack>
  )
}
