import {
  Badge,
  Box,
  Button,
  ButtonProps,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { PiCaretUp } from 'react-icons/pi'
import { Link, useLocation, useNavigate } from 'react-router'

import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants/index.ts'

import { BottomNavBarContainer } from '../components/bottomNav'

export enum BottomNavItemKey {
  donate = 'donate',
  earn = 'earn',
  impact = 'impact',
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

const mobileDonateItems = [
  {
    title: t('Fundraisers'),
    description: t('Browse ongoing causes and initiatives.'),
    to: getPath('discoveryFundraisers'),
  },
  {
    title: t('Campaigns'),
    description: t('Browse time-bound campaigns.'),
    to: getPath('discoveryCampaigns'),
  },
  {
    title: t('Impact Funds'),
    description: t('Fund a category through curated funds.'),
    to: getPath('discoveryImpactFunds'),
    badge: { label: t('new'), backgroundColor: '#58efd9', textColor: 'gray.900' },
  },
  {
    title: t('Micro-Lending'),
    description: t('Browse loans supporting small businesses.'),
    disabled: true,
    badge: { label: t('soon'), backgroundColor: '#d7d7d7', textColor: '#555555' },
  },
]

export const DiscoveryBottomNav = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const menuBorderColor = useColorModeValue('blackAlpha.300', 'whiteAlpha.300')
  const menuBackgroundColor = useColorModeValue('white', 'gray.800')
  const menuHoverColor = useColorModeValue('gray.50', 'whiteAlpha.100')
  const mutedColor = useColorModeValue('gray.700', 'gray.300')
  const disabledColor = useColorModeValue('blackAlpha.400', 'whiteAlpha.400')

  const handleScrollToNews = () => {
    const newsSection = window.document.getElementById('landing-whats-happening')

    if (location.pathname === getPath('discoveryLanding') && newsSection) {
      newsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
      return
    }

    navigate({ pathname: getPath('discoveryLanding'), hash: '#landing-whats-happening' })
  }

  const bottomNavItems: BottomNavItem[] = [
    {
      label: t('Donate'),
      key: BottomNavItemKey.donate,
      isActive:
        matchesRoute(location.pathname, getPath('discoveryFundraisers')) ||
        matchesRoute(location.pathname, getPath('discoveryCampaigns')),
    },
    {
      label: t('Earn'),
      key: BottomNavItemKey.earn,
      path: getPath('ambassadorProgram'),
      isActive: matchesRoute(location.pathname, getPath('ambassadorProgram')),
    },
    {
      label: t('Impact'),
      key: BottomNavItemKey.impact,
      path: getPath('discoveryImpactFunds'),
      isActive: matchesRoute(location.pathname, getPath('discoveryImpactFunds')),
    },
    {
      label: t('News'),
      key: BottomNavItemKey.news,
      onClick: handleScrollToNews,
      isActive: location.pathname === getPath('discoveryLanding') && location.hash === '#landing-whats-happening',
    },
  ]

  return (
    <BottomNavBarContainer spacing={2} w="full" marginX={0} padding={2} paddingBottom={3}>
      {bottomNavItems.map((item) => {
        if (item.key === BottomNavItemKey.donate) {
          return (
            <Menu key={item.key} placement="top-start" strategy="fixed">
              <MenuButton
                as={Button}
                variant="ghost"
                flex={1}
                minHeight="56px"
                borderRadius={{ base: '8px', lg: '10px' }}
                colorScheme="primary1"
                isActive={item.isActive}
                rightIcon={<PiCaretUp />}
              >
                {item.label}
              </MenuButton>
              <Portal>
                <MenuList
                  borderRadius="12px"
                  overflow="hidden"
                  p={2.5}
                  minWidth="260px"
                  borderColor={menuBorderColor}
                  backgroundColor={menuBackgroundColor}
                  marginBottom={2}
                >
                  {mobileDonateItems.map((donateItem) => {
                    const content = (
                      <VStack align="stretch" spacing={1.5} width="100%">
                        <HStack align="center" justify="flex-start" spacing={2.5}>
                          <Body
                            fontSize="sm"
                            dark={!donateItem.disabled}
                            color={donateItem.disabled ? disabledColor : undefined}
                            fontWeight={400}
                            lineHeight={1.2}
                          >
                            {donateItem.title}
                          </Body>
                          {donateItem.badge ? (
                            <Badge
                              px={2}
                              py={0.5}
                              borderRadius="5px"
                              textTransform="lowercase"
                              fontSize="xs"
                              fontWeight={600}
                              backgroundColor={donateItem.badge.backgroundColor}
                              color={donateItem.badge.textColor}
                            >
                              {donateItem.badge.label}
                            </Badge>
                          ) : null}
                        </HStack>
                        <Body
                          fontSize="xs"
                          color={donateItem.disabled ? disabledColor : mutedColor}
                          fontWeight={300}
                          lineHeight={1.4}
                        >
                          {donateItem.description}
                        </Body>
                      </VStack>
                    )

                    if (donateItem.disabled) {
                      return (
                        <Box
                          key={donateItem.title}
                          paddingX={3}
                          paddingY={3}
                          display="flex"
                          alignItems="flex-start"
                          justifyContent="flex-start"
                          cursor="not-allowed"
                          borderRadius="8px"
                        >
                          {content}
                        </Box>
                      )
                    }

                    return (
                      <MenuItem
                        key={donateItem.title}
                        as={Link}
                        to={donateItem.to}
                        alignItems="flex-start"
                        borderRadius="8px"
                        paddingX={3}
                        paddingY={3}
                        height="auto"
                        whiteSpace="normal"
                        _hover={{ backgroundColor: menuHoverColor }}
                        _focusVisible={{ backgroundColor: menuHoverColor }}
                      >
                        {content}
                      </MenuItem>
                    )
                  })}
                </MenuList>
              </Portal>
            </Menu>
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
  return (
    <Button
      variant="ghost"
      colorScheme="primary1"
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
      <Body fontWeight={600} textAlign="center" lineHeight="1">
        {item.label}
      </Body>
    </Button>
  )
}
