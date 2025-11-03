import {
  Box,
  Button,
  ButtonProps,
  Divider,
  Image as ChakraImage,
  ImageProps,
  useBreakpointValue,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { Link } from 'react-router'

import { LogoDark, LogoLight } from '@/assets'
import { followedActivityDotAtom, myProjectsActivityDotAtom } from '@/modules/discovery/state/activityDotAtom'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { getPath, LogoNameDark, LogoNameLight } from '@/shared/constants/index.ts'
import { UserExternalLinks } from '@/shared/molecules/UserExternalLinks'
import { useMobileMode } from '@/utils'

import { currentPlatformNavItemAtom } from './discoveryNavAtom'
import { DiscoveryNavItem, DiscoveryNavItemKey, discoveryNavItems } from './discoveryNavData'

const InsertDividerAfterIndex = [2, 4, 6]

const glowAnimation = keyframes`
  0% { filter: drop-shadow(0 0 0px #3182ce); }
  50% { filter: drop-shadow(0 0 6px #63b3ed); }
  100% { filter: drop-shadow(0 0 0px #3182ce); }
`

const Image = (props: ImageProps) => {
  return <ChakraImage transition="all 0.3s ease" filter="brightness(1)" {...props} />
}

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
      paddingTop={8}
      paddingBottom={4}
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
      justifyContent={'space-between'}
      zIndex={10}
    >
      <VStack w="full" h="full" paddingX={{ lg: 4, xl: 8 }} spacing={8}>
        <Link to={getPath('discoveryLanding')}>
          <Image src={isTabletSize ? tabletImage : imageUrl} alt={'Brand logo image'} height="48px" width="auto" />
        </Link>
        <VStack w="full" padding={0} spacing={3}>
          {discoveryNavItems.map((item, index) => {
            const activityDot =
              item.key === DiscoveryNavItemKey.MyProjects
                ? myProjectActivityDot
                : item.key === DiscoveryNavItemKey.Activity
                ? followedActivityDot
                : false

            return (
              <>
                <DiscoverySideNavButton
                  key={item.label}
                  item={item}
                  currentNavItem={currentNavItem}
                  activityDot={activityDot}
                />
                {InsertDividerAfterIndex.includes(index) && <Divider />}
              </>
            )
          })}
        </VStack>
      </VStack>
      <UserExternalLinks justifyContent="start" />
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

  if (isTabletSize) {
    return (
      <Button
        variant={isActive ? 'surface' : 'menu'}
        colorScheme="primary1"
        size="lg"
        key={item.label}
        width="50px"
        height="50px"
        as={Link}
        paddingX={4}
        to={getPath(item.path)}
        isActive={isActive}
        sx={{
          '&:hover img': {
            transform: 'scale(1.1)',
            filter: 'brightness(1.3)',
            animation: `${glowAnimation} 2s infinite`,
          },
        }}
        {...rest}
      >
        <>
          {item.image ? <Image height="18px" src={item.image} alt={item.label} /> : <item.icon fontSize="18px" />}
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
    )
  }

  return (
    <Button
      variant={'menu'}
      colorScheme="primary1"
      size="lg"
      width={'full'}
      key={item.label}
      leftIcon={item.image ? <Image height="18px" src={item.image} alt={item.label} /> : <item.icon fontSize="18px" />}
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
      sx={{
        '&:hover img': {
          transform: 'scale(1.1)',
          filter: 'brightness(1.3)',
          animation: `${glowAnimation} 2s infinite`,
        },
      }}
      {...rest}
    >
      {t(item.label)}
    </Button>
  )
}
