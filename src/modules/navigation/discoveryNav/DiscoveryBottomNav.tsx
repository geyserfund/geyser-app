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
import { Link, useLocation } from 'react-router'

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
    badge: { label: t('new'), tone: 'new' },
  },
  {
    title: t('Micro-Lending'),
    description: t('Browse loans supporting small businesses.'),
    disabled: true,
    badge: { label: t('soon'), tone: 'soon' },
  },
]

export const DiscoveryBottomNav = () => {
  const location = useLocation()

  const bottomNavLabelColor = useColorModeValue('gray.800', 'whiteAlpha.900')
  const bottomNavLabelFontSize = 'sm'
  const bottomNavLabelFontWeight = 600
  const menuBorderColor = useColorModeValue('neutral1.5', 'neutral1.6')
  const menuBackgroundColor = useColorModeValue('white', 'neutral1.3')
  const menuHoverColor = useColorModeValue('gray.50', 'neutral1.2')
  const mutedColor = useColorModeValue('gray.700', 'neutral1.10')
  const disabledColor = useColorModeValue('blackAlpha.400', 'neutral1.8')
  const newBadgeTextColor = useColorModeValue('gray.900', 'gray.900')
  const newBadgeBackgroundColor = useColorModeValue('primary1.4', 'primary1.5')
  const soonBadgeBackgroundColor = useColorModeValue('neutral1.4', 'neutral1.5')
  const soonBadgeTextColor = useColorModeValue('neutral1.10', 'neutral1.11')

  const bottomNavItems: BottomNavItem[] = [
    {
      label: t('Donate'),
      key: BottomNavItemKey.donate,
      isActive:
        matchesRoute(location.pathname, getPath('discoveryProjects')) ||
        matchesRoute(location.pathname, getPath('discoveryFundraisers')) ||
        matchesRoute(location.pathname, getPath('discoveryCampaigns')),
    },
    {
      label: t('Impact'),
      key: BottomNavItemKey.impact,
      path: getPath('discoveryImpactFunds'),
      isActive: matchesRoute(location.pathname, getPath('discoveryImpactFunds')),
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
        if (item.key === BottomNavItemKey.donate) {
          return (
            <Box key={item.key} flex={1.2}>
              <Menu placement="top-start" strategy="fixed">
                <MenuButton
                  as={Button}
                  variant="ghost"
                  width="full"
                  paddingX={4}
                  minHeight="56px"
                  borderRadius={{ base: '8px', lg: '10px' }}
                  colorScheme="primary1"
                  color={bottomNavLabelColor}
                  fontSize={bottomNavLabelFontSize}
                  fontWeight={bottomNavLabelFontWeight}
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
                                backgroundColor={
                                  donateItem.badge.tone === 'new'
                                    ? newBadgeBackgroundColor
                                    : soonBadgeBackgroundColor
                                }
                                color={donateItem.badge.tone === 'new' ? newBadgeTextColor : soonBadgeTextColor}
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
                          backgroundColor="transparent"
                          alignItems="flex-start"
                          borderRadius="8px"
                          paddingX={3}
                          paddingY={3}
                          height="auto"
                          whiteSpace="normal"
                          _hover={{ backgroundColor: menuHoverColor }}
                          _active={{ backgroundColor: menuHoverColor }}
                          _focusVisible={{ backgroundColor: menuHoverColor }}
                        >
                          {content}
                        </MenuItem>
                      )
                    })}
                  </MenuList>
                </Portal>
              </Menu>
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
