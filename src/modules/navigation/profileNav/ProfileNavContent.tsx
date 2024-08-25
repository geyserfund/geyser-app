import {
  Box,
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
import { useAtomValue } from 'jotai'
import { PiArrowUpRight } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { followedActivityDotAtom, myProjectsActivityDotAtom } from '@/modules/discovery/state/activityDotAtom'

import { useAuthContext } from '../../../context'
import { Body } from '../../../shared/components/typography'
import {
  dimensions,
  FeedbackUrl,
  getPath,
  GeyserAboutUrl,
  GeyserGithubUrl,
  GeyserSubscribeUrl,
  GeyserUpdatesUrl,
  GuideUrl,
} from '../../../shared/constants'
import { DiscoveryNavItemKey, discoveryNavItems } from '../discoveryNav/discoveryNavData'
import { ProfileNavUserInfo } from './components'
import { ModeChange } from './components/ModeChange'

export const ProfileNavContent = () => {
  const { logout, user } = useAuthContext()

  const myProjectActivityDot = useAtomValue(myProjectsActivityDotAtom)
  const followedActivityDot = useAtomValue(followedActivityDotAtom)

  return (
    <VStack
      padding={4}
      width={dimensions.mobileSideNav.width}
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
          {discoveryNavItems.map((discoveryNav) => {
            const activityDot =
              discoveryNav.key === DiscoveryNavItemKey.MyProjects
                ? myProjectActivityDot
                : discoveryNav.key === DiscoveryNavItemKey.Activity
                ? followedActivityDot
                : false
            return (
              <MenuItem key={discoveryNav.label} as={Link} to={getPath(discoveryNav.path)}>
                <HStack position="relative">
                  <discoveryNav.icon />
                  <Body>{discoveryNav.label}</Body>
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

        <Divider borderColor="neutral1.6" />

        <MenuItem as={ChakraLink} isExternal href={GeyserUpdatesUrl} _focusVisible={{}} gap={2}>
          <Body>{t('Geyser updates')}</Body>
          <PiArrowUpRight fontSize="16px" />
        </MenuItem>
        <MenuItem as={ChakraLink} isExternal href={GeyserSubscribeUrl} _focusVisible={{}} gap={2}>
          <Body>{t('Subscribe')}</Body>
          <PiArrowUpRight fontSize="16px" />
        </MenuItem>
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
      _hover={{ backgroundColor: 'none', textDecoration: 'underline' }}
      {...props}
    />
  )
}
