import { Badge, Box, Divider, HStack, Link as ChakraLink, MenuItem, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import {
  PiArrowUpRight,
  PiClockCountdown,
  PiCoins,
  PiHandCoins,
  PiHouse,
  PiNewspaper,
  PiRocket,
  PiTrophy,
  PiUserCircle,
} from 'react-icons/pi'
import { Link } from 'react-router'

import { useAuthContext } from '@/context'
import { LandingSearchInput } from '@/modules/discovery/pages/landing/components/LandingSearchInput.tsx'
import { myProjectsActivityDotAtom } from '@/modules/discovery/state/activityDotAtom'
import { Body } from '@/shared/components/typography'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { FAQUrl, getPath, GeyserHackathonsUrl } from '@/shared/constants/index.ts'

import { CreateProjectButton } from '../components/CreateProjectButton.tsx'
import { ModeChange } from './components/ModeChange'

type ProfileNavContentProps = {
  onNavigate?: () => void
  showSearch?: boolean
}

export const ProfileNavContent = ({ onNavigate, showSearch = false }: ProfileNavContentProps) => {
  const { logout, user, isLoggedIn } = useAuthContext()

  const myProjectActivityDot = useAtomValue(myProjectsActivityDotAtom)
  const newBadgeTextColor = useColorModeValue('gray.900', 'gray.900')
  const mobileNavigationItems = [
    { label: 'Home', path: getPath('discoveryLanding'), icon: PiHouse },
    { label: 'My projects', path: getPath('discoveryMyProjects'), icon: PiRocket },
    { label: 'Fundraisers', path: getPath('discoveryFundraisers'), icon: PiHandCoins },
    { label: 'Campaigns', path: getPath('discoveryCampaigns'), icon: PiClockCountdown },
    {
      label: 'Impact funds',
      path: getPath('discoveryImpactFunds'),
      icon: PiTrophy,
      badge: { label: t('new'), backgroundColor: '#58efd9', textColor: newBadgeTextColor },
    },
    {
      label: 'Earn',
      path: getPath('ambassadorProgram'),
      icon: PiCoins,
      badge: { label: t('new'), backgroundColor: '#58efd9', textColor: newBadgeTextColor },
    },
    { label: 'News', path: getPath('discoveryNews'), icon: PiNewspaper },
  ] as const

  return (
    <VStack
      padding={4}
      width={dimensions.mobileSideNav.width}
      spacing={4}
      alignItems={'start'}
      justifyContent={'start'}
      height="100%"
    >
      <VStack w="full" spacing={4}>
        {showSearch ? (
          <Box w="full">
            <LandingSearchInput width="full" />
          </Box>
        ) : null}
        <VStack spacing={2} w="full">
          {isLoggedIn && (
            <MenuItem as={Link} to={getPath('heroProfile', user.heroId)} onClick={onNavigate}>
              <HStack position="relative">
                <PiUserCircle fontSize="18px" />
                <Body size="md">{t('Profile')}</Body>
              </HStack>
            </MenuItem>
          )}

          {mobileNavigationItems.map((item) => {
            const activityDot = item.label === 'My projects' ? myProjectActivityDot : false

            return (
              <MenuItem key={item.label} as={Link} to={item.path} onClick={onNavigate}>
                <HStack position="relative" w="full" justify="space-between" spacing={3}>
                  <HStack spacing={2.5}>
                    <item.icon fontSize="18px" />
                    <Body size="md">{t(item.label)}</Body>
                  </HStack>
                  {item.badge ? (
                    <Badge
                      px={2.5}
                      py={0.5}
                      minWidth="54px"
                      textAlign="center"
                      borderRadius="5px"
                      textTransform="lowercase"
                      fontSize="xs"
                      fontWeight={600}
                      backgroundColor={item.badge.backgroundColor}
                      color={item.badge.textColor}
                    >
                      {item.badge.label}
                    </Badge>
                  ) : null}
                  {activityDot ? (
                    <Box
                      position="absolute"
                      top={2}
                      right={'-4'}
                      borderRadius="50%"
                      backgroundColor="error.9"
                      height="6px"
                      width="6px"
                    />
                  ) : null}
                </HStack>
              </MenuItem>
            )
          })}
        </VStack>
        <Divider borderColor="neutral1.6" />
        <MenuItem _active={{}} _focus={{}} _hover={{}}>
          <CreateProjectButton
            w="full"
            color="black"
            borderColor="black"
            _hover={{ color: 'black', borderColor: 'black' }}
            _active={{ color: 'black', borderColor: 'black' }}
          />
        </MenuItem>
        {user.id ? (
          <>
            <Divider borderColor="neutral1.6" />

            <VStack spacing={2} w="full">
              <MenuItem as={Link} to={getPath('userProfileSettings', user.id)} onClick={onNavigate}>
                <Body size="md">{t('Profile settings')}</Body>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onNavigate?.()
                  logout()
                }}
              >
                <Body size="md">{t('Sign Out')}</Body>
              </MenuItem>
            </VStack>
          </>
        ) : null}

        <Divider borderColor="neutral1.6" />

        <MenuItem
          as={ChakraLink}
          href="/newsletter"
          onClick={() => {
            onNavigate?.()
          }}
        >
          <Body size="md">{t('Subscribe')}</Body>
        </MenuItem>
        <MenuItem as={ChakraLink} isExternal href={FAQUrl} _focusVisible={{}} gap={2}>
          <Body size="md">{t('FAQ')}</Body>
          <PiArrowUpRight fontSize="18px" />
        </MenuItem>
        <MenuItem as={ChakraLink} isExternal href={GeyserHackathonsUrl} _focusVisible={{}} gap={2}>
          <Body size="md">{t('Hackathons')}</Body>
          <PiArrowUpRight fontSize="18px" />
        </MenuItem>
      </VStack>

      <VStack w="full" spacing={4}>
        <Divider borderColor="neutral1.6" />

        <ModeChange />
      </VStack>
    </VStack>
  )
}
