import {
  Button,
  ButtonProps,
  ComponentWithAs,
  Divider,
  HStack,
  Link as ChakraLink,
  MenuItem,
  VStack,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { PiCompass, PiRanking, PiSparkle, PiTrophy, PiWaveform } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { useAuthContext } from '../../../context'
import { Body } from '../../../shared/components/typography'
import { dimensions, FeedbackUrl, getPath, GeyserAboutUrl, GeyserGithubUrl, GuideUrl } from '../../../shared/constants'
import { ProfileNavUserInfo } from './components'
import { ModeChange } from './components/ModeChange'

const ProfileNavPlatformButtons = [
  {
    label: t('Discover'),
    icon: PiCompass,
    path: getPath('platformLanding'),
  },
  {
    label: t('Leaderboard'),
    icon: PiRanking,
    path: getPath('platformLeaderboard'),
  },
  {
    label: t('My Projects'),
    icon: PiSparkle,
    path: getPath('platformMyProjects'),
  },
  {
    label: t('Activity'),
    icon: PiWaveform,
    path: getPath('platformActivity'),
  },
  {
    label: t('Grants'),
    icon: PiTrophy,
    path: getPath('platformGrants'),
  },
]

export const ProfileNavContent = () => {
  const { logout, user } = useAuthContext()
  return (
    <VStack
      padding={4}
      width={dimensions.sideNav.width}
      spacing={4}
      alignItems={'start'}
      justifyContent={{ base: 'space-between', lg: 'start' }}
      height="100%"
    >
      <VStack w="full" spacing={4}>
        {user.id && (
          <>
            <MenuItem
              as={Link}
              height="fit-content"
              to={getPath('userProfile', user.id)}
              p={0}
              _hover={{}}
              _active={{}}
            >
              <ProfileNavUserInfo user={user} />
            </MenuItem>

            <Divider borderColor="neutral1.6" />
          </>
        )}
        <VStack spacing={2} w="full">
          {ProfileNavPlatformButtons.map((platformNav) => {
            return (
              <MenuItem key={platformNav.label} as={Link} to={platformNav.path}>
                <HStack>
                  <platformNav.icon />
                  <Body>{platformNav.label}</Body>
                </HStack>
              </MenuItem>
            )
          })}
        </VStack>
        {user.id ? (
          <>
            <Divider borderColor="neutral1.6" />

            <VStack spacing={2} w="full">
              <MenuItem as={Link} to={getPath('userProfileSettings', user.id)}>
                <Body>{t('Settings')}</Body>
              </MenuItem>
              <MenuItem onClick={logout}>
                <Body>{t('Sign Out')}</Body>
              </MenuItem>
            </VStack>
          </>
        ) : null}
      </VStack>

      <VStack w="full" spacing={4}>
        <Divider borderColor="neutral1.6" />
        <HStack w="full" paddingX={4} spacing={0} justifyContent="space-between">
          <UserNavExternalButton as={ChakraLink} isExternal href={GuideUrl}>
            {t('Guide')}
          </UserNavExternalButton>
          <UserNavExternalButton as={ChakraLink} isExternal href={FeedbackUrl}>
            {t('Feedback')}
          </UserNavExternalButton>
          <UserNavExternalButton as={ChakraLink} isExternal href={GeyserGithubUrl}>
            {t('Github')}
          </UserNavExternalButton>
          <UserNavExternalButton as={ChakraLink} isExternal href={GeyserAboutUrl}>
            {t('About')}
          </UserNavExternalButton>
        </HStack>
        <Divider borderColor="neutral1.6" />
        <ModeChange />
      </VStack>
    </VStack>
  )
}

const UserNavExternalButton: ComponentWithAs<'button', ButtonProps> = (props) => {
  return (
    <Button
      variant="ghost"
      colorScheme="neutral1"
      size="sm"
      textDecoration={'none'}
      paddingX={0}
      _hover={{ backgroundColor: 'none' }}
      {...props}
    />
  )
}
