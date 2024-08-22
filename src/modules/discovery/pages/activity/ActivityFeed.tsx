import { VStack } from '@chakra-ui/react'
import { PiBell, PiGlobe } from 'react-icons/pi'

import { StickToTop } from '@/shared/components/layouts'
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
    <VStack width="full" spacing={4}>
      <VStack id="activity-mobile-wrapper" width="full" height="100%">
        <StickToTop
          width={'100%'}
          id="activity-mobile"
          wrapperId="activity-mobile-wrapper"
          offset={dimensions.projectNavBar.mobile.height + 20}
          _onStick={{ width: '100%', px: '4' }}
        >
          <AnimatedNavBar {...animatedNavBarProps} showIcon showLabel />
        </StickToTop>
        {render && render()}
      </VStack>
    </VStack>
  )
}
