import { Button, ButtonProps } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { Link } from 'react-router-dom'

import { getPath } from '@/shared/constants'

import { BottomNavBarContainer } from '../bottomNav'
import { currentPlatformNavItemAtom } from './platformNavAtom'
import { PlatformNavItem, platformNavItems } from './platformNavData'

export const PlatformBottomNav = () => {
  const currentNavItem = useAtomValue(currentPlatformNavItemAtom)

  return (
    <BottomNavBarContainer spacing={0} w="full" marginX={0}>
      {platformNavItems.map((item) => (
        <PlatformBottomNavButton key={item.label} item={item} currentNavItem={currentNavItem} />
      ))}
    </BottomNavBarContainer>
  )
}

type PlatformBottomNavButtonProps = {
  item: PlatformNavItem
  currentNavItem?: PlatformNavItem
} & ButtonProps

const PlatformBottomNavButton = ({ item, currentNavItem, ...rest }: PlatformBottomNavButtonProps) => {
  const isActive = currentNavItem?.path === item.path

  return (
    <Button
      variant="menu"
      colorScheme="primary1"
      size="lg"
      flex={1}
      backgroundColor={'neutral1.1'}
      key={item.label}
      as={Link}
      paddingX={4}
      to={getPath(item.path)}
      isActive={isActive}
      justifyContent={'center'}
      {...rest}
    >
      <item.icon fontSize="24px" />
    </Button>
  )
}
