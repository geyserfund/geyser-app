import { Box, Button, ButtonProps } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { Link } from 'react-router-dom'

import { followedActivityDotAtom, myProjectsActivityDotAtom } from '@/modules/discovery/state/activityDotAtom'
import { getPath } from '@/shared/constants'

import { BottomNavBarContainer } from '../components/bottomNav'
import { currentPlatformNavItemAtom } from './discoveryNavAtom'
import { DiscoveryNavItem, DiscoveryNavItemKey, discoveryNavItems } from './discoveryNavData'

export const DiscoveryBottomNav = () => {
  const currentNavItem = useAtomValue(currentPlatformNavItemAtom)

  const myProjectActivityDot = useAtomValue(myProjectsActivityDotAtom)
  const followedActivityDot = useAtomValue(followedActivityDotAtom)

  return (
    <BottomNavBarContainer spacing={1} w="full" marginX={0}>
      {discoveryNavItems.map((item) => {
        if (!item.bottomNav) return null
        const activityDot =
          item.key === DiscoveryNavItemKey.MyProjects
            ? myProjectActivityDot
            : item.key === DiscoveryNavItemKey.Activity
            ? followedActivityDot
            : false

        return (
          <DiscoveryBottomNavButton
            key={item.label}
            item={item}
            currentNavItem={currentNavItem}
            activityDot={activityDot}
          />
        )
      })}
    </BottomNavBarContainer>
  )
}

type DiscoveryBottomNavButtonProps = {
  item: DiscoveryNavItem
  currentNavItem?: DiscoveryNavItem
  activityDot?: boolean
} & ButtonProps

const DiscoveryBottomNavButton = ({ item, currentNavItem, activityDot, ...rest }: DiscoveryBottomNavButtonProps) => {
  const isActive = currentNavItem?.path === item.path

  return (
    <Button
      variant="menu"
      colorScheme="primary1"
      size="lg"
      flex={1}
      key={item.label}
      as={Link}
      paddingX={4}
      to={getPath(item.path)}
      isActive={isActive}
      justifyContent={'center'}
      {...rest}
    >
      <item.icon fontSize="24px" />
      {activityDot ? (
        <Box
          position="absolute"
          top={2}
          right={2}
          borderRadius="50%"
          backgroundColor="error.9"
          height="6px"
          width="6px"
        />
      ) : null}
    </Button>
  )
}
