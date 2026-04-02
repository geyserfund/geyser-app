import { type ButtonProps, Box, Button, useColorModeValue } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiCaretUp } from 'react-icons/pi'
import { Link, useLocation } from 'react-router'

import {
  getDonateNavDropdownItems,
  getFundraiseNavDropdownItems,
  NavDropdownMenu,
} from '@/modules/navigation/components/navDropdown/index.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants/index.ts'

import { BottomNavBarContainer } from '../components/bottomNav'

export enum BottomNavItemKey {
  donate = 'donate',
  fundraise = 'fundraise',
  earn = 'earn',
  news = 'news',
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

  const bottomNavLabelColor = useColorModeValue('gray.800', 'whiteAlpha.900')
  const bottomNavLabelFontSize = 'sm'
  const bottomNavLabelFontWeight = 600
  const donateItems = getDonateNavDropdownItems(t)
  const fundraiseItems = getFundraiseNavDropdownItems(t)

  const bottomNavItems: BottomNavItem[] = [
    {
      label: t('Donate'),
      key: BottomNavItemKey.donate,
      isActive:
        matchesRoute(location.pathname, getPath('discoveryProjects')) ||
        matchesRoute(location.pathname, getPath('discoveryFundraisers')) ||
        matchesRoute(location.pathname, getPath('discoveryCampaigns')) ||
        matchesRoute(location.pathname, getPath('discoveryImpactFunds')),
    },
    {
      label: t('Fundraise'),
      key: BottomNavItemKey.fundraise,
      isActive: matchesRoute(location.pathname, getPath('discoveryCreator')),
    },
    {
      label: t('Earn'),
      key: BottomNavItemKey.earn,
      path: getPath('ambassadorProgram'),
      isActive: matchesRoute(location.pathname, getPath('ambassadorProgram')),
    },
    {
      label: t('News'),
      key: BottomNavItemKey.news,
      path: getPath('discoveryNews'),
      isActive: matchesRoute(location.pathname, getPath('discoveryNews')),
    },
  ]

  return (
    <BottomNavBarContainer spacing={2} w="full" marginX={0} padding={2} paddingBottom={3}>
      {bottomNavItems.map((item) => {
        if (item.key === BottomNavItemKey.donate || item.key === BottomNavItemKey.fundraise) {
          const navItems = item.key === BottomNavItemKey.donate ? donateItems : fundraiseItems

          return (
            <Box key={item.key} flex={1.2}>
              <NavDropdownMenu
                label={item.label}
                items={navItems}
                mode="mobile"
                isActive={item.isActive}
                triggerIcon={<PiCaretUp />}
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

        return <DiscoveryBottomNavButton key={item.label} item={item} />
      })}
    </BottomNavBarContainer>
  )
}

type DiscoveryBottomNavButtonProps = {
  item: BottomNavItem
} & ButtonProps

const DiscoveryBottomNavButton = ({ item, ...rest }: DiscoveryBottomNavButtonProps) => {
  const bottomNavLabelColor = useColorModeValue('gray.800', 'whiteAlpha.900')

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
