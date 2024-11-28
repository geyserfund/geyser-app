import { Box, Button, ButtonProps, Image, useBreakpointValue, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { Link } from 'react-router-dom'

import { LogoDark, LogoLight } from '@/assets'
import { followedActivityDotAtom, myProjectsActivityDotAtom } from '@/modules/discovery/state/activityDotAtom'
import { dimensions, getPath, LogoNameDark, LogoNameLight } from '@/shared/constants'
import { GradientBorder } from '@/shared/molecules/GradientBorder'
import { GuardiansButtonBackgroundGradient, GuardiansButtonBackgroundGradientBright } from '@/shared/styles/custom'
import { useMobileMode } from '@/utils'

import { currentPlatformNavItemAtom } from './discoveryNavAtom'
import { DiscoveryNavItem, DiscoveryNavItemKey, discoveryNavItems } from './discoveryNavData'

export const DiscoverySideNav = () => {
  const isMobile = useMobileMode()
  const isTabletSize = useBreakpointValue({ xl: false, lg: true })

  const imageUrl = useColorModeValue(LogoNameDark, LogoNameLight)
  const tabletImage = useColorModeValue(LogoDark, LogoLight)

  const currentNavItem = useAtomValue(currentPlatformNavItemAtom)

  const myProjectActivityDot = useAtomValue(myProjectsActivityDotAtom)
  const followedActivityDot = useAtomValue(followedActivityDotAtom)

  if (isMobile) return null

  return (
    <VStack
      paddingY={8}
      paddingX={{ lg: 4, xl: 8 }}
      spacing={8}
      position="fixed"
      left={0}
      top={0}
      height="100%"
      display={{ base: 'none', lg: 'flex' }}
      width={{ lg: dimensions.discovery.sideNav.tablet.width, xl: dimensions.discovery.sideNav.desktop.width }}
      borderRight="1px solid"
      borderColor="neutral1.6"
      backgroundColor="utils.pbg"
      zIndex={10}
    >
      <Link to={getPath('discoveryLanding')}>
        <Image src={isTabletSize ? tabletImage : imageUrl} height="48px" width="auto" />
      </Link>
      <VStack w="full" padding={0}>
        {discoveryNavItems.map((item) => {
          const activityDot =
            item.key === DiscoveryNavItemKey.MyProjects
              ? myProjectActivityDot
              : item.key === DiscoveryNavItemKey.Activity
              ? followedActivityDot
              : false

          return (
            <DiscoverySideNavButton
              key={item.label}
              item={item}
              currentNavItem={currentNavItem}
              activityDot={activityDot}
            />
          )
        })}
      </VStack>
    </VStack>
  )
}

type DiscoverySideNavButtonProps = {
  item: DiscoveryNavItem
  currentNavItem?: DiscoveryNavItem
  activityDot?: boolean
} & ButtonProps

const DiscoverySideNavButton = ({ item, currentNavItem, activityDot, ...rest }: DiscoverySideNavButtonProps) => {
  const isActive = currentNavItem?.path === item.path

  const isTabletSize = useBreakpointValue({ xl: false, lg: true })

  let backgroundColor

  const isGuardians = item.key === DiscoveryNavItemKey.Guardians

  if (isGuardians) {
    backgroundColor = GuardiansButtonBackgroundGradient
  }

  if (isTabletSize) {
    return (
      <GradientBorder enable={isGuardians} gradientColor={GuardiansButtonBackgroundGradientBright}>
        <Button
          variant="menu"
          colorScheme="primary1"
          size="lg"
          key={item.label}
          width="50px"
          height="50px"
          as={Link}
          paddingX={4}
          to={getPath(item.path)}
          isActive={isActive}
          background={backgroundColor}
          {...rest}
        >
          <>
            <item.icon fontSize="18px" />
            {activityDot ? (
              <Box
                position="absolute"
                top={4}
                right={1}
                borderRadius="50%"
                backgroundColor="error.9"
                height="6px"
                width="6px"
              />
            ) : null}
          </>
        </Button>
      </GradientBorder>
    )
  }

  return (
    <GradientBorder enable={isGuardians} gradientColor={GuardiansButtonBackgroundGradientBright}>
      <Button
        variant="menu"
        colorScheme="primary1"
        size="lg"
        width={'full'}
        key={item.label}
        leftIcon={<item.icon fontSize="18px" />}
        rightIcon={
          activityDot ? (
            <Box
              position="absolute"
              top={4}
              right={2}
              borderRadius="50%"
              backgroundColor="error.9"
              height="6px"
              width="6px"
            />
          ) : undefined
        }
        as={Link}
        to={getPath(item.path)}
        isActive={isActive}
        background={backgroundColor}
        {...rest}
      >
        {t(item.label)}
      </Button>
    </GradientBorder>
  )
}
