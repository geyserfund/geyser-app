import { Button, ButtonProps, Image, useBreakpointValue, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { Link } from 'react-router-dom'

import { LogoDark, LogoLight } from '@/assets'
import { dimensions, getPath, LogoNameDark, LogoNameLight } from '@/shared/constants'
import { useMobileMode } from '@/utils'

import { currentPlatformNavItemAtom } from './discoveryNavAtom'
import { DiscoveryNavItem, discoveryNavItems } from './discoveryNavData'

export const DiscoverySideNav = () => {
  const isMobile = useMobileMode()
  const isTabletSize = useBreakpointValue({ '2xl': false, lg: true })

  const imageUrl = useColorModeValue(LogoNameDark, LogoNameLight)
  const tabletImage = useColorModeValue(LogoDark, LogoLight)

  const currentNavItem = useAtomValue(currentPlatformNavItemAtom)

  if (isMobile) return null

  return (
    <VStack
      paddingY={8}
      paddingX={{ lg: 4, '2xl': 8 }}
      spacing={8}
      position="fixed"
      left={0}
      top={0}
      height="100%"
      display={{ base: 'none', lg: 'flex' }}
      width={{ lg: dimensions.discovery.sideNav.tablet.width, '2xl': dimensions.discovery.sideNav.desktop.width }}
      borderRight="1px solid"
      borderColor="neutral1.6"
      backgroundColor="utils.pbg"
      zIndex={10}
    >
      <Image src={isTabletSize ? tabletImage : imageUrl} height="48px" width="auto" />
      <VStack w="full" padding={0}>
        {discoveryNavItems.map((item) => (
          <DiscoverySideNavButton key={item.label} item={item} currentNavItem={currentNavItem} />
        ))}
      </VStack>
    </VStack>
  )
}

type DiscoverySideNavButtonProps = {
  item: DiscoveryNavItem
  currentNavItem?: DiscoveryNavItem
} & ButtonProps

const DiscoverySideNavButton = ({ item, currentNavItem, ...rest }: DiscoverySideNavButtonProps) => {
  const isActive = currentNavItem?.path === item.path

  const isTabletSize = useBreakpointValue({ '2xl': false, lg: true })

  if (isTabletSize) {
    return (
      <Button
        variant="menu"
        colorScheme="primary1"
        size="lg"
        backgroundColor={'neutral1.1'}
        key={item.label}
        width="50px"
        height="50px"
        as={Link}
        paddingX={4}
        to={getPath(item.path)}
        isActive={isActive}
        {...rest}
      >
        <item.icon fontSize="18px" />
      </Button>
    )
  }

  return (
    <Button
      variant="menu"
      colorScheme="primary1"
      size="lg"
      width={'full'}
      backgroundColor={'neutral1.1'}
      key={item.label}
      leftIcon={<item.icon fontSize="18px" />}
      as={Link}
      to={getPath(item.path)}
      isActive={isActive}
      {...rest}
    >
      {t(item.label)}
    </Button>
  )
}