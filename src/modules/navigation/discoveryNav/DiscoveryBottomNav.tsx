import { type ButtonProps, Box, Button } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiCaretUp } from 'react-icons/pi'
import { Link, useLocation } from 'react-router'

import { DonateNavMenuContent } from '@/modules/navigation/components/navDropdown/DonateNavMenuContent.tsx'
import { getAboutNavDropdownSections } from '@/modules/navigation/components/navDropdown/navDropdownItems.ts'
import { NavDropdownMenu } from '@/modules/navigation/components/navDropdown/NavDropdownMenu.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants/config/routerPaths.ts'

import { BottomNavBarContainer } from '../components/bottomNav/BottomNavContainer.tsx'

export enum BottomNavItemKey {
  donate = 'donate',
  about = 'about',
  ops = 'ops',
}

export type BottomNavItem = {
  label: string
  key: BottomNavItemKey
  path?: string
  onClick?: () => void
  isActive: boolean
}

const matchesRoute = (pathname: string, route: string) => pathname === route || pathname.startsWith(`${route}/`)

export const DiscoveryBottomNav = () => {
  const location = useLocation()

  const bottomNavLabelColor = 'black'
  const bottomNavLabelFontSize = 'sm'
  const bottomNavLabelFontWeight = 600
  const aboutSections = getAboutNavDropdownSections(t)

  const bottomNavItems: BottomNavItem[] = [
    {
      label: t('Donate'),
      key: BottomNavItemKey.donate,
      isActive:
        matchesRoute(location.pathname, getPath('discoveryProjects')) ||
        matchesRoute(location.pathname, getPath('discoveryFundraisers')) ||
        matchesRoute(location.pathname, getPath('discoveryCampaigns')) ||
        matchesRoute(location.pathname, getPath('discoveryCircularGrantProjects')) ||
        matchesRoute(location.pathname, getPath('discoveryImpactFunds')) ||
        matchesRoute(location.pathname, getPath('discoveryMicroLending')) ||
        matchesRoute(location.pathname, getPath('discoveryCircularGrants')) ||
        matchesRoute(location.pathname, getPath('opsFund')),
    },
    {
      label: t('About'),
      key: BottomNavItemKey.about,
      isActive: matchesRoute(location.pathname, getPath('about')),
    },
    {
      label: t('Support Geyser'),
      key: BottomNavItemKey.ops,
      path: getPath('fundingStart', 'geyser'),
      isActive: matchesRoute(location.pathname, getPath('fundingStart', 'geyser')),
    },
  ]

  return (
    <BottomNavBarContainer spacing={2} w="full" marginX={0} padding={2} paddingBottom={3}>
      {bottomNavItems.map((item) => {
        if (item.key === BottomNavItemKey.donate || item.key === BottomNavItemKey.about) {
          return (
            <Box key={item.key} flex={1.2}>
              <NavDropdownMenu
                label={item.label}
                sections={item.key === BottomNavItemKey.about ? aboutSections : undefined}
                renderContent={
                  item.key === BottomNavItemKey.donate
                    ? ({ onNavigate }) => <DonateNavMenuContent compact onNavigate={onNavigate} />
                    : undefined
                }
                mode="mobile"
                isActive={item.isActive}
                triggerIcon={<PiCaretUp />}
                menuProps={
                  item.key === BottomNavItemKey.donate
                    ? {
                        width: 'calc(100vw - 16px)',
                        maxWidth: 'calc(100vw - 16px)',
                        minWidth: 'auto',
                        maxHeight: '70vh',
                        overflowY: 'auto',
                        px: 4,
                        py: 4,
                      }
                    : undefined
                }
                triggerProps={{
                  variant: 'ghost',
                  width: 'full',
                  paddingX: 4,
                  minHeight: '56px',
                  borderRadius: { base: '8px', lg: '10px' },
                  colorScheme: 'primary1',
                  color: bottomNavLabelColor,
                  fontSize: bottomNavLabelFontSize,
                  fontWeight: bottomNavLabelFontWeight,
                }}
              />
            </Box>
          )
        }

        return (
          <DiscoveryBottomNavButton
            key={item.label}
            item={item}
            variant={item.key === BottomNavItemKey.ops ? 'outline' : 'ghost'}
            colorScheme={item.key === BottomNavItemKey.ops ? 'neutral1' : undefined}
          />
        )
      })}
    </BottomNavBarContainer>
  )
}

type DiscoveryBottomNavButtonProps = {
  item: BottomNavItem
} & ButtonProps

const DiscoveryBottomNavButton = ({ item, ...rest }: DiscoveryBottomNavButtonProps) => {
  const bottomNavLabelColor = 'black'

  return (
    <Button
      variant="ghost"
      colorScheme="primary1"
      color={bottomNavLabelColor}
      flex={1}
      key={item.label}
      as={item.path ? Link : 'button'}
      to={item.path}
      onClick={item.onClick}
      paddingX={4}
      minHeight="56px"
      borderRadius={{ base: '8px', lg: '10px' }}
      isActive={item.isActive}
      justifyContent={'center'}
      alignItems="center"
      {...rest}
      position="relative"
    >
      <Body fontSize="sm" color={bottomNavLabelColor} fontWeight={600} textAlign="center" lineHeight="1">
        {item.label}
      </Body>
    </Button>
  )
}
